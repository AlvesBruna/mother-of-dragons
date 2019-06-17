[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=AlvesBruna_mother-of-dragons&metric=alert_status)](https://sonarcloud.io/dashboard?id=AlvesBruna_mother-of-dragons)
# Mother of Dragons
_

### Requirements

Angular version: 8.0.3 <br />
The official Node.js version supported by angular is 10.9 or greater.

Node version: 10.9+ <br />
If you use Node Version Manager you can type `nvm use` within the project terminal.

This projects use the Firebase Athentication. 
To initialize Firebase you need to provide an app's Firebase project configuration [more info here](https://firebase.google.com/docs/web/setup). When you have the project config object just paste in the `environments.ts` file, just like the `environments.example.ts`.

_

### Running

- `npm instal` installs all project dependencies
- `npm start` runs the application
- `npm test` runs all tests
- `npm run test:coverage` runs all project tests and output its coverage files
- `npm run sonar` runs SonarQube code analysis. The results can be found [here](https://sonarcloud.io/dashboard?id=AlvesBruna_mother-of-dragons).

_

## Implementation Details

This project was created with Angular CLI with the option `--createApplication=false` that creates an empty workspace with no initial app,
so that way it was easier to configure the project to use the test framework Jest.
The project's folders are organized by feature and the shared files are separeted by type (ie. guards, pipes).

//WIP
