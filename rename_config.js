/*
  this file contains all credentials and variables ** RENAME THIS FILE config.js AND FILL IN YOUR CREDENTIALS **
*/
module.exports = {
  city: 'Columbus, Ohio', /* city used for weather api */
  quotes_cat: 'famous', /* can be either famous or movies */
  sn_instance: '', /* name of servicenow instance to use */
  sn_username: '', /* servicenow username for REST call */
  sn_password: '', /* servicenow password for REST call [must be set explicitly, NOT your sso password] */
  sn_user: '', /* we will get information based on this servicenow username */
  quotes_frequency: 30000, /* how often should we get a new quote? in milliseconds (1000 = 1 second) */
  weather_frequency: 10000, /* how often should we update the weather? in milliseconds (1000 = 1 second) */
  sn_frequency: 10000, /* how often should we get info from servicenow? in milliseconds (1000 = 1 second) */
}
