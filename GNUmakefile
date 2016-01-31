# -*- makefile -*-

libstemmer_algorithms = arabic armenian basque catalan czech danish dutch english \
			finnish french german hungarian italian irish \
			norwegian porter portuguese romanian \
			russian spanish slovene swedish tamil turkish

snowball_compiler = snowball_cache/snowball-master
snowball_all = snowball_cache/snowball_all
java_src_scheme = java/org/tartarus/snowball/ext
java_src_out = snowball_cache/out

JAVA_SOURCES = $(libstemmer_algorithms:%=$(java_src_out)/$(java_src_scheme)/%Stemmer.java)
JS_TESTS_SRC = $(libstemmer_algorithms:%=js_snowball/tests/js/%Tests.js)
JS_TESTS_HTML = $(libstemmer_algorithms:%=js_snowball/tests/%Tests.html)

js_snowball/index.html: $(JAVA_SOURCES) $(JS_TESTS_SRC) $(JS_TESTS_HTML)
	@echo "<!DOCTYPE html>" > $@
	@echo "<html>" >> $@
	@echo "<head>" >> $@
	@echo "<meta charset=\"utf-8\">" | sed 's!^!\t!' >> $@
	@echo "<title>Online Snowball stemmers demo</title>" | sed 's!^!\t!' >> $@
	@echo "<script src=\"lib/snowball.babel.js\"></script>" | sed 's!^!\t!' >> $@
	@echo "<script>" | sed 's!^!\t!' >> $@
	@echo "var printstem = (function() {" | sed 's!^!\t\t!' >> $@
	@echo "var Stem = (function() { var lang, testStemmer; return function(lng, word) {"		\
		 "if (lng !== lang) {lang = lng; testStemmer = snowballFactory.newStemmer(lang);} "		\
	      "return testStemmer.stem(word);}})();" | sed 's!^!\t\t\t!' >> $@
	@echo "return function(lng, word){ document.getElementById(\"result\").innerHTML"			\
		"= \"<b>\" + Stem(lng, word) + \"</b>\"; };" | sed 's!^!\t\t\t!' >> $@
	@echo "})();" | sed 's!^!\t\t!' >> $@
	@echo "</script>" | sed 's!^!\t!' >> $@
	@echo "</head>" >> $@
	@echo "<body>" >> $@
	@echo "<p>Type ONE word, select language and press \"<b>Stem!</b>\" button.</p>" | sed 's!^!\t!' >> $@
	@echo "<input maxlength=\"333\" size=\"50\" id=\"query\" type=\"text\" value=\"чаво\">" | sed 's!^!\t!' >> $@
	@echo "<select id=\"language\">" | sed 's!^!\t!' >> $@
	@$(foreach l,$(libstemmer_algorithms), \
		sel=`test '$(l)' = 'russian' && echo 'selected'`; \
		echo "<option value=\"$(l)\" $$sel>$(l)</option>" | sed 's!^!\t\t!' >> $@;)
	@echo "</select>" | sed 's!^!\t!' >> $@
	@echo "<button type=\"button\" onclick=\""									\
	      "printstem(document.getElementById('language').value, "				\
	      "document.getElementById('query').value);\"><noscript>"				\
	      "<span style=\"color:red;\">Enable JavaScript ! </span></noscript>Stem!</button>" | sed 's!^!\t!' >> $@
	@echo "<p id=\"result\"></p>" | sed 's!^!\t!' >> $@
	@echo "<fieldset><legend>Unit tests</legend>" | sed 's!^!\t!' >> $@
	@echo "<a href=\"tests/coverage.html\" target=\"_blank\">all</a>" | sed 's!^!\t\t!' >> $@;
	@$(foreach l,$(libstemmer_algorithms), \
		echo " | " | sed 's!^!\t\t!' >> $@; \
		echo "<a href=\"tests/$(l)Tests.html\" target=\"_blank\">$(l)</a>" | sed 's!^!\t\t!' >> $@;)
	@echo "</fieldset><p></p>" | sed 's!^!\t!' >> $@
	@echo "<fieldset><legend>Links</legend>" | sed 's!^!\t!' >> $@
	@echo "<a href=\"https://github.com/mazko/jssnowball\" target=\"_blank\" rel=\"nofollow\">GitHub</a> |" | sed 's!^!\t\t!' >> $@;
	@echo "<a href=\"http://snowball.tartarus.org/\" target=\"_blank\" rel=\"nofollow\">Snowball</a> |" | sed 's!^!\t\t!' >> $@;
	@echo "<a href=\"http://mazko.github.com/jsli/\" target=\"_blank\">Language Identifier</a> |" | sed 's!^!\t\t!' >> $@;
	@echo "<a href=\"http://mazko.github.io/jstaggregator/\" target=\"_blank\">Urim</a> |" | sed 's!^!\t\t!' >> $@;
	@echo "<a href=\"mailto:o.mazko%20%5Bat%5D%20mail.ru?subject=Snowball%20to%20JavaScript%20generator\" " \
	      "rel=\"nofollow\" onmouseover=\"var split = this.href.split('?'); "				\
	      "split[0] = split[0].replace('%20%5Bat%5D%20','@'); this.href = split.join('?');\">Feedback</a>" | sed 's!^!\t\t!' >> $@;
	@echo "</fieldset>" | sed 's!^!\t!' >> $@
	@echo "</body>" >> $@
	@echo "</html>" >> $@

