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
      schools: [],
      programs: {}
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <SchoolTable schools={this.state.schools} programs={this.state.programs} />
      </div>
    );
  }
}

export default App;
