# Spring Petclinic Angular [![Build Status](https://travis-ci.org/spring-petclinic/spring-petclinic-angular.png?branch=master)](https://travis-ci.org/spring-petclinic/spring-petclinic-angular/)

####**Angular frontend for Spring Petclinic.**

Warning: **client only**. 
  Use REST API from backend [spring-petclinic-rest project](https://github.com/spring-petclinic/spring-petclinic-rest)
  You need start backend server before start frontend application.
  

## Installation
1. Update angular-cli to latest version (1.1 current)
as described on [angular-cli github readme.md](https://github.com/angular/angular-cli#updating-angular-cli)

````
npm uninstall -g angular-cli @angular/cli
npm cache clean
npm install -g @angular/cli@latest
````
Clone project from github
````
git clone https://github.com/spring-petclinic/spring-petclinic-angular.git
````
Install local project package
````
npm install --save-dev @angular/cli@latest
if npm version > 5.0 delete package-lock.json file  ( bug - this file prevent correct packages install)
npm install
````

Now project use Angular CLI v.1.1 and Angular v.4.1.
You can see current dependencies in package.json file.

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Screenshot

<img width="1427" alt="spring-petclinic-angular2" src="https://cloud.githubusercontent.com/assets/838318/23263243/f4509c4a-f9dd-11e6-951b-69d0ef72d8bd.png">

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
