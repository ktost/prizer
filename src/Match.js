'use strict';

var _ = require('lodash');
var PrizeList = require('PrizeList');
var PlayerList = require('PlayerList');
var matches = require('matches');


/**
 * Stores a list of users and a list of prizes
 * @constructor
 * @param {array} initialPlayers - A list of players to start with
 * @param {array} initialPrizes - A list of prizes to start with
 */
var Match = function(initialPlayers, initialPrizes) {
    this.matches = matches;
    this.playerList = new PlayerList(initialPlayers);
    this.prizeList = new PrizeList(initialPrizes);
    this.status = Match.OPEN;
    matches.addMatch(this);
};

Match.prototype.OPEN = 'open';
Match.prototype.CLOSED = 'closed';
Match.prototype.REMOVED = 'removed';


/**
 * Shortcuts
 */
Match.prototype.addPrize = PrizeList.addPrize;
Match.prototype.removePrize = PrizeList.removePrize;
Match.prototype.addPlayer = PlayerList.addPlayer;
Match.prototype.removePlayer = PlayerList.removePlayer;
Match.prototype.setPlace = PlayerList.setPlace;
Match.prototype.setWinner = PlayerList.setWinner;
Match.prototype.getPrizes = PlayerList.getPrizes;


/**
 * Award prizes to users according to their place
 * @returns {[{player: *, prizes: [], place: number}]}
 */
Match.prototype.finish = function() {
    if(this.status === Match.OPEN) {
        this.status = Match.CLOSED;
        _.each(this.playerList.members, function(member) {
            member.prizes = this.prizeList.getPrizesForPlace(member.place);
        });
        return this.playerList.members;
    }
};


/**
 * Close this match without awarding any prizes
 */
Match.prototype.cancel = function() {
    if(this.status === Match.OPEN) {
        this.status = Match.CLOSED;
    }
};


/**
 * Cleanup for garbage collector
 */
Match.prototype.remove = function() {
    if(this.status !== Match.REMOVED) {
        this.status = Match.REMOVED;
        this.matches.removeMatch(this);
        delete this.matches;
        delete this.players;
        delete this.prizes;
    }
};


module.exports = Match;