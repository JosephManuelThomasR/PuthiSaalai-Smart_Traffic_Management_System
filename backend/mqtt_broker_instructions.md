# MQTT Broker (local) Instructions

For the local simulation we use a lightweight MQTT broker. Options:

1) Install Mosquitto (recommended)
   - Ubuntu/Debian: `sudo apt install mosquitto`
   - Start broker: `sudo service mosquitto start`
   - Verify: `mosquitto_sub -t '#' -v` in a terminal will show published messages.

2) If you cannot install system broker, install `hbmqtt` or use cloud MQTT services (Adafruit IO) and update MQTT_BROKER in scripts.

Ensure `backend/app.py` connects to the same broker address.
