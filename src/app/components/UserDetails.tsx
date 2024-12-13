import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDetails: React.FC<{ userId: number | null }> = ({ userId }) => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://dummyjson.com/users/${userId}`)
        .then((response) => setUser(response.data))
        .catch((error) => console.error("Error fetching user details:", error));
    }
  }, [userId]);

  const skypeId = `${user?.firstName}.${user?.lastName}@skype.com`

  if (!userId) return <div className="user-details">Select a user to see details</div>;
  if (!user) return <div className="user-details">Loading...</div>;

  return (
    <div className="user-details">
      <div className="tabs">
        <button
          onClick={() => setActiveTab("profile")}
          className={`tab-button ${activeTab === "profile" ? "active" : ""}`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`tab-button ${activeTab === "contacts" ? "active" : ""}`}
        >
          Contacts
        </button>
      </div>
      <div className="detail-section">
        {activeTab === "profile" && (
          <div className="profile">
            <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
            <p><strong>DOB:</strong> {user.birthDate}</p>
            <p><strong>Address:</strong> {user.address.address}, {user.address.city}, {user.address.state} - {user.address.postalCode}.</p>
          </div>
        )}
        {activeTab === "contacts" && (
          <div className="contacts">
            <p><strong>Mobile:</strong> {user.phone}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Skype ID:</strong> {skypeId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
