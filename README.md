# PuthiSaalai - Smart Traffic Management (Prototype)
**Authors:** Embedded Systems Team (Police Hackathon Submission)
**Purpose:** Lightweight, low-cost working prototype demonstrating smart traffic management features suitable for the Tuticorin District Police cyber hackathon.

## Contents
- `hardware/` - BOM, wiring diagrams, deployment notes.
- `edge/` - Raspberry Pi / ESP32 level scripts (vehicle counting & sensor simulation).
- `backend/` - Flask backend + MQTT simulator to receive & display data.
- `dashboard/` - Simple web dashboard (HTML/JS) for police control & visualization.
- `mobile/` - Notes for a Flutter mobile app (skeleton).
- `data/` - Sample simulated traffic datasets.
- `prototype_demo.md` - Step-by-step demo to run the full prototype locally.
- `run_demo.sh` - Single script to start components locally (simulation).

## Quick start (local simulation)
1. Open a terminal on a machine with Python 3.8+.
2. `cd` into the repo folder.
3. Create a virtualenv and install: `pip install -r backend/requirements.txt`
4. In separate terminals run:
   - `python3 backend/app.py`        # Starts Flask backend + simple MQTT subscriber
   - `python3 edge/vehicle_counter.py --simulate`  # Simulates camera-based vehicle counts and publishes to backend
   - Open `dashboard/index.html` in a browser for the police dashboard UI.
5. Follow `prototype_demo.md` for full instructions.

## Notes
- This repo uses simulated datasets and camera input for hackathon rules compliance.
- All components are intentionally lightweight: background-subtraction counting (OpenCV) and MQTT for messaging. No sensitive police data is used.
