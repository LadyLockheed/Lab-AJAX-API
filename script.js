const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?requestKey';
console.log('Script started');

window.addEventListener('load', () => {
    console.log('Window load');
    // när vi trycker på knappen request till api server
    // ta hand om infon vi får tillbaka
    //visa datan på webbsidan
    // plocka ut key från objektet


let keyButton = document.querySelector('.key-button');
let keyFrame = document.querySelector('.key-frame');

keyButton.addEventListener('click', async event => {
    console.log('Click on key-button'); // async måste vara med om await används

const response = await fetch(url);
console.log('Got response from server', response); // måste gör om det till json (inte säker på att det går, annars måste den göras om)
const data = await response.json(); // omvandlar json sträng till i detta fallet objekt
console.log('JSON', data); 
console.log('key: ', data.key);

keyFrame.innerHTML = data.key; // nyckeln skrivs ut på konsolen



});


















}); // Load