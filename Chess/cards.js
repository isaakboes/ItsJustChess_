function drawCard(){
    //console.log(deck[cardIndex])
    deck[cardIndex].cardFunction();
    currentCard = deck[cardIndex];
    cardIndex ++;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    var extraNice = false;

    if(extraNice){
        array[2+getRandomInt(5)] = new Card(10,"Kindness", "Your opponant is sad.^Give them a hug.");

    }
  
    return array;
  }

function generateDeck(){
    //generating the main deckd
    //var deckSize = 100;
    
    for(var i = 0; i < cards.length; i++){
        for(var l = 0; l < cards[i].weight; l++){
            deck.push(cards[i]);
        }
    }

    deck = shuffle(deck);
    // for(var i = 0; i<deckSize; i++){
    //     deck.push(new PieceCard(Knook));
    //     //deck.push(new Card(getRandomInt()));
    // }
}

function renderCards(){
    var sidebarWidth = 400;
    var cardYOffset = 400;
    var topCardOffset = 30;
    var cardOffset = 100;
    var cardScale = 0.6;//the scale of the card sprites, 1 is 100%
    var cardMargins = 50;

    ctx.fillStyle ="#000000"//sets the sidebar color to a transparent black
    ctx.globalAlpha = 0.7;
    ctx.fillRect(canvas.width - sidebarWidth,0,sidebarWidth,canvas.height);//draws the sidebar
    ctx.globalAlpha = 1;


    

    ctx.drawImage(card.front,canvas.width-sidebarWidth/2-(card.front.width*cardScale)/2,cardYOffset,card.front.width*cardScale,card.front.height*cardScale);//drawing the last card
    if(pastCard !== null){

        ctx.fillStyle = "#5c472d"
        ctx.font = "bold small-caps 32px serif"
        ctx.textAlign = 'center';
        ctx.fillText(pastCard.name,canvas.width-sidebarWidth/2,cardYOffset+cardMargins);

        ctx.font = "bold 16px serif"

        var text = "";
        var lineNumber = 0;
        var lineHeight = 15;

        for(let i = 0; i < pastCard.description.length; i++){
            if(pastCard.description[i] != "^"){// "^" is the new line character, because \n is hard to find.
                text += pastCard.description[i];
            }else{
                lineNumber ++;
                ctx.fillText(text,canvas.width-sidebarWidth/2,cardYOffset+cardMargins+100+(lineNumber*lineHeight));
                text = "";
            }
        }
        lineNumber ++;
        ctx.fillText(text,canvas.width-sidebarWidth/2,cardYOffset+cardMargins+100+(lineNumber*lineHeight));
        text = "";

    }
    //https://stackoverflow.com/questions/35245467/how-to-center-text-in-a-javascript-function
        
    ctx.drawImage(card.back,canvas.width-sidebarWidth/2-(card.back.width*cardScale)/2,topCardOffset,card.back.width*cardScale,card.back.height*cardScale);//drawing the deck

    if(mouseX>=canvas.width-sidebarWidth/2-(card.back.width*cardScale)/2&&mouseX<=(canvas.width-sidebarWidth/2-(card.back.width*cardScale)/2)+card.back.width*cardScale){
        if(mouseY>=topCardOffset&&mouseY<=topCardOffset+card.back.height*cardScale){
            if(canDraw&&mouseDown){
                drawCard();
                canDraw = false;
                cardAnimation = 0;//begins the animation
                //if the draw pile is clicked, start the animation.
            }
        } 
    }

    if(cardAnimation <= cardYOffset-topCardOffset && cardAnimation != -1){

        ctx.drawImage(card.front,canvas.width-sidebarWidth/2-(card.front.width*cardScale)/2,topCardOffset+cardAnimation,card.front.width*cardScale,card.front.height*cardScale);//drawing the last card
        
        ctx.fillStyle = "#5c472d"
        ctx.font = "bold small-caps 32px serif"
        ctx.textAlign = 'center';
        ctx.fillText(currentCard.name,canvas.width-sidebarWidth/2,cardAnimation+topCardOffset+cardMargins);

        ctx.font = "bold 16px serif"

        var text = "";
        var lineNumber = 0;
        var lineHeight = 15;

        for(let i = 0; i < currentCard.description.length; i++){
            if(currentCard.description[i] != "^"){// "^" is the new line character, because \n is hard to find.
                text += currentCard.description[i];
            }else{
                lineNumber ++;
                ctx.fillText(text,canvas.width-sidebarWidth/2,topCardOffset+cardAnimation+cardMargins+100+(lineNumber*lineHeight));
                text = "";
            }
        }
        lineNumber ++;
        ctx.fillText(text,canvas.width-sidebarWidth/2,topCardOffset+cardAnimation+cardMargins+100+(lineNumber*lineHeight));
        text = "";

        // ctx.drawImage(card.front,canvas.width-sidebarWidth/2-(card.front.width*cardScale)/2,topCardOffset+cardAnimation,card.front.width*cardScale,card.front.height*cardScale);//drawing the last card
        
        // ctx.fillStyle = "#5c472d"
        // ctx.font = "bold small-caps 32px serif"
        // ctx.textAlign = 'center';
        // ctx.fillText(currentCard.name,canvas.width-sidebarWidth/2,cardAnimation+topCardOffset+cardMargins);

        // ctx.font = "bold 16px serif"
        // ctx.fillText(currentCard.description,canvas.width-sidebarWidth/2,cardAnimation+topCardOffset+cardMargins+100);

        cardAnimation += 30 - cardAnimation/15;
        return;
    }


    if(cardAnimation != -1){

        cardAnimation = -1;
        //after animation plays
        pastCard = currentCard;
    }
}

