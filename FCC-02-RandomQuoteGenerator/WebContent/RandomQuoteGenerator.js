var new_index;
var old_index;
var oldEqualsNew;
var quotes = [ "Wherever you go, there you are.",
               "You have to live a lot of your life with yourself, so learn to enjoy your own company.",
               "Best thing about the future is that it comes only one day at a time.",
               "It is more fun to talk with someone who doesn't use long, difficult words but rather short, easy words like \"What about lunch?\"",
               "\"What day is it?\" asked Winnie the Pooh.  \"Today,\" squeaked Piglet.  \"My favorite day,\" said Pooh.",
               "If you ever accidentally drop your keys into a river of molten lava, let 'em go, because man, they're gone.",
               "If you're robbing a bank and your pants fall down, I think it's okay to laugh, and let your hostages laugh too, because come on - life is funny.",
               "Awake, sleep no more!",
               "Having lots of money while not having inner peace is like dying of thirst while bathing in the ocean.", 
               "Attachment is blinding; it lends an imaginary halo of attractiveness to the object of desire.",
               "I will lift up mine eyes unto the hills, from whence cometh my help.",
               "Be ye therefore perfect, even as your Father which is in heaven is perfect."];

var authors = ["Anonymous",
               "Trigger Bill",
               "Trigger Bill",
               "A.A. Milne",
               "A.A. Milne",
               "Jack Handy",
               "Jack Handy",
               "Paramahansa Yogananda",
               "Paramahansa Yogananda",
               "Sri Yukteswar Giri",
               "Psalm 121",
               "Matthew 5:48"];

function generateQuote() {
	oldEqualsNew = true;
    while (oldEqualsNew) {
    	new_index = Math.floor(Math.random() * 12);
	    if (old_index === new_index) {
	    	{ continue; }
    	} else {
        	document.getElementById("quoteText").innerHTML = quotes[new_index];
	        document.getElementById("quoteAuthor").innerHTML = authors[new_index];
	        old_index = new_index;
	        oldEqualsNew = false;
    	}
    }
}