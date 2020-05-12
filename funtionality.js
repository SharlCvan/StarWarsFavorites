   //____________Load charracters on page load______
    window.addEventListener('load', () => 
    {
        fillChars();
        let view = document.querySelector('#backstory');
        view.scrollIntoView({behavior: "smooth"});
    })


    //_____Declare all lists, buttons and links on the page____

    var favoriteChars = [];
    var allChars = [];    

    let charracterList = document.querySelector('.list');
    let buttonPanel = document.querySelector('.button-panel');
    let addButton = document.querySelector('.add-button');
    let removeButton = document.querySelector('.remove-button');
    let editButton = document.querySelector('.edit-button');
    let insetButton = document.querySelector('.insert-button');
    let searchButton = document.querySelector('.search-button');
   
    let jediIcon = document.querySelectorAll('a[href="#list-section"]');

     //____________Get charracters from SWAPI function__________

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

    //______________Jedi icon click event_________________

    jediIcon[0].addEventListener('click', () => {

        charracterList.classList = 'list-visible';
        buttonPanel.classList = 'button-panel';

        UpdateList();

        addButton.style.cssText = 'display: none;';
        searchButton.style.cssText ='display: none;';
        editButton.style.cssText = 'display: inline-block; width: 120px;'
        removeButton.style.cssText = 'display: inline-block; width: 120px;';
        insetButton.style.cssText = 'display: inline-block; width: 120px;';
        let searchArea = document.querySelector('.search-area');
        searchArea.classList.remove('search-area-visible');
    });

    //_________________Sith icon click event________________________

    jediIcon[1].addEventListener('click', async () => {

        let sithText = document.querySelector('.nav-sith-text');

        if(allChars.length < 80) {
            sithText.innerHTML = "<h2>LOADING...</h2>";
        }
        else {

        sithText.innerHTML = "<h2>ALL CHARRACTERS</h2>";

        charracterList.classList = 'list-visible';
        buttonPanel.classList = 'button-panel';

        addButton.style.cssText = 'display: inline-block; width: 199px;';
        searchButton.style.cssText = 'display: inline-block; width: 199px;';
        editButton.style.cssText = 'display: none;'
        removeButton.style.cssText = 'display: none;';
        insetButton.style.cssText = 'display: none;';

        let inputArea = document.querySelector('.input-area');
        inputArea.classList.remove('input-area-visible');

        let listOfCharracters = document.querySelector('.list-visible ul');

        // while(listOfCharracters.hasChildNodes()) {
        //     listOfCharracters.removeChild(listOfCharracters.lastChild);
        // }

        // for(let i of allChars) {
        //     listOfCharracters.appendChild(i);
        // }

        // for(let i of favoriteChars) {
        //     if(i.classList.contains('li-clicked')) {
        //         i.classList.toggle('li-clicked');
        //     }

        // }

        updateSwapiCharList();
    }

    });

    //________________Star Wars headline click event__________

    let starWarsIcon = document.querySelector('a[href="#backstory"]');

    starWarsIcon.addEventListener('click', () => {
        charracterList.classList = 'list';
        buttonPanel.classList = 'button-panel-hidden';
        let inputArea = document.querySelector('.input-area');
        inputArea.classList = 'input-area';
    });

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

   //_____________Remove Char from favorites event_________

   removeButton.addEventListener('click', () => {
    let inputArea = document.querySelector('.input-area');
    inputArea.classList.remove('input-area-visible');

    let insertArea = document.querySelector('.input-area');
    insertArea.classList.remove('insert-area-visible');

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

   //___________________Edit chars button event_______________________
   editButton.addEventListener('click', () => {
       let inputArea = document.querySelector('.input-area');
       inputArea.classList.toggle('input-area-visible');

       let insertArea = document.querySelector('.input-area');
       insertArea.classList.remove('insert-area-visible');
       
   })

  //_____________________Edit chars input event_______________________

   let editName = document.querySelector('.input-name');
   let editPlanet = document.querySelector('.input-planet');

   let inputArea = document.querySelector('.input-area');
 
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


//_______________Insert button event_____________________

insetButton.addEventListener('click', () => {
    let insertArea = document.querySelector('.input-area');
    insertArea.classList.toggle('insert-area-visible');

    let inputArea = document.querySelector('.input-area');
    inputArea.classList.remove('input-area-visible');
})

//______________________Insert own charracter input event__________________

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

 UpdateList();

})

//_____________Search button event_____________

searchButton.addEventListener('click', () => {
    let searchArea = document.querySelector('.search-area');
    searchArea.classList.toggle('search-area-visible');
});

//______________Search input event on charracters name_________________

let nameSearch = document.querySelector('.input-search');

nameSearch.addEventListener('keyup', (e) => {

    let charracters = document.querySelectorAll('.list-visible > ul li');
    let charracterList = document.querySelector('.list-visible > ul');

    console.log(charracters.length);

    let searchArea = document.querySelector('.search-area');

    if(e.keyCode === 13 && e.target.value && searchArea.classList.contains('search-area-visible')) {

        for(let i = 0; i < charracters.length; i++) {

            let stringName = charracters[i].innerText;

            console.log(stringName);

            let charName = stringName.split(', ');

            console.log(charName);

            console.log(e.target.value);
    
            if(!charName[0].toUpperCase().includes(e.target.value.toUpperCase())) {
                charracterList.removeChild(charracters[i]);
            }
        }
    }

    else if(searchArea.classList.contains('search-area-visible')) {

       updateSwapiCharList();
    }

    
})


function UpdateList() {
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
}

function updateSwapiCharList() {
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