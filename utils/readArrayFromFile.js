import fs from "fs";

const readArrayFromFile = (path, separator = '\n') => {
    const data = fs.readFileSync(path);

    return data.toString().split(separator);
}

export default readArrayFromFile;