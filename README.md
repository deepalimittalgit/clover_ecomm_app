This project was built to demonstrate Clover's E-commerce APIs using React app. 

### How to run locally
    In the project directory
    
    1. Create `.env` file at project root.
    2. Define below three variables -
        ACCESS_TOKEN=<ACCESS_TOKEN>
        API_KEY=<API_KEY>
        ENVIRONMENT=<sandbox|production>
    3. npm run nuke
    4. npm run dev

Note - ACCESS_TOKEN and API_KEY will be provided after signing up at clover. More info [here](https://sandbox.dev.clover.com/developer-home/create-account).

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### How to build for production deployment
    1. npm run nuke
    2. npm run build

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

Enjoy!