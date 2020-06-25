import React from 'react';
import $ from 'jquery';
import Calendar from './Calendar.jsx';
import Guests from './Guests.jsx';
import PriceBreakDown from './PriceBreakDown.jsx';
import styles from '../../dist/style.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      info: {id: 2,
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
            },
      nights: null,
      reserve: false
    }

    this.calendarElement = React.createRef();
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

  handleClick(event) {
    event.preventDefault();
    this.calendarElement.current.showCalendar();
  }

  buttonReserve() {
    this.setState({
      reserve: true
    })
  }

  updateNights(nights) {
    this.setState({
      nights: nights
    })
  }

  render() {

    let button;
    let price;

    if (!this.state.reserve) {
      button = <div className={styles.pinkButton} onClick={this.handleClick.bind(this)}>Check availability</div>
    } else if (this.state.reserve) {
      button = <div className={styles.pinkButton}>Reserve</div>
    }

    if (this.state.nights) {
      price = <PriceBreakDown info={this.state.info} nights={this.state.nights} />
    } else {
      price;
    }
    // onClick={()=>{this.reserve(this.state.info)}}

    return (<div className={styles.calendarForm}>
      <span> <span className={styles.nightlyFee}>${this.state.info.nightly_fee}</span> / night</span>
      <span className={styles.reviewsRating}> <span className={styles.star}>&#9733;</span> {Math.round(this.state.info.avg_rating * 100)/100} ({this.state.info.reviews})</span>
      <form onSubmit={this.reserve.bind(this)}>
        <div className={styles.checkinGuestsContainer}>
      <Calendar updateNights={this.updateNights.bind(this)} buttonReserve={this.buttonReserve.bind(this)} ref={this.calendarElement}/>
      <Guests max={this.state.info.max_capacity} />
      </div>
      {button}
      </form>
      {price}
    </div>
    )}
}

export default App;
