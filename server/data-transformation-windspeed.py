
"""

INCLUDED IN GITHUB TO SHOW HOW THE WIND SPEED DATA WAS TRANSFORMED AFTER BEING DOWNLOADED FROM NASA AND CONVERTED TO CSV

"""

import pandas as pd
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://aaryaman:xZ2azqV0J6cjAXMC@nasacluster.9w92cjg.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

prefixList = ['jan1_','feb1_', 'mar1_', 'apr1_', 'may1_', 'jun1_', 'jul1_', 'aug1_', 'sep1_', 'oct1_', 'nov1_', 'dec1_']
prefList = ['1/1/','2/1/','3/1/','4/1/','5/1/','6/1/','7/1/','8/1/','9/1/','10/1/','11/1/','12/1/']

lat = []
with open('wind-speed/lat.txt') as f:
    for line in f:
        if(line.strip() == '0.0'):
            continue
        lat.append(float(line.strip()))

lon = []
with open('wind-speed/lon.txt') as f:
    for line in f:
      lon.append(float(line.strip()))



for i in range(2000,2023):
    for prefix in prefixList:
        df = pd.read_csv("wind-speed/" + prefix + str(i) + '.csv')
        df.index = lat
        df.columns = lon
        df = df.loc[32:42, -125:-114]
        for index, row in df.iterrows():
            acq_date = prefList[prefixList.index(prefix)] + str(i)
            latitude = index
            j = 0 
            for col in row:
                longitude = df.columns[j]
                j += 1
                value = col
                print(acq_date, latitude, longitude, value)
                client['NasaData']['WindSpeed'].insert_one({
                    "acq_date": acq_date,
                    "latitude": latitude,
                    "longitude": longitude,
                    "value": value
                })

for i in range(2023,2024):
    for j in range(0,3):
        df = pd.read_csv("wind-speed/" + prefixList[j] + str(i) + '.csv')
        df.index = lat
        df.columns = lon
        df = df.loc[32:42, -125:-114]
        for index, row in df.iterrows():
            acq_date = prefList[j] + str(i)
            latitude = index
            k = 0 
            for col in row:
                longitude = df.columns[k]
                k += 1
                value = col
                print(acq_date, latitude, longitude, value)
                client['NasaData']['WindSpeed'].insert_one({
                    "acq_date": acq_date,
                    "latitude": latitude,
                    "longitude": longitude,
                    "value": value
                })