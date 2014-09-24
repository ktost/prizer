'use strict';


var _ = require('lodash');
var prizeFns = require('prizeFns');


/**
 * Stores a list of users and a list of prizes
 * @constructor
 * @param {*} storage - A storage plugin
 * @param {array} initialPlayers - A list of players to start with
 * @param {array} initialPrizes - A list of prizes to start with
 * @param {Function} callback
 */
var Match = function(storage, matchId) {
    this.status = Match.OPEN;
    this.matchId = matchId;
    this.storage = storage;
    return this;
};

Match.prototype.OPEN = 'open';
Match.prototype.CLOSED = 'closed';


/**
 * Wrap incoming data into a standardized format
 * @param {*} input
 * @returns {{id: String, data: *}}
 */
Match.prototype.toIdObj = function(input) {
    var obj = {};
    obj.data = input;
    
    if(_.isString(input) || _.isNumber(input)) {
        obj.id = input;
    }
    
    if(_.isObject(input)) {
        if(_.isDefined(input._id)) {
            obj.id = input._id;
        }
        if(_.isDefined(input.id)) {
            obj.id = input.id;
        }
    }
    
    return obj;
};


/**
 * Shortcuts
 */
Match.prototype.addPrize = function(prize, callback) {
    this.storage.addPrize(this.matchId, this.toIdObj(prize), callback);
};

Match.prototype.removePrize = function(prize, callback) {
    this.storage.removePrize(this.matchId, this.toIdObj(prize), callback);
};

Match.prototype.addPlayer = function(player, callback) {
    this.storage.addPlayer(this.matchId, this.toIdObj(player), callback);
};

Match.prototype.removePlayer = function(player, callback) {
    this.storage.removePlayer(this.matchId, this.toIdObj(player), callback);
};

Match.prototype.setPlayerRank = function(player, rank, callback) {
    this.storage.setPlayerRank(this.matchId, this.toIdObj(player), rank, callback);
};

Match.prototype.setPlayerRanks = function(players, callback) {
    this.storage.setPlayerRanks(this.matchId, players, callback);
};



/**
 * Award prizes to players based on their rank
 * @param {Function} callback
 */
Match.prototype.awardPrizes = function(callback) {
    if(this.status !== Match.OPEN) {
        return callback('Match.status is ' + this.status);
    }
    
    this.storage.getMatch(this.matchId, function(err, data) {
        if(err) {
            return callback(err);
        }
        var results = prizeFns.assignPrizes(data.players, data.prizes);
        return callback(null, results);
    });
};



/**
 * Clears saved data from storage
 * @param {Function} callback
 */
Match.prototype.close = function(callback) {
    if(this.status !== Match.OPEN) {
        return callback('Match.status is ' + this.status);
    }
    this.status = Match.CLOSED;
    this.storage.deleteMatch(this.matchId, callback);
};




module.exports = Match;