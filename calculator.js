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

screenMain.innerText = "0";
screenTop.innerText = "0";

let workingString = "";
let topString = "";

let rawMath = [];
let noOp = true;
let noNum = false;

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

allClear.addEventListener("click", () => {
    
})

backspace.addEventListener("click", () => {
    
})

equals.addEventListener("click", () => {
    
})

posNeg.addEventListener("click", () => {
    
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
        screenTop.innerText = topString;
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







































footer.innerHTML = `<a style="color:black; text-decoration:none" href="https://github.com/KHetherington89/calculator">Copyright © ${new Date().getFullYear()} KHetherington89 
<i class="fa fa-github" style="font-size:24p; color:black"></i></a>`;