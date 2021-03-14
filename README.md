# Boothcamp API README

## Workflow

---

### frame

1. create an HTML base with a table, a search bar with buttons, input filed,
   change background button.
2. create a basic CSS file, that defines the table and the fonts
3. search for a nice loading gif
4.

---

### Logic

1. import the API's (weather, students) and save them as arrays of objects.
   this will happen once.
2. Local - store these arrays in the uses browser as key-"students" value-"the array",
   key-"weather" value-"array".
3. create three classes: "Person", "People", "weather".

   - Person should include the properties:
     - id (counter),
     - first name
     - last name
     - capsule
     - age
     - city
     - gender (m/f)
     - hobby
   - And the method:
   - getWeather();

- People should include the properties:
  - peopleArray = [];
  - weatherArray = [];
- And the methods:

  - get person by id
  - get person by index
  - get person by name
  - get all id's
  - get all firstnames
  - get all lastnames
  - get all ages
  - get all cities
  - get all hobbies
  - remove person
  - add person
  - edit person (in user side: opens all of the tabs for editing.
    basically creates new input fileds ontop of existing table cells.
    inputs are the previous text by default.
    when clicked "save", assign all input fileds into innerHTML & the person object).
  - sort by name
  - filter by name
  - sort by age
  - filter by age
  - sort by gender
  - filter by gender
  - sort by capsule
  - filter by capsule
  - sort by hobby
  - filter by hobby
  - get weather by city name

- Weather sould include the properties:
- city: city
- weather: weather by city name

5. the weather API should be erased and rebuilt in the local storage within every hour,
   for accuracy.
