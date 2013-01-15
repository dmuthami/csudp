
// =====  Scripts/Inset.js  =====    
var MG=function(a){
    a.inset=function(m){
        var b="inset",a=null,i=$("#pnlInsetContainer"),j=m.mainMap,e=a,d=a,f=i.find("#insetMap").geomap({
            tilingScheme:a,
            bboxMax:config.inset.extent,
            zoom:0,
            mode:"static",
            services:[{
                id:b,
                type:"shingled",
                src:config.inset.imageSource
                }],
            shapeStyle:{
                color:"#FF0000"
            }
        }),c=a;
    i.find("#cmdInsetSize").on("click",function(e){
        var d=$(e.target),c=k();
        i.animate({
            width:c?config.inset.size.width+6:35,
            height:c?config.inset.size.height+6:35
            },500,a,function(){
            d.css("background-image",c?"url(Images/InsetShrink.png)":"url(Images/InsetGrow.png)")
            });
        c&&MG.logUse(b,"open panel")
        });
    f.on("touchstart mousedown",function(b){
        c=a;
        if(!k())if(b.shiftKey)e=h(b);
            else{
            c=$.geo.recenter(d,h(b));
            g(c)
            }
        });
f.on("touchmove mousemove",function(a){
    if(e){
        var b=h(a);
        g(l(e,b))
        }
        if(c){
        c=$.geo.recenter(c,h(a));
        g(c)
        }
    });
f.on("touchleave mouseleave",function(){
    if(c){
        e=a;
        c=a;
        g(d)
        }
    });
f.on("touchend touchcancel mouseup",function(i){
    var g=h(i),f=a;
    if(e){
        MG.logUse(b,"draw extent box");
        f=l(e,g);
        e=a
        }
        if(c){
        MG.logUse(b,"pan");
        f=$.geo.recenter(d,g);
        c=a
        }
        if(f){
        j.geomap("option","bbox",f);
        d=f
        }
    });
j.on("geomapbboxchange",function(b,a){
    d=a.bbox;
    g(d)
    });
function g(a){
    f.geomap("empty").geomap("append",{
        type:"Polygon",
        coordinates:[[[a[0],a[1]],[a[0],a[3]],[a[2],a[3]],[a[2],a[1]],[a[0],a[1]]]]
        })
    }
    function h(c){
    var b=MG.getTouch(c),a=f.offset();
    return f.geomap("toMap",[b[0]-a.left,b[1]-a.top])
    }
    function k(){
    return i.find("#insetFrame").width()<config.inset.size.width
    }
    function l(a,b){
    return [Math.min(a[0],b[0]),Math.min(a[1],b[1]),Math.max(a[0],b[0]),Math.max(a[1],b[1])]
    }
    function n(){
    d=j.geomap("option","bbox");
    g(d)
    }
    var o={
    update:n
};

return o
};

return a
}(MG||{});
