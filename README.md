<br/>

<p align="center">
<img height="150px" width="auto" src="https://raw.githubusercontent.com/farhan2077/happy-plant/main/happy-plant-logo.svg"/>
</p>

<br/>

<div align="center">
    <h1>Happy Plant</h1>

<strong>A project using microcontroller and web technologies to keep your plants happy</strong>

</div>

## Setup

### Prerequisites

Check out each individual folders for detailed requirements.

### How to run

Check out each individual folders for detailed setup process.

1. Download or clone the repository.

```sh
git clone https://github.com/farhan2077/happy-plant.git
```

2. Deploy `backend` and `frontend`. While deploying `frontned` make sure to add your `.env` file similar to [`.env.example`](https://github.com/farhan2077/happy-plant/blob/main/frontend/.env.example).

3. The microcontroller folder has two seperate folders for two different microcontrollers. Each of them has their own schematics (which can be found in the folders). Connect all the required hardwares according to the schematics.

4. Now burn the code from `arduino-section-code` folder to `Arduino Uno`.
5. Before you burn the code from `wifi-module-section-code` folder to `NodeMCU EXP8266` make sure to chenge the following `constants`.

```c
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* apiUrl = "YOUR_BACKEND_API_URL";
```

NOTE: Here in case of `apiUrl`, remove the `s` from the url of the `https` part and add `/api/v1/plants` at the end of the `backend url` (Ex: Let's say your `backend url` is `https://example.com`, so your `apiUrl` will be `http://example.com/api/v1/plants`).

## Contribute

Any pull requests are welcome.

## License

Everything is free to use except for the logo inspired by [this dribble](https://dribbble.com/shots/2057485-Smiley) and illustrations inspired by [this adobe stock photo](https://stock.adobe.com/images/cute-sad-wilted-plant-in-a-pot-stages-of-withering-abandoned-and-scared-houseplant-without-watering-and-care-potted-plant-dying-vector-illustration/356342166) used in `frontend`. I do not own any kind of rights to those logo or illustrations.
