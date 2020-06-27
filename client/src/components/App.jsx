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
            occupancy_tax_rate: 0.09,
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
      checkIn: 'Add date',
      checkOut: 'Add date',
      adults: 1,
      children: 0,
      infants: 0
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

  updateCheckIn(date) {
    this.setState({
      checkIn: date
    })
  }

  updateCheckOut(date) {
    this.setState({
      checkOut: date
    })
  }

  clearDates() {
    this.setState({
      checkIn: 'Add date',
      checkOut: 'Add date'
    })
  }

  calculateNights() {
    const date1 = new Date(this.state.checkIn);
    const date2 = new Date(this.state.checkOut);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  updateGuests(type, operation) {
    let result;
    if (operation === 'plus') {
      result = this.state[type] + 1;
    } else {
      result = this.state[type] - 1;
    }
    this.setState({
      [type]: result
    })
  }

  render() {

    let button;
    let price;
    let reserve = this.state.checkIn !== 'Add date' && this.state.checkOut !== 'Add date';

    if (reserve) {
      button = <div className={styles.pinkButton}>Reserve</div>
      price = <PriceBreakDown info={this.state.info} calculateNights={this.calculateNights.bind(this)} />
    } else {
      button = <div className={styles.pinkButton} onClick={this.handleClick.bind(this)}>Check availability</div>
      price;
    }

    return (<div className={styles.calendarForm}>
      <div className='top-bar'>
      <span> <span className={styles.nightlyFee}>${this.state.info.nightly_fee}</span> / night</span>
      <span className={styles.reviewsRating}> <span className={styles.star}>&#9733;</span> {Math.round(this.state.info.avg_rating * 100)/100} ({this.state.info.reviews})</span>
      </div>
      <form onSubmit={this.reserve.bind(this)}>
        <div className={styles.checkinGuestsContainer}>

      <Calendar calculateNights={this.calculateNights.bind(this)} clearDates={this.clearDates.bind(this)} checkIn={this.state.checkIn} checkOut={this.state.checkOut} updateCheckIn={this.updateCheckIn.bind(this)} updateCheckOut={this.updateCheckOut.bind(this)} ref={this.calendarElement}/>

      <Guests updateGuests={this.updateGuests.bind(this)} adults={this.state.adults} children={this.state.children} infants={this.state.infants} max={this.state.info.max_capacity} />
      </div>
      {button}
      </form>
      {price}
    </div>
    )}
}

export default App;
