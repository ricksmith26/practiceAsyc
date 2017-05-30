module.exports = function getFileMany (filename, cb) {
    for (var i = 0; i < 4; i++) {
        setTimeout(function () {
            cb(null, `File contents of ${filename}`);
        }, Math.random() * 1500);
    }
};