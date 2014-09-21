'use strict';

var _ = require('lodash');


var self = {
    
    
    /**
     * Assign prizes to players according to their ranks
     * @param {[*]} players
     * @param {[*]} prizes
     */
    assignPrizes: function(players, prizes) {
        var results = [];
        _.each(players, function(player, place) {
            var wonPrizes = this.prizeList.getPrizesForPlace(prizes, place);
            results.push({player: player, prizes: wonPrizes});
        });
        return results;
    },
    
    
    /**
     * Return list of prizes to be given to first place, or second place, etc
     * @param {[Prize]} prizes - a list of prizes
     * @param {Number} place - the player's ranking in the match
     * @returns {Array}
     */
    getPrizesForPlace: function(prizes, place) {
        var wonPrizes = [];
        _.each(prizes, function(prize) {
            if(self.isPrizeForPlace(prize, place)) {
                wonPrizes.push(prize);
            }
        });
        return wonPrizes;
    },
        
    
    /**
     * Determins if a prize should be given to an nth place finisher
     * @param {Object} prize
     * @param {Number} place
     * @returns {Boolean}
     */
    isPrizeForPlace: function(prize, place) {
        var givePrize = true;
        if(_.isObject(prize)) {
            if(_.isNumber(prize.place) && Number(prize.place) !== Number(place)) {
                givePrize = false;
            }
            if(_.isArray(prize.place) && prize.place.indexOf(place) === -1) {
                givePrize = false;
            }
            if(_.isNumber(prize.minPlace) && prize.minPlace > place) {
                givePrize = false;
            }
            if(_.isNumber(prize.maxPlace) && prize.maxPlace < place) {
                givePrize = false;
            }
        }
        return givePrize;
    }
};



module.exports = self;