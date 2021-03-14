//Utileties

//local storage
myStorage = window.localStorage;

//name id & capsule for all users
const peopleAPI = `https://appleseed-wa.herokuapp.com/api/users/`;
//hobbis adress age gender
const peopleAPIPerUser = `https://appleseed-wa.herokuapp.com/api/users/`;

let peopleData = null;

//weather Endpoint(+ city, units, key)
const weatherUnits = `&&units=metric`;
const weatherKey = `&appid=f1fa2d893e423baf557dbf79444e638a`;
const weatherAPI = `http://api.openweathermap.org/data/2.5/weather?q=`;

let defaultColumnName = "firstName", defaultSearchExpression = "";

//an array for weather data, with key: city name, value: temp
let weather = {
   "tel aviv" : 25.6,
   "pardes-hanna-carkur":10.4,
   "heifa": 22.1,
   "bat yam": 15.2,
   "modiin": 24.0,
   "elkana": -5.2,
   "nahariya": 22.0,
   "zichron Yaakov": 2.2,
   "jerusalem": 0.2,
   "ashkelon":25.3,
   "ashdod": 30.0,
   "ramla":21.5
};

//this is a class object of PersonList
let myTable = null;

//classes
class Person {
    constructor(_id,_firstName,_lastName,_capsule,_age,_city,_gender,_hobby) {
        this.id = _id,
        this.firstName = _firstName,
        this.lastName = _lastName,
        this.capsule = _capsule,
        this.age = _age,
        this.city = _city,
        this.gender = _gender,
        this.hobby = _hobby
    }

}

//Every time the user search, I build a new table.
//the new table is initiated from the people array proprerty, 
//therefore every time the user searches I create a new PersonList object.

//if nothing is enterd, the "displayAll" flag = true, so the array people will contain all 
//of the people from the peopleData global arr.
//else, I push into people arr only if the search expression is matching a person.
class PersonList {
    constructor (_columnName="", _searchExpression="") {
        this.columnName = _columnName;
        this.searchExpression = _searchExpression;
        if (_searchExpression === "") this.displayAll = true;
        else this.displayAll = false;
        this.lastSortedBY = "";
        this.makeList(peopleData); 
    }

    makeList(_peopleData) {    

        this.people = [];
        for (let i=0; i<_peopleData.length; i++) {
            if (!this.displayAll) {
                let p = _peopleData[i];

                if (String(p[this.columnName]).toLowerCase().startsWith(this.searchExpression.toLowerCase())) { 
                    this.people.push(_peopleData[i]); 
                }    
            }  
            else this.people.push(_peopleData[i]);            }

    }
    
