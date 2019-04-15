const express = require("express");
const parser = require("body-parser");
const graphqlhttp = require("express-graphql");
const {
    buildSchema
} = require('graphql');
const port = 5000;
const app = express();

app.use(parser.json());

const cours = [];

app.use('/graphql', graphqlhttp({
    schema: buildSchema(`

        type Cours {
            _id: ID!
            title:String!
            note:String!
            date: String
        }

        input CoursInput {
            title: String!
            note: String!
        }

        type RootQuery {
            cours:[Cours!]!
        }

        type RootMutation{
            createCours(coursinput: CoursInput): Cours

        }

        schema {
            query: RootQuery
            mutation:RootMutation
        }   
    `),
    rootValue: {
        cours: () => {
            return cours;
        },

        createCours: (args) => {
            const cour = {
                _id: Math.random().toString(),
                title: args.coursinput.title,
                note: args.coursinput.note,
                date: Date.now().toString()
            }
            cours.push(cour);
            return cour;
        }

    },

    graphiql: true

}));

app.listen(port, () => {
    console.log("listennng on :",
        port)
});

app.get("/", (res, req, next) => {
    console.log("First get")
})