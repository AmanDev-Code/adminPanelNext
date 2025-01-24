import React, { useState } from "react";
import styles from "./requestCard.module.scss";
import CategoryDialog from "./CategoryDialog";

interface RequestCardProps {
  name: string;
  type: string;
  image: string;
  onAccept: (category: string) => void; // Handles category selection
  onReject: () => void;
  onClick: () => void; // Handles opening the detailed profile
  platinumSelected: boolean; // Restricts Platinum category globally
}

const RequestCard: React.FC<RequestCardProps> = ({
  name,
  type,
  image,
  onAccept,
  onReject,
  onClick,
  platinumSelected,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false); // Controls dialog visibility

  const handleDialogClose = () => {
    setDialogOpen(false); // Ensures dialog is closed
  };

  const handleCategoryConfirm = (category: string) => {
    console.log(`Category selected: ${category}`);
    onAccept(category); // Pass the selected category
    setDialogOpen(false); // Close the dialog after confirmation
  };

  return (
    <div
      className={styles.card}
      onClick={(e) => {
        if (!dialogOpen) {
          console.log("Card clicked");
          onClick(); // Trigger parent onClick only when dialog is not open
        }
      }}
    >
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
        <div
          className={styles.buttonsFlex}
          onClick={(e) => e.stopPropagation()} // Prevent propagation to the parent
        >
          <button
            className={styles.acceptButton}
            onClick={(e) => {
              e.stopPropagation(); // Stop propagation to the parent container
              if (!dialogOpen) {
                console.log("Opening dialog");
                setDialogOpen(true); // Open dialog only if not already open
              }
            }}
          >
            Accept
          </button>
          <button
            className={styles.rejectButton}
            onClick={(e) => {
              e.stopPropagation(); // Stop propagation to the parent container
              console.log("Reject button clicked");
              onReject();
            }}
          >
            Reject
          </button>
        </div>
      </div>

      {/* Category Dialog */}
      {dialogOpen && (
        <div
          onClick={(e) => e.stopPropagation()} // Prevent dialog click from propagating
        >
          <CategoryDialog
            open={dialogOpen}
            onClose={handleDialogClose}
            onConfirm={handleCategoryConfirm}
            platinumSelected={platinumSelected}
          />
        </div>
      )}
    </div>
  );
};

export default RequestCard;
