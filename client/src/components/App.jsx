import React from 'react';
import $ from 'jquery'

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData(aptID) {
    $.ajax({
      url: `/api/${aptID}`,
      type: 'GET',
      success: (data) => {
        console.log('success GET, data is: ', data);
      },
      error: (err) => {
        console.log('ERROR RETRIEVING BLOGS');
      }
    })
  }


  render() {
    return <h1>Hello, world!!</h1>;
  }
}

export default Calendar;
