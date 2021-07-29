#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* apiUrl = "YOUR_BACKEND_API_URL";

int moistureSensor = A0;
int timeInterval = 60 * 30;

void setup() {
  Serial.begin(115200);

  // moisture sensor setup
  pinMode(moistureSensor, INPUT);

  // wifi module setup
  WiFi.begin(ssid, password);
  Serial.print("Connecting...");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected with wifi successfully.");
}

void loop() {
  // read data from sensor
  static float moistureValue = 0;
  moistureValue = analogRead(moistureSensor);
  Serial.println("Current sensor value: ");
  Serial.print(moistureValue);

  // convert to json
  static char outputJson[20];
  StaticJsonDocument<200> doc;
  doc["reading"] = moistureValue;
  serializeJson(doc, outputJson);

  if (WiFi.status() == WL_CONNECTED ) {
    WiFiClient client;
    HTTPClient http;

    Serial.print("[HTTP] begin...\n");
    http.begin(client, apiUrl);
    http.addHeader("Content-Type", "application/json");

    Serial.print("[HTTP] POST...\n");
    int httpCode = http.POST(outputJson);

    // httpCode will be negative on error
    if (httpCode > 0) {
      // HTTP header has been send and Server response header has been handled
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      // file found at server
      if (httpCode == HTTP_CODE_OK) {
        const String& payload = http.getString();
        Serial.println("received payload:\n<<");
        Serial.println(payload);
        Serial.println(">>");
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
    delay(1000 * timeInterval);
  } else {
    Serial.println("Problem with WiFi connection");
  }
}
