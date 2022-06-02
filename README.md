# RenXing
脚本仅供参考，请在24小时内删除本项目<br>
### 拉库命令
```Bash
ql repo https://ghproxy.com/https://github.com/SnowTlsj/RenXing.git "jd_|m_|pkc_|jdCookie" "activity|backUp" "^jd[^_]|USER|function|utils|sendNotify|JDJRValidator_|sign_graphics_validate|ql|JDSignValidator|magic"
```
### 监控储存桶，请自行替换全部 _6Zyk2WnNuam 部分为自己的Clients,set jd_cookie env_listens xxxxx
```Bash
[{"ID":0,"UUID":"e9556a8f-b290-11ec-be47-00163e16f57e","Name":"豆车","Keyword":"jd_cjzdgf","Envs":["jd_cjhy_activityId","jd_cjhy_activityUrl"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556ae1-b290-11ec-be47-00163e16f57e","Name":"加购抽奖","Keyword":"jd_wxCollectionActivity.js","Envs":["activityId"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556ae4-b290-11ec-be47-00163e16f57e","Name":"zdjr","Keyword":"zdjr.js","Envs":["jd_zdjr_activityId","jd_zdjr_activityUrl"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556ae7-b290-11ec-be47-00163e16f57e","Name":"半点京豆雨","Keyword":"jd_redrain_half.js","Envs":["jd_redrain_half_url"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556ae9-b290-11ec-be47-00163e16f57e","Name":"幸运抽奖","Keyword":"jd_wx_luckDraw.js","Envs":["M_WX_LUCK_DRAW_URL"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556aec-b290-11ec-be47-00163e16f57e","Name":"店铺签到","Keyword":"jd_shop_sign.js","Envs":["SHOP_TOKENS"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b6d-b290-11ec-be47-00163e16f57e","Name":"女装盲盒","Keyword":"jd_nzmh.js","Envs":["jd_nzmhurl"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b71-b290-11ec-be47-00163e16f57e","Name":"打豆豆","Keyword":"jd_dadoudou.js","Envs":["WXGAME_ACT_ID"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b73-b290-11ec-be47-00163e16f57e","Name":"加购有礼","Keyword":"m_jd_wx_addCart.js","Envs":["M_WX_ADD_CART_URL"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b75-b290-11ec-be47-00163e16f57e","Name":"众筹许愿池","Keyword":"jd_wish.js","Envs":["wish_appIdArrList","wish_appNameArrList"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b78-b290-11ec-be47-00163e16f57e","Name":"微定制","Keyword":"jd_wdz.js","Envs":["jd_wdz_activityId","jd_wdz_activityUrl"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b7b-b290-11ec-be47-00163e16f57e","Name":"M集卡抽奖","Keyword":"m_jd_wx_collectCard.js","Envs":["M_WX_COLLECT_CARD_URL"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b7c-b290-11ec-be47-00163e16f57e","Name":"特务","Keyword":"jd_superBrand.js","Envs":["jd_mhurlList"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e9556b7f-b290-11ec-be47-00163e16f57e","Name":"入会开卡","Keyword":"jd_OpenCard_Force.js","Envs":["VENDER_ID"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"fab25468-ce80-11ec-89ab-00163e16f57e","Name":"大牌通用开卡","Keyword":"jd_opencardDPLHTY.js","Envs":["DPLHTY"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"3d7f3f6f-ce8b-11ec-89ab-00163e16f57e","Name":"皮卡车","Keyword":"pkc_gzyl.js","Envs":["PKC_GZYL"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"6abc81ba-ce8b-11ec-89ab-00163e16f57e","Name":"皮卡车","Keyword":"pkc_txgzyl.js","Envs":["PKC_TXGZYL"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"6082bcf8-d6d3-11ec-9369-00163e16f57e","Name":"读秒拼手速","Keyword":"jd_wxSecond","Envs":["jd_wxSecond_activityId"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"4d228ae5-d754-11ec-bc7e-00163e16f57e","Name":"分享有礼","Keyword":"jd_share.js","Envs":["jd_fxyl_activityId"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"d764af9b-dca2-11ec-977e-00163e16f57e","Name":"超级无线店铺签到","Keyword":"jd_sevenDay","Envs":["SEVENDAY_LIST","SEVENDAY_LIST2"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":300,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"a50bd897-dea3-11ec-8127-00163e16f57e","Name":"618个护","Keyword":"jd_lottery.js","Envs":["JD_Lottery"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false},{"ID":0,"UUID":"e0714485-dff9-11ec-9ceb-00163e16f57e","Name":"joy通用开卡","Keyword":"jd_joyopen.js","Envs":["JD_JOYOPEN"],"Disable":false,"Clients":["_6Zyk2WnNuam"],"Interval":0,"MaxRuntime":0,"Mode":false}]
```
