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
    title: "Overview",
    path: "/dashboardAdmin",
    icon: "nav-icon fas fa-eye"
  },
  {
    title: "Users",
    path: "/users",
    icon: "nav-icon fas fa-users",
    children: [
      { title: "Attendees", path: "/organisers", icon: "nav-icon fas fa-user" },
      { title: "Organisers", path: "/organisers", icon: "nav-icon fas fa-user-tie" },
      { title: "Sponsors", path: "/users/sponsors", icon: "nav-icon fas fa-handshake" },
      { title: "Venue Providers", path: "/users/venue-providers", icon: "nav-icon fas fa-building" },
      { title: "Food Providers", path: "/users/food-providers", icon: "nav-icon fas fa-utensils" },
      { title: "Speakers", path: "/users/speakers", icon: "nav-icon fas fa-microphone" },
    ],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "nav-icon fas fa-cog"
  },
];

export default menu;
