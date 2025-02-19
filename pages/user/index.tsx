import Header from "@/app/components/Header";
import Cloresal from "@/app/components/Cloresal";
import Catagory from "@/app/components/Catagory";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <>
    <Header/>
    <Cloresal />
    <Catagory viewAll = {true} />
    <Footer />
    </>
  );
}
