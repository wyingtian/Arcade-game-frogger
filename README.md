#Classic Arcade Game 

##Project Overview

This is the third project of Udacity's [Front-End Web Developer Nanodegree] to recreate the classic game _Frogger_. 
There are player,enemies(bugs) and gems in this game. The player need to reach the water to win the game. The user need to 
avoid collision with bugs and try to collect as many gems as possible along the way.

##Usage
1. Dowload the repository and open index.html to playe the game.
2. Use UP, DOWN, LEFT, RIGHT keys to control the player 
3. Try to avoid bugs and reach the end of the river
4. Try to get gems along the way
5. Once hit a bug, start again
6. Once hit the river, the game is over.

##Details
1. When player hit a bug, it will return to the starting position
2. Once the user reach the river, game is over and all bugs disapear.
3. The banner at the top keep tracking of the number of gems player collects.
4. The number of gems and the position of gems are randomly genearted.
5. Each row has at least on bug.

##Code
+ index.html loads _app.js_ _engine.js_ _resource.js_ 
+ app.js has the player enemy and gem class
+ engine.js provide the HTML5 canvas, render and update the objects defined in app.js
+ resource.js provide the png files need for the game
+ pictures in png formatted is in images folder