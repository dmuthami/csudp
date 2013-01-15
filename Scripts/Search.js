
// =====  Scripts/Search.js  =====    
var MG=function(a){
    a.search=function(p){
        var c="click",a="search",g="#search",b=$(g),n=p.selection,q=0,f=null,l=b.find("#ddlSearchSort"),k=b.find("#pnlSearchCount"),i=b.find("#pnlSearchResults"),m=b.find("#pnlSearchPage"),e=b.find("#cmdShowAllResults"),j=b.find("#spnSearchMessage"),d=b.find("#tboSearch"),o=d.val();
        d.empty().watermark(o,{
            className:"Watermark",
            useNative:false
        });
        b.dockable("open",function(){
            MG.logUse(a,"open panel")
            });
        e.on(c,function(){
            MG.logUse(a,"select multiple properties");
            n.selectMultiple(d.val(),a)
            });
        l.on("change",function(){
            MG.logUse(a,"sort");
            h()
            });
        d.on("keyup",function(){
            f&&clearTimeout(f);
            f=setTimeout(function(){
                MG.logUse(a,"enter criteria");
                h()
                },500)
            });
        $(g+" a.SearchPage").live(c,function(b){
            MG.logUse(a,"change page");
            h($(b.target).text())
            });
        $(g+" a.SearchResultLink").live(c,function(b){
            MG.logUse(a,"select property");
            n.selectOne($(b.target).closest("a").attr("data-propertyid"),a)
            });
        function h(b){
            if(!b)b=1;
            k.empty();
            e.hide();
            i.empty();
            m.empty();
            var c=escape(d.val());
            if(!c)j.show();
            else{
                var g=l.val(),f=MG.timer();
                $.getJSON("Search.ashx?c="+c+"&s="+g+"&p="+b,function(b){
                    MG.logUse(a,"perform search",f);
                    k.text(b.recordCount==1?"1 property found":b.recordCount+" properties found");
                    e.toggle(0<b.recordCount&&b.recordCount<=100);
                    var d=b.recordCount>0;
                    j.toggle(!d);
                    if(d){
                        i.html(b.content);
                        for(var g=Math.max(1,Math.min(b.pageNumber-2,b.pageCount-4)),h=Math.min(g+4,b.pageCount),c=g;c<=h;++c){
                            var l=c==b.pageNumber?"<span class='SearchPage'>"+c+"</span>":"<a href='#' class='SearchPage'>"+c+"</a>";
                            m.append($(l))
                            }
                        }
                    })
        }
    }
};

return a
}(MG||{});
