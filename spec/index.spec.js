const expect = require('chai').expect;
const sinon = require('sinon');
const {
    blockingEcho,
    asyncEcho,
    fetchSuperHeroes,
    fetchOpponents,
    fetchFilesAndLog
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
        }
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
        const expected = {id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']};
        const cb = function (err, pizza) {
            expect(pizza).to.eql(expected);
            done();
        }
        getPizzaById(1, cb);
    });
    it('should invoke callback with error object if not valid pizza id', function (done) {
        const expected = 'We don\'t sell those pizzas here';
        const cb = function (err, pizza) {
            expect(err.message).to.eql(expected);
            done();
        }
        getPizzaById(55, cb);
    });
});

describe('getPizzasForShopId', function () {
    it('should be a function', function () {
        expect(getPizzasForShopId).to.be.a('function');
    });
    it('should invoke callback with correct pizzas for valid shop id', function (done) {
        const expected = [
            {id: 1, name: 'Margarita', ingredients: ['cheese', 'tomato']},
            {id: 2, name: 'Meat Feast', ingredients: ['cheese', 'tomato', 'Ham', 'Bacon', 'Beef']},
            {id: 4, name: 'Hawaian', ingredients: ['cheese', 'tomato', 'Ham', 'Pineapple']}
        ];
        const cb = function (err, pizza) {
            expect(pizza).to.eql(expected);
            done();
        }
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
            expect(pairs[0].hero).to.equal('BATMAN');
            expect(pairs[0].villain).to.equal('THE JOKER');
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
});

describe('fetchFilesAndLog', function () {
    it('should be a function', function () {    
        expect(fetchFilesAndLog).to.be.a('function');
    });
    it('should log each file', function (done) {
        let count = 0;
        sinon.stub(console, 'log').callsFake(function () {
            count++;
        });
        fetchFilesAndLog([1, 2, 3], function (err, res) {
            expect(count).to.equal(4);
            done();
        });
    });
});
