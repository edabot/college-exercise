import React, { Component } from 'react';

import ReactTable from "react-table";
import schoolData from '../data/schoolInfo'
import "react-table/react-table.css";

  function displayUrl(url) {
    let thisUrl = url
    if ( !url.startsWith('http') ) {
      thisUrl = 'http://' + thisUrl
    }
    return(
      <a href={thisUrl} className='school-url'>
        {url}
      </a>
    )
  }

  function addSelections(data) {
    let result = []
    data.forEach( datum => {
      let newDatum = Object.assign({}, datum)
      newDatum.selected = false
      result.push(newDatum)
    })
    return result
  }

class SchoolTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: addSelections(this.props.schools)
    };
  }

  schoolDetail(school) {
    return (
      <div className="school">
        {this.displayHighestDegree(school.HIGHDEG)}
        {this.displayLocale(school.LOCALE)}
        {this.displayCarnegieClassification(school.CCSIZSET)}
        {this.displayAdmRate(school.ADM_RATE)}
        {this.displaySatAvg(school.SAT_AVG)}
        <div className='school-programs'>
        Programs:
          {this.displayPrograms(school.PROGRAMS)}
        </div>
      </div>
    )
  }
  displaySatAvg(avg) {
    if (avg !== 'NULL') {
      return (
        <div className='school-sat-avg'>
          {`SAT average: ${avg}`}
        </div>
      )
    }
  }

  displayAdmRate(admRate) {
    if (admRate !== 'NULL') {
      return (
        <div className='school-adm-rate'>
          {`Admission rate: ${admRate}`}
        </div>
      )
    }
  }

  displayCarnegieClassification(code) {
      return schoolData.CCSIZSET[code]
  }

  displayLocale(code) {
      return schoolData.LOCALE[code]
  }

  displayHighestDegree(code) {
    return schoolData.HIGHDEG[code]
  }

  displayPrograms(programs) {
    if (programs.length > 0) {
      return (
        <ul>
          {programs.map( program => <li key={program}>{this.props.programs[program]}</li>)}
        </ul>
      )
    } else {
      return (
        <div>
          No program information is available
        </div>
      )
    }
  }

  onClick(e) {
    let idx = this.state.data.findIndex( item => item.INSTNM === e.target.id)
    let newObject = Object.assign({}, this.state.data[idx]),
    newData = this.state.data.slice()
    newObject.selected = !this.state.data[idx].selected
    newData[idx] = newObject
    this.setState({data: newData})
  }

  render() {
    const data = this.state.data
    return (
      <div className="school-table">
        <ReactTable data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]).toLowerCase().includes(filter.value.toLowerCase())}
          columns={[
            {
              Header: 'School Name',
              accessor: 'INSTNM'
            },
            {
              Header: 'City',
              accessor: 'CITY'
            },
            {
              Header: 'website',
              accessor: 'INSTURL',
              Cell: row => (
                <span>
                  {displayUrl(row.value)}
                </span>
              )
            },
            {
              Header: 'selected',
              accessor: 'selected',
              Cell: row => (
                <div className='school-checkbox' onClick={this.onClick.bind(this)} id={row.original.INSTNM} value={row.value} >
                  {row.value ? '☑': `☐`}
                </div>
              ),
              Filter: ({ filter, onChange }) => <div></div>,
              sortMethod: (a, b) => {
                 if (a === b) {
                   return 1;
                 }
                 return a ? -1 : 1;
               }
            },
          ]}

          defaultPageSize={10}
          className="-striped -highlight"
          SubComponent={row => {
                    return (
                      <div style={{ padding: "20px" }}>
                        {this.schoolDetail(row.original)}
                      </div>
                    );
                  }}
        />
      </div>
    );
  }

}

export default SchoolTable;
