/*
 Highmaps JS v8.2.0 (2020-08-20)

 Highmaps as a plugin for Highcharts or Highstock.

 (c) 2011-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/map",["highcharts"],function(z){a(z);a.Highcharts=z;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function z(a,r,k,n){a.hasOwnProperty(r)||(a[r]=n.apply(null,k))}a=a?a._modules:{};z(a,"Core/Axis/MapAxis.js",[a["Core/Axis/Axis.js"],a["Core/Utilities.js"]],function(a,r){var k=r.addEvent,n=r.pick,c=function(){return function(c){this.axis=
c}}();r=function(){function a(){}a.compose=function(a){a.keepProps.push("mapAxis");k(a,"init",function(){this.mapAxis||(this.mapAxis=new c(this))});k(a,"getSeriesExtremes",function(){if(this.mapAxis){var c=[];this.isXAxis&&(this.series.forEach(function(a,u){a.useMapGeometry&&(c[u]=a.xData,a.xData=[])}),this.mapAxis.seriesXData=c)}});k(a,"afterGetSeriesExtremes",function(){if(this.mapAxis){var c=this.mapAxis.seriesXData||[],a;if(this.isXAxis){var u=n(this.dataMin,Number.MAX_VALUE);var h=n(this.dataMax,
-Number.MAX_VALUE);this.series.forEach(function(f,x){f.useMapGeometry&&(u=Math.min(u,n(f.minX,u)),h=Math.max(h,n(f.maxX,h)),f.xData=c[x],a=!0)});a&&(this.dataMin=u,this.dataMax=h);this.mapAxis.seriesXData=void 0}}});k(a,"afterSetAxisTranslation",function(){if(this.mapAxis){var c=this.chart,a=c.plotWidth/c.plotHeight;c=c.xAxis[0];var u;"yAxis"===this.coll&&"undefined"!==typeof c.transA&&this.series.forEach(function(c){c.preserveAspectRatio&&(u=!0)});if(u&&(this.transA=c.transA=Math.min(this.transA,
c.transA),a/=(c.max-c.min)/(this.max-this.min),a=1>a?this:c,c=(a.max-a.min)*a.transA,a.mapAxis.pixelPadding=a.len-c,a.minPixelPadding=a.mapAxis.pixelPadding/2,c=a.mapAxis.fixTo)){c=c[1]-a.toValue(c[0],!0);c*=a.transA;if(Math.abs(c)>a.minPixelPadding||a.min===a.dataMin&&a.max===a.dataMax)c=0;a.minPixelPadding-=c}}});k(a,"render",function(){this.mapAxis&&(this.mapAxis.fixTo=void 0)})};return a}();r.compose(a);return r});z(a,"Mixins/ColorSeries.js",[a["Core/Globals.js"]],function(a){a.colorPointMixin=
{setVisible:function(a){var k=this,n=a?"show":"hide";k.visible=k.options.visible=!!a;["graphic","dataLabel"].forEach(function(c){if(k[c])k[c][n]()});this.series.buildKDTree()}};a.colorSeriesMixin={optionalAxis:"colorAxis",colorAxis:0,translateColors:function(){var a=this,k=this.options.nullColor,n=this.colorAxis,c=this.colorKey;(this.data.length?this.data:this.points).forEach(function(C){var w=C.getNestedProperty(c);(w=C.options.color||(C.isNull||null===C.value?k:n&&"undefined"!==typeof w?n.toColor(w,
C):C.color||a.color))&&C.color!==w&&(C.color=w,"point"===a.options.legendType&&C.legendItem&&a.chart.legend.colorizeItem(C,C.visible))})}}});z(a,"Core/Axis/ColorAxis.js",[a["Core/Axis/Axis.js"],a["Core/Chart/Chart.js"],a["Core/Color.js"],a["Core/Globals.js"],a["Core/Legend.js"],a["Mixins/LegendSymbol.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],function(a,r,k,n,c,C,D,A){var w=this&&this.__extends||function(){var b=function(e,d){b=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(b,
e){b.__proto__=e}||function(b,e){for(var d in e)e.hasOwnProperty(d)&&(b[d]=e[d])};return b(e,d)};return function(e,d){function t(){this.constructor=e}b(e,d);e.prototype=null===d?Object.create(d):(t.prototype=d.prototype,new t)}}(),u=k.parse,h=n.noop;k=A.addEvent;var f=A.erase,x=A.extend,l=A.Fx,q=A.isNumber,p=A.merge,y=A.pick,g=A.splat;"";var d=n.Series;A=n.colorPointMixin;x(d.prototype,n.colorSeriesMixin);x(D.prototype,A);r.prototype.collectionsWithUpdate.push("colorAxis");r.prototype.collectionsWithInit.colorAxis=
[r.prototype.addColorAxis];var b=function(b){function e(e,d){var t=b.call(this,e,d)||this;t.beforePadding=!1;t.chart=void 0;t.coll="colorAxis";t.dataClasses=void 0;t.legendItem=void 0;t.legendItems=void 0;t.name="";t.options=void 0;t.stops=void 0;t.visible=!0;t.init(e,d);return t}w(e,b);e.buildOptions=function(b,e,d){b=b.options.legend||{};var t=d.layout?"vertical"!==d.layout:"vertical"!==b.layout;return p(e,{side:t?2:1,reversed:!t},d,{opposite:!t,showEmpty:!1,title:null,visible:b.enabled&&(d?!1!==
d.visible:!0)})};e.prototype.init=function(d,t){var v=e.buildOptions(d,e.defaultOptions,t);this.coll="colorAxis";b.prototype.init.call(this,d,v);t.dataClasses&&this.initDataClasses(t);this.initStops();this.horiz=!v.opposite;this.zoomEnabled=!1};e.prototype.initDataClasses=function(b){var e=this.chart,d,v=0,g=e.options.chart.colorCount,m=this.options,f=b.dataClasses.length;this.dataClasses=d=[];this.legendItems=[];b.dataClasses.forEach(function(b,t){b=p(b);d.push(b);if(e.styledMode||!b.color)"category"===
m.dataClassColor?(e.styledMode||(t=e.options.colors,g=t.length,b.color=t[v]),b.colorIndex=v,v++,v===g&&(v=0)):b.color=u(m.minColor).tweenTo(u(m.maxColor),2>f?.5:t/(f-1))})};e.prototype.hasData=function(){return!!(this.tickPositions||[]).length};e.prototype.setTickPositions=function(){if(!this.dataClasses)return b.prototype.setTickPositions.call(this)};e.prototype.initStops=function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(b){b.color=
u(b[1])})};e.prototype.setOptions=function(e){b.prototype.setOptions.call(this,e);this.options.crosshair=this.options.marker};e.prototype.setAxisSize=function(){var b=this.legendSymbol,d=this.chart,g=d.options.legend||{},m,f;b?(this.left=g=b.attr("x"),this.top=m=b.attr("y"),this.width=f=b.attr("width"),this.height=b=b.attr("height"),this.right=d.chartWidth-g-f,this.bottom=d.chartHeight-m-b,this.len=this.horiz?f:b,this.pos=this.horiz?g:m):this.len=(this.horiz?g.symbolWidth:g.symbolHeight)||e.defaultLegendLength};
e.prototype.normalizedValue=function(b){this.logarithmic&&(b=this.logarithmic.log2lin(b));return 1-(this.max-b)/(this.max-this.min||1)};e.prototype.toColor=function(b,e){var d=this.dataClasses,t=this.stops,g;if(d)for(g=d.length;g--;){var m=d[g];var v=m.from;t=m.to;if(("undefined"===typeof v||b>=v)&&("undefined"===typeof t||b<=t)){var f=m.color;e&&(e.dataClass=g,e.colorIndex=m.colorIndex);break}}else{b=this.normalizedValue(b);for(g=t.length;g--&&!(b>t[g][0]););v=t[g]||t[g+1];t=t[g+1]||v;b=1-(t[0]-
b)/(t[0]-v[0]||1);f=v.color.tweenTo(t.color,b)}return f};e.prototype.getOffset=function(){var e=this.legendGroup,d=this.chart.axisOffset[this.side];e&&(this.axisParent=e,b.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=d)};e.prototype.setLegendColor=function(){var b=this.reversed,e=b?1:0;b=b?0:1;e=this.horiz?[e,0,b,0]:[0,b,0,e];this.legendColor={linearGradient:{x1:e[0],y1:e[1],x2:e[2],y2:e[3]},stops:this.stops}};
e.prototype.drawLegendSymbol=function(b,d){var t=b.padding,g=b.options,m=this.horiz,f=y(g.symbolWidth,m?e.defaultLegendLength:12),v=y(g.symbolHeight,m?12:e.defaultLegendLength),c=y(g.labelPadding,m?16:30);g=y(g.itemDistance,10);this.setLegendColor();d.legendSymbol=this.chart.renderer.rect(0,b.baseline-11,f,v).attr({zIndex:1}).add(d.legendGroup);this.legendItemWidth=f+t+(m?g:c);this.legendItemHeight=v+t+(m?c:0)};e.prototype.setState=function(b){this.series.forEach(function(e){e.setState(b)})};e.prototype.setVisible=
function(){};e.prototype.getSeriesExtremes=function(){var b=this.series,e=b.length,g;this.dataMin=Infinity;for(this.dataMax=-Infinity;e--;){var m=b[e];var f=m.colorKey=y(m.options.colorKey,m.colorKey,m.pointValKey,m.zoneAxis,"y");var c=m.pointArrayMap;var a=m[f+"Min"]&&m[f+"Max"];if(m[f+"Data"])var l=m[f+"Data"];else if(c){l=[];c=c.indexOf(f);var h=m.yData;if(0<=c&&h)for(g=0;g<h.length;g++)l.push(y(h[g][c],h[g]))}else l=m.yData;a?(m.minColorValue=m[f+"Min"],m.maxColorValue=m[f+"Max"]):(l=d.prototype.getExtremes.call(m,
l),m.minColorValue=l.dataMin,m.maxColorValue=l.dataMax);"undefined"!==typeof m.minColorValue&&(this.dataMin=Math.min(this.dataMin,m.minColorValue),this.dataMax=Math.max(this.dataMax,m.maxColorValue));a||d.prototype.applyExtremes.call(m)}};e.prototype.drawCrosshair=function(e,d){var m=d&&d.plotX,g=d&&d.plotY,t=this.pos,f=this.len;if(d){var c=this.toPixels(d.getNestedProperty(d.series.colorKey));c<t?c=t-2:c>t+f&&(c=t+f+2);d.plotX=c;d.plotY=this.len-c;b.prototype.drawCrosshair.call(this,e,d);d.plotX=
m;d.plotY=g;this.cross&&!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,!this.chart.styledMode&&this.crosshair&&this.cross.attr({fill:this.crosshair.color}))}};e.prototype.getPlotLinePath=function(e){var d=this.left,m=e.translatedValue,g=this.top;return q(m)?this.horiz?[["M",m-4,g-6],["L",m+4,g-6],["L",m,g],["Z"]]:[["M",d,m],["L",d-6,m+6],["L",d-6,m-6],["Z"]]:b.prototype.getPlotLinePath.call(this,
e)};e.prototype.update=function(d,m){var g=this.chart,t=g.legend,f=e.buildOptions(g,{},d);this.series.forEach(function(b){b.isDirtyData=!0});(d.dataClasses&&t.allItems||this.dataClasses)&&this.destroyItems();g.options[this.coll]=p(this.userOptions,f);b.prototype.update.call(this,f,m);this.legendItem&&(this.setLegendColor(),t.colorizeItem(this,!0))};e.prototype.destroyItems=function(){var b=this.chart;this.legendItem?b.legend.destroyItem(this):this.legendItems&&this.legendItems.forEach(function(e){b.legend.destroyItem(e)});
b.isDirtyLegend=!0};e.prototype.remove=function(e){this.destroyItems();b.prototype.remove.call(this,e)};e.prototype.getDataClassLegendSymbols=function(){var b=this,e=b.chart,d=b.legendItems,m=e.options.legend,g=m.valueDecimals,f=m.valueSuffix||"",c;d.length||b.dataClasses.forEach(function(m,t){var l=!0,a=m.from,v=m.to,q=e.numberFormatter;c="";"undefined"===typeof a?c="< ":"undefined"===typeof v&&(c="> ");"undefined"!==typeof a&&(c+=q(a,g)+f);"undefined"!==typeof a&&"undefined"!==typeof v&&(c+=" - ");
"undefined"!==typeof v&&(c+=q(v,g)+f);d.push(x({chart:e,name:c,options:{},drawLegendSymbol:C.drawRectangle,visible:!0,setState:h,isDataClass:!0,setVisible:function(){l=b.visible=!l;b.series.forEach(function(b){b.points.forEach(function(b){b.dataClass===t&&b.setVisible(l)})});e.legend.colorizeItem(this,l)}},m))});return d};e.defaultLegendLength=200;e.defaultOptions={lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},
width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0};e.keepProps=["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"];return e}(a);Array.prototype.push.apply(a.keepProps,b.keepProps);n.ColorAxis=b;["fill","stroke"].forEach(function(b){l.prototype[b+"Setter"]=function(){this.elem.attr(b,u(this.start).tweenTo(u(this.end),this.pos),null,!0)}});k(r,"afterGetAxes",function(){var e=this,d=e.options;
this.colorAxis=[];d.colorAxis&&(d.colorAxis=g(d.colorAxis),d.colorAxis.forEach(function(d,m){d.index=m;new b(e,d)}))});k(d,"bindAxes",function(){var b=this.axisTypes;b?-1===b.indexOf("colorAxis")&&b.push("colorAxis"):this.axisTypes=["colorAxis"]});k(c,"afterGetAllItems",function(b){var e=[],d,g;(this.chart.colorAxis||[]).forEach(function(g){(d=g.options)&&d.showInLegend&&(d.dataClasses&&d.visible?e=e.concat(g.getDataClassLegendSymbols()):d.visible&&e.push(g),g.series.forEach(function(e){if(!e.options.showInLegend||
d.dataClasses)"point"===e.options.legendType?e.points.forEach(function(e){f(b.allItems,e)}):f(b.allItems,e)}))});for(g=e.length;g--;)b.allItems.unshift(e[g])});k(c,"afterColorizeItem",function(b){b.visible&&b.item.legendColor&&b.item.legendSymbol.attr({fill:b.item.legendColor})});k(c,"afterUpdate",function(){var b=this.chart.colorAxis;b&&b.forEach(function(b,e,d){b.update({},d)})});k(d,"afterTranslate",function(){(this.chart.colorAxis&&this.chart.colorAxis.length||this.colorAttribs)&&this.translateColors()});
return b});z(a,"Mixins/ColorMapSeries.js",[a["Core/Globals.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],function(a,r,k){var n=k.defined;k=a.noop;var c=a.seriesTypes;a.colorMapPointMixin={dataLabelOnNull:!0,isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setState:function(c){r.prototype.setState.call(this,c);this.graphic&&this.graphic.attr({zIndex:"hover"===c?1:0})}};a.colorMapSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],
trackerGroups:["group","markerGroup","dataLabelsGroup"],getSymbol:k,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:c.column.prototype.pointAttribs,colorAttribs:function(c){var a={};n(c.color)&&(a[this.colorProp||"fill"]=c.color);return a}}});z(a,"Maps/MapNavigation.js",[a["Core/Chart/Chart.js"],a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,r,k){function n(f){f&&(f.preventDefault&&f.preventDefault(),f.stopPropagation&&f.stopPropagation(),f.cancelBubble=!0)}function c(f){this.init(f)}
var C=r.doc,w=k.addEvent,A=k.extend,B=k.merge,u=k.objectEach,h=k.pick;c.prototype.init=function(f){this.chart=f;f.mapNavButtons=[]};c.prototype.update=function(f){var c=this.chart,a=c.options.mapNavigation,q,p,y,g,d,b=function(b){this.handler.call(c,b);n(b)},e=c.mapNavButtons;f&&(a=c.options.mapNavigation=B(c.options.mapNavigation,f));for(;e.length;)e.pop().destroy();h(a.enableButtons,a.enabled)&&!c.renderer.forExport&&u(a.buttons,function(m,f){q=B(a.buttonOptions,m);c.styledMode||(p=q.theme,p.style=
B(q.theme.style,q.style),g=(y=p.states)&&y.hover,d=y&&y.select);m=c.renderer.button(q.text,0,0,b,p,g,d,0,"zoomIn"===f?"topbutton":"bottombutton").addClass("highcharts-map-navigation highcharts-"+{zoomIn:"zoom-in",zoomOut:"zoom-out"}[f]).attr({width:q.width,height:q.height,title:c.options.lang[f],padding:q.padding,zIndex:5}).add();m.handler=q.onclick;w(m.element,"dblclick",n);e.push(m);var t=q,l=w(c,"load",function(){m.align(A(t,{width:m.width,height:2*m.height}),null,t.alignTo);l()})});this.updateEvents(a)};
c.prototype.updateEvents=function(c){var f=this.chart;h(c.enableDoubleClickZoom,c.enabled)||c.enableDoubleClickZoomTo?this.unbindDblClick=this.unbindDblClick||w(f.container,"dblclick",function(c){f.pointer.onContainerDblClick(c)}):this.unbindDblClick&&(this.unbindDblClick=this.unbindDblClick());h(c.enableMouseWheelZoom,c.enabled)?this.unbindMouseWheel=this.unbindMouseWheel||w(f.container,"undefined"===typeof C.onmousewheel?"DOMMouseScroll":"mousewheel",function(c){f.pointer.onContainerMouseWheel(c);
n(c);return!1}):this.unbindMouseWheel&&(this.unbindMouseWheel=this.unbindMouseWheel())};A(a.prototype,{fitToBox:function(c,a){[["x","width"],["y","height"]].forEach(function(f){var l=f[0];f=f[1];c[l]+c[f]>a[l]+a[f]&&(c[f]>a[f]?(c[f]=a[f],c[l]=a[l]):c[l]=a[l]+a[f]-c[f]);c[f]>a[f]&&(c[f]=a[f]);c[l]<a[l]&&(c[l]=a[l])});return c},mapZoom:function(c,a,l,q,p){var f=this.xAxis[0],g=f.max-f.min,d=h(a,f.min+g/2),b=g*c;g=this.yAxis[0];var e=g.max-g.min,m=h(l,g.min+e/2);e*=c;d=this.fitToBox({x:d-b*(q?(q-f.pos)/
f.len:.5),y:m-e*(p?(p-g.pos)/g.len:.5),width:b,height:e},{x:f.dataMin,y:g.dataMin,width:f.dataMax-f.dataMin,height:g.dataMax-g.dataMin});b=d.x<=f.dataMin&&d.width>=f.dataMax-f.dataMin&&d.y<=g.dataMin&&d.height>=g.dataMax-g.dataMin;q&&f.mapAxis&&(f.mapAxis.fixTo=[q-f.pos,a]);p&&g.mapAxis&&(g.mapAxis.fixTo=[p-g.pos,l]);"undefined"===typeof c||b?(f.setExtremes(void 0,void 0,!1),g.setExtremes(void 0,void 0,!1)):(f.setExtremes(d.x,d.x+d.width,!1),g.setExtremes(d.y,d.y+d.height,!1));this.redraw()}});w(a,
"beforeRender",function(){this.mapNavigation=new c(this);this.mapNavigation.update()});r.MapNavigation=c});z(a,"Maps/MapPointer.js",[a["Core/Pointer.js"],a["Core/Utilities.js"]],function(a,r){var k=r.extend,n=r.pick;r=r.wrap;k(a.prototype,{onContainerDblClick:function(c){var a=this.chart;c=this.normalize(c);a.options.mapNavigation.enableDoubleClickZoomTo?a.pointer.inClass(c.target,"highcharts-tracker")&&a.hoverPoint&&a.hoverPoint.zoomTo():a.isInsidePlot(c.chartX-a.plotLeft,c.chartY-a.plotTop)&&a.mapZoom(.5,
a.xAxis[0].toValue(c.chartX),a.yAxis[0].toValue(c.chartY),c.chartX,c.chartY)},onContainerMouseWheel:function(c){var a=this.chart;c=this.normalize(c);var k=c.detail||-(c.wheelDelta/120);a.isInsidePlot(c.chartX-a.plotLeft,c.chartY-a.plotTop)&&a.mapZoom(Math.pow(a.options.mapNavigation.mouseWheelSensitivity,k),a.xAxis[0].toValue(c.chartX),a.yAxis[0].toValue(c.chartY),c.chartX,c.chartY)}});r(a.prototype,"zoomOption",function(c){var a=this.chart.options.mapNavigation;n(a.enableTouchZoom,a.enabled)&&(this.chart.options.chart.pinchType=
"xy");c.apply(this,[].slice.call(arguments,1))});r(a.prototype,"pinchTranslate",function(c,a,k,n,w,u,h){c.call(this,a,k,n,w,u,h);"map"===this.chart.options.chart.type&&this.hasZoom&&(c=n.scaleX>n.scaleY,this.pinchTranslateDirection(!c,a,k,n,w,u,h,c?n.scaleX:n.scaleY))})});z(a,"Series/MapSeries.js",[a["Core/Globals.js"],a["Mixins/LegendSymbol.js"],a["Core/Series/Point.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Utilities.js"]],function(a,r,k,n,c){var w=c.extend,z=c.fireEvent,A=c.getNestedProperty,
B=c.isArray,u=c.isNumber,h=c.merge,f=c.objectEach,x=c.pick,l=c.seriesType,q=c.splat,p=a.colorMapPointMixin,y=a.noop,g=a.Series,d=a.seriesTypes;l("map","scatter",{animation:!1,dataLabels:{crop:!1,formatter:function(){return this.point.value},inside:!0,overflow:!1,padding:0,verticalAlign:"middle"},marker:null,nullColor:"#f7f7f7",stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:"{point.name}: {point.value}<br/>"},turboThreshold:0,allAreas:!0,borderColor:"#cccccc",borderWidth:1,joinBy:"hc-key",
states:{hover:{halo:null,brightness:.2},normal:{animation:!0},select:{color:"#cccccc"},inactive:{opacity:1}}},h(a.colorMapSeriesMixin,{type:"map",getExtremesFromAll:!0,useMapGeometry:!0,forceDL:!0,searchPoint:y,directTouch:!0,preserveAspectRatio:!0,pointArrayMap:["value"],setOptions:function(b){b=g.prototype.setOptions.call(this,b);var e=b.joinBy;null===e&&(e="_i");e=this.joinBy=q(e);e[1]||(e[1]=e[0]);return b},getBox:function(b){var e=Number.MAX_VALUE,d=-e,c=e,g=-e,f=e,l=e,h=this.xAxis,p=this.yAxis,
q;(b||[]).forEach(function(b){if(b.path){"string"===typeof b.path?b.path=a.splitPath(b.path):"M"===b.path[0]&&(b.path=n.prototype.pathToSegments(b.path));var m=b.path||[],t=-e,h=e,p=-e,v=e,u=b.properties;b._foundBox||(m.forEach(function(b){var e=b[b.length-2];b=b[b.length-1];"number"===typeof e&&"number"===typeof b&&(h=Math.min(h,e),t=Math.max(t,e),v=Math.min(v,b),p=Math.max(p,b))}),b._midX=h+(t-h)*x(b.middleX,u&&u["hc-middle-x"],.5),b._midY=v+(p-v)*x(b.middleY,u&&u["hc-middle-y"],.5),b._maxX=t,b._minX=
h,b._maxY=p,b._minY=v,b.labelrank=x(b.labelrank,(t-h)*(p-v)),b._foundBox=!0);d=Math.max(d,b._maxX);c=Math.min(c,b._minX);g=Math.max(g,b._maxY);f=Math.min(f,b._minY);l=Math.min(b._maxX-b._minX,b._maxY-b._minY,l);q=!0}});q&&(this.minY=Math.min(f,x(this.minY,e)),this.maxY=Math.max(g,x(this.maxY,-e)),this.minX=Math.min(c,x(this.minX,e)),this.maxX=Math.max(d,x(this.maxX,-e)),h&&"undefined"===typeof h.options.minRange&&(h.minRange=Math.min(5*l,(this.maxX-this.minX)/5,h.minRange||e)),p&&"undefined"===typeof p.options.minRange&&
(p.minRange=Math.min(5*l,(this.maxY-this.minY)/5,p.minRange||e)))},hasData:function(){return!!this.processedXData.length},getExtremes:function(){var b=g.prototype.getExtremes.call(this,this.valueData),e=b.dataMin;b=b.dataMax;this.chart.hasRendered&&this.isDirtyData&&this.getBox(this.options.data);u(e)&&(this.valueMin=e);u(b)&&(this.valueMax=b);return{dataMin:this.minY,dataMax:this.maxY}},translatePath:function(b){var e=this.xAxis,d=this.yAxis,a=e.min,c=e.transA,g=e.minPixelPadding,f=d.min,l=d.transA,
h=d.minPixelPadding,p=[];b&&b.forEach(function(b){"M"===b[0]?p.push(["M",(b[1]-(a||0))*c+g,(b[2]-(f||0))*l+h]):"L"===b[0]?p.push(["L",(b[1]-(a||0))*c+g,(b[2]-(f||0))*l+h]):"C"===b[0]?p.push(["C",(b[1]-(a||0))*c+g,(b[2]-(f||0))*l+h,(b[3]-(a||0))*c+g,(b[4]-(f||0))*l+h,(b[5]-(a||0))*c+g,(b[6]-(f||0))*l+h]):"Q"===b[0]?p.push(["Q",(b[1]-(a||0))*c+g,(b[2]-(f||0))*l+h,(b[3]-(a||0))*c+g,(b[4]-(f||0))*l+h]):"Z"===b[0]&&p.push(["Z"])});return p},setData:function(b,e,d,c){var m=this.options,l=this.chart.options.chart,
p=l&&l.map,q=m.mapData,v=this.joinBy,y=m.keys||this.pointArrayMap,n=[],x={},r=this.chart.mapTransforms;!q&&p&&(q="string"===typeof p?a.maps[p]:p);b&&b.forEach(function(e,d){var a=0;if(u(e))b[d]={value:e};else if(B(e)){b[d]={};!m.keys&&e.length>y.length&&"string"===typeof e[0]&&(b[d]["hc-key"]=e[0],++a);for(var c=0;c<y.length;++c,++a)y[c]&&"undefined"!==typeof e[a]&&(0<y[c].indexOf(".")?k.prototype.setNestedProperty(b[d],e[a],y[c]):b[d][y[c]]=e[a])}v&&"_i"===v[0]&&(b[d]._i=d)});this.getBox(b);(this.chart.mapTransforms=
r=l&&l.mapTransforms||q&&q["hc-transform"]||r)&&f(r,function(b){b.rotation&&(b.cosAngle=Math.cos(b.rotation),b.sinAngle=Math.sin(b.rotation))});if(q){"FeatureCollection"===q.type&&(this.mapTitle=q.title,q=a.geojson(q,this.type,this));this.mapData=q;this.mapMap={};for(r=0;r<q.length;r++)l=q[r],p=l.properties,l._i=r,v[0]&&p&&p[v[0]]&&(l[v[0]]=p[v[0]]),x[l[v[0]]]=l;this.mapMap=x;if(b&&v[1]){var w=v[1];b.forEach(function(b){b=A(w,b);x[b]&&n.push(x[b])})}if(m.allAreas){this.getBox(q);b=b||[];if(v[1]){var C=
v[1];b.forEach(function(b){n.push(A(C,b))})}n="|"+n.map(function(b){return b&&b[v[0]]}).join("|")+"|";q.forEach(function(e){v[0]&&-1!==n.indexOf("|"+e[v[0]]+"|")||(b.push(h(e,{value:null})),c=!1)})}else this.getBox(n)}g.prototype.setData.call(this,b,e,d,c)},drawGraph:y,drawDataLabels:y,doFullTranslate:function(){return this.isDirtyData||this.chart.isResizing||this.chart.renderer.isVML||!this.baseTrans},translate:function(){var b=this,e=b.xAxis,d=b.yAxis,a=b.doFullTranslate();b.generatePoints();b.data.forEach(function(c){u(c._midX)&&
u(c._midY)&&(c.plotX=e.toPixels(c._midX,!0),c.plotY=d.toPixels(c._midY,!0));a&&(c.shapeType="path",c.shapeArgs={d:b.translatePath(c.path)})});z(b,"afterTranslate")},pointAttribs:function(b,e){e=b.series.chart.styledMode?this.colorAttribs(b):d.column.prototype.pointAttribs.call(this,b,e);e["stroke-width"]=x(b.options[this.pointAttrToOptions&&this.pointAttrToOptions["stroke-width"]||"borderWidth"],"inherit");return e},drawPoints:function(){var b=this,e=b.xAxis,c=b.yAxis,a=b.group,g=b.chart,f=g.renderer,
l=this.baseTrans;b.transformGroup||(b.transformGroup=f.g().attr({scaleX:1,scaleY:1}).add(a),b.transformGroup.survive=!0);if(b.doFullTranslate())g.hasRendered&&!g.styledMode&&b.points.forEach(function(e){e.shapeArgs&&(e.shapeArgs.fill=b.pointAttribs(e,e.state).fill)}),b.group=b.transformGroup,d.column.prototype.drawPoints.apply(b),b.group=a,b.points.forEach(function(e){if(e.graphic){var d="";e.name&&(d+="highcharts-name-"+e.name.replace(/ /g,"-").toLowerCase());e.properties&&e.properties["hc-key"]&&
(d+=" highcharts-key-"+e.properties["hc-key"].toLowerCase());d&&e.graphic.addClass(d);g.styledMode&&e.graphic.css(b.pointAttribs(e,e.selected&&"select"||void 0))}}),this.baseTrans={originX:e.min-e.minPixelPadding/e.transA,originY:c.min-c.minPixelPadding/c.transA+(c.reversed?0:c.len/c.transA),transAX:e.transA,transAY:c.transA},this.transformGroup.animate({translateX:0,translateY:0,scaleX:1,scaleY:1});else{var h=e.transA/l.transAX;var p=c.transA/l.transAY;var q=e.toPixels(l.originX,!0);var u=c.toPixels(l.originY,
!0);.99<h&&1.01>h&&.99<p&&1.01>p&&(p=h=1,q=Math.round(q),u=Math.round(u));var y=this.transformGroup;if(g.renderer.globalAnimation){var n=y.attr("translateX");var k=y.attr("translateY");var r=y.attr("scaleX");var w=y.attr("scaleY");y.attr({animator:0}).animate({animator:1},{step:function(b,e){y.attr({translateX:n+(q-n)*e.pos,translateY:k+(u-k)*e.pos,scaleX:r+(h-r)*e.pos,scaleY:w+(p-w)*e.pos})}})}else y.attr({translateX:q,translateY:u,scaleX:h,scaleY:p})}g.styledMode||a.element.setAttribute("stroke-width",
x(b.options[b.pointAttrToOptions&&b.pointAttrToOptions["stroke-width"]||"borderWidth"],1)/(h||1));this.drawMapDataLabels()},drawMapDataLabels:function(){g.prototype.drawDataLabels.call(this);this.dataLabelsGroup&&this.dataLabelsGroup.clip(this.chart.clipRect)},render:function(){var b=this,e=g.prototype.render;b.chart.renderer.isVML&&3E3<b.data.length?setTimeout(function(){e.call(b)}):e.call(b)},animate:function(b){var e=this.options.animation,d=this.group,c=this.xAxis,a=this.yAxis,g=c.pos,f=a.pos;
this.chart.renderer.isSVG&&(!0===e&&(e={duration:1E3}),b?d.attr({translateX:g+c.len/2,translateY:f+a.len/2,scaleX:.001,scaleY:.001}):d.animate({translateX:g,translateY:f,scaleX:1,scaleY:1},e))},animateDrilldown:function(b){var e=this.chart.plotBox,d=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],c=d.bBox,a=this.chart.options.drilldown.animation;b||(b=Math.min(c.width/e.width,c.height/e.height),d.shapeArgs={scaleX:b,scaleY:b,translateX:c.x,translateY:c.y},this.points.forEach(function(b){b.graphic&&
b.graphic.attr(d.shapeArgs).animate({scaleX:1,scaleY:1,translateX:0,translateY:0},a)}))},drawLegendSymbol:r.drawRectangle,animateDrillupFrom:function(b){d.column.prototype.animateDrillupFrom.call(this,b)},animateDrillupTo:function(b){d.column.prototype.animateDrillupTo.call(this,b)}}),w({applyOptions:function(b,e){var d=this.series;b=k.prototype.applyOptions.call(this,b,e);e=d.joinBy;d.mapData&&d.mapMap&&(e=k.prototype.getNestedProperty.call(b,e[1]),(e="undefined"!==typeof e&&d.mapMap[e])?(d.xyFromShape&&
(b.x=e._midX,b.y=e._midY),w(b,e)):b.value=b.value||null);return b},onMouseOver:function(b){c.clearTimeout(this.colorInterval);if(null!==this.value||this.series.options.nullInteraction)k.prototype.onMouseOver.call(this,b);else this.series.onMouseOut(b)},zoomTo:function(){var b=this.series;b.xAxis.setExtremes(this._minX,this._maxX,!1);b.yAxis.setExtremes(this._minY,this._maxY,!1);b.chart.redraw()}},p));""});z(a,"Series/MapLineSeries.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,r){r=
r.seriesType;var k=a.seriesTypes;r("mapline","map",{lineWidth:1,fillColor:"none"},{type:"mapline",colorProp:"stroke",pointAttrToOptions:{stroke:"color","stroke-width":"lineWidth"},pointAttribs:function(a,c){a=k.map.prototype.pointAttribs.call(this,a,c);a.fill=this.options.fillColor;return a},drawLegendSymbol:k.line.prototype.drawLegendSymbol});""});z(a,"Series/MapPointSeries.js",[a["Core/Globals.js"]],function(a){var r=a.merge,k=a.Point,n=a.Series;a=a.seriesType;a("mappoint","scatter",{dataLabels:{crop:!1,
defer:!1,enabled:!0,formatter:function(){return this.point.name},overflow:!1,style:{color:"#000000"}}},{type:"mappoint",forceDL:!0,drawDataLabels:function(){n.prototype.drawDataLabels.call(this);this.dataLabelsGroup&&this.dataLabelsGroup.clip(this.chart.clipRect)}},{applyOptions:function(c,a){c="undefined"!==typeof c.lat&&"undefined"!==typeof c.lon?r(c,this.series.chart.fromLatLonToPoint(c)):c;return k.prototype.applyOptions.call(this,c,a)}});""});z(a,"Series/Bubble/BubbleLegend.js",[a["Core/Chart/Chart.js"],
a["Core/Color.js"],a["Core/Globals.js"],a["Core/Legend.js"],a["Core/Utilities.js"]],function(a,r,k,n,c){var w=r.parse;r=c.addEvent;var z=c.arrayMax,A=c.arrayMin,B=c.isNumber,u=c.merge,h=c.objectEach,f=c.pick,x=c.setOptions,l=c.stableSort,q=c.wrap;"";var p=k.Series,y=k.noop;x({legend:{bubbleLegend:{borderColor:void 0,borderWidth:2,className:void 0,color:void 0,connectorClassName:void 0,connectorColor:void 0,connectorDistance:60,connectorWidth:1,enabled:!1,labels:{className:void 0,allowOverlap:!1,format:"",
formatter:void 0,align:"right",style:{fontSize:10,color:void 0},x:0,y:0},maxSize:60,minSize:10,legendIndex:0,ranges:{value:void 0,borderColor:void 0,color:void 0,connectorColor:void 0},sizeBy:"area",sizeByAbsoluteValue:!1,zIndex:1,zThreshold:0}}});x=function(){function a(d,b){this.options=this.symbols=this.visible=this.ranges=this.movementX=this.maxLabel=this.legendSymbol=this.legendItemWidth=this.legendItemHeight=this.legendItem=this.legendGroup=this.legend=this.fontMetrics=this.chart=void 0;this.setState=
y;this.init(d,b)}a.prototype.init=function(d,b){this.options=d;this.visible=!0;this.chart=b.chart;this.legend=b};a.prototype.addToLegend=function(d){d.splice(this.options.legendIndex,0,this)};a.prototype.drawLegendSymbol=function(d){var b=this.chart,e=this.options,a=f(d.options.itemDistance,20),c=e.ranges;var g=e.connectorDistance;this.fontMetrics=b.renderer.fontMetrics(e.labels.style.fontSize.toString()+"px");c&&c.length&&B(c[0].value)?(l(c,function(b,e){return e.value-b.value}),this.ranges=c,this.setOptions(),
this.render(),b=this.getMaxLabelSize(),c=this.ranges[0].radius,d=2*c,g=g-c+b.width,g=0<g?g:0,this.maxLabel=b,this.movementX="left"===e.labels.align?g:0,this.legendItemWidth=d+g+a,this.legendItemHeight=d+this.fontMetrics.h/2):d.options.bubbleLegend.autoRanges=!0};a.prototype.setOptions=function(){var d=this.ranges,b=this.options,e=this.chart.series[b.seriesIndex],a=this.legend.baseline,c={"z-index":b.zIndex,"stroke-width":b.borderWidth},g={"z-index":b.zIndex,"stroke-width":b.connectorWidth},l=this.getLabelStyles(),
h=e.options.marker.fillOpacity,p=this.chart.styledMode;d.forEach(function(m,q){p||(c.stroke=f(m.borderColor,b.borderColor,e.color),c.fill=f(m.color,b.color,1!==h?w(e.color).setOpacity(h).get("rgba"):e.color),g.stroke=f(m.connectorColor,b.connectorColor,e.color));d[q].radius=this.getRangeRadius(m.value);d[q]=u(d[q],{center:d[0].radius-d[q].radius+a});p||u(!0,d[q],{bubbleStyle:u(!1,c),connectorStyle:u(!1,g),labelStyle:l})},this)};a.prototype.getLabelStyles=function(){var d=this.options,b={},e="left"===
d.labels.align,a=this.legend.options.rtl;h(d.labels.style,function(e,d){"color"!==d&&"fontSize"!==d&&"z-index"!==d&&(b[d]=e)});return u(!1,b,{"font-size":d.labels.style.fontSize,fill:f(d.labels.style.color,"#000000"),"z-index":d.zIndex,align:a||e?"right":"left"})};a.prototype.getRangeRadius=function(d){var b=this.options;return this.chart.series[this.options.seriesIndex].getRadius.call(this,b.ranges[b.ranges.length-1].value,b.ranges[0].value,b.minSize,b.maxSize,d)};a.prototype.render=function(){var d=
this.chart.renderer,b=this.options.zThreshold;this.symbols||(this.symbols={connectors:[],bubbleItems:[],labels:[]});this.legendSymbol=d.g("bubble-legend");this.legendItem=d.g("bubble-legend-item");this.legendSymbol.translateX=0;this.legendSymbol.translateY=0;this.ranges.forEach(function(e){e.value>=b&&this.renderRange(e)},this);this.legendSymbol.add(this.legendItem);this.legendItem.add(this.legendGroup);this.hideOverlappingLabels()};a.prototype.renderRange=function(d){var b=this.options,e=b.labels,
a=this.chart.renderer,c=this.symbols,g=c.labels,f=d.center,l=Math.abs(d.radius),h=b.connectorDistance||0,p=e.align,q=e.style.fontSize;h=this.legend.options.rtl||"left"===p?-h:h;e=b.connectorWidth;var u=this.ranges[0].radius||0,y=f-l-b.borderWidth/2+e/2;q=q/2-(this.fontMetrics.h-q)/2;var k=a.styledMode;"center"===p&&(h=0,b.connectorDistance=0,d.labelStyle.align="center");p=y+b.labels.y;var n=u+h+b.labels.x;c.bubbleItems.push(a.circle(u,f+((y%1?1:.5)-(e%2?0:.5)),l).attr(k?{}:d.bubbleStyle).addClass((k?
"highcharts-color-"+this.options.seriesIndex+" ":"")+"highcharts-bubble-legend-symbol "+(b.className||"")).add(this.legendSymbol));c.connectors.push(a.path(a.crispLine([["M",u,y],["L",u+h,y]],b.connectorWidth)).attr(k?{}:d.connectorStyle).addClass((k?"highcharts-color-"+this.options.seriesIndex+" ":"")+"highcharts-bubble-legend-connectors "+(b.connectorClassName||"")).add(this.legendSymbol));d=a.text(this.formatLabel(d),n,p+q).attr(k?{}:d.labelStyle).addClass("highcharts-bubble-legend-labels "+(b.labels.className||
"")).add(this.legendSymbol);g.push(d);d.placed=!0;d.alignAttr={x:n,y:p+q}};a.prototype.getMaxLabelSize=function(){var d,b;this.symbols.labels.forEach(function(e){b=e.getBBox(!0);d=d?b.width>d.width?b:d:b});return d||{}};a.prototype.formatLabel=function(d){var b=this.options,e=b.labels.formatter;b=b.labels.format;var a=this.chart.numberFormatter;return b?c.format(b,d):e?e.call(d):a(d.value,1)};a.prototype.hideOverlappingLabels=function(){var d=this.chart,b=this.symbols;!this.options.labels.allowOverlap&&
b&&(d.hideOverlappingLabels(b.labels),b.labels.forEach(function(e,d){e.newOpacity?e.newOpacity!==e.oldOpacity&&b.connectors[d].show():b.connectors[d].hide()}))};a.prototype.getRanges=function(){var d=this.legend.bubbleLegend,b=d.options.ranges,e,a=Number.MAX_VALUE,c=-Number.MAX_VALUE;d.chart.series.forEach(function(b){b.isBubble&&!b.ignoreSeries&&(e=b.zData.filter(B),e.length&&(a=f(b.options.zMin,Math.min(a,Math.max(A(e),!1===b.options.displayNegative?b.options.zThreshold:-Number.MAX_VALUE))),c=f(b.options.zMax,
Math.max(c,z(e)))))});var g=a===c?[{value:c}]:[{value:a},{value:(a+c)/2},{value:c,autoRanges:!0}];b.length&&b[0].radius&&g.reverse();g.forEach(function(e,d){b&&b[d]&&(g[d]=u(!1,b[d],e))});return g};a.prototype.predictBubbleSizes=function(){var d=this.chart,b=this.fontMetrics,e=d.legend.options,a="horizontal"===e.layout,c=a?d.legend.lastLineHeight:0,g=d.plotSizeX,f=d.plotSizeY,l=d.series[this.options.seriesIndex];d=Math.ceil(l.minPxSize);var h=Math.ceil(l.maxPxSize);l=l.options.maxSize;var p=Math.min(f,
g);if(e.floating||!/%$/.test(l))b=h;else if(l=parseFloat(l),b=(p+c-b.h/2)*l/100/(l/100+1),a&&f-b>=g||!a&&g-b>=f)b=h;return[d,Math.ceil(b)]};a.prototype.updateRanges=function(d,b){var e=this.legend.options.bubbleLegend;e.minSize=d;e.maxSize=b;e.ranges=this.getRanges()};a.prototype.correctSizes=function(){var d=this.legend,b=this.chart.series[this.options.seriesIndex];1<Math.abs(Math.ceil(b.maxPxSize)-this.options.maxSize)&&(this.updateRanges(this.options.minSize,b.maxPxSize),d.render())};return a}();
r(n,"afterGetAllItems",function(a){var d=this.bubbleLegend,b=this.options,e=b.bubbleLegend,c=this.chart.getVisibleBubbleSeriesIndex();d&&d.ranges&&d.ranges.length&&(e.ranges.length&&(e.autoRanges=!!e.ranges[0].autoRanges),this.destroyItem(d));0<=c&&b.enabled&&e.enabled&&(e.seriesIndex=c,this.bubbleLegend=new k.BubbleLegend(e,this),this.bubbleLegend.addToLegend(a.allItems))});a.prototype.getVisibleBubbleSeriesIndex=function(){for(var a=this.series,d=0;d<a.length;){if(a[d]&&a[d].isBubble&&a[d].visible&&
a[d].zData.length)return d;d++}return-1};n.prototype.getLinesHeights=function(){var a=this.allItems,d=[],b=a.length,e,c=0;for(e=0;e<b;e++)if(a[e].legendItemHeight&&(a[e].itemHeight=a[e].legendItemHeight),a[e]===a[b-1]||a[e+1]&&a[e]._legendItemPos[1]!==a[e+1]._legendItemPos[1]){d.push({height:0});var f=d[d.length-1];for(c;c<=e;c++)a[c].itemHeight>f.height&&(f.height=a[c].itemHeight);f.step=e}return d};n.prototype.retranslateItems=function(a){var d,b,e,c=this.options.rtl,f=0;this.allItems.forEach(function(g,
l){d=g.legendGroup.translateX;b=g._legendItemPos[1];if((e=g.movementX)||c&&g.ranges)e=c?d-g.options.maxSize/2:d+e,g.legendGroup.attr({translateX:e});l>a[f].step&&f++;g.legendGroup.attr({translateY:Math.round(b+a[f].height/2)});g._legendItemPos[1]=b+a[f].height/2})};r(p,"legendItemClick",function(){var a=this.chart,d=this.visible,b=this.chart.legend;b&&b.bubbleLegend&&(this.visible=!d,this.ignoreSeries=d,a=0<=a.getVisibleBubbleSeriesIndex(),b.bubbleLegend.visible!==a&&(b.update({bubbleLegend:{enabled:a}}),
b.bubbleLegend.visible=a),this.visible=d)});q(a.prototype,"drawChartBox",function(a,d,b){var e=this.legend,c=0<=this.getVisibleBubbleSeriesIndex();if(e&&e.options.enabled&&e.bubbleLegend&&e.options.bubbleLegend.autoRanges&&c){var f=e.bubbleLegend.options;c=e.bubbleLegend.predictBubbleSizes();e.bubbleLegend.updateRanges(c[0],c[1]);f.placed||(e.group.placed=!1,e.allItems.forEach(function(b){b.legendGroup.translateY=null}));e.render();this.getMargins();this.axes.forEach(function(b){b.visible&&b.render();
f.placed||(b.setScale(),b.updateNames(),h(b.ticks,function(b){b.isNew=!0;b.isNewLabel=!0}))});f.placed=!0;this.getMargins();a.call(this,d,b);e.bubbleLegend.correctSizes();e.retranslateItems(e.getLinesHeights())}else a.call(this,d,b),e&&e.options.enabled&&e.bubbleLegend&&(e.render(),e.retranslateItems(e.getLinesHeights()))});k.BubbleLegend=x;return k.BubbleLegend});z(a,"Series/Bubble/BubbleSeries.js",[a["Core/Globals.js"],a["Core/Color.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],function(a,
r,k,n){var c=r.parse,w=n.arrayMax,z=n.arrayMin,A=n.clamp,B=n.extend,u=n.isNumber,h=n.pick,f=n.pInt;r=n.seriesType;n=a.Axis;var x=a.noop,l=a.Series,q=a.seriesTypes;r("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},animationLimit:250,marker:{lineColor:null,lineWidth:1,fillOpacity:.5,radius:null,states:{hover:{radiusPlus:0}},symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},
turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,isBubble:!0,pointAttribs:function(a,f){var g=this.options.marker.fillOpacity;a=l.prototype.pointAttribs.call(this,a,f);1!==g&&(a.fill=c(a.fill).setOpacity(g).get("rgba"));return a},getRadii:function(a,c,f){var d=this.zData,b=this.yData,e=f.minPxSize,g=f.maxPxSize,l=[];var h=0;for(f=d.length;h<f;h++){var p=
d[h];l.push(this.getRadius(a,c,e,g,p,b[h]))}this.radii=l},getRadius:function(a,c,f,d,b,e){var g=this.options,l="width"!==g.sizeBy,h=g.zThreshold,p=c-a,q=.5;if(null===e||null===b)return null;if(u(b)){g.sizeByAbsoluteValue&&(b=Math.abs(b-h),p=Math.max(c-h,Math.abs(a-h)),a=0);if(b<a)return f/2-1;0<p&&(q=(b-a)/p)}l&&0<=q&&(q=Math.sqrt(q));return Math.ceil(f+q*(d-f))/2},animate:function(a){!a&&this.points.length<this.options.animationLimit&&this.points.forEach(function(a){var c=a.graphic;c&&c.width&&(this.hasRendered||
c.attr({x:a.plotX,y:a.plotY,width:1,height:1}),c.animate(this.markerAttribs(a),this.options.animation))},this)},hasData:function(){return!!this.processedXData.length},translate:function(){var a,c=this.data,f=this.radii;q.scatter.prototype.translate.call(this);for(a=c.length;a--;){var d=c[a];var b=f?f[a]:0;u(b)&&b>=this.minPxSize/2?(d.marker=B(d.marker,{radius:b,width:2*b,height:2*b}),d.dlBox={x:d.plotX-b,y:d.plotY-b,width:2*b,height:2*b}):d.shapeArgs=d.plotY=d.dlBox=void 0}},alignDataLabel:q.column.prototype.alignDataLabel,
buildKDTree:x,applyZones:x},{haloPath:function(a){return k.prototype.haloPath.call(this,0===a?0:(this.marker?this.marker.radius||0:0)+a)},ttBelow:!1});n.prototype.beforePadding=function(){var a=this,c=this.len,g=this.chart,d=0,b=c,e=this.isXAxis,l=e?"xData":"yData",q=this.min,k={},n=Math.min(g.plotWidth,g.plotHeight),x=Number.MAX_VALUE,r=-Number.MAX_VALUE,C=this.max-q,B=c/C,D=[];this.series.forEach(function(b){var d=b.options;!b.bubblePadding||!b.visible&&g.options.chart.ignoreHiddenSeries||(a.allowZoomOutside=
!0,D.push(b),e&&(["minSize","maxSize"].forEach(function(b){var a=d[b],e=/%$/.test(a);a=f(a);k[b]=e?n*a/100:a}),b.minPxSize=k.minSize,b.maxPxSize=Math.max(k.maxSize,k.minSize),b=b.zData.filter(u),b.length&&(x=h(d.zMin,A(z(b),!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE,x)),r=h(d.zMax,Math.max(r,w(b))))))});D.forEach(function(c){var f=c[l],g=f.length;e&&c.getRadii(x,r,c);if(0<C)for(;g--;)if(u(f[g])&&a.dataMin<=f[g]&&f[g]<=a.max){var h=c.radii?c.radii[g]:0;d=Math.min((f[g]-q)*B-h,d);b=Math.max((f[g]-
q)*B+h,b)}});D.length&&0<C&&!this.logarithmic&&(b-=c,B*=(c+Math.max(0,d)-Math.min(b,c))/c,[["min","userMin",d],["max","userMax",b]].forEach(function(b){"undefined"===typeof h(a.options[b[0]],a[b[1]])&&(a[b[0]]+=b[2]/B)}))};""});z(a,"Series/MapBubbleSeries.js",[a["Core/Globals.js"],a["Core/Series/Point.js"],a["Core/Utilities.js"]],function(a,r,k){var n=k.merge;k=k.seriesType;var c=a.seriesTypes;c.bubble&&k("mapbubble","bubble",{animationLimit:500,tooltip:{pointFormat:"{point.name}: {point.z}"}},{xyFromShape:!0,
type:"mapbubble",pointArrayMap:["z"],getMapData:c.map.prototype.getMapData,getBox:c.map.prototype.getBox,setData:c.map.prototype.setData,setOptions:c.map.prototype.setOptions},{applyOptions:function(a,k){return a&&"undefined"!==typeof a.lat&&"undefined"!==typeof a.lon?r.prototype.applyOptions.call(this,n(a,this.series.chart.fromLatLonToPoint(a)),k):c.map.prototype.pointClass.prototype.applyOptions.call(this,a,k)},isValid:function(){return"number"===typeof this.z},ttBelow:!1});""});z(a,"Series/HeatmapSeries.js",
[a["Core/Globals.js"],a["Mixins/LegendSymbol.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Utilities.js"]],function(a,r,k,n){var c=n.clamp,w=n.extend,z=n.fireEvent,A=n.isNumber,B=n.merge,u=n.pick;n=n.seriesType;"";var h=a.colorMapPointMixin,f=a.Series,x=k.prototype.symbols;n("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:{symbol:"rect",radius:0,
lineColor:void 0,states:{hover:{lineWidthPlus:0},select:{}}},clip:!0,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}<br/>"},states:{hover:{halo:!1,brightness:.2}}},B(a.colorMapSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){f.prototype.init.apply(this,arguments);var a=this.options;a.pointRange=u(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=a.rowsize||1;w(x,{ellipse:x.circle,rect:x.square})},
getSymbol:f.prototype.getSymbol,setClip:function(a){var c=this.chart;f.prototype.setClip.apply(this,arguments);(!1!==this.options.clip||a)&&this.markerGroup.clip((a||this.clipBox)&&this.sharedClipKey?c[this.sharedClipKey]:c.clipRect)},translate:function(){var a=this.options,c=a.marker&&a.marker.symbol||"",f=x[c]?c:"rect";a=this.options;var h=-1!==["circle","square"].indexOf(f);this.generatePoints();this.points.forEach(function(a){var d=a.getCellAttributes(),b={x:Math.min(d.x1,d.x2),y:Math.min(d.y1,
d.y2),width:Math.max(Math.abs(d.x2-d.x1),0),height:Math.max(Math.abs(d.y2-d.y1),0)};var e=a.hasImage=0===(a.marker&&a.marker.symbol||c||"").indexOf("url");if(h){var g=Math.abs(b.width-b.height);b.x=Math.min(d.x1,d.x2)+(b.width<b.height?0:g/2);b.y=Math.min(d.y1,d.y2)+(b.width<b.height?g/2:0);b.width=b.height=Math.min(b.width,b.height)}g={plotX:(d.x1+d.x2)/2,plotY:(d.y1+d.y2)/2,clientX:(d.x1+d.x2)/2,shapeType:"path",shapeArgs:B(!0,b,{d:x[f](b.x,b.y,b.width,b.height)})};e&&(a.marker={width:b.width,height:b.height});
w(a,g)});z(this,"afterTranslate")},pointAttribs:function(c,h){var l=f.prototype.pointAttribs.call(this,c,h),q=this.options||{},g=this.chart.options.plotOptions||{},d=g.series||{},b=g.heatmap||{};g=q.borderColor||b.borderColor||d.borderColor;d=q.borderWidth||b.borderWidth||d.borderWidth||l["stroke-width"];l.stroke=c&&c.marker&&c.marker.lineColor||q.marker&&q.marker.lineColor||g||this.color;l["stroke-width"]=d;h&&(c=B(q.states[h],q.marker&&q.marker.states[h],c.options.states&&c.options.states[h]||{}),
h=c.brightness,l.fill=c.color||a.color(l.fill).brighten(h||0).get(),l.stroke=c.lineColor);return l},markerAttribs:function(a,c){var f=a.marker||{},h=this.options.marker||{},g=a.shapeArgs||{},d={};if(a.hasImage)return{x:a.plotX,y:a.plotY};if(c){var b=h.states[c]||{};var e=f.states&&f.states[c]||{};[["width","x"],["height","y"]].forEach(function(a){d[a[0]]=(e[a[0]]||b[a[0]]||g[a[0]])+(e[a[0]+"Plus"]||b[a[0]+"Plus"]||0);d[a[1]]=g[a[1]]+(g[a[0]]-d[a[0]])/2})}return c?d:g},drawPoints:function(){var a=
this;if((this.options.marker||{}).enabled||this._hasPointMarkers)f.prototype.drawPoints.call(this),this.points.forEach(function(c){c.graphic&&c.graphic[a.chart.styledMode?"css":"animate"](a.colorAttribs(c))})},hasData:function(){return!!this.processedXData.length},getValidPoints:function(a,c){return f.prototype.getValidPoints.call(this,a,c,!0)},getBox:a.noop,drawLegendSymbol:r.drawRectangle,alignDataLabel:a.seriesTypes.column.prototype.alignDataLabel,getExtremes:function(){var a=f.prototype.getExtremes.call(this,
this.valueData),c=a.dataMin;a=a.dataMax;A(c)&&(this.valueMin=c);A(a)&&(this.valueMax=a);return f.prototype.getExtremes.call(this)}}),B(h,{applyOptions:function(c,f){c=a.Point.prototype.applyOptions.call(this,c,f);c.formatPrefix=c.isNull||null===c.value?"null":"point";return c},isValid:function(){return Infinity!==this.value&&-Infinity!==this.value},haloPath:function(a){if(!a)return[];var c=this.shapeArgs;return["M",c.x-a,c.y-a,"L",c.x-a,c.y+c.height+a,c.x+c.width+a,c.y+c.height+a,c.x+c.width+a,c.y-
a,"Z"]},getCellAttributes:function(){var a=this.series,f=a.options,h=(f.colsize||1)/2,k=(f.rowsize||1)/2,g=a.xAxis,d=a.yAxis,b=this.options.marker||a.options.marker;a=a.pointPlacementToXValue();var e=u(this.pointPadding,f.pointPadding,0),m={x1:c(Math.round(g.len-(g.translate(this.x-h,!1,!0,!1,!0,-a)||0)),-g.len,2*g.len),x2:c(Math.round(g.len-(g.translate(this.x+h,!1,!0,!1,!0,-a)||0)),-g.len,2*g.len),y1:c(Math.round(d.translate(this.y-k,!1,!0,!1,!0)||0),-d.len,2*d.len),y2:c(Math.round(d.translate(this.y+
k,!1,!0,!1,!0)||0),-d.len,2*d.len)};[["width","x"],["height","y"]].forEach(function(a){var c=a[0];a=a[1];var d=a+"1",f=a+"2",g=Math.abs(m[d]-m[f]),h=b&&b.lineWidth||0,l=Math.abs(m[d]+m[f])/2;b[c]&&b[c]<g&&(m[d]=l-b[c]/2-h/2,m[f]=l+b[c]/2+h/2);e&&("y"===a&&(d=f,f=a+"1"),m[d]+=e,m[f]-=e)});return m}}));""});z(a,"Extensions/GeoJSON.js",[a["Core/Chart/Chart.js"],a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,r,k){function n(a,c){var f,h=!1,l=a.x,q=a.y;a=0;for(f=c.length-1;a<c.length;f=a++){var p=
c[a][1]>q;var k=c[f][1]>q;p!==k&&l<(c[f][0]-c[a][0])*(q-c[a][1])/(c[f][1]-c[a][1])+c[a][0]&&(h=!h)}return h}var c=r.win,w=k.error,z=k.extend,A=k.format,B=k.merge;k=k.wrap;"";a.prototype.transformFromLatLon=function(a,h){var f,k=(null===(f=this.userOptions.chart)||void 0===f?void 0:f.proj4)||c.proj4;if(!k)return w(21,!1,this),{x:0,y:null};a=k(h.crs,[a.lon,a.lat]);f=h.cosAngle||h.rotation&&Math.cos(h.rotation);k=h.sinAngle||h.rotation&&Math.sin(h.rotation);a=h.rotation?[a[0]*f+a[1]*k,-a[0]*k+a[1]*f]:
a;return{x:((a[0]-(h.xoffset||0))*(h.scale||1)+(h.xpan||0))*(h.jsonres||1)+(h.jsonmarginX||0),y:(((h.yoffset||0)-a[1])*(h.scale||1)+(h.ypan||0))*(h.jsonres||1)-(h.jsonmarginY||0)}};a.prototype.transformToLatLon=function(a,h){if("undefined"===typeof c.proj4)w(21,!1,this);else{a={x:((a.x-(h.jsonmarginX||0))/(h.jsonres||1)-(h.xpan||0))/(h.scale||1)+(h.xoffset||0),y:((-a.y-(h.jsonmarginY||0))/(h.jsonres||1)+(h.ypan||0))/(h.scale||1)+(h.yoffset||0)};var f=h.cosAngle||h.rotation&&Math.cos(h.rotation),k=
h.sinAngle||h.rotation&&Math.sin(h.rotation);h=c.proj4(h.crs,"WGS84",h.rotation?{x:a.x*f+a.y*-k,y:a.x*k+a.y*f}:a);return{lat:h.y,lon:h.x}}};a.prototype.fromPointToLatLon=function(a){var c=this.mapTransforms,f;if(c){for(f in c)if(Object.hasOwnProperty.call(c,f)&&c[f].hitZone&&n({x:a.x,y:-a.y},c[f].hitZone.coordinates[0]))return this.transformToLatLon(a,c[f]);return this.transformToLatLon(a,c["default"])}w(22,!1,this)};a.prototype.fromLatLonToPoint=function(a){var c=this.mapTransforms,f;if(!c)return w(22,
!1,this),{x:0,y:null};for(f in c)if(Object.hasOwnProperty.call(c,f)&&c[f].hitZone){var k=this.transformFromLatLon(a,c[f]);if(n({x:k.x,y:-k.y},c[f].hitZone.coordinates[0]))return k}return this.transformFromLatLon(a,c["default"])};r.geojson=function(a,c,f){var h=[],l=[],k=function(a){a.forEach(function(a,c){0===c?l.push(["M",a[0],-a[1]]):l.push(["L",a[0],-a[1]])})};c=c||"map";a.features.forEach(function(a){var f=a.geometry,g=f.type;f=f.coordinates;a=a.properties;var d;l=[];"map"===c||"mapbubble"===
c?("Polygon"===g?(f.forEach(k),l.push(["Z"])):"MultiPolygon"===g&&(f.forEach(function(a){a.forEach(k)}),l.push(["Z"])),l.length&&(d={path:l})):"mapline"===c?("LineString"===g?k(f):"MultiLineString"===g&&f.forEach(k),l.length&&(d={path:l})):"mappoint"===c&&"Point"===g&&(d={x:f[0],y:-f[1]});d&&h.push(z(d,{name:a.name||a.NAME,properties:a}))});f&&a.copyrightShort&&(f.chart.mapCredits=A(f.chart.options.credits.mapText,{geojson:a}),f.chart.mapCreditsFull=A(f.chart.options.credits.mapTextFull,{geojson:a}));
return h};k(a.prototype,"addCredits",function(a,c){c=B(!0,this.options.credits,c);this.mapCredits&&(c.href=null);a.call(this,c);this.credits&&this.mapCreditsFull&&this.credits.attr({title:this.mapCreditsFull})})});z(a,"Maps/Map.js",[a["Core/Chart/Chart.js"],a["Core/Globals.js"],a["Core/Options.js"],a["Core/Renderer/SVG/SVGRenderer.js"],a["Core/Utilities.js"]],function(a,r,k,n,c){function w(a,c,h,k,p,n,g,d){return[["M",a+p,c],["L",a+h-n,c],["C",a+h-n/2,c,a+h,c+n/2,a+h,c+n],["L",a+h,c+k-g],["C",a+h,
c+k-g/2,a+h-g/2,c+k,a+h-g,c+k],["L",a+d,c+k],["C",a+d/2,c+k,a,c+k-d/2,a,c+k-d],["L",a,c+p],["C",a,c+p/2,a+p/2,c,a+p,c],["Z"]]}k=k.defaultOptions;var z=c.extend,A=c.getOptions,B=c.merge,u=c.pick;c=r.Renderer;var h=r.VMLRenderer;z(k.lang,{zoomIn:"Zoom in",zoomOut:"Zoom out"});k.mapNavigation={buttonOptions:{alignTo:"plotBox",align:"left",verticalAlign:"top",x:0,width:18,height:18,padding:5,style:{fontSize:"15px",fontWeight:"bold"},theme:{"stroke-width":1,"text-align":"center"}},buttons:{zoomIn:{onclick:function(){this.mapZoom(.5)},
text:"+",y:0},zoomOut:{onclick:function(){this.mapZoom(2)},text:"-",y:28}},mouseWheelSensitivity:1.1};r.splitPath=function(a){"string"===typeof a&&(a=a.replace(/([A-Za-z])/g," $1 ").replace(/^\s*/,"").replace(/\s*$/,""),a=a.split(/[ ,;]+/).map(function(a){return/[A-za-z]/.test(a)?a:parseFloat(a)}));return n.prototype.pathToSegments(a)};r.maps={};n.prototype.symbols.topbutton=function(a,c,h,k,p){p=p&&p.r||0;return w(a-1,c-1,h,k,p,p,0,0)};n.prototype.symbols.bottombutton=function(a,c,h,k,p){p=p&&p.r||
0;return w(a-1,c-1,h,k,0,0,p,p)};c===h&&["topbutton","bottombutton"].forEach(function(a){h.prototype.symbols[a]=n.prototype.symbols[a]});r.Map=r.mapChart=function(c,h,k){var f="string"===typeof c||c.nodeName,l=arguments[f?1:0],n=l,g={endOnTick:!1,visible:!1,minPadding:0,maxPadding:0,startOnTick:!1},d=A().credits;var b=l.series;l.series=null;l=B({chart:{panning:{enabled:!0,type:"xy"},type:"map"},credits:{mapText:u(d.mapText,' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'),mapTextFull:u(d.mapTextFull,
"{geojson.copyright}")},tooltip:{followTouchMove:!1},xAxis:g,yAxis:B(g,{reversed:!0})},l,{chart:{inverted:!1,alignTicks:!1}});l.series=n.series=b;return f?new a(c,l,k):new a(l,h)}});z(a,"masters/modules/map.src.js",[],function(){})});






