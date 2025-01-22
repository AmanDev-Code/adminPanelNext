interface Children {
  icon?: string;
  path?: string;
  title: string;
  type?: string;
  blank?: string;
  children?: Array<Children>;
}

export interface Menu {
  path: string;
  icon: string;
  title: string;
  type?: string;
  exact?: any;
  navheader?: boolean;
  children?: Array<Children>;
}

const menu: Array<Menu> = [
  {
    title: "Home",
    path: "/userDashboard",
    icon: "nav-icon fas fa-eye"
  },
  {
    title: "Community",
    path: "/userDashboard",
    icon: "nav-icon fas fa-users",
    // children: [
    //   { title: "Attendees", path: "/users/attendees", icon: "nav-icon fas fa-user" },
    //   { title: "Organisers", path: "/users/organisers", icon: "nav-icon fas fa-user-tie" },
    //   { title: "Sponsors", path: "/users/sponsors", icon: "nav-icon fas fa-handshake" },
    //   { title: "Venue Providers", path: "/users/venue-providers", icon: "nav-icon fas fa-building" },
    //   { title: "Food Providers", path: "/users/food-providers", icon: "nav-icon fas fa-utensils" },
    //   { title: "Speakers", path: "/users/speakers", icon: "nav-icon fas fa-microphone" },
    // ],
  },
  // {
  //   title: "Internal Messaging",
  //   path: "/settings",
  //   icon: "nav-icon fas fa-cog"
  // },
  {
    title: "Insights",
    path: "/users/organiser/insights/insights",
    icon: "nav-icon fas fa-cog"
  },
  {
    title: "Settings",
    path: "/users/organiser/settings/orgSettings",
    icon: "nav-icon fas fa-cog"
  },
];

export default menu;
