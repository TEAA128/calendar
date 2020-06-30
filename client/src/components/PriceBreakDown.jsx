import React from 'react';
import styles from '../../dist/style.css';

var PriceBreakDown = (props) => {
  let numberNights = props.calculateNights();
  let basePrice = props.info.nightly_fee * numberNights;
  let serviceFee = Math.round(basePrice * 0.142);
  let occupancyTax = Math.round(basePrice * props.info.occupancy_tax_rate);
  let total = basePrice + props.info.cleaning_fee + serviceFee + occupancyTax;
  let night;

  if (numberNights > 1) {
    night = 'nights'
  } else {
    night = 'night'
  }

  return (
    <div>
      <div className={styles.youWontBeCharged}>You won't be charged yet</div>
      <div className={styles.priceDescription}>${props.info.nightly_fee} x {numberNights} {night}  <span className={styles.priceNumbers}>${basePrice}</span></div>
      <div className={styles.priceDescription}>Cleaning fee <span className={styles.priceNumbers}>${props.info.cleaning_fee}</span ></div>
      <div className={styles.priceDescription}>Service fee <span className={styles.priceNumbers}>${serviceFee}</span></div>
      <div className={styles.priceDescription}>Occupancy taxes and fees <span className={styles.priceNumbers}>${occupancyTax}</span></div>
      <div className={styles.total}>Total <span className={styles.priceNumbers}>${total}</span></div>
    </div>
  )
}

export default PriceBreakDown;