const s = require("Storage");
const filename = "walkdata";
let walkActive = false;

Bangle.on('accel', function(obj) {
  if(walkActive === true){
    let file = s.open(filename, "a");
    file.write(`${obj.y},${obj.z}\n`);
  }
});

Bangle.on('touch', function(btn){
  Bangle.buzz().then(()=>{walkActive = !walkActive;});
});
