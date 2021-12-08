import day1 from "./1/day1.js";
import day2 from "./2/day2.js";
import day3 from "./3/day3.js";
import day4 from "./4/day4.js";
import day5 from "./5/day5.js";

const newDay = (day) => console.log(`*** DAY ${day} ***`);
const newLine = () => console.log("\n");

newDay(1);
day1();

newLine();
newDay(2);
day2();

newLine();
newDay(3);
day3();

newLine();
newDay(4);
day4();

newLine();
newDay(5);
day5();