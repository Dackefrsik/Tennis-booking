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
    modalHeaderRef.innerHTML = "";
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
                optionRef.setAttribute("value", court2.time[i]);
                optionRef.innerHTML = court2.time[i];
                selectRef.appendChild(optionRef);
            }

        }
    }
    //Bana 3
    else if(courtNumber == 3){
        for(let i = 0; i < court3.time.length; i++){
            if(court3.time[i] != undefined){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court3.time[i]);
                optionRef.innerHTML = court3.time[i];
                selectRef.appendChild(optionRef);
            }
        }
    }
    //Bana 4
    else if(courtNumber == 4){
        for(let i = 0; i < court4.time.length; i++){
            if(court4.time[i] != undefined){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court4.time[i]);
                optionRef.innerHTML = court4.time[i];
                selectRef.appendChild(optionRef);
            }
        }
    }
    //Bana 5
    else if(courtNumber == 5){
        for(let i = 0; i < court5.time.length; i++){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court5.time[i]);
                optionRef.innerHTML = court5.time[i];
                selectRef.appendChild(optionRef);
        }
    }

    formRef.appendChild(selectRef);

    let inputRef = document.createElement("input");
    inputRef.setAttribute("type", "text");
    inputRef.setAttribute("placeholder", "Name");
    inputRef.classList.add("form-control", "mt-3");
    formRef.appendChild(inputRef);
   
    modalBodyRef.appendChild(formRef);

    let modalFooterRef = document.querySelector(".modal-footer");
  modalFooterRef.removeChild(modalFooterRef.lastChild);




    let confirmButtonRef = document.createElement("button");
    confirmButtonRef.classList.add("btn", "btn-success");
    confirmButtonRef.setAttribute("data-bs-dismiss", "modal");
    confirmButtonRef.setAttribute("type", "button");
    confirmButtonRef.innerHTML = "Book"


    modalFooterRef.appendChild(confirmButtonRef)

    confirmButtonRef.addEventListener("click", () => {
        //Kollar om alla input fälten är ifyllda
        if(selectRef.value != "Select time" && inputRef.value != ""){
            confirmBooking(modalHeaderRef.innerHTML, selectRef.value, inputRef.value);
        }

    })
}

//#endregion

//#region funktion för att genomföra en bokning

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
        court3.time.splice(court3.time.indexOf(time), 1);
    }
    //Bana 4
    else if(Court == "Court 4"){
        court4.time.splice(court4.time.indexOf(time), 1);
    }
    //Bana 5
    else if(Court == "Court 5"){
        court5.time.splice(court5.time.indexOf(time.toString()), 1);
    }

    //Sparar bokningen i en array
    bookings.push(newBooking);


    console.log(bookings);

    loadBookings(newBooking);
}

//#endregion

//#region 

function loadBookings(newBooking){

    let bookingsDivRef = document.querySelector("#bookings");
    bookingsDivRef.innerHTML = "";

    for(let i = 0; i < bookings.length; i++){
        
        let bookingBodyRef = document.createElement("div");
        bookingBodyRef.classList.add("mb-2","ps-3", "pt-2", "pe-3", "border", "rounded", "d-flex", "justify-content-between");

        let bookingsBodyLeftRef = document.createElement("div");
        let bookingsBodyRightRef = document.createElement("div");

        bookingsBodyRightRef.classList.add("align-self-end", "mb-3");
        

        let h3Ref = document.createElement("h3");
        h3Ref.innerHTML = bookings[i].Number;

        let timeRef = document.createElement("h5");
        timeRef.innerHTML = "Time: " + bookings[i].Time;

        let nameRef = document.createElement("p");
        nameRef.innerHTML = "Name: " + bookings[i].Name;

        bookingsBodyLeftRef.appendChild(h3Ref);
        bookingsBodyLeftRef.appendChild(timeRef);
        bookingsBodyLeftRef.appendChild(nameRef);

        let btnRemoveRef = document.createElement("button");
        btnRemoveRef.classList.add("btn", "bg-danger", "text-white");
        btnRemoveRef.setAttribute("type", "button");
        btnRemoveRef.setAttribute("data-bocking-index", bookings.indexOf(newBooking));
        btnRemoveRef.innerHTML = "Boka av";

        btnRemoveRef.addEventListener("click", () => {
            let removeValue = btnRemoveRef.getAttribute("data-booking-index");
            bookings.splice(parseInt(removeValue), 1);
            loadBookings();
        })

        bookingsBodyRightRef.appendChild(btnRemoveRef);

        bookingBodyRef.appendChild(bookingsBodyLeftRef);
        bookingBodyRef.appendChild(bookingsBodyRightRef);   
        
        bookingsDivRef.appendChild(bookingBodyRef);

        
    }


}

//#endregion