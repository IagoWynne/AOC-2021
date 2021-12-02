import fs from "fs";

const parseInstruction = (instruction, currentAim) => {
  const [direction, mag] = instruction.split(" ");
  const magnitude = Number(mag);

  switch (direction) {
    case "up":
      return { x: 0, y: 0, deltaAim: -magnitude };
    case "down":
      return { x: 0, y: 0, deltaAim: magnitude };
    case "forward":        
      return { x: magnitude, y: currentAim * magnitude, deltaAim: 0 };
    default:
      return { x: 0, y: 0, deltaAim: 0 };
  }
};

const day2 = () => {
  fs.readFile("./2/input.txt", (err, data) => {
    if (err) throw err;

    const instructions = data.toString().split("\n");

    let pos = { x: 0, y: 0 };
    let aim = 0;

    instructions.forEach((instruction) => {
      const {x, y, deltaAim} = parseInstruction(instruction, aim);

      aim += deltaAim;
      pos.x += x;
      pos.y += y;
    });

    console.log(pos.x * pos.y);
  });
};

export default day2;
