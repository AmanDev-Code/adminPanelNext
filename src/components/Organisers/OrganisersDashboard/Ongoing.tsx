import { FC, useState } from "react";
// import data from "@/data/data.json";
// import BarChart from "@/components/widgets/BarChart";
// import Topics from "@/components/widgets/Topics";
// import Leaderboard from "@/components/widgets/Leaderboard";
import styles from "./Organisers.module.css";
import OngoingEvents from "@/components/UsersComponent/OrganisersComponent/Ongoing/OngoingEvents";

const Ongoing: FC = () => {


  return (
    <div className={styles.container}>
        <OngoingEvents />
    </div>
  );
};

export default Ongoing;
