import React from 'react';
import styles from '../../dist/style.css';

var PriceBreakDown = (props) => {
  let basePrice = props.info.nightly_fee * props.nights;
  let total = basePrice + props.info.cleaning_fee + props.info.service_fee + props.info.occupancy_tax_fees;

  return (
    <div>
      <div className='youWontBeCharged'>You won't be charged yet</div>
      <div className='priceDescription'>${props.info.nightly_fee} x {props.nights} nights  <span className={styles.priceNumbers}>${basePrice}</span></div>
      <div className='priceDescription'>Cleaning fee <span className={styles.priceNumbers}>${props.info.cleaning_fee}</span ></div>
      <div className='priceDescription'>Service fee <span className={styles.priceNumbers}>${props.info.service_fee}</span></div>
      <div className='priceDescription'>Occupancy taxes and fees <span className={styles.priceNumbers}>${props.info.occupancy_tax_fees}</span></div>
      <div className='total'>Total <span className='priceNumbers'>${total}</span></div>
    </div>
  )
}

export default PriceBreakDown;