function updateBoard(){//updates the board each tick
    if(!mouseDown && !promotionScreenAcrive){
        canSelect = true;
    }
    if(mouseDown&&canSelect){
        canSelect = false;
        var tileX = Math.floor((mouseX-boardOffsetX)/tileSize);//gets what tile the player clicked
        var tileY = Math.floor((mouseY-boardOffsetY)/tileSize);

        
        unselectAll();//unselects all pieces

        if ((tileX>=0&&tileX<boardSizeX)&&(tileY>=0&&tileY<boardSizeY)){//checks if the click is inside the board
            
            if (board[tileY][tileX].piece !== null){//if the board has a piece at the selected position

                ///////////////////////////////////////////MOVING PIECES//////////////////////////////////////////////////////////////////////////////////////////////

                if(board[tileY][tileX].movable){//if the current selected piece can move to the clicked tile
                    if(board[tileY][tileX].piece instanceof Rook && board[tileY][tileX].piece.team == activeTeam && board[selectedPiece[1]][selectedPiece[0]].piece instanceof King){

                        unselectAll(true);

                        //castling \/ \/ \/
                        if(selectedPiece[0]>tileX){

                            board[selectedPiece[1]][selectedPiece[0]].piece.canCastle = false;

                            board[selectedPiece[1]][selectedPiece[0]-2].piece = board[selectedPiece[1]][selectedPiece[0]].piece
                            board[selectedPiece[1]][selectedPiece[0]].piece = null;//erasing the first instance of the piece
                            
                            board[selectedPiece[1]][selectedPiece[0]-1].piece = board[tileY][tileX].piece
                            board[tileY][tileX].piece = null;//erasing the first instance of the piece

                            drawArrow(selectedPiece[0] - 1, selectedPiece[1], selectedPiece[0], selectedPiece[1]);//draws an arrow from the previous pos to the current pos
                        }
                        if(selectedPiece[0]<tileX){

                            board[selectedPiece[1]][selectedPiece[0]].piece.canCastle = false;

                            board[selectedPiece[1]][selectedPiece[0]+2].piece = board[selectedPiece[1]][selectedPiece[0]].piece
                            board[selectedPiece[1]][selectedPiece[0]].piece = null;//erasing the first instance of the piece 

                            board[selectedPiece[1]][selectedPiece[0]+1].piece = board[tileY][tileX].piece
                            board[tileY][tileX].piece = null;//erasing the first instance of the piece

                            drawArrow(selectedPiece[0] + 1, selectedPiece[1], selectedPiece[0], selectedPiece[1]);//draws an arrow from the previous pos to the current pos
                        }
                        
                        passTurn();
                        return;
                    }

                    //other moves \/ \/ \/
                    unselectAll(true);
                    takePiece(board[tileY][tileX].piece);
                    //setting the board tile selected to the selected piece
                    board[tileY][tileX].piece = board[selectedPiece[1]][selectedPiece[0]].piece
                    board[selectedPiece[1]][selectedPiece[0]].piece = null;//erasing the first instance of the piece 

                    promotePawns(tileX,tileY);
                    drawArrow(tileX, tileY, selectedPiece[0], selectedPiece[1]);//draws an arrow from the previous pos to the current pos
                    passTurn();
                    return;
                }
                selectedPiece = null;//unselects the current piece

                if(board[tileY][tileX].piece.team == activeTeam){//if the peice selected is the active team's piece, then select it
                    board[tileY][tileX].piece.selected = true;//selects the piece
                    selectedPiece = [tileX,tileY];//marks the pos of the selected peice and stores it
                }
                
                
                
            }else{//if the board is blank at the selected position
                if(board[tileY][tileX].movable){

                    unselectAll(true);
                    if (board[selectedPiece[1]][selectedPiece[0]].piece instanceof Pawn){//if the moved piece is a pawn and it has just moved
                        board[selectedPiece[1]][selectedPiece[0]].piece.canMoveDouble = false;
                    }

                    if (board[selectedPiece[1]][selectedPiece[0]].piece instanceof Pawn && selectedPiece[1] - tileY == 2){//if the moved piece is a pawn and it has just moved twice, allow en passant.
                        board[selectedPiece[1]][selectedPiece[0]].piece.canBeTakenEnPassant = true;
                    }

                    if (board[selectedPiece[1]][selectedPiece[0]].piece instanceof Pawn && board[tileY+1][tileX].piece instanceof Pawn){//if the moved piece is a pawn and it has just moved en passant
                        if(board[tileY+1][tileX].piece.canBeTakenEnPassant){
                            console.log("en passant!");

                            board[tileY+1][tileX].piece = null;//taking the pawn targeted with en passant
                        }
                    }

                    board[tileY][tileX].piece = board[selectedPiece[1]][selectedPiece[0]].piece
                    board[selectedPiece[1]][selectedPiece[0]].piece = null;//erasing the first instance of the piece 

                    promotePawns(tileX,tileY);
                    drawArrow(tileX, tileY, selectedPiece[0], selectedPiece[1]);//draws an arrow from the previous pos to the current pos
                    passTurn();
                    return;
                }
                selectedPiece = null;
            }

            ///////////////////////////////////////////HIGHLIGHTING MOVES//////////////////////////////////////////////////////////////////////////////////////////////
            
            if (selectedPiece !== null){
                //CHECKS ALL MOVES AND HIGHLIGHTS LEGAL ONES.
                
                for(let i = 0; i<board[tileY][tileX].piece.moves.length;i++){//repeats through the amount of moves the peice has
                    let moveX = board[tileY][tileX].piece.moves[i].x;
                    let moveY = board[tileY][tileX].piece.moves[i].y;
                    let absolute = board[tileY][tileX].piece.moves[i].absolute;
                    let repeated = board[tileY][tileX].piece.moves[i].repeated;
                    let canTake = board[tileY][tileX].piece.moves[i].canTake;
                    let mustTake = board[tileY][tileX].piece.moves[i].mustTake;
                    let canTakeOwnPawns = board[tileY][tileX].piece.canTakeOwnPawns;
                    let team = board[tileY][tileX].piece.team;

                    let repeatedMoveX = moveX;
                    let repeatedMoveY = moveY;

                    if (absolute){
                        //highlighting absolute moves

                        //maybe unused


                    }else{
                        //highlighting relitave moves

                        if(repeated){
                            //repeated highlighting
                            if ((tileX+repeatedMoveX>=0&&tileX+repeatedMoveX<boardSizeX)&&(tileY+repeatedMoveY>=0&&tileY+repeatedMoveY<boardSizeY)){//checking if the move is in bounds
                                while(((tileX+repeatedMoveX>=0&&tileX+repeatedMoveX<boardSizeX)&&(tileY+repeatedMoveY>=0&&tileY+repeatedMoveY<boardSizeY))&&((board[tileY+repeatedMoveY][tileX+repeatedMoveX].piece===null))){ //selects tiles until a piece is hit or the board ends
                                    
                                    if(mustTake){//if the piece must take
                                        if(board[tileY+repeatedMoveY][tileX+repeatedMoveX].piece !== null){//if a piece exists at the desired location (for only attack moves)
                                            if((canTakeOwnPawns && board[tileY][tileX].piece instanceof Pawn) || board[tileY+repeatedMoveY][tileX+repeatedMoveX].piece.team !== team){//if the piece is another team or you can take your own pieces
                                                board[tileY+repeatedMoveY][tileX+repeatedMoveX].movable = true;
                                                board[tileY+repeatedMoveY][tileX+repeatedMoveX].highlighted = true;
                                            }
                                        }
                                    }else{
                                        if(board[tileY+repeatedMoveY][tileX+repeatedMoveX].piece==null){
                                            board[tileY+repeatedMoveY][tileX+repeatedMoveX].movable = true;
                                            board[tileY+repeatedMoveY][tileX+repeatedMoveX].highlighted = true;
                                        }
                                    }
                                    
                                    repeatedMoveX += moveX;
                                    repeatedMoveY += moveY;                                    
                                }

                                if(canTake||mustTake){//allows taking pieces on a move
                                    if((tileX+repeatedMoveX>=0&&tileX+repeatedMoveX<boardSizeX)&&(tileY+repeatedMoveY>=0&&tileY+repeatedMoveY<boardSizeX)){
                                    if((board[tileY+repeatedMoveY][tileX+repeatedMoveX].piece !== null)){//if a piece exists at the desired location (for only attack moves)
                                        if((canTakeOwnPawns && board[tileY][tileX].piece instanceof Pawn) || board[tileY+repeatedMoveY][tileX+repeatedMoveX].piece.team !== team){//if the piece is another team or you can take your own pieces
                                            board[tileY+repeatedMoveY][tileX+repeatedMoveX].movable = true;
                                            board[tileY+repeatedMoveY][tileX+repeatedMoveX].highlighted = true;
                                        }
                                    }
                                    }
                                }

                                
                            }
                            
                        }else{
                            if ((tileX+moveX>=0&&tileX+moveX<boardSizeX)&&(tileY+moveY>=0&&tileY+moveY<boardSizeY)){//checking if the move is in bounds

                                if(mustTake){//if the piece must take
                                    //normal pawn take 
                                    if(board[tileY+moveY][tileX+moveX].piece !== null){//if a piece exists at the desired location (for only attack moves)
                                        if((canTakeOwnPawns && board[tileY+moveY][tileX+moveX].piece instanceof Pawn) || board[tileY+moveY][tileX+moveX].piece.team !== team){//if the piece is another team or you can take your own pieces
                                            board[tileY+moveY][tileX+moveX].movable = true;
                                            board[tileY+moveY][tileX+moveX].highlighted = true;
                                        }
                                    }
                                    //en passant
                                    if(board[tileY+moveY+1][tileX+moveX].piece instanceof Pawn && (board[tileY+moveY+1][tileX+moveX].piece.team !== activeTeam || canTakeOwnPawns)){//if a pawn is selected and en passant is avalible
                                        if(board[tileY+moveY+1][tileX+moveX].piece.canBeTakenEnPassant){

                                            board[tileY+moveY][tileX+moveX].movable = true;
                                            board[tileY+moveY][tileX+moveX].highlighted = true;
                                        }
                                    }
                                }else if(canTake){
                                    if(board[tileY+moveY][tileX+moveX].piece !== null){
                                        if((canTakeOwnPawns && board[tileY][tileX].piece instanceof Pawn)|| board[tileY+moveY][tileX+moveX].piece.team !== team){
                                            board[tileY+moveY][tileX+moveX].movable = true;
                                        board[tileY+moveY][tileX+moveX].highlighted = true;
                                        }
                                    }else{
                                        board[tileY+moveY][tileX+moveX].movable = true;
                                        board[tileY+moveY][tileX+moveX].highlighted = true;
                                    }
                                }else{
                                    if(board[tileY+moveY][tileX+moveX].piece==null){
                                        board[tileY+moveY][tileX+moveX].movable = true;
                                        board[tileY+moveY][tileX+moveX].highlighted = true;
                                    }
                                }
                            }
                        }
                    }
                }
                //special moves (like the pawn moving 2 spaces it's first turn and castling)
                try{//pawn 2 moves
                    if(board[tileY-2][tileX].piece==null && board[tileY][tileX].piece instanceof Pawn){//if it is a pawn and there is no piece 2 tile in front of it
                        if(board[tileY][tileX].piece.canMoveDouble && board[tileY-1][tileX].piece == null){//if the pawn is allowed to move 2 spaces and there is no piece directly in front of it
                            board[tileY-2][tileX].movable = true;
                            board[tileY-2][tileX].highlighted = true;
                        }
                    }
                    }catch{}
                    //castling
                    if(board[tileY][tileX].piece instanceof King && tileY == 7 && board[tileY][tileX].piece.canCastle){

                        try{
                            if(board[tileY][tileX-1].piece == null && board[tileY][tileX-2].piece == null && board[tileY][tileX-3].piece instanceof Rook && board[tileY][tileX-2].piece == null){//if queenrook is open for castling
                                board[tileY][tileX-3].movable = true;
                                board[tileY][tileX-3].highlighted = true;
                            }
                            if(board[tileY][tileX-1].piece == null && board[tileY][tileX-2].piece == null && board[tileY][tileX-3].piece == null && board[tileY][tileX-4].piece instanceof Rook){//if queenrook is open for castling
                                board[tileY][tileX-4].movable = true;
                                board[tileY][tileX-4].highlighted = true;
                            }
                            if(board[tileY][tileX-1].piece == null && board[tileY][tileX+2].piece == null && board[tileY][tileX+3].piece instanceof Rook && board[tileY][tileX+2].piece == null){//if queenrook is open for castling
                                board[tileY][tileX+3].movable = true;
                                board[tileY][tileX+3].highlighted = true;
                            }
                            if(board[tileY][tileX+1].piece == null && board[tileY][tileX+2].piece == null && board[tileY][tileX+3].piece == null && board[tileY][tileX+4].piece instanceof Rook){//if queenrook is open for castling
                                board[tileY][tileX+4].movable = true;
                                board[tileY][tileX+4].highlighted = true;
                            }
                        }catch{/*do nothing*/}
                    }
                    
                    
            }
            board[tileY][tileX].highlighted = true;//sets the tile's highlight as true
        }
    }else if(rightMouseDown && canSelect && !rightMouseLast){//minesweeper code
        rightMouseLast = true;
        console.log((tileX>=0&&tileX<boardSizeX)&&(tileY>=0&&tileY<boardSizeY));
        //Checks damage for minesweeper start
        var tileX = Math.floor((mouseX-boardOffsetX)/tileSize);//gets what tile the player clicked
        var tileY = Math.floor((mouseY-boardOffsetY)/tileSize);

        //Allow for start of minesweeper
        if(!minesweeperStarted){
            if(board[tileY][tileX].piece == null || board[tileY][tileX].piece.team == activeTeam){
                board[tileY][tileX].damage ++;
                console.log("Tile ["+tileY+"]["+tileX+"] Damaged");
                drawArrow(0,0,0,0);//forces arrows to not render, mainly to stop them from breaking
                passTurn();
            }
            
        }else{
            if(board[tileY][tileX].piece == null || board[tileY][tileX].piece.team == activeTeam){
                //Code for during minesweeper play
                if(!board[tileY][tileX].discovered){
                    board[tileY][tileX].discovered = true;
                    passTurn();
                }
            }
            
        }
    }
    if(!rightMouseDown) rightMouseLast = false;
}

