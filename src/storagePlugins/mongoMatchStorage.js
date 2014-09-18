'use strict';

var MatchGoose;

var self = {
    
    
    /**
     * Create a new match
     * @param {Array} initialPlayers
     * @param {Array} initialPrizes
     * @param {Function} callback
     */
    createMatch: function(initialPlayers, initialPrizes, callback) {
        MatchGoose.ceate({
            players: initialPlayers, 
            prizes: initialPrizes,
            startDate: new Date(),
            updateDate: new Date()
        }, callback);
    },
    
    
    /**
     * Get a previously created match
     * @param {ObjectId} matchId
     * @param {Function} callback
     */
    getMatch: function(matchId, callback) {
        MatchGoose.findById(matchId, callback);
    },
    
    
    /**
     * Add a player to a match
     * @param {ObjectId} matchId
     * @param {*} player
     * @param {Function} callback
     */
    addPlayer: function(matchId, player, callback) {
        MatchGoose.update (
            {_id: matchId}, 
            {$addToSet: {players: player}, $set: {updateDate: new Date()}}, 
            callback
        );
    },
    
    
    /**
     * Remove a player from a match
     * @param {ObjectId} matchId
     * @param {*} player
     * @param {Function} callback
     */ 
    removePlayer: function(matchId, player, callback) {
        MatchGoose.update (
            {_id: matchId},
            {$removeFromSet: {players: player}, $set: {updateDate: new Date()}},
            callback
        );
    },
    
    
    /**
     * Add a prize to a match
     * @param {ObjectId} matchId
     * @param {*} prize
     * @param {Function} callback
     */ 
    addPrize: function(matchId, prize, callback) {
        MatchGoose.update (
            {_id: matchId}, 
            {$addToSet: {prizes: prize}, $set: {updateDate: new Date()}}, 
            callback
        );
    },
    
    
    /**
     * Remove a prize from a match
     * @param {ObjectId} matchId
     * @param {*} prize
     * @param {Function} callback
     */ 
    removePrize: function(matchId, prize, callback) {
        MatchGoose.update (
            {_id: matchId},
            {$removeFromSet: {prizes: prize}, $set: {updateDate: new Date()}},
            callback
        );
    }
    
    
    
};

module.exports = self;
