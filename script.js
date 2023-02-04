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
const operatorDisplay = document.getElementById("operator");

/*var digit = [{name: "zero", value: zero,}, {name:"one", value: one,}, {name: "two", value: two,}, {name: "three", value: three,},
        {name: "four", value: four,}, {name: "five", value: five,}, {name: "six", value: six,}, {name: "seven", value: seven,},
             {name: "eight", value: eight}, {name: "nine", value: nine}];*/

var digit = [zero, one, two, three, four, five, six, seven, eight, nine];
var operation = [add, subtract, multiply, divide];

var secondary = 0;
var primary = 0;
var result = 0;
let currNumber = "";
let operator = "";

let pending = 0;

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

for(let i=0; i<operation.length;i++){
    operation[i].onclick = function(){
        if(!pending){
            storeNumber();
        }
        else{
            if(primary!=0){
                result = getResult();
                secondary = result;
                secondaryDisplay.innerHTML = secondary;
                primary =0;
                primaryDisplay.innerHTML = primary;
                currNumber = "";
            }
        }
        changeOperator(i);
    }
}

equal.onclick = function(){
    result = getResult();
    pending = 0;
    secondary = primary;
    currNumber = primaryDisplay.innerHTML;
    operator = "";
}

function getResult(){
    operatorDisplay.innerHTML = "=";
    primary = operate(operator);
    primaryDisplay.innerHTML = primary;
    return primary;
}

function storeNumber(){
    secondary = parseInt(currNumber);
    secondaryDisplay.innerHTML = secondary;
    secondaryDisplay.classList.remove("hidden");
    primary = 0;
    currNumber = "";
    primaryDisplay.innerHTML = primary;
    pending = 1;
}



function changeOperator(value){
    switch(value){
        case 0:
            operatorDisplay.innerHTML = "+";
            operator = "add";
            break;
        case 1:
            operatorDisplay.innerHTML = "-";
            operator = "subtract";
            break;
        case 2:
            operatorDisplay.innerHTML = "x";
            operator = "multiply";
            break;
        case 3:
            operatorDisplay.innerHTML = "/";
            operator = "divide";
            break;
    }
}

function changePrimaryDisplay(value){
    currNumber +=value;
    primary = parseInt(currNumber);
    currNumber = primary.toString();
    primaryDisplay.innerHTML = currNumber;
}

function operate(value){
    if(value ===""){
        return calculator.add(primary,0);
    }
    else if(value==="add"){
        return calculator.add(secondary, primary);
    }
    else if(value==="subtract"){
        return calculator.subtract(secondary, primary);
    }
    else if(value==="multiply"){
        return calculator.multiply(secondary, primary);
    }
    else if(value==="divide"){
        return calculator.divide(secondary, primary);
    }
    else{
        console.log("no module added");
        return -999;
    }
}
