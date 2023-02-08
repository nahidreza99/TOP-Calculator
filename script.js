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
const del = document.getElementById("delete");

const primaryDisplay = document.getElementById("primary");
const secondaryDisplay = document.getElementById("secondary");
const operatorDisplay = document.getElementById("operator");

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

window.addEventListener('keydown',handleKeyPress)

function handleKeyPress(e){
    if(e.key>=0 && e.key<=9){
        changePrimaryDisplay(e.key);
        return;
    }
    if(e.key==='.'){
        appendDot();
        return;
    }
    if(e.key ==='=' || e.key ==='Enter'){
        operatorDisplay.innerHTML = "=";
        getResult();
        return;
    }
    if(e.key === '+' || e.key==='-' || e.key==='*' || e.key === '/'){
        startOperation(e.key);
        return;
    }
    if(e.key==='%'){
        changeOperator("%");
        getPercentage();
        return;
    }
    if(e.key === 'Escape'){
        cleanMemory();
        return;
    }
    if(e.key === 'Backspace'){
        deleteDigit();
        return;
    }
} 

clear.onclick = function(){
    cleanMemory();
}

function cleanMemory(){
    resetDisplay();
    primary = 0;
    secondary = 0;
    operator = "";
    pending = 0;
    enableFloat = 1;
    operatorDisplay.innerHTML = "";
    secondaryDisplay.innerHTML = "0";
    secondaryDisplay.classList.add("hidden");
}

del.onclick = function (){
    deleteDigit();
}

function deleteDigit(){
    if(currNumber[currNumber.length-1]=="."){
        enableFloat=1;
    }
    currNumber = currNumber.substring(0,(currNumber.length-1));
    primary = parseFloat(currNumber);
    if(currNumber==""){
        primaryDisplay.innerHTML = "0";
    }
    else{
        primaryDisplay.innerHTML = currNumber;
    }
}

dot.onclick = function(){
    appendDot();
}

function appendDot(){
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
        startOperation(i);
    }
}

function startOperation(value){
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
    changeOperator(value);
    resetDisplay();
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

    if(value === 0 || value==='+'){
        operatorDisplay.innerHTML = "+";
        operator = "+";
        pending = 1;
        return;
    }
    if(value === 1 || value==='-'){
        operatorDisplay.innerHTML = "-";
        operator = "-";
        pending = 1;
        return;
    }
    if(value === 2 || value==='*'){
        operatorDisplay.innerHTML = "*";
        operator = "*";
        pending = 1;
        return;
    }
    if(value === 3 || value==='/'){
        operatorDisplay.innerHTML = "/";
        operator = "/";
        pending = 1;
        return;
    }
    if(value==='%'){
        operatorDisplay.innerHTML = "%";
        return;
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
    enableFloat =1;
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
