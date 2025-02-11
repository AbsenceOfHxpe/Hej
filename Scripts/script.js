const escapeBtn = document.querySelector(".escape");
const okBtn = document.querySelector(".ok");
const counterElem = document.querySelector("#counter");
const tekstElem = document.querySelector("#tekst");
const body = document.body;
var audio = document.getElementById('myAudio');

audio.onpause = function() {
    localStorage.setItem('audioTime', audio.currentTime);
};

audio.onplaying = function() {
    localStorage.setItem('audioTime', audio.currentTime);
};

const texts = ["Naprawdę byś chciała???", "Proszę... marzyłem o tym odkąd Cię zobaczyłem", "Zawsze tam gdzie Ty", "Wchodzę w to na serio", ":)","Przyjemność po mojej stronie","Ja stawiam jak coś","To jak gdzie idziemy?","Myślisz o tym samym co ja?","Nie ma na co czekać!","Lubie Cb","A czy wiedziałaś że 151 to pierwiastek z 23,716","Na co tylko masz ochotę","W takim razie zapraszam"];
const ramblings = ["To musi być missclick", "ale...", "Pewnie robi mu się już smutno....", "Serio... ... .. .", "Serio nadal próbujesz?", "Nie proszę :(", "Dobra teraz przesadziłaś stanowczo?!? Może później zmienię zdanie, ale na razie zabieram ten przycisk.  (Nie masz na co czekać i tak nie wróci)"];



let firstHover = true;
let rejectCount = 0;
let ramblingIndex = 0;


function showRandomImage() {
    const imageFolder = 'smutne_obrazki/'; 
    const images = ['aaaaa.jpg', 'glebokie.jpg', 'nie_wiem_dlaczego_to_tu_jest.jpg', 'rel.jpg', 'sad_nawiazanie_to_jest_omg.jpg','smutna_buzia.jpg','sadek.jpg']; // Nazwy obrazków w folderze
    const randomImageIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomImageIndex];
    const padding = 150; 

    const img = document.createElement('img');
    img.src = `${imageFolder}${randomImage}`;
    img.style.width = '200px';
    img.style.height = '200px';
    img.style.position = 'absolute';
    img.style.zIndex = '-1';
    img.style.transition = 'transform 0.5s ease';
    img.style.borderRadius = '15px';
    img.classList.add('smutny-obrazek');


    const maxX = window.innerWidth - img.width - padding; 
    const maxY = window.innerHeight - img.height - padding; 

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    img.style.left = `${randomX}px`;
    img.style.top = `${randomY}px`;

    body.appendChild(img);
}




escapeBtn.addEventListener("mouseover", () => {
    if (firstHover) {
        firstHover = false;
        counterElem.style.visibility = "visible";
    }

    const padding = 50; 
    const maxX = window.innerWidth - escapeBtn.clientWidth - padding;
    const maxY = window.innerHeight - escapeBtn.clientHeight - padding;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    escapeBtn.style.position = "absolute";
    escapeBtn.style.left = `${randomX}px`;
    escapeBtn.style.top = `${randomY}px`;

    if (!firstHover) {
        escapeBtn.classList.add("animate");
        rejectCount++;
        counterElem.textContent = `Odrzucenia: ${rejectCount}`;
        
        const currentBrightness = parseFloat(getComputedStyle(body).filter.replace("brightness(", "").replace(")", "")) || 1; 
        const newBrightness = Math.max(currentBrightness - 0.05, 0.5); 
        body.style.filter = `brightness(${newBrightness})`; 
    }

    if (rejectCount % 5 === 0) {
        tekstElem.textContent = ramblings[ramblingIndex];
        

        if (ramblingIndex < ramblings.length - 1) {
            ramblingIndex++; 
        } else {
            ramblingIndex = ramblings.length - 1; 

            escapeBtn.style.display = "none";
            counterElem.style.display = "none";
        }

        showRandomImage();
    }

});


okBtn.addEventListener("mouseover", () => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    okBtn.textContent = texts[randomIndex];
    body.style.filter = "brightness(1)";

    const images = document.querySelectorAll('.smutny-obrazek');
    images.forEach(image => image.remove());
});

okBtn.addEventListener("mouseleave", () => {
    okBtn.textContent = "Tak ˶ᵔ ᵕ ᵔ˶"; 
});

function redirectToIndex() {

    window.location.href = "html/index.html";


}







