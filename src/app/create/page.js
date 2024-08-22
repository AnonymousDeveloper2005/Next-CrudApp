"use client";

import styles from "@/app/styles/create-page.module.css";
import { POST } from "@/utils/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRedirect } from "@/utils/actions";
const CreatePage = () => {
  const routeToUrl = useRedirect();
  const addUser = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(e.target);
    // Convert FormData to JSON
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    try {
      const response = await POST(data);
      console.log(response);
      if (response.success) {
        toast.success("User added successfully");
        routeToUrl("/");
      } else {
        toast.error(response.error || "Failed to add user");
      }
    } catch (error) {
      toast.error("An error occurred while adding the user.");
    }
  };

  return (
    <form onSubmit={addUser} className={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Name.."
        required
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email...."
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

export default CreatePage;
