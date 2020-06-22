import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expand: false,
      guests: 1,
      adults: 1,
      children: 0,
      infants: 0
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleExpandState = this.toggleExpandState.bind(this);
    this.handleClickInfant = this.handleClickInfant.bind(this);
  }

  handleClickInfant(event, input) {
    event.preventDefault();

    if (input === 'minus' && this.state.infants === 0) {
      return;
    }
    if (input === 'plus' && this.state.infants >= 5) {
      return;
    }
    if (input === 'plus') {
      let plused = this.state.infants + 1;
      this.setState({
        infants: plused
      })
    }
    if (input === 'minus') {
      let minused = this.state.infants - 1;
      this.setState({
        infants: minused
      })
    }
  }

  handleClick(event, input, type) {
    event.preventDefault();

    if (input === 'minus' && (this.state.guests === 1 || this.state[type] <= 0)) {
      return;
    }

    if (input === 'plus' && this.state.guests === this.props.max) {
      return;
    }


    if (input === 'plus') {
      let plused = this.state[type] + 1;
      let plusedGuests = this.state.guests +1;
      this.setState({
        [type]: plused,
        guests: plusedGuests
      })
    }

    if (input === 'minus') {
      let minused = this.state[type] - 1;
      let minusedGuests = this.state.guests - 1;
      this.setState({
        [type]: minused,
        guests: minusedGuests
      })
    }
  }

  toggleExpandState(event) {
    event.preventDefault();

    this.setState({
      expand: !this.state.expand
    })
  }

  render() {
    let button;
    let expand;
    let infants;

    if (this.state.infants === 1) {
      infants = `, ${this.state.infants} infant`;
    } else if (this.state.infants > 1) {
      infants = `, ${this.state.infants} infants`;;
    } else {
      infants;
    }

    if (this.state.guests === 1) {
      button = <button onClick={this.toggleExpandState}> {this.state.guests} guest{infants}</button>
    } else {
      button = <button onClick={this.toggleExpandState}>{this.state.guests} guests{infants}</button>
    }

    if (this.state.expand) {
      expand = (
        <div>

        <div>
          Adults
          <button className="plus-minus" onClick={(event) => {this.handleClick(event, 'minus', 'adults')}}> - </button>
            {this.state.adults}
          <button className="plus-minus" onClick={(event) => {this.handleClick(event, 'plus', 'adults')}}> + </button>
        </div>

        <div>
          Children (Ages 2-12)
          <button className="plus-minus" onClick={(event)=> {this.handleClick(event, 'minus', 'children')}}> - </button>
            {this.state.children}
          <button className="plus-minus" onClick={(event)=> {this.handleClick(event, 'plus', 'children')}}> + </button>
        </div>

        <div>
          Infants (Under 2)
          <button className="plus-minus" onClick={(event)=> {this.handleClickInfant(event, 'minus')}}> - </button>
            {this.state.infants}
          <button className="plus-minus" onClick={(event)=> {this.handleClickInfant(event, 'plus')}}> + </button>
        </div>

        <div>
          2 guests maximum. Infants don't count towarrd the number of guests.
        </div>

        <div onClick={this.toggleExpandState}>
          Close
        </div>
      </div>
      )
    } else {
      expand;
    }


    return (<div>
      <div>GUESTS</div>
      <div>{button}</div>
      <div>{expand}</div>
    </div>)
  }
}

export default Guests;