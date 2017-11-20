# JavaScript Snowball Stemmers [![Build Status](https://travis-ci.org/mazko/jssnowball.svg?branch=master)](https://travis-ci.org/mazko/jssnowball) [![npm version](https://badge.fury.io/js/snowball-stemmers.svg)](http://badge.fury.io/js/snowball-stemmers) [![Coverage Status](https://coveralls.io/repos/mazko/jssnowball/badge.svg?branch=master&service=github)](https://coveralls.io/github/mazko/jssnowball?branch=master)
 
All JavaScript stemmers have been transpiled from Java implementation of [Snowball](http://snowballstem.org/) stemming algorithms using [ESJava](https://github.com/mazko/esjava) transpiler.

This project provides not only pre-built JavaScript stemmers, but allows to create new ones.

## Pre-built stemmers

Stemmers for 20+ languages are packed in one file in two ECMAScript standards:
 * [ES6](//github.com/mazko/jssnowball/raw/master/js_snowball/lib/snowball.es6)
 * [ES5](//github.com/mazko/jssnowball/raw/master/js_snowball/lib/snowball.babel.js)

You can test stemmers directly in [online demo](http://mazko.github.io/jssnowball/).

## How to build

As there are several limitations of ESJava transpiler, the build process has to be complemented by pre- and post-transpiling tweaks.

### Prerequisities

 * Unix-like OS (or Cygwin on Windows)
 * Node.js + npm
 * rsync (for syncing Snowball repository, required only in specific scenarios)
 * perl (for generating Java code from Snowball algorithms (SBL files), required only in specific scenarios)

### Rebuilding stemmers

  1. [Building Java stemmers from most recent Snowball stemmers](#building-java-stemmers-from-most-recent-snowball-stemmers)
  2. [Creating a Java bundle](#creating-a-java-bundle)
  3. [Tweaking the Java bundle](#tweaking-the-java-bundle)
  4. [Transpiling the Java bundle to JavaScript](#transpiling-the-java-bundle-to-javascript)
  5. [Modifying the transpiled JavaScript](#modifying-the-transpiled-javascript)

### Adding custom stemmers

  1. [Building Java stemmers from most recent Snowball stemmers](#building-java-stemmers-from-most-recent-snowball-stemmers)
  2. [Building Java stemmers from custom Snowball stemmers](#building-java-stemmers-from-custom-snowball-stemmers)
  3. [Creating a Java bundle](#creating-a-java-bundle)
  4. [Adding custom Java stemmers into the bundle](#adding-custom-java-stemmers-into-the-bundle)
  5. [Tweaking the Java bundle](#tweaking-the-java-bundle)
  6. [Transpiling the Java bundle to JavaScript](#transpiling-the-java-bundle-to-javascript)
  7. [Modifying the transpiled JavaScript](#modifying-the-transpiled-javascript)

### Steps in a detail

#### Building Java stemmers from most recent Snowball stemmers

    git clone https://github.com/mazko/jssnowball.git
    cd jssnowball/
    make bundle

#### Building Java stemmers from custom Snowball stemmers

 1. Change directory to `jssnoball/snowball-master/`
 2. Create new subfolder in the `algorithms` folder and copy there the given SBL file renamed to `stem_Unicode.sbl`
 3. Add stemmer configuration into `libstemmer/modules.txt` and `libstemmer/modules_utf8.txt`
 4. Add stemmer to the GNUmakefile's `libstemmer_algorithms` variable
 5. Compile the Snowball using `make dist`

#### Creating a Java bundle

As ESJava can convert a single file only, all Java source files have to be bundled first.

    git checkout -- js_snowball/eclipse/
    make bundle

#### Adding the Java stemmer into the bundle

Copy the Java stemmer code from `jssnoball/snowball-master/java/org/tartarus/snowball/ext/` into `jssnowball/js_snowball/lib/snowball.bundle.java`.

It also recommended to remove unused code like `copy_from`, `hashCode` etc. Here is Eclipse EE Mars.1 Release (4.5.1) example:

*source -> cleanup*

![cleanup-profile](js_snowball/screenshots/cleanup-profile.png)

#### Tweaking the Java bundle

There are some Java constructions that can't be translated to JavaScipt directly, e.g. reflection etc. Such fragments has to be tweaked a bit.

Fortunately, most of them are in the common code, not in stemmers themselves (except for finnishStemmer). They are wrapped inside `:es6:` code `:end:` and should be edited as suggested in comments. 

On top of that, these further tweaks are required:
 * removing package names in method references (`org.tartarus.snowball`, `java.lang`)
 * removing some overloaded methods

The result should match the original [snowball.bundle.java](https://github.com/mazko/jssnowball/blob/master/js_snowball/lib/snowball.bundle.java) file. 

#### Transpiling the Java bundle to JavaScript

    npm i -g esjava babel-cli
    npm i babel-preset-es2015 babel-plugin-transform-es2015-modules-umd
    make esjava

#### Modifying the transpiled JavaScript

In the final JavaScript files (stored in `jssnowball/js_snowball/lib/` directory) it is necessary to replace `s.length()` with `s.length` in `eq_s` and `eq_s_b` methods. Otherwise the code returns a TypeError: `s.length is not a function`.