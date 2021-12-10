import readArrayFromFile from "../utils/readArrayFromFile.js";

const diff = (arr1, arr2) => [
  ...arr1.filter((i) => arr2.indexOf(i) === -1),
  ...arr2.filter((i) => arr1.indexOf(i) === -1),
];

const getValueFromSegments = (item, numberStrings) => {
  switch (item.length) {
    case 2:
      return "1";
    case 3:
      return "7";
    case 4:
      return "4";
    case 7:
      return "8";
    default:
      break;
  }

  const potentials = numberStrings.filter(n => n.length === item.length);
  const mystery = [...item];

  for(let i = 0; i < potentials.length; i++) {
      if (!diff([...potentials[i]], mystery).length) {
          return `${numberStrings.indexOf(potentials[i])}`;
      }
  }
};

const easyLine = (line) =>
  line[1].every(
    (i) => i.length === 2 || i.length === 3 || i.length === 4 || i.length === 7
  );

const getLineOutputValue = (line, numberStrings) =>
  +line[1].reduce((t, a) => t + getValueFromSegments(a, numberStrings), "");

const solveLine = (line) => {
  if (easyLine(line)) {
    return getLineOutputValue(line);
  }

  const map = Array(7).fill(null);
  const numbers = [
    "",
    line[0].find((i) => i.length === 2),
    "",
    "",
    line[0].find((i) => i.length === 4),
    "",
    "",
    line[0].find((i) => i.length === 3),
    line[0].find((i) => i.length === 7),
    "",
  ];

  const one = [...numbers[1]];
  const seven = [...numbers[7]];

  map[0] = diff(one, seven)[0];

  const four = [...numbers[4]];

  const zeroSixNine = line[0].filter((i) => i.length === 6);

  const fourAndTop = [...four, map[0]];

  zeroSixNine.forEach((n) => {
    const differences = diff([...n], fourAndTop);

    if (differences.length === 1) {
      map[6] = differences[0];
      numbers[9] = n;
    }
  });

  const oneWithTopAndBottom = [...one, map[0], map[6]];

  const twoThreeFive = line[0].filter((i) => i.length === 5);

  twoThreeFive.forEach((n) => {
    const differences = diff([...n], oneWithTopAndBottom);

    if (differences.length === 1) {
      map[3] = differences[0];
      numbers[3] = n;
    }
  });

  const zeroSix = zeroSixNine.filter((n) => n !== numbers[9]);

  numbers[0] = zeroSix.find((n) => n.indexOf(map[3]) === -1);
  numbers[6] = zeroSix.find((n) => n !== numbers[0]);

  map[2] = diff([...numbers[8]], [...numbers[6]])[0];

  const twoFive = twoThreeFive.filter((n) => n !== numbers[3]);

  numbers[2] = twoFive.find((n) => n.indexOf(map[2]) !== -1);
  numbers[5] = twoFive.find((n) => n !== numbers[2]);

  return getLineOutputValue(line, numbers);
};

const day8 = () => {
  const filePath = `./8/input.txt`;
  const data = readArrayFromFile(filePath).map((l) =>
    l.split("|").map((i) => i.trim().split(" "))
  );

  const result = data.reduce((t, l) => t + solveLine(l), 0);

  console.log(result);
};

export default day8;
