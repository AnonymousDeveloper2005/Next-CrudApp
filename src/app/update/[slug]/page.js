"use client";
import { useState, useEffect } from "react";
import styles from "@/app/styles/create-page.module.css";
import { GetById, Update as UpdateById } from "@/utils/actions";
import { useRouter } from "next/navigation";
const Update = ({ params }) => {
  const { slug } = params;
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const redirectNavigate = () => {
    router.back();
  }
  useEffect(() => {
    fetchUser();
  }, [slug]);

  const fetchUser = async () => {
    try {
      const response = await GetById(slug); // Assuming GetById returns a promise
      if (response.success) {
        console.log("User data:", response.data);
        setFormData({
          name: response?.data?.data?.data?.name,
          email: response?.data?.data?.data?.email,
        });
      } else {
        console.error("Failed to fetch user data:", response.error);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateById(slug, formData);
      if (response.success) {
        console.log("User updated successfully:", response.data);
        redirectNavigate();
      } else {
        console.error("Failed to update user:", response.error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        placeholder="Name.."
        value={formData.name}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <input
        type="email"
        name="email"
        placeholder="Email...."
        value={formData.email}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Update
      </button>
    </form>
  );
};

export default Update;
