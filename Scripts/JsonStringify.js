// =====  Scripts/JsonStringify.js  =====    
(function(i){
    var b="null",d="function",c="undefined",a='"',h={}.hasOwnProperty?true:false,j={
        "\b":"\\b",
        "\t":"\\t",
        "\n":"\\n",
        "\f":"\\f",
        "\r":"\\r",
        '"':'\\"',
        "\\":"\\\\"
    };
    
    function f(b){
        if(/["\\\x00-\x1f]/.test(b))return a+b.replace(/([\x00-\x1f\\"])/g,function(c,b){
            var a=j[b];
            if(a)return a;
            a=b.charCodeAt();
            return "\\u00"+Math.floor(a/16).toString(16)+(a%16).toString(16)
            })+a;
        return a+b+a
        }
        function g(i){
        for(var a=["["],h,f=0;f<i.length;f+=1){
            var g=i[f];
            switch(typeof g){
                case c:case d:case "unknown":
                    break;
                default:
                    h&&a.push(",");
                    a.push(g===null?b:e(g));
                    h=true
                    }
                }
        a.push("]");
    return a.join("")
    }
    function e(i){
    if(typeof i==c||i===null)return b;
    else if(i instanceof Array)return g(i);
    else if(i instanceof Date)return a+i.toUTCString()+a;
    else if(typeof i=="string")return f(i);
    else if(typeof i=="number")return isFinite(i)?String(i):b;
    else if(typeof i=="boolean")return String(i);
    else{
        var j=["{"],m;
        for(var k in i)if(!h||i.hasOwnProperty(k)){
            var l=i[k];
            switch(typeof l){
                case c:case d:case "unknown":
                    break;
                default:
                    m&&j.push(",");
                    j.push(e(k),":",l===null?b:e(l));
                    m=true
                    }
                }
        j.push("}");
    return j.join("")
    }
}
i.stringifyJSON=e
})(jQuery);
