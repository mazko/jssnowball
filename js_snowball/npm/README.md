[![npm version](https://badge.fury.io/js/snowball-stemmers.svg)](http://badge.fury.io/js/snowball-stemmers)

Port from [Snowball](http://snowball.tartarus.org/) Stemmers. [Online](http://mazko.github.io/jssnowball/)

Install:

    npm install snowball-stemmers

### Example:

    var snowballFactory = require('snowball-stemmers');

    var rus = snowballFactory.newStemmer('russian');
    rus.stem('чаво');
    
### Output:

    'чав'