function placeNew(piece,team){//places a piece on a random tile on the board
    console.log(team)
    unselectAll(true);
    try{
    var availableTiles = findOpenTiles();//lists available tiles and saves them to a variable
    var tileIndex = getRandomInt(availableTiles.length);
    
    board[availableTiles[tileIndex][1]][availableTiles[tileIndex][0]].piece = new piece(team);
    // board[availableTiles[tileIndex][1]][availableTiles[tileIndex][0]].piece.team = activeTeam;
    // board[availableTiles[tileIndex][1]][availableTiles[tileIndex][0]].piece.sprite = activeTeam;

    }catch{
        console.log("unable to place piece")
    }
}
/** A card object that can be inherited and drawn from a deck.
 * @param {int} weight Likelihood that a card will be drawn. Is liteally the number of times a card is in the deck
 * @param {string} name The name at the top of the card
 * @param {string} description The desctiption of the text
 */
class Card {
    constructor(weight, name, description){
        this.weight = weight;
        this.name = name;
        this.description = description;
    }
    cardFunction(){
    } 
}
//piss - Peter
/** An inherited subclass of Card. PieceCards will place a single piece at a random location on the board
 * @param {int} weight Likelihood that a card will be drawn. Is literally the number of times a card is in the deck
 * @param {string} name The name at the top of the card
 * @param {string} description The description of the text
 * @param {Piece} piece the piece to place
 */
