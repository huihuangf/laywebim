function Animal() {
    this.type = "动物";
}
Animal.prototype.say = function () {
    console.log("这是", this.type);
    return this;
};

var animal = new Animal();
animal.say();

//那想从动物里扩展出一条狗。。。
function Dog() {
    this.type = "狗";
    this._sound = "wang wang";
}
Dog.prototype = animal;
Dog.prototype.sound = function () {
    console.log(this._sound);
}

var dog = new Dog();
dog.say().sound();

//那再来个狗仔呢？
function Dog2() {
    this.type = "狗2";
    this._sound = "wang wang wang";
}
Dog2.prototype = dog;

var dog2 = new Dog2();
dog2.say().sound();