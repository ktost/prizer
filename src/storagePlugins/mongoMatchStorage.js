'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var matchSchema = new Schema({
    players: [],
    prizes: [],
    startDate: Date,
    updateDate: Date
}, {
    capped: 1024
});

var MatchGoose = mongoose.model('Match', matchSchema);


var self = {
    
    
    /**
     * Create a new match
     * @param {ObjectId} matchId
     * @param {Array} initialPlayers
     * @param {Array} initialPrizes
     * @param {Function} callback
     */
    createMatch: function(matchId, initialPlayers, initialPrizes, callback) {
        MatchGoose.ceate({
            _id: matchId,
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
     * Delete a match
     * @param {ObjectId} matchId
     * @param {Function} callback
     */
    deleteMatch: function(matchId, callback) {
        MatchGoose.remove({_id: matchId}, callback);
    },
    
    
    /**
     * Add a player to a match
     * @param {ObjectId} matchId
     * @param {{id: String, data: *}} player
     * @param {Function} callback
     */
    addPlayer: function(matchId, player, callback) {
        MatchGoose.update (
            {_id: matchId}, 
            {
                $push: {players: player}, 
                $set: {updateDate: new Date()}
            }, 
            callback
        );
    },
    
    
    /**
     * Remove a player from a match
     * @param {ObjectId} matchId
     * @param {{id: String, data: *}} player
     * @param {Function} callback
     */ 
    removePlayer: function(matchId, player, callback) {
        MatchGoose.update (
            {_id: matchId},
            {
                $pull: {players: {id: player.id}}, 
                $set: {updateDate: new Date()}
            },
            callback
        );
    },
    
    
    /**
     * Retrieve all players in this match
     * @param {ObjectId} matchId
     * @param {Function} callback
     */ 
    getPlayers: function(matchId, callback) {
        self.getProperty(matchId, 'players', callback);
    },
    
    
    /**
     * Add a prize to a match
     * @param {ObjectId} matchId
     * @param {{id: String, data: *}} prize
     * @param {Function} callback
     */ 
    addPrize: function(matchId, prize, callback) {
        MatchGoose.update (
            {_id: matchId}, 
            {
                $push: {prizes: prize},
                $set: {updateDate: new Date()}
            }, 
            callback
        );
    },
    
    
    /**
     * Remove a prize from a match
     * @param {ObjectId} matchId
     * @param {{id: String, data: *}} prize
     * @param {Function} callback
     */ 
    removePrize: function(matchId, prize, callback) {
        MatchGoose.update (
            {_id: matchId},
            {
                $pull: {prizes: {id: prize.id}},
                $set: {updateDate: new Date()}
            },
            callback
        );
    },
    
    
    /**
     * Retrieve all prizes in this match
     * @param {ObjectId} matchId
     * @param {Function} callback
     */ 
    getPrizes: function(matchId, callback) {
        self.getProperty(matchId, 'prizes', callback);
    },
    
    
    /**
     * Retrieve a property of match from the db
     * @param {ObjectId} matchId
     * @param {String} key
     * @param {Function} callback
     */ 
    getProperty: function(matchId, key, callback) {
        MatchGoose.findById(matchId, function(err, match) {
            if(err) {
                return callback(err);
            }
            return callback(null, match[key]);
        });
    }
    
    
    
};

module.exports = self;
