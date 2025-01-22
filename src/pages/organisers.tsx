import { PanelContent } from "@/components";
import React, { useState } from "react";
import OrganisersList from "@/components/UsersComponent/AdminComponent/OrganisersList";
import ToggleSection from "@/components/UsersComponent/AdminComponent/ToggleSection";
import EarningsSection from "@/components/UsersComponent/AdminComponent/EarningsSection";
import EventsSection from "@/components/UsersComponent/AdminComponent/EventsSection";
import CommunitiesSection from "@/components/UsersComponent/AdminComponent/CommunitiesSection";
import DeleteAccountButton from "@/components/UsersComponent/AdminComponent/DeleteAccountButton";

import styles from "./organisersPage.module.scss";

type Organiser = {
  name: string;
  rating: number;
  events: number;
  communities: number;
  emoji: string;
  earnings: string;
  withdrawals: string;
};

// Organisers data with earnings and withdrawals
const organisers: Organiser[] = [
  {
    name: "Aman Ahuja",
    rating: 4.0,
    events: 15,
    communities: 10,
    emoji: "👨‍💼",
    earnings: "₹2,50,000.00",
    withdrawals: "₹50,000.00",
  },
  {
    name: "Sofia Singh",
    rating: 4.5,
    events: 12,
    communities: 14,
    emoji: "👩‍💼",
    earnings: "₹3,00,000.00",
    withdrawals: "₹70,000.00",
  },
  {
    name: "Ravi Sharma",
    rating: 4.3,
    events: 20,
    communities: 8,
    emoji: "👨‍💼",
    earnings: "₹1,80,000.00",
    withdrawals: "₹40,000.00",
  },
];

const OrganisersPage: React.FC = () => {
  // State to track selected organizer
  const [selectedOrganiser, setSelectedOrganiser] = useState(organisers[0]);

  // State to track toggle states for each organizer
  const [organiserToggles, setOrganiserToggles] = useState(() =>
    organisers.reduce((acc, organiser) => {
      acc[organiser.name] = [false, false, false, false, false, false]; // 6 toggles all off initially
      return acc;
    }, {} as Record<string, boolean[]>)
  );

  // Handler to update toggles for the selected organizer
  const updateToggle = (index: number, value: boolean) => {
    setOrganiserToggles((prevState: Record<string, boolean[]>) => ({
      ...prevState,
      [selectedOrganiser.name]: prevState[selectedOrganiser.name].map((state: boolean, i: number) =>
        i === index ? value : state
      ),
    }));
  };

  return (
    <PanelContent headerContent title="">
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          {/* <header className={styles.header}>
            <h1>Organizer Management</h1>
            <p>Manage your organizers here, in one place.</p>
          </header> */}
          <main className={styles.main}>
            {/* OrganisersList */}
            <OrganisersList
              organisers={organisers}
              selectedOrganiser={selectedOrganiser}
              setSelectedOrganiser={(organiser) => {
                // Type assertion to ensure organiser matches the expected type
                const typedOrganiser = organiser as typeof selectedOrganiser;
                setSelectedOrganiser(typedOrganiser);
              }}
            />
            
            {/* ToggleSection */}
            <ToggleSection
              toggles={organiserToggles[selectedOrganiser.name]}
              updateToggle={updateToggle}
            />

            {/* EarningsSection dynamically updates based on selected organiser */}
            <EarningsSection
              earnings={selectedOrganiser.earnings}
              withdrawals={selectedOrganiser.withdrawals}
            />

            {/* Existing components */}
            <EventsSection />
            <CommunitiesSection />
            <DeleteAccountButton />
          </main>
        </div>
      </div>
    </PanelContent>
  );
};

export default OrganisersPage;
