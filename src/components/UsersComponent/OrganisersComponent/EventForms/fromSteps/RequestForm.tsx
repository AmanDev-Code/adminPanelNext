import React, { useState } from "react";
import styles from "../fromSteps/styles/RequestForm.module.scss";
import RequestCard from "./RequestCard";
import Profile from "../../../UserProfiles/Profile";

const mockData = {
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

interface RequestProps {
  onAccept: (requestData: any) => void;
}

const Request: React.FC<RequestProps> = ({ onAccept }) => {
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [acceptedRequests, setAcceptedRequests] = useState<{ [key: string]: any[] }>({
    sponsors: [],
    speakers: [],
    venue: [],
    food: [],
  });

  const handleAccept = (id: number, name: string, type: string, image: string, category: string) => {
    // Enforce category restrictions
    if (category === "venue" || category === "food") {
      if (acceptedRequests[category].length > 0) {
        alert(`You cannot select more than 1 item in ${category.charAt(0).toUpperCase() + category.slice(1)}.`);
        return;
      }
    }

    // Update accepted requests
    const updatedCategory = [...acceptedRequests[category], { id, name, type, image }];
    setAcceptedRequests((prev) => ({ ...prev, [category]: updatedCategory }));

    // Notify parent component
    onAccept({ id, name, type, image });
  };

  const handleRequestClick = (request: any, category: string) => {
    setSelectedRequest(request);
    setSelectedCategory(category);
  };

  if (selectedRequest) {
    return (
      <Profile
        request={selectedRequest}
        onBack={() => {
          setSelectedRequest(null);
          setSelectedCategory(null);
        }}
        requests={mockData[selectedCategory as keyof typeof mockData]}
      />
    );
  }

  return (
    <section className={styles.container}>
      {Object.entries(mockData).map(([key, value]) => (
        <div key={key} className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
          </div>
          <div className={styles.cardsContainer}>
            {value.map((item) => (
              <div key={item.id} className={styles.card}>
                <RequestCard
                  name={item.name}
                  type={item.type}
                  image={item.image}
                  isAccepted={acceptedRequests[key]?.some((req) => req.id === item.id)}
                  onAccept={() => handleAccept(item.id, item.name, item.type, item.image, key)}
                  onReject={() => console.log(`Rejected request ${item.id}`)}
                  onClick={() => handleRequestClick(item, key)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Request;