import React, { useState } from "react";
import UserCard from "./UserCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const UserGrid = ({ activeTab }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Julian Marcov",
      email: "julian.m@platform.com",
      role: "Platform Admin",
      lastActive: "12m ago",
    },
    {
      id: 2,
      name: "Elena Rossi",
      email: "elena@trattoriarossi.it",
      role: "Restaurant Owner",
      linkedRestaurant: "Trattoria Rossi Milano",
    },
    {
      id: 3,
      name: "Sarah Chen",
      email: "s.chen@platform.com",
      role: "Platform Admin Verified",
      lastActive: "2h ago",
    },
    {
      id: 4,
      name: "Marcus Thorne",
      email: "marcus@thegrid-london.com",
      role: "Restaurant Owner Menu",
      linkedRestaurant: "The Grid Bistro",
    },
    {
      id: 5,
      name: "David Fletcher",
      email: "d.fletch@oldvenue.com",
      role: "Disabled",
      disabledDate: "Oct 12, 2023",
    },
  ]);

  const allUsers = users;

  const getFilteredUsers = () => {
    switch (activeTab) {
      case "Platform Admins":
        return allUsers.filter(
          (user) =>
            user.role === "Platform Admin" ||
            user.role === "Platform Admin Verified",
        );
      case "Restaurant Owners":
        return allUsers.filter(
          (user) =>
            user.role === "Restaurant Owner" ||
            user.role === "Restaurant Owner Menu",
        );
      default:
        return allUsers;
    }
  };

  const filteredUsers = getFilteredUsers();
  const usersPerPage = 6;
  const totalPages = Math.ceil((filteredUsers.length + 1) / usersPerPage); // +1 for "Add New" card
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleAction = (action, user) => {
    console.log(`Action: ${action} on user: ${user.name}`);
    // Handle different actions here
    switch (action) {
      case "resetPassword":
        // Handle password reset
        console.log(`Password reset requested for ${user.name}`);
        break;
      case "disable":
        // Handle disable user
        if (
          window.confirm(
            `Are you sure you want to disable ${user.name}? This action will prevent them from accessing the platform.`,
          )
        ) {
          const currentDate = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          });

          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.id === user.id
                ? { ...u, role: "Disabled", disabledDate: currentDate }
                : u,
            ),
          );

          console.log(`User ${user.name} has been disabled`);
        }
        break;
      case "reactivate":
        // Handle reactivate user
        if (
          window.confirm(`Are you sure you want to reactivate ${user.name}?`)
        ) {
          setUsers((prevUsers) =>
            prevUsers.map((u) =>
              u.id === user.id
                ? { ...u, role: "Restaurant Owner", disabledDate: undefined }
                : u,
            ),
          );
          console.log(`User ${user.name} has been reactivated`);
        }
        break;
      case "viewRestaurant":
        // Handle view linked restaurant
        console.log(
          `Viewing restaurant for ${user.name}: ${user.linkedRestaurant}`,
        );
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} onAction={handleAction} />
        ))}

        {/* Add New Entry Card - only show on first page */}
        {currentPage === 1 && (
          <UserCard
            user={{ type: "addNew" }}
            onAction={() => console.log("Add new user")}
          />
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center py-6 border-t border-zinc-200">
        <p className="text-sm text-zinc-500">
          Showing{" "}
          <span className="font-bold text-black">
            {startIndex + 1} - {Math.min(endIndex, filteredUsers.length)}
          </span>{" "}
          of {allUsers.length} users
        </p>
        <div className="flex gap-2">
          <button
            className="w-10 h-10 border border-zinc-200 bg-white flex items-center justify-center rounded hover:border-black transition-colors"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                className={`w-10 h-10 border flex items-center justify-center rounded transition-colors ${
                  currentPage === pageNum
                    ? "border-black bg-black text-white"
                    : "border-zinc-200 bg-white hover:border-black"
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            className="w-10 h-10 border border-zinc-200 bg-white flex items-center justify-center rounded hover:border-black transition-colors"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserGrid;
