# Flask Web App, SQLite3

from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os
import json

app = Flask(__name__)
CORS(app)
maindir = os.path.dirname(os.path.abspath(__file__))

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(maindir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'secret-key'
db = SQLAlchemy(app)

class Goals(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    calories = db.Column(db.Integer, nullable=False)
    carbs = db.Column(db.Integer, nullable=False)
    cholesterol = db.Column(db.Integer, nullable=False)
    fiber = db.Column(db.Integer, nullable=False)
    monoFat = db.Column(db.Integer, nullable=False)
    polyFat = db.Column(db.Integer, nullable=False)
    potassium = db.Column(db.Integer, nullable=False)
    protein = db.Column(db.Integer, nullable=False)
    satFat = db.Column(db.Integer, nullable=False)
    sodium = db.Column(db.Integer, nullable=False)
    sugar = db.Column(db.Integer, nullable=False)

    def __init__(self, calories, carbs, cholesterol, fiber, monoFat, polyFat, potassium, protein, satFat, sodium, sugar):
        self.calories = calories
        self.carbs = carbs
        self.cholesterol = cholesterol
        self.fiber = fiber
        self.monoFat = monoFat
        self.polyFat = polyFat
        self.potassium = potassium
        self.protein = protein
        self.satFat = satFat
        self.sodium = sodium
        self.sugar = sugar

db.create_all()

# Home page
@app.route('/index')
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

@app.route('/', methods=['GET','POST'])
def input():

     # get user info from html form
    if request.method == 'POST':
        calories = request.form['calories']
        carbs = request.form['carbs']
        cholesterol = request.form['cholesterol']
        fiber = request.form['fiber']
        monoFat = request.form['monoFat']
        polyFat = request.form['polyFat']
        potassium = request.form['potassium']
        protein = request.form['protein']
        satFat = request.form['saturatedFat']
        sodium = request.form['sodium']
        sugar = request.form['sugar']

        # #print user info to console
        # print("Values inputed: ", calories, carbs, cholesterol, fiber, monoFat, polyFat, potassium, protein, satFat, sodium, sugar)
        # #print the types of each value
        # print("Types: ", type(calories), type(carbs), type(cholesterol), type(fiber), type(monoFat), type(polyFat), type(potassium), type(protein), type(satFat), type(sodium), type(sugar))

        # convert user info to int
        calories = int(calories)
        carbs = int(carbs)
        cholesterol = int(cholesterol)
        fiber = int(fiber)
        monoFat = int(monoFat)
        polyFat = int(polyFat)
        potassium = int(potassium)
        protein = int(protein)
        satFat = int(satFat)
        sodium = int(sodium)
        sugar = int(sugar)

        # print("Types: ", type(calories), type(carbs), type(cholesterol), type(fiber), type(monoFat), type(polyFat), type(potassium), type(protein), type(satFat), type(sodium), type(sugar))
        
        # save user info to database
        new_goal = Goals(calories, carbs, cholesterol, fiber, monoFat, polyFat, potassium, protein, satFat, sodium, sugar)
        
        db.session.add(new_goal)
        db.session.commit()

        return redirect(url_for('index'))

    return render_template('input.html')

# goals endpoint where data from input is passed to
@app.route('/goals', methods=['GET'])
def goals_data():

    # get user info from database
    if request.method == 'GET':
        # get last row of database
        last_row = Goals.query.order_by(Goals.id.desc()).first()
        # get all values from last row
        calories = last_row.calories
        carbs = last_row.carbs
        cholesterol = last_row.cholesterol
        fiber = last_row.fiber
        monoFat = last_row.monoFat
        polyFat = last_row.polyFat
        potassium = last_row.potassium
        protein = last_row.protein
        satFat = last_row.satFat
        sodium = last_row.sodium
        sugar = last_row.sugar

        print("Values from database: ", calories, carbs, cholesterol, fiber, monoFat, polyFat, potassium, protein, satFat, sodium, sugar)

        # return user info to frontend as json
        return jsonify(calories, carbs, cholesterol, fiber, monoFat, polyFat, potassium, protein, satFat, sodium, sugar)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
