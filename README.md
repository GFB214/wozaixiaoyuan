# 我在校园自动打卡
ios quantumult x，我在校园自动打卡，进入小程序自动获取token

自动获取保存token，打卡

[task_local]
1 0,11,17 * * * https://raw.githubusercontent.com/Milky01/wozaixiaoyuan/main/hello.js, tag=自动打卡, enabled=true
[rewrite_local]
^https:\/\/student\.wozaixiaoyuan\.com\/home\.json url script-request-header https://raw.githubusercontent.com/Milky01/wozaixiaoyuan/main/hello.js
hostname = student.wozaixiaoyuan.com

晚点名签到，依赖打卡获取token

[task_local]
6 20 * * * https://raw.githubusercontent.com/Milky01/wozaixiaoyuan/main/dosign.js, tag=晚点名签到, enabled=true

~~todo: 定位签到~~
