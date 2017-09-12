var laychat = {
    initUrl: 'demo/json/test1.json',         // 初始化好友列表和群组接口，这个接口返回个json，格式见
    isMobile: false,
    address: 'ws://192.168.8.90:20019/websocket',
    socket: null,
    lastFromId: "",
    $: layui.jquery,
    jq: null,
    open: function () {
        if (this.inited) return;
        if (this.isIE6or7()) return;
        if (!this.jq) this.jq = layui.jquery;
        this.connectWorkerman();
        this.inited = 1;
    },
    isIE6or7: function () {
        var b = document.createElement('b');
        b.innerHTML = '<!--[if IE 5]><i></i><![endif]--><!--[if IE 6]><i></i><![endif]--><!--[if IE 7]><i></i><![endif]-->';
        return b.getElementsByTagName('i').length === 1;
    },
    connectWorkerman: function() {
        socket = new ReconnectingWebSocket(laychat.address);
        socket.onopen = function () {
            console.log("连接中....");
            socket.send(JSON.stringify({ "commandId": 3, "content": "{\"userName\": \"ipsa100OZEgBrKkCLmi7F7R1pUF8Q\",\"userPassword\":\"test\"}", "serviceId": 1 }));
        };
        socket.onmessage = function (evt) {
            var data = evt.data;
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
                            var mesDa = null;

                            //接收消息，判断是否加入到好友列表，如果没有加入，进行加入
                            var friend = new FriendData("friend", "http://tp1.sinaimg.cn/1571889140/180/40030060651/1", lastFromId, 1, lastFromId, "我是新来的！");
                            if (layui.jquery('.layim-friend' + friend.id).length == 0 && layui.layim.cache() && layui.layim.cache().id != friend.id) {
                                layui.layim.addList && layui.layim.addList(friend);
                                //设置在线状态
                                layui.layim.setFriendStatus && layui.layim.setFriendStatus(lastFromId, 'online');
                            }

                            if (msg.msg_type == 1) {
                                var msgContent = JSON.parse(msg.msg_content);
                                // 	单聊
                                switch (msg.command_type) {
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
            }

        };
        //连接关闭的回调函数
        socket.onclose  = function() {
            socket.close();
            console.log("websocket.onclose");
        }
        //socket.onclose = laychat.connectWorkerman;
    }

};