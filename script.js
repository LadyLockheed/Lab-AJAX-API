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


// Login in /view data
let loginButton = document.querySelector('.login-button');
let loginInput = document.querySelector('.login-input');
let fail = document.querySelector('.fail');

loginButton.addEventListener('click', async event => { // function med klick händelser som triggar en annan funcktion i detta fallet skapar en bok
    ourKey = loginInput.value;
    const urlView = baseUrl+ "?key=" + ourKey + "&op=select";
  
    
    //TODO Fixa så att den skriver ut alla felmeddelanden och sen tar bort dom igen
//     console.log("typeof haschildnodes: " ,fail.hasChildNodes())
//  if(fail.hasChildNodes()){
//      console.log("Här är vi inne i ifsatsen där den ska ta bort li");
//      for (let i=0; i<5; i++){
//         fail.removeChild(fail.childNodes[0]);
//      }
        
     
    
//  }
    
    
    
  
    
    let count=1; 
    for (let i=0; i<5; i++) // när status = fail ska du göra detta fem gånger
    {
        const response = await fetch (urlView);
        const data = await response.json();
        console.log('respons från server login/view', data);
        console.log('här försöker vi för gång nummer', count);
        count++;
    
        if (data.status === "success"){
            
            for (i=0; i < data.data.length; i++){
                console.log("inne i loopjävlen");
                let viewAuthor= data.data[i].author;
                console.log("Author är: ",viewAuthor);
                let viewTitle= data.data[i].title;
                console.log("Title är: ",viewTitle);
                let viewUpdated= data.data[i].updated;
                console.log("Updated är: ",viewUpdated);
        
                    createBook(viewTitle, viewAuthor, viewUpdated);             
            }
            break;
        }
        else{
            let failMessage = data.message; 
            console.log('här är vårt fel meddelanden: ', failMessage); 

            let newFail = document.createElement('li');
            newFail.className = "failMessage";
            newFail.innerHTML = failMessage; 
            fail.appendChild(newFail);

            
        } 
    }
});

// Add book
let buttonAddBook=document.querySelector(".add-Books-Button");
let bookList=document.querySelector(".book-List");
let inputTitle=document.querySelector("#input-title");
let inputAuthor=document.querySelector("#input-author");

buttonAddBook.addEventListener('click', async event =>{
    const urlAdd = baseUrl + "?key=" + ourKey + "&op=insert&title=" + inputTitle.value + "&author=" + inputAuthor.value;
    
    let count1=1;
    for(let i=0; i<5; i++){
        const response = await fetch(urlAdd);
        console.log('Add book - Got response from server', response); 
        const data = await response.json();
        console.log('JSON Add book', data);
        console.log('räknar: ', count1++)

        if (data.status==="success"){
            console.log("Inne i if success")
            console.log("Bokens id: ", data.id);
            createBook(inputTitle.value, inputAuthor.value);
            break;
        }
        else {
            console.log('Misslyckades att lägga in ny bok');
        }        
    }

    //glöm ej att lägga in en riktig variabel i url strängen för att addera book
    //fixa så att login funkar och visar alla böcker man har sparat
    //gör rekursiv funktion som gör att man inte behöver klicka på add knappen flera gånger om error.
    //spara id från individuell bok att använda senare.
    // behöver gå igenom båda input elementen och seda skriva ut dem på consolen
    // status: success skapa bok object (crearebook();)
    // misslyckas upp till 5 gång - skriva ut det på sidan - status: error text försök igen
    // dolt id
    // removeChild()
    // modidy data
   
});


// Delete book
/* let id = data.id;  */


/* Delete data
Delete the information for a specific book in the database. Querystring parameters:

op=delete
key - an API key that identifies the request
id - identifies what book you want to remove
This request will output a JSON object of the following form if successful:

{
	"status": "success"
}  */


//Karins kod för att lägga till ett bokobjekt-------------

function createNewDivImage(){
    
    let newDivImage=document.createElement("div");
    newDivImage.className="book-image";
    let modifyElem=createNewDivModify();
    newDivImage.appendChild(modifyElem);
    let deleteElem=createNewDivDelete();
    newDivImage.appendChild(deleteElem);
    return newDivImage;

}
function createNewDivDelete(){
    let newDivDelete=document.createElement("div");
    newDivDelete.className="book-delete";
    return newDivDelete
}
function createNewDivModify(){
    let newDivModify=document.createElement("div");
    newDivModify.className="book-modify";
    return newDivModify
}

function createNewDivTitle(title){

    let newDivTitle=document.createElement("div");
    newDivTitle.className="book-title";
    newDivTitle.innerText="Title: " + title;
    return newDivTitle;
}

function createNewDivAuthor(author){
    
    let newDivAuthor=document.createElement("div");
    newDivAuthor.className="book-author";
    newDivAuthor.innerText="Author: " + author;
    return newDivAuthor;    
}

//Den här funktionen skapar hela boken inkl alla tre element som ligger i och appendar den till book-list
function createBook(title, author){
    let bookDiv=document.createElement("div")
    bookDiv.className="book";
    let imageElem=createNewDivImage();
    let titleElem = createNewDivTitle(title);
    let authorElem=createNewDivAuthor(author);
    //här skapas alla de tre elementen som ska ligga i 
    bookDiv.appendChild(imageElem);
    bookDiv.appendChild(titleElem);
    bookDiv.appendChild(authorElem);
    
    bookList.appendChild(bookDiv);
  
}
    
}); // Load