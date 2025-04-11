function createBoard(){


    switch(variant){
        default:
        case 0://normal
            boardSizeX = 8;
            boardSizeY = 8;
        break;
        case 1://long
            boardSizeX = 8;
            boardSizeY = 16;
        break;
        case 3://short
            boardSizeX = 8;
            boardSizeY = 5;
        break;
        case 4://extra long
            boardSizeX = 8;
            boardSizeY = 100;
        break;
        case 5://mini
            boardSizeX = 4;
            boardSizeY = 4;
        break;
        case 6:
            boardSizeX = 16;
            boardSizeY = 16;
        break;
        case 7:
            boardSizeX = 7;
            boardSizeY = 7;
        break;
    }

    board = [];//resets the board variable
    for(let y=0;y<boardSizeY;y++){
        board.push([]);
        for(let x=0;x<boardSizeX;x++){
            board[y].push(new Tile(null,0,false,0));//adding a new tile
            //console.log("("+x+" ,"+y+") => "+board[y][x]);
        }
            
    }
}

function setupBoard(offsetX,offsetY){

    var boardColors = ["#ffe6cc","#ae8c6b"];//declares the colors to use for board tiles
    for(let y=0;y<board.length;y++){
        for(let x=0;x<board[y].length;x++){
            board[y][x].color = boardColors[(x+y)%2];//changes tile color
        }
    }
    //setting up pieces
    switch(variant){
        default:
        case 0://normal chess
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
        break;
        case 1://long chess
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
            board[14+offsetX][0+offsetY].piece = new Pawn("white");
            board[14+offsetX][1+offsetY].piece = new Pawn("white");
            board[14+offsetX][2+offsetY].piece = new Pawn("white");
            board[14+offsetX][3+offsetY].piece = new Pawn("white");
            board[14+offsetX][4+offsetY].piece = new Pawn("white");
            board[14+offsetX][5+offsetY].piece = new Pawn("white");
            board[14+offsetX][6+offsetY].piece = new Pawn("white");
            board[14+offsetX][7+offsetY].piece = new Pawn("white");

            board[15+offsetX][2+offsetY].piece = new Bishop("white");
            board[15+offsetX][5+offsetY].piece = new Bishop("white");

            board[15+offsetX][0+offsetY].piece = new Rook("white");
            board[15+offsetX][7+offsetY].piece = new Rook("white");

            board[15+offsetX][1+offsetY].piece = new Knight("white");
            board[15+offsetX][6+offsetY].piece = new Knight("white");

            board[15+offsetX][4+offsetY].piece = new King("white");
            board[15+offsetX][3+offsetY].piece = new Queen("white");
        break;
        case 2://knook chess
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

            board[0+offsetX][0+offsetY].piece = new Knook("black");
            board[0+offsetX][7+offsetY].piece = new Knook("black");

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

            board[7+offsetX][0+offsetY].piece = new Knook("white");
            board[7+offsetX][7+offsetY].piece = new Knook("white");

            board[7+offsetX][1+offsetY].piece = new Knight("white");
            board[7+offsetX][6+offsetY].piece = new Knight("white");

            board[7+offsetX][4+offsetY].piece = new King("white");
            board[7+offsetX][3+offsetY].piece = new Queen("white");
        break;
        case 3://short chess
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

            board[0+offsetX][0+offsetY].piece = new Bishop("black");
            board[0+offsetX][7+offsetY].piece = new Bishop("black");

            board[0+offsetX][1+offsetY].piece = new Bishop("black");
            board[0+offsetX][6+offsetY].piece = new Bishop("black");

            board[0+offsetX][4+offsetY].piece = new King("black");
            board[0+offsetX][3+offsetY].piece = new Queen("black");


            //white side
            board[3+offsetX][0+offsetY].piece = new Pawn("white");
            board[3+offsetX][1+offsetY].piece = new Pawn("white");
            board[3+offsetX][2+offsetY].piece = new Pawn("white");
            board[3+offsetX][3+offsetY].piece = new Pawn("white");
            board[3+offsetX][4+offsetY].piece = new Pawn("white");
            board[3+offsetX][5+offsetY].piece = new Pawn("white");
            board[3+offsetX][6+offsetY].piece = new Pawn("white");
            board[3+offsetX][7+offsetY].piece = new Pawn("white");

            board[4+offsetX][2+offsetY].piece = new Bishop("white");
            board[4+offsetX][5+offsetY].piece = new Bishop("white");

            board[4+offsetX][0+offsetY].piece = new Bishop("white");
            board[4+offsetX][7+offsetY].piece = new Bishop("white");

            board[4+offsetX][1+offsetY].piece = new Bishop("white");
            board[4+offsetX][6+offsetY].piece = new Bishop("white");

            board[4+offsetX][4+offsetY].piece = new King("white");
            board[4+offsetX][3+offsetY].piece = new Queen("white");
        break;
        case 4://extra long chess
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

            board[0+offsetX][0+offsetY].piece = new Bishop("black");
            board[0+offsetX][7+offsetY].piece = new Bishop("black");

            board[0+offsetX][1+offsetY].piece = new Bishop("black");
            board[0+offsetX][6+offsetY].piece = new Bishop("black");

            board[0+offsetX][4+offsetY].piece = new King("black");
            board[0+offsetX][3+offsetY].piece = new Queen("black");


            //white side
            board[98+offsetX][0+offsetY].piece = new Pawn("white");
            board[98+offsetX][1+offsetY].piece = new Pawn("white");
            board[98+offsetX][2+offsetY].piece = new Pawn("white");
            board[98+offsetX][3+offsetY].piece = new Pawn("white");
            board[98+offsetX][4+offsetY].piece = new Pawn("white");
            board[98+offsetX][5+offsetY].piece = new Pawn("white");
            board[98+offsetX][6+offsetY].piece = new Pawn("white");
            board[98+offsetX][7+offsetY].piece = new Pawn("white");

            board[99+offsetX][2+offsetY].piece = new Bishop("white");
            board[99+offsetX][5+offsetY].piece = new Bishop("white");

            board[99+offsetX][0+offsetY].piece = new Rook("white");
            board[99+offsetX][7+offsetY].piece = new Rook("white");

            board[99+offsetX][1+offsetY].piece = new Knight("white");
            board[99+offsetX][6+offsetY].piece = new Knight("white");

            board[99+offsetX][4+offsetY].piece = new King("white");
            board[99+offsetX][3+offsetY].piece = new Queen("white");
        break;
        case 5://mini chess
            board[0][0].piece = new Rook("black");
            board[0][1].piece = new Queen("black");
            board[0][2].piece = new King("black");
            board[0][3].piece = new Rook("black");


            board[1][1].piece = new Pawn("black");
            board[1][2].piece = new Pawn("black");


            board[2][1].piece = new Pawn("white");
            board[2][2].piece = new Pawn("white");

            board[3][0].piece = new Rook("white");
            board[3][1].piece = new Queen("white");
            board[3][2].piece = new King("white");
            board[3][3].piece = new Rook("white");
        break;
        case 6:
            board[0][0].piece = new Rook("black");
            board[0][15].piece = new Rook("black");

            board[0][1].piece = new Bishop("black");
            board[0][2].piece = new Knight("black");
            board[0][13].piece = new Knight("black");
            board[0][14].piece = new Bishop("black");

            board[0][3].piece = new Knook("black");
            board[0][12].piece = new Knook("black");

            board[0][4].piece = new Knight("black");
            board[0][11].piece = new Knight("black");
            board[0][7].piece = new Bishop("black");
            board[0][8].piece = new Bishop("black");

            board[0][6].piece = new King("black");
            board[0][9].piece = new King("black");

            board[0][5].piece = new Queen("black");
            board[0][10].piece = new Queen("black");

            board[1][0].piece = new Pawn("black");
            board[1][1].piece = new Pawn("black");
            board[1][2].piece = new Pawn("black");
            board[1][3].piece = new Pawn("black");
            board[1][4].piece = new Pawn("black");
            board[1][5].piece = new Pawn("black");
            board[1][6].piece = new Pawn("black");
            board[1][7].piece = new Pawn("black");
            board[1][8].piece = new Pawn("black");
            board[1][9].piece = new Pawn("black");
            board[1][10].piece = new Pawn("black");
            board[1][11].piece = new Pawn("black");
            board[1][12].piece = new Pawn("black");
            board[1][13].piece = new Pawn("black");
            board[1][14].piece = new Pawn("black");
            board[1][15].piece = new Pawn("black");

            board[3][0].piece = new Pawn("black");
            board[5][1].piece = new Pawn("black");
            board[3][2].piece = new Pawn("black");
            board[5][3].piece = new Pawn("black");
            board[3][4].piece = new Pawn("black");
            board[5][5].piece = new Pawn("black");
            board[3][6].piece = new Pawn("black");
            board[5][7].piece = new Pawn("black");
            board[3][8].piece = new Pawn("black");
            board[5][9].piece = new Pawn("black");
            board[3][10].piece = new Pawn("black");
            board[5][11].piece = new Pawn("black");
            board[3][12].piece = new Pawn("black");
            board[5][13].piece = new Pawn("black");
            board[3][14].piece = new Pawn("black");
            board[5][15].piece = new Pawn("black");

            board[15][0].piece = new Rook("white");
            board[15][15].piece = new Rook("white");

            board[15][1].piece = new Bishop("white");
            board[15][2].piece = new Knight("white");
            board[15][13].piece = new Knight("white");
            board[15][14].piece = new Bishop("white");

            board[15][3].piece = new Knook("white");
            board[15][12].piece = new Knook("white");

            board[15][4].piece = new Knight("white");
            board[15][11].piece = new Knight("white");
            board[15][7].piece = new Bishop("white");
            board[15][8].piece = new Bishop("white");

            board[15][6].piece = new King("white");
            board[15][9].piece = new King("white");

            board[15][5].piece = new Queen("white");
            board[15][10].piece = new Queen("white");

            board[14][0].piece = new Pawn("white");
            board[14][1].piece = new Pawn("white");
            board[14][2].piece = new Pawn("white");
            board[14][3].piece = new Pawn("white");
            board[14][4].piece = new Pawn("white");
            board[14][5].piece = new Pawn("white");
            board[14][6].piece = new Pawn("white");
            board[14][7].piece = new Pawn("white");
            board[14][8].piece = new Pawn("white");
            board[14][9].piece = new Pawn("white");
            board[14][10].piece = new Pawn("white");
            board[14][11].piece = new Pawn("white");
            board[14][12].piece = new Pawn("white");
            board[14][13].piece = new Pawn("white");
            board[14][14].piece = new Pawn("white");
            board[14][15].piece = new Pawn("white");

            board[12][0].piece = new Pawn("white");
            board[10][1].piece = new Pawn("white");
            board[12][2].piece = new Pawn("white");
            board[10][3].piece = new Pawn("white");
            board[12][4].piece = new Pawn("white");
            board[10][5].piece = new Pawn("white");
            board[12][6].piece = new Pawn("white");
            board[10][7].piece = new Pawn("white");
            board[12][8].piece = new Pawn("white");
            board[10][9].piece = new Pawn("white");
            board[12][10].piece = new Pawn("white");
            board[10][11].piece = new Pawn("white");
            board[12][12].piece = new Pawn("white");
            board[10][13].piece = new Pawn("white");
            board[12][14].piece = new Pawn("white");
            board[10][15].piece = new Pawn("white");
        break;
        case 7://off
            board[1+offsetX][0+offsetY].piece = new Pawn("black");
            board[1+offsetX][1+offsetY].piece = new Pawn("black");
            board[1+offsetX][2+offsetY].piece = new Pawn("black");
            board[1+offsetX][3+offsetY].piece = new Pawn("black");
            board[1+offsetX][4+offsetY].piece = new Pawn("black");
            board[1+offsetX][5+offsetY].piece = new Pawn("black");
            board[1+offsetX][6+offsetY].piece = new Pawn("black");

            board[0+offsetX][2+offsetY].piece = new Bishop("black");
            board[0+offsetX][4+offsetY].piece = new Bishop("black");

            board[0+offsetX][0+offsetY].piece = new Rook("black");
            board[0+offsetX][6+offsetY].piece = new Rook("black");

            board[0+offsetX][1+offsetY].piece = new Knight("black");
            board[0+offsetX][5+offsetY].piece = new Knight("black");

            board[0+offsetX][3+offsetY].piece = new King("black");

            //white side
            board[5+offsetX][0+offsetY].piece = new Pawn("white");
            board[5+offsetX][1+offsetY].piece = new Pawn("white");
            board[5+offsetX][2+offsetY].piece = new Pawn("white");
            board[5+offsetX][3+offsetY].piece = new Pawn("white");
            board[5+offsetX][4+offsetY].piece = new Pawn("white");
            board[5+offsetX][5+offsetY].piece = new Pawn("white");
            board[5+offsetX][6+offsetY].piece = new Pawn("white");

            board[6+offsetX][2+offsetY].piece = new Bishop("white");
            board[6+offsetX][4+offsetY].piece = new Bishop("white");

            board[6+offsetX][0+offsetY].piece = new Rook("white");
            board[6+offsetX][6+offsetY].piece = new Rook("white");

            board[6+offsetX][1+offsetY].piece = new Knight("white");
            board[6+offsetX][5+offsetY].piece = new Knight("white");

            board[6+offsetX][3+offsetY].piece = new King("white");
        break;
    }
}