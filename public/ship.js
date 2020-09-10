console.log("SHIP CLASS IS MERGED");
//A simple console output to test if 'ship.js' was correctly implemented into 'index.html'

var shipContainer = new Array();
//Temporary 'container' that holds 'Ship' objects

class Ship { //New class 'Ship' that stores a variable 'length'
    constructor(length) { //Ship Object constructor that takes in variable 'length'
      this.length = length; //Given length of a ship object (1, 2, 3 ,4, and 5)
      this.counter = 0; //Counter variable that will be used to keep track of hits on a relative 'Ship' object
      this.isSunk = false;
    }

    getLength() { //Getter that returns the 'length' of the ship object
      return this.length;
    }

    getCounter() {  //Getter that returns the 'counter' variable when called
      return this.counter;
    }

    setCounter(x) { //Setter that modifys the 'counter' variabe when called
      this.counter = x;
    }

    sunk() { //'Ship' method that uses parameters 'length' and 'counter' to check if a sink has occured
      if(this.length == this.counter)
        return true;
      else
        return false;
    }


}
/*
*FOR LOOP
* Pre: None
* Params: i
* Post: 5 'Ship' objects are created of length 1,2,3,4 and 5
*/
for(let i = 0; i < 5; i++)
{
  shipContainer[i] = new Ship(i + 1);
  console.log("Ship " + (i+1) + " created");
}



