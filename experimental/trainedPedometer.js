// An estimation we have is that one peak and trough equate to 1 step.
// As such one peak equates to one step.
// How do we get into active mode and how do we factor in both "z" and "y", both "trough" and "peak".

//Currently Z data is the only reliable pick up after training with data. As such we are removing the Y data to save processing.
//There is a problem where if the arm is help down it oscillates natural at the range of the walking range. However, we must
// figure out a way to check of frequency.
let yArray = [];
let zArray = [];

let yPeak = 0;
let zPeak = 0;
let yTrough = 0;
let zTrough = 0;

const params = require("Storage").readJSON("walkPrm.json", true);

Bangle.on('accel', function(obj) {
  //Reduce to less.
  if(zArray.length === 5){
    zArray.shift();
  }
  // if(yArray.length === 5){
  //   yArray.shift();
  // }

  //Push new value.
  // yArray.push(obj.y);
  zArray.push(obj.z);
  //For Y.
  // if (yArray.length === 5){
  //   if(yArray[2] <= params.y.peakUpperLimit && yArray[2] >= params.y.peakLowerLimit){
  //     //Checking if in range for a peak
  //     if(yArray[2] > yArray[0] && yArray[2] > yArray[1] && yArray[2] > yArray[3] && yArray[2] > yArray[4]){
  //       //Peak - now checking for magnitude
  //       if((yArray[2] / yArray[0]) <= params.y.peakUpMagUpperLimit && (yArray[2] / yArray[0]) >= params.y.peakUpMagLowerLimit && (yArray[2] / yArray[4]) <= params.y.peakDownMagUpperLimit && (yArray[2] / yArray[4]) >= params.y.peakDownMagLowerLimit){
  //         console.log("Y Peak with amplitude found.");
  //       }
  //     }
  //   } else if(yArray[2] <= params.y.troughUpperLimit && yArray[2] >= params.y.troughLowerLimit){
  //     //Checking if in range for a Trough
  //     if(yArray[2] < yArray[0] && yArray[2] < yArray[1] && yArray[2] < yArray[3] && yArray[2] < yArray[4]){
  //       //Trough / now checking for magnitude
  //       if((yArray[0] / yArray[2]) <= params.y.troughUpMagUpperLimit && (yArray[0] / yArray[2]) >= params.y.troughUpMagLowerLimit && (yArray[4] / yArray[2]) <= params.y.troughDownMagUpperLimit && (yArray[4] / yArray[2]) >= params.y.troughDownMagLowerLimit){
  //         console.log("Y Trough with amplitude found.");
  //       }
      }
  //   }
  // }

  if (zArray.length === 5){
    if(zArray[2] <= params.z.peakUpperLimit && zArray[2] >=  params.z.peakLowerLimit){
      //Checking if in range for a peak
      if(zArray[2] > zArray[0] && zArray[2] > zArray[1] && zArray[2] > zArray[3] && zArray[2] > zArray[4]){
        //Peak / now checking for magnitude
        if((zArray[2] / zArray[0]) <= params.z.peakUpMagUpperLimit && (zArray[2] / zArray[0]) >= params.z.peakUpMagLowerLimit && (zArray[2] / zArray[4]) <= params.z. peakDownMagUpperLimit && (zArray[2] / zArray[4]) >= params.z.peakDownMagLowerLimit){
          console.log("Z Peak with amplitude found.");
          zPeak++;
        }
      }
    } else if(zArray[2] <= params.z.troughUpperLimit && zArray[2] >= params.z.troughLowerLimit){
      //Checking if in range for a Trough
      if(zArray[2] < zArray[0] && zArray[2] < zArray[1] && zArray[2] < zArray[3] && zArray[2] < zArray[4]){
        //Trough - now checking for magnitude
        if((zArray[0] / zArray[2]) <= params.z.troughUpMagUpperLimit && (zArray[0] / zArray[2]) >= params.z.troughUpMagLowerLimit && (zArray[4] / zArray[2]) <= params.z. troughDownMagUpperLimit && (zArray[4] / zArray[2]) >= params.z.troughDownMagLowerLimit){
          console.log("Z Trough with amplitude found.");
          zTrough++;
        }
      }
    }
  }
});

Bangle.on("touch", function(btn){console.log((zTrough + zPeak)/2)});
