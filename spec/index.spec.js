const expect = require('chai').expect;
const sinon = require('sinon');
const {
    blockingEcho,
    asyncEcho,
    fetchSuperHeroes,
    fetchOpponents,
    fetchFilesAndLog,
    fetchContentOfFiles,
    fetchFileWithSingleCall,
    fetchPizzas,
    fetchLocalPizzaShopInfo
} = require('../main');
const {
    getArchEnemy, getFile, getFileMany, getFileNoRes,
    getLocalPizzaShops, getPizzaById, getPizzasForShopId, getSuperHeroes
} = require('../utils/index');

describe('blockingEcho', function () {
    it('should be a function', function () {
        expect(blockingEcho).to.be.a('function');
    });
    it('should return input', function () {
        this.timeout(5000);
        expect(blockingEcho('woo')).to.equal('woo');
    });
});

describe('asyncEcho', function () {
    it('should be a function', function () {
        expect(asyncEcho).to.be.a('function');
    });
    it('should return input', function (done) {
        this.timeout(5000);
        const str = 'woo';
        const cb = function (err, res) {
            expect(res).to.equal(str);
            done();
        };
        asyncEcho(str, cb);
    });
});

describe('getArchEnemy', () => {
    it('should be a function', function () {
        expect(getArchEnemy).to.be.a('function');
    });
    it('should return correct Enemy for valid hero', function (done) {
        getArchEnemy('BATMAN', function (err, villain) {
            expect(villain).to.equal('THE JOKER');
            done();
        });
    });
    it('should return err for invalid hero input', function (done) {
        getArchEnemy('STEVE', function (err) {
            expect(err.message).to.equal('With great power comes great responsibility...');
            done();
        });
    });
});

describe('getFile', function () {
    it('should be a function', function () {
        expect(getFile).to.be.a('function');
    });
    it('should invoke callback with contents of file', function (done) {
        const filename = 'test';
        getFile(filename, function (err, contents) {
            expect(contents).to.equal(`File contents of ${filename}`);
            done();
        });
    });
});

describe('getFileMany', function () {
    it('should be a function', function () {
        expect(getFileMany).to.be.a('function');
    });
    it('should invoke callback with contents of file', function (done) {
        const filename = 'test';
        let called = false;
        getFileMany(filename, function (err, contents) {
            expect(contents).to.equal(`File contents of ${filename}`);
            if (!called) {
                called = true;
                done();
            }
        });
    });
    it('should invoke the callback 4 times', function (done) {
        const filename = 'test';
        const spy = sinon.spy();
        getFileMany(filename, function () {
            spy();
            if (spy.callCount === 4) {
                done();
            }
        });
    });
});

describe('getFileNoRes', function () {
    it('should be a function', function () {
        expect(getFileNoRes).to.be.a('function');
    });
    it('should invoke callback with contents of file', function (done) {
        this.timeout(5000);
        const filename = 'test';
        const spy = sinon.spy();
        getFileNoRes(filename, spy);
        setTimeout(function () {
            expect(spy.called).to.be.false;
            done();
        }, 3000);
    });
});

describe('getLocalPizzaShops', function () {
    it('should be a function', function () {
        expect(getLocalPizzaShops).to.be.a('function');
    });
    it('should invoke the callback with an array of 5 elements', function (done) {
        getLocalPizzaShops(function (err, shops) {
            expect(shops).to.be.an('array');
            expect(shops.length).to.equal(5);
            done();
        });
    });
});