    makeHTMLTable() {
        
        //clear the table in case there is one
        clearTable();

        const table = document.querySelector('#table');
           //for each person:
        //1. create a new row with the person id as element id
        //2. append the row to table
        //3. create cells with person properties and append to the row
        //4. create cells with buttons and event listeners.
        for(let i = 0; i<this.people.length; i++){
            const person = this.people[i];

            const row = document.createElement('tr');
            row.id = person.id;
        
            table.appendChild(row);  

            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            const cell3 = document.createElement('td');
            const cell4 = document.createElement('td');
            const cell5 = document.createElement('td');
            const cell6 = document.createElement('td');
            const cell7 = document.createElement('td');
            const cell8 = document.createElement('td');
            const cell9 = document.createElement('td');
            const cell10 = document.createElement('td');

            cell1.classList.add('id');
            cell2.classList.add('first-name');
            cell3.classList.add('last-name');
            cell4.classList.add('capsule');
            cell5.classList.add('age');
            cell6.classList.add('city');
            cell7.classList.add('gender');
            cell8.classList.add('hobby');
            cell9.classList.add('edit-cell');
            cell10.classList.add('delete-cell');
        
            cell1.innerHTML = `${person.id}`;
            cell2.innerHTML = `${person.firstName}`;
            cell3.innerHTML = `${person.lastName}`;
            cell4.innerHTML = `${person.capsule}`;
            cell5.innerHTML = `${person.age}`;
            cell6.innerHTML = `${person.city}`;
            cell7.innerHTML = `${person.gender}`;
            cell8.innerHTML = `${person.hobby}`;
            cell9.innerHTML = `<button class="edit">Edit</button>`;
            cell10.innerHTML = `<button class="delete">Delete</button>`;
            
            //add event listener for city
            cell6.addEventListener('mouseover', showWeather);
            //cell6.addEventListener('mouseout', exitWeather);

            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3);
            row.appendChild(cell4);
            row.appendChild(cell5);
            row.appendChild(cell6);
            row.appendChild(cell7);
            row.appendChild(cell8);
            row.appendChild(cell9);
            row.appendChild(cell10);
        }

        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', deleteEvent);
        })
        
        const editButtons = document.querySelectorAll('.edit');
        editButtons.forEach(editBtn => {
            editBtn.addEventListener('click', editEvent);
        })  
  
    }

    getPersonByID(_id) {
 
       for (let i = 0; i< this.people.length; i++) {
            if(this.people[i].id == _id) return this.people[i];
       }
       return null;
    }

    getPersonIndex(_id) {
        for (let i = 0; i< this.people.length; i++) {
            if(this.people[i].id === _id) return i;
       }
       return null;  
    }

    updatePerson(_newPerson) {
       // replaces the object corresponding to _pewPerson.id with _newPerson
       const id = _newPerson.id;
       const index = this.getPersonIndex(id);

       this.people[index] = _newPerson;
    }

    deletePerson(_id) {
        const index = this.getPersonIndex(_id);
        this.people.splice(index, 1); 
    }

    sortBy(_column) {
        
        function compare(p1,p2) {
            let val1 = p1[_column];
            let val2 = p2[_column];

            if (!isNaN(val1) && !isNaN(val2)) {
                return (Number(val1) - Number(val2));
            }
            else {
                val1 = String(val1).toLowerCase();
                val2 = String(val2).toLowerCase();
                if (val1 > val2) return 1;
                else if (val1 < val2) return -1;
            }
            return 0;
        }

        if (this.lastSortedBY === _column) this.people.reverse(); 
        else {
            this.people.sort(compare);
            this.lastSortedBY = _column;
        }
    }
}

async function saveGlobalData() {
    myStorage.setItem('peopleData', JSON.stringify(peopleData));    
    myStorage.setItem('weather',JSON.stringify(weather));
    myStorage.setItem('defaultColumnName',defaultColumnName);
    myStorage.setItem('defaultSearchExpression',defaultSearchExpression);
}

async function loadGlobalData() {
    peopleData = JSON.parse(myStorage.getItem('peopleData'));    
    weather = JSON.parse(myStorage.getItem('weather'));
    defaultColumnName = myStorage.getItem('defaultColumnName');
    defaultSearchExpression = myStorage.getItem('defaultSearchExpression');
}

// Runs at start. fetch data from people APIs and push into peopleData as objects.
async function getPeopleData() {
    try{
        const peopleInfo = [];
        const response = await fetch(peopleAPI);
        const peoplePrimaryData = await response.json();
        //console.log("people's primery data:");
        //console.log(peoplePrimaryData);

        const idsArr = [];
        peoplePrimaryData.forEach(user => {
            idsArr.push(user.id);
        });

        const peopleSecondaryData = [];
        for(i = 0; i<idsArr.length; i++) {
            userID = idsArr[i];
            const response3 = await fetch(peopleAPIPerUser+userID);
            const personData = await response3.json();
            peopleSecondaryData.push(personData);
        }

        for(i = 0; i<idsArr.length; i++) {
            //person properties: 
   
            let person1 = new Person(idsArr[i], peoplePrimaryData[i].firstName, peoplePrimaryData[i].lastName,
                peoplePrimaryData[i].capsule, peopleSecondaryData[i].age, peopleSecondaryData[i].city,
                peopleSecondaryData[i].gender, peopleSecondaryData[i].hobby);

             peopleInfo.push(person1);

        }
        ////////////////////////////////////////////////////////////////////
        //create local storage item fron global data
        saveGlobalData();

        return peopleInfo;
    }
    catch(err) {
        console.log("Woops! something went wrong.");
        console.log(err);
    }
}

