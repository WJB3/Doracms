function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function loginOut(){layer.confirm(getSysValueByKey("sys_layer_confirm_logOut"),{title:getSysValueByKey("sys_layer_confirm_title"),btn:getSysValueByKey("sys_layer_confirm_btn_yes"),yes:function(e){layer.close(e),getAjaxData("/api/user/logOut",function(e){200==e.status&&layer.msg(e.message,{icon:1,time:msgTime},function(){window.location="/"})})}})}function watchCreator(e,t){getAjaxData("/api/user/followCreator?creatorId="+e,function(e){200==e.status&&($("#"+t).find("i").remove(),$("#"+t).text("已关注"),$("#"+t).attr("href","javascript:void(0)"))})}function reportDocument(e){getAjaxData("/api/user/report",function(e){200==e.status&&layer.msg(e.message,{icon:1,time:msgTime,anim:1})},"post",{contentId:e,type:1<arguments.length&&void 0!==arguments[1]?arguments[1]:"0"})}function initCheckModal(e,t,n){$("#checkIfDo").on("show.bs.modal",function(e){$(this).find(".modal-msg").text(t)}).on("hide.bs.modal",function(e){}),$("#checkIfDo").modal("show"),e.confirmDo=function(){$("#checkIfDo").modal("hide"),n()}}function getQueryString(e){e=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),e=window.location.search.substr(1).match(e);return null!=e?unescape(e[2]):null}avalon.filters.cutwords=function(e,t){return e?e.replace(/[\u0391-\uFFE5]/g,"aa").length>t?e.substring(0,t)+"...":e:""},avalon.filters.formatDateByType=function(e,t){return"mini"==t?e.substring(e.length-8,e.length-3):(t="date",e.substring(0,9))},avalon.filters.renderJob=function(e,t){var n="",a=[];if(!e)return"";"industry"==t?a=personInfoVm.industryArr:"profession"==t?a=personInfoVm.professionArr:"experience"==t&&(a=personInfoVm.experienceArr);var s=!0,o=!1,i=void 0;try{for(var r=a[Symbol.iterator]();!(s=(p=r.next()).done);s=!0){var p=p.value;if(p.value==e){n=p.text;break}}}catch(e){o=!0,i=e}finally{try{!s&&r.return&&r.return()}finally{if(o)throw i}}return n};var searchVm=avalon.define({$id:"headerCtr",lsk:[],searchkey:"",message:"",activeSearch:!1,showErr:!1,postArticel:function(){"true"==$("#logined").val()?window.location.href="/users/userAddContent":window.location.href="/users/login"},searchMe:function(){searchVm.activeSearch=!searchVm.activeSearch},searchOpt:function(){searchVm.searchkey?window.location.href="/search/"+searchVm.searchkey:layer.msg(getSysValueByKey("sys_layer_validate_keyword"),{icon:0,time:msgTime})},onKeyUp:function(e){e&&13===e.keyCode&&searchVm.searchOpt()}}),searchPannelVM=avalon.define({$id:"searchPannel",lsk:[],searchkey:"",searchOpt:function(){searchPannelVM.searchkey?window.location.href="/search/"+searchPannelVM.searchkey:layer.msg(getSysValueByKey("sys_layer_validate_keyword"),{icon:0,time:msgTime})},onKeyUp:function(e){e&&13===e.keyCode&&searchPannelVM.searchOpt()}}),userEmailLoginVm=avalon.define({$id:"userEmailLogin",email:"",message:"",showErr:!1,targetPanel:"3",reset:function(){userEmailLoginVm.email=" ",userEmailLoginVm.messageCode=" "},password:"",validate:{onError:function(e){e.forEach(function(e){console.log(e.getMessage())})},onValidateAll:function(e){e.length?layer.msg(e[0].message,{icon:2,shade:[.001,"#000"],time:msgTime}):(console.log("全部通过"),e={loginType:"3",email:userEmailLoginVm.email,password:userEmailLoginVm.password},getAjaxData("/api/user/doLogin",function(e){200==e.status&&layer.msg(e.message,_defineProperty({icon:1,time:1},"time",msgTime),function(){window.location.href="/ "})},"post",e))}}});function getUserContentsInfo(e){getAjaxData("/api/content/getList?userId="+e+"&pageSize=5",function(e){postArticelVm.authorConentsInfo=e.data})}var postArticelVm=avalon.define({$id:"documentInfo",message:"",authorConentsInfo:{}});function askContentThu(e){getAjaxData("/api/user/askContentThumbsUp",function(e){})}var rcStaticlVm=avalon.define({$id:"rcStatic",askLike:function(e,t,n){var a=$("#thumbs_"+n).text(),s=($("#reword_"+n).text(),$("#despises_"+n).text()),o=$("#favoriteCommunity_"+n).text();"1"==t?getAjaxData("/api/user/askContentThumbsUp?contentId="+n,function(e){200==e.status&&$("#thumbs_"+n).text(Number(a)+1)}):"2"==t?getAjaxData("/api/user/despiseContent?contentId="+n,function(e){200==e.status&&$("#despises_"+n).text(Number(s)+1)}):"3"==t?window.location.href="/details/"+n+".html?id=comments":"4"==t&&getAjaxData("/api/user/favoriteContent?contentId="+n,function(e){200==e.status&&$("#favoriteCommunity_"+n).text(Number(o)+1)})}});function getAppendList(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"1";"1"==t?(appendNewsVm.loadingState=!0,appendNewsVm.current++):"2"==t&&(appendNewsVm.current=2,appendNewsVm.pageSize=appendNewsVm.current*appendNewsVm.pageSize);var e=$("#appendType").val(),n="";"reCommend"==e?n="/api/content/getList?type=1&current="+appendNewsVm.current+"&pageSize="+appendNewsVm.pageSize+"&isTop=1":"hot"==e?n="/api/content/getList?type=1&current="+appendNewsVm.current+"&pageSize="+appendNewsVm.pageSize+"&sortby=clickNum":"community"==e?n="/api/community/getCommunityContents?current="+appendNewsVm.current+"&pageSize="+appendNewsVm.pageSize+appendNewsVm.current:"special"==e?n="/api/special/getList?current="+appendNewsVm.current+"&pageSize="+appendNewsVm.pageSize:"search"==e?n="/api/content/getList?current="+appendNewsVm.current+"&pageSize="+appendNewsVm.pageSize+"&searchkey="+$("#searchkey").val():"tag"==e?n="/api/content/getList?current="+appendNewsVm.current+"&pageSize="+appendNewsVm.pageSize+"&tagName="+$("#tagName").val():"creatorContents"==e&&(n="/api/content/getList?type=1&current="+appendNewsVm.current+"&pageSize="+appendNewsVm.pageSize),getAjaxData(n,function(e){"1"==t&&(appendNewsVm.loadingState=!1),0<e.data.docs.length?"1"==t?appendNewsVm.appendDocumentList=appendNewsVm.appendDocumentList.concat(e.data.docs):"2"==t&&(appendNewsVm.appendDocumentList=e.data.docs):appendNewsVm.current--})}var appendNewsVm=avalon.define({$id:"appendItems",current:1,pageSize:"",appendDocumentList:[],loadingState:!1,showAuthor:function(e,t,n){t=e[t];return t?t[n]:""},getMoreNews:function(){getAppendList()},appLike:function(e,t){"1"==e?getAjaxData("/api/user/askContentThumbsUp?contentId="+t,function(e){200==e.status&&getAppendList("2")}):"0"==e?getAjaxData("/api/user/rewordContent",function(e){200==e.status&&getAppendList("2")},"post",{coins:10,unit:"MEC",contentId:t}):"2"==e?getAjaxData("/api/user/despiseContent?contentId="+t,function(e){200==e.status&&getAppendList("2")}):"3"==e?window.location.href="/details/"+t+".html?id=comments":"4"==e&&getAjaxData("/api/user/favoriteContent?contentId="+t,function(e){200==e.status&&getAppendList("2")})}});
function getPostMessages(){getAjaxData("/api/contentMessage/getMessages?pageSize=100&contentId="+$("#contentId").val(),function(e){200==e.status&&(postMsgVm.messageList=e.data.docs)})}

