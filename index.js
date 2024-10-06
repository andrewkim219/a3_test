const menuHome = document.getElementById("menuHome");
const menuEvents = document.getElementById("menuEvents");
const menuNZSL = document.getElementById("menuNZSL");
const menuRegister = document.getElementById("menuRegister");
const menuLogin = document.getElementById("menuLogin");
const menuGuest = document.getElementById("menuGuest");

const sectionHome = document.getElementById("sectionHome");
const sectionNZSL = document.getElementById("sectionNZSL");
const sectionEvents = document.getElementById("sectionEvents");
const sectionRegister = document.getElementById("sectionRegister");
const sectionLogin = document.getElementById("sectionLogin");
const sectionGuest = document.getElementById("sectionGuest");

function showHome () {
    sectionHome.style.display = "block";
    sectionNZSL.style.display = "none";
    sectionEvents.style.display = "none";
    sectionRegister.style.display = "none";
    sectionLogin.style.display = "none";
    sectionGuest.style.display = "none";

    menuHome.style.backgroundColor = "grey";
    menuNZSL.style.backgroundColor = "transparent";
    menuEvents.style.backgroundColor = "transparent";
    menuRegister.style.backgroundColor = "transparent";
    menuLogin.style.backgroundColor = "transparent";
    menuGuest.style.backgroundColor = "transparent";
}

function showNZSL () {
    sectionHome.style.display = "none";
    sectionNZSL.style.display = "block";
    sectionEvents.style.display = "none";
    sectionRegister.style.display = "none";
    sectionLogin.style.display = "none";
    sectionGuest.style.display = "none";

    menuHome.style.backgroundColor = "transparent";
    menuNZSL.style.backgroundColor = "grey";
    menuEvents.style.backgroundColor = "transparent";
    menuRegister.style.backgroundColor = "transparent";
    menuLogin.style.backgroundColor = "transparent";
    menuGuest.style.backgroundColor = "transparent";
}

function showEvents () {
    sectionHome.style.display = "none";
    sectionNZSL.style.display = "none";
    sectionEvents.style.display = "block";
    sectionRegister.style.display = "none";
    sectionLogin.style.display = "none";
    sectionGuest.style.display = "none";

    menuHome.style.backgroundColor = "transparent";
    menuNZSL.style.backgroundColor = "transparent";
    menuEvents.style.backgroundColor = "grey";
    menuRegister.style.backgroundColor = "transparent";
    menuLogin.style.backgroundColor = "transparent";
    menuGuest.style.backgroundColor = "transparent";
}

function showRegister () {
    sectionHome.style.display = "none";
    sectionNZSL.style.display = "none";
    sectionEvents.style.display = "none";
    sectionRegister.style.display = "block";
    sectionLogin.style.display = "none";
    sectionGuest.style.display = "none";

    menuHome.style.backgroundColor = "transparent";
    menuNZSL.style.backgroundColor = "transparent";
    menuEvents.style.backgroundColor = "transparent";
    menuRegister.style.backgroundColor = "grey";
    menuLogin.style.backgroundColor = "transparent";
    menuGuest.style.backgroundColor = "transparent";
}

function showLogin () {
    sectionHome.style.display = "none";
    sectionNZSL.style.display = "none";
    sectionEvents.style.display = "none";
    sectionRegister.style.display = "none";
    sectionLogin.style.display = "block";
    sectionGuest.style.display = "none";

    menuHome.style.backgroundColor = "transparent";
    menuNZSL.style.backgroundColor = "transparent";
    menuEvents.style.backgroundColor = "transparent";
    menuRegister.style.backgroundColor = "transparent";
    menuLogin.style.backgroundColor = "grey";
    menuGuest.style.backgroundColor = "transparent";
}

function showGuest () {
    sectionHome.style.display = "none";
    sectionNZSL.style.display = "none";
    sectionEvents.style.display = "none";
    sectionRegister.style.display = "none";
    sectionLogin.style.display = "none";
    sectionGuest.style.display = "block";

    menuHome.style.backgroundColor = "transparent";
    menuNZSL.style.backgroundColor = "transparent";
    menuEvents.style.backgroundColor = "transparent";
    menuRegister.style.backgroundColor = "transparent";
    menuLogin.style.backgroundColor = "transparent";
    menuGuest.style.backgroundColor = "grey";
}

menuHome.addEventListener("click", showHome);
menuNZSL.addEventListener("click", showNZSL);
menuEvents.addEventListener("click", showEvents);
menuRegister.addEventListener("click", showRegister);
menuLogin.addEventListener("click", showLogin);
menuGuest.addEventListener("click", showGuest);

