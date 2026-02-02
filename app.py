from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = "supersecretkey"  # For session management

# --- Simple login credentials ---
USERNAME = "admin"
PASSWORD = "admin"

# --- Sample machine data ---
machines = [
    {'name':'Engine Line A','runtime':8,'downtime':1,'output':120,'risk':'Low','recommendation':'Continue operation','image':'engine_line_a.png'},
    {'name':'Engine Line B','runtime':9,'downtime':1.5,'output':115,'risk':'Medium','recommendation':'Schedule maintenance','image':'engine_line_b.png'},
    {'name':'Paint Line','runtime':10,'downtime':3,'output':90,'risk':'High','recommendation':'Check paint quality','image':'paint_line.png'},
    {'name':'Assembly Line','runtime':12,'downtime':2,'output':110,'risk':'Medium','recommendation':'Monitor assembly','image':'assembly_line.png'}
]

# ------------------- Routes -------------------

# Login page
@app.route("/", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if username == USERNAME and password == PASSWORD:
            session['logged_in'] = True
            return redirect(url_for("dashboard"))
        else:
            error = "Invalid credentials. Try again."
    return render_template("login.html", error=error)

# Dashboard page
@app.route("/dashboard")
def dashboard():
    if not session.get('logged_in'):
        return redirect(url_for("login"))
    return render_template("dashboard.html", machines=machines)

# Logout route
@app.route("/logout")
def logout():
    session.pop('logged_in', None)
    return redirect(url_for("login"))

# ------------------- Run App -------------------
if __name__ == "__main__":
    app.run(debug=True)