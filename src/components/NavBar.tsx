import profile from "../data/profile";
import Toggle from "./Toggle";
function NavBar() {
  return (
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
            <Toggle />
        </li>
      </ul>
    </nav>
  );
}
export default NavBar;
