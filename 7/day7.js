import readArrayFromFile from "../utils/readArrayFromFile.js";

const mode = (a) =>
  Object.values(
    a.reduce((count, e) => {
      if (!(e in count)) {
        count[e] = [0, e];
      }

      count[e][0]++;
      return count;
    }, {})
  ).reduce((a, v) => (v[0] < a[0] ? a : v), [0, null])[1];

var totalFuel = (data, loc) =>
  data.reduce((t, a) => {
    const d = Math.abs(a - loc);
    return t + (d * (d + 1)) / 2;
  }, 0);

const increment = (a) => a + 1;
const decrement = (a) => a - 1;

const day7 = () => {
  const filePath = `./7/input.txt`;
  const data = readArrayFromFile(filePath)[0]
    .split(",")
    .map((n) => +n);

  const mean = Math.round(data.reduce((t, a) => t + a, 0) / data.length);
  let trial = mean;
  let currMin = [totalFuel(data, trial), trial];
  let solved = false;

  let currAction = increment;

  while (!solved) {
    trial = currAction(trial);

    if (trial === currMin[1]) {
      trial = currAction(trial);
    }
    const dist = totalFuel(data, trial);

    if (dist < currMin[0]) {
      currMin[0] = dist;
      currMin[1] = trial;
    } else if (currAction === increment) {
      currAction = decrement;
    } else {
      solved = true;
    }
  }

  console.log(currMin[0]);
};

export default day7;
