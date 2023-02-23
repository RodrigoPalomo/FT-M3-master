const process = require("process");
const commands = require("./commands/index.js");

function bash() {
  process.stdout.write("prompt >")
  process.stdin.on("data", (data)=> {
    let args = data.toString().trim().split('');
    let cmd = args.shift();
  })
}

function print(output){
  process.stdout.write(output);
  process.stdout.write("\nprompt >");
}


module.exports = {
  print,
  bash,
};