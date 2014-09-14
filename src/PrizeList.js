'use strict';

var _ = require('lodash');


/**
 * A collection of prizes
 * @constructor
 * @param {array} initialPrizes - A list of prizes to start with
 */
var PrizeList = function(initialPrizes) {
    this.prizes = [];
    _.each(initialPrizes, function(prize) {
        this.addPrize(prize);
    });
};


/**
 * Add a prize to this list
 * @param {*} prize
 */
PrizeList.prototype.addPrize = function(prize) {
    this.prizes.push(prize);
};


/**
 * Remove a prize from this list
 * @param {*} prize
 */
PrizeList.prototype.removePrize = function(prize) {
    _.pull(this.prizes, prize);
};


/**
 * Return list of prizes to be given to a place
 * @param {number} place - the player's ranking in the match
 * @returns {array}
 */
PrizeList.prototype.getPrizesForPlace = function(place) {
    var ret = [];
    _.each(this.prizes, function(prize) {
        if(prize.forPlace(place)) {
            ret.push(prize);
        }
    });
    return ret;
};