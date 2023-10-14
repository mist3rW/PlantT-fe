import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import formatTimAgo from "../../utils/time-ago";

export default function ManageUsers() {
  const [userList, setUserList] = useState([]);
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user");
      setUserList(response.data);
    } catch (error) {
      console.error("Error fetching userdata:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const deleteTargetUser = async (targetUserId) => {
    try {
      await axios.delete(`http://localhost:3001/user/${targetUserId}`);
      setUserList((prevUsers) =>
        prevUsers.filter((target) => target.id !== targetUserId)
      );
    } catch (error) {
      console.log("Error deleting this user:", error);
    }
  };
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ชื่อ
              </th>
              <th scope="col" className="px-6 py-3">
                อีเมล
              </th>
              <th scope="col" className="px-6 py-3">
                เบอร์โทรศัพท์
              </th>
              <th scope="col" className="px-6 py-3">
                เป็นสมาชิกเมื่อ
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <React.Fragment key={user.id}>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <p>
                      {user.firstName} {user.lastName}
                      &nbsp;
                      {user.role === "ADMIN" ? (
                        <span
                          className="bg-red-500 text-white text-[8px] p-1
                        "
                        >
                          ADMIN
                        </span>
                      ) : null}
                    </p>
                  </th>

                  <td className="px-6 py-4">{user.email_address || "-"}</td>
                  <td className="px-6 py-4">{user.mobile || "-"}</td>
                  <td className="px-12 py-4">{formatTimAgo(user.createdAt)}</td>
                  <td className="px-6 py-4 text-right">
                    <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      แก้ไข
                    </a>
                    <br />
                    <a
                      href="#"
                      className="font-medium text-red-600 dark:text-blue-500 hover:underline"
                      onClick={() => deleteTargetUser(user.id)}
                    >
                      ลบ
                    </a>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