Highcharts.maps["countries/ir/ir-all"] = {
  "title": "Iran",
  "version": "1.1.2",
  "type": "FeatureCollection",
  "copyright": "Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth",
  "copyrightShort": "Natural Earth",
  "copyrightUrl": "http://www.naturalearthdata.com",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:EPSG:2057"
    }
  },
  "hc-transform": {
    "default": {
      "crs": "+proj=omerc +lat_0=27.51882880555555 +lonc=52.60353916666667 +alpha=0.5716611944444444 +k=0.999895934 +x_0=658377.437 +y_0=3044969.194 +gamma=0.5716611944444444 +ellps=intl +towgs84=-133.63,-157.5,-158.62,0,0,0,0 +units=m +no_defs",
      "scale": 0.000387972585583,
      "jsonres": 15.5,
      "jsonmarginX": -999,
      "jsonmarginY": 9851.0,
      "xoffset": -79833.1948915,
      "yoffset": 4434537.22097
    }
  },
  "features": [
    {
      "type": "Feature",
      "id": "IR.5428",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.52,
        "hc-middle-y": 0.47,
        "hc-key": "ir-5428",
        "hc-a2": "NU",
        "labelrank": "20",
        "hasc": "-99",
        "alt-name": null,
        "woe-id": "-99",
        "subregion": null,
        "fips": null,
        "postal-code": null,
        "name": null,
        "country": "Iran",
        "type-en": null,
        "region": null,
        "longitude": "55.3044",
        "woe-name": null,
        "latitude": "26.2642",
        "woe-label": null,
        "type": null
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1392,
              3516
            ],
            [
              1396,
              3491
            ],
            [
              1364,
              3493
            ],
            [
              1366,
              3514
            ],
            [
              1392,
              3516
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.HG",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.54,
        "hc-middle-y": 0.37,
        "hc-key": "ir-hg",
        "hc-a2": "HG",
        "labelrank": "4",
        "hasc": "IR.HG",
        "alt-name": "Banader va Jazayer-e Bahr-e Oman|Ports and Islands of the Sea of Oman|Saheli",
        "woe-id": "2345776",
        "subregion": null,
        "fips": "IR11",
        "postal-code": "HG",
        "name": "هرمزگان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "56.2505",
        "woe-name": "Hormozgan",
        "latitude": "27.6455",
        "woe-label": "Hormozgan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                4306,
                817
              ],
              [
                4251,
                816
              ],
              [
                4219,
                845
              ],
              [
                4297,
                855
              ],
              [
                4306,
                817
              ]
            ]
          ],
          [
            [
              [
                3906,
                1020
              ],
              [
                3810,
                1017
              ],
              [
                3784,
                1055
              ],
              [
                3879,
                1037
              ],
              [
                3906,
                1020
              ]
            ]
          ],
          [
            [
              [
                5572,
                1118
              ],
              [
                5520,
                1035
              ],
              [
                5442,
                974
              ],
              [
                5399,
                1004
              ],
              [
                5297,
                969
              ],
              [
                5177,
                900
              ],
              [
                5055,
                863
              ],
              [
                5045,
                940
              ],
              [
                5086,
                933
              ],
              [
                5336,
                1038
              ],
              [
                5324,
                1143
              ],
              [
                5408,
                1113
              ],
              [
                5493,
                1162
              ],
              [
                5571,
                1182
              ],
              [
                5641,
                1152
              ],
              [
                5572,
                1118
              ]
            ]
          ],
          [
            [
              [
                7467,
                205
              ],
              [
                7330,
                180
              ],
              [
                7265,
                251
              ],
              [
                7197,
                281
              ],
              [
                6956,
                302
              ],
              [
                6808,
                251
              ],
              [
                6732,
                268
              ],
              [
                6678,
                345
              ],
              [
                6564,
                302
              ],
              [
                6538,
                376
              ],
              [
                6409,
                368
              ],
              [
                6291,
                386
              ],
              [
                6242,
                506
              ],
              [
                6186,
                595
              ],
              [
                6213,
                644
              ],
              [
                6163,
                707
              ],
              [
                6124,
                828
              ],
              [
                6128,
                943
              ],
              [
                6084,
                1097
              ],
              [
                5972,
                1219
              ],
              [
                5995,
                1240
              ],
              [
                5948,
                1285
              ],
              [
                5813,
                1289
              ],
              [
                5675,
                1318
              ],
              [
                5539,
                1286
              ],
              [
                5431,
                1194
              ],
              [
                5280,
                1174
              ],
              [
                5235,
                1140
              ],
              [
                5205,
                1044
              ],
              [
                5163,
                1014
              ],
              [
                5035,
                1028
              ],
              [
                4997,
                983
              ],
              [
                4936,
                965
              ],
              [
                4758,
                827
              ],
              [
                4649,
                832
              ],
              [
                4613,
                882
              ],
              [
                4510,
                894
              ],
              [
                4460,
                967
              ],
              [
                4366,
                961
              ],
              [
                4273,
                985
              ],
              [
                4169,
                954
              ],
              [
                4106,
                959
              ],
              [
                3971,
                1055
              ],
              [
                3923,
                1147
              ],
              [
                3720,
                1215
              ],
              [
                3485,
                1365
              ],
              [
                3513,
                1392
              ],
              [
                3625,
                1387
              ],
              [
                3659,
                1405
              ],
              [
                3719,
                1332
              ],
              [
                3852,
                1321
              ],
              [
                3945,
                1265
              ],
              [
                4004,
                1277
              ],
              [
                4186,
                1246
              ],
              [
                4248,
                1280
              ],
              [
                4277,
                1422
              ],
              [
                4364,
                1477
              ],
              [
                4523,
                1493
              ],
              [
                4587,
                1480
              ],
              [
                4670,
                1506
              ],
              [
                4829,
                1487
              ],
              [
                4937,
                1544
              ],
              [
                4977,
                1641
              ],
              [
                5057,
                1686
              ],
              [
                5177,
                1718
              ],
              [
                5189,
                1773
              ],
              [
                5109,
                1858
              ],
              [
                5140,
                2092
              ],
              [
                5124,
                2133
              ],
              [
                4943,
                2300
              ],
              [
                4957,
                2365
              ],
              [
                4921,
                2465
              ],
              [
                5078,
                2435
              ],
              [
                5158,
                2363
              ],
              [
                5241,
                2342
              ],
              [
                5356,
                2434
              ],
              [
                5441,
                2470
              ],
              [
                5459,
                2447
              ],
              [
                5477,
                2193
              ],
              [
                5478,
                2078
              ],
              [
                5533,
                2012
              ],
              [
                5647,
                1932
              ],
              [
                5718,
                1924
              ],
              [
                5824,
                1968
              ],
              [
                5929,
                2076
              ],
              [
                6024,
                2048
              ],
              [
                6052,
                1866
              ],
              [
                6123,
                1825
              ],
              [
                6219,
                1702
              ],
              [
                6199,
                1633
              ],
              [
                6267,
                1523
              ],
              [
                6295,
                1273
              ],
              [
                6308,
                1235
              ],
              [
                6557,
                1112
              ],
              [
                6622,
                1178
              ],
              [
                6661,
                1178
              ],
              [
                6750,
                1120
              ],
              [
                6801,
                1032
              ],
              [
                6763,
                1053
              ],
              [
                6728,
                698
              ],
              [
                6910,
                715
              ],
              [
                7005,
                691
              ],
              [
                7022,
                606
              ],
              [
                7103,
                606
              ],
              [
                7137,
                631
              ],
              [
                7213,
                581
              ],
              [
                7197,
                526
              ],
              [
                7347,
                415
              ],
              [
                7468,
                254
              ],
              [
                7467,
                205
              ]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.BS",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.44,
        "hc-middle-y": 0.48,
        "hc-key": "ir-bs",
        "hc-a2": "BS",
        "labelrank": "6",
        "hasc": "IR.BS",
        "alt-name": "Banader va Jazayer-e Khalij-e Fars|Bushire|Persian Gulf|Ports and Islands of the Persian Gulf",
        "woe-id": "2345781",
        "subregion": null,
        "fips": "IR22",
        "postal-code": "BS",
        "name": "بوشهر",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "51.4225",
        "woe-name": "Bushehr",
        "latitude": "28.8273",
        "woe-label": "Bushehr, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2280,
              3256
            ],
            [
              2294,
              3173
            ],
            [
              2357,
              3071
            ],
            [
              2519,
              3046
            ],
            [
              2598,
              3020
            ],
            [
              2744,
              2799
            ],
            [
              2842,
              2734
            ],
            [
              3102,
              2238
            ],
            [
              3115,
              2178
            ],
            [
              3200,
              1935
            ],
            [
              3305,
              1836
            ],
            [
              3385,
              1657
            ],
            [
              3540,
              1490
            ],
            [
              3659,
              1405
            ],
            [
              3625,
              1387
            ],
            [
              3513,
              1392
            ],
            [
              3485,
              1365
            ],
            [
              3426,
              1411
            ],
            [
              3485,
              1433
            ],
            [
              3419,
              1510
            ],
            [
              3333,
              1581
            ],
            [
              3227,
              1604
            ],
            [
              3089,
              1705
            ],
            [
              3000,
              1715
            ],
            [
              2918,
              1701
            ],
            [
              2837,
              1718
            ],
            [
              2717,
              1814
            ],
            [
              2650,
              1927
            ],
            [
              2650,
              2001
            ],
            [
              2579,
              2088
            ],
            [
              2539,
              2198
            ],
            [
              2533,
              2312
            ],
            [
              2486,
              2367
            ],
            [
              2426,
              2378
            ],
            [
              2390,
              2434
            ],
            [
              2397,
              2488
            ],
            [
              2435,
              2451
            ],
            [
              2461,
              2510
            ],
            [
              2408,
              2584
            ],
            [
              2293,
              2588
            ],
            [
              2322,
              2685
            ],
            [
              2304,
              2791
            ],
            [
              2276,
              2805
            ],
            [
              2190,
              2917
            ],
            [
              2155,
              2931
            ],
            [
              2069,
              3074
            ],
            [
              2013,
              3123
            ],
            [
              2005,
              3245
            ],
            [
              1962,
              3304
            ],
            [
              2059,
              3330
            ],
            [
              2182,
              3307
            ],
            [
              2249,
              3281
            ],
            [
              2270,
              3265
            ],
            [
              2280,
              3257
            ],
            [
              2280,
              3256
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.KB",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.50,
        "hc-middle-y": 0.53,
        "hc-key": "ir-kb",
        "hc-a2": "KB",
        "labelrank": "4",
        "hasc": "IR.KB",
        "alt-name": "Bovir Ahmadi and Kohkiluyeh|Boyer-Ahmad and Koh-Giluye|Boyer Ahmad e Kohkiluyeh|Boyer Ahmadi-ye Sardir va Kohkiluyeh|Kohgil",
        "woe-id": "2345771",
        "subregion": null,
        "fips": "IR05",
        "postal-code": "KB",
        "name": "کهگیلویه و بویر احمد",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "50.7947",
        "woe-name": "Kohgiluyeh and Buyer Ahmad",
        "latitude": "30.6977",
        "woe-label": "Kohgiluyeh va Buyer Ahmad, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2280,
              3256
            ],
            [
              2249,
              3281
            ],
            [
              2182,
              3307
            ],
            [
              2174,
              3412
            ],
            [
              2142,
              3512
            ],
            [
              2177,
              3590
            ],
            [
              2168,
              3625
            ],
            [
              2082,
              3680
            ],
            [
              2015,
              3755
            ],
            [
              1917,
              3745
            ],
            [
              1925,
              3840
            ],
            [
              1901,
              3934
            ],
            [
              1926,
              4014
            ],
            [
              1991,
              4046
            ],
            [
              2100,
              4155
            ],
            [
              2239,
              4087
            ],
            [
              2287,
              4086
            ],
            [
              2497,
              3894
            ],
            [
              2582,
              3884
            ],
            [
              2642,
              3924
            ],
            [
              2699,
              3929
            ],
            [
              2733,
              3802
            ],
            [
              2795,
              3736
            ],
            [
              2886,
              3666
            ],
            [
              2903,
              3551
            ],
            [
              2824,
              3505
            ],
            [
              2763,
              3521
            ],
            [
              2648,
              3587
            ],
            [
              2593,
              3590
            ],
            [
              2630,
              3415
            ],
            [
              2616,
              3355
            ],
            [
              2461,
              3267
            ],
            [
              2339,
              3271
            ],
            [
              2280,
              3256
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.FA",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.56,
        "hc-middle-y": 0.56,
        "hc-key": "ir-fa",
        "hc-a2": "FA",
        "labelrank": "4",
        "hasc": "IR.FA",
        "alt-name": null,
        "woe-id": "2345772",
        "subregion": null,
        "fips": "IR07",
        "postal-code": "FA",
        "name": "فارس",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "53.0793",
        "woe-name": "Fars",
        "latitude": "29.4007",
        "woe-label": "Fars, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2339,
              3271
            ],
            [
              2461,
              3267
            ],
            [
              2616,
              3355
            ],
            [
              2630,
              3415
            ],
            [
              2593,
              3590
            ],
            [
              2648,
              3587
            ],
            [
              2763,
              3521
            ],
            [
              2824,
              3505
            ],
            [
              2903,
              3551
            ],
            [
              2886,
              3666
            ],
            [
              2946,
              3678
            ],
            [
              2946,
              3797
            ],
            [
              2995,
              3917
            ],
            [
              3021,
              4030
            ],
            [
              3005,
              4075
            ],
            [
              2925,
              4114
            ],
            [
              2897,
              4184
            ],
            [
              2995,
              4176
            ],
            [
              3177,
              4291
            ],
            [
              3227,
              4186
            ],
            [
              3397,
              4158
            ],
            [
              3593,
              4214
            ],
            [
              3738,
              4159
            ],
            [
              3825,
              4080
            ],
            [
              3899,
              3992
            ],
            [
              4036,
              3655
            ],
            [
              4134,
              3485
            ],
            [
              4253,
              3329
            ],
            [
              4292,
              3144
            ],
            [
              4383,
              3078
            ],
            [
              4502,
              3020
            ],
            [
              4519,
              2954
            ],
            [
              4602,
              2795
            ],
            [
              4629,
              2779
            ],
            [
              4797,
              2756
            ],
            [
              4921,
              2465
            ],
            [
              4957,
              2365
            ],
            [
              4943,
              2300
            ],
            [
              5124,
              2133
            ],
            [
              5140,
              2092
            ],
            [
              5109,
              1858
            ],
            [
              5189,
              1773
            ],
            [
              5177,
              1718
            ],
            [
              5057,
              1686
            ],
            [
              4977,
              1641
            ],
            [
              4937,
              1544
            ],
            [
              4829,
              1487
            ],
            [
              4670,
              1506
            ],
            [
              4587,
              1480
            ],
            [
              4523,
              1493
            ],
            [
              4364,
              1477
            ],
            [
              4277,
              1422
            ],
            [
              4248,
              1280
            ],
            [
              4186,
              1246
            ],
            [
              4004,
              1277
            ],
            [
              3945,
              1265
            ],
            [
              3852,
              1321
            ],
            [
              3719,
              1332
            ],
            [
              3659,
              1405
            ],
            [
              3540,
              1490
            ],
            [
              3385,
              1657
            ],
            [
              3305,
              1836
            ],
            [
              3200,
              1935
            ],
            [
              3115,
              2178
            ],
            [
              3102,
              2238
            ],
            [
              2842,
              2734
            ],
            [
              2744,
              2799
            ],
            [
              2598,
              3020
            ],
            [
              2519,
              3046
            ],
            [
              2357,
              3071
            ],
            [
              2294,
              3173
            ],
            [
              2280,
              3256
            ],
            [
              2280,
              3257
            ],
            [
              2339,
              3271
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.ES",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.50,
        "hc-middle-y": 0.34,
        "hc-key": "ir-es",
        "hc-a2": "ES",
        "labelrank": "6",
        "hasc": "IR.ES",
        "alt-name": "Isfahan|Ispahan",
        "woe-id": "2345787",
        "subregion": null,
        "fips": "IR28",
        "postal-code": "ES",
        "name": "اصفهان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "52.4195",
        "woe-name": "Esfahan",
        "latitude": "32.9837",
        "woe-label": "Esfahan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2886,
              3666
            ],
            [
              2795,
              3736
            ],
            [
              2733,
              3802
            ],
            [
              2699,
              3929
            ],
            [
              2707,
              4004
            ],
            [
              2657,
              4177
            ],
            [
              2649,
              4289
            ],
            [
              2693,
              4312
            ],
            [
              2664,
              4375
            ],
            [
              2708,
              4446
            ],
            [
              2670,
              4570
            ],
            [
              2504,
              4708
            ],
            [
              2503,
              4809
            ],
            [
              2431,
              4928
            ],
            [
              2370,
              4903
            ],
            [
              2274,
              4899
            ],
            [
              2210,
              4859
            ],
            [
              2102,
              4860
            ],
            [
              2035,
              4909
            ],
            [
              1933,
              4899
            ],
            [
              1820,
              4842
            ],
            [
              1849,
              4909
            ],
            [
              1826,
              4942
            ],
            [
              1691,
              4980
            ],
            [
              1666,
              5048
            ],
            [
              1691,
              5092
            ],
            [
              1762,
              5124
            ],
            [
              1775,
              5203
            ],
            [
              1808,
              5240
            ],
            [
              1892,
              5261
            ],
            [
              1970,
              5409
            ],
            [
              1986,
              5500
            ],
            [
              2123,
              5588
            ],
            [
              2357,
              5644
            ],
            [
              2424,
              5690
            ],
            [
              2491,
              5700
            ],
            [
              2569,
              5893
            ],
            [
              2542,
              5931
            ],
            [
              2561,
              6062
            ],
            [
              2642,
              6124
            ],
            [
              2804,
              6133
            ],
            [
              2991,
              6179
            ],
            [
              3097,
              6121
            ],
            [
              3151,
              6112
            ],
            [
              3340,
              6115
            ],
            [
              3604,
              6033
            ],
            [
              4924,
              6092
            ],
            [
              4974,
              6066
            ],
            [
              4974,
              6065
            ],
            [
              4992,
              5614
            ],
            [
              4933,
              5482
            ],
            [
              4804,
              5422
            ],
            [
              4774,
              5384
            ],
            [
              4751,
              5272
            ],
            [
              4714,
              5181
            ],
            [
              4625,
              5108
            ],
            [
              4031,
              4894
            ],
            [
              3852,
              4933
            ],
            [
              3757,
              4910
            ],
            [
              3599,
              4819
            ],
            [
              3611,
              4592
            ],
            [
              3583,
              4456
            ],
            [
              3568,
              4312
            ],
            [
              3593,
              4214
            ],
            [
              3397,
              4158
            ],
            [
              3227,
              4186
            ],
            [
              3177,
              4291
            ],
            [
              2995,
              4176
            ],
            [
              2897,
              4184
            ],
            [
              2925,
              4114
            ],
            [
              3005,
              4075
            ],
            [
              3021,
              4030
            ],
            [
              2995,
              3917
            ],
            [
              2946,
              3797
            ],
            [
              2946,
              3678
            ],
            [
              2886,
              3666
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.SM",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.61,
        "hc-middle-y": 0.62,
        "hc-key": "ir-sm",
        "hc-a2": "SM",
        "labelrank": "6",
        "hasc": "IR.SM",
        "alt-name": null,
        "woe-id": "2345784",
        "subregion": null,
        "fips": "IR25",
        "postal-code": "SM",
        "name": "سمنان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "54.4381",
        "woe-name": "Semnan",
        "latitude": "35.4243",
        "woe-label": "Semnan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4924,
              6092
            ],
            [
              3604,
              6033
            ],
            [
              3340,
              6115
            ],
            [
              3151,
              6112
            ],
            [
              3097,
              6121
            ],
            [
              2991,
              6179
            ],
            [
              3049,
              6320
            ],
            [
              3044,
              6401
            ],
            [
              3099,
              6568
            ],
            [
              3013,
              6695
            ],
            [
              3031,
              6855
            ],
            [
              3102,
              6847
            ],
            [
              3231,
              6760
            ],
            [
              3435,
              6709
            ],
            [
              3479,
              6707
            ],
            [
              3596,
              6757
            ],
            [
              3682,
              6836
            ],
            [
              3700,
              6896
            ],
            [
              3675,
              7038
            ],
            [
              3826,
              7085
            ],
            [
              3912,
              7093
            ],
            [
              3974,
              7135
            ],
            [
              4005,
              7188
            ],
            [
              4081,
              7263
            ],
            [
              4100,
              7358
            ],
            [
              4159,
              7436
            ],
            [
              4258,
              7480
            ],
            [
              4443,
              7487
            ],
            [
              4518,
              7524
            ],
            [
              4640,
              7634
            ],
            [
              4733,
              7690
            ],
            [
              4778,
              7697
            ],
            [
              4971,
              7676
            ],
            [
              4998,
              7689
            ],
            [
              5023,
              7809
            ],
            [
              5064,
              7909
            ],
            [
              5179,
              8084
            ],
            [
              5264,
              7979
            ],
            [
              5350,
              7949
            ],
            [
              5298,
              7901
            ],
            [
              5297,
              7772
            ],
            [
              5374,
              7683
            ],
            [
              5437,
              7633
            ],
            [
              5547,
              7608
            ],
            [
              5628,
              7625
            ],
            [
              5678,
              7616
            ],
            [
              5694,
              7564
            ],
            [
              5662,
              7459
            ],
            [
              5657,
              7386
            ],
            [
              5673,
              7261
            ],
            [
              5710,
              7144
            ],
            [
              5881,
              7006
            ],
            [
              5875,
              6959
            ],
            [
              5750,
              6723
            ],
            [
              5636,
              6675
            ],
            [
              5507,
              6568
            ],
            [
              5423,
              6456
            ],
            [
              5236,
              6116
            ],
            [
              5176,
              6083
            ],
            [
              5034,
              6082
            ],
            [
              4974,
              6066
            ],
            [
              4974,
              6065
            ],
            [
              4924,
              6092
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.GO",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.57,
        "hc-middle-y": 0.52,
        "hc-key": "ir-go",
        "hc-a2": "GO",
        "labelrank": "4",
        "hasc": "IR.GO",
        "alt-name": null,
        "woe-id": "20070201",
        "subregion": null,
        "fips": "IR37",
        "postal-code": "GO",
        "name": "گلستان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "55.0042",
        "woe-name": "Golestan",
        "latitude": "37.312",
        "woe-label": "Golestan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4032,
              7698
            ],
            [
              4130,
              7684
            ],
            [
              4197,
              7703
            ],
            [
              4206,
              7789
            ],
            [
              4144,
              7994
            ],
            [
              4139,
              8051
            ],
            [
              4284,
              8040
            ],
            [
              4378,
              8068
            ],
            [
              4467,
              8122
            ],
            [
              4512,
              8118
            ],
            [
              4599,
              8176
            ],
            [
              4599,
              8266
            ],
            [
              4634,
              8339
            ],
            [
              4713,
              8396
            ],
            [
              4776,
              8471
            ],
            [
              4823,
              8484
            ],
            [
              4928,
              8558
            ],
            [
              5078,
              8591
            ],
            [
              5222,
              8561
            ],
            [
              5321,
              8574
            ],
            [
              5333,
              8441
            ],
            [
              5326,
              8367
            ],
            [
              5393,
              8319
            ],
            [
              5404,
              8279
            ],
            [
              5377,
              8237
            ],
            [
              5232,
              8170
            ],
            [
              5179,
              8084
            ],
            [
              5064,
              7909
            ],
            [
              5023,
              7809
            ],
            [
              4998,
              7689
            ],
            [
              4971,
              7676
            ],
            [
              4778,
              7697
            ],
            [
              4733,
              7690
            ],
            [
              4640,
              7634
            ],
            [
              4518,
              7524
            ],
            [
              4443,
              7487
            ],
            [
              4258,
              7480
            ],
            [
              4177,
              7571
            ],
            [
              4058,
              7641
            ],
            [
              4032,
              7698
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.MN",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.63,
        "hc-middle-y": 0.60,
        "hc-key": "ir-mn",
        "hc-a2": "MN",
        "labelrank": "4",
        "hasc": "IR.MN",
        "alt-name": null,
        "woe-id": "2345780",
        "subregion": null,
        "fips": "IR17",
        "postal-code": "MN",
        "name": "مازندران",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "52.2123",
        "woe-name": "Mazandaran",
        "latitude": "36.231",
        "woe-label": "Mazandaran, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2355,
              7822
            ],
            [
              2627,
              7648
            ],
            [
              2776,
              7617
            ],
            [
              3067,
              7540
            ],
            [
              3166,
              7553
            ],
            [
              3255,
              7585
            ],
            [
              3535,
              7644
            ],
            [
              3715,
              7699
            ],
            [
              3917,
              7745
            ],
            [
              4128,
              7759
            ],
            [
              4192,
              7791
            ],
            [
              4191,
              7766
            ],
            [
              4092,
              7738
            ],
            [
              3980,
              7738
            ],
            [
              4032,
              7698
            ],
            [
              4058,
              7641
            ],
            [
              4177,
              7571
            ],
            [
              4258,
              7480
            ],
            [
              4159,
              7436
            ],
            [
              4100,
              7358
            ],
            [
              4081,
              7263
            ],
            [
              4005,
              7188
            ],
            [
              3974,
              7135
            ],
            [
              3912,
              7093
            ],
            [
              3826,
              7085
            ],
            [
              3675,
              7038
            ],
            [
              3602,
              7077
            ],
            [
              3556,
              7062
            ],
            [
              3453,
              7104
            ],
            [
              3329,
              7134
            ],
            [
              3209,
              7011
            ],
            [
              3171,
              6995
            ],
            [
              3085,
              7018
            ],
            [
              2980,
              7160
            ],
            [
              2907,
              7189
            ],
            [
              2824,
              7197
            ],
            [
              2766,
              7232
            ],
            [
              2731,
              7274
            ],
            [
              2620,
              7305
            ],
            [
              2590,
              7338
            ],
            [
              2467,
              7372
            ],
            [
              2461,
              7404
            ],
            [
              2345,
              7488
            ],
            [
              2205,
              7612
            ],
            [
              2267,
              7688
            ],
            [
              2280,
              7743
            ],
            [
              2355,
              7822
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.TH",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.31,
        "hc-middle-y": 0.46,
        "hc-key": "ir-th",
        "hc-a2": "TH",
        "labelrank": "7",
        "hasc": "IR.TH",
        "alt-name": "Teheran|T?h?ran",
        "woe-id": "2345785",
        "subregion": null,
        "fips": "IR26",
        "postal-code": "TH",
        "name": "تهران",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "51.6548",
        "woe-name": "Tehran",
        "latitude": "35.5146",
        "woe-label": "Tehran, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3675,
              7038
            ],
            [
              3700,
              6896
            ],
            [
              3682,
              6836
            ],
            [
              3596,
              6757
            ],
            [
              3479,
              6707
            ],
            [
              3435,
              6709
            ],
            [
              3231,
              6760
            ],
            [
              3102,
              6847
            ],
            [
              3031,
              6855
            ],
            [
              3013,
              6695
            ],
            [
              3099,
              6568
            ],
            [
              3044,
              6401
            ],
            [
              2733,
              6590
            ],
            [
              2602,
              6632
            ],
            [
              2445,
              6638
            ],
            [
              2445,
              6638
            ],
            [
              2495,
              6790
            ],
            [
              2495,
              6836
            ],
            [
              2457,
              6896
            ],
            [
              2537,
              6984
            ],
            [
              2553,
              7024
            ],
            [
              2601,
              7026
            ],
            [
              2611,
              7101
            ],
            [
              2644,
              7138
            ],
            [
              2763,
              7166
            ],
            [
              2766,
              7232
            ],
            [
              2824,
              7197
            ],
            [
              2907,
              7189
            ],
            [
              2980,
              7160
            ],
            [
              3085,
              7018
            ],
            [
              3171,
              6995
            ],
            [
              3209,
              7011
            ],
            [
              3329,
              7134
            ],
            [
              3453,
              7104
            ],
            [
              3556,
              7062
            ],
            [
              3602,
              7077
            ],
            [
              3675,
              7038
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.MK",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.38,
        "hc-middle-y": 0.54,
        "hc-key": "ir-mk",
        "hc-a2": "MK",
        "labelrank": "4",
        "hasc": "IR.MK",
        "alt-name": null,
        "woe-id": "2345783",
        "subregion": null,
        "fips": "IR34",
        "postal-code": "MK",
        "name": "مرکزی",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "49.964",
        "woe-name": "Markazi",
        "latitude": "34.5595",
        "woe-label": "Markazi, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2445,
              6638
            ],
            [
              2409,
              6565
            ],
            [
              2391,
              6437
            ],
            [
              2092,
              6354
            ],
            [
              2095,
              6281
            ],
            [
              2037,
              6219
            ],
            [
              2090,
              6161
            ],
            [
              2164,
              6123
            ],
            [
              2181,
              6042
            ],
            [
              2242,
              5979
            ],
            [
              2385,
              5963
            ],
            [
              2441,
              5930
            ],
            [
              2569,
              5893
            ],
            [
              2491,
              5700
            ],
            [
              2424,
              5690
            ],
            [
              2357,
              5644
            ],
            [
              2123,
              5588
            ],
            [
              1986,
              5500
            ],
            [
              1894,
              5615
            ],
            [
              1845,
              5555
            ],
            [
              1746,
              5644
            ],
            [
              1762,
              5700
            ],
            [
              1693,
              5767
            ],
            [
              1609,
              5729
            ],
            [
              1588,
              5672
            ],
            [
              1531,
              5634
            ],
            [
              1453,
              5648
            ],
            [
              1382,
              5695
            ],
            [
              1415,
              5776
            ],
            [
              1422,
              5845
            ],
            [
              1494,
              5923
            ],
            [
              1476,
              6040
            ],
            [
              1439,
              6118
            ],
            [
              1414,
              6269
            ],
            [
              1508,
              6251
            ],
            [
              1504,
              6349
            ],
            [
              1537,
              6456
            ],
            [
              1684,
              6448
            ],
            [
              1692,
              6373
            ],
            [
              1730,
              6330
            ],
            [
              1769,
              6353
            ],
            [
              1759,
              6426
            ],
            [
              1721,
              6491
            ],
            [
              1634,
              6524
            ],
            [
              1597,
              6559
            ],
            [
              1683,
              6610
            ],
            [
              1645,
              6728
            ],
            [
              1678,
              6749
            ],
            [
              1726,
              6720
            ],
            [
              1713,
              6803
            ],
            [
              1809,
              6802
            ],
            [
              1850,
              6856
            ],
            [
              2031,
              6904
            ],
            [
              2130,
              6944
            ],
            [
              2178,
              6942
            ],
            [
              2310,
              6915
            ],
            [
              2354,
              6878
            ],
            [
              2339,
              6928
            ],
            [
              2377,
              6945
            ],
            [
              2401,
              6860
            ],
            [
              2457,
              6896
            ],
            [
              2495,
              6836
            ],
            [
              2495,
              6790
            ],
            [
              2445,
              6638
            ],
            [
              2445,
              6636
            ],
            [
              2445,
              6638
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.YA",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.52,
        "hc-middle-y": 0.50,
        "hc-key": "ir-ya",
        "hc-a2": "YA",
        "labelrank": "6",
        "hasc": "IR.YA",
        "alt-name": null,
        "woe-id": "2345790",
        "subregion": null,
        "fips": "IR40",
        "postal-code": "YA",
        "name": "یزد",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "55.5242",
        "woe-name": "Yazd",
        "latitude": "32.7074",
        "woe-label": "Yazd, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4502,
              3020
            ],
            [
              4383,
              3078
            ],
            [
              4292,
              3144
            ],
            [
              4253,
              3329
            ],
            [
              4134,
              3485
            ],
            [
              4036,
              3655
            ],
            [
              3899,
              3992
            ],
            [
              3825,
              4080
            ],
            [
              3738,
              4159
            ],
            [
              3593,
              4214
            ],
            [
              3568,
              4312
            ],
            [
              3583,
              4456
            ],
            [
              3611,
              4592
            ],
            [
              3599,
              4819
            ],
            [
              3757,
              4910
            ],
            [
              3852,
              4933
            ],
            [
              4031,
              4894
            ],
            [
              4625,
              5108
            ],
            [
              4714,
              5181
            ],
            [
              4751,
              5272
            ],
            [
              4774,
              5384
            ],
            [
              4804,
              5422
            ],
            [
              4933,
              5482
            ],
            [
              4992,
              5614
            ],
            [
              4974,
              6065
            ],
            [
              4974,
              6066
            ],
            [
              5034,
              6082
            ],
            [
              5176,
              6083
            ],
            [
              5236,
              6116
            ],
            [
              5423,
              6456
            ],
            [
              5645,
              6523
            ],
            [
              5859,
              6635
            ],
            [
              5995,
              6677
            ],
            [
              6057,
              6664
            ],
            [
              6223,
              6549
            ],
            [
              6239,
              6465
            ],
            [
              6188,
              6410
            ],
            [
              5977,
              6246
            ],
            [
              5943,
              6176
            ],
            [
              5882,
              5964
            ],
            [
              5882,
              5851
            ],
            [
              5925,
              5660
            ],
            [
              5953,
              5620
            ],
            [
              6065,
              5611
            ],
            [
              6206,
              5651
            ],
            [
              6256,
              5580
            ],
            [
              6311,
              5300
            ],
            [
              6352,
              5219
            ],
            [
              6502,
              5142
            ],
            [
              6566,
              5063
            ],
            [
              6546,
              4941
            ],
            [
              6624,
              4801
            ],
            [
              6602,
              4662
            ],
            [
              6532,
              4556
            ],
            [
              6426,
              4312
            ],
            [
              5803,
              4548
            ],
            [
              5730,
              4558
            ],
            [
              5693,
              4509
            ],
            [
              5577,
              4439
            ],
            [
              5538,
              4395
            ],
            [
              5240,
              4226
            ],
            [
              5217,
              4171
            ],
            [
              5208,
              3914
            ],
            [
              5112,
              3869
            ],
            [
              5004,
              3851
            ],
            [
              4883,
              3861
            ],
            [
              4561,
              3797
            ],
            [
              4486,
              3689
            ],
            [
              4476,
              3607
            ],
            [
              4545,
              3459
            ],
            [
              4559,
              3392
            ],
            [
              4597,
              3357
            ],
            [
              4594,
              3141
            ],
            [
              4610,
              3058
            ],
            [
              4502,
              3020
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.CM",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.60,
        "hc-middle-y": 0.48,
        "hc-key": "ir-cm",
        "hc-a2": "CM",
        "labelrank": "4",
        "hasc": "IR.CM",
        "alt-name": "Bakhtiari|Chaharmahal va Bakhtiyari|Charmahal-Bakhtiyari",
        "woe-id": "2345769",
        "subregion": null,
        "fips": "IR03",
        "postal-code": "CM",
        "name": "چهارمحال و بختیاری",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "50.5298",
        "woe-name": "Chahar Mahall and Bakhtiari",
        "latitude": "31.9975",
        "woe-label": "Chahar Mahall va Bakhtiari, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2699,
              3929
            ],
            [
              2642,
              3924
            ],
            [
              2582,
              3884
            ],
            [
              2497,
              3894
            ],
            [
              2287,
              4086
            ],
            [
              2239,
              4087
            ],
            [
              2100,
              4155
            ],
            [
              2153,
              4232
            ],
            [
              2139,
              4300
            ],
            [
              2053,
              4399
            ],
            [
              1990,
              4551
            ],
            [
              1928,
              4599
            ],
            [
              1830,
              4781
            ],
            [
              1820,
              4842
            ],
            [
              1933,
              4899
            ],
            [
              2035,
              4909
            ],
            [
              2102,
              4860
            ],
            [
              2210,
              4859
            ],
            [
              2274,
              4899
            ],
            [
              2370,
              4903
            ],
            [
              2431,
              4928
            ],
            [
              2503,
              4809
            ],
            [
              2504,
              4708
            ],
            [
              2670,
              4570
            ],
            [
              2708,
              4446
            ],
            [
              2664,
              4375
            ],
            [
              2693,
              4312
            ],
            [
              2649,
              4289
            ],
            [
              2657,
              4177
            ],
            [
              2707,
              4004
            ],
            [
              2699,
              3929
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.KZ",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.48,
        "hc-middle-y": 0.50,
        "hc-key": "ir-kz",
        "hc-a2": "KZ",
        "labelrank": "4",
        "hasc": "IR.KZ",
        "alt-name": "Khuzistan|Kouzistan",
        "woe-id": "2345778",
        "subregion": null,
        "fips": "IR15",
        "postal-code": "KZ",
        "name": "خوزستان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "48.7558",
        "woe-name": "Khuzestan",
        "latitude": "31.3484",
        "woe-label": "Khuzestan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1666,
              5048
            ],
            [
              1691,
              4980
            ],
            [
              1826,
              4942
            ],
            [
              1849,
              4909
            ],
            [
              1820,
              4842
            ],
            [
              1830,
              4781
            ],
            [
              1928,
              4599
            ],
            [
              1990,
              4551
            ],
            [
              2053,
              4399
            ],
            [
              2139,
              4300
            ],
            [
              2153,
              4232
            ],
            [
              2100,
              4155
            ],
            [
              1991,
              4046
            ],
            [
              1926,
              4014
            ],
            [
              1901,
              3934
            ],
            [
              1925,
              3840
            ],
            [
              1917,
              3745
            ],
            [
              2015,
              3755
            ],
            [
              2082,
              3680
            ],
            [
              2168,
              3625
            ],
            [
              2177,
              3590
            ],
            [
              2142,
              3512
            ],
            [
              2174,
              3412
            ],
            [
              2182,
              3307
            ],
            [
              2059,
              3330
            ],
            [
              1962,
              3304
            ],
            [
              1883,
              3303
            ],
            [
              1698,
              3192
            ],
            [
              1658,
              3188
            ],
            [
              1630,
              3278
            ],
            [
              1494,
              3282
            ],
            [
              1483,
              3354
            ],
            [
              1447,
              3328
            ],
            [
              1358,
              3388
            ],
            [
              1328,
              3450
            ],
            [
              1393,
              3453
            ],
            [
              1474,
              3410
            ],
            [
              1506,
              3459
            ],
            [
              1482,
              3516
            ],
            [
              1349,
              3526
            ],
            [
              1368,
              3458
            ],
            [
              1320,
              3462
            ],
            [
              1276,
              3415
            ],
            [
              1308,
              3350
            ],
            [
              1313,
              3236
            ],
            [
              1278,
              3201
            ],
            [
              1177,
              3209
            ],
            [
              1122,
              3161
            ],
            [
              1031,
              3194
            ],
            [
              994,
              3299
            ],
            [
              1004,
              3341
            ],
            [
              934,
              3413
            ],
            [
              893,
              3414
            ],
            [
              871,
              3484
            ],
            [
              788,
              3512
            ],
            [
              803,
              3854
            ],
            [
              796,
              3867
            ],
            [
              607,
              3875
            ],
            [
              623,
              4151
            ],
            [
              720,
              4383
            ],
            [
              635,
              4555
            ],
            [
              588,
              4618
            ],
            [
              686,
              4691
            ],
            [
              682,
              4768
            ],
            [
              726,
              4824
            ],
            [
              783,
              4942
            ],
            [
              816,
              4986
            ],
            [
              902,
              5185
            ],
            [
              934,
              5206
            ],
            [
              1173,
              5223
            ],
            [
              1293,
              5162
            ],
            [
              1417,
              5145
            ],
            [
              1545,
              5051
            ],
            [
              1666,
              5048
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.LO",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.53,
        "hc-middle-y": 0.49,
        "hc-key": "ir-lo",
        "hc-a2": "LO",
        "labelrank": "4",
        "hasc": "IR.LO",
        "alt-name": null,
        "woe-id": "2345782",
        "subregion": null,
        "fips": "IR23",
        "postal-code": "LO",
        "name": "لرستان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "48.4141",
        "woe-name": "Lorestan",
        "latitude": "33.5323",
        "woe-label": "Lorestan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1986,
              5500
            ],
            [
              1970,
              5409
            ],
            [
              1892,
              5261
            ],
            [
              1808,
              5240
            ],
            [
              1775,
              5203
            ],
            [
              1762,
              5124
            ],
            [
              1691,
              5092
            ],
            [
              1666,
              5048
            ],
            [
              1545,
              5051
            ],
            [
              1417,
              5145
            ],
            [
              1293,
              5162
            ],
            [
              1173,
              5223
            ],
            [
              934,
              5206
            ],
            [
              902,
              5185
            ],
            [
              816,
              4986
            ],
            [
              783,
              4942
            ],
            [
              684,
              5160
            ],
            [
              557,
              5326
            ],
            [
              436,
              5394
            ],
            [
              371,
              5457
            ],
            [
              319,
              5477
            ],
            [
              310,
              5523
            ],
            [
              213,
              5614
            ],
            [
              225,
              5649
            ],
            [
              295,
              5714
            ],
            [
              493,
              5758
            ],
            [
              559,
              5820
            ],
            [
              542,
              5915
            ],
            [
              553,
              5997
            ],
            [
              654,
              6024
            ],
            [
              658,
              6112
            ],
            [
              723,
              6115
            ],
            [
              1001,
              5908
            ],
            [
              1161,
              5883
            ],
            [
              1192,
              5912
            ],
            [
              1272,
              5915
            ],
            [
              1422,
              5845
            ],
            [
              1415,
              5776
            ],
            [
              1382,
              5695
            ],
            [
              1453,
              5648
            ],
            [
              1531,
              5634
            ],
            [
              1588,
              5672
            ],
            [
              1609,
              5729
            ],
            [
              1693,
              5767
            ],
            [
              1762,
              5700
            ],
            [
              1746,
              5644
            ],
            [
              1845,
              5555
            ],
            [
              1894,
              5615
            ],
            [
              1986,
              5500
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.IL",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.37,
        "hc-middle-y": 0.35,
        "hc-key": "ir-il",
        "hc-a2": "IL",
        "labelrank": "7",
        "hasc": "IR.IL",
        "alt-name": "Ilam and Poshtkuh",
        "woe-id": "2345775",
        "subregion": null,
        "fips": "IR10",
        "postal-code": "IL",
        "name": "ایلام",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "46.8116",
        "woe-name": "Ilam",
        "latitude": "33.2369",
        "woe-label": "Ilam, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              783,
              4942
            ],
            [
              726,
              4824
            ],
            [
              682,
              4768
            ],
            [
              686,
              4691
            ],
            [
              588,
              4618
            ],
            [
              539,
              4650
            ],
            [
              549,
              4684
            ],
            [
              490,
              4779
            ],
            [
              504,
              4805
            ],
            [
              465,
              4862
            ],
            [
              413,
              4882
            ],
            [
              339,
              4870
            ],
            [
              304,
              4894
            ],
            [
              120,
              5079
            ],
            [
              -8,
              5177
            ],
            [
              -122,
              5229
            ],
            [
              -221,
              5232
            ],
            [
              -204,
              5303
            ],
            [
              -252,
              5336
            ],
            [
              -173,
              5373
            ],
            [
              -176,
              5435
            ],
            [
              -238,
              5511
            ],
            [
              -298,
              5627
            ],
            [
              -311,
              5692
            ],
            [
              -398,
              5666
            ],
            [
              -401,
              5699
            ],
            [
              -344,
              5871
            ],
            [
              -330,
              5951
            ],
            [
              -210,
              5953
            ],
            [
              -129,
              5913
            ],
            [
              -40,
              5894
            ],
            [
              35,
              5831
            ],
            [
              173,
              5778
            ],
            [
              237,
              5769
            ],
            [
              334,
              5788
            ],
            [
              421,
              5779
            ],
            [
              444,
              5844
            ],
            [
              423,
              5905
            ],
            [
              542,
              5915
            ],
            [
              559,
              5820
            ],
            [
              493,
              5758
            ],
            [
              295,
              5714
            ],
            [
              225,
              5649
            ],
            [
              213,
              5614
            ],
            [
              310,
              5523
            ],
            [
              319,
              5477
            ],
            [
              371,
              5457
            ],
            [
              436,
              5394
            ],
            [
              557,
              5326
            ],
            [
              684,
              5160
            ],
            [
              783,
              4942
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.AR",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.64,
        "hc-middle-y": 0.54,
        "hc-key": "ir-ar",
        "hc-a2": "AR",
        "labelrank": "7",
        "hasc": "IR.AR",
        "alt-name": "Ardabil",
        "woe-id": "20070198",
        "subregion": null,
        "fips": "IR32",
        "postal-code": "AR",
        "name": "اردبیل",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "47.7241",
        "woe-name": "Ardebil",
        "latitude": "38.9113",
        "woe-label": "Ardabil, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              536,
              9367
            ],
            [
              587,
              9446
            ],
            [
              688,
              9487
            ],
            [
              734,
              9536
            ],
            [
              829,
              9575
            ],
            [
              987,
              9675
            ],
            [
              1044,
              9687
            ],
            [
              1091,
              9646
            ],
            [
              1231,
              9458
            ],
            [
              1117,
              9409
            ],
            [
              1122,
              9331
            ],
            [
              1187,
              9279
            ],
            [
              1204,
              9236
            ],
            [
              1168,
              9190
            ],
            [
              1071,
              9177
            ],
            [
              1034,
              9141
            ],
            [
              1043,
              9094
            ],
            [
              1143,
              9027
            ],
            [
              1150,
              8982
            ],
            [
              1191,
              8938
            ],
            [
              1247,
              8948
            ],
            [
              1255,
              8915
            ],
            [
              1344,
              8795
            ],
            [
              1410,
              8713
            ],
            [
              1285,
              8576
            ],
            [
              1246,
              8454
            ],
            [
              1289,
              8317
            ],
            [
              1371,
              8175
            ],
            [
              1449,
              8092
            ],
            [
              1454,
              7992
            ],
            [
              1419,
              8013
            ],
            [
              1334,
              8003
            ],
            [
              1302,
              7966
            ],
            [
              1226,
              8016
            ],
            [
              1096,
              8104
            ],
            [
              1082,
              8186
            ],
            [
              964,
              8257
            ],
            [
              952,
              8331
            ],
            [
              979,
              8434
            ],
            [
              902,
              8540
            ],
            [
              865,
              8711
            ],
            [
              829,
              8731
            ],
            [
              710,
              8720
            ],
            [
              672,
              8747
            ],
            [
              612,
              8736
            ],
            [
              612,
              8791
            ],
            [
              657,
              8862
            ],
            [
              724,
              8912
            ],
            [
              824,
              8929
            ],
            [
              789,
              8979
            ],
            [
              819,
              9067
            ],
            [
              792,
              9144
            ],
            [
              798,
              9282
            ],
            [
              778,
              9291
            ],
            [
              644,
              9223
            ],
            [
              578,
              9122
            ],
            [
              592,
              9108
            ],
            [
              507,
              9035
            ],
            [
              430,
              9062
            ],
            [
              321,
              9027
            ],
            [
              283,
              9081
            ],
            [
              337,
              9165
            ],
            [
              384,
              9157
            ],
            [
              400,
              9211
            ],
            [
              434,
              9189
            ],
            [
              511,
              9205
            ],
            [
              577,
              9273
            ],
            [
              536,
              9367
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.QM",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.45,
        "hc-middle-y": 0.55,
        "hc-key": "ir-qm",
        "hc-a2": "QM",
        "labelrank": "7",
        "hasc": "IR.QM",
        "alt-name": null,
        "woe-id": "20070199",
        "subregion": null,
        "fips": "IR39",
        "postal-code": "QM",
        "name": "قم",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "50.978",
        "woe-name": "Qom",
        "latitude": "34.6662",
        "woe-label": "Qom, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              3044,
              6401
            ],
            [
              3049,
              6320
            ],
            [
              2991,
              6179
            ],
            [
              2804,
              6133
            ],
            [
              2642,
              6124
            ],
            [
              2561,
              6062
            ],
            [
              2542,
              5931
            ],
            [
              2569,
              5893
            ],
            [
              2441,
              5930
            ],
            [
              2385,
              5963
            ],
            [
              2242,
              5979
            ],
            [
              2181,
              6042
            ],
            [
              2164,
              6123
            ],
            [
              2090,
              6161
            ],
            [
              2037,
              6219
            ],
            [
              2095,
              6281
            ],
            [
              2092,
              6354
            ],
            [
              2391,
              6437
            ],
            [
              2409,
              6565
            ],
            [
              2445,
              6638
            ],
            [
              2445,
              6636
            ],
            [
              2602,
              6632
            ],
            [
              2733,
              6590
            ],
            [
              3044,
              6401
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.HD",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.47,
        "hc-middle-y": 0.50,
        "hc-key": "ir-hd",
        "hc-a2": "HD",
        "labelrank": "7",
        "hasc": "IR.HD",
        "alt-name": "Hamedan",
        "woe-id": "2345774",
        "subregion": null,
        "fips": "IR09",
        "postal-code": "HD",
        "name": "همدان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "48.5738",
        "woe-name": "Hamadan",
        "latitude": "34.8342",
        "woe-label": "Hamadan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1422,
              5845
            ],
            [
              1272,
              5915
            ],
            [
              1192,
              5912
            ],
            [
              1161,
              5883
            ],
            [
              1001,
              5908
            ],
            [
              723,
              6115
            ],
            [
              755,
              6163
            ],
            [
              872,
              6149
            ],
            [
              898,
              6237
            ],
            [
              883,
              6281
            ],
            [
              795,
              6222
            ],
            [
              775,
              6272
            ],
            [
              703,
              6309
            ],
            [
              672,
              6360
            ],
            [
              754,
              6379
            ],
            [
              829,
              6513
            ],
            [
              918,
              6559
            ],
            [
              946,
              6508
            ],
            [
              999,
              6603
            ],
            [
              986,
              6665
            ],
            [
              909,
              6747
            ],
            [
              857,
              6881
            ],
            [
              821,
              6939
            ],
            [
              873,
              6987
            ],
            [
              913,
              6927
            ],
            [
              987,
              6960
            ],
            [
              959,
              7040
            ],
            [
              1057,
              6997
            ],
            [
              1098,
              6946
            ],
            [
              1215,
              6937
            ],
            [
              1307,
              6896
            ],
            [
              1370,
              6947
            ],
            [
              1455,
              6954
            ],
            [
              1519,
              6900
            ],
            [
              1538,
              6845
            ],
            [
              1623,
              6835
            ],
            [
              1713,
              6803
            ],
            [
              1726,
              6720
            ],
            [
              1678,
              6749
            ],
            [
              1645,
              6728
            ],
            [
              1683,
              6610
            ],
            [
              1597,
              6559
            ],
            [
              1634,
              6524
            ],
            [
              1721,
              6491
            ],
            [
              1759,
              6426
            ],
            [
              1769,
              6353
            ],
            [
              1730,
              6330
            ],
            [
              1692,
              6373
            ],
            [
              1684,
              6448
            ],
            [
              1537,
              6456
            ],
            [
              1504,
              6349
            ],
            [
              1508,
              6251
            ],
            [
              1414,
              6269
            ],
            [
              1439,
              6118
            ],
            [
              1476,
              6040
            ],
            [
              1494,
              5923
            ],
            [
              1422,
              5845
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.ZA",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.61,
        "hc-middle-y": 0.46,
        "hc-key": "ir-za",
        "hc-a2": "ZA",
        "labelrank": "7",
        "hasc": "IR.ZA",
        "alt-name": null,
        "woe-id": "2345786",
        "subregion": null,
        "fips": "IR36",
        "postal-code": "ZA",
        "name": "زنجان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "48.2959",
        "woe-name": "Zanjan",
        "latitude": "36.3989",
        "woe-label": "Zanjan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1370,
              6947
            ],
            [
              1307,
              6896
            ],
            [
              1215,
              6937
            ],
            [
              1098,
              6946
            ],
            [
              1057,
              6997
            ],
            [
              1033,
              7040
            ],
            [
              888,
              7138
            ],
            [
              914,
              7201
            ],
            [
              931,
              7317
            ],
            [
              921,
              7403
            ],
            [
              884,
              7482
            ],
            [
              615,
              7551
            ],
            [
              600,
              7567
            ],
            [
              535,
              7738
            ],
            [
              546,
              7812
            ],
            [
              656,
              7926
            ],
            [
              778,
              7999
            ],
            [
              947,
              8010
            ],
            [
              1160,
              7984
            ],
            [
              1226,
              8016
            ],
            [
              1302,
              7966
            ],
            [
              1334,
              8003
            ],
            [
              1419,
              8013
            ],
            [
              1454,
              7992
            ],
            [
              1532,
              7938
            ],
            [
              1611,
              7835
            ],
            [
              1639,
              7725
            ],
            [
              1534,
              7674
            ],
            [
              1520,
              7582
            ],
            [
              1581,
              7473
            ],
            [
              1657,
              7431
            ],
            [
              1702,
              7323
            ],
            [
              1695,
              7234
            ],
            [
              1595,
              7211
            ],
            [
              1505,
              7145
            ],
            [
              1501,
              7112
            ],
            [
              1453,
              7136
            ],
            [
              1276,
              7101
            ],
            [
              1265,
              7073
            ],
            [
              1370,
              6947
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.QZ",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.56,
        "hc-middle-y": 0.59,
        "hc-key": "ir-qz",
        "hc-a2": "QZ",
        "labelrank": "7",
        "hasc": "IR.QZ",
        "alt-name": null,
        "woe-id": "20070200",
        "subregion": null,
        "fips": "IR38",
        "postal-code": "QZ",
        "name": "قزوین",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "49.6996",
        "woe-name": "Qazvin",
        "latitude": "36.0552",
        "woe-label": "Qazvin, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2205,
              7612
            ],
            [
              2345,
              7488
            ],
            [
              2461,
              7404
            ],
            [
              2467,
              7372
            ],
            [
              2339,
              7388
            ],
            [
              2261,
              7361
            ],
            [
              2308,
              7305
            ],
            [
              2370,
              7271
            ],
            [
              2318,
              7136
            ],
            [
              2157,
              7040
            ],
            [
              2178,
              6942
            ],
            [
              2130,
              6944
            ],
            [
              2031,
              6904
            ],
            [
              1850,
              6856
            ],
            [
              1809,
              6802
            ],
            [
              1713,
              6803
            ],
            [
              1623,
              6835
            ],
            [
              1538,
              6845
            ],
            [
              1519,
              6900
            ],
            [
              1455,
              6954
            ],
            [
              1370,
              6947
            ],
            [
              1265,
              7073
            ],
            [
              1276,
              7101
            ],
            [
              1453,
              7136
            ],
            [
              1501,
              7112
            ],
            [
              1505,
              7145
            ],
            [
              1595,
              7211
            ],
            [
              1695,
              7234
            ],
            [
              1702,
              7323
            ],
            [
              1657,
              7431
            ],
            [
              1581,
              7473
            ],
            [
              1520,
              7582
            ],
            [
              1534,
              7674
            ],
            [
              1639,
              7725
            ],
            [
              1756,
              7594
            ],
            [
              1934,
              7547
            ],
            [
              2087,
              7613
            ],
            [
              2205,
              7612
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.WA",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.20,
        "hc-middle-y": 0.35,
        "hc-key": "ir-wa",
        "hc-a2": "WA",
        "labelrank": "4",
        "hasc": "IR.WA",
        "alt-name": "Azarbayjan-e Bakhtari|Azarbaijan-e Gharbi|West Azarbayejan|Azerba?djan e Gharbi",
        "woe-id": "2345767",
        "subregion": null,
        "fips": "IR01",
        "postal-code": "WA",
        "name": "آذربایجان غربی",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "45.6734",
        "woe-name": "West Azarbaijan",
        "latitude": "36.6666",
        "woe-label": "Azarbayjan-e Gharbi, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              535,
              7738
            ],
            [
              600,
              7567
            ],
            [
              532,
              7477
            ],
            [
              490,
              7462
            ],
            [
              374,
              7489
            ],
            [
              319,
              7550
            ],
            [
              38,
              7542
            ],
            [
              -97,
              7570
            ],
            [
              -145,
              7555
            ],
            [
              -190,
              7470
            ],
            [
              -280,
              7448
            ],
            [
              -371,
              7325
            ],
            [
              -413,
              7295
            ],
            [
              -492,
              7282
            ],
            [
              -515,
              7306
            ],
            [
              -492,
              7356
            ],
            [
              -532,
              7477
            ],
            [
              -535,
              7572
            ],
            [
              -605,
              7577
            ],
            [
              -662,
              7670
            ],
            [
              -628,
              7745
            ],
            [
              -649,
              7808
            ],
            [
              -735,
              7849
            ],
            [
              -701,
              7910
            ],
            [
              -695,
              8003
            ],
            [
              -759,
              8068
            ],
            [
              -723,
              8186
            ],
            [
              -840,
              8300
            ],
            [
              -822,
              8402
            ],
            [
              -843,
              8425
            ],
            [
              -808,
              8478
            ],
            [
              -852,
              8525
            ],
            [
              -883,
              8519
            ],
            [
              -916,
              8581
            ],
            [
              -999,
              8602
            ],
            [
              -992,
              8665
            ],
            [
              -908,
              8778
            ],
            [
              -896,
              8846
            ],
            [
              -845,
              8890
            ],
            [
              -860,
              8928
            ],
            [
              -931,
              8938
            ],
            [
              -913,
              9099
            ],
            [
              -938,
              9126
            ],
            [
              -911,
              9248
            ],
            [
              -951,
              9283
            ],
            [
              -972,
              9355
            ],
            [
              -938,
              9454
            ],
            [
              -991,
              9496
            ],
            [
              -987,
              9631
            ],
            [
              -880,
              9609
            ],
            [
              -807,
              9637
            ],
            [
              -762,
              9811
            ],
            [
              -703,
              9851
            ],
            [
              -576,
              9747
            ],
            [
              -553,
              9743
            ],
            [
              -520,
              9612
            ],
            [
              -453,
              9543
            ],
            [
              -431,
              9455
            ],
            [
              -332,
              9414
            ],
            [
              -265,
              9286
            ],
            [
              -331,
              9226
            ],
            [
              -366,
              9129
            ],
            [
              -351,
              9054
            ],
            [
              -377,
              8987
            ],
            [
              -474,
              8901
            ],
            [
              -511,
              8802
            ],
            [
              -469,
              8730
            ],
            [
              -472,
              8419
            ],
            [
              -416,
              8304
            ],
            [
              -429,
              8222
            ],
            [
              -406,
              8153
            ],
            [
              -258,
              8039
            ],
            [
              -132,
              8017
            ],
            [
              -55,
              7926
            ],
            [
              55,
              7848
            ],
            [
              112,
              7916
            ],
            [
              249,
              7957
            ],
            [
              328,
              7901
            ],
            [
              336,
              7770
            ],
            [
              406,
              7730
            ],
            [
              535,
              7738
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.EA",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.42,
        "hc-middle-y": 0.48,
        "hc-key": "ir-ea",
        "hc-a2": "EA",
        "labelrank": "4",
        "hasc": "IR.EA",
        "alt-name": "Azarbayjan-e Khavari|Azarbaijan-e Sharghi|Azarbaijan-Sharqi|East Azarbayejan|Azerba?djan e Sharqi",
        "woe-id": "2345768",
        "subregion": null,
        "fips": "IR01",
        "postal-code": "EA",
        "name": "آذربایجان شرقی",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "46.7723",
        "woe-name": "East Azarbaijan",
        "latitude": "37.8501",
        "woe-label": "Azarbayjan-e Sharqi, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              535,
              7738
            ],
            [
              406,
              7730
            ],
            [
              336,
              7770
            ],
            [
              328,
              7901
            ],
            [
              249,
              7957
            ],
            [
              112,
              7916
            ],
            [
              55,
              7848
            ],
            [
              -55,
              7926
            ],
            [
              -132,
              8017
            ],
            [
              -258,
              8039
            ],
            [
              -406,
              8153
            ],
            [
              -429,
              8222
            ],
            [
              -416,
              8304
            ],
            [
              -472,
              8419
            ],
            [
              -469,
              8730
            ],
            [
              -511,
              8802
            ],
            [
              -474,
              8901
            ],
            [
              -377,
              8987
            ],
            [
              -351,
              9054
            ],
            [
              -366,
              9129
            ],
            [
              -331,
              9226
            ],
            [
              -265,
              9286
            ],
            [
              -5,
              9209
            ],
            [
              58,
              9181
            ],
            [
              200,
              9212
            ],
            [
              272,
              9180
            ],
            [
              390,
              9278
            ],
            [
              458,
              9358
            ],
            [
              536,
              9367
            ],
            [
              577,
              9273
            ],
            [
              511,
              9205
            ],
            [
              434,
              9189
            ],
            [
              400,
              9211
            ],
            [
              384,
              9157
            ],
            [
              337,
              9165
            ],
            [
              283,
              9081
            ],
            [
              321,
              9027
            ],
            [
              430,
              9062
            ],
            [
              507,
              9035
            ],
            [
              592,
              9108
            ],
            [
              578,
              9122
            ],
            [
              644,
              9223
            ],
            [
              778,
              9291
            ],
            [
              798,
              9282
            ],
            [
              792,
              9144
            ],
            [
              819,
              9067
            ],
            [
              789,
              8979
            ],
            [
              824,
              8929
            ],
            [
              724,
              8912
            ],
            [
              657,
              8862
            ],
            [
              612,
              8791
            ],
            [
              612,
              8736
            ],
            [
              672,
              8747
            ],
            [
              710,
              8720
            ],
            [
              829,
              8731
            ],
            [
              865,
              8711
            ],
            [
              902,
              8540
            ],
            [
              979,
              8434
            ],
            [
              952,
              8331
            ],
            [
              964,
              8257
            ],
            [
              1082,
              8186
            ],
            [
              1096,
              8104
            ],
            [
              1226,
              8016
            ],
            [
              1160,
              7984
            ],
            [
              947,
              8010
            ],
            [
              778,
              7999
            ],
            [
              656,
              7926
            ],
            [
              546,
              7812
            ],
            [
              535,
              7738
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.BK",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.45,
        "hc-middle-y": 0.52,
        "hc-key": "ir-bk",
        "hc-a2": "BK",
        "labelrank": "7",
        "hasc": "IR.BK",
        "alt-name": "Bakhtaran|Kermanshahan",
        "woe-id": "2345777",
        "subregion": null,
        "fips": "IR13",
        "postal-code": "BK",
        "name": "کرمانشاه",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "46.6893",
        "woe-name": "Kermanshah",
        "latitude": "34.2796",
        "woe-label": "Kermanshah, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              723,
              6115
            ],
            [
              658,
              6112
            ],
            [
              654,
              6024
            ],
            [
              553,
              5997
            ],
            [
              542,
              5915
            ],
            [
              423,
              5905
            ],
            [
              444,
              5844
            ],
            [
              421,
              5779
            ],
            [
              334,
              5788
            ],
            [
              237,
              5769
            ],
            [
              173,
              5778
            ],
            [
              35,
              5831
            ],
            [
              -40,
              5894
            ],
            [
              -129,
              5913
            ],
            [
              -210,
              5953
            ],
            [
              -330,
              5951
            ],
            [
              -344,
              5871
            ],
            [
              -401,
              5699
            ],
            [
              -436,
              5735
            ],
            [
              -521,
              5913
            ],
            [
              -578,
              5941
            ],
            [
              -485,
              6038
            ],
            [
              -463,
              6128
            ],
            [
              -506,
              6175
            ],
            [
              -535,
              6254
            ],
            [
              -485,
              6284
            ],
            [
              -482,
              6349
            ],
            [
              -376,
              6314
            ],
            [
              -385,
              6409
            ],
            [
              -405,
              6431
            ],
            [
              -374,
              6494
            ],
            [
              -335,
              6507
            ],
            [
              -326,
              6552
            ],
            [
              -283,
              6536
            ],
            [
              -265,
              6623
            ],
            [
              -231,
              6665
            ],
            [
              -180,
              6644
            ],
            [
              -104,
              6665
            ],
            [
              -85,
              6742
            ],
            [
              -106,
              6790
            ],
            [
              8,
              6695
            ],
            [
              129,
              6506
            ],
            [
              164,
              6489
            ],
            [
              176,
              6408
            ],
            [
              318,
              6414
            ],
            [
              374,
              6498
            ],
            [
              432,
              6537
            ],
            [
              500,
              6542
            ],
            [
              512,
              6598
            ],
            [
              591,
              6599
            ],
            [
              627,
              6668
            ],
            [
              709,
              6617
            ],
            [
              789,
              6518
            ],
            [
              829,
              6513
            ],
            [
              754,
              6379
            ],
            [
              672,
              6360
            ],
            [
              703,
              6309
            ],
            [
              775,
              6272
            ],
            [
              795,
              6222
            ],
            [
              883,
              6281
            ],
            [
              898,
              6237
            ],
            [
              872,
              6149
            ],
            [
              755,
              6163
            ],
            [
              723,
              6115
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.GI",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.63,
        "hc-middle-y": 0.76,
        "hc-key": "ir-gi",
        "hc-a2": "GI",
        "labelrank": "4",
        "hasc": "IR.GI",
        "alt-name": null,
        "woe-id": "2345773",
        "subregion": null,
        "fips": "IR08",
        "postal-code": "GI",
        "name": "گیلان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "49.5162",
        "woe-name": "Gilan",
        "latitude": "37.0503",
        "woe-label": "Gilan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2355,
              7822
            ],
            [
              2280,
              7743
            ],
            [
              2267,
              7688
            ],
            [
              2205,
              7612
            ],
            [
              2087,
              7613
            ],
            [
              1934,
              7547
            ],
            [
              1756,
              7594
            ],
            [
              1639,
              7725
            ],
            [
              1611,
              7835
            ],
            [
              1532,
              7938
            ],
            [
              1454,
              7992
            ],
            [
              1449,
              8092
            ],
            [
              1371,
              8175
            ],
            [
              1289,
              8317
            ],
            [
              1246,
              8454
            ],
            [
              1285,
              8576
            ],
            [
              1410,
              8713
            ],
            [
              1344,
              8795
            ],
            [
              1432,
              8824
            ],
            [
              1482,
              8814
            ],
            [
              1475,
              8736
            ],
            [
              1504,
              8473
            ],
            [
              1538,
              8347
            ],
            [
              1598,
              8268
            ],
            [
              1759,
              8176
            ],
            [
              1963,
              8142
            ],
            [
              2021,
              8140
            ],
            [
              2134,
              8104
            ],
            [
              2172,
              8053
            ],
            [
              2222,
              7934
            ],
            [
              2355,
              7822
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.KD",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.62,
        "hc-middle-y": 0.49,
        "hc-key": "ir-kd",
        "hc-a2": "KD",
        "labelrank": "4",
        "hasc": "IR.KD",
        "alt-name": "Kurdistan",
        "woe-id": "2345779",
        "subregion": null,
        "fips": "IR16",
        "postal-code": "KD",
        "name": "کردستان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "46.8636",
        "woe-name": "Kordestan",
        "latitude": "35.5778",
        "woe-label": "Kordestan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              1057,
              6997
            ],
            [
              959,
              7040
            ],
            [
              987,
              6960
            ],
            [
              913,
              6927
            ],
            [
              873,
              6987
            ],
            [
              821,
              6939
            ],
            [
              857,
              6881
            ],
            [
              909,
              6747
            ],
            [
              986,
              6665
            ],
            [
              999,
              6603
            ],
            [
              946,
              6508
            ],
            [
              918,
              6559
            ],
            [
              829,
              6513
            ],
            [
              789,
              6518
            ],
            [
              709,
              6617
            ],
            [
              627,
              6668
            ],
            [
              591,
              6599
            ],
            [
              512,
              6598
            ],
            [
              500,
              6542
            ],
            [
              432,
              6537
            ],
            [
              374,
              6498
            ],
            [
              318,
              6414
            ],
            [
              176,
              6408
            ],
            [
              164,
              6489
            ],
            [
              129,
              6506
            ],
            [
              8,
              6695
            ],
            [
              -106,
              6790
            ],
            [
              -185,
              6935
            ],
            [
              -160,
              7044
            ],
            [
              -136,
              7065
            ],
            [
              -26,
              7073
            ],
            [
              18,
              7108
            ],
            [
              3,
              7147
            ],
            [
              -51,
              7130
            ],
            [
              -116,
              7174
            ],
            [
              -241,
              7152
            ],
            [
              -303,
              7168
            ],
            [
              -337,
              7241
            ],
            [
              -413,
              7295
            ],
            [
              -371,
              7325
            ],
            [
              -280,
              7448
            ],
            [
              -190,
              7470
            ],
            [
              -145,
              7555
            ],
            [
              -97,
              7570
            ],
            [
              38,
              7542
            ],
            [
              319,
              7550
            ],
            [
              374,
              7489
            ],
            [
              490,
              7462
            ],
            [
              532,
              7477
            ],
            [
              600,
              7567
            ],
            [
              615,
              7551
            ],
            [
              884,
              7482
            ],
            [
              921,
              7403
            ],
            [
              931,
              7317
            ],
            [
              914,
              7201
            ],
            [
              888,
              7138
            ],
            [
              1033,
              7040
            ],
            [
              1057,
              6997
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.KJ",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.52,
        "hc-middle-y": 0.55,
        "hc-key": "ir-kj",
        "hc-a2": "KJ",
        "labelrank": "4",
        "hasc": "IR.KJ",
        "alt-name": "Khorasan-e Janubi",
        "woe-id": "56189825",
        "subregion": null,
        "fips": "IR41",
        "postal-code": "KJ",
        "name": "خراسان شمالی",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "59.489",
        "woe-name": null,
        "latitude": "32.4563",
        "woe-label": null,
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              7821,
              6039
            ],
            [
              7856,
              5881
            ],
            [
              7839,
              5792
            ],
            [
              7857,
              5744
            ],
            [
              7942,
              5698
            ],
            [
              8068,
              5700
            ],
            [
              8041,
              5601
            ],
            [
              8009,
              5573
            ],
            [
              7913,
              5421
            ],
            [
              7927,
              5316
            ],
            [
              8109,
              4828
            ],
            [
              8105,
              4708
            ],
            [
              8088,
              4677
            ],
            [
              8142,
              4322
            ],
            [
              8319,
              4305
            ],
            [
              8331,
              4186
            ],
            [
              8281,
              3994
            ],
            [
              8288,
              3767
            ],
            [
              8328,
              3639
            ],
            [
              8320,
              3604
            ],
            [
              8222,
              3586
            ],
            [
              8172,
              3623
            ],
            [
              8071,
              3746
            ],
            [
              7996,
              3793
            ],
            [
              7874,
              3837
            ],
            [
              7430,
              3676
            ],
            [
              7180,
              3996
            ],
            [
              7094,
              4053
            ],
            [
              6426,
              4312
            ],
            [
              6532,
              4556
            ],
            [
              6602,
              4662
            ],
            [
              6624,
              4801
            ],
            [
              6546,
              4941
            ],
            [
              6566,
              5063
            ],
            [
              6602,
              5124
            ],
            [
              6616,
              5204
            ],
            [
              6688,
              5326
            ],
            [
              6858,
              5453
            ],
            [
              6923,
              5577
            ],
            [
              6835,
              5634
            ],
            [
              6792,
              5691
            ],
            [
              6811,
              5943
            ],
            [
              6790,
              6014
            ],
            [
              6819,
              6027
            ],
            [
              6966,
              6007
            ],
            [
              6995,
              6038
            ],
            [
              7159,
              6073
            ],
            [
              7265,
              6131
            ],
            [
              7357,
              6023
            ],
            [
              7432,
              6002
            ],
            [
              7778,
              6029
            ],
            [
              7821,
              6039
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.KV",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.49,
        "hc-middle-y": 0.45,
        "hc-key": "ir-kv",
        "hc-a2": "KV",
        "labelrank": "4",
        "hasc": "IR.KV",
        "alt-name": "Khorasan-e Razavi",
        "woe-id": "2345789",
        "subregion": null,
        "fips": "IR42",
        "postal-code": "KV",
        "name": "خراسان رضوی",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "58.7976",
        "woe-name": "Razavi Khorasan",
        "latitude": "35.584",
        "woe-label": "Khorasan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              6155,
              8491
            ],
            [
              6396,
              8422
            ],
            [
              6414,
              8359
            ],
            [
              6503,
              8332
            ],
            [
              6576,
              8377
            ],
            [
              6679,
              8353
            ],
            [
              6729,
              8389
            ],
            [
              6862,
              8348
            ],
            [
              6955,
              8285
            ],
            [
              7031,
              8275
            ],
            [
              7049,
              8160
            ],
            [
              7164,
              8077
            ],
            [
              7287,
              8038
            ],
            [
              7345,
              8001
            ],
            [
              7411,
              7989
            ],
            [
              7480,
              7892
            ],
            [
              7605,
              7743
            ],
            [
              8000,
              7784
            ],
            [
              8049,
              7781
            ],
            [
              8064,
              7742
            ],
            [
              8056,
              7626
            ],
            [
              8111,
              7436
            ],
            [
              8091,
              7359
            ],
            [
              8139,
              7276
            ],
            [
              8143,
              7138
            ],
            [
              8182,
              7058
            ],
            [
              8138,
              6934
            ],
            [
              8098,
              6869
            ],
            [
              8097,
              6811
            ],
            [
              8130,
              6753
            ],
            [
              8115,
              6723
            ],
            [
              8101,
              6557
            ],
            [
              8048,
              6490
            ],
            [
              8046,
              6433
            ],
            [
              7915,
              6340
            ],
            [
              8032,
              6216
            ],
            [
              7896,
              6197
            ],
            [
              7821,
              6078
            ],
            [
              7821,
              6039
            ],
            [
              7778,
              6029
            ],
            [
              7432,
              6002
            ],
            [
              7357,
              6023
            ],
            [
              7265,
              6131
            ],
            [
              7159,
              6073
            ],
            [
              6995,
              6038
            ],
            [
              6966,
              6007
            ],
            [
              6819,
              6027
            ],
            [
              6790,
              6014
            ],
            [
              6811,
              5943
            ],
            [
              6792,
              5691
            ],
            [
              6835,
              5634
            ],
            [
              6923,
              5577
            ],
            [
              6858,
              5453
            ],
            [
              6688,
              5326
            ],
            [
              6616,
              5204
            ],
            [
              6602,
              5124
            ],
            [
              6566,
              5063
            ],
            [
              6502,
              5142
            ],
            [
              6352,
              5219
            ],
            [
              6311,
              5300
            ],
            [
              6256,
              5580
            ],
            [
              6206,
              5651
            ],
            [
              6065,
              5611
            ],
            [
              5953,
              5620
            ],
            [
              5925,
              5660
            ],
            [
              5882,
              5851
            ],
            [
              5882,
              5964
            ],
            [
              5943,
              6176
            ],
            [
              5977,
              6246
            ],
            [
              6188,
              6410
            ],
            [
              6239,
              6465
            ],
            [
              6223,
              6549
            ],
            [
              6057,
              6664
            ],
            [
              5995,
              6677
            ],
            [
              5859,
              6635
            ],
            [
              5645,
              6523
            ],
            [
              5423,
              6456
            ],
            [
              5507,
              6568
            ],
            [
              5636,
              6675
            ],
            [
              5750,
              6723
            ],
            [
              5875,
              6959
            ],
            [
              5881,
              7006
            ],
            [
              5710,
              7144
            ],
            [
              5673,
              7261
            ],
            [
              5657,
              7386
            ],
            [
              5662,
              7459
            ],
            [
              5694,
              7564
            ],
            [
              5678,
              7616
            ],
            [
              5628,
              7625
            ],
            [
              5627,
              7697
            ],
            [
              5656,
              7740
            ],
            [
              5781,
              7850
            ],
            [
              5867,
              7850
            ],
            [
              6232,
              7671
            ],
            [
              6383,
              7657
            ],
            [
              6442,
              7689
            ],
            [
              6457,
              7742
            ],
            [
              6424,
              7783
            ],
            [
              6456,
              7838
            ],
            [
              6417,
              7894
            ],
            [
              6390,
              7867
            ],
            [
              6336,
              7917
            ],
            [
              6405,
              8138
            ],
            [
              6428,
              8178
            ],
            [
              6407,
              8234
            ],
            [
              6356,
              8276
            ],
            [
              6323,
              8337
            ],
            [
              6085,
              8336
            ],
            [
              6064,
              8349
            ],
            [
              6074,
              8427
            ],
            [
              6155,
              8491
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.KS",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.41,
        "hc-middle-y": 0.50,
        "hc-key": "ir-ks",
        "hc-a2": "KS",
        "labelrank": "4",
        "hasc": "IR.KS",
        "alt-name": "Khorasan-e Shemali",
        "woe-id": "-56189824",
        "subregion": null,
        "fips": "IR43",
        "postal-code": "KS",
        "name": "خراسان جنوبی",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "57.0475",
        "woe-name": null,
        "latitude": "37.5789",
        "woe-label": null,
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5628,
              7625
            ],
            [
              5547,
              7608
            ],
            [
              5437,
              7633
            ],
            [
              5374,
              7683
            ],
            [
              5297,
              7772
            ],
            [
              5298,
              7901
            ],
            [
              5350,
              7949
            ],
            [
              5264,
              7979
            ],
            [
              5179,
              8084
            ],
            [
              5232,
              8170
            ],
            [
              5377,
              8237
            ],
            [
              5404,
              8279
            ],
            [
              5393,
              8319
            ],
            [
              5326,
              8367
            ],
            [
              5333,
              8441
            ],
            [
              5321,
              8574
            ],
            [
              5391,
              8577
            ],
            [
              5387,
              8634
            ],
            [
              5458,
              8696
            ],
            [
              5537,
              8686
            ],
            [
              5617,
              8713
            ],
            [
              5665,
              8685
            ],
            [
              5777,
              8665
            ],
            [
              5841,
              8728
            ],
            [
              5870,
              8722
            ],
            [
              5942,
              8602
            ],
            [
              5950,
              8527
            ],
            [
              6028,
              8500
            ],
            [
              6155,
              8491
            ],
            [
              6074,
              8427
            ],
            [
              6064,
              8349
            ],
            [
              6085,
              8336
            ],
            [
              6323,
              8337
            ],
            [
              6356,
              8276
            ],
            [
              6407,
              8234
            ],
            [
              6428,
              8178
            ],
            [
              6405,
              8138
            ],
            [
              6336,
              7917
            ],
            [
              6390,
              7867
            ],
            [
              6417,
              7894
            ],
            [
              6456,
              7838
            ],
            [
              6424,
              7783
            ],
            [
              6457,
              7742
            ],
            [
              6442,
              7689
            ],
            [
              6383,
              7657
            ],
            [
              6232,
              7671
            ],
            [
              5867,
              7850
            ],
            [
              5781,
              7850
            ],
            [
              5656,
              7740
            ],
            [
              5627,
              7697
            ],
            [
              5628,
              7625
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.SB",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.46,
        "hc-middle-y": 0.65,
        "hc-key": "ir-sb",
        "hc-a2": "SB",
        "labelrank": "4",
        "hasc": "IR.SB",
        "alt-name": "Baluchestan va Sistan|Seistan and Baluchistan|Sistan e Baloutchistan",
        "woe-id": "2345770",
        "subregion": null,
        "fips": "IR04",
        "postal-code": "SB",
        "name": "سیستان و بلوچستان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "61.0471",
        "woe-name": "Sistan and Baluchestan",
        "latitude": "27.4268",
        "woe-label": "Sistan va Baluchestan, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              7467,
              205
            ],
            [
              7468,
              254
            ],
            [
              7347,
              415
            ],
            [
              7197,
              526
            ],
            [
              7213,
              581
            ],
            [
              7223,
              677
            ],
            [
              7254,
              768
            ],
            [
              7213,
              856
            ],
            [
              7245,
              911
            ],
            [
              7212,
              965
            ],
            [
              7242,
              1047
            ],
            [
              7159,
              1159
            ],
            [
              7120,
              1394
            ],
            [
              7175,
              1665
            ],
            [
              7179,
              1742
            ],
            [
              7163,
              1974
            ],
            [
              7227,
              2066
            ],
            [
              7242,
              2128
            ],
            [
              7145,
              2227
            ],
            [
              7244,
              2274
            ],
            [
              7377,
              2361
            ],
            [
              7419,
              2403
            ],
            [
              7391,
              2488
            ],
            [
              7382,
              2631
            ],
            [
              7427,
              2709
            ],
            [
              7440,
              2834
            ],
            [
              7411,
              2974
            ],
            [
              7342,
              3061
            ],
            [
              7344,
              3117
            ],
            [
              7430,
              3676
            ],
            [
              7874,
              3837
            ],
            [
              7996,
              3793
            ],
            [
              8071,
              3746
            ],
            [
              8172,
              3623
            ],
            [
              8222,
              3586
            ],
            [
              8320,
              3604
            ],
            [
              8328,
              3639
            ],
            [
              8288,
              3767
            ],
            [
              8281,
              3994
            ],
            [
              8331,
              4186
            ],
            [
              8319,
              4305
            ],
            [
              8631,
              4285
            ],
            [
              8686,
              4236
            ],
            [
              8685,
              4193
            ],
            [
              8745,
              4060
            ],
            [
              8733,
              3922
            ],
            [
              8236,
              3227
            ],
            [
              8513,
              2943
            ],
            [
              8549,
              2924
            ],
            [
              8558,
              2844
            ],
            [
              8652,
              2734
            ],
            [
              8709,
              2597
            ],
            [
              8766,
              2524
            ],
            [
              8920,
              2391
            ],
            [
              9015,
              2361
            ],
            [
              9205,
              2331
            ],
            [
              9342,
              2213
            ],
            [
              9438,
              2241
            ],
            [
              9457,
              2211
            ],
            [
              9451,
              2064
            ],
            [
              9487,
              1955
            ],
            [
              9526,
              1732
            ],
            [
              9499,
              1630
            ],
            [
              9533,
              1550
            ],
            [
              9605,
              1549
            ],
            [
              9751,
              1591
            ],
            [
              9804,
              1568
            ],
            [
              9851,
              1504
            ],
            [
              9801,
              1456
            ],
            [
              9831,
              1348
            ],
            [
              9785,
              1303
            ],
            [
              9772,
              1163
            ],
            [
              9536,
              1157
            ],
            [
              9444,
              1106
            ],
            [
              9343,
              1088
            ],
            [
              9265,
              1039
            ],
            [
              9243,
              935
            ],
            [
              9169,
              946
            ],
            [
              9154,
              905
            ],
            [
              9014,
              845
            ],
            [
              8989,
              793
            ],
            [
              8975,
              569
            ],
            [
              8917,
              519
            ],
            [
              8915,
              193
            ],
            [
              8835,
              125
            ],
            [
              8847,
              80
            ],
            [
              8798,
              33
            ],
            [
              8657,
              66
            ],
            [
              8646,
              93
            ],
            [
              8559,
              118
            ],
            [
              8314,
              147
            ],
            [
              8289,
              234
            ],
            [
              8256,
              259
            ],
            [
              8165,
              207
            ],
            [
              8212,
              151
            ],
            [
              8120,
              173
            ],
            [
              8089,
              204
            ],
            [
              8054,
              162
            ],
            [
              7974,
              189
            ],
            [
              7867,
              158
            ],
            [
              7787,
              194
            ],
            [
              7642,
              193
            ],
            [
              7589,
              232
            ],
            [
              7467,
              205
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.KE",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.60,
        "hc-middle-y": 0.41,
        "hc-key": "ir-ke",
        "hc-a2": "KE",
        "labelrank": "6",
        "hasc": "IR.KE",
        "alt-name": null,
        "woe-id": "2345788",
        "subregion": null,
        "fips": "IR29",
        "postal-code": "KE",
        "name": "کرمان",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "56.9567",
        "woe-name": "Kerman",
        "latitude": "30.1234",
        "woe-label": "Kerman, IR, Iran",
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              6426,
              4312
            ],
            [
              7094,
              4053
            ],
            [
              7180,
              3996
            ],
            [
              7430,
              3676
            ],
            [
              7344,
              3117
            ],
            [
              7342,
              3061
            ],
            [
              7411,
              2974
            ],
            [
              7440,
              2834
            ],
            [
              7427,
              2709
            ],
            [
              7382,
              2631
            ],
            [
              7391,
              2488
            ],
            [
              7419,
              2403
            ],
            [
              7377,
              2361
            ],
            [
              7244,
              2274
            ],
            [
              7145,
              2227
            ],
            [
              7242,
              2128
            ],
            [
              7227,
              2066
            ],
            [
              7163,
              1974
            ],
            [
              7179,
              1742
            ],
            [
              7175,
              1665
            ],
            [
              7120,
              1394
            ],
            [
              7159,
              1159
            ],
            [
              7242,
              1047
            ],
            [
              7212,
              965
            ],
            [
              7245,
              911
            ],
            [
              7213,
              856
            ],
            [
              7254,
              768
            ],
            [
              7223,
              677
            ],
            [
              7213,
              581
            ],
            [
              7137,
              631
            ],
            [
              7103,
              606
            ],
            [
              7022,
              606
            ],
            [
              7005,
              691
            ],
            [
              6910,
              715
            ],
            [
              6728,
              698
            ],
            [
              6763,
              1053
            ],
            [
              6801,
              1032
            ],
            [
              6750,
              1120
            ],
            [
              6661,
              1178
            ],
            [
              6622,
              1178
            ],
            [
              6557,
              1112
            ],
            [
              6308,
              1235
            ],
            [
              6295,
              1273
            ],
            [
              6267,
              1523
            ],
            [
              6199,
              1633
            ],
            [
              6219,
              1702
            ],
            [
              6123,
              1825
            ],
            [
              6052,
              1866
            ],
            [
              6024,
              2048
            ],
            [
              5929,
              2076
            ],
            [
              5824,
              1968
            ],
            [
              5718,
              1924
            ],
            [
              5647,
              1932
            ],
            [
              5533,
              2012
            ],
            [
              5478,
              2078
            ],
            [
              5477,
              2193
            ],
            [
              5459,
              2447
            ],
            [
              5441,
              2470
            ],
            [
              5356,
              2434
            ],
            [
              5241,
              2342
            ],
            [
              5158,
              2363
            ],
            [
              5078,
              2435
            ],
            [
              4921,
              2465
            ],
            [
              4797,
              2756
            ],
            [
              4629,
              2779
            ],
            [
              4602,
              2795
            ],
            [
              4519,
              2954
            ],
            [
              4502,
              3020
            ],
            [
              4610,
              3058
            ],
            [
              4594,
              3141
            ],
            [
              4597,
              3357
            ],
            [
              4559,
              3392
            ],
            [
              4545,
              3459
            ],
            [
              4476,
              3607
            ],
            [
              4486,
              3689
            ],
            [
              4561,
              3797
            ],
            [
              4883,
              3861
            ],
            [
              5004,
              3851
            ],
            [
              5112,
              3869
            ],
            [
              5208,
              3914
            ],
            [
              5217,
              4171
            ],
            [
              5240,
              4226
            ],
            [
              5538,
              4395
            ],
            [
              5577,
              4439
            ],
            [
              5693,
              4509
            ],
            [
              5730,
              4558
            ],
            [
              5803,
              4548
            ],
            [
              6426,
              4312
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": "IR.AL",
      "properties": {
        "hc-group": "admin1",
        "hc-middle-x": 0.55,
        "hc-middle-y": 0.36,
        "hc-key": "ir-al",
        "hc-a2": "AL",
        "labelrank": "7",
        "hasc": "IR.AL",
        "alt-name": null,
        "woe-id": "-20070200",
        "subregion": null,
        "fips": "IR26",
        "postal-code": "AL",
        "name": "البرز",
        "country": "Iran",
        "type-en": "Province",
        "region": null,
        "longitude": "50.7848",
        "woe-name": null,
        "latitude": "35.9651",
        "woe-label": null,
        "type": "Ostan"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              2467,
              7372
            ],
            [
              2590,
              7338
            ],
            [
              2620,
              7305
            ],
            [
              2731,
              7274
            ],
            [
              2766,
              7232
            ],
            [
              2763,
              7166
            ],
            [
              2644,
              7138
            ],
            [
              2611,
              7101
            ],
            [
              2601,
              7026
            ],
            [
              2553,
              7024
            ],
            [
              2537,
              6984
            ],
            [
              2457,
              6896
            ],
            [
              2401,
              6860
            ],
            [
              2377,
              6945
            ],
            [
              2339,
              6928
            ],
            [
              2354,
              6878
            ],
            [
              2310,
              6915
            ],
            [
              2178,
              6942
            ],
            [
              2157,
              7040
            ],
            [
              2318,
              7136
            ],
            [
              2370,
              7271
            ],
            [
              2308,
              7305
            ],
            [
              2261,
              7361
            ],
            [
              2339,
              7388
            ],
            [
              2467,
              7372
            ]
          ]
        ]
      }
    }
  ]
};


