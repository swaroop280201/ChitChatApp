# ChitChat

![Chat Image](https://res.cloudinary.com/dg2zkumuc/image/upload/v1645280594/React%20Badges/chitchat-removebg-preview_hxvcl4.png)

## Table of Contents
- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)

## File structure
#### `client` - Holds the client application
- #### `public` - This holds all of our static files
- #### `src`
     - #### `animations` - This folder holds components and data related to lottie animations
    - #### `assets` - This folder holds assets such as images, docs, and fonts
    - #### `components` - This folder holds all of the different components that will make up our views
    - #### `context` - This folder holds all of the different components and functions related to local state of the application
    - #### `icons` - This folder holds all of the different custom icons
    - #### `pages` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
    - #### `utils` - This folder holds some like custom types, utility,functions,etc.
    - #### `App.tsx` - This is what renders all of our browser routes and different pages
    - #### `index.tsx` - This is what renders the react app by rendering App.tsx, should not change
- #### `package.json` - Defines npm behaviors and packages for the client
#### `server` - Holds the server application
- #### `src`
     - #### `adapter` - This folder holds the setup of the specific Websocket Platform that is being used in the application
    - #### `chat` - This folder holds all the business logic code and websocket events related to video and chatting functionality
    - #### `main.ts` - This is the entry file of the application which uses the core function NestFactory to create a Nest application instance.
- #### `package.json` - Defines npm behaviors and packages for the server
- #### `tsconfig.json` - This file specifies the root files and the compiler options required to compile the project.
#### `.gitignore` - Tells git which files to ignore
#### `README` - This file!


## About The Project
This is the simple application in which just by sharing code you can video chat with your friend instantly. You can  use it live [here](https://sn-chitchat.netlify.app/)

### Built With

- [React](https://reactjs.org/)
- [Node](https://nodejs.org/en/)
- [WebRTC](https://webrtc.org/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites
- [Node](https://nodejs.org/en/download/)
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other

This is an example of how to list things you need to use the software and how to install them.

- npm

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo

```sh
git clone https://github.com/swaroop280201/ChitChatApp
```

# Usage (run this app on your machine)

## Client-side usage(PORT: 3000)
```terminal
$ cd client   // go to client folder
$ npm i       // npm install packages
$ npm run start // run it locally
```
## Server-side usage(PORT: 5000)

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run start:dev // run it locally
```