class PieceCard extends Card{
    constructor(weight, name, description, piece, team = null){
        super(weight, name, description);
        this.piece = piece;
        this.team = team;
    }
    cardFunction(){
        // console.log(this.team)
        // this.team == null ? this.team = activeTeam : this.team = this.team;// if the team is set, keep it, otherwise, make it the default
        // placeNew(this.piece,this.team);
        // console.log(this.team)
        unselectAll(true);
        var piece = this.piece;

        try{
        var availableTiles = findOpenTiles();//lists available tiles and saves them to a variable
        var tileIndex = getRandomInt(availableTiles.length);

        if(this.team == null){
            board[availableTiles[tileIndex][1]][availableTiles[tileIndex][0]].piece = new piece(activeTeam);
        }else{
            board[availableTiles[tileIndex][1]][availableTiles[tileIndex][0]].piece = new piece(this.team);
        }
    
        
        // board[availableTiles[tileIndex][1]][availableTiles[tileIndex][0]].piece.team = activeTeam;
        // board[availableTiles[tileIndex][1]][availableTiles[tileIndex][0]].piece.sprite = activeTeam;

        }catch{
           console.log("unable to place piece")
        }

    }
}
// class EightPawns extends PieceCard{
//     constructor(){
//         super(2, "Tour de Force", "Gain 8 Pawns", Pawn);
//     }
//     cardFunction(){
//         for(var i = 0; i<8; i++){
//             placeNew(this.piece);
//         }
//     }
// }
class ManyPieceCard extends PieceCard{
    constructor(weight, name, description, piece, number){
        super(weight, name, description, piece);
        this.number = number;
        
    }
    cardFunction(){
        for(var i = 0; i<this.number; i++){
            placeNew(this.piece,activeTeam);
        }
    }
}
// class PushupCard extends Card{
//     constructor(){
//         super(10,"Pushups", "Do "+getRandomInt(10)+" pushups.^Then your opponent must do "+getRandomInt(10));
//     }
//     cardFunction(){
//         super.description = ("Do "+getRandomInt(10)+" pushups.^Then your opponent must do "+getRandomInt(10));
//     }
// }
/**
 * Iterates through the board and finds all tiles that contain the given piece of the given team. Then, one at random is removed
 */
class killPieceCard extends Card{
    constructor(weight, name, description, piece, isActiveTeam){
        super(weight,name,description);
        this.piece = piece;
        this.isActiveTeam = isActiveTeam;
    }
    cardFunction(){
        var team = (this.isActiveTeam)?activeTeam:inactiveTeam();
        var pieceLocations = [];
        for(var y = 0;y<board.length; y++){
            for(var x = 0; x<board[y].length; x++){
                if(board[y][x].piece instanceof this.piece && board[y][x].piece.team==team){
                    
                    pieceLocations.push([y,x]);
                }
            }
        }
        //console.log(pieceLocations)
        if(pieceLocations.length<1)return;
        var i = getRandomInt(pieceLocations.length);

        
        board[pieceLocations[i][0]][pieceLocations[i][1]].piece = null;

    }

}

class AddRowan extends Card{
    constructor(weight, name, description, piece, isActiveTeam){
        super(weight,name,description);
        this.piece = piece;
        this.isActiveTeam = isActiveTeam;
    }
    cardFunction(){
        var team = (this.isActiveTeam)?activeTeam:inactiveTeam();
        var pieceLocations = [];
        for(var y = 0;y<board.length; y++){
            for(var x = 0; x<board[y].length; x++){
                if(board[y][x].piece instanceof this.piece && board[y][x].piece.team==team){
                    
                    pieceLocations.push([y,x]);
                }
            }
        }
        //console.log(pieceLocations)
        if(pieceLocations.length<1)return;
        var i = getRandomInt(pieceLocations.length);

        
        board[pieceLocations[i][0]][pieceLocations[i][1]].piece = new Rowan(activeTeam);

    }

}

class killManyPieceCard extends killPieceCard{
    constructor(weight, name, description, piece, isActiveTeam, number){
        super(weight,name,description);
        this.piece = piece;
        this.isActiveTeam = isActiveTeam;
        this.number = number;
    }
    cardFunction(){
        for(var i = 0;i<this.number;i++){
            var team = (this.isActiveTeam)?activeTeam:inactiveTeam();
            var pieceLocations = [];
            for(var y = 0;y<board.length; y++){
                for(var x = 0; x<board[y].length; x++){
                    if(board[y][x].piece instanceof this.piece && board[y][x].piece.team==team){
                        
                        pieceLocations.push([y,x]);
                    }
                }
            }
        
        //console.log(pieceLocations)
        if(pieceLocations.length<1)return;
        var i = getRandomInt(pieceLocations.length);

        
        board[pieceLocations[i][0]][pieceLocations[i][1]].piece = null;
        }
    }
}