function chart_a_form_charts()
{
  if($("#chartdivpie").length == 1){highChart_pie();}
  if($("#chartdivbar").length == 1){highChart_bar();}
  if($("#chartdivmap").length == 1){highChart_map();}

}




function highChart_pie()
{

 Highcharts.chart('chartdivpie', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: $('#chartitemtitle').html()
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}'
            }
        }
    },
    series: [{
        name: $('#chartitemtitle').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdata").text())
    }]
});
}



function highChart_bar()
{

 Highcharts.chart('chartdivbar', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    title: {
        text: $('#chartitemtitle').html()
    },
    plotOptions: {
        column: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}'
            }
        }
    },
    series: [{
        name: $('#chartitemtitle').html(),
        colorByPoint: true,
        data: $.parseJSON($("#chartdata").text())
    }]
});
}





function highChart_map()
{

var data = $.parseJSON($("#chartdata").text()); //{{chartProvinceData |raw}};
// Create the chart
Highcharts.mapChart('chartdivmap', {
    chart: {
        map: 'countries/ir/ir-all',
        zoomType: 'x',
        style: {
          fontFamily: 'IRANSans, Tahoma, sans-serif'
        }
    },
    series: [{
        data: data,
        name: 'Registered',
        states: {
            hover: {
                color: '#BADA55'
            }
        }
    }]
});

console.log(data);

}
