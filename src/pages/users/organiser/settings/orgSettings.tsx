import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PanelContent } from "@/components";
// import ProfileUpdate from "@/components/Settings/ProfileUpdate"; // Adjust the path if necessary
// import Interests from "@/components/Settings/Interests";
// import Collaborators from "@/components/Settings/Collaborators";
// import AccountManagement from "@/components/Settings/AccountManagement";
// import PaymentMethods from "@/components/Settings/PaymentMethods";

// import Ongoing from "@/components/Organisers/OrganisersDashboard/Ongoing";
import PreviousEvent from "@/components/UsersComponent/OrganisersComponent/PreviousEvent/PreviousEvent";
import Request from "@/components/UsersComponent/OrganisersComponent/Requests/Request";
import Recommendations from "@/components/Organisers/OrganisersDashboard/Recommedations";
import EventForm from "@/components/Organisers/OrganisersDashboard/EventForm"; // Adjust the path if necessary
import styles from "./settings.module.css";
import { Box } from "@mui/material";
import ProfileUpdate from "@/components/Organisers/Settings/ProfileUpdate";
import Collaborators from "@/components/UsersComponent/OrganisersComponent/Settings/Collaborators";
import ManageAccount from "@/components/UsersComponent/OrganisersComponent/Settings/ManageAccount";
import PaymentMethods from "@/components/UsersComponent/OrganisersComponent/Settings/PaymentMethods";

const Settings = () => {
  const [activeTab, setActiveTab] = useState<
    "Profile Update" | "Collaborators" | "Account Management" | "Payment Methods"
  >("Profile Update");
  const router = useRouter();

  // useEffect(() => {
  //   // Validate user token
  //   const userData = JSON.parse(localStorage.getItem("userdata") || "{}");
  //   if (userData?.token !== 12341212) {
  //     router.push("/userlogin"); // Redirect to login if token is invalid
  //   }
  // }, [router]);

  const tabs = [
    { name: "Profile Update", component: <ProfileUpdate /> },
    { name: "Collaborators", component: <Collaborators /> },
    { name: "Account Management", component: <ManageAccount /> },
    { name: "Payment Methods", component: <PaymentMethods /> },
  ];

  const activeTabIndex = tabs.findIndex((tab) => tab.name === activeTab);

  return (
    <PanelContent headerContent>
      <h2 className={styles.pageTitle}>Change is always better</h2>
      <Box className="scrollableContent">
        {/* Tab Navigation */}
        <Box className={styles.tabContainer}>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`${styles.tab} ${activeTab === tab.name ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.name as typeof activeTab)}
            >
              {tab.name}
            </div>
          ))}
          <div
            className={styles.indicator}
            style={{
              transform: `translateX(${activeTabIndex * 100}%)`,
              width: `${100 / tabs.length}%`,
            }}
          />
        </Box>

        {/* Render the active tab content */}
        <Box>
          {tabs.map((tab, index) => (
            <div key={index} style={{ display: activeTab === tab.name ? "block" : "none" }}>
              {tab.component}
            </div>
          ))}
        </Box>
      </Box>
    </PanelContent>
  );
};

export default Settings;
