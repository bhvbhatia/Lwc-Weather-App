import { LightningElement } from "lwc";
import getWeatherData from "@salesforce/apex/WeatherApiController.getWeatherData";
import Latitude from "@salesforce/schema/Asset.Latitude";
import Longitude from "@salesforce/schema/Asset.Longitude";

export default class WeatherAPIApp extends LightningElement {
  city;
  weatherIcon;
  weatherText;
  temp;
  mapMarkers;
  location = { City: "", Country: "" };
  zoomLevel = 15;

  handleCity(event) {
    this.city = event.target.value;
  }

  handleGetWeather(event) {
    getWeatherData({ city: this.city })
      .then((response) => {
        let weatherParseData = JSON.parse(response);
        this.weatherIcon = weatherParseData.current.condition.icon;
        this.weatherText = weatherParseData.current.condition.text;
        this.temp = weatherParseData.current.temp_c;
        this.location.City = weatherParseData.location.name;
        this.location.Country = weatherParseData.location.country;
        this.updateMap();
      })
      .catch((error) => {
        this.weatherText = "No Matching location or city found";
        console.error("----error---- " + JSON.stringify(error));
      });
  }

  updateMap() {
    this.mapMarkers = [
      {
        location: {
          City: this.location.City,
          Country: this.location.Country
        },
        title: this.location.City
      }
    ];
  }
}
