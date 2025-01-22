import React from 'react';
import styles from './PaymentMethods.module.scss';

const PaymentMethods: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Add Payment Methods Here</h1>
      
      <h2 className={styles.subheading}>Bank Details</h2>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label} htmlFor="bankName">Bank Name</label>
            <input className={styles.input} type="text" id="bankName" placeholder="Enter bank name here" />
          </div>
          <div className={styles.column}>
            <label className={styles.label} htmlFor="name">First & Last Name</label>
            <input className={styles.input} type="text" id="name" placeholder="Enter your name here" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label} htmlFor="bankCode">Bank Code</label>
            <input className={styles.input} type="text" id="bankCode" placeholder="Bank No." />
          </div>
          <div className={styles.column}>
            <label className={styles.label} htmlFor="branchName">Branch Name</label>
            <input className={styles.input} type="text" id="branchName" placeholder="Bank No." />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label} htmlFor="accountNumber">Account Number</label>
            <input className={styles.input} type="text" id="accountNumber" placeholder="Enter your account number here" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label} htmlFor="ifscCode">IFSC Code</label>
            <input className={styles.input} type="text" id="ifscCode" placeholder="Enter your IFSC code here" />
          </div>
        </div>
        {/* <button className={styles.saveButton} type="submit">Save</button> */}
      </form>

      <h2 className={styles.subheading}>Enter UPI Details</h2>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.column}>
            <label className={styles.label} htmlFor="upiId">Enter UPI ID</label>
            <input className={styles.input} type="text" id="upiId" placeholder="Enter UPI ID here" />
          </div>
        </div>
        <button className={styles.saveButton} type="submit">Save</button>
      </form>
    </div>
  );
};

export default PaymentMethods;
