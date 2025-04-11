
//Piece Cards
cards.push(new PieceCard(20,"Queendom", "Gain a Queen", Queen));
cards.push(new PieceCard(10,"Knookdom", "Gain a Knook", Knook));
cards.push(new PieceCard(10,"Knookalicous", "Uhh, don't ask.", Knook));

cards.push(new PieceCard(1,"Antipawn", "This card is VERY rare^for no reason!", Antipawn));
cards.push(new PieceCard(2,"Goose", "Run.", Goose));

cards.push(new Bomb(5,"Bomb", "Boom!", 3));
cards.push(new Bomb(1,"Nuke", "Boooooooooooom!", 7));

cards.push(new newBoardCard(6,"Upgrade!","You and your opponent^each chip in to purchase^a new, bigger board!",2,2));
cards.push(new newBoardCard(2,"Extra long","yeah, I don't know why either.",0,10));
cards.push(new newBoardCard(2,"Girthy","Dang.",6,0));

cards.push(new PieceCard(40,"Pawn", "Ya like pawns?", Pawn));

cards.push(new ManyPieceCard(4, "Tour de Force", "Gain 8 Pawns", Pawn, 8));
cards.push(new ManyPieceCard(1, "Pawnular", "Pawn pawn pawn pawn^pawn pawn pawn pawn^pawn pawn pawn pawn^pawn pawn pawn pawn^pawn pawn pawn pawn^pawn pawn pawn pawn^pawn pawn pawn?", Pawn, 27));

cards.push(new Color(7,"Now in color!", "AAAAAAAAAAAAAH!"));
cards.push(new TheFrench(4,"The French", "The french are here!^^Overthrow the monarchy!^^off with their heads!"));
cards.push(new GreenScreen(10,"Green", "They're filming Chess, the movie^but they didn't have the^budget for a board"));

cards.push(new Card(18,"Punch", "Punch your Opponent^(lightly)"));
cards.push(new Card(2,"Contest", "Staring contest.^Now."));
cards.push(new Card(4,"Ouch", "Punch your Opponent^(hard)^^They deserve it.^^Hopefully."));
//cards.push(new Card(2,"Flight", "Size up your opponent.^if you think you could pick^them up, do so until they^are done with their next turn."));
//cards.push(new Card(8,"Flight", "Size up your opponent.^if you think you could pick^them up, do so until they^are done with their next turn."));

cards.push(new Card(5,"Junk", "This card is useless, sorry"));
cards.push(new Card(7,"Insult", "Insult your opponent"));
cards.push(new PieceCard(8,"Banana", "High in potassium!",Banana,"banana"));
cards.push(new Card(7,"Wholesome", "Compliment your opponent"));
//cards.push(new Card(2,"Kindness", "Your opponent is sad.^Give them a hug."));
//cards.push(new Card(10,"Kindness", "Your opponent is sad.^Give them a hug."));
//cards.push(new Card(1,"Apology song", "you were mean to your^opponent. Sing them an apology^song at least 10 seconds^long."));

cards.push(new Card(1,"British", "Tea is pretty good, eh?"));
cards.push(new AddRowan(1,"Rowan Jansen", "The One, The Only.^^One of your pawns is^now named Rowan Jansen.^^Pretty neat, huh?^^^yeah, uhh... he definitely^doesn't move differently...",Pawn,true));


cards.push(new Card(3,"Confess", "Confess something to^one of your bishops.^To make sure he heard,^he needs a witness,^your opponent."));
cards.push(new Card(0,"Truth or...", "Truth or Dare.^A true classic;^but dares are too much for^a chess game. let go of^your secrets."));

