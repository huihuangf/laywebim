
//添加群组？？？未写
//{
//    type: 'group' //列表类型，只支持friend和group两种
//    ,avatar: "a.jpg" //群组头像
//    ,groupname: 'Angular开发' //群组名称
//    ,id: "12333333" //群组id
//}


//添加好友的对象
//    {
//      type: 'friend' //列表类型，只支持friend和group两种
//       ,avatar: "a.jpg" //好友头像
//       ,username: '冲田杏梨' //好友昵称
//       ,groupid: 2 //所在的分组id
//       ,id: "1233333312121212" //好友id
//       ,sign: "本人冲田杏梨将结束AV女优的工作" //好友签名
//   }

function FriendData(type, avatar, username, groupid, id, sign) {
    this.type = type;
    this.avatar = avatar;
    this.username = username;
    this.groupid = groupid;
    this.id = id;
    this.sign = sign;
}
FriendData.prototype= {
    constructor: FriendData
}

//发送消息的对象
//var data11 = {                                       
//    username: "纸飞机" //消息来源用户名
//    ,avatar: "http://tp1.sinaimg.cn/1571889140/180/40030060651/1" //消息来源用户头像
//    , id: 97281//消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
//    ,type: "friend" //聊天窗口来源类型，从发送消息传递的to里面获取
//    ,content: msgContent.msg//消息内容
//    ,cid: 0 //消息id，可不传。除非你要对消息进行一些操作（如撤回）
//    ,mine: false //是否我发送的消息，如果为true，则会显示在右方
//    ,fromid: lastFromId //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
//    ,timestamp: 1467475443306 //服务端动态时间戳
//      }
function MesData(username, avatar, id, type, content, cid, mine, fromid, timestamp) {
    this.username = username;//消息来源用户名
    this.avatar = avatar;//消息来源用户头像
    this.id = id;//消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
    this.type = type;//聊天窗口来源类型，从发送消息传递的to里面获取
    this.content = content;//消息内容
    this.cid = cid;//消息id，可不传。除非你要对消息进行一些操作（如撤回）
    this.mine = mine;//是否我发送的消息，如果为true，则会显示在右方
    this.fromid = fromid; //消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
    this.timestamp = timestamp;//服务端动态时间戳
}
MesData.prototype= {
    constructor:MesData
}
