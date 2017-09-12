/*layim*/
var webImConfig= {
    initUrl: '../json/getList.json',//初始化数据请求的url
    address: 'ws://192.168.8.90:20019/websocket',//websocket连接请求的url
    membersUrl: "../json/getMembers.json",
    uploadImageUrl: "",//上传图片的地址
    uploadFileUrl:"",//上传文件的地址
    isMobile: false,//是否是mobile
    appName: "软通web",//app名称
    enableAudio: true,//开启聊天工具栏音频
    enableVideo: true,//开启聊天工具栏视频
    enableBrief:false,//是否开启简约模式

    socket: null,
    jq: null,
    open: function () {//初始化
        if (!this.jq) this.jq = $;
        this.websocketData();
    },
    //websocket处理
    websocketData: function() {
            socket = new WebSocket(webImConfig.address);
            socket.onopen = function() {
                console.log("连接中....");
                //此时需要再增加一个类型，默认是初始化init
                socket.send(JSON.stringify({ "commandId": 3, "content": "{\"userName\": \"ipsa100OZEgBrKkCLmi7F7R1pUF8Q\",\"userPassword\":\"test\"}", "serviceId": 1 }));
                // socket.send(JSON.stringify({ type: 'init' }));
            };
            //监听消息的
            socket.onmessage = function (e) {
               //获取监听返回数据
                var msg = JSON.parse(e.data);
                // 如果layim还没有初始化就收到消息则忽略（init消息除外）
                if (!msg.serviceId || (msg.serviceId != '1' && !layui.layim)) return;
                switch (msg.message_type) {
                    //建立连接成功
                    case "1":
                        {
                            //如果commanId=3.则登录成功，获取初始化数据
                            if (msg.commandId == 3) {
                                //alert("login success, user info: " + resp.content);
                                var user = JSON.parse(msg.content);
                                //获取当前用户的好友和群组信息
                                webImConfig.jq.post(initUrl, { userId: user.userId }, function (data) {
                                    //json数据返回，返回的数据加载到init
                                    webImConfig.initIm(data);
                                }, 'json');
                            }
                        }
                        break;
                        //代表的是接收消息(现在是个人消息)
                    case "3":
                {
                    if (msg.commandId == 1) {
                        console.log("content: " + msg.content);
                        var msgResp = JSON.parse(msg.content);
                        console.log(msgResp);
                        var content = msgResp.fromId + ":" + msgResp.content;
                        lastFromId = msgResp.fromId;
                        var msgCon = JSON.parse(msgResp.content);
                        var mesDa = null;

                        //接收消息，判断是否加入到好友列表，如果没有加入，进行加入
                        var friend = new FriendData("friend", "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", lastFromId, 1, lastFromId, "我是新来的！");
                        if (layui.jquery('.layim-friend' + friend.id).length == 0 && layui.layim.cache() && layui.layim.cache().id != friend.id) {
                            layui.layim.addList && layui.layim.addList(friend);
                            //设置在线状态
                            layui.layim.setFriendStatus && layui.layim.setFriendStatus(lastFromId, 'online');
                        }

                        if (msgCon.msg_type == 1) {
                            var msgContent = JSON.parse(msgCon.msg_content);
                            // 	单聊
                            switch (msgCon.command_type) {
                                case 2:
                                    mesDa = new MesData(lastFromId, "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", lastFromId, "friend", msgContent.msg, 0, false, lastFromId, (msg.msg_time) * 1000);
                                    layui.layim.getMessage(mesDa);
                                    break;
                                case 3:
                                    //	语音
                                    mesDa = new MesData(lastFromId, "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", lastFromId, "friend", "audio[" + msgContent.url + "]", 0, false, lastFromId, (msg.msg_time) * 1000);
                                    layui.layim.getMessage(mesDa);
                                    break;
                                case 4:
                                    //	图片
                                    mesDa = new MesData(lastFromId, "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", lastFromId, "friend", "img[" + msgContent.url + "]", 0, false, lastFromId, (msg.msg_time) * 1000);
                                    layui.layim.getMessage(mesDa);
                                    break;
                            }

                        }
                    }
                }
                break;
                      //  消息数提示，待定后台传值是msgbox
                 case 'msgbox':
                        layui.layim.msgbox && layui.layim.msgbox(msg.count);
                        break;


                }

            }
    },
    //layim的处理
    initIm: function(data) {
        layui.layim.config({
            //初始化数据接口
           init: {
               url: this.initUrl,
               data:{}
           }
            //查看群员接口
           ,members: {
               url: webImConfig.membersUrl
           }
            // 上传图片
           ,uploadImage: {
               url: webImConfig.uploadImageUrl
           }

          // 上传文件
         ,uploadFile: {
             url: webImConfig.uploadFileUrl
        },
         title: webImConfig.appName,
         isAudio: webImConfig.enableAudio //开启聊天工具栏音频
         , isVideo: webImConfig.enableVideo //开启聊天工具栏视频
          , brief: webImConfig.enableBrief //是否简约模式（若开启则不显示主面板，建议为false）
            ,right: '50px' //主面板相对浏览器右侧距离
            ,minRight: '90px' //聊天面板最小化时相对浏览器右侧距离
            , initSkin: '3.jpg' //1-5 设置初始背景
            //,skin: ['aaa.jpg'] //新增皮肤
           ,isfriend: true //是否开启好友
            , isgroup: false //是否开启群组
            ,iswechat:false
            //,min: true //是否始终最小化主面板，默认false
            //,notice: true //是否开启桌面消息提醒，默认false
            //,voice: false //声音提醒，默认开启，声音文件为：default.mp3
        });
    }
}