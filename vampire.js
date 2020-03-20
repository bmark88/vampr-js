class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let numberOfVampires = 0;
    let currentVampire = this;

    while(currentVampire.creator) {
      currentVampire = currentVampire.creator;
      numberOfVampires++;
    }

    return numberOfVampires;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (vampire.creator === null) {
      return vampire;
    }
    if (this.creator === null) {
      return this;
    }
    if (this === vampire) {
      if (this.isMoreSeniorThan(vampire)) {
        return this;
      } else {
        return vampire;
      }
    } if (this.isAncestorOf(vampire)) {
      return this;
    } else {
      return this.creator.closestCommonAncestor(vampire);
    }
  }
  
  isAncestorOf(vampire) {
    if (this === vampire) return true;
    let currentVampire = this;
    if (currentVampire.offspring.includes(vampire)) {
      return true;
    } else if (currentVampire.offspring.length === 0) {
      return false;
    } else {
      for (const child of currentVampire.offspring) {
        if (child.isAncestorOf(vampire)) {
          return true;  
        }
      }
      return false;
    }
  }
}

module.exports = Vampire;


const original = new Vampire('original');
const bart = new Vampire('bart'); 
const ansel = new Vampire('ansel');  
const elgort = new Vampire('elgort'); 
const sarah = new Vampire('sarah');  
const andrew = new Vampire('andrew'); 

original.addOffspring(bart);
original.addOffspring(ansel);
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);
elgort.addOffspring(andrew);

// console.log(andrew.closestCommonAncestor(sarah));