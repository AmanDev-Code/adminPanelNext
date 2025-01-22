import React from "react";
import { useRouter } from "next/router";
import styles from "./CommunityList.module.scss";
import { PanelContent } from "@/components";

const CommunityList: React.FC = () => {
  const router = useRouter();

  const communities = [
    {
      id: 1,
      name: "Startup Talks",
      image: "https://res.cloudinary.com/dg7ovb7da/image/upload/w_500,h_300,c_fill/myprivate/banner1.jpg",
    },
    {
      id: 2,
      name: "Health and Wellness Summit",
      image: "https://res.cloudinary.com/dg7ovb7da/image/upload/w_500,h_300,c_fill/myprivate/banner1.jpg",
    },
  ];

  const handleCommunityClick = (id: number) => {
    router.push(`/community`); // Navigate to the community page
  };

  const handleCreateCommunity = () => {
    router.push("/create-community"); // Navigate to the Create Community Page
  };

  return (
    <PanelContent headerContent>
    <div className={styles.communityList}>
      <h2>My Communities</h2>
      <div className={styles.communityGrid}>
        {/* Existing Communities */}
        {communities.map((community) => (
          <div
            key={community.id}
            className={styles.communityCard}
            onClick={() => handleCommunityClick(community.id)}
          >
            <img src={community.image} alt={community.name} />
            <p>{community.name}</p>
          </div>
        ))}

        {/* Create Community */}
        <div
          className={styles.createCommunityCard}
          onClick={handleCreateCommunity}
        >
          <div className={styles.plusIcon}>+</div>
        </div>
      </div>
    </div>
    </PanelContent>
  );
};

export default CommunityList;
