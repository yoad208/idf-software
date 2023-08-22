import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

interface IMenuItem {
  title: string;
  path: string;
}

export const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: IMenuItem[] = [
    {
      title: 'ראשי',
      path: '/',
    },
    {
      title: 'כל הבדיקות',
      path: '/all-testing',
    },
    {
      title: 'הוספת גוב',
      path: '/add-gov',
    },
    {
      title: 'הוספת בדיקה',
      path: '/add-test',
    },
  ];

  return (
    <Drawer
      open
      variant="permanent"
      anchor="right"
      PaperProps={{
        sx: {
          width: drawerWidth,
          textAlign: 'center',
          color: 'whitesmoke',
          backgroundColor: '#263842',
          boxShadow: 2,
          zIndex: 0,
        },
      }}
    >
      <List sx={{ bgcolor: '#364752', py: '1rem' }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.title}
            component={Button}
            color="inherit"
            disableRipple
            sx={{
              bgcolor:
                location.pathname === item.path ? 'primary.dark' : 'inherit',
            }}
            onClick={() => navigate(`${item.path}`)}
          >
            <ListItemText sx={{ textAlign: 'center' }}>
              {item.title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
