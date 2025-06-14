// this is the account profile page for the user; a special one for the admin is also available elsewhere
// it is marked as "page" because it is accessed from the menu bar and part of the hero section

import { useAuthContext } from "../contexts/contexts";
import React, { useState } from "react";
import fetchData from "../API/fetchData";
import { useNavigate } from "react-router-dom";

const AccProfile = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  if (!user) {
    return <p className="text-center text-lg">Loading...</p>;
  }
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    username: user.username,
    email: user.email,
    role: user.role,
    xp: user.xp,
    bio: user.bio,
    profile_pic: user.profile_pic,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editMode) {
      setEditMode(true);
      return;
    }

    if (!user.username || !user.email) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }

    setErrorMessage("");

    // UPDATE USER
    if (editMode) {
      // destructure the userData to remove unwanted fields
      const { id, createdAt, updatedAt, ...rawUserData } = userData;

      // clean the rawUpdateData to remove empty or undefined values (will be changed later)
      const cleanDataToUpdate = {};
      for (const key in rawUserData) {
        //<-- rest of projectData
        const value = rawUserData[key];
        if (value !== "" && value !== undefined && value !== null) {
          cleanDataToUpdate[key] = value;
        }
        // now cleanDataToUpdate will only contain fields that have values; all the others will be filled with the default values set by the DB
      }

      console.log("Updating user:", cleanDataToUpdate);

      const response = await fetchData(
        "PATCH",
        "/api/users/" + user.id,
        cleanDataToUpdate
      );

      setUser(response);

      navigate("/profile");
    }
    setEditMode(false);
  };

  return (
    <div className="account-card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-title">Account Overview</h2>
        <button className="p-button" onClick={handleSubmit}>
          {editMode ? "Save" : "Edit"}
        </button>
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      </div>

      <div className="flex flex-col gap-3 font-mono text-sm">
        <label className="flex justify-between">
          <span>Username:</span>
          {editMode ? (
            <input
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="creation-input"
            />
          ) : (
            <span className="font-bold">{user.username}</span>
          )}
        </label>

        <label className="flex justify-between">
          <span>Email:</span>
          {editMode ? (
            <input
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="creation-input"
            />
          ) : (
            <span className="font-bold">{user.email}</span>
          )}
        </label>

        <label className="flex justify-between">
          <span>
            Role: {user.role} - Not editable. Ask an admin if you're no real
            user yet.
          </span>
        </label>

        <label className="flex justify-between">
          <span>Experience Points: Not Editable</span>
        </label>

        <div className="flex justify-between">
          <p>Account created at:</p>
          <p className="font-bold">{user.createdAt}</p>
        </div>

        <div className="flex justify-between">
          <p>Last Update:</p>
          <p className="font-bold">{user.updatedAt}</p>
        </div>

        <div>
          <p className="mb-1 font-semibold">About me:</p>
          {editMode ? (
            <textarea
              name="bio"
              value={userData.bio === null ? "" : userData.bio}
              onChange={handleChange}
              className="content-textarea"
            />
          ) : (
            <p className="italic">{user.bio}</p>
          )}
        </div>

        {user.profile_pic && (
          <div className="mt-4">
            <p className="mb-1 font-semibold">Profile Picture:</p>
            <img
              src={user.profile_pic}
              alt="Profile"
              className="rounded-xl max-w-[200px] border border-gray-300 shadow"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AccProfile;