function deepClone(obj) {
    //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    var objClone = Array.isArray(obj) ? [] : {};
    //进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === "object") {
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (obj[key] && typeof obj[key] === "object") {
            objClone[key] = deepClone(obj[key]);
          } else {
            objClone[key] = obj[key];
          }
        }
      }
    }
    return objClone;
  }

function transformCategoryGoods(category,goodsList){

    let copy=deepClone(category); 
    let goodsId=goodsList.map(item=>item.categoryId); 
    
    copy.forEach(itemA=>{
        itemA.children.forEach(itemB=>{
            itemB.children.forEach(itemC=>{
                if(goodsId.indexOf(itemC.id)>-1){
                    itemC.currentGoodList=goodsList.find(itemD=>itemC.id==itemD.categoryId).goodsList
                }else{
                    itemC.currentGoodList=[]
                }
            })
        })
    })
    return copy
}

function transformTree(treeData,pId){
    let result=[],temp;
    treeData.forEach(item=>{
        if(item.parentId==pId){
            let obj=item;
            temp=transformTree(treeData,item.id);
            obj.children=temp;
            result.push(obj);
        }
    })
    return result;
}

function transformIndex(arr,category1Index,category2Index,category3Index,changeArrIndex){
     
    let copy=deepClone(arr); 
    copy.forEach((itemA,arrIndex)=>{
        if(!changeArrIndex){
            itemA.currentIndex=category1Index;
        }
        if(changeArrIndex && changeArrIndex==arrIndex && category1Index){ 
            itemA.currentIndex=category1Index;
        }
        
        if(itemA.background===undefined||itemA.background===null){
            itemA.background="red";
        }
        itemA.children.forEach(itemB=>{
            if(!changeArrIndex){
                itemB.currentIndex=category2Index;
            }
            if(changeArrIndex && changeArrIndex==arrIndex && category2Index){
                itemB.currentIndex=category2Index;
            }
            
            if(itemB.background===undefined||itemB.background===null){
                itemB.background="red";
            }
            itemB.children.forEach(itemC=>{
                if(!changeArrIndex){
                    itemC.currentIndex=category3Index; 
                }

                if(changeArrIndex && changeArrIndex==arrIndex  && category3Index){
                    itemC.currentIndex=category3Index;
                }
                
                if(itemC.background===undefined||itemC.background===null){
                    itemC.background="red";
                }
            })
        })
    }) 
    return copy;

}

