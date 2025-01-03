import React from "react";
import styles from "./styles/Step2.module.scss";

interface Step2Props {
  data: Record<string, any>; // Ensure data is always an object
  onDataChange: (data: any) => void;
}

const Step2: React.FC<Step2Props> = ({ data = {}, onDataChange }) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onDataChange({ ...data, bannerImage: file });
    }
  };

  return (
    <div className={styles.step2Container}>
      <h2 className={styles.heading}>Add An Event Banner</h2>
      <div className={styles.uploadContainer}>
        <label className={styles.uploadField}>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          {data?.bannerImage ? (
            <span>{data.bannerImage.name}</span>
          ) : (
            <span>Upload Banner Image</span>
          )}
        </label>
      </div>
      <p className={styles.instructions}>
        Feature Image must be at least 1170 pixels wide by 504 pixels high.
        <br />
        Valid file formats: JPG, GIF, PNG.
      </p>
    </div>
  );
};

export default Step2;
