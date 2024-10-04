"use strict";

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

    }

}
//#endregion