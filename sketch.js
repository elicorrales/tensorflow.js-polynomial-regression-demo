'use strict';

let canvas;

function setup() {

    setupRegressionLineStuff();

    canvas = createCanvas(500,500);
    canvas.parent('canvasParent');
    background(0);
}

function draw() {

    try {
        if (showLine) setupRegressionLineStuff();

        if (showLine) seeIfNewOptimizerRequiredBecauseLearningRateOrMomentumChanged();

        background(0);

        drawPointsUserAdded();

        if (showLine && !optimized) {
            showMessages('info','<font size="+1">Working ...' + round((new Date().getTime() - optimizeStartTime)/1000) + ' secs</font>');
            guessAndMinimizeLoss(); // 'train'
        }

        if (showLine) drawRegressionLine();

        console.log(tf.memory().numTensors);

        if (optimized) {
            showMessages('success','<font size="+1">Optimized in ' + round((optimizeEndTime - optimizeStartTime)/1000) + ' secs</font>');
        }

    } catch (error) {
        showMessages('danger',error);
    }
}


