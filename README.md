# Project 2: Human Rights Tracking

Alex Schultz, Jennifer Duffy, Richard Nwokoye


*"What gets measured, gets improved. When people have information on human rights in front of them it makes it easier to ask the right questions and seek out the best solutions.”*

--Anne-Marie Brooks, co-founder of The Human Rights Measurement Initiative (HRMI)



![children2](https://user-images.githubusercontent.com/75215001/120033171-3c8ae780-bfc9-11eb-8d6d-dcfd200b7345.png)






**None of us can take human rights for granted**, not even here in the United States.
For our project, we created visualizations that show how well countries are perfoming based on human rights indicators, including an overall Quality of Life score.
Using information and data from [Human Rights Measurement Initiative] (https://humanrightsmeasurement.org/), we focused on five economic and social rights:

* right to education
* right to food
* right to health
* right to housing
* right to work

The average of the scores for those five rights are used to create the overall Quality of Life Score.

Humanrightsmeasurement.org is a project of **The Human Rights Measurement Initiative** which uses a unique
methodology to "show how well the state is using its available resources to ensure all people enjoy these rights. [They] do
this because under international law, a higher level of performance is expected from richer countries."

This analysis project can be used as a template for advocacy purposes and for shining a light on countries that 
are not doing as well as they should be.

The data from the website, constructed from publicly available data, includes 197 countries and is based on 10 years of tracking (2007-2017).
Not all rights data are available for every country.

References:

Human Rights Measurement Initiative (HRMI). 2020. "HRMI Human Rights Dataset." https://humanrightsmeasurement.org/. Version 2020.6.22.

Susan Randolph, John Stewart, Sakiko Fukuda-Parr, and Terra Lawson-Remer. “HRMI Economic and Social Rights Metrics 2020 Technical Note.” Human Rights Measurement Initiative Methodology Handbook. 22 June 2020.

Sakiko Fukuda-Parr, Terra Lawson-Remer and Susan Randolph. 2015. Fulfilling Social and Economic Rights. Oxford: Oxford University Press.
Economic & Social Rights Empowerment Initiative. 2020. https://serfindex.uconn.edu/.

*photo credit: Ridofranz/ canva.com*


## Technologies Used for this Project

Front End 
- CSS
- JavaScript
- HTML
    
Back End 
- Python
- Flask
  
Database
- MongoDB
 
JavaScript Libraries
- D3
- anime.js
- jQuery

Deploy to web
- Heroku

## Process

Our dataset was a csv file from [rightstracker.org](https://rightstracker.org/en) that included data for 197 countries. 
Our process was as follows:
- Create mock-up of dashboard 
- Extract data from csv into Jupyter Notebook using Python
- Clean data using Pandas
- Import data into MongoDB
- Create HTML framework
- Create JavaScript files including using D3
- Use Plotly to create bar chart, gauge chart, and bubble chart
- Add anime.js and Jquery as additional libraries
- Create CSS file
- Deploy to web using Heroku

![dashboard](https://user-images.githubusercontent.com/75215001/120497706-a40bb300-c38c-11eb-84b5-ac344b97a81a.png)


## Conclusion

Users can use the dropdown menu to choose a country and see the scores for 5 economic and social rights compared to the country's GDP as displayed on the bar chart.
They can also view the total quality of life score for that country as shown on the gauge chart and the relationship of quality of life and GDP as shown on the bubble chart.
By interacting with the charts, users can understand a country's performance and see whether a country is doing "good" (scores of 95% or higher), "fair" (85-94.9%),
"bad" (75-84.9%) or "very bad" (below 75%).

For future projects, we would like to measure these rights against other indicators such as a country's military spending or its migration statistics (data is available at hungerreport.org).


