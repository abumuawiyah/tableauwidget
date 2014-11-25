;jQuery.widgetManager = (function($){
    
    var _filterHTML = {
        buildCheckbox: function(options){
            var $div = $('<div id="'+options.fieldName+'" data-name="'+options.fieldName+'">'+options.fieldName+'<br/></div>');
            $div.checkboxWidget(options);
            $('body').append($div);
        },
        buildRadio: function(options){
            var $div = $('<div id="'+options.fieldName+'" data-name="'+options.fieldName+'">'+options.fieldName+'<br/></div>');
            $div.radioWidget(options);
            $('body').append($div);
        },
        buildSelect: function(options){
            var $div = $('<div id="'+options.fieldName+'" data-name="'+options.fieldName+'">'+options.fieldName+'<br/></div>');
            $div.selectWidget(options);
            $('body').append($div);
        }
    }

    return {
        create: function(options){
            if(options.type === 'categorical') {
                switch(options.interactionType){
                    case 'checkbox':
                        _filterHTML.buildCheckbox(options);
                    break;
                    case 'radio':
                        _filterHTML.buildRadio(options);
                    break;
                    case 'select':
                        _filterHTML.buildSelect(options);
                    break;
                    default:
                    break;
                }
            }
            
        }
    };
})(jQuery);