showHome();
async function getLogo() {
    const bodyLogo = document.getElementById("bodyLogo");
    const response = await fetch("https://cws.auckland.ac.nz/nzsl/api/Logo");
    const imageBlob = await response.blob();
    const imageURL = URL.createObjectURL(imageBlob);

    bodyLogo.src = imageURL;
}
getLogo();

async function getVersion(){
    const response = await fetch("https://cws.auckland.ac.nz/nzsl/api/Version");
    const text = await response.text();

    const footer = document.getElementById("footer");
    footer.textContent = text;
}
getVersion();

let signs = [];
async function getImages() {
    const response = await fetch("https://cws.auckland.ac.nz/nzsl/api/AllSigns");
    const images = await response.json();

    signs = await Promise.all(images.map(async image => {
        const imageResponse = await fetch(`https://cws.auckland.ac.nz/nzsl/api/SignImage/${image.id}`);
        const imageBlob = await imageResponse.blob();
        const imageURL = URL.createObjectURL(imageBlob);

        return {description:image.description, src:imageURL};
    }));
    displayImages(signs);
}

const imageContainer = document.getElementById("imageContainer");
function displayImages(signs) {
    imageContainer.textContent = "";
    signs.forEach(sign => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("imageContainer")

        const image = document.createElement("img");
        image.classList.add("image");
        image.src = sign.src;
        image.alt = sign.description;
        imageDiv.appendChild(image);

        const text = document.createElement("p");
        text.classList.add("text");
        text.textContent = sign.description;
        imageDiv.appendChild(text);

        imageContainer.appendChild(imageDiv);
    })
}

const imageSearch = document.getElementById("imageSearch");
imageSearch.addEventListener("input", () => {
    const text = imageSearch.value;
    const filteredImages = signs.filter(sign => sign.description.includes(text));
    displayImages(filteredImages);
})

getImages();

const registerUsername = document.getElementById("registerUsername");
const registerPassword = document.getElementById("registerPassword");
const registerAddress = document.getElementById("registerAddress");
const registerSuccess = document.getElementById("registerSuccess");
const registerSuccessOk = document.getElementById("registerSuccessOk");
async function register() {
    const username = registerUsername.value;
    const password = registerPassword.value;
    const address = registerAddress.value;

    if(username === "" || password === "" || address === ""){
        alert("Please fill in all fields");
        return;
    }

    const user = {
        userUsername: username,
        userPassword: password,
        userAddress: address
    }
    const response = await fetch("https://cws.auckland.ac.nz/nzsl/api/Register", {
        headers: {
            "Content-Type":"application/json",
        },
        method: "POST",
        body: JSON.stringify(user)
    });

    if(await response.text() !== "Username not available"){
        registerSuccess.style.display = "block";
        registerSuccessOk.addEventListener("click", () => {
            registerSuccess.style.display = "none";
        })
        registerUsername.value = "";
        registerPassword.value = "";
        registerAddress.value = "";
    } else {
        alert("User registration failed.")
    }
}

const registerButton = document.getElementById("registerButton");
registerButton.addEventListener("click", register);

const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginButton = document.getElementById("loginButton");

async function login() {
    const username = loginUsername.value;
    const password = loginPassword.value;

    if (username === "" || password === "") {
        alert("Please fill in all fields");
        return;
    }

    const authToken = btoa(`${username}:${password}`);
    const response = await fetch("https://cws.auckland.ac.nz/nzsl/api/TestAuth", {

        headers: {
            "Authorization": `Basic ${authToken}`
        }
    });

    if (response.status === 200) {
        alert("Login Successful");
        loginUsername.value = "";
        loginPassword.value = "";
        currentUsername = username;
        currentPassword = password;
    } else {
        alert("Login Failed");
    }
}

loginButton.addEventListener("click", login);

const commentFrame = document.getElementById("commentFrame");
function fetchComments() {
    commentFrame.src = "https://cws.auckland.ac.nz/nzsl/api/Comments";
}

fetchComments();
let currentUsername;
let currentPassword;

const commentText = document.getElementById("commentText");
async function postComments() {
    const comment = commentText.value;

    if(comment === ""){
        alert("MEOWWW");
        return;
    }

    const authToken = btoa(`${currentUsername}:${currentPassword}`)
    const response = await fetch(`https://cws.auckland.ac.nz/nzsl/api/Comment?comment=${comment}`, {
        headers: {
            "Authorization": `Basic ${authToken}`
        },
        method: "POST",
        body: comment
    });

    if(response.status === 200) {
        alert("Comment posted");
        fetchComments();
        commentText.value = "";
    } else {
        alert("Comment failed");
    }
}

const postButton = document.getElementById("postButton");
postButton.addEventListener("click", postComments);