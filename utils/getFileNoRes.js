module.exports = function getFileNoRes (filename, cb) {
    setTimeout(function () {
        cb(null, 'It took too long, so we dealt with it!');
    }, 6000);
};
