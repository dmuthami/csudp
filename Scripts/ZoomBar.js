
// =====  Scripts/ZoomBar.js  =====    
var MG=function(a){
    a.zoomBar=function(){
        var l=$("#zoomBar"),c=$("#zoomBarActive"),d=false;
        c.on("dragstart selectstart",function(a){
            a.preventDefault()
            });
        var b=0,e=parseInt(l.attr("data-maxlevel"),10),j=[];
        function h(a){
            a+=b;
            if(0<=a&&a<=e){
                b=a;
                f(b);
                i()
                }
            }
        function g(g){
        var d=a.getTouch(g)[1]-c.offset().top,b=k(e-Math.round((d-7)/8));
        f(b);
        return b
        }
        function k(a){
        return a<0?0:a<e?a:e
        }
        function i(){
        $.each(j,function(c,a){
            a(b)
            })
        }
        function f(b){
        var a=c.offset();
        $("#zoomBarSlider").offset({
            left:a.left,
            top:a.top+2+(e-b)*8
            })
        }
        c.on("touchstart mousedown",function(a){
        d=true;
        g(a)
        });
    c.on("touchmove mousemove",function(a){
        d&&g(a)
        });
    c.on("touchend touchcancel mouseup",function(c){
        if(d){
            var a=g(c);
            if(a!=b){
                b=a;
                i()
                }
                d=false
            }
        });
c.on("touchleave mouseleave",function(){
    if(d){
        f(b);
        d=false
        }
    });
$("#zoomBarMinus").on("click",function(){
    h(-1)
    });
$("#zoomBarPlus").on("click",function(){
    h(1)
    });
var m={
    getLevel:function(){
        return b
        },
    levelChanged:function(a){
        j.push(a)
        },
    setLevel:function(a){
        b=k(a);
        f(b)
        }
    };

return m
};

return a
}(MG||{});
