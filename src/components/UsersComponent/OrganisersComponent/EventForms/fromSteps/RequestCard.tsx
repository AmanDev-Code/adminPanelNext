import React from "react";
import styles from "./styles/requestCard.module.scss";

interface RequestCardProps {
  name: string;
  type: string;
  image: string;
  onAccept: () => void;
  onReject: () => void;
  onClick: () => void; // New prop for handling clicks
}

const RequestCard: React.FC<RequestCardProps> = ({ name, type, image, onAccept, onReject, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}> {/* Click triggers profile view */}
      <div className={styles.innerFlex}>
        {/* Image Section */}
        <div className={styles.imageContainer}>
          <img src={image} alt={`${name} profile`} />
        </div>

        {/* Details Section */}
        <div className={styles.detailsFlex}>
          <p>
            <strong>{name}</strong> sent you a <strong>{type}</strong> request
          </p>
        </div>

        {/* Buttons Section */}
        <div className={styles.buttonsFlex}>
          <button className={styles.acceptButton} onClick={(e) => { e.stopPropagation(); onAccept(); }}>
            Add
          </button>
          <button className={styles.rejectButton} onClick={(e) => { e.stopPropagation(); onReject(); }}>
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
