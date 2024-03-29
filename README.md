<p align="center">
    <a href="https://github.com/1hitsong/AOS">
        <img height="175" width="175" alt="AOS" src="https://raw.githubusercontent.com/1hitsong/AOS/master/assets/icon.png"/>
    </a>
</p>
<div align="center">
    <h1 style="border:0;margin-bottom:0">AOS</h1>
    <p style="border-bottom:1px solid #555;width:300px"><em>(Ace of Spades)</em></p>
    <h3>A React Native Lemmy client</h3>
    <a href="https://raw.githubusercontent.com/1hitsong/AOS/master/static/screenshot.png">
        <img height="375" width="175" alt="AOS" src="https://raw.githubusercontent.com/1hitsong/AOS/master/static/screenshot.png"/>
    </a>
    <h4>WIP! You can try using it, just don't get mad if something doesn't work correctly.</h3>
</div>

---
<p align="center">
    <a href="https://github.com/1hitsong/AOS">
        <img alt="GPL 2.0 License" src="https://img.shields.io/github/license/1hitsong/AOS.svg"/>
    </a>
</p>

<h3>Get Started</h3>
<p>Clone the repo and run the following commands from the root folder</p>
<pre>
npm install
yarn install
npx expo start
</pre>

<p>While developing, you may want to edit the default state values in `/screens/Login.js`</p>

***
### Debugging
The below section describes how you can debug the application while it is running. These steps are for Android emulators.
#### Prerequisites
You will need to install the following:
* An Android emulator running on your development machine
* React Dev Tools installed on your machine
    * Run `npm install -g react-devtools` to install

Steps
1. Start the expo app with the following command: `npx expo start --lan`. Once this completes, enter the `a` to load the Android application. This will start the application running on your local machine with links to run on a separate device. As of the writing of these steps, I have not tested with a remote device, only a locally running Android emulator.
2. Run the emulator on your local machine in another terminal instance.
3. In a 3rd terminal instance, run the react tools with the command `react-devools`. This will open a window that will allow you to search for components and will give information about the state of all the components in your application.
4. In the first terminal, enter `j` to open the Javascript debugger. This will allow you to set breakpoints in your code.

#### Resource Links
[Expo Debugging Tools Documentation](https://docs.expo.dev/debugging/tools/)  
[React Native Debugging Documentation](https://reactnative.dev/docs/debugging)
