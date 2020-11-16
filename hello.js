const KEY = 'token'

function GetSeq(){
  const myDate = new Date()
  const hours = myDate.getHours()
  if(0<=hours && hours<=9){
    return 1
  }
  if(11<=hours && hours<=15){
    return 2
  }
  if(17<=hours && hours<=21){
    return 3
  }
  return 0
}

function Sign(){
  const url = `https://student.wozaixiaoyuan.com/heat/save.json`;
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
  const body = `answers=%5B%220%22%5D&seq=`+ GetSeq() +`&temperature=36.0&userId=&latitude=23.084003&longitude=113.317412&country=%E4%B8%AD%E5%9B%BD&city=%E5%B9%BF%E5%B7%9E%E5%B8%82&district=%E6%B5%B7%E7%8F%A0%E5%8C%BA&province=%E5%B9%BF%E4%B8%9C%E7%9C%81&township=%E6%B1%9F%E6%B5%B7%E8%A1%97%E9%81%93&street=%E4%B8%8A%E5%86%B2%E4%B8%AD%E7%BA%A6%E6%96%B0%E8%A1%97%E4%B8%80%E5%B7%B7&myArea=`;
  
  const myRequest = {
      url: url,
      method: method,
      headers: headers,
      body: body
  };
  $task.fetch(myRequest).then(response => {
    const data = JSON.parse(response.body)
    if(data.code == 0){
      $notify("打卡成功","打卡成功","打卡成功")
    }
  }, reason => {
      $notify("打卡失败","打卡失败","打卡失败")
  });
}

function GetToken(){
  if($request.headers && $request.url.match(/student\.wozaixiaoyuan\.com\/home\.json/)){
   const token = $request.headers['token']
   $prefs.setValueForKey(token,KEY)
   $notify("获取token成功","",token)
 } 
}

function ReadToken(){
 const isRequest = typeof $request != "undefined"
 if(isRequest){
  GetToken()
  return
 }
 console.log($prefs.valueForKey(KEY))
 Sign()
}


ReadToken()
$done({})





