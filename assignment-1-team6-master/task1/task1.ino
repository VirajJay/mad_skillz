//since the instructions say: blink led when a new input is given, I assumed it to be a change of state in the PIR output sensor

int sensor_IO=8;
int led=13;
int sensor_state;

void setup() {
   
  Serial.begin(9600);
  pinMode(sensor_IO, INPUT);
  pinMode(led, OUTPUT); 

}

void loop() {
  // put your main code here, to run repeatedly:

  sensor_state=digitalRead(sensor_IO);
  if(sensor_state==HIGH)
  {
    //blink led
    digitalWrite(led, HIGH);
    delay(100);
    digitalWrite(led, LOW);
    delay(100);
    digitalWrite(led, HIGH);
    delay(100);
    digitalWrite(led, LOW);
    delay(100);
    digitalWrite(led, HIGH);
    delay(100);
    digitalWrite(led, LOW);
    delay(100);
    digitalWrite(led, HIGH);
    delay(100);
    digitalWrite(led, LOW);
  }
 
  

}
