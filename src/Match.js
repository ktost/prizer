'use strict';

var _ = require('lodash');


/**
 * Stores a list of users and a list of prizes
 * @constructor
 * @param {*} storage - A storage plugin
 * @param {array} initialPlayers - A list of players to start with
 * @param {array} initialPrizes - A list of prizes to start with
 * @param {Function} callback
 */
var Match = function(storage, initialPlayers, initialPrizes, callback) {
    this.matchId = storage.generateId();
    this.status = Match.OPEN;
    this.storage = storage;
    this.storage.createMatch(this.matchId, initialPlayers, initialPrizes, callback);
    return this.matchId;
};

Match.prototype.OPEN = 'open';
Match.prototype.CLOSING = 'closing';
Match.prototype.CLOSED = 'closed';
Match.prototype.REMOVED = 'removed';


/**
 * Shortcuts
 */
Match.prototype.addPrize = function(prize, callback) {
    this.storage.addPrize(this.matchId, prize, callback);
};

Match.prototype.removePrize = function(prize, callback) {
    this.storage.removePrize(this.matchId, prize, callback);
};

Match.prototype.addPlayer = function(player, callback) {
    this.storage.addPlayer(this.matchId, player, callback);
};

Match.prototype.removePlayer = function(player, callback) {
    this.storage.removePlayer(this.matchId, player, callback);
};


/**
 * Award prizes to users according to their place
 * @returns {[{player: *, prizes: [], place: number}]}
 */
Match.prototype.finish = function(places, callback) {
    
    if(this.status !== Match.OPEN) {
        return callback('Match.status is ' + this.status);
    }

    this.status = Match.CLOSING;
    
    this.storage.getMatch(this.matchId, function(err, data) {
        if(err) {
            return callback(err);
        }
        
    });
    
    
    return this.playerList.members;
};





/**
 * Close this match without awarding any prizes
 */
Match.prototype.cancel = function() {
    if(this.status === Match.OPEN) {
        this.status = Match.CLOSED;
    }
};


/**
 * Cleanup for garbage collector
 */
Match.prototype.remove = function() {
    if(this.status !== Match.REMOVED) {
        this.status = Match.REMOVED;
        delete this.matches;
        delete this.players;
        delete this.prizes;
    }
};


module.exports = Match;