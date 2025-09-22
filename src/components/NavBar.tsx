import { useState } from "react";
import IonIcon from "@reacticons/ionicons";
import profile from "../data/profile";
import PrintModal from "./PrintModal";

function NavBar() {
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <button className="navbar-link  active" data-nav-link>
              {profile.navBar.about}
            </button>
          </li>

          <li className="navbar-item">
            <button className="navbar-link" data-nav-link>
              {profile.navBar.resume}
            </button>
          </li>

          <li className="navbar-item">
            <button className="navbar-link" data-nav-link>
              Certificates
            </button>
          </li>

          <li className="navbar-item">
            <button className="navbar-link" data-nav-link>
              {profile.navBar.contact}
            </button>
          </li>

          <li className="navbar-item">
            <button
              className="navbar-link print-button"
              onClick={() => setIsPrintModalOpen(true)}
              title="Print Resume"
            >
              <IonIcon name="print-outline" />
              PDF
            </button>
          </li>
        </ul>
      </nav>

      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
      />
    </>
  );
}
export default NavBar;
