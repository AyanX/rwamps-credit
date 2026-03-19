// Sidebar navigation for admin dashboard
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Mail, MessageSquare, Info, Wrench, Banknote, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { getInitials } from '../utils/getInitials';
import { useState } from 'react';
import styles from './Sidebar.module.scss';
import logo from "../assets/logo.png"
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
  const initials = getInitials(settingsUsername);

  return (
    <>
      {/* mobile hamburger + initials */}
      <div className={styles.mobileTopBar}>
        <button className={styles.hamburger} onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className={styles.mobileInitials}>{initials}</div>
      </div>

      {/* overlay for mobile */}
      {mobileOpen && <div className={styles.overlay} onClick={() => setMobileOpen(false)} />}

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.open : ''}`}>
        <div className={styles.brand}>
          <div className={styles.logoContainer}><img src={logo} alt="Logo" className={styles.logo} /></div>
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

        {/* user initials badge */}
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