describe('getPizzaById', function () {
    it('should be a function', function () {
        expect(getPizzaById).to.be.a('function');
    });
    it('should invoke callback with correct pizza for valid id', function (done) {
        const expected = { id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato'] };
        const cb = function (err, pizza) {
            expect(pizza).to.eql(expected);
            done();
        };
        getPizzaById(1, cb);
    });
    it('should invoke callback with error object if not valid pizza id', function (done) {
        const expected = 'We don\'t sell those pizzas here';
        const cb = function (err) {
            expect(err.message).to.eql(expected);
            done();
        };
        getPizzaById(55, cb);
    });
});

describe('getPizzasForShopId', function () {
    it('should be a function', function () {
        expect(getPizzasForShopId).to.be.a('function');
    });
    it('should invoke callback with correct pizzas for valid shop id', function (done) {
        const expected = [
            { id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato'] },
            { id: 2, name: 'Meat Feast', ingredients: ['cheese', 'tomato', 'Ham', 'Bacon', 'Beef'] },
            { id: 4, name: 'Hawaian', ingredients: ['cheese', 'tomato', 'Ham', 'Pineapple'] }
        ];
        const cb = function (err, pizza) {
            expect(pizza).to.eql(expected);
            done();
        };
        getPizzasForShopId(1, cb);
    });
    it('should invoke callback with error object if not valid pizza id', function (done) {
        const expected = 'This shop doesn\t exist';
        const cb = function (err) {
            expect(err.message).to.eql(expected);
            done();
        };
        getPizzasForShopId(55, cb);
    });
});

describe('getSuperHeroes', function () {
    it('should be a function', function () {
        expect(getSuperHeroes).to.be.a('function');
    });
    it('should invoke the callback with an array of 7 elements', function (done) {
        getSuperHeroes(function (err, heroes) {
            expect(heroes).to.be.an('array');
            expect(heroes.length).to.equal(7);
            done();
        });
    });
});

describe('fetchSuperHeroes', function () {
    it('should be a function', function () {
        expect(fetchSuperHeroes).to.be.a('function');
    });
    it('should invoke the callback with no error', function (done) {
        fetchSuperHeroes(function (err) {
            expect(err).to.be.null;
            done();
        });
    });
    it('should invoke the callback with an array of 7 heroes', function (done) {
        fetchSuperHeroes(function (err, heroes) {
            expect(heroes).to.be.an('array');
            expect(heroes.length).to.equal(7);
            done();
        });
    });
    it('should invoke the callback with an array of capitalised heroes', function (done) {
        fetchSuperHeroes(function (err, heroes) {
            expect(heroes[0]).to.equal(heroes[0].toUpperCase());
            done();
        });
    });
});

describe('fetchOpponents', () => {
    it('should be a function', function () {
        expect(fetchOpponents).to.be.a('function');
    });
    it('should return an array', function (done) {
        fetchOpponents(function (err, pairs) {
            expect(pairs).to.be.an('array');
            done();
        });
    });
    it('should return array of hero villain objects', function (done) {
        fetchOpponents(function (err, pairs) {
            expect(pairs[0].hasOwnProperty('hero')).to.equal(true);
            expect(pairs[0].hasOwnProperty('villain')).to.equal(true);
            done();
        });
    });
    it('should return array of objects sorted alphabetically by hero names', function (done) {
        fetchOpponents(function (err, pairs) {
            const result = pairs.toString();
            pairs.sort(function (a, b) {
                return a.hero > b.hero;
            });

            expect(result).to.equal(pairs.toString());
            done();
        });
    });
}).timeout(5000);

describe('fetchFilesAndLog', function () {
    it('should be a function', function () {
        expect(fetchFilesAndLog).to.be.a('function');
    });
    it('should log each file', function (done) {
        let count = 0;
        sinon.stub(console, 'log').callsFake(function () {
            count++;
        });
        fetchFilesAndLog([1, 2, 3], function () {
            expect(count).to.equal(4);
            done();
        });
    });
});

describe('fetchContentOfFiles', function () {
    it('exists', function () {
        expect(fetchContentOfFiles).to.be.a('function');
    });
    it('should return a response for each file', function (done) {
        var fileNames = [1, 2, 3, 4, 5];
        function cb(err, files) {
            expect(files.length).to.equal(fileNames.length);
            done();
        }
        fetchContentOfFiles(fileNames, cb);
    });
    it('should invoke callback with filenames in order', function (done) {
        var fileNames = [1, 2, 3, 4, 5];
        function cb(err, files) {
            expect(files.length).to.equal(fileNames.length);
            fileNames.forEach(function (name, i) {
                expect(files[i]).to.equal(`File contents of ${name}`);
            });
            done();
        }
        fetchContentOfFiles(fileNames, cb);
    });
});

describe('fetchFileWithTimeout', function () {

});
describe('fetchFileWithSingleCall', function () {
    it('exists', function () {
        expect(fetchFileWithSingleCall).to.be.a('function');
    });
    it('responds with file name', function () {
        var fileName = 'File Name';
        function cb(err, file) {
            expect(file).to.equal(`File Contents of ${fileName}`);
        }
        fetchFileWithSingleCall(fileName, cb);
    });
    it('The call back should only be called once', function (done) {
        var fileName = 'File Name';
        var counter = 0;
        function cb() {
            counter++;
        }
        fetchFileWithSingleCall(fileName, cb);
        setTimeout(function () {
            expect(counter).to.equal(1);
            done();
        }, 2000);
    });
});

describe('fetchPizzas', function () {
    it('exists', function () {
        expect(fetchPizzas).to.be.a('function');
    });
    it('responds with an array of objects', function (done) {
        const pizzaIds = [1, 2, 3, 4];
        function cb(err, pizzas) {
            pizzas.forEach(function (pizza) {
                expect(pizza).to.be.an('object');
            });
            done();
        }
        fetchPizzas(pizzaIds, cb);
    });
    it('responds with an array of the correct pizza objects ', function (done) {
        const pizzaIds = [1, 2, 3, 4];
        function cb(err, pizzas) {
            expect(pizzas[0]).to.eql({ id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato'] });
            done();
        }
        fetchPizzas(pizzaIds, cb);
    });
});

describe('fetchLocalPizzaShopInfo', function () {
    it('exists', function () {
        expect(fetchLocalPizzaShopInfo).to.be.a('function');
    });
    it('should return an array of objects', function (done) {
        function cb(err, pizzaShops) {
            pizzaShops.forEach(function (shop) {
                expect(shop).to.be.an('object');
            });
            done();
        }
        fetchLocalPizzaShopInfo(cb);
    });
    it('Should filter out those shops which don\'t deliver', function (done) {
        function cb(err, pizzaShops) {
            expect(pizzaShops.length).to.equal(4);
            done();
        }
        fetchLocalPizzaShopInfo(cb);
    });
    it('should respond with the correct list of shops', function (done) {
        var shops = [
            { id: 1, name: 'Adrians Amazing Pizza', deliver: true },
            { id: 3, name: 'Mauros Marvelous Pizza', deliver: true },
            { id: 4, name: 'Harriets Hungry Pizza', deliver: true },
            { id: 5, name: 'Sams Special Pizza', deliver: true }
        ];
        function cb(err, pizzaShops) {
            expect(pizzaShops).to.eql(shops);
            done();
        }
        fetchLocalPizzaShopInfo(cb);
    });
});