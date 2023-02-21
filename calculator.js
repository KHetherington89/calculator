const footer = document.getElementById("footer");
const screenTop = document.getElementById("screenTop");
const screenMain = document.getElementById("screenMain");
const numButtons = document.querySelectorAll(".numButton")


numButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        screenMain.innerText === "0" ?
        screenMain.innerText = `${btn.innerText}` :
        screenMain.append(`${btn.innerText}`);
    })
})

console.log(numButtons);

























footer.innerHTML = `<a style="color:black; text-decoration:none" href="https://github.com/KHetherington89/calculator">Copyright © ${new Date().getFullYear()} KHetherington89 
<i class="fa fa-github" style="font-size:24p; color:black"></i></a>`;