const { expect } = require('chai');
const sinon = require('sinon');

const {
  getArchEnemy,
  getFile,
  getFileMany,
  getSuperHeroes
} = require('../utils/index');

describe('getArchEnemy', () => {
  it('should be a function', function() {
    expect(getArchEnemy).to.be.a('function');
  });
  it('should return correct Enemy for valid hero', function(done) {
    getArchEnemy('BATMAN', function(err, villain) {
      expect(villain).to.equal('THE JOKER');
      done();
    });
  });
  it('should return err for invalid hero input', function(done) {
    getArchEnemy('STEVE', function(err) {
      expect(err.message).to.equal(
        'With great power comes great responsibility...'
      );
      done();
    });
  });
});

describe('getFile', function() {
  it('should be a function', function() {
    expect(getFile).to.be.a('function');
  });
  it('should invoke callback with contents of file', function(done) {
    const filename = 'RED ALERT';
    getFile(filename, function(err, contents) {
      expect(contents).to.equal(`File contents of ${filename}`);
      done();
    });
  });
});

describe('getFileMany', function() {
  it('should be a function', function() {
    expect(getFileMany).to.be.a('function');
  });
  it('should invoke callback with contents of file', function(done) {
    const filename = 'SERIOUSLY, GET IN THE BUNKER';
    let called = false;
    getFileMany(filename, function(err, contents) {
      expect(contents).to.equal(`File contents of ${filename}`);
      if (!called) {
        called = true;
        done();
      }
    });
  });
  it('should invoke the callback 4 times', function(done) {
    const filename = 'THIS IS NOT A TEST';
    const spy = sinon.spy();
    getFileMany(filename, function() {
      spy();
      if (spy.callCount === 4) {
        done();
      }
    });
  });
});

describe('getFileMany', function() {
  it('should be a function', function() {
    expect(getFileMany).to.be.a('function');
  });
  it('should invoke callback with contents of file', function(done) {
    const filename = 'test';
    let called = false;
    getFileMany(filename, function(err, contents) {
      expect(contents).to.equal(`File contents of ${filename}`);
      if (!called) {
        called = true;
        done();
      }
    });
  });
  it('should invoke the callback 4 times', function(done) {
    const filename = 'test';
    const spy = sinon.spy();
    getFileMany(filename, function() {
      spy();
      if (spy.callCount === 4) {
        done();
      }
    });
  });
});

describe('getFileMany', function() {
  it('should be a function', function() {
    expect(getFileMany).to.be.a('function');
  });
  it('should invoke callback with contents of file', function(done) {
    const filename = 'test';
    let called = false;
    getFileMany(filename, function(err, contents) {
      expect(contents).to.equal(`File contents of ${filename}`);
      if (!called) {
        called = true;
        done();
      }
    });
  });
  it('should invoke the callback 4 times', function(done) {
    const filename = 'test';
    const spy = sinon.spy();
    getFileMany(filename, function() {
      spy();
      if (spy.callCount === 4) {
        done();
      }
    });
  });
});

describe('getSuperHeroes', function() {
  it('should be a function', function() {
    expect(getSuperHeroes).to.be.a('function');
  });
  it('should invoke the callback with an array of 7 elements', function(done) {
    getSuperHeroes(function(err, heroes) {
      expect(heroes).to.be.an('array');
      expect(heroes.length).to.equal(7);
      done();
    });
  });
});
