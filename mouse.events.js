'use strict';

function mousePressed() {

    //console.log('pressed');

    if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<height) {
        console.log('user clicked inside canvas');
        addPointBecauseUserClickedOnEmptyArea();
        //console.table(mathPoints);
    }
}


function mouseReleased() {
    //console.log('released');
}


function mouseDragged() {
    console.log('dragged');
    if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<height) {
        addPointBecauseUserClickedOnEmptyArea();
    }

}

function mouseMoved() {

}

function mouseClicked()  {
/*
    //console.log('clicked');

    if (mouseX>0 && mouseX<width && mouseY>0 && mouseY<height) {
        console.log('user clicked inside canvas');
        removePointIfUserClickedOnIt();
        addPointIfUserClickedOnEmptyArea();
        console.table(mathPoints);
    }
*/
}
