from flask import Flask, jsonify, render_template, redirect
import pymongo


# Use pyMongo to establish mongo database connection
conn = 'mongodb://localhost:27017'
client = pymongo.MongoClient(conn)
db = client.country_db

def data_etl():

    # coulmns to rename in dataframe:
    rename = {
    'IncomeAdjusted_LMY_Right_to_Education_Score.1':'IncomeAdjusted_LMY_Right_to_Education_Score_1',
    'IncomeAdjusted_LMY_Right_to_Health_Score.1': 'IncomeAdjusted_LMY_Right_to_Health_Score_1',
    'IncomeAdjusted_LMY_Right_to_Housing_Score.1': 'IncomeAdjusted_LMY_Right_to_Housing_Score_1',
    'IncomeAdjusted_LMY_Right_to_Food_Score.1': 'IncomeAdjusted_LMY_Right_to_Food_Score_1',
    'IncomeAdjusted_LMY_Right_to_Work_Score.1': 'IncomeAdjusted_LMY_Right_to_Work_Score_1',

    'IncomeAdjusted_HiY_Right_to_Education_Score.1': 'IncomeAdjusted_HiY_Right_to_Education_Score_1',
    'IncomeAdjusted_HiY_Right_to_Health_Score.1': 'IncomeAdjusted_HiY_Right_to_Health_Score_1',
    'IncomeAdjusted_HiY_Right_to_Housing_Score.1': 'IncomeAdjusted_HiY_Right_to_Housing_Score_1',
    'IncomeAdjusted_HiY_Right_to_Food_Score.1': 'IncomeAdjusted_HiY_Right_to_Food_Score_1',
    'IncomeAdjusted_HiY_Right_to_Work_Score.1': 'IncomeAdjusted_HiY_Right_to_Work_Score_1',
    
    'GlobalBest_LMY_Right_to_Education_Score.1': 'GlobalBest_LMY_Right_to_Education_Score_1',
    'GlobalBest_LMY_Right_to_Health_Score.1': 'GlobalBest_LMY_Right_to_Health_Score_1',
    'GlobalBest_LMY_Right_to_Housing_Score.1': 'GlobalBest_LMY_Right_to_Housing_Score_1',
    'GlobalBest_LMY_Right_to_Food_Score.1': 'GlobalBest_LMY_Right_to_Food_Score_1',
    'GlobalBest_LMY_Right_to_Work_Score.1': 'GlobalBest_LMY_Right_to_Work_Score_1',
    'Most_Recent_Observation_%_Population_Not_Absolutely_Poor_(>$3.20_2011PPP$)': 'Most_Recent_Observation_%_Population_Not_Absolutely_Poor_(>$3_20_2011PPP$)',
    'Year_of_Most_Recent_Observation_on_%_Population_Not_Absolutely_Poor_(>$3.20_2011PPP$)': 'Year_of_Most_Recent_Observation_on_%_Population_Not_Absolutely_Poor_(>$3_20_2011PPP$)',
    'GlobalBest_HiY_Right_to_Education_Score.1': 'GlobalBest_HiY_Right_to_Education_Score_1',
    'GlobalBest_HiY_Right_to_Health_Score.1': 'GlobalBest_HiY_Right_to_Health_Score_1',
    'GlobalBest_HiY_Right_to_Housing_Score.1': 'GlobalBest_HiY_Right_to_Housing_Score_1',
    'GlobalBest_HiY_Right_to_Food_Score.1': 'GlobalBest_HiY_Right_to_Food_Score_1',
    'GlobalBest_HiY_Right_to_Work_Score.1': 'GlobalBest_HiY_Right_to_Work_Score_1'
    }

    data_source = "data/"
    file_name = "HRMI_Website_DataSet_2020.6.22.xlsx"

    # read data source
    sheets_dict = pd.read_excel(data_source+file_name, sheet_name=None)
    sheetsDF = {}
    for i in list(sheets_dict.keys()):
        data = i+'DF'
        sheetsDF[data] = sheets_dict[i]

    # merge the dataframes
    dataDF = {**sheetsDF['ESR_LMY_IncomeAdjustedDF'], **sheetsDF['ESR_HiY_IncomeAdjustedDF'],**sheetsDF['ESR_LMY_GlobalBestDF'], \
       **sheetsDF['ESR_HiY_GlobalBestDF'], **sheetsDF['ESR_Sex_DisaggregatedDF']}

    recs = pd.DataFrame(dataDF)
    recs.rename(columns=rename, inplace=True)

    return recs

def load_data(recs):

    countries = db.countries

    if countries.count() == 0:
        countries.insert_many(recs.to_dict('records'))
        print('Data Inserted')
    else:
        print('Collection already exists, no data inserted')

    return



