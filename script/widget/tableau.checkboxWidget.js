$.widget('tableau.checkboxWidget',{
    options:{
        element: '',
        filterVals: [],
        filterEnum: {
            replace: 'REPLACE',
            add: 'ADD',
            remove: 'REMOVE'
        },
        template: '{{each appliedValues}}<input type="checkbox" class="test" value="${this.value}">${this.formattedValue}</input><br />{{/each}}'
                        
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
        $( 'input[type="checkbox"]' ).off( "click", this, this.onChecked );
    },
    bindEvents:function(){ 
        $( 'input[type="checkbox"]' ).on( "click", this, this.onChecked );
    },
    onChecked:function(event){
        var $target = $(event.currentTarget),
            widget = event.data;

        widget.options.element = $target.parent();
        widget.options.filterVals.push($target.val());
        widget.onFilter();
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
            this.options.element.data('name'),
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
    removeValuesFromFilter:function(){

    },
    render:function(){      
        $.tmpl(this.options.template,this.options).appendTo(this.element);
        this.bindEvents();
    }
});