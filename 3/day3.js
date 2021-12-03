import readArrayFromFile from "../utils/readArrayFromFile.js";

const getEmptyBinNo = (len) => Array(len).fill(0);

const convertStrToBin = (str) => {
    const bin = getEmptyBinNo(str.length);

    for(let i = 0; i < str.length; i++) {
        bin[i] = +str.charAt(i);
    }

    return bin;
}

const getMostCommonBit = (val, total) => val >= total/2 ? 1 : 0;

const getLeastCommonBit = (val, total) => val >= total/2 ? 0 : 1;

const calcBinToDec = (val) => {
    let bitVal = Math.pow(2, val.length-1);
    let sum = 0;
    
    val.forEach((v) => {
        sum += v * bitVal;
        bitVal = bitVal / 2;
    });

    return sum;
}

const getRating = (data, binLen, getBit) => {
    let filteredData = data;
    let val = getEmptyBinNo(binLen);
    
    for(let i = 0; i < binLen; i++) {
        let total = 0;

        filteredData.forEach((bin) => total += bin[i]);

        val[i] = getBit(total, filteredData.length);

        filteredData = filteredData.filter(d => d[i] === val[i]);
        
        if(filteredData.length === 1) {
            val = filteredData[0];
            break;
        }
    }

    return calcBinToDec(val);
}

const day3 = () => {
    const filePath = `./3/input.txt`;
    const data = readArrayFromFile(filePath).map(convertStrToBin);
    const binLen = data[0].length;

    const o2 = getRating(data, binLen, getMostCommonBit);
    const co2 = getRating(data, binLen, getLeastCommonBit);

    console.log(o2 * co2);
}

export default day3;