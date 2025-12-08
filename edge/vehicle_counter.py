# Lightweight vehicle counting script using OpenCV background subtraction.
# For the hackathon prototype we support two modes:
# 1) --camera : use attached webcam (index 0)
# 2) --simulate : generate synthetic counts and publish via MQTT
#
# This script publishes JSON messages to MQTT topic puthisaalai/{intersection}/counts

import argparse, time, json, random
try:
    import cv2
    have_cv = True
except Exception:
    have_cv = False
import paho.mqtt.client as mqtt

MQTT_BROKER = 'localhost'
MQTT_PORT = 1883

def publish_count(intersection, count):
    client = mqtt.Client()
    try:
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        payload = {'intersection': intersection, 'count': count, 'ts': time.time()}
        topic = f'puthisaalai/{intersection}/counts'
        client.publish(topic, json.dumps(payload))
        client.disconnect()
        print('Published', topic, payload)
    except Exception as e:
        print('MQTT publish error', e)

def simulate_mode(intersection):
    while True:
        # Simulate morning peak / lull cycles
        base = random.randint(5, 30)
        spike = random.choice([0, 0, random.randint(10, 60)])
        count = base + spike
        publish_count(intersection, count)
        time.sleep(3)

def camera_mode(intersection):
    if not have_cv:
        print('OpenCV not installed. Install opencv-python.')
        return
    cap = cv2.VideoCapture(0)
    backSub = cv2.createBackgroundSubtractorMOG2(history=300, varThreshold=16, detectShadows=True)
    while True:
        ret, frame = cap.read()
        if not ret:
            print('Camera read failed')
            break
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        fg = backSub.apply(gray)
        # Morphology to reduce noise
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3,3))
        fg = cv2.morphologyEx(fg, cv2.MORPH_OPEN, kernel)
        # Count contours as vehicles (simple heuristic)
        contours, _ = cv2.findContours(fg, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        count = 0
        for c in contours:
            area = cv2.contourArea(c)
            if area > 500:  # tune threshold
                count += 1
        publish_count(intersection, count)
        cv2.imshow('fg', fg)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--simulate', action='store_true', help='Run in simulation mode')
    parser.add_argument('--camera', action='store_true', help='Use webcam for counting')
    parser.add_argument('--intersection', default='A', help='Intersection id (default A)')
    args = parser.parse_args()
    if args.simulate:
        simulate_mode(args.intersection)
    elif args.camera:
        camera_mode(args.intersection)
    else:
        print('Choose --simulate or --camera')
