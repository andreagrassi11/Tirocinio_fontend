//MUI
//Component
import LeftBar from '../../../Components/homepage/LeftBar';
//JS
//Other
import React from 'react';
import Grid from '@mui/material/Grid';

interface HomepageProps {
    componentToRender: React.ComponentType;
}

const Homepage: React.FC<HomepageProps> = ({componentToRender: Component}) => {
    //Style
    document.body.style.backgroundImage = '';

    //Render
    return (
        <>
            <Grid container wrap='nowrap'>
                <Grid item xs={2}>
                    <LeftBar/>
                </Grid>

                <Grid item xs={10}>
                    <Component/>
                </Grid>
            </Grid>
        </>
    );
}

export default Homepage;