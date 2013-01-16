
// =====  Scripts/PropertyInfo.js  =====    
var MG=function(a){
    a.propertyInfo=function(m){
        var c="href",h="click",b="propertyInfo",a="property info",e=$("#propertyInfo"),j=m.map,d=m.selection,g=null;
        e.dockable("open",function(){
            MG.logUse(a,"open panel")
            });
        j.on("geomapclick",function(e,c){
            if(j.geomap("option","mode")!="pan")return;
            if(g)l();else g=setTimeout(function(){
                var e=MG.timer();
                $.getJSON("PropertyInfo.ashx?m=GetPropertyID&x="+c.coordinates[0]+"&y="+c.coordinates[1],function(c){
                    if(c&&c.propertyid){
                        MG.logUse(a,"select parcel on map",e);
                        d.selectOne(c.propertyid,b)
                        }else d.clear(b)
                        });
                g=null
                },500)
            });
        j.on("geomapdblclick",function(){
            l()
            });
        var f=e.find("#ddlPropertyAddress"),i=e.find("#spnPropertyAddress"),k=e.find("#pnlPropertyInfoLinks a").on(h,function(a){
            !$(this).attr(c)&&a.preventDefault()
            }),p=e.find("#cmdPropertyRecordCard").on(h,function(){
            MG.logUse(a,"show property record card")
            });
        f.on("change",function(c){
            MG.logUse(a,"change property");
            d.changeProperty($(c.target).val(),b)
            });
        $(".ShowMoreInfo").on(h,function(){
            var a=$(this),b=a.text()=="more";
            $(".MoreInfo."+a.attr("id").substr(4)).toggle(b);
            a.text(b?"less":"more")
            });
        d.parcelsChanged(function(){
            n();
            o();
            d.getProperty()&&e.dockable("open")
            });
        function l(){
            if(g){
                clearTimeout(g);
                g=null
                }
            }
        function n(){
        var a="[no address]";
        f.empty();
        var b=d.getParcelProperties();
        if(b.length==0){
            i.hide();
            f.hide()
            }else if(b.length==1){
            i.text(b[0].siteAddress||a).show();
            f.hide()
            }else{
            var c=d.getProperty();
            $.each(b,function(){
                var b=this.id==c.id?" selected='selected'":"";
                f.append("<option value='"+this.id+"'"+b+">"+(this.siteAddress||a)+"</option>")
                });
            f.show();
            i.hide()
            }
        }
    function o(){
    var b="Disabled",g=e.find("#tblPropertyData").find("span").empty();
    k.addClass(b).attr(c,"");
    var f=d.getProperty();
    if(f){
        var h=MG.timer();
        $.getJSON("PropertyInfo.ashx?p="+escape(f.id),function(d){
            if(d&&d.property){
                MG.logUse(a,"get property data",h);
                g.each(function(){
                    var a=$(this),b=a.attr("data-item");
                    if(b in d.property){
                        var c=a.attr("data-prefix");
                        a.text((c?c:"")+d.property[b])
                        }
                    });
            d.externalLinks.length&&k.each(function(a){
                d.externalLinks[a]&&$(this).removeClass(b).attr(c,d.externalLinks[a])
                })
            }
        })
}
}
};

return a
}(MG||{});
