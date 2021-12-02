import { data } from "./input.js";

const day1 = () => {
    let total = 0;

    for (let i = 1; i < data.length - 2; i++) {
        total = data[i+2] > data[i - 1] ? ++total : total;
    }

    console.log(total);
};

export default day1;
