// This program gets the parameter for arm swing. Whereby, the z and y data usually represent a sin wave.
// The arm has a cyclical motion when walking without holding things and what not.

let data = require('./data.js');

function getMean(arr){
  let sum = 0;
  for(let i = 0; i < arr.length; i++){
    sum +=arr[i];
  }
  return (sum / arr.length);
}

function getSD(arr){
  let mean = getMean(arr);
  let differences = [];
  let sumOfDifferences = 0;
  for(let i = 0; i < arr.length; i++){
    differences.push(Math.pow((mean - arr[i]), 2));
  }
  for(let j = 0; j < arr.length; j++){
    sumOfDifferences += differences[j];
  }
  return Math.sqrt((sumOfDifferences / (arr.length - 1)));
}

function getPeakData(arr){
  let peaks = [];
  let troughs = [];

  let peakUpMag = [];
  let peakDownMag = [];

  let troughDownMag = [];
  let troughUpMag = [];

  for(let i = 0; i<arr.length; i++){
    let minus2;
    let minus1;
    let n;
    let plus1;
    let plus2;

    //Placing variables.
    n = arr[i];
    if(i - 2 >= 0){
      minus2 = arr[i-2];
    }
    if(i - 1 >= 0){
      minus1 = arr[i-1];
    }
    if(i + 1 < arr.length - 1){
      plus1 = arr[i+1];
    }
    if(i + 2 <= arr.length - 1){
      plus2 = arr[i+2];
    }

    if(minus2 !== undefined && minus1 !== undefined && plus1 !== undefined && plus2 !== undefined ){
      if(n > minus2 && n > minus1 && n > plus1 && n > plus2){
        //Detected peak.
        peaks.push(n);
        //Now we need to figure out the up and down magnitudes. We do this by creating a collection of magnitudes.
        peakUpMag.push(n - minus2);
        peakDownMag.push(n - plus2);

      } else if(n < minus2 && n < minus1 && n < plus1 && n < plus2){
        //Detected trough.
        troughs.push(n);
        //Now we need to figure out the up and down magnitudes.
        troughUpMag.push(minus2 - n);
        troughDownMag.push(plus2 - n);
      }
    }
  }

  return ({
    peakMean: getMean(peaks),
    peakSD: getSD(peaks),
    peakUpMean: getMean(peakUpMag),
    peakDownMean: getMean(peakDownMag),
    peakUpSD: getSD(peakUpMag),
    peakDownSD: getSD(peakDownMag),
    troughMean: getMean(troughs),
    troughSD: getSD(troughs),
    troughUpMean: getMean(troughUpMag),
    troughDownMean: getMean(troughDownMag),
    troughUpSD: getSD(troughUpMag),
    troughDownSD: getSD(troughDownMag),
  });
}


let yData = getPeakData(data.y);
let zData = getPeakData(data.z);

function getParameterData(data){
  let peakUpperLimit;
  let peakLowerLimit;
  let troughUpperLimit;
  let troughLowerLimit;
  let peakMagUpperLimit;
  let peakMagLowerLimit;
  let troughMagUpperLimit;
  let troughMagLowerLimit;

  peakUpperLimit = data.peakMean + data.peakSD;
  peakLowerLimit = data.peakMean - data.peakSD;
  troughUpperLimit = data.troughMean + data.troughSD;
  troughLowerLimit = data.troughMean - data.troughSD;

  peakUpMagUpperLimit = data.peakUpMean + data.peakUpSD;
  peakUpMagLowerLimit = data.peakUpMean - data.peakUpSD;
  peakDownMagUpperLimit = data.peakDownMean + data.peakDownSD;
  peakDownMagLowerLimit = data.peakDownMean - data.peakDownSD;

  troughUpMagUpperLimit = data.troughUpMean + data.troughUpSD;
  troughUpMagLowerLimit = data.troughUpMean - data.troughUpSD;
  troughDownMagUpperLimit = data.troughDownMean + data.troughDownSD;
  troughDownMagLowerLimit = data.troughDownMean - data.troughDownSD;

  return {
    peakUpperLimit: peakUpperLimit,
    peakLowerLimit: peakLowerLimit,
    troughUpperLimit: troughUpperLimit,
    troughLowerLimit: troughLowerLimit,

    peakUpMagUpperLimit: peakUpMagUpperLimit,
    peakUpMagLowerLimit: peakUpMagLowerLimit,
    peakDownMagUpperLimit: peakDownMagUpperLimit,
    peakDownMagLowerLimit: peakDownMagLowerLimit,

    troughUpMagUpperLimit: troughUpMagUpperLimit,
    troughUpMagLowerLimit: troughUpMagLowerLimit,
    troughDownMagUpperLimit: troughDownMagUpperLimit,
    troughDownMagLowerLimit: troughDownMagLowerLimit
  }
}

console.log(getParameterData(yData));
