# Sign In Application
  The sign-in application is a simple front-end application that runs on a mobile device, e.g., an iPad or an Android tablet that communicated with a back-end database. This application is used as a kiosk device to collect information on visitors for a corporation. 

## Non-functional requirement

**Tools and Technologies**
In this project we made design & environment analysis and comparsion before design  according to some criterias like skills, features, constraints, usability, security and complexity. Here are tools we selected: 

- vue.js (front-end)
- node.js (back-end)
- mongoDB (database)
- Github (CM and PM)

## Installation instructions
Fork the repo then clone it to your local machine.
```
git clone https://github.com/<your username>/sign-in.git
```

Change your directory into the dir on your VirtualBox Ubuntu virtual machine.  
```
cd sign-in
```

Create .env file. Add a `.env` file with your PORT, MONGO_URI, 
[GITHUB_ID, GITHUB_SECRET and APP_URL](https://github.com/jaredhanson/passport-github) like this:

```
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/sign-in
GITHUB_ID=233245n234566kjh243f
GITHUB_SECRET=k2hj432kjgjkh2g34kj2g4jkh23g4jk2342jhg34
APP_URL=http://127.0.0.1:3000/
NEO4J_PROTOCOL=http
NEO4J_HOST=127.0.0.1
NEO4J_PORT=7474
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=neo4j
```

## Virtual Box Setup Instructions
These instructions assume an Ubuntu environment.
To use Vagrant, get started [here](#vagrant-setup-instructions)

### Install and run everything
```bash
$ ./bin/install.sh &
$ ./bin/init-db.sh &
$ ./bin/run-back-end.sh &
$ ./bin/frun-front-end.sh &
```


**WAIT 2 MINUTES FOR NEO4J TO BECOME READY.**

Open a new terminal window and navigate to Sign In App.  

Open http://localhost:3000 in any web browser.


## Architecture discussion
The visitors and admin data are stored in mongoDB. The back end creates many endpoints of API to get the visitors' data from front end. Only the back end API communicates to the database. The VueJS is used as an interface for visitors to sign in and for admin to check all the visitors. 

## Plan of action
- [x] Nonfunctional analysis
- [X] Architecture design
- [X] Implementation 
- [X] Test
- [X] Deployment


## Deployment
![alt text](https://github.com/JieliChen268/Sign-In/blob/backend/signin.png)
![alt text](https://github.com/JieliChen268/Sign-In/blob/backend/AdminLogin.png)
![alt text](https://github.com/JieliChen268/Sign-In/blob/backend/visitorList.png)