function transformGoods(data){
    let categoryGoods= data.map(item=>{
        return ({
            ...item,
            categoryId:JSON.parse(item.categoryId)[2],
            goodsList:JSON.parse(item.goodsList)
        })
    })

    let result=[];
    let vk=new Set();
    
    for(let i=0;i<categoryGoods.length;i++){
        if(!vk.has(categoryGoods[i].categoryId)){
            let temp={categoryId:categoryGoods[i].categoryId,goodsList:categoryGoods[i].goodsList}
            result.push(temp);
            vk.add(temp.categoryId)
        }else{
            let index=result.findIndex(item=>item.categoryId===categoryGoods[i].categoryId);
            result[index].goodsList.push(...categoryGoods[i].goodsList)
        }
    }
    return result;
}

var globalGoodsCategory=[];

function getTreeData() {
    getAjaxData('/api/goodsInfo/getList?isPaging=0', (dataInfo) => {
        if (dataInfo.status == 200) {
            getAjaxData('/api/goodsCategory/getList?isPaging=0', (dataCategory) => {
                if (dataCategory.status == 200) {
                    const data=transformCategoryGoods(transformTree(dataCategory.data,0), transformGoods(dataInfo.data)); 
                    globalGoodsCategory=transformIndex(data,0,0,0);  
                    goodsLevelTreeVm.treeList = transformIndex(data,0,0,0); 
                }
            })
        }
    })
}

function changeIndex(arrIndex,categoryIndex1,categoryIndex2,categoryIndex3){
    let copy=[].concat(globalGoodsCategory);
    console.log(transformIndex(copy,categoryIndex1,categoryIndex2,categoryIndex3,arrIndex));
    goodsLevelTreeVm.treeList=transformIndex(copy,categoryIndex1,categoryIndex2,categoryIndex3,arrIndex);
}

var goodsLevelTreeVm=avalon.define({
    $id:"goodsLevelTree",
    treeList:[],
    background:"red",
    NumberFunc:Number,
    isVisible:function(index){
        if(index<3){
            return true
        }
    }
})  


var postMsgVm=avalon.define({
    $id:"postMessage",
    content:"",
    logined:!1,
    message:"",
    showErr:!1,
    messageList:[],
    replyState:!1,
    relationMsgId:"",
    replyAuthor:"",
    adminReplyAuthor:"",
    praise_num:0,
    despises_num:0,
    getAuthor:function(e,t,n){if(e){t=e[t];return t?t:e[n]||""}return""},
    reSetData:function(){postMsgVm.content="",postMsgVm.relationMsgId="",postMsgVm.replyAuthor="",postMsgVm.adminReplyAuthor="",postMsgVm.showErr=!1,postMsgVm.message=""},reply:function(e,t,n){e&&t&&(postMsgVm.reSetData(),postMsgVm.replyState=!0,postMsgVm.relationMsgId=e,"0"==n?postMsgVm.replyAuthor=t._id:postMsgVm.adminReplyAuthor=t._id,$("#msgSendBox").appendTo($("#msglist_"+e)))},cancelReply:function(){postMsgVm.reSetData(),postMsgVm.replyState=!1,$("#postMessage").prepend($("#msgSendBox"))},validate:{onError:function(e){e.forEach(function(e){console.log(e.getMessage())})},onValidateAll:function(e){e.length?(postMsgVm.showErr=!0,postMsgVm.message=e[0].message):(console.log("全部通过"),"true"==$("#logined").val()?(e={contentId:$("#contentId").val(),replyAuthor:postMsgVm.replyAuthor,adminReplyAuthor:postMsgVm.adminReplyAuthor,relationMsgId:postMsgVm.relationMsgId,content:postMsgVm.content},getAjaxData("/api/contentMessage/postMessages",function(e){200==e.status&&($("#postMessage").prepend($("#msgSendBox")),postMsgVm.reSetData(),getPostMessages())},"post",e)):window.location.href="/users/login")}}}),phoneListVm=avalon.define({$id:"phonelist",myContentList:[],contentTotalPage:1,contentPageClick:function(e,t){getAjaxData("/api/content/getList?current="+t,function(e){200==e.status&&(phoneListVm.myContentList=e.data.docs,phoneListVm.contentTotalPage=e.data.pageInfo.totalPage)})}}),phoneUserVm=avalon.define({$id:"phoneUser",userName:"",name:"",email:"",comments:"",phoneNum:"",logo:""});