import React, { useEffect, useState } from "react";
import "../index.css";
import TextField from '@material-ui/core/TextField';
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined';

function Tempapp() {
    const [city, setCity] = useState("Pune");
    const [search, setSearch] = useState({
        place: "",
        Temp: "",
        maxTemp: "",
        minTemp: "",
    });
    useEffect(() => {
        const fetchApi = async () => {
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=edfeca4053a3fffcf8dc71751ad9adf8`;
            const response = await fetch(url);
            const resJson = await response.json();

            if (resJson.cod === 200) {
                console.log(resJson.main.temp_max);
                setSearch((val) => {
                    return {
                        place: resJson.name,
                        Temp: Math.round(resJson.main.temp * 10)/100,
                        maxTemp: Math.round(resJson.main.temp_max * 10)/100,
                        minTemp: Math.round(resJson.main.temp_min * 10)/100,
                    }

                })
            }
            else {
                setSearch((val) => {
                    return {
                        place: val.place,
                        Temp: val.Temp,
                        maxTemp: val.maxTemp,
                        minTemp: val.minTemp,
                    }

                })

            }


        }
        fetchApi(

        );

    }, [city])



    return (
        <><div className="mainBody">
           <TextField id="standard-basic" label="Enter place..." 
               onChange={(e) => { setCity(e.target.value) }}
               style={{margin:"10px 30px",width:"80%"}}
           />
                


            
            <div className="info">
                <h1> <WbSunnyOutlinedIcon></WbSunnyOutlinedIcon>  {search.place}</h1>
                <h2>
                    Temerature:{search.Temp}°C
                </h2>
                <h3>
                    Min Temp:{search.minTemp}°C | Max Temp:{search.maxTemp}°C
                </h3>
            </div>
        </div>
        </>
    )

}
export default Tempapp;