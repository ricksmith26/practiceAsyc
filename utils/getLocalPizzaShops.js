module.exports = function getLocalPizzaShops (cb) {
    setTimeout(function () {
        cb(null, [
            {id: 1, name: 'Adrians Amazing Pizza', deliver: true},
            {id: 2, name: 'Daryls Delicious Pizza', deliver: false},
            {id: 3, name: 'Mauros Marvelous Pizza', deliver: true},
            {id: 4, name: 'Harriets Hungry Pizza', deliver: true},
            {id: 5, name: 'Sams Special Pizza', deliver: true}
        ]);
    }, Math.random() * 2000);
};