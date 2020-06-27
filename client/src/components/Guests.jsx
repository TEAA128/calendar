import React from 'react';
import styles from '../../dist/style.css';
import Chevron from './airbnb-chevron.svg';
import SVG from 'react-inlinesvg';

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

    if (input === 'minus' && this.state.adults <= 1 && type !== 'children') {
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
    let chevron;

    if (this.state.infants === 1) {
      infants = `, ${this.state.infants} infant`;
    } else if (this.state.infants > 1) {
      infants = `, ${this.state.infants} infants`;;
    } else {
      infants;
    }

    if (this.state.expand) {
      chevron = <span className='chevron chev-up'><SVG src={Chevron} /> </span>
    } else if (!this.state.expand) {
      chevron = <span className='chevron'><SVG src={Chevron} /> </span>
    }

    if (this.state.guests === 1) {
      button = (<div className="guests" onClick={this.toggleExpandState}>
        <div className="guestsLabel">GUESTS {chevron}</div>
        <div className="guestsCount"> {this.state.guests} guest{infants}</div>
        </div>)
    } else {
      button = (<div className="guests" onClick={this.toggleExpandState}>
        <div className="guestsLabel">GUESTS {chevron}</div>
        <div className="guestsCount">{this.state.guests} guests{infants}</div>
        </div>)
    }

    if (this.state.expand) {
      expand = (
        <div className="expand">

          <div className="padding">
            <div className='guest-description'>
              <div className="bold">Adults</div>
            </div>
            <div className="guestCounter adult">
              <span className="plusMinus minus" onClick={(event) => {this.handleClick(event, 'minus', 'adults')}}> - </span>
                {this.state.adults}
              <span className="plusMinus plus" onClick={(event) => {this.handleClick(event, 'plus', 'adults')}}> + </span>
            </div>
          </div>

        <div className="padding">
          <div className='guest-description'>
            <div className="bold">Children</div>
            <div className="ages">Ages 2-12</div>
          </div>
          <div className="guestCounter">
            <span className="plusMinus minus" onClick={(event)=> {this.handleClick(event, 'minus', 'children')}}>  -  </span>
              {this.state.children}
            <span className='plusMinus plus' onClick={(event)=> {this.handleClick(event, 'plus', 'children')}}> + </span>
          </div>
        </div>

        <div className="padding">
          <div className='guest-description'>
            <div className="bold">Infants</div>
            <div className="ages">Under 2</div>
          </div>
          <div className='guestCounter'>
          <span className='plusMinus minus' onClick={(event)=> {this.handleClickInfant(event, 'minus')}}> - </span>
            {this.state.infants}
          <span className='plusMinus plus' onClick={(event)=> {this.handleClickInfant(event, 'plus')}}> + </span>
          </div>
        </div>

        <div className='fadedText'>
          {this.props.max} guests maximum. Infants don't count toward the number of guests.
        </div>

        <div className="guestsClose" onClick={this.toggleExpandState}>
          Close
        </div>
      </div>
      )
    } else {
      expand;
    }

    return (<div>
      <div>{button}</div>
      <div>{expand}</div>
    </div>)
  }
}

export default Guests;