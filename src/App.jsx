import React from 'react';
import { useState, useEffect } from 'react';

let database = [];
const response = await fetch("https://www.nj-web.com/pubDB/CompetitiveHistory.json");
const json = await response.json();
database = json;

let currentYearData = [];

//need to fix display of table data
function ParseYear(year) {
  database.forEach((yearData) => {
    if (year in yearData) {
      let currentYear = yearData[year];
      let currentYearData = Object.values(currentYear);
      currentYearData = currentYearData.map((event) => {
        return (
          <tr>
            <td>{event.event}</td>
            <td>{event.placement}</td>
            <td>{event.competitors}</td>
            <td>{event.conference}</td>
            <td>{year}</td>
          </tr>
        );
      });
    }
  });

}

//works for getting years dynamically
function getYears() {
  let years = [];

  for (let i = 0; i < database.length; i++) {
    years.push(Object.keys(database[i]));
  }
  
  let yearsList = years.map((year) => year[0]);

  return yearsList;

}

// works
const YearSelect = () => {
  let yearsList = getYears();

  const [year, setYear] = useState('');
  const onChange = (event) => {
    const year = event.target.value;
    setYear(event.target.value);
    ParseYear(year);
  }
  return (
      <select onChange={onChange}>
      {yearsList.map((year) => <option id={year} value={year}>{year}</option>)}
    </select>
  );
}; 


//renders the table
function App() {
 
  // console.log(yearsList); : list of all years


  return (
    <div>
      <h1>Competitive History</h1>
      <YearSelect />
      <table>
        <thead>
          <tr>
            <th>Event</th>
            <th>Placement</th>
            <th>Competitors</th>
            <th>Conference</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>hi</td>
            <td>hello</td>
            <td>how are you</td>
            <td>What a surprise</td>
            <td>What a surprise</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}


export default App;

