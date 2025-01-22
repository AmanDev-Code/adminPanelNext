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
            <div className={styles.inputField}>
              <input
                className={styles.input}
                type="text"
                id="bankName"
                placeholder=" "
              />
              <label className={styles.label} htmlFor="bankName">Bank Name</label>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.inputField}>
              <input
                className={styles.input}
                type="text"
                id="name"
                placeholder=" "
              />
              <label className={styles.label} htmlFor="name">First & Last Name</label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.inputField}>
              <input
                className={styles.input}
                type="text"
                id="bankCode"
                placeholder=" "
              />
              <label className={styles.label} htmlFor="bankCode">Bank Code</label>
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.inputField}>
              <input
                className={styles.input}
                type="text"
                id="branchName"
                placeholder=" "
              />
              <label className={styles.label} htmlFor="branchName">Branch Name</label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.inputField}>
              <input
                className={styles.input}
                type="text"
                id="accountNumber"
                placeholder=" "
              />
              <label className={styles.label} htmlFor="accountNumber">Account Number</label>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.inputField}>
              <input
                className={styles.input}
                type="text"
                id="ifscCode"
                placeholder=" "
              />
              <label className={styles.label} htmlFor="ifscCode">IFSC Code</label>
            </div>
          </div>
        </div>
        {/* <button className={styles.saveButton} type="submit">Save</button> */}
      </form>

      <h2 className={styles.subheading}>Enter UPI Details</h2>
      <form className={styles.form}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.inputField}>
              <input
                className={styles.input}
                type="text"
                id="upiId"
                placeholder=" "
              />
              <label className={styles.label} htmlFor="upiId">Enter UPI ID</label>
            </div>
          </div>
        </div>
        <button className={styles.saveButton} type="submit">Save</button>
      </form>
    </div>
  );
};

export default PaymentMethods;
