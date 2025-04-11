class TEST{
get sprite(){//unused sprite choosing script
        let img;
        switch(this.type){
            default:
                if(this.team == "white"){img=pawn.white}
                if(this.team == "black"){img=pawn.black}
                else{this.piece = pawn.white}
            break;
            case "bishop":
                if(this.team == "white"){img=bishop.white}
                if(this.team == "black"){img=bishop.black}
                else{this.piece = bishop.white}
            break;
            case "rook":
                if(this.team == "white"){img=rook.white}
                if(this.team == "black"){img=rook.black}
                else{this.piece = rook.white}
            break;
            case "knight":
                if(this.team == "white"){img=knight.white}
                if(this.team == "black"){img=knight.black}
                else{this.piece = knight.white}
            break;
            case "queen":
                if(this.team == "white"){img=queen.white}
                if(this.team == "black"){img=queen.black}
                else{this.piece = queen.white}
            break;
            case "king":
                if(this.team == "white"){img=king.white}
                if(this.team == "black"){img=king.black}
                else{this.piece = king.white}
            break;
        }

        return img;
    }
}

//white side
board[1][0].piece = new Piece("pawn","white");
board[1][1].piece = new Piece("pawn","white");
board[1][2].piece = new Piece("pawn","white");
board[1][3].piece = new Piece("pawn","white");
board[1][4].piece = new Piece("pawn","white");
board[1][5].piece = new Piece("pawn","white");
board[1][6].piece = new Piece("pawn","white");
board[1][7].piece = new Piece("pawn","white");

board[0][2].piece = new Piece("bishop","white");
board[0][5].piece = new Piece("bishop","white");

board[0][0].piece = new Piece("rook","white");
board[0][7].piece = new Piece("rook","white");

board[0][1].piece = new Piece("knight","white");
board[0][6].piece = new Piece("knight","white");

board[0][3].piece = new Piece("king","white");
board[0][4].piece = new Piece("queen","white");


//black side
board[6][0].piece = new Piece("pawn","black");
board[6][1].piece = new Piece("pawn","black");
board[6][2].piece = new Piece("pawn","black");
board[6][3].piece = new Piece("pawn","black");
board[6][4].piece = new Piece("pawn","black");
board[6][5].piece = new Piece("pawn","black");
board[6][6].piece = new Piece("pawn","black");
board[6][7].piece = new Piece("pawn","black");

board[7][2].piece = new Piece("bishop","black");
board[7][5].piece = new Piece("bishop","black");

board[7][0].piece = new Piece("rook","black");
board[7][7].piece = new Piece("rook","black");

board[7][1].piece = new Piece("knight","black");
board[7][6].piece = new Piece("knight","black");

board[7][3].piece = new Piece("king","black");
board[7][4].piece = new Piece("queen","black");
console.log(board);

function updateBoard(){//REW.
    if(mouseDown){
        var tileX = Math.floor((mouseX-boardOffsetX)/tileSize);//gets what tile the player clicked
        var tileY = Math.floor((mouseY-boardOffsetY)/tileSize);
        let moves = getMoves(tileX,tileY);//getting the moves avalible to the piece selected. if none selected, return null
        
        if(board[tileY][tileX].piece !== null){//if the player clicked a tile with a piece on it, highlight the pieces moves

            if(board[tileY][tileX].piece.team !== activeTeam){//if the piece clicked is not on the active team, take it

                if(board[tileY][tileX].highlighted){//if the piece is highlighted, meaning it can be captured, then allow capture
                    console.log("capture!");
                    board[tileY][tileX].piece = board[selectedPiece[1]][selectedPiece[0]].piece//set the selected tile to the active piece
                    board[selectedPiece[1]][selectedPiece[0]].piece = null;//remove the first piece
                }
                unselectAll();//unselectes all pieces and board tiles
                switchTeam();//switches to the other team


            }else{//if the pieces is on the active team, highlight tiles to move to

                unselectAll();//unselectes all pieces and board tiles
                board[tileY][tileX].piece.selected = true;//marks the piece as selected
                board[tileY][tileX].highlighted = true;//highlights the tile the player clicked
                selectedPiece = [tileX,tileY]//stores the current piece's position

                for(let i = 0; i < moves.length; i++){//displaying all avalible moves
                
                    board[moves[i][1]][moves[i][0]].highlighted = true;//highlights the avalible moves

                }
            }
            
        }else if(board[tileY][tileX].highlighted){//if the player clicked a tile without a piece on it and the tile is highlighted, attempt to move there

            console.log("move");
            board[tileY][tileX].piece = board[selectedPiece[1]][selectedPiece[0]].piece
            board[selectedPiece[1]][selectedPiece[0]].piece = null;
            unselectAll();//unselectes all pieces and board tiles
            switchTeam();//switches to the other team

        }else{//if the player cannot move and the tile is not a piece, unselect all.
            unselectAll();//unselectes all pieces and board tiles
        }

        
    }
}

