"use strict";

//#region attribut för banor och dagar

let court1Days = [];
let court2Days = [];
let court3Days = [];
let court4Days = [];
let court5Days = [];

class day{

    constructor(date, time){
        this.date = date,
        this.time = time
    }
}

//#endregion

//#region Obejkt för varje bokning

class booking{

    constructor(bkNumber, number, date, time, name){
        this.bkNumber = bkNumber,
        this.Number = number,
        this.Date = date,
        this.Time = time,
        this.Name = name
    }
    
}

let bookings = [];

//#endregion

//#region timer objekt

function upTimer(hour, min, second){

    second ++;
    if(second == 60){
        second = 0;
        min ++;
    }
    else if(min == 60){
        min = 0;
        hour ++;
    }
    else if(hour == 24){
        hour = 0;
    }

    return oGlobalObject.hour = hour, oGlobalObject.min = min, oGlobalObject.second = second; 
}

//#endregion

//#region globaltobject för att hålla koll på vald bana när det modalen ska uppdateras

window.oGlobalObjectCourt = {
    clickedCourt : null
}

//#endregion

//#region window load
window.addEventListener("load", () => {

    window.oGlobalObject = {
        timer : null,
        hour : new Date().getHours(),
        min : new Date().getMinutes(),
        second : new Date().getSeconds()
    }
    
    oGlobalObject.timer = setInterval(() => {
        
        upTimer(oGlobalObject.hour, oGlobalObject.min, oGlobalObject.second)
        
    } , 1000)
    
    let imgRef = document.querySelectorAll("img[alt^='Court']");

    courtFokus(imgRef);

    let activeButtonRef = document.querySelector("#active");
    activeButtonRef.addEventListener("click", () => {
        
    });

    let days = new Date();

    //Lägger till dagar med tider för varje bana 
    setTimeForDays(court1Days, days);
    setTimeForDays(court2Days, days);
    setTimeForDays(court3Days, days);
    setTimeForDays(court4Days, days);
    setTimeForDays(court5Days, days);

    for(let i = 0; i < court1Days[0].time.length; i++){
        let saveHour = court1Days[0].time[i].split(":");
        console.log(saveHour)
        console.log(oGlobalObject.hour + ":00");
        if(parseInt(saveHour[0]) < parseInt(oGlobalObject.hour)){
            console.log("y")
            court1Days[0].time[i] = undefined;
            court2Days[0].time[i] = undefined;
            court3Days[0].time[i] = undefined;
            court4Days[0].time[i] = undefined;
            court5Days[0].time[i] = undefined;
        }
    }

    let searchRef = document.querySelector("#search");

    searchRef.addEventListener("input", () => {

        searchResault(searchRef.value);

    });

    let activeBtnRef = document.querySelector("#active");

    activeBtnRef.addEventListener("click", () => {
        let activeRef = document.querySelector(".active");
        activeRef.innerHTML = "";
        const newDate = new Date(days);

        bookings.forEach(booking => {
            let hour = booking.Time.split(":");

            if(hour[0] == newDate.getHours()){
                //skapar upp en div som visar bokningen
                let bookingBodyRef = document.createElement("div");
                bookingBodyRef.classList.add("mb-2","ps-3", "pt-2", "pe-3", "border", "rounded", "d-flex", "flex-column");
                bookingBodyRef.setAttribute("booking-number", booking.bkNumber);

                //Skapar en h3:a för att visa vilken bana bokningen är gjord på
                let h3Ref = document.createElement("h3");
                h3Ref.innerHTML = booking.Number;
                bookingBodyRef.appendChild(h3Ref);

                //Skriver ut ett namn så att vi vet vem som gjort bokningen
                let nameRef = document.createElement("p");
                nameRef.innerHTML = "Name: " + booking.Name;
                bookingBodyRef.appendChild(nameRef);

                activeRef.appendChild(bookingBodyRef);
            }
            
        });

    });

    let bookingButtonRef = document.querySelector("#booking");
    bookingButtonRef.addEventListener("click", () => {
        createModalBoydy();
    });
    
    console.log("Funktion ", getBookings());
    getBookings().then(currentBookings => {
        console.log("Current bookings:", currentBookings);

        if (Array.isArray(currentBookings)) {
            currentBookings.forEach(booking => {
                // Gör något med varje bokning, exempelvis anropa confirmBooking
                console.log("datum", booking.Date);
                console.log("ID", booking.ID);
                confirmBooking("Load", booking.bkNumber, booking.Court, booking.Date.split("T")[0], booking.Time, booking.Name);
                console.log("Antal bokningar: ", bookings.length);

            });
        } else {
            console.log("Error: Received data is not in expected format.");
        }
    });


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
            oGlobalObjectCourt.clickedCourt = imgRef[i];
            createModalBoydy(imgRef[i])
        })

    }

}
//#endregion

