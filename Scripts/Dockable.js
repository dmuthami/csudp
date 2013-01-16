
// =====  Scripts/Dockable.js  =====    
(function(a){
    a.fn.dockable=function(n){
        var h="disabled",g="option",l="orthogonal",c="",b="px",e="bottom",j="top",d="right",i="left",m="resizable",f=false,k="dockable",o={
            init:function(b){
                return this.each(function(){
                    var d=a(this),c={
                        container:null,
                        isDocked:f,
                        docked:{
                            left:0,
                            top:0,
                            width:100,
                            height:20
                        },
                        opened:{
                            left:0,
                            top:20,
                            width:100,
                            height:100
                        },
                        motion:"direct",
                        duration:1200,
                        dock:[],
                        open:[]
                    };
                    
                    if(b){
                        a.extend(c,b);
                        a.each(["dock","open"],function(){
                            if(typeof c[this]=="function")c[this]=[c[this]]
                                })
                        }
                        d.data(k,c);
                    a.each([["draggable","dragstop"],[m,"resizestop"]],function(){
                        var b=this;
                        if(b[0] in c){
                            var e=a.extend(c[b[0]],{
                                disabled:c.isDocked
                                });
                            d[b[0]](e);
                            d.on(b[1],function(b){
                                a(b.target).dockable("updateOpenedSettings")
                                });
                            "stop" in c[b[0]]&&d.on(b[1],c[b[0]].stop)
                            }
                        })
                })
            },
        isDocked:function(){
            return this.eq(0).data(k).isDocked
            },
        opened:function(){
            var b=this.eq(0).data(k),c={};
            
            a.each([i,d,j,e],function(d,a){
                if(a in b.opened)c[a]=b.opened[a]
                    });
            m in b&&a.extend(c,{
                width:b.opened.width,
                height:b.opened.height
                });
            return c
            },
        updateOpenedSettings:function(){
            return this.each(function(){
                var g=a(this),f=g.data(k),n=g.height()<f.container[0].offsetHeight?g.height():f.container[0].offsetHeight,o=g.width()<f.container[0].offsetWidth?g.width():f.container[0].offsetWidth;
                f.opened={
                    width:o,
                    height:n
                };
                
                g.css("width",f.opened.width+b);
                g.css("height",f.opened.height+b);
                var h=g.position(),m=f.container.width()-(h.left+g.outerWidth()),l=f.container.height()-(h.top+g.outerHeight());
                g.css({
                    left:c,
                    right:c,
                    top:c,
                    bottom:c
                });
                if(h.left<=m){
                    f.opened.left=h.left>=0?h.left:0;
                    g.css(i,f.opened.left+b)
                    }else{
                    f.opened.right=m>=0?m:0;
                    g.css(d,f.opened.right+b)
                    }
                    if(h.top<=l||l>50){
                    f.opened.top=h.top>=0?h.top:0;
                    g.css(j,f.opened.top+b)
                    }else{
                    f.opened.bottom=l>=0?l:0;
                    g.css(e,f.opened.bottom+b)
                    }
                })
        },
    dock:function(f){
        if(f)return this.each(function(){
            a(this).data(k).dock.push(f)
            });else return this.each(function(){
            var m=a(this).addClass("Docked"),f=m.data(k);
            if(!f.isDocked){
                m.css({
                    left:m.position().left+b,
                    top:m.position().top+b,
                    right:c,
                    bottom:c
                });
                var r=m.outerWidth()-m.innerWidth(),q=m.outerHeight()-m.innerHeight(),s=i in f.docked?f.docked.left:f.container.width()-f.docked.right-f.docked.width-r,t=j in f.docked?f.docked.top:f.container.height()-f.docked.bottom-f.docked.height-q;
                function o(){
                    a.each(f.dock,function(){
                        this({
                            target:m.get(0)
                            })
                        });
                    d in f.docked&&m.css({
                        left:c,
                        right:f.docked.right+b
                        });
                    e in f.opened&&m.css({
                        top:c,
                        bottom:f.docked.bottom+b
                        })
                    }
                    switch(f.motion){
                    case l:
                        var n=Math.round(f.duration*.25),p=Math.round(f.duration*.125);
                        m.animate({
                        height:f.docked.height
                        },n).delay(p).animate({
                        left:s,
                        width:f.docked.width
                        },n).delay(p).animate({
                        top:t
                    },n,o);
                    break;
                    default:
                        m.animate({
                        left:f.docked.left,
                        top:f.docked.top,
                        width:f.docked.width,
                        height:f.docked.height
                        },f.duration,o)
                    }
                    f.isDocked=true;
                m.draggable(g,h,true);
                f.resizable&&m.resizable(g,h,true)
                }
            })
        },
open:function(m){
    if(m)return this.each(function(){
        a(this).data(k).open.push(m)
        });else return this.each(function(){
        var n=a(this).removeClass("Docked"),m=n.data(k);
        if(m.isDocked){
            n.css({
                left:n.position().left+b,
                top:n.position().top+b,
                right:c,
                bottom:c
            });
            var u=n.outerWidth()-n.innerWidth(),t=n.outerHeight()-n.innerHeight(),q=i in m.opened?m.opened.left:m.container.width()-m.opened.right-m.opened.width-u,r=j in m.opened?m.opened.top:m.container.height()-m.opened.bottom-m.opened.height-t;
            function p(){
                a.each(m.open,function(){
                    this({
                        target:n.get(0)
                        })
                    });
                d in m.opened&&n.css({
                    left:c,
                    right:m.opened.right+b
                    });
                e in m.opened&&n.css({
                    top:c,
                    bottom:m.opened.bottom+b
                    })
                }
                switch(m.motion){
                case l:
                    var o=Math.round(m.duration*.25),s=Math.round(m.duration*.125);
                    n.animate({
                    top:r
                },o).delay(s).animate({
                    left:q,
                    width:m.opened.width
                    },o).delay(s).animate({
                    height:m.opened.height
                    },o,p);
                break;
                default:
                    n.animate({
                    left:q,
                    top:r,
                    width:m.opened.width,
                    height:m.opened.height
                    },m.duration,p)
                }
                m.isDocked=f;
            n.draggable(g,h,f);
            m.resizable&&n.resizable(g,h,f)
            }
        })
    }
};

if(o[n])return o[n].apply(this,Array.prototype.slice.call(arguments,1));
else if(typeof n==="object"||!n)return o.init.apply(this,arguments);else a.error("Method "+n+" does not exist in "+k)
    }
})(jQuery);
