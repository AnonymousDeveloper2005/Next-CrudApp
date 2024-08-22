"use client"
import styles from "@/app/styles/navbar.module.css";
import Image from "next/image";
import { useRedirect } from "@/utils/actions";
const Navbar = () => {
  const routeToUrl = useRedirect();
  return (
    <div className={styles.navbar}>
      <div className={styles.logo} >
        <Image src="/next.svg" alt="logo" width={100} height={50} />
        <h1>Next-Crud</h1>
      </div>
        <button className={styles.addBtn} onClick={()=>routeToUrl("/create")}>Add User</button>
    </div>
  );
};

export default Navbar;
