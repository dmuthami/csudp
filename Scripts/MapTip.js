
// =====  Scripts/MapTip.js  =====    
var MG=function(a){
    a.mapTip=function(o){
        var d="propertyid",a="map tip",j="mouseleave",b=null,h=$("#mapTip"),e=o.map,c=o.selection,n=true,f=b,g=b,k=0,l=false,m=h.find("span.MapTip.Link");
        e.on("geomapbboxchange",i);
        e.on("geomapclick",function(){
            i();
            p();
            l=true
            });
        e.on(j,function(){
            p()
            });
        e.on("mousemove",function(j){
            i();
            if(!l&&n&&e.geomap("option","zoom")>=config.mapTip.zoomLevel){
                g&&clearTimeout(g);
                g=setTimeout(function(){
                    var i=k+=1,g=e.geomap("toMap",[j.pageX-e.offset().left,j.pageY-e.offset().top]),l=MG.timer();
                    $.getJSON("MapTip.ashx?x="+g[0]+"&y="+g[1],function(e){
                        if(i==k&&e&&e.values){
                            MG.logUse(a,"show tip",l);
                            $("#mapTipContent").html(e.values.join("<br/>"));
                            m.data(d,e.propertyid);
                            $("#mapTipAdd,#mapTipRemove,#mapTipAbutter,#mapTipAddAbutter,#mapTipRemoveAbutter").hide();
                            var n=c.hasParcelForProperty(e.propertyid);
                            $("#mapTipAdd").toggle(!n&&c.getParcels().length>0);
                            $("#mapTipRemove").toggle(n);
                            if(c.getBuffer()){
                                var g=c.hasAbutterForProperty(e.propertyid);
                                $("#mapTipAbutter").show();
                                $("#mapTipAddAbutter").toggle(!g);
                                $("#mapTipRemoveAbutter").toggle(g)
                                }
                                var o=j.pageY-13*(e.values.length+1)-7;
                            h.css({
                                left:j.pageX,
                                top:o
                            }).fadeTo(250,.9);
                            f=b
                            }
                        })
                },1e3)
            }
            l=false
        });
    h.on("mouseenter",function(){
        if(f){
            clearTimeout(f);
            f=b
            }
        });
h.on(j,function(){
    i()
    });
m.on("click",function(g){
    var f=$(g.target),b=f.data(d),e="mapTip";
    switch(f.attr("id")){
        case "mapTipSelect":
            MG.logUse(a,"select parcel");
            c.selectOne(b,e);
            break;
        case "mapTipAdd":
            MG.logUse(a,"add parcel");
            c.add(b,e);
            break;
        case "mapTipRemove":
            MG.logUse(a,"remove parcel");
            c.remove(b,e);
            break;
        case "mapTipAddAbutter":
            MG.logUse(a,"add abutter");
            c.addAbutter(b,e);
            break;
        case "mapTipRemoveAbutter":
            MG.logUse(a,"remove abutter");
            c.removeAbutter(b,e)
            }
            i()
    });
function i(){
    if(!f)f=setTimeout(function(){
        h.fadeOut(250);
        f=b
        },250)
    }
    function p(){
    if(g){
        clearTimeout(g);
        g=b;
        k+=1
        }
    }
var q={
    enable:function(a){
        n=a
        }
    };

return q
};

return a
}(MG||{});
