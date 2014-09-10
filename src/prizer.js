'use strict';


var matches = require('./matches');



var prizer = {
    
    
    setStorageEngine: function(_storageEngine_) {
        prizer.storageEngine = _storageEngine_;
    },
    
    
    createMatch: function() {
        return matches.createMatch();
    },
    
    
    getMatch: function(matchId) {
        return matches.getMatch(matchId);
    }
    
    
    
};


module.exports = prizer;