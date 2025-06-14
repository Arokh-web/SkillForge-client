import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/contexts";
import fetchData from "../../API/fetchData";

const AdminUsers = ({ users, usersProjects }) => {
  return (
    <div>
      Here are all users (under construction).
      <div className="admin-overview-user-card flex-wrap gap-4 mt-4">
        {users &&
          users.map((user) => (
            <div key={user.id} className="profile-card">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-bold">{user.username}</p>
                  <p className="text-sm ">{user.email}</p>
                </div>
                <div className="text-xs font-mono px-3 py-1 bg-gray-200 rounded-full">
                  {user.role}
                </div>
              </div>

              <div className="text-sm font-mono text-gray-600">
                Account created: {user.createdAt}
              </div>

              {user.bio && (
                <div className="text-sm italic mt-1 text-gray-700">
                  {user.bio}
                </div>
              )}

              {/* Optional: Projektvorschau hier einfügen */}
              <div className="text-xs text-gray-400 mt-2">
                Projects:{" "}
                {usersProjects &&
                  usersProjects.filter((project) => project.user_id === user.id)
                    .length}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminUsers;
