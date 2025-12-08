# Prototype Demo Steps (Local Simulation)

1. Install Python 3.8+ and create a virtual environment:
   ```
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Install backend requirements:
   ```
   pip install -r backend/requirements.txt
   ```

3. Start backend (Flask + simple MQTT listener):
   ```
   python3 backend/app.py
   ```
   This runs on http://127.0.0.1:5000

4. Start edge simulator (vehicle counting)
   ```
   python3 edge/vehicle_counter.py --simulate
   ```
   This will publish simulated vehicle counts every 3 seconds to the backend's MQTT topic.

5. Open `dashboard/index.html` in a browser (file:// or via a simple static server).
   The dashboard will poll the backend API and show current counts, allow manual diversion toggles.

6. Use the dashboard's "Manual Override" buttons to simulate police intervention.
