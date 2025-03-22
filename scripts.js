// The Secret Life of Objects

// Methos
// methods are nothing more than properties that hold function values

function speak(line){
    console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my fur and whiskers");
hungryRabbit.speak("Got any carrots?");
speak.call(whiteRabbit, "Hurry");




// Arrow functions are different—they do not bind their own this but can see the this binding of the scope around them

let finder = {
    find(array) {
        return array.some(v => v == this.value);
    }, 
    value:5
};
console.log(finder.find([4, 5]));

// Prototypes

// Plain old objects created with {} notation are linked to an object called Object.prototype.

let empty = {};
console.log(empty.toSpring);
console.log(empty.toSpring);

//When an object gets a request for a property that it doesn’t have, its prototype will be searched for the property. If that doesn’t have it, the prototype’s prototype is searched, and so on until an object without prototype is reached (Object.prototype is such an object)./

console.log(Object.getPrototypeOf({}) == Object.prototype);

console.log(Object.getPrototypeOf(Object.prototype));


// Functions derive from Function.prototype and arrays derive from Array.prototype.

console.log(Object.getPrototypeOf(Math.max) == Function.prototype);

console.log(Object.getPrototypeOf([]) == Array.prototype);



// You can use Object.create to create an object with a specific prototype.

let protoRabbit = { speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
}
};

let blackRabbit = Object.create(protoRabbit);
blackRabbit.type = "black";
blackRabbit.speak("I am fear and darkness");


class SecretiveObject {
  #getSecret() {
    return "I ate all the plums";
  }
  interrogate() {
    let shallISayIt = this.#getSecret();
    return "never";
  }
}

// Overriding derived properties

// Overriding is also used to give the standard function and array prototypes a different toString method than the basic object prototype.

console.log(Array.prototype.toString ==
            Object.prototype.toString);

console.log([1, 2].toString());

// Calling toString on an array gives a result similar to calling .join(",") on it—it puts commas between the values in the array. 
console.log(Object.prototype.toString.call([1, 2]));



// Symbols

/*Symbols are values created with the Symbol function. Unlike strings, newly created symbols are unique—you cannot create the same symbol twice.*/

let sym = Symbol("name");
console.log(sym == Symbol("name"));

/*Being both unique and usable as property names makes symbols suitable for defining interfaces that can peacefully live alongside other properties, no matter what their names are.*/

const length = Symbol("length");
Array.prototype[length] = 0;

console.log([1,2].length);

console.log([1,2][length]);

/*It is possible to include symbol properties in object expressions and classes by using square brackets around the property name. That causes the expression between the brackets to be evaluated to produce the property name, analogous to the square bracket property access notation.*/

let myTrip = {
    length : 2,
    0 : "Lankwitz",
    1 : "Babelsberg",
    [length]: 21500
};
console.log(myTrip[length], myTrip.length);


// The iterator interface

/*Note that the next, value, and done property names are plain strings, not symbols. Only Symbol.iterator, which is likely to be added to a lot of different objects, is an actual symbol.*/

let okIterator = "Ok"[Symbol.iterator]();
console.log(okIterator.next());
console.log(okIterator.next());
console.log(okIterator.next())