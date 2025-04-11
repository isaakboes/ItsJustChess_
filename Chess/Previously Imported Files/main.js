
//game startup
createBoard(boardSizeX,boardSizeY);//creates the board as an 8x8 grid
setupBoard(0,0);//sets pieces on the board
generateDeck();//generates the deck

//setting up the title sequence \/ \/ \/

// var startUpLoop = setInterval(startUp,30);//runs the title screen

// var startupImage = getRandomInt(6);

// var display = titleImage.image3;//title screen display image
// var imageSizeX;//title screen display width
// var imageSizeY;//title screen display height
// var imageRatio;

// switch(startupImage){
//     default:
//     case 0:display = titleImage.image3;break;
//     case 1:display = titleImage.image1;break;
//     case 2:display = titleImage.image2;break;
//     case 3:display = titleImage.image3;break;
//     case 4:display = titleImage.image4;break;
//     case 5:display = titleImage.image5;break;

// }
// //end title sequence startup

// console.log(startupImage);
// console.log(display);


// function startUp(){//TODO: REMAKE
//     if(!mouseDown){
//         ctx.clearRect(0,0,canvas.width,canvas.height);

//         imageSizeX = display.width;
//         imageSizeY = display.height;
//         imageRatio = imageSizeX/imageSizeY;//setting the ratio of width to height

//         imageSizeY = canvas.height - titleImage.itsJustChess.height;
//         imageSizeX = imageSizeY * imageRatio;

//         ctx.drawImage(display,canvas.width/2 - imageSizeX/2,0,imageSizeX,imageSizeY);

//         ctx.drawImage(titleImage.creditsButton,canvas.width - titleImage.creditsButton.width,0,titleImage.creditsButton.width,titleImage.creditsButton.height);
//         ctx.drawImage(titleImage.itsJustChess,canvas.width/2 - titleImage.itsJustChess.width/2,canvas.height-titleImage.itsJustChess.height,titleImage.itsJustChess.width,titleImage.itsJustChess.height);
//     }else{
//         clearInterval(startUpLoop);//stops the startup loop
//         setInterval(main,30);//runs the main game loop every 30 ms
//     }
// }

setInterval(main,30);//runs the main game loop every 30 ms

function main(){//the main game loop, runs every 30 ms
    moveBoard(10);
    updateBoard();//updates the board's pieces and overall state
    drawBoard();//draws the board
    
    renderCards();

    runPromotionScreen();
    runSaveLoad();
    runMinesweeperStart();
}

/*<===============================(GAME FUNCTIONS)===============================>
    functions the game uses to run MORE DISC. SOON
  <==============================================================================>*/
function moveBoard(speed){
    tileSize += (key.num1 - key.num2) * 4;
    boardOffsetX += (key.a - key.d) * speed;
    boardOffsetY += (key.w - key.s) * speed;
} 

function setupBoard(offsetX,offsetY){
    //setting up pieces
board[1+offsetX][0+offsetY].piece = new Pawn("black");
board[1+offsetX][1+offsetY].piece = new Pawn("black");
board[1+offsetX][2+offsetY].piece = new Pawn("black");
board[1+offsetX][3+offsetY].piece = new Pawn("black");
board[1+offsetX][4+offsetY].piece = new Pawn("black");
board[1+offsetX][5+offsetY].piece = new Pawn("black");
board[1+offsetX][6+offsetY].piece = new Pawn("black");
board[1+offsetX][7+offsetY].piece = new Pawn("black");

board[0+offsetX][2+offsetY].piece = new Bishop("black");
board[0+offsetX][5+offsetY].piece = new Bishop("black");

board[0+offsetX][0+offsetY].piece = new Rook("black");
board[0+offsetX][7+offsetY].piece = new Rook("black");

board[0+offsetX][1+offsetY].piece = new Knight("black");
board[0+offsetX][6+offsetY].piece = new Knight("black");

board[0+offsetX][4+offsetY].piece = new King("black");
board[0+offsetX][3+offsetY].piece = new Queen("black");


//white side
board[6+offsetX][0+offsetY].piece = new Pawn("white");
board[6+offsetX][1+offsetY].piece = new Pawn("white");
board[6+offsetX][2+offsetY].piece = new Pawn("white");
board[6+offsetX][3+offsetY].piece = new Pawn("white");
board[6+offsetX][4+offsetY].piece = new Pawn("white");
board[6+offsetX][5+offsetY].piece = new Pawn("white");
board[6+offsetX][6+offsetY].piece = new Pawn("white");
board[6+offsetX][7+offsetY].piece = new Pawn("white");

board[7+offsetX][2+offsetY].piece = new Bishop("white");
board[7+offsetX][5+offsetY].piece = new Bishop("white");

board[7+offsetX][0+offsetY].piece = new Rook("white");
board[7+offsetX][7+offsetY].piece = new Rook("white");

board[7+offsetX][1+offsetY].piece = new Knight("white");
board[7+offsetX][6+offsetY].piece = new Knight("white");

board[7+offsetX][4+offsetY].piece = new King("white");
board[7+offsetX][3+offsetY].piece = new Queen("white");



}

