# ParcellesFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## First Pull ?

If you are importing this project for the first time, you will need to install the dependencies.
Run `npm install` or `npm i`.

## Memo Compodoc

Compodoc is a documentation tool. It will build files based on certain comments.

### Which File ?

In [tsconfig.doc.json](https://github.com/RobinPecheurTechnobel/Parcelles-Frontend/blob/dev/tsconfig.doc.json), you can define which file is **"read"** and which is **ignored**.

### All comments is used by Compodoc ?

/\*\*

\* this kind of comment is supported by Compodoc

\*/

YourFunctionInAngular()

[For more information](https://compodoc.app/guides/comments.html)

You can also add more detail with some tags.

For example : `@param {string} username the name of the target user`

This situation discribes the function have an input _parameter_ named _username_. This parameter is a _string_ and _the name of the target user_ indicates its purpose.

[For more doc tags](https://compodoc.app/guides/jsdoc-tags.html)

### How to use it ?

Run `compodoc -p tsconfig.doc.json -s` will build and Serve the documentation on localhost (8080 by default).

In [Package.json](https://github.com/RobinPecheurTechnobel/Parcelles-Frontend/blob/dev/package.json), you can define a command in _scripts_. 

**For this project, you can run** `npm run compodoc`. **It will run this command** `compodoc -p tsconfig.doc.json -s -r 4201`, **so documentation will be available on localhost:4201**

## Memo Angular:

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
