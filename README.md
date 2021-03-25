
# Project "Tic Tac Toe with AI server" 


**Author:** *Velickovic Djordje*


# Contents: 
## Project Overview

- Project Description

- Files and Organisation

- Page Flow and Visual Design

## Overwiew Page

- Page Role

## Game page

- Page Role

## Single Player Page

- Page Role

- Game Logic

## Two Player Page 

- Page Role

- Game Logic

## Multiplayer Page 

- Page Role

- Server-Client Logic

## Top Players Page

- Page Role

- Scoring Logic

## Assets

- background

- buttons

- music

- sounds

## Instructions

- Setting up Server

- Reseting User Score

# Project Overview 


## Project Description


- This Project is made by *Veličković Đorđe* and it is counted as Midterm exam due to current 
	  situation regarding to COVID-19 and inability for Universities to stick with the regular exams which require physical attendance.

- I have all rights reserved. Everything you see in this Project is my own work. 
	  All files are written from scratch: HTML, CSS and JavaScript. (3187 lines of code combined)
	  Every image or icon is made using Photoshop and every sound is made or edited using Logic Pro X.


## Files and Organisation


- Files have hierarchy and are organised accordingly.

- Each individual file has comments alongside code which describe certain code block and its relation 
	  to the page.

- Note that in the code comments I won't be explaining code blocks that are obvious.
	  For example, attributes for coloring in CSS or calling a function in JavaScript,
	  or any other code block which is obvious itself.

- Each individual page is locaded in unique folder carrying the name of the page.

- Each individual folder of certain page contains all files for the page: HTML, CSS and JavaScript.

- Some folders may have a subfolder called "server". 

- The server folder contains the files for running a server according to its parent folder.

- There's a folder called "assets" located as subfolder of the Project folder.

- The assets folder have 4 subfolders called "background" containing background image for all pages,
	  "buttons" containing button icons, "music" containing mp3 file used for background music in game
	  and "sounds" containing mp3 files used as effects on game over state.

- Each file has access to the assets folder.


## Page Flow and Visual Design

	
- All pages have particular page design to follow.

- Color scheme is: 
	* Black for navigation bar, boxes and footer.
	* Orange for important text, buttons and borders.
	* White for less important text, buttons and borders.

- All pages have same navigation bar, background image and copyright footer.

- Single Player, Two Player, Multiplayer and Top Players are game pages and have similar stucture.

- Contents of game pages are displayed in a black box style in the center of the page.

- Every box in game pages has a visual back button that navigates the user to the previous page.

- Some boxes may have visual button for playing or stoping music.

- Pages that are on running servers are opened in a new tab.

# Overview Page 

## Page Role


- Main page of this Project.

- Holds information about the webpage as well as information about the Project's creator and Project itself.

- Holds links which all directs the user to the Game page.

- Files are located in the Project folder.

- Files are HTML, CSS and JavaScript.

- JavaScript file is used for either showing or hiding information about the page so that all is visually clean.

# Game Page 

## Page Role

- Page that allows the user to choose from given game options.

- Holds links to each game option / other pages (Single Player, Two Player, Multiplayer or Top Players).

- Holds quick information that explains the actual game, located at the bottom of the page.

- Files are located in subfolder called "game" in the Project folder.

- Files are HTML and CSS. No need for JavaScript file.

# Single Player Page 

## Page Role

- Page that allows the user to play the game with AI.

- Files are located in subfolder called "singlePlayer" in the "game" folder.

- Files are HTML, CSS and JavaScript.


## Game Logic

- On page load the user has to choose his sign for playing the game (X or O).

- When the sign has been chosen the Tic Tac Toe board will appear.

- If the chosen sign was 'O', the AI will make its move first.

- If the chosen sign was 'X', the user will have to make his move first. 
	  The game will tell the user to make his move.

- User can make his move by clicking on each cell of the given board.

- User cannot click the board cell that was already assigned.

- On each move there will be player turn between the user and AI.

- AI will respond to any user click.

- AI will block the user if he is about to make a match.

- When the game is over the match of signs will be colored, background music will stop
	  and sound will be played, all depending on if it was a win for the user, a lost for the user 
	  or if it was a tie game.

- The game will tell which player has won or that it was a tie game.

- If it was not a tie game, the score will increment by 1 for either user or AI.

- The replay button will appear and the page will allow the user to restart the game.

# Two Player Page 

## Page Role

- Page that allows two users on one computer to play the game.

- Files are located in subfolder called "twoPlayer" in the "game" folder.

- Files are HTML, CSS and JavaScript.

## Game Logic

- When loaded the page will prompt the users with input fields to enter their names.

- Input fields are for user playing with 'X' sign and user playing with 'O' sign.

- To start the game users have to click on play button.

- Users do not have to enter their names for game to start.

- Users can make their move by clicking on each cell of the given board.

- Users cannot click the board cell that was already assigned.

