(function($){
    $.app = {};
    $.app.init = function(props) {
        $.app.loaded();
    };   
    
    $.app.loaded = function(){
        $.publish('loaded');
    };
   
    $.subscribe('loaded',function(){
        var element = $("#tableauWidget");

        //stored info of interactionType
        $.infoManager.interaction.set({
            1: 'checkbox',
            2: 'radio'
        });

        $.interactionManager.init(element);

        $('.btn.btn-success.clear-filter').on( "click", function() {
            var store = $.infoManager.getStore();
            var activeSheet = $.interactionManager.activeSheet.get();

            $.each(store, function(idx, data){
                activeSheet.clearFilterAsync(data.fieldName);
            });
        });
    });
	
})(jQuery);
