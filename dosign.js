const KEY = 'token'
var id,logId

function GetMessage(){
    const url = `https://student.wozaixiaoyuan.com/sign/getSignMessage.json`;
    const method = `POST`;
    const headers = {
    'Accept-Encoding' : `gzip,compress,br,deflate`,
    'content-type' : `application/x-www-form-urlencoded`,
    'Connection' : `keep-alive`,
    'Referer' : `https://servicewechat.com/wxce6d08f781975d91/149/page-frame.html`,
    'Host' : `student.wozaixiaoyuan.com`,
    'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.18(0x17001229) NetType/4G Language/zh_CN`,
    'token' : $prefs.valueForKey(KEY)
    };
    const body = `page=1&size=5`;
    
    const myRequest = {
        url: url,
        method: method,
        headers: headers,
        body: body
    };

  $task.fetch(myRequest).then(response => {
    const data = JSON.parse(response.body).data
    id = data[0].id
    logId = data[0].logId
    DoSign(id,logId)
  }, reason => {
      $notify("签到失败","签到失败","获取签到信息失败")
  });
}

function DoSign(id,logId){
    const url = `https://student.wozaixiaoyuan.com/sign/doSign.json`;
    const method = `POST`;
    const headers = {
    'Accept-Encoding' : `gzip,compress,br,deflate`,
    'content-type' : `application/json`,
    'Connection' : `keep-alive`,
    'Referer' : `https://servicewechat.com/wxce6d08f781975d91/149/page-frame.html`,
    'Host' : `student.wozaixiaoyuan.com`,
    'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.18(0x17001229) NetType/4G Language/zh_CN`,
    'token' : $prefs.valueForKey(KEY)
    };
    const body = `{"id":`+ logId +`,"signId":`+ id +`,"latitude":23.090164,"longitude":113.354053,"country":"中国","province":"广东省","city":"广州市","district":"海珠区","township":"官洲街道"}`;

    const myRequest = {
        url: url,
        method: method,
        headers: headers,
        body: body
    };

    $task.fetch(myRequest).then(response => {
        const data = JSON.parse(response.body)
        if(data.code == 0){
          $notify("签到成功","签到成功","签到成功")
        }
      }, reason => {
          $notify("签到失败","签到失败","签到请求失败")
      });
}

function Sign(){
    GetMessage()
    DoSign()
}


Sign()





