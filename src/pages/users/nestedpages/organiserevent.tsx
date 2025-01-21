import React from "react";
import { useRouter } from "next/router";
import { PanelContent } from "@/components";
import styles from "./OrganisersEvent.module.scss";

const OrganisersEvent: React.FC = () => {
  const router = useRouter();
  const { eventData } = router.query;

  // Parse event data from query
  const event = eventData ? JSON.parse(eventData as string) : null;

  if (!event) {
    return <div>Loading...</div>;
  }

  const { name, date, venue, time, price, attendees, image } = event;

  return (
    <PanelContent headerContent title="Event Details">
      <div className={styles.mainContainer}>
        {/* Left Section: OrganisersEvent Content */}
        <div className={styles.leftSection}>
          <div className={styles.container}>
            {/* Card 1: Banner and Basic Info */}
            <div className={styles.card}>
              <img
                src={image}
                alt="Event Banner"
                className={styles.bannerImage}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.eventName}>{name}</h2>
                <p className={styles.eventType}>{price === "FREE" ? "FREE" : `INR ${price}`}</p>
                <h3 className={styles.sectionHeading}>Date and Time</h3>
                <div className={styles.datetime}>
                  <i className={`fas fa-calendar ${styles.icon}`} />
                  <span>{date.full}</span>
                </div>
                <div className={styles.datetime}>
                  <i className={`fas fa-clock ${styles.icon}`} />
                  <span>{time}</span>
                </div>
              </div>
            </div>

            {/* Card 2: Venue */}
            <div className={styles.card}>
              <h3 className={styles.sectionHeading}>Venue</h3>
              <div className={styles.location}>
                <i className={`fas fa-map-marker-alt ${styles.icon}`} />
                <p>{venue}</p>
              </div>
            </div>

            {/* Card 3: Event Description */}
            <div className={styles.card}>
              <h3 className={styles.sectionHeading}>Event Description</h3>
              <p className={styles.description}>This is the event description.</p>
            </div>
          </div>
        </div>

        {/* Right Section: Attendee Details */}
        <div className={styles.rightSection}>
          <div className={styles.attendeeTableContainer}>
            <div className={styles.tableHeader}>
              <h3>Attendee Details</h3>
              <button className={styles.downloadButton}>Download CSV</button>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email Id</th>
                  <th>Phone No.</th>
                </tr>
              </thead>
              <tbody>
                {/* Dummy attendee data */}
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td>91-9876543210</td>
                </tr>
                {/* Add more attendee rows */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PanelContent>
  );
};

export default OrganisersEvent;
