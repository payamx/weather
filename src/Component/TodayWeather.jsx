import React from 'react';
import {Box, Typography} from "@mui/material";
import {styled, useTheme} from "@mui/material/styles";
import {toFa} from "./toFarsi";


const TodayWeather = ({weatherData4, nextThreeDays}) => {

    const theme = useTheme();
    const Styledbox = styled(Box)(({theme}) =>
        (

            {

                display: 'inline-flex',
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
                backdropFilter: 'blur(7px)',
            }))


    return (

        <Styledbox>

            <Box>

                <Box fontSize={65} p={5}> {weatherData4?.current.temp_c}°C</Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '10px',
                    margin: '25px 5px',
                    alignItems: 'center'
                }}>
                    <Typography fontSize={35}> {weatherData4?.location.name},</Typography>
                    <Typography fontSize={20} alignSelf={"self-end"}> {weatherData4?.location.country} </Typography>
                    {/*<p>{weatherData4.location.localtime.slice(11)}</p>*/}

                </Box>

            </Box>


            <Box>

                <img src={weatherData4?.current.condition.icon} width={200} height={200}/>
                <p> <span>  { weatherData4?.current.is_day? 'امروز':'امشب' }</span> {nextThreeDays[0]}</p>


                <p>  {toFa[weatherData4?.current.condition.text]}  </p>
            </Box>

        </Styledbox>

    );
};

export default TodayWeather;
