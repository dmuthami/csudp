// =====  Scripts/Expander.js  =====    
(function(a){
    a.fn.expander=function(d){
        var b="function",c="expander";
        function g(e,f){
            var d=a(e),b=d.data(c);
            if(d.hasClass(b.closedClass)){
                d.removeClass(b.closedClass).addClass(b.openedClass);
                b.groupClass&&a("."+b.groupClass).each(function(c,b){
                    b!=e&&a(b).expander("close")
                    });
                f&&a(b.target).animate({
                    height:b.openedHeight
                    });
                a.each(b.change,function(){
                    this(e,true)
                    })
                }
            }
        function f(e,f){
        var d=a(e),b=d.data(c);
        if(d.hasClass(b.openedClass)){
            d.removeClass(b.openedClass).addClass(b.closedClass);
            f&&a(b.target).animate({
                height:b.closedHeight
                });
            a.each(b.change,function(){
                this(e,false)
                })
            }
        }
    var e={
    init:function(d){
        return this.each(function(){
            var h=a(this),e={
                target:null,
                openedHeight:0,
                closedHeight:0,
                openedClass:"Opened",
                closedClass:"Closed",
                disabledClass:"Disabled",
                groupClass:null,
                change:[]
            };
            
            if(d){
                a.extend(e,d);
                if(typeof e.change==b)e.change=[e.change]
                    }
                    h.data(c,e);
            h.on("click",function(){
                if(!h.hasClass(e.disabledClass))if(h.hasClass(e.closedClass))g(this,true);else f(this,true)
                    })
            })
        },
    isOpen:function(){
        var a=this.eq(0).data(c);
        return this.hasClass(a.openedClass)
        },
    change:function(d){
        return this.each(function(){
            typeof d==b&&a(this).data(c).change.push(d)
            })
        },
    close:function(a){
        return this.each(function(){
            f(this,a)
            })
        },
    open:function(a){
        return this.each(function(){
            g(this,a)
            })
        }
    };

if(e[d])return e[d].apply(this,Array.prototype.slice.call(arguments,1));
    else if(typeof d==="object"||!d)return e.init.apply(this,arguments);else a.error("Method "+d+" does not exist in "+c)
    }
})(jQuery);
