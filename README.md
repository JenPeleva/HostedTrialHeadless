# DevMagApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5. It uses the [Sitefinity WebServices SDK](https://www.npmjs.com/package/sitefinity-webservices-sdk) and data from https://devmagazine-uat.sitefinity.site/

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Steps of building the application

1. Add "sitefinity-webservices-sdk" package to the package.json dependencies. This makes it available on the window object.
2. Then register it in the providers property of the app.module.ts to provide the application with the value of window['Sitefinity'] for any injection called Sitefinity.
3. Create the Sitefinity service and Inject Sitefinity in the constructor. 
4. Create two get methods for the Sitefinity SDK instance and query, respectively (for more information about the Sitefinity Webservices SDK, refer to: https://www.npmjs.com/package/sitefinity-webservices-sdk)
5. Add the reusable parts of the app to the app.component - navigation and general layout.
6. Configure the routing for the News and Showcases routes. 
7. Create the newsitems component (the list of news).
8. Create the news service with getAllNews method.
9. Prepare the query object, specifying which properties to select (Title, Id etc) and expand the complex properties (related  data and related media).
10. Use the 'get' method of the Sitefinity Webservices SDK to request news items from Sitefinity. Provide the query object, as well as success and failure callbacks to the 'get' method. 
11. Since the get request is asynchronous, return the received data as an Observable.
12. Create the other components, following the same approach. 
