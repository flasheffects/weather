import { useState } from "react";

// Weekdays
const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Weather = () => {
  const [data, setData] = useState<any>([]);
  const [cityName, setCityName] = useState("");

  const searchCity = async () => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&cnt=40&appid=48347592e269fea4f1fb465684c049c3`
    );
    const dataList = await res.json();
    setData(dataList);
    setCityName("");
  };

  const listing = data.length !== 0 && data.list;

  // Selling Umbrella
  const rainValues: any = [];
  const maxRainValue: any = [];
  const maxRainDay: any = [];

  const sellingUmbrella = () => {
    if (listing) {
      listing.map((i: any) => i.rain && rainValues.push(Object.values(i.rain)));
      maxRainValue.push(Math.max(...rainValues));
    }

    if (maxRainValue.length > 0) {
      listing.map(
        (i: any) =>
          i.rain &&
          Object.values(i.rain)[0] === maxRainValue[0] &&
          maxRainDay.push(i)
      );
    }
  };
  sellingUmbrella();

  // Selling Jacket
  const tempValues: any = [];
  const minTempValue: any = [];
  const minTempDay: any = [];

  const sellingJacket = () => {
    if (listing) {
      listing.map((i: any) => i.main.temp && tempValues.push(i.main.temp));
      minTempValue.push(Math.min(...tempValues));
    }

    if (minTempValue.length > 0) {
      listing.map(
        (i: any) =>
          i.main.temp &&
          i.main.temp === minTempValue[0] &&
          minTempValue[0] < 15 &&
          minTempDay.push(i)
      );
    }
  };
  sellingJacket();

  return (
    <div>
      <div
        className={`${
          data.list !== undefined ? "search-bar-top" : "search-bar"
        }`}
      >
        {data.list === undefined && <h1>weather forecast </h1>}
        <input
          placeholder="Enter City"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchCity()}
          type="text"
        />
        <button onClick={searchCity}>Search</button>
        {data.list === undefined && <h5>live weather reports</h5>}
      </div>

      <h1>{data.list !== undefined && data.city.name}</h1>
      {maxRainDay &&
        maxRainDay.map((i: any, index: number) => (
          <div key={index}>
            <div className="element-block-sell">
              <div>
                <h4>Better day to sell umbrella</h4>
                <h3>
                  {weekday[new Date(i.dt_txt).getDay()]}{" "}
                  {new Date(i.dt_txt).getDate()}
                </h3>
                <h3>{i.main.temp} °C</h3>
                <h5>{i.weather[0].description.toUpperCase()}</h5>
              </div>
            </div>
          </div>
        ))}

      {minTempDay &&
        minTempDay.map((i: any, index: number) => (
          <div key={index}>
            <div className="element-block-sell">
              <div>
                <h4>Better day to sell jacket</h4>
                <h3>
                  {weekday[new Date(i.dt_txt).getDay()]}{" "}
                  {new Date(i.dt_txt).getDate()}
                </h3>
                <h3>{i.main.temp} °C</h3>
                <h5>{i.weather[0].description.toUpperCase()}</h5>
              </div>
            </div>
          </div>
        ))}

      <div>
        {listing &&
          listing.map((i: any, index: number) => (
            <div key={index}>
              <div className="element-block">
                <div className="element">
                  <h4>
                    {weekday[new Date(i.dt_txt).getDay()]}{" "}
                    {new Date(i.dt_txt).getDate()}
                  </h4>

                  <h5>{new Date(i.dt_txt).getHours() + ":00"}</h5>
                </div>

                <div className="element">
                  <h4>{i.main.temp} °C</h4>
                  <h6>{i.weather[0].description.toUpperCase()}</h6>
                </div>

                <div className="element">
                  <img
                    src={`http://openweathermap.org/img/wn/${i.weather[0].icon}.png`}
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Weather;
