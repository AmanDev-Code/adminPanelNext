import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Box } from "@mui/material";
import { FaCrown, FaMedal, FaStar, FaGem } from "react-icons/fa";
import styles from "./CategoryDialog.module.scss";

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (category: string) => void;
  platinumSelected: boolean;
}

const CategoryDialog: React.FC<CategoryDialogProps> = ({ open, onClose, onConfirm, platinumSelected }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleConfirm = () => {
    if (selectedCategory) {
      onConfirm(selectedCategory);
      setSelectedCategory(""); // Reset after confirmation
    }
  };

  const categories = [
    {
      name: "Platinum",
      icon: <FaCrown size={30} />,
      description: "Exclusive sponsor with premium benefits.",
      borderColor: "#6A0DAD", // Royal Purple
      iconColor: "#9B59B6", // Light Purple
      disabled: platinumSelected,
    },
    {
      name: "Gold",
      icon: <FaMedal size={30} />,
      description: "Premium sponsor with gold-tier perks.",
      borderColor: "#FFD700", // Gold
      iconColor: "#FFD700",
    },
    {
      name: "Silver",
      icon: <FaStar size={30} />,
      description: "Sponsor with silver-tier perks.",
      borderColor: "#C0C0C0", // Silver
      iconColor: "#C0C0C0",
    },
    {
      name: "Bronze",
      icon: <FaGem size={30} />,
      description: "Standard sponsor benefits.",
      borderColor: "#CD7F32", // Bronze
      iconColor: "#CD7F32",
    },
  ];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" className={styles.dialogHeading}>
          Choose Sponsor Category
        </Typography>
        <Typography variant="subtitle1" className={styles.dialogSubheading}>
          Select a suitable category to assign exclusive benefits to your sponsor.
        </Typography>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <Box className={styles.categoryContainer}>
          {categories.map((category) => (
            <Box
              key={category.name}
              className={`${styles.categoryCard} ${
                selectedCategory === category.name ? styles.activeCard : ""
              } ${category.disabled ? styles.disabledCard : ""}`}
              onClick={() => !category.disabled && setSelectedCategory(category.name)}
              style={{
                borderColor: category.borderColor,
                backgroundColor: selectedCategory === category.name ? category.borderColor + "40" : "#fff",
              }}
            >
              <div
                className={styles.categoryIcon}
                style={{
                  color: category.iconColor,
                }}
              >
                {category.icon}
              </div>
              <Typography variant="h6" className={styles.categoryName}>
                {category.name}
              </Typography>
              <Typography variant="body2" className={styles.categoryDescription}>
                {category.description}
              </Typography>
              {category.disabled && <div className={styles.disabledOverlay}>Taken</div>}
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button onClick={onClose} variant="text" className={styles.cancelButton}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          disabled={!selectedCategory}
          className={styles.confirmButton}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryDialog;
