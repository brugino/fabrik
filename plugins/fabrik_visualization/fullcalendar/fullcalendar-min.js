/*! Fabrik */
var fabrikFullcalendar=new Class({Implements:[Options],options:{},initialize:function(a,b){function c(a,b,c){i=a,j=c.name,jQuery("#calendar").on("mousemove",d)}function d(){i=j=null,jQuery("#calendar").off("mousemove",d)}this.el=document.id(a),this.setOptions(b),this.date=new Date,this.windowopts={id:"addeventwin",title:"add/edit event",loadMethod:"xhr",minimizable:!1,evalScripts:!0,width:380,height:320,onContentLoaded:function(a){a.fitToContent()}.bind(this)},"null"!==typeOf(this.el.getElement(".addEventButton"))&&this.el.getElement(".addEventButton").addEvent("click",function(a){this.openAddEvent(a)}.bind(this)),Fabrik.addEvent("fabrik.form.submitted",function(){jQuery("#calendar").fullCalendar("refetchEvents"),Fabrik.Windows.addeventwin.close()}.bind(this));{var e=[];this.options.url}this.options.eventLists.each(function(a,b){e.push({events:new Function("start","end","tz","callback","new Request({'url': '"+this.options.url.add+"&listid="+a.value+"&eventListKey="+b+"','evalScripts': true,'onSuccess': function (e, json) {\nif (typeOf(json) !== 'null') {\nthis.processEvents(json, callback);\n}}.bind(this, callback)}).send();").bind(this),color:a.colour})}.bind(this));var f=this,g="";this.options.show_week!==!1&&(g+="agendaWeek"),this.options.show_day!==!1&&(g.length>0&&(g+=","),g+="agendaDay"),g.length>0&&(g="month,"+g);var h="month";switch(this.options.default_view){case"monthView":break;case"weekView":this.options.show_week!==!1&&(h="agendaWeek");break;case"dayView":this.options.show_day!==!1&&(h="agendaDay")}var i=null,j=null;jQuery("#calendar").dblclick(function(a){i&&f.openAddEvent(a,j,i)}),jQuery("#calendar").fullCalendar({header:{left:"prev,next today",center:"title",right:g},fixedWeekCount:!1,timeFormat:this.options.time_format,defaultView:h,nextDayThreshold:"00:00:00",firstDay:this.options.first_week_day,eventSources:e,eventClick:function(a){return f.viewEntry(a),!1},defaultTimedEventDuration:this.options.minDuration,dayClick:c,viewRender:function(a){"month"==a.name&&1==f.options.greyscaledweekend&&(jQuery("td.fc-sat").css("background","#f2f2f2"),jQuery("td.fc-sun").css("background","#f2f2f2"))},minTime:this.options.open,maxTime:this.options.close})},processEvents:function(a,b){a=$H(JSON.decode(a));var c=[];a.each(function(a){c.push({title:a.label,start:a.startdate_locale,end:a.enddate_locale,url:a.link,listid:a._listid,rowid:a.__pk_val,formid:a._formid})}.bind(c)),b(c)},addEvForm:function(a){"undefined"!=typeof jQuery&&jQuery(this.popOver).popover("hide"),this.windowopts.id="addeventwin";var b="index.php?option=com_fabrik&controller=visualization.fullcalendar&view=visualization&task=addEvForm&format=raw&listid="+a.listid+"&rowid="+a.rowid;if(b+="&jos_fabrik_calendar_events___visualization_id="+this.options.calendarId,b+="&visualizationid="+this.options.calendarId,a.nextView&&(b+="&nextview="+a.nextView),b+="&fabrik_window_id="+this.windowopts.id,"undefined"!=typeof this.clickdate){var c=jQuery("#calendar").fullCalendar("option","defaultTimedEventDuration").split(":"),d=moment(this.clickdate).add({h:c[0],m:c[1],s:c[2]}).format("YYYY-MM-DD HH:mm:ss");b+="&start_date="+this.clickdate+"&end_date="+d}this.windowopts.type="window",this.windowopts.contentURL=b;var e=this.options.filters;this.windowopts.onContentLoaded=function(a){e.each(function(a){if(document.id(a.key))switch(document.id(a.key).get("tag")){case"select":document.id(a.key).selectedIndex=a.val;break;case"input":document.id(a.key).value=a.val}}),a.fitToContent(!1)}.bind(this),Fabrik.getWindow(this.windowopts)},viewEntry:function(a){var b={};b.id=a.formid,b.rowid=a.rowid,b.listid=a.listid,b.nextView="details",this.addEvForm(b)},openAddEvent:function(a,b,c){var d,e,f,g,h,i,j,k;if(this.options.canAdd!==!1&&("month"!=b||this.options.readonlyMonth!==!0)){switch(a.type){case"dblclick":k=c;break;case"click":a.stop(),k=moment();break;default:return void alert("Unknown event in OpenAddEvent: "+a.type)}"month"==b?f=g="00":(f=(f=k.hour())<10?"0"+f:f,g=(g=k.minute())<10?"0"+g:g),e=(e=k.date())<10?"0"+e:e,h=(h=k.month()+1)<10?"0"+h:h,i=k.year(),this.clickdate=i+"-"+h+"-"+e+" "+f+":"+g+":00",("dblclick"!=a.type||this.dateInLimits(this.clickdate))&&(this.options.eventLists.length>1?this.openChooseEventTypeForm(this.clickdate,d):(j={},j.rowid="",j.id="",j.listid=this.options.eventLists[0].value,this.addEvForm(j)))}},dateInLimits:function(a){var b=new moment(a);if(""!==this.options.dateLimits.min){var c=new moment(this.options.dateLimits.min);if(b.isBefore(c))return alert(Joomla.JText._("PLG_VISUALIZATION_FULLCALENDAR_DATE_ADD_TOO_EARLY")),!1}if(""!==this.options.dateLimits.max){var d=new moment(this.options.dateLimits.max);if(b.isAfter(d))return alert(Joomla.JText._("PLG_VISUALIZATION_FULLCALENDAR_DATE_ADD_TOO_LATE")),!1}return!0},openChooseEventTypeForm:function(a,b){var c="index.php?option=com_fabrik&tmpl=component&view=visualization&controller=visualization.fullcalendar&task=chooseaddevent&id="+this.options.calendarId+"&d="+a+"&rawd="+b;c+="&renderContext="+this.el.id.replace(/visualization_/,""),this.windowopts.contentURL=c,this.windowopts.id="chooseeventwin",this.windowopts.onContentLoaded=function(){new Fx.Scroll(window).toElement("chooseeventwin")},Fabrik.getWindow(this.windowopts)}});