import React from "react";
import styles from "./styles/requestCard.module.scss";

interface RequestCardProps {
  name: string;
  type: string;
  image: string;
  onAccept: () => void;
  onReject: () => void;
  onClick: () => void;
  isAccepted: boolean; // New prop to track if the request is accepted
}

const RequestCard: React.FC<RequestCardProps> = ({
  name,
  type,
  image,
  onAccept,
  onReject,
  onClick,
  isAccepted,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.innerFlex}>
        <div className={styles.imageContainer}>
          <img src={image} alt={`${name} profile`} />
        </div>
        <div className={styles.detailsFlex}>
          <p>
            <strong>{name}</strong> sent you a <strong>{type}</strong> request
          </p>
        </div>
        <div className={styles.buttonsFlex}>
          {isAccepted ? (
            <button className={styles.addedButton} disabled>
              Added
            </button>
          ) : (
            <>
              <button
                className={styles.acceptButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onAccept();
                }}
              >
                Add
              </button>
              <button
                className={styles.rejectButton}
                onClick={(e) => {
                  e.stopPropagation();
                  onReject();
                }}
              >
                View More
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
