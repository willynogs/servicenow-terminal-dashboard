## Servicenow Terminal Dashboard

This is a Servicenow dashboard that runs in terminal.

## Installation

1. clone or download the project, `cd` into it and run `npm install`
2. rename the `rename_config.js` file as just `config.js`
2. update the new `config.js` file with your information
3. run `node app.js` or `npm start` and the project should run right in the terminal!

## Usage

* highlighting a row in my work and pressing enter will open that record in your default browser
* if you are having issues with the servicenow REST api make sure you have CORS properly configured in your instance, as well as the correct permissions on the user profile you are using for the REST call. Refer to: [http://wiki.servicenow.com/index.php?title=REST_API](http://wiki.servicenow.com/index.php?title=REST_API)

## Contributors

Will Naugle ([@willynogs](https://github.com/willynogs))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
