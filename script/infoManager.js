;jQuery.infoManager = (function($){


    return {
        init: function(infos){             
            this.displayInformation(infos);
        },
        displayInformation: function(infos){
            console.log('please see the interactionType and change the type by thru app.js');
            $.each(infos, function(idx, info){
                console.log(idx+'->', info);
            });
        },
        interaction: {
            data: null,
            set: function(data){
                this.data = data;
            },
            get: function(){
                return this.data;
            }
        }
    };
})(jQuery);
