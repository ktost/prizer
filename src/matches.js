'use strict';

var matches = [];


module.exports = {
    
    addMatch: function(match) {
        matches[match.matchId] = match;
    },
    
    
    getMatch: function(matchId) {
        return matches[matchId];
    },
        
    
    removeMatch: function(matchId) {
        delete matches[matchId];
    },
    
    
    clear: function() {
        matches = [];
    }
};