- On each move the sign will be changed between 'X' and 'O' thus the player turn.

- When the game is over the match of signs will be colored, background music will stop 
	  and sound will be played, depending on if it was a win for any of the users or if it was a tie game. 

- The game will tell which player has won or that it was a tie game.

- If the user who has won the game had previously entered his name, 
	  the game will include that name in win message.

- If the user who has won the game haven't had previously entered his name, 
	  the game will tell which player has won depending on the sign.

- The replay button will appear and the page will allow the users to restart the game.

# Multiplayer Page 

## Page Role

- Page that allows two users on different computers or browsers to play the game.

- Files are located in subfolder called "multiPlayer" in the "game" folder.

- Files are HTML, CSS and JavaScript.

- There's a subfolder called "server".

- In the "server" folder there are files for running a server.

- Files are HTML, CSS, JavaScript and JSON.

- There's a JavaScript file for the server and JavaScript file for the client.

- Client's files are located in subfolder called "public" in either "styles" folder for CSS files or in "app" 
	  folder for JavaScript files.

## Server-Client Logic


- If it's running, the server will listen for a connection on particular port number.

- If only client is connected to the server, server will forbid the client from clicking the cells
	  on the Tic Tac Toe board and will tell the client that it is waiting for another client to connect.

- When the second client has connected, the game will start and the first client will now  will be able 
	  to click on the cell of the board.

- The second client will be prevented from clicking the cells if the first client haven't had made his move.

- When the first client has made the move, he will be prevented from clicking the cells
	  and the second client will now be able to make his move.

- When there's a match of signs for one of the clients the server will forbid clicking the cells
	  for both clients, and it will display that the game is over with a winning client message.

- There can be multiple clients playing the game on the same server. 

# Top Players Page 

## Page Role

- Page that allows the user to view his scores that he had achieved in either two player or multiplayer game.

- Files are located in subfolder called "topPlayers" in the "game" folder.

- Files are HTML, CSS and JavaScript.

## Scoring Logic

- In order to display his score, the user have to have had his name entered in the game he was playing in.

- If there was already a score from another user name, the new user score will be added in a new row.

- If the user continues to play the game and achieves more score, his name in the scoreboard will stay the same
	  but the score will increment if and only if he have had entered his name when he was continuing to play.

- The user can reset his score by clicking on "Reset Score" button, 
	  entering his name and clicking on "ok" button.

- If there are no users in the scoreboard, user cannot reset the score.

- If the user entered his name incorrectly, page will display an error and tell that it's a wrong player name.

- User can cancel the score reset operation by clicking the cancel button.

# Assets 


- All assets are my own work, all the images and buttons.

- Sounds are downloaded from the internet.

- Images and buttons are made from scratch in Photoshop

- Sounds are edited in Logic Pro X.

- There are subfolders named depending on their contents type.

- Some files in subfolders may be unused either because of a techical problem or lack of time.
  You may see those files commented out in code and explained why.

## background

- A subfolder storing images that are used as backround images for the pages in this Project.

- Images here have 1080p resolution as default so they fit the browser windows well,
	  because that's the most common resolution for today's displays.


## buttons

- A subfolder storing icon-sized images that are used as visual buttons for the pages in this Project.

- Images are made using Photoshop.

- Images here I have set to the 600x700 resolution as standard just so I wouldn't have to set the size
	  for each individual button in CSS.

- ButtonBefore represents a default look for a button on the page.

- ButtonAfter represents a look for a button when the user hovers with a mouse over it.
	  So in CSS on hover, ButtonBefore image for the HTML element is removed
	  and ButtonAfter image is placed in.

- Notice how it matches all matches the color scheme of the Project.


## music


- A subfolder storing music files for playing backround music when the game is in progress.

- Files are edited using Logic Pro X and reduced to .mp3 format
	  so they wouldn't take a lot of space.

## sounds


- A subfolder storing sounds that are used as effects in the game.

- Sounds may be used when placing a sign on a board, when the user has won or lost, etc...

- Files are edited using Logic Pro X and reduced to .mp3 format
	  so they wouldn't take a lot of space.

# Instructions 

## Setting up Server

- In order to set up a server, you need to have node.js installed first.

- When node has been installed, you need to find the "server" folder in the Project folder.

- The "server" folder is located in one of the subfolders of a subfolder of the Project folder.

- In the "server" folder there are all files that are required for running a server.

- In terminal type "node server.js".

- The server will indicate that it's running by printing out its status in the terminal.

- The server will also print out which port number it is running on.

- In the browser type "localhost:" and the port number after a colon.

- Now you are connected to the server!

## Reseting User Score

- In order to reset a score you have to enter the player name that is listed in the scoreboard.

- When you have entered the name that exists in the scoreboard, 
	  click on the reset button and the name will be gone.

- If there's no players in the scoreboard, you can't reset the score obviously.

- If you have entered the name incorrectly, you will run into an error.