//#region funktion som skapar en modalbody

function createModalBoydy(img){

    //Hämtar ut headern och skriver ut vilken bana som man kollar tider för
    let modalHeaderRef = document.querySelector(".modal-title");
    modalHeaderRef.innerHTML = "";
    //Hämtar ut kroppen så det kan byggas upp lite innehåll
    let modalBodyRef = document.querySelector(".modal-body");
    modalBodyRef.innerHTML = "";
    let formRef = document.createElement("form");
    formRef.classList.add("form-group");
    let selectCourtRef = document.createElement("select");

    let courtNumber = "";
    let selectCourtRefValue = "";
    let lableRef = document.createElement("lable");

    if(img != null){
        courtNumber = img.getAttribute("data-court-number");
        modalHeaderRef.innerHTML = "Court " + courtNumber;
    }
    else{
        lableRef.innerHTML = "*";
        lableRef.classList.add("text-danger");

        formRef.appendChild(lableRef);

        modalHeaderRef.innerHTML = "Booking";
        selectCourtRef.classList.add("form-control", "mb-1", "errorCourt")

        let optionRef = document.createElement("option");
        optionRef.innerHTML = "Select court";
        optionRef.setAttribute("selected", true);
        optionRef.setAttribute("disabled", true);
        selectCourtRef.appendChild(optionRef);

        for(let i = 0; i < 5; i++){
            let optionRef = document.createElement("option");
            optionRef.setAttribute("value", (i + 1));
            optionRef.innerHTML = "Court " + (i + 1);
            selectCourtRef.appendChild(optionRef);
        }

        formRef.appendChild(selectCourtRef);

        selectCourtRef.addEventListener("change", () => {
            console.log(selectCourtRef.value);
            courtNumber = selectCourtRef.value;
    
            oGlobalObjectCourt.clickedCourt = courtNumber;
            selectRef.innerHTML = "";
            console.log("Clicked " + oGlobalObjectCourt.clickedCourt)
            time(courtNumber, selectRef, splitDate);
        }) 

        selectCourtRefValue = selectCourtRef.value;
    }

    let dateRef = document.createElement("input");
    dateRef.setAttribute("type", "date");
    dateRef.classList.add("form-control", "mb-1");
    let d = new Date();

    //String().padStart(2,"0") ser till att det alltid finns två bokstäver och gör det inte det så lägger den till en nolla i början
    let date = "";

    //Räknar ut vilken dag som ska visas utifrån klockslag nuvarande dag
    if(d.getHours > 22){
        date = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0') + "-" + String(d.getDate() + 1).padStart(2,'0');
    }
    else{
        date = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2,'0');
    }

    dateRef.value = date;
    console.log(dateRef.value);
    console.log(dateRef.value);
    formRef.appendChild(dateRef);

    let labelSelectRef = document.createElement("lable");
    labelSelectRef.setAttribute("for", "select");
    labelSelectRef.classList.add("text-danger");
    labelSelectRef.innerHTML = "*";
    formRef.appendChild(labelSelectRef);

    //Skapar en select option som kan visa de tider som finns lediga
    let selectRef = document.createElement("select");
    selectRef.classList.add("form-select");
    selectRef.setAttribute("id", "slect");
    let optionRef = document.createElement("option");
    optionRef.setAttribute("selected", true);
    optionRef.setAttribute("disabled", true);
    optionRef.innerHTML = "Select time";
    selectRef.appendChild(optionRef);

    //Skriver ut tiderna beroende på vilken banan som användaren har klickat på

    //Sorterar vektorerna så tiderna kommer i rätt ordning
    for(let i = 0; i < court1Days.length; i++){
        court1Days[i].time.sort();
        court2Days[i].time.sort();
        court3Days[i].time.sort();
        court4Days[i].time.sort();
        court5Days[i].time.sort();
    }

    let splitDate = dateRef.value.split("-");
    console.log(courtNumber);

    formRef.appendChild(selectRef);

    let labelNameRef = document.createElement("lable");
    labelNameRef.setAttribute("for", "name");
    labelNameRef.classList.add("text-danger");
    labelNameRef.innerHTML = "*";
    formRef.appendChild(labelNameRef);

    //Skapar ett input fällt för namn
    let inputRef = document.createElement("input");
    inputRef.setAttribute("id", "name");
    inputRef.setAttribute("type", "text");
    inputRef.setAttribute("placeholder", "Name");
    inputRef.classList.add("form-control", "mt-2");
    formRef.appendChild(inputRef);

    //Lägger till fomuläret i modalens kropp 
    modalBodyRef.appendChild(formRef);

    //Hämtar modalens footer och tar bort det sissta elementet
    //Tidigare skapad knapp
    let modalFooterRef = document.querySelector(".modal-footer");
    modalFooterRef.removeChild(modalFooterRef.lastChild);

    //Skapar en knapp som genomför bokningar
    let confirmButtonRef = document.createElement("button");
    confirmButtonRef.classList.add("btn", "bookButton");
    confirmButtonRef.setAttribute("type", "button");
    confirmButtonRef.innerHTML = "Book";
    modalFooterRef.appendChild(confirmButtonRef);

    time(courtNumber, selectRef, splitDate);

    if(modalHeaderRef.innerHTML !== "Booking"){
        controleTime(confirmButtonRef, dateRef, selectRef, inputRef, modalHeaderRef, labelSelectRef, labelNameRef);
    }
    else{
        controleTime(confirmButtonRef, dateRef, selectRef, inputRef, selectCourtRefValue, labelSelectRef, labelNameRef, lableRef);
    }  
}

