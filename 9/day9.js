import readArrayFromFile from "../utils/readArrayFromFile.js";

const checkSameRow = (row) =>
  row.reduce((prev, cur, i, arr) => {
    if (
      (i + 1 === arr.length || arr[i + 1] > cur) &&
      (i === 0 || arr[i - 1] > cur)
    ) {
      prev.push({ idx: i, val: cur });
    }

    return prev;
  }, []);

const checkAdjacentRow = (rowLowPoints, nextRow) =>
  rowLowPoints.filter((lp) => lp.val < nextRow[lp.idx]);

const findRowLowPoints = (agg, row, idx, data) => {
  let lowPoints = checkSameRow(row);

  if (idx + 1 !== data.length) {
    lowPoints = checkAdjacentRow(lowPoints, data[idx + 1]);
  }

  if (idx !== 0) {
    lowPoints = checkAdjacentRow(lowPoints, data[idx - 1]);
  }

  return lowPoints.reduce((t, lp) => t + lp.val + 1, agg);
};

const findLowPointsOnMap = (data) =>
  data.reduce(findRowLowPoints, 0);

const day9 = () => {
  const filePath = `./9/input.txt`;
  const data = readArrayFromFile(filePath).map((l) => [...l].map((c) => +c));

  const low = findLowPointsOnMap(data);
  console.log(low);
};

export default day9;
