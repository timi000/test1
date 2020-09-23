import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
import datetime as dt 

from flask import Flask, jsonify, render_template, redirect


#################################################
# Database Setup
#################################################
engine = create_engine(f'postgresql+psycopg2://postgres:{123}@localhost:5432/covid_vision')


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
#Employee=Base.classes.employees
Trends=Base.classes.covid_trends
Covid=Base.classes.canada_covid


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")
    
@app.route("/api/v1.0/covid_trends")
def trend():
    session = Session(engine)
   
    Result=session.query(Trends.date,Trends.Mask, Trends.CERB, Trends.Patio, Trends.Zoom,
    Trends.Bike, Trends.numconf, Trends.numtestedtoday,
    Trends.numtoday, Trends.numdeathstoday, Trends.numactive)
    session.close()

    trd_list=[]
    for date, Mask, Zoom, CERB, Patio, Bike, numconf, numtestedtoday, numtoday , numdeathstoday , numactive in Result: 
        start_dict={}
        start_dict["date"]=date
        start_dict["Mask"]=Mask
        start_dict["Zoom"]=Zoom
        start_dict["CERB"]=CERB
        start_dict["Patio"]=Patio
        start_dict["Bike"]=Bike
        start_dict["confirmed cases"]=numconf
        start_dict["daily_tests"]=numtestedtoday
        start_dict["daily_cases"]=numtoday
        start_dict["active_cases"]=numactive
        start_dict["daily_deaths"]=numdeathstoday

        trd_list.append(start_dict) 
 
    return jsonify(trd_list)


@app.route("/api/v1.0/canada_covid")
def corona():
    session = Session(engine)
    
    Result=session.query(Covid.date, Covid.prname,Covid.latitude, Covid.longitude, Covid.population, 
    Covid.numrecover, Covid.numrecoveredtoday,
    Covid.numconf, Covid.numtestedtoday,
    Covid.numtoday, Covid.numdeathstoday, Covid.numactive)
    session.close()

   
    cvd_list=[]
    for date, prname, latitude,longitude, population, numrecover, numrecoveredtoday,numconf, numtestedtoday, numtoday, numdeathstoday, numactive  in Result: 
        covid_dict={}
        covid_dict["date"]=date
        covid_dict["province_name"]=prname
        covid_dict["latitude"]=latitude
        covid_dict["longitude"]=longitude
        covid_dict["pop_size"]=population
        covid_dict["total_recoverd"]=numrecover
        covid_dict["total_recovered_today"]=numrecoveredtoday
        covid_dict["confirmed cases"]=numconf
        covid_dict["daily_tests"]=numtestedtoday
        covid_dict["daily_cases"]=numtoday
        covid_dict["active_cases"]=numactive
        covid_dict["daily_deaths"]=numdeathstoday

        cvd_list.append(covid_dict) 
 
    return jsonify(cvd_list)

   

if __name__ == '__main__':
    app.run(debug=True)