//GOAL______|> we wanna output trough and peaks

// y and z
let yArray = [];
let zArray = [];

let yPeaks = 0;

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

  if (yArray.length === 5){
    //Check if in range.
    if(yArray[2] <= 0.7108902236568493 && yArray[2] >= 0.47694005642250525){
      //Check peak or trough
      if(yArray[2] > yArray[0] && yArray[2] > yArray[1] && yArray[2] > yArray[3] && yArray[2] > yArray[4]){
        //Peak
        if((yArray[2] - yArray[0]) <= 0.12574216557990817 && (yArray[2] - yArray[0]) >= 0.011984187657511199 && (yArray[2] - yArray[4]) <= 0.1749380378851586 && (yArray[2] - yArray[4]) >= 0.028091936392260722){
          console.log("Y Peak with amplitude found.");
          yPeaks++;
        }
        //Check for validity with regards to peak amplitude.
      } else if(yArray[2] < yArray[0] && yArray[2] < yArray[1] && yArray[2] < yArray[3] && yArray[2] < yArray[4]){
        //Trough
        //Check for validity with regards to Trough amplitude.
      }
    }
  }

  if (zArray.length === 5){
    //Check if in range.
    if(zArray[2] <= 0.7108902236568493 && zArray[2] >= 0.47694005642250525){
      //Check peak or trough
      if(zArray[2] > zArray[0] && zArray[2] > zArray[1] && zArray[2] > zArray[3] && zArray[2] > zArray[4]){
        //Peak
        //Check for validity with regards to peak amplitude.
        if((zArray[2] - zArray[0]) <= 0.12859636570638955 && (zArray[2] - zArray[0]) >= 0.006307491064277179 && (zArray[2] - zArray[4]) <= 0.19819792342435652 && (zArray[2] - zArray[4]) >= -0.01978845701902318){
          console.log("Z Peak with amplitude found.");
        }
      } else if(zArray[2] < zArray[0] && zArray[2] < zArray[1] && zArray[2] < zArray[3] && zArray[2] < zArray[4]){
        //Trough
        //Check for validity with regards to Trough amplitude.
      }
    }
  }
});

setInterval(()=>{console.log(yPeaks*2);}, 2000);