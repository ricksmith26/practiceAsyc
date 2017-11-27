module.exports = function getPizzaById (id, cb) {
    setTimeout(function () {
        switch (id) {
            case 1:
                return cb(null, {id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']});
            case 2:
                return cb(null, {id: 2, name: 'Meat Feast', ingredients: ['cheese', 'tomato', 'Ham', 'Bacon', 'Beef']});
            case 3:
                return cb(null, {id: 3, name: 'Veggie Delight', ingredients: ['cheese', 'tomato', 'Onion', 'Pepper', 'Olives']});
            case 4:
                return cb(null, {id: 4, name: 'Hawaian', ingredients: ['cheese', 'tomato', 'Ham', 'Pineapple']});
            default:
                return cb({msg: 'We don\'t sell those pizzas here'});
        }
    }, Math.random() * 2000);
};