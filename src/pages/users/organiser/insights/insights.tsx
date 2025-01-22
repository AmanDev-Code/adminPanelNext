import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getItem, PanelContent } from "@/components";
import Overview from "@/components/overview/Overview";
import Help from "@/components/help/Help";
import { Box } from "@mui/material";
import styles from "./AdminDashboard.module.css";
import { useUser } from "../../../../components/context/UserContext"; // Importing context


const Insights = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "help">("overview");
  const router = useRouter();
  const { user } = useUser(); // Using user context


//   useEffect(() => {
//     // Get user data from local storage
//     console.log("User Data from Context:", user);

    
//     // Check if token is valid
//     if (!user || user.token !== 12341210 || user.role !== "admin") {
//       console.log("Unauthorized access. Redirecting to admin login...");
//       router.replace("/admin"); // Redirect to admin login
//     }
//   }, [user, router]);

  return (
    <PanelContent headerContent>
      <div className={styles.mainContainer}></div>
      {/* Tab Navigation */}
      <Box className="scrollableContent">
        <Box className={styles.tabContainer}>
          <div
            className={`${styles.tab} ${activeTab === "overview" ? styles.active : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </div>
          <div
            className={`${styles.tab} ${activeTab === "help" ? styles.active : ""}`}
            onClick={() => setActiveTab("help")}
          >
            Help
          </div>
          <div
            className={styles.indicator}
            style={{
              transform: `translateX(${activeTab === "overview" ? "0%" : "100%"})`,
            }}
          />
        </Box>

        {/* Tab Content */}
        <Box>
          {activeTab === "overview" && <Overview />}
          {activeTab === "help" && <Help />}
        </Box>
      </Box>
    </PanelContent>
  );
};

export default Insights;
