"use strict";

//#region attribut för court 1
let court1 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    days : []
}

//#endregion

//#region attribut för court 2
let court2 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    days : []
}

//#endregion

//#region attribut för court 3 
let court3 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    days : []
}

//#endregion

//#region attribut för court 4
let court4 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    days : []
}

//#endregion

//#region attribut för court 5
let court5 = {
    time : ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
    days : []
}

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

    for(let i = 0; i < 30; i++){
        const newDate = new Date(days);
        newDate.setDate(days.getDate() + i);
        court1.days.push(newDate.getDate());

       let dag = new day(newDate.getDate(), court1.time);
       court1.days.push(dag);
    }

    let searchRef = document.querySelector("#search");

    console.log(searchRef);

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
    //formRef.style.height = "15rem"; 

    let dateRef = document.createElement("input");
    dateRef.setAttribute("type", "date");
    dateRef.classList.add("form-control", "mb-1");
    let d = new Date();

    //String().padStart(2,"0") ser till att det alltid finns två bokstäver och gör det inte det så lägger den till en nolla i början
    dateRef.value = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, '0') + "-" + String(d.getDate()).padStart(2,'0');
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

    //Parsar tiderna från objektet
    let objHour = parseInt(oGlobalObject.hour);
    let objMin = parseInt(oGlobalObject.min);

    //Bana 1
    if(courtNumber == 1){
        court1.time.sort();
        
        //Går igenom alla tiderna
        for(let i = 0; i < court1.time.length; i++){

            //Splittar tiderna som finns i vektorn på :
            let splitTimer = court1.time[i].split(":");
            let timeHoure = parseInt(splitTimer[0]);
            let timeMin = parseInt(splitTimer[1]);

            //Kollar om tiden ska gå att boka
            if(court1.time[i] != undefined && (timeHoure > objHour || (timeHoure === objHour && timeMin >= objMin))){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court1.time[i]);
                optionRef.innerHTML = court1.time[i];
                selectRef.appendChild(optionRef);
            } 
        }
    }
    //Bana 2
    else if(courtNumber == 2){
        court2.time.sort();

        //Går igenom alla tiderna
        for(let i = 0; i < court2.time.length; i++){

            //Splittar tiderna som finns i vektorn på :
            let splitTimer = court2.time[i].split(":");
            let timeHoure = parseInt(splitTimer[0]);
            let timeMin = parseInt(splitTimer[1]);

            //Kollar om tiden ska gå att boka
            if(court2.time[i] != undefined && (timeHoure > objHour || (timeHoure === objHour && timeMin >= objMin))){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court2.time[i]);
                optionRef.innerHTML = court2.time[i];
                selectRef.appendChild(optionRef);
            }
        }
    }
    //Bana 3
    else if(courtNumber == 3){
        court3.time.sort();

        //Går igenom alla tiderna
        for(let i = 0; i < court3.time.length; i++){

            //Splittar tiderna som finns i vektorn på :
            let splitTimer = court3.time[i].split(":");
            let timeHoure = parseInt(splitTimer[0]);
            let timeMin = parseInt(splitTimer[1]);

            //Kollar om tiden ska gå att boka
            if(court3.time[i] != undefined && (timeHoure > objHour || (timeHoure === objHour && timeMin >= objMin))){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court3.time[i]);
                optionRef.innerHTML = court3.time[i];
                selectRef.appendChild(optionRef);
            }
        }
    }
    //Bana 4
    else if(courtNumber == 4){
        court4.time.sort();

        //Går igenom alla tiderna
        for(let i = 0; i < court4.time.length; i++){

            //Splittar tiderna som finns i vektorn på :                
            let splitTimer = court4.time[i].split(":");
            let timeHoure = parseInt(splitTimer[0]);
            let timeMin = parseInt(splitTimer[1]);

            //Kollar om tiden ska gå att boka
            if(court4.time[i] != undefined && (timeHoure > objHour || timeHoure === objHour && timeMin >= objMin)){
            let optionRef = document.createElement("option");
            optionRef.setAttribute("value", court4.time[i]);
            optionRef.innerHTML = court4.time[i];
            selectRef.appendChild(optionRef);
            }
        }
    }
    //Bana 5
    else if(courtNumber == 5){
        court5.time.sort();

        //Går igenom alla tiderna
        for(let i = 0; i < court5.time.length; i++){

            //Splittar tiderna som finns i vektorn på :
            let splitTimer = court5.time[i].split(":");
            let timeHoure = parseInt(splitTimer[0]);
            let timeMin = parseInt(splitTimer[1]);

            //Kollar om tiden ska gå att boka
            if(court5.time[i] != undefined && (timeHoure > objHour || (timeHoure === objHour && timeMin >= objMin))){
                let optionRef = document.createElement("option");
                optionRef.setAttribute("value", court5.time[i]);
                optionRef.innerHTML = court5.time[i];
                selectRef.appendChild(optionRef);
            }
        }
    }

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
        court5.time.splice(court5.time.indexOf(time), 1);
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

            //Kollar vilkne bana som bokningen gäller och lägger till den i dess vektor
            //Bana 1
            if(courtRef == "Court 1"){
                court1.time.push(timeRef);
            }
            //Bana 2
            else if(courtRef == "Court 2"){
                court2.time.push(timeRef);
            }
            //Bana 3
            else if(courtRef == "Court 3"){
                court3.time.push(timeRef);
            }
            //Bana 4
            else if(courtRef == "Court 4"){
                court4.time.push(timeRef);
            }
            //Bana 5
            else if(courtRef == "Court 5"){
                court5.time.push(timeRef);
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

        if(bookings.date == date.getDate()){
            console.log("yey");
        }

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
        
        //Kollar så att sissta värdet matchar med någon dag i banans atribut med objekt för dagar
        let changeDate = dateChangeRef.value;
        let changeDateDay = changeDate.split("-")[2];
    
        formSelectRef.innerHTML = "";

        //Påbörjar våran select option 
        let optionRef = document.createElement("option");
        optionRef.setAttribute("selected", true);
        optionRef.setAttribute("disabled", true);
        optionRef.innerHTML = "Select time";
        formSelectRef.appendChild(optionRef);

        //Lopar igenom och skrive ut alla tider som är lediga för det datum som väljs
        for(let i = 0; i < court1.days.length; i++){
            if(changeDateDay == court1.days[i].date){

                court1.days[i].time.forEach((time) => {
                    
                    if(time != undefined){
                        let optionRef = document.createElement("option");
                        optionRef.innerHTML = time; 
                        formSelectRef.appendChild(optionRef);

                    }  
                })
            }
        } 
    });

    //Boolean för inloggnigsprocessen
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
        if(searchInput == "" || (searchInput != "" && (booking.Number.includes(searchInput) || booking.Time.includes(searchInput) || booking.Name.includes(searchInput) || booking.Date.includes(searchInput) ))){
            bookingNumberRef.classList.remove("d-none");
        }
        //Annars gömmer den bokningen genom d-none
        else{
            bookingNumberRef.classList.add("d-none");
        }

    })
}


//#endregion