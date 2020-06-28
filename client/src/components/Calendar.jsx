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
      firstDate: '',
      secondDate: ''
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
    const dateFormat = `${monthFormat}/${date}/${year}`;
    const fullDate = `${month.substring(0, 3)} ${date}, ${year}`;

    if (this.state.pickDate === 0 || this.state.pickDate === 2) {
      this.setState({
        pickDate: 1,
        firstDate: fullDate,
        secondDate: ''
      })
      this.props.updateCheckIn(dateFormat);
    } else if (this.state.pickDate === 1) {
      this.setState({
        pickDate: 2,
        secondDate: fullDate
      })
      this.props.showCalendar();
      this.props.updateCheckOut(dateFormat);
    }
  }

  crossOutPrevDates(month, year, day) {
    let inputDay = new Date(`${month} ${day}, ${year}`)
    let firstDate = new Date(this.state.firstDate);

    if (this.state.secondDate) {
      return false;
    }

    if (inputDay.getTime() < firstDate.getTime()) {
      return true;
    }
    return false;
  }

  clearDates() {
    this.setState({
      pickDate: 0,
      firstDate: '',
      secondDate: ''
    })
    this.props.clearDates();
  }

  checkBookedDates(day, month, year) {
    let ranges = [];
    let inputDay = new Date(`${month} ${day}, ${year}`)

    for (let i = 0; i < this.props.bookings.length; i++) {
      let checkIn = new Date(this.props.bookings[i].checkin);
      let checkOut = new Date(this.props.bookings[i].checkout);

      if (inputDay >= checkIn.getTime() && inputDay <= checkOut.getTime()) {
        return true;
      }
    }
    return false;
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

    let selectDate;


    for (let d = 1; d <= this.daysInMonth(); d++) {
      let currentDayDate = new Date(this.state.today);
      let date = new Date(`${this.month()} ${d}, ${this.year()}`);
      let dateSlashFormat = `${this.month().substring(0, 3)} ${d}, ${this.year()}`
      let className = ((dateSlashFormat === this.state.firstDate) || (dateSlashFormat === this.state.secondDate) ? "day select-date": "day");

      let unavailableDate = (
        <td key={d*10} className={`${styles.day} ${styles.crossOutDate}`}>
          <span>{d}</span>
        </td>
      );

      let availableDate = (
        <td key={d*10} className={className} onClick={()=>{this.pickDate(this.month(), this.year(), d)}}>
          <span>{d}</span>
        </td>
      );

      let dateRender;

      // cross out all dates prior to current date and all booked dates
      if (date.getTime() < currentDayDate.getTime() || this.checkBookedDates(d, this.month(), this.year()) || this.crossOutPrevDates(d, this.month(), this.year()) ) {
        dateRender = unavailableDate;
      } else {
        dateRender = availableDate;
      }

      daysInMonth.push(dateRender);
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
    let updatedNights = this.props.calculateNights();

    if (this.state.pickDate === 2) {
      if (this.props.calculateNights() === 1) {
        numberNights = this.props.calculateNights() + ' night';
      } else {
        numberNights = this.props.calculateNights() + ' nights';
      }
    } else if (this.state.pickDate < 2) {
      numberNights = 'Select dates';
    }

    let dateRange;

    if (this.state.firstDate && this.state.secondDate && this.props.checkOut !== 'Add date') {
      dateRange = `${this.state.firstDate} - ${this.state.secondDate}`;
    }

    let calendar;
    if (this.props.showCalendarState) {
      calendar = (
      <div className="calendar-container">
        <div className={styles.selectDates}>
          {numberNights}
        </div>
        <div className={styles.dateRange}>
          {dateRange}
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
      <span  className={styles.calClose} onClick={this.props.showCalendar}>Close</span>
      </div>
    </div>)
    } else {
      calendar;
    }


    return (
      <div >

        <div className={styles.checkContainer} onClick={this.props.showCalendar}>
          <div className={styles.checkInBox}>
            <div className={styles.guestsLabel}>CHECK-IN</div>
            <div className={styles.guestsCount}>{this.props.checkIn}</div>
          </div>

          <div className={styles.checkOutBox}>
            <div className={styles.guestsLabel}>CHECKOUT</div>
            <div className={styles.guestsCount}>{this.props.checkOut}</div>
          </div>

        </div>
        {calendar}



      </div>

    )
  }

}

export default Calendar;