js_snowball/tests/coverage.html: $(JS_TESTS_SRC)
	@echo "<!DOCTYPE html>" > $@
	@echo "<html>" >> $@
	@echo "<head>" >> $@
	@echo "<meta charset=\"utf-8\">" | sed 's!^!\t!' >> $@
	@echo "<title>QUnit tests for all stemmers</title>" | sed 's!^!\t!' >> $@
	@echo "<link rel=\"stylesheet\" href=\"qunit/qunit.css\">" | sed 's!^!\t!' >> $@
	@echo "<script src=\"qunit/qunit.js\"></script>" | sed 's!^!\t!' >> $@
	@echo "<script src=\"blanket/blanket.js\"></script>" | sed 's!^!\t!' >> $@
	@echo "<script>" | sed 's!^!\t!' >> $@
	@echo "QUnit.config.hidepassed = true;" | sed 's!^!\t\t!' >> $@
	@echo "if (window.callPhantom || window._phantom) {" | sed 's!^!\t\t!' >> $@
	@echo "blanket.options('reporter', 'blanket/lcov_reporter.js');" | sed 's!^!\t\t\t!' >> $@
	@echo "blanket.options('reporter_options', { toHTML:false, strip_file_name:true });" | sed 's!^!\t\t\t!' >> $@
	@echo "QUnit.done(function() {" | sed 's!^!\t\t\t!' >> $@
	@echo 'alert(JSON.stringify(["qunit.report", window._$$blanket_LCOV]));' | sed 's!^!\t\t\t\t!' >> $@	
	@echo "});" | sed 's!^!\t\t\t!' >> $@
	@echo "}" | sed 's!^!\t\t!' >> $@
	@echo "</script>" | sed 's!^!\t!' >> $@
	@echo "<script src=\"../lib/snowball.babel.js\" data-cover></script>" | sed 's!^!\t!' >> $@
	@$(foreach lang,$(libstemmer_algorithms), 						\
	echo "<script src=\"js/$(lang)Tests.js\"></script>" | sed 's!^!\t!' >> $@;)
	@echo "</head>" >> $@
	@echo "<body>" >> $@
	@echo "<div id=\"qunit\"></div>" | sed 's!^!\t!' >> $@
	@echo "<div id=\"qunit-fixture\"></div>" | sed 's!^!\t!' >> $@
	@echo "</body>" >> $@
	@echo "</html>" >> $@

js_snowball/tests/%Tests.html:
	@echo "<!DOCTYPE html>" > $@
	@echo "<html>" >> $@
	@echo "<head>" >> $@
	@echo "<meta charset=\"utf-8\">" | sed 's!^!\t!' >> $@
	@echo "<title>QUnit tests for $* stemmer</title>" | sed 's!^!\t!' >> $@
	@echo "<link rel=\"stylesheet\" href=\"qunit/qunit.css\">" | sed 's!^!\t!' >> $@
	@echo "</head>" >> $@
	@echo "<body>" >> $@
	@echo "<div id=\"qunit\"></div>" | sed 's!^!\t!' >> $@
	@echo "<script src=\"qunit/qunit.js\"></script>" | sed 's!^!\t!' >> $@
	@echo "<script src=\"../lib/snowball.babel.js\"></script>" | sed 's!^!\t!' >> $@
	@echo "<script src=\"js/$*Tests.js\"></script>" | sed 's!^!\t!' >> $@
	@echo "</body>" >> $@
	@echo "</html>" >> $@

