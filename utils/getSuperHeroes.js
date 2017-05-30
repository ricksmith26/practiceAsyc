module.exports = function getSuperHeroes (cb) {
    setTimeout(function () {
        cb(null, [
            'superman',
            'batman',
            'the flash',
            'spiderman',
            'captain america',
            'thor',
            'wolverine'
        ]);
    }, Math.random() * 2000);
};