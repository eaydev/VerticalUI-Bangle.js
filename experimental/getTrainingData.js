// This program gets the parameter for arm swing. Whereby, the z and y data usually represent a sin wave.
// The arm has a cyclical motion when walking normally.
// This aims to discover threshold characteristic y and z values for arm movement during walks.
// Thoeretically, should get more accuarte the bigger the data sample.

const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile);


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

function getPeakData(arr, timeArr){
  let peaks = [];
  let peakTimeStamp = [];
  let troughs = [];
  let troughTimeStamp = [];

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
        //Put time timeStamp
        peakTimeStamp.push(timeArr[i]);
        //Now we need to figure out the up and down magnitudes. We do this by creating a collection of magnitudes.
        peakUpMag.push(n / minus2);
        peakDownMag.push(n / plus2);

      } else if(n < minus2 && n < minus1 && n < plus1 && n < plus2){
        //Detected trough.
        troughs.push(n);
        //Put time timeStamp
        troughTimeStamp.push(timeArr[i]);
        //Now we need to figure out the up and down magnitudes.
        troughUpMag.push(minus2 / n);
        troughDownMag.push(plus2 / n);
      }
    }
  }

  // Calculate time difference between troughs and peaks.
  let timeBetweenPeaks = [];
  let timeBetweenTroughs = [];

  for(let j=0; j<peakTimeStamp.length;j++){
    if(j === 0){continue};
    timeBetweenPeaks.push(peakTimeStamp[j] - peakTimeStamp[j-1]);
  }

  for(let k=0; k<troughTimeStamp.length;k++){
    if(k === 0){continue};
    timeBetweenTroughs.push(troughTimeStamp[k] - troughTimeStamp[k-1]);
  }

  return ({
    timeBetweenPeaksMean: getMean(timeBetweenPeaks),
    timeBetweenPeaksSD: getSD(timeBetweenPeaks),
    timeBetweenTroughsMean: getMean(timeBetweenTroughs),
    timeBetweenTroughsSD: getSD(timeBetweenTroughs),
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

function getParameterData(data){
  let peakUpperLimit;
  let peakLowerLimit;
  let troughUpperLimit;
  let troughLowerLimit;
  let peakMagUpperLimit;
  let peakMagLowerLimit;
  let troughMagUpperLimit;
  let troughMagLowerLimit;
  let timeBetweenPeaksUpperLimit;
  let timeBetweenPeaksLowerLimit;

  timeBetweenPeaksUpperLimit = data.timeBetweenPeaksMean + data.timeBetweenPeaksSD;
  timeBetweenPeaksLowerLimit = data.timeBetweenPeaksMean - data.timeBetweenPeaksSD;

  timeBetweenTroughsUpperLimit = data.timeBetweenTroughsMean + data.timeBetweenTroughsSD;
  timeBetweenTroughsLowerLimit = data.timeBetweenTroughsMean - data.timeBetweenTroughsSD;

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
    timeBetweenPeaksUpperLimit : timeBetweenPeaksUpperLimit,
    timeBetweenPeaksLowerLimit : timeBetweenPeaksLowerLimit,
    timeBetweenTroughsUpperLimit : timeBetweenTroughsUpperLimit,
    timeBetweenTroughsLowerLimit : timeBetweenTroughsLowerLimit,

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

let data = {
  y: [],
  z: [],
  timeStamps: []
}

//Getting data from CSV
const inputFile = "walkdata3";
readFile(`${inputFile}.csv`, "utf8")
  .then(res =>{
    let rows = res.split("\r\n");
    for(let i = 0; i < rows.length; i++){
      if(i === 0){continue};
      let col = rows[i].split(",");
      data.y.push(Number(col[0]));
      data.z.push(Number(col[1]));
      data.timeStamps.push(Number(col[2]));
    }
  })
  .then(()=>{
    //Arranging data derived from CSV
    let yData = getPeakData(data.y, data.timeStamps);
    let zData = getPeakData(data.z, data.timeStamps);

    const walkingParameterObj = {
      y: getParameterData(yData),
      z: getParameterData(zData)
    }
    //console.log(walkingParameterObj);

    const walkingParameters = JSON.stringify(walkingParameterObj);

    fs.writeFile(`walkPrm.json`, walkingParameters, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    })
  })
  .catch(err =>{console.log(err)})
