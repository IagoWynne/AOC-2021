import readArrayFromFile from "../utils/readArrayFromFile.js";

const day6 = () => {
  const filePath = `./6/input.txt`;
  let fish = readArrayFromFile(filePath)[0]
    .split(",")
    .map((n) => +n);

  let reproDays = [
    [fish.filter((f) => f === 0).length, 0, 2],
    [fish.filter((f) => f === 1).length, 0, 3],
    [fish.filter((f) => f === 2).length, 0, 4],
    [fish.filter((f) => f === 3).length, 0, 5],
    [fish.filter((f) => f === 4).length, 0, 6],
    [fish.filter((f) => f === 5).length, 0, 0],
    [fish.filter((f) => f === 6).length, 0, 1],
  ];

  const days = 256;

  let j = 1;

  for (let i = 1; i <= days; i++) {
    let jStart = j;
    j++;

    let jAdd = reproDays[jStart][2];

    if (j === 7) {
      j = 0;
    }

    if (i !== days) {
      reproDays[jAdd][1] += reproDays[jStart][0];
    }

    reproDays[jStart][0] += reproDays[jStart][1];
    reproDays[jStart][1] = 0;
  }

  console.log(
    reproDays.reduce((t, a, i) => t + a[0] + a[1], 0)
  );
};

export default day6;
