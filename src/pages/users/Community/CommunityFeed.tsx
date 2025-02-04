import React, { useState } from "react";
import styles from "./CommunityFeed.module.scss";
import { FaImage, FaSmile, FaPollH, FaCalendarAlt } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { PanelContent } from "@/components";

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: "Aman Ahuja",
        username: "@AmanAhuja",
        profilePic: "https://media.licdn.com/dms/image/v2/D5603AQEp2hOwS1PKwg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728817685180?e=2147483647&v=beta&t=0fFgoAnbaI8nHF2kjZt46AKGvxDmsk-pFcLlmUkyZhU",
      },
      content:
        "There is a big event happening in HSR 6th sector at IntelliCredence office. Details are mentioned below, have a look and share it with your friends too.",
      image: "https://res.cloudinary.com/dg7ovb7da/image/upload/w_500,h_300,c_fill/myprivate/banner1.jpg",
      likes: 6200,
      shares: 61,
      comments: 12,
      time: "23s",
    },
    {
      id: 2,
      user: {
        name: "Aman Ahuja",
        username: "@AmanAhuja",
        profilePic: "https://media.licdn.com/dms/image/v2/D5603AQEp2hOwS1PKwg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728817685180?e=2147483647&v=beta&t=0fFgoAnbaI8nHF2kjZt46AKGvxDmsk-pFcLlmUkyZhU",
      },
      content:
        "There is a big event happening in HSR 6th sector at IntelliCredence office. Details are mentioned below, have a look and share it with your friends too.",
      image: "https://res.cloudinary.com/dg7ovb7da/image/upload/w_500,h_300,c_fill/myprivate/banner1.jpg",
      likes: 1200,
      shares: 41,
      comments: 8,
      time: "23s",
    },
  ]);

  const [activeMembers] = useState([
    { name: "Aman Ahuja", time: "9:41 AM", profilePic: "https://media.licdn.com/dms/image/v2/D5603AQEp2hOwS1PKwg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728817685180?e=2147483647&v=beta&t=0fFgoAnbaI8nHF2kjZt46AKGvxDmsk-pFcLlmUkyZhU" },
    { name: "Mrinal Kapoor", time: "9:41 AM", profilePic: "https://media.licdn.com/dms/image/v2/D5603AQEp2hOwS1PKwg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728817685180?e=2147483647&v=beta&t=0fFgoAnbaI8nHF2kjZt46AKGvxDmsk-pFcLlmUkyZhU" },
    { name: "Amit Nikhade", time: "9:41 AM", profilePic: "https://media.licdn.com/dms/image/v2/D5603AQEp2hOwS1PKwg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728817685180?e=2147483647&v=beta&t=0fFgoAnbaI8nHF2kjZt46AKGvxDmsk-pFcLlmUkyZhU" },
    { name: "Ashutosh Chandra Jha", time: "9:41 AM", profilePic: "https://media.licdn.com/dms/image/v2/D5603AQEp2hOwS1PKwg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728817685180?e=2147483647&v=beta&t=0fFgoAnbaI8nHF2kjZt46AKGvxDmsk-pFcLlmUkyZhU" },
  ]);

  // Handlers for interactive buttons
  const handleLike = (postId: number) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleShare = (postId: number) => {
    console.log(`Post ${postId} shared!`);
  };

  const handleComment = (postId: number) => {
    console.log(`Open comments for post ${postId}`);
  };

  const handlePostOptionClick = (option: string) => {
    console.log(`Selected option: ${option}`);
  };

  return (
    <PanelContent headerContent title="Community Feed">
    <div className={styles.communityFeed}>
      <div className={styles.leftSection}>
        {/* Posting Section */}
        <div className={styles.postingSection}>
          <img
            src="https://media.licdn.com/dms/image/v2/D5603AQEp2hOwS1PKwg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1728817685180?e=2147483647&v=beta&t=0fFgoAnbaI8nHF2kjZt46AKGvxDmsk-pFcLlmUkyZhU"
            alt="Profile"
            className={styles.profilePic}
          />
          <textarea placeholder="What's happening?" />
          <div className={styles.postingActions}>
            <div className={styles.iconGroup}>
              <button
                onClick={() => handlePostOptionClick("image")}
                className={styles.actionButton}
              >
                <FaImage />
              </button>
              <button
                onClick={() => handlePostOptionClick("emoji")}
                className={styles.actionButton}
              >
                <FaSmile />
              </button>
              <button
                onClick={() => handlePostOptionClick("poll")}
                className={styles.actionButton}
              >
                <FaPollH />
              </button>
              <button
                onClick={() => handlePostOptionClick("calendar")}
                className={styles.actionButton}
              >
                <FaCalendarAlt />
              </button>
            </div>
            <button className={styles.postButton}>
              Post <IoMdSend />
            </button>
          </div>
        </div>

        {/* Posts Section */}
        <div className={styles.posts}>
          {posts.map((post) => (
            <div className={styles.post} key={post.id}>
              <img
                src={post.user.profilePic}
                alt="Profile"
                className={styles.profilePic}
              />
              <div className={styles.postContent}>
                <div className={styles.postHeader}>
                  <span className={styles.name}>{post.user.name}</span>
                  <span className={styles.username}>{post.user.username}</span>
                  <span className={styles.time}>{post.time}</span>
                </div>
                <p className={styles.text}>{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post Media"
                    className={styles.postImage}
                  />
                )}
                <div className={styles.postActions}>
                  <button
                    onClick={() => handleComment(post.id)}
                    className={styles.actionButton}
                  >
                    💬 {post.comments}
                  </button>
                  <button
                    onClick={() => handleShare(post.id)}
                    className={styles.actionButton}
                  >
                    🔄 {post.shares}
                  </button>
                  <button
                    onClick={() => handleLike(post.id)}
                    className={styles.actionButton}
                  >
                    ❤️ {post.likes}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className={styles.rightSection}>
        <h3>Active Members</h3>
        <ul className={styles.memberList}>
          {activeMembers.map((member, index) => (
            <li key={index} className={styles.member}>
              <img
                src={member.profilePic}
                alt={member.name}
                className={styles.memberPic}
              />
              <div className={styles.memberDetails}>
                <span className={styles.name}>{member.name}</span>
                <span className={styles.time}>{member.time}</span>
              </div>
              <div className={styles.onlineIndicator}></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </PanelContent>
  );
};

export default CommunityFeed;