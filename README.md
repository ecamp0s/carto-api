# Cart API test

## Instructions

### Installation

`npm install`

### Set environment variables

This API works through port 4000, and connects to a remote MySQL DB that is always available.  
If you want to use your own MySQL DB, you can create it and then import the tables and data with the file: database.sql.  
Once imported, you must change the connection parameters indicated in the file: .env (HOST, DATABASE, USER, PASSWORD).

### Running the App

To run the application in development mode:  
`npm run dev`

### Configure Postman

Open your Postman application and import the two files from the "postman" folderrr.  
The "collection.json" file contains all the endpoints included in this API.  
The "environment.json" file contains the environment variables necessary for Postman to work properly.  
This API works through port 4000 with the URL: <http://localhost:4000/>. After this file is imported, we can modify its values directly from Postman (Environments:Local).

### Register a user

To use this API, it is necessary to have a registered user.  
You can easily do this through the '/api/auth/register' endpoint with an email and password.

### Login

After registering a user, you must login before starting (and every 60 minutes, which is the lifetime of the session token).  
Postman is configured to include the received session token in every request made from now on.

### Postal Codes

These endpoints allow to obtain the geoJSON for each postal code of Madrid (geometries).  
Likewise, we have the 'api/postal_codes/turnoverByGender' endpoint that also returns the turnovers by gender in each postal code.

### Paystats

These endpoints allow to obtain: the total turnover (/api/paystats/totalTurnover) in a period of time, the turnover by gender in a period of time (/api/paystats/turnoverByGender) and even filtering by postal code, and the monthly turnover by gender over a period of time (/api/paystats/monthlyTurnoverByGender).

## Endpoints

### Authorization

- **POST** /api/auth/register | email, password
- **POST** /api/auth/login | email, password

### Postal Codes

- **GET** /api/postal_codes/geometries
- **GET** /api/postal_codes/geometries/:id
- **GET** /api/postal_codes/turnoverByGender | period (YYYY-MM-DD)

### Paystats

- **GET** /api/paystats/totalTurnover | period (YYYY-MM-DD)
- **GET** /api/paystats/turnoverByGender | period (YYYY-MM-DD), postal_code
- **GET** /api/paystats/monthlyTurnoverByGender | period (YYYY-MM-DD)