class Bomb extends Card{
    constructor(weight, name, description, radius){
        super(weight,name,description);
        this.radius = radius;

        this.x = getRandomInt(boardSizeX);
        this.y = getRandomInt(boardSizeY);
    }
    cardFunction(){

        this.x = getRandomInt(boardSizeX);
        this.y = getRandomInt(boardSizeY);
        for(var x = 0;x<this.radius;x++){
            for(var y = 0;y<this.radius; y++){
                if((this.x+x-Math.floor(this.radius/2)>=0&&this.x+x-Math.floor(this.radius/2)<boardSizeX)&&(this.y+y-Math.floor(this.radius/2)>=0&&this.y+y-Math.floor(this.radius/2)<boardSizeY)){//if the tile is on the board
                    console.log(this.radius);
                    console.log(this.x);
                    console.log(this.y);

                    board[this.y+y-Math.floor(this.radius/2)][this.x+x-Math.floor(this.radius/2)].piece = null;//deletes the contents of the tile

                    
                    board[this.y+y-Math.floor(this.radius/2)][this.x+x-Math.floor(this.radius/2)].color = "#353030";//changes the color of the tile

                    // var tileColor = board[this.y+y-1][this.x+x-Math.floor(this.radius/2)].color//getting the color of the tile
                    // var R = (10*tileColor[1])+tileColor[2];//getting the red value
                    // var G = (10*tileColor[3])+tileColor[4];//getting the green value
                    // var B = (10*tileColor[5])+tileColor[6];//getting the red value

                    // console.log(tileColor)
                    // R = R/2//darkening the colors where bombed
                    // G = G/2
                    // B = B/2

                    // console.log(R + ", " + G + ", " + B)
                    // console.log("'#"+R+G+B+"'")
                    
                }
                
            }
        
        }
    }
}//f for c teams toolbox

class Color extends Card{
    constructor(weight, name, description){
        super(weight,name,description);
    }
    cardFunction(){
        for(let y=0;y<board.length;y++){
            for(let x=0;x<board[y].length;x++){
                board[y][x].color = generateRandomColor();//changes tile color
            }
        }
    }
    
}

class GreenScreen extends Card{
    constructor(weight, name, description){
        super(weight,name,description);
    }
    cardFunction(){
        for(let y=0;y<board.length;y++){
            for(let x=0;x<board[y].length;x++){
                board[y][x].color = "#04F404";//changes tile color
            }
        }
    }
    
}
class TheFrench extends Card{
    constructor(weight, name, description){
        super(weight,name,description);
    }
    cardFunction(){
        for(let y=0;y<board.length;y++){
            for(let x=0;x<board[y].length;x++){
                switch(x%3){
                    case 1:
                        board[y][x].color = "#0050a4";//changes tile color
                    break;
                    case 2:
                        board[y][x].color = "#FFFFFF";//changes tile color
                    break;
                    case 0:
                        board[y][x].color = "#ef4135";//changes tile color
                    break;
                }
                
            }
        }
    }
    
}

class newBoardCard extends Card{
    constructor(weight, name, description, boardExpansionX, boardExpansionY){
        super(weight,name,description);
        this.boardExpansionX = boardExpansionX;
        this.boardExpansionY = boardExpansionY;

    }
    cardFunction(){
        boardSizeX += this.boardExpansionX;//adds tiles to the the board size
        boardSizeY += this.boardExpansionY;

        boardCopy = board;//set the board copy to the current board layout
        board = [];//resets the board variable
        for(let y=0;y<boardSizeY;y++){//generating a new board with new peramiters
            board.push([]);
            for(let x=0;x<boardSizeX;x++){
                board[y].push(new Tile(null,0,false,0));//adding a new tile
            }
                
        }
        minesweeperStarted = false;//resets minesweeper
        
        for(let y=0;y<boardCopy.length;y++){
            for(let x=0;x<boardCopy[y].length;x++){
                board[y+Math.floor(this.boardExpansionY/2)][x+Math.floor(this.boardExpansionX/2)] = boardCopy[y][x];//adds pieces back to the board
            }
        }

        var boardColors = ["#ffe6cc","#ae8c6b"];//declares the colors to use for board tiles
        for(let y=0;y<board.length;y++){
            for(let x=0;x<board[y].length;x++){
                board[y][x].color = boardColors[(x+y)%2];//changes tile color
            }
        }


    }
}