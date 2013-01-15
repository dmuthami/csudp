
// =====  Scripts/Abutters.js  =====    
var MG=function(a){
    a.abutters=function(s){
        var g="#spnAbutterLimit",b="abutters",e="href",c="click",a=null,d=$("#abutter");
        if(!d.length)return;
        var f=s.selection,k=a,i=d.find("#ddlAbutterSort"),h=d.find("#tboAbutterDistance"),n=d.find("#pnlAbutterCommands span.Link"),o=d.find("#pnlAbutterCommands a").on(c,function(a){
            !$(this).attr(e)&&a.preventDefault()
            });
        d.dockable("open",function(){
            MG.logUse(b,"open panel");
            l()
            });
        d.find(".PanelClose").on(c,function(){
            f.clearAbutters()
            });
        d.find("#cmdAbutterExport").on(c,function(){
            j("spreadsheet")
            });
        d.find("#cmdAbutterLabels").on(c,function(){
            j("mailing labels")
            });
        d.find("#cmdAbutterReport").on(c,function(){
            j("report")
            });
        i.on("change",function(){
            MG.logUse(b,"sort");
            p()
            });
        h.on("keypress",function(b){
            var a=b.keyCode?b.keyCode:b.charCode;
            if(!(a==8||48<=a&&a<=57||a==13||96<=a&&a<=105))return false
                });
        h.on("keyup",function(c){
            d.find(g).hide();
            var a=c.keyCode?c.keyCode:c.charCode;
            if(a==8||48<=a&&a<=57||a==13||96<=a&&a<=105){
                k&&clearTimeout(k);
                k=setTimeout(function(){
                    MG.logUse(b,"change distance");
                    l()
                    },500)
                }
            });
    f.parcelsChanged(function(){
        l()
        });
    f.abuttersChanged(function(){
        p()
        });
    function l(){
        if(!d.dockable("isDocked")){
            var a=m();
            if(a>config.abutters.maxSearchDistance){
                a=config.abutters.maxSearchDistance;
                d.find(g).show()
                }
                f.findAbutters(a,b)
            }
        }
    function j(c){
    var a=f.getAbutterProperties();
    if(a.length){
        MG.logUse(b,"export "+c);
        $("#hdnExportType").val(c);
        $("#hdnExportSubject").val(f.getProperty().id);
        $("#hdnExportIds").val($.map(a,function(a){
            return a.id
            }).join("|"));
        $("#hdnExportSort").val(i.val());
        $("#hdnExportDistance").val(!parseInt(h.val(),10)?1:parseInt(h.val(),10));
        $("#frmExport").submit()
        }
    }
function m(){
    var a=parseInt(h.val(),10);
    return !a?1:a
    }
    function q(){
    MG.logUse(b,"remove from list");
    var a=$(this).parents(".AbutterResult");
    a.remove();
    f.removeAbutter(a.attr("data-propertyid"),"abutter")
    }
    function p(){
    var b="Disabled",h=d.find("#abutterResults").empty();
    n.addClass(b);
    o.addClass(b).attr(e,"");
    var j=i.val();
    $.each(f.getAbutterProperties(j),function(){
        var b=this,d=$('<div class="AbutterResult" data-propertyid="'+b.id+'"></div>'),f='<div class="AbutterText"></div>',g=b.siteAddress?$(f).text(b.siteAddress).get(0):a,e=config.applicationInfo.allow.propertyIDSearch&&b.id?$(f).text(b.id).get(0):a,i=config.applicationInfo.allow.ownerSearch&&b.ownerName?$(f).text(b.ownerName).get(0):a;
        switch(j){
            case "id":
                d.append($($.grep([e,g,i],function(b){
                return b!=a
                })));
            break;
            case "ownerName":
                d.append($([i,g,e]));
                break;
            default:
                d.append($([g,e,i]))
                }
                var k=d.children().eq(0).removeClass("AbutterText").addClass("AbutterTextMain");
        $('<div class="AbutterRemove"><span class="Link">Remove</span></div>').insertAfter(k).find("span").on(c,q);
        h.append(d)
        });
    if(h.children().length){
        n.removeClass(b);
        var g=f.getAbutterLinks();
        g.length&&o.each(function(a){
            g[a]&&$(this).removeClass(b).attr(e,g[a])
            })
        }
    }
var r={
    getAbutterDistance:m
};

return r
};

return a
}(MG||{});
