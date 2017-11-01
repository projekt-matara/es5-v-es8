# es5-v-es8

This is a project meant to teach the basics of ES8 Javascript by building two different apis.
The ES5 api is built with Express while the ES8 api utilizes Koa. By doing this, the hope is 
that we can better understand the new ES8 features by seeing them utilized in the real world.
As a result, The ES5 demo does not get to utilize any JS augmenting libraries (no async, Q, 
bluebird, underscore, etc.) as we're focusing on what the core languages are capable of. 

To be able to use and or run the projects as a whole you will need...

- Node.js 8.x.x or above
- MongoDB or access to a Mongo host
- preferably npm 5.x.x or above

In both the `es5` and `es8` directories, open `config.js` and enter the url to your mongo database. 

You will also find a Postman json file in the root directory so you can play with the apis as needed.