js_snowball/tests/js/%Tests.js: $(snowball_all)/algorithms/%/voc.txt $(snowball_compiler)/stemwords
	@echo "Generating tests for $*"
	@./$(snowball_compiler)/stemwords -i $(snowball_all)/algorithms/$*/voc.txt -l $* > $(snowball_all)/algorithms/$*/output.txt
	@mkdir -p js_snowball/tests/js
	@echo "QUnit.test('$*', function(assert){" > $@
	@echo "var stem = snowballFactory.newStemmer('$*').stem;" | sed 's!^!\t!' >> $@
	@echo "function e(i, o) { assert.strictEqual( stem(i), o ); }" | sed 's!^!\t!' >> $@
	@./$(snowball_compiler)/stemwords -i $(snowball_all)/algorithms/$*/voc.txt -l $* -p |	\
	       sed '/^\s\+\S*\s\+$$/d' | sed 's!\"!\\\"!g' |								\
	       sed 's!\s\+[->]\+\s\+!\", \"!' |												\
	       sed 's!^!e\("!' | sed 's!$$!\"\);!' | sed 's!^!\t!' >> $@
	@echo "});" >> $@

$(snowball_compiler)/stemwords: $(JAVA_SOURCES)
	@cp $(snowball_compiler)/GNUmakefile $(snowball_compiler)/GNUmakefile_js_copy
	@cp $(snowball_compiler)/libstemmer/modules.txt $(snowball_compiler)/libstemmer/modules_js_copy.txt
	@sed -i 's!libstemmer\/modules\.txt!libstemmer\/modules_js_copy\.txt!' $(snowball_compiler)/GNUmakefile_js_copy
	@$(foreach a,$(libstemmer_algorithms), grep -q '\s*$(a)\s\+' $(snowball_compiler)/libstemmer/modules_js_copy.txt || \
	echo '$(a) UTF_8 $(a)' >> $(snowball_compiler)/libstemmer/modules_js_copy.txt;)
	@make -C $(snowball_compiler) libstemmer_algorithms="$(subst $(eval), ,$(libstemmer_algorithms))" -f GNUmakefile_js_copy --no-print-directory stemwords

