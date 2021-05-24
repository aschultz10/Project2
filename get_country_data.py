from flask import Flask, jsonify, render_template, redirect
import pymongo


# Use pyMongo to establish mongo database connection
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.country_db

def get_data():
    Country_Info = {}
    country_info = []
    country_data = db.countries.find({'Year': 2017})
    data = [i for i in country_data]
    for i in data:
        Country_data = {}
        Country_Name = i.get('Country')
        Country_data['id'] = str(i.get('_id'))
        Country_data['name'] = i.get('Country')
        Country_data['abv'] = i.get('Country_Code')
        Country_data['Year'] = i.get('Year')
        Country_data['Income_Adjusted_QOL'] = i.get('IncomeAdjusted_LMY_Quality_Of_Life_Score')
        Country_data['RT_EducationScore'] = i.get('IncomeAdjusted_LMY_Right_to_Education_Score')
        Country_data['RT_HealthScore'] = i.get('IncomeAdjusted_LMY_Right_to_Health_Score')
        Country_data['RT_HousingScore'] = i.get('IncomeAdjusted_LMY_Right_to_Housing_Score')
        Country_data['RT_FoodScore'] = i.get('IncomeAdjusted_LMY_Right_to_Food_Score')
        Country_data['RT_WorkScore'] = i.get('IncomeAdjusted_LMY_Right_to_Work_Score')
        Country_data['GDP_per_capita_'] = i.get('GDP_per_capita_(2011_PPP$)_for_Most_Recent_Observation_on_Net_Secondary_Enrollment')
        Country_Info[Country_Name] = Country_data
        country_info.append(Country_data)

    #return render_template("index.html", country_dict=Country_Info, country_list=country_info)
    return Country_Info