# liri-node-app
LIRI app

### Summary
**Liri** is a command line application written in NodeJS. It can be used to search for information about **movies**, **songs**, and upcoming **concerts**. Liri uses **NodeJS**, **DotEnv**, **Moment**, **Axios**, **Node-Spotify-API**, **OMDB API**, and **Bands In Town API**. Liri logs all previously inputed commands in the `log.txt` file.


### Usage
While in the directory of **liri.js**, use the command line to type a search term as follows:

(example)
`node liri movie-this toy story`

First type **node liri**
then type an **operator**
your choices are:
* concert-this
* spotify-this-song
* movie-this
* do-what-it-says

finally type a **search term**

Examples of the application usage can be found in the example folder in PNG format.

* Simply typing in node liri gives you a menu. (Cap1.PNG) 
* The operator "concert-this" shows the next concert for the search term from the Bands in Town API. (Cap2.PNG)
* The operator "spotify-this-song" gives you song information of the search term from Spotify. (Cap3.PNG)
* The operator "movie-this" gives you movie information of the search term from the OMDB. (Cap4.PNG)
* The operator "do-what-it-says", well, does what it says. (Cap5.PNG).



### Requirements
LiriBot uses **NodeJS** and the following npm packages:
* DotEnv
* Moment
* Axios
* Node-Spotify-API