import mysql.connector
import json
from flask import Flask, request, jsonify, send_from_directory
import os

frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../frontend_adminpage'))

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
            host='localhost',
            user='api_user',
            password='kronkorksholzhack2025',
            database='kronkorks'
    )

@app.route('/admin')
def admin_index():
    return send_from_directory(frontend_dir, 'index.html')

@app.route('/admin/<path:filename>')
def admin_static(filename):
    return send_from_directory(frontend_dir, filename)

@app.route('/backend/v1/templates', methods=['GET'])
def read_templates():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM templates")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return jsonify(rows)

@app.route('/backend/v1/templates', methods=['POST'])
def create_template():
    data = request.get_json()
    required = ("id", "name", "size", "slotNumber")
    if not data or not all(k in data for k in required):
        return jsonify({"error": "invalid input"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO templates(id, name, size, slotNumber) VALUES (%s, %s, %s, %s)",
            (data["id"], data["name"], data["size"], data["slotNumber"])
                )
        conn.commit()
    except mysql.connector.integrityError:
        return jsonify({"error": "Template with this ID already exists"}), 409
    finally:
        cursor.close()
        conn.close()
    return jsonify({"message": "Template created"}), 201


@app.route('/backend/v1/use-pin', methods=['POST'])
def use_pin():
    data = request.get_json()
    if not data or "pin" not in data:
        return jsonify({"error": "missing pin"}), 400

    pin = data["pin"]
    return jsonify({'status': 'success', 'reseived': pin})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
