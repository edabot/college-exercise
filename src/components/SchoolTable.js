import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";

class SchoolTable extends Component {

  render() {
    const data = this.props.schools
    return (
      <div>
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
              accessor: 'INSTURL'
            },
          ]}

          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }

}

export default SchoolTable;
