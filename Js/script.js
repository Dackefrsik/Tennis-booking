"use strict";

//#region 
let court1 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
}

//#endregion


//#region window load
window.addEventListener("load", () => {
    
    let imgRef = document.querySelectorAll("img[alt^='Court']");

    courtFokus(imgRef);


});
//#endregion


//#region funktion för att fokusera på en bana
function courtFokus(imgRef){

    for(let i = 0; i < imgRef.length; i++){
        imgRef[i].addEventListener("mouseover", () =>{
            imgRef[i].style.scale = "1.05";
        });

        imgRef[i].addEventListener("mouseout", () => {
            imgRef[i].style.scale = "1";
        })

        imgRef[i].addEventListener("click", () =>{
            createModalBoydy(imgRef[i], i)
        })

    }

}
//#endregion

//#region 

function createModalBoydy(img, i){

    let modalHeaderRef = document.querySelector(".modal-title");
    let courtNumber = img.getAttribute("data-court-number");
    modalHeaderRef.innerHTML = "Court " + courtNumber;

    let modalBodyRef = document.querySelector(".modal-body");
    let formRef = document.createElement("form");
    formRef.classList.add("form-group");

    let selectRef = document.createElement("select");
    selectRef.classList.add("form-select");
    let optionRef = document.createElement("option");
    optionRef.setAttribute("selected", true);
    optionRef.setAttribute("disabled", true);
    optionRef.innerHTML = "Select time";
    selectRef.appendChild(optionRef);

    for(let i = 0; i < court1.time.length; i++){
        let optionRef = document.createElement("option");
        optionRef.setAttribute("value", court1.time[i]);
        optionRef.innerHTML = court1.time[i];
        selectRef.appendChild(optionRef);
    }

    formRef.appendChild(selectRef);

    modalBodyRef.appendChild(formRef);


    
}

//#endregion