this.moves = [
    [0,1,false,false],//normal pawn move
    [-1,1,false,true,true],//pawn attack moves
    [1,1,false,true,true]
]; //use this.VAR not super.VAR because super.VAR changes the super class, not this one.

class Move {//the move class
    constructor(repeated = false, x = 0, y = 0, canTake = true, mustTake = false, absolute = false){
        this.repeated = repeated;//linear board-crossing moves as used by the queen, bishop, and rook (and knook).
        //this argument means the move will be repeated until another piece is taken (if allowed).
        this.x = x;
        this.y = y;
        this.canTake = canTake;
        this.mustTake = mustTake;
        this.absolute = absolute;
    }
}

/*
        for(var i = 0; i < Math.abs(yDistance); i++){//runs once per tile of distance on y

            if (yDistance>0){//if the current pos is below the past pos
            
                board[currentY-i-1][currentX].arrow = arrow.connectorVertical;
                if(currentY+i == currentY){//if the next arrow segment would have the correct Y value, either draw an arrow or turn

                    if(pastX == currentX){
                        board[currentY-i-1][currentX].arrow = arrow.up;
                    }
                    
                }
                
            }else if(yDistance<0){

                board[currentY+i+1][currentX].arrow = arrow.connectorVertical;
                if(currentY+i == currentY){//if the next arrow segment would have the correct Y value, either draw an arrow or turn
                    board[currentY+i+1][currentX].arrow = arrow.down;
                }

            }//else{
            //     board[currentY+i][currentX].arrow = arrow.connectorHorizontal;
            // }

            
            console.log(currentY + i)
        }*/

        function renderCards(){
            var cardOffset = 250;//the distance the card sprites are from the edge of the screen
            var cardMargins = 10;//the margins for text on the card
            
            ctx.fillStyle = "#000000";//rendering the sidebar
            ctx.globalAlpha = 0.7;
            ctx.fillRect(canvas.width-305,0,canvas.width,canvas.height);
            ctx.globalAlpha = 1;
        
            ctx.drawImage(card.front,canvas.width-cardOffset,380,card.front.width*0.8,card.front.height*0.8);//drawing the last card
            ctx.fillText(pastTitle,canvas.width-cardOffset+30,480,card.front.width-125);//drawing the text on the last card
        
            ctx.drawImage(card.back,canvas.width-cardOffset,30,card.back.width*0.8,card.back.height*0.8);//drawing the draw pile
            if(mouseX>=canvas.width-cardOffset&&mouseX<=canvas.width-cardOffset-65+card.back.width&&mouseY>=30&&mouseY<=card.back.height-55&&mouseDown&&canDraw){
                canDraw = false;
                ctx.drawImage(card.front,canvas.width-cardOffset,30,card.front.width*0.8,card.front.height*0.8)
                drawCard();//after rendering, call drawCard
                
                cardAnimation = 0;//begins the animation
                //if the draw pile is clicked, start the animation.
                
            }
        
            if (cardAnimation <= 350 && cardAnimation != -1){
                ctx.drawImage(card.front,canvas.width-cardOffset,30+cardAnimation,card.front.width*0.8,card.front.height*0.8)
        
                ctx.font = "32px Arial"
                ctx.fillText(currentTitle,canvas.width-cardOffset+cardMargins,130+cardAnimation,card.front.width-(95+cardMargins));
        
                cardAnimation += 30 - cardAnimation/15;
                console.log(cardAnimation);
                return;
            }
            if(cardAnimation != -1 && cardAnimation > 350){
                console.log("+++++++++++ : "+cardAnimation)
        
            //when the animation finishes, set the old card to be the same as the one just drawn
            pastTitle = currentTitle;
            pastText = currentText;
            cardAnimation = -1;//resets the animation
            }
            
        
        }

        function generateDeck(){
            //generating the main deck
            var deckSize = 100;
            var specialCardsAmount = 0;
        
            for(var i = 0; i<deckSize-specialCardsAmount; i++){
                deck.push(new Card(getRandomInt(500)))
            }
        }

        function drawCard(){
            currentTitle = deck[cardIndex].title;
            console.log(deck[cardIndex].title);
        
            currentText = deck[cardIndex].text;
            console.log(deck[cardIndex].text);
        }

        
