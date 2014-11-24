(function($){
    $.test = {};
    $.test.init = function(props) {
        $.test.loaded();
    };   
    
    $.test.loaded = function(){
        $.publish('loaded');
    }
   
    $.subscribe('loaded',function(){
        var element = $("#test-element");
        $.testmodule.init(element);
    });
	
})(jQuery);
