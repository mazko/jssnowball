# JavaScript Snowball Stemmers [![Build Status](https://travis-ci.org/mazko/jssnowball.svg?branch=master)](https://travis-ci.org/mazko/jssnowball) [![npm version](https://badge.fury.io/js/snowball-stemmers.svg)](http://badge.fury.io/js/snowball-stemmers) [![Coverage Status](https://coveralls.io/repos/mazko/jssnowball/badge.svg?branch=master&service=github)](https://coveralls.io/github/mazko/jssnowball?branch=master)

Port from [Snowball](http://snowball.tartarus.org/) Stemmers. [Online](http://mazko.github.io/jssnowball/)

[snowball.es6](//github.com/mazko/jssnowball/raw/master/js_snowball/lib/snowball.es6) | [snowball.babel.js](//github.com/mazko/jssnowball/raw/master/js_snowball/lib/snowball.babel.js)

### [ESJava](https://github.com/mazko/esjava) (ES6) fun

#### Easy

    nodeenv ~/virtualenvs/snowball --prebuilt
    . ~/virtualenvs/snowball/bin/activate

    npm i -g babel-cli esjava
    git clone https://github.com/mazko/jssnowball.git
    cd jssnowball/
    make bundle

There are some Java constructions that can't be translated to JavaScipt directly. For example reflection e.t.c. You have to convert such fragments Java => JavaScipt manually. I have already done that and you can just skip this step unless Snowball core (Java) has not changed. To do so:

    git checkout -- js_snowball/eclipse/
    make bundle

Now open file js_snowball/lib/snowball.bundle.java in your favorite editor. You'll see some code parts are wrapped inside `:es6:` code `:end:` - edit them following suggestions. Now you can convert snowball.bundle.java to es6:

    npm i babel-preset-es2015 babel-plugin-transform-es2015-modules-umd
    make esjava

#### Advanced

- Run [bootstrap](snowball_cache/configure) script to download and regenerate last original Java Snowball stemmers

- Use your favorite IDE to remove unused code in ```*.java``` sources like ```copy_from```, ```hashCode``` e.t.c. Here is Eclipse EE Mars.1 Release (4.5.1) example:

*source -> cleanup*

![cleanup-profile](js_snowball/screenshots/cleanup-profile.png)

- **ESJava** has some restrictions like reflection e.t.c. You have to refactor manually such ```*.java``` sources too :(

- Merge all ```*.java``` in to one single *snowball.bundle.java*: ```make bundle```

- Manually edit js-specific fragments: ```awk /:es6:/,/:end:/ js_snowball/lib/snowball.bundle.java```

- Enjoy ```make esjava``` !
