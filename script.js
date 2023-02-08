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
const negative = document.getElementById("negative");
const percent = document.getElementById("percentage");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");
const dot = document.getElementById("dot");

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
let enableFloat = 1;

let calculator = {
    add: function (x, y){
        return Math.round((x+y)*1000)/1000;
    },
    subtract: function(x, y){
        return Math.round((x-y)*1000)/1000;
    },
    multiply: function(x, y){
        return Math.round((x*y)*1000)/1000;
    },
    divide: function(x, y){
        return Math.round((x/y)*1000)/1000;
    },
    percentage: function(x){
        return Math.round((x/100)*1000)/1000;
    },
}

resetDisplay();

for(let i=0; i<digit.length; i++){
    digit[i].onclick = function(){
        changePrimaryDisplay(i.toString());
    }
}

clear.onclick = function(){
    resetDisplay();
    primary = 0;
    secondary = 0;
    operator = "";
    pending = 0;
    operatorDisplay.innerHTML = "";
    secondaryDisplay.innerHTML = "0";
    secondaryDisplay.classList.add("hidden");
}

dot.onclick = function(){
    if(enableFloat){
        changePrimaryDisplay(".");
        enableFloat = 0;
    }
    else{
        return;
    }
}

negative.onclick = function(){
    primary = 0-primary;
    currNumber = primary.toString();
    primaryDisplay.innerHTML = currNumber;
}

percent.onclick = function(){
    changeOperator("%");
    getPercentage();
}

function getPercentage(){
    result = operate("%");
    primary = result;
    primaryDisplay.innerHTML = result;
    currNumber ="";
}

for(let i=0; i<operation.length;i++){
    operation[i].onclick = function(){
        if(!pending){
            storeNumber();
        }
        else{
            if(primary!=0){
                getResult();
                secondary = result;
                secondaryDisplay.innerHTML = secondary;
                primary = 0;
            }
        }
        enableFloat = 1;
        changeOperator(i);
        resetDisplay();
    }
}

equal.onclick = function(){
    operatorDisplay.innerHTML = "=";
    getResult();
}

function resetDisplay(){
    currNumber = "";
    primaryDisplay.innerHTML = "0";
}

function changeOperator(value){
    switch(value){
        case 0:
            operatorDisplay.innerHTML = "+";
            operator = "+";
            pending = 1;
            break;
        case 1:
            operatorDisplay.innerHTML = "-";
            operator = "-";
            pending = 1;
            break;
        case 2:
            operatorDisplay.innerHTML = "x";
            operator = "*";
            pending = 1;
            break;
        case 3:
            operatorDisplay.innerHTML = "/";
            operator = "/";
            pending = 1;
            break;
        case "%":
            operatorDisplay.innerHTML = "%";
            break;
    }
}

function changePrimaryDisplay(value){
    if(currNumber=="" && value == "0"){
        return;
    }
    if(currNumber=="" && value == "."){
        currNumber+= "0";
    }
    currNumber +=value;
    primaryDisplay.innerHTML = currNumber;
    primary = parseFloat(currNumber);
}

function getResult(){
    if(operator ==="/" && primary==0){
        primaryDisplay.innerHTML = "Math error";
        return;
    }
    result = operate(operator);
    primary = result;
    primaryDisplay.innerHTML = result;
    currNumber ="";
    pending = 0;
}

function storeNumber(){
    secondary = primary;
    primary = 0;
    secondaryDisplay.innerHTML = secondary;
    secondaryDisplay.classList.remove("hidden");
    pending = 1;
}

function operate(value){
    if(value ===""){
        return calculator.add(primary,0);
    }
    else if(value==="+"){
        return calculator.add(secondary, primary);
    }
    else if(value==="-"){
        return calculator.subtract(secondary, primary);
    }
    else if(value==="*"){
        return calculator.multiply(secondary, primary);
    }
    else if(value==="/"){
        return calculator.divide(secondary, primary);
    }
    else if(value === "%"){
        return calculator.percentage(primary);
    }
    else{
        console.log("no module added");
        return -999;
    }
}
