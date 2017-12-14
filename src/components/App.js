import React, { Component } from 'react';
import SchoolTable from './SchoolTable';

function loadJSON(callback, url) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState === 4 && xobj.status === 200) {
      callback(xobj.responseText);
    }
  }
  xobj.send(null);
}

function cleanResponse(response) {
  let length = response.length
  if (response[length - 1] === '}') {
    return response
  }
  let lastStart = response.lastIndexOf(', {')
  console.log('response was incomplete')
  return response.substring(0, lastStart) + ']'
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schools: undefined,
      programs: undefined
    };

    this.loadPrograms = this.loadPrograms.bind(this)
    this.loadSchools = this.loadSchools.bind(this)
  }

  componentWillMount() {
    loadJSON(this.loadPrograms, './data/programs.json')
    loadJSON(this.loadSchools, './data/ma_schools.json')
  }

  loadPrograms(response) {
    this.setState({programs: JSON.parse(response)})
  }

  loadSchools(response) {
    let cleanedResponse = cleanResponse(response)
    this.setState({schools: JSON.parse(cleanedResponse)})
  }

  displaySchoolTable() {
    if ( this.state.schools && this.state.programs ) {
      return <SchoolTable schools={this.state.schools} programs={this.state.programs} />
    }
  }

  render() {
    return (
      <div className="App">
        {this.displaySchoolTable()}
      </div>
    );
  }
}

export default App;
