const storage = require("Storage");

(function(){
    let now = new Date();
    let month = now.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let filename = "activepedom" + now.getFullYear() + month + now.getDate() + ".data";
    let csvFile = storage.open(filename, "r");

  let data = csvFile.read(csvFile.getLength()).split("\n");
  console.log(data);
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
  }
  console.log(stepsCounted);

})();
