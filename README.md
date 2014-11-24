prizer
======

I REQUEST MORE JIGG ACTIVITY pls

Track and assign things like prizes, items, and trophies. Prizes can be granted based on the outcome of matches, or manually assigned as needed.



##Usage
```
// Create a match.
var match = prizer.createMatch();

// Add prizes
match.addPrize({id: 'laserSword', for: prizer.FIRST_PLACE});
match.addPrize({id: 'participationBonus', for: prizer.EVERYONE});

// Add users
match.addUser('biff')
match.addUser('tree')

// Declare a winner
match.finish({winner: 'tree'});

// See who got prizes
match.getUserPrizes('tree'); // ['laserSword', 'participationBonus']
match.getUserPrizes('biff'); // ['participationBonus']
```


##Documentation

###prizer.setStorage({type: String, connection: *})
```
var prizer = require('prizer');
var redisClient = require("redis").createClient();

prizer.setStorage({type: 'redis', connection: redisClient});
```

###prizer.addPrize(prize)
```
prizer.addPrize({chance: 0.01, prize: 'rareStone', for: prizer.FIRST_PLACE, unique: false, reusable: true});
```

###prizer.getMatches()
```
prizer.getMatches(); // [match1, match2, match3]
```

###prizer.addPrizeEvent()
```
var prize = {chance: 0.5, id: 'randomDropStone', for: prizer.EVERYONE, unique: false, reusable: true};
var prizeEvent = prizer.addPrizeEvent({frequency: 1000*60, prize: prize});
prizeEvent.run(); // distribute the prize once
prizeEvent.start(); // begin distributing the prize once every 60 seconds
prizeEvent.stop(); // stop distributing the prize
```

###prizer.createMatch()
```
var match = prizer.createMatch({users: [userId1, userId2, userId3], ttl: 60*1000});
```

###match.addUser(userId)
```
match.addUser('bob');
match.addUser('sally');
match.getUsers(); // ['bob', 'sally']
```

###match.removeUser(userId)
```
match.addUser('bob');
match.addUser('sally');
match.removeUser('bob');
match.getUsers(); // ['sally']
```

###match.getUsers()
```
match.addUser('sleepy')
match.getUsers() // ['sleepy']
```

###match.getTtl()
```
var match = prizer.createMatch({ttl: 60*1000});
match.getTtl(); // 60000
```

###match.getAge()
```
var match = prizer.createMatch({});
match.getAge(); // 0
sleep(5000);
match.getAge(); // 5000
```

###match.addPrize(prize)
```
match.addPrize(prizeId);
match.addPrize({chance: 0.25, prize: 'laserSword', for: prizer.FIRST_PLACE}, unique: true, reusable: true);
match.addPrize({chance: 1, prize: 'completionBonus', for: prizer.EVERYONE, unique: false, reusable: false});
match.getPrizes() // [prize1, prize2, prize3]
```

###match.finish()
```
match.addPrize('mansion');
match.addUser('suzy');
match.finish();
match.getUserPrizes('suzy'); // ['mansion']
```

###match.cancel()
```
match.addPrize('mansion');
match.addUser('suzy');
match.cancel();
match.getUserPrizes('suzy'); // []
```

###match.getUserPrizes
```
var match = prizer.createMatch();
var laserPrize = {chance: 1, , unique: true, reusable: true}
var participationPrize = {chance: 1, , unique: false, reusable: false}

match.addPrize({id: 'laserSword', for: prizer.FIRST_PLACE});
match.addPrize({id: 'participationBonus', for: prizer.EVERYONE});
match.addUser('biff')
match.addUser('tree')
match.finish({winner: 'tree'});

match.getUserPrizes('tree'); // ['laserSword', 'participationBonus']
match.getUserPrizes('biff'); // ['participationBonus']
```




