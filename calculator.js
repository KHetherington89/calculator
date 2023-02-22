const footer = document.getElementById("footer");
const screenTop = document.getElementById("screenTop");
const screenMain = document.getElementById("screenMain");
const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const decimal = document.getElementById("decimal");
const allClear = document.getElementById("allClear");
const backspace = document.getElementById("backspace");
const equals = document.getElementById("equals");
const posNeg = document.getElementById("posNeg");

let rawMath = [];
let workingString = "0";
let topString = "0"
let opLast = true;
let equalsLast = false;
let answer;

screenMain.innerText = workingString;
screenTop.innerText = topString;

// EVENT LISTENERS

numButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        numButtonsFunc(btn);
    })
})

opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        opButtonsFunc(btn);
    })
})

decimal.addEventListener("click", () => {
    decimalFunc(btn);
})

allClear.addEventListener("click", () => {
    allClearFunc();
})

posNeg.addEventListener("click", () => {
    posNegFunc();
})

backspace.addEventListener("click", () => {    
    backspaceFunc();
})

equals.addEventListener("click", () => {
    equalsFunc();
})

// FUNCTIONS

function numButtonsFunc(btn){
    if(equalsLast === false){
        if((workingString === "0") || (opLast === true)){
            workingString = `${btn.dataset.shows}`;
            }
        else{
            workingString += (`${btn.dataset.shows}`);
        } 
        opLast = false;
        screenMain.innerText = "";
        setTimeout(() => screenMain.innerText = workingString, 30);  //Time out just makes the display blink, so that it's obvious a new number has been entered, even if it's the
        console.log(opLast);                                         // same as what is currently being shown. Shows calculator is "doing something". 
    }   
}

function opButtonsFunc(btn){
    if(opLast === false){
        if((rawMath[rawMath.length -1] === "/") && workingString === "0"){
            screenMain.innerText = "You cant divide by zero fool!"
        }
        else{        
        if(equalsLast === true){topString = ""};
        if(workingString.slice(-1) === "."){
            workingString = workingString.slice(0, -1)
        }
        if(topString === "0"){
            topString = workingString
        }
        else{
            topString += workingString
        }
        rawMath.push(+workingString);
        rawMath.push(`${btn.dataset.shows}`);
        topString += (`${btn.dataset.shows}`);
        screenTop.innerText = topString;
        opLast = true;
        equalsLast = false;}

    } 
    console.log(opLast);
    console.log(rawMath);
}

function decimalFunc(btn){
    if(((workingString).includes(".")) && (opLast === false)){} //Empty because we're acting on a false result.
    else if((workingString === "0") || (opLast === true)){
        workingString = "0.";
        opLast = false;
    }
    else{
        workingString += (".")
    }
    screenMain.innerText = workingString;
    console.log(opLast);
}

function allClearFunc(){
    workingString = "0";
    topString = "0";
    rawMath = [];
    opLast = true;
    equalsLast = false;
    screenMain.innerText = workingString;
    screenTop.innerText = topString;
}

function posNegFunc(){
    if(workingString.includes("-")){
        let tempString = workingString.slice(1, workingString.length);
        workingString = tempString;
        screenMain.innerText = workingString;       
    } 
    else{
        workingString = "-" + workingString;
        screenMain.innerText = workingString;
    }
}

function backspaceFunc(){    
    if(rawMath.length > 1){
        workingString =  "0";
        screenMain.innerText = workingString;
        rawMath.length -= 2
    };
    topString = rawMath.join("");
    screenTop.innerText = topString
    console.log(rawMath);
}

function equalsFunc(){
    if(equalsLast === false){
        if(rawMath.length !== 0){
            rawMath.push(+workingString);
            topString += workingString;
            screenTop.innerText = topString;
            let resolvingMath = rawMath;
            resolve(resolvingMath, "^", null, power, null);
            resolve(resolvingMath, "x", "/", multiply, divide);
            resolve(resolvingMath, "+", "-", add, subtract);
            answer = resolvingMath[0];
            screenMain.innerText = answer;
            workingString = answer.toString();
            console.log(workingString);
            rawMath = [];
        }
        equalsLast = true;
    }
}
// resolve function Needs to use this "two opUsed, two function" setup to keep times/divide and plus/minus at the same level of priority
function resolve(resolvingMath, opUsedOne, opUsedTwo, funcUsedOne, funcUsedTwo){
    let opIndex = resolvingMath.findIndex(element => (element===opUsedOne)||(element===opUsedTwo));
        if(opIndex !== -1){
            let tempNo;
            if(resolvingMath[opIndex] === opUsedOne){
                tempNo = funcUsedOne(resolvingMath, opIndex)
            }
            else if(resolvingMath[opIndex] === opUsedTwo){
                tempNo = funcUsedTwo(resolvingMath, opIndex)
                }
            resolvingMath.splice(opIndex-1, 3, tempNo);
            console.log(resolvingMath);
            resolve(resolvingMath, opUsedOne, opUsedTwo, funcUsedOne, funcUsedTwo)
        }
    }

function power(resolvingMath, opIndex){
    let tempNo = resolvingMath[opIndex-1] ** resolvingMath[opIndex+1];
    return tempNo;
}

function multiply(resolvingMath, opIndex){
    let tempNo = resolvingMath[opIndex-1] * resolvingMath[opIndex+1];
    return tempNo;
}

function divide(resolvingMath, opIndex){
    let tempNo = resolvingMath[opIndex-1] / resolvingMath[opIndex+1];
    return tempNo;
}

function add(resolvingMath, opIndex){
    let tempNo = resolvingMath[opIndex-1] + resolvingMath[opIndex+1];
    return tempNo;
}

function subtract (resolvingMath, opIndex){
    let tempNo = resolvingMath[opIndex-1] - resolvingMath[opIndex+1];
    return tempNo;
}

console.log(opLast);
console.log(rawMath.length);
























footer.innerHTML = `<a style="color:black; text-decoration:none" href="https://github.com/KHetherington89/calculator">Copyright © ${new Date().getFullYear()} KHetherington89 
<i class="fa fa-github" style="font-size:24p; color:black"></i></a>`;