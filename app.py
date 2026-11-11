from pathlib import Path
import sqlite3
from datetime import datetime, timezone

from flask import Flask, jsonify, render_template, request

BASE_DIR = Path(__file__).resolve().parent
DATABASE = BASE_DIR / "portfolio_messages.db"

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 1 * 1024 * 1024


def get_db():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    with get_db() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL,
                subject TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
        """)
        connection.commit()


@app.get("/")
def home():
    return render_template("index.html")


@app.post("/contact")
def contact():
    data = request.get_json(silent=True) or request.form
    full_name = str(data.get("fullName", "")).strip()
    email = str(data.get("email", "")).strip()
    subject = str(data.get("subject", "")).strip()
    message = str(data.get("message", "")).strip()

    if not all((full_name, email, subject, message)):
        return jsonify(success=False, message="Please complete all fields."), 400
    if len(full_name) > 100 or len(email) > 254 or len(subject) > 150 or len(message) > 5000:
        return jsonify(success=False, message="One or more fields are too long."), 400
    if "@" not in email or "." not in email.rsplit("@", 1)[-1]:
        return jsonify(success=False, message="Please enter a valid email address."), 400

    created_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
    with get_db() as connection:
        connection.execute(
            """INSERT INTO messages
               (full_name, email, subject, message, created_at)
               VALUES (?, ?, ?, ?, ?)""",
            (full_name, email, subject, message, created_at),
        )
        connection.commit()

    return jsonify(success=True, message="Thanks! Your message has been saved successfully.")


@app.get("/health")
def health():
    return jsonify(status="ok")


if __name__ == "__main__":
    init_db()
    app.run(host="127.0.0.1", port=5000, debug=True)
