## Roman Numerals

This is a demonstration React project that 
converts integers to roman numerals. It consists of a 
React front end UI and a simple backend nodeJS REST API. 
The React UI allows the user to key any integer between 
1 and 3999. It will POST this number to the nodeJS API 
and display the result. 

Try the [deployed version](https://roman-numerals-prod-723628240383.europe-west1.run.app) on Google Cloud [Click Here](https://roman-numerals-prod-723628240383.europe-west1.run.app)

(Disclaimer: The instance on Google Cloud is on a free tier and is subject to occasional shutdowns with 10+ minute long cold starts. If the link errors out please check back after about 10 minutes.)

## Features
The UI respects both light and dark mode. This has been tested with Chrome DevTools. Also, the app is entirely
localized. Appending a `?lng=es` query string will [switch to Spanish](https://roman-numerals-prod-723628240383.europe-west1.run.app?lng=es).

## Details
The REST request is handled as
a POST rather than a GET because it concerns the processing
and transformation of the input, rather than retrieval
of a value.
* There is solid amount of unit tests which can double as documentation on how the individual components work.
* Time was spent on creating proper [pull requests](https://github.com/cliff76/roman-numerals/pulls?q=is%3Apr+is%3Amerged) to merge individual features in.
  * Care was taken to split larger PRs into smaller ones to make each code review manageable.
  * [Some](https://github.com/cliff76/roman-numerals/pull/11) of the [more interesting](https://github.com/cliff76/roman-numerals/pull/12) PRs include video [illustrating milestones](https://github.com/cliff76/roman-numerals/pull/15) throughout the project.

## Demo

The following video demonstrates the Roman numeral converter in action. This application is currently deployed on Google Cloud Services, providing a scalable and reliable hosting environment for both the React frontend and Node.js backend API.

<a href="https://youtu.be/TwzMMMzA2iY">
    Watch the demo on YouTube!
    <img src="demo.gif" alt="Watch the demo" />
</a>