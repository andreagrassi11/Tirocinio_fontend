//MUI
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeIcon from '@mui/icons-material/Home';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
//CSS
import './LeftBar.css';
import {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import {useNavigate} from "react-router-dom";
import { Avatar } from '@mui/material';

export interface SimpleDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
}


function LeftBar({ onSelect }: any) {

    //Variable declaration
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(localStorage.getItem('section') || 'home');

    const handleItemClick = (item: string) => {
        let stateRender = localStorage.getItem('isSearchRender');
        if (stateRender === 'false' || stateRender === null) {
            localStorage.setItem('section', item);
            setSelectedItem(item);

            switch (item) {
                case ('home') : {
                    navigate("/homepage");
                    break;
                }
                case ('spettacoli') : {
                    navigate("/homepage/spettacoli");
                    break;
                }
                case ('risultati') : {
                    navigate("/homepage/risultati");
                    break;
                }
                case ('avviaSpettacoli') : {
                    navigate("/homepage/avvia/spettacoli");
                    break;
                }
            }
        }
    };

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (
        <>
            <Grid sx={{display: {xs: 'none', md: 'block'}}} className='leftBarGrid'>
                
                <List sx={{width: '100%', color: 'white'}}>
                    <ListItem className='noPaddingTopBottom' onClick={function (event) {
                        handleItemClick("home");
                    }}>
                        <ListItemButton
                            className={selectedItem === "home" ? "selected" : ""}
                            sx={{
                                marginLeft: '-16px',
                                borderRadius: '0 22px 22px 0',
                                marginRight: '-16px',
                                color: 'white',
                                ':hover': {backgroundColor: '#382d2c'},
                            }}
                            disableRipple>
                            <HomeIcon className='icon'/>
                            <ListItemText primary="Home"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem className='noPaddingTopBottom' onClick={function (event) {
                        handleItemClick("spettacoli");
                    }}>
                        <ListItemButton
                            className={selectedItem === "spettacoli" ? "selected" : ""}
                            sx={{
                                marginLeft: '-16px',
                                borderRadius: '0 22px 22px 0',
                                marginRight: '-16px',
                                color: 'white',
                                ':hover': {backgroundColor: '#382d2c'},
                            }}
                            disableRipple>
                            <FormatListBulletedIcon className='icon'/>
                            <ListItemText primary="Spettacoli"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem className='noPaddingTopBottom' onClick={function (event) {
                        handleItemClick("avviaSpettacoli");
                    }}>
                        <ListItemButton
                            className={selectedItem === "avviaSpettacoli" ? "selected" : ""}
                            sx={{
                                marginLeft: '-16px',
                                borderRadius: '0 22px 22px 0',
                                marginRight: '-16px',
                                color: 'white',
                                ':hover': {backgroundColor: '#382d2c'},
                            }}
                            disableRipple>
                            <PlayCircleIcon className='icon'/>
                            <ListItemText primary="Avvia Spettacoli"/>
                        </ListItemButton>
                    </ListItem>

                    <ListItem className='noPaddingTopBottom' onClick={function (event) {
                        handleItemClick("risultati");
                    }}>
                        <ListItemButton
                            className={selectedItem === "risultati" ? "selected" : ""}
                            sx={{
                                marginLeft: '-16px',
                                borderRadius: '0 22px 22px 0',
                                marginRight: '-16px',
                                color: 'white',
                                ':hover': {backgroundColor: '#382d2c'},
                            }}
                            disableRipple>
                            <EmojiEventsIcon className='icon'/>
                            <ListItemText primary="Risultati"/>
                        </ListItemButton>
                    </ListItem>
                </List>
                
                <div className="logout" onClick={()=>{logout()}}>
                    <Grid container className='logoutGrid'>
                        <Grid item xs={4}>
                            <ExitToAppIcon style={{fontSize: '40px'}}></ExitToAppIcon>
                        </Grid>
                        <Grid item xs={8}>
                            <h1 style={{fontSize: '20px', marginLeft: '15px'}}>Logout</h1>
                        </Grid>
                    </Grid>
                </div>
            </Grid>
        </>
    );
}

export default LeftBar;