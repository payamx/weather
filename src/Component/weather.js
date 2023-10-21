import React, {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import {Box} from "@mui/material";
import {defaultImages, mapping} from "../background_mapping";
import {styled} from '@mui/material/styles';
import Search from "./Search";
import TodayWeather from "./TodayWeather";
import NextDaysWeather from "./NextDaysWeather";
import {useTheme} from '@mui/material/styles';
import {RainEffectComponent} from "./RainDrop";
import Errorpage from "./Errorpage";

const Weather = () => {


    const [weatherData4, setWeatherData4] = useState(null);
    const [cityName, setCityName] = useState('');
    const [error,setError]=useState(false);


    const theme =useTheme();
    const images = mapping[weatherData4?.current.condition?.text ] || defaultImages;

    const DivStyle = styled(Box)(({theme}) =>
        (

    {
    [theme.breakpoints.down('sm')]:
    {backgroundImage: `url(${images.mobile[Math.floor(Math.random() * images.mobile.length)]})`,
        backgroundSize: 'fill' },
    [theme.breakpoints.up('md')]:
        {backgroundImage:`url(${images.desktop[Math.floor(Math.random() * images.desktop.length)]})`,
            height:'100vh'  , backgroundSize: 'cover'
        },
        textAlign: "center",
        backgroundRepeat:"no-repeat",
        backgroundPosition: 'center',
        color:'#ffffff',
        marginY:'20px',

            }))


    // get ip based lat &long

    const getLocation = async () => {
        const response = await axios.get('http://ip-api.com/json', {
            params: {fields: "status,country,city,lat,lon,timezone"}
        })
        return {lat: response.data.lat, lon: response.data.lon};

    }

    // get weather by lat long
    const getWether4DayByLatLong = async (lat, long) => {


        try {

            const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
                params: {
                    key: "8b58a5298daa4a31948201219232109", q: `${lat},${long}`, days: 4, aqi: "no", alerts: "yes"

                }
            })
            setWeatherData4(res.data)


        } catch (e) {
            console.log(e, "getWether4DayByLatLong error  ")
            setError(true)
        }

    };


    // get weather 4 next days forecast  by city name
    const getWether4DayByCity =  async () => {

        try {
            const res = await axios.get(`https://api.weatherapi.com/v1/forecast.json`, {
                params: {
                    key: "8b58a5298daa4a31948201219232109", q: cityName, days: 4

                }
            })
            setWeatherData4(res.data)
            // console.log(weatherData4)
        } catch (e) {
            // console.log(e, "getWether4DayByCity ")
        }

    }
    useEffect(() => {
        let call=true;

        if (cityName) {
            getWether4DayByCity()

                   }
        return () => {
            call = false;
        };
    }, [cityName])


    useEffect(() => {
        let call=true
        getLocation()
            .then((r) => {
                getWether4DayByLatLong(r.lat, r.lon)

            })
            .catch((e) => {
                console.log(e)
            })
        return()=>{ call=false}

    }, []);


    const today = new Date().toLocaleDateString('fa-IR', {weekday: 'long'});

// Get the next 3 days.
    const nextThreeDays = [];
    for (let i = 0; i <= 3; i++) {
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + i);
        nextThreeDays.push(nextDay.toLocaleDateString('fa-IR', {weekday: 'long'}));
    }
    const handleClick=(e)=>{
        setCityName(e.target.value)

    }

    return (

        error? <Errorpage/>:
        <DivStyle >
            {/*weatherData4?.current.condition.text   این استیت باید بعنوان پراپس وارد شود ولی چون هوا آفتابی هست 😂 فعلا  استاتیک مقدار دادم که افکت دیده شه */}
            <RainEffectComponent weatherCondition={' rain'}/>

            <Box>

                <Search setCityName={handleClick} cityName={cityName}/>

            </Box>


                <TodayWeather  weatherData4={weatherData4} nextThreeDays={nextThreeDays}/>


                <NextDaysWeather weatherData4={weatherData4} nextThreeDays={nextThreeDays}/>


        </DivStyle>

    )
};

export default Weather;
