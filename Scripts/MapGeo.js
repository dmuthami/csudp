
// =====  Scripts/MapGeo.js  =====    
var MG=function(b){
    var a=null,g=15*60*1e3,c=null,e="ontouchend" in document;
    function f(){
        if("session" in a){
            a.session.end=d();
            $.post("LogUse.ashx","log="+escape($.stringifyJSON(a)))
            }
        }
    function d(){
    return (new Date).valueOf()
    }
    b.getTouch=function(a){
    a=e?a.originalEvent.changedTouches[0]:a;
    return [a.pageX,a.pageY]
    };
    
b.getUrlParams=function(){
    var e=window.location.search.substring(1),d=/([^&=]+)=?([^&]*)/g,a,b=function(a){
        return decodeURIComponent(a.replace(/\+/g," "))
        },c={};
    while(a=d.exec(e))c[b(a[1])]=b(a[2]);
    return c
    };
    
b.logStart=function(b){
    a={
        appid:b
    }
};

b.logUse=function(h,j,e){
    if(!("session" in a))a.session={
        start:d()
        };
        
    var k=h in a?a[h]:(a[h]={}),b=j in k?k[j]:(k[j]={
        c:0
    });
    b.c+=1;
    if(e)if(e.elapsed){
        var l=e;
        if(!("t" in b))b.t=0;
        b.t+=l.elapsed()
        }else{
        var i=e,m=i in b?b[i]:(b[i]={
            c:0
        });
        m.c+=1
        }
        c&&clearTimeout(c);
    c=setTimeout(function(){
        f();
        a={
            appid:a.appid
            };
            
        c=null
        },g)
    };
    
b.logEnd=f;
b.supportsTouch=e;
b.timer=function(){
    var a=d();
    return {
        elapsed:function(){
            return d()-a
            }
        }
};

return b
}(MG||{});
