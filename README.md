# Planning Poker
This simple planning poker app is built with: 
- Kotlin Spring Boot + Gradle
- React 
- WebSockets 

## How to build:
- Clone the repo: `git clone https://github.com/cakism/planningpoker.git`
- Install [Node](https://nodejs.org) and [npm](https://www.npmjs.com)
- Install node modules, currently needs to be done from within the client folder (sorry) `cd pokerclient`
-  `npm install`
- Run npm script `npm run build`
- Serve with something like [Serve](https://www.npmjs.com/package/serve) `serve -s build`
- Run Spring-Boot server from project root `./gradlew bootRun`

## Instructions:
- Choose to create a new poll, or join an existing one if you have received a join code from someone
#### For create: 
- Choose a username, a name for your poll and optionally a description and press Create
- Share the join code from top of the page with your team members
- Vote by choosing a number from the drop down. No one will see you in the room until you've voted.
- You can change your vote any time.

#### For Join: 
- Chose a username and enter the join code given to you by a team member, press Join
- Vote by choosing a number from the drop down. No one will see you in the room until you've voted.
- You can change your vote any time.

## Known issues
* If you disconnect your vote will still be visible to others and reconnecting will give you a new user and vote
* No input or type validation so please respect the Required astrixes and dont break stuff :)
* Error handling is pretty non-existant so if the app starts to behave weirdly after you refresh the page or something, just go back to start and rejoin the room with a new user (sorry)
