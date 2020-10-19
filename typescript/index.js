//枚举
var Color;
(function (Color) {
    Color["Red"] = "red";
    Color["Green"] = "green";
    Color["Blue"] = "blue";
})(Color || (Color = {})); //{ Red: 'red', Green: 'green', Blue: 'blue' }
console.log(Color.Red);
