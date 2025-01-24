import React, { useState, useEffect } from "react";
import styles from "./SummaryDialog.module.scss";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box, IconButton } from "@mui/material";
import { FaCrown, FaMedal, FaStar, FaGem, FaTimes } from "react-icons/fa";

interface SelectionData {
  id: string;
  name: string;
  type: string;
  category: string;
}

interface SummaryDialogProps {
  open: boolean;
  onClose: () => void;
  selections: { [key: string]: SelectionData }; // { id: SelectionData }
  onSubmit: (finalData: { [key: string]: SelectionData }) => void; // Submit final data
}

const SummaryDialog: React.FC<SummaryDialogProps> = ({ open, onClose, selections, onSubmit }) => {
  const [currentSelections, setCurrentSelections] = useState<{ [key: string]: SelectionData }>({});

  // Synchronize the prop 'selections' with local state
  useEffect(() => {
    setCurrentSelections(selections);
  }, [selections]);

  const categorizedSelections = Object.values(currentSelections).reduce(
    (acc: { [key: string]: SelectionData[] }, item) => {
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  const categories = [
    { name: "Platinum", icon: <FaCrown />, color: "#6A0DAD" }, // Royal Purple
    { name: "Gold", icon: <FaMedal />, color: "#FFD700" }, // Gold
    { name: "Silver", icon: <FaStar />, color: "#C0C0C0" }, // Silver
    { name: "Bronze", icon: <FaGem />, color: "#CD7F32" }, // Bronze
  ];

  const handleDelete = (id: string) => {
    const updatedSelections = { ...currentSelections };
    delete updatedSelections[id];
    setCurrentSelections(updatedSelections);
  };

  const handleConfirm = () => {
    console.log(JSON.stringify(currentSelections, null, 2));
    onSubmit(currentSelections); // Pass the final data
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" className={styles.dialogHeading}>
          Review Your Selections
        </Typography>
        <Typography variant="subtitle1" className={styles.dialogSubheading}>
          Confirm the assigned categories before proceeding.
        </Typography>
      </DialogTitle>
      <DialogContent style={{ overflowY: "auto", maxHeight: "70vh", padding: "1rem" }}>
        <div className={styles.summary}>
          {categories.map(({ name, icon, color }) => (
            <Box key={name} className={styles.categorySection} style={{ borderColor: color }}>
              <Box className={styles.categoryHeader} style={{ backgroundColor: `${color}20` }}>
                <span className={styles.categoryIcon} style={{ color }}>
                  {icon}
                </span>
                <Typography variant="h6" className={styles.categoryTitle} style={{ color }}>
                  {name}
                </Typography>
              </Box>
              <ul className={styles.categoryList}>
                {categorizedSelections[name]?.map((item) => (
                  <li key={item.id} className={styles.listItem}>
                    <div>
                      <strong>{item.name}</strong> ({item.type})
                    </div>
                    <IconButton
                      onClick={() => handleDelete(item.id)}
                      className={styles.deleteButton}
                      aria-label="delete"
                    >
                      <FaTimes />
                    </IconButton>
                  </li>
                )) || <li className={styles.noSelection}>No selections</li>}
              </ul>
            </Box>
          ))}
        </div>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose} variant="outlined" className={styles.editButton}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" className={styles.confirmButton}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SummaryDialog;
