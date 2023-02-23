const footer = document.getElementById("footer");
const screenUpper = document.getElementById("screenUpper");
const screenMain = document.getElementById("screenMain");
const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const decimal = document.getElementById("decimal");
const posNeg = document.getElementById("posNeg");
const allClear = document.getElementById("allClear");
const backspace = document.getElementById("backspace");
const equals = document.getElementById("equals");

screenMain.innerText = "0";
screenUpper.innerText = "0";
let screenLimit = 12;

let workingString = "";
let topString = "";

let rawMath = [];
let noOp = true;
let noNum = false;
let noEquals = true;
let answer = null;

numButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        numButtonFunc(btn);
    })
})

opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        opButtonFunc(btn);
    })
})

decimal.addEventListener("click", () => {
    decimalFunc();
})

posNeg.addEventListener("click", () => {
    posNegFunc();    
})

allClear.addEventListener("click", () => {
    allClearFunc();
})

backspace.addEventListener("click", () => {
    backspaceFunc();
})

equals.addEventListener("click", () => {
    equalsFunc();
})

////////////////////////////////////////////////////////////////////////////////

function numButtonFunc(btn){
    if(noNum === false){
        if(workingString === "0"){
            workingString = `${btn.dataset.shows}`;
        }
        else if(workingString.length < screenLimit){            
            workingString += `${btn.dataset.shows}`;
        } 
        screenMain.innerText = workingString;
        noOp = false;
        noEquals = false;
        console.log(workingString);
        console.log(`noNum = ${noNum}`)
        console.log(`noOp = ${noOp}`)
        console.log(`noEquals = ${noEquals}`)
        }
}

function opButtonFunc(btn){
    if(noOp === false){
        if(maxLengthCheck()){
            if(divZeroCheck()){ //Nested because running them together could cause 2 error messages to try to appear at once.       
                topString += `${workingString + btn.dataset.shows}`;
                screenUpper.innerText = topString;
                rawMath.push(+workingString);
                rawMath.push(btn.dataset.shows);
                workingString = "";
                noOp = true;
                noEquals = true;
                noNum = false;
                console.log(rawMath);
                console.log(`noNum = ${noNum}`)
                console.log(`noOp = ${noOp}`)
                console.log(`noEquals = ${noEquals}`)
            }
        }
    }
}

function decimalFunc(){
    if((noNum === false) && (!workingString.includes("."))){
        workingString === "" ? workingString = "0." :
                                workingString += ".";
        screenMain.innerText = workingString;
    }
}

function posNegFunc(){
    if(noNum === false){
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
}

function allClearFunc(){
    workingString = "";
    topString = "";
    rawMath = [];
    screenMain.innerText = "0";
    screenUpper.innerText = "0";
    answer = null;
    noEquals = true;
    noOp = true;
    noNum = false;
    console.log(`noNum = ${noNum}`)
    console.log(`noOp = ${noOp}`)
    console.log(`noEquals = ${noEquals}`)
}

function backspaceFunc(){
    if(workingString !== ""){
        workingString = "";
        screenMain.innerText = "0";
        if(topString === ""){
            screenUpper.innerText = "0";
        }
        noOp = true;
        noEquals = true;
        noNum = false;
    }
    else{
        if(rawMath.length > 0){
            workingString =  "";
            screenMain.innerText = "0";
            rawMath.length -= 2;
            topString = rawMath.join("");
            if(topString === ""){
                screenUpper.innerText = "0"}
            else{
                screenUpper.innerText = topString;
            }
            console.log(topString)
            console.log(rawMath);

        };
    }
    console.log(`noNum = ${noNum}`)
    console.log(`noOp = ${noOp}`)
    console.log(`noEquals = ${noEquals}`)
}

function equalsFunc(){
    if((noEquals === false) && (rawMath.length !== 0)){
        if(divZeroCheck()){
            rawMath.push(+workingString);
            topString += workingString;
            screenUpper.innerText = topString;
            let resolvingMath = rawMath;
            resolve(resolvingMath, "^", null, power, null);
            resolve(resolvingMath, "x", "/", multiply, divide);
            resolve(resolvingMath, "+", "-", add, subtract);
            answer = resolvingMath[0];
            screenMain.innerText = answer.toString().slice(0, screenLimit);
            workingString = answer.toString();
            topString = "";
            console.log(workingString);
            console.log(answer);
            rawMath = [];
            resolvingMath = [];
            noEquals= true;
            noNum = true;
            console.log(`noNum = ${noNum}`)
            console.log(`noOp = ${noOp}`)
            console.log(`noEquals = ${noEquals}`)
            console.log(rawMath);
        }
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

function divZeroCheck(){
    if((workingString === "0") && (rawMath[rawMath.length -1] === "/")){
        screenMain.innerText = "No Div By 0!";
        return false;
    }
    else{
        return true;
    }
}

function maxLengthCheck(){
    if(rawMath.length >= 40){
        screenMain.innerText = "I'm full. Num & = ";
        return false;
    }
    else{
        return true;
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


































footer.innerHTML = `<a style="color:black; text-decoration:none" href="https://github.com/KHetherington89/calculator">Copyright © ${new Date().getFullYear()} KHetherington89 
<i class="fa fa-github" style="font-size:24p; color:black"></i></a>`;