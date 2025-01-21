import { useState } from "react";
import { withRouter } from "next/router";
import styles from "./Register.module.scss";

const roles = [
  "Attendee",
  "Organiser",
  "Venue Provider",
  "Food Provider",
  "Speaker",
  "Sponsors",
];

const UserRegister = (props: any) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [showSocialLogin, setShowSocialLogin] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = () => {
    console.log("Form Data:", formData);
    alert(`Registered successfully as ${formData.role}`);
  };

  if (showSocialLogin) {
    return (
      <div className={styles.registerContainer}>
        <div className={styles.formSection}>
          <h1>Sign in with</h1>
          <button className={`${styles.button} ${styles.google}`}>Google</button>
          <button className={`${styles.button} ${styles.twitter}`}>Twitter</button>
          <button className={`${styles.button} ${styles.linkedin}`}>LinkedIn</button>
          <button
            className={`${styles.button} ${styles.secondary}`}
            onClick={() => setShowSocialLogin(false)}
          >
            Back to Register
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.registerContainer}>
     <div className={styles.formSection}>
  <div className={styles.logo}>
    Convene <span>App</span>
  </div>
  <h1 className={styles.heading}>
    User Registration <span>.</span>
  </h1>
  <form
    onSubmit={(e) => {
      e.preventDefault();
      console.log("Form Data:", formData);
    }}
  >
    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <input
          id="firstName"
          name="firstName"
          placeholder=" "
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="firstName">First Name</label>
      </div>
      <div className={styles.formGroup}>
        <input
          id="lastName"
          name="lastName"
          placeholder=" "
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name</label>
      </div>
    </div>
    <div className={styles.formRow}>
      <div className={styles.formGroup}>
        <input
          id="username"
          name="username"
          placeholder=" "
          type="text"
          onChange={handleChange}
        />
        <label htmlFor="username">Username</label>
      </div>
      <div className={styles.formGroup}>
        <select id="gender" name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <label htmlFor="gender">Gender</label>
      </div>
    </div>
    {["email", "phoneNumber", "password", "confirmPassword"].map((field) => (
      <div className={styles.formGroup} key={field}>
        <input
          id={field}
          name={field}
          placeholder=" "
          type={field.includes("password") ? "password" : "text"}
          onChange={handleChange}
        />
        <label htmlFor={field}>{field.split(/(?=[A-Z])/).join(" ")}</label>
      </div>
    ))}
    <div className={styles.formGroup}>
      <select id="role" name="role" onChange={handleChange}>
        <option value="">Select Role</option>
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>
      <label htmlFor="role">Your Role</label>
    </div>
    <div className={styles.checkboxGroup}>
      <label>
        <input name="termsAccepted" type="checkbox" onChange={handleChange} />
        I accept the terms and conditions
      </label>
      <label>
        <input name="shareInfo" type="checkbox" onChange={handleChange} />
        Allow us to share information within the application scope
      </label>
    </div>
    <div className={styles.buttons}>
      <button
        type="button"
        className={`${styles.button} ${styles.secondary}`}
        onClick={() => console.log("Switching to social login...")}
      >
        Change Method
      </button>
      <button
        type="submit"
        className={`${styles.button} ${styles.primary}`}
        disabled={!formData.termsAccepted}
      >
        Register Now
      </button>
    </div>
  </form>
</div>

      <div className={styles.imageSection}>
        <img src="/assets/loginimage.jpg" alt="Registration Background" />
      </div>
    </div>
  );
};

export default withRouter(UserRegister);
