const footer = document.getElementById("footer");
const screenTop = document.getElementById("screenTop");
const screenMain = document.getElementById("screenMain");
const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");
const decimal = document.getElementById("decimal");
const allClear = document.getElementById("allClear");
const backspace = document.getElementById("backspace");
const equals = document.getElementById("equals");


let rawMath = [];
let workingString = "0";
let topString = "0"
let opLast = true;

screenMain.innerText = workingString;
screenTop.innerText = topString;

numButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if((workingString === "0") || (opLast === true)){
        workingString = `${btn.dataset.shows}`;
        }
        else{
        workingString += (`${btn.innerText}`);
        } 
        opLast = false;
        screenMain.innerText = "";
        setTimeout(() => screenMain.innerText = workingString, 30);  //Time out just makes the display blink, so that it's obvious a new number has been entered, even if it's the
        console.log(opLast);                                         // same as what is currently being shown. Shows calculator is "doing something".        
    })
})

opButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        if(opLast === false){
            if(workingString.slice(-1) === "."){
                workingString = workingString.slice(0, -1)
            }
            if(topString === "0"){
                topString = workingString
            }
            else{
                topString += workingString
            }
            rawMath.push(workingString);
            rawMath.push(`${btn.dataset.shows}`);
            topString += (`${btn.dataset.shows}`);
            screenTop.innerText = topString;
            opLast = true;
        } 
        console.log(opLast);
        console.log(rawMath);
    })
})

decimal.addEventListener("click", () => {
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
})

allClear.addEventListener("click", () => {
    workingString = "0";
    topString = "0";
    rawMath = [];
    opLast = true;
    screenMain.innerText = workingString;
    screenTop.innerText = topString; 
})

allClear.addEventListener("click", () => {
    workingString = "0";
    topString = "0";
    rawMath = [];
    opLast = true;
    screenMain.innerText = workingString;
    screenTop.innerText = topString; 
})

backspace.addEventListener("click", () => {
    workingString = "0";
    screenMain.textContent = workingString;
    rawMath.length = rawMath.length -1;
    topString = rawMath.join("");
    screenTop.innerText = topString;
    console.log(rawMath);
})

console.log(opLast);
























footer.innerHTML = `<a style="color:black; text-decoration:none" href="https://github.com/KHetherington89/calculator">Copyright © ${new Date().getFullYear()} KHetherington89 
<i class="fa fa-github" style="font-size:24p; color:black"></i></a>`;