/**
 * Generates random locations of bombs on a minesweeper board.
 * @param {int} boardWidth the width of the output board
 * @param {int} boardHeight the heigh of the output board
 * @param {int} numberMines the number of mines to be placed
 * @returns {2D Boolean Array} whether each location is a bomb
 */
function generateBombLocations(boardWidth, boardHeight, numberMines){
    //Config:
    const bombPlaceTries = numberMines;
    if(numberMines>(boardHeight*boardWidth)){
        console.log("Too many mines requested to be placed");
    }

    //Create the result array:
    var result  = [];
    //Setting every cell to false in the array:
    for(let y=0;y<boardHeight;y++){
        result.push([]);
        for(let x=0;x<boardWidth;x++){
            result[y].push(false);//adding a new element
        }
    }
    //console.log(result);
    //Places mines (Old Not-ideal method)
    // for(var i = 0; i<numberMines; i++){
    //     for(var j = 0; j<bombPlaceTries; j++){
    //         //Randomly chooses a board location
    //         var randX = getRandomInt(boardWidth); 
    //         var randY = getRandomInt(boardHeight);

    //         //Checks to see if selected square is open, and if so, places a mine there
    //         if(!result[randY][randX]){
    //             result[randY][randX] = true;
    //             break;//If we have placed a mine, exit the random placement loop
    //         }

    //         //If this loop is on it's last iteration and no bomb has been placed, we place one in the first available spot.
    //         var placedMine = false; 
    //         if(j==bombPlaceTries-1){
    //             console.log("Could Not find random position!")
    //             for(var y = 0; y<boardSize; y++){
    //                 if(placedMine) break;
    //                 for(var x = 0; y<boardSize; y++){
    //                     if(placedMine)break;
    //                     if(!result[y][x]){
    //                         result[y][x] = true;
    //                         placedMine = true;
    //                     }
    //                 }
    //             }
    //         }

    //     }
    // }
    //Iterates through to place each mine
    // console.log("About to place "+numberMines+" mines.");
    for(var a = 0; a<numberMines; a++){
        //A list of all available spots to place a mine. Format: [y][x] i.e. openPositions[n][0] = y of loc n
        var openPositions = [];
        //Iterating through the result board and looking for open spaces
        for(var y= 0; y<boardHeight; y++){
            for(var x = 0; x<boardWidth; x++){
                if(!result[y][x]) openPositions.push([y,x]);
            }
        }
        // console.log("For mine "+a+": "+openPositions.length+" positions found:");
        // console.log(openPositions);
        //There are no open positions for a mine to be placed in
        if(openPositions.length<1){
            console.log("Error: No available positions to place mine "+(a+1));
            continue;
        }
        var positionIndex = getRandomInt(openPositions.length);
        // console.log("Position Index: "+positionIndex);
        result[openPositions[positionIndex][0]][openPositions[positionIndex][1]] = true;
        // console.log("Placed mine "+a+" in position: y: "+openPositions[positionIndex][0]+", x: "+openPositions[positionIndex][0]);
    }

    //console.log(result);
    return result;
}
/**
 * Takes a board (2D array of Tile objects) and returns an identical board with minesweeper values populated
 * @param {Tile[][]} inputBoard 
 * @returns {Tile[][]} resultantBoard
 */
