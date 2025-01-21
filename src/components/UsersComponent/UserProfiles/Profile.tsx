import React, { useState } from "react";
import styles from "../UserProfileStyles/Profile.module.scss";

interface ProfileProps {
  request: {
    id: number;
    name: string;
    type: string;
    image: string;
  };
  onBack: () => void;
  requests: { id: number; name: string; type: string; image: string }[];
}

const Profile: React.FC<ProfileProps> = ({ request, onBack, requests }) => {
  const [selectedRequest, setSelectedRequest] = useState(request);

  // Dynamically filter out the selected request
  const filteredRequests = requests.filter((req) => req.id !== selectedRequest.id);

  return (
    <div className={styles.container}>
      {/* Left Side: Selected Request Details */}
      <div className={styles.leftSide}>
        <div className={styles.profileCard}>
          {/* Back Button */}
          <button className={styles.backButton} onClick={onBack}>
            ←
          </button>

          {/* Cover Image */}
          <div className={styles.coverImage}>
            <img
              src="https://res.cloudinary.com/dg7ovb7da/image/upload/w_500,h_300,c_fill/myprivate/banner1.jpg"
              alt="Cover"
            />
          </div>

          {/* Profile Image */}
          <div className={styles.profileImageWrapper}>
            <img src={selectedRequest.image} alt="Profile" className={styles.profileImage} />
          </div>

          {/* User Name */}
          <h2 className={styles.userName}>{selectedRequest.name}</h2>

          {/* Stats Card */}
          <div className={styles.statsCard}>
            <div className={styles.stat}>
              <p className={styles.statTitle}>Events</p>
              <p className={styles.statValue}>33</p>
            </div>
            <div className={styles.stat}>
              <p className={styles.statTitle}>Ratings</p>
              <p className={styles.ratings}>
                <span className={styles.starFilled}>★</span>
                <span className={styles.starFilled}>★</span>
                <span className={styles.starFilled}>★</span>
                <span className={styles.starFilled}>★</span>
                <span className={styles.starEmpty}>★</span>
              </p>
            </div>
          </div>

          {/* User Description */}
          <p className={styles.userDescription}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          </p>

          {/* Offerings */}
          <h3 className={styles.offeringsTitle}>Offerings</h3>
          <div className={styles.offerings}>
            <label>
              Funds <input type="checkbox" />
            </label>
            <label>
              Venue <input type="checkbox" />
            </label>
            <label>
              Food <input type="checkbox" />
            </label>
            <label>
              Speaker <input type="checkbox" />
            </label>
          </div>

          {/* Request Text */}
          <p className={styles.requestText}>
            {selectedRequest.name} sent you a {selectedRequest.type} request
          </p>

          {/* Action Buttons */}
          <div className={styles.actionButtons}>
            <button className={styles.acceptButton}>Accept</button>
            <button className={styles.rejectButton}>Decline</button>
          </div>
        </div>
      </div>

      {/* Right Side: Other Requests */}
      <div className={styles.rightSide}>
        <div className={styles.cardContainer}>
          <h3 className={styles.cardListTitle}>Other Requests</h3>
          <div className={styles.cardList}>
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className={styles.card}
                onClick={() => setSelectedRequest(req)} // Update the selected request on click
              >
                <img src={req.image} alt={req.name} className={styles.cardImage} />
                <p className={styles.cardName}>{req.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
