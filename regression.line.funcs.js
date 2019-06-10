'use strict';

let optimizeStartTime = new Date().getTime();
let optimizeEndTime = new Date().getTime();
let optimized = false;

let reset = false;

let prevA = 0;
let prevB = 0;
let prevC = 0;
let prevD = 0;

let tfA;      // m
let tfB;    // b
let tfC;
let tfD;
let lastLineX0;
let lastLineY0;
let lastLineX1;
let lastLineY1;
let lastLineXs = [];
let lastLineYs = [];

let learningRate = document.getElementById('learningRateSlider').value;
let prevLearningRate = learningRate;
let momentum = document.getElementById('momentumSlider').value;
let prevMomentum = momentum;

const setupRegressionLineStuff = () => {

    if (tfA === undefined || reset === true) {
        // the regression line has to start somewhere
        tfA = tf.variable(tf.scalar(random(1)));
        tfB = tf.variable(tf.scalar(random(1)));
        tfC = tf.variable(tf.scalar(random(1)));
        tfD = tf.variable(tf.scalar(random(1)));
        reset = false;
    }
}

let optimizer;
let useWhichOptimizer;
const seeIfNewOptimizerRequiredBecauseLearningRateOrMomentumChanged = () => {

    //clearMessages();

    if (optimizer === undefined && useWhichOptimizer === undefined) {
        showMessages('danger','Need to Choose Optimizer');
        return;
    }

    learningRate = parseFloat(learningRate);
    momentum = parseFloat(momentum);
    if (prevLearningRate !== learningRate) {
        switch (useWhichOptimizer) {
            case '0': optimizer = tf.train.sgd(learningRate); break;
            case '1': optimizer = tf.train.momentum(learningRate,momentum); break;
            case '2': optimizer = tf.train.adam(learningRate); break;
            case '3': optimizer = tf.train.adamgrad(learningRate); break;
            case '4': optimizer = tf.train.adadelta(learningRate); break;
            case '5': optimizer = tf.train.adamax(learningRate); break;
            case '6': optimizer = tf.train.rmsprop(learningRate); break;
        }
        prevLearningRate = learningRate;
    }
    if (prevMomentum !== momentum) {
        tf.train.momentum(learningRate,momentum);
        prevMomentum = momentum;
    }
};


const guessAndMinimizeLoss = () => {

    if (tfA !== undefined && optimizer !== undefined) {
        if (xVals !== undefined && xVals.length > 0 ) {
            tf.tidy(() => {
                const ys = tf.tensor1d(yVals);
                optimizer.minimize(() =>  loss(predictYs(xVals), ys));
            });
            alreadyDrewRegressionLine = false;
        }

        let A = tfA.dataSync();
        let B = tfB.dataSync();
        let C = tfC.dataSync();
        let D = tfD.dataSync();
        //console.log(Math.abs(prevA - A[0]), ' ', Math.abs(prevB - B[0]), ' ' , Math.abs(prevC - C[0]), ' ', Math.abs(prevD - D[0]));
        let optimizedValue = 0.0007;
        if (useWhichFormula === '3') optimizedValue = 0.0004;
        if ( (Math.abs(prevA - A[0]) < optimizedValue) && (Math.abs(prevB - B[0]) < optimizedValue) 
                && (Math.abs(prevC - C[0]) < optimizedValue) && (Math.abs(prevD - D[0]) < optimizedValue)) {

            optimized = true;
            optimizeEndTime = new Date().getTime();
        }
        prevA = A;
        prevB = B;
        prevC = C;
        prevD = D;
    }
}



//predictions are the y values from the predict function
//labels are the REAL y values
const loss = (predictions, labels) => {
    if (predictions === undefined) {
        throw 'You must be missing a formula, or an optimizer';
    }
    return predictions.sub(labels).square().mean();
}


let useWhichFormula;
const predictYs = (xVals) => {

    //clearMessages();

    if (useWhichFormula === undefined) {
        showMessages('danger','Need to Choose Formula');
        return;
    }

    const tfxs = tf.tensor1d(xVals);

    switch (useWhichFormula) {
        case '0':
            // y = m * x  + b  ; slope-intercept formula for a line
            return tfxs.mul(tfA);
            break;
        case '1':
            // y = m * x  + b  ; slope-intercept formula for a line
            return tfxs.mul(tfA).add(tfB);
            break;
        case '2':
            // y = m * x  + b  ; slope-intercept formula for a line
            return tfxs.square().mul(tfA).add(tfxs.mul(tfB)).add(tfC);
            break;
        case '3':
            // y = m * x  + b  ; slope-intercept formula for a line
            return tfxs.pow(3).mul(tfA).add(tfxs.square().mul(tfB)).add(tfxs.mul(tfC)).add(tfD);
            break;
    }
}



let alreadyDrewRegressionLine = false;
const drawRegressionLine = () => {

    //clearMessages();

    if (useWhichFormula === undefined) {
        throw 'danger','Need to Choose Formula';
    }

    if (useWhichOptimizer === undefined) {
        throw 'danger','Need to Choose Optimizer';
    }


    if (xVals !== undefined && xVals.length >0 && !alreadyDrewRegressionLine) {
        alreadyDrewRegressionLine = true;
        stroke(255);

        let lineXs = [];
        let lineYs = [];

        for (let i=0; i<=50; i++) {

            let xIn = map(i,0,50,0,1);

            let rgyVal;
            tf.tidy(() => {
                let tfRgY = predictYs([xIn]);
                rgyVal = tfRgY.dataSync();
            });
            let rgy = rgyVal;
            lineXs.push(map(xIn, 0, 1, 0, width));
            lineYs.push(map(rgy, 0, 1, height, 0));

            lastLineXs = lineXs;
            lastLineYs = lineYs;
        }

    }

    if (lastLineXs !== undefined && lastLineXs.length > 0) {

        strokeWeight(4);
        for (let i=0; i<50; i++) {
            line(lastLineXs[i],lastLineYs[i],lastLineXs[i+1],lastLineYs[i+1]);
        }
    }
}