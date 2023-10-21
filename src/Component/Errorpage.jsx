import React from 'react';
import {styled, useTheme} from "@mui/material/styles";
import {Box} from "@mui/material";

const Errorpage = () => {

    const theme = useTheme();
    const Styledbox = styled(Box)(({theme}) =>
        (

            {

                display: 'flex',
                [theme.breakpoints.down('md')]: {
                    flexDirection: 'column',
                }, [theme.breakpoints.up('md')]: {
                    flexDirection: 'row',
                },
                justifyContent: 'center',
                padding: '25px 25px',
                margin: '30px 25px',
                alignItems: 'center',
                borderRadius: '20px',
                backgroundColor: 'rgba(65, 65, 75, 0.5)',
            }))



    return (
        <Styledbox >

            <img src="/Errorimage.jpg" height={'100%'}   width={'100%'} />
        </Styledbox>
    );
};

export default Errorpage;
