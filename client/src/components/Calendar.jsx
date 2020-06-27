import React from 'react';
import moment from 'moment';
import styles from '../../dist/style.css';
import Chevron from './airbnb-chevron.svg';
import SVG from 'react-inlinesvg';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateContext: moment(),
      today: moment(),
      pickDate: 0,
      checkIn: 'Add date',
      checkOut: 'Add date',
      showCalendar: false,
      nights: null
    }

    this.weekdays = moment.weekdays();
    this.weekdaysShort = moment.weekdaysShort();
    this.months = moment.months();
  }


  year() {
    return this.state.dateContext.format('Y');
  }
  month() {
    return this.state.dateContext.format('MMMM');
  }
  daysInMonth() {
    return this.state.dateContext.daysInMonth();
  }
  currentDate() {
    return this.state.dateContext.get("date");
  }
  currentDay() {
    return this.state.dateContext.format("D");
  }

  firstDayOfMonth() {
    let dateContext = this.state.dateContext;
    let firstDay = moment(dateContext).startOf('month').format('d');
    return firstDay;
  }

  onBackClick(month) {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "months");
    this.setState({
      dateContext: dateContext
    })
  }

  onForwardClick(month) {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "months");
    this.setState({
      dateContext: dateContext
    })
  }

  pickDate(month, year, date) {
    const monthFormat = moment().month(month).format('M');

    if (this.state.pickDate === 0) {
      this.setState({
        pickDate: 1,
        checkIn: `${monthFormat}/${date}/${year}`
      })
    } else if (this.state.pickDate === 1) {
      this.setState({
        pickDate: 2,
        checkOut: `${monthFormat}/${date}/${year}`,
        // nights: this.calculateNights()
      })
      // console.log(this.calculateNights());
      this.props.buttonReserve();
      this.props.updateNights(9);
    }
  }

  clearDates() {
    this.setState({
      pickDate: 0,
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

  showCalendar() {
    this.setState({
      showCalendar: !this.state.showCalendar
    })
  }

  render() {
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">{day.substring(0,2)}</td>
      )
    });

    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks.push(<td key={i * 80} className="emptySlot">
        {""}
      </td>);
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = (d == this.currentDay() ? "day current-day": "day");
      daysInMonth.push(
        <td key={d*10} className={className}>
          <span onClick={()=>{this.pickDate(this.month(), this.year(), d)}}>{d}</span>
        </td>
      )
    }

    var totalSlots = [...blanks, ...daysInMonth];
    let rows = [];
    let cells = [];

    totalSlots.forEach((row, i) => {
      if ((i % 7) !== 0) {
        cells.push(row);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(row);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });


    let trElems = rows.map((d, i) => {
      return (
        <tr key={i}>
          {d}
        </tr>
      )
    })

    let numberNights;

    if (this.state.pickDate === 2) {
      if (this.calculateNights() === 1) {
        numberNights = this.calculateNights() + ' night';
      } else {
        numberNights = this.calculateNights() + ' nights';
      }
    } else if (this.state.pickDate < 2) {
      numberNights = 'Select dates';
    }

    let calendar;
    if (this.state.showCalendar) {
      calendar = (
      <div className="calendar-container">
        <div className={styles.selectDates}>
          {numberNights}
        </div>
      <table className={styles.calendarTable}>
        <thead>
          <tr className="calendar-header">

            <td onClick={this.onBackClick.bind(this)} className={styles.rotateLeft}><SVG src={Chevron} /></td>
            <td colSpan="5" className={styles.calendarTitle}>{this.month()} {this.year()}</td>
            <td onClick={this.onForwardClick.bind(this)} className={styles.rotateRight}><SVG src={Chevron} /></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekdays}
          </tr>
          {trElems}
        </tbody>
      </table>
      <div className="calendar-footer">
      <span className={styles.calClearDates} onClick={this.clearDates.bind(this)}>Clear dates</span>
      <span  className={styles.calClose} onClick={this.showCalendar.bind(this)}>Close</span>
      </div>
    </div>)
    } else {
      calendar;
    }


    return (
      <div >

        <div className={styles.checkContainer} onClick={this.showCalendar.bind(this)}>
          <div className={styles.checkInBox}>
            <div className={styles.guestsLabel}>CHECK-IN</div>
            <div className={styles.guestsCount}>{this.state.checkIn}</div>
          </div>

          <div className={styles.checkOutBox}>
            <div className={styles.guestsLabel}>CHECKOUT</div>
            <div className={styles.guestsCount}>{this.state.checkOut}</div>
          </div>

        </div>
        {calendar}



      </div>

    )
  }

}

export default Calendar;