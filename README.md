prizer
======

Track and assign prizes.

var prizer = require('prizer');

prizer.setStorage({type: 'redis', connection: redisConnection});
prizer.addPrize({chance: 0.01, prize: 'rareStone', for: prizer.FIRST_PLACE, unique: false, reusable: true});
prizer.getMatches(); // [match1, match2, match3]

var prize = {chance: 0.5, id: 'randomDropStone', for: prizer.EVERYONE, unique: false, reusable: true};
var prizeEvent = prizer.addPrizeEvent({frequency: 1000*60, prize: prize});
prizeEvent.run();
prizeEvent.start();
prizeEvent.stop();

var match = createMatch({users: [userId1, userId2, userId3], ttl: 60*1000});
match.addUser(userId4);
match.removeUser(userId4);

match.getUsers() // [userId1, userId2, userId3]
match.getTtl() // 60000
match.getAge() // 0

match.addPrize(prizeId);
match.addPrize({chance: 0.25, prize: 'laserSword', for: prizer.FIRST_PLACE}, unique: true, reusable: true);
match.addPrize({chance: 1, prize: 'completionBonus', for: prizer.EVERYONE, unique: false, reusable: false});
match.getPrizes() // [prize1, prize2, prize3]

match.finish();
match.finish({winner: userId2});
match.finish({rankings: [userId2, userId3, userId1]});

match.getUserPrizes(userId2); //['laserSword', 'completionBonus'];

match.cancel();


