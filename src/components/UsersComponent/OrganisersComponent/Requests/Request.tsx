import React, { useState } from "react";
import { Button, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import styles from "./requestSection.module.scss";
import RequestCard from "./RequestCard";
import Profile from "../../UserProfiles/Profile";

const requests = {
  sponsors: [
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
      id: 3,
      name: "Pocket FM",
      type: "Sponsors",
      image: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2024/04/untitled-design-2024-04-01t182212-1711975936.jpg",
    },
    {
      id: 4,
      name: "Intellicredence",
      type: "Sponsors",
      image: "https://www.intellicredence.com/assets/images/logoicon.png",
    },
  ],
  speakers: [
    {
      id: 5,
      name: "Vishwas Mudagal",
      type: "Speakers",
      image: "https://www.vishwasmudagal.com/wp-content/uploads/2015/03/top-motivational-speaker-vishwas-mudagal.jpg",
    },
    {
      id: 6,
      name: "Rahul Kapoor",
      type: "Speakers",
      image: "https://www.rahulkapoor.in/images/top-motivational-speaker-banner-responsive.jpg",
    },
    {
      id: 7,
      name: "Vivek Bindra",
      type: "Speakers",
      image: "https://i.pinimg.com/736x/6e/54/21/6e5421d79f810ad7e94666c9b0446868.jpg",
    },
    {
      id: 8,
      name: "Anand Munshi",
      type: "Speakers",
      image: "https://anandmunshi.com/wp-content/uploads/am-homepage-header-img-1.png",
    },
  ],
  venue: [
    {
      id: 9,
      name: "Pai Vista",
      type: "Venue",
      image: "https://floodlightz.com/wp-content/uploads/2024/01/pai-vista-1-1.webp",
    },
    {
      id: 10,
      name: "London Gibson Hall",
      type: "Venue",
      image: "https://prestigiousvenues.com/wp-content/uploads/bb-plugin/cache/Gala-Dinner-Venue-In-London-Gibson-Hall-Prestigious-Venues-panorama-e59dc799b93c25c0dc960e904af705e0-59099a98687f6.jpg",
    },
    {
      id: 11,
      name: "Apple Auditorium",
      type: "Venue",
      image: "https://whova.com/wp-content/uploads/2015/06/choose-perfect-event-venue.jpg",
    },
    {
      id: 12,
      name: "LPU Auditorium",
      type: "Venue",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS4far3pLUyFCMJKC9GsciHX_p32F5mR_7tg&s",
    },
  ],
  food: [
    {
      id: 13,
      name: "Babai Tiffins",
      type: "Food",
      image: "https://cdn0.weddingwire.in/vendor/9865/3_2/960/jpg/catering-royal-catering-services-catering-setup-2_15_309865-159057093440061.jpeg",
    },
    {
      id: 14,
      name: "Samosa Party",
      type: "Food",
      image: "https://hiibangalore.com/wp-content/uploads/2023/06/Best-catering-services-in-Bangalore.jpg",
    },
    {
      id: 15,
      name: "Amruth Cafe",
      type: "Food",
      image: "https://eventsmanagementkerala.com/wp-content/uploads/2024/11/thaliya-new-1024x576.webp",
    },
    {
      id: 16,
      name: "Aromas of Biryani",
      type: "Food",
      image: "https://5.imimg.com/data5/SELLER/Default/2020/11/VD/FE/HU/3755768/event-food-catering-services-500x500.jpg",
    },
  ],
};

const Request: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState(requests);
  const [filters, setFilters] = useState({ name: "", type: "" });
  const [filterAnchor, setFilterAnchor] = useState<null | HTMLElement>(null);
  const [sortAnchor, setSortAnchor] = useState<null | HTMLElement>(null);

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
      acc[key] = requests[key as keyof typeof requests].filter((item) => {
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
      acc[key] = [...filteredData[key as keyof typeof filteredData]].sort((a, b) =>
        sortKey === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      );
      return acc;
    }, {} as typeof filteredData);

    setFilteredData(newSortedData);
    setSortAnchor(null);
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
                <RequestCard
                  key={item.id}
                  name={item.name}
                  type={item.type}
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
    </section>
  );
};

export default Request;
