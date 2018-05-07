The Scavenger Hunt has three components which you need to run: the server, the hint broker, and the mobile application.
This file should serve as a tutorial in order to have the system up and running.

------------------------------------------------------------------------------------------------------------------------------------------------------------------
The server:

To run the server you should do the following:
- Ensure you have the latest version of nodejs
- Create two couch DB's; one named 'users_db', and the other name 'objects_db'
- You will need to populate the 'objects_db'. We created a script in ScavengerHunt/BackEnd Server/Server/populateObjects.js. Follow the step by step 
instruction within the script to populate the database. When you're done, run node populateObjects.js
- Open cmd and navigate to the server file directory. Run npm install.
- Finally, run node server.js.
------------------------------------------------------------------------------------------------------------------------------------------------------------------
The Hint Broker:

To run the hint broker you should do the following:
- Ensure you have the latest version of nodejs
- Create a couch DB named 'hints_db'
- You will need to populate the 'hints_db'. We created a script in ScavengerHunt/HintBroker Gateway/populateHints.js. Follow the step by step instructions
within the script to populate the database. When you're done, run node populateHints.js
- Open cmd and navigate to the HintBroker file directory. Run npm install.
- Finally, run node MQTTClient.js
------------------------------------------------------------------------------------------------------------------------------------------------------------------
The Mobile application:

To install the mobile application you should do the following:
- Ensure you have the latest android or ios sdk tools.
- Open ScavengerHunt/FrontEnd-ionic/www/js/controllers.js and replace the ip address and the port number with your server's details (Default port number is 1337)
-- The changes should be made in lines: 14, 49, 77, 115, 309
- Open ScavengerHunt/FrontEnd-ionic/www/js/services.js and replace the ip address and the port number your server's details (Default port number is 1337)
-- The changes should be made in lines: 268, 275
- Open cmd and navigate to the mobile application's file directory.
- Run ionic cordova build <platform>
-- <platform> should be either ios or android
- Run ionic cordova run <platform> --device (Your phone should be plugged in).
-- <platform> should be either ios or android


