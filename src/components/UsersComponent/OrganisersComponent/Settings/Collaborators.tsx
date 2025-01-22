import React, { useState } from "react";
import { Button, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import styles from "./Collaborators.module.scss";
import CollabCards from "./CollabCards";
import Profile from "../../UserProfiles/Profile";

const requests = {
  Coorganizers: [
    {
      id: 1,
      name: "Ather",
      type: "Sponsors",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8FXEAo6hHEDyqZo21qjALhNaODM-gOWYWw&s",
    },
    {
      id: 2,
      name: "Docker",
      type: "Sponsors",
      image: "https://tech.osteel.me/images/2020/03/04/docker-introduction-01.jpg",
    },
    {
      id: 6,
      name: "Rahul Kapoor",
      type: "Speakers",
      image: "https://www.rahulkapoor.in/images/top-motivational-speaker-banner-responsive.jpg",
    },
    {
      id: 8,
      name: "Anand Munshi",
      type: "Speakers",
      image: "https://anandmunshi.com/wp-content/uploads/am-homepage-header-img-1.png",
    },
    {
      id: 11,
      name: "Apple Auditorium",
      type: "Venue",
      image: "https://whova.com/wp-content/uploads/2015/06/choose-perfect-event-venue.jpg",
    },
    {
      id: 16,
      name: "Aromas of Biryani",
      type: "Food",
      image: "https://5.imimg.com/data5/SELLER/Default/2020/11/VD/FE/HU/3755768/event-food-catering-services-500x500.jpg",
    },
  ],
};

// Define a type for the keys of the requests object
type RequestKeys = keyof typeof requests;

const Collaborators: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(requests);
  const [filters, setFilters] = useState({ name: "", type: "" });
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);
  const [email, setEmail] = useState("");

  const handleRequestClick = (request: any, category: string) => {
    setSelectedRequest(request);
    setSelectedCategory(category);
  };

  const handleBack = () => {
    setSelectedRequest(null);
    setSelectedCategory(null);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => setFilterAnchor(event.currentTarget);
  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => setSortAnchor(event.currentTarget);

  const applyFilters = () => {
    const newFilteredData = Object.keys(requests).reduce((acc, key) => {
      const typedKey = key as RequestKeys; // Type assertion
      acc[typedKey] = requests[typedKey].filter((item) => {
        const matchesName = filters.name === "" || item.name.toLowerCase().includes(filters.name.toLowerCase());
        const matchesType = filters.type === "" || item.type.toLowerCase() === filters.type.toLowerCase();
        return matchesName && matchesType;
      });
      return acc;
    }, {} as typeof requests);

    setFilteredData(newFilteredData);
    setFilterAnchor(null);
  };

  const sortData = (sortKey: "az" | "za") => {
    const newSortedData = Object.keys(filteredData).reduce((acc, key) => {
      const typedKey = key as RequestKeys; // Type assertion
      acc[typedKey] = [...filteredData[typedKey]].sort((a, b) =>
        sortKey === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      return acc;
    }, {} as typeof filteredData);

    setFilteredData(newSortedData);
    setSortAnchor(null);
  };

  const handleSendRequest = () => {
    if (email.trim() === "") {
      alert("Please enter a valid email address.");
      return;
    }
    alert(`Request sent to ${email}`);
    setEmail(""); // Clear the input field after sending the request
  };

  if (selectedRequest) {
    return <Profile request={selectedRequest} onBack={handleBack} requests={requests[selectedCategory as keyof typeof requests]} />;
  }

  return (
    <section className={styles.container}>
      <Menu anchorEl={filterAnchor} open={Boolean(filterAnchor)} onClose={() => setFilterAnchor(null)}>
        <div className={styles.filterMenu}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="dense"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <TextField
            label="Type"
            variant="outlined"
            select
            fullWidth
            margin="dense"
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <MenuItem value="">All</MenuItem>
            {Array.from(new Set(Object.values(requests).flatMap((items) => items.map((item) => item.type)))).map(
              (type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              )
            )}
          </TextField>
          <Button variant="contained" onClick={applyFilters}>
            Apply Filters
          </Button>
        </div>
      </Menu>

      <Menu anchorEl={sortAnchor} open={Boolean(sortAnchor)} onClose={() => setSortAnchor(null)}>
        <MenuItem onClick={() => sortData("az")}>Sort A-Z</MenuItem>
        <MenuItem onClick={() => sortData("za")}>Sort Z-A</MenuItem>
      </Menu>

      {Object.entries(filteredData).map(([key, value]) => (
        <div key={key} className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <div className={styles.actions}>
              <IconButton onClick={handleFilterClick}>
                <FilterAltIcon fontSize="large" />
              </IconButton>
              <IconButton onClick={handleSortClick}>
                <SortIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
          <div className={styles.cardsContainer}>
            {value.length > 0 ? (
              value.map((item) => (
                <CollabCards
                  key={item.id}
                  name={item.name}
                  type={item.type}
                  onAccept={() => alert("Request accepted")}
                  image={item.image}
                  onClick={() => handleRequestClick(item, key)}
                />
              ))
            ) : (
              <p className={styles.noData}>No requests found.</p>
            )}
          </div>
        </div>
      ))}

      {/* Invite a Collaborator Section */}
      <div className={styles.inviteSection}>
  <h3 className={styles.sectionHeading}>Invite a Collaborator</h3>
  <div className={styles.inviteContainer}>
    <div className={styles.formGroup}>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder=" "
        className={styles.inputField}
      />
      <label className={styles.label}>Enter Email ID</label>
    </div>
    <button
      className={styles.sendButton}
      onClick={handleSendRequest}
    >
      Send Invite
    </button>
  </div>
</div>

    </section>
  );
};

export default Collaborators;
