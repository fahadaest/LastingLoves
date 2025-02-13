import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import { useSelector, useDispatch } from "react-redux";

function SideMenuMobile({ open, toggleDrawer }) {
    const profileData = useSelector((state) => state.auth.user);
    const [avatar, setAvatar] = React.useState(profileData?.avatar);

    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
            sx={{
                zIndex: 2500,
                [`& .${drawerClasses.paper}`]: {
                    backgroundImage: 'none',
                    backgroundColor: 'background.paper',
                },
            }}
        >
            <Stack
                sx={{
                    maxWidth: '70dvw',
                    height: '100%',
                }}
            >
                <Stack direction="row" sx={{ p: 2, pb: 0, gap: 1 }}>
                    <Stack
                        direction="row"
                        sx={{ gap: 1, alignItems: 'center', flexGrow: 1, p: 1 }}
                    >
                        <Avatar
                            alt="Profile Picture"
                            src={avatar}
                            sx={{
                                height: 36,
                                width: 36,
                                color: "#32AA27",
                            }}
                        />
                        <Typography component="p" variant="h6">
                            {profileData?.username}
                        </Typography>
                    </Stack>
                </Stack>
                <Divider />
                <Stack sx={{ flexGrow: 1 }}>
                    <MenuContent />
                    <Divider />
                </Stack>
                <Stack sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
                        Logout
                    </Button>
                </Stack>
            </Stack>
        </Drawer>
    );
}

SideMenuMobile.propTypes = {
    open: PropTypes.bool,
    toggleDrawer: PropTypes.func.isRequired,
};

export default SideMenuMobile;