function createBoard(sizeX,sizeY){//REW.
    board = [];//resets the board variable
    for(let y=0;y<sizeY;y++){
        board.push([]);
        for(let x=0;x<sizeX;x++){
            board[y].push(new Tile(null,0,false,0));//adding a new tile
            //console.log("("+x+" ,"+y+") => "+board[y][x]);
        }
            
    }
}

////ALL FUNCTIONS MARKED WITH A "//REW." ARE BEING REWRITTEN! \/ \/ \/

function markNonEnPassent(team){//finds all pawns marked for en passant that shouldn't be, and unmarks them
    for(let y=0;y<board.length;y++){
        for(let x=0;x<board[y].length;x++){
            if(board[y][x].piece instanceof Pawn){//iterates through the board marking pawns of the correct team as not abalible for en passent.
                if(board[y][x].piece.team == team){
                    board[y][x].piece.canBeTakenEnPassant = false;
                }
            }
        }
    }
}

function drawArrow(currentX, currentY, pastX, pastY){

    if (promotionScreenAcrive) return;

    //clearing arrows
    for(let y=0;y<board.length;y++){//unselecting all pieces when board is clicked
        for(let x=0;x<board[y].length;x++){//iterating through the board
            board[y][x].highlighted = false;//sets the selected/highlighted state of a tile to false
            
            if(board[y][x].arrow !== null){board[y][x].arrow = null}//unselect script
        }
    }

    //drawing arrows
    if(pastX !== null && pastY !== null && currentX !== null && currentY !== null ){//making sure the positions are clarified

        var yDistance = currentY - pastY;//gets the distance between the current and past piece location
        var xDistance = currentX - pastX;

        if (yDistance>0){
            for(var i = 0; i < Math.abs(yDistance); i++){
                board[currentY-i-1][pastX].arrow = arrow.connectorVertical;
            }
        }

        if (yDistance<0){
            for(var i = 0; i < Math.abs(yDistance); i++){
                board[currentY+i+1][pastX].arrow = arrow.connectorVertical;
            }
        }

        if (xDistance>0){
            for(var i = 0; i < Math.abs(xDistance); i++){
                if(currentX-i-1==pastX && yDistance < 0){//if at the end of the vertical draw
                    board[currentY][currentX-i-1].arrow = arrow.connectorLeftUp;
                }else if(currentX-i-1==pastX && yDistance > 0){
                    board[currentY][currentX-i-1].arrow = arrow.connectorLeftDown;
                }else{
                    board[currentY][currentX-i-1].arrow = arrow.connectorHorizontal;
                }
                
            }
        }

        if (xDistance<0){
            for(var i = 0; i < Math.abs(xDistance); i++){
                if(currentX+i+1==pastX && yDistance < 0){//if at the end of the vertical draw
                    board[currentY][currentX+i+1].arrow = arrow.connectorRightUp;
                }else if(currentX+i+1==pastX && yDistance > 0){
                    board[currentY][currentX+i+1].arrow = arrow.connectorRightDown;
                }else{
                    board[currentY][currentX+i+1].arrow = arrow.connectorHorizontal;
                }


                // if(currentX+i+1==pastX && yDistance != 0){//if at the end of the vertical draw
                //     board[currentY][currentX+i+1].arrow = arrow.connectorRightUp;
                // }else{
                //     board[currentY][currentX+i+1].arrow = arrow.connectorHorizontal;
                // }
                
            }
        }

        //adding arrow heads
        try{
            if(board[currentY][currentX+1].arrow == arrow.connectorHorizontal){
                board[currentY][currentX+1].arrow = arrow.right
            }
            if(board[currentY][currentX+1].arrow == arrow.connectorRightUp){
                board[currentY][currentX+1].arrow = arrow.upRight
            }
            if(board[currentY][currentX+1].arrow == arrow.connectorRightDown){
                board[currentY][currentX+1].arrow = arrow.downRight
            }
        }catch{/*do nothing*/}

        try{
            if(board[currentY][currentX-1].arrow == arrow.connectorHorizontal){
                board[currentY][currentX-1].arrow = arrow.left
            }
            if(board[currentY][currentX-1].arrow == arrow.connectorLeftUp){
                board[currentY][currentX-1].arrow = arrow.upLeft
            }
            if(board[currentY][currentX-1].arrow == arrow.connectorLeftDown){
                board[currentY][currentX-1].arrow = arrow.downLeft
            }
        }catch{/*do nothing*/}
        
        try{
            if(board[currentY+1][currentX].arrow == arrow.connectorVertical){
                board[currentY+1][currentX].arrow = arrow.down
            }
        }catch{/*do nothing*/}

        try{
            if(board[currentY-1][currentX].arrow == arrow.connectorVertical){
                board[currentY-1][currentX].arrow = arrow.up
            }
        }catch{/*do nothing*/}

    }
}

