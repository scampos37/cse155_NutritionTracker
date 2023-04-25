# Flask Web App, SQLite3

from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# Home page
@app.route('/index')
@app.route('/')
def index():
    return render_template('index.html')


# image upload page
@app.route('/entry')
def entry():
    return render_template('entry.html')

# image upload page
@app.route('/entry', methods=['POST'])
def entry_post():
    if request.method == 'POST':
        f = request.files['file']
        f.save(f.filename)
        return redirect(url_for('confirm'))
    
# display nutrition info
@app.route('/confirm')
def confirm():
    return render_template('confirm.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