//#endregion

//#region funktion för att genomföra en bokning

function confirmBooking(evt, bkNumber, Court, date, time, name ){

    //Lägger en bokning 
    let newBooking = new booking(bkNumber, Court, date, time, name);

    let dayNumber = date.split("-");

    console.log(dayNumber);

    //Kollar vilken bana som tiden har bokats på och tar bort den
    //Bana 1
    if(Court == "Court 1"){
        for(let i = 0; i < court1Days.length; i++){
            if(dayNumber[2] == court1Days[i].date){
                court1Days[i].time.splice(court1Days[i].time.indexOf(time), 1);
            }
        }
    }
    //Bana 2
    else if(Court == "Court 2"){
        for(let i = 0; i < court2Days.length; i++){
            if(dayNumber[2] == court2Days[i].date){
                court2Days[i].time.splice(court2Days[i].time.indexOf(time), 1);
            }
        }
    }
    //Bana 3
    else if(Court == "Court 3"){
        for(let i = 0; i < court3Days.length; i++){
            if(dayNumber[2] == court3Days[i].date){
                court3Days[i].time.splice(court3Days[i].time.indexOf(time), 1);
            }
        }
    }
    //Bana 4
    else if(Court == "Court 4"){
        for(let i = 0; i < court4Days.length; i++){
            if(dayNumber[2] == court4Days[i].date){
                court4Days[i].time.splice(court4Days[i].time.indexOf(time), 1);
            }
        }
    }
    //Bana 5
    else if(Court == "Court 5"){
        for(let i = 0; i < court5Days.length; i++){
            if(dayNumber[2] == court5Days[i].date){
                court5Days[i].time.splice(court5Days[i].time.indexOf(time), 1);
            }
        }
    }

    //Sparar bokningen i en array
    bookings.push(newBooking);

    console.log(bookings);

    loadBookings();
    if(evt != "Load"){
        sendData();
    }
}

