const canvas = document.getElementById("canv");//sets the canvas
const ctx = canvas.getContext('2d');//sets the context of the canvas
ctx.globalAlpha = 1;//sets the alpha to 1 (this is default)

const pageWidth = window.innerWidth;//finds the window width
const pageHeight = window.innerHeight-5;//finds the window height
canvas.width = pageWidth;//sets canvas width to page width
canvas.height = pageHeight;//sets canvas height to page height

var cardIndex = 0;//the card the deck is on
var board = [];//declares the board variable as an array
var boardCopy = [];//used for flipping the board
var boardSize = 8;//declares the size of the board
var boardSizeX = 8;
var boardSizeY = 8;
var tileSize = 90;//size of each tile of the board in px
var boardOffsetX = 30;//the offset of the board from the sides of the screen
var boardOffsetY = 20;
var highlightAlpha = 0.4;//the transparency of the highlight color
var highlightColor = "#228B22";//the highlight color
var selectedPiece = null;//the coordenates of the the selected piece
var activeTeam = "white";//what team is currently active
var canSelect = true;//can the player select? (so the player dosen't select stuff every tick)
var canSelectPromotion = false;//can the player select on the promotion screen?
var promotionScreenAcrive = false;//if the promotion screen active?
var pieceToPromote = [];//the coords of the piece to promote
var deck = [];//the deck of cards
var currentCard = null;//the current title of the card
var pastCard = null;//the past title of the card
var minesweeperStarted = false;//is the game of minesweeper started
var rightMouseLast = false;//??
var mineChaining = false;

//setting up the board
/**
 * @param {Piece} piece The piece to store in the tile
 * @param {int} damage Number of times a player has damaged a tile to start minesweeper
 * @param {boolean} isMine whether or not a tile is a mine. This starts as false for all tiles until mines are generated when minesweeper starts
 * @param {int} nearbyMines
 * @param {boolean} highlighted
 */
class Tile {//the tile class, stores information about each tile.
    constructor(piece=null,damage=0,isMine=false,nearbyMines=0,highlighted=false){//setting constructor values
        this.piece = piece;//what piece is on the tile
        this.damage = damage;//the damage done to the tile (for starting minesweeper)
        this.isMine = isMine;//whether the piece is a mine or not
        this.nearbyMines = nearbyMines;//nearby mines, probably not going to be used
        this.discovered = false;//Whether the tile has been discovered for minesweeper
        this.exploded = false; //If the tiles should render as exploded. When a mine explodes the 8 surrounding tiles also are exploded
        this.skipPropagation = false;
        this.highlighted=highlighted;//whether the piece is highlighted or not
        this.movable = false;//whether the tile is an avalible move
        this.arrow = null;//what arrow segment, if any, is stored here.
        this.color = "#000000"//the color of the tile
    }
}
class Piece {//the piece class, stores information about the piece
    constructor(team){
        this.team = team;//the team of the piece
        this.selected = false;//whether the piece is selected or not
        this.canTakeOwnPawns = false;//whether the piece can take its team's pawns (for sacrificial bishop religions)
        this.moves = [];//the moves the piece can make
        this.sprite;//the image the piece uses
        this.canPromote = false;//can the piece promote
    }
}

class Move {//the move class
    constructor(repeated = false, x = 0, y = 0, canTake = true, mustTake = false){
        this.repeated = repeated;//linear board-crossing moves as used by the queen, bishop, and rook (and knook).
        //this argument means the move will be repeated until another piece is taken (if allowed).
        this.x = x;
        this.y = y;
        this.canTake = canTake;
        this.mustTake = mustTake;
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
}
class RandomMove extends Move{
    constructor(){
        super();
    }
    getX(){
        return getRandomInt(board[0].size-1);
    }
    getY(){
        return getRandomInt(board.size-1);
    }
    
}


class Pawn extends Piece {
    constructor(team){
        super(team);//isaak needs to remember this.
        this.canMoveDouble = true;
        this.canBeTakenEnPassant = false;//used for en passant
        this.moves = [
            new Move(false, 0, -1, false),
            new Move(false, 1, -1, true, true),
            new Move(false, -1, -1, true, true),

        ];
        switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
            default:
            case "white":this.sprite = pawn.white; break;
            case "black":this.sprite = pawn.black; break;
        }
        this.canPromote = true;
    }
}

