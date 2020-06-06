//GOAL______|> we wanna output trough and peaks

// y and z
let yArray = [];
let zArray = [];

let yPeak = 0;
let zPeak = 0;
let yTrough = 0;
let zTrough = 0;

const params = require("Storage").readJSON("walkPrm.json", true);
console.log(params);

Bangle.on('accel', function(obj) {
  //Reduce to less.
  if(zArray.length === 5){
    zArray.shift();
  }
  if(yArray.length === 5){
    yArray.shift();
  }

  //Push new value.
  yArray.push(obj.y);
  zArray.push(obj.z);
  //For Y.
  if (yArray.length === 5){
    if(yArray[2] <= params.y.peakUpperLimit && yArray[2] >= params.y.peakLowerLimit){
      //Checking if in range for a peak
      if(yArray[2] > yArray[0] && yArray[2] > yArray[1] && yArray[2] > yArray[3] && yArray[2] > yArray[4]){
        //Peak - now checking for magnitude
        if((yArray[2] - yArray[0]) <= params.y.peakUpMagUpperLimit && (yArray[2] - yArray[0]) >= params.y.peakUpMagLowerLimit && (yArray[2] - yArray[4]) <= params.y.peakDownMagUpperLimit && (yArray[2] - yArray[4]) >= params.y.peakDownMagLowerLimit){
          console.log("Y Peak with amplitude found.");
        }
      }
    } else if(yArray[2] <= params.y.troughUpperLimit && yArray[2] >= params.y.troughLowerLimit){
      //Checking if in range for a Trough
      if(yArray[2] < yArray[0] && yArray[2] < yArray[1] && yArray[2] < yArray[3] && yArray[2] < yArray[4]){
        //Trough - now checking for magnitude
        if((yArray[0] - yArray[2]) <= params.y.troughUpMagUpperLimit && (yArray[0] - yArray[2]) >= params.y.troughUpMagLowerLimit && (yArray[4] - yArray[2]) <= params.y.troughDownMagUpperLimit && (yArray[4] - yArray[2]) >= params.y.troughDownMagLowerLimit){
          console.log("Y Trough with amplitude found.");
        }
      }
    }
  }

  if (zArray.length === 5){
    if(zArray[2] <= params.z.peakUpperLimit && zArray[2] >=  params.z.peakLowerLimit){
      //Checking if in range for a peak
      if(zArray[2] > zArray[0] && zArray[2] > zArray[1] && zArray[2] > zArray[3] && zArray[2] > zArray[4]){
        //Peak - now checking for magnitude
        if((zArray[2] - zArray[0]) <= params.z.peakUpMagUpperLimit && (zArray[2] - zArray[0]) >= params.z.peakUpMagLowerLimit && (zArray[2] - zArray[4]) <= params.z. peakDownMagUpperLimit && (zArray[2] - zArray[4]) >= params.z.peakDownMagLowerLimit){
          console.log("Z Peak with amplitude found.");
        }
      }
    } else if(zArray[2] <= params.z.troughUpperLimit && zArray[2] >= params.z.troughLowerLimit){
      //Checking if in range for a Trough
      if(zArray[2] < zArray[0] && zArray[2] < zArray[1] && zArray[2] < zArray[3] && zArray[2] < zArray[4]){
        //Trough - now checking for magnitude
        if((zArray[0] - zArray[2]) <= params.z.troughUpMagUpperLimit && (zArray[0] - zArray[2]) >= params.z.troughUpMagLowerLimit && (zArray[4] - zArray[2]) <= params.z. troughDownMagUpperLimit && (zArray[4] - zArray[2]) >= params.z.troughDownMagLowerLimit){
          console.log("Z Trough with amplitude found.");
        }
      }
    }
  }
});

//setInterval(function(){console.log(`Steps: ${(zPeak+yPeak+zTrough+yTrough)/2}`);},2000);