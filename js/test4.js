function Animal(name) {
    this.name = name || 'Animal';
    this.sleep = function () {
        console.log(this.name+"正在睡觉");
    }
}
 function Cat(name) {
   Animal.call(this);
    this.name = name || '小猫';
 }

Cat.prototype = new Animal();
//(function () {
//    // 创建一个没有实例方法的类
//    var Super = function () { };
//    Super.prototype = Animal.prototype;
//    //将实例作为子类的原型
//    Cat.prototype = new Super();
//})();

//原型链继承
function Person(name,age) {
    this.name = name;
    this.age = age;
}
Person.prototype.say=function() {
    console.log("我是Person中的name："+this.name);
}

function Man() { }

Man.prototype = new Person('hh');
var man = new Man();
man.say();
var man1 = new Man();

function SuperType() {
    this.property = true;
}
SuperType.prototype.getSuperValue= function() {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}

SubType.prototype = new SuperType();
SubType.prototype.getSuperValue= function() {
    return this.subproperty;
}
