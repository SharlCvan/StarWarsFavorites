
    
    //_____Declare list with favorites____

    var favoriteChars = [];

    var allChars = [];


     //Swapi code
     async function fillChars() {
        const url = 'https://swapi.dev/api/people/';

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

    fillChars();
        //Swapi code
    
    /*____Jedi and Sith link JS____*/

    /*Find the list and buttons to display and the link to be clicked*/
    let charracterList = document.querySelector('.list');

    let buttonPanel = document.querySelector('.button-panel');
    let addButton = document.querySelector('.add-button');
    let removeButton = document.querySelector('.remove-button');
    let editButton = document.querySelector('.edit-button');

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

        addButton.style.cssText = 'display: none;';
        editButton.style.cssText = 'display: inline-block; width: 198px;'
        removeButton.style.cssText = 'display: inline-block; width: 198px;';
    });

    //View list with all chars if sith icon is clicked
    jediIcon[1].addEventListener('click', async () => {

        charracterList.classList = 'list-visible';
        buttonPanel.classList = 'button-panel';

        addButton.style.cssText = 'display: inline-block; width: 400px;';
        editButton.style.cssText = 'display: none;'
        removeButton.style.cssText = 'display: none;';

        let listOfCharracters = document.querySelector('.list-visible ul');

        while(listOfCharracters.hasChildNodes()) {
            listOfCharracters.removeChild(listOfCharracters.lastChild);
        }

        for(let i of allChars) {
            listOfCharracters.appendChild(i);
        }

    });



    /*____Star Wars link JS____*/

    let starWarsIcon = document.querySelector('a[href="#backstory"]');

    starWarsIcon.addEventListener('click', () => {
        charracterList.classList = 'list';
        buttonPanel.classList = 'button-panel-hidden';
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
               favoriteChars.push(i);
           }
       }

   })

   //___Remove Char from favorites event____

   removeButton.addEventListener('click', () => {
    for(let i of favoriteChars) {
        if(i.classList.contains('li-clicked')) {
            favoriteChars.pop(i);
        }
    }
   })

   //___Edit chars event______
