'use strict';


var matches = require('./matches');



var prizer = {
    
    
    createMatch: function() {
        return matches.createMatch();
    },
    
    
    getMatch: function(matchId) {
        return matches.getMatch(matchId);
    }
    
    
    
};


module.exports = prizer;