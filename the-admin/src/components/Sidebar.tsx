 
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Mail, MessageSquare, Info, Wrench, Banknote, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { getInitials } from '../utils/getInitials';
import { useState } from 'react';
import styles from './Sidebar.module.scss';
import logo_blur from "../assets/ll.png"
const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/contacts', label: 'Contacts', icon: Mail },
  { path: '/messages', label: 'Messages', icon: MessageSquare },
  { path: '/about', label: 'About', icon: Info },
  { path: '/services', label: 'Services', icon: Wrench },
  { path: '/loans', label: 'Loans', icon: Banknote },
  { path: '/settings', label: 'Settings', icon: Settings },
];

const Sidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { settingsUsername } = useData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const initials = getInitials(settingsUsername);

  return (
    <>
      <div className={styles.mobileTopBar}>
        <button className={styles.hamburger} onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className={styles.mobileInitials}>{initials}</div>
      </div>

      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.brand}>
          <div className={styles.logoContainer}>
            {!logoLoaded && (
              <img
                style={{ width: '100%', height: '100%', objectFit: 'contain', opacity: 0.5 }}
                src={logo_blur}
                alt="Loading logo"
                className={styles.logo}
              />
            )}
            <img
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: logoLoaded ? 'block' : 'none' }}
              src="https://ik.imagekit.io/59p9lo9mv/rwamps%20finance/ll.png"
              alt="Logo"
              className={styles.logo}
              onLoad={() => setLogoLoaded(true)}
            />
          </div>
          <button className={styles.closeBtn} onClick={() => setMobileOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.userBadge}>
          <div className={styles.initialsCircle}>{initials}</div>
          <span className={styles.userName}>{settingsUsername || 'Admin'}</span>
        </div>

        <button className={styles.logoutBtn} onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
