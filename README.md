# Open Sentencing User Interface (UI)

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack) [![Website](https://img.shields.io/badge/View-Website-blue)](https://code-and-response.github.io/Project-Sample/)

The User Interface (UI) provided is meant to allow public defenders or others an ability to easily review contents of a case to determine when bias was detected. Since public defenders are so busy we wanted this to be an item that could be utilized very quickly and easily. No knowledge of the programming behind the tool is needed for an end user.

The Open Sentencing UI is part of the overall Open Sentencing tool.  
Check out the main GitHub repo for more information: 
Call for Code for Racial Justice - Open Sentencing:  https://github.com/Call-for-Code-for-Racial-Justice/Open-Sentencing.

## Contents

- [Open Sentencing User Interface (UI)](#open-sentencing-user-interface-ui)
  - [Contents](#contents)
  - [Getting started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
  - [Running the tests](#running-the-tests)
    - [To run the application](#to-run-the-application)
    - [Unit tests](#unit-tests)
    - [Coding style tests](#coding-style-tests)
  - [Live demo](#live-demo)
  - [Built with](#built-with)
  - [Contributing](#contributing)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)
  - [How to Help  *We'd love your involvement!*](#how-to-help-wed-love-your-involvement)

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system. 

### Prerequisites

1. nodejs 10 or above
1. angular cli 8.3.29 `npm install -g @angular/cli@8.3.29`
1. Register IBM Single Sign-On service for user authentication

### Installing

1. Clone or download the repo
1. Change directory to Open-Sentencing-UI/web
1. npm install

## Running the tests

### To run the application
You can choose your own image name and tag, such as `os-ui:oct18`. The `.` at the end represents the location for the new image.  You can also choose your own container name.
 - `docker build -t <image name> .`
 - `docker run --rm --name <image name> -p 8080:8080 <container name>`
example:
 - `docker build -t os-demo:oct19 .`
 - `docker run --rm --name os-ui -p 8080:8080 os-demo:oct19`
 
### Unit tests

Run the Following command:
 - `ng test`

### Coding style tests

Run the following command:
- `ng lint`

## Live demo

You can find a running system to test [here](https://us-south.git.cloud.ibm.com/sirraman/Embrace2020).  You will need an IBM ID to use the app, but you can request a free IBM ID right from the login screen.  You do not need to be an IBM employee or customer.

## Built with

* Angular

## Contributing

Please read [CONTRIBUTING.md](https://github.com/Call-for-Code-for-Racial-Justice/Open-Sentencing/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

Kandarp Thakar
Xinzhan Lin
David Nugent

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.

## How to Help  *We'd love your involvement!*
Please visit our main repo here: https://github.com/Call-for-Code-for-Racial-Justice/Open-Sentencing.  More detailed areas on where we need assistance are provided.
If you would like to [Help](https://developer.ibm.com/callforcode/racial-justice/) with the cause to use technology to battle racism, we would love for you to get involved!  Please submit updates to us for review. 
Together we can use technology to fight systemic racism!
