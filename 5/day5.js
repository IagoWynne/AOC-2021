import readArrayFromFile from "../utils/readArrayFromFile.js";

const mapVents = (line) => {
  const [x1, y1, x2, y2] = line.match(/(\d+)/g).map((n) => +n);

  return { x1, y1, x2, y2 };
};

const filterVents = (vent) => vent.x1 === vent.x2 || vent.y1 === vent.y2;

const getTransform = (c1, c2) => (c1 < c2 ? 1 : c1 > c2 ? -1 : 0);

const addVentToMap = (map, vent) => {
  const { x1, y1, x2, y2 } = vent;

  const [tX, tY] = [getTransform(x1, x2), getTransform(y1, y2)];

  if (tX && tY) {
    let x = x1;
    let y = y1;

    while (x != x2 + tX) {
        map[y][x]++;
        x += tX;
        y += tY
      }
  } else if (tX) {
    let x = x1;

    while (x != x2 + tX) {
      map[y1][x]++;
      x += tX;
    }
  } else if (tY) {
    let y = y1;

    while (y != y2 + tY) {
      map[y][x1]++;
      y += tY;
    }
  }
};

const day5 = () => {
  const filePath = `./5/input.txt`;
  const data = readArrayFromFile(filePath).map(mapVents);

  const map = [];
  const len = 1000;

  for (let i = 0; i < len; i++) {
    map.push(Array(len).fill(0));
  }

  data.forEach((vent) => addVentToMap(map, vent));

  let overlap = 0;
  map.forEach((r) => r.forEach((c) => (overlap += c > 1 ? 1 : 0)));

  console.log(overlap);
};

export default day5;
