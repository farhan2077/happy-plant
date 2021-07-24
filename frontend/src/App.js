import { useState, useEffect } from "react";

import { agent } from "../src/helpers/agent";

import styles from "./App.module.css";
import logoBig from "../src/assets/logo-big.svg";
import happyPlant from "../src/assets/happy-plant.svg";
import sadPlant from "../src/assets/sad-plant.svg";

// limit for values from moisture sensor
let upperValue = 600;
let lowerValue = 300;

let intervalValue = 60 * 30; // unit in second

function App() {
  const [plantData, setPlantData] = useState("");

  useEffect(() => {
    const fetchPlantReading = () => {
      agent
        .getPlantLastReading()
        .then((res) => res.json())
        .then((data) => setPlantData(data));
    };
    fetchPlantReading();
  }, []);

  useEffect(() => {
    const fetchPlantReading = () => {
      agent
        .getPlantLastReading()
        .then((res) => res.json())
        .then((data) => setPlantData(data));
    };

    let interval = setInterval(() => fetchPlantReading(), 1000 * intervalValue);
    return () => clearInterval(interval);
  }, []);

  console.log("data", plantData);

  return (
    <div className={styles.container}>
      <header>
        <img src={logoBig} className={styles.logo} alt="Happy plant logo" />
      </header>
      <main className={styles.main}>
        {plantData.success && plantData.data.length ? (
          <div>
            <div className="">
              {plantData.data[0].reading < upperValue &&
              plantData.data[0].reading > lowerValue ? (
                <img src={happyPlant} alt="Happy plant" className="" />
              ) : (
                <img src={sadPlant} alt="Sad Plant" className="" />
              )}
            </div>
            <p className="">Soil moisture is {plantData.data[0].reading}</p>
          </div>
        ) : (
          <div className="">
            Can not display plant status 😢.
            <br />
            Check if everything is working or try again later.
          </div>
        )}
      </main>
      <footer className={styles.footer}>
        Made with ❤️ by{" "}
        <a
          href="https://happy-plant.netlify.app/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          some students of ECE 18
        </a>
      </footer>
    </div>
  );
}

export default App;
