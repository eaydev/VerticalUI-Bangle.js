//Loading widgets
Bangle.loadWidgets();
const storage = require("Storage");

let state = {
  watchOptions: {
    widgets: true,
    align: "left",
    widgetList: ["CHARGE", "STEPS", "BPM"]
  }
};


//This is to get stored data.
if(!global.WIDGETS === undefined && state.watchOptions.widgets === true){
  console.log("Please load widgets");
} else {
  //Check for 'activepedom'
  if(!Objects.keys(global.WIDGETS).includes("activepedom")){
    //Disable pedometer on face.
    //Create new state widgetlist without STEPS
    let oldState = state.watchOptions.widgetList;
    let newState = [];
    for(let i = 0; i < oldState.length; i++){
      if(oldState[i] !== "STEPS"){
        newState.push(oldState[i]);
      }
    }
    state.watchOptions.widgetList = newState;
  }
}

//Get steps.
(function(){
  let now = new Date();
  let month = now.getMonth() + 1;
  if (month < 10) month = "0" + month;
  let filename = "activepedom" + now.getFullYear() + month + now.getDate() + ".data";
  let csvFile = storage.open(filename, "r");

  if(csvFile){
    //If file exists.
    let data = csvFile.read(csvFile.getLength()).split("\n");
    let stepsCounted = 0;
    let readDates = [];

    for(let i = 0; i < data.length ; i++){
        let row = data[i].split(",");
        if (row.length === 6){
          if(!readDates.includes(row[0])){
            readDates.push(row[0]);
            stepsCounted += Number(row[1]);
          }
        }
    } else {
      //If not yet AVAILABLE
    }
    console.log(stepsCounted);
  }


})();
