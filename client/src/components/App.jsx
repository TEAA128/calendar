import React from 'react';
import $ from 'jquery';
import Calendar from './Calendar.jsx';
import Guests from './Guests.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 2,
      nightly_fee: 244,
      cleaning_fee: 56,
      service_fee: 63,
      occupancy_tax_fees: 19,
      avg_rating: 0.8785097298603173,
      reviews: 372,
      city: "Travonmouth",
      max_capacity: 5,
      bookings: [
            {
              guests: {
                adults: 2,
                children: 1,
                infants: 0
              },
              checkin: "2020-08-08T02:54:27.836Z",
              checkout: "2020-08-12T18:15:39.123Z"
            }
        ],
    }
  }

  // componentDidMount() {
  //   this.getData();
  // }

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

  reserve(obj) {
    $.ajax({
      url: `/api/${aptID}`,
      type: 'PATCH',
      data: JSON.stringify(obj),
      success: (data) => {
        console.log('success PATCH, data is: ', data);
      },
      error: (err) => {
        console.log('ERROR PATCHING BLOGS');
      }
    })
  }


  render() {
    return (<div className="calendar-form">
      <span> <span className="nightly-fee">${this.state.nightly_fee}</span> / night</span>
      <span className="reviews"> {Math.round(this.state.avg_rating * 100)/100} ({this.state.reviews})</span>
      <form onSubmit={this.reserve.bind(this)}>
      <Calendar />
      {/* <Guests max={this.state.max_capacity} /> */}
      </form>
    </div>
    )}
}

export default App;
