


// ===== Cookie Helper Functions =====
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const cookieArr = document.cookie.split("; ");
    for (let cookie of cookieArr) {
        const [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}


const hamburgerIcon = document.querySelector(".hamburger-icon");
const menuLinks = document.querySelectorAll(".menu-links a");
const menu = document.querySelector(".menu-links");
const video = document.querySelector(".contact-video");
const passwordInput = document.getElementById("password");
const eyeIcon = document.getElementById("eye-icon");
const usernameInput = document.getElementById("username");
const loginBtn = document.getElementById("login-btn");
const loginScreen = document.querySelector('.login-screen');
const mainScreen = document.querySelector(".main-screen")
const logoutBtn = document.getElementById("logout-btn");
const logoutBtnHamburger = document.getElementById("logout-btn-hamburger");
const contactInfoBtn = document.getElementById("contact-btn");
const contactInfoSection = document.querySelector(".contact-section");
const puparazziBtn = document.getElementById("puparazzi-btn");
const jeepneyProjectBtn = document.getElementById("jeepney-project-btn");
const cvBtn = document.getElementById("cv-btn");
const cookieConsent = document.getElementById("cookie-consent");
const cookieAcceptBtn = document.getElementById("cookie-accept");
const cookieRejectBtn = document.getElementById("cookie-reject");
const rememberMeCheckbox = document.getElementById("remember-me");

let seePassword = false;

const professorUsername = "professor";
const professorPassword = "professorpassword123";

const guestUsername = "guestusername";
const guestPassword = "guestpassword";



function updateDate(){
    const now = new Date();
    const options = { weekday: "short", year: "numeric", month: "long", day: "numeric" };
    const dateString = now.toLocaleDateString("en-US", options);

    document.getElementById("date-text-1").textContent = dateString;
    document.getElementById("date-text-2").textContent = dateString;
}

updateDate();
setInterval(updateDate, 60000); // refresh every minute in case date changes at midnight

function updateClock(){
    
    const now = new Date();
    let hours = now.getHours();
    const meridiem = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, 0);
    const minutes = now.getMinutes().toString().padStart(2,0);
    const seconds = now.getSeconds().toString().padStart(2,0);
    const timeString = `${hours}:${minutes}:${seconds} ${meridiem}`;
    document.getElementById("clock-text-1").textContent = timeString;
    document.getElementById("clock-text-2").textContent = timeString;
    //document.querySelector("clock-2").textContent = timeString;
    
}


updateClock();
setInterval(updateClock, 1000);

video.volume = 0;


// ===== Cookie Consent Popup Logic =====
function initCookieConsent() {
    const consentStatus = getCookie("cookieConsent");

    if (!consentStatus) {
        // show popup after a brief delay for a smoother entrance
        setTimeout(() => {
            cookieConsent.classList.add("show");
        }, 600);
    }

    cookieAcceptBtn.addEventListener("click", () => {
        setCookie("cookieConsent", "accepted", 365);
        cookieConsent.classList.remove("show");
    });

    cookieRejectBtn.addEventListener("click", () => {
        setCookie("cookieConsent", "rejected", 365);
        // remove any previously remembered username since consent was withdrawn
        deleteCookie("rememberedUsername");
        cookieConsent.classList.remove("show");
    });
}

// ===== Remember Username Feature (depends on cookie consent) =====
function loadRememberedUsername() {
    const remembered = getCookie("rememberedUsername");
    if (remembered) {
        usernameInput.value = remembered;
        rememberMeCheckbox.checked = true;
    }
}

initCookieConsent();
loadRememberedUsername();


eyeIcon.addEventListener("click", ()=>{
    seePassword = !seePassword;
    
    if (seePassword){
        eyeIcon.classList.remove("fa-regular", "fa-eye");
        eyeIcon.classList.add("fa-regular", "fa-eye-slash");

        passwordInput.type = "text";
    } else{
        eyeIcon.classList.remove("fa-regular", "fa-eye-slash");
        eyeIcon.classList.add("fa-regular", "fa-eye");

        passwordInput.type = "password";
    }
})


hamburgerIcon.addEventListener("click", ()=>{
    menu.classList.toggle("open");
    hamburgerIcon.classList.toggle("open");
    
});

menuLinks.forEach((menuLink)=>menuLink.addEventListener("click", ()=>{
    menu.classList.toggle("open");
    hamburgerIcon.classList.toggle("open");
}));


function loginUser(){
    if ((usernameInput.value.trim() === professorUsername && passwordInput.value.trim() === professorPassword)
        || (usernameInput.value.trim() === guestUsername && passwordInput.value.trim() === guestPassword)){

            // only store a cookie if the user accepted cookies AND checked "remember me"
            const consentStatus = getCookie("cookieConsent");
            if (rememberMeCheckbox.checked && consentStatus === "accepted") {
                setCookie("rememberedUsername", usernameInput.value.trim(), 30);
            } else {
                deleteCookie("rememberedUsername");
            }

            loginScreen.classList.remove("active");
            loginScreen.classList.add("hidden");
            mainScreen.classList.add("active");
            mainScreen.classList.remove("hidden");
    }
}


function logout(){
    loginScreen.classList.add("active");
    loginScreen.classList.remove("hidden");
    mainScreen.classList.remove("active");
    mainScreen.classList.add("hidden");
}


loginBtn.addEventListener("click", loginUser);
logoutBtn.addEventListener("click", logout);
logoutBtnHamburger.addEventListener("click", logout);

contactInfoBtn.addEventListener("click", ()=>{
    contactInfoSection.scrollIntoView({behavior:"smooth"});
})

puparazziBtn.addEventListener("click", ()=>{
    window.open("https://github.com/Dendi774/PUParazzi", "_blank");
})

jeepneyProjectBtn.addEventListener("click", ()=>{
    window.open("https://github.com/Dendi774/fuel_consumption_simulation_QMMS", "_blank");
})

cvBtn.addEventListener("click", ()=>{
    window.open("./assets/OLIVAR-resume.pdf", "_blank");
})