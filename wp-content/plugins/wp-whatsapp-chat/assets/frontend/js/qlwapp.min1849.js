!function($,window,document,undefined){"use strict";function Plugin(element,options){this.$qlwapp=$(element),this.init(this)}function qlwapp_init(){$("div#qlwapp").qlwapp()}$.fn.simulateClick=function(){return this.each((function(){if("createEvent"in document){var doc=this.ownerDocument,evt=doc.createEvent("MouseEvents");evt.initMouseEvent("click",!0,!0,doc.defaultView,1,0,0,0,0,!1,!1,!1,!1,0,null),this.dispatchEvent(evt)}else this.click()}))},Plugin.prototype={timeDateToString:function(time){var minutes=""+time.getMinutes();return 1===minutes.length&&(minutes="0"+minutes),time.getHours()+":"+minutes},timeStringToInt:function(a,b){return parseInt(a+b)},init:function(plugin){var $qlwapp=this.$qlwapp;$qlwapp.on("qlwapp.init",(function(e){plugin.mobiledevice=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)})),$qlwapp.on("qlwapp.time",(function(e){var $contact=$(e.target),timefrom=$contact.data("timefrom")||!1,timeto=$contact.data("timeto")||!1,timezone=parseInt($contact.data("timezone"))||0;if(!timeto||!timefrom||timefrom===timeto)return!0;var timeCurrent=new Date,n,timeZoneOffset=-timeCurrent.getTimezoneOffset()-timezone,timeTo=new Date,timeFrom=new Date,hr,min;if(hr=plugin.timeStringToInt(timefrom[0],timefrom[1]),min=plugin.timeStringToInt(timefrom[3],timefrom[4]),timeFrom.setHours(hr),timeFrom.setMinutes(min+timeZoneOffset),hr=plugin.timeStringToInt(timeto[0],timeto[1]),min=plugin.timeStringToInt(timeto[3],timeto[4]),timeTo.setHours(hr),timeTo.setMinutes(min+timeZoneOffset),timeCurrent.getTime()>=timeFrom.getTime()&&timeCurrent.getTime()<=timeTo.getTime()||$contact.addClass("qlwapp-readonly"),!timezone)return!0;$contact.find(".from").text(plugin.timeDateToString(timeFrom)),$contact.find(".to").text(plugin.timeDateToString(timeTo))})),$qlwapp.on("qlwapp.pro",(function(e){$qlwapp.find(".qlwapp-toggle").trigger("qlwapp.time"),$qlwapp.find(".qlwapp-account").each((function(i,contact){$(contact).trigger("qlwapp.time")}))})),$qlwapp.on("qlwapp.resize",(function(e){$(this).hasClass("qlwapp-show")&&$(this).trigger("qlwapp.toggle")})),$qlwapp.on("qlwapp.init",(function(e){plugin.mobiledevice?$qlwapp.addClass("mobile").removeClass("desktop"):$qlwapp.addClass("desktop").removeClass("mobile"),$qlwapp.addClass("qlwapp-js-ready")})),$qlwapp.on("qlwapp.init",(function(e){$qlwapp.hasClass("qlwapp-premium")&&$qlwapp.trigger("qlwapp.pro")})),$qlwapp.addClass("qlwapp-js-ready").trigger("qlwapp.init"),$qlwapp.on("qlwapp.height",(function(e){var $container=$(e.delegateTarget),$body,$carousel=$container.find(".qlwapp-body").find(".qlwapp-carousel"),$header=$container.find(".qlwapp-header"),$footer=$container.find(".qlwapp-footer"),height=$(window).innerHeight()-$header.outerHeight()-$footer.outerHeight();plugin.mobiledevice||(height=.7*$(window).innerHeight()-$header.outerHeight()-$footer.outerHeight()),$carousel.css({"max-height":height+"px"})})),$qlwapp.on("qlwapp.toggle",(function(e){var $container=$(e.delegateTarget),$box=$container.find(".qlwapp-box");$container.addClass("qlwapp-transition"),$box.removeClass("response texting"),setTimeout((function(){$container.toggleClass("qlwapp-show").trigger("qlwapp.height")}),10),setTimeout((function(){$container.toggleClass("qlwapp-transition")}),300)})),$qlwapp.on("click","[data-action=box], [data-action=close]",(function(e){e.preventDefault(),$(e.delegateTarget).trigger("qlwapp.toggle")})),$qlwapp.on("click","[data-action=open]",(function(e){var url="https://api.whatsapp.com/send";plugin.mobiledevice||(url="https://web.whatsapp.com/send");var $button=$(this),message=$button.data("message")||"",phone=$button.data("phone")||"";$(this).attr("href",url+"?phone="+phone+"&text="+message)})),$qlwapp.on("click","[data-action=previous]",(function(e){e.preventDefault();var $container,$box=$(e.delegateTarget).find(".qlwapp-box");$box.addClass("closing"),setTimeout((function(){$box.removeClass("response").removeClass("closing"),$box.removeClass("texting")}),300)})),$qlwapp.on("click","[data-action=chat]",(function(e){e.preventDefault();var $contact=$(this),$container=$(e.delegateTarget),$box=$container.find(".qlwapp-box"),avatar=$contact.find(".qlwapp-avatar img").attr("src"),name=$contact.find(".qlwapp-name").text(),label=$contact.find(".qlwapp-label").text(),time=$contact.find(".qlwapp-time").text(),message=$contact.data("message"),phone=$contact.data("phone");$box.addClass("response").addClass("opening"),$container.trigger("qlwapp.height"),setTimeout((function(){$box.removeClass("opening")}),300);var $reply=$box.find(".qlwapp-reply"),$header=$box.find(".qlwapp-header"),$avatar=$header.find(".qlwapp-avatar img"),$number=$header.find(".qlwapp-number"),$name=$header.find(".qlwapp-name"),$label=$header.find(".qlwapp-label"),$message=$box.find(".qlwapp-message"),meta=time?time+" - "+label:label;$reply.data("phone",phone),$avatar.attr("src",avatar),$avatar.attr("alt",name),$number.html(phone),$name.html(name),$label.html(meta),$message.html(message)})),$qlwapp.on("click","textarea",(function(e){$qlwapp.off("qlwapp.resize")})),$qlwapp.on("keypress","textarea",(function(e){13==e.keyCode&&setTimeout((function(){$qlwapp.find(".qlwapp-reply").simulateClick("click")}),100)})),$qlwapp.on("keyup","[data-action=response]",(function(e){e.preventDefault();var $textarea=$(this).find("textarea"),$pre=$(this).find("pre"),$reply=$(this).find(".qlwapp-reply"),$container,$box=$(e.delegateTarget).find(".qlwapp-box"),$buttons=$box.find(".qlwapp-buttons");$pre.html($textarea.val()),setTimeout((function(){$box.addClass("texting").css({"padding-bottom":$pre.outerHeight()}),$buttons.addClass("active");var message=$textarea.val();$reply.data("message",message),""==message&&($box.removeClass("texting"),$buttons.removeClass("active"))}),300)}))}},$.fn.qlwapp=function(options){var args=arguments,returns;return void 0===options||"object"==typeof options?this.each((function(){$.data(this,"plugin_qlwapp")||$.data(this,"plugin_qlwapp",new Plugin(this,options))})):"string"==typeof options&&"_"!==options[0]&&"init"!==options?(this.each((function(){var instance=$.data(this,"plugin_qlwapp");instance instanceof Plugin&&"function"==typeof instance[options]&&(returns=instance[options].apply(instance,Array.prototype.slice.call(args,1))),"destroy"===options&&$.data(this,"plugin_qlwapp",null)})),void 0!==returns?returns:this):void 0},qlwapp_init(),$(window).on("load",(function(){qlwapp_init()})),$(window).on("click",(function(e){$(e.target).closest("#qlwapp.qlwapp-show").length||$("div#qlwapp.qlwapp-show").trigger("qlwapp.toggle")})),$(window).on("resize",(function(e){$("div#qlwapp").trigger("qlwapp.resize"),$("div#qlwapp").trigger("qlwapp.init")}))}(jQuery,window,document);