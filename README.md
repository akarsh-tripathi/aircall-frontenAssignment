
### The Aircall app is available for you! 🥳 🚀

- Web: Visit [https://aircall-frontend-assignment-hoe1.vercel.app/](https://aircall-frontend-assignment-hoe1.vercel.app/).
- Android: coming soon 👀

---

<br />

<div align="center">

**[PROJECT PHILOSOPHY](https://github.com/chroline/well_app#-project-philosophy) • 
[TECH STACK](https://github.com/chroline/well_app#-tech-stack) **

</div>

<br />

# 🧐 Project philosophy

> Here is the Aircall, An app built with Webpack to serve the public with a high-speed transpiler and high runtime scripts.
> The Aircall delivers the functionality of Archiving and Unarchiving your call logs. 
> It also contains a separate section having Archive Section.
 


# 👨‍💻 Tech stack

Here's a brief high-level overview of the tech stack the Well app uses:

- This project uses the [React Js](https://flutter.dev/).  declarative, efficient, and flexible JavaScript library for building user interfaces. React allows for the development of reusable UI components, making it easier to maintain and scale the application.
- This project uses the [Material UI](https://flutter.dev/). Material-UI is a React UI framework that follows the principles of Google's Material Design. It provides a set of customizable components for building visually appealing and responsive user interfaces.
- This project uses the [Webpack](https://flutter.dev/).  Webpack is a powerful bundler that is used to bundle and manage the project's assets. It simplifies the deployment process by optimizing and bundling various assets such as JavaScript, CSS, and images.

## App Details


The goal of this test is to make you code a small ReactJS app. We have prepared a skeleton app for you, but please change whatever you want (CSS files, HTML structure, JS structure, etc).

The app will have the following features:
- **Activity Feed** - simple list of calls
- **Activity Detail** - detail of a call
- **Archive** - the final user should be able to archive (and unarchive) a call. Archived calls will no longer be displayed on the Activity Feed and should have a separate Archived Tab.
- A button to archive all calls in the activity feed
- A button to unarchive all calls in the archived calls tab


## API documentation

### Routes

Here is the API address: https://cerulean-marlin-wig.cyclic.app/ <br>
If you run into a CORS error, please prepend the base URL with this CORS Anywhere server URL: https://charming-bat-singlet.cyclic.app/ <br>
The prepended base URL will look like this https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/

The API is hosted on a free server, which is why the first time you call the API, it will throw an error. The server goes to sleep if there hasn't been any activity for a while, but after 30-60 seconds of the first call, it should work as expected. Please reach out to us in case it doesn't.

- **GET** - BASE_URL/activities: get calls to display in the Activity Feed
- **GET** - BASE_URL/activities/<call_id> retrieve a specific call details
- **PATCH** - BASE_URL/activities/<call_id> update a call. The only field updatable is `is_archived (bool)`. You'll need to send a JSON in the request body:
