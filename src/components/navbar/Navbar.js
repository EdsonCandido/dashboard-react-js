import './Navbar.css';
import avatar from '../../assets/account.png';

const Navbar = ({ sidebarOpen, openSidebar }) => {
    return (
        <nav className="navbar">
            <div className="nav_icon" onClick={() => openSidebar()}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </div>

            <div className="navbar__left">
                {/* <a href="#">Opção 01</a> */}
                {/* <a href="#">Opção 02</a> */}
                {/* <a href="#" className="active_link">Opção 02</a> */}
            </div>

            <div className="navbar__right">
                <a href="#">
                    <i className="fa fa-search"></i>
                </a>

                {/* <a href="#">
                    <i className="fa fa-clock-o"></i>
                </a> */}

                <a href="#">
                    <img width="30" src={avatar} alt="avatar" />
                </a>
            </div>

        </nav>
    )
}

export default Navbar;