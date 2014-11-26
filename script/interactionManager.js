;jQuery.interactionManager = (function($){
    var _element;
    var _markup = '<div id="tableauViz" class="container"></div>';    
    
    var _bindEvents = function(){
	
	};
    
    return {
        init: function(element){
            _element = element;
            this.render();
            _bindEvents();
        },
        workbook: {
            data: null,
            set: function(wb){
                this.data = wb;
            },
            get: function(){
                return this.data;
            }
        },
        activeSheet: {
            data: null,
            set: function(as){
                this.data = as;
            },
            get: function(){
                return this.data;
            }
        },
        initializeViz: function(){
            var placeholderDiv = $('#tableauViz');
            var url = "http://public.tableausoftware.com/views/WorldIndicators/GDPpercapita";
            var options = {
                width: placeholderDiv.offsetWidth,
                height: placeholderDiv.offsetHeight,
                hideTabs: true,
                hideToolbar: true,
                onFirstInteractive: function () {

                    $.interactionManager.workbook.set(viz.getWorkbook());
                    $.interactionManager.activeSheet.set($.interactionManager.workbook.get().getActiveSheet());
                    $.interactionManager.activeSheet.get().getFiltersAsync()
                        .then(function(response){
                            $.infoManager.init(response);
                            response.forEach(function(data, idx){ 
                                if(data.getFilterType() === 'categorical'){
                                    var interactionInfo = $.infoManager.interaction.get();
                                    $.widgetManager.create({
                                        type: data.getFilterType(),
                                        appliedValues: data.getAppliedValues(),
                                        fieldName: data.getFieldName(),
                                        interactionType: interactionInfo[idx]
                                    });
                                }
                            });
                        });
                    
                }
            };
            viz = new tableauSoftware.Viz(placeholderDiv, url, options);
        },
        render: function(){
            var vizObj =  {
                placeHolderDivId: 'tableauViz',
                url: 'http://public.tableausoftware.com/views/WorldIndicators/GDPpercapita',
                options: {
                    hideTabs: true,
                    width: '800px',
                    height: '700px'
                }
            };

			this.buildMarkup();
            $(this.initializeViz);
        },
        buildMarkup: function(){
            _element.html(_markup);
        },
        destroy: function(){           
            _element.empty(); //all widgets will fire their destroy method when their parent UI is removed
        },
        ef: function(value){
            return _element.find(value);
        }
    };
})(jQuery);
