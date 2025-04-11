function drawCard(){
    
}

function generateDeck(){
    //generating the main deck
    var deckSize = 100;
    var specialCardsAmount = 0;

    for(var i = 0; i<deckSize-specialCardsAmount; i++){
        deck.push(new Card(getRandomInt(500)))
    }
}

function renderCards(){

}

