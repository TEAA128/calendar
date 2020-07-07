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
      nextMonthContext: moment().add(1, "months"),
      today: moment(),
      pickDate: 0,
      firstDate: '',
      secondDate: ''
    }

    this.weekdays = moment.weekdays();
    this.weekdaysShort = moment.weekdaysShort();
    this.months = moment.months();
  }


  year(calendar) {
    if (calendar === 'first') {
      return this.state.dateContext.format('Y');
    } else {
      return this.state.nextMonthContext.format('Y');
    }
  }

  month(calendar) {
    if (calendar === 'first') {
      return this.state.dateContext.format('MMMM');
    } else {
      return this.state.nextMonthContext.format('MMMM');
    }
  }

  daysInMonth(calendar) {
    if (calendar === 'first') {
      return this.state.dateContext.daysInMonth();
    } else {
      return this.state.nextMonthContext.daysInMonth();
    }
  }

  currentDate(calendar) {
    if (calendar === 'first') {
      return this.state.dateContext.get("date");
    } else {
      return this.state.nextMonthContext.get('date');
    }
  }

  currentDay(calendar) {
    if (calendar === 'first') {
      return this.state.dateContext.format("D");
    } else {
      return this.state.nextMonthContext.format("D");
    }
  }

  firstDayOfMonth(calendar) {
    if (calendar === 'first') {
      let dateContext = this.state.dateContext;
      let firstDay = moment(dateContext).startOf('month').format('d');
      return firstDay;
    } else {
      let dateContext1 = this.state.nextMonthContext;
      let firstDay = moment(dateContext1).startOf('month').format('d');
      return firstDay;
    }
  }

  onBackClick(month) {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).subtract(1, "months");
    let dateContext2 = Object.assign({}, this.state.nextMonthContext);
    dateContext2 = moment(dateContext2).subtract(1, "months");
    this.setState({
      dateContext: dateContext,
      nextMonthContext: dateContext2
    })
  }

  onForwardClick(month) {
    let dateContext = Object.assign({}, this.state.dateContext);
    dateContext = moment(dateContext).add(1, "months");
    let dateContext2 = Object.assign({}, this.state.nextMonthContext);
    dateContext2 = moment(dateContext2).add(1, "months");
    this.setState({
      dateContext: dateContext,
      nextMonthContext: dateContext2
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
    let inputDay = new Date(`${month} ${day}, ${year}`)

    let bookings = this.props.bookings || [];

    for (let i = 0; i < bookings.length; i++) {
      let checkIn = new Date(this.props.bookings[i].checkin);
      let checkOut = new Date(this.props.bookings[i].checkout);

      if (inputDay.getTime() >= checkIn.getTime() && inputDay.getTime() <= checkOut.getTime()) {
        return true;
      }
    }
    return false;
  }

  checkNextBookedDate(day, month, year) {
    let inputDay = new Date(`${month} ${day}, ${year}`);
    let nearestCheckin;
    let firstDateObj = new Date(this.state.firstDate);
    let nearestCheckinSet = true;
    let bookings = this.props.bookings || [];

    if (this.state.secondDate) {
      return false;
    }
    if (this.state.firstDate) {

      for (let i = 0; i < bookings.length; i++) {
        let bookedcheckin = new Date(this.props.bookings[i].checkin);

        if (nearestCheckinSet && (firstDateObj.getTime() < bookedcheckin.getTime())) {
          nearestCheckin = bookedcheckin.getTime();
          nearestCheckinSet = false;
        } else if (!nearestCheckinSet && (firstDateObj.getTime() < bookedcheckin.getTime()) && (bookedcheckin.getTime() < nearestCheckin)) {
          nearestCheckin = bookedcheckin.getTime();
        }
      }

      if (inputDay.getTime() >= nearestCheckin) {
        return true;
      }

    }

    return false;
  }

  checkBetweenBookedDates(day, month, year) {
    let inputDay = new Date(`${month} ${day}, ${year}`);
    let firstDay = new Date(this.state.firstDate);
    let secondDay = new Date(this.state.secondDate);

    if (inputDay.getTime() > firstDay.getTime() && inputDay.getTime() < secondDay.getTime()) {
      return true;
    }

    return false;
  }


  calendar(cal) {
    let blanks = [];
    for (let i = 0; i < this.firstDayOfMonth(cal); i++) {
      blanks.push(<td key={i * 80}>
        {""}
      </td>);
    }

    let daysInMonth = [];
    let selectDate;

    for (let d = 1; d <= this.daysInMonth(cal); d++) {
      let currentDayDate = new Date(this.state.today);
      let date = new Date(`${this.month(cal)} ${d}, ${this.year(cal)}`);
      let dateSlashFormat = `${this.month(cal).substring(0, 3)} ${d}, ${this.year(cal)}`
      let isFirstOrSecondDate = (dateSlashFormat === this.state.firstDate) || (dateSlashFormat === this.state.secondDate);
      let className = (isFirstOrSecondDate ? `${styles.day} ${styles.selectDate}`: styles.day);

      let unavailableDate = (
        <td key={d*10} className={`${styles.day} ${styles.crossOutDate}`}>
          <span>{d}</span>
        </td>
      );

      let availableDate;

      if (this.state.firstDate && this.state.secondDate && this.checkBetweenBookedDates(d, this.month(cal), this.year(cal))) {
        availableDate = (
          <td key={d*10} className={`${className} ${styles.highlight}`} onClick={()=>{this.pickDate(this.month(cal), this.year(cal), d)}}>
            <span>{d}</span>
          </td>
        );
      } else {
        availableDate = (
          <td key={d*10} className={className} onClick={()=>{this.pickDate(this.month(cal), this.year(cal), d)}}>
            <span>{d}</span>
          </td>
        );
      }

      let dateRender;

      // cross out all dates prior to current date and all booked dates
      if (date.getTime() < currentDayDate.getTime() || this.checkBookedDates(d, this.month(cal), this.year(cal)) || this.crossOutPrevDates(d, this.month(cal), this.year(cal)) || this.checkNextBookedDate(d, this.month(cal), this.year(cal))) {
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

    return trElems;
  }


  render() {

    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className={styles.weekDay}>{day.substring(0,2)}</td>
      )
    });


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
    } else {
      dateRange = 'Add your travel dates for exact pricing'
    }

    let checkInClass;
    let checkOutClass;

    if (!this.state.firstDate && !this.state.secondDate) {
      checkInClass = styles.highlightCheckin;
      checkOutClass = styles.popUpCheckInBox;
    }
    if (this.state.firstDate && !this.state.secondDate) {
      checkOutClass = styles.highlightCheckin;
      checkInClass = styles.popUpCheckInBox;
    }
    if (this.state.secondDate && this.state.firstDate) {
      checkInClass = styles.highlightCheckin;
      checkOutClass = styles.popUpCheckInBox;
    }

    let calendar;
    if (this.props.showCalendarState) {
      calendar = (
      <div className={styles.calendarContainer}>
        <div className={styles.popUpCalTop}>
        <div className={styles.popUpCalLeft}>
        <div className={styles.selectDates}>
          {numberNights}
        </div>
        <div className={styles.dateRange}>
          {dateRange}
        </div>
        </div>

        <table className={styles.popUpCheckContainer} onClick={this.props.showCalendar}>
          <tr>
            <td className={checkInClass}>
              <div className={styles.guestsLabel}>CHECK-IN</div>
              <div className={styles.guestsCount}>{this.props.checkIn}</div>
            </td>

            <td className={checkOutClass}>
              <div className={styles.guestsLabel}>CHECKOUT</div>
              <div className={styles.guestsCount}>{this.props.checkOut}</div>
            </td>
          </tr>
        </table>

        </div>

      <div className={styles.doubleCal}>
      <div className={styles.firstCal}>
      <table className={styles.calendarTable}>
        <thead>
          <tr>
            <td onClick={this.onBackClick.bind(this)} className={styles.rotateLeft}><SVG src={Chevron} /></td>
            <td colSpan="5" className={styles.calendarTitle}>{this.month('first')} {this.year('first')}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekdays}
          </tr>
          {this.calendar('first')}
        </tbody>
      </table>
      </div>
      <div className={styles.secondCal}>
      <table className={styles.calendarTable}>
        <thead>
          <tr>
            <td colSpan="6" className={styles.calendarTitle}>{this.month('second')} {this.year('second')}</td>
            <td onClick={this.onForwardClick.bind(this)} className={styles.rotateRight}><SVG src={Chevron} /></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekdays}
          </tr>
          {this.calendar('second')}
        </tbody>
      </table>
      </div>
      </div>
      <div className={styles.calendarFooter}>
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