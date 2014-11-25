$.widget('tableau.radioWidget',{
    options:{
        element: '',
        filterEnum: {
            replace: 'REPLACE',
            add: 'ADD',
            remove: 'REMOVE'
        },
        template: '{{each appliedValues}}<input name="radioWidget" type="radio" value="${this.value}">${this.formattedValue}</input><br />{{/each}}'
                        
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
        this.element.find( 'input[name=radioWidget]' ).off( 'change', this, this.onChecked );
    },
    bindEvents:function(){  
        this.element.find( 'input[name=radioWidget]' ).on( 'change', this, this.onChecked );
    },
    onChecked:function(event){
        var $target = $(event.currentTarget),
            widget = event.data;

        widget.options.element = $target.parent();
        widget.onFilter($target.val());
    },
    //for radio it's 1 value only
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