cards.push(new Card(1,"Fun Fact!", "The card renderer is broken                                                     ^enough that I can do this!                                                     "));
cards.push(new Card(1,"Fun Fact!", "Play dough was used as^wallpaper cleaner."));
cards.push(new Card(1,"Fun Fact!", "When sober, rats like silence^but when on cocaine, they^prefer jazz."));
cards.push(new Card(1,"Fun Fact!", "The Cookie Monster's name^ is actually Sid."));
cards.push(new Card(1,"Fun Fact!", "Reindeer are not capable of flight."));
cards.push(new Card(1,"Fun Fact!", "Russia has more surface area than pluto."));
cards.push(new Card(2,"Fun Fact!", "This 'Fun Fact' card is twice^as common as any other!"));
cards.push(new Card(1,"Fun Fact!", "Americans consume 350 slices^of pizza per second."));
cards.push(new Card(1,"Fun Fact!", "Strawberries aren't berries,^but bananas and avocados are."));
cards.push(new Card(1,"Fun Fact!", "Sudan has more pyramids^than Egypt!"));
cards.push(new Card(1,"Fun Fact!", "Africa has parts in all 4^hemispheres!"));
cards.push(new Card(1,"Fun Fact!", "German chocolate cake was^invented in texas!"));
cards.push(new Card(1,"Fun Fact!", "Fortune cookies come from^New York!"));
cards.push(new Card(1,"Fun Fact!", "French fries were invented in^Belgium, not france!"));
cards.push(new Card(1,"Fun Fact!", "The brand 'Spam' is short for^'spiced ham'!"));
cards.push(new Card(1,"Fun Fact!", "Lemons float, but limes sink!"));
cards.push(new Card(1,"Fun Fact!", "A cow-bison hybrid is called^a beefalo!"));
cards.push(new Card(1,"Fun Fact!", "Scotland has 421 words for snow!"));
cards.push(new Card(1,"Fun Fact!", "Peanuts aren't nuts,^they're beans!"));
cards.push(new Card(1,"Fun Fact!", "Armadillo shells are bulletproof!^^Interesting tangent about this,^there was a guy trying to kill^one, and when he shot^it, the bullet bounced off^and killed him."));
cards.push(new Card(1,"Fun Fact!", "Armadillo is technically^pronounced Arm-a-dee-yoh!"));
cards.push(new Card(1,"Fun Fact!", "The longest work in english,^the full chemical word for^a protein known as titin^is 189,819 letters long and^takes roughly 3 and a half^hours to say."));

//cards.push(new Card(12,"Pushups", "You must do "+getRandomInt(10)+" pushups,^then your opponent must do "+getRandomInt(10)+"."));

cards.push(new PieceCard(20, "Pawn..?", "These descriptions can^be as long as I want them to be,^but if I make them too long the^game gets laggy.^^You think that will stop me?", Pawn));
cards.push(new PieceCard(12, "Kingdom", "Your king undergoes mitosis^and duplicates.^Now you have two!", King));

cards.push(new PieceCard(2, "Blessing", "SUPERKNIGHT!^It's basically a^cheat code.", Superknight));

//cards.push(new PieceCard(6, "Stupidity", "You gain a \"Stupid\"\nWhy did we add this?", Stupid));

cards.push(new killPieceCard(4, "Knookicide", "One of your knooks dies of^pneumonia",Knook,true));
cards.push(new killPieceCard(2, "Enemy Sniper", "Your queen dies.",Queen,true));
cards.push(new killPieceCard(2, "Sept. 8, 2022.", "Your queen dies.",Queen,true));
cards.push(new killPieceCard(4, "Assassin", "Your opponent's queen dies.",Queen,false));
cards.push(new killPieceCard(1, "Heart attack", "Your king dies of a^sudden heart attack.^^sorry...",King,true));
cards.push(new killPieceCard(1, "Super Sniper", "Your opponent's king dies",King,false));
cards.push(new killManyPieceCard(1, "911", "September 11, 2001",Rook,true,2));

cards.push(new killPieceCard(10, "Loser.", "Ha Ha!^Took one of your pawns!^Why? because screw you,^that's why!",Pawn,true));
cards.push(new killPieceCard(10, "Attack!", "Someone with a long-range^homing classified camouflaged^Clerion-grade weapons-class^attack drone killed one of your^knights using the drone's^High-power double-amplified^supermagnetic overcharged^giga-railgun.",Knight,true));


cards.push(new killPieceCard(20, "Stormtrooper", "One of your pawns dies.",Pawn,true));
cards.push(new killPieceCard(20, "Dullshooter", "A not-so-sharpshooter.^One of your^opponent's pawns dies.",Pawn,false));

if(isHannahGrace){//hannah-grace only cards
    //none so far
}