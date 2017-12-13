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

class SchoolTable extends Component {

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


  render() {
    const data = this.props.schools
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
