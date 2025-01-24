import React, { useState, useEffect } from "react";
import Request from "../fromSteps/RequestForm";
import CategoryDialog from "../../Recommendations/CategoryDialog";

interface Step4Props {
  data: string | object;
  onDataChange: (data: string) => void;
}

const Step4: React.FC<Step4Props> = ({ data, onDataChange }) => {
  const [acceptedRequests, setAcceptedRequests] = useState<any[]>([]);
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [platinumSelected, setPlatinumSelected] = useState(false);

  const handleAcceptRequest = (requestData: any) => {
    setSelectedRequest(requestData);
    setCategoryDialogOpen(true);
  };

  const handleCategoryConfirm = (category: string) => {
    const updatedRequest = { ...selectedRequest, category };
    const updatedRequests = [...acceptedRequests, updatedRequest];
    setAcceptedRequests(updatedRequests);

    // Update platinum status
    if (category === "Platinum") setPlatinumSelected(true);

    // Close the category dialog and reset selection
    setCategoryDialogOpen(false);
    setSelectedRequest(null);

    // Update parent data
    const existingData = typeof data === "string" ? JSON.parse(data) : data;
    const updatedData = { ...existingData, acceptedRequests: updatedRequests };
    onDataChange(updatedData);
  };

  useEffect(() => {
    console.log("Accepted Requests:", acceptedRequests);
  }, [acceptedRequests]);

  return (
    <div>
      <Request onAccept={handleAcceptRequest} />

      {/* Category Dialog */}
      <CategoryDialog
        open={categoryDialogOpen}
        onClose={() => setCategoryDialogOpen(false)}
        onConfirm={handleCategoryConfirm}
        platinumSelected={platinumSelected}
      />
    </div>
  );
};

export default Step4;
