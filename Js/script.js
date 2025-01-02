"use strict";

//#region attribut för court 1

let court1Days = [];

//#endregion

//#region attribut för court 2

let court2Days = [];

//#endregion

//#region attribut för court 3 

let court3Days = [];

//#endregion

//#region attribut för court 4

let court4Days = [];

//#endregion

//#region attribut för court 5

let court5Days = [];

//#endregion

//#region Klass för objekt för dagar

class day{

    constructor(date, time){
        this.date = date,
        this.time = time
    }
}

//#endregion

//#region Obejkt för varje bokning

class booking{

    constructor(bkNumber,number, date, time, name){
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
        min : new Date().getHours(),
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

    //Dagar och tider bana 1
    for(let i = 0; i < 30; i++){
        //Vektor med alla tider för en dag
        let time = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

        //Hämtar nästa dag
        const newDate = new Date(days);
        newDate.setDate(days.getDate() + i);

        //Skapar objekt för dagen
        let dag1 = new day(newDate.getDate(), time);
    
        //Lägger till dagen för bana 1
        court1Days.push(dag1);
    }

    //Dagar och tider bana 2
    for(let i = 0; i < 30; i++){
        //Vektor med alla tider för en dag
        let time = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

        //Hämtar nästa dag
        const newDate = new Date(days);
        newDate.setDate(days.getDate() + i);

        //Skapar objekt för dagen
        let dag2 = new day(newDate.getDate(), time);
    
        //Lägger till dagen för bana 2
        court2Days.push(dag2);
    }

    //Dagar och tider bana 3
    for(let i = 0; i < 30; i++){
        //Vektor med alla tider för en dag
        let time = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

        //Hämtar nästa dag
        const newDate = new Date(days);
        newDate.setDate(days.getDate() + i);

        //Skapar objekt för dagen
        let dag3 = new day(newDate.getDate(), time);
    
        //Lägger till dagen för bana 3
        court3Days.push(dag3);
    }

    //Dagar och tider bana 4
    for(let i = 0; i < 30; i++){
        //Vektor med alla tider för en dag
        let time = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

        //Hämtar nästa dag
        const newDate = new Date(days);
        newDate.setDate(days.getDate() + i);

        //Skapar objekt för dagen
        let dag4 = new day(newDate.getDate(), time);
    
        //Lägger till dagen för bana 4
        court4Days.push(dag4);
    }

    //Dagar och tider bana 5
    for(let i = 0; i < 30; i++){
        //Vektor med alla tider för en dag
        let time = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

        //Hämtar nästa dag
        const newDate = new Date(days);
        newDate.setDate(days.getDate() + i);

        //Skapar objekt för dagen
        let dag5 = new day(newDate.getDate(), time);
    
        //Lägger till dagen för bana 5
        court5Days.push(dag5);
    }

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

    })

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
    let courtNumber = img.getAttribute("data-court-number");
    modalHeaderRef.innerHTML = "Court " + courtNumber;

    //Hämtar ut kroppen så det kan byggas upp lite innehåll
    let modalBodyRef = document.querySelector(".modal-body");
    modalBodyRef.innerHTML = "";
    let formRef = document.createElement("form");
    formRef.classList.add("form-group");

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

    time(courtNumber, selectRef, splitDate);

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
    confirmButtonRef.classList.add("btn", "btn-success");
    confirmButtonRef.setAttribute("type", "button");
    confirmButtonRef.innerHTML = "Book";
    modalFooterRef.appendChild(confirmButtonRef);

    controleTime(confirmButtonRef, dateRef, selectRef, inputRef, modalHeaderRef, labelSelectRef, labelNameRef);
}

//#endregion

//#region funktion för att genomföra en bokning

function confirmBooking(bkNumber, Court, date, time, name ){

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

    //Går igenom alla boknnigar
    //För aktiva bokningar, kanske ska tas bort och flyttas
    bookings.forEach(booking => {
        if(oGlobalObject.hour + ":00" == booking.Time){
            let h5Ref = document.createElement("h5");
            h5Ref.classList.add("pt-1", "ms-3")
            h5Ref.innerHTML = booking.Name

            if(booking.Number == "Court 1"){
                let activeDivRef = document.querySelector(".Play1");
                if(activeDivRef.children.length < 2){
                    activeDivRef.appendChild(h5Ref);
                }
            }
            else if(booking.Number == "Court 2"){
                let activeDivRef = document.querySelector(".Play2");
                if(activeDivRef.children.length < 2){
                    activeDivRef.appendChild(h5Ref);
                }
            }
            else if(booking.Number == "Court 3"){
                let activeDivRef = document.querySelector(".Play3");
                if(activeDivRef.children.length < 2){
                    activeDivRef.appendChild(h5Ref);
                }
            }
            else if(booking.Number == "Court 4"){
                let activeDivRef = document.querySelector(".Play4");
                if(activeDivRef.children.length < 2){
                    activeDivRef.appendChild(h5Ref);
                }
            }
            else if(booking.Number == "Court 5"){
                let activeDivRef = document.querySelector(".Play5");
                if(activeDivRef.children.length < 2){
                    activeDivRef.appendChild(h5Ref);
                }
            }
        }
    });
}

//#endregion

//#region laddar alla bokningar

function loadBookings(){

    //Hämtar ut DIV:n som visar alla bokninger
    //Tömmer den för att inte visa dubletter
    let bookingsDivRef = document.querySelector("#bookings");
    bookingsDivRef.innerHTML = "";

    let playDivs = document.querySelectorAll("[class^='Play']");

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
        btnRemoveRef.classList.add("btn", "bg-danger", "text-white");
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
            if(playDivs[i].lastChild.innerHTML == bookings[i].Name && bookings[i].Time == oGlobalObject.hour + ":00"){
                playDivs[i].removeChild(playDivs[i].lastChild);
            }
            

            //Tar bort bokning ifrån vetorn med bokningar
            let removeValue = btnRemoveRef.getAttribute("data-booking-index");
            bookings.splice(parseInt(removeValue), 1);
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

function controleTime(button, dateRef, selectRef, inputRef, modalHeaderRef, labelSelectRef, labelNameRef){

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

        let courtNumber = oGlobalObjectCourt.clickedCourt.getAttribute("data-court-number");

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

        //Felmedelande för time
        if(selectRef.value == "Select time"){
           
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

            confirmBooking(bookings.length + 1, modalHeaderRef.innerHTML, dateRef.value,  selectRef.value, inputRef.value);

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
                    //Splittar tiderna som finns i vektorn på :
                    let splitTimer = court1Days[i].time[j].split(":");
                    let timeHoure = parseInt(splitTimer[0]);
                    let timeMin = parseInt(splitTimer[1]);

                    //Kollar om tiden ska gå att boka
                    if(court5Days[i].time[j] != undefined ){
                        let optionRef = document.createElement("option");
                        optionRef.setAttribute("value", court5Days[i].time[j]);
                        optionRef.innerHTML = court1Days[i].time[j];
                        selectRef.appendChild(optionRef);
                    } 
                }
            }
        }
    }

}

//#endregion