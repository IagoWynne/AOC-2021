import readArrayFromFile from "../utils/readArrayFromFile.js";

const parseBingoCard = (cardData) => {
  const card = [];

  cardData.forEach((c) => {
    const numbers = c.match(/\d{1,2}/g).map((n) => +n);
    card.push(numbers);
  });

  return card;
};

const parseBingoCards = (data) => {
  const l = data.length - 1;
  const bingoCards = [];

  for (let i = 1; i < l; i += 6) {
    bingoCards.push(parseBingoCard(data.slice(i + 1, i + 6)));
  }

  return bingoCards;
};

const matchNumber = (number, card) =>
  card.forEach((r) => {
    for (let i = 0; i < 5; i++) {
      if (r[i] === number) {
        r[i] = null;
      }
    }
  });

const allNumbersMatched = (numbers) => numbers.every((n) => n === null);

const isDiagonalBingo = (card, x, y, tX, tY) => {
  const numbers = [];

  let i = x;
  let j = y;

  while (i < 5 && j < 5) {
    numbers.push(card[j][i]);
    i += tX;
    j += tY;
  }

  return allNumbersMatched(numbers);
};

const isColumnBingo = (card, x) => {
  const numbers = [];
  card.forEach((r) => numbers.push(r[x]));

  return allNumbersMatched(numbers);
};

const isBingo = (card) => {
  const rowMatch = card.some(allNumbersMatched);

  if (rowMatch) {
    return rowMatch;
  }

  //   if (
  //     isDiagonalBingo(card, 0, 0, 1, 1) ||
  //     isDiagonalBingo(card, 0, card.length - 1, 1, -1)
  //   ) {
  //     return true;
  //   }

  for (let i = 0; i < 5; i++) {
    if (isColumnBingo(card, i)) {
      return true;
    }
  }

  return false;
};

const calculateScore = (card) => {
  let total = 0;

  card.forEach((r) => r.forEach((n) => (total += n)));

  return total;
};

const day4 = () => {
  const filePath = `./4/input.txt`;
  const data = readArrayFromFile(filePath);

  const numbers = data[0].split(",").map((n) => +n);

  let cards = parseBingoCards(data);

  let winningCard = null;
  let winningNumber = null;
  let done = false;

  for (let i = 0; i < numbers.length; i++) {
    const cardIdxToRemove = [];
    for (let j = 0; j < cards.length; j++) {
      const c = cards[j];
      matchNumber(numbers[i], c);

      if (isBingo(c)) {
        cardIdxToRemove.push(j);

        done = cards.length === 1;
      }
    }

    if (cards.length > 1 && cardIdxToRemove.length) {
      let deleted = 0;
      cardIdxToRemove.forEach((idx) => {
        cards.splice(idx - deleted, 1);
        deleted++;
      });
    }

    if (done) {
      winningNumber = numbers[i];
      winningCard = cards[0];
      break;
    }
  }

  console.log(winningNumber * calculateScore(winningCard));
};

export default day4;
