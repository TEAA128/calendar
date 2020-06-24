import React from 'react';
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateContext: moment(),
      today: moment(),
      pickDate: 0,
      checkIn: 'CHECK-IN',
      checkOut: 'CHECKOUT'
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
        checkOut: `${monthFormat}/${date}/${year}`
      })
    }
  }

  clearDates() {
    this.setState({
      pickDate: 0,
      checkIn: 'CHECK-IN',
      checkOut: 'CHECKOUT'
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


    return (
      <div>
        <div>
          <span>{this.state.checkIn}</span> | <span>{this.state.checkOut}</span>
        </div>
        <div className="calendar-container">
          <table className="calendar">
            <thead>
              <tr className="calendar-header">
                <td onClick={this.onBackClick.bind(this)}>back</td>
                <td colSpan="5">{this.month()} {this.year()}</td>
                <td onClick={this.onForwardClick.bind(this)}>foward</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                {weekdays}
              </tr>
              {trElems}
              <tr>
                <td colSpan="5" onClick={this.clearDates.bind(this)}>Clear dates</td>
              </tr>
            </tbody>
          </table>
        </div>



      </div>

    )
  }

}

export default Calendar;