// in development


const true_wallet = require("./true_wallet");
const readline = require('readline');
const readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


readInterface.question('Provide your url : ', async results => {
    let url = results;
    if (url) {
        true_wallet(url);
    };
    return readInterface.close();
});

