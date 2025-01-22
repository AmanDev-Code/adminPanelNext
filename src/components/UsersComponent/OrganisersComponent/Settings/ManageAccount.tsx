import React, { useState } from "react";
import styles from "./ManageAccount.module.scss";

const ManageAccount: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [emails, setEmails] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      alert("Password changed successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("New password and confirm password do not match.");
    }
  };

  const renderInputField = (
    label: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    type: string
  ) => (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
        className={styles.inputField}
      />
      <label className={styles.label}>{label}</label>
    </div>
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Manage Your Account</h2>

      <div className={styles.card}>
        {renderInputField("Old Password", oldPassword, setOldPassword, "password")}
        {renderInputField("New Password", newPassword, setNewPassword, "password")}
        {renderInputField("Confirm Password", confirmPassword, setConfirmPassword, "password")}

        <button className={styles.changeButton} onClick={handlePasswordChange}>
          Change Password
        </button>
      </div>

      <h3 className={styles.subHeading}>Choose Your Preferences</h3>

      <div className={styles.toggleContainer}>
        <span>Want to receive notifications</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      <div className={styles.toggleContainer}>
        <span>Want to receive E-Mails</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={emails}
            onChange={() => setEmails(!emails)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>

      <div className={styles.toggleContainer}>
        <span>Want to receive relevant newspaper</span>
        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={newsletter}
            onChange={() => setNewsletter(!newsletter)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default ManageAccount;
