// An estimation we have is that one peak and trough equate to 1 step each.
//Currently Z data is the only reliable pick up after training with data. As such we are removing the Y data to save processing.
//There is a problem where if the arm is help down it oscillates natural at the range of the walking range. However, we must
//figure out a way to check of frequency.

let steps = 0;
let zArray = [];
let zPeakArray = [];
let zTroughArray = [];

const params = require("Storage").readJSON("walkPrm.json", true);

Bangle.on('accel', function(obj) {
  let date = new Date();
  let now = date.getTime();
  //Reduce to less.
  if(zArray.length === 5){
    zArray.shift();
  }
  zArray.push(obj.z);

  if (zArray.length === 5){
    if(zArray[2] <= params.z.peakUpperLimit && zArray[2] >=  params.z.peakLowerLimit){
      //Checking if in range for a peak
      if(zArray[2] > zArray[0] && zArray[2] > zArray[1] && zArray[2] > zArray[3] && zArray[2] > zArray[4]){
        //Peak, now checking for magnitude
        if((zArray[2] / zArray[0]) <= params.z.peakUpMagUpperLimit && (zArray[2] / zArray[0]) >= params.z.peakUpMagLowerLimit && (zArray[2] / zArray[4]) <= params.z. peakDownMagUpperLimit && (zArray[2] / zArray[4]) >= params.z.peakDownMagLowerLimit){
          //console.log("Z Peak with amplitude found.");
          zPeakArray.push(now);
          if(zPeakArray.length > 2){
            zPeakArray.shift();
          }
          if(zPeakArray.length === 2){
            if((zPeakArray[1] - zPeakArray[0]) <= params.z.timeBetweenPeaksUpperLimit && (zPeakArray[1] - zPeakArray[0]) >= params.z.timeBetweenPeaksLowerLimit){
              console.log("Valid step.");
              steps += 2;
            }
          }
        }
      }
    } else if(zArray[2] <= params.z.troughUpperLimit && zArray[2] >= params.z.troughLowerLimit){
      //Checking if in range for a Trough
      if(zArray[2] < zArray[0] && zArray[2] < zArray[1] && zArray[2] < zArray[3] && zArray[2] < zArray[4]){
        //Trough, now checking for magnitude
        if((zArray[0] / zArray[2]) <= params.z.troughUpMagUpperLimit && (zArray[0] / zArray[2]) >= params.z.troughUpMagLowerLimit && (zArray[4] / zArray[2]) <= params.z. troughDownMagUpperLimit && (zArray[4] / zArray[2]) >= params.z.troughDownMagLowerLimit){
          //console.log("Z Peak with amplitude found.");
          zTroughArray.push(now);
          if(zTroughArray.length > 2){
            zTroughArray.shift();
          }
          if(zTroughArray.length === 2){
            //console.log(zTroughArray);
            if((zTroughArray[1] - zTroughArray[0]) <= params.z.timeBetweenTroughsUpperLimit && (zTroughArray[1] - zTroughArray[0]) >= params.z.timeBetweenTroughsLowerLimit){
              console.log("Valid step.");
              steps += 2;
            }
          }
        }
      }
    }
  }
});

Bangle.on("touch", (btn) => {console.log(steps);});