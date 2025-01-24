import React, { useRef, useState, useEffect } from "react";
import styles from "./styles/Step1.module.scss";

interface Step1Props {
  data: Record<string, any>;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step1: React.FC<Step1Props> = ({ data, onDataChange, onNext, onPrevious }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownSelect = (value: string) => {
    onDataChange({ ...data, eventCategory: value });
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  const handleChange = (field: string, value: string) => {
    onDataChange({ ...data, [field]: value });
  };

  return (
    <div className={styles.step1Container}>
      <h2 className={styles.heading}>Event Details</h2>
      <form className={styles.form}>
        {/* Event Name */}
        <div className={styles.formGroup}>
          <input
            type="text"
            id="eventName"
            className={`${styles.inputField}`}
            value={data.eventName}
            onChange={(e) => handleChange("eventName", e.target.value)}
            placeholder=" "
          />
          <label htmlFor="eventName" className={styles.label}>
            Event Name
          </label>
        </div>

         {/* Event Category Dropdown */}
         <div className={`${styles.dropdown}`} ref={dropdownRef}>
          <div
            className={`${styles.dropdownField}`}
            onClick={handleDropdownToggle}
            tabIndex={0}
            role="button"
          >
            <span
              className={`${styles.label} ${
                data.eventCategory ? styles.labelFloating : ""
              }`}
            >
              Event Type
            </span>
            <span>{data.eventCategory || ""}</span>
          </div>
          {isDropdownOpen && (
            <ul className={styles.dropdownMenu}>
              <li onClick={() => handleDropdownSelect("Physical")}>Physical</li>
              <li onClick={() => handleDropdownSelect("Virtual")}>Virtual</li>
              <li onClick={() => handleDropdownSelect("Hybrid")}>Hybrid</li>
            </ul>
          )}
        </div>

        {/* Date and Time */}
        <h3 className={styles.subheading}>Date and Time</h3>
        <div className={styles.dateTime}>
          <div className={styles.formGroup}>
            <input
              type="date"
              id="startDate"
              className={`${styles.inputField}`}
              value={data.startDate}
              onChange={(e) => handleChange("startDate", e.target.value)}
              placeholder=" "
            />
            <label htmlFor="startDate" className={styles.label}>
              Start Date
            </label>
          </div>
          <div className={styles.formGroup}>
            <input
              type="time"
              id="startTime"
              className={`${styles.inputField}`}
              value={data.startTime}
              onChange={(e) => handleChange("startTime", e.target.value)}
              placeholder=" "
            />
            <label htmlFor="startTime" className={styles.label}>
              Start Time
            </label>
          </div>
          <div className={styles.formGroup}>
            <input
              type="time"
              id="endTime"
              className={`${styles.inputField}`}
              value={data.endTime}
              onChange={(e) => handleChange("endTime", e.target.value)}
              placeholder=" "
            />
            <label htmlFor="endTime" className={styles.label}>
              End Time
            </label>
          </div>
        </div>

        {/* Conditional Rendering: Location or Google Meet Link */}
        <h3 className={styles.subheading}>
          {data.eventCategory === "Physical" ? "Location" : "Virtual Link"}
        </h3>
        {data.eventCategory === "Physical" && (
          <div className={styles.formGroup}>
            <input
              type="text"
              id="location"
              className={`${styles.inputField}`}
              value={data.location}
              onChange={(e) => handleChange("location", e.target.value)}
              placeholder=" "
            />
            <label htmlFor="location" className={styles.label}>
              Venue Location
            </label>
          </div>
        )}
        {(data.eventCategory === "Virtual" || data.eventCategory === "Hybrid") && (
          <div className={styles.formGroup}>
            <input
              type="url"
              id="virtualLink"
              className={`${styles.inputField}`}
              value={data.virtualLink}
              onChange={(e) => handleChange("virtualLink", e.target.value)}
              placeholder=" "
            />
            <label htmlFor="virtualLink" className={styles.label}>
              Google Meet Link
            </label>
          </div>
        )}

        {/* Event Description */}
        <h3 className={styles.subheading}>Event Description</h3>
        <div className={styles.formGroup}>
          <textarea
            id="description"
            className={`${styles.textarea}`}
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder=" "
          ></textarea>
          <label htmlFor="description" className={styles.label}>
            Event Description
          </label>
        </div>
      </form>
    </div>
  );
};

export default Step1;
