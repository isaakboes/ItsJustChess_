/**
 * Generates random locations of bombs on a minesweeper board.
 * @param {int} boardWidth the width of the output board
 * @param {int} boardHeight the heigh of the output board
 * @param {int} numberMines the number of mines to be placed
 * @param {int} yIndex yIndex of initial clicked tile
 * @param {int} xIndex xIndex of initial clicked tile
 * @returns {2D Boolean Array} whether each location is a bomb
 */
 function generateMineLocations(boardWidth, boardHeight, numberMines, yIndex, xIndex){
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
                //check if tile is already a mine
                if(result[y][x]) continue;

                //check if tile is adjacent to or under a king
                var locations = [];
                locations.push([y-1,x-1]);
                locations.push([y-1,x]);
                locations.push([y-1,x+1]);
                locations.push([y,x-1]);
                locations.push([y,x]);
                locations.push([y,x+1]);
                locations.push([y+1,x-1]);
                locations.push([y+1,x]);
                locations.push([y+1,x+1]);
                var isDisallowedTile = false;
                for(var b = 0; b<locations.length; b++){
                    if(isNearKing) break;
                    if(locations[b][0]<0 || locations[b][0]>=boardHeight || (locations[b][1]<0 || locations[b][1]>=boardWidth)) continue;
                    if(board[locations[b][0]][locations[b][1]].piece instanceof King){
                        isDisallowedTile = true;
                    }
                    if(locations[b][0]==yIndex && locations[b][1]==xIndex){
                        isDisallowedTile = true;
                    }
                    
                }
                if(isDisallowedTile) continue;
                openPositions.push([y,x]);
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
 * Returns the 8 elements of a 2D array surrounding the specified index 
 * @param {Object[][]} array array to search
 * @param {int} yIndex first index location
 * @param {int} xIndex second index location
 * @returns {Object[]} surrounding elements
 */
function adjacentIndexes(array, yIndex, xIndex){
    var results = [];
    var locations = [];
    locations.push([yIndex-1,xIndex-1]);
    locations.push([yIndex-1,xIndex]);
    locations.push([yIndex-1,xIndex+1]);
    locations.push([yIndex,xIndex-1]);
    locations.push([yIndex,xIndex+1]);
    locations.push([yIndex+1,xIndex-1]);
    locations.push([yIndex+1,xIndex]);
    locations.push([yIndex+1,xIndex+1]);
    // console.log(locations);
    
    for(var i = 0; i<locations.length; i++){
        if(locations[i][0]<0 || locations[i][0]>=array.length || (locations[i][1]<0 || locations[i][1]>=array[0].length)) continue;
        results.push(array[locations[i][0]][locations[i][1]]);
    }

    return results;
}

function adjacentLocations(array, yIndex, xIndex){
    var results = [];
    var locations = [];
    locations.push([yIndex-1,xIndex-1]);
    locations.push([yIndex-1,xIndex]);
    locations.push([yIndex-1,xIndex+1]);
    locations.push([yIndex,xIndex-1]);
    locations.push([yIndex,xIndex+1]);
    locations.push([yIndex+1,xIndex-1]);
    locations.push([yIndex+1,xIndex]);
    locations.push([yIndex+1,xIndex+1]);
    // console.log(locations);
    
    for(var i = 0; i<locations.length; i++){
        if(locations[i][0]<0 || locations[i][0]>=array.length || (locations[i][1]<0 || locations[i][1]>=array[0].length)) continue;
        results.push(locations[i]);
    }
    return results;
}
/** Counts the number of mines in adjacent tiles of a specified index of a tile[][]
 * 
 * @param {Tile[][]} array 
 * @param {int} yIndex 
 * @param {int} xIndex 
 * @returns {int} the total number of adjacent mines
 */
function adjacentMines(array,yIndex,xIndex){
    var sum = 0;
    var tiles = adjacentIndexes(array,yIndex,xIndex);
    // console.log(tiles);

    for(var i = 0; i<tiles.length; i++){
        if(tiles[i].isMine) sum++;
    }
    return sum;
}




/**
 * Takes a board (2D array of Tile objects) and returns an identical board with minesweeper values populated
 * @param {Tile[][]} inputBoard 
 * @param {float} mineRate rate of tiles to be mines
 * @param {int} yIndex yIndex of initial clicked tile
 * @param {int} xIndex xIndex of initial clicked tile
 * @returns {Tile[][]} resultantBoard
 */
function generateBoardWithMinesweeper(inputBoard, mineRate, yIndex, xIndex){
    const numberMines = Math.floor(mineRate*inputBoard.length*inputBoard[0].length);
    var mineLocations = generateMineLocations(inputBoard[0].length, inputBoard.length,numberMines, yIndex, xIndex);
    // console.log(numberMines+" Mines; \nmine locations:");
    // console.log(mineLocations);

    // console.log(inputBoard);

    for(var y = 0; y<inputBoard.length; y++){
        for(var x = 0; x<inputBoard[y].length; x++){
            if(mineLocations[y][x]){
                inputBoard[y][x].isMine = true;
            }
        }
    }
    console.log("Populated Mines:");
    console.log(inputBoard);

    for(var y = 0; y<inputBoard.length; y++){
        for(var x = 0; x<inputBoard[y].length; x++){
            inputBoard[y][x].nearbyMines = adjacentMines(board,y,x);
        }
    }
    
    return inputBoard;
}
/**
 * Adds chess data to the board
 * @param {int} yIndex yIndex of initial clicked tile
 * @param {int} xIndex xIndex of initial clicked tile
 */
function addMinesweeperToBoard(yIndex, xIndex){
    board = generateBoardWithMinesweeper(board,0.18, yIndex, xIndex);
}

/**
 * Checks the board for the conditions for a minesweeper game to start.
 * If the conditions are found, it generates a minesweeper board and starts the game
 */
function runMinesweeperStart(){
    if(minesweeperStarted)return;
    const breakThreshold = 4;
    for(var y = 0; y<board.length; y++){
        for(var x = 0; x<board[y].length; x++){
            if(board[y][x].damage>=breakThreshold){
                //Start minesweeper
                addMinesweeperToBoard(y,x);
                board[y][x].discovered = true;



                minesweeperStarted = true;
                return;
            }
        }
    }
}
/**
 * Updates all minesweeper tiles. Propagates any empty tiles by discovering all surrounding tile. 
 */
var skippedTiles = [];
function propagateMinesweeper(){
    //iterates through the whole board:
    for(var y = 0; y<board.length; y++){
        for(var x = 0; x<board.length; x++){

            //Checks if we have already propagated this tile
            var skipTile = false;
            for(var b = 0; b<skippedTiles.length; b++){
                if(skippedTiles[b][0]==y && skippedTiles[b][1]){
                    //We have already propagated this tile, therefore we can move onto the next
                    skipTile = true;
                    break;//Breaks propagated tiles loop
                }
            }
            //If we have already propagated this tile, continue from the x loop
            if(skipTile) continue;

            //If we have not already propagated this tile, 
            if(board[y][x].discovered && board[y][x].nearbyMines<1){
                //If tile has zero nearby mines, discover all adjacent tiles
                var tilesToDiscover = adjacentLocations(board,y,x);
                for(var a = 0; a<tilesToDiscover.length;a++){
                    board[tilesToDiscover[a][0],tilesToDiscover[a][1]].discovered = true;
                }
                propagatedTiles.push([y,x]);
            }
        }
    }
}
function checkMinesweeperExplosion(){
    for(var y = 0; y<board.length; y++){
        for(var x = 0; x<board.length; x++){
            if(board[y][x].discovered && board[y][x].isMine){
                
            }
        }
    }
}