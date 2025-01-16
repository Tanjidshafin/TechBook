
import React, { useContext } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { MdOutlineEdit } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
const MyProfile = () => {
  const { user } = useContext(AppContext)
  console.log(user);
  return (
    <div>
      <p className="text-3xl font-bold text-center mt-10">My Profile</p>
      <div className="flex justify-center items-center mt-10">
        <div className=" bg-base-300 shadow-2xl p-10 px-14 rounded-lg flex items-center justify-center flex-col">
          <img
            src={user.photoURL ? user.photoURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s"}
            alt="demo/image"
            className="w-[70px] h-[70px] md:w-[150px] md:h-[150px] object-cover rounded-full"
          />
          <h3 className="md:text-[1.5rem] text-lg font-[500] capitalize mt-4">
            {user.displayName}
          </h3>
          <p className="text-text text-[0.9rem]">{user.email}</p>
          <div className="relative">
            <p className=" text-justify text-[0.9rem] my-2 text-text ">
              Membership Status: Not Verified
            </p>
            <p className=" text-justify text-[0.9rem] mb-3 text-text ">
              Last Signed in: {user.metadata.lastSignInTime}.
            </p>
            <FaQuoteRight className="text-[3rem] text-[#d1d1d169] absolute top-[-20%] left-0 " />
            <FaQuoteLeft className="text-[3rem] text-[#d1d1d169] absolute bottom-[0%] right-0 " />
            <div className="flex justify-center flex-col md:flex-row gap-3">
              <button className="bg-primary w-full py-2 px-4 rounded-md flex items-center justify-center gap-[8px] text-[1rem] text-white">
                <MdOutlineEdit className="text-[1.1rem]" />
                Edit
              </button>
              <button className="bg-primary w-full justify-center py-2 px-4 rounded-md flex items-center gap-[8px] text-[1rem] text-white">
              <BiSolidPurchaseTag />
               Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
