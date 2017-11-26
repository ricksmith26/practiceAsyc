module.exports = function getArchEnemy (hero, cb) {
    setTimeout(function () {
        switch (hero) {
            case 'SUPERMAN':
                cb(null, 'LEX LUTHOR');
            case 'BATMAN':
                cb(null, 'THE JOKER');
            case 'THE FLASH':
                cb(null, 'ZOOM');
            case 'SPIDERMAN':
                cb(null, 'GREEN GOBLIN');
            case 'CAPTAIN AMERICA':
                cb(null, 'RED SKULL');
            case 'WOLVERINE':
                cb(null, 'SABRETOOTH');
            case 'THOR':
                cb(null, 'LOKI');
            default:
                cb({message: 'With great power comes great responsibility...'});
        }
    }, Math.random() * 2000);
};
