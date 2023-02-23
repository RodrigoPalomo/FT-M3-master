const process = require("process");
const commands = require("./commands/index.js");

const print = (output) => {
  process.stdout.write(output);
  process.stdout.write("\nprompt > ");
};
const bash = () => {
  process.stdout.write("prompt > ");

  process.stdin.on("data", (data) => {
    let args = data.toString().trim().split(' ');
      // Después de mucho tiempo comparando con otro código
      // Me dí cuenta que el .split() tiene que ir con espacio split(' ') <===
      // Sino no anda, no sé por qué
    let cmd = args.shift();

    commands[cmd]
      ? commands[cmd](print, args)
      : print(`command not found: ${cmd}`);
  });
};

bash();

module.exports = {
  print,
  bash,
};