/*
//runs on all the cities in israel and create an object of {city: temp}
async function createWeatherObj() {
    
//Function to get all city names from goverment api.
//currently isn't used, needs a debug   
async function getCitiesList() {
    console.log("working");
    const PROXY = `https://api.codetabs.com/v1/proxy/?quest=`;
    const citiesAPI = `https://data.gov.il/api/3/action/datastore_search?resource_id=eb548bfa-a7ba-45c4-be7d-2e8271f55f70&limit=400`;
    const response = await fetch(PROXY+citiesAPI);
    const citiesData = await response;
    console.log(citiesData);
}  
   
    const city = this.city;
    const citiesArr = [];

    console.log("peopleData:");
    console.log(peopleData);

    for(i = 0; i < peopleData.length; i++) {
        citiesArr.push(peopleData[i].city);
        console.log("cities arr:")
        console.log(citiesArr);
    }
    // const response = await weatherArray;
    // const weatherData = await responseesponse.json();
    //remember to build weatherData to fit this
    // for(let i = 0; i<weatherData.length; i++) {
    //     if (weatherData[i].city == city) return weatherData[i].temp;
    // }
}
// Runs at start (or every hour?). fetch data from the weather API 
// and push into weatherData.
async function fillWeatherArr () {
    const citiesArr = [];
    //console.log(await peopleData);
    for(i = 0; i < peopleData.length; i++) {
        citiesArr.push(peopleData[i].city);
        console.log("hey");
    }
    //console.log(citiesArr);
    
}
fillWeatherArr();
*/


// in the initTable
async function initTable(reload=false) {

    peopleData = JSON.parse(myStorage.getItem('peopleData'));

    if (peopleData && reload==false) {
        //if local storage is present, recover data from local storage
        weather = JSON.parse(myStorage.getItem('weather'));
        defaultColumnName = myStorage.getItem('defaultColumnName');
        defaultSearchExpression = myStorage.getItem('defaultSearchExpression');
    }
    else {
        // if there is no local storage, get everything from API and use defaults
        peopleData =  await getPeopleData();
    }

    let columnList = document.querySelector(".search-selection").children;
    for (let i=0; i<columnList.length; i++) {
        if (columnList[i].value === defaultColumnName) {
            columnList[i].selected = "selected";
            break;
        }
    }

    let filterField = document.querySelector(".search-input");
    filterField.value = defaultSearchExpression;
            
    myTable = new PersonList(defaultColumnName,defaultSearchExpression); 
    myTable.makeHTMLTable();
}

initTable();

// if (weather[city]) return weather[city]; else return 'N/A';

async function deleteEvent(event) {
    const row = event.target.parentElement.parentElement;
    const id = row.id;

    myTable.deletePerson(id);
    table.removeChild(row);

    //console.log("deleted row id:");
   // console.log(row.id);
}

