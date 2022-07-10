# RenXing
脚本仅供参考，请在24小时内删除本项目<br>
### 拉库命令 库中包含test_|me_自用脚本（默认拉库命令不含）
```Bash
ql repo https://ghproxy.com/https://github.com/SnowTlsj/RenXing.git "jd_|m_|pkc_jdCookie.js" "" "^jd[^_]|USER|function|utils|sendNotify"
```
### 监控储存桶，请自行替换全部 OPnUNixpl9I_ 部分为自己的Clients,set jd_cookie env_listens xxxxx
```Bash
[{"ID":0,"UUID":"e9556a8f-b290-11ec-be47-00163e16f57e","Name":"豆车","Keyword":"SnowTlsj_RenXing/jd_cjzdgf","Envs":["jd_cjhy_activityId","jd_cjhy_activityUrl"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556ae1-b290-11ec-be47-00163e16f57e","Name":"加购抽奖","Keyword":"SnowTlsj_RenXing/jd_wxCollectionActivity.js","Envs":["activityId"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556ae4-b290-11ec-be47-00163e16f57e","Name":"zdjr","Keyword":"SnowTlsj_RenXing/jd_zdjr.js","Envs":["jd_zdjr_activityId","jd_zdjr_activityUrl"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556ae7-b290-11ec-be47-00163e16f57e","Name":"半点京豆雨","Keyword":"SnowTlsj_RenXing/jd_redrain_half.js","Envs":["jd_redrain_half_url"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556ae9-b290-11ec-be47-00163e16f57e","Name":"幸运抽奖","Keyword":"SnowTlsj_RenXing/m_jd_wx_luckDraw.js","Envs":["M_WX_LUCK_DRAW_URL"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556aec-b290-11ec-be47-00163e16f57e","Name":"店铺签到","Keyword":"SnowTlsj_RenXing/jd_shop_sign.js","Envs":["SHOP_TOKENS"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b6d-b290-11ec-be47-00163e16f57e","Name":"女装盲盒","Keyword":"SnowTlsj_RenXing/jd_nzmh.js","Envs":["jd_nzmhurl"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b71-b290-11ec-be47-00163e16f57e","Name":"打豆豆","Keyword":"SnowTlsj_RenXing/jd_dadoudou.js","Envs":["WXGAME_ACT_ID"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b73-b290-11ec-be47-00163e16f57e","Name":"加购有礼","Keyword":"SnowTlsj_RenXing/m_jd_wx_addCart.js","Envs":["M_WX_ADD_CART_URL"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b75-b290-11ec-be47-00163e16f57e","Name":"众筹许愿池","Keyword":"SnowTlsj_RenXing/jd_wish.js","Envs":["wish_appIdArrList","wish_appNameArrList"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b78-b290-11ec-be47-00163e16f57e","Name":"微定制","Keyword":"SnowTlsj_RenXing/jd_wdz.js","Envs":["jd_wdz_activityId","jd_wdz_activityUrl"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b7b-b290-11ec-be47-00163e16f57e","Name":"M集卡抽奖","Keyword":"SnowTlsj_RenXing/m_jd_wx_collectCard.js","Envs":["jd_wxCollectCard_activityId"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b7c-b290-11ec-be47-00163e16f57e","Name":"盲盒任务抽京豆","Keyword":"SnowTlsj_RenXing/jd_mhtask.js","Envs":["jd_mhurlList"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b7f-b290-11ec-be47-00163e16f57e","Name":"入会开卡","Keyword":"SnowTlsj_RenXing/jd_OpenCard_Force.js","Envs":["VENDER_ID"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"fab25468-ce80-11ec-89ab-00163e16f57e","Name":"大牌通用开卡","Keyword":"SnowTlsj_RenXing/jd_opencardDPLHTY.js","Envs":["DPLHTY"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"3d7f3f6f-ce8b-11ec-89ab-00163e16f57e","Name":"皮卡车","Keyword":"SnowTlsj_RenXing/pkc_gzyl.js","Envs":["PKC_GZYL"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"6abc81ba-ce8b-11ec-89ab-00163e16f57e","Name":"皮卡车","Keyword":"SnowTlsj_RenXing/pkc_txgzyl.js","Envs":["PKC_TXGZYL"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"6082bcf8-d6d3-11ec-9369-00163e16f57e","Name":"读秒拼手速","Keyword":"SnowTlsj_RenXing/jd_wxSecond","Envs":["jd_wxSecond_activityId"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"4d228ae5-d754-11ec-bc7e-00163e16f57e","Name":"分享有礼","Keyword":"SnowTlsj_RenXing/jd_share.js","Envs":["jd_fxyl_activityId"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"d764af9b-dca2-11ec-977e-00163e16f57e","Name":"超级无线店铺签到","Keyword":"SnowTlsj_RenXing/jd_sevenDay","Envs":["SEVENDAY_LIST","SEVENDAY_LIST2"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"a50bd897-dea3-11ec-8127-00163e16f57e","Name":"618个护","Keyword":"SnowTlsj_RenXing/jd_lottery.js","Envs":["JD_Lottery"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e0714485-dff9-11ec-9ceb-00163e16f57e","Name":"joy通用开卡","Keyword":"SnowTlsj_RenXing/jd_joyopen.js","Envs":["JD_JOYOPEN"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"5a968181-e4f0-11ec-814d-000c29c6b2c5","Name":"分享有礼share","Keyword":"SnowTlsj_RenXing/jd_share2.js","Envs":["SHARE_ACTIVITY_ID"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"7d4a4ace-e5ff-11ec-98ca-000c29aee10b","Name":"lz刮刮乐抽奖通用活动","Keyword":"SnowTlsj_RenXing/jd_drawCenter","Envs":["jd_drawCenter_activityId"],"Disable":false,"Clients":["OPnUNixpl9I_"],"Interval":0,"MaxRuntime":0,"Mode":false}]
```
### 变量默认url，写入配置文件
```Bash
export yhypin="jd_xxxxxxxx"
export jd_wdz_pin="jd_xxxxxxxx"
export jd_wdz_activityUrl="https://cjhydz-isv.isvjcloud.com"
export jd_cjhy_activityUrl="https://cjhydz-isv.isvjcloud.com"
export jd_zdjr_activityUrl="https://lzkjdz-isv.isvjcloud.com"
```
