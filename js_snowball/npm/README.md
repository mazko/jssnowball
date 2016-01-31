Port from [Snowball](http://snowball.tartarus.org/) Stemmers. [Online](http://mazko.github.io/jssnowball/)

Install:

    npm i snowball-stemmers

### Example:

    var snowballFactory = require('snowball-stemmers');

    var rus = snowballFactory.newStemmer('russian');
    rus.stem('чаво');

    snowballFactory.algorithms();

### Output:

    'чав'

    [ 'arabic',
      'armenian',
      'basque',
      'catalan',
      'czech',
      'danish',
      'dutch',
      'english',
      'finnish',
      'french',
      'german',
      'hungarian',
      'italian',
      'irish',
      'norwegian',
      'porter',
      'portuguese',
      'romanian',
      'russian',
      'spanish',
      'slovene',
      'swedish',
      'tamil',
      'turkish' ]

[More about ESJava](https://github.com/mazko/esjava)