const images = [
    '../pomysły/numer1.jpg',
    '../pomysły/numer2.jpg',
    '../pomysły/numer3.jpeg',
    '../pomysły/numer4.jpg',
    '../pomysły/numer5.jpg',
    '../pomysły/numer6.jpg',
    '../pomysły/numer7.jpg',
    '../pomysły/numer8.jpg',
    '../pomysły/numer9.jpg',
    '../pomysły/numer10.jpg',
    '../pomysły/numer11.jpg',
    '../pomysły/numer12.jpg',
    '../pomysły/numer13.jpg',
    '../pomysły/numer14.jpg',
    '../pomysły/numer15.jpg',
    '../pomysły/numer16.jpeg',
    '../pomysły/numer17.jpg'
];

let descriptions = []; 

async function loadDescriptionFromFile() {
    try {
        const response = await fetch('https://absenceofhxpe.github.io/Hej/pomys%C5%82y/descriptions.json');
        const data = await response.json();
        console.log("Załadowane dane:", data);  
        descriptions = data.activities; 
    } catch (error) {
        console.error('Błąd ładowania pliku:', error);
    }
}

function displayActivity(activity) {
    const descriptionElement = document.getElementById('description');
    const content = `
        <h1>${activity.title}</h1>
        <h3>1. Szacowane koszta:</h3>
        <p>${activity.costs}</p>  
        <h3>2. Podstawowy ciąg zdarzeń:</h3>
        <p>${activity.events.join('<br>')}</p>  
        <h3>3. Alternatywny ciąg zdarzeń:</h3>
        <p>${activity.alternativeEvents.join('<br>')}</p>  
        <h3>4. Zależności czasowe:</h3>
        <p>${activity.timeDependencies.frequency}</p>
        <p>${activity.timeDependencies.duration}</p>
        <p>${activity.timeDependencies.peakTimes}</p>
        <h3>5. Wartości uzyskane przez aktorów:</h3>
        <p>${activity.actorValues.join('<br>')}</p> 
    `;
    descriptionElement.innerHTML = content;
}


function getRandomIndex() {
    return Math.floor(Math.random() * descriptions.length); 
}

function loadRandomPage() {
    let index = sessionStorage.getItem('randomIndex');
    if (index === null || index >= descriptions.length) {
        index = getRandomIndex(); 
        sessionStorage.setItem('randomIndex', index);
    } else {
        index = parseInt(index, 10);
    }

    const imageElement = document.getElementById('image');
    const descriptionElement = document.getElementById('description');


    imageElement.src = images[index];

 
    if (descriptions.length > 0) {
        const activity = descriptions[index]; 
        displayActivity(activity); 
    } else {
        descriptionElement.innerHTML = 'Brak danych do wyświetlenia.';
    }
}

document.getElementById('randomizeBtn').addEventListener('click', function () {
    const newIndex = getRandomIndex();
    sessionStorage.setItem('randomIndex', newIndex);
    loadRandomPage();
});

window.onload = function() {
    loadDescriptionFromFile().then(() => {
        if (descriptions.length > 0) {
            loadRandomPage(); 
        } else {
            console.error('Brak danych do wyświetlenia.');
        }
    });

    var audio = document.getElementById('myAudio');
    var savedTime = localStorage.getItem('audioTime');

    if (audio && savedTime) {
        audio.currentTime = parseFloat(savedTime);
        audio.volume = 0.05;
        audio.play().catch(error => console.log("Nie można odtworzyć audio:", error));
    }
};