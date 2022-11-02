import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
// import Skeleton from '@mui/material/Skeleton';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MultiActionAreaCardMobile from './CardMobile';
import { FooterContainerMobile } from './FooterMobile';
import "./Common.css";

const drawerBleeding = 56;

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}
const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));
const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: 'transparent',

}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: `#404044`,
}));



export default function SwipeableEdgeDrawer(props: Props) {
    // const { window } = props;
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };



    return (
        <Root sx={{ display: { md: 'none', xs: 'block' } }}>

            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(95% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <IconButton
                sx={{ color: 'white' }}
                onClick={toggleDrawer(true)}>
                <MenuIcon ></MenuIcon>
            </IconButton>
            <SwipeableDrawer

                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={true}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <Puller />
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <MultiActionAreaCardMobile />
                    <FooterContainerMobile />
                </StyledBox>
            </SwipeableDrawer>
        </Root >
    );
}