Date.prototype.format = function(fmt) { 
    var o = { 
       "M+" : this.getMonth()+1,                 //月份 
       "d+" : this.getDate(),                    //日 
       "h+" : this.getHours(),                   //小时 
       "m+" : this.getMinutes(),                 //分 
       "s+" : this.getSeconds(),                 //秒 
       "q+" : Math.floor((this.getMonth()+3)/3), //季度 
       "S"  : this.getMilliseconds()             //毫秒 
   }; 
   if(/(y+)/.test(fmt)) {
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
   }
    for(var k in o) {
       if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
   return fmt; 
}

function getFormatTime(time,flag) {
    if(flag === 1) {
        return time.format("yyyy-MM-dd hh:mm")
    } else {
        return time.format("MM-dd hh:mm")
    }
}

function prepareApproveTime(time){
    time.setHours(Math.max(9,Math.floor(Math.random()*23)))
    time.setMinutes(Math.floor(Math.random()*59))
    date = time.getDate()-1
    month = time.getMonth()
    if(date <= 0){
        if(month == 1){
            month = 12
        } else {
            month = month-1
        }
        if(month == 2) {
            date = 28
        } else {
            date = 30
        }
    }
    time.setMonth(month)
    time.setDate(date)
}

//用户信息
//学生id
studentId = "213231342334566589"
//姓名
studentName = "陈少一"
//校区
location = "[\"广州校区\"]"
//紧急联系人
tel = "18982192888"
//请假理由
reason = "外出实习"
//外出地点
route = "金融城"
//用户头像 默认随机
userHead = "http://lorempixel.com/200/200/"
//请假类型 事假 病假 实习 科研 出差 回家
type = "事假"
//是否离校 1是 0否
out = 1
//假条状态 2应该是假期中吧，除了2其他值界面都一样
state = 2

//审批信息
//辅导员姓名
approveName = "李少洁"
//辅导员学院
approveAcademy = "金融学院"
//辅导员头像 默认随机
approveHead = "http://lorempixel.com/200/200/"
//审批理由
approveReason = "办完事马上回校，不得在外逗留"
//审核状态 3拒绝 2通过 1审批中
approveState = 2

//指定假期开始时间结束时间 格式 "2021-06-28 10:00"
//不指定则默认开始时间为当前 前1小时，结束时间当前 后2小时，不同时间打开会改变
start = ""
end = ""

var time = new Date()
time.setMinutes(0)
if(start==="" && end === ""){
    nowHour = time.getHours()
    //开始时间
    time.setHours(Math.max(0,(nowHour - 1)))
    start = getFormatTime(time,1)
    //结束时间
    time.setHours(Math.min(23,(nowHour+3)))
    end = getFormatTime(time,1)
}
//批假时间 前一天随机时刻
prepareApproveTime(time)
approvetime = getFormatTime(time,2)

body = {
    "code": 0,
    "data": {
        "reason": reason,
        "imgs": [],
        "start": start,
        "end": end,
        "type": type,
        "out": out,
        "userHead": userHead,
        "route": route,
        "tel": tel,
        "state": state,
        "approve": [
            {
                "head": approveHead,
                "reason": approveReason,
                "name": approveName,
                "state": approveState,
                "time": approvetime,
                "position": approveAcademy
            }
        ],
        "studentId": studentId,
        "studentName": studentName,
        "location": location,
        "scanHistory": []
    }
}
$done({ body: JSON.stringify(body)});

