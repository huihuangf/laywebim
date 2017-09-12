var LaySocket = function() {
   // this._init();
}
LaySocket.prototype = {
    webSocket: "",
    address: 'ws://192.168.8.90:20019/websocket',  
    init: function() {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        if (!window.WebSocket) {
            alert("WebSocket not supported by this browser");
        };
        this.webSocket = new WebSocket(this.address);
        this.webSocket.onerror = function(event) {
            alert("websockt连接发生错误，请刷新页面重试!");
        };
        this.webSocket.onopen = function(event) {
            //  webSocket.send("_online_user_"+currentId); 
            //登录成功
            this.webSocket.send(JSON.stringify({ "commandId": 3, "content": "{\"userName\": \"ipsa100OZEgBrKkCLmi7F7R1pUF8Q\",\"userPassword\":\"test\"}", "serviceId": 1 }));

        };
        this.webSocket.onmessage = function(event) {
            var data = evt.data;
            //	alert("received message: " + data);
            console.log("asa:" + data);
            var resp = JSON.parse(data);
            switch (resp.serviceId) {
            case 1:
                {
                    if (resp.commandId == 3) {
                        alert("login success, user info: " + resp.content);
                        var user = JSON.parse(resp.content);
                        userId = user.userId;
                    }
                }
                break;
            case 3:
                {
                    if (resp.commandId == 1) {
                        console.log("content: " + resp.content);
                        var msgResp = JSON.parse(resp.content);
                        console.log(msgResp);
                        var content = msgResp.fromId + ":" + msgResp.content;
                        lastFromId = msgResp.fromId;
                        var msg = JSON.parse(msgResp.content);
                        var mesData = {};
                        if (msg.msg_type == 1) {
                            var msgContent = JSON.parse(msg.msg_content);
                            // 	单聊
                            switch (msg.command_type) {
                            case 2:
                                var friend = new FriendData("friend", "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", lastFromId, 1, lastFromId, "我是新来的！");

                                if (layui.jquery('.layim-friend' + friend.id).length == 0 && layui.layim.cache() && layui.layim.cache().id != friend.id) {
                                    layui.layim.addList && layui.layim.addList(friend);
                                    //设置在线状态
                                    layui.layim.setFriendStatus && layui.layim.setFriendStatus(lastFromId, 'online');
                                }
                                var mesDa = new MesData(lastFromId, "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", lastFromId, "friend", msgContent.msg, 0, false, lastFromId, (msg.msg_time) * 1000);
                                layim.getMessage(mesDa);
                                //    layui.layim.setFriendStatus && layui.layim.setFriendStatus(lastFromId, 'online');
                                break;
                            case 3:
                                //	语音
                                //var audioContent = "<audio controls><source src=\"" + msgContent.url + "\" type=\"audio/ima4\"></audio>";
                                //$("#audioArea").html($("#audioArea").html() + audioContent);

                                mesData.username = "黄慧";
                                mesData.avatar = "http://tp1.sinaimg.cn/1571889140/180/40030060651/1";
                                mesData.id = lastFromId;
                                mesData.type = "friend";
                                mesData.content = "audio[" + msgContent.url + "]";
                                mesData.mine = false;
                                mesData.fromid = lastFromId;
                                mesData.timestamp = (msg.msg_time) * 1000;


                                layim.getMessage(mesData);

                                break;
                            case 4:
                                //	图片
                                //var imageContent = "<a href='" + msgContent.url + "' target='_blank'><img src=\"" + msgContent.url + "\" style='width: 50%; height: 50%;' /></a> ";
                                //$("#imageArea").html($("#imageArea").html() + imageContent);
                                mesData.username = "黄慧";
                                mesData.avatar = "http://tp1.sinaimg.cn/1571889140/180/40030060651/1";
                                mesData.id = lastFromId;
                                mesData.type = "friend";
                                mesData.content = "img[" + msgContent.url + "]";
                                mesData.mine = false;
                                mesData.fromid = lastFromId;
                                mesData.timestamp = (msg.msg_time) * 1000;
                                layim.getMessage(mesData);

                                break;
                            }

                        }


                    }
                }
                break;
            }

        }
    },
  waitForConnection:function (callback, interval) {//判断连接是否建立
    if (webSocket.readyState === 1) {
        callback();
    } else {
        var that = this;
        setTimeout(function () {
            that.waitForConnection(callback, interval);
        }, interval);
    }
},
addList : function () {
    if (layui.jquery('.layim-friend' + friend.id).length == 0 && layui.layim.cache() && layui.layim.cache().id != friend.id) {
        layui.layim.addList && layui.layim.addList(friend);
        //设置在线状态
        layui.layim.setFriendStatus && layui.layim.setFriendStatus(lastFromId, 'online');
    }
}
}

