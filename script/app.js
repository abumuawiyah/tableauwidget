(function($){
    $.app = {};
    $.app.init = function(props) {
        $.app.loaded();
    };   
    
    $.app.loaded = function(){
        $.publish('loaded');
    }
   
    $.subscribe('loaded',function(){
        var element = $("#test-element");

        //stored info of interactionType
        $.infoManager.interaction.set({
            1: 'radio',
            2: 'radio'
        });

        $.interactionManager.init(element);
    });
	
})(jQuery);
