import React, { useState } from "react";
import { PanelContent } from "@/components";
import { FaTrash, FaUpload } from "react-icons/fa";
import styles from "./CommunityCreation.module.scss";
import CommunityFeed from "./CommunityFeed"; // Import the CommunityFeed component


const CommunityCreation: React.FC = () => {
  const [communityName, setCommunityName] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [isCommunityCreated, setIsCommunityCreated] = useState(false); // State to toggle views

  const [hovering, setHovering] = useState(false);
  const [coreMembers] = useState([
    { id: 1, name: "Aman Ahuja", time: "9:41 AM" },
    { id: 2, name: "Mrinal Kapoor", time: "9:41 AM" },
    { id: 3, name: "Amit Nikhade", time: "9:41 AM" },
    { id: 4, name: "Ashutosh Chandra Jha", time: "9:41 AM" },
    { id: 5, name: "Salman Khan", time: "9:41 AM" },
    { id: 6, name: "Amitabh Bachchan", time: "9:41 AM" },
  ]);
  const handleCoverImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    }
  };

  const handleDeleteImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
  };

  const handleHover = (state: boolean) => {
    setHovering(state);
  };

  const handleCreateCommunity = () => {
    if (!communityName || !selectedEvent || !coverImage) {
      alert("Please complete all required fields!");
      return;
    }
    setIsCommunityCreated(true); // Toggle to community feed page

    console.log("Community Created:", {
      communityName,
      selectedEvent,
      coverImage,
    });
  };

  if (isCommunityCreated) {
    return <CommunityFeed />; // Render the Community Feed Page
  }

  return (
    <PanelContent headerContent title="Create Community">
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          {/* Left Section */}
          <div className={styles.leftSection}>
            <h2 className={styles.title}>Create Community</h2>

            <div className={styles.formGroup}>
              <label htmlFor="communityName">Community Name</label>
              <input
                type="text"
                id="communityName"
                value={communityName}
                onChange={(e) => setCommunityName(e.target.value)}
                placeholder="Community Name"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="selectEvent">Select Event</label>
              <select
                id="selectEvent"
                value={selectedEvent || ""}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="" disabled>
                  Choose Event
                </option>
                <option value="event_1">Tech Innovators Meetup</option>
                <option value="event_2">Health and Wellness Summit</option>
              </select>
            </div>

            <div
              className={styles.uploadSection}
              onMouseEnter={() => handleHover(true)}
              onMouseLeave={() => handleHover(false)}
            >
              <div className={styles.uploadBox}>
                {coverImagePreview ? (
                  <div className={styles.imagePreviewContainer}>
                    <img
                      src={coverImagePreview}
                      alt="Uploaded Cover"
                      className={styles.coverPreview}
                    />
                    {hovering && (
                      <div className={styles.hoverActions}>
                        <button
                          className={styles.deleteButton}
                          onClick={handleDeleteImage}
                          title="Delete Image"
                        >
                          <FaTrash />
                        </button>
                        <button
                          className={styles.uploadButton}
                          title="Upload New Image"
                        >
                          <label htmlFor="coverImage">
                            <FaUpload />
                          </label>
                          <input
                            type="file"
                            id="coverImage"
                            accept="image/*"
                            onChange={handleCoverImageUpload}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <label htmlFor="coverImage">Click to Upload</label>
                    <p>Add an Event Banner</p>
                    <input
                      type="file"
                      id="coverImage"
                      accept="image/*"
                      onChange={handleCoverImageUpload}
                    />
                  </>
                )}
              </div>
              <p className={styles.uploadHint}>
                Feature Image must be at least 1170 pixels wide by 504 pixels
                high.
                <br />
                Valid file formats: JPG, GIF, PNG.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className={styles.divider}></div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <h3>Add Members</h3>
            <ul className={styles.memberList}>
              {coreMembers.map((member) => (
                <li key={member.id}>
                  <div className={styles.memberAvatar}>
                    <img
                      src={`https://via.placeholder.com/40`}
                      alt={member.name}
                    />
                  </div>
                  <div className={styles.memberDetails}>
                    <span>{member.name}</span>
                    <span>{member.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          className={styles.createButton}
          onClick={handleCreateCommunity}
        >
          Create Community
        </button>
      </div>
    </PanelContent>
  );
};

export default CommunityCreation;
