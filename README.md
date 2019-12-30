# FitbitServer
 A server that will act as the "middleman" between the Fitbit API and the android application. This server will also be used to store the users data in a database.
 
 
 ### Implimentation
 #### Endpoints Roadmap
 - /auth
   - /authorize
   - /callback
 - /android
   - /profile
 - /database
   - /remove
   - /allUsers
 - /web
   - /heartrate
      - /period
         - /all
         - /user
      - /range
         - /all
         - /user
   - /detailedHeartrate
 
 #### Endpoints In-depth
 ##### /auth
 - These endpoints are responsible for dealing with the Fitbit O-Auth 2.0 protocal.
 - /authorize adds a user to the database after it has been authenticated with Fitbit's API
 - /callback is the endpoint that the fitbit server will send all responses to.
 
 
 ##### /android
 - These endpoints deal with any calls that the android application will make.
 - /profile currently is just a test endpoint that sends the message "Hello android" to the android device.
 - As the android application is built out more endpoints will be added.
 
 ##### /database
 - These endpoints deal with editing and getting data that is stored in the database
 - /remove removes a user from the database.
 - /allUsers returns a list of all users in the database (ussername, userID)
 
 ##### /web
 - These endpoints are used when a user wants to view data in html tables.
 - /heartrate displays the heart rates of the registered users in an html table.
   - There is an optional parameter to the url called range. Range is a string that represents the amount of data you wish to receive (1 day, 7 days, 1 month).
- /detailedHeartrate displays a detailed heart rate for a specified day. This endpoint is currently a work in progress and will function similar to the /heartrate endpoint.



#### Detailed Implimentation (Current Project Iteration)
When a user is added via the /auth endpoints, a User object is created and added to a list-of-Users. This list is a global list that is accessed by all functions that make API requests to the fitbit server. When a /web request is made the server makes a fitbit API request for every user in the userList. The the data from the fetches is combined into a javascript object and displayed on the screen.


### Future Additions
- [ ] Add a database to store the requested data in (Must look into FERPA requirements)
- [X] Show which users data is being displayed for clarity
- [ ] Make android application that can also show data and store data in SQLite
- [ ] Look into ways that a fibit can track a users location
