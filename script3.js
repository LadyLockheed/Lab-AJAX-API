let ourKey = '8pLR2'; // api måste alltid ha något av typ av key
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php';


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
    
    let failCount=0;
    for (let i=0; i<5; i++) // när status = fail ska du göra detta fem gånger
    {
        const response = await fetch (urlView);
        const data = await response.json();
        
        if (data.status === "success"){
            loginButton.innerHTML="Welcome!";   
            loginButton.disabled="disabled";

            for (i=0; i < data.data.length; i++){
               
                let viewAuthor= data.data[i].author;
                let viewTitle= data.data[i].title;
                let viewId=data.data[i].id;
                console.log("Inne i loginfunktionen, detta är id:t :", viewId);
                
                createBook(viewTitle, viewAuthor, viewId); 
                        
            }
            break;
        }
        else{
            let failMessage=data.message;
            failMessageList.push(failMessage);
            failCount++;
            
            if(failCount===5){//om det misslyckas helt med att lägga in en ny bok händer detta
                loginButton.innerHTML="Failed, try again";
                
            }
        } 
    }//Loop slut
    
    
   createFail(failMessageList)
   
});// Login button slut



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
    let failCount=0;
    for(let i=0; i<5; i++){
        
       const response = await fetch(urlAdd);
        console.log('Add book - Got response from server', response); 
        const data = await response.json();
        console.log('JSON Add book', data);
        console.log('räknar: ', count1++)

        if (data.status==="success"){
           
            console.log("Bokens id: ", data.id);
            createBook(inputTitle.value, inputAuthor.value, data.id);
            let savedId=data.id 
            buttonAddBook.innerHTML="Add book";
            console.log("Vårt sparade id är: ", savedId);
            
            break;
        }
        else {
            console.log('Misslyckades att lägga in ny bok');
            let failMessage=data.message;
            failMessageList.push(failMessage);
            failCount++;
            
            if(failCount===5){ // om det misslyckas helt med att lägga in en ny bok händer detta
                buttonAddBook.innerHTML="Failed, try again";
              
            }
            
        }   
        
        
    }//slut loop
   
    createFail(failMessageList) // Skriver ut felmeddelanden från addBook på sidan
   
    
});

// Modify book - save button
async function modifyBook(){
 /*   const urlModify = baseUrl + '?key=' + ourKey + '&op=update&id=' + id + '&title=' + newTitle.value + '&author=' + newAuthor.value;  */

    // create input
    // create button ok/save
    //remove child title/author
    //append child


    console.log('I modify funktionen', inputAuthor.value, inputTitle.value);
    
}

// Modify book
async function modifyBook(title, author, id, saveButton, parent, modifyButton)
{
    const urlModify = baseUrl + "?key=" + ourKey + "&op=update&id=" + id + "&title=" + title + "&author=" + author;

        let failMessageList=[];
        fail.innerHTML="";
        let failCount=0;
        
        for(let i=0; i<5; i++){
            
            const response = await fetch (urlModify);
            const data = await response.json();
            console.log('respone fråns erver save button', data);
            console.log(data.status);
    
            if (data.status==="success"){

                console.log('inne i if success');
                parent.removeChild(saveButton);
                modifyButton.disabled=false;
 
                break;
            }
            else {
                console.log('Misslyckades att save');
                let failMessage=data.message;
                failMessageList.push(failMessage);
                failCount++;
                
                if(failCount===5){//om det misslyckas helt med att lägga in en ny bok händer detta
                    saveButton.innerHTML="Failed, try again";
                  
                } //slut if failcount sats
            }  //slut else 
        }//slut forloop
       
        createFail(failMessageList);

};
    
// Fail message
function createFail(failMessage){
    for (i=0; i<failMessage.length; i++){
        let newP=document.createElement("li");
        newP.className = "failMessage";
        newP.innerHTML=failMessage[i];
        fail.appendChild(newP);
    }
} 

   
// Delete book
async function deleteBook(id){

const urlDelete = baseUrl + "?key=" + ourKey + "&op=delete&id=" + id; // skicka med id
let failMessageList=[]; //Listan där felmeddelanden hamnar
fail.innerHTML = ""; //tar bort allt innehåll i ul/fail, både text OCH li-tagg  
countFail=0;
for (let i=0; i<5; i++){
const response = await fetch(urlDelete);
const data = await response.json();
console.log('Response från server när vi deletear', data);
console.log("Statusen är: ", data.status);
let bookDiv=document.querySelector(".book")
    if (data.status==="success"){
        bookList.removeChild(bookDiv)
        break;
    }
    else{
        let failMessage=data.message;
        failMessageList.push(failMessage)
        countFail++
        //! Detta ändras när allt annat är klart
        //! if(countFail===5){
        //     newDivFail.className="fail-messdelete";
        //     newDivFail.innerHTML="Failed to remove book";
        // }
        

        }
    }
    
    createFail(failMessageList);
    
}

//CreateBook
function createBook(title, author,id){
   
    //Skapar parent/book
    let bookDiv=document.createElement("div")
    let idNumber=id;
    bookDiv.className="book";
    bookDiv.id=idNumber;

    //Skapar Title elementet
    let newDivTitle=document.createElement("div")
    newDivTitle.className="book-title";
    newDivTitle.innerText=title;

    //SKapar author element
    let newDivAuthor=document.createElement("div");
    newDivAuthor.className="book-author";
    newDivAuthor.innerText=author;

    //skapar image
    let newDivImage=document.createElement("div");
    newDivImage.className="book-image";

    //skapar modify button
    let newButtonModify=document.createElement("button");
    newButtonModify.className="book-modify";
    newButtonModify.addEventListener("click", async event=>{
    
        newButtonModify.disabled=true;
    
        //Savebutton skapas här efter man tryckt på modifyButton
        let saveButton = document.createElement('button');
        saveButton.className = 'saveButton';
        saveButton.innerHTML = "Save";
    
        saveButton.addEventListener('click', event =>{
            let changedTitle=newDivTitle.innerHTML;
            let changedAuthor=newDivAuthor.innerHTML;
            modifyBook(changedTitle, changedAuthor, id, saveButton, bookDiv,newButtonModify);
            console.log('click savebutton');
            newDivTitle.contentEditable="false";
            newDivAuthor.contentEditable="false";

        });//slut saveButton addeventlistener
    
        bookDiv.appendChild(saveButton);
    })//slut newbuttonModify adeventlistener

    //skapar focus på titel och författare när klickar på modify
    newButtonModify.addEventListener("focus", event=>{
  
       
        newDivTitle.contentEditable="true";
        newDivAuthor.contentEditable="true";
        newDivTitle.focus();
       
        
    })

    //skapar deletebutton med addeventlistner
    let newButtonDelete=document.createElement("button");
    newButtonDelete.className="book-delete";
    newButtonDelete.addEventListener("click", async event=>{
       deleteBook(id);
       
    })

    //Alla olika delar läggs ihop
    newDivImage.appendChild(newButtonModify);
    newDivImage.appendChild(newButtonDelete);
    bookDiv.appendChild(newDivImage);
    bookDiv.appendChild(newDivTitle);
    bookDiv.appendChild(newDivAuthor);
    bookList.appendChild(bookDiv);

}

  



}); // Load



