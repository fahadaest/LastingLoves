import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Person2Icon from '@mui/icons-material/Person2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Diversity1Icon from '@mui/icons-material/Diversity1';

const mainListItems = [
    { text: 'My Profile', icon: <Person2Icon sx={{ color: "#32AA27" }} /> },
    { text: 'My Memories', icon: <Diversity1Icon sx={{ color: "#32AA27" }} /> },
    { text: 'Create Memory', icon: <AddCircleIcon sx={{ color: "#32AA27" }} /> },
];

export default function MenuContent() {

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
            <List dense>
                {mainListItems.map((item, index) => (
                    <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => handleListItemClick(index)}
                            sx={{
                                bgcolor: index === selectedIndex ? '#E2F9D8' : 'transparent',
                                '&:hover': {
                                    bgcolor: '#E2F9D8',
                                },
                                color: index === selectedIndex ? '#fff' : 'inherit',
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: "40px" }}>{item.icon}</ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography sx={{ color: '#595959', fontFamily: 'poppins', fontWeight: '500' }}>
                                        {item.text}
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Stack >
    );
}