async function editEvent(event) {

    //console.log(peopleData);

    const row = event.target.parentElement.parentElement;
    const id = row.id;

    const firstName = row.querySelector('.first-name');
    const lastName = row.querySelector('.last-name');
    const capsule = row.querySelector('.capsule');
    const age = row.querySelector('.age');
    const city = row.querySelector('.city');
    const gender = row.querySelector('.gender');
    const hobby = row.querySelector('.hobby');
    const editBtn = row.querySelector('.edit');
    const deleteBtn = row.querySelector('.delete');

    //console.log(firstName,lastName,capsule,age,city,gender,hobby,editBtn,deleteBtn);

    //remove event listeners from "edit", "delete"
    editBtn.removeEventListener('click', editEvent);
    deleteBtn.removeEventListener('click', deleteEvent);

    //change the buttons innerHTML to "set", "cancel"
    editBtn.innerHTML = `Set`;
    deleteBtn.innerHTML = `Cancel`;

    //remove the classes "edit", "delete"
    editBtn.classList.remove('edit');
    deleteBtn.classList.remove('delete');

    //set new classes "set", "cancel"
    editBtn.classList.add('set');
    deleteBtn.classList.add('cancel');
    //console.log(deleteBtn.classList, editBtn.classList);

    //add eventListeners "setEvent" "cancelEvent"
    editBtn.addEventListener('click', setEvent);
    deleteBtn.addEventListener('click', cancelEvent);

    //open input fileds on top of cells 
    const firstNameInput = document.createElement('input');
    firstNameInput.classList.add('first-name-input');
    firstNameInput.value = firstName.innerHTML;
    firstName.innerHTML = "";
    firstName.appendChild(firstNameInput);
    
    const lastNameInput = document.createElement('input');
    lastNameInput.classList.add('last-name-input');
    lastNameInput.value = lastName.innerHTML;
    lastName.innerHTML = "";
    lastName.appendChild(lastNameInput);

    const capsuleInput = document.createElement('input');
    capsuleInput.classList.add('capsule-input');
    capsuleInput.value = capsule.innerHTML;
    capsule.innerHTML = "";
    capsule.appendChild(capsuleInput);

    const ageInput = document.createElement('input');
    ageInput.classList.add('age-input');
    ageInput.value = age.innerHTML;
    age.innerHTML = "";
    age.appendChild(ageInput);

    const cityInput = document.createElement('input');
    cityInput.classList.add('city-input');
    cityInput.value = city.innerHTML;
    city.innerHTML = "";
    city.appendChild(cityInput);

    const genderInput = document.createElement('input');
    genderInput.classList.add('gender-input');
    genderInput.value = gender.innerHTML;
    gender.innerHTML = "";
    gender.appendChild(genderInput);

    const hobbyInput = document.createElement('input');
    hobbyInput.classList.add('hobby-input');
    hobbyInput.value = hobby.innerHTML;
    hobby.innerHTML = "";
    hobby.appendChild(hobbyInput);
}

async function cancelEvent(event) {
    const row = event.target.parentElement.parentElement;
    const id = row.id;

    const firstName = row.querySelector('.first-name');
    const lastName = row.querySelector('.last-name');
    const capsule = row.querySelector('.capsule');
    const age = row.querySelector('.age');
    const city = row.querySelector('.city');
    const gender = row.querySelector('.gender');
    const hobby = row.querySelector('.hobby');
    const setBtn = row.querySelector('.set');
    const cancelBtn = row.querySelector('.cancel');

    const firstNameInput = row.querySelector('.first-name-input');
    const lastNameInput = row.querySelector('.last-name-input');
    const capsuleInput = row.querySelector('.capsule-input');
    const ageInput = row.querySelector('.age-input');
    const cityInput = row.querySelector('.city-input');
    const genderInput = row.querySelector('.gender-input');
    const hobbyInput = row.querySelector('.hobby-input');
    
    //remove event listeners from "set", "cancel"
    setBtn.removeEventListener('click', setEvent);
    cancelBtn.removeEventListener('click', cancelEvent);

    //reset the button innerHTML
    setBtn.innerHTML = `Edit`;
    cancelBtn.innerHTML = `Delete`;

    //reset classes
    setBtn.classList.remove('set');
    cancelBtn.classList.remove('cancel');

    setBtn.classList.add('edit');
    cancelBtn.classList.add('delete');
    //console.log(cancelBtn.classList, setBtn.classList);

    //add eventListeners "editEvent" "deleteEvent"
    setBtn.addEventListener('click', editEvent);
    cancelBtn.addEventListener('click', deleteEvent);

    //reset innerHTML from person object
    const person = myTable.getPersonByID(id);

    firstName.innerHTML = person.firstName; 
    lastName.innerHTML = person.lastName;
    capsule.innerHTML = person.capsule;
    age.innerHTML = person.age;
    city.innerHTML = person.city;
    gender.innerHTML = person.gender;
    hobby.innerHTML = person.hobby;

    //remove input fileds
    firstName.removeChild(firstNameInput);
    lastName.removeChild(lastNameInput);
    capsule.removeChild(capsuleInput);
    age.removeChild(ageInput);
    city.removeChild(cityInput);
    gender.removeChild(genderInput);
    hobby.removeChild(hobbyInput);
}

