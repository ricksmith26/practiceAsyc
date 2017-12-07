module.exports = function getArchEnemy (hero, cb) {
    setTimeout(function () {
        switch (hero) {
            case 'SUPERMAN':
                return cb(null, 'LEX LUTHOR');
            case 'BATMAN':
                return cb(null, 'THE JOKER');
            case 'THE FLASH':
                return cb(null, 'ZOOM');
            case 'SPIDERMAN':
                return cb(null, 'GREEN GOBLIN');
            case 'CAPTAIN AMERICA':
                return cb(null, 'RED SKULL');
            case 'WOLVERINE':
                return cb(null, 'SABRETOOTH');
            case 'THOR':
                return cb(null, 'LOKI');
            default:
                return cb({message: 'With great power comes great responsibility...'});
        }
    }, Math.random() * 2000);
};
