import React, { Component } from 'react';
import schoolData from '../data/schoolInfo'

class SchoolDetail extends Component {

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
    const school = this.props.school
    return (
      <div className="school-detail">
        <div>
          {`Highest degree awarded: ${this.displayHighestDegree(school.HIGHDEG)}`}
        </div>
        <div>
          {`Location type: ${this.displayLocale(school.LOCALE)}`}
        </div>
        <div>
          {`Carnegie Classification (size): ${this.displayCarnegieClassification(school.CCSIZSET)}`}
        </div>
        {this.displayAdmRate(school.ADM_RATE)}
        {this.displaySatAvg(school.SAT_AVG)}
        <div className='school-programs'>
          Programs:
          {this.displayPrograms(school.PROGRAMS)}
        </div>
      </div>
    )
  }

}

export default SchoolDetail;
