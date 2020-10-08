# Open Sentencing Model

[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Slack](https://img.shields.io/badge/Join-Slack-blue)](https://callforcode.org/slack) [![Website](https://img.shields.io/badge/View-Website-blue)](https://code-and-response.github.io/Project-Sample/)

The basic notion of this project is to predict how likely a charge's sentencing will be very different if the convicted person was of a different race.

## Contents

1. [Short description](#short-description)
1. [Demo video](#demo-video)
1. [The architecture](#the-architecture)
1. [Long description](#long-description)
1. [Project roadmap](#project-roadmap)
1. [Getting started](#getting-started)
1. [Running the tests](#running-the-tests)
1. [Live demo](#live-demo)
1. [Built with](#built-with)
1. [Contributing](#contributing)
1. [Versioning](#versioning)
1. [Authors](#authors)
1. [License](#license)
1. [Acknowledgments](#acknowledgments)

## Short description

### What's the problem?

People in the Black Community are faced with harsher downstream effects (charged at higher rates, assigned more significant charges, convicted at higher rates, given longer sentences, and denied parole more often) than people of other races for similar offenses.

### How can technology help?

With the help of Data Science techniques, the below can be arrived :

(1) Predict the sentence length  based on a wide range of factors including race, 
(2) identify scenarios where the length of the sentence would have been dramatically different if the convicted person's race was different, 
(3) use the same wide range of factors, excluding race, to identify factors and scenarios that predict a dramatically difference in sentence length depending on race.

### The idea

There is a growing need in mitigating bias against specific communities in sentencing process. This solution is primarily to bring in the exploratory data analysis and predictive modeling techniques to build a rational sentencing model which supplements the Judiciary System officials to evaluate unbiased sentencing criteria. This solution also trying to build an improved Decisive model which eradicates some of the inaccuracies in existing models.

## The architecture

The overall solution is built using an Angular-based frontend which the judge or municipal employee can use to fill in their sentencing information. This frontend makes a request to a Python-based microservice built on Flask. The microservice is a simple shim to facilitate calling the model through an HTTP API request.

![Architecture Diagram](./architecture.png?raw=true "Architecture Diagram")

#### Machine Learning Algorithm

**Goal**:   
Predict how likely a charge's sentencing will be very different if the convicted person was of a different race.

**Algorithm training**:  
1) Predict the sentence length  based on a wide range of factors including race,   
2) identify scenarios where the length of the sentence would have been dramatically different if the convicted person's race was different,   
3) use the same wide range of factors, excluding race, to identify factors and scenarios that predict a dramatically difference in sentence length depending on race.  
  
**Limitations**:   
Some factors that might be results of racial bias or might capture information about decisions made with racial bias are included in the model that identifies racial discrepancies in sentencing. Including these factors likely decreases the scale of the racial bias we identify in a given case because some information about racial bias is being encoded in other non-race variables (like the number of charges levied for example). A potential way to address this maybe a sensitivity test in which we refit the model excluding each non-race variable one at a time and asses the the scale of identified racial discrepancy  (and the change in model accuracy). This would allow you to pinpoint which variables are encoding the most information that could be attributed to race.

## Discussion

People in Black Communities are faced with harsher downstream effects than people of other races for similar offenses. Our project attempts to analyze a given offense and the preliminary sentencing determination given by a judge to determine if that sentence falls in line with expectations where race is not a factor.

We used data made available from Cook County, IL (Chicago and surrounding municipalities) to build a model of sentencing based on a variety of factors including charges convicted, category of offenses, age, race, gender, etc. We specifically include race as a feature of the model so that we can compare outcomes based on race. By comparing the sentencing data between a hypothetical Black and White offender, we can determine within some probability that this sentencing is biased or not.


## Project roadmap

TBD

## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

TBD

### Installing

TBD

## Running the tests

Explain how to run the automated tests for this system
Run Following Commands:

### To Run fullstack Application
 - docker-compose build
 - docker-compose up
### To run front-end
 - cd client/
 - docker build -t `<image name>` .
 - docker run --rm --name `<image name>` -p 4201:4201 `<container name>`

 ### To run back-end
 - cd python/
 - docker build -t `<image name>` .
 - docker run --rm --name `<image name>` -p 8080:8080 `<container name>`
 
### Break down into end to end tests

TBD

### And coding style tests

TBD

## Live demo

You can find a running system to test [here](https://us-south.git.cloud.ibm.com/sirraman/Embrace2020)

## Built with

* Angular
* Flask
* Numpy
* Scikit-learn

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

## License

This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).
