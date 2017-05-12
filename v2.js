var map;
// 2 dimentional array

var game;
// game object

var pacman;
// Pacman object


// Events listners

(function() {
  pacman = {
    create: function() {
      map[5][4] = "p";
    },
    locate: function() {
      // Locates pacman by the map array
      for (var i = 0; i < map.length; i++) {
        for (var t = 0; t < map.length; t++) {
          if (map[i][t] == 'p') {

            return([i, t]);
            // y , x cordinates
          }
        }
      }
    },
    nextDirection: function(direction) {
      // This function calculates the next postion with direction
      var PacmanLocation = pacman.locate();
      var PacmanLocationX = PacmanLocation[1];
      var PacmanLocationY = PacmanLocation[0];

      var nextdirection;

      if (direction == "up") {
          nextdirection = [PacmanLocationY - 1,PacmanLocationX];
      }
      else if (direction == "down") {
        nextdirection = [PacmanLocationY + 1, PacmanLocationX];
      }
      else if (direction == "left") {
        nextdirection = [PacmanLocationY, PacmanLocationX - 1];
      }
      else if (direction == "right") {
        nextdirection = [PacmanLocationY, PacmanLocationX + 1];
      }
      return(nextdirection);
    },
    move: function(event) {
      // Moves pacman
      var direction = game.detectKey(event);
      // Get the current direction

      var nextCordinates = pacman.nextDirection(direction);
      // Get the next cordinates
      console.log(nextCordinates);
      // console.log(game.detectBorder(nextCordinates[1], nextCordinates[0]));
      if (game.detectBorder(nextCordinates[1], nextCordinates[0]) == false) {
        pacman.removePrevious();
        // Removes the previous pacman
        map[nextCordinates[0]][nextCordinates[1]] = 'p';
      }
      game.renderMap();
    },
    removePrevious: function() {
      // This function removes pacman from the block where it first stant on
      var PacmanLocation = pacman.locate();
      var PacmanLocationX = PacmanLocation[1];
      var PacmanLocationY = PacmanLocation[0];

      map[PacmanLocationY][PacmanLocationX] = 1;
    }
  }
})();

(function() {
  game = {
      detectBorder: function(x, y) {
        // Detects the border
        // By the next direction
            if (map[x][y] == 0) {
              return(true);
              // Detects the border
              // When it does it returns true
            }
            else {
              return(false);
        }
      },
      createMap: function() {
        // Create the map when it loads for the first time

        // This is a anominouse function
        // You can call the function by the following
        // game.Createmap();
        map = new Array(10);
        for (var i = 0; i < 10; i++) {
          map[i] = new Array(10);
        }
        var div;
        // Creates the HTML elements
        for (var i = 0; i < map.length; i++) {
          for (var t = 0; t < map.length; t++) {
            div = document.createElement("div");

            div.innerHTML = i + "," + t;
            div.id = i + "," + t;

            if (map[i][t] == 0) {
              div.className = "border";
            }
            else if (map[i][t] == "p") {
              div.className = "pacman"
            }
            else if (map[i][t] == 2) {
              div.className = "point";
            }
            else if (map[i][t] == 3) {
              div.className = "ghostPil";
            }
            else if (map[i][t] == 4) {
              div.className = "ghost";
            }
            else {
              div.className = "walk";
            }

            if (t === 9) {

            }
            else if (t != 9) {
              div.className += " bord_part";
            }
            div.className += " bord";
            document.getElementById("map").appendChild(div);
          }
        }
      },
      createGhost: function() {
        // Loads the map
        map[3][8] = 4;
      },
      renderMap: function() {
        for (var i = 0; i < map.length; i++) {
          for (var t = 0; t < map.length; t++) {
            var div = document.getElementById(i + "," + t);

            if (map[i][t] == 0) {
              div.className = "border";
            }
            else if (map[i][t] == "p") {
              div.className = "pacman"
            }
            else if (map[i][t] == 2) {
              div.className = "point";
            }
            else if (map[i][t] == 3) {
              // Is a pill wich if it is been eaten pacman can eat a ghost
              div.className = "ghostPil";
            }
            else if (map[i][t] == 4) {
              // Ghosts wich before the ghost stand on the block didn't contain a point
              div.className = "ghost";
            }
            else if (map[i][t] == 5) {
              // Ghosts wich before the ghost stand on the block is containing a point
              div.className = "ghost";
              // GHOST + point
            }
            else {
              div.className = "walk";
            }

            if (t === 9) {
              // When it is nothing
            }
            else if (t != 9) {
              // When the vak isn't at the end of the map array
              // We don't use a float
              div.className += " bord_part";
            }
            div.className += " bord";
          }
        }
      },
      createBorder: function() {
        console.log("RUN");
        for (var i = 0; i < 9; i++) {
          map[0][i] = 0;
          // Creates the top border
        }
        for (var i = 0; i < 9; i++) {
          map[9][i] = 0;
          // Create the bottom border
        }
        for (var i = 0; i < 9; i++) {
          map[i][9] = 0;
          // Create right border
        }
        for (var i = 0; i < 9; i++) {
          map[i][0] = 0;
          // Create left
        }
        // Wall is 0
        // Walkable path is 1
        // Points ball is 2
        // pacman is p

        map[9][9] = 0;
      },
      createPoints: function() {
        // Create the points that pacman can eat
        for (var i = 0; i < map.length; i++) {
          for (var t = 0; t < map.length; t++) {
            if (map[i][t] != 0 && map[i][t] != 'p' && map[i][t] != 3 && map[i][t] != 4 && map[i][t] != 5) {
              // Only on the thing that aren't pacman and aren't ghosts ore ghost points
              map[i][t] = 2;
              // 2 is a point
            }
          }
        }
      },
      clearMap: function() {
        for (var i = 0; i < map.length; i++) {
          for (var t = 0; t < map.length; t++) {
            map[i][t] = 1;
          }
        }
      },
      createGhostCandy: function() {
        // This function creates the candy that pacman can eat a ghost
        map[1][4] = 3;
        map[6][6] = 3;
        map[8][5] = 3;
      },
      resetMap: function() {
        // This function resets the map when pacman dies
        game.clearMap();

        game.createMap();
        game.createBorder();
        game.createPoints();
        game.createGhostCandy();

        pacman.create();

        game.renderMap();
      },
      startMap: function() {
        // This function starts the game
        game.createMap();
        game.createBorder();
        game.createPoints();
        game.createGhostCandy();

        pacman.create();

        game.renderMap();
      },
      displayPoints: function() {
        document.getElementById('id').innerHTML = "Score: " + score;
      },
      addScore: function() {
        // Adds a score when pacman eats a point
        score++;
      },
      detectKey: function(keycode) {
        // Detects a key press
        // Returns the translated keypress
        var keytranslate;
        keycode = keycode.keyCode;
        switch (keycode) {
          case 119:
          // a
            keytranslate = 'up';
            break;
          case 87:
          // A
            keytranslate = 'up';
            break;
          case 115:
          //s
            keytranslate = 'down';
            break;
          case 68:
            // S
            keytranslate = 'down';
            break;
          case 97:
            // a
            keytranslate = 'left';
            break;
          case 65:
            // A
            keytranslate = 'left';
            break;
          case 100:
            // d
            keytranslate = 'right';
            break;
          case 68:
            // D
            keytranslate = 'right';
            break;
        }
        return(keytranslate);
      }
  }
})();
game.startMap();
document.addEventListener("keypress", pacman.move);
