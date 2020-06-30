import React from 'react';
import styles from '../../dist/style.css';
import Chevron from './airbnb-chevron.svg';
import SVG from 'react-inlinesvg';

class Guests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1
    }

    this.handleClick = this.handleClick.bind(this);
    this.toggleExpandState = this.toggleExpandState.bind(this);
    this.handleClickInfant = this.handleClickInfant.bind(this);
  }

  handleClickInfant(event, input) {
    event.preventDefault();

    if (input === 'minus' && this.props.infants === 0) {
      return;
    }
    if (input === 'plus' && this.props.infants >= 5) {
      return;
    }
    if (input === 'plus') {
      let plused = this.props.infants + 1;
      this.props.updateGuests('infants', 'plus');
    }
    if (input === 'minus') {
      let minused = this.props.infants - 1;
      this.props.updateGuests('infants', 'minus');
    }
  }

  handleClick(event, input, type) {
    event.preventDefault();

    if (input === 'minus' && (this.state.guests === 1 || this.state[type] <= 0)) {
      return;
    }

    if (input === 'minus' && this.props.adults <= 1 && type !== 'children') {
      return;
    }

    if (input === 'plus' && this.state.guests === this.props.max) {
      return;
    }


    if (input === 'plus') {
      let plused = this.state[type] + 1;
      let plusedGuests = this.state.guests +1;
      this.setState({
        guests: plusedGuests
      })
      this.props.updateGuests(type, 'plus')
    }

    if (input === 'minus') {
      let minused = this.state[type] - 1;
      let minusedGuests = this.state.guests - 1;
      this.setState({
        guests: minusedGuests
      })
      this.props.updateGuests(type, 'minus');
    }
  }

  toggleExpandState(event) {
    event.preventDefault();

    this.props.showGuestsOptions();
  }

  render() {
    let button;
    let expand;
    let infants;
    let chevron;

    if (this.props.infants === 1) {
      infants = `, ${this.props.infants} infant`;
    } else if (this.props.infants > 1) {
      infants = `, ${this.props.infants} infants`;;
    } else {
      infants;
    }

    if (this.props.showGuestsState) {
      chevron = <span className={`${styles.chevron} ${styles.chevUp}`}><SVG src={Chevron} /> </span>
    } else if (!this.props.showGuestsState) {
      chevron = <span className={styles.chevron}><SVG src={Chevron} /> </span>
    }

    if (this.state.guests === 1) {
      button = (<div className={styles.guests} onClick={this.toggleExpandState}>
        <div className={styles.guestsLabel}>GUESTS {chevron}</div>
        <div className={styles.guestsCount}> {this.state.guests} guest{infants}</div>
        </div>)
    } else {
      button = (<div className={styles.guests} onClick={this.toggleExpandState}>
        <div className={styles.guestsLabel}>GUESTS {chevron}</div>
        <div className={styles.guestsCount}>{this.state.guests} guests{infants}</div>
        </div>)
    }

    if (this.props.showGuestsState) {
      expand = (
        <div className={styles.expand}>

          <div className={styles.padding}>
            <div className={styles.guestDescription}>
              <div className={styles.bold}>Adults</div>
            </div>
            <div className={`${styles.guestCounter} ${styles.adult}`}>
              <span className={`${plusMinus} ${minus}`} onClick={(event) => {this.handleClick(event, 'minus', 'adults')}}> - </span>
                {this.props.adults}
              <span className={`${plusMinus} ${plus}`} onClick={(event) => {this.handleClick(event, 'plus', 'adults')}}> + </span>
            </div>
          </div>

        <div className={styles.padding}>
          <div className={styles.guestDescription}>
            <div className={styles.bold}>Children</div>
            <div className={styles.ages}>Ages 2-12</div>
          </div>
          <div className={styles.guestCounter}>
            <span className={`${styles.plusMinus} ${styles.minus}`} onClick={(event)=> {this.handleClick(event, 'minus', 'children')}}>  -  </span>
              {this.props.children}
            <span className={`${styles.plusMinus} ${styles.plus}`} onClick={(event)=> {this.handleClick(event, 'plus', 'children')}}> + </span>
          </div>
        </div>

        <div className={styles.padding}>
          <div className={styles.guestDescription}>
            <div className={styles.bold}>Infants</div>
            <div className={styles.ages}>Under 2</div>
          </div>
          <div className={styles.guestCounter}>
          <span className={`${plusMinus} ${minus}`} onClick={(event)=> {this.handleClickInfant(event, 'minus')}}> - </span>
            {this.props.infants}
          <span className={`${plusMinus} ${plus}`} onClick={(event)=> {this.handleClickInfant(event, 'plus')}}> + </span>
          </div>
        </div>

        <div className={styles.fadedText}>
          {this.props.max} guests maximum. Infants don't count toward the number of guests.
        </div>

        <div onClick={this.props.showGuestsOptions}>
          <span className={styles.guestsClose} >Close</span>
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