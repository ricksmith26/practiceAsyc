module.exports = function getFile(filename, cb) {
    setTimeout(function () {
        cb(null, `File contents of ${filename}`);
    }, Math.random() * 1500);
};