//#endregion

//#region laddar alla bokningar

function loadBookings(){

    //Hämtar ut DIV:n som visar alla bokninger
    //Tömmer den för att inte visa dubletter
    let bookingsDivRef = document.querySelector("#bookings");
    bookingsDivRef.innerHTML = "";

    //let playDivs = document.querySelectorAll("[class^='Play']");
 
    //Loopar igenom alla bokningar
    for(let i = 0; i < bookings.length; i++){
        
        //skapar upp en div som visar bokningen
        let bookingBodyRef = document.createElement("div");
        bookingBodyRef.classList.add("mb-2","ps-3", "pt-2", "pe-3", "border", "rounded", "d-flex", "justify-content-between");
        bookingBodyRef.setAttribute("booking-number", bookings[i].bkNumber);

        //Skapar upp en div för högra och vänstra halvan
        let bookingsBodyLeftRef = document.createElement("div");
        bookingsBodyLeftRef.classList.add("align-self-end", "mb-3");
        let bookingsBodyRightRef = document.createElement("div");

        //Skapar en h3:a för att visa vilken bana bokningen är gjord på
        let h3Ref = document.createElement("h3");
        h3Ref.innerHTML = bookings[i].Number;
        bookingsBodyLeftRef.appendChild(h3Ref);

        //Skapar en h5:a för att visa vilken tid bokningen avse
        let timeRef = document.createElement("h5");
        timeRef.innerHTML = "Time: " + bookings[i].Time;
        bookingsBodyLeftRef.appendChild(timeRef);

        //Skapar en h6:a för datum
        let dateRef = document.createElement("h6");
        dateRef.innerHTML = "Date: " + bookings[i].Date;
        bookingsBodyLeftRef.appendChild(dateRef);

        //Skriver ut ett namn så att vi vet vem som gjort bokningen
        let nameRef = document.createElement("p");
        nameRef.innerHTML = "Name: " + bookings[i].Name;
        bookingsBodyLeftRef.appendChild(nameRef);

        //Skapar en knapp som tar bort bokningen 
        let btnRemoveRef = document.createElement("button");
        btnRemoveRef.classList.add("btn", "removeBooking", "text-white");
        btnRemoveRef.setAttribute("type", "button");
        btnRemoveRef.setAttribute("data-bocking-index", bookings.indexOf(bookings[i]));
        btnRemoveRef.innerHTML = "Boka av";

        //Lägger till en klicklyssnare på knappen
        btnRemoveRef.addEventListener("click", () => {

            //Hämtar tid och bana från nya bokningen 
            let timeRef = bookings[i].Time;
            let courtRef = bookings[i].Number;
            let dateRef = bookings[i].Date.split("-");

            console.log(dateRef);

            //Kollar vilkne bana som bokningen gäller och lägger till den i dess vektor
            //Bana 1
            if(courtRef == "Court 1"){
                for(let i = 0; i < court1Days.length; i++){
                    if(court1Days[i].date == dateRef[2]){
                        court1Days[i].time.push(timeRef);

                    }
                }
            }
            //Bana 2
            else if(courtRef == "Court 2"){
                for(let i = 0; i < court2Days.length; i++){
                    if(court2Days[i].date == dateRef[2]){
                        court2Days[i].time.push(timeRef);

                    }
                }
            }
            //Bana 3
            else if(courtRef == "Court 3"){
                for(let i = 0; i < court3Days.length; i++){
                    if(court3Days[i].date == dateRef[2]){
                        court3Days[i].time.push(timeRef);

                    }
                }
            }
            //Bana 4
            else if(courtRef == "Court 4"){
                for(let i = 0; i < court4Days.length; i++){
                    if(court4Days[i].date == dateRef[2]){
                        court4Days[i].time.push(timeRef);

                    }
                }
            }
            //Bana 5
            else if(courtRef == "Court 5"){
                for(let i = 0; i < court5Days.length; i++){
                    if(court5Days[i].date == dateRef[2]){
                        court5Days[i].time.push(timeRef);

                    }
                }
            }
 
            //Tar bort bokningen från listan med aktiva bokningar ifall man behöver avbryta sin tid            

            //Tar bort bokning ifrån vetorn med bokningar
            let removeValue = btnRemoveRef.getAttribute("data-booking-index");
            let removeID = bookingBodyRef.getAttribute("booking-number");
            bookings.splice(parseInt(removeValue), 1);
            console.log("Remove ", removeValue);
            removeBooking(removeID);
            loadBookings();
        })

        let date = new Date();

        //Lägger till knappen i den vänstra divn
        bookingsBodyRightRef.appendChild(btnRemoveRef);

        //Lägger till den högra och vänstra div:n
        bookingBodyRef.appendChild(bookingsBodyLeftRef);
        bookingBodyRef.appendChild(bookingsBodyRightRef);   
        
        //Lägger till div:n med bokningen i den stora div:n
        bookingsDivRef.appendChild(bookingBodyRef);
   
    }
}
//#endregion

