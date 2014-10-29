'use strict';


var Match = require('./Match.js');
var storage = require('./storagePlugins/memoryStorage');


var prizer = {
    
    
    /**
     * Open a new match
     * @param {array} initialPlayers - A list of players to start with
     * @param {array} initialPrizes - A list of prizes to start with
     * @param {Function} callback
     */
    createMatch: function(initialPlayers, initialPrizes, callback) {
        var matchId = storage.generateId();
        storage.createMatch(matchId, initialPlayers, initialPrizes, function(err) {
            if(err) {
                return callback(err);
            }
            var match = new Match(storage, matchId);
            return callback(null, match);
        });
    },
    
    
    /**
     * Retrieve an interface for an already existing match
     * @param {String} matchId
     * @param {Function} callback
     */
    getMatch: function(matchId, callback) {
        storage.getMatch(matchId, function(err, matchData) {
            if(err) {
                return callback(err);
            }
            if(!matchData) {
                return callback('Match not found');
            }
            var match = new Match(storage, matchId);
            return callback(null, match);
        });
    }
    
    
};


module.exports = prizer;