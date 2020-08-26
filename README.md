## Introduction

This is a boilerplate for a MEAN application that anyone can use to develop
application without going through repetitive initial setup. MEAN is a set of
Open Source components that together, provide an end-to-end framework for
building dynamic web applications; starting from the top (code running in the
browser) to the bottom (database). The stack is made up of:

- **MongoDB**: Document database – used by your back-end application to store
  its data as JSON (JavaScript Object Notation) documents
- **Express** : Back-end web application framework running on top of Node.js
- **Angular**: Front-end web app framework that allows creation of Single page
  application.
- **Node.js**: JavaScript runtime environment – lets you implement your
  application back-end in JavaScript

### Features

- **Local authentication** using _email_ and _password_
- **JWT** (Json web token) for user authorization
- Role based user management
- Single config file for frontend and backend
- Support for webserver based api route changing
- MongoDB replica set support
- MongoDB transaction handler
- Email support
- Joi validation handler for config file, models and requests
- Pagination support

### Prerequisites

- Git -[Installation guide](https://www.linode.com/docs/development/version-control/how-to-install-git-on-linux-mac-and-windows/).

- Node.js - [Download page](https://nodejs.org/en/download/) .

- Mongodb - [Download Page](https://www.mongodb.com/try/download/community)
  **or** [Sign up page](https://www.mongodb.com/try)

### Getting Started

```bash
# Clone project with name as 'myProject'
git clone https://github.com/srujanpurohit/MEAN-Boiler-plate.git myProject

# Move inside myProject directory
cd myProject

# Install packages
npm install

# copy environment file
cp config.example.json config.json

# start server
npm start

# Open App
go to localhost:8080
```

### Project Structure

```bash
├ server
|	├ config
|	|	├ config.js		# returns the config object from config.json
|	|	├ express.js		# generic express middleware chain
|	|	├ modulesAndRights.js # returns modules and special rights array
|	|	├ mongoose.js		# config file for mongoDB connection
|	|	└ email.js  # email service initializer and email transporter provider
|	├ controllers
|	|	├ auth.controller.js
|	|	├ role.controller.js
|	|	└ user.controller.js
|	├ helpers
|	|	├ sendMail # returns a function that can be used to send mail
|	|	└ transactionHandler.js # A wrapper function for mongoDB transaction
|	├ middlewares
|	|	├ hasModuleRights.middleware.js # Middleware to check if user has a particular right
|	|	├ isAdmin.middleware.js # check if logged in user is admin
|	|	└ jwt.middleware.js 	# check if user has valid JWT token
|	├ models
|	|	├ role.model.js
|	|	└ user.model.js
|	├ routes
|	|	├ auth.route.js
|	|	├ index.route.js
|	|	├ role.route.js
|	|	└ user.route.js
|	├ utils
|	|	└ JoiObjectValidator.js # A generic function for Joi validation that throws an error if validation fails
|	├ routes
|	|	├ config.validator.js	# validate config.json file
|	|	├ findQueryValidator.js # validate pagination query
|	|	├ mongoObjectId.validator.js # validate mongo objectId
|	|	├ roleSchema.validators.js
|	|	└ userSchema.validators.js
|	└ index.js
├ src
|	├ app
|	|	├ components 	# contains 404 not found component
|	|	├ interceptor
|	|	|	├ http-error.interceptor.ts	# converts http-error response from backend to normal http-error
|	|	|	└ auth-header.interceptor.ts	# adds JWT header to requests
|	|	├ modules
|	|	|	├ Auth	# contains login and register components
|	|	|	└ Home	# contains modules that will be visible after login
|	|	└ shared 	# shared module containing interfaces, logged in guard, module-rights guard and auth service
|	└ environments
|		└ loadConfig.js  # creates environment.ts based on config.json
└ config.example.json	# App config file
```

### Useful Resources

- JavaScript
  [Documentation](https://developer.mozilla.org/en-US/docs/Web/javascript)
- Node [Documentation](https://nodejs.org/docs/latest-v13.x/api/)
- Angular [Documentation](https://angular.io/docs)
- MongoDB [Documentation](https://docs.mongodb.com/manual/)
- Mongoose [Documentation](https://mongoosejs.com/docs/guide.html)
- Express [Documentation](http://expressjs.com/en/api.html)
- Swagger [Documentation](https://swagger.io/docs/specification/about/)
- Chart.js [Documentation](https://www.chartjs.org/docs/latest/)

### Recommended Libraries

#### Angular

- Component Libraries [ngBootStrap](https://ng-bootstrap.github.io/#/home) ,
  [Angular Material](https://v7.material.angular.io/guide/getting-started) ,
  [Kendo UI](https://www.telerik.com/kendo-angular-ui)
- Grid Libraries [ag-grid](https://www.ag-grid.com/angular-grid/)
- Icons [Font Awesome](https://fontawesome.com/)

#### Node.js

- Process manager [PM2](https://pm2.keymetrics.io/)
- Web Socket [socket.io](https://socket.io/)
- Resize Images [Sharp](https://github.com/lovell/sharp)
- Http request [Axios](https://github.com/axios/axios)
- Time based utility [Moment.js](https://momentjs.com/)