async function setEvent(event) {

    const row = event.target.parentElement.parentElement;
    const id = Number(row.id);

    const firstName = row.querySelector('.first-name');
    const lastName = row.querySelector('.last-name');
    const capsule = row.querySelector('.capsule');
    const age = row.querySelector('.age');
    const city = row.querySelector('.city');
    const gender = row.querySelector('.gender');
    const hobby = row.querySelector('.hobby');
    const setBtn = row.querySelector('.set');
    const cancelBtn = row.querySelector('.cancel');

    const firstNameInput = row.querySelector('.first-name-input');
    const lastNameInput = row.querySelector('.last-name-input');
    const capsuleInput = row.querySelector('.capsule-input');
    const ageInput = row.querySelector('.age-input');
    const cityInput = row.querySelector('.city-input');
    const genderInput = row.querySelector('.gender-input');
    const hobbyInput = row.querySelector('.hobby-input');
    
    //memory

    //setting a new person with the same id, and properties from the input
    //fileds
    let newPerson = new Person(id, firstNameInput.value, lastNameInput.value,
        capsuleInput.value, ageInput.value, cityInput.value, genderInput.value,
        hobbyInput.value);

    //update displayed PersonList with the new person
    myTable.updatePerson(newPerson)
    console.log(myTable);

    //update global peopleData with the new person
    //necessary to save it in local storage 
    for (let i=0; i<peopleData.length; i++) {
        if (peopleData[i].id === newPerson.id) {
            peopleData[i] = newPerson;
            break;
        }
    }
    saveGlobalData();
    
    //set the innerHTML of all td in a row to the input value
    //of the input fileds
    firstName.innerHTML = firstNameInput.value;
    lastName.innerHTML = lastNameInput.value;
    capsule.innerHTML = capsuleInput.value;
    age.innerHTML = ageInput.value;
    city.innerHTML = cityInput.value;
    gender.innerHTML = genderInput.value;
    hobby.innerHTML = hobbyInput.value;

    //reseting buttons
    //remove event listeners from "set", "cancel"
      setBtn.removeEventListener('click', setEvent);
      cancelBtn.removeEventListener('click', cancelEvent);
  
      //reset the button innerHTML
      setBtn.innerHTML = `Edit`;
      cancelBtn.innerHTML = `Delete`;
  
      //reset classes
      setBtn.classList.remove('set');
      cancelBtn.classList.remove('cancel');
  
      setBtn.classList.add('edit');
      cancelBtn.classList.add('delete');
  
      //add eventListeners "editEvent" "deleteEvent"
      setBtn.addEventListener('click', editEvent);
      cancelBtn.addEventListener('click', deleteEvent);
}

//column headers - sort event handlers
const tableHeadings = document.querySelector("#table-headings");
const columnNames = tableHeadings.children;

for (let i=0; i<columnNames.length && i<8; i++) {
    columnNames[i].addEventListener('click',sortColumnEvent);
}

async function sortColumnEvent(event) {
    myTable.sortBy(event.target.id);
    myTable.makeHTMLTable();
    console.log(event.target.id);
}

//reload data button
const reloadDataButton = document.querySelector(".reload");
reloadDataButton.addEventListener('click',reloadDataEvent);

async function reloadDataEvent(event) {
    initTable(true);
}

//searching & event
const searchBar = document.querySelector(".search-input");
const searchSelection = document.querySelector(".search-selection");

searchBar.addEventListener('keyup', setResultTable);

const dropList = document.querySelector(".search-selection");
dropList.addEventListener('change', setResultTable);

async function clearTable() {
    //first delete table, delete all content except headings
    const tableDeletes = document.querySelectorAll('tr');
    const table = document.querySelector('#table');
    for(i = 1; i<tableDeletes.length; i++){
        table.removeChild(tableDeletes[i]);
    }
}

async function setResultTable(event) {

    //create new personList with the search terms filters
    const columnName = searchSelection.value;
    const searchExpression = searchBar.value;
    const mySearchedTable = new PersonList(columnName, searchExpression);

    //create new table with filtered results
    mySearchedTable.makeHTMLTable();

    myStorage.setItem('defaultColumnName',columnName);
    myStorage.setItem('defaultSearchExpression',searchExpression);
}

async function showWeather(event) {

    let city = String(event.target.innerHTML.toLowerCase());

    if (weather[city])
        event.target.setAttribute('data-value', weather[city]);
    else    
        event.target.setAttribute('data-value', "N/A");
}



//module.exports = {Person}