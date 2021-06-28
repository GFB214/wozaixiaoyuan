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

//请假理由
title = "外出实习"
//请假类型 事假 病假 实习 科研 出差 回家
type = "事假" 
//假条状态 3假期中
state = 3

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

body = {
    "data" : [
      {
        "end" : end,
        "start" : start,
        "id" : "212234550814392434",
        "title" : title,
        "type" : type,
        "state" : state,
      },
      {
        "end" : "2021-06-21 19:30",
        "start" : "2021-06-21 11:00",
        "id" : "232423455814392320",
        "title" : "去医院牙医，拔智齿",
        "type" : "病假",
        "state" : 6,
      },
      {
        "end" : "2021-06-13 20:00",
        "start" : "2021-06-13 11:00",
        "id" : "240360550814122319",
        "title" : "事假",
        "type" : "外出理发",
        "state" : 6,
      }
    ],
    "code" : 0
  }
$done({body:JSON.stringify(body)});
