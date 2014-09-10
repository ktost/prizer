'use strict';

var _ = require('lodash');
var prizes = require('prizes');


/**
 * Stores a list of users and a list of prizes
 *
 */
var match = function(matches, players) {
    this.matches = matches;
    this.players = players || [];
    this.prizes = new prizes();
    this.status = match.OPEN;
    matches.addMatch(this);
};

match.prototype.OPEN = 'open';
match.prototype.CLOSED = 'closed';


match.prototype.addPlayer = function(playerId) {
    this.players[this.players.length] = playerId;
    _.unique(this.players);
};


match.prototype.removePlayer = function(playerId) {
    _.pull(this.players, playerId);
};


match.prototype.finish = function() {
    this.prizes.finalize();
    
    _.each(this.players, function(player) {
        
    });
    
    this.players = [];
};


match.prototype.cancel = function() {
    this.players = [];
};


match.prototype.addPrize = function(prize) {
    this.prizes.addPrize(prize);
};


match.prototype.removePrize = function(prize) {
    this.prizes.removePrize(prize);
};


match.prototype.remove = function() {
    if(this.status === match.OPEN) {
        this.matches.removeMatch(this);
        this.status = match.CLOSE;
        delete this.matches;
        delete this.players;
        delete this.prizes;
    }
};


module.exports = match;