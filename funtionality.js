
    window.addEventListener('load', () => 
    {
        fillChars();
    })


    //_____Declare list with favorites____

    var favoriteChars = [];

    var allChars = [];

    //Scroll to star wars text 

    let view = document.querySelector('#backstory');
    view.scrollIntoView({behavior: "smooth"});

     //Swapi code
     async function fillChars() {

        for(let i = 1; i < 10; i++) {
        const url = `https://swapi.dev/api/people/?page=${i}`;

        const response = await fetch(url);
        const charracterData = await response.json();

        console.log('()',charracterData.results);

        for(let i of charracterData.results) {
            let charracter = await charMaker(i);
            charracter.addEventListener('click', (event) => {
                liClick(event.target)
            });
            allChars.push(charracter);
        }
    }
    let sithText = document.querySelector('.nav-sith-text');
        sithText.innerHTML = "<h2>ALL CHARRACTERS</h2>";
    }

    //fillChars();
        //Swapi code
    
    /*____Jedi and Sith link JS____*/

    /*Find the list and buttons to display and the link to be clicked*/
    let charracterList = document.querySelector('.list');

    let buttonPanel = document.querySelector('.button-panel');
    let addButton = document.querySelector('.add-button');
    let removeButton = document.querySelector('.remove-button');
    let editButton = document.querySelector('.edit-button');
    let insetButton = document.querySelector('.insert-button');

    let jediIcon = document.querySelectorAll('a[href="#list-section"]');
    
    //View user list if jedi icon is clicked
    jediIcon[0].addEventListener('click', () => {

        charracterList.classList = 'list-visible';
        buttonPanel.classList = 'button-panel';

        let listOfCharracters = document.querySelector('.list-visible ul');

        while(listOfCharracters.hasChildNodes()) {
            listOfCharracters.removeChild(listOfCharracters.lastChild);
        }

        for(let i of favoriteChars) {
            listOfCharracters.appendChild(i);
        }

        for(let i of allChars) {
            if(i.classList.contains('li-clicked')) {
                i.classList.toggle('li-clicked');
            }

        }

        addButton.style.cssText = 'display: none;';
        editButton.style.cssText = 'display: inline-block; width: 120px;'
        removeButton.style.cssText = 'display: inline-block; width: 120px;';
        insetButton.style.cssText = 'display: inline-block; width: 120px;';
    });

    //View list with all chars if sith icon is clicked
    jediIcon[1].addEventListener('click', async () => {

        let sithText = document.querySelector('.nav-sith-text');

        if(allChars.length < 80) {
            sithText.innerHTML = "<h2>LOADING...</h2>";
        }
        else {

        sithText.innerHTML = "<h2>ALL CHARRACTERS</h2>";

        charracterList.classList = 'list-visible';
        buttonPanel.classList = 'button-panel';

        addButton.style.cssText = 'display: inline-block; width: 400px;';
        editButton.style.cssText = 'display: none;'
        removeButton.style.cssText = 'display: none;';
        insetButton.style.cssText = 'display: none;';

        let inputArea = document.querySelector('.input-area');
        inputArea.classList.remove('input-area-visible');

        let listOfCharracters = document.querySelector('.list-visible ul');

        while(listOfCharracters.hasChildNodes()) {
            listOfCharracters.removeChild(listOfCharracters.lastChild);
        }

        for(let i of allChars) {
            listOfCharracters.appendChild(i);
        }

        for(let i of favoriteChars) {
            if(i.classList.contains('li-clicked')) {
                i.classList.toggle('li-clicked');
            }

        }
    }

    });



    /*____Star Wars link JS____*/

    let starWarsIcon = document.querySelector('a[href="#backstory"]');

    starWarsIcon.addEventListener('click', () => {
        charracterList.classList = 'list';
        buttonPanel.classList = 'button-panel-hidden';
        let inputArea = document.querySelector('.input-area');
        inputArea.classList = 'input-area';
    });



    //_____function mapping planet to charracter_____

    async function charMaker(charracter) {
        let li = document.createElement('li');

        console.log(charracter.homeworld);

        const url = `${charracter.homeworld}`;
        const response = await fetch(url);
        const planetData = await response.json();

        console.log(planetData.name);

        let char = {
            name: charracter.name,
            planet: planetData.name
        }

        li.innerText = `${char.name}, ${char.planet}`;
        return li;
    }


    //____List members click event_____
 
    
    function liClick (clickedLi) {

        let listLi = document.querySelectorAll('.list-visible > ul li');
    
        for(let j = 0; j < listLi.length; j++) {
            if(listLi[j].classList.contains('li-clicked')) {
                listLi[j].classList.toggle('li-clicked');
            }
        }      
        clickedLi.classList.toggle('li-clicked');      
    }  

     
   //___add char to favorites event____

   addButton.addEventListener('click', () => {

       for(let i of allChars) {
           if(i.classList.contains('li-clicked')) {
               let favChar = document.createElement('li');
               favChar.innerText = i.innerText;

               favChar.addEventListener('click', (event) => {
                liClick(event.target)
                });
               
               favoriteChars.push(favChar);
               i.classList.toggle('li-clicked');
           }
       }

   })

   //___Remove Char from favorites event____

   removeButton.addEventListener('click', () => {
       //Hides edit input fields
    let inputArea = document.querySelector('.input-area');
    inputArea.classList.remove('input-area-visible');

    let insertArea = document.querySelector('.input-area');
    insertArea.classList.remove('insert-area-visible');

    //
    for(let i = 0; i < favoriteChars.length; i++) {        
        if(favoriteChars[i].classList.contains('li-clicked')) {
            favoriteChars.splice(i, 1);
        }
    }

    let listOfCharracters = document.querySelector('.list-visible ul');

    while(listOfCharracters.hasChildNodes()) {
        listOfCharracters.removeChild(listOfCharracters.lastChild);
    }

    for(let i of favoriteChars) {
        listOfCharracters.appendChild(i);
    }
   })

   //___Edit chars button event______
   editButton.addEventListener('click', () => {
       let inputArea = document.querySelector('.input-area');
       inputArea.classList.toggle('input-area-visible');

       let insertArea = document.querySelector('.input-area');
       insertArea.classList.remove('insert-area-visible');
       
   })

  //___Edit chars input event____
   let editName = document.querySelector('.input-name');
   let editPlanet = document.querySelector('.input-planet');

   let inputArea = document.querySelector('.input-area');

