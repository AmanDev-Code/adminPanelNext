import React from "react";
import { useRouter } from "next/router";
import { PanelContent } from "@/components";
import styles from "./OrganisersEvent.module.scss";

const OrganisersEvent: React.FC = () => {
  const router = useRouter();
  const eventData = router.query.eventData
    ? JSON.parse(router.query.eventData as string)
    : null;

  if (!eventData) {
    return <div>Loading...</div>;
  }

  const { Step1, Step2, Step3, Step4 } = eventData;

  const attendeeData = [
    { name: "Aman Ahuja", email: "aman@example.com", phone: "91-456-7890" },
    { name: "Mrinal Kapoor", email: "mrinal@example.com", phone: "91-654-3210" },
    { name: "Amit Nikhade", email: "amit@example.com", phone: "91-789-0123" },
    { name: "Ashutosh Jha", email: "ashutosh@example.com", phone: "91-789-0123" },
    { name: "Sakshi", email: "sakshi@example.com", phone: "91-789-0123" },
    { name: "Risha", email: "risha@example.com", phone: "91-789-0123" },
  ];

  const downloadCSV = () => {
    const csvRows = [
      ["Name", "Email Id", "Phone No."],
      ...attendeeData.map((row) => [row.name, row.email, row.phone]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvRows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "attendee_details.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <PanelContent headerContent title="">
      <div className={styles.mainContainer}>
        {/* Left Section: OrganisersEvent Content */}
        <div className={styles.leftSection}>
          <div className={styles.container}>
            {/* Card 1: Banner and Basic Info */}
            <div className={styles.card}>
              <img
                src={Step2.bannerImage}
                alt="Event Banner"
                className={styles.bannerImage}
              />
              <div className={styles.cardContent}>
                <h2 className={styles.eventName}>{Step1.eventName}</h2>
                <p className={styles.eventType}>
                  Price: {Step3.ticketPrice === "0" ? "FREE" : `INR ${Step3.ticketPrice}`}
                </p>
                <h3 className={styles.sectionHeading}>Date and Time</h3>
                <div className={styles.datetime}>
                  <i className={`fas fa-calendar ${styles.icon}`} />
                  <span>{Step1.startDate}</span>
                </div>
                <div className={styles.datetime}>
                  <i className={`fas fa-clock ${styles.icon}`} />
                  <span>
                    {Step1.startTime} - {Step1.endTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Venue */}
            <div className={styles.card}>
              <h3 className={styles.sectionHeading}>Venue</h3>
              <div className={styles.location}>
                <i className={`fas fa-map-marker-alt ${styles.icon}`} />
                <p>{Step1.location}</p>
              </div>
              <img
                src={
                  Step4.acceptedRequests.find((req) => req.type === "Venue")?.image ||
                  "https://via.placeholder.com/150"
                }
                alt="Venue Map"
                className={styles.mapImage}
              />
            </div>

            {/* Card 3: Organizer, Speaker, Sponsor */}
            <div className={styles.card}>
              <h3 className={styles.sectionHeading}>Organizer</h3>
              <div className={styles.inlineInfo}>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Organizer"
                  className={styles.profileImage}
                />
                <span className={styles.inlineText}>Organizer Name</span>
              </div>

              <div className={styles.gridContainer}>
                {["Speakers", "Sponsors", "Venue", "Food"].map((type, index) => {
                  const item = Step4.acceptedRequests.find((req) => req.type === type);
                  return (
                    <div className={styles.gridItem} key={index}>
                      <h3 className={styles.sectionHeading}>{type}</h3>
                      {item ? (
                        <div className={styles.inlineInfo}>
                          <img
                            src={item.image}
                            alt={item.name}
                            className={styles.profileImage}
                          />
                          <span className={styles.inlineText}>{item.name}</span>
                        </div>
                      ) : (
                        <span className={styles.inlineText}>No {type} Info</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Card 4: Event Description */}
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
              <button onClick={downloadCSV} className={styles.downloadButton}>
                Download CSV
              </button>
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
                {attendeeData.map((attendee, index) => (
                  <tr key={index}>
                    <td>{attendee.name}</td>
                    <td>{attendee.email}</td>
                    <td>{attendee.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PanelContent>
  );
};

export default OrganisersEvent;
