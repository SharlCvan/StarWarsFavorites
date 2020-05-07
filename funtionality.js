/*Under övningstiden ska ni skriva en webbapp som skickar ett request till
http://forverkliga.se/JavaScript/api/simple.php
När ni lyckats med det, skicka ?key=value med querystring. 
Då ska API:et returnera ett JavaScript-objekt som innehåller ett 
klockslag. (servern går tyvärr två timmar efter) Gör en knapp på 
webbsidan som hämtar aktuell tid varje gång man klickar på den, och 
visar för användaren.

Om ni hinner: skicka ?world med querystring. 
API:et returnerar en lista med data. Gör så att webbappen visar datan 
i läsbart format för användaren. (Ni kommer bli tvungna att skapa nya 
    HTML-element.)*/


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

        addButton.style.cssText = 'display: none;';
        editButton.style.cssText = 'display: inline-block; width: 198px;'
        removeButton.style.cssText = 'display: inline-block; width: 198px;';
    });

    //View list with all chars if sith icon is clicked
    jediIcon[1].addEventListener('click', () => {
        charracterList.classList = 'list-visible';
        buttonPanel.classList = 'button-panel';

        addButton.style.cssText = 'display: inline-block; width: 400px;';
        editButton.style.cssText = 'display: none;'
        removeButton.style.cssText = 'display: none;';
    });


    /*____Star Wars link JS____*/

    let starWarsIcon = document.querySelector('a[href="#backstory"]');

    starWarsIcon.addEventListener('click', () => {
        charracterList.classList = 'list';
        buttonPanel.classList = 'button-panel-hidden';
    });


    //____List members click event_____

    let listLi = document.querySelectorAll('.list-visible li');

    for(let i = 0; i < listLi.length; i++) {

        listLi[i].addEventListener('click', (event) => {

            // for(let j = 0; j < listLi.length; j++) {
            //     if(listLi[i].classList.contains('li-clicked')) {
            //         listLi[i].classList.remove('li-clicked');
            //     }
            // }
            listLi[i].classList.toggle('li-clicked');
        })
    }


