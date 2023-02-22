const footer = document.getElementById("footer");
const screenUpper = document.getElementById("screenUpper");
const screenMain = document.getElementById("screenMain");
const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const decimal = document.getElementById("decimal");
const allClear = document.getElementById("allClear");
const backspace = document.getElementById("backspace");
const equals = document.getElementById("equals");
const posNeg = document.getElementById("posNeg");

screenMain.innerText = "0";
screenUpper.innerText = "0";

let workingString = "";
let topString = "";

let rawMath = [];
let noOp = true;
let noNum = false;
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
    
})

equals.addEventListener("click", () => {
    
})


////////////////////////////////////////////////////////////////////////////////

function numButtonFunc(btn){
    if(noNum === false){
        workingString += `${btn.dataset.shows}`; 
        screenMain.innerText = workingString;
        noOp = false;
        console.log(workingString);
    }
}

function opButtonFunc(btn){
    if(noOp === false){
        topString += `${workingString + btn.dataset.shows}`;
        screenUpper.innerText = topString;
        rawMath.push(+workingString);
        rawMath.push(btn.dataset.shows);
        workingString = "";
        noOp = true;
        console.log(rawMath);
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

function allClear(){
    workingString = "";
    topString = "";
    rawMath = [];
    screenMain.innerText = "0";
    screenUpper.innerText = "0";
    answer = null;
}




































footer.innerHTML = `<a style="color:black; text-decoration:none" href="https://github.com/KHetherington89/calculator">Copyright © ${new Date().getFullYear()} KHetherington89 
<i class="fa fa-github" style="font-size:24p; color:black"></i></a>`;