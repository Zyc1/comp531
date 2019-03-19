# hw3-Zyc1
In this assignment you will create a JavaScript game to be played in a browser that demonstrates your understanding of dynamic HTML and CSS with JavaScript. Whereas this assignment is open ended, we should focus on meeting the specified requirements more than adding extra bells and whistles or making the game look really good (there are other classes focused on game design) -- in particular because we only have two weeks to work on this assignment!

Use Chrome as your standard supported browser. (Whereas you can use any browser you like for development, your assignment will be accessed using Chrome by the grading staff and therefore it behooves you that it works.)

Requirements
Write unobstrusive JavaScript and CSS, i.e., separate js, css, and html to files with their respective content.
Playable by a single player alone
Playable in a short sitting, i.e., 10 minutes or less
A visual game, i.e., the game should involve moving graphics and should use the mouse to interact (think about playing the game on a phone). Some keyboard usage is permissible.
includes a "score" that is updated as the user plays
includes a metric that is not the score, but is otherwise useful for ranking the player or providing information for usage in statistical analysis (think click-through rates, page pauses, etc)
Has a dynamic aspect to it, e.g., difficulty becomes harder or easier, perhaps at random or as the user progresses in the game
include something unique in the game, i.e., make the game your own not just a generic clone of tic-tac-toe or whack-a-mole
include a 250x250 screenshot of the game in action named screenshot.png.
Record the score and metrics as cookies or in local storage. In this way, when the page is refreshed, the best score and metric values (or perhaps statistics of them) should be available somewhere for the user to see.
Host your game on Surge so people in the class can play it and supply a README.json file in your github submission similar to

{ 
    "netid": "mrj1",
    "title": "Flying Bug",
    "site": "http://flyingbug.surge.sh/"
}
be careful to follow the format of this file, it must be a properly formatted json file with these keys.

Example Ideas
Below are some example ideas for games that you might create. Remember the Rice Honor code: you write the code yourself do not copy the code for a game from the internet. There are lots of games out there, take a look on the iPhone or Android app store, and you are free to search for inspiration (just remember the honor code).

tic-tac-toe (don't pick this one)
whack-a-mole (don't pick this one)
blackjack (don't pick this one)
catch the fly (don't pick this one)
hangman
duck hunt
space invaders
an arithmetic game (e.g., what is 8 x 17?)
memory
race game
maze game
angry birds clone
You may not use source code from the internet except for the sites mentioned in class. You may not use previous implementations of games. You must write your game from scratch -- remember the honor code!

To give you an idea about how a game like one of these satisfy the spirit of the assignment, demonstrating your knowledge and application of HTML, CSS, and JavaScript, let's look at the first game in detail:

We use HTML and CSS to display a tic-tac-toe board
We use JavaScript to keep track of the state of the board, and the logic for the computer moves.
We have event handlers listening for mouse clicks and manipulate the DOM to add X's and O's to the page when a player makes a move
When the game is over, we use JavaScript to inform the user of the outcome
We use HTML/CSS/JS to maintain a score board showing the user's score as compared with the computer's and ties, as well as metrics such as how long it took the user to win on average compared with the average time for losses or ties
The computer starts off making poor moves, but as the user performs proficiently, the computer AI becomes more selective in it's choices
For metrics, let's think about the flying bug game. We could collect the following:

Number of missed clicks, i.e., clicks where a fly wasn't captured.
Time between clicks
Average movement of the mouse around the screen
Hot spots, i.e., locations where mouse pointer spends more time than others
Number of times the Pause button is clicked
Number of times the Reset button is clicked
Remember to be creative and make the game your own!
