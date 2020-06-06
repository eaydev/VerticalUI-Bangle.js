//The data that we are trying to use in our pedometer.

// We are first of all going to detect peaks and troughs.
// Then we are going to work out the standard deviation of both.
// Thus an upper and lower limit for both.
//
// Then we have to ensure this magnitude is applicable.
// We are first of all going to differences between lower points in peaks and troughs.
// Then we are going to work out the standard deviation of both.
// Thus an upper and lower limit for both, upper and lower movement in the graph.

// The goal is to create a program that will output everything in one go.

//Essentially in this we are feeding it 'ideal data' and deriving z and y parameters.

let fakeArr = [1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5];

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
      //Detecting peaks here:
      if(n > minus2 && n > minus1 && n > plus1 && n > plus2){
        peaks.push(n);
      } else if(n < minus2 && n < minus1 && n < plus1 && n < plus2){
        troughs.push(n);
      }
    }
  }

  console.log({
    peaks: peaks,
    troughs: troughs,
    peakSD: getSD(peaks),
    troughsSD: getSD(troughs)
  });
}

getPeakData(fakeArr);
