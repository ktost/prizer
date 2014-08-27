'use strict';


var matches = require('./matches');



var prizer = {
    
    
    setStorageEngine: function(_storageEngine_) {
        prizer.storageEngine = _storageEngine_;
    },
    
    
    getUserPrizes: function(userId, callback) {
        prizer.storageEngine.getSavedPrizes(userId, callback);
    },
    
    
    addUserPrize: function(userId, prizeId, callback) {
        prizer.storageEngine.addPrize(userId, prizeId, callback);
    },
    
    
    removeUserPrize: function(userId, prizeId, callback) {
        prizer.storageEngine.removePrize(userId, prizeId, callback);
    },
    
    
    createMatch: function() {
        return matches.createMatch();
    },
    
    
    getMatch: function(matchId) {
        return matches.getMatch(matchId);
    }
    
    
    
};


module.exports = prizer;