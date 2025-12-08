# Wiring & Connections (high level)

- Ultrasonic sensor HC-SR04
  VCC -> 5V
  GND -> GND
  TRIG -> ESP32 GPIO
  ECHO -> ESP32 GPIO (use level shifting / voltage divider)

- IR break-beam
  VCC -> 3.3V
  GND -> GND
  SIGNAL -> ESP32 GPIO

- ESP32 <-> LoRa SX1278
  SPI pins (MOSI/MISO/SCLK), NSS, RESET, DIO0 -> ESP32

- Raspberry Pi
  - USB webcam -> USB port
  - Pi runs `edge/vehicle_counter.py` to process camera feed and publish counts via MQTT (or HTTP) to backend.

Security:
- Place sensors in weatherproof enclosures.
- Use opto-isolators for noisy inductive loads (if any).
