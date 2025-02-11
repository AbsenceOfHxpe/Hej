const images = [
    '../pomysły/numer1.jpg',
    '../pomysły/numer2.jpg',
    '../pomysły/numer3.jpeg',
    '../pomysły/numer4.jpg',
    '../pomysły/numer5.jpg',
    '../pomysły/numer6.jpg'
];


async function loadDescriptionFromFile() {
    try {
        const response = await fetch('./pomysły/descriptions.txt');  
        const text = await response.text();


        descriptions = text.split('<!-- separator -->');
    } catch (error) {
        console.error('Błąd ładowania pliku:', error);
    }
}


function getRandomIndex() {
    return Math.floor(Math.random() * images.length);
}


function loadRandomPage() {
    let index = sessionStorage.getItem('randomIndex');


    if (index === null) {
        index = getRandomIndex();
        sessionStorage.setItem('randomIndex', index);
    } else {
        index = parseInt(index, 10);
    }


    const imageElement = document.getElementById('image');
    const descriptionElement = document.getElementById('description');


    imageElement.src = images[index];
    descriptionElement.innerHTML = descriptions[index];
}


document.getElementById('randomizeBtn').addEventListener('click', function () {
    const newIndex = getRandomIndex();
    sessionStorage.setItem('randomIndex', newIndex);
    loadRandomPage();
});


window.onload = function() {
    loadDescriptionFromFile().then(() => {
        loadRandomPage();  
    });
};