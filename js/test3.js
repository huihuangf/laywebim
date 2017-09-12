var Animal = Object.create({
    init: function(opts) {
        this.type = "动物";
        return this;
    },
    say: function() {
        console.log("这是个："+this.type);
        return this;
    },
    extend: function(o) {
        return Object.create(this,o);
    }
});
var Dog = Animal.extend({
    type: { value: "狗子" },
    say3: {
        value: function() {
            console.log("wangwang");
        }
    }
});
Animal.init().say();
Dog.init().say3();