const {expect} = require('chai');
const sinon = require('sinon');

const {
    getArchEnemy, getFile, getFileMany, getFileNoRes,
    getLocalPizzaShops, getPizzaById, getPizzasForShopId, getSuperHeroes
} = require('../utils/index');

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