java_eclipse_cache: $(JAVA_SOURCES) $(shell find $(java_src_out) -type f -name '*.java' 2>/dev/null)
	@rsync -rupE $(dir $(snowball_compiler)/$(java_src_scheme))*.java $(dir $(java_src_out)/$(java_src_scheme))
	@rsync -rupE $(java_src_out)/java/* js_snowball/eclipse/src/

bundle: java_eclipse_cache $(shell find js_snowball/eclipse/src/ -type f -name '*.java')
	@mkdir -p js_snowball/lib
	@cat \
	js_snowball/eclipse/src/org/tartarus/snowball/StringBuffer.java 	\
	js_snowball/eclipse/src/org/tartarus/snowball/StringBuilder.java 	\
	js_snowball/eclipse/src/org/tartarus/snowball/Among.java 			\
	js_snowball/eclipse/src/org/tartarus/snowball/SnowballProgram.java 	\
	js_snowball/eclipse/src/org/tartarus/snowball/SnowballStemmer.java 	\
	js_snowball/eclipse/src/org/tartarus/snowball/ext/* 				\
	| sed '/^package\s/d' | sed '/^import\s/d' > js_snowball/lib/snowball.bundle.java
	@echo 'OK! NOW DO :es6:edit manually:end: THEN < make esjava >'

js_snowball/lib/snowball.es6: js_snowball/lib/snowball.bundle.java
	@awk '/\:es6\:/,/\:end\:/' js_snowball/lib/snowball.bundle.java | grep -q . && { echo 'Forgot :es6:edit manually:end: < snowball.bundle.java > ?'; exit 42; } || true
	@grep 'org\.tartarus\..\+\|java\.\(lang\|util\)\..\+' js_snowball/lib/snowball.bundle.java && exit 42 || true 
	@echo "/*!" > $@
	@echo " * Snowball JavaScript Library v0.6" >> $@
	@echo " * http://snowball.tartarus.org/" >> $@
	@echo " * https://github.com/mazko/jssnowball" >> $@
	@echo " *" >> $@
	@echo " * Copyright `date +'%d.%m.%Y %H:%M:%S'`, Oleg Mazko" >> $@
	@echo " * http://www.opensource.org/licenses/bsd-license.html" >> $@
	@echo " */" >> $@
	@esjava js_snowball/lib/snowball.bundle.java >> $@
	@echo "export function newStemmer(lng) {" >> $@
	@echo "let stemMap = {" | sed 's!^!\t!' >> $@
	@$(foreach dir,$(libstemmer_algorithms),											\
	echo $${separator_between_stemmers} >> $@; separator_between_stemmers=",";			\
	echo "$(dir) : $(dir)Stemmer" | sed 's!^!\t\t!' >> $@;)
	@echo "};" | sed 's!^!\n\t!' >> $@;
	@echo "let stemmer = new stemMap[lng.toLowerCase()]();" | sed 's!^!\t!' >> $@
	@echo "return {" | sed 's!^!\t!' >> $@
	@echo "stem: (word) => {" | sed 's!^!\t\t!' >> $@
	@echo "stemmer.setCurrent(word);" | sed 's!^!\t\t\t!' >> $@
	@echo "stemmer.stem();" | sed 's!^!\t\t\t!' >> $@
	@echo "return stemmer.getCurrent();" | sed 's!^!\t\t\t!' >> $@
	@echo "}" | sed 's!^!\t\t!' >> $@
	@echo "};" | sed 's!^!\t!' >> $@
	@echo "}" >> $@
	@echo "export function algorithms() {" >> $@
	@echo -n "return [" | sed 's!^!\t!' | sed 's!$$!\n\t\t!' >> $@
	@$(foreach dir,$(libstemmer_algorithms),											\
	echo -n $${separator_between_stemmers} >> $@; separator_between_stemmers=",";			\
	echo -n "'$(dir)'" >> $@;)
	@echo "];" | sed 's!^!\n\t!' >> $@;
	@echo "}" >> $@

js_snowball/lib/snowball.babel.js: js_snowball/lib/snowball.es6
	sed 's/\\u/\\\\u/g' js_snowball/lib/snowball.es6 |		\
	babel																									\
	--compact=false																				\
	--presets es2015																			\
	--plugins transform-es2015-modules-umd --module-id snowballFactory |   \
	sed 's/\\\\u/\\u/g' > $@

esjava: js_snowball/lib/snowball.babel.js js_snowball/index.html js_snowball/tests/coverage.html

$(snowball_compiler)/algorithms/%/stem_Unicode.sbl: $(snowball_compiler)/algorithms/%/stem_ISO_8859_1.sbl
	cp $^ $@

$(java_src_out)/$(java_src_scheme)/%Stemmer.java: $(snowball_compiler)/algorithms/%/stem_Unicode.sbl \
	    $(wildcard $(snowball_compiler)/compiler/*.c) $(wildcard $(snowball_compiler)/compiler/*.h)
	@target=`echo "$@" | sed 's![^/]*/!!' | sed 's![^/]*/!!'`; \
	rm -f $(snowball_compiler)/$${target}; \
	make -C $(snowball_compiler) --no-print-directory $${target} || { echo "!< $${target} >!"; exit 42; } && \
	mkdir -p `dirname $@` && mv $(snowball_compiler)/$${target} $@

clean:
	-make -C $(snowball_compiler) -f GNUmakefile_js_copy libstemmer_algorithms="$(subst $(eval), ,$(libstemmer_algorithms))" --no-print-directory clean
	-rm js_snowball/lib/snowball.bundle.java js_snowball/tests/js/*Tests.js		\
		js_snowball/tests/*Tests.html											\
		js_snowball/index.html $(snowball_compiler)/GNUmakefile_js_copy				\
		$(snowball_compiler)/libstemmer/modules_js_copy.txt
	-rm -r "$(java_src_out)"
