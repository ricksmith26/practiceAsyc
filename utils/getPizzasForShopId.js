module.exports = function getPizzasForShopId (shopId, cb) {
    setTimeout(function () {
        switch (shopId) {
            case 1:
                return cb(null, [
                    {id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']},
                    {id: 2, name: 'Meat Feast', ingredients: ['cheese', 'tomato', 'Ham', 'Bacon', 'Beef']},
                    {id: 4, name: 'Hawaian', ingredients: ['cheese', 'tomato', 'Ham', 'Pineapple']}
                ]);
            case 2:
                return cb(null, [
                    {id: 2, name: 'Meat Feast', ingredients: ['cheese', 'tomato', 'Ham', 'Bacon', 'Beef']},
                    {id: 3, name: 'Veggie Delight', ingredients: ['cheese', 'tomato', 'Onion', 'Pepper', 'Olives']},
                    {id: 4, name: 'Hawaian', ingredients: ['cheese', 'tomato', 'Ham', 'Pineapple']}
                ]);
            case 3:
                return cb(null, [
                    {id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']},
                    {id: 3, name: 'Veggie Delight', ingredients: ['cheese', 'tomato', 'Onion', 'Pepper', 'Olives']},
                    {id: 4, name: 'Hawaian', ingredients: ['cheese', 'tomato', 'Ham', 'Pineapple']}
                ]);
            case 4:
                return cb(null, [
                    {id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']},
                    {id: 3, name: 'Veggie Delight', ingredients: ['cheese', 'tomato', 'Onion', 'Pepper', 'Olives']}
                ]);
            case 5:
                return cb(null, [
                    {id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']},
                    {id: 2, name: 'Meat Feast', ingredients: ['cheese', 'tomato', 'Ham', 'Bacon', 'Beef']},
                    {id: 3, name: 'Veggie Delight', ingredients: ['cheese', 'tomato', 'Onion', 'Pepper', 'Olives']},
                    {id: 4, name: 'Hawaian', ingredients: ['cheese', 'tomato', 'Ham', 'Pineapple']}
                ]);
            default:
                return cb('This shop doesn\t exist');
        }
    }, Math.random() * 2000);
};