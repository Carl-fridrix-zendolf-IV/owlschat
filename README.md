# Owlschat webapp with Node JS backend
## https://owlschat.firebaseapp.com
Simple webapp chat which based on Angular 2 and Node JS

### Installation
You need Node (ver > 6.0.0), Mongo DB (ver > 3.2) and Git installed globally.
For hosting deployment, I recommend to use PM2 (https://github.com/Unitech/pm2)

### Start a server
Before start server app you will need to start you Mongo DB globally, please, open you terminal and enter this command:

```sh
$ mongod
```

After Mongo DB start, you can download code from repository and start a server app

```sh
$ git clone https://github.com/Carl-fridrix-zendolf-IV/owlschat
$ cd owlschat/server
$ npm install
$ ENVIRONMENT=DEV npm start
```
When code started, you can open your browser and check, that everything ok.
Open page http://localhost:3000 - and you will get main API response

For testing you will need to enter this command in your terminal
```sh
$ npm test
```

### Start webapp
If you already clone code from repository you will need to enter this command in your terminal

```sh
$ cd owlschat/client
$ npm install
$ npm start
```

For build release version you will need to enter this command:
```sh
$ npm build
```

### License
MIT