function unselectAll(clearMovable = false){
    for(let y=0;y<board.length;y++){//unselecting all pieces when board is clicked
        for(let x=0;x<board[y].length;x++){//iterating through the board
            board[y][x].highlighted = false;//sets the selected/highlighted state of a tile to false
            if(clearMovable){board[y][x].movable = false;}//sets the movable state of a tile to false
            if(board[y][x].piece !== null){board[y][x].piece.selected=false;}//unselect script
        }
    }
}

function takePiece(piece){//run actions when a piece is taken
    //draw card
}

function promotePawns(tileX,tileY){
    //premoting
    console.log("trying to promote")
    if(tileY == 0){//checking if a piece is at the end of the board
        console.log("yup, at the end of the board");

        if(board[tileY][tileX].piece.canPromote){//checking if the piece can be promoted
            promotionScreenAcrive = true;//opens the promotion screen
            canSelectPromotion = false;//forces the runPromotionScreen func. not allow a click immediatly
        }
        pieceToPromote[0] = tileX;//making tileX and tileY global, because I am lazy.
        pieceToPromote[1] = tileY;
    }
}

function runPromotionScreen(){//displays and utalizes the promotion screen
    if(promotionScreenAcrive){//if the promotion is active, run this.
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.globalAlpha = 1;

        var renderYOffset = 100;
        var renderSize = 150;
        var renderOffset = (canvas.width/2 - renderSize*5/2);

        if (!mouseDown) canSelectPromotion = true;//only allow the player to select if the mouse has raised

        ctx.fillStyle = highlightColor;
        ctx.globalAlpha = highlightAlpha;
        if(mouseX>=renderOffset && mouseX<5*renderSize + renderOffset){
            ctx.fillRect((Math.floor((mouseX-renderOffset)/renderSize)*renderSize)+renderOffset,renderYOffset,renderSize,renderSize)
            if(mouseDown && canSelectPromotion){
                console.log("test")
                switch(Math.floor((mouseX-renderOffset)/renderSize)){
                    default:return;
                    case 0: board[pieceToPromote[1]][pieceToPromote[0]].piece = new Queen(activeTeam);break;//promoting the piece
                    case 1: board[pieceToPromote[1]][pieceToPromote[0]].piece = new Knook(activeTeam);break;
                    case 2: board[pieceToPromote[1]][pieceToPromote[0]].piece = new Bishop(activeTeam);break;
                    case 3: board[pieceToPromote[1]][pieceToPromote[0]].piece = new Rook(activeTeam);break;
                    case 4: board[pieceToPromote[1]][pieceToPromote[0]].piece = new Knight(activeTeam);break;
                }
                promotionScreenAcrive = false;//allowing the game to progress
                passTurn();//passes the turn because that was skipped when this loop started
            }
        }
        ctx.globalAlpha = 1;

        if(activeTeam == "black"){
            ctx.drawImage(queen.black,renderSize+renderOffset,renderYOffset,renderSize,renderSize);
            ctx.drawImage(knook.black,(renderSize*2)+renderOffset,renderYOffset,renderSize,renderSize);
            ctx.drawImage(bishop.black,(renderSize*3)+renderOffset,renderYOffset,renderSize,renderSize);
            ctx.drawImage(rook.black,(renderSize*4)+renderOffset,renderYOffset,renderSize,renderSize);
            ctx.drawImage(knight.black,(renderSize*5)+renderOffset,renderYOffset,renderSize,renderSize);
        }

        if(activeTeam == "white"){
            ctx.drawImage(queen.white,renderOffset,renderYOffset,renderSize,renderSize);
            ctx.drawImage(knook.white,renderSize+renderOffset,renderYOffset,renderSize,renderSize);
            ctx.drawImage(bishop.white,(renderSize*2)+renderOffset,renderYOffset,renderSize,renderSize);
            ctx.drawImage(rook.white,(renderSize*3)+renderOffset,renderYOffset,renderSize,renderSize);
            ctx.drawImage(knight.white,(renderSize*4)+renderOffset,renderYOffset,renderSize,renderSize);
        }
        
    }
}

function passTurn(){
    //switching team
    canDraw = true;
    if(promotionScreenAcrive)return;//immediatly exit if the promotion menu is active
    
    if(activeTeam == "white"){
        activeTeam = "black";
    }else if(activeTeam == "black"){
        activeTeam = "white";
    }
    console.log(activeTeam);//logs active team

    markNonEnPassent(activeTeam);//marks pieces that shouldn't be able to be taken en passant as such

    boardCopy = [];//clearing the copy of the board
    
    

    
    for(var i=0;i<boardSizeY;i++){
        boardCopy.push([]);
        for(var j=0;j<boardSizeX;j++){
            boardCopy[i].push(board[boardSizeY-(i+1)][boardSizeX-(j+1)]);
            //console.log(boardCopy[j][i]);
            //sets the board copy to the opposite of position of all of the pieces on board
        }    
    }
    
    board = [];
    board = boardCopy;//setting the board to the rotated reconstruction


    

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
