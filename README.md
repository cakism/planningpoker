# Planning Poker
This simple planning poker app is built with a Kotlin Spring Boot backend and a React frontend. 

## How to build:
- Clone the repo: `git clone https://github.com/`
- Install [Node](https://nodejs.org) and [npm](https://www.npmjs.com)
- Install node modules, currently needs to be done from within the client folder (sorry) `cd pokerclient`
-  `npm install`
- Run npm script `npm run build`
- Run Spring-Boot server `../gradlew bootRun`

## Known issues
* If you disconnect your vote will still be visible to others and reconnecting will give you a new user and vote
* No input or type validation so please respect the Required astrixes and dont break stuff :)