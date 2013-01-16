
// =====  Scripts/Selection.js  =====    
var MG=function(a){
    a.selection=function(){
        var h="Selection.ashx?m=GetParcelByPropertyID&id=",d="siteAddressSort",b="selection",a=null,f=a,c=[],e=[],n=a,s=[],p=[],o=[];
        function i(a){
            $.each(o,function(){
                this(a)
                })
            }
            function q(){
            e=[];
            n=a;
            i()
            }
            function l(a){
            $.each(a,function(b,a){
                $.each(a.properties,function(){
                    this.parcel=a
                    })
                });
            return a
            }
            function g(c,d){
            var b=$.grep(c,function(b){
                return k(b,d)!=a
                });
            return b.length>0?b[0]:a
            }
            function k(d,c){
            var b=$.grep(d.properties,function(a){
                return a.id==c
                });
            return b.length>0?b[0]:a
            }
            function m(c,a){
            var b=$.map(c,function(a){
                return a.properties
                });
            b.sort(function(b,c){
                return b[a]<c[a]?-1:b[a]>c[a]?1:0
                });
            return b
            }
            function j(a){
            $.each(p,function(){
                this(a)
                })
            }
            function r(e,a,h){
            var i=MG.timer();
            $.getJSON("Selection.ashx?"+e,function(n){
                MG.logUse(b,"select parcels",i);
                c=l(n.parcels);
                if(a){
                    var e=g(c,a);
                    f=k(e,a)
                    }else f=m(c,d)[0];
                j(h)
                })
            }
            var t={
            add:function(a,d){
                var e=MG.timer();
                $.getJSON(h+escape(a),function(h){
                    MG.logUse(b,"add parcel",e);
                    var g=l(h.parcels)[0];
                    c.push(g);
                    f=k(g,a);
                    j(d)
                    })
                },
            addAbutter:function(d,a){
                var c=MG.timer();
                $.getJSON(h+escape(d),function(f){
                    MG.logUse(b,"add abutter",c);
                    var d=l(f.parcels)[0];
                    e.push(d);
                    i(a)
                    })
                },
            abuttersChanged:function(a){
                o.push(a)
                },
            clear:function(b){
                q();
                f=a;
                c=[];
                j(b)
                },
            clearAbutters:q,
            changeProperty:function(d,e){
                var b=g(c,d);
                f=b?k(b,d):a;
                j(e)
                },
            findAbutters:function(g,d){
                e=[];
                n=a;
                if(c.length){
                    var j=$.map(c,function(a){
                        return escape(a.id)
                        }).join(","),h=MG.timer();
                    $.ajax({
                        type:"POST",
                        url:"Selection.ashx",
                        data:"m=FindAbutters&ids="+j+"&pid="+f.id+"&d="+g,
                        dataType:"json",
                        success:function(a){
                            MG.logUse(b,"find abutters",h);
                            e=l(a.abutters);
                            n=a.buffer;
                            s=a.externalLinks;
                            i(d)
                            }
                        })
                }else i(d)
                },
        getAbutters:function(){
            return e
            },
        getAbutterLinks:function(){
            return s
            },
        getAbutterProperties:function(a){
            return m(e,a?a:d)
            },
        getBuffer:function(){
            return n
            },
        getParcels:function(){
            return c
            },
        getParcelProperties:function(){
            return m(c,d)
            },
        getProperty:function(){
            return f
            },
        hasAbutterForProperty:function(b){
            return g(e,b)!=a
            },
        hasParcelForProperty:function(b){
            return g(c,b)!=a
            },
        parcelsChanged:function(a){
            p.push(a)
            },
        remove:function(e,b){
            var a=g(c,e);
            c.splice($.inArray(a,c),1);
            if(!f||$.inArray(f,a.properties)>=0)f=m(c,d)[0];
            j(b)
            },
        removeAbutter:function(b,d){
            var a=g(e,b),c=k(a,b);
            a.properties.splice($.inArray(c,a.properties),1);
            !a.properties.length&&e.splice($.inArray(a,e),1);
            i(d)
            },
        selectOne:function(a,b){
            r("m=GetParcelByPropertyID&id="+escape(a),a,b)
            },
        selectMultiple:function(b,c){
            r("m=GetParcelsFromSearch&c="+escape(b),a,c)
            }
        };
    
return t
};

return a
}(MG||{});