//#region funktionallitet till modal

function controleTime(button, dateRef, selectRef, inputRef, modalHeaderRef, labelSelectRef, labelNameRef, lableRef){

    let dateChangeRef = document.querySelector("[type='date']");
    let formSelectRef = document.querySelector(".form-select");

    //kollar om användaren har bytt datum
    dateChangeRef.addEventListener("change", () => {

        console.log("change");
        
        //Kollar så att sissta värdet matchar med någon dag i banans atribut med objekt för dagar
        let changeDate = dateChangeRef.value;
        let splitDate = changeDate.split("-");

        formSelectRef.innerHTML = "";

        selectRef.innerHTML = "";
        //Påbörjar våran select option 
        let optionRef = document.createElement("option");
        optionRef.setAttribute("selected", true);
        optionRef.setAttribute("disabled", true);
        optionRef.innerHTML = "Select time";
        formSelectRef.appendChild(optionRef);

        let courtNumber  = "";
        if(oGlobalObjectCourt.clickedCourt instanceof HTMLElement){
            courtNumber  = oGlobalObjectCourt.clickedCourt.getAttribute("data-court-number");
        }
        else{
            courtNumber = oGlobalObjectCourt.clickedCourt;
        }

        time(courtNumber, selectRef, splitDate);
    });  

    //Boolean för bookningsprocessen
    let bookingProgress = true;

    //Knappen som genomför en bokning
    button.addEventListener("click", () => {
        
        //Tar ut och nollar felmedelandet för time
        let timePRef = document.querySelector(".time");
        if(timePRef != null){
            labelSelectRef.classList.remove("time");
            labelSelectRef.innerHTML = "*";
        }

        //Ta bort felmedelandet för court 
        let selectCourtRef = document.querySelector(".errorCourt");
        if(selectCourtRef != null &&selectCourtRef.value != "Select court"){
            lableRef.innerHTML = "*";
        }

        //Felmedelande för court
        if(selectCourtRef != null && selectCourtRef.value == "Select court"){
            lableRef.innerHTML = "* Select court!";
        }
        //Felmedelande för time
        else if(selectRef.value == "Select time"){
           
            labelSelectRef.innerHTML = "* Select time!";
            labelSelectRef.classList.add("time");
        }
        //Felmedelande för namn
        else if(inputRef.value == ""){
            labelNameRef.innerHTML = "* Write your name!";
        }
        //Kollar om vi kan fortsätta och skapa objektet för bokningen
        else if(bookingProgress){
            
            //Sätter kontrollen till False så det inte skapas två objekt
            bookingProgress = false;

            console.log("bokning: ", bookings.bkNumber);

            //Kollar om användaren valt bana genom att klicka på en bana eller att välja i select/ option 
            if(modalHeaderRef == "Select court"){
                if(bookings.length == 0){
                    confirmBooking("", bookings.length  + 1, "Court " + oGlobalObjectCourt.clickedCourt, dateRef.value,  selectRef.value, inputRef.value);

                }
                else {
                    confirmBooking("", bookings[bookings.length - 1].bkNumber + 1, "Court " + oGlobalObjectCourt.clickedCourt, dateRef.value,  selectRef.value, inputRef.value);
                }
            }
            else if(modalHeaderRef != "Booking"){

                if(bookings.length == 0){
                    confirmBooking("", bookings.length  + 1,  modalHeaderRef.innerHTML, dateRef.value,  selectRef.value, inputRef.value);

                }
                else {
                    confirmBooking("", bookings[bookings.length - 1].bkNumber + 1, modalHeaderRef.innerHTML, dateRef.value,  selectRef.value, inputRef.value);
                }
            }

            button.setAttribute("data-bs-dismiss", "modal");
            button.click();
        }
    });
}

