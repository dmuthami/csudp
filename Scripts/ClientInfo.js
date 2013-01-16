
// =====  Scripts/ClientInfo.js  =====    
var MG=function(a){
    a.clientInfo=function(){
        var h="#txtContactEmail",m="#txtOther",d="#txtComments",c="Other",a="#ddlCommentType",l="#errMsgCommentType",k="#errMsgOther",g="#errMsgComments",f="#pnlCommentsErrorMsg",n=".ClientExpander",b="client info",e="z-index",j="ClientExpander",v=null,o=$("#clientInfo"),i=config.panels.opened.clientInfo.height;
        $("#cmdSiteContact").expander({
            target:o.get(0),
            openedHeight:Math.max(140,i),
            closedHeight:i,
            groupClass:j,
            change:function(c,a){
                $("#pnlSiteContact").fadeTo(500,a?1:0).css(e,a?"2":"1");
                a&&MG.logUse(b,"show site contact")
                }
            });
    $("#cmdDisclaimer").expander({
        target:o.get(0),
        openedHeight:Math.max(config.clientInfo.disclaimer.panelHeight,i),
        closedHeight:i,
        groupClass:j,
        change:function(c,a){
            $("#pnlDisclaimer").fadeTo(500,a?1:0).css(e,a?"2":"1");
            a&&MG.logUse(b,"show disclaimer")
            }
        });
$("#cmdComments").expander({
    target:o.get(0),
    openedHeight:Math.max(290,i),
    closedHeight:i,
    groupClass:j,
    change:function(c,a){
        $("#pnlComments").fadeTo(500,a?1:0).css(e,a?"2":"1");
        a&&MG.logUse(b,"show comments form")
        }
    });
$(n).expander("change",function(b,a){
    $(b).find("span").html(a?"&#9650":"&#9660")
    });
o.dockable("open",function(){
    MG.logUse(b,"open panel")
    });
o.dockable("dock",function(){
    $(n).expander("close")
    });
$("#btnSendComments").on("click",function(){
    t()&&u()
    });
$("#btnResetComments").on("click",function(){
    MG.logUse(b,"reset comments");
    r()
    });
function p(){
    $(f).hide();
    $(g).hide();
    $(k).hide();
    $(l).hide()
    }
    function s(){
    $(f).show();
    $(g).show();
    $(l).show()
    }
    function q(){
    $(f).show();
    $(g).show()
    }
    function t(){
    var b=true;
    p();
    if($(a).val()==""){
        b=false;
        s()
        }else if($(a).val()!=c&&$(a).val()!=""&&$(d).val()==""){
        q();
        b=false
        }else if($(a).val()==c&&$(d).val()==""){
        q();
        $(k).show();
        b=false
        }
        return b
    }
    function u(){
    var e={};
    
    if(config.applicationInfo.id!=null)e["AppId"]=config.applicationInfo.id;
    e["CommentType"]=$(a).val();
    e["Comments"]=$(d).val();
    if($(a).val()==c)e[c]=$(m).val();
    if($(h).val()!="")e["UserEmail"]=$(h).val();
    var f=MG.timer();
    $.ajax({
        url:"SaveComments.ashx",
        type:"POST",
        dataType:"json",
        data:$.stringifyJSON(e),
        contentType:"application/json",
        success:function(){
            MG.logUse(b,"submit comments",f);
            alert("Your comments have been submitted successfully.");
            r()
            },
        error:function(a){
            alert(a.Message)
            }
        })
}
function r(){
    $(a).val("");
    $(d).val("");
    $(m).val("");
    $(h).val("")
    }
    p()
};

return a
}(MG||{});
