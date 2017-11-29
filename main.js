const {
    getArchEnemy, getFile, getFileMany, getLocalPizzaShops, getPizzaById, getPizzasForShopId, getSuperHeroes
} = require('./utils/index');

const async = require('async');

const fetchFilesAndLog = (arr,cb) => {

    const cache = [];
    let count = 0;
    arr.forEach((fileName,i) => {
        getFile(fileName,(err,data) => {
            cache[i] = data;
            for (let j = count; j < arr.length; j++) {
                if (!cache[j]) break;
                    console.log(cache[j]);
                    count++;      
            }
            if (arr.length === count) cb(null,cache);
        });
    });
};


module.exports = {fetchFilesAndLog};