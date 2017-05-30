module.exports = function getFileNoRes (filename, cb) {
    setTimeout(function () {
        cb(null, 'Effectively never going to happen');
    }, 10E5);
};