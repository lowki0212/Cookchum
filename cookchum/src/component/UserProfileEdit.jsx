import React, { useState, useEffect } from "react"; 
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserProfileEdit.css";  // Importing the CSS for styling

const UserProfileEdit = () => {
  const navigate = useNavigate();
  const { userId, username } = useLocation().state || {};

  // State to hold the user details
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    profilePicture: "",  // Initially set as an empty string
  });

  // State to handle loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle profile picture change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        profilePicture: file,
      }));
    }
  };

  // Fetch user data when the component mounts
  useEffect(() => {
    if (userId) {
      setLoading(true);
      axios
        .get(`http://localhost:8080/api/supercook/user/${userId}`)  // Correct API path
        .then((response) => {
          // Assuming the API returns a response with a profile picture URL
          const { username, email, password, profilePicture } = response.data;
          setUserDetails({
            username,
            email,
            password,
            profilePicture: profilePicture || "",  // Set the profile picture URL if available
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data");
          setLoading(false);
        });
    }
  }, [userId]);

  // Handle form submission for updating profile
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", userDetails.username);
    formData.append("email", userDetails.email);
    formData.append("password", userDetails.password);

    // If there is a profile picture, append it as well
    if (userDetails.profilePicture && userDetails.profilePicture instanceof File) {
      formData.append("image", userDetails.profilePicture);  // Ensure the backend expects this key ("image")
    }

    setLoading(true);
    setError(""); // Clear any previous errors

    // Updated the URL to the correct endpoint for updating user details
    axios
      .put(`http://localhost:8080/api/supercook/user/${userId}`, formData, {
        headers: {
          // Let Axios handle the 'Content-Type' header for multipart data
        },
      })
      .then((response) => {
        alert("Profile updated successfully!");
        navigate("/", { state: { userId, username } });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        setError("Error updating profile. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="user-profile-edit">
      <h2>Edit Profile</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {/* Profile Picture Container Outside the Form */}
      <div className="profile-picture-container">
        <img
          className="profile-picture"
          src={
            userDetails.profilePicture && typeof userDetails.profilePicture === "string"
              ? `http://localhost:8080/${userDetails.profilePicture}`  // Assuming the backend serves image from this path
              : userDetails.profilePicture && userDetails.profilePicture instanceof File
              ? URL.createObjectURL(userDetails.profilePicture)
              : "placeholder.png"
          }
          alt="Profile"
        />
        {userDetails.profilePicture && (
          <p>Selected file: {userDetails.profilePicture.name}</p>
        )}
      </div>

      {/* Form for User Details */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userDetails.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Profile Picture:</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleFileChange}
          />
        </div>

        <button type="submit" className="save-button" disabled={loading}>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfileEdit;