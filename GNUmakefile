# -*- makefile -*-

libstemmer_algorithms = danish dutch english finnish french german hungarian \
			italian \
			norwegian porter portuguese romanian \
			russian spanish swedish turkish

java_src_genereted = java/org/tartarus/snowball/ext

JAVA_SOURCES = $(libstemmer_algorithms:%=snowball_code/$(java_src_genereted)/%Stemmer.java)
JS_TESTS_SRC = $(libstemmer_algorithms:%=js_snowball/tests/js/%Tests.js)
JS_TESTS_HTML = $(libstemmer_algorithms:%=js_snowball/tests/%Tests.html)

all: js_snowball/demo.html js_snowball/tests/composite.html

js_snowball/demo.html: js_snowball/lib/Snowball.js
	@echo "<!DOCTYPE html>" > $@;											\
        echo "<html>" >> $@;												\
        echo "<head>" >> $@;												\
        echo "<meta charset=\"utf-8\">" | sed 's!^!\t!' >> $@;								\
        echo "<title>Online Snowball stemmers demo</title>" | sed 's!^!\t!' >> $@;					\
	echo "<script src=\"lib/Snowball.js\"></script>" | sed 's!^!\t!' >> $@;						\
	echo "<script>" | sed 's!^!\t!' >> $@;										\
        echo "var Stem = (function() { var lang, testStemmer; return function(lng, word) { "				\
        	"if (lng != lang) {lang = lng; testStemmer = new Snowball(lang);} "					\
		"testStemmer.setCurrent(word); testStemmer.stem(); return testStemmer.getCurrent();}})();" |		\
	sed 's!^!\t\t!' >> $@;												\
        echo "function printstem(lng, word){"										\
        	"document.getElementById(\"result\").innerHTML = \"<b>\" + Stem(lng, word) + \"</b>\";}" |		\
	sed 's!^!\t\t!' >> $@;												\
	echo "</script>" | sed 's!^!\t!' >> $@;										\
        echo "</head>" >> $@;												\
	echo "<body>" >> $@; 												\
	echo "<p>Type ONE word, select language and press \"<b>Stem!</b>\" button.</p>" | sed 's!^!\t!' >> $@;		\
	echo "<input maxlength=\"50\" size=\"50\" id=\"query\" type=\"text\">" | sed 's!^!\t!' >> $@;			\
	echo "<select id=\"language\">" | sed 's!^!\t!' >> $@;								\
	$(foreach lang,$(libstemmer_algorithms), 									\
	echo "<option value=\"$(lang)\">$(lang)</option>" | sed 's!^!\t\t!' >> $@;)					\
	echo "</select>" | sed 's!^!\t!' >> $@;										\
	echo "<button type=\"button\" onclick=\""									\
		"printstem(document.getElementById('language').value, "							\
		"document.getElementById('query').value);\">Stem!</button>" | sed 's!^!\t!' >> $@;			\
	echo "<p id=\"result\"></p>" | sed 's!^!\t!' >> $@;								\
	echo "</body>" >> $@; 												\
	echo "</html>" >> $@;

js_snowball/tests/composite.html: $(JS_TESTS_SRC) $(JS_TESTS_HTML)
	@echo "<!DOCTYPE html>" > $@;											\
        echo "<html>" >> $@;												\
        echo "<head>" >> $@;												\
        echo "<meta charset=\"utf-8\">" | sed 's!^!\t!' >> $@;								\
        echo "<title>QUnit tests for all stemmers</title>" | sed 's!^!\t!' >> $@;					\
	echo "<link rel=\"stylesheet\" href=\"qunit/qunit-1.10.0.css\">" | sed 's!^!\t!' >> $@;				\
	echo "<link rel=\"stylesheet\" href=\"qunit/addons/composite/qunit-composite.css\">" | sed 's!^!\t!' >> $@;	\
	echo "<script src=\"qunit/qunit-1.10.0.js\"></script>" | sed 's!^!\t!' >> $@;					\
	echo "<script src=\"qunit/addons/composite/qunit-composite.js\"></script>" | sed 's!^!\t!' >> $@;		\
	echo "<script>" | sed 's!^!\t!' >> $@;										\
	echo "QUnit.config.hidepassed = true;" | sed 's!^!\t\t!' >> $@;							\
	echo "QUnit.testSuites([" | sed 's!^!\t\t!' >> $@;								\
	$(foreach lang,$(libstemmer_algorithms), 									\
	echo $${separator_between_tests} >> $@; separator_between_tests=","; 						\
	echo "\"$(lang)Tests.html\"" | sed 's!^!\t\t\t!' >> $@;)							\
	echo "]);" | sed 's!^!\t\t!' >> $@;										\
	echo "</script>" | sed 's!^!\t!' >> $@;										\
        echo "</head>" >> $@;												\
	echo "<body>" >> $@; 												\
	echo "<div id=\"qunit\"></div>" | sed 's!^!\t!' >> $@;								\
	echo "<div id=\"qunit-fixture\"></div>" | sed 's!^!\t!' >> $@;							\
	echo "</body>" >> $@; 												\
	echo "</html>" >> $@;

js_snowball/tests/%Tests.html:
	@lang=`echo "$@" | sed 's!.*/!!' | sed 's!Tests\.html!!'`;				\
	echo "<!DOCTYPE html>" > $@;								\
        echo "<html>" >> $@;									\
        echo "<head>" >> $@;									\
        echo "<meta charset=\"utf-8\">" | sed 's!^!\t!' >> $@;					\
        echo "<title>QUnit tests for $${lang} stemmer</title>" | sed 's!^!\t!' >> $@;		\
	echo "<link rel=\"stylesheet\" href=\"qunit/qunit-1.10.0.css\">" | sed 's!^!\t!' >> $@;	\
        echo "</head>" >> $@;									\
	echo "<body>" >> $@; 									\
	echo "<div id=\"qunit\"></div>" | sed 's!^!\t!' >> $@;					\
	echo "<script src=\"qunit/qunit-1.10.0.js\"></script>" | sed 's!^!\t!' >> $@;		\
	echo "<script src=\"../lib/Snowball.js\"></script>" | sed 's!^!\t!' >> $@;		\
	echo "<script src=\"js/$${lang}Tests.js\"></script>" | sed 's!^!\t!' >> $@;		\
	echo "</body>" >> $@; 									\
	echo "</html>" >> $@;

js_snowball/tests/js/%Tests.js: snowball_all/algorithms/%/voc.txt js_snowball/lib/Snowball.js snowball_code/stemwords
	@lang=`echo "$@" | sed 's!.*/!!' | sed 's!Tests\.js!!'`;								\
	echo "QUnit.config.hidepassed = true;" > $@;										\
	echo "QUnit.config.blocking = false;" >> $@;										\
        echo "var Stem = (function() { var testStemmer = new Snowball('$${lang}'); return function(word) { "			\
        	"testStemmer.setCurrent(word); testStemmer.stem(); return testStemmer.getCurrent();}})();" >> $@;		\
	echo "Generating tests for $${lang}"; 											\
	./snowball_code/stemwords -i snowball_all/algorithms/$*/voc.txt -l $${lang} -p | 	 				\
	sed '/^\s\+\S*\s\+$$/d' | sed 's!\"!\\\"!g' |										\
	sed 's!\(\S\+\)\s\+\S*\s\+\(\S*\)!test\(\"\1 -> \2\", function\(\) {deepEqual\( Stem(\"\1\"\), \"\2\"\);}\);!' >> $@;	\
	total=`cat snowball_all/algorithms/$*/voc.txt | sed '/^$$/d' | wc -l`;							\
	echo "QUnit.done(function( details ) {" 										\
		"test(\"Total tests generated equals total words count in voc.txt\", "						\
		"function() {deepEqual(details.total, $${total}); QUnit.config.done = []});});" >> $@;

snowball_code/stemwords: 
	make -C snowball_code --no-print-directory stemwords

js_snowball/lib/Snowball.js: $(JAVA_SOURCES)
	@echo "/*!" > $@
	@echo " * Snowball JavaScript Library v0.4" >> $@
	@echo " * http://snowball.tartarus.org/" >> $@
	@echo " * https://github.com/mazko/jssnowball" >> $@
	@echo " *" >> $@
	@echo " * Copyright `date +'%y.%m.%d %H:%M:%S'`, Oleg Mazko" >> $@
	@echo " * http://www.opensource.org/licenses/bsd-license.html" >> $@
	@echo " */" >> $@
	@echo "function Snowball(lng) {" >> $@
	@cat js_snowball/src/Among.js | sed '1,9d' | sed 's!^!\t!' >> $@
	@cat js_snowball/src/SnowballProgram.js | sed '1,9d' | sed 's!^!\t!' >> $@
	@echo "var stemFactory = {" | sed 's!^!\t!' >> $@
	@$(foreach dir,$(libstemmer_algorithms), \
	echo $${separator_between_stemmers} >> $@; separator_between_stemmers=","; \
	echo "$(dir)Stemmer : function() {" | sed 's!^!\t\t!' | sed 's!$$!\n!' >> $@; \
	cat snowball_code/$(java_src_genereted)/$(dir)Stemmer.java | sed '1,11d' | sed 's!^!\t\t!' >> $@;)
	@echo "}" | sed 's!^!\n\t!' >> $@;
	@echo "var stemName = lng.toLowerCase() + \"Stemmer\";" | sed 's!^!\t!' >> $@
	@echo "return new stemFactory[stemName]();" | sed 's!^!\t!' >> $@
	@echo "}" >> $@

snowball_code/$(java_src_genereted)/%Stemmer.java:
	@lang=`echo "$@" | sed 's![^/]*/!!'`; \
	make -C snowball_code --no-print-directory $${lang}

# Makefile test - generate java sources and compare with fresh downloaded

java_src_check: $(JAVA_SOURCES)
	diff -r $(JAVA_SRC_DWNLD)/libstemmer_java/$(java_src_genereted) snowball_code/$(java_src_genereted)

clean:
	-rm js_snowball/lib/Snowball.js js_snowball/tests/js/*Tests.js \
		js_snowball/tests/composite.html js_snowball/tests/*Tests.html \
		js_snowball/demo.html
	make -C snowball_code --no-print-directory clean
