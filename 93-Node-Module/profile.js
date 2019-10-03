// exports.world = function(){
//     console.log("hello world!");
// }

// module.exports = {
//     say:function(){
//         console.log("Hello,Node!");
//     },
//     firstName:"Kyrie",
//     lastName:"Irving"
// }

function Name(name){
    this.name = name;
    this.sayName = function(){
        console.log(name);
    }
}
// 下面会报错,mudule.exports 的赋值必须立即完成
/*setTimeout(function(){
    module.exports = Name;
},1000);
*/

module.exports = Name;
