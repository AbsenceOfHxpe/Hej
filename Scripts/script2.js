const images = [
    '../pomysły/numer1.jpg',
    '../pomysły/numer2.jpg',
    '../pomysły/numer3.jpeg',
    '../pomysły/numer4.jpg',
    '../pomysły/numer5.jpg',
    '../pomysły/numer6.jpg'
];

let descriptions = []; 


async function loadDescriptionFromFile() {
    try {
        const response = await fetch('https://absenceofhxpe.github.io/Hej/pomys%C5%82y/descriptions.json');
        const data = await response.json();
        console.log("Załadowane dane:", data);  
        return data.activities; 
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
    descriptionElement.innerHTML = descriptions[index] || 'Brak opisu';  
}


document.getElementById('randomizeBtn').addEventListener('click', function () {
    const newIndex = getRandomIndex();
    sessionStorage.setItem('randomIndex', newIndex);
    loadRandomPage();
});


window.onload = function() {
    loadDescriptionFromFile().then(() => {
        if (descriptions.length > 0) {
            displayActivity(descriptions[0]);  
        } else {
            console.error('Brak danych do wyświetlenia.');
        }
    });
};
