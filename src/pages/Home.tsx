import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import About from "../components/About";
import Resume from "../components/Resume";
import Certificates from "../components/Certificates";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import useUIInteractions from "../hooks/useUIInteractions";
import Loader from "../components/Loader";
const Home: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useUIInteractions();
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {loading && <Loader />}
      <main className="home-container">
        <SideBar />
        <div className="main-content">
          <NavBar />
          <About />
          <Resume />
          <Certificates />
          <Blog />
          <Contact />
        </div>
      </main>      
      <p className="copyright">&copy; 2019 - {new Date().getFullYear()} Rubo</p>
    </>
  );
};

export default Home;
