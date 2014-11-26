$.widget('tableau.selectWidget',{
    options:{
        element: '',
        filterEnum: {
            replace: 'REPLACE',
            add: 'ADD',
            remove: 'REMOVE'
        },
        template: '<select class="form-control selectWidget">\
                        {{each appliedValues}}<option value="${this.value}">${this.formattedValue}</option><br />{{/each}}\
                    </select>'
                        
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
        this.element.find( 'select.selectWidget' ).off( 'change', this, this.onChange );
    },
    bindEvents:function(){  
        this.element.find( 'select.selectWidget' ).on( 'change', this, this.onChange );
    },
    onChange:function(event){
        var $target = $(event.currentTarget),
            widget = event.data;

        widget.options.element = $target.parent();
        widget.onFilter($target.val());
    },
    //for select it's 1 value only
    onFilter:function(val){
        this.filterSingleValue(val, this.options.filterEnum.replace);
    },
    filterSingleValue:function(val, type){
        this.removeValuesFromFilter();

        var activeSheet = $.interactionManager.activeSheet.get();

        activeSheet.applyFilterAsync(
            this.options.element.data('name'),
            val,
            tableauSoftware.FilterUpdateType[type]
        );
    },
    removeValuesFromFilter:function(){
        var activeSheet = $.interactionManager.activeSheet.get();

        activeSheet.clearFilterAsync(this.options.element.data('name'));
    },
    render:function(){      
        $.tmpl(this.options.template,this.options).appendTo(this.element);
        this.bindEvents();
    }
});