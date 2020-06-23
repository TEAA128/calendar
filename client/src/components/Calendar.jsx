import React from 'react';
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dateContext: moment(),
      today: moment(),
      showMonthPopup: false,
      showYearPopup: false
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


  render() {
    let weekdays = this.weekdaysShort.map((day) => {
      return (
        <td key={day} className="week-day">{day.substring(0,2)}</td>
      )
    });

    let blanks1 = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      blanks1.push(<td key={i * 80} className="emptySlot">
        {""}
      </td>);
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let className = (d == this.currentDay() ? "day current-day": "day");
      daysInMonth.push(
        <td key={d*10} className={className} >
          <span>{d}</span>
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
          <span>CHECK-IN</span> | <span>CHECKOUT</span>
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
            </tbody>
          </table>
        </div>



      </div>

    )
  }

}

export default Calendar;