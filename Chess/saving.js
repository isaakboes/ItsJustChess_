/*
 * This file contains all code to save and load the board in browser cookies.
 *
 */

/** 
*  Converts an individual move into a string 
* @param {Move} move
* @return {String}  exported move data
*/
function convertMoveToText(move){
    //{randomMove,repeated,x,y,canTake,mustTake}
    var result/* = "{"*/;
    result += (move instanceof RandomMove)? "1":"0";
    result += ",";
    result += (move.repeated)? "1":"0";
    result += ",";
    result +=move.x;
    result += ",";
    result +=move.y;
    result += ",";
    result += (move.canTake)? "1":"0";
    result += ",";
    result += (move.mustTake)? "1":"0";
    //result +="}";

}

function pieceType(piece){
         
    //This is a method of making a switch statement based on what object piece is. 
    //Instead of using "instanceof" we check the constructor of the piece which always corresponds to the lowest object on the inheritance family tree.
    if(piece == null) return "null";
    switch(piece.constructor){
        case Pawn: return "pawn";
        case Bishop: return "bishop";
        case Rook: return "rook";
        case Knight: return "knight";
        case Queen: return "queen";
        case Knook: return "knook";
        case King: return "king";
        case Goose: return "goose";
        case Stupid: return "stupid";
        default: return null;
    }
}
/**
 * Generates a piece object from a string
 * @param {String} pieceData Format: "pieceType-pieceTeam"
 */
function generatePieceFromText(pieceData){
    var data = pieceData.split("-");
    if(data.length<2) return null;
    switch(data[0]){
        case "pawn": return new Pawn(data[1]);
        case "bishop": return new Bishop(data[1]);
        case "rook": return new Rook(data[1]);
        case "knight": return new Knight(data[1]);
        case "queen": return new Queen(data[1]);
        case "knook": return new Knook(data[1]);
        case "king": return new King(data[1]);
        case "goose": return new Goose(data[1]);
        case "stupid": return new Stupid(data[1]);
        default: return null;
    }
}


/** 
*  Converts an individual tile into a string 
* @param {Tile} tile the tile to be converted to a string
* @return {String}  exported tile data
*/
function convertTileToText(tile){
    //pieceType-team,damage,isMine,nearbyMines
    var result = "";
    result += pieceType(tile.piece);
    if(tile.piece !== null){
    result += "-";
    result += tile.piece.team;
    }
    result += ",";
    result += tile.damage;
    result += ",";
    result += (tile.isMine)? "1":"0";
    result += ",";
    result+=tile.nearbyMines;
    return result;
}

/** 
*  Converts the current state of the chess board to a string which can later be saved 
* @param {2D array} boardSave the 2d array of tile objects to save as a string
* @return {String}  exported Board string 
*/
function convertBoardToText(boardSave){
    var result = "";

    for(let i = 0; i<boardSave.length; i++){
        
        for(let j = 0; j<boardSave[i].length; j++){
            result += convertTileToText(boardSave[i][j])
            if(j<boardSave[i].length-1)result += "|"
        }

        result += "]["
    }

    result+=activeTeam;

    return result;
}


const saveDataName = "chessSaveGame1";
/**
 * Saves a string in a cookie
 * @param {String} saveString the data to save in a cookie
 */
function saveCookieData(saveString = convertBoardToText(board)){
    var cookieStr = "";
     cookieStr += saveDataName;
    //var cookieStr = "chessSaveGame1=";
    cookieStr +="=";
    cookieStr += saveString;
    cookieStr+="; path=/";
    document.cookie = cookieStr;
}
function deleteSaveCookie(){
    var cookieStr = saveDataName;
    
    cookieStr+="=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    document.cookie = cookieStr;
}
/**
 * @return {String} text containing the board stored in the save game cookie
 * Returns null in the following circumstances:
 * *1 An error when reading cookies
 * *2 An empty cookie string
 * *3 No valid Saves found
 */
function readSaveCookie(){
    var cookieData = "";
    try{
        cookieData = document.cookie;
    }catch{
        console.log("readSaveCookie() null case 1: error on reading cookie data");
        return null;//Null Case 1
    }
    if(cookieData==""){
        console.log("readSaveCookie() null case 2: empty cookie string");
        return null; // Null Case 2
    }
    const cookies = cookieData.split("; ");
    var validSaves = [];

    for(var i = 0; i<cookies.length; i++){
        if(cookies[i].substring(0,saveDataName.length) == saveDataName){
            validSaves.push(cookies[i]);
        }
    }
    if(validSaves.length<1){
        console.log("readSaveCookie() null case 3: No valid saves found");
        return null;
    }
    //There should always only be one valid save. The code will never create additional cookies. Therefore, we can take only the first element of this list
    return validSaves[0];
}

/**
 * 
 * @param {String} inputString the entire valid cookie containing the saved game
 * @return {2D Array} 2D array of Tile objects 
 */
function generateBoardFromText(inputString){
    const data = inputString.substring(15);
    //console.log(data);
    const dataFields = data.split("][");
    //console.log(dataFields);
    const boardData = dataFields[dataFields.length-1];
    //console.log(boardData);
    
    var resultBoard = []; // The board which will eventually be generated and returned
    for(var i = 0; i<dataFields.length-1; i++){//Iterates through board rows
        resultBoard.push([]); // Adds a new row to new board
        var tilesInRow = dataFields[i].split("|"); // Splits the row data into individual tile data
        //console.log("For i: "+i);
        //console.log(tilesInRow);
        //each element has this format: "pawn-black,0,1,0"
        for(var j = 0; j<tilesInRow.length; j++){ //Iterates through each tile in row
            //console.log("for j: "+j);
            var dataInTile = tilesInRow[j].split(","); //Splits up all the different data for each tile
            //console.log(dataInTile);
            //dataInTile[0] is formatted: "pawn-black"
            //dataInTile[1 through 3] are damage, isMine, nearbyMines
            resultBoard[i][j] = new Tile(generatePieceFromText(dataInTile[0]),dataInTile[1],dataInTile[2],dataInTile[3]);
        }
    }
    return resultBoard;
}
/**
 * 
 * @param {String} inputString the entire valid cookie containing the saved game
 * 
 */
function restoreDataFromText(inputString){
    const data = inputString.substring(15);
    //console.log(data);
    const dataFields = data.split("][");
    //console.log(dataFields);
    const boardData = dataFields[dataFields.length-1];
    activeTeam = boardData
}
/**
 * Handles saving and loading for the entire game. This is run continuously in main() and will return immediately if saving or loading is not needed
 */
function runSaveLoad(){
if(key.s && key.shift/* && key.shift*/){
    //Save the game
    var oldSave = document.cookie;
    saveCookieData();
    console.log("Attempted Save");
    if(document.cookie=="") console.log("Save Failed");
    if(document.cookie==oldSave) console.log("Save Unchanged");
}else if(key.l && key.shift/* && key.shift*/){
    //Load the game
    if(readSaveCookie()==null){
        console.log("Load Error: No valid saves found");
        return;
    }
    board = generateBoardFromText(readSaveCookie());
    restoreDataFromText(readSaveCookie());
    console.log("LOADED :D!!")
}
}