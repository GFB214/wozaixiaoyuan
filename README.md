# 我在校园自动打卡 模拟假条
ios quantumult x，我在校园自动打卡，进入小程序自动获取token， 模拟假条
自行下载脚本到script文件夹

```
#自动获取保存token，打卡
[task_local]
1 0,11,17 * * * daka.js, tag=自动打卡, enabled=true
[rewrite_local]
^https:\/\/student\.wozaixiaoyuan\.com\/home\.json url script-request-header daka.js
hostname = student.wozaixiaoyuan.com

#晚点名签到，依赖daka.js获取token
[task_local]
6 20 * * * dosign.js, tag=晚点名签到, enabled=true

#模拟假条列表
[rewrite_local]
^https://student\.wozaixiaoyuan\.com/leave2/getList\.json url script-response-body list4leave.js

#模拟假条详情
[rewrite_local]
^https://student\.wozaixiaoyuan\.com/leave2/getLeave\.json url script-response-body ask4leave.js
```
