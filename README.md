# Mars rover photos

This is a repo done in ionic react. The repo tends to get data from the nasa api endpoint
for the photos taken from the rover cameras depending on the chosen date. On selecting an image we are taken to the specific image page and on liking the data is stored in firestore.

## Installation

Ensure that you have installed node and npm packages.

https://nodejs.org/en/download/

```bash

node --version


npm --version
npm install -g @ionic/cli

git clone git@github.com:AMfalme/mars-rover-photos.git

cd mars-rover-photos


npm install

ionic serve

```

To run the application using ionic capacitor, simply install capacitor and run as follows.

```
npm install @capacitor/cli@latest


ionic capacitor run android -l
ionic capacitor run ios -l
```