class Bishop extends Piece {
    constructor(team){
        super(team);
        this.moves = [
            new Move(true,1,1),
            new Move(true,1,-1),
            new Move(true,-1,1),
            new Move(true,-1,-1)
        ];
        switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
            default:
            case "white":this.sprite = bishop.white; break;
            case "black":this.sprite = bishop.black; break;
        };
    }
}
class Rook extends Piece {
    constructor(team){
        super(team);
        this.moves = [
            new Move(true,1,0),
            new Move(true,-1,0),
            new Move(true,0,1),
            new Move(true,0,-1)
        ];
        switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
            default:
            case "white":this.sprite = rook.white; break;
            case "black":this.sprite = rook.black; break;
        };
    }
}
class Knight extends Piece {
    constructor(team){
        super(team);
        this.moves = [
            new Move(false,1,2),
            new Move(false,-1,2),
            new Move(false,1,-2),
            new Move(false,-1,-2),

            new Move(false,2,1),
            new Move(false,2,-1),
            new Move(false,-2,1),
            new Move(false,-2,-1)
        ];
        switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
            default:
            case "white":this.sprite = knight.white; break;
            case "black":this.sprite = knight.black; break;
        };
    }
}
class Queen extends Piece {//TODO replace
    constructor(team){
        super(team);
        this.moves = [
            new Move(true,1,0),
            new Move(true,-1,0),
            new Move(true,0,1),
            new Move(true,0,-1),

            new Move(true,1,1),
            new Move(true,1,-1),
            new Move(true,-1,1),
            new Move(true,-1,-1)
        ];
        
        switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
            default:
            case "white":this.sprite = queen.white; break;
            case "black":this.sprite = queen.black; break;
        };
    }
}
class Knook extends Piece {
    constructor(team){
        super(team);
        this.moves = [
            new Move(false,1,2),
            new Move(false,-1,2),
            new Move(false,1,-2),
            new Move(false,-1,-2),

            new Move(false,2,1),
            new Move(false,2,-1),
            new Move(false,-2,1),
            new Move(false,-2,-1),

            new Move(true,1,0),
            new Move(true,-1,0),
            new Move(true,0,1),
            new Move(true,0,-1)
        ];
        
        switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
            default:
            case "white":this.sprite = knook.white; break;
            case "black":this.sprite = knook.black; break;
        }
    }
}
class King extends Piece {
    constructor(team){
        super(team);
        this.canCastle = true;
        this.moves = [
            new Move(false,-1,-1),
            new Move(false,-1,0),
            new Move(false,-1,1),
            new Move(false,0,-1),

            new Move(false,0,1),
            new Move(false,1,-1),
            new Move(false,1,0),
            new Move(false,1,1),
        ];
        switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
            default:
            case "white":this.sprite = king.white; break;
            case "black":this.sprite = king.black; break;
        };
    }    
}
class Goose extends  Piece {
    constructor(team){
        super(team);
        this.moves.push(King.moves);
        // switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
        //     default:
        //     case "white":this.sprite = goose.white; break;
        //     case "black":this.sprite = goose.black; break;
        // }
    }
}
class Stupid extends Piece {
    constructor(team){
        super(team);
        this.moves = [
            new RandomMove()
        ];
        // switch(this.team){//there's a better way to do this using inline functions, but internet isn't working so I used switch.
        //     default:
        //     case "white":this.sprite = stupid.white; break;
        //     case "black":this.sprite = stupid.black; break;
        // };
    }
}

class Card {
    constructor(){

    }
    
}
