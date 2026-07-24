// fs: promises

// const fetchData() = function{
//     fetch(key, value)

// }

// async function displayData(file) { return fetch(data) => Promise.all

// }

// const readFile(movies.json)
// const readFile(actors.json)
// const readFile(cinemas.json)


// console.log()

// Select elements by their IDs
const paragraph = document.getElementById('myParagraph');
const image = document.getElementById('myImage');

// --- Modify the paragraph ---
if (paragraph) {
    // Change the text content
    paragraph.textContent = 'This is the new paragraph text!';

    // Change the text color
    paragraph.style.color = 'crimson';

    // Change the ID (note: the variable still holds the old reference)
    paragraph.id = 'updatedParagraph';
}

// --- Modify the image ---
if (image) {
    // Change the image source
    image.src = 'https://example.com/new-image.jpg';

    // Change the alt text
    image.alt = 'A descriptive alt text for the new image';

    // Change dimensions
    image.width = 400;
    image.height = 300;

    // Change the title attribute (tooltip)
    image.title = 'Hover over me to see this tooltip!';
}