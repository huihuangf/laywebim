//如果发现有ns这个对象就使用这个对象，如果没有就创建
var ns = ns | {};
//ns创建第二级
ns.ModuleData = {};
ns.ModuleData.test= function() {
    console.log("test方法");
}
