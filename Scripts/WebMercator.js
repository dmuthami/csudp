
// =====  Scripts/WebMercator.js  =====    
var MG=function(a){
    a.webMercator=function(){
        var f=1.5707963267949e0,e=.78539816339744828,c=.017453292519943295,b=57.295779513082323,a=6378137,d={
            getScaleFactor:function(c){
                var b=Math.PI*.5-2*Math.atan(Math.pow(Math.E,-c[1]/a));
                return 1/Math.cos(b)
                },
            toGeodetic:function(c){
                var e=c[0]/a*b,d=(f-2*Math.atan(1/Math.exp(c[1]/a)))*b;
                return [e,d]
                },
            toProjected:function(b){
                var d=a*b[0]*c,f=a*Math.log(Math.tan(e+b[1]*c/2));
                return [d,f]
                }
            };
        
    return d
    }();
return a
}(MG||{});
