var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

const personsData = [
  { id: 1, name: "Luke" },
  { id: 2, name: "Amy" },
];

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        person(id: Int!):User
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
        rollDice(numDice:Int!, numSides: Int): [Int]
        image(id: Int!): Image
        images(category: String): [Image]
        getDie(numSides: Int): RandomDie

    }
    type User {
        id: Int
        name: String
    }
    type quoteOfTheDay {
        quote: String
    }

    type random {
        number: Float
    }

    type rollThreeDice {
        listOfNumber: [Int]
    }

    type Image {
        id: Int
        title: String
        category: String
        url: String
    }

    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }
`);

// Function

function quoteOfTheDay() {
  return Math.random() < 0.5 ? "Take it easy!" : "Have a great day!";
}

function random() {
  return Math.random();
}

function rollThreeDice() {
  return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
}

function rollDice({ numDice, numSides }) {
  const output = [];
  for (let i = 0; i < numDice; i++) {
    output.push(1 + Math.floor(Math.random() * (numSides || 6)));
  }
  return output;
}

function getPerson(arg) {
  for (const person of personsData) {
    if (person.id === arg.id) {
      return person;
    }
  }
}

// Get single Image using id
function getImage(args) {
  for (const image of imagesData) {
    if (image.id === args.id) {
      return image;
    }
  }
}

// Get images using category
function getImages(args) {
  if (args.category) {
    return imagesData.filter(
      (image) => image.category.toLowerCase() === args.category.toLowerCase()
    );
  } else {
    return imagesData;
  }
}

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }
  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }
  roll(numRolls) {
    let output = [];
    for (let i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

function getDie({ numSides }) {
  return new RandomDie(numSides || 6);
}

// Resolver: The root provides a resolver function for each API endpoint
const root = {
  random: random,
  quoteOfTheDay: quoteOfTheDay,
  rollThreeDice: rollThreeDice,
  person: getPerson,
  rollDice: rollDice,
  image: getImage,
  images: getImages,
  getDie: getDie,
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Running a GraphQL API server at http://localhost:4000/graphql");
});
