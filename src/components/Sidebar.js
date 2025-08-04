import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  SportsEsports as GameIcon,
  Home as HomeIcon,
  List as ListIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

const drawerWidth = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: theme === 'dark' ? '#1f2937' : '#2196F3',
    color: 'white',
    borderRight: theme === 'dark' ? '1px solid #374151' : 'none',
  },
}));

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Main', icon: <HomeIcon />, path: '/main' },
  { text: 'Coin Game', icon: <GameIcon />, path: '/coin-game' },
  { text: 'Todo List', icon: <ListIcon />, path: '/todo-list' },
];

const Sidebar = ({ open, onClose }) => {
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <StyledDrawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <List>
        {menuItems.map((item) => (
          <motion.div
            key={item.text}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover': {
                  backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar; 