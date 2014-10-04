'use strict';

var _ = require('lodash');
var matches = {};


var self = {
    
    
    /**
     * Create a new match
     * @param {ObjectId} matchId
     * @param {Array} initialPlayers
     * @param {Array} initialPrizes
     * @param {Function} callback
     */
    createMatch: function(matchId, initialPlayers, initialPrizes, callback) {
        var match = {
            _id: matchId,
            players: initialPlayers || [], 
            prizes: initialPrizes || [],
            startDate: new Date(),
            updateDate: new Date()
        };
        matches[match._id] = match;
        return callback(null, match._id);
    },
    
    
    /**
     * Get a previously created match
     * @param {ObjectId} matchId
     * @param {Function} callback
     */
    getMatch: function(matchId, callback) {
        if(!matches[matchId]) {
            return callback('Match ' + matchId + ' not found');
        }
        return callback(null, matches[matchId]);
    },
    
    
    /**
     * Delete a match
     * @param {ObjectId} matchId
     * @param {Function} callback
     */
    deleteMatch: function(matchId, callback) {
        delete matches[matchId];
        return callback(null, null);
    },
    
    
    /**
     * Add a player to a match
     * @param {ObjectId} matchId
     * @param {{id: String, data: *}} player
     * @param {Function} callback
     */
    addPlayer: function(matchId, player, callback) {
        if(!matches[matchId]) {
            return callback('Match ' + matchId + ' not found');
        }
        matches[matchId].players.push(player);
        matches[matchId].updateDate = new Date();
        var modified = true;
        return callback(null, modified);
    },
    
    
    /**
     * Remove a player from a match
     * @param {ObjectId} matchId
     * @param {{id: String, data: *}} player
     * @param {Function} callback
     */ 
    removePlayer: function(matchId, player, callback) {
        var match = matches[matchId],
            originalLen = match.players.length,
            modified = false;
        
        if(!match) {
            return callback('Match ' + matchId + ' not found');
        }
        
        _.pull(match.players, {_id: player._id});
        match.updateDate = new Date();
        modified = match.player.length !== originalLen;
        return callback(null, modified);
    },
    
    
    /**
     * Retrieve all players in this match
     * @param {ObjectId} matchId
     * @param {Function} callback
     */ 
    getPlayers: function(matchId, callback) {
        if(!matches[matchId]) {
            return callback('Match ' + matchId + ' not found');
        }
        return callback(null, matches[matchId].players);
    },
    
    
    /**
     * Add a prize to a match
     * @param {ObjectId} matchId
     * @param {{id: String, data: *}} prize
     * @param {Function} callback
     */ 
    addPrize: function(matchId, prize, callback) {
        if(!matches[matchId]) {
            return callback('Match ' + matchId + ' not found');
        }
        matches[matchId].prizes.push(prize);
        matches[matchId].updateDate = new Date();
        var modified = true;
        return callback(null, modified);
    },
    
    
    /**
     * Remove a prize from a match
     * @param {ObjectId} matchId
     * @param {{id: String, data: *}} prize
     * @param {Function} callback
     */ 
    removePrize: function(matchId, prize, callback) {
        var match = matches[matchId],
            originalLen = match.prizes.length,
            modified = true;
        
        if(!match) {
            return callback('Match ' + matchId + ' not found');
        }
        
        _.pull(match.prizes, {id: prize.id});
        match.updateDate = new Date();
        modified = match.prizes.length !== originalLen;
        
        return callback(null, modified);
    },
    
    
    /**
     * Retrieve all prizes in this match
     * @param {ObjectId} matchId
     * @param {Function} callback
     */ 
    getPrizes: function(matchId, callback) {
        if(!matches[matchId]) {
            return callback('Match ' + matchId + ' not found');
        }
        return callback(null, matches[matchId].prizes);
    }
    
    
    
};

module.exports = self;
