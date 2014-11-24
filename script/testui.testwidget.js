$.widget('testui.testwidget',{
	options:{
		filterVals: [],
		filterEnum: {
			replace: 'REPLACE',
			add: 'ADD',
			remove: 'REMOVE'
		},
		template: '<div class="testWidgetWrapper">\
				     <div class="testWidgetContainer">Region<br>\
					 {{each testObj}}<input type="checkbox" value="${this.id}">${this.name}</input><br />{{/each}}\
				     </div>\
			      </div>'	
	},
	_create: function(){
		if(this.options.hidden){
			this.element.hide();
		}
		console.log(this.options);
		//fetch top menu data
		this.render();
	},
	destroy: function(){
	 	$.Widget.prototype.destroy.apply(this, arguments);	
		this.unbindEvents();
	},
	unbindEvents:function(){

	},
	bindEvents:function(){	
		$( "input[type=checkbox]" ).on( "click", this, this.onClick );
	},
	onClick:function(event){
		var $target = $(event.currentTarget),
			widget = event.data;

		widget.options.filterVals.push($target.val());
		widget.onFilter();
	},
	onFilter:function(){
		var filterVals = this.options.filterVals,
			len = filterVals.length;

		if(len <= 1) {
			this.filterSingleValue(filterVals[0], this.options.filterEnum.replace);
		} else {
			this.addValuesToFilter(this.options.filterEnum.add);
		}
	},
	filterSingleValue:function(val, type){
		var activeSheet = $.testmodule.activeSheet.get();

		activeSheet.applyFilterAsync(
		    "Region",
		    val,
		    tableauSoftware.FilterUpdateType[type]
		);
	},
	addValuesToFilter:function(type){
		var activeSheet = $.testmodule.activeSheet.get(),
			filterVals = this.options.filterVals;

		activeSheet.applyFilterAsync(
		    "Region",
		    filterVals,
		    tableauSoftware.FilterUpdateType[type]
		);
	},
	removeValuesFromFilter:function(){
		var activeSheet = $.testmodule.getActiveSheet();

	},
	render:function(){		
		$.tmpl(this.options.template,this.options).appendTo(this.element);
		this.bindEvents();
	}
});