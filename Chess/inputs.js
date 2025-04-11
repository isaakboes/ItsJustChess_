/*
Takes all inputs from the user, and allows the main document to detect them.
I didn't comment this one that well because I don't use it much, but it's pretty easy to understand.
the 'key' object stores all of the keys that the game uses, if you need more, just declare one in the first 'key'
statement and update the getKeyDown and getkeyUp statements.
*/
var mouseX;
var mouseY;

var sc = 0;

var rightMouseDown = false;
var mouseDown = false;
var rightMouseDown = false;


//For dragging the screen with the mouse
var mouseStartDragY = 0; //The initial position the mouse was when drag was started
var mouseStartDragX = 0; //The initial position the mouse was when drag was started


var key = {//keys object, stores what keys are down.
    a:false,
    b:false,
    c:false,
    d:false,
    e:false,
    f:false,
    g:false,
    h:false,
    i:false,
    j:false,
    k:false,
    l:false,
    m:false,
    n:false,
    o:false,
    p:false,
    q:false,
    r:false,
    s:false,
    t:false,
    u:false,
    v:false,
    w:false,
    x:false,
    y:false,
    z:false,
    num1:false,
    num2:false,
    num3:false,
    num4:false,
    num5:false,
    num6:false,
    num7:false,
    num8:false,
    num9:false,
    num0:false,
    shift:false,
    control:false,
    escape:false,
    backspace:false,
    enter:false,
    left:false,
    right:false,
    up:false,
    down:false,
    capsLock:false,
    alt:false,
    meta:false,


    // q:false,
    // d:false,
    // a:false,
    // s:false,
    // w:false,
    // up:false,
    // down:false,
    // left:false,
    // right:false,
    // c:false,
    // v:false,
    // g:false,
    // h:false,
    // l:false,
    // shift:false,
    // control:false,
    // escape:false,
    // num1:false,
    // num2:false,
    // num3:false
}
document.addEventListener("keydown",getKeyDown);//adds a listener to detect keys that are down
document.addEventListener("keyup",getKeyUp);//adds a listener to detect keys that are up

function getKeyDown(k){//if the key is up
    //k.preventDefault();
    switch(k.key){
        case "a": case "A":key.a=true;break;
        case "b": case "B":key.b=true;break;
        case "c": case "C":key.c=true;break;
        case "d": case "D":key.d=true;break;
        case "e": case "E":key.e=true;break;
        case "f": case "F":key.f=true;break;
        case "g": case "G":key.g=true;break;
        case "h": case "H":key.h=true;break;
        case "i": case "I":key.i=true;break;
        case "j": case "J":key.j=true;break;
        case "k": case "K":key.k=true;break;
        case "l": case "L":key.l=true;break;
        case "m": case "M":key.m=true;break;
        case "n": case "N":key.n=true;break;
        case "o": case "O":key.o=true;break;
        case "p": case "P":key.p=true;break;
        case "q": case "Q":key.q=true;break;
        case "r": case "R":key.r=true;break;
        case "s": case "S":key.s=true;break;
        case "t": case "T":key.t=true;break;
        case "u": case "U":key.u=true;break;
        case "v": case "V":key.v=true;break;
        case "w": case "W":key.w=true;break;
        case "x": case "X":key.x=true;break;
        case "y": case "Y":key.y=true;break;
        case "z": case "Z":key.z=true;break;
        case "1":key.num1=true;break;
        case "2":key.num2=true;break;
        case "3":key.num3=true;break;
        case "4":key.num4=true;break;
        case "5":key.num5=true;break;
        case "6":key.num6=true;break;
        case "7":key.num7=true;break;
        case "8":key.num8=true;break;
        case "9":key.num9=true;break;
        case "0":key.num0=true;break;
        case "Shift":key.shift=true;break;
        case "Control":key.control=true;break;
        case "Escape":key.escape = true;break;
        case "Backspace":key.backspace = true;break;
        case "Enter":key.enter = true;break;
        case "CapsLock":key.capsLock = true;break;
        case "Alt":key.alt = true;break;
        case "Meta":key.meta = true;break;
    }
}
function getKeyUp(k){//if the key is down
    //k.preventDefault();
    switch(k.key){
        case "a": case "A":key.a=false;break;
        case "b": case "B":key.b=false;break;
        case "c": case "C":key.c=false;break;
        case "d": case "D":key.d=false;break;
        case "e": case "E":key.e=false;break;
        case "f": case "F":key.f=false;break;
        case "g": case "G":key.g=false;break;
        case "h": case "H":key.h=false;break;
        case "i": case "I":key.i=false;break;
        case "j": case "J":key.j=false;break;
        case "k": case "K":key.k=false;break;
        case "l": case "L":key.l=false;break;
        case "m": case "M":key.m=false;break;
        case "n": case "N":key.n=false;break;
        case "o": case "O":key.o=false;break;
        case "p": case "P":key.p=false;break;
        case "q": case "Q":key.q=false;break;
        case "r": case "R":key.r=false;break;
        case "s": case "S":key.s=false;break;
        case "t": case "T":key.t=false;break;
        case "u": case "U":key.u=false;break;
        case "v": case "V":key.v=false;break;
        case "w": case "W":key.w=false;break;
        case "x": case "X":key.x=false;break;
        case "y": case "Y":key.y=false;break;
        case "z": case "Z":key.z=false;break;
        case "1":key.num1=false;break;
        case "2":key.num2=false;break;
        case "3":key.num3=false;break;
        case "4":key.num4=false;break;
        case "5":key.num5=false;break;
        case "6":key.num6=false;break;
        case "7":key.num7=false;break;
        case "8":key.num8=false;break;
        case "9":key.num9=false;break;
        case "0":key.num0=false;break;
        case "Shift":key.shift=false;break;
        case "Control":key.control=false;break;
        case "Escape":key.escape = false;break;
        case "Backspace":key.backspace = false;break;
        case "Enter":key.enter = false;break;
        case "CapsLock":key.capsLock = false;break;
        case "Alt":key.alt = false;break;
        case "Meta":key.meta = false;break;
    }
}

window.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    
});

canv.onwheel = function(e){
    e.preventDefault();
    sc += e.deltaY * -0.01;
}

window.onmousemove = function (e){
    mouseX = e.clientX;
    mouseY = e.clientY;
}
window.onmousedown = function (e){
    if("buttons" in e){
        mouseDown = e.buttons == 1;
        rightMouseDown = e.buttons == 2;

        if(e.buttons == 1){
            mouseStartDragX = mouseX;
            mouseStartDragY = mouseY;
        }
    }
}
window.onmouseup = function (e){
    mouseDown = false;
    rightMouseDown = false;
    mouseStartDragX = 0;
    mouseStartDragY = 0;
}

