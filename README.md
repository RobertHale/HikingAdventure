# HikingAdventures

## How to run the tests:
To run tests make sure all requirments, *as noted in requirements section*, are met.
All tests can be run via the makefile in the root directory as described below:

#### Selenium Tests:
```zsh
make selenium
```
#### Mocha Tests:
```zsh
make mocha
```
#### Backend Tests:
```zsh
make backend
```
#### API Tests:
```zsh
make postman
```
#### Running All Tests:
```zsh
make tests
```
*note: make tests runs in this order -> selenium, mocha, backend, and then API*

## Requirements:
Before running anything below make sure you have npm installed and pip installed for python 2.7.  Some pip dependencies may require additional installs using apt-get.
#### In the root directory run:
```zsh
pip install -r requirements.txt
```
#### In the static directory run:
```zsh
npm install
npm install -g newman
```
#### For the selenium driver:
A selenium driver for linux is located in the tests directory.  If you would rather use your own driver, you will need to change the guitests.py to reflect the location of your driver.

[Travis CI url](https://travis-ci.org/RobertHale/HikingAdventure)
