<p align="center">

  <h3 align="center">Vehicle Rental Web App</h3>
  <p align="center">
    <image align="center" width="200" src='./screenshots/logo.png' />
  </p>

  <p align="center">
    <br />
    <a href="https://vehicle-rental.muchamadagushermawan.online/">View Demo</a>
    ·
    <a href="https://github.com/19damah23/Backend-rental/issues">Report Bug</a>
    ·
    <a href="https://github.com/19damah23/Backend-rental/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Related Project](#related-project)
* [Contact](#contact)



<!-- ABOUT THE PROJECT -->
## About The Project


Vehicle rental is an application that will help us when we need vehicle rental services. With vehicle rental we can determine the date and there are several ways of payment that will be very easy. We provide various types of vehicles, ranging from family vehicles, sport, to jeeps. You can choose the vehicle that best suits your needs.

### Built With

* [NodeJs](https://nodejs.org/)
* [ExpressJs](http://expressjs.com/)
* [MySQL](https://www.mysql.com/)
* [NodeMailer](https://nodemailer.com/)
* [JWT](https://jwt.io/)


<!-- GETTING STARTED -->
## Getting Started

### Prerequisites
* [NodeJs](https://nodejs.org/)
* [MySQL](https://www.mysql.com/)
* [Postman](https://www.postman.com/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/19damah23/Backend-rental.git
```
2. Install NPM packages
```sh
npm install
```
3. Add .env file at root folder project, and add following
```sh
DB_NAME = [DB_NAME]
DB_HOST = [DB_HOST]
DB_USER = [DB_USER]
DB_PASS = [DB_PASS]

PORT = [PORT]

ACCESS_TOKEN_SECRET = [ACCESS_TOKEN_SECRET]

EMAIL_VERIFICATION = [EMAIL_VERIFICATION]
PASS_VERIFICATION = [PASS_VERIFICATION]

BASE_URL = [BACKEND_URL]
FRONT_URL = [FRONTEND_URL]
```

4. Make a new database and import [rental.sql](https://drive.google.com/file/d/1B9S9-WziXX5Z-5Z-8Ra3HSM1WAom5FUQ/view?usp=sharing)

5. Starting application
```sh
npm run dev
```

### Related Project
* [`Frontend-Vehicle-Rental`](https://github.com/19damah23/vehicle-rental)
* [`Backend-Vehicle-Rental`](https://github.com/19damah23/Backend-rental)

## Contact
My Email : muchamadagush@gmail.com

Project Link: [https://github.com/19damah23/Backend-rental](https://github.com/19damah23/Backend-rental)