function drawBoard(){//drawing the board
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let y=0;y<board.length;y++){
        for(let x=0;x<board[y].length;x++){
            //board[y][x].color = boardColors[(x+y)%2];//changes tile color

            ctx.fillStyle = board[y][x].color;
            ctx.fillRect(x*tileSize+boardOffsetX,y*tileSize+boardOffsetY,tileSize,tileSize);//draws each tile
            
            //minesweeper rendering
            if(board[y][x].damage > 0){
                switch(board[y][x].damage){
                    case 1:ctx.drawImage(crack.small,x*tileSize+boardOffsetX,y*tileSize+boardOffsetY,tileSize,tileSize);break;
                    case 2:ctx.drawImage(crack.med,x*tileSize+boardOffsetX,y*tileSize+boardOffsetY,tileSize,tileSize);break;
                    case 3:ctx.drawImage(crack.large,x*tileSize+boardOffsetX,y*tileSize+boardOffsetY,tileSize,tileSize);break;
                    case 4:
                        board[y][x].discovered = true;
                    break;
                }
            }

            if(board[y][x].discovered){
                board[y][x].damage = 4;
                board[y][x].color = "#808080";//if the tile is discovered
    
                ctx.fillStyle = "#a0a0a0";
                //ctx.fillRect(x*tileSize+boardOffsetX+5,y*tileSize+boardOffsetY+5,tileSize-10,tileSize-10);//draws each tile

                ctx.fillStyle = "#FF0000";//drawing the numbers on the board
                if(!board[y][x].isMine){
                    ctx.fillText(board[y][x].nearbyMines,x*tileSize+boardOffsetX+20,y*tileSize+boardOffsetY+20);
                }else{
                    ctx.fillText("Discovered Mine",x*tileSize+boardOffsetX+20,y*tileSize+boardOffsetY+20);
                }
            
            }
            if(board[y][x].exploded){
                ctx.fillStyle = "#FF0000";
                ctx.fillText("Exploded",x*tileSize+boardOffsetX+20,y*tileSize+boardOffsetY+30);
            }
            
            ctx.globalAlpha = highlightAlpha;
            
            if(board[y][x].highlighted){

                ctx.fillStyle = highlightColor;
                ctx.fillRect(x*tileSize+boardOffsetX,y*tileSize+boardOffsetY,tileSize,tileSize);//draws the highlight
            }
            

            if(board[y][x].arrow !== null){
                ctx.drawImage(board[y][x].arrow,x*tileSize+boardOffsetX,y*tileSize+boardOffsetY,tileSize,tileSize);
            }         
            ctx.globalAlpha = 1;//sets transparency to none

            
            if(board[y][x].piece !== null){//drawing pieces
                if(board[y][x].piece.selected){
                    ctx.drawImage(board[y][x].piece.sprite,x*tileSize+boardOffsetX-2,y*tileSize+boardOffsetY-2,tileSize+4,tileSize+4);
                }else{
                    ctx.drawImage(board[y][x].piece.sprite,x*tileSize+boardOffsetX,y*tileSize+boardOffsetY,tileSize,tileSize);
                }
                

            }
        }
        
    }
}