let screenSize = window.innerWidth

// show and hide nav in mobile 
const header = document.getElementById("header")
const nav = document.getElementById("nav")
const menubutton = document.getElementById("mbtn")
const menuOpen = false
const mcloseIcon = document.getElementById("mclose")
const mopenIcon = document.getElementById("mbars")
const mobileMenu = document.getElementById("mmenu") 
const suscribeBtn = document.getElementById("suscribe-btn")

if(screenSize < 450) {
    console.info("inner menor a 450")
    nav.classList.add("mobile")
}

else {
    console.info("inner mayor a 450")
    menubutton.classList.add("desktop")
    suscribeBtn.classList.add("desktop")

}

// display mobile menu
function openMenu() {
    if(menuOpen == false) {
        menubutton.classList.add("active")
        mopenIcon.classList.add("inactive")
        mcloseIcon.classList.remove("inactive")
        mobileMenu.classList.add("active")
        menuOpen = true
    }
    else {
        menubutton.classList.remove("active")
        mopenIcon.classList.remove("inactive")
        mcloseIcon.classList.add("inactive")
        mobileMenu.classList.remove("active")
        menuOpen = false
    }
}

// parallax effect

const logo = document.getElementById("logo")
const subtitle = document.getElementById("logo-subtitle")

if(screenSize > 600) {
    document.addEventListener('scroll', function(){
        let value = window.scrollY
        // header.style.marginTop = value + 'px'
        logo.style.marginTop = value + 'px'
        subtitle.style.marginTop = value + 'px'
    })
}