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

numButtons.forEach(btn => {
    btn.addEventListener("click", => {}
    )
})

opButtons.forEach(btn => {
    btn.addEventListener("click", => {}
    )
})

decimal.addEventListener("click" => {

})

allClear.addEventListener("click" => {
    
})

backspace.addEventListener("click" => {
    
})

equals.addEventListener("click" => {
    
})

posNeg.addEventListener("click" => {
    
})










































footer.innerHTML = `<a style="color:black; text-decoration:none" href="https://github.com/KHetherington89/calculator">Copyright © ${new Date().getFullYear()} KHetherington89 
<i class="fa fa-github" style="font-size:24p; color:black"></i></a>`;