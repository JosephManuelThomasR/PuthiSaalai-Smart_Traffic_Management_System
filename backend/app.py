# Minimal Flask backend to receive simulated MQTT messages and expose REST endpoints.
from flask import Flask, jsonify, request
from flask_cors import CORS
import threading, time, json
import paho.mqtt.client as mqtt

app = Flask(__name__)
CORS(app)

# In-memory store for demo (intersection_id -> latest data)
store = {}

MQTT_BROKER = 'localhost'
MQTT_PORT = 1883
MQTT_TOPIC = 'puthisaalai/+/counts'  # + will match intersection id

def on_connect(client, userdata, flags, rc):
    print('MQTT connected with rc', rc)
    client.subscribe('puthisaalai/+/counts')

def on_message(client, userdata, msg):
    try:
        payload = msg.payload.decode()
        data = json.loads(payload)
        # topic format puthisaalai/{intersection}/counts
        parts = msg.topic.split('/')
        intersection = parts[1] if len(parts) > 1 else 'unknown'
        store[intersection] = {'ts': time.time(), 'data': data}
        print('Received', intersection, data)
    except Exception as e:
        print('MQTT message parse error', e)

def mqtt_thread():
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    try:
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
    except Exception as e:
        print('Could not connect to MQTT broker:', e)
        return
    client.loop_forever()

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({'status': 'ok', 'store': store})

@app.route('/api/override', methods=['POST'])
def override():
    """
    Police manual override endpoint.
    Body: { "intersection": "A", "action": "divert", "notes": "procession" }
    """
    payload = request.get_json(force=True)
    # For demo we just echo back and update store
    intersection = payload.get('intersection', 'unknown')
    action = payload.get('action', 'none')
    store.setdefault(intersection, {})['manual_override'] = {'action': action, 'by': 'police', 'ts': time.time()}
    return jsonify({'result': 'ok', 'intersection': intersection, 'action': action})

if __name__ == '__main__':
    # Start MQTT listener in background thread
    t = threading.Thread(target=mqtt_thread, daemon=True)
    t.start()
    app.run(host='0.0.0.0', port=5000, debug=True)
