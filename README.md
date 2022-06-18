This is a react up for taking notes

Using this app we can add new notes and delete an existing note.
The notes are also stored on a json file where we can can fetch them using and api and also modify using the same api.

HOW TO CLONE THIS APP

Step1:
Clone the app using git by geting the link from the github repo;

git clone https://github.com/JosephatJuma/React-Notes-App.git

Step 2:
Aafter cloning the app, in the directory where you have clone it, the app will be stored in another dir called counter, navigate to counter dir and in install npm :- npm install

Step 3:
we can now run the app however we can't fetch the notes before starting the json server.

Start the json server :- npx json-server --watch json/db.json --port 8000
this will start the sever on another port 8000. :- http://localhost:8000/notes

NOTE: Do not start a sever on a different port since the api url is pointing to port 8000 or if you start on a different server, change the API_URl const in th App.js file by modifying the port number to a new port number to look like http://localhost:portnumber/notes
port number is the new port you have started the server on
