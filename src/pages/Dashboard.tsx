import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Home, Profile, Settings } from "../components/dashBoardSections/componentsExports";
import ScrollToTopButton from "../components/ScrollToTopButton";
import Sidebar from "../components/Sidebar";
function Dashboard() {
  const { user, logout } = useAuth();
  const [selectedMenu, setSelectedMenu] = useState<string>('Home'); 
  const [showScrollButton, setShowScrollButton] = useState(false); 



  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > (window.innerHeight / 3)) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="container-fluid min-vh-100">
      <div className="row">
        <Sidebar selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu} logout={logout} /> 
        {(selectedMenu === 'Home' || selectedMenu === 'Logout') && (
          <Home userName={user?.name}/>
        )}
        {selectedMenu === 'Profile' && (
         <Profile user={user}/>
        )}    
         {selectedMenu === 'Settings' && (
          <Settings/>
        )}

      </div>

      <ScrollToTopButton showScrollButton={showScrollButton} />
    </div>
  );
}

export default Dashboard;
