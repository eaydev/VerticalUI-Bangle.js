const s = require("Storage");
const filename = "walkdata";
let walkActive = false;

Bangle.on('accel', function(obj) {
  const date = new Date();

  if(walkActive === true){
    let file = s.open(filename, "a");
    // file.write(`${obj.y},${obj.z},${date.getTime()}\n`);
    console.log(`${obj.y},${obj.z},${date.getTime()}\n`);

  }
});

Bangle.on('touch', function(btn){
  Bangle.buzz().then(()=>{walkActive = !walkActive;});
});
