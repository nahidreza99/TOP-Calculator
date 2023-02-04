const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const add = document.getElementById("add");
const subtract = document.getElementById("subtract");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const minus = document.getElementById("negative");
const percent = document.getElementById("percent");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");

const primaryDisplay = document.getElementById("primary");
const secondaryDisplay = document.getElementById("secondary");

/*var digit = [{name: "zero", value: zero,}, {name:"one", value: one,}, {name: "two", value: two,}, {name: "three", value: three,},
        {name: "four", value: four,}, {name: "five", value: five,}, {name: "six", value: six,}, {name: "seven", value: seven,},
             {name: "eight", value: eight}, {name: "nine", value: nine}];*/

var digit = [zero, one, two, three, four, five, six, seven, eight, nine];

var secondary = 0;
var primary = 0;
var result = 0;
let currNumber = "";

let calculator = {
    add: function (x, y){
        return x+y;
    },
    subtract: function(x, y){
        return x-y;
    },
    multiply: function(x, y){
        return x*y;
    },
    divide: function(x, y){
        return x/y;
    },
}

for(let i=0; i<digit.length; i++){
    digit[i].onclick = function(){
        changePrimaryDisplay(i.toString());
    }
}

function changePrimaryDisplay(value){
    //currNumber = primaryDisplay.innerHTML += 1;
    //return parseFloat(currNumber);
    currNumber +=value;
    primaryDisplay.innerHTML = parseInt(currNumber);

}

function operate(operator){
    if(operator==="add"){
        result = calculator.add(secondary, primary);
        console.log(result);
    }
    else if(operator==="subtract"){
        result = calculator.subtract(secondary, primary);
        console.log(result);
    }
    else if(operator==="multiply"){
        result = calculator.multiply(secondary, primary);
        console.log(result);
    }
    else if(operator==="divide"){
        result = calculator.divide(secondary, primary);
        console.log(result);
    }
    else{
        console.log("no module added");
        return;
    }
}
