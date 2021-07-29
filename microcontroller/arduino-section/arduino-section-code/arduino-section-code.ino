#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// set the LCD hex address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);

int moistureSensor = A0;
int timeInterval = 5;

// custom 5x8 characters to show on lcd display
uint8_t happyLeft[8] = {
  B00000,
  B00000,
  B01100,
  B10010,
  B00000,
  B00100,
  B00111,
  B00000
};

uint8_t happyRight[8] = {
  B00000,
  B00000,
  B00110,
  B01001,
  B00000,
  B00100,
  B11100,
  B00000
};

uint8_t sadLeft[8] = {
  B00000,
  B00000,
  B10010,
  B01100,
  B00000,
  B00111,
  B00100,
  B00000
};

uint8_t sadRight[8] = {
  B00000,
  B00000,
  B01001,
  B00110,
  B00000,
  B11100,
  B00100,
  B00000
};

void setup() {
  Serial.begin(9600);

  // moisture sensor setup
  pinMode(moistureSensor, INPUT);

  // lcd display setup
  lcd.begin();
  lcd.backlight();
  delay(500);

  lcd.createChar(0, happyLeft);
  lcd.createChar(1, happyRight);
  lcd.createChar(2, sadLeft);
  lcd.createChar(3, sadRight);

  lcd.home();
}

void loop() {
  // read data from sensor
  static float moistureValue = 0;
  moistureValue = analogRead(moistureSensor);
  Serial.print("Current sensor value: ");
  Serial.println(moistureValue);

  lcd.clear();

  if ((moistureValue >= 300) && (moistureValue <= 600)) {
    lcd.print("Happy ");
    lcd.print((char)0);
    lcd.print((char)1);
  } else {
    lcd.print("Sad ");
    lcd.print((char)2);
    lcd.print((char)3);
  }

  delay(1000 * timeInterval);
}