//#endregion

//#region Sök filtrering
function searchResault(searchInput){

    bookings.forEach((booking) => {
        let bookingNumberRef = document.querySelector('[booking-number="'+ booking.bkNumber + '"]');

        //Kollar om det som står i sökrutan matchar något i bookningen och trar bort d-none
        if(searchInput == "" || (searchInput != "" && (booking.Number.includes(searchInput) || booking.Time.includes(searchInput) || booking.Name.includes(searchInput) || booking.Date.includes(searchInput)))){
            bookingNumberRef.classList.remove("d-none");
        }
        //Annars gömmer den bokningen genom d-none
        else{
            bookingNumberRef.classList.add("d-none");
        }

    })
}

//#endregion

//#region laddar lediga tider per dag

function time(courtNumber, selectRef, splitDate){

    //Bana 1
    if(courtNumber == 1){
        //Går igenom alla tiderna
        for(let i = 0; i < court1Days.length; i++){

            if(splitDate[2] == court1Days[i].date){
                for(let j = 0; j < court1Days[i].time.length; j ++){
                    if(court1Days[i].time[j] != undefined){
                        console.log(2);
                        let optionRef = document.createElement("option");
                        optionRef.setAttribute("value", court1Days[i].time[j]);
                        optionRef.innerHTML = court1Days[i].time[j];
                        selectRef.appendChild(optionRef);
                    }
                }
            }
        }
    }
    //Bana 2
    else if(courtNumber == 2){
        for(let i = 0; i < court2Days.length; i++){
            if(splitDate[2] == court2Days[i].date){

                for(let j = 0; j < court2Days[i].time.length; j ++){        

                    //Kollar om tiden ska gå att boka
                    if(court2Days[i].time[j] != undefined ){
                        let optionRef = document.createElement("option");
                        optionRef.setAttribute("value", court2Days[i].time[j]);
                        optionRef.innerHTML = court2Days[i].time[j];
                        selectRef.appendChild(optionRef);
                    } 
                    
                }
            }
        }
    }
    //Bana 3
    else if(courtNumber == 3){
        for(let i = 0; i < court3Days.length; i++){
            if(splitDate[2] == court3Days[i].date){

                for(let j = 0; j < court3Days[i].time.length; j ++){
                
                    //Kollar om tiden ska gå att boka
                    if(court3Days[i].time[j] != undefined){
                        let optionRef = document.createElement("option");
                        optionRef.setAttribute("value", court3Days[i].time[j]);
                        optionRef.innerHTML = court3Days[i].time[j];
                        selectRef.appendChild(optionRef);
                    } 
                    
                }
            }
        }
    }
    //Bana 4
    else if(courtNumber == 4){
        for(let i = 0; i < court4Days.length; i++){
            if(splitDate[2] == court4Days[i].date){

                for(let j = 0; j < court4Days[i].time.length; j ++){
                    
                    //Kollar om tiden ska gå att boka
                    if(court4Days[i].time[j] != undefined){
                        let optionRef = document.createElement("option");
                        optionRef.setAttribute("value", court4Days[i].time[j]);
                        optionRef.innerHTML = court4Days[i].time[j];
                        selectRef.appendChild(optionRef);
                    } 
                }
            }
        }
    }
    //Bana 5
    else if(courtNumber == 5){
        for(let i = 0; i < court1Days.length; i++){
            if(splitDate[2] == court5Days[i].date){

                for(let j = 0; j < court5Days[i].time.length; j ++){

                    //Kollar om tiden ska gå att boka
                    if(court5Days[i].time[j] != undefined ){
                        let optionRef = document.createElement("option");
                        optionRef.setAttribute("value", court5Days[i].time[j]);
                        optionRef.innerHTML = court5Days[i].time[j];
                        selectRef.appendChild(optionRef);
                    } 
                }
            }
        }
    }
}

