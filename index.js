import day1 from "./1/day1.js";
import day2 from "./2/day2.js";

const newDay = (day) => console.log(`*** DAY ${day} ***`);
const newLine = () => console.log("\n");

newDay(1);
day1();

newLine();
newDay(2);
day2();