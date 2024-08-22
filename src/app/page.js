"use client";

import styles from "./page.module.css";
import { DELETE, GET, useRedirect } from "@/utils/actions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
export default function Home() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Initially set to true

  const getUser = async () => {
    try {
      setLoading(true); // Set loading to true when the request starts
      const response = await GET();
      if (response.success) {
        setUserData(response.data?.data?.data);
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("An error occurred while fetching user data.");
    } finally {
      setLoading(false); // Set loading to false after request is completed
    }
  };
  const routeToUrl = useRedirect();
  
  const copyId = (id) => {
    window.navigator.clipboard.writeText(id).then(() => {
      toast.success("ID copied to clipboard",{
        autoClose: 400
      });
    })
  }
  const deleteUser = async (id) => {
    try {
      const response = await DELETE(id);
      if (response.success) {
        toast.success(response.data);
        getUser();
      } else {
        toast.error(response.data);
      }
    } catch (error) {
      toast.error("An error occurred while deleting user.");
    }
  }
  useEffect(() => {
    getUser();
  }, []);

  return (
    <main className={styles.main}>
      <ToastContainer />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {loading ? (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          ) : userData.length > 0 ? (
            userData.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => routeToUrl(`/update/${user._id}`)} className={styles.edit}>Edit</button>
                  <button className={styles.del} onClick={() => deleteUser(user._id)}>Delete</button>
                  {/* add btn for copyid */}
                  <button onClick={() => copyId(user._id)} className={styles.copy}>Copy ID</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}
