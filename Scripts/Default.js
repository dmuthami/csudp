
// =====  Scripts/Default.js  =====    
$(function(){
    var E="isDocked",M="find",D="px",o="zoom",L="mode",hb=".PanelContent",gb=".PanelControls",zb="#tboPrintableMapScale",yb="#tboMapLink",fb="drawText",eb="add markup",t="0px",k="append",C="toMap",y="Point",Rb="mouseleave",xb="#lnkGoogleStreetView",wb="#lnkBingBirdsEye",A="value",r=false,J="toggle",mb="option:selected",l="bbox",w="empty",bb="#tboDrawText",Q="drawStyle",z=-1e3,q="left",n="#pnlContextMenu",Db="#cmdDrawColor",j="click",P="close",ab="change",Cb="MapExpander",v=500,lb="#helpDoc",Z="open",u="id",I=".Dockable",d="map",Y="shapeStyle",a="option",O="graphics",X="thematicMap",H="#ddlThematicMap",kb="OpenStreetMap",jb="MapQuest",c="",N=".png",e="/",ib="MapBox Light",G="baseMap",h="selectedIndex",F="#ddlBaseMap",f=10,i=",",Bb=20037508.342787,p=null,g=true,Ab=g;
    MG.logStart(config.applicationInfo.id);
    var qb=MG.getUrlParams(),ob=p,Fb="showtiles" in qb;
    $("#touchPanel").toggle(MG.supportsTouch);
    var cb=$("#pnlWelcome");
    Pb();
    $.geo.proj=p;
    var V=39.37/12;
    $.geo.length=function(f){
        for(var a=f.coordinates,c=0,d,e,b=1;b<a.length;++b){
            d=a[b][0]-a[b-1][0];
            e=a[b][1]-a[b-1][1];
            c+=Math.sqrt(d*d+e*e)
            }
            c/=MG.webMercator.getScaleFactor(a[0]);
        return W(c*V)+" ft<br/>"+W(c)+" m"
        };
        
    $.geo.area=function(e){
        var a=e.coordinates[0],b=0;
        if(a.length>2)for(var f=a[0][1]*2,c=1;c<a.length;++c)b+=(a[c][0]-a[c-1][0])*(a[c][1]+a[c-1][1]-f);
        var d=MG.webMercator.getScaleFactor(a[0]);
        if(b!=0)b=Math.abs(b*.5)/(d*d);
        var d=b*V*V;
        return W(d/43560,3)+" acres<br/>"+W(d)+" sq ft<br/>"+W(b)+" sq m"
        };
        
    var nb={
        baseMap:[],
        thematicMap:[]
    },pb={
        tilingScheme:{
            tileWidth:256,
            tileHeight:256,
            levels:6,
            basePixelSize:2445.98490512499,
            pixelSizes:p,
            origin:[-20037508.342787,Bb]
            },
        bbox:config.map.fullExtent,
        bboxchange:U,
        services:[],
        measureLabels:{
            length:"{{:length!}}",
            area:"{{:area!}}"
        },
        drawStyle:{
            stroke:"#808080",
            strokeWidth:"2px",
            fill:"#808080",
            fillOpacity:.3
        },
        shape:jc,
        click:mc,
        cursors:{
            pan:"default",
            drawText:"text",
            drawErase:"default"
        }
    };
    
if("extent" in qb)pb.bbox=$.map(qb.extent.split(i),function(a){
    return parseInt(a,f)
    });else pb.zoom=config.map.zoomBar.initialLevel;
    for(var db=$(F).prop(h),s=0;s<config.map.baseMaps.length;++s)Sb(config.map.baseMaps,G,s,s==db,1);
    for(s=0;s<config.map.externalMaps.length;++s){
    var S=config.map.baseMaps.length;
    switch(config.map.externalMaps[s]){
        case ib:
            B(S,G,function(a){
            var b=(["a","b","c","d"])[(a.tile.column*Math.pow(2,a.zoom)+a.tile.row)%4];
            return ["http://",b,".tiles.mapbox.com/v3/mapbox.mapbox-light/",a.zoom,e,a.tile.column,e,a.tile.row,N].join(c)
            },S==db,1);
        config.map.baseMaps.push({
            id:ib,
            copyright:"&copy; OpenStreetMap and contributors, CC-BY-SA - Tiles Courtesy of <a href='http://mapbox.com/' target='_blank'>MapBox - Development Seed</a>"
        });
        break;
        case jb:
            B(S,G,function(a){
            return ["http://otile1.mqcdn.com/tiles/1.0.0/osm/",a.zoom,e,a.tile.column,e,a.tile.row,N].join(c)
            },S==db,1);
        config.map.baseMaps.push({
            id:jb,
            copyright:"&copy; OpenStreetMap and contributors, CC-BY-SA - Tiles Courtesy of <a href='http://www.mapquest.com/' target='_blank'>MapQuest</a> <img src='http://developer.mapquest.com/content/osm/mq_logo.png'>"
        });
        break;
        case kb:
            B(S,G,function(a){
            return ["http://a.tile.openstreetmap.org/",a.zoom,e,a.tile.column,e,a.tile.row,N].join(c)
            },S==db,1);
        config.map.baseMaps.push({
            id:kb,
            copyright:"&copy; OpenStreetMap and contributors, CC-BY-SA"
        })
        }
        }
var Hb=$(H).prop(h)-1;
    for(s=0;s<config.map.thematicMaps.length;++s)Sb(config.map.thematicMaps,X,s,s==Hb,.5);
    B("abutter",O,R,g,1);
    B("buffer",O,R,g,1);
    B("target",O,R,g,1);
    B("selected",O,R,g,1);
    B("drawing",O,R,g,1);
    Fb&&B("tile",O,R,g,1);
    var b=$("#map").geomap(pb),Kb=b.find(".graphics.abutter").geomap(a,Y,{
    fillOpacity:0,
    stroke:"#0080FF",
    strokeWidth:"5px",
    strokeOpacity:.65
}),Lb=b.find(".graphics.buffer").geomap(a,Y,{
    fill:"#8080FF",
    fillOpacity:.25,
    stroke:"#0000FF",
    strokeWidth:"1px",
    strokeOpacity:.65
}),Mb=b.find(".graphics.target").geomap(a,Y,{
    fillOpacity:0,
    stroke:"#FF8000",
    strokeWidth:"7px",
    strokeOpacity:.85
}),Jb=b.find(".graphics.selected").geomap(a,Y,{
    fillOpacity:0,
    stroke:"#FFFF00",
    strokeWidth:"7px",
    strokeOpacity:.85
}),x=b.find(".graphics.drawing");
    if(Fb)var Ob=b.find(".graphics.tile").geomap(a,Y,{
    fillOpacity:0,
    stroke:"#404040",
    strokeWidth:"1px"
});
var Nb=$("#baseMapSlider").slider({
    max:1,
    step:.01,
    value:1,
    slide:function(a){
        rb(G,Eb,0,a)
        },
    stop:function(a){
        MG.logUse(d,"change base map transparency");
        rb(G,Eb,0,a)
        }
    }),Ib=$("#thematicMapSlider").slider({
    max:1,
    step:.01,
    value:.5,
    slide:function(a){
        rb(X,ub,1,a)
        },
    stop:function(a){
        MG.logUse(d,"change thematic map transparency");
        rb(X,ub,1,a)
        }
    });
$(I).each(function(){
    var d=$(this),c=d.attr(u),a=config.panels,e={
        container:b,
        isDocked:a.isDocked[c],
        docked:a.docked[c],
        opened:a.opened[c],
        motion:a.animation.motion,
        duration:Math.round(a.animation.duration*1e3),
        dock:hc,
        open:ic,
        draggable:{
            handle:"div.PanelHeader",
            stop:cc,
            containment:"window"
        }
    };
    
d.find("div.PanelBody").on("touchstart mousedown",function(){
    gc(d)
    });
if(c in a.resizable)e.resizable=$.extend({
    handles:"all",
    stop:Zb
},a.resizable[c]);
d.dockable(e);
    c in a.resizable&&vb(d)
    });
$("#help").dockable(Z,function(){
    var a=$(lb);
    !a.attr("src")&&a.attr("src","Help/MapGeoHelp-General.pdf")
    });
var fc=$("#cmdLegend"),T=$("#cmdPrintableMap"),ec=$("#cmdMapLink"),sb=$("#layer");
fc.expander({
    target:sb.get(0),
    openedHeight:v,
    closedHeight:config.panels.opened.layer.height,
    groupClass:Cb,
    change:function(b,a){
        $("#pnlLegend").toggle(a);
        a&&MG.logUse(d,"show legend")
        }
    });
T.expander({
    target:sb.get(0),
    openedHeight:MG.supportsTouch?370:345,
    closedHeight:config.panels.opened.layer.height,
    groupClass:Cb,
    change:function(b,a){
        $("#pnlPrintableMap").fadeTo(v,a?1:0);
        a&&MG.logUse(d,"show printable map form")
        }
    });
ec.expander({
    target:sb.get(0),
    openedHeight:175,
    closedHeight:config.panels.opened.layer.height,
    groupClass:Cb,
    change:function(b,a){
        $("#pnlMapLink").fadeTo(v,a?1:0);
        a&&MG.logUse(d,"show map link")
        }
    });
$(".MapExpander").expander(ab,function(b,a){
    $(b).find("span").html(a?"&#9650":"&#9660")
    });
sb.dockable("dock",function(){
    T.expander(P)
    });
var Wb=MG.zoomBar(),m=MG.selection(),sc=MG.search({
    selection:m
}),pc=MG.propertyInfo({
    map:b,
    selection:m
}),lc=MG.abutters({
    selection:m
}),rc=MG.clientInfo(),nc=MG.mapTip({
    map:b,
    selection:m
}),oc=MG.inset({
    mainMap:b
});
$("#cmdAcceptDisclaimer").on(j,function(){
    $.cookie("accept","1",{
        expires:180
    });
    $(".Welcome").hide()
    });
$("#cmdCreatePrintableMap").on(j,function(){
    $("#layer").animate({
        height:120
    });
    T.expander(P);
    Yb();
    MG.logUse(d,"create printable map")
    });
$("#cmdDownloadHelp").on(j,function(){
    MG.logUse("help","download help PDF")
    });
$(Db).on(j,function(){
    $(n).css(q,z)
    }).colorSelector({
    selectorClass:"ColorSelector",
    colorChanged:function(c){
        var d=b.geomap(a,Q);
        d.stroke=c;
        d.fill=c;
        $(bb).css({
            color:c,
            borderColor:c
        })
        }
    });
$("#cmdDrawEraseAll").on(j,function(){
    $(n).css(q,z);
    x.geomap(w);
    MG.logUse(d,"erase all markup")
    });
$("#cmdTouch").on(j,function(){
    var b=$(this),a=b.offset();
    $(n).css(q,a.left+b.width()+20).css("top",a.top-69)
    });
$("#cmdWhatsNew").on(j,function(){
    Gb("WhatsNew")
    });
$("#cmdZoomFull").on(j,function(){
    b.geomap(a,l,config.map.fullExtent);
    U();
    MG.logUse(d,"full extent")
    });
var Eb=$(F).on(ab,function(){
    var a="Disabled",f=$(this),c=f.find(mb).text(),e=f.prop(h);
    b.find(".baseMap").geomap(J,r);
    b.find(".baseMap."+e).geomap(J,g);
    Nb.slider(A,nb.baseMap[e]);
    $("#pnlBaseMapLegend > div").hide();
    $("#pnlBaseMaps_"+config.map.baseMaps[e].id).show();
    if(c==jb||c==kb||c==ib)T.addClass(a).expander(P,g);else T.removeClass(a);
    Qb();
    K();
    !Ab&&MG.logUse(d,"change base map",c)
    }),ub=$(H).on(ab,function(){
    var c=$(this),a=c.prop(h)-1;
    b.find(".thematicMap").geomap(J,r);
    b.find(".thematicMap."+a).geomap(J,g);
    Ib.slider(A,nb.thematicMap[a]);
    $("#pnlThematicMapLegend > div").hide();
    a>=0&&$("#pnlThematicMaps_"+config.map.thematicMaps[a].id).show();
    Qb();
    K();
    !Ab&&MG.logUse(d,"change thematic map",c.find(mb).text())
    });
$(wb).on(j,function(){
    MG.logUse(d,"open Bing Birds Eye")
    });
$(xb).on(j,function(){
    MG.logUse(d,"open Google Street View")
    });
$("#lnkMapGallery").on(j,function(){
    MG.logUse(d,"open map gallery")
    });
b.on("contextmenu",function(a){
    $(n).css(q,a.pageX-f).css("top",a.pageY-f);
    return r
    });
$(n).on(Rb,function(){
    $(n).css(q,z)
    });
$("#pnlDrawColor span").on(j,function(){
    $(Db).colorSelector("showSelector");
    $(n).css(q,z)
    });
$("#pnlPrintableMap .PanelClose").on(j,function(){
    closePrintableMapDialog()
    });
$(bb).on("keydown",function(l){
    if(l.keyCode==13){
        var e=$(this),f=e.val(),h=e.offset();
        e.val(c).hide();
        if(f){
            var g=b.geomap(a,Q).stroke,j={
                type:y,
                coordinates:b.geomap(C,[h.left+1,h.top+23]),
                text:f,
                color:g,
                measure:r
            },i=["<div class='DrawText' style='color: ",g,"'>",f,"</div>"].join(c);
            x.geomap(k,j,{
                width:t,
                height:t,
                strokeWidth:t
            },i);
            MG.logUse(d,eb,fb)
            }
        }
});
$(yb).on(j,function(){
    $(this).focus().select()
    });
$(zb).on("keypress",function(a){
    var b=a.keyCode?a.keyCode:a.charCode;
    if(!(48<=b&&b<=57))return r
        });
$("#zoomPanel").on("mouseenter",function(){
    $(this).fadeTo(v,1)
    }).on(Rb,function(){
    $(this).fadeTo(v,.5)
    });
$(window).on("resize",function(){
    Pb()
    });
$(window).on("unload",function(){
    config.applicationInfo.logUse&&MG.logEnd()
    });
$(I).on(j,function(a){
    $(a.target).parents(I).dockable(Z)
    });
$(".Dockable .PanelClose").on(j,function(a){
    $(a.target).parents(gb).hide().parents(I).dockable("dock").find(hb).hide();
    a.stopPropagation()
    });
$(".HelpExpander").on(j,function(){
    var a=$(this).attr(u).substr(7);
    Gb(a)
    });
$(".LocalHelp").on(j,function(){
    var a=$(this).attr(u).substr(12);
    $("#help").dockable(Z);
    Gb(a)
    });
$(".ToolOption").on(j,function(g){
    var c="Selected";
    $(".ToolOption.Selected").removeClass(c);
    var e=$(g.target).addClass(c);
    $(n).css(q,z);
    var f=e.attr("data-mode");
    nc.enable(f=="pan");
    MG.logUse(d,"pick "+e.text().toLowerCase()+" tool");
    b.geomap(a,L,f)
    });
function hc(b){
    var a=$(b.target);
    vb(a);
    Ub(a);
    K()
    }
    function cc(a){
    Vb($(a.target))
    }
    function ic(b){
    var a=$(b.target);
    a.find(gb).show();
    a.find(hb).show();
    vb(a);
    Ub(a);
    K()
    }
    function Zb(){
    var a=$(this);
    a.offset().top<0&&a.offset({
        top:0
    });
    Vb(a)
    }
    m.parcelsChanged(function(e){
    Mb.geomap(w);
    Jb.geomap(w);
    var d=$.map(m.getParcels(),function(a){
        return a.geometry
        });
    if(d.length){
        $.each(d,function(){
            Mb.geomap(k,this)
            });
        Jb.geomap(k,m.getProperty().parcel.geometry);
        if(e=="search"){
            var c=p;
            $.each(d,function(){
                c=ac(c,$.geo.bbox(this))
                });
            c=$.geo.scaleBy(c,3);
            b.geomap(a,l,c);
            U()
            }
        }
    K()
    });
m.abuttersChanged(function(){
    Kb.geomap(w);
    Lb.geomap(w);
    var a=$.map(m.getAbutters(),function(a){
        return a.geometry
        });
    a.length&&$.each(a,function(){
        Kb.geomap(k,this)
        });
    var b=m.getBuffer();
    b&&Lb.geomap(k,b);
    K()
    });
Wb.levelChanged(function(c){
    b.geomap(a,o,c+config.map.zoomBar.offset);
    U()
    });
function Sb(b,f,a,g,d){
    if("opacity" in b[a])d=b[a].opacity;
    nb[f][a]=d;
    $.each(b[a].tileSets,function(){
        var b=this,h=function(a){
            var d=b.tileUrlScheme||"LCR";
            switch(d){
                case "LCR":
                    return [b.tileCacheUrl,e,a.zoom,e,a.tile.row,e,a.tile.column].join(c);
                case "WMS":
                    return [b.tileCacheUrl,"&width=256&height=256&bbox=",a.bbox[0],i,a.bbox[3],i,a.bbox[2],i,a.bbox[1]].join(c)
                    }
                };
        
    B(a,f,h,g,d)
        })
}
function B(d,c,b,f,e){
    var a={
        "class":c+" "+d,
        type:"tiled",
        src:b,
        style:{
            visibility:f?"visible":"hidden",
            opacity:e
        }
    };
    
pb.services.push(a)
}
function bc(){
    var d=b.geomap(a,o)-config.map.zoomBar.offset,c=config.map.zoomBar.levels-1;
    if(d<0)b.geomap(a,o,config.map.zoomBar.offset);else d>c&&b.geomap(a,o,c+config.map.zoomBar.offset)
        }
        function gc(c){
    var b="css3-container",a="z-index",d=c.css(a);
    $(I).not("#"+c.attr(u)).each(function(g,f){
        var e=$(f),c=e.css(a);
        c>d&&e.css(a,c-2).prev(b).css(a,c-3)
        });
    c.css(a,20).prev(b).css(a,19)
    }
    function Pb(){
    if(cb.length&&cb.css("display")=="block"){
        var a=Math.round(($("body").width()-cb.width())*.5)+D,b=Math.round(($("body").height()-cb.height())*.5)+D;
        cb.css({
            left:a,
            top:b
        })
        }
    }
function Yb(){
    var e=b.geomap(a,l),d=m.getProperty(),c=parseInt(ob),j,i;
    switch($(".PrintOption:checked").val()){
        case "1":
            c=parseInt(tb());
            break;
        case "2":
            c=parseInt($(zb).val());
            if(!c||c>2e4)c=v
            }
            e=$.geo.scaleBy(e,c/ob);
    var f=$.map(x.geomap(M,"*"),function(a){
        var b={
            type:a.type,
            coordinates:a.coordinates,
            color:a.color
            };
            
        if("text" in a)b.text=a.text;
        if("measure" in a)b.measure=a.measure;
        return b
        }),g={
        baseMap:$(F).prop(h),
        baseMapOpacity:Nb.slider(a,A),
        thematicMap:$(H).prop(h),
        thematicMapOpacity:Ib.slider(a,A),
        extent:e,
        selected:d?d.parcel.geometry:p,
        targets:$.map(m.getParcels(),function(a){
            return a.geometry
            }),
        abutters:$.map(m.getAbutters(),function(a){
            return a.geometry
            }),
        buffer:m.getBuffer(),
        abuttersDistance:$("#tboAbutterDistance").val(),
        graphics:f,
        propertyID:d?d.id:p,
        title:$("#tboPrintableMapTitle").val(),
        size:$(".PrintSize:checked").val(),
        orientation:$(".PrintOrientation:checked").val(),
        legend:$(".printLegend").attr("checked")?1:0,
        scale:c
    };
    
    $("#hdnPrintConfig").val($.stringifyJSON(g));
    $("#frmPrintableMap").submit()
    }
    function kc(){
    if(Fb){
        Ob.geomap(w);
        var h=b.geomap(a,o),e=Bb,d=e*Math.pow(2,1-h),q=b.geomap(a,l),y=Math.floor((e-q[3])/d)+1,z=Math.floor((e-q[1])/d)+1,u=Math.floor((q[0]+e)/d),v=Math.floor((q[2]+e)/d),x=Math.pow(2,h),D=Math.floor(h*.5),s=2<<D,p=s>f?Math.floor(Math.log(s)/Math.LN10)+1:1;
        function n(a,f){
            var d=1;
            if(a>9)d=a>11?parseInt(Math.ceil(Math.log(a)/Math.LN10-.001)):2;
            var e=f-d,b=c;
            while(e>0){
                b+="0";
                e-=1
                }
                b+=a;
            return b
            }
            for(var i=y;i<=z;++i)for(var g=u;g<=v;++g){
            var j=g*d-e,m=-(i*d-e),E={
                type:"Polygon",
                coordinates:[[[j,m],[j,m+d],[j+d,m+d],[j+d,m],[j,m]]]
                },t=x-i,A=n(Math.floor(g/s),p),B=n(Math.floor(t/s),p),F=n(g,p*2),t=n(t,p*2),C="Level "+h+", Row "+(i-1)+", Column "+g+"<br/>GWC "+h+" \\ "+A+"_"+B+" \\ "+F+"_"+t;
            Ob.geomap(k,E,"<div class='TileText'>"+C+"</div>",r)
            }
        }
        }
function ac(a,b){
    if(!a)return b.length==4?b:[b[0],b[1],b[0],b[1]];
    a=[a[0],a[1],a[2],a[3]];
    for(var c=0;c<b.length;c+=2){
        if(b[c]<a[0])a[0]=b[c];
        if(b[c+1]<a[1])a[1]=b[c+1]
            }
            return a
    }
    function U(){
    bc();
    var e=b.geomap(a,l),d=MG.webMercator.toGeodetic($.geo.center(e));
    $(xb).attr("href",["http://maps.google.com/?ll=",d[1],i,d[0],"&z=6&layer=c&cbll=",d[1],i,d[0],"&cbp=11,0,,0,0"].join(c));
    $(wb).attr("href",["http://www.bing.com/maps/?v=2&cp=",d[1],"~",d[0],"&lvl=6&dir=0&style=b"].join(c));
    Wb.setLevel(b.geomap(a,o)-config.map.zoomBar.offset);
    oc.update();
    dc();
    Xb();
    kc();
    K()
    }
    function rb(d,f,e,g){
    var a=$(g.target).slider(A),c=f.prop(h)-e;
    nb[d][c]=a;
    b.find("."+d+"."+c).geomap("opacity",a)
    }
    function W(a,b){
    for(var e=a.toFixed(b).split(c),a=e.length-(b?b+1:0),d=(a-1)%3+1;d<a;d+=4){
        e.splice(d,0,i);
        a+=1
        }
        return e.join(c)
    }
    function tb(){
    var c=MG.webMercator.getScaleFactor($.geo.center(b.geomap(a,l)));
    return b.geomap(a,"tilingScheme").basePixelSize*Math.pow(2,-b.geomap(a,o))*96/(c/V)
    }
    function mc(k,i){
    var c="remove";
    switch(b.geomap(a,L)){
        case fb:
            var j=b.geomap("toPixel",i.coordinates);
            $(bb).css({
            left:j[0]-2+D,
            top:j[1]-f+D
            }).show().focus();
            return;
        case "drawErase":
            var h=r;
            $.each(x.geomap(M,i,8),function(){
            var a=this;
            if(!(a.type==y)){
                a.related&&x.geomap(c,a.related);
                x.geomap(c,a);
                h=g
                }
            });
        var e=i.coordinates;
        $.each(x.geomap(M,"*"),function(){
            var a=this;
            if(a.type==y&&!a.measure){
                var d=b.geomap("toPixel",a.coordinates),i=b.geomap(C,[d[0]+4,d[1]-5]),f=b.geomap(C,[d[0]+4+Math.round(a.text.length*13*.55),d[1]-18]);
                if(i[0]<=e[0]&&e[0]<=f[0]&&i[1]<=e[1]&&e[1]<=f[1]){
                    x.geomap(c,a);
                    h=g
                    }
                }
        });
h&&MG.logUse(d,"erase markup");
return
}
}
function R(){
    return c
    }
    function Tb(b,d,c){
    var a=$.cookie("config");
    a=a?$.parseJSON(a):{
        panels:{}
};

if(!(b in a.panels))a.panels[b]={};
    
a.panels[b][d]=c;
$.cookie("config",$.stringifyJSON(a),{
    expires:60
})
}
function Ub(a){
    Tb(E,a.attr(u),a.dockable(E))
    }
    function Vb(a){
    Tb("opened",a.attr(u),a.dockable("opened"))
    }
    function jc(p,e){
    var f="measureLength",i={};
    
    $.extend(g,i,b.geomap(a,Q));
    e.color=i.stroke;
    x.geomap(k,e,i);
    var h=b.geomap(a,L);
    if(h==f||h=="measureArea"){
        var j=h==f?$.geo.length(e):$.geo.area(e),o=h==f?e.coordinates[e.coordinates.length-1]:e.coordinates[0][e.coordinates[0].length-2],l={
            type:y,
            coordinates:o,
            text:j.replace(/<br\/>/g,"|"),
            color:e.color,
            measure:g
        };
        
        e.related=l;
        var m=["color: ",e.color,"; text-shadow: none; filter: none"].join(c),n=["<div style='padding-left: 6px; padding-top: 4px'><div class='geo_measure_label' style='",m,"'>",j.replace(/\s/g,"&nbsp;"),"</div></div>"].join(c);
        x.geomap(k,l,{
            width:t,
            height:t,
            strokeWidth:t
        },n)
        }
        MG.logUse(d,eb,h)
    }
    function Qb(){
    var d=$("#copyright").empty(),b=config.map.baseMaps[$(F).prop(h)].copyright,e=$(H).prop(h)-1,a=e>=0?config.map.thematicMaps[e].copyright:p;
    if(b||a){
        var f=(b?"Base Map "+b:c)+(b&&a?" - ":c)+(a?"Thematic Map "+a:c);
        d.empty().append(f.replace(/{year}/g,(new Date).getFullYear())).show()
        }else d.hide()
        }
        function Gb(a){
    $(lb).attr("src","Help/MapGeoHelp-"+a+".pdf");
    MG.logUse("help","show help document",a)
    }
    function dc(){
    $("#scaleText").text(parseInt(tb(),f)+" ft")
    }
    function Xb(){
    var d=7.5,g=7.5,c=b.geomap(a,l);
    c=$.geo.reaspect(c,d/g);
    var h=MG.webMercator.getScaleFactor($.geo.center(c)),e=$.geo.width(c)/(h/V);
    ob=e/d;
    $("#spnPrintableExtentScale").text(parseInt(ob,f));
    $("#spnPrintableCurrentScale").text(parseInt(tb(),f))
    }
    function vb(a){
    a.find(".ui-resizable-handle").toggle(!a.dockable(E))
    }
    function K(){
    var g=document.location.href,d=g.split("#");
    d=d[0].split("?");
    d=d[0].split(e);
    var n=d.length-1;
    if(d[n]=="Default.aspx")d[n]=c;
    g=d.join(e);
    var i=b.geomap(a,l);
    g+="?extent="+[parseInt(i[0],f),parseInt(i[1],f),parseInt(i[2],f),parseInt(i[3],f)].join();
    var j=$(F).prop(h);
    g+="&basemap="+config.map.baseMaps[j].id;
    j=$(H).prop(h)-1;
    if(j>=0)g+="&thematicmap="+config.map.thematicMaps[j].id;
    var o=m.getProperty();
    if(o)g+="&propertyid="+escape(o.id);
    var k=$("#abutter");
    if(k.length&&!k.dockable(E))g+="&abutterdistance="+lc.getAbutterDistance();
    $(yb).val(g)
    }
    U();
Eb.trigger(ab);
Hb>=0&&ub.trigger(ab);
delete Ab;
setTimeout(function(){
    config.startup&&config.startup.propertyID&&m.selectOne(config.startup.propertyID,"extent" in qb?"start":"search");
    b.focus()
    },v)
});

