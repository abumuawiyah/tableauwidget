;jQuery.infoManager = (function($){
    var _internalStore = [];

    return {
        init: function(response){             
            this.displayInformation(response);
        },
        displayInformation: function(response){
            var _this = this,
                interactionInfo = _this.interaction.get();

            console.log('please see the interactionType and change the type by thru app.js');
            response.forEach(function(data, idx){ 
                if(data.getFilterType() === 'categorical'){
                    _internalStore.push({
                        type: data.getFilterType(),
                        fieldName: data.getFieldName(),
                        appliedValues: data.getAppliedValues(),
                        interactionType: interactionInfo[idx]
                    });
                }
            });

            $.each(_internalStore, function(idx, info){
                console.log(idx+'->', info);
            });
        },
        getStore: function(){
            return _internalStore;
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
