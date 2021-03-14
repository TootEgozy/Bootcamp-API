
const {Person} = require('./script.js');

test('person properties & methods', ()=> {
    //new person
    const person1 = new Person(0,"toot","egozy",5, 26, "Eilat", "f", "Drinking");
    expect(person1).toEqual({id: 0, firstName: "toot", lastName:"egozy", capsule:5, age:26, city:"Eilat", gender:"f", hobby:"Drinking"});

    //ger weather from arr by city name
    const weather = [{city:"Tel-aviv", temp: 26.5},{city: "Raanana", temp: 20},{city: "Eilat", temp: 50},{city: "Ashkelon", temp: 25.3}];
    expect(person1.getWeather(weather)).toEqual("Eilat");
});