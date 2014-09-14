'use strict';

var _ = require('lodash');


/**
 * A group of players
 * @constructor
 * @param {array} initialPlayers - a list of players to start with
 */
var PlayerList = function(initialPlayers) {
    this.members = [];
    if(initialPlayers) {
        _.each(initialPlayers, function(player) {
            this.addPlayer(player);
        });
    }
};


/**
 * Add a player to this list
 * @param {*} player
 */
PlayerList.prototype.addPlayer = function(player) {
    var member = {
        player: player,
        place: 0,
        joinTime: new Date()
    };
    this.members[this.members.length] = member;
    _.unique(this.members);
};


/**
 * Remove a player from this list
 * @param {*} player
 */
PlayerList.prototype.removePlayer = function(player) {
    _.filter(this.members, function(member) {
        return member.player !== player;
    });
};


/**
 * Set a player's place
 * @param {*} player
 * @param {number} place
 */
PlayerList.prototype.setPlace = function(player, place) {
    _.each(this.members, function(member) {
        if(member.player === player) {
            member.place = place;
        }
    });
};


/**
 * Set one player as first place, and all other players as second
 * @param {*} player
 */
PlayerList.protoype.setWinner = function(player) {
    _.each(this.members, function(member) {
        if(member.player === player) {
            member.place = 1;
        }
        else {
            member.place = 2;
        }
    });
};


/**
 * Get a player's prizes
 * @param {*} player
 * @returns {array}
 */
PlayerList.prototype.getPrizes = function(player) {
    var ret;
    _.each(this.members, function(member) {
        if(member.player === player) {
            ret = member.prizes;
        }
    });
    return ret;
};

