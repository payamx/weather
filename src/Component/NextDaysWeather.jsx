import React from 'react';
import {Box, Divider} from "@mui/material";
import Stack from "@mui/material/Stack";
import {styled, useTheme} from "@mui/material/styles";

const NextDaysWeather = ({weatherData4, nextThreeDays}) => {

    const theme = useTheme();
    const Styledbox = styled(Box)(({theme}) =>
        (
            {
                [theme.breakpoints.down('sm')]: {
                    display: 'flex',

                    flexDirection: 'row-reverse',
                    margin:'20px',
                    paddingRight:'20px',
                }, [theme.breakpoints.up('md')]: {
                    display: 'inline-flex',
                    flexDirection: 'row-reverse',
                    padding: '25px 25px',

                },
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '20px',
                backgroundColor: 'rgba(65, 65, 75, 0.5)',
                backdropFilter: 'blur(7px)',
                textAlign:'center',
                margin: '30px 25px',

            }))



    return (




        <>
            <Box>

                {
                weatherData4?.forecast.forecastday?.map((item, index) =>



                    <Styledbox key={index}>


                        <Stack spacing={2} fontSize={20}>

                            <span>{nextThreeDays[index + 1]}</span>
                            {/*<span> {toFa[item.day.condition.text]}</span>*/}
                        </Stack>

                        <span>
                            <img src={item.day.condition.icon} width={80} height={80}/>

                        </span>

                        <Box padding={3} fontSize={32} >

                            {/*min temp*/}
                            <Box component="span"
                                 fontWeight={"bold"}
                                 sx={{ p: 2, m:1 ,border: '1px solid #FFFFFF' ,borderRadius:'15px',color:'darkblue',bgcolor:'#f5eeed'}}>
                                { Math.floor(item.day.mintemp_c) }<span style={{color: 'grey'}}>°</span>
                            </Box>
                                {/*//max temp*/}
                            <Box component="span"
                                 fontWeight={"bold"}
                                 sx={{  p: 2, m:1 ,border: '1px solid #FFFFFF' ,borderRadius:'15px' ,color:'orange',bgcolor:'#f5eeed'}}>
                                { Math.floor(item.day.maxtemp_c)}<span style={{color: 'grey'}}>°</span>
                        </Box>

                        </Box>

                        <Divider/>
                    </Styledbox>

                )}
        </Box>

</>
    );
};

export default NextDaysWeather;
