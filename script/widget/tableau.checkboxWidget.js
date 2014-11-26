$.widget('tableau.checkboxWidget',{
    options:{
        element: '',
        filterVals: [],
        filterEnum: {
            replace: 'REPLACE',
            add: 'ADD',
            remove: 'REMOVE'
        },
        template: '<form role="form">\
                    {{each appliedValues}}\
                        <div class="checkbox">\
                          <label>\
                            <input type="checkbox" value="${this.value}">\
                                ${this.formattedValue}\
                          </label>\
                        </div>\
                    {{/each}}\
                   </form>',
                        
    },
    _create: function(){
        if(this.options.hidden){
            this.element.hide();
        }
        //fetch top menu data
        this.render();
    },
    destroy: function(){
        $.Widget.prototype.destroy.apply(this, arguments);  
        this.unbindEvents();
    },
    unbindEvents:function(){
        this.element.find( 'input[type="checkbox"]' ).off( "click", this, this.onChecked );
    },
    bindEvents:function(){ 
        this.element.find( 'input[type="checkbox"]' ).on( "click", this, this.onChecked );
    },
    onChecked:function(event){
        var $target = $(event.currentTarget),
            isChecked = $target.is(':checked'),
            widget = event.data;

        if (isChecked) {
            widget.options.filterVals.push($target.val());
            widget.onFilter();
        } else {
            widget.removeValuesFromFilter($target.val(), widget.options.filterEnum.remove);
            widget.options.filterVals = $.grep(widget.options.filterVals, function(value){
                return value != $target.val();
            });
        }       
    },
    onFilter:function(){
        var filterVals = this.options.filterVals,
            len = filterVals.length;

        if(len <= 1) {
            this.filterSingleValue(filterVals[0], this.options.filterEnum.replace);
        } else {
            this.addValuesToFilter(this.options.filterEnum.add);
        }
    },
    filterSingleValue:function(val, type){
        var activeSheet = $.interactionManager.activeSheet.get();

        activeSheet.applyFilterAsync(
            this.options.fieldName,
            val,
            tableauSoftware.FilterUpdateType[type]
        );
    },
    addValuesToFilter:function(type){
        var activeSheet = $.interactionManager.activeSheet.get(),
            filterVals = this.options.filterVals;

        activeSheet.applyFilterAsync(
            this.options.fieldName,
            filterVals,
            tableauSoftware.FilterUpdateType[type]
        );
    },
    removeValuesFromFilter:function(val, type){
        var activeSheet = $.interactionManager.activeSheet.get();

        activeSheet.applyFilterAsync(
            this.options.fieldName,
            val,
            tableauSoftware.FilterUpdateType[type]
        );
    },
    render:function(){      
        $.tmpl(this.options.template,this.options).appendTo(this.element);
        this.bindEvents();
    }
});