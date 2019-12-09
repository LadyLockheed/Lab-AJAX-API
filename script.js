let ourKey = '8pLR2'; // api måste alltid ha något av typ av key
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';
console.log('Script started');

window.addEventListener('load', () => {
    console.log('Window load');

// API key
let keyButton = document.querySelector('.key-button');
let keyFrame = document.querySelector('.key-frame');

keyButton.addEventListener('click', async event => {
   
    const urlKey = baseUrl + '?requestKey';
    const response = await fetch(urlKey);
    const data = await response.json(); // omvandlar json sträng till i detta fallet objekt
    
    keyFrame.innerHTML = data.key; // nyckeln skrivs ut på konsolen
    ourKey = data.key;
});




// Login in /view data
let loginButton = document.querySelector('.login-button');
let loginInput = document.querySelector('.login-input');
let fail = document.querySelector('.fail');

loginButton.addEventListener('click', async event => { 
    
    ourKey = loginInput.value;
    const urlView = baseUrl+ "?key=" + ourKey + "&op=select";
  
    let failMessageList=[];//Listan där felmeddelanden hamnar
    fail.innerHTML="";//tar bort allt innehåll i ul/fail, både text OCH li-tagg
    
   
    for (let i=0; i<5; i++) // när status = fail ska du göra detta fem gånger
    {
        const response = await fetch (urlView);
        const data = await response.json();
        
        if (data.status === "success"){
            
            for (i=0; i < data.data.length; i++){
               
                let viewAuthor= data.data[i].author;
                let viewTitle= data.data[i].title;
                let viewUpdated= data.data[i].updated;
                let viewId=data.data[i].id;
                console.log("Inne i loginfunktionen, detta är id:t :", viewId);
               
                createBook(viewTitle, viewAuthor, viewUpdated);             
            }
            break;
        }
        else{
            let failMessage=data.message;
            failMessageList.push(failMessage);
        } 
    }//Loop slut
    
    
   createFail(failMessageList)
  

    
});//Login button slut



// Add book
let buttonAddBook=document.querySelector(".add-Books-Button");
let bookList=document.querySelector(".book-List");
let inputTitle=document.querySelector("#input-title");
let inputAuthor=document.querySelector("#input-author");

buttonAddBook.addEventListener('click', async event =>{
    const urlAdd = baseUrl + "?key=" + ourKey + "&op=insert&title=" + inputTitle.value + "&author=" + inputAuthor.value;

    let failMessageList=[];//Listan där felmeddelanden hamnar
    fail.innerHTML="";//tar bort allt innehåll i ul/fail, både text OCH li-tagg
    
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
            createBook(inputTitle.value, inputAuthor.value, data.id);
            let savedId=data.id // id
            console.log("Vårt sparade id är: ", savedId);
            
            break;
        }
        else {
            console.log('Misslyckades att lägga in ny bok');
            let failMessage=data.message;
            failMessageList.push(failMessage);
        }   
        
        
    }//slut loop
   
    createFail(failMessageList)//Skriver ut felmeddelanden från addBook på sidan
   
    //Delete-book //!Ej klar, pågående arbete.
    let deleteButton=document.querySelector(".book-delete")
    let deleteBookId=document.getElementById("IdNumber");
   
    
          
        deleteButton.addEventListener("click",async event=>{
            console.log("klicket i deletebutton funkar");//!Den här funkar inte
            
            
            // const urlDelete = baseUrl + "?key=" + ourKey + "&op=delete&id=" + savedId; // skicka med id
            // const response = await fetch(urlDelete);
            // const data = await response.json();
            // console.log('Response från server när vi deletear', data);
            // console.log("Försökt få tag i ett specifikt id:",deleteBookId);
            
            // bookList.removeChild(deleteBookId);
            
            // deleteBook();


           
        });
           
   
        
});

//detta är funktionen för delete som sedan anropas när man klickar på deletebutton
    function deleteBook(id){
   let idNumberBook=document.querySelector("#",id)
    
    console.log("Inne i function deletebook");
    bookList.removeChild(bookList.book);
}




//Alla funktioner som är klara

function createNewDivImage(id){
    
    let newDivImage=document.createElement("div");
    newDivImage.className="book-image";
    let modifyElem=createNewButtonModify();
    newDivImage.appendChild(modifyElem);
    let deleteElem=createNewButtonDelete(id);
    newDivImage.appendChild(deleteElem);
    return newDivImage;

}
function createNewButtonDelete(id){
    let newButtonDelete=document.createElement("button");
    newButtonDelete.className="book-delete";
    let BookId=id;//behövs denna?
    return newButtonDelete
}


function createNewButtonModify(){
    let newButtonModify=document.createElement("button");
    newButtonModify.className="book-modify";
    return newButtonModify
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

function createBook(title, author,id){
    let bookDiv=document.createElement("div")
    let idNumber=id;
    bookDiv.className="book";
    bookDiv.id=idNumber;
    let imageElem=createNewDivImage(id);
    let titleElem = createNewDivTitle(title);
    let authorElem=createNewDivAuthor(author);
    //här skapas alla de tre elementen som ska ligga i 
    bookDiv.appendChild(imageElem);
    bookDiv.appendChild(titleElem);
    bookDiv.appendChild(authorElem);
    
    bookList.appendChild(bookDiv);
   
}

//Den här funktionen skapar li med felmeddelande
function createFail(failMessage){
    for (i=0; i<failMessage.length; i++){
        let newP=document.createElement("li");
        newP.className = "failMessage";
        newP.innerHTML=failMessage[i];
        fail.appendChild(newP);
    }
   }//slut createFail function
  



}); // Load