function generateBoardWithMinesweeper(inputBoard){

    


    return inputBoard;
}

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
// console.log(display);\\



var repeated;
        
        // unselectAll();//unselects all pieces
        // if ((tileX>=0&&tileX<boardSizeX)&&(tileY>=0&&tileY<boardSizeY)){//checks if the click is inside the board
        //     if(board[tileY][tileX].piece !== null){//if the board has a piece at the selected position
        //         if(board[tileY][tileX].piece.team == activeTeam){//if the piece is the current team
        //             selectedPiece = [tileX,tileY];//marks the piece as selected
        //             board[tileY][tileX].piece.selected = true;
        //         }else{//if the selected piece is not the current team
        //             selectedPiece = null;//marks the selected piece as none
        //         }
        //     }else{//if the tile selected is not a piece
        //         selectedPiece = null;//marks the selected piece as none
        //     }
        //     board[tileY][tileX].highlighted = true;//highlights the board where clicked
        // }

        // //highlighting moves
        // if(selectedPiece !== null){//if a piece is currently selected

        //     for(var i = 0;i < board[selectedPiece[1]][selectedPiece[0]].piece.moves.length;i++){//iterating through the moves
        //         repeated = board[tileY][tileX].piece.moves[i].repeated;
        //         if(repeated){
        //             // if ((tileX+repeatedMoveX>=0&&tileX+repeatedMoveX<boardSizeX)&&(tileY+repeatedMoveY>=0&&tileY+repeatedMoveY<boardSizeY)){//checking if the move is in bounds
                        
        //             // console.log("true")
        //             // }
        //         }else{

        //         }

        //     }
        // }

        canSelect = false;
        
        unselectAll(true);//unselects all pieces
        var tileX = Math.floor((mouseX-boardOffsetX)/tileSize);//gets what tile the player clicked
        var tileY = Math.floor((mouseY-boardOffsetY)/tileSize);

        if ((tileX>=0&&tileX<boardSizeX)&&(tileY>=0&&tileY<boardSizeY)){//checks if the click is inside the board

            board[tileY][tileX].highlighted = true;//if the board is clicked, highlight the clicked tile

            if (board[tileY][tileX].piece !== null){//if the board has a piece at the selected position

                if (board[tileY][tileX].piece.team == activeTeam){//if the piece is on the active team
                    //HIGHLIGHT LEGAL MOVES

                    selectedPiece = [tileX,tileY]//sets the selected piece to the selected position

                    for(let i = 0; i<board[tileY][tileX].piece.moves.length;i++){//repeats through the amount of moves the piece has
                        var moveX = board[tileY][tileX].piece.moves[i].x;
                        var moveY = board[tileY][tileX].piece.moves[i].y;
                        var absolute = board[tileY][tileX].piece.moves[i].absolute;
                        var repeated = board[tileY][tileX].piece.moves[i].repeated;
                        var canTake = board[tileY][tileX].piece.moves[i].canTake;
                        var mustTake = board[tileY][tileX].piece.moves[i].mustTake;
                        var canTakeOwnPawns = board[tileY][tileX].piece.canTakeOwnPawns;
                        var team = board[tileY][tileX].piece.team;
                    }
                
                }else{
                    selectedPiece = null;
                }
            }else{//if no piece at the clicked position
                selectedPiece = null;
            }
        }

        console.log(selectedPiece)

        // OLD CODE, UNUSED, ARCHIVED HERE FOR NOW