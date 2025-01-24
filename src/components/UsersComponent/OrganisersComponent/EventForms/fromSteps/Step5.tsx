import React from "react";
import EventDetails from "./EventDetails";

interface Step5Props {
  data: Record<string, any>;
  onDataChange: (data: Record<string, any>) => void;
}

const Step5: React.FC<Step5Props> = ({ data }) => {
  const acceptedRequests = data["Step4"]?.acceptedRequests || [];

  // Transform data to include multiple entries for speakers, sponsors, venues, and food
  const transformedData = JSON.stringify({
    name: data["Step1"]?.eventName || "Unknown Event",
    eventType: data["Step1"]?.eventCategory || "N/A",
    date: data["Step1"]?.startDate || "N/A",
    startTime: data["Step1"]?.startTime || "N/A",
    endTime: data["Step1"]?.endTime || "N/A",
    venueLocation: data["Step1"]?.location || "N/A",
    description: data["Step1"]?.description || "No description available.",
    bannerImage: data["Step2"]?.bannerImage || "",
    price: data["Step3"]?.eventType === "Free Event" ? "Free" : data["Step3"]?.ticketPrice || "N/A",

    speakers: acceptedRequests
      .filter((req: any) => req.type === "Speakers")
      .map((speaker: any) => ({
        name: speaker.name || "Unknown Speaker",
        image: speaker.image || "",
      })),

    sponsors: acceptedRequests
      .filter((req: any) => req.type === "Sponsors")
      .map((sponsor: any) => ({
        name: sponsor.name || "Unknown Sponsor",
        image: sponsor.image || "",
      })),

    venues: acceptedRequests
      .filter((req: any) => req.type === "Venue")
      .map((venue: any) => ({
        name: venue.name || "Unknown Venue",
        image: venue.image || "",
      })),

    foods: acceptedRequests
      .filter((req: any) => req.type === "Food")
      .map((food: any) => ({
        name: food.name || "Unknown Food",
        image: food.image || "",
      })),
  });

  return (
    <div>
      <EventDetails data={transformedData} onDataChange={() => {}} />
    </div>
  );
};

export default Step5;