//    inputName.addEventListener('keypress', (event) => {

//    })
 
   editPlanet.addEventListener('keyup', (e) => {

    console.log('key was pressed');

    let nameInput = document.querySelector('.input-name');

    console.log(e.target.value);
    console.log(nameInput.value);

    if(e.keyCode === 13 && e.target.value && nameInput.value && inputArea.classList.contains('input-area-visible')) {

        console.log('enter was pressed');

        let charracters = document.querySelectorAll('.list-visible > ul li');

        for(let i = 0; i < charracters.length; i++) {
            if(charracters[i].classList.contains('li-clicked')) {
                favoriteChars[i].innerText = `${nameInput.value}, ${event.target.value}`;
            }
        }

        editPlanet.value = '';
        editName.value = '';

        let insertArea = document.querySelector('.input-area');
        insertArea.classList.toggle('input-area-visible');

    }

   })



//___Insert own charracter event____

insetButton.addEventListener('click', () => {
    let insertArea = document.querySelector('.input-area');
    insertArea.classList.toggle('insert-area-visible');

    let inputArea = document.querySelector('.input-area');
    inputArea.classList.remove('input-area-visible');
})

let insertName = document.querySelector('.input-name');
let insertPlanet = document.querySelector('.input-planet');

let insertArea = document.querySelector('.input-area');

insertPlanet.addEventListener('keyup', (e) => {

 console.log('key was pressed');

 let nameInsert = document.querySelector('.input-name');

 console.log(e.target.value);
 console.log(nameInsert.value);

 let insertArea = document.querySelector('.input-area');

 if(e.keyCode === 13 && e.target.value && nameInsert.value && insertArea.classList.contains('insert-area-visible')) {

     console.log('enter was pressed');

     let charracters = document.querySelectorAll('.list-visible > ul');
     
     let insertChar = document.createElement('li');
     insertChar.innerText = `${nameInsert.value}, ${e.target.value}`;

     insertChar.addEventListener('click', (event) => {
        liClick(event.target)
        });

     favoriteChars.push(insertChar);

    let insertArea = document.querySelector('.insert-area');
    insertArea.classList.toggle('insert-area-visible');

    insertName.value = '';
    insertPlanet.value = '';

 }

 let listOfCharracters = document.querySelector('.list-visible ul');

        while(listOfCharracters.hasChildNodes()) {
            listOfCharracters.removeChild(listOfCharracters.lastChild);
        }

        for(let i of favoriteChars) {
            listOfCharracters.appendChild(i);
        }

        for(let i of allChars) {
            if(i.classList.contains('li-clicked')) {
                i.classList.toggle('li-clicked');
            }

        }

})