import { useState, useRef, useEffect } from "react";
import styles from "./YourDetails.module.scss";
import CryptoJS from "crypto-js";
import imageCompression from "browser-image-compression";
import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

const YourDetails = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedWhoCanSee, setSelectedWhoCanSee] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const SECRET_KEY = "convene"; // Replace with your actual secret key
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to the dropdown
  const [interests, setInterests] = useState([
    "Tech Conferences",
    "Startup Events",
    "Gadget Expos",
  ]);
  const [socialHandles, setSocialHandles] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    whatsapp: "",
  });

  const whoCanSeeOptions = [
    "Everyone",
    "Organisers",
    "Speakers",
    "Sponsors",
    "Venue Providers",
    "Food Providers",
    "Attendees",
  ];

  const generateShortKey = (base64Image: string) => {
    // Generate a fixed-length hash for the image
    return CryptoJS.SHA256(base64Image)
      .toString(CryptoJS.enc.Base64)
      .substring(0, 10);
  };

  useEffect(() => {
    const encryptedImage = localStorage.getItem("profileImage");

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // Close the dropdown
      }
    };

    if (encryptedImage) {
        try {
          // Decrypt the compressed base64 string
          const decryptedCompressedBase64 = CryptoJS.AES.decrypt(
            encryptedImage,
            SECRET_KEY
          ).toString(CryptoJS.enc.Utf8);
  
          // Decompress the base64 string
          const originalBase64Image = decompressFromEncodedURIComponent(decryptedCompressedBase64);
  
          if (originalBase64Image) {
            setProfileImage(originalBase64Image);
          }
        } catch (error) {
          console.error("Error decrypting or decompressing the image:", error);
        }
      }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

   // Utility: Convert file to Base64
   const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Compress the image file
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.1, // Target file size (100KB)
          maxWidthOrHeight: 800, // Max dimensions in pixels
          useWebWorker: true,
        });

        // Convert compressed file to base64
        const base64Image = await fileToBase64(compressedFile);

        // Compress the base64 string further
        const compressedBase64 = compressToEncodedURIComponent(base64Image);

        // Encrypt the compressed base64 string
        const encryptedImage = CryptoJS.AES.encrypt(compressedBase64, SECRET_KEY).toString();

        // Store encrypted image in localStorage
        localStorage.setItem("profileImage", encryptedImage);

        // Update the profile image preview
        setProfileImage(base64Image);
      } catch (error) {
        console.error("Error compressing or encrypting the image:", error);
      }
    }
  };

  const handleClickImageWrapper = () => {
    const fileInput = document.getElementById("imageUpload") as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };



  const handleDeleteImage = () => {
    localStorage.removeItem("profileImage");
    // localStorage.removeItem("profileKey");
    setProfileImage("/assets/defaultprofile.jpg");
    console.log("Image deleted successfully");
  };

  const toggleWhoCanSeeOption = (option: string) => {
    if (selectedWhoCanSee.includes(option)) {
      setSelectedWhoCanSee(selectedWhoCanSee.filter((item) => item !== option));
    } else {
      setSelectedWhoCanSee([...selectedWhoCanSee, option]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <div className={styles.detailsContainer}>
      <h2 className={styles.sectionHeading}>Your Details</h2>
      <div className={styles.formContainer}>
        <div className={styles.leftSection}>
          {/* Name Field */}
          <div className={styles.formGroup}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder=" "
              className={styles.inputField}
            />
            <label className={styles.label}>Name</label>
          </div>

          {/* Bio Field */}
          <div className={styles.formGroup}>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder=" "
              className={`${styles.inputField} ${styles.textarea}`}
            />
            <label className={styles.label}>Bio</label>
          </div>

          {/* Email Field */}
          <div className={styles.formGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className={styles.inputField}
            />
            <label className={styles.label}>Email</label>
          </div>

          {/* Phone Field */}
          <div className={styles.formGroup}>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder=" "
              className={styles.inputField}
            />
            <label className={styles.label}>Phone Number</label>
          </div>

          {/* Divider */}
          <hr className={styles.divider} />

          {/* Social Handles */}
          <h3 className={styles.sectionHeading}>Your Social Handles</h3>
          {Object.entries(socialHandles).map(([key, value]) => (
            <div key={key} className={styles.formGroup}>
              <input
                type="text"
                value={value}
                onChange={(e) =>
                  setSocialHandles({ ...socialHandles, [key]: e.target.value })
                }
                placeholder=""
                className={styles.inputField}
              />
              <label className={styles.label}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
            </div>
          ))}

          {/* Divider */}
          <hr className={styles.divider} />

          {/* Who Can See My Details */}
          <h3 className={styles.sectionHeading}>Who Can See My Details</h3>
          <div className={styles.dropdownWrapper} ref={dropdownRef}>
            <div
              className={styles.inputField}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span>
                {selectedWhoCanSee.length > 0
                  ? `${selectedWhoCanSee.length} selected`
                  : "Select an option"}
              </span>
              <i className={`${styles.dropdownIcon} fas fa-chevron-down`}></i>
            </div>
            {dropdownOpen && (
              <ul className={styles.dropdownMenu}>
                {whoCanSeeOptions.map((option) => (
                  <li key={option} className={styles.dropdownItem}>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={selectedWhoCanSee.includes(option)}
                        onChange={() => toggleWhoCanSeeOption(option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Divider */}
          <hr className={styles.divider} />

          <h3 className={styles.sectionHeading}>Interests</h3>
          <div className={styles.interestsContainer}>
            {[
              "Tech Conferences",
              "Startup Events",
              "Gadget Expos",
              "AI Workshops",
              "Networking Events",
            ].map((interest) => (
              <div
                key={interest}
                className={`${styles.interest} ${
                  interests.includes(interest) ? styles.selected : ""
                }`}
                onClick={() => toggleInterest(interest)}
              >
                {interest}
              </div>
            ))}
            <button className={styles.addMoreButton}>+ Add More</button>
          </div>
        </div>

        <div className={styles.rightSection}>
        <div
          className={styles.imageWrapper}
          onClick={handleClickImageWrapper}
          role="button"
          tabIndex={0}
        >
          <img src={profileImage || "/assets/defaultprofile.jpg"} alt="Avatar" className={styles.profileImage} />
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            className={styles.imageUploadInput}
            onChange={handleImageUpload}
          />
        </div>
        <button className={styles.deleteButton} onClick={handleDeleteImage}>
          Remove Image
        </button>
      </div>
      </div>

      <button className={styles.saveButton}>Save & Continue</button>
    </div>
  );
};

export default YourDetails;
