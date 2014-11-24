;jQuery.testmodule = (function($){
    var _element;
    var _markup = '<div id="tableauViz"></div>\
                   <div class="testWrapper"></div>\
					  <div class="testContainer">\
					  </div>\
				   </div>';    
    
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
            var _this = this;
            var placeholderDiv = $('#tableauViz');
            var url = "http://public.tableausoftware.com/views/WorldIndicators/GDPpercapita";
            var options = {
                width: placeholderDiv.offsetWidth,
                height: placeholderDiv.offsetHeight,
                hideTabs: true,
                hideToolbar: true,
                onFirstInteractive: function () {
                  $.testmodule.workbook.set(viz.getWorkbook());
                  $.testmodule.activeSheet.set($.testmodule.workbook.get().getActiveSheet());
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

		    var testObj = [
                {id:'All',name:'All'},
                {id:'Europe',name:'Europe'},
                {id:'Middle East',name:'Middle East'},
                {id:'The Americas',name:'The Americas'},
                {id:'Oceania',name:'Oceania'},
                {id:'Asia',name:'Asia'},
                {id:'Africa',name:'Africa'}
            ];
			this.buildMarkup();
            this.ef('.testContainer').testwidget({testObj:testObj});
            $(this.initializeViz);
        },
        getWorkbook: function(){
            return this.workbook;
        },
        getActiveSheet: function(){
            return this.activeSheet;
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
