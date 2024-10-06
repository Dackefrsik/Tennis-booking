"use strict";

//#region attribut för court 1
let court1 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
}

//#endregion

//#region attribut för court 2
let court2 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
}

//#endregion

//#region attribut för court 3 
let court3 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
}

//#endregion

//#region attribut för court 4
let court4 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
}

//#endregion

//#region attribut för court 5
let court5 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]
}

//#endregion

//#region window load
window.addEventListener("load", () => {
    
    let imgRef = document.querySelectorAll("img[alt^='Court']");

    courtFokus(imgRef);
});
//#endregion

//#region Obejkt för varje bokning

function booking(number, time, name){

    return{
        Number : number,
        Time : time,
        Name : name
    }
    
}

let bookings = [];

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

//#region funktion som skapar en modalbody

function createModalBoydy(img, i){

    //Hämtar ut headern och skriver ut vilken bana som man kollar tider för
    let modalHeaderRef = document.querySelector(".modal-title");
    let courtNumber = img.getAttribute("data-court-number");
    modalHeaderRef.innerHTML = "Court " + courtNumber;

    //Hämtar ut kroppen så det kan byggas upp lite innehåll
    let modalBodyRef = document.querySelector(".modal-body");
    modalBodyRef.innerHTML = "";
    let formRef = document.createElement("form");
    formRef.classList.add("form-group");

    //Skapar en select option som kan visa de tider som finns lediga
    let selectRef = document.createElement("select");
    selectRef.classList.add("form-select");
    let optionRef = document.createElement("option");
    optionRef.setAttribute("selected", true);
    optionRef.setAttribute("disabled", true);
    optionRef.innerHTML = "Select time";
    selectRef.appendChild(optionRef);

    //Skriver ut tiderna beroende på vilken banan som användaren har klickat på
    //Bana 1
    if(courtNumber == 1){
        for(let i = 0; i < court1.time.length; i++){
            if(court1.time[i] != undefined){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court1.time[i]);
                optionRef.innerHTML = court1.time[i];
                selectRef.appendChild(optionRef);
            }
            
        }
    }
    //Bana 2
    else if(courtNumber == 2){
        for(let i = 0; i < court2.time.length; i++){
            if(court2.time[i] != undefined){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court1.time[i]);
                optionRef.innerHTML = court1.time[i];
                selectRef.appendChild(optionRef);
            }

        }
    }
    //Bana 3
    else if(courtNumber == 3){
        for(let i = 0; i < court3.time.length; i++){
            if(court3.time[i] != undefined){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court1.time[i]);
                optionRef.innerHTML = court1.time[i];
                selectRef.appendChild(optionRef);
            }
        }
    }
    //Bana 4
    else if(courtNumber == 4){
        for(let i = 0; i < court4.time.length; i++){
            if(court4.time[i] != undefined){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court1.time[i]);
                optionRef.innerHTML = court1.time[i];
                selectRef.appendChild(optionRef);
            }
        }
    }
    //Bana 5
    else if(courtNumber == 5){
        for(let i = 0; i < court5.time.length; i++){
            if(court5.time[i] != undefined){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court1.time[i]);
                optionRef.innerHTML = court1.time[i];
                selectRef.appendChild(optionRef);
            }
        }
    }

    formRef.appendChild(selectRef);

    let inputRef = document.createElement("input");
    inputRef.setAttribute("type", "text");
    inputRef.setAttribute("placeholder", "Name");
    inputRef.classList.add("form-control", "mt-3");
    formRef.appendChild(inputRef);
   
    modalBodyRef.appendChild(formRef);

    let confermBookingRef = document.querySelector("#confirmBooking");

    //Knappen som genomför en bokning 
    confermBookingRef.addEventListener("click", () => {
        
        //Kollar om alla input fälten är ifyllda
        if(selectRef.value != "Select time" && inputRef.value != ""){
            confirmBooking(modalHeaderRef.innerHTML, selectRef.value, inputRef.value);
        }

    })
}

//#endregion

//#region 

function confirmBooking(Court, time, name){

    //Lägger en bokning 
    let newBooking = new booking(Court, time, name);

    //Kollar vilken bana som tiden har bokats på och tar bort den
    //Bana 1
    if(Court == "Court 1"){
        court1.time.splice(court1.time.indexOf(time), 1);
    }
    //Bana 2
    else if(Court == "Court 2"){
        court2.time.splice(court2.time.indexOf(time), 1);
    }
    //Bana 3
    else if(Court == "Court 3"){
        court3.time.splice(court3.time.indexOf(time), 1 );
    }
    //Bana 4
    else if(Court == "Court 4"){
        court4.time.splice(court4.time.indexOf(time), 1);
    }
    //Bana 5
    else if(Court == "Court 5"){
        court5.time.splice(court5.time.indexOf(time), 1);
    }

    //Sparar bokningen i en array
    bookings.push(newBooking);
}

//#endregion