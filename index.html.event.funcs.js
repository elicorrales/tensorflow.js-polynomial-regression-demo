'use strict';


const doResetInitialValues = () => {
    optimizeStartTime = new Date().getTime();
    optimizeEndTime = new Date().getTime();
    optimized = false;
    reset = true;
    optimizeStartTime = new Date().getTime();
}

document.getElementById('learningRate').innerHTML = document.getElementById('learningRateSlider').value;
const doChangeLearningRate = (slider) => {
    optimizeStartTime = new Date().getTime();
    optimizeEndTime = new Date().getTime();
    optimized = false;
    learningRate = slider.value;
    document.getElementById('learningRate').innerHTML = learningRate;
    optimizeStartTime = new Date().getTime();
}

document.getElementById('momentum').innerHTML = document.getElementById('momentumSlider').value;
const doChangeMomentum = (slider) => {
    optimizeStartTime = new Date().getTime();
    optimizeEndTime = new Date().getTime();
    optimized = false;
    momentum = slider.value;
    document.getElementById('momentum').innerHTML = momentum;
    optimizeStartTime = new Date().getTime();
}



let showLine = false;
const doShowLineOrDoNotShowLine = (button) => {

    optimizeStartTime = new Date().getTime();
    optimizeEndTime = new Date().getTime();
    optimized = false;
    showLine = showLine?false:true;

    if (showLine) {
        button.className = 'btn btn-primary';
        button.innerHTML = '<font size="+1">Show Line</font>';
        reset = true;
    } else {
        button.className = 'btn btn-default';
        button.innerHTML = '<font size="+1">No Line</font>';
    }
}

const doRemoveAllPointsOnCanvas = () => {

    optimizeStartTime = new Date().getTime();
    optimizeEndTime = new Date().getTime();
    optimized = false;
    xVals = [];
    yVals = [];
    lastLineX0 = undefined;
    lastLineY0 = undefined;
    lastLineX1 = undefined;
    lastLineY1 = undefined;
    tfA = undefined;
    tfB = undefined;
    tfC = undefined;
}

const doUseFormula = (button, number) => {
    optimizeStartTime = new Date().getTime();
    optimizeEndTime = new Date().getTime();
    optimized = false;
    if (button.className !== 'btn btn-primary') {
        document.getElementById('formula0').className = 'btn btn-default';
        document.getElementById('formula1').className = 'btn btn-default';
        document.getElementById('formula2').className = 'btn btn-default';
        document.getElementById('formula3').className = 'btn btn-default';
        button.className = 'btn btn-primary';
        useWhichFormula = number;
        reset = true;
    } 
}

const doUseOptimizer = (button, number) => {
    optimizeStartTime = new Date().getTime();
    optimizeEndTime = new Date().getTime();
    optimized = false;
    if (button.className !== 'btn btn-primary') {
        document.getElementById('optimizer0').className = 'btn btn-default';
        document.getElementById('optimizer1').className = 'btn btn-default';
        document.getElementById('optimizer2').className = 'btn btn-default';
        document.getElementById('optimizer3').className = 'btn btn-default';
        document.getElementById('optimizer4').className = 'btn btn-default';
        document.getElementById('optimizer5').className = 'btn btn-default';
        document.getElementById('optimizer6').className = 'btn btn-default';
        button.className = 'btn btn-primary';
        useWhichOptimizer = number;
        //reset = true;
    } 
}

