import React from "react";
import styles from "./styles/EventDetails.module.scss";

interface EventDetailsProps {
  data: string; // Event data as a JSON string
  onDataChange: (data: string) => void; // Callback for updating event data
}

const EventDetails: React.FC<EventDetailsProps> = ({ data, onDataChange }) => {
  let eventData = {};
  try {
    eventData = JSON.parse(data);
  } catch (error) {
    console.error("Invalid JSON data passed to EventDetails:", error);
    eventData = {};
  }

  const renderList = (items: { name: string; image: string }[], title: string) => (
    <div className={styles.card}>
      <h3 className={styles.sectionHeading}>{title}</h3>
      <div className={styles.gridContainer}>
        {items.map((item, index) => (
          <div key={index} className={styles.gridItem}>
            <div className={styles.inlineInfo}>
              <img src={item.image || ""} alt={item.name} className={styles.profileImage} />
              <span className={styles.inlineText}>{item.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Card 1: Banner and Basic Info */}
      <div className={styles.card}>
        <img
          src={(eventData as any).bannerImage || ""}
          alt="Event Banner"
          className={styles.bannerImage}
        />
        <div className={styles.cardContent}>
          <h2 className={styles.eventName}>{(eventData as any).name}</h2>
          <p className={styles.eventType}>Event Type: {(eventData as any).eventType}</p>
          <p className={styles.price}>Price: {(eventData as any).price}</p>
          <h3 className={styles.sectionHeading}>Date and Time</h3>
          <div className={styles.datetime}>
            <i className={`fas fa-calendar ${styles.icon}`} />
            <span>{(eventData as any).date}</span>
          </div>
          <div className={styles.datetime}>
            <i className={`fas fa-clock ${styles.icon}`} />
            <span>
              {(eventData as any).startTime} - {(eventData as any).endTime}
            </span>
          </div>
        </div>
      </div>

      {/* Card 2: Venue */}
      <div className={styles.card}>
        <h3 className={styles.sectionHeading}>Venue</h3>
        <div className={styles.location}>
          <i className={`fas fa-map-marker-alt ${styles.icon}`} />
          <p>{(eventData as any).venueLocation}</p>
        </div>
        <img
          src={(eventData as any).mapImage || "https://t4.ftcdn.net/jpg/03/38/37/73/360_F_338377354_1Y6oyGrvaae2kqY3YS07b6X4NDKZntne.jpg"}
          alt="Venue Map"
          className={styles.mapImage}
        />
      </div>

      {/* Card 3: Speakers, Sponsors, Venues, Food */}
      {renderList((eventData as any).speakers || [], "Speakers")}
      {renderList((eventData as any).sponsors || [], "Sponsors")}
      {renderList((eventData as any).venues || [], "Venues")}
      {renderList((eventData as any).foods || [], "Foods")}

      {/* Card 4: Event Description */}
      <div className={styles.card}>
        <h3 className={styles.sectionHeading}>Event Description</h3>
        <p className={styles.description}>{(eventData as any).description}</p>
      </div>
    </div>
  );
};

export default EventDetails;
