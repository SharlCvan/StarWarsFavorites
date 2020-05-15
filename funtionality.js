   //____________Load charracters on page load______
    window.addEventListener('load', () => 
    {
        console.log('Gettin charracters from SWAPI...');
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

        console.log(`Page: ${i} added`);
    }
    let sithText = document.querySelector('.nav-sith-text');
        sithText.innerHTML = "<h2>ALL CHARRACTERS</h2>";
        console.log('All charracters loaded from SWAPI');
    }

     //_____function mapping planet to charracter_____

     async function charMaker(charracter) {
        let li = document.createElement('li');

        let url = `${charracter.homeworld}`;
        url = url.replace('http', 'https');

        const response = await fetch(url);
        const planetData = await response.json();

        let char = {
            name: charracter.name,
            planet: planetData.name
        }

        li.innerText = `${char.name}, ${char.planet}`;
        return li;
    }

    //______________Jedi icon click event_________________

    jediIcon[0].addEventListener('click', () => {

        console.log('Getting FAVORITE charracters');

        charracterList.classList = 'list-visible';
        buttonPanel.classList = 'button-panel';

        UpdateList();

        addButton.style.cssText = 'display: none;';
        searchButton.style.cssText ='display: none;';
        editButton.style.cssText = 'display: inline-block; width: 131px;'
        removeButton.style.cssText = 'display: inline-block; width: 131px;';
        insetButton.style.cssText = 'display: inline-block; width: 131px;';
        let searchArea = document.querySelector('.search-area');
        searchArea.classList.remove('search-area-visible');
    });

    //_________________Sith icon click event________________________

    jediIcon[1].addEventListener('click', async () => {

        console.log('Getting ALL charracters');

        let sithText = document.querySelector('.nav-sith-text');

        if(allChars.length < 80) {
            sithText.innerHTML = "<h2>LOADING...</h2>";
        }
        else {

        sithText.innerHTML = "<h2>ALL CHARRACTERS</h2>";

        charracterList.classList = 'list-visible';
        buttonPanel.classList = 'button-panel';

        addButton.style.cssText = 'display: inline-block; width: 198px;';
        searchButton.style.cssText = 'display: inline-block; width: 198px;';
        editButton.style.cssText = 'display: none;'
        removeButton.style.cssText = 'display: none;';
        insetButton.style.cssText = 'display: none;';

        let inputArea = document.querySelector('.input-area');
        inputArea.classList.remove('input-area-visible');

        let insertArea = document.querySelector('.input-area');
        insertArea.classList.remove('insert-area-visible');

        let listOfCharracters = document.querySelector('.list-visible ul');

        updateSwapiCharList();
    }

    });

    //________________Star Wars headline click event__________

    let starWarsIcon = document.querySelector('a[href="#backstory"]');

    starWarsIcon.addEventListener('click', () => {

        console.log('Displaying Star Wars intro text...');
        charracterList.classList = 'list';
        buttonPanel.classList = 'button-panel-hidden';
        let inputArea = document.querySelector('.input-area');
        inputArea.classList = 'input-area';
    });

    //____List members click event_____
 
    function liClick (clickedLi) {

        console.log('Element selected');
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
    console.log('Adding charracter...');

    for(let i of allChars) {

        if(i.classList.contains('li-clicked') && charInList(i.innerText)) {

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

   function charInList(charString) {

    for(let i of favoriteChars) {

        if(i.innerText.toUpperCase() === charString.toUpperCase()) {
            console.log('charracter ALREADY in list');
            return false;
        }
    }
    console.log('charracter ADDED');
    return true;
   }

   //_____________Remove Char from favorites event_________

   removeButton.addEventListener('click', () => {

    originalPlaceHolder();
    insetButton.style.cssText += 'background-color: grey;';
    editButton.style.cssText += 'background-color: grey;';
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
       
    originalPlaceHolder();
    insetButton.style.cssText += 'background-color: grey;';
    editButton.style.cssText += 'background-color: darkgrey;';
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

    let foundChar = false;

    if(e.keyCode === 13 && e.target.value && editName.value && inputArea.classList.contains('input-area-visible')) {

        let charracters = document.querySelectorAll('.list-visible > ul li');

        for(let i = 0; i < charracters.length; i++) {
            if(charracters[i].classList.contains('li-clicked')) {
                favoriteChars[i].innerText = `${editName.value}, ${event.target.value}`;
                foundChar = true;
            }
        }
        editName.value = '';
        editPlanet.value = '';
        originalPlaceHolder();
    }

    if(e.keyCode === 13 && !foundChar && inputArea.classList.contains('input-area-visible')) {

        editName.value = '';
        editPlanet.value = '';
        editName.placeholder = 'Pick charracter to edit';
        editPlanet.placeholder  = 'Pick Charracter to edit';
    }

   })


//_______________Insert button event_____________________

insetButton.addEventListener('click', () => {

    originalPlaceHolder();
    insetButton.style.cssText += 'background-color: darkgrey;';
    editButton.style.cssText += 'background-color: grey;';
    let insertArea = document.querySelector('.input-area');
    insertArea.classList.toggle('insert-area-visible');
    let inputArea = document.querySelector('.input-area');
    inputArea.classList.remove('input-area-visible');
})

//______________________Insert own charracter input event__________________Dubbelkolla så att den funkar

let insertPlanet = document.querySelector('.input-planet');

insertPlanet.addEventListener('keyup', (e) => {

 let insertName = document.querySelector('.input-name');
 let inputArea = document.querySelector('.input-area');

 if(e.keyCode === 13 && e.target.value && insertName.value && inputArea.classList.contains('insert-area-visible') && charInList(`${insertName.value}, ${e.target.value}`)) {

     let insertChar = document.createElement('li');
     insertChar.innerText = `${insertName.value}, ${e.target.value}`;

     insertChar.addEventListener('click', (event) => {
        liClick(event.target)
        });

    favoriteChars.push(insertChar);
    insertName.value = '';
    insertPlanet.value = '';
    originalPlaceHolder();
 }
 else if(e.keyCode === 13 && inputArea.classList.contains('insert-area-visible')) {
    insertName.value = '';
    insertPlanet.value = '';
    insertName.placeholder = 'Already in list';
    insertPlanet.placeholder = 'Already in list';
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

    let searchArea = document.querySelector('.search-area');

    if(e.keyCode === 13 && e.target.value && searchArea.classList.contains('search-area-visible')) {

        for(let i = 0; i < charracters.length; i++) {

            let stringName = ` ${charracters[i].innerText}`;
    
            if(!stringName.toUpperCase().includes(` ${e.target.value.toUpperCase()}`)) {
                charracterList.removeChild(charracters[i]);
            }
        }
        nameSearch.value = '';
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

function originalPlaceHolder() {
    let insertPlanet = document.querySelector('.input-planet');
    let insertName = document.querySelector('.input-name');
    insertName.placeholder = 'Name';
    insertPlanet.placeholder = 'Planet';
    insertName.value = '';
    insertPlanet.value = '';
}