//#endregion

//#region funktion som sätter tider per dag för banorna´

function setTimeForDays(court, days){
    for(let i = 0; i < 30; i++){
        //Vektor med alla tider för en dag
        let time = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

        //Hämtar nästa dag
        const newDate = new Date(days);
        newDate.setDate(days.getDate() + i);

        //Skapar objekt för dagen
        let dag = new day(newDate.getDate(), time);
    
        //Lägger till dagen för bana 5
        court.push(dag);
    }
}

//#endregion

//#region funktion som returnerar data

//Funktion för att hämta och returnera datan för varje bokning
const getData = () =>{


    const latestBooking = bookings[bookings.length -1];
    console.log("latestBooking", latestBooking);

    console.log("data");
    return[
        {
            bkID : latestBooking.bkNumber, 
            court : latestBooking.Number, 
            date: latestBooking.Date, 
            time : latestBooking.Time, 
            name : latestBooking.Name
        }
    ];    
}

//Funktion för att sicka varje bokning
function sendData(){

    console.log("send");

    //Hämtar data för bokningarna 
    const data = getData();

    console.log("Sending data to server: ", data);

    // Kontrollera om data är korrekt format
    if (data && Array.isArray(data)) {
        console.log("Data is an array, ready to send");
    } else {
        console.error("Data is not an array or is undefined");
    }

    //Fetchanrop på endpopint bookings
    fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
         // Om servern svarar korrekt
         if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();  // Omvandla svaret till JSON
    })
    .then(data => console.log("Booking successfully added:", data))
    .catch(error => console.log("Error:", error));
}

//#endregion

//#region funktion för att hämta bokningar

//Funktion för att hämta alla bokningar
function getBookings() {

    //Fetchanrop på endpoint getBookings
    return fetch("http://localhost:3000/getBookings")
        .then(response => {
            if(!response.ok) {
                throw new Error("Network reponse was not ok");
            }

            console.log("Convert to JSON")
            return response.json();
        })
        .then(data => {
            console.log("Bookings received: ", data);
            return data;
        })
        .catch(error => {
            console.error("Error fetching bookings: ", error);
            return [];
        });
}

//#endregion

//#region Funktion för att ta bort en bokning 

function removeBooking(data){
    console.log("data i data", data);
    fetch("http://localhost:3000/removeBooking", {
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({bkID: data})
    })
    .then((response => {
        //Om servern svarar korrekt
        if(!response.ok){
            throw new Error("Network response was not ok");
        }
        return response.json();
    }))
    .then(data => console.log("Booking successfully removed"))
    .catch(error => console.log("Error:", error));
}

//#endregion