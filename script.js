let ourKey = '8pLR2'; // api måste alltid ha något av typ av key
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
console.log('Script started');

window.addEventListener('load', () => {
    console.log('Window load');

// API key
let keyButton = document.querySelector('.key-button');
let keyFrame = document.querySelector('.key-frame');

keyButton.addEventListener('click', async event => {
    console.log('Click on key-button'); // async måste vara med om await används
    const urlKey = baseUrl + '?requestKey';
    const response = await fetch(urlKey);
    console.log('Key - Got response from server', response); // måste gör om det till json (inte säker på att det går, annars måste den göras om)
    const data = await response.json(); // omvandlar json sträng till i detta fallet objekt
    console.log('JSON key', data); 
    console.log('key: ', data.key);

keyFrame.innerHTML = data.key; // nyckeln skrivs ut på konsolen
ourKey = data.key;
});


// Login in 
let loginButton = document.querySelector('.login-button');
let loginInput = document.querySelector('.login-input');

    loginButton.addEventListener('click', async event =>{
    console.log('login button');
    console.log('login input', loginInput);
    ourKey = loginInput.value;
    console.log('new key', ourKey);
});
  


// Add book
let addBooksButton = document.querySelector('.add-Books-Button');
let inputTitle = document.querySelector('.input-title');
let inputAuthor = document.querySelector('.input-author');


addBooksButton.addEventListener('click', async event =>{
    const urlAdd = baseUrl + '?key=' + ourKey + '&op=insert&title=variabel&author=variabel';
    const response = await fetch(urlAdd);
    console.log('Add book - Got response from server', response); 
    const data = await response.json();
    console.log('JSON Add book', data);
    console.log('User input' + inputTitle.value + inputAuthor.value); 
    
    // behöver gå igenom båda input elementen och seda skriva ut dem på consolen
    // status: success skapa bok object (crearebook();)
    // misslyckas upp till 5 gång - skriva ut det på sidan - status: error text försök igen
   
});




}); // Load