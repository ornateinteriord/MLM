import './sidebar.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserSideBarMenuItems, AdminSideBarMenuItems } from './SidebarUtils'
import { Avatar, Toolbar, Typography } from '@mui/material';
import { SideBarMenuItemType } from '../../store/store';
import { ExpandMoreIcon, ExpandLessIcon } from '../Icons';

const Sidebar = ({isOpen, onClose , role}: {isOpen: boolean, onClose: () => void, role: string}) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [closingItem, setClosingItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (closingItem) {
      const timer = setTimeout(() => {
        setClosingItem(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [closingItem]);

  const handleToggle = (itemName: string) => {
    if (expandedItem && expandedItem !== itemName) {
      setClosingItem(expandedItem);
    }
    setExpandedItem(prev => prev === itemName ? null : itemName);
  };

  const handleSelect = (itemName: string) => {
    setSelectedItem(itemName);
    // Close sidebar on mobile regardless of submenu state
    if (window.innerWidth <= 768) {
      onClose();
    }
  };
  const menuItems = role === "ADMIN" ? AdminSideBarMenuItems : UserSideBarMenuItems;

  return (
    <motion.div 
      className={`sidebar ${isOpen ? 'open' : 'closed'}`}
      initial={{ width: 0 }}
      animate={{ width: isOpen ? 250 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ zIndex: 100 }}
    >
      <Toolbar className="navbar-toolbar" />
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="sidebar-header"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Avatar
              alt="User Avatar"
              src={`https://api.multiavatar.com/${"Deepanshu"}.svg`}
              sx={{ width: 50, height: 50 }}
            />
            <div className="welcome-text" style={{padding: '10px', color: '#fff'}}>
              <Typography>Welcome,</Typography>
              <Typography style={{fontWeight: 'bold'}}>Dipanshu</Typography>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div style={{ height: 'calc(100vh - 100px)', overflowY: 'auto', paddingBottom: '80px' }}>
        <AnimatePresence>
          {menuItems.map((item: SideBarMenuItemType) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                onClick={() => {
                  if (item.isExpandable) {
                    handleToggle(item.name);
                  } else {
                    navigate(item.path!);
                    handleSelect(item.name);
                  }
                }} 
                className={`menu-item ${selectedItem === item.name ? 'selected' : ''}`}
              >
                {item.icon} {item.name}
                {item.isExpandable && (
                  <span style={{ marginLeft: 'auto' }} onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(item.name);
                  }}>
                    {expandedItem === item.name ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </span>
                )}
              </div>
              {item.isExpandable && (
                <motion.div 
                  className="sub-items"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: (expandedItem === item.name || closingItem === item.name) ? 'auto' : 0,
                    opacity: expandedItem === item.name ? 1 : 0
                  }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence>
                    {(expandedItem === item.name || closingItem === item.name) && item.subItems?.map(subItem => (
                      <motion.div
                        key={subItem.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link 
                          to={subItem.path} 
                          className={`sub-item ${location.pathname === subItem.path ? 'selected' : ''}`}
                          onClick={() => {
                            handleSelect(item.name);
                          }}
                        >
                          <span className="sub-item-icon">{subItem.icon}</span>
                          <span className="sub-item-name">{subItem.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default Sidebar;