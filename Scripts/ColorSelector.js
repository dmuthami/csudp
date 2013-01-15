
// =====  Scripts/ColorSelector.js  =====    
(function(a){
    a.fn.colorSelector=function(f){
        var b=100,c="colorSelector",d="backgroundColor";
        function i(b,a){
            if(a.enabled)b.css(d,a.color).removeClass(a.disabledClass).addClass(a.enabledClass);else b.css(d,a.disabledColor).removeClass(a.enabledClass).addClass(a.disabledClass)
                }
                function j(a){
            a="ontouchend" in document?a.originalEvent.changedTouches[0]:a;
            return [a.pageX,a.pageY]
            }
            function k(a){
            var c=/rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(a);
            if(c&&c.length)a={
                r:parseInt(c[1],10),
                g:parseInt(c[2],10),
                b:parseInt(c[3],10)
                };
            else{
                c=/#([\d|A-F]{2})([\d|A-F]{2})([\d|A-F]{2})/i.exec(a);
                a={
                    r:parseInt(c[1],16),
                    g:parseInt(c[2],16),
                    b:parseInt(c[3],16)
                    }
                }
            var d=a.r>a.g?a.r>a.b?a.r:a.b:a.g>a.b?a.g:a.b,g=a.r<a.g?a.r<a.b?a.r:a.b:a.g<a.b?a.g:a.b,e=d-g,h=d>0?e*b/d:0,j=d*b/255,f=0;
        if(d>0&&e>0){
            var i=d==a.r?a.g-a.b:d==a.g?2*e+a.b-a.r:4*e+a.r-a.g;
            f=(360+i*60/e)%360
            }
            return {
            h:f,
            s:h,
            v:j
        }
    }
    function e(a){
    var d=(a.r<16?"0":"")+a.r.toString(16),c=(a.g<16?"0":"")+a.g.toString(16),b=(a.b<16?"0":"")+a.b.toString(16);
    return "#"+d+c+b
    }
    function g(f){
    var d=f.s*.01,c=f.v*.01,a=parseInt(c*255);
    if(this.s==0)return e({
        r:a,
        g:a,
        b:a
    });
    else{
        var j=f.h/60,i=parseInt(Math.floor(j)),k=j-i,b=parseInt(c*(1-d)*255),g=parseInt(c*(1-d*k)*255),h=parseInt(c*(1-d*(1-k))*255);
        switch(i){
            case 0:case 6:
                return e({
                r:a,
                g:h,
                b:b
            });
            case 1:
                return e({
                r:g,
                g:a,
                b:b
            });
            case 2:
                return e({
                r:b,
                g:a,
                b:h
            });
            case 3:
                return e({
                r:b,
                g:g,
                b:a
            });
            case 4:
                return e({
                r:h,
                g:b,
                b:a
            });
            case 5:
                return e({
                r:a,
                g:b,
                b:g
            })
            }
            }
}
var h={
    init:function(e){
        return this.each(function(){
            var l="px",h="left",f=null,p=a(this),n={
                color:p.css(d),
                disabledColor:"#A0A0A0",
                enabled:true,
                enabledClass:f,
                disabledClass:f,
                selectorClass:f
            };
            
            e&&a.extend(n,e);
            n.colorChanged="colorChanged" in e?[e.colorChanged]:[];
            p.data(c,n);
            i(p,n);
            var m,t,w,s,v,B,u,r="cs"+(new Date).valueOf(),o=k(n.color),q=f;
            n.showSelector=function(){
                var c="touchstart mousedown";
                if(n.enabled&&!m){
                    m=a('<div style="position: absolute; width: 120px; height: 120px" />').addClass(n.selectorClass).addClass(r);
                    var e=p.offset(),l=a(window).width(),k=a(window).height();
                    m.offset({
                        left:e.left<l-110?e.left+10:l-120,
                        top:e.top<k-110?e.top+10:k-120
                        });
                    y("Hue","10px",function(a){
                        return g({
                            h:a*3.6,
                            s:b,
                            v:b
                        })
                        });
                    w=x("9px",parseInt(o.h/3.6));
                    t=y("Saturation","30px",function(){
                        return "#000000"
                        });
                    s=x("29px",o.s);
                    z();
                    y("Value","50px",function(a){
                        return g({
                            h:0,
                            s:0,
                            v:a
                        })
                        });
                    v=x("49px",o.v);
                    B=C("Current Color","10px").css(d,n.color);
                    u=C("New Color","60px").css(d,n.color);
                    var i=a('<div style="position: absolute; left: 10px; top: 100px" />').appendTo(m);
                    a('<span style="margin-right: 5px; cursor: default">OK</span>').appendTo(i).on(c,function(){
                        n.color=g(o);
                        p.css(d,n.color);
                        a.each(n.colorChanged,function(b,a){
                            a(n.color)
                            });
                        A()
                        });
                    a('<span style="cursor: default">Cancel</span>').appendTo(i).on(c,function(){
                        A()
                        });
                    a("body").append(m);
                    var h=a("."+r);
                    h.on(c,function(d){
                        var a=j(d),c=a[0]-m.offset().left;
                        if(10<=c&&c<=110){
                            var b=a[1]-m.offset().top;
                            if(b%20>10){
                                q=b<=20?"h":b<=40?"s":"v";
                                D(a[0]-m.offset().left)
                                }
                            }
                    });
            h.on("touchmove mousemove",function(b){
                if(q){
                    var a=j(b);
                    if(a[1]-m.offset().top<70)D(a[0]-m.offset().left);else q=f
                        }
                        return false
                });
            h.on("touchend touchcancel mouseup",function(){
                q=f;
                return false
                });
            m.on("touchleave mouseleave",function(){
                q=f
                })
            }
        };
        
    p.on("touchstart."+c+" mousedown.",+c,n.showSelector);
    function A(){
        m.remove();
        m=f;
        t=f;
        w=f;
        s=f;
        v=f;
        $surface=f;
        B=f;
        u=f
        }
        function y(g,h,f){
        for(var e=a('<table cellspacing="0" cellpadding="0" style="position: absolute; left: 10px"><tbody><tr style="height: 10px" /></tbody></table>').addClass(r).css("top",h).attr("title",g).appendTo(m).find("tr"),c=0;c<=b;++c)a('<td style="width: 1px" />').css(d,f(c)).appendTo(e);
        return e
        }
        function C(b,c){
        return a('<div style="position: absolute; top: 70px; width: 50px; height: 25px" />').attr("title",b).css(h,c).appendTo(m)
        }
        function x(c,b){
        return a('<div style="position: absolute; width: 1px; height: 10px; border: solid 1px #404040" />').addClass(r).css(h,b+9+l).css("top",c).appendTo(m)
        }
        function D(a){
        a=a<10?0:a>110?b:a-10;
        switch(q){
            case "h":
                o.h=a*3.6;
                w.css(h,a+9+l);
                z();
                break;
            case "s":
                o.s=a;
                s.css(h,a+9+l);
                break;
            case "v":
                o.v=a;
                v.css(h,a+9+l)
                }
                u.css(d,g(o))
        }
        function z(){
        t.find("td").each(function(c){
            a(this).css(d,g({
                h:o.h,
                s:c,
                v:b
            }))
            })
        }
    })
},
color:function(b){
    if(b)return this.each(function(){
        var f=a(this),e=f.data(c);
        e.color=b;
        e.enabled&&f.css(d,e)
        });else return a(this).data(c).color
        },
colorChanged:function(b){
    return this.each(function(){
        a(this).data(c).colorChanged.push(b)
        })
    },
enabled:function(b){
    if(typeof b=="boolean")return this.each(function(){
        var e=a(this),d=e.data(c);
        d.enabled=b;
        i(e,d)
        });else return a(this).data(c).enabled
        },
showSelector:function(){
    return a(this).data(c).showSelector()
    },
dispose:function(){
    return this.each(function(){
        var b=a(this);
        b.removeData(c);
        b.unbind("."+c)
        })
    }
};

if(h[f])return h[f].apply(this,Array.prototype.slice.call(arguments,1));
else if(typeof f==="object"||!f)return h.init.apply(this,arguments);else a.error("Method "+f+" does not exist in colorSelector")
    }
})(jQuery);
