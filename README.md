# JavaScript Snowball Stemmers [![Build Status](https://travis-ci.org/mazko/jssnowball.svg?branch=master)](https://travis-ci.org/mazko/jssnowball)

Port from [Snowball](http://snowball.tartarus.org/) Stemmers. [Online](http://mazko.github.io/jssnowball/)

### ESJava (ES6) fun

- Run [bootstrap](snowball_cache/configure) script to download and regenerate last original Java Snowball stemmers

- Use your favorite IDE to remove unused code in *.java sources like ```copy_from```, ```hashCode``` e.t.c. Here is Eclipse EE Mars.1 Release (4.5.1) example:

*source -> cleanup*

![cleanup-profile](js_snowball/screenshots/cleanup-profile.png)

- ESJava has some restrictions like reflection e.t.c. You have to refactor manualy such *.java sources too :(

- Have some fun :)

*esjava.sh*

    #!/bin/bash

    cat \
    ./js_snowball/eclipse/src/org/tartarus/snowball/Among.java \
    ./js_snowball/eclipse/src/org/tartarus/snowball/SnowballProgram.java \
    ./js_snowball/eclipse/src/org/tartarus/snowball/ext \
    | sed '/^package\s/d' | sed '/^import\s/d' \
    > snowball.bundle.java && \
    node --stack-size=10000 `which esjava` snowball.bundle.java > snowball.es6


*babel.sh*

    #!/bin/bash

    ES6FILE='snowball.es6'

    for cls in 'export1' 'export2'; do
      sed -i "s/^class\s\+${cls}\s\+/export class ${cls} /" ${ES6FILE}
    done 

    # Why Babel break unicode ? Fails on [\uD800-\uFFFF] chars. Hot fix: 

    sed 's/\\u/\\\\u/g' "$ES6FILE" |                     \
    node --stack-size=10000  \
    "`which babel`"                                      \
    --compact=false                                      \
    --presets es2015 \
    --plugins transform-es2015-modules-umd --module-id luceneTokenizers |   \
    sed 's/\\\\u/\\u/g' > snowball.babel.js