import Header from "@/app/components/Header";
import Cloresal from "@/app/components/Cloresal";
import Catagory from "@/app/components/Catagory";
import Footer from "@/app/components/Footer";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoaderComp from "@/app/components/LoaderComp";
import { toast } from "react-toastify";

export default function Home() {
  const [load, setLoad] = useState<boolean>(true);

  const route = useRouter();
  console.log("pass1");
  
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      if (user.isAdmin) {
        route.push("/unauthorized");
      }
    } else {
      toast.warning("Login First")
      route.push("/");
    }
  }

  setTimeout(()=>{
    setLoad(false)
  }, 1000)

  return (
    <>
      {load ? (
        <LoaderComp />
      ) : (
        <>
          <Header />
          <Cloresal />
          <Catagory viewAll={true} />
          <Footer />
        </>
      )}
    </>
  );
}
