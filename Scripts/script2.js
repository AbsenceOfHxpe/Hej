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
        const response = await fetch('./pomysły/descriptions.json');
        const data = await response.json();
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
        <p>${activity.cost}</p>
        <h3>2. Podstawowy ciąg zdarzeń:</h3>
        <p>${activity.main_events.join('<br>')}</p>
        <h3>3. Alternatywny ciąg zdarzeń:</h3>
        <p>${activity.alternative_events.join('<br>')}</p>
        <h3>4. Zależności czasowe:</h3>
        <p>${activity.time_dependencies.join('<br>')}</p>
        <h3>5. Wartości uzyskane przez aktorów:</h3>
        <p>${activity.actor_benefits.join('<br>')}</p>
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
    descriptionElement.innerHTML = descriptions[index];
}


document.getElementById('randomizeBtn').addEventListener('click', function () {
    const newIndex = getRandomIndex();
    sessionStorage.setItem('randomIndex', newIndex);
    loadRandomPage();
});


window.onload = function() {
    loadDescriptionFromFile().then(activities => {
        displayActivity(activities[0]); 
    });
};