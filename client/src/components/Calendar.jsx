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
  }

  weekdays = moment.weekdays();
  weekdaysShort = moment.weekdaysShort();
  months = moment.month();

  year = () => {
    return this.state.dateContext.format('Y');
  }
  month = () => {
    return this.state.dateContext.format('MMMM');
  }
  daysInMonth = () => {
    return this.state.dateContext.daysInMonth();
  }
  currentDate = () => {
    return this.state.dateContext.get("date");
  }
  currentDay = () => {
    return this.state.dateContext.format("D");
  }

  render() {
    return (
      <div>
        <div>
          <span>CHECK-IN</span> | <span>CHECKOUT</span>
        </div>




      </div>

    )
  }

}

export default Calendar;