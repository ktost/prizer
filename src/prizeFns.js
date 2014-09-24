'use strict';

var _ = require('lodash');


var self = {
    
    
    /**
     * Assign prizes to players according to their ranks
     * @param {[{_id: String, rank: Number}]} players
     * @param {[*]} prizes
     */
    assignPrizes: function(players, prizes) {
        var results = [];
        _.each(players, function(player) {
            var wonPrizes = this.prizeList.getPrizesForRank(prizes, player.rank);
            player.prizes = wonPrizes;
        });
        return results;
    },
    
    
    /**
     * Return list of prizes to be given to first rank, or second rank, etc
     * @param {[Prize]} prizes - a list of prizes
     * @param {Number} rank - the player's ranking in the match
     * @returns {Array}
     */
    getPrizesForRank: function(prizes, rank) {
        var wonPrizes = [];
        _.each(prizes, function(prize) {
            if(self.isPrizeForRank(prize, rank)) {
                wonPrizes.push(prize);
            }
        });
        return wonPrizes;
    },
        
    
    /**
     * Determins if a prize should be given to an nth rank finisher
     * @param {Object} prize
     * @param {Number} rank
     * @returns {Boolean}
     */
    isPrizeForRank: function(prize, rank) {
        var givePrize = true;
        if(_.isObject(prize)) {
            if(_.isNumber(prize.rank) && Number(prize.rank) !== Number(rank)) {
                givePrize = false;
            }
            if(_.isArray(prize.rank) && prize.rank.indexOf(rank) === -1) {
                givePrize = false;
            }
            if(_.isNumber(prize.minRank) && prize.minRank > rank) {
                givePrize = false;
            }
            if(_.isNumber(prize.maxRank) && prize.maxRank < rank) {
                givePrize = false;
            }
        }
        return givePrize;
    }
};



module.exports = self;