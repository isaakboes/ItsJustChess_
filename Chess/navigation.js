const scrollStep = 0.1;
const mouseCenteredScroll = true;

var viewX = 30;
var viewY = 30;
var viewScale = 1;

var viewPreviousX = viewX;
var viewPreviousY = viewY;



/** Reduces a value to zero by factoring it by a constant value
 * @param {float} input the value to reduce
 * @param {float} factor the factor by which to scale the value by
 */
function reduceByFactor(input, factor){
    if(input<0.1 && input > -0.1)return 0;
    return input*=factor;
}

/** Returns resultant X value based on scrolling
 * @param {float} globalX
 */
function getViewX(globalX){
    return viewX-globalX*scale;
}
function getViewY(globalY){
    return viewY-globalY*scale;
}
function getViewScale(globalScale){
    return scale*globalScale;
}

function mouseDragScreen(){
    if (mouseDown) {
        viewPreviousX = viewX;
        viewPreviousY = viewY;
        viewX = mouseStartDragX+mouseX;
        viewY = mouseStartDragY+mouseY;
        mapVelocityX = viewX-mapPreviousX;
        mapVelocityY = viewY-mapPreviousY;
      }else{
        
        mapx+=mapVelocityX;
        mapy+=mapVelocityY;
    
        //mapVelocityX = decreaseToZero(mapVelocityX,mapdec);
        //mapVelocityY = decreaseToZero(mapVelocityY,mapdec);
        
        mapVelocityX = reduceByFactor(mapVelocityX,mapdecfactor);
        mapVelocityY = reduceByFactor(mapVelocityY,mapdecfactor);
      }
}
function scrollUp(){
    viewScale+=scrollStep;

    var ox,oy;
    if (!mouseCenteredScroll) {
        ox = mapx-width/2;
        oy = mapy-height/2;
    } else {
        ox = mapx-mouseX;
        oy = mapy-mouseY;
    }
    ox*=1+(1*scrollStep*-1)/2;
    oy*=1+(1*scrollStes*-1)/2;
    if (!mouseCenteredScroll) {
        mapx = width/2+ox;
        mapy = height/2+oy;
    } else {
        mapx = mouseX+ox;
        mapy = mouseY+oy;
    }
}
function scrollDown(){
    viewScale-=scrollStep;

    var ox,oy;
    if (!mouseCenteredScroll) {
        ox = mapx-width/2;
        oy = mapy-height/2;
    } else {
        ox = mapx-mouseX;
        oy = mapy-mouseY;
    }
    ox*=1+(-1*scrollStep*-1)/2;
    oy*=1+(-1*scrollStes*-1)/2;
    if (!mouseCenteredScroll) {
        mapx = width/2+ox;
        mapy = height/2+oy;
    } else {
        mapx = mouseX+ox;
        mapy = mouseY+oy;
    }
}

function updateScaleVariables(){

    viewX = constrain(mapx,width-mapWidth/2*scale,mapWidth/2*scale);
    //MapY needs to be high enough so that the top of the map is on
    viewY = constrain(mapy,height-mapHeight/2*scale,mapHeight/2*scale);
    var boardWidth = 90*boardSizeX;
    var boardHeight = 90*boardSizeY;
    
    var minScaleWidth = canvas.width/boardWidth;
    var minScaleHeight = canvas.height/boardHeight;
    var minScale = (minScaleWidth>minScaleHeight)? minScaleWidth : minScaleHeight;
    
    scale = constrain(minScale, scale, 100);
    

    boardOffsetX = getViewX(0);
    boardOffsetX = getViewY(0);
    tileSize = getViewScale(90);
}
