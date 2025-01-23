import React, { useContext } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { MdOutlineEdit } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import IsSubscription from "../hooks/IsSubscription";
import { useNavigate } from "react-router";

const MyProfile = () => {
  const { user } = useContext(AppContext);
  const [isSubscription] = IsSubscription();
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-300 mt-10">My Profile</h1>
      <div className="flex justify-center items-center mt-10 w-full px-2 md:px-0">
        <div className="bg-white dark:bg-gray-800 shadow-lg p-8 md:p-12 rounded-xl flex items-center flex-col max-w-lg w-full">
          <img
            src={
              user.photoURL ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"
            }
            alt="Profile"
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full shadow-md"
          />

          <h2 className="text-2xl text-center font-semibold dark:text-gray-300 text-gray-800 mt-4">
            {user.displayName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm">{user.email}</p>

          <div className="mt-6 w-full text-center">
            {isSubscription ? (
              <p className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-green-600 bg-green-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-green-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Verified Membership
              </p>
            ) : (
              <p className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Not Verified Membership
              </p>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-4 italic">
            Last Signed in: {user.metadata.lastSignInTime}.
          </p>

          <div className="flex items-center justify-between w-full mt-6 gap-4">
            <button disabled className="flex items-center btn gap-2 justify-center h-[4rem] w-1/2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700">
              <MdOutlineEdit className="text-lg" />
              <span className="hidden sm:block">Not Available</span>
            </button>
            <button onClick={() => {
              navigate("/subscription")
            }} disabled={isSubscription} className="flex items-center gap-2 btn h-[4rem] justify-center w-1/2 bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-700">
              <BiSolidPurchaseTag className="text-lg" />
              <span className="hidden sm:block">{isSubscription ? "Bought" : "Purchase"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
