int moistureAnalogSensor = A7;
int moistureSensor1Supply = 2;
int moistureSensor2Supply = 5;
int moistureSensor3Supply = 8;
int valvePin = 4;
int pompPin = 6;
unsigned long lastRead = 0;
int pompAttempts[] = {0, 0};
int maxAttempts = 3;
void setPomp(bool value) {
  digitalWrite(pompPin, value ? HIGH : LOW);
}

void setValve(bool value) {
  digitalWrite(valvePin, value ? HIGH : LOW);
}

double readFromSensor(int sensor) {
  int supplyPin;
  int value;
  switch (sensor) {
    case 1:
      supplyPin  = moistureSensor1Supply;
      break;
    case 2:
      supplyPin  = moistureSensor2Supply;
      break;
    case 3:
      supplyPin  = moistureSensor3Supply;
      break;
  }
  digitalWrite(supplyPin, HIGH);
  delay(100);
  value = analogRead(moistureAnalogSensor);
  digitalWrite(supplyPin, LOW);
  if (value/1024.0 < 0.5){
    if (pompAttempts[sensor-1] < maxAttempts){
      pompAttempts[sensor-1]++;
      pompWater(sensor-1);
    }
  } else {
    pompAttempts[sensor-1] = 0;
  }
  return value/1024.0;
}

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  pinMode(valvePin, OUTPUT);
  pinMode(pompPin, OUTPUT);
  pinMode(moistureSensor1Supply, OUTPUT);
  pinMode(moistureSensor2Supply, OUTPUT);
  pinMode(moistureSensor3Supply, OUTPUT);

}

void pompWater(bool valve) {
  setValve(valve);
  setPomp(true);
  delay(1000);
  setValve(false);
  setPomp(false);
}

void readMessage(char message[]){
  for(int i = 0; i < sizeof(message)/sizeof(message[0]) && message[i] != 0; i++){
    char field = message[i];
    if (field == 'f'){
      if (message[i+1] == ':'){
        int value = message[i+2]-'0';
        i += 2;
        pompWater(value);
      }
    }
  }
}
void resetMessage(char message[]){
    for(int i = 0; i < sizeof(message)/sizeof(message[i]); i++){
      message[i] = 0;
    }
}

void loop() {
  delay(100);
  int i = 0;
  char message[256];
  resetMessage(message);
    while (Serial1.available() > 0) {
    char incomingByte = Serial1.read();
    message[i] = incomingByte;
    i++;
  }
  readMessage(message);
  if (millis() - lastRead > 10000 || millis() < lastRead){
    lastRead = millis();
    double moisture = readFromSensor(1);
    Serial1.print("{\"s1\":");
    Serial1.print(String(moisture,2));
    moisture = readFromSensor(2);
    Serial1.print(",\"s2\":");
    Serial1.print(String(moisture,2));
    if (pompAttempts[0] >= maxAttempts || pompAttempts[1] >= maxAttempts){
          Serial1.print(",\"error\":\"pomp_error\"");
    }
    Serial1.println('}');
  }
}
