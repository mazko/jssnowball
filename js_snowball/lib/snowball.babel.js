/*!
 * Snowball JavaScript Library v0.5
 * http://snowball.tartarus.org/
 * https://github.com/mazko/jssnowball
 *
 * Copyright 19.12.2015 18:24:05, Oleg Mazko
 * http://www.opensource.org/licenses/bsd-license.html
 */
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define('snowballFactory', ['exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.snowballFactory = mod.exports;
    }
})(this, function (exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.newStemmer = newStemmer;

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = (function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    })();

    var StringBuffer = (function () {
        function StringBuffer() {
            _classCallCheck(this, StringBuffer);
        }

        _createClass(StringBuffer, [{
            key: 'length$esjava$0',
            value: function length$esjava$0() {
                return this.b.length;
            }
        }, {
            key: 'replace$esjava$3',
            value: function replace$esjava$3(start, end, str) {
                if (start === 0 && end === this.b.length) {
                    this.b = str;
                } else {
                    var left = this.b.substring(0, start),
                        right = this.b.substring(end);
                    this.b = left + str + right;
                }
            }
        }, {
            key: 'substring$esjava$2',
            value: function substring$esjava$2(start, end) {
                return this.b.substring(start, end);
            }
        }, {
            key: 'charAt$esjava$1',
            value: function charAt$esjava$1(index) {
                return this.b.charCodeAt(index);
            }
        }, {
            key: 'subSequence$esjava$2',
            value: function subSequence$esjava$2(start, end) {
                throw new Error("NotImpl: CharSequence::subSequence");
            }
        }, {
            key: 'toString$esjava$0',
            value: function toString$esjava$0() {
                return this.b;
            }
        }, {
            key: 'length',
            value: function length() {
                return this['length$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'replace',
            value: function replace() {
                return this['replace$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'substring',
            value: function substring() {
                return this['substring$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'charAt',
            value: function charAt() {
                return this['charAt$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'subSequence',
            value: function subSequence() {
                return this['subSequence$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'toString',
            value: function toString() {
                return this['toString$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'b',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$b') ? this._$esjava$b : this._$esjava$b = "";
            },
            set: function set(v) {
                this._$esjava$b = v;
            }
        }]);

        return StringBuffer;
    })();

    var StringBuilder = (function (_StringBuffer) {
        _inherits(StringBuilder, _StringBuffer);

        function StringBuilder() {
            _classCallCheck(this, StringBuilder);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(StringBuilder).apply(this, arguments));
        }

        return StringBuilder;
    })(StringBuffer);

    var Among = (function () {
        _createClass(Among, null, [{
            key: 'toCharArray$esjava$1',
            value: function toCharArray$esjava$1(s) {
                var sLength = s.length;
                var charArr = new Array(sLength);

                for (var i = 0; i < sLength; i++) {
                    charArr[i] = s.charCodeAt(i);
                }

                return charArr;
            }
        }]);

        function Among(s, substring_i, result, methodname, methodobject) {
            _classCallCheck(this, Among);

            this.s_size = s.length;
            this.s = Among.toCharArray$esjava$1(s);
            this.substring_i = substring_i;
            this.result = result;
            this.methodobject = methodobject;
            this.method = methodname ? methodobject[methodname] : null;
        }

        _createClass(Among, [{
            key: 's_size',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$s_size') ? this._$esjava$s_size : this._$esjava$s_size = 0;
            },
            set: function set(v) {
                this._$esjava$s_size = v;
            }
        }, {
            key: 's',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$s') ? this._$esjava$s : this._$esjava$s = null;
            },
            set: function set(v) {
                this._$esjava$s = v;
            }
        }, {
            key: 'substring_i',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$substring_i') ? this._$esjava$substring_i : this._$esjava$substring_i = 0;
            },
            set: function set(v) {
                this._$esjava$substring_i = v;
            }
        }, {
            key: 'result',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$result') ? this._$esjava$result : this._$esjava$result = 0;
            },
            set: function set(v) {
                this._$esjava$result = v;
            }
        }, {
            key: 'method',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$method') ? this._$esjava$method : this._$esjava$method = null;
            },
            set: function set(v) {
                this._$esjava$method = v;
            }
        }, {
            key: 'methodobject',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$methodobject') ? this._$esjava$methodobject : this._$esjava$methodobject = null;
            },
            set: function set(v) {
                this._$esjava$methodobject = v;
            }
        }]);

        return Among;
    })();

    var SnowballProgram = (function () {
        function SnowballProgram() {
            _classCallCheck(this, SnowballProgram);

            this.current = new StringBuffer();
            this.setCurrent$esjava$1("");
        }

        _createClass(SnowballProgram, [{
            key: 'setCurrent$esjava$1',
            value: function setCurrent$esjava$1(value) {
                this.current.replace(0, this.current.length(), value);
                this.cursor = 0;
                this.limit = this.current.length();
                this.limit_backward = 0;
                this.bra = this.cursor;
                this.ket = this.limit;
            }
        }, {
            key: 'getCurrent$esjava$0',
            value: function getCurrent$esjava$0() {
                var result = this.current.toString();
                this.current = new StringBuffer();
                return result;
            }
        }, {
            key: 'copy_from$esjava$1',
            value: function copy_from$esjava$1(other) {
                this.current = other.current;
                this.cursor = other.cursor;
                this.limit = other.limit;
                this.limit_backward = other.limit_backward;
                this.bra = other.bra;
                this.ket = other.ket;
            }
        }, {
            key: 'in_grouping$esjava$3',
            value: function in_grouping$esjava$3(s, min, max) {
                if (this.cursor >= this.limit) return false;
                var ch = this.current.charAt(this.cursor);
                if (ch > max || ch < min) return false;
                ch -= min;
                if ((s[ch >> 3] & 0X1 << (ch & 0X7)) === 0) return false;
                this.cursor++;
                return true;
            }
        }, {
            key: 'in_grouping_b$esjava$3',
            value: function in_grouping_b$esjava$3(s, min, max) {
                if (this.cursor <= this.limit_backward) return false;
                var ch = this.current.charAt(this.cursor - 1);
                if (ch > max || ch < min) return false;
                ch -= min;
                if ((s[ch >> 3] & 0X1 << (ch & 0X7)) === 0) return false;
                this.cursor--;
                return true;
            }
        }, {
            key: 'out_grouping$esjava$3',
            value: function out_grouping$esjava$3(s, min, max) {
                if (this.cursor >= this.limit) return false;
                var ch = this.current.charAt(this.cursor);

                if (ch > max || ch < min) {
                    this.cursor++;
                    return true;
                }

                ch -= min;

                if ((s[ch >> 3] & 0X1 << (ch & 0X7)) === 0) {
                    this.cursor++;
                    return true;
                }

                return false;
            }
        }, {
            key: 'out_grouping_b$esjava$3',
            value: function out_grouping_b$esjava$3(s, min, max) {
                if (this.cursor <= this.limit_backward) return false;
                var ch = this.current.charAt(this.cursor - 1);

                if (ch > max || ch < min) {
                    this.cursor--;
                    return true;
                }

                ch -= min;

                if ((s[ch >> 3] & 0X1 << (ch & 0X7)) === 0) {
                    this.cursor--;
                    return true;
                }

                return false;
            }
        }, {
            key: 'in_range$esjava$2',
            value: function in_range$esjava$2(min, max) {
                if (this.cursor >= this.limit) return false;
                var ch = this.current.charAt(this.cursor);
                if (ch > max || ch < min) return false;
                this.cursor++;
                return true;
            }
        }, {
            key: 'in_range_b$esjava$2',
            value: function in_range_b$esjava$2(min, max) {
                if (this.cursor <= this.limit_backward) return false;
                var ch = this.current.charAt(this.cursor - 1);
                if (ch > max || ch < min) return false;
                this.cursor--;
                return true;
            }
        }, {
            key: 'out_range$esjava$2',
            value: function out_range$esjava$2(min, max) {
                if (this.cursor >= this.limit) return false;
                var ch = this.current.charAt(this.cursor);
                if (!(ch > max || ch < min)) return false;
                this.cursor++;
                return true;
            }
        }, {
            key: 'out_range_b$esjava$2',
            value: function out_range_b$esjava$2(min, max) {
                if (this.cursor <= this.limit_backward) return false;
                var ch = this.current.charAt(this.cursor - 1);
                if (!(ch > max || ch < min)) return false;
                this.cursor--;
                return true;
            }
        }, {
            key: 'eq_s$esjava$2',
            value: function eq_s$esjava$2(s_size, s) {
                if (this.limit - this.cursor < s_size) return false;
                var i = undefined;

                for (i = 0; i !== s_size; i++) {
                    if (this.current.charAt(this.cursor + i) !== s.charCodeAt(i)) return false;
                }

                this.cursor += s_size;
                return true;
            }
        }, {
            key: 'eq_s_b$esjava$2',
            value: function eq_s_b$esjava$2(s_size, s) {
                if (this.cursor - this.limit_backward < s_size) return false;
                var i = undefined;

                for (i = 0; i !== s_size; i++) {
                    if (this.current.charAt(this.cursor - s_size + i) !== s.charCodeAt(i)) return false;
                }

                this.cursor -= s_size;
                return true;
            }
        }, {
            key: 'eq_v$esjava$1',
            value: function eq_v$esjava$1(s) {
                return this.eq_s$esjava$2(s.length(), s.toString());
            }
        }, {
            key: 'eq_v_b$esjava$1',
            value: function eq_v_b$esjava$1(s) {
                return this.eq_s_b$esjava$2(s.length(), s.toString());
            }
        }, {
            key: 'find_among$esjava$2',
            value: function find_among$esjava$2(v, v_size) {
                var i = 0;
                var j = v_size;
                var c = this.cursor;
                var l = this.limit;
                var common_i = 0;
                var common_j = 0;
                var first_key_inspected = false;

                while (true) {
                    var k = i + (j - i >> 1);
                    var diff = 0;
                    var common = common_i < common_j ? common_i : common_j;
                    var w = v[k];
                    var i2 = undefined;

                    for (i2 = common; i2 < w.s_size; i2++) {
                        if (c + common === l) {
                            diff = -1;
                            break;
                        }

                        diff = this.current.charAt(c + common) - w.s[i2];
                        if (diff !== 0) break;
                        common++;
                    }

                    if (diff < 0) {
                        j = k;
                        common_j = common;
                    } else {
                        i = k;
                        common_i = common;
                    }

                    if (j - i <= 1) {
                        if (i > 0) break;
                        if (j === i) break;
                        if (first_key_inspected) break;
                        first_key_inspected = true;
                    }
                }

                while (true) {
                    var w = v[i];

                    if (common_i >= w.s_size) {
                        this.cursor = c + w.s_size;
                        if (w.method === null) return w.result;
                        var res = undefined;
                        res = w.method.call(w.methodobject);
                        this.cursor = c + w.s_size;
                        if (res) return w.result;
                    }

                    i = w.substring_i;
                    if (i < 0) return 0;
                }
            }
        }, {
            key: 'find_among_b$esjava$2',
            value: function find_among_b$esjava$2(v, v_size) {
                var i = 0;
                var j = v_size;
                var c = this.cursor;
                var lb = this.limit_backward;
                var common_i = 0;
                var common_j = 0;
                var first_key_inspected = false;

                while (true) {
                    var k = i + (j - i >> 1);
                    var diff = 0;
                    var common = common_i < common_j ? common_i : common_j;
                    var w = v[k];
                    var i2 = undefined;

                    for (i2 = w.s_size - 1 - common; i2 >= 0; i2--) {
                        if (c - common === lb) {
                            diff = -1;
                            break;
                        }

                        diff = this.current.charAt(c - 1 - common) - w.s[i2];
                        if (diff !== 0) break;
                        common++;
                    }

                    if (diff < 0) {
                        j = k;
                        common_j = common;
                    } else {
                        i = k;
                        common_i = common;
                    }

                    if (j - i <= 1) {
                        if (i > 0) break;
                        if (j === i) break;
                        if (first_key_inspected) break;
                        first_key_inspected = true;
                    }
                }

                while (true) {
                    var w = v[i];

                    if (common_i >= w.s_size) {
                        this.cursor = c - w.s_size;
                        if (w.method === null) return w.result;
                        var res = undefined;
                        res = w.method.call(w.methodobject);
                        this.cursor = c - w.s_size;
                        if (res) return w.result;
                    }

                    i = w.substring_i;
                    if (i < 0) return 0;
                }
            }
        }, {
            key: 'replace_s$esjava$3',
            value: function replace_s$esjava$3(c_bra, c_ket, s) {
                var adjustment = s.length - (c_ket - c_bra);
                this.current.replace(c_bra, c_ket, s);
                this.limit += adjustment;
                if (this.cursor >= c_ket) this.cursor += adjustment;else if (this.cursor > c_bra) this.cursor = c_bra;
                return adjustment;
            }
        }, {
            key: 'slice_check$esjava$0',
            value: function slice_check$esjava$0() {
                if (this.bra < 0 || this.bra > this.ket || this.ket > this.limit || this.limit > this.current.length()) {
                    throw new Error("Snowball: faulty slice operation");
                }
            }
        }, {
            key: 'slice_from$esjava$1',
            value: function slice_from$esjava$1(s) {
                this.slice_check$esjava$0();
                this.replace_s$esjava$3(this.bra, this.ket, s);
            }
        }, {
            key: 'slice_del$esjava$0',
            value: function slice_del$esjava$0() {
                this.slice_from$esjava$1("");
            }
        }, {
            key: 'insert$esjava$3',
            value: function insert$esjava$3(c_bra, c_ket, s) {
                var adjustment = this.replace_s$esjava$3(c_bra, c_ket, s);
                if (c_bra <= this.bra) this.bra += adjustment;
                if (c_bra <= this.ket) this.ket += adjustment;
            }
        }, {
            key: 'slice_to$esjava$1',
            value: function slice_to$esjava$1(s) {
                this.slice_check$esjava$0();
                s.replace(0, s.length(), this.current.substring(this.bra, this.ket));
                return s;
            }
        }, {
            key: 'setCurrent',
            value: function setCurrent() {
                return this['setCurrent$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'getCurrent',
            value: function getCurrent() {
                return this['getCurrent$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'copy_from',
            value: function copy_from() {
                return this['copy_from$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'in_grouping',
            value: function in_grouping() {
                return this['in_grouping$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'in_grouping_b',
            value: function in_grouping_b() {
                return this['in_grouping_b$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'out_grouping',
            value: function out_grouping() {
                return this['out_grouping$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'out_grouping_b',
            value: function out_grouping_b() {
                return this['out_grouping_b$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'in_range',
            value: function in_range() {
                return this['in_range$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'in_range_b',
            value: function in_range_b() {
                return this['in_range_b$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'out_range',
            value: function out_range() {
                return this['out_range$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'out_range_b',
            value: function out_range_b() {
                return this['out_range_b$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'eq_s',
            value: function eq_s() {
                return this['eq_s$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'eq_s_b',
            value: function eq_s_b() {
                return this['eq_s_b$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'eq_v',
            value: function eq_v() {
                return this['eq_v$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'eq_v_b',
            value: function eq_v_b() {
                return this['eq_v_b$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'find_among',
            value: function find_among() {
                return this['find_among$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'find_among_b',
            value: function find_among_b() {
                return this['find_among_b$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'replace_s',
            value: function replace_s() {
                return this['replace_s$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'slice_check',
            value: function slice_check() {
                return this['slice_check$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'slice_from',
            value: function slice_from() {
                return this['slice_from$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'slice_del',
            value: function slice_del() {
                return this['slice_del$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'insert',
            value: function insert() {
                return this['insert$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'slice_to',
            value: function slice_to() {
                return this['slice_to$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'current',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$current') ? this._$esjava$current : this._$esjava$current = null;
            },
            set: function set(v) {
                this._$esjava$current = v;
            }
        }, {
            key: 'cursor',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$cursor') ? this._$esjava$cursor : this._$esjava$cursor = 0;
            },
            set: function set(v) {
                this._$esjava$cursor = v;
            }
        }, {
            key: 'limit',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$limit') ? this._$esjava$limit : this._$esjava$limit = 0;
            },
            set: function set(v) {
                this._$esjava$limit = v;
            }
        }, {
            key: 'limit_backward',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$limit_backward') ? this._$esjava$limit_backward : this._$esjava$limit_backward = 0;
            },
            set: function set(v) {
                this._$esjava$limit_backward = v;
            }
        }, {
            key: 'bra',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$bra') ? this._$esjava$bra : this._$esjava$bra = 0;
            },
            set: function set(v) {
                this._$esjava$bra = v;
            }
        }, {
            key: 'ket',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$ket') ? this._$esjava$ket : this._$esjava$ket = 0;
            },
            set: function set(v) {
                this._$esjava$ket = v;
            }
        }]);

        return SnowballProgram;
    })();

    var SnowballStemmer = (function (_SnowballProgram) {
        _inherits(SnowballStemmer, _SnowballProgram);

        function SnowballStemmer() {
            _classCallCheck(this, SnowballStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(SnowballStemmer).apply(this, arguments));
        }

        _createClass(SnowballStemmer, [{
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                throw 'NotImpl < stem$esjava$0 >';
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }]);

        return SnowballStemmer;
    })(SnowballProgram);

    var armenianStemmer = (function (_SnowballStemmer) {
        _inherits(armenianStemmer, _SnowballStemmer);

        function armenianStemmer() {
            _classCallCheck(this, armenianStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(armenianStemmer).apply(this, arguments));
        }

        _createClass(armenianStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                this.I_pV = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    golab1: while (true) {
                        lab2: do {
                            if (!this.in_grouping$esjava$3(armenianStemmer.g_v, 1377, 1413)) {
                                break lab2;
                            }

                            break golab1;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_pV = this.cursor;

                    golab3: while (true) {
                        lab4: do {
                            if (!this.out_grouping$esjava$3(armenianStemmer.g_v, 1377, 1413)) {
                                break lab4;
                            }

                            break golab3;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab5: while (true) {
                        lab6: do {
                            if (!this.in_grouping$esjava$3(armenianStemmer.g_v, 1377, 1413)) {
                                break lab6;
                            }

                            break golab5;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab7: while (true) {
                        lab8: do {
                            if (!this.out_grouping$esjava$3(armenianStemmer.g_v, 1377, 1413)) {
                                break lab8;
                            }

                            break golab7;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_1;
                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_adjective$esjava$0',
            value: function r_adjective$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(armenianStemmer.a_0, 23);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_verb$esjava$0',
            value: function r_verb$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(armenianStemmer.a_1, 71);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_noun$esjava$0',
            value: function r_noun$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(armenianStemmer.a_2, 40);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_ending$esjava$0',
            value: function r_ending$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(armenianStemmer.a_3, 57);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R2$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_3 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_2;
                v_4 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_ending$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                v_5 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_verb$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_5;
                v_6 = this.limit - this.cursor;

                lab3: do {
                    if (!this.r_adjective$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = this.limit - v_6;
                v_7 = this.limit - this.cursor;

                lab4: do {
                    if (!this.r_noun$esjava$0()) {
                        break lab4;
                    }
                } while (false);

                this.cursor = this.limit - v_7;
                this.limit_backward = v_3;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete armenianStemmer.methodObject;
                return armenianStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete armenianStemmer.a_0;
                return armenianStemmer.a_0 = [new Among('\u0580\u0578\u0580\u0564', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u0578\u0580\u0564', 0, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056C\u056B', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056F\u056B', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0580\u0561\u056F', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0572', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056F\u0561\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0580\u0561\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u056F\u0565\u0576', 8, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u0565\u0576', 8, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0580\u0567\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u056B\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0563\u056B\u0576', 12, 1, "", armenianStemmer.methodObject), new Among('\u0578\u057E\u056B\u0576', 12, 1, "", armenianStemmer.methodObject), new Among('\u056C\u0561\u0575\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0578\u0582\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u057A\u0565\u057D', -1, 1, "", armenianStemmer.methodObject), new Among('\u056B\u057E', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u057F', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u057E\u0565\u057F', -1, 1, "", armenianStemmer.methodObject), new Among('\u056F\u0578\u057F', -1, 1, "", armenianStemmer.methodObject), new Among('\u0562\u0561\u0580', -1, 1, "", armenianStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete armenianStemmer.a_1;
                return armenianStemmer.a_1 = [new Among('\u0561', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0561', 0, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u0561', 0, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0565', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0580\u056B', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u056B', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u056B', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0565\u0581\u056B', 6, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056C', -1, 1, "", armenianStemmer.methodObject), new Among('\u0568\u0561\u056C', 8, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u0561\u056C', 8, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0576\u0561\u056C', 8, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0576\u0561\u056C', 8, 1, "", armenianStemmer.methodObject), new Among('\u0565\u056C', -1, 1, "", armenianStemmer.methodObject), new Among('\u0568\u0565\u056C', 13, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u056C', 13, 1, "", armenianStemmer.methodObject), new Among('\u0581\u0576\u0565\u056C', 15, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u0576\u0565\u056C', 16, 1, "", armenianStemmer.methodObject), new Among('\u0579\u0565\u056C', 13, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0565\u056C', 13, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u057E\u0565\u056C', 19, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u057E\u0565\u056C', 19, 1, "", armenianStemmer.methodObject), new Among('\u057F\u0565\u056C', 13, 1, "", armenianStemmer.methodObject), new Among('\u0561\u057F\u0565\u056C', 22, 1, "", armenianStemmer.methodObject), new Among('\u0578\u057F\u0565\u056C', 22, 1, "", armenianStemmer.methodObject), new Among('\u056F\u0578\u057F\u0565\u056C', 24, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0561\u056E', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0574', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0578\u0582\u0574', 27, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0581\u0561\u0576', 29, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0561\u0576', 30, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0580\u056B\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u056B\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u056B\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0565\u0581\u056B\u0576', 34, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056C\u056B\u057D', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u056C\u056B\u057D', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u057E', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0561\u057E', 38, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u0561\u057E', 38, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056C\u0578\u057E', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u056C\u0578\u057E', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0580', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0561\u0580', 43, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u0561\u0580', 43, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0580\u056B\u0580', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u056B\u0580', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u056B\u0580', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0565\u0581\u056B\u0580', 48, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0580\u0565\u0581', 51, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056C\u0578\u0582\u0581', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u056C\u0578\u0582\u0581', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056C\u0578\u0582', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u056C\u0578\u0582', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u0581\u0561\u0584', 57, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0561\u0584', 58, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0580\u056B\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u056B\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u056B\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0565\u0581\u056B\u0584', 62, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u0581\u0561\u0576\u0584', 64, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0561\u0576\u0584', 65, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u0580\u056B\u0576\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0581\u056B\u0576\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0581\u056B\u0576\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0565\u0581\u056B\u0576\u0584', 69, 1, "", armenianStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete armenianStemmer.a_2;
                return armenianStemmer.a_2 = [new Among('\u0578\u0580\u0564', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0575\u0569', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0570\u056B', -1, 1, "", armenianStemmer.methodObject), new Among('\u0581\u056B', -1, 1, "", armenianStemmer.methodObject), new Among('\u056B\u056C', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056F', -1, 1, "", armenianStemmer.methodObject), new Among('\u0575\u0561\u056F', 5, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u0561\u056F', 5, 1, "", armenianStemmer.methodObject), new Among('\u056B\u056F', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u056F', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u057A\u0561\u0576', 10, 1, "", armenianStemmer.methodObject), new Among('\u057D\u057F\u0561\u0576', 10, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0580\u0561\u0576', 10, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0572\u0567\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0575\u0578\u0582\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0569\u0575\u0578\u0582\u0576', 15, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056E\u0578', -1, 1, "", armenianStemmer.methodObject), new Among('\u056B\u0579', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u057D', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u057D\u057F', -1, 1, "", armenianStemmer.methodObject), new Among('\u0563\u0561\u0580', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0578\u0580', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u057E\u0578\u0580', 22, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0581', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u0585\u0581', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582', -1, 1, "", armenianStemmer.methodObject), new Among('\u0584', -1, 1, "", armenianStemmer.methodObject), new Among('\u0579\u0565\u0584', 27, 1, "", armenianStemmer.methodObject), new Among('\u056B\u0584', 27, 1, "", armenianStemmer.methodObject), new Among('\u0561\u056C\u056B\u0584', 29, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u056B\u0584', 29, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0561\u056E\u0584', 27, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0575\u0584', 27, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0576\u0584', 27, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0576\u0584', 27, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0576\u0584', 27, 1, "", armenianStemmer.methodObject), new Among('\u0574\u0578\u0582\u0576\u0584', 36, 1, "", armenianStemmer.methodObject), new Among('\u056B\u0579\u0584', 27, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0580\u0584', 27, 1, "", armenianStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete armenianStemmer.a_3;
                return armenianStemmer.a_3 = [new Among('\u057D\u0561', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0561', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0574\u0562', -1, 1, "", armenianStemmer.methodObject), new Among('\u0564', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u0564', 3, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0569\u0575\u0561\u0576\u0564', 4, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0561\u0576\u0564', 4, 1, "", armenianStemmer.methodObject), new Among('\u0578\u057B\u0564', 3, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u0564', 3, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580\u0564', 8, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0564', 3, 1, "", armenianStemmer.methodObject), new Among('\u0568', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u0568', 11, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0569\u0575\u0561\u0576\u0568', 12, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0561\u0576\u0568', 12, 1, "", armenianStemmer.methodObject), new Among('\u0578\u057B\u0568', 11, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u0568', 11, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580\u0568', 16, 1, "", armenianStemmer.methodObject), new Among('\u056B', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u056B', 18, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u056B', 18, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580\u056B', 20, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u0578\u0582\u0574', -1, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u0578\u0582\u0574', -1, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580\u0578\u0582\u0574', 23, 1, "", armenianStemmer.methodObject), new Among('\u0576', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576', 25, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0569\u0575\u0561\u0576', 26, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0561\u0576', 26, 1, "", armenianStemmer.methodObject), new Among('\u056B\u0576', 25, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u056B\u0576', 29, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580\u056B\u0576', 30, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0569\u0575\u0561\u0576\u0576', 25, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u0576', 25, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580\u0576', 33, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0576', 25, 1, "", armenianStemmer.methodObject), new Among('\u0578\u057B', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0569\u0575\u0561\u0576\u057D', -1, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0561\u0576\u057D', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u057B\u057D', -1, 1, "", armenianStemmer.methodObject), new Among('\u0578\u057E', -1, 1, "", armenianStemmer.methodObject), new Among('\u0561\u0576\u0578\u057E', 40, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0578\u057E', 40, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u0578\u057E', 40, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580\u0578\u057E', 43, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580', -1, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580', 45, 1, "", armenianStemmer.methodObject), new Among('\u0581', -1, 1, "", armenianStemmer.methodObject), new Among('\u056B\u0581', 47, 1, "", armenianStemmer.methodObject), new Among('\u057E\u0561\u0576\u056B\u0581', 48, 1, "", armenianStemmer.methodObject), new Among('\u0578\u057B\u056B\u0581', 48, 1, "", armenianStemmer.methodObject), new Among('\u057E\u056B\u0581', 48, 1, "", armenianStemmer.methodObject), new Among('\u0565\u0580\u056B\u0581', 48, 1, "", armenianStemmer.methodObject), new Among('\u0576\u0565\u0580\u056B\u0581', 52, 1, "", armenianStemmer.methodObject), new Among('\u0581\u056B\u0581', 48, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0581', 47, 1, "", armenianStemmer.methodObject), new Among('\u0578\u0582\u0581', 47, 1, "", armenianStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete armenianStemmer.g_v;
                return armenianStemmer.g_v = [209, 4, 128, 0, 18];
            }
        }]);

        return armenianStemmer;
    })(SnowballStemmer);

    var basqueStemmer = (function (_SnowballStemmer2) {
        _inherits(basqueStemmer, _SnowballStemmer2);

        function basqueStemmer() {
            _classCallCheck(this, basqueStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(basqueStemmer).apply(this, arguments));
        }

        _createClass(basqueStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_6 = undefined;
                var v_8 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (!this.in_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                break lab2;
                            }

                            lab3: do {
                                v_3 = this.cursor;

                                lab4: do {
                                    if (!this.out_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                        break lab4;
                                    }

                                    golab5: while (true) {
                                        lab6: do {
                                            if (!this.in_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                                break lab6;
                                            }

                                            break golab5;
                                        } while (false);

                                        if (this.cursor >= this.limit) {
                                            break lab4;
                                        }

                                        this.cursor++;
                                    }

                                    break lab3;
                                } while (false);

                                this.cursor = v_3;

                                if (!this.in_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                    break lab2;
                                }

                                golab7: while (true) {
                                    lab8: do {
                                        if (!this.out_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                            break lab8;
                                        }

                                        break golab7;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab2;
                                    }

                                    this.cursor++;
                                }
                            } while (false);

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        if (!this.out_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                            break lab0;
                        }

                        lab9: do {
                            v_6 = this.cursor;

                            lab10: do {
                                if (!this.out_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                    break lab10;
                                }

                                golab11: while (true) {
                                    lab12: do {
                                        if (!this.in_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                            break lab12;
                                        }

                                        break golab11;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab10;
                                    }

                                    this.cursor++;
                                }

                                break lab9;
                            } while (false);

                            this.cursor = v_6;

                            if (!this.in_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                break lab0;
                            }

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        } while (false);
                    } while (false);

                    this.I_pV = this.cursor;
                } while (false);

                this.cursor = v_1;
                v_8 = this.cursor;

                lab13: do {
                    golab14: while (true) {
                        lab15: do {
                            if (!this.in_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                break lab15;
                            }

                            break golab14;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab16: while (true) {
                        lab17: do {
                            if (!this.out_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                break lab17;
                            }

                            break golab16;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab18: while (true) {
                        lab19: do {
                            if (!this.in_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                break lab19;
                            }

                            break golab18;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab20: while (true) {
                        lab21: do {
                            if (!this.out_grouping$esjava$3(basqueStemmer.g_v, 97, 117)) {
                                break lab21;
                            }

                            break golab20;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_8;
                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_aditzak$esjava$0',
            value: function r_aditzak$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(basqueStemmer.a_0, 109);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 3:
                        this.slice_from$esjava$1("atseden");
                        break;

                    case 4:
                        this.slice_from$esjava$1("arabera");
                        break;

                    case 5:
                        this.slice_from$esjava$1("baditu");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_izenak$esjava$0',
            value: function r_izenak$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(basqueStemmer.a_1, 295);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 3:
                        this.slice_from$esjava$1("jok");
                        break;

                    case 4:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 5:
                        this.slice_from$esjava$1("tra");
                        break;

                    case 6:
                        this.slice_from$esjava$1("minutu");
                        break;

                    case 7:
                        this.slice_from$esjava$1("zehar");
                        break;

                    case 8:
                        this.slice_from$esjava$1("geldi");
                        break;

                    case 9:
                        this.slice_from$esjava$1("igaro");
                        break;

                    case 10:
                        this.slice_from$esjava$1("aurka");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_adjetiboak$esjava$0',
            value: function r_adjetiboak$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(basqueStemmer.a_2, 19);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("z");
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;

                replab1: while (true) {
                    v_2 = this.limit - this.cursor;

                    lab2: do {
                        if (!this.r_aditzak$esjava$0()) {
                            break lab2;
                        }

                        continue replab1;
                    } while (false);

                    this.cursor = this.limit - v_2;
                    break replab1;
                }

                replab3: while (true) {
                    v_3 = this.limit - this.cursor;

                    lab4: do {
                        if (!this.r_izenak$esjava$0()) {
                            break lab4;
                        }

                        continue replab3;
                    } while (false);

                    this.cursor = this.limit - v_3;
                    break replab3;
                }

                v_4 = this.limit - this.cursor;

                lab5: do {
                    if (!this.r_adjetiboak$esjava$0()) {
                        break lab5;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete basqueStemmer.methodObject;
                return basqueStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete basqueStemmer.a_0;
                return basqueStemmer.a_0 = [new Among("idea", -1, 1, "", basqueStemmer.methodObject), new Among("bidea", 0, 1, "", basqueStemmer.methodObject), new Among("kidea", 0, 1, "", basqueStemmer.methodObject), new Among("pidea", 0, 1, "", basqueStemmer.methodObject), new Among("kundea", -1, 1, "", basqueStemmer.methodObject), new Among("galea", -1, 1, "", basqueStemmer.methodObject), new Among("tailea", -1, 1, "", basqueStemmer.methodObject), new Among("tzailea", -1, 1, "", basqueStemmer.methodObject), new Among("gunea", -1, 1, "", basqueStemmer.methodObject), new Among("kunea", -1, 1, "", basqueStemmer.methodObject), new Among("tzaga", -1, 1, "", basqueStemmer.methodObject), new Among("gaia", -1, 1, "", basqueStemmer.methodObject), new Among("aldia", -1, 1, "", basqueStemmer.methodObject), new Among("taldia", 12, 1, "", basqueStemmer.methodObject), new Among("karia", -1, 1, "", basqueStemmer.methodObject), new Among("garria", -1, 2, "", basqueStemmer.methodObject), new Among("karria", -1, 1, "", basqueStemmer.methodObject), new Among("ka", -1, 1, "", basqueStemmer.methodObject), new Among("tzaka", 17, 1, "", basqueStemmer.methodObject), new Among("la", -1, 1, "", basqueStemmer.methodObject), new Among("mena", -1, 1, "", basqueStemmer.methodObject), new Among("pena", -1, 1, "", basqueStemmer.methodObject), new Among("kina", -1, 1, "", basqueStemmer.methodObject), new Among("ezina", -1, 1, "", basqueStemmer.methodObject), new Among("tezina", 23, 1, "", basqueStemmer.methodObject), new Among("kuna", -1, 1, "", basqueStemmer.methodObject), new Among("tuna", -1, 1, "", basqueStemmer.methodObject), new Among("kizuna", -1, 1, "", basqueStemmer.methodObject), new Among("era", -1, 1, "", basqueStemmer.methodObject), new Among("bera", 28, 1, "", basqueStemmer.methodObject), new Among("arabera", 29, 4, "", basqueStemmer.methodObject), new Among("kera", 28, 1, "", basqueStemmer.methodObject), new Among("pera", 28, 1, "", basqueStemmer.methodObject), new Among("orra", -1, 1, "", basqueStemmer.methodObject), new Among("korra", 33, 1, "", basqueStemmer.methodObject), new Among("dura", -1, 1, "", basqueStemmer.methodObject), new Among("gura", -1, 1, "", basqueStemmer.methodObject), new Among("kura", -1, 1, "", basqueStemmer.methodObject), new Among("tura", -1, 1, "", basqueStemmer.methodObject), new Among("eta", -1, 1, "", basqueStemmer.methodObject), new Among("keta", 39, 1, "", basqueStemmer.methodObject), new Among("gailua", -1, 1, "", basqueStemmer.methodObject), new Among("eza", -1, 1, "", basqueStemmer.methodObject), new Among("erreza", 42, 1, "", basqueStemmer.methodObject), new Among("tza", -1, 2, "", basqueStemmer.methodObject), new Among("gaitza", 44, 1, "", basqueStemmer.methodObject), new Among("kaitza", 44, 1, "", basqueStemmer.methodObject), new Among("kuntza", 44, 1, "", basqueStemmer.methodObject), new Among("ide", -1, 1, "", basqueStemmer.methodObject), new Among("bide", 48, 1, "", basqueStemmer.methodObject), new Among("kide", 48, 1, "", basqueStemmer.methodObject), new Among("pide", 48, 1, "", basqueStemmer.methodObject), new Among("kunde", -1, 1, "", basqueStemmer.methodObject), new Among("tzake", -1, 1, "", basqueStemmer.methodObject), new Among("tzeke", -1, 1, "", basqueStemmer.methodObject), new Among("le", -1, 1, "", basqueStemmer.methodObject), new Among("gale", 55, 1, "", basqueStemmer.methodObject), new Among("taile", 55, 1, "", basqueStemmer.methodObject), new Among("tzaile", 55, 1, "", basqueStemmer.methodObject), new Among("gune", -1, 1, "", basqueStemmer.methodObject), new Among("kune", -1, 1, "", basqueStemmer.methodObject), new Among("tze", -1, 1, "", basqueStemmer.methodObject), new Among("atze", 61, 1, "", basqueStemmer.methodObject), new Among("gai", -1, 1, "", basqueStemmer.methodObject), new Among("aldi", -1, 1, "", basqueStemmer.methodObject), new Among("taldi", 64, 1, "", basqueStemmer.methodObject), new Among("ki", -1, 1, "", basqueStemmer.methodObject), new Among("ari", -1, 1, "", basqueStemmer.methodObject), new Among("kari", 67, 1, "", basqueStemmer.methodObject), new Among("lari", 67, 1, "", basqueStemmer.methodObject), new Among("tari", 67, 1, "", basqueStemmer.methodObject), new Among("etari", 70, 1, "", basqueStemmer.methodObject), new Among("garri", -1, 2, "", basqueStemmer.methodObject), new Among("karri", -1, 1, "", basqueStemmer.methodObject), new Among("arazi", -1, 1, "", basqueStemmer.methodObject), new Among("tarazi", 74, 1, "", basqueStemmer.methodObject), new Among("an", -1, 1, "", basqueStemmer.methodObject), new Among("ean", 76, 1, "", basqueStemmer.methodObject), new Among("rean", 77, 1, "", basqueStemmer.methodObject), new Among("kan", 76, 1, "", basqueStemmer.methodObject), new Among("etan", 76, 1, "", basqueStemmer.methodObject), new Among("atseden", -1, 3, "", basqueStemmer.methodObject), new Among("men", -1, 1, "", basqueStemmer.methodObject), new Among("pen", -1, 1, "", basqueStemmer.methodObject), new Among("kin", -1, 1, "", basqueStemmer.methodObject), new Among("rekin", 84, 1, "", basqueStemmer.methodObject), new Among("ezin", -1, 1, "", basqueStemmer.methodObject), new Among("tezin", 86, 1, "", basqueStemmer.methodObject), new Among("tun", -1, 1, "", basqueStemmer.methodObject), new Among("kizun", -1, 1, "", basqueStemmer.methodObject), new Among("go", -1, 1, "", basqueStemmer.methodObject), new Among("ago", 90, 1, "", basqueStemmer.methodObject), new Among("tio", -1, 1, "", basqueStemmer.methodObject), new Among("dako", -1, 1, "", basqueStemmer.methodObject), new Among("or", -1, 1, "", basqueStemmer.methodObject), new Among("kor", 94, 1, "", basqueStemmer.methodObject), new Among("tzat", -1, 1, "", basqueStemmer.methodObject), new Among("du", -1, 1, "", basqueStemmer.methodObject), new Among("gailu", -1, 1, "", basqueStemmer.methodObject), new Among("tu", -1, 1, "", basqueStemmer.methodObject), new Among("atu", 99, 1, "", basqueStemmer.methodObject), new Among("aldatu", 100, 1, "", basqueStemmer.methodObject), new Among("tatu", 100, 1, "", basqueStemmer.methodObject), new Among("baditu", 99, 5, "", basqueStemmer.methodObject), new Among("ez", -1, 1, "", basqueStemmer.methodObject), new Among("errez", 104, 1, "", basqueStemmer.methodObject), new Among("tzez", 104, 1, "", basqueStemmer.methodObject), new Among("gaitz", -1, 1, "", basqueStemmer.methodObject), new Among("kaitz", -1, 1, "", basqueStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete basqueStemmer.a_1;
                return basqueStemmer.a_1 = [new Among("ada", -1, 1, "", basqueStemmer.methodObject), new Among("kada", 0, 1, "", basqueStemmer.methodObject), new Among("anda", -1, 1, "", basqueStemmer.methodObject), new Among("denda", -1, 1, "", basqueStemmer.methodObject), new Among("gabea", -1, 1, "", basqueStemmer.methodObject), new Among("kabea", -1, 1, "", basqueStemmer.methodObject), new Among("aldea", -1, 1, "", basqueStemmer.methodObject), new Among("kaldea", 6, 1, "", basqueStemmer.methodObject), new Among("taldea", 6, 1, "", basqueStemmer.methodObject), new Among("ordea", -1, 1, "", basqueStemmer.methodObject), new Among("zalea", -1, 1, "", basqueStemmer.methodObject), new Among("tzalea", 10, 1, "", basqueStemmer.methodObject), new Among("gilea", -1, 1, "", basqueStemmer.methodObject), new Among("emea", -1, 1, "", basqueStemmer.methodObject), new Among("kumea", -1, 1, "", basqueStemmer.methodObject), new Among("nea", -1, 1, "", basqueStemmer.methodObject), new Among("enea", 15, 1, "", basqueStemmer.methodObject), new Among("zionea", 15, 1, "", basqueStemmer.methodObject), new Among("unea", 15, 1, "", basqueStemmer.methodObject), new Among("gunea", 18, 1, "", basqueStemmer.methodObject), new Among("pea", -1, 1, "", basqueStemmer.methodObject), new Among("aurrea", -1, 1, "", basqueStemmer.methodObject), new Among("tea", -1, 1, "", basqueStemmer.methodObject), new Among("kotea", 22, 1, "", basqueStemmer.methodObject), new Among("artea", 22, 1, "", basqueStemmer.methodObject), new Among("ostea", 22, 1, "", basqueStemmer.methodObject), new Among("etxea", -1, 1, "", basqueStemmer.methodObject), new Among("ga", -1, 1, "", basqueStemmer.methodObject), new Among("anga", 27, 1, "", basqueStemmer.methodObject), new Among("gaia", -1, 1, "", basqueStemmer.methodObject), new Among("aldia", -1, 1, "", basqueStemmer.methodObject), new Among("taldia", 30, 1, "", basqueStemmer.methodObject), new Among("handia", -1, 1, "", basqueStemmer.methodObject), new Among("mendia", -1, 1, "", basqueStemmer.methodObject), new Among("geia", -1, 1, "", basqueStemmer.methodObject), new Among("egia", -1, 1, "", basqueStemmer.methodObject), new Among("degia", 35, 1, "", basqueStemmer.methodObject), new Among("tegia", 35, 1, "", basqueStemmer.methodObject), new Among("nahia", -1, 1, "", basqueStemmer.methodObject), new Among("ohia", -1, 1, "", basqueStemmer.methodObject), new Among("kia", -1, 1, "", basqueStemmer.methodObject), new Among("tokia", 40, 1, "", basqueStemmer.methodObject), new Among("oia", -1, 1, "", basqueStemmer.methodObject), new Among("koia", 42, 1, "", basqueStemmer.methodObject), new Among("aria", -1, 1, "", basqueStemmer.methodObject), new Among("karia", 44, 1, "", basqueStemmer.methodObject), new Among("laria", 44, 1, "", basqueStemmer.methodObject), new Among("taria", 44, 1, "", basqueStemmer.methodObject), new Among("eria", -1, 1, "", basqueStemmer.methodObject), new Among("keria", 48, 1, "", basqueStemmer.methodObject), new Among("teria", 48, 1, "", basqueStemmer.methodObject), new Among("garria", -1, 2, "", basqueStemmer.methodObject), new Among("larria", -1, 1, "", basqueStemmer.methodObject), new Among("kirria", -1, 1, "", basqueStemmer.methodObject), new Among("duria", -1, 1, "", basqueStemmer.methodObject), new Among("asia", -1, 1, "", basqueStemmer.methodObject), new Among("tia", -1, 1, "", basqueStemmer.methodObject), new Among("ezia", -1, 1, "", basqueStemmer.methodObject), new Among("bizia", -1, 1, "", basqueStemmer.methodObject), new Among("ontzia", -1, 1, "", basqueStemmer.methodObject), new Among("ka", -1, 1, "", basqueStemmer.methodObject), new Among("joka", 60, 3, "", basqueStemmer.methodObject), new Among("aurka", 60, 10, "", basqueStemmer.methodObject), new Among("ska", 60, 1, "", basqueStemmer.methodObject), new Among("xka", 60, 1, "", basqueStemmer.methodObject), new Among("zka", 60, 1, "", basqueStemmer.methodObject), new Among("gibela", -1, 1, "", basqueStemmer.methodObject), new Among("gela", -1, 1, "", basqueStemmer.methodObject), new Among("kaila", -1, 1, "", basqueStemmer.methodObject), new Among("skila", -1, 1, "", basqueStemmer.methodObject), new Among("tila", -1, 1, "", basqueStemmer.methodObject), new Among("ola", -1, 1, "", basqueStemmer.methodObject), new Among("na", -1, 1, "", basqueStemmer.methodObject), new Among("kana", 72, 1, "", basqueStemmer.methodObject), new Among("ena", 72, 1, "", basqueStemmer.methodObject), new Among("garrena", 74, 1, "", basqueStemmer.methodObject), new Among("gerrena", 74, 1, "", basqueStemmer.methodObject), new Among("urrena", 74, 1, "", basqueStemmer.methodObject), new Among("zaina", 72, 1, "", basqueStemmer.methodObject), new Among("tzaina", 78, 1, "", basqueStemmer.methodObject), new Among("kina", 72, 1, "", basqueStemmer.methodObject), new Among("mina", 72, 1, "", basqueStemmer.methodObject), new Among("garna", 72, 1, "", basqueStemmer.methodObject), new Among("una", 72, 1, "", basqueStemmer.methodObject), new Among("duna", 83, 1, "", basqueStemmer.methodObject), new Among("asuna", 83, 1, "", basqueStemmer.methodObject), new Among("tasuna", 85, 1, "", basqueStemmer.methodObject), new Among("ondoa", -1, 1, "", basqueStemmer.methodObject), new Among("kondoa", 87, 1, "", basqueStemmer.methodObject), new Among("ngoa", -1, 1, "", basqueStemmer.methodObject), new Among("zioa", -1, 1, "", basqueStemmer.methodObject), new Among("koa", -1, 1, "", basqueStemmer.methodObject), new Among("takoa", 91, 1, "", basqueStemmer.methodObject), new Among("zkoa", 91, 1, "", basqueStemmer.methodObject), new Among("noa", -1, 1, "", basqueStemmer.methodObject), new Among("zinoa", 94, 1, "", basqueStemmer.methodObject), new Among("aroa", -1, 1, "", basqueStemmer.methodObject), new Among("taroa", 96, 1, "", basqueStemmer.methodObject), new Among("zaroa", 96, 1, "", basqueStemmer.methodObject), new Among("eroa", -1, 1, "", basqueStemmer.methodObject), new Among("oroa", -1, 1, "", basqueStemmer.methodObject), new Among("osoa", -1, 1, "", basqueStemmer.methodObject), new Among("toa", -1, 1, "", basqueStemmer.methodObject), new Among("ttoa", 102, 1, "", basqueStemmer.methodObject), new Among("ztoa", 102, 1, "", basqueStemmer.methodObject), new Among("txoa", -1, 1, "", basqueStemmer.methodObject), new Among("tzoa", -1, 1, "", basqueStemmer.methodObject), new Among('\u00F1oa', -1, 1, "", basqueStemmer.methodObject), new Among("ra", -1, 1, "", basqueStemmer.methodObject), new Among("ara", 108, 1, "", basqueStemmer.methodObject), new Among("dara", 109, 1, "", basqueStemmer.methodObject), new Among("liara", 109, 1, "", basqueStemmer.methodObject), new Among("tiara", 109, 1, "", basqueStemmer.methodObject), new Among("tara", 109, 1, "", basqueStemmer.methodObject), new Among("etara", 113, 1, "", basqueStemmer.methodObject), new Among("tzara", 109, 1, "", basqueStemmer.methodObject), new Among("bera", 108, 1, "", basqueStemmer.methodObject), new Among("kera", 108, 1, "", basqueStemmer.methodObject), new Among("pera", 108, 1, "", basqueStemmer.methodObject), new Among("ora", 108, 2, "", basqueStemmer.methodObject), new Among("tzarra", 108, 1, "", basqueStemmer.methodObject), new Among("korra", 108, 1, "", basqueStemmer.methodObject), new Among("tra", 108, 1, "", basqueStemmer.methodObject), new Among("sa", -1, 1, "", basqueStemmer.methodObject), new Among("osa", 123, 1, "", basqueStemmer.methodObject), new Among("ta", -1, 1, "", basqueStemmer.methodObject), new Among("eta", 125, 1, "", basqueStemmer.methodObject), new Among("keta", 126, 1, "", basqueStemmer.methodObject), new Among("sta", 125, 1, "", basqueStemmer.methodObject), new Among("dua", -1, 1, "", basqueStemmer.methodObject), new Among("mendua", 129, 1, "", basqueStemmer.methodObject), new Among("ordua", 129, 1, "", basqueStemmer.methodObject), new Among("lekua", -1, 1, "", basqueStemmer.methodObject), new Among("burua", -1, 1, "", basqueStemmer.methodObject), new Among("durua", -1, 1, "", basqueStemmer.methodObject), new Among("tsua", -1, 1, "", basqueStemmer.methodObject), new Among("tua", -1, 1, "", basqueStemmer.methodObject), new Among("mentua", 136, 1, "", basqueStemmer.methodObject), new Among("estua", 136, 1, "", basqueStemmer.methodObject), new Among("txua", -1, 1, "", basqueStemmer.methodObject), new Among("zua", -1, 1, "", basqueStemmer.methodObject), new Among("tzua", 140, 1, "", basqueStemmer.methodObject), new Among("za", -1, 1, "", basqueStemmer.methodObject), new Among("eza", 142, 1, "", basqueStemmer.methodObject), new Among("eroza", 142, 1, "", basqueStemmer.methodObject), new Among("tza", 142, 2, "", basqueStemmer.methodObject), new Among("koitza", 145, 1, "", basqueStemmer.methodObject), new Among("antza", 145, 1, "", basqueStemmer.methodObject), new Among("gintza", 145, 1, "", basqueStemmer.methodObject), new Among("kintza", 145, 1, "", basqueStemmer.methodObject), new Among("kuntza", 145, 1, "", basqueStemmer.methodObject), new Among("gabe", -1, 1, "", basqueStemmer.methodObject), new Among("kabe", -1, 1, "", basqueStemmer.methodObject), new Among("kide", -1, 1, "", basqueStemmer.methodObject), new Among("alde", -1, 1, "", basqueStemmer.methodObject), new Among("kalde", 154, 1, "", basqueStemmer.methodObject), new Among("talde", 154, 1, "", basqueStemmer.methodObject), new Among("orde", -1, 1, "", basqueStemmer.methodObject), new Among("ge", -1, 1, "", basqueStemmer.methodObject), new Among("zale", -1, 1, "", basqueStemmer.methodObject), new Among("tzale", 159, 1, "", basqueStemmer.methodObject), new Among("gile", -1, 1, "", basqueStemmer.methodObject), new Among("eme", -1, 1, "", basqueStemmer.methodObject), new Among("kume", -1, 1, "", basqueStemmer.methodObject), new Among("ne", -1, 1, "", basqueStemmer.methodObject), new Among("zione", 164, 1, "", basqueStemmer.methodObject), new Among("une", 164, 1, "", basqueStemmer.methodObject), new Among("gune", 166, 1, "", basqueStemmer.methodObject), new Among("pe", -1, 1, "", basqueStemmer.methodObject), new Among("aurre", -1, 1, "", basqueStemmer.methodObject), new Among("te", -1, 1, "", basqueStemmer.methodObject), new Among("kote", 170, 1, "", basqueStemmer.methodObject), new Among("arte", 170, 1, "", basqueStemmer.methodObject), new Among("oste", 170, 1, "", basqueStemmer.methodObject), new Among("etxe", -1, 1, "", basqueStemmer.methodObject), new Among("gai", -1, 1, "", basqueStemmer.methodObject), new Among("di", -1, 1, "", basqueStemmer.methodObject), new Among("aldi", 176, 1, "", basqueStemmer.methodObject), new Among("taldi", 177, 1, "", basqueStemmer.methodObject), new Among("geldi", 176, 8, "", basqueStemmer.methodObject), new Among("handi", 176, 1, "", basqueStemmer.methodObject), new Among("mendi", 176, 1, "", basqueStemmer.methodObject), new Among("gei", -1, 1, "", basqueStemmer.methodObject), new Among("egi", -1, 1, "", basqueStemmer.methodObject), new Among("degi", 183, 1, "", basqueStemmer.methodObject), new Among("tegi", 183, 1, "", basqueStemmer.methodObject), new Among("nahi", -1, 1, "", basqueStemmer.methodObject), new Among("ohi", -1, 1, "", basqueStemmer.methodObject), new Among("ki", -1, 1, "", basqueStemmer.methodObject), new Among("toki", 188, 1, "", basqueStemmer.methodObject), new Among("oi", -1, 1, "", basqueStemmer.methodObject), new Among("goi", 190, 1, "", basqueStemmer.methodObject), new Among("koi", 190, 1, "", basqueStemmer.methodObject), new Among("ari", -1, 1, "", basqueStemmer.methodObject), new Among("kari", 193, 1, "", basqueStemmer.methodObject), new Among("lari", 193, 1, "", basqueStemmer.methodObject), new Among("tari", 193, 1, "", basqueStemmer.methodObject), new Among("garri", -1, 2, "", basqueStemmer.methodObject), new Among("larri", -1, 1, "", basqueStemmer.methodObject), new Among("kirri", -1, 1, "", basqueStemmer.methodObject), new Among("duri", -1, 1, "", basqueStemmer.methodObject), new Among("asi", -1, 1, "", basqueStemmer.methodObject), new Among("ti", -1, 1, "", basqueStemmer.methodObject), new Among("ontzi", -1, 1, "", basqueStemmer.methodObject), new Among('\u00F1i', -1, 1, "", basqueStemmer.methodObject), new Among("ak", -1, 1, "", basqueStemmer.methodObject), new Among("ek", -1, 1, "", basqueStemmer.methodObject), new Among("tarik", -1, 1, "", basqueStemmer.methodObject), new Among("gibel", -1, 1, "", basqueStemmer.methodObject), new Among("ail", -1, 1, "", basqueStemmer.methodObject), new Among("kail", 209, 1, "", basqueStemmer.methodObject), new Among("kan", -1, 1, "", basqueStemmer.methodObject), new Among("tan", -1, 1, "", basqueStemmer.methodObject), new Among("etan", 212, 1, "", basqueStemmer.methodObject), new Among("en", -1, 4, "", basqueStemmer.methodObject), new Among("ren", 214, 2, "", basqueStemmer.methodObject), new Among("garren", 215, 1, "", basqueStemmer.methodObject), new Among("gerren", 215, 1, "", basqueStemmer.methodObject), new Among("urren", 215, 1, "", basqueStemmer.methodObject), new Among("ten", 214, 4, "", basqueStemmer.methodObject), new Among("tzen", 214, 4, "", basqueStemmer.methodObject), new Among("zain", -1, 1, "", basqueStemmer.methodObject), new Among("tzain", 221, 1, "", basqueStemmer.methodObject), new Among("kin", -1, 1, "", basqueStemmer.methodObject), new Among("min", -1, 1, "", basqueStemmer.methodObject), new Among("dun", -1, 1, "", basqueStemmer.methodObject), new Among("asun", -1, 1, "", basqueStemmer.methodObject), new Among("tasun", 226, 1, "", basqueStemmer.methodObject), new Among("aizun", -1, 1, "", basqueStemmer.methodObject), new Among("ondo", -1, 1, "", basqueStemmer.methodObject), new Among("kondo", 229, 1, "", basqueStemmer.methodObject), new Among("go", -1, 1, "", basqueStemmer.methodObject), new Among("ngo", 231, 1, "", basqueStemmer.methodObject), new Among("zio", -1, 1, "", basqueStemmer.methodObject), new Among("ko", -1, 1, "", basqueStemmer.methodObject), new Among("trako", 234, 5, "", basqueStemmer.methodObject), new Among("tako", 234, 1, "", basqueStemmer.methodObject), new Among("etako", 236, 1, "", basqueStemmer.methodObject), new Among("eko", 234, 1, "", basqueStemmer.methodObject), new Among("tariko", 234, 1, "", basqueStemmer.methodObject), new Among("sko", 234, 1, "", basqueStemmer.methodObject), new Among("tuko", 234, 1, "", basqueStemmer.methodObject), new Among("minutuko", 241, 6, "", basqueStemmer.methodObject), new Among("zko", 234, 1, "", basqueStemmer.methodObject), new Among("no", -1, 1, "", basqueStemmer.methodObject), new Among("zino", 244, 1, "", basqueStemmer.methodObject), new Among("ro", -1, 1, "", basqueStemmer.methodObject), new Among("aro", 246, 1, "", basqueStemmer.methodObject), new Among("igaro", 247, 9, "", basqueStemmer.methodObject), new Among("taro", 247, 1, "", basqueStemmer.methodObject), new Among("zaro", 247, 1, "", basqueStemmer.methodObject), new Among("ero", 246, 1, "", basqueStemmer.methodObject), new Among("giro", 246, 1, "", basqueStemmer.methodObject), new Among("oro", 246, 1, "", basqueStemmer.methodObject), new Among("oso", -1, 1, "", basqueStemmer.methodObject), new Among("to", -1, 1, "", basqueStemmer.methodObject), new Among("tto", 255, 1, "", basqueStemmer.methodObject), new Among("zto", 255, 1, "", basqueStemmer.methodObject), new Among("txo", -1, 1, "", basqueStemmer.methodObject), new Among("tzo", -1, 1, "", basqueStemmer.methodObject), new Among("gintzo", 259, 1, "", basqueStemmer.methodObject), new Among('\u00F1o', -1, 1, "", basqueStemmer.methodObject), new Among("zp", -1, 1, "", basqueStemmer.methodObject), new Among("ar", -1, 1, "", basqueStemmer.methodObject), new Among("dar", 263, 1, "", basqueStemmer.methodObject), new Among("behar", 263, 1, "", basqueStemmer.methodObject), new Among("zehar", 263, 7, "", basqueStemmer.methodObject), new Among("liar", 263, 1, "", basqueStemmer.methodObject), new Among("tiar", 263, 1, "", basqueStemmer.methodObject), new Among("tar", 263, 1, "", basqueStemmer.methodObject), new Among("tzar", 263, 1, "", basqueStemmer.methodObject), new Among("or", -1, 2, "", basqueStemmer.methodObject), new Among("kor", 271, 1, "", basqueStemmer.methodObject), new Among("os", -1, 1, "", basqueStemmer.methodObject), new Among("ket", -1, 1, "", basqueStemmer.methodObject), new Among("du", -1, 1, "", basqueStemmer.methodObject), new Among("mendu", 275, 1, "", basqueStemmer.methodObject), new Among("ordu", 275, 1, "", basqueStemmer.methodObject), new Among("leku", -1, 1, "", basqueStemmer.methodObject), new Among("buru", -1, 2, "", basqueStemmer.methodObject), new Among("duru", -1, 1, "", basqueStemmer.methodObject), new Among("tsu", -1, 1, "", basqueStemmer.methodObject), new Among("tu", -1, 1, "", basqueStemmer.methodObject), new Among("tatu", 282, 4, "", basqueStemmer.methodObject), new Among("mentu", 282, 1, "", basqueStemmer.methodObject), new Among("estu", 282, 1, "", basqueStemmer.methodObject), new Among("txu", -1, 1, "", basqueStemmer.methodObject), new Among("zu", -1, 1, "", basqueStemmer.methodObject), new Among("tzu", 287, 1, "", basqueStemmer.methodObject), new Among("gintzu", 288, 1, "", basqueStemmer.methodObject), new Among("z", -1, 1, "", basqueStemmer.methodObject), new Among("ez", 290, 1, "", basqueStemmer.methodObject), new Among("eroz", 290, 1, "", basqueStemmer.methodObject), new Among("tz", 290, 1, "", basqueStemmer.methodObject), new Among("koitz", 293, 1, "", basqueStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete basqueStemmer.a_2;
                return basqueStemmer.a_2 = [new Among("zlea", -1, 2, "", basqueStemmer.methodObject), new Among("keria", -1, 1, "", basqueStemmer.methodObject), new Among("la", -1, 1, "", basqueStemmer.methodObject), new Among("era", -1, 1, "", basqueStemmer.methodObject), new Among("dade", -1, 1, "", basqueStemmer.methodObject), new Among("tade", -1, 1, "", basqueStemmer.methodObject), new Among("date", -1, 1, "", basqueStemmer.methodObject), new Among("tate", -1, 1, "", basqueStemmer.methodObject), new Among("gi", -1, 1, "", basqueStemmer.methodObject), new Among("ki", -1, 1, "", basqueStemmer.methodObject), new Among("ik", -1, 1, "", basqueStemmer.methodObject), new Among("lanik", 10, 1, "", basqueStemmer.methodObject), new Among("rik", 10, 1, "", basqueStemmer.methodObject), new Among("larik", 12, 1, "", basqueStemmer.methodObject), new Among("ztik", 10, 1, "", basqueStemmer.methodObject), new Among("go", -1, 1, "", basqueStemmer.methodObject), new Among("ro", -1, 1, "", basqueStemmer.methodObject), new Among("ero", 16, 1, "", basqueStemmer.methodObject), new Among("to", -1, 1, "", basqueStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete basqueStemmer.g_v;
                return basqueStemmer.g_v = [17, 65, 16];
            }
        }]);

        return basqueStemmer;
    })(SnowballStemmer);

    var catalanStemmer = (function (_SnowballStemmer3) {
        _inherits(catalanStemmer, _SnowballStemmer3);

        function catalanStemmer() {
            _classCallCheck(this, catalanStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(catalanStemmer).apply(this, arguments));
        }

        _createClass(catalanStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    golab1: while (true) {
                        lab2: do {
                            if (!this.in_grouping$esjava$3(catalanStemmer.g_v, 97, 252)) {
                                break lab2;
                            }

                            break golab1;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab3: while (true) {
                        lab4: do {
                            if (!this.out_grouping$esjava$3(catalanStemmer.g_v, 97, 252)) {
                                break lab4;
                            }

                            break golab3;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab5: while (true) {
                        lab6: do {
                            if (!this.in_grouping$esjava$3(catalanStemmer.g_v, 97, 252)) {
                                break lab6;
                            }

                            break golab5;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab7: while (true) {
                        lab8: do {
                            if (!this.out_grouping$esjava$3(catalanStemmer.g_v, 97, 252)) {
                                break lab8;
                            }

                            break golab7;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_1;
                return true;
            }
        }, {
            key: 'r_cleaning$esjava$0',
            value: function r_cleaning$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(catalanStemmer.a_0, 13);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("a");
                                break;

                            case 2:
                                this.slice_from$esjava$1("a");
                                break;

                            case 3:
                                this.slice_from$esjava$1("e");
                                break;

                            case 4:
                                this.slice_from$esjava$1("e");
                                break;

                            case 5:
                                this.slice_from$esjava$1("i");
                                break;

                            case 6:
                                this.slice_from$esjava$1("i");
                                break;

                            case 7:
                                this.slice_from$esjava$1("o");
                                break;

                            case 8:
                                this.slice_from$esjava$1("o");
                                break;

                            case 9:
                                this.slice_from$esjava$1("u");
                                break;

                            case 10:
                                this.slice_from$esjava$1("u");
                                break;

                            case 11:
                                this.slice_from$esjava$1("i");
                                break;

                            case 12:
                                this.slice_from$esjava$1(".");
                                break;

                            case 13:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_attached_pronoun$esjava$0',
            value: function r_attached_pronoun$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(catalanStemmer.a_1, 39);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(catalanStemmer.a_2, 200);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 3:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("log");
                        break;

                    case 4:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ic");
                        break;

                    case 5:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("c");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_verb_suffix$esjava$0',
            value: function r_verb_suffix$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(catalanStemmer.a_3, 283);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_residual_suffix$esjava$0',
            value: function r_residual_suffix$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(catalanStemmer.a_4, 22);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ic");
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_attached_pronoun$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    lab3: do {
                        v_4 = this.limit - this.cursor;

                        lab4: do {
                            if (!this.r_standard_suffix$esjava$0()) {
                                break lab4;
                            }

                            break lab3;
                        } while (false);

                        this.cursor = this.limit - v_4;

                        if (!this.r_verb_suffix$esjava$0()) {
                            break lab2;
                        }
                    } while (false);
                } while (false);

                this.cursor = this.limit - v_3;
                v_5 = this.limit - this.cursor;

                lab5: do {
                    if (!this.r_residual_suffix$esjava$0()) {
                        break lab5;
                    }
                } while (false);

                this.cursor = this.limit - v_5;
                this.cursor = this.limit_backward;
                v_6 = this.cursor;

                lab6: do {
                    if (!this.r_cleaning$esjava$0()) {
                        break lab6;
                    }
                } while (false);

                this.cursor = v_6;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete catalanStemmer.methodObject;
                return catalanStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete catalanStemmer.a_0;
                return catalanStemmer.a_0 = [new Among("", -1, 13, "", catalanStemmer.methodObject), new Among('\u00B7', 0, 12, "", catalanStemmer.methodObject), new Among('\u00E0', 0, 2, "", catalanStemmer.methodObject), new Among('\u00E1', 0, 1, "", catalanStemmer.methodObject), new Among('\u00E8', 0, 4, "", catalanStemmer.methodObject), new Among('\u00E9', 0, 3, "", catalanStemmer.methodObject), new Among('\u00EC', 0, 6, "", catalanStemmer.methodObject), new Among('\u00ED', 0, 5, "", catalanStemmer.methodObject), new Among('\u00EF', 0, 11, "", catalanStemmer.methodObject), new Among('\u00F2', 0, 8, "", catalanStemmer.methodObject), new Among('\u00F3', 0, 7, "", catalanStemmer.methodObject), new Among('\u00FA', 0, 9, "", catalanStemmer.methodObject), new Among('\u00FC', 0, 10, "", catalanStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete catalanStemmer.a_1;
                return catalanStemmer.a_1 = [new Among("la", -1, 1, "", catalanStemmer.methodObject), new Among("-la", 0, 1, "", catalanStemmer.methodObject), new Among("sela", 0, 1, "", catalanStemmer.methodObject), new Among("le", -1, 1, "", catalanStemmer.methodObject), new Among("me", -1, 1, "", catalanStemmer.methodObject), new Among("-me", 4, 1, "", catalanStemmer.methodObject), new Among("se", -1, 1, "", catalanStemmer.methodObject), new Among("-te", -1, 1, "", catalanStemmer.methodObject), new Among("hi", -1, 1, "", catalanStemmer.methodObject), new Among("'hi", 8, 1, "", catalanStemmer.methodObject), new Among("li", -1, 1, "", catalanStemmer.methodObject), new Among("-li", 10, 1, "", catalanStemmer.methodObject), new Among("'l", -1, 1, "", catalanStemmer.methodObject), new Among("'m", -1, 1, "", catalanStemmer.methodObject), new Among("-m", -1, 1, "", catalanStemmer.methodObject), new Among("'n", -1, 1, "", catalanStemmer.methodObject), new Among("-n", -1, 1, "", catalanStemmer.methodObject), new Among("ho", -1, 1, "", catalanStemmer.methodObject), new Among("'ho", 17, 1, "", catalanStemmer.methodObject), new Among("lo", -1, 1, "", catalanStemmer.methodObject), new Among("selo", 19, 1, "", catalanStemmer.methodObject), new Among("'s", -1, 1, "", catalanStemmer.methodObject), new Among("las", -1, 1, "", catalanStemmer.methodObject), new Among("selas", 22, 1, "", catalanStemmer.methodObject), new Among("les", -1, 1, "", catalanStemmer.methodObject), new Among("-les", 24, 1, "", catalanStemmer.methodObject), new Among("'ls", -1, 1, "", catalanStemmer.methodObject), new Among("-ls", -1, 1, "", catalanStemmer.methodObject), new Among("'ns", -1, 1, "", catalanStemmer.methodObject), new Among("-ns", -1, 1, "", catalanStemmer.methodObject), new Among("ens", -1, 1, "", catalanStemmer.methodObject), new Among("los", -1, 1, "", catalanStemmer.methodObject), new Among("selos", 31, 1, "", catalanStemmer.methodObject), new Among("nos", -1, 1, "", catalanStemmer.methodObject), new Among("-nos", 33, 1, "", catalanStemmer.methodObject), new Among("vos", -1, 1, "", catalanStemmer.methodObject), new Among("us", -1, 1, "", catalanStemmer.methodObject), new Among("-us", 36, 1, "", catalanStemmer.methodObject), new Among("'t", -1, 1, "", catalanStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete catalanStemmer.a_2;
                return catalanStemmer.a_2 = [new Among("ica", -1, 4, "", catalanStemmer.methodObject), new Among('l\u00F3gica', 0, 3, "", catalanStemmer.methodObject), new Among("enca", -1, 1, "", catalanStemmer.methodObject), new Among("ada", -1, 2, "", catalanStemmer.methodObject), new Among("ancia", -1, 1, "", catalanStemmer.methodObject), new Among("encia", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E8ncia', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDcia', -1, 1, "", catalanStemmer.methodObject), new Among("logia", -1, 3, "", catalanStemmer.methodObject), new Among("inia", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDinia', 9, 1, "", catalanStemmer.methodObject), new Among("eria", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E0ria', -1, 1, "", catalanStemmer.methodObject), new Among('at\u00F2ria', -1, 1, "", catalanStemmer.methodObject), new Among("alla", -1, 1, "", catalanStemmer.methodObject), new Among("ella", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDvola', -1, 1, "", catalanStemmer.methodObject), new Among("ima", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDssima', 17, 1, "", catalanStemmer.methodObject), new Among('qu\u00EDssima', 18, 5, "", catalanStemmer.methodObject), new Among("ana", -1, 1, "", catalanStemmer.methodObject), new Among("ina", -1, 1, "", catalanStemmer.methodObject), new Among("era", -1, 1, "", catalanStemmer.methodObject), new Among("sfera", 22, 1, "", catalanStemmer.methodObject), new Among("ora", -1, 1, "", catalanStemmer.methodObject), new Among("dora", 24, 1, "", catalanStemmer.methodObject), new Among("adora", 25, 1, "", catalanStemmer.methodObject), new Among("adura", -1, 1, "", catalanStemmer.methodObject), new Among("esa", -1, 1, "", catalanStemmer.methodObject), new Among("osa", -1, 1, "", catalanStemmer.methodObject), new Among("assa", -1, 1, "", catalanStemmer.methodObject), new Among("essa", -1, 1, "", catalanStemmer.methodObject), new Among("issa", -1, 1, "", catalanStemmer.methodObject), new Among("eta", -1, 1, "", catalanStemmer.methodObject), new Among("ita", -1, 1, "", catalanStemmer.methodObject), new Among("ota", -1, 1, "", catalanStemmer.methodObject), new Among("ista", -1, 1, "", catalanStemmer.methodObject), new Among("ialista", 36, 1, "", catalanStemmer.methodObject), new Among("ionista", 36, 1, "", catalanStemmer.methodObject), new Among("iva", -1, 1, "", catalanStemmer.methodObject), new Among("ativa", 39, 1, "", catalanStemmer.methodObject), new Among('n\u00E7a', -1, 1, "", catalanStemmer.methodObject), new Among('log\u00EDa', -1, 3, "", catalanStemmer.methodObject), new Among("ic", -1, 4, "", catalanStemmer.methodObject), new Among('\u00EDstic', 43, 1, "", catalanStemmer.methodObject), new Among("enc", -1, 1, "", catalanStemmer.methodObject), new Among("esc", -1, 1, "", catalanStemmer.methodObject), new Among("ud", -1, 1, "", catalanStemmer.methodObject), new Among("atge", -1, 1, "", catalanStemmer.methodObject), new Among("ble", -1, 1, "", catalanStemmer.methodObject), new Among("able", 49, 1, "", catalanStemmer.methodObject), new Among("ible", 49, 1, "", catalanStemmer.methodObject), new Among("isme", -1, 1, "", catalanStemmer.methodObject), new Among("ialisme", 52, 1, "", catalanStemmer.methodObject), new Among("ionisme", 52, 1, "", catalanStemmer.methodObject), new Among("ivisme", 52, 1, "", catalanStemmer.methodObject), new Among("aire", -1, 1, "", catalanStemmer.methodObject), new Among("icte", -1, 1, "", catalanStemmer.methodObject), new Among("iste", -1, 1, "", catalanStemmer.methodObject), new Among("ici", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDci', -1, 1, "", catalanStemmer.methodObject), new Among("logi", -1, 3, "", catalanStemmer.methodObject), new Among("ari", -1, 1, "", catalanStemmer.methodObject), new Among("tori", -1, 1, "", catalanStemmer.methodObject), new Among("al", -1, 1, "", catalanStemmer.methodObject), new Among("il", -1, 1, "", catalanStemmer.methodObject), new Among("all", -1, 1, "", catalanStemmer.methodObject), new Among("ell", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDvol', -1, 1, "", catalanStemmer.methodObject), new Among("isam", -1, 1, "", catalanStemmer.methodObject), new Among("issem", -1, 1, "", catalanStemmer.methodObject), new Among('\u00ECssem', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDssem', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDssim', -1, 1, "", catalanStemmer.methodObject), new Among('qu\u00EDssim', 73, 5, "", catalanStemmer.methodObject), new Among("amen", -1, 1, "", catalanStemmer.methodObject), new Among('\u00ECssin', -1, 1, "", catalanStemmer.methodObject), new Among("ar", -1, 1, "", catalanStemmer.methodObject), new Among("ificar", 77, 1, "", catalanStemmer.methodObject), new Among("egar", 77, 1, "", catalanStemmer.methodObject), new Among("ejar", 77, 1, "", catalanStemmer.methodObject), new Among("itar", 77, 1, "", catalanStemmer.methodObject), new Among("itzar", 77, 1, "", catalanStemmer.methodObject), new Among("fer", -1, 1, "", catalanStemmer.methodObject), new Among("or", -1, 1, "", catalanStemmer.methodObject), new Among("dor", 84, 1, "", catalanStemmer.methodObject), new Among("dur", -1, 1, "", catalanStemmer.methodObject), new Among("doras", -1, 1, "", catalanStemmer.methodObject), new Among("ics", -1, 4, "", catalanStemmer.methodObject), new Among('l\u00F3gics', 88, 3, "", catalanStemmer.methodObject), new Among("uds", -1, 1, "", catalanStemmer.methodObject), new Among("nces", -1, 1, "", catalanStemmer.methodObject), new Among("ades", -1, 2, "", catalanStemmer.methodObject), new Among("ancies", -1, 1, "", catalanStemmer.methodObject), new Among("encies", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E8ncies', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDcies', -1, 1, "", catalanStemmer.methodObject), new Among("logies", -1, 3, "", catalanStemmer.methodObject), new Among("inies", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDnies', -1, 1, "", catalanStemmer.methodObject), new Among("eries", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E0ries', -1, 1, "", catalanStemmer.methodObject), new Among('at\u00F2ries', -1, 1, "", catalanStemmer.methodObject), new Among("bles", -1, 1, "", catalanStemmer.methodObject), new Among("ables", 103, 1, "", catalanStemmer.methodObject), new Among("ibles", 103, 1, "", catalanStemmer.methodObject), new Among("imes", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDssimes', 106, 1, "", catalanStemmer.methodObject), new Among('qu\u00EDssimes', 107, 5, "", catalanStemmer.methodObject), new Among("formes", -1, 1, "", catalanStemmer.methodObject), new Among("ismes", -1, 1, "", catalanStemmer.methodObject), new Among("ialismes", 110, 1, "", catalanStemmer.methodObject), new Among("ines", -1, 1, "", catalanStemmer.methodObject), new Among("eres", -1, 1, "", catalanStemmer.methodObject), new Among("ores", -1, 1, "", catalanStemmer.methodObject), new Among("dores", 114, 1, "", catalanStemmer.methodObject), new Among("idores", 115, 1, "", catalanStemmer.methodObject), new Among("dures", -1, 1, "", catalanStemmer.methodObject), new Among("eses", -1, 1, "", catalanStemmer.methodObject), new Among("oses", -1, 1, "", catalanStemmer.methodObject), new Among("asses", -1, 1, "", catalanStemmer.methodObject), new Among("ictes", -1, 1, "", catalanStemmer.methodObject), new Among("ites", -1, 1, "", catalanStemmer.methodObject), new Among("otes", -1, 1, "", catalanStemmer.methodObject), new Among("istes", -1, 1, "", catalanStemmer.methodObject), new Among("ialistes", 124, 1, "", catalanStemmer.methodObject), new Among("ionistes", 124, 1, "", catalanStemmer.methodObject), new Among("iques", -1, 4, "", catalanStemmer.methodObject), new Among('l\u00F3giques', 127, 3, "", catalanStemmer.methodObject), new Among("ives", -1, 1, "", catalanStemmer.methodObject), new Among("atives", 129, 1, "", catalanStemmer.methodObject), new Among('log\u00EDes', -1, 3, "", catalanStemmer.methodObject), new Among('alleng\u00FCes', -1, 1, "", catalanStemmer.methodObject), new Among("icis", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDcis', -1, 1, "", catalanStemmer.methodObject), new Among("logis", -1, 3, "", catalanStemmer.methodObject), new Among("aris", -1, 1, "", catalanStemmer.methodObject), new Among("toris", -1, 1, "", catalanStemmer.methodObject), new Among("ls", -1, 1, "", catalanStemmer.methodObject), new Among("als", 138, 1, "", catalanStemmer.methodObject), new Among("ells", 138, 1, "", catalanStemmer.methodObject), new Among("ims", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDssims', 141, 1, "", catalanStemmer.methodObject), new Among('qu\u00EDssims', 142, 5, "", catalanStemmer.methodObject), new Among("ions", -1, 1, "", catalanStemmer.methodObject), new Among("cions", 144, 1, "", catalanStemmer.methodObject), new Among("acions", 145, 2, "", catalanStemmer.methodObject), new Among("esos", -1, 1, "", catalanStemmer.methodObject), new Among("osos", -1, 1, "", catalanStemmer.methodObject), new Among("assos", -1, 1, "", catalanStemmer.methodObject), new Among("issos", -1, 1, "", catalanStemmer.methodObject), new Among("ers", -1, 1, "", catalanStemmer.methodObject), new Among("ors", -1, 1, "", catalanStemmer.methodObject), new Among("dors", 152, 1, "", catalanStemmer.methodObject), new Among("adors", 153, 1, "", catalanStemmer.methodObject), new Among("idors", 153, 1, "", catalanStemmer.methodObject), new Among("ats", -1, 1, "", catalanStemmer.methodObject), new Among("itats", 156, 1, "", catalanStemmer.methodObject), new Among("bilitats", 157, 1, "", catalanStemmer.methodObject), new Among("ivitats", 157, 1, "", catalanStemmer.methodObject), new Among("ativitats", 159, 1, "", catalanStemmer.methodObject), new Among('\u00EFtats', 156, 1, "", catalanStemmer.methodObject), new Among("ets", -1, 1, "", catalanStemmer.methodObject), new Among("ants", -1, 1, "", catalanStemmer.methodObject), new Among("ents", -1, 1, "", catalanStemmer.methodObject), new Among("ments", 164, 1, "", catalanStemmer.methodObject), new Among("aments", 165, 1, "", catalanStemmer.methodObject), new Among("ots", -1, 1, "", catalanStemmer.methodObject), new Among("uts", -1, 1, "", catalanStemmer.methodObject), new Among("ius", -1, 1, "", catalanStemmer.methodObject), new Among("trius", 169, 1, "", catalanStemmer.methodObject), new Among("atius", 169, 1, "", catalanStemmer.methodObject), new Among('\u00E8s', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E9s', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDs', -1, 1, "", catalanStemmer.methodObject), new Among('d\u00EDs', 174, 1, "", catalanStemmer.methodObject), new Among('\u00F3s', -1, 1, "", catalanStemmer.methodObject), new Among("itat", -1, 1, "", catalanStemmer.methodObject), new Among("bilitat", 177, 1, "", catalanStemmer.methodObject), new Among("ivitat", 177, 1, "", catalanStemmer.methodObject), new Among("ativitat", 179, 1, "", catalanStemmer.methodObject), new Among('\u00EFtat', -1, 1, "", catalanStemmer.methodObject), new Among("et", -1, 1, "", catalanStemmer.methodObject), new Among("ant", -1, 1, "", catalanStemmer.methodObject), new Among("ent", -1, 1, "", catalanStemmer.methodObject), new Among("ient", 184, 1, "", catalanStemmer.methodObject), new Among("ment", 184, 1, "", catalanStemmer.methodObject), new Among("ament", 186, 1, "", catalanStemmer.methodObject), new Among("isament", 187, 1, "", catalanStemmer.methodObject), new Among("ot", -1, 1, "", catalanStemmer.methodObject), new Among("isseu", -1, 1, "", catalanStemmer.methodObject), new Among('\u00ECsseu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDsseu', -1, 1, "", catalanStemmer.methodObject), new Among("triu", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDssiu', -1, 1, "", catalanStemmer.methodObject), new Among("atiu", -1, 1, "", catalanStemmer.methodObject), new Among('\u00F3', -1, 1, "", catalanStemmer.methodObject), new Among('i\u00F3', 196, 1, "", catalanStemmer.methodObject), new Among('ci\u00F3', 197, 1, "", catalanStemmer.methodObject), new Among('aci\u00F3', 198, 1, "", catalanStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete catalanStemmer.a_3;
                return catalanStemmer.a_3 = [new Among("aba", -1, 1, "", catalanStemmer.methodObject), new Among("esca", -1, 1, "", catalanStemmer.methodObject), new Among("isca", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFsca', -1, 1, "", catalanStemmer.methodObject), new Among("ada", -1, 1, "", catalanStemmer.methodObject), new Among("ida", -1, 1, "", catalanStemmer.methodObject), new Among("uda", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFda', -1, 1, "", catalanStemmer.methodObject), new Among("ia", -1, 1, "", catalanStemmer.methodObject), new Among("aria", 8, 1, "", catalanStemmer.methodObject), new Among("iria", 8, 1, "", catalanStemmer.methodObject), new Among("ara", -1, 1, "", catalanStemmer.methodObject), new Among("iera", -1, 1, "", catalanStemmer.methodObject), new Among("ira", -1, 1, "", catalanStemmer.methodObject), new Among("adora", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFra', -1, 1, "", catalanStemmer.methodObject), new Among("ava", -1, 1, "", catalanStemmer.methodObject), new Among("ixa", -1, 1, "", catalanStemmer.methodObject), new Among("itza", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDa', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00EDa', 19, 1, "", catalanStemmer.methodObject), new Among('er\u00EDa', 19, 1, "", catalanStemmer.methodObject), new Among('ir\u00EDa', 19, 1, "", catalanStemmer.methodObject), new Among('\u00EFa', -1, 1, "", catalanStemmer.methodObject), new Among("isc", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFsc', -1, 1, "", catalanStemmer.methodObject), new Among("ad", -1, 1, "", catalanStemmer.methodObject), new Among("ed", -1, 1, "", catalanStemmer.methodObject), new Among("id", -1, 1, "", catalanStemmer.methodObject), new Among("ie", -1, 1, "", catalanStemmer.methodObject), new Among("re", -1, 1, "", catalanStemmer.methodObject), new Among("dre", 30, 1, "", catalanStemmer.methodObject), new Among("ase", -1, 1, "", catalanStemmer.methodObject), new Among("iese", -1, 1, "", catalanStemmer.methodObject), new Among("aste", -1, 1, "", catalanStemmer.methodObject), new Among("iste", -1, 1, "", catalanStemmer.methodObject), new Among("ii", -1, 1, "", catalanStemmer.methodObject), new Among("ini", -1, 1, "", catalanStemmer.methodObject), new Among("esqui", -1, 1, "", catalanStemmer.methodObject), new Among("eixi", -1, 1, "", catalanStemmer.methodObject), new Among("itzi", -1, 1, "", catalanStemmer.methodObject), new Among("am", -1, 1, "", catalanStemmer.methodObject), new Among("em", -1, 1, "", catalanStemmer.methodObject), new Among("arem", 42, 1, "", catalanStemmer.methodObject), new Among("irem", 42, 1, "", catalanStemmer.methodObject), new Among('\u00E0rem', 42, 1, "", catalanStemmer.methodObject), new Among('\u00EDrem', 42, 1, "", catalanStemmer.methodObject), new Among('\u00E0ssem', 42, 1, "", catalanStemmer.methodObject), new Among('\u00E9ssem', 42, 1, "", catalanStemmer.methodObject), new Among("iguem", 42, 1, "", catalanStemmer.methodObject), new Among('\u00EFguem', 42, 1, "", catalanStemmer.methodObject), new Among("avem", 42, 1, "", catalanStemmer.methodObject), new Among('\u00E0vem', 42, 1, "", catalanStemmer.methodObject), new Among('\u00E1vem', 42, 1, "", catalanStemmer.methodObject), new Among('ir\u00ECem', 42, 1, "", catalanStemmer.methodObject), new Among('\u00EDem', 42, 1, "", catalanStemmer.methodObject), new Among('ar\u00EDem', 55, 1, "", catalanStemmer.methodObject), new Among('ir\u00EDem', 55, 1, "", catalanStemmer.methodObject), new Among("assim", -1, 1, "", catalanStemmer.methodObject), new Among("essim", -1, 1, "", catalanStemmer.methodObject), new Among("issim", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E0ssim', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E8ssim', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E9ssim', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDssim', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFm', -1, 1, "", catalanStemmer.methodObject), new Among("an", -1, 1, "", catalanStemmer.methodObject), new Among("aban", 66, 1, "", catalanStemmer.methodObject), new Among("arian", 66, 1, "", catalanStemmer.methodObject), new Among("aran", 66, 1, "", catalanStemmer.methodObject), new Among("ieran", 66, 1, "", catalanStemmer.methodObject), new Among("iran", 66, 1, "", catalanStemmer.methodObject), new Among('\u00EDan', 66, 1, "", catalanStemmer.methodObject), new Among('ar\u00EDan', 72, 1, "", catalanStemmer.methodObject), new Among('er\u00EDan', 72, 1, "", catalanStemmer.methodObject), new Among('ir\u00EDan', 72, 1, "", catalanStemmer.methodObject), new Among("en", -1, 1, "", catalanStemmer.methodObject), new Among("ien", 76, 1, "", catalanStemmer.methodObject), new Among("arien", 77, 1, "", catalanStemmer.methodObject), new Among("irien", 77, 1, "", catalanStemmer.methodObject), new Among("aren", 76, 1, "", catalanStemmer.methodObject), new Among("eren", 76, 1, "", catalanStemmer.methodObject), new Among("iren", 76, 1, "", catalanStemmer.methodObject), new Among('\u00E0ren', 76, 1, "", catalanStemmer.methodObject), new Among('\u00EFren', 76, 1, "", catalanStemmer.methodObject), new Among("asen", 76, 1, "", catalanStemmer.methodObject), new Among("iesen", 76, 1, "", catalanStemmer.methodObject), new Among("assen", 76, 1, "", catalanStemmer.methodObject), new Among("essen", 76, 1, "", catalanStemmer.methodObject), new Among("issen", 76, 1, "", catalanStemmer.methodObject), new Among('\u00E9ssen', 76, 1, "", catalanStemmer.methodObject), new Among('\u00EFssen', 76, 1, "", catalanStemmer.methodObject), new Among("esquen", 76, 1, "", catalanStemmer.methodObject), new Among("isquen", 76, 1, "", catalanStemmer.methodObject), new Among('\u00EFsquen', 76, 1, "", catalanStemmer.methodObject), new Among("aven", 76, 1, "", catalanStemmer.methodObject), new Among("ixen", 76, 1, "", catalanStemmer.methodObject), new Among("eixen", 96, 1, "", catalanStemmer.methodObject), new Among('\u00EFxen', 76, 1, "", catalanStemmer.methodObject), new Among('\u00EFen', 76, 1, "", catalanStemmer.methodObject), new Among("in", -1, 1, "", catalanStemmer.methodObject), new Among("inin", 100, 1, "", catalanStemmer.methodObject), new Among("sin", 100, 1, "", catalanStemmer.methodObject), new Among("isin", 102, 1, "", catalanStemmer.methodObject), new Among("assin", 102, 1, "", catalanStemmer.methodObject), new Among("essin", 102, 1, "", catalanStemmer.methodObject), new Among("issin", 102, 1, "", catalanStemmer.methodObject), new Among('\u00EFssin', 102, 1, "", catalanStemmer.methodObject), new Among("esquin", 100, 1, "", catalanStemmer.methodObject), new Among("eixin", 100, 1, "", catalanStemmer.methodObject), new Among("aron", -1, 1, "", catalanStemmer.methodObject), new Among("ieron", -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00E1n', -1, 1, "", catalanStemmer.methodObject), new Among('er\u00E1n', -1, 1, "", catalanStemmer.methodObject), new Among('ir\u00E1n', -1, 1, "", catalanStemmer.methodObject), new Among('i\u00EFn', -1, 1, "", catalanStemmer.methodObject), new Among("ado", -1, 1, "", catalanStemmer.methodObject), new Among("ido", -1, 1, "", catalanStemmer.methodObject), new Among("ando", -1, 2, "", catalanStemmer.methodObject), new Among("iendo", -1, 1, "", catalanStemmer.methodObject), new Among("io", -1, 1, "", catalanStemmer.methodObject), new Among("ixo", -1, 1, "", catalanStemmer.methodObject), new Among("eixo", 121, 1, "", catalanStemmer.methodObject), new Among('\u00EFxo', -1, 1, "", catalanStemmer.methodObject), new Among("itzo", -1, 1, "", catalanStemmer.methodObject), new Among("ar", -1, 1, "", catalanStemmer.methodObject), new Among("tzar", 125, 1, "", catalanStemmer.methodObject), new Among("er", -1, 1, "", catalanStemmer.methodObject), new Among("eixer", 127, 1, "", catalanStemmer.methodObject), new Among("ir", -1, 1, "", catalanStemmer.methodObject), new Among("ador", -1, 1, "", catalanStemmer.methodObject), new Among("as", -1, 1, "", catalanStemmer.methodObject), new Among("abas", 131, 1, "", catalanStemmer.methodObject), new Among("adas", 131, 1, "", catalanStemmer.methodObject), new Among("idas", 131, 1, "", catalanStemmer.methodObject), new Among("aras", 131, 1, "", catalanStemmer.methodObject), new Among("ieras", 131, 1, "", catalanStemmer.methodObject), new Among('\u00EDas', 131, 1, "", catalanStemmer.methodObject), new Among('ar\u00EDas', 137, 1, "", catalanStemmer.methodObject), new Among('er\u00EDas', 137, 1, "", catalanStemmer.methodObject), new Among('ir\u00EDas', 137, 1, "", catalanStemmer.methodObject), new Among("ids", -1, 1, "", catalanStemmer.methodObject), new Among("es", -1, 1, "", catalanStemmer.methodObject), new Among("ades", 142, 1, "", catalanStemmer.methodObject), new Among("ides", 142, 1, "", catalanStemmer.methodObject), new Among("udes", 142, 1, "", catalanStemmer.methodObject), new Among('\u00EFdes', 142, 1, "", catalanStemmer.methodObject), new Among("atges", 142, 1, "", catalanStemmer.methodObject), new Among("ies", 142, 1, "", catalanStemmer.methodObject), new Among("aries", 148, 1, "", catalanStemmer.methodObject), new Among("iries", 148, 1, "", catalanStemmer.methodObject), new Among("ares", 142, 1, "", catalanStemmer.methodObject), new Among("ires", 142, 1, "", catalanStemmer.methodObject), new Among("adores", 142, 1, "", catalanStemmer.methodObject), new Among('\u00EFres', 142, 1, "", catalanStemmer.methodObject), new Among("ases", 142, 1, "", catalanStemmer.methodObject), new Among("ieses", 142, 1, "", catalanStemmer.methodObject), new Among("asses", 142, 1, "", catalanStemmer.methodObject), new Among("esses", 142, 1, "", catalanStemmer.methodObject), new Among("isses", 142, 1, "", catalanStemmer.methodObject), new Among('\u00EFsses', 142, 1, "", catalanStemmer.methodObject), new Among("ques", 142, 1, "", catalanStemmer.methodObject), new Among("esques", 161, 1, "", catalanStemmer.methodObject), new Among('\u00EFsques', 161, 1, "", catalanStemmer.methodObject), new Among("aves", 142, 1, "", catalanStemmer.methodObject), new Among("ixes", 142, 1, "", catalanStemmer.methodObject), new Among("eixes", 165, 1, "", catalanStemmer.methodObject), new Among('\u00EFxes', 142, 1, "", catalanStemmer.methodObject), new Among('\u00EFes', 142, 1, "", catalanStemmer.methodObject), new Among("abais", -1, 1, "", catalanStemmer.methodObject), new Among("arais", -1, 1, "", catalanStemmer.methodObject), new Among("ierais", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDais', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00EDais', 172, 1, "", catalanStemmer.methodObject), new Among('er\u00EDais', 172, 1, "", catalanStemmer.methodObject), new Among('ir\u00EDais', 172, 1, "", catalanStemmer.methodObject), new Among("aseis", -1, 1, "", catalanStemmer.methodObject), new Among("ieseis", -1, 1, "", catalanStemmer.methodObject), new Among("asteis", -1, 1, "", catalanStemmer.methodObject), new Among("isteis", -1, 1, "", catalanStemmer.methodObject), new Among("inis", -1, 1, "", catalanStemmer.methodObject), new Among("sis", -1, 1, "", catalanStemmer.methodObject), new Among("isis", 181, 1, "", catalanStemmer.methodObject), new Among("assis", 181, 1, "", catalanStemmer.methodObject), new Among("essis", 181, 1, "", catalanStemmer.methodObject), new Among("issis", 181, 1, "", catalanStemmer.methodObject), new Among('\u00EFssis', 181, 1, "", catalanStemmer.methodObject), new Among("esquis", -1, 1, "", catalanStemmer.methodObject), new Among("eixis", -1, 1, "", catalanStemmer.methodObject), new Among("itzis", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E1is', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00E9is', -1, 1, "", catalanStemmer.methodObject), new Among('er\u00E9is', -1, 1, "", catalanStemmer.methodObject), new Among('ir\u00E9is', -1, 1, "", catalanStemmer.methodObject), new Among("ams", -1, 1, "", catalanStemmer.methodObject), new Among("ados", -1, 1, "", catalanStemmer.methodObject), new Among("idos", -1, 1, "", catalanStemmer.methodObject), new Among("amos", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E1bamos', 197, 1, "", catalanStemmer.methodObject), new Among('\u00E1ramos', 197, 1, "", catalanStemmer.methodObject), new Among('i\u00E9ramos', 197, 1, "", catalanStemmer.methodObject), new Among('\u00EDamos', 197, 1, "", catalanStemmer.methodObject), new Among('ar\u00EDamos', 201, 1, "", catalanStemmer.methodObject), new Among('er\u00EDamos', 201, 1, "", catalanStemmer.methodObject), new Among('ir\u00EDamos', 201, 1, "", catalanStemmer.methodObject), new Among("aremos", -1, 1, "", catalanStemmer.methodObject), new Among("eremos", -1, 1, "", catalanStemmer.methodObject), new Among("iremos", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E1semos', -1, 1, "", catalanStemmer.methodObject), new Among('i\u00E9semos', -1, 1, "", catalanStemmer.methodObject), new Among("imos", -1, 1, "", catalanStemmer.methodObject), new Among("adors", -1, 1, "", catalanStemmer.methodObject), new Among("ass", -1, 1, "", catalanStemmer.methodObject), new Among("erass", 212, 1, "", catalanStemmer.methodObject), new Among("ess", -1, 1, "", catalanStemmer.methodObject), new Among("ats", -1, 1, "", catalanStemmer.methodObject), new Among("its", -1, 1, "", catalanStemmer.methodObject), new Among("ents", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E0s', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00E0s', 218, 1, "", catalanStemmer.methodObject), new Among('ir\u00E0s', 218, 1, "", catalanStemmer.methodObject), new Among('ar\u00E1s', -1, 1, "", catalanStemmer.methodObject), new Among('er\u00E1s', -1, 1, "", catalanStemmer.methodObject), new Among('ir\u00E1s', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E9s', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00E9s', 224, 1, "", catalanStemmer.methodObject), new Among('\u00EDs', -1, 1, "", catalanStemmer.methodObject), new Among('i\u00EFs', -1, 1, "", catalanStemmer.methodObject), new Among("at", -1, 1, "", catalanStemmer.methodObject), new Among("it", -1, 1, "", catalanStemmer.methodObject), new Among("ant", -1, 1, "", catalanStemmer.methodObject), new Among("ent", -1, 1, "", catalanStemmer.methodObject), new Among("int", -1, 1, "", catalanStemmer.methodObject), new Among("ut", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFt', -1, 1, "", catalanStemmer.methodObject), new Among("au", -1, 1, "", catalanStemmer.methodObject), new Among("erau", 235, 1, "", catalanStemmer.methodObject), new Among("ieu", -1, 1, "", catalanStemmer.methodObject), new Among("ineu", -1, 1, "", catalanStemmer.methodObject), new Among("areu", -1, 1, "", catalanStemmer.methodObject), new Among("ireu", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E0reu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDreu', -1, 1, "", catalanStemmer.methodObject), new Among("asseu", -1, 1, "", catalanStemmer.methodObject), new Among("esseu", -1, 1, "", catalanStemmer.methodObject), new Among("eresseu", 244, 1, "", catalanStemmer.methodObject), new Among('\u00E0sseu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E9sseu', -1, 1, "", catalanStemmer.methodObject), new Among("igueu", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFgueu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E0veu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E1veu', -1, 1, "", catalanStemmer.methodObject), new Among("itzeu", -1, 1, "", catalanStemmer.methodObject), new Among('\u00ECeu', -1, 1, "", catalanStemmer.methodObject), new Among('ir\u00ECeu', 253, 1, "", catalanStemmer.methodObject), new Among('\u00EDeu', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00EDeu', 255, 1, "", catalanStemmer.methodObject), new Among('ir\u00EDeu', 255, 1, "", catalanStemmer.methodObject), new Among("assiu", -1, 1, "", catalanStemmer.methodObject), new Among("issiu", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E0ssiu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E8ssiu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E9ssiu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EDssiu', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFu', -1, 1, "", catalanStemmer.methodObject), new Among("ix", -1, 1, "", catalanStemmer.methodObject), new Among("eix", 265, 1, "", catalanStemmer.methodObject), new Among('\u00EFx', -1, 1, "", catalanStemmer.methodObject), new Among("itz", -1, 1, "", catalanStemmer.methodObject), new Among('i\u00E0', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00E0', -1, 1, "", catalanStemmer.methodObject), new Among('ir\u00E0', -1, 1, "", catalanStemmer.methodObject), new Among('itz\u00E0', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00E1', -1, 1, "", catalanStemmer.methodObject), new Among('er\u00E1', -1, 1, "", catalanStemmer.methodObject), new Among('ir\u00E1', -1, 1, "", catalanStemmer.methodObject), new Among('ir\u00E8', -1, 1, "", catalanStemmer.methodObject), new Among('ar\u00E9', -1, 1, "", catalanStemmer.methodObject), new Among('er\u00E9', -1, 1, "", catalanStemmer.methodObject), new Among('ir\u00E9', -1, 1, "", catalanStemmer.methodObject), new Among('\u00ED', -1, 1, "", catalanStemmer.methodObject), new Among('i\u00EF', -1, 1, "", catalanStemmer.methodObject), new Among('i\u00F3', -1, 1, "", catalanStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete catalanStemmer.a_4;
                return catalanStemmer.a_4 = [new Among("a", -1, 1, "", catalanStemmer.methodObject), new Among("e", -1, 1, "", catalanStemmer.methodObject), new Among("i", -1, 1, "", catalanStemmer.methodObject), new Among('\u00EFn', -1, 1, "", catalanStemmer.methodObject), new Among("o", -1, 1, "", catalanStemmer.methodObject), new Among("ir", -1, 1, "", catalanStemmer.methodObject), new Among("s", -1, 1, "", catalanStemmer.methodObject), new Among("is", 6, 1, "", catalanStemmer.methodObject), new Among("os", 6, 1, "", catalanStemmer.methodObject), new Among('\u00EFs', 6, 1, "", catalanStemmer.methodObject), new Among("it", -1, 1, "", catalanStemmer.methodObject), new Among("eu", -1, 1, "", catalanStemmer.methodObject), new Among("iu", -1, 1, "", catalanStemmer.methodObject), new Among("iqu", -1, 2, "", catalanStemmer.methodObject), new Among("itz", -1, 1, "", catalanStemmer.methodObject), new Among('\u00E0', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E1', -1, 1, "", catalanStemmer.methodObject), new Among('\u00E9', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EC', -1, 1, "", catalanStemmer.methodObject), new Among('\u00ED', -1, 1, "", catalanStemmer.methodObject), new Among('\u00EF', -1, 1, "", catalanStemmer.methodObject), new Among('\u00F3', -1, 1, "", catalanStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete catalanStemmer.g_v;
                return catalanStemmer.g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 129, 81, 6, 10];
            }
        }]);

        return catalanStemmer;
    })(SnowballStemmer);

    var czechStemmer = (function (_SnowballStemmer4) {
        _inherits(czechStemmer, _SnowballStemmer4);

        function czechStemmer() {
            _classCallCheck(this, czechStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(czechStemmer).apply(this, arguments));
        }

        _createClass(czechStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    golab1: while (true) {
                        lab2: do {
                            if (!this.out_grouping$esjava$3(czechStemmer.g_v, 97, 367)) {
                                break lab2;
                            }

                            break golab1;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_pV = this.cursor;

                    golab3: while (true) {
                        lab4: do {
                            if (!this.out_grouping$esjava$3(czechStemmer.g_v, 97, 367)) {
                                break lab4;
                            }

                            break golab3;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab5: while (true) {
                        lab6: do {
                            if (!this.in_grouping$esjava$3(czechStemmer.g_v, 97, 367)) {
                                break lab6;
                            }

                            break golab5;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;
                } while (false);

                this.cursor = v_1;
                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_palatalise$esjava$0',
            value: function r_palatalise$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(czechStemmer.a_0, 14);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_RV$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("k");
                        break;

                    case 2:
                        this.slice_from$esjava$1("h");
                        break;

                    case 3:
                        this.slice_from$esjava$1("ck");
                        break;

                    case 4:
                        this.slice_from$esjava$1("sk");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_do_possessive$esjava$0',
            value: function r_do_possessive$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(czechStemmer.a_1, 3);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_RV$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            if (!this.r_palatalise$esjava$0()) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }
                        } while (false);

                        break;
                }

                return true;
            }
        }, {
            key: 'r_do_case$esjava$0',
            value: function r_do_case$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(czechStemmer.a_2, 48);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            if (!this.r_palatalise$esjava$0()) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }
                        } while (false);

                        break;

                    case 3:
                        this.slice_from$esjava$1("e");
                        v_2 = this.limit - this.cursor;

                        lab1: do {
                            if (!this.r_palatalise$esjava$0()) {
                                this.cursor = this.limit - v_2;
                                break lab1;
                            }
                        } while (false);

                        break;
                }

                return true;
            }
        }, {
            key: 'r_do_derivational$esjava$0',
            value: function r_do_derivational$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(czechStemmer.a_3, 68);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("i");

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 3:
                        this.slice_from$esjava$1("e");

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 4:
                        this.slice_from$esjava$1('\u00E9');

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 5:
                        this.slice_from$esjava$1('\u011B');

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 6:
                        this.slice_from$esjava$1('\u00ED');

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;
                }

                return true;
            }
        }, {
            key: 'r_do_deriv_single$esjava$0',
            value: function r_do_deriv_single$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(czechStemmer.a_4, 6);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_do_augmentative$esjava$0',
            value: function r_do_augmentative$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(czechStemmer.a_5, 4);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("i");

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;
                }

                return true;
            }
        }, {
            key: 'r_do_diminutive$esjava$0',
            value: function r_do_diminutive$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(czechStemmer.a_6, 42);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("e");

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 3:
                        this.slice_from$esjava$1('\u00E9');

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 4:
                        this.slice_from$esjava$1("i");

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 5:
                        this.slice_from$esjava$1('\u00ED');

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 6:
                        this.slice_from$esjava$1('\u00E1');
                        break;

                    case 7:
                        this.slice_from$esjava$1("a");
                        break;

                    case 8:
                        this.slice_from$esjava$1("o");
                        break;

                    case 9:
                        this.slice_from$esjava$1("u");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_do_comparative$esjava$0',
            value: function r_do_comparative$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(czechStemmer.a_7, 2);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1('\u011B');

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;

                    case 2:
                        this.slice_from$esjava$1("e");

                        if (!this.r_palatalise$esjava$0()) {
                            return false;
                        }

                        break;
                }

                return true;
            }
        }, {
            key: 'r_do_aggressive$esjava$0',
            value: function r_do_aggressive$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    if (!this.r_do_comparative$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = this.limit - v_1;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_do_diminutive$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_do_augmentative$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;

                lab3: do {
                    v_4 = this.limit - this.cursor;

                    lab4: do {
                        if (!this.r_do_derivational$esjava$0()) {
                            break lab4;
                        }

                        break lab3;
                    } while (false);

                    this.cursor = this.limit - v_4;

                    if (!this.r_do_deriv_single$esjava$0()) {
                        return false;
                    }
                } while (false);

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;

                if (!this.r_do_case$esjava$0()) {
                    return false;
                }

                if (!this.r_do_possessive$esjava$0()) {
                    return false;
                }

                if (!this.r_do_aggressive$esjava$0()) {
                    return false;
                }

                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete czechStemmer.methodObject;
                return czechStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete czechStemmer.a_0;
                return czechStemmer.a_0 = [new Among("ce", -1, 1, "", czechStemmer.methodObject), new Among("ze", -1, 2, "", czechStemmer.methodObject), new Among('\u017Ee', -1, 2, "", czechStemmer.methodObject), new Among("ci", -1, 1, "", czechStemmer.methodObject), new Among('\u010Dti', -1, 3, "", czechStemmer.methodObject), new Among('\u0161ti', -1, 4, "", czechStemmer.methodObject), new Among("zi", -1, 2, "", czechStemmer.methodObject), new Among('\u010Di', -1, 1, "", czechStemmer.methodObject), new Among('\u017Ei', -1, 2, "", czechStemmer.methodObject), new Among('\u010Dt\u00E9', -1, 3, "", czechStemmer.methodObject), new Among('\u0161t\u00E9', -1, 4, "", czechStemmer.methodObject), new Among('\u010D', -1, 1, "", czechStemmer.methodObject), new Among('\u010Dt\u011B', -1, 3, "", czechStemmer.methodObject), new Among('\u0161t\u011B', -1, 4, "", czechStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete czechStemmer.a_1;
                return czechStemmer.a_1 = [new Among("in", -1, 2, "", czechStemmer.methodObject), new Among("ov", -1, 1, "", czechStemmer.methodObject), new Among('\u016Fv', -1, 1, "", czechStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete czechStemmer.a_2;
                return czechStemmer.a_2 = [new Among("a", -1, 1, "", czechStemmer.methodObject), new Among("ama", 0, 1, "", czechStemmer.methodObject), new Among("ata", 0, 1, "", czechStemmer.methodObject), new Among("e", -1, 2, "", czechStemmer.methodObject), new Among('\u011Bte', 3, 2, "", czechStemmer.methodObject), new Among("ech", -1, 2, "", czechStemmer.methodObject), new Among("atech", 5, 1, "", czechStemmer.methodObject), new Among("ich", -1, 2, "", czechStemmer.methodObject), new Among('\u00E1ch', -1, 1, "", czechStemmer.methodObject), new Among('\u00EDch', -1, 2, "", czechStemmer.methodObject), new Among('\u00FDch', -1, 1, "", czechStemmer.methodObject), new Among("i", -1, 2, "", czechStemmer.methodObject), new Among("mi", 11, 1, "", czechStemmer.methodObject), new Among("ami", 12, 1, "", czechStemmer.methodObject), new Among("emi", 12, 2, "", czechStemmer.methodObject), new Among('\u00EDmi', 12, 2, "", czechStemmer.methodObject), new Among('\u00FDmi', 12, 1, "", czechStemmer.methodObject), new Among('\u011Bmi', 12, 2, "", czechStemmer.methodObject), new Among('\u011Bti', 11, 2, "", czechStemmer.methodObject), new Among("ovi", 11, 1, "", czechStemmer.methodObject), new Among("em", -1, 3, "", czechStemmer.methodObject), new Among('\u011Btem', 20, 1, "", czechStemmer.methodObject), new Among('\u00E1m', -1, 1, "", czechStemmer.methodObject), new Among('\u00E9m', -1, 2, "", czechStemmer.methodObject), new Among('\u00EDm', -1, 2, "", czechStemmer.methodObject), new Among('\u00FDm', -1, 1, "", czechStemmer.methodObject), new Among('at\u016Fm', -1, 1, "", czechStemmer.methodObject), new Among("o", -1, 1, "", czechStemmer.methodObject), new Among("iho", 27, 2, "", czechStemmer.methodObject), new Among('\u00E9ho', 27, 2, "", czechStemmer.methodObject), new Among('\u00EDho', 27, 2, "", czechStemmer.methodObject), new Among("es", -1, 2, "", czechStemmer.methodObject), new Among("os", -1, 1, "", czechStemmer.methodObject), new Among("us", -1, 1, "", czechStemmer.methodObject), new Among("at", -1, 1, "", czechStemmer.methodObject), new Among("u", -1, 1, "", czechStemmer.methodObject), new Among("imu", 35, 2, "", czechStemmer.methodObject), new Among('\u00E9mu', 35, 2, "", czechStemmer.methodObject), new Among("ou", 35, 1, "", czechStemmer.methodObject), new Among("y", -1, 1, "", czechStemmer.methodObject), new Among("aty", 39, 1, "", czechStemmer.methodObject), new Among('\u00E1', -1, 1, "", czechStemmer.methodObject), new Among('\u00E9', -1, 1, "", czechStemmer.methodObject), new Among('ov\u00E9', 42, 1, "", czechStemmer.methodObject), new Among('\u00ED', -1, 2, "", czechStemmer.methodObject), new Among('\u00FD', -1, 1, "", czechStemmer.methodObject), new Among('\u011B', -1, 2, "", czechStemmer.methodObject), new Among('\u016F', -1, 1, "", czechStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete czechStemmer.a_3;
                return czechStemmer.a_3 = [new Among("ob", -1, 1, "", czechStemmer.methodObject), new Among("itb", -1, 2, "", czechStemmer.methodObject), new Among("ec", -1, 3, "", czechStemmer.methodObject), new Among("inec", 2, 2, "", czechStemmer.methodObject), new Among("obinec", 3, 1, "", czechStemmer.methodObject), new Among("ovec", 2, 1, "", czechStemmer.methodObject), new Among("ic", -1, 2, "", czechStemmer.methodObject), new Among("enic", 6, 3, "", czechStemmer.methodObject), new Among("och", -1, 1, "", czechStemmer.methodObject), new Among('\u00E1sek', -1, 1, "", czechStemmer.methodObject), new Among("nk", -1, 1, "", czechStemmer.methodObject), new Among("isk", -1, 2, "", czechStemmer.methodObject), new Among("ovisk", 11, 1, "", czechStemmer.methodObject), new Among("tk", -1, 1, "", czechStemmer.methodObject), new Among("vk", -1, 1, "", czechStemmer.methodObject), new Among('n\u00EDk', -1, 1, "", czechStemmer.methodObject), new Among('ovn\u00EDk', 15, 1, "", czechStemmer.methodObject), new Among('ov\u00EDk', -1, 1, "", czechStemmer.methodObject), new Among('\u010Dk', -1, 1, "", czechStemmer.methodObject), new Among('i\u0161k', -1, 2, "", czechStemmer.methodObject), new Among('u\u0161k', -1, 1, "", czechStemmer.methodObject), new Among("dl", -1, 1, "", czechStemmer.methodObject), new Among("itel", -1, 2, "", czechStemmer.methodObject), new Among("ul", -1, 1, "", czechStemmer.methodObject), new Among("an", -1, 1, "", czechStemmer.methodObject), new Among('\u010Dan', 24, 1, "", czechStemmer.methodObject), new Among("en", -1, 3, "", czechStemmer.methodObject), new Among("in", -1, 2, "", czechStemmer.methodObject), new Among('\u0161tin', 27, 1, "", czechStemmer.methodObject), new Among("ovin", 27, 1, "", czechStemmer.methodObject), new Among("teln", -1, 1, "", czechStemmer.methodObject), new Among('\u00E1rn', -1, 1, "", czechStemmer.methodObject), new Among('\u00EDrn', -1, 6, "", czechStemmer.methodObject), new Among("oun", -1, 1, "", czechStemmer.methodObject), new Among("loun", 33, 1, "", czechStemmer.methodObject), new Among("ovn", -1, 1, "", czechStemmer.methodObject), new Among("yn", -1, 1, "", czechStemmer.methodObject), new Among("kyn", 36, 1, "", czechStemmer.methodObject), new Among('\u00E1n', -1, 1, "", czechStemmer.methodObject), new Among('i\u00E1n', 38, 2, "", czechStemmer.methodObject), new Among('\u00EDn', -1, 6, "", czechStemmer.methodObject), new Among('\u010Dn', -1, 1, "", czechStemmer.methodObject), new Among('\u011Bn', -1, 5, "", czechStemmer.methodObject), new Among("as", -1, 1, "", czechStemmer.methodObject), new Among("it", -1, 2, "", czechStemmer.methodObject), new Among("ot", -1, 1, "", czechStemmer.methodObject), new Among("ist", -1, 2, "", czechStemmer.methodObject), new Among("ost", -1, 1, "", czechStemmer.methodObject), new Among("nost", 47, 1, "", czechStemmer.methodObject), new Among("out", -1, 1, "", czechStemmer.methodObject), new Among('ovi\u0161t', -1, 1, "", czechStemmer.methodObject), new Among("iv", -1, 2, "", czechStemmer.methodObject), new Among("ov", -1, 1, "", czechStemmer.methodObject), new Among("tv", -1, 1, "", czechStemmer.methodObject), new Among("ctv", 53, 1, "", czechStemmer.methodObject), new Among("stv", 53, 1, "", czechStemmer.methodObject), new Among("ovstv", 55, 1, "", czechStemmer.methodObject), new Among("ovtv", 53, 1, "", czechStemmer.methodObject), new Among('a\u010D', -1, 1, "", czechStemmer.methodObject), new Among('\u00E1\u010D', -1, 1, "", czechStemmer.methodObject), new Among('o\u0148', -1, 1, "", czechStemmer.methodObject), new Among('\u00E1\u0159', -1, 1, "", czechStemmer.methodObject), new Among('k\u00E1\u0159', 61, 1, "", czechStemmer.methodObject), new Among('ion\u00E1\u0159', 61, 2, "", czechStemmer.methodObject), new Among('\u00E9\u0159', -1, 4, "", czechStemmer.methodObject), new Among('n\u00E9\u0159', 64, 1, "", czechStemmer.methodObject), new Among('\u00ED\u0159', -1, 6, "", czechStemmer.methodObject), new Among('ou\u0161', -1, 1, "", czechStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete czechStemmer.a_4;
                return czechStemmer.a_4 = [new Among("c", -1, 1, "", czechStemmer.methodObject), new Among("k", -1, 1, "", czechStemmer.methodObject), new Among("l", -1, 1, "", czechStemmer.methodObject), new Among("n", -1, 1, "", czechStemmer.methodObject), new Among("t", -1, 1, "", czechStemmer.methodObject), new Among('\u010D', -1, 1, "", czechStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete czechStemmer.a_5;
                return czechStemmer.a_5 = [new Among("isk", -1, 2, "", czechStemmer.methodObject), new Among('\u00E1k', -1, 1, "", czechStemmer.methodObject), new Among("izn", -1, 2, "", czechStemmer.methodObject), new Among("ajzn", -1, 1, "", czechStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete czechStemmer.a_6;
                return czechStemmer.a_6 = [new Among("k", -1, 1, "", czechStemmer.methodObject), new Among("ak", 0, 7, "", czechStemmer.methodObject), new Among("ek", 0, 2, "", czechStemmer.methodObject), new Among("anek", 2, 1, "", czechStemmer.methodObject), new Among("enek", 2, 2, "", czechStemmer.methodObject), new Among("inek", 2, 4, "", czechStemmer.methodObject), new Among("onek", 2, 1, "", czechStemmer.methodObject), new Among("unek", 2, 1, "", czechStemmer.methodObject), new Among('\u00E1nek', 2, 1, "", czechStemmer.methodObject), new Among('a\u010Dek', 2, 1, "", czechStemmer.methodObject), new Among('e\u010Dek', 2, 2, "", czechStemmer.methodObject), new Among('i\u010Dek', 2, 4, "", czechStemmer.methodObject), new Among('o\u010Dek', 2, 1, "", czechStemmer.methodObject), new Among('u\u010Dek', 2, 1, "", czechStemmer.methodObject), new Among('\u00E1\u010Dek', 2, 1, "", czechStemmer.methodObject), new Among('\u00E9\u010Dek', 2, 3, "", czechStemmer.methodObject), new Among('\u00ED\u010Dek', 2, 5, "", czechStemmer.methodObject), new Among('ou\u0161ek', 2, 1, "", czechStemmer.methodObject), new Among("ik", 0, 4, "", czechStemmer.methodObject), new Among("ank", 0, 1, "", czechStemmer.methodObject), new Among("enk", 0, 1, "", czechStemmer.methodObject), new Among("ink", 0, 1, "", czechStemmer.methodObject), new Among("onk", 0, 1, "", czechStemmer.methodObject), new Among("unk", 0, 1, "", czechStemmer.methodObject), new Among('\u00E1nk', 0, 1, "", czechStemmer.methodObject), new Among('\u00E9nk', 0, 1, "", czechStemmer.methodObject), new Among('\u00EDnk', 0, 1, "", czechStemmer.methodObject), new Among("ok", 0, 8, "", czechStemmer.methodObject), new Among('\u00E1tk', 0, 1, "", czechStemmer.methodObject), new Among("uk", 0, 9, "", czechStemmer.methodObject), new Among('\u00E1k', 0, 6, "", czechStemmer.methodObject), new Among('\u00E9k', 0, 3, "", czechStemmer.methodObject), new Among('\u00EDk', 0, 5, "", czechStemmer.methodObject), new Among('a\u010Dk', 0, 1, "", czechStemmer.methodObject), new Among('e\u010Dk', 0, 1, "", czechStemmer.methodObject), new Among('i\u010Dk', 0, 1, "", czechStemmer.methodObject), new Among('o\u010Dk', 0, 1, "", czechStemmer.methodObject), new Among('u\u010Dk', 0, 1, "", czechStemmer.methodObject), new Among('\u00E1\u010Dk', 0, 1, "", czechStemmer.methodObject), new Among('\u00E9\u010Dk', 0, 1, "", czechStemmer.methodObject), new Among('\u00ED\u010Dk', 0, 1, "", czechStemmer.methodObject), new Among('u\u0161k', 0, 1, "", czechStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete czechStemmer.a_7;
                return czechStemmer.a_7 = [new Among('ej\u0161', -1, 2, "", czechStemmer.methodObject), new Among('\u011Bj\u0161', -1, 1, "", czechStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete czechStemmer.g_v;
                return czechStemmer.g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 18, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64];
            }
        }]);

        return czechStemmer;
    })(SnowballStemmer);

    var danishStemmer = (function (_SnowballStemmer5) {
        _inherits(danishStemmer, _SnowballStemmer5);

        function danishStemmer() {
            _classCallCheck(this, danishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(danishStemmer).apply(this, arguments));
        }

        _createClass(danishStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                this.I_p1 = this.limit;
                v_1 = this.cursor;
                {
                    var c = this.cursor + 3;

                    if (0 > c || c > this.limit) {
                        return false;
                    }

                    this.cursor = c;
                }
                this.I_x = this.cursor;
                this.cursor = v_1;

                golab0: while (true) {
                    v_2 = this.cursor;

                    lab1: do {
                        if (!this.in_grouping$esjava$3(danishStemmer.g_v, 97, 248)) {
                            break lab1;
                        }

                        this.cursor = v_2;
                        break golab0;
                    } while (false);

                    this.cursor = v_2;

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab2: while (true) {
                    lab3: do {
                        if (!this.out_grouping$esjava$3(danishStemmer.g_v, 97, 248)) {
                            break lab3;
                        }

                        break golab2;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p1 = this.cursor;

                lab4: do {
                    if (!(this.I_p1 < this.I_x)) {
                        break lab4;
                    }

                    this.I_p1 = this.I_x;
                } while (false);

                return true;
            }
        }, {
            key: 'r_main_suffix$esjava$0',
            value: function r_main_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(danishStemmer.a_0, 32);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.in_grouping_b$esjava$3(danishStemmer.g_s_ending, 97, 229)) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_consonant_pair$esjava$0',
            value: function r_consonant_pair$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                v_1 = this.limit - this.cursor;
                v_2 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_3 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_2;
                this.ket = this.cursor;

                if (this.find_among_b$esjava$2(danishStemmer.a_1, 4) === 0) {
                    this.limit_backward = v_3;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_3;
                this.cursor = this.limit - v_1;

                if (this.cursor <= this.limit_backward) {
                    return false;
                }

                this.cursor--;
                this.bra = this.cursor;
                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_other_suffix$esjava$0',
            value: function r_other_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(2, "st")) {
                        break lab0;
                    }

                    this.bra = this.cursor;

                    if (!this.eq_s_b$esjava$2(2, "ig")) {
                        break lab0;
                    }

                    this.slice_del$esjava$0();
                } while (false);

                this.cursor = this.limit - v_1;
                v_2 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_3 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_2;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(danishStemmer.a_2, 5);

                if (among_var === 0) {
                    this.limit_backward = v_3;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_3;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        v_4 = this.limit - this.cursor;

                        lab1: do {
                            if (!this.r_consonant_pair$esjava$0()) {
                                break lab1;
                            }
                        } while (false);

                        this.cursor = this.limit - v_4;
                        break;

                    case 2:
                        this.slice_from$esjava$1('l\u00F8s');
                        break;
                }

                return true;
            }
        }, {
            key: 'r_undouble$esjava$0',
            value: function r_undouble$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;

                if (!this.out_grouping_b$esjava$3(danishStemmer.g_v, 97, 248)) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.S_ch = this.slice_to$esjava$1(this.S_ch);
                this.limit_backward = v_2;

                if (!this.eq_v_b$esjava$1(this.S_ch)) {
                    return false;
                }

                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_main_suffix$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_consonant_pair$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    if (!this.r_other_suffix$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                v_5 = this.limit - this.cursor;

                lab4: do {
                    if (!this.r_undouble$esjava$0()) {
                        break lab4;
                    }
                } while (false);

                this.cursor = this.limit - v_5;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_x',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_x') ? this._$esjava$I_x : this._$esjava$I_x = 0;
            },
            set: function set(v) {
                this._$esjava$I_x = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'S_ch',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$S_ch') ? this._$esjava$S_ch : this._$esjava$S_ch = new StringBuilder();
            },
            set: function set(v) {
                this._$esjava$S_ch = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete danishStemmer.methodObject;
                return danishStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete danishStemmer.a_0;
                return danishStemmer.a_0 = [new Among("hed", -1, 1, "", danishStemmer.methodObject), new Among("ethed", 0, 1, "", danishStemmer.methodObject), new Among("ered", -1, 1, "", danishStemmer.methodObject), new Among("e", -1, 1, "", danishStemmer.methodObject), new Among("erede", 3, 1, "", danishStemmer.methodObject), new Among("ende", 3, 1, "", danishStemmer.methodObject), new Among("erende", 5, 1, "", danishStemmer.methodObject), new Among("ene", 3, 1, "", danishStemmer.methodObject), new Among("erne", 3, 1, "", danishStemmer.methodObject), new Among("ere", 3, 1, "", danishStemmer.methodObject), new Among("en", -1, 1, "", danishStemmer.methodObject), new Among("heden", 10, 1, "", danishStemmer.methodObject), new Among("eren", 10, 1, "", danishStemmer.methodObject), new Among("er", -1, 1, "", danishStemmer.methodObject), new Among("heder", 13, 1, "", danishStemmer.methodObject), new Among("erer", 13, 1, "", danishStemmer.methodObject), new Among("s", -1, 2, "", danishStemmer.methodObject), new Among("heds", 16, 1, "", danishStemmer.methodObject), new Among("es", 16, 1, "", danishStemmer.methodObject), new Among("endes", 18, 1, "", danishStemmer.methodObject), new Among("erendes", 19, 1, "", danishStemmer.methodObject), new Among("enes", 18, 1, "", danishStemmer.methodObject), new Among("ernes", 18, 1, "", danishStemmer.methodObject), new Among("eres", 18, 1, "", danishStemmer.methodObject), new Among("ens", 16, 1, "", danishStemmer.methodObject), new Among("hedens", 24, 1, "", danishStemmer.methodObject), new Among("erens", 24, 1, "", danishStemmer.methodObject), new Among("ers", 16, 1, "", danishStemmer.methodObject), new Among("ets", 16, 1, "", danishStemmer.methodObject), new Among("erets", 28, 1, "", danishStemmer.methodObject), new Among("et", -1, 1, "", danishStemmer.methodObject), new Among("eret", 30, 1, "", danishStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete danishStemmer.a_1;
                return danishStemmer.a_1 = [new Among("gd", -1, -1, "", danishStemmer.methodObject), new Among("dt", -1, -1, "", danishStemmer.methodObject), new Among("gt", -1, -1, "", danishStemmer.methodObject), new Among("kt", -1, -1, "", danishStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete danishStemmer.a_2;
                return danishStemmer.a_2 = [new Among("ig", -1, 1, "", danishStemmer.methodObject), new Among("lig", 0, 1, "", danishStemmer.methodObject), new Among("elig", 1, 1, "", danishStemmer.methodObject), new Among("els", -1, 1, "", danishStemmer.methodObject), new Among('l\u00F8st', -1, 2, "", danishStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete danishStemmer.g_v;
                return danishStemmer.g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 128];
            }
        }, {
            key: 'g_s_ending',
            get: function get() {
                delete danishStemmer.g_s_ending;
                return danishStemmer.g_s_ending = [239, 254, 42, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16];
            }
        }]);

        return danishStemmer;
    })(SnowballStemmer);

    var dutchStemmer = (function (_SnowballStemmer6) {
        _inherits(dutchStemmer, _SnowballStemmer6);

        function dutchStemmer() {
            _classCallCheck(this, dutchStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(dutchStemmer).apply(this, arguments));
        }

        _createClass(dutchStemmer, [{
            key: 'r_prelude$esjava$0',
            value: function r_prelude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                v_1 = this.cursor;

                replab0: while (true) {
                    v_2 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(dutchStemmer.a_0, 11);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("a");
                                break;

                            case 2:
                                this.slice_from$esjava$1("e");
                                break;

                            case 3:
                                this.slice_from$esjava$1("i");
                                break;

                            case 4:
                                this.slice_from$esjava$1("o");
                                break;

                            case 5:
                                this.slice_from$esjava$1("u");
                                break;

                            case 6:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_2;
                    break replab0;
                }

                this.cursor = v_1;
                v_3 = this.cursor;

                lab2: do {
                    this.bra = this.cursor;

                    if (!this.eq_s$esjava$2(1, "y")) {
                        this.cursor = v_3;
                        break lab2;
                    }

                    this.ket = this.cursor;
                    this.slice_from$esjava$1("Y");
                } while (false);

                replab3: while (true) {
                    v_4 = this.cursor;

                    lab4: do {
                        golab5: while (true) {
                            v_5 = this.cursor;

                            lab6: do {
                                if (!this.in_grouping$esjava$3(dutchStemmer.g_v, 97, 232)) {
                                    break lab6;
                                }

                                this.bra = this.cursor;

                                lab7: do {
                                    v_6 = this.cursor;

                                    lab8: do {
                                        if (!this.eq_s$esjava$2(1, "i")) {
                                            break lab8;
                                        }

                                        this.ket = this.cursor;

                                        if (!this.in_grouping$esjava$3(dutchStemmer.g_v, 97, 232)) {
                                            break lab8;
                                        }

                                        this.slice_from$esjava$1("I");
                                        break lab7;
                                    } while (false);

                                    this.cursor = v_6;

                                    if (!this.eq_s$esjava$2(1, "y")) {
                                        break lab6;
                                    }

                                    this.ket = this.cursor;
                                    this.slice_from$esjava$1("Y");
                                } while (false);

                                this.cursor = v_5;
                                break golab5;
                            } while (false);

                            this.cursor = v_5;

                            if (this.cursor >= this.limit) {
                                break lab4;
                            }

                            this.cursor++;
                        }

                        continue replab3;
                    } while (false);

                    this.cursor = v_4;
                    break replab3;
                }

                return true;
            }
        }, {
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;

                golab0: while (true) {
                    lab1: do {
                        if (!this.in_grouping$esjava$3(dutchStemmer.g_v, 97, 232)) {
                            break lab1;
                        }

                        break golab0;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab2: while (true) {
                    lab3: do {
                        if (!this.out_grouping$esjava$3(dutchStemmer.g_v, 97, 232)) {
                            break lab3;
                        }

                        break golab2;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p1 = this.cursor;

                lab4: do {
                    if (!(this.I_p1 < 3)) {
                        break lab4;
                    }

                    this.I_p1 = 3;
                } while (false);

                golab5: while (true) {
                    lab6: do {
                        if (!this.in_grouping$esjava$3(dutchStemmer.g_v, 97, 232)) {
                            break lab6;
                        }

                        break golab5;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab7: while (true) {
                    lab8: do {
                        if (!this.out_grouping$esjava$3(dutchStemmer.g_v, 97, 232)) {
                            break lab8;
                        }

                        break golab7;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p2 = this.cursor;
                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(dutchStemmer.a_1, 3);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("y");
                                break;

                            case 2:
                                this.slice_from$esjava$1("i");
                                break;

                            case 3:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_undouble$esjava$0',
            value: function r_undouble$esjava$0() {
                var v_1 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.find_among_b$esjava$2(dutchStemmer.a_2, 3) === 0) {
                    return false;
                }

                this.cursor = this.limit - v_1;
                this.ket = this.cursor;

                if (this.cursor <= this.limit_backward) {
                    return false;
                }

                this.cursor--;
                this.bra = this.cursor;
                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_e_ending$esjava$0',
            value: function r_e_ending$esjava$0() {
                var v_1 = undefined;
                this.B_e_found = false;
                this.ket = this.cursor;

                if (!this.eq_s_b$esjava$2(1, "e")) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                v_1 = this.limit - this.cursor;

                if (!this.out_grouping_b$esjava$3(dutchStemmer.g_v, 97, 232)) {
                    return false;
                }

                this.cursor = this.limit - v_1;
                this.slice_del$esjava$0();
                this.B_e_found = true;

                if (!this.r_undouble$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_en_ending$esjava$0',
            value: function r_en_ending$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                v_1 = this.limit - this.cursor;

                if (!this.out_grouping_b$esjava$3(dutchStemmer.g_v, 97, 232)) {
                    return false;
                }

                this.cursor = this.limit - v_1;
                {
                    v_2 = this.limit - this.cursor;

                    lab0: do {
                        if (!this.eq_s_b$esjava$2(3, "gem")) {
                            break lab0;
                        }

                        return false;
                    } while (false);

                    this.cursor = this.limit - v_2;
                }
                this.slice_del$esjava$0();

                if (!this.r_undouble$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    this.ket = this.cursor;
                    among_var = this.find_among_b$esjava$2(dutchStemmer.a_3, 5);

                    if (among_var === 0) {
                        break lab0;
                    }

                    this.bra = this.cursor;

                    switch (among_var) {
                        case 0:
                            break lab0;

                        case 1:
                            if (!this.r_R1$esjava$0()) {
                                break lab0;
                            }

                            this.slice_from$esjava$1("heid");
                            break;

                        case 2:
                            if (!this.r_en_ending$esjava$0()) {
                                break lab0;
                            }

                            break;

                        case 3:
                            if (!this.r_R1$esjava$0()) {
                                break lab0;
                            }

                            if (!this.out_grouping_b$esjava$3(dutchStemmer.g_v_j, 97, 232)) {
                                break lab0;
                            }

                            this.slice_del$esjava$0();
                            break;
                    }
                } while (false);

                this.cursor = this.limit - v_1;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_e_ending$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(4, "heid")) {
                        break lab2;
                    }

                    this.bra = this.cursor;

                    if (!this.r_R2$esjava$0()) {
                        break lab2;
                    }

                    {
                        v_4 = this.limit - this.cursor;

                        lab3: do {
                            if (!this.eq_s_b$esjava$2(1, "c")) {
                                break lab3;
                            }

                            break lab2;
                        } while (false);

                        this.cursor = this.limit - v_4;
                    }
                    this.slice_del$esjava$0();
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(2, "en")) {
                        break lab2;
                    }

                    this.bra = this.cursor;

                    if (!this.r_en_ending$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_5 = this.limit - this.cursor;

                lab4: do {
                    this.ket = this.cursor;
                    among_var = this.find_among_b$esjava$2(dutchStemmer.a_4, 6);

                    if (among_var === 0) {
                        break lab4;
                    }

                    this.bra = this.cursor;

                    switch (among_var) {
                        case 0:
                            break lab4;

                        case 1:
                            if (!this.r_R2$esjava$0()) {
                                break lab4;
                            }

                            this.slice_del$esjava$0();

                            lab5: do {
                                v_6 = this.limit - this.cursor;

                                lab6: do {
                                    this.ket = this.cursor;

                                    if (!this.eq_s_b$esjava$2(2, "ig")) {
                                        break lab6;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.r_R2$esjava$0()) {
                                        break lab6;
                                    }

                                    {
                                        v_7 = this.limit - this.cursor;

                                        lab7: do {
                                            if (!this.eq_s_b$esjava$2(1, "e")) {
                                                break lab7;
                                            }

                                            break lab6;
                                        } while (false);

                                        this.cursor = this.limit - v_7;
                                    }
                                    this.slice_del$esjava$0();
                                    break lab5;
                                } while (false);

                                this.cursor = this.limit - v_6;

                                if (!this.r_undouble$esjava$0()) {
                                    break lab4;
                                }
                            } while (false);

                            break;

                        case 2:
                            if (!this.r_R2$esjava$0()) {
                                break lab4;
                            }

                            {
                                v_8 = this.limit - this.cursor;

                                lab8: do {
                                    if (!this.eq_s_b$esjava$2(1, "e")) {
                                        break lab8;
                                    }

                                    break lab4;
                                } while (false);

                                this.cursor = this.limit - v_8;
                            }
                            this.slice_del$esjava$0();
                            break;

                        case 3:
                            if (!this.r_R2$esjava$0()) {
                                break lab4;
                            }

                            this.slice_del$esjava$0();

                            if (!this.r_e_ending$esjava$0()) {
                                break lab4;
                            }

                            break;

                        case 4:
                            if (!this.r_R2$esjava$0()) {
                                break lab4;
                            }

                            this.slice_del$esjava$0();
                            break;

                        case 5:
                            if (!this.r_R2$esjava$0()) {
                                break lab4;
                            }

                            if (!this.B_e_found) {
                                break lab4;
                            }

                            this.slice_del$esjava$0();
                            break;
                    }
                } while (false);

                this.cursor = this.limit - v_5;
                v_9 = this.limit - this.cursor;

                lab9: do {
                    if (!this.out_grouping_b$esjava$3(dutchStemmer.g_v_I, 73, 232)) {
                        break lab9;
                    }

                    v_10 = this.limit - this.cursor;

                    if (this.find_among_b$esjava$2(dutchStemmer.a_5, 4) === 0) {
                        break lab9;
                    }

                    if (!this.out_grouping_b$esjava$3(dutchStemmer.g_v, 97, 232)) {
                        break lab9;
                    }

                    this.cursor = this.limit - v_10;
                    this.ket = this.cursor;

                    if (this.cursor <= this.limit_backward) {
                        break lab9;
                    }

                    this.cursor--;
                    this.bra = this.cursor;
                    this.slice_del$esjava$0();
                } while (false);

                this.cursor = this.limit - v_9;
                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_prelude$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = v_2;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_standard_suffix$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                this.cursor = this.limit_backward;
                v_4 = this.cursor;

                lab3: do {
                    if (!this.r_postlude$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = v_4;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'B_e_found',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$B_e_found') ? this._$esjava$B_e_found : this._$esjava$B_e_found = false;
            },
            set: function set(v) {
                this._$esjava$B_e_found = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete dutchStemmer.methodObject;
                return dutchStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete dutchStemmer.a_0;
                return dutchStemmer.a_0 = [new Among("", -1, 6, "", dutchStemmer.methodObject), new Among('\u00E1', 0, 1, "", dutchStemmer.methodObject), new Among('\u00E4', 0, 1, "", dutchStemmer.methodObject), new Among('\u00E9', 0, 2, "", dutchStemmer.methodObject), new Among('\u00EB', 0, 2, "", dutchStemmer.methodObject), new Among('\u00ED', 0, 3, "", dutchStemmer.methodObject), new Among('\u00EF', 0, 3, "", dutchStemmer.methodObject), new Among('\u00F3', 0, 4, "", dutchStemmer.methodObject), new Among('\u00F6', 0, 4, "", dutchStemmer.methodObject), new Among('\u00FA', 0, 5, "", dutchStemmer.methodObject), new Among('\u00FC', 0, 5, "", dutchStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete dutchStemmer.a_1;
                return dutchStemmer.a_1 = [new Among("", -1, 3, "", dutchStemmer.methodObject), new Among("I", 0, 2, "", dutchStemmer.methodObject), new Among("Y", 0, 1, "", dutchStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete dutchStemmer.a_2;
                return dutchStemmer.a_2 = [new Among("dd", -1, -1, "", dutchStemmer.methodObject), new Among("kk", -1, -1, "", dutchStemmer.methodObject), new Among("tt", -1, -1, "", dutchStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete dutchStemmer.a_3;
                return dutchStemmer.a_3 = [new Among("ene", -1, 2, "", dutchStemmer.methodObject), new Among("se", -1, 3, "", dutchStemmer.methodObject), new Among("en", -1, 2, "", dutchStemmer.methodObject), new Among("heden", 2, 1, "", dutchStemmer.methodObject), new Among("s", -1, 3, "", dutchStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete dutchStemmer.a_4;
                return dutchStemmer.a_4 = [new Among("end", -1, 1, "", dutchStemmer.methodObject), new Among("ig", -1, 2, "", dutchStemmer.methodObject), new Among("ing", -1, 1, "", dutchStemmer.methodObject), new Among("lijk", -1, 3, "", dutchStemmer.methodObject), new Among("baar", -1, 4, "", dutchStemmer.methodObject), new Among("bar", -1, 5, "", dutchStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete dutchStemmer.a_5;
                return dutchStemmer.a_5 = [new Among("aa", -1, -1, "", dutchStemmer.methodObject), new Among("ee", -1, -1, "", dutchStemmer.methodObject), new Among("oo", -1, -1, "", dutchStemmer.methodObject), new Among("uu", -1, -1, "", dutchStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete dutchStemmer.g_v;
                return dutchStemmer.g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];
            }
        }, {
            key: 'g_v_I',
            get: function get() {
                delete dutchStemmer.g_v_I;
                return dutchStemmer.g_v_I = [1, 0, 0, 17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];
            }
        }, {
            key: 'g_v_j',
            get: function get() {
                delete dutchStemmer.g_v_j;
                return dutchStemmer.g_v_j = [17, 67, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];
            }
        }]);

        return dutchStemmer;
    })(SnowballStemmer);

    var englishStemmer = (function (_SnowballStemmer7) {
        _inherits(englishStemmer, _SnowballStemmer7);

        function englishStemmer() {
            _classCallCheck(this, englishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(englishStemmer).apply(this, arguments));
        }

        _createClass(englishStemmer, [{
            key: 'r_prelude$esjava$0',
            value: function r_prelude$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                this.B_Y_found = false;
                v_1 = this.cursor;

                lab0: do {
                    this.bra = this.cursor;

                    if (!this.eq_s$esjava$2(1, "'")) {
                        break lab0;
                    }

                    this.ket = this.cursor;
                    this.slice_del$esjava$0();
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    this.bra = this.cursor;

                    if (!this.eq_s$esjava$2(1, "y")) {
                        break lab1;
                    }

                    this.ket = this.cursor;
                    this.slice_from$esjava$1("Y");
                    this.B_Y_found = true;
                } while (false);

                this.cursor = v_2;
                v_3 = this.cursor;

                lab2: do {
                    replab3: while (true) {
                        v_4 = this.cursor;

                        lab4: do {
                            golab5: while (true) {
                                v_5 = this.cursor;

                                lab6: do {
                                    if (!this.in_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                        break lab6;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.eq_s$esjava$2(1, "y")) {
                                        break lab6;
                                    }

                                    this.ket = this.cursor;
                                    this.cursor = v_5;
                                    break golab5;
                                } while (false);

                                this.cursor = v_5;

                                if (this.cursor >= this.limit) {
                                    break lab4;
                                }

                                this.cursor++;
                            }

                            this.slice_from$esjava$1("Y");
                            this.B_Y_found = true;
                            continue replab3;
                        } while (false);

                        this.cursor = v_4;
                        break replab3;
                    }
                } while (false);

                this.cursor = v_3;
                return true;
            }
        }, {
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (this.find_among$esjava$2(englishStemmer.a_0, 3) === 0) {
                                break lab2;
                            }

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        golab3: while (true) {
                            lab4: do {
                                if (!this.in_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                    break lab4;
                                }

                                break golab3;
                            } while (false);

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        }

                        golab5: while (true) {
                            lab6: do {
                                if (!this.out_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                    break lab6;
                                }

                                break golab5;
                            } while (false);

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        }
                    } while (false);

                    this.I_p1 = this.cursor;

                    golab7: while (true) {
                        lab8: do {
                            if (!this.in_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                break lab8;
                            }

                            break golab7;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab9: while (true) {
                        lab10: do {
                            if (!this.out_grouping$esjava$3(englishStemmer.g_v, 97, 121)) {
                                break lab10;
                            }

                            break golab9;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_1;
                return true;
            }
        }, {
            key: 'r_shortv$esjava$0',
            value: function r_shortv$esjava$0() {
                var v_1 = undefined;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.out_grouping_b$esjava$3(englishStemmer.g_v_WXY, 89, 121)) {
                            break lab1;
                        }

                        if (!this.in_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                            break lab1;
                        }

                        if (!this.out_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    if (!this.out_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                        return false;
                    }

                    if (!this.in_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                        return false;
                    }

                    if (this.cursor > this.limit_backward) {
                        return false;
                    }
                } while (false);

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_Step_1a$esjava$0',
            value: function r_Step_1a$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    this.ket = this.cursor;
                    among_var = this.find_among_b$esjava$2(englishStemmer.a_1, 3);

                    if (among_var === 0) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.bra = this.cursor;

                    switch (among_var) {
                        case 0:
                            this.cursor = this.limit - v_1;
                            break lab0;

                        case 1:
                            this.slice_del$esjava$0();
                            break;
                    }
                } while (false);

                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(englishStemmer.a_2, 6);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("ss");
                        break;

                    case 2:
                        lab1: do {
                            v_2 = this.limit - this.cursor;

                            lab2: do {
                                {
                                    var c = this.cursor - 2;

                                    if (this.limit_backward > c || c > this.limit) {
                                        break lab2;
                                    }

                                    this.cursor = c;
                                }
                                this.slice_from$esjava$1("i");
                                break lab1;
                            } while (false);

                            this.cursor = this.limit - v_2;
                            this.slice_from$esjava$1("ie");
                        } while (false);

                        break;

                    case 3:
                        if (this.cursor <= this.limit_backward) {
                            return false;
                        }

                        this.cursor--;

                        golab3: while (true) {
                            lab4: do {
                                if (!this.in_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                                    break lab4;
                                }

                                break golab3;
                            } while (false);

                            if (this.cursor <= this.limit_backward) {
                                return false;
                            }

                            this.cursor--;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_1b$esjava$0',
            value: function r_Step_1b$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(englishStemmer.a_4, 6);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ee");
                        break;

                    case 2:
                        v_1 = this.limit - this.cursor;

                        golab0: while (true) {
                            lab1: do {
                                if (!this.in_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                                    break lab1;
                                }

                                break golab0;
                            } while (false);

                            if (this.cursor <= this.limit_backward) {
                                return false;
                            }

                            this.cursor--;
                        }

                        this.cursor = this.limit - v_1;
                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;
                        among_var = this.find_among_b$esjava$2(englishStemmer.a_3, 13);

                        if (among_var === 0) {
                            return false;
                        }

                        this.cursor = this.limit - v_3;

                        switch (among_var) {
                            case 0:
                                return false;

                            case 1:
                                {
                                    var c = this.cursor;
                                    this.insert$esjava$3(this.cursor, this.cursor, "e");
                                    this.cursor = c;
                                }
                                break;

                            case 2:
                                this.ket = this.cursor;

                                if (this.cursor <= this.limit_backward) {
                                    return false;
                                }

                                this.cursor--;
                                this.bra = this.cursor;
                                this.slice_del$esjava$0();
                                break;

                            case 3:
                                if (this.cursor !== this.I_p1) {
                                    return false;
                                }

                                v_4 = this.limit - this.cursor;

                                if (!this.r_shortv$esjava$0()) {
                                    return false;
                                }

                                this.cursor = this.limit - v_4;
                                {
                                    var c = this.cursor;
                                    this.insert$esjava$3(this.cursor, this.cursor, "e");
                                    this.cursor = c;
                                }
                                break;
                        }

                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_1c$esjava$0',
            value: function r_Step_1c$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                this.ket = this.cursor;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.eq_s_b$esjava$2(1, "y")) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    if (!this.eq_s_b$esjava$2(1, "Y")) {
                        return false;
                    }
                } while (false);

                this.bra = this.cursor;

                if (!this.out_grouping_b$esjava$3(englishStemmer.g_v, 97, 121)) {
                    return false;
                }

                {
                    v_2 = this.limit - this.cursor;

                    lab2: do {
                        if (this.cursor > this.limit_backward) {
                            break lab2;
                        }

                        return false;
                    } while (false);

                    this.cursor = this.limit - v_2;
                }
                this.slice_from$esjava$1("i");
                return true;
            }
        }, {
            key: 'r_Step_2$esjava$0',
            value: function r_Step_2$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(englishStemmer.a_5, 24);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("tion");
                        break;

                    case 2:
                        this.slice_from$esjava$1("ence");
                        break;

                    case 3:
                        this.slice_from$esjava$1("ance");
                        break;

                    case 4:
                        this.slice_from$esjava$1("able");
                        break;

                    case 5:
                        this.slice_from$esjava$1("ent");
                        break;

                    case 6:
                        this.slice_from$esjava$1("ize");
                        break;

                    case 7:
                        this.slice_from$esjava$1("ate");
                        break;

                    case 8:
                        this.slice_from$esjava$1("al");
                        break;

                    case 9:
                        this.slice_from$esjava$1("ful");
                        break;

                    case 10:
                        this.slice_from$esjava$1("ous");
                        break;

                    case 11:
                        this.slice_from$esjava$1("ive");
                        break;

                    case 12:
                        this.slice_from$esjava$1("ble");
                        break;

                    case 13:
                        if (!this.eq_s_b$esjava$2(1, "l")) {
                            return false;
                        }

                        this.slice_from$esjava$1("og");
                        break;

                    case 14:
                        this.slice_from$esjava$1("ful");
                        break;

                    case 15:
                        this.slice_from$esjava$1("less");
                        break;

                    case 16:
                        if (!this.in_grouping_b$esjava$3(englishStemmer.g_valid_LI, 99, 116)) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_3$esjava$0',
            value: function r_Step_3$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(englishStemmer.a_6, 9);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("tion");
                        break;

                    case 2:
                        this.slice_from$esjava$1("ate");
                        break;

                    case 3:
                        this.slice_from$esjava$1("al");
                        break;

                    case 4:
                        this.slice_from$esjava$1("ic");
                        break;

                    case 5:
                        this.slice_del$esjava$0();
                        break;

                    case 6:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_4$esjava$0',
            value: function r_Step_4$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(englishStemmer.a_7, 18);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R2$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        lab0: do {
                            v_1 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.eq_s_b$esjava$2(1, "s")) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_1;

                            if (!this.eq_s_b$esjava$2(1, "t")) {
                                return false;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_5$esjava$0',
            value: function r_Step_5$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(englishStemmer.a_8, 2);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        lab0: do {
                            v_1 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.r_R2$esjava$0()) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_1;

                            if (!this.r_R1$esjava$0()) {
                                return false;
                            }

                            {
                                v_2 = this.limit - this.cursor;

                                lab2: do {
                                    if (!this.r_shortv$esjava$0()) {
                                        break lab2;
                                    }

                                    return false;
                                } while (false);

                                this.cursor = this.limit - v_2;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        if (!this.eq_s_b$esjava$2(1, "l")) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_exception2$esjava$0',
            value: function r_exception2$esjava$0() {
                this.ket = this.cursor;

                if (this.find_among_b$esjava$2(englishStemmer.a_9, 8) === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (this.cursor > this.limit_backward) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_exception1$esjava$0',
            value: function r_exception1$esjava$0() {
                var among_var = undefined;
                this.bra = this.cursor;
                among_var = this.find_among$esjava$2(englishStemmer.a_10, 18);

                if (among_var === 0) {
                    return false;
                }

                this.ket = this.cursor;

                if (this.cursor < this.limit) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("ski");
                        break;

                    case 2:
                        this.slice_from$esjava$1("sky");
                        break;

                    case 3:
                        this.slice_from$esjava$1("die");
                        break;

                    case 4:
                        this.slice_from$esjava$1("lie");
                        break;

                    case 5:
                        this.slice_from$esjava$1("tie");
                        break;

                    case 6:
                        this.slice_from$esjava$1("idl");
                        break;

                    case 7:
                        this.slice_from$esjava$1("gentl");
                        break;

                    case 8:
                        this.slice_from$esjava$1("ugli");
                        break;

                    case 9:
                        this.slice_from$esjava$1("earli");
                        break;

                    case 10:
                        this.slice_from$esjava$1("onli");
                        break;

                    case 11:
                        this.slice_from$esjava$1("singl");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;

                if (!this.B_Y_found) {
                    return false;
                }

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        golab2: while (true) {
                            v_2 = this.cursor;

                            lab3: do {
                                this.bra = this.cursor;

                                if (!this.eq_s$esjava$2(1, "Y")) {
                                    break lab3;
                                }

                                this.ket = this.cursor;
                                this.cursor = v_2;
                                break golab2;
                            } while (false);

                            this.cursor = v_2;

                            if (this.cursor >= this.limit) {
                                break lab1;
                            }

                            this.cursor++;
                        }

                        this.slice_from$esjava$1("y");
                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                var v_12 = undefined;
                var v_13 = undefined;

                lab0: do {
                    v_1 = this.cursor;

                    lab1: do {
                        if (!this.r_exception1$esjava$0()) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = v_1;

                    lab2: do {
                        {
                            v_2 = this.cursor;

                            lab3: do {
                                {
                                    var c = this.cursor + 3;

                                    if (0 > c || c > this.limit) {
                                        break lab3;
                                    }

                                    this.cursor = c;
                                }
                                break lab2;
                            } while (false);

                            this.cursor = v_2;
                        }
                        break lab0;
                    } while (false);

                    this.cursor = v_1;
                    v_3 = this.cursor;

                    lab4: do {
                        if (!this.r_prelude$esjava$0()) {
                            break lab4;
                        }
                    } while (false);

                    this.cursor = v_3;
                    v_4 = this.cursor;

                    lab5: do {
                        if (!this.r_mark_regions$esjava$0()) {
                            break lab5;
                        }
                    } while (false);

                    this.cursor = v_4;
                    this.limit_backward = this.cursor;
                    this.cursor = this.limit;
                    v_5 = this.limit - this.cursor;

                    lab6: do {
                        if (!this.r_Step_1a$esjava$0()) {
                            break lab6;
                        }
                    } while (false);

                    this.cursor = this.limit - v_5;

                    lab7: do {
                        v_6 = this.limit - this.cursor;

                        lab8: do {
                            if (!this.r_exception2$esjava$0()) {
                                break lab8;
                            }

                            break lab7;
                        } while (false);

                        this.cursor = this.limit - v_6;
                        v_7 = this.limit - this.cursor;

                        lab9: do {
                            if (!this.r_Step_1b$esjava$0()) {
                                break lab9;
                            }
                        } while (false);

                        this.cursor = this.limit - v_7;
                        v_8 = this.limit - this.cursor;

                        lab10: do {
                            if (!this.r_Step_1c$esjava$0()) {
                                break lab10;
                            }
                        } while (false);

                        this.cursor = this.limit - v_8;
                        v_9 = this.limit - this.cursor;

                        lab11: do {
                            if (!this.r_Step_2$esjava$0()) {
                                break lab11;
                            }
                        } while (false);

                        this.cursor = this.limit - v_9;
                        v_10 = this.limit - this.cursor;

                        lab12: do {
                            if (!this.r_Step_3$esjava$0()) {
                                break lab12;
                            }
                        } while (false);

                        this.cursor = this.limit - v_10;
                        v_11 = this.limit - this.cursor;

                        lab13: do {
                            if (!this.r_Step_4$esjava$0()) {
                                break lab13;
                            }
                        } while (false);

                        this.cursor = this.limit - v_11;
                        v_12 = this.limit - this.cursor;

                        lab14: do {
                            if (!this.r_Step_5$esjava$0()) {
                                break lab14;
                            }
                        } while (false);

                        this.cursor = this.limit - v_12;
                    } while (false);

                    this.cursor = this.limit_backward;
                    v_13 = this.cursor;

                    lab15: do {
                        if (!this.r_postlude$esjava$0()) {
                            break lab15;
                        }
                    } while (false);

                    this.cursor = v_13;
                } while (false);

                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'B_Y_found',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$B_Y_found') ? this._$esjava$B_Y_found : this._$esjava$B_Y_found = false;
            },
            set: function set(v) {
                this._$esjava$B_Y_found = v;
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete englishStemmer.methodObject;
                return englishStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete englishStemmer.a_0;
                return englishStemmer.a_0 = [new Among("arsen", -1, -1, "", englishStemmer.methodObject), new Among("commun", -1, -1, "", englishStemmer.methodObject), new Among("gener", -1, -1, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete englishStemmer.a_1;
                return englishStemmer.a_1 = [new Among("'", -1, 1, "", englishStemmer.methodObject), new Among("'s'", 0, 1, "", englishStemmer.methodObject), new Among("'s", -1, 1, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete englishStemmer.a_2;
                return englishStemmer.a_2 = [new Among("ied", -1, 2, "", englishStemmer.methodObject), new Among("s", -1, 3, "", englishStemmer.methodObject), new Among("ies", 1, 2, "", englishStemmer.methodObject), new Among("sses", 1, 1, "", englishStemmer.methodObject), new Among("ss", 1, -1, "", englishStemmer.methodObject), new Among("us", 1, -1, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete englishStemmer.a_3;
                return englishStemmer.a_3 = [new Among("", -1, 3, "", englishStemmer.methodObject), new Among("bb", 0, 2, "", englishStemmer.methodObject), new Among("dd", 0, 2, "", englishStemmer.methodObject), new Among("ff", 0, 2, "", englishStemmer.methodObject), new Among("gg", 0, 2, "", englishStemmer.methodObject), new Among("bl", 0, 1, "", englishStemmer.methodObject), new Among("mm", 0, 2, "", englishStemmer.methodObject), new Among("nn", 0, 2, "", englishStemmer.methodObject), new Among("pp", 0, 2, "", englishStemmer.methodObject), new Among("rr", 0, 2, "", englishStemmer.methodObject), new Among("at", 0, 1, "", englishStemmer.methodObject), new Among("tt", 0, 2, "", englishStemmer.methodObject), new Among("iz", 0, 1, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete englishStemmer.a_4;
                return englishStemmer.a_4 = [new Among("ed", -1, 2, "", englishStemmer.methodObject), new Among("eed", 0, 1, "", englishStemmer.methodObject), new Among("ing", -1, 2, "", englishStemmer.methodObject), new Among("edly", -1, 2, "", englishStemmer.methodObject), new Among("eedly", 3, 1, "", englishStemmer.methodObject), new Among("ingly", -1, 2, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete englishStemmer.a_5;
                return englishStemmer.a_5 = [new Among("anci", -1, 3, "", englishStemmer.methodObject), new Among("enci", -1, 2, "", englishStemmer.methodObject), new Among("ogi", -1, 13, "", englishStemmer.methodObject), new Among("li", -1, 16, "", englishStemmer.methodObject), new Among("bli", 3, 12, "", englishStemmer.methodObject), new Among("abli", 4, 4, "", englishStemmer.methodObject), new Among("alli", 3, 8, "", englishStemmer.methodObject), new Among("fulli", 3, 14, "", englishStemmer.methodObject), new Among("lessli", 3, 15, "", englishStemmer.methodObject), new Among("ousli", 3, 10, "", englishStemmer.methodObject), new Among("entli", 3, 5, "", englishStemmer.methodObject), new Among("aliti", -1, 8, "", englishStemmer.methodObject), new Among("biliti", -1, 12, "", englishStemmer.methodObject), new Among("iviti", -1, 11, "", englishStemmer.methodObject), new Among("tional", -1, 1, "", englishStemmer.methodObject), new Among("ational", 14, 7, "", englishStemmer.methodObject), new Among("alism", -1, 8, "", englishStemmer.methodObject), new Among("ation", -1, 7, "", englishStemmer.methodObject), new Among("ization", 17, 6, "", englishStemmer.methodObject), new Among("izer", -1, 6, "", englishStemmer.methodObject), new Among("ator", -1, 7, "", englishStemmer.methodObject), new Among("iveness", -1, 11, "", englishStemmer.methodObject), new Among("fulness", -1, 9, "", englishStemmer.methodObject), new Among("ousness", -1, 10, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete englishStemmer.a_6;
                return englishStemmer.a_6 = [new Among("icate", -1, 4, "", englishStemmer.methodObject), new Among("ative", -1, 6, "", englishStemmer.methodObject), new Among("alize", -1, 3, "", englishStemmer.methodObject), new Among("iciti", -1, 4, "", englishStemmer.methodObject), new Among("ical", -1, 4, "", englishStemmer.methodObject), new Among("tional", -1, 1, "", englishStemmer.methodObject), new Among("ational", 5, 2, "", englishStemmer.methodObject), new Among("ful", -1, 5, "", englishStemmer.methodObject), new Among("ness", -1, 5, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete englishStemmer.a_7;
                return englishStemmer.a_7 = [new Among("ic", -1, 1, "", englishStemmer.methodObject), new Among("ance", -1, 1, "", englishStemmer.methodObject), new Among("ence", -1, 1, "", englishStemmer.methodObject), new Among("able", -1, 1, "", englishStemmer.methodObject), new Among("ible", -1, 1, "", englishStemmer.methodObject), new Among("ate", -1, 1, "", englishStemmer.methodObject), new Among("ive", -1, 1, "", englishStemmer.methodObject), new Among("ize", -1, 1, "", englishStemmer.methodObject), new Among("iti", -1, 1, "", englishStemmer.methodObject), new Among("al", -1, 1, "", englishStemmer.methodObject), new Among("ism", -1, 1, "", englishStemmer.methodObject), new Among("ion", -1, 2, "", englishStemmer.methodObject), new Among("er", -1, 1, "", englishStemmer.methodObject), new Among("ous", -1, 1, "", englishStemmer.methodObject), new Among("ant", -1, 1, "", englishStemmer.methodObject), new Among("ent", -1, 1, "", englishStemmer.methodObject), new Among("ment", 15, 1, "", englishStemmer.methodObject), new Among("ement", 16, 1, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_8',
            get: function get() {
                delete englishStemmer.a_8;
                return englishStemmer.a_8 = [new Among("e", -1, 1, "", englishStemmer.methodObject), new Among("l", -1, 2, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_9',
            get: function get() {
                delete englishStemmer.a_9;
                return englishStemmer.a_9 = [new Among("succeed", -1, -1, "", englishStemmer.methodObject), new Among("proceed", -1, -1, "", englishStemmer.methodObject), new Among("exceed", -1, -1, "", englishStemmer.methodObject), new Among("canning", -1, -1, "", englishStemmer.methodObject), new Among("inning", -1, -1, "", englishStemmer.methodObject), new Among("earring", -1, -1, "", englishStemmer.methodObject), new Among("herring", -1, -1, "", englishStemmer.methodObject), new Among("outing", -1, -1, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'a_10',
            get: function get() {
                delete englishStemmer.a_10;
                return englishStemmer.a_10 = [new Among("andes", -1, -1, "", englishStemmer.methodObject), new Among("atlas", -1, -1, "", englishStemmer.methodObject), new Among("bias", -1, -1, "", englishStemmer.methodObject), new Among("cosmos", -1, -1, "", englishStemmer.methodObject), new Among("dying", -1, 3, "", englishStemmer.methodObject), new Among("early", -1, 9, "", englishStemmer.methodObject), new Among("gently", -1, 7, "", englishStemmer.methodObject), new Among("howe", -1, -1, "", englishStemmer.methodObject), new Among("idly", -1, 6, "", englishStemmer.methodObject), new Among("lying", -1, 4, "", englishStemmer.methodObject), new Among("news", -1, -1, "", englishStemmer.methodObject), new Among("only", -1, 10, "", englishStemmer.methodObject), new Among("singly", -1, 11, "", englishStemmer.methodObject), new Among("skies", -1, 2, "", englishStemmer.methodObject), new Among("skis", -1, 1, "", englishStemmer.methodObject), new Among("sky", -1, -1, "", englishStemmer.methodObject), new Among("tying", -1, 5, "", englishStemmer.methodObject), new Among("ugly", -1, 8, "", englishStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete englishStemmer.g_v;
                return englishStemmer.g_v = [17, 65, 16, 1];
            }
        }, {
            key: 'g_v_WXY',
            get: function get() {
                delete englishStemmer.g_v_WXY;
                return englishStemmer.g_v_WXY = [1, 17, 65, 208, 1];
            }
        }, {
            key: 'g_valid_LI',
            get: function get() {
                delete englishStemmer.g_valid_LI;
                return englishStemmer.g_valid_LI = [55, 141, 2];
            }
        }]);

        return englishStemmer;
    })(SnowballStemmer);

    var finnishStemmer = (function (_SnowballStemmer8) {
        _inherits(finnishStemmer, _SnowballStemmer8);

        function finnishStemmer() {
            _classCallCheck(this, finnishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(finnishStemmer).apply(this, arguments));
        }

        _createClass(finnishStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_3 = undefined;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;

                golab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        if (!this.in_grouping$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                            break lab1;
                        }

                        this.cursor = v_1;
                        break golab0;
                    } while (false);

                    this.cursor = v_1;

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab2: while (true) {
                    lab3: do {
                        if (!this.out_grouping$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                            break lab3;
                        }

                        break golab2;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p1 = this.cursor;

                golab4: while (true) {
                    v_3 = this.cursor;

                    lab5: do {
                        if (!this.in_grouping$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                            break lab5;
                        }

                        this.cursor = v_3;
                        break golab4;
                    } while (false);

                    this.cursor = v_3;

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab6: while (true) {
                    lab7: do {
                        if (!this.out_grouping$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                            break lab7;
                        }

                        break golab6;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p2 = this.cursor;
                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_particle_etc$esjava$0',
            value: function r_particle_etc$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(this.a_0, 10);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.in_grouping_b$esjava$3(finnishStemmer.g_particle_end, 97, 246)) {
                            return false;
                        }

                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        break;
                }

                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_possessive$esjava$0',
            value: function r_possessive$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(this.a_4, 9);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        {
                            v_3 = this.limit - this.cursor;

                            lab0: do {
                                if (!this.eq_s_b$esjava$2(1, "k")) {
                                    break lab0;
                                }

                                return false;
                            } while (false);

                            this.cursor = this.limit - v_3;
                        }
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        this.ket = this.cursor;

                        if (!this.eq_s_b$esjava$2(3, "kse")) {
                            return false;
                        }

                        this.bra = this.cursor;
                        this.slice_from$esjava$1("ksi");
                        break;

                    case 3:
                        this.slice_del$esjava$0();
                        break;

                    case 4:
                        if (this.find_among_b$esjava$2(this.a_1, 6) === 0) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 5:
                        if (this.find_among_b$esjava$2(this.a_2, 6) === 0) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 6:
                        if (this.find_among_b$esjava$2(this.a_3, 2) === 0) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_LONG$esjava$0',
            value: function r_LONG$esjava$0() {
                if (this.find_among_b$esjava$2(this.a_5, 7) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_VI$esjava$0',
            value: function r_VI$esjava$0() {
                if (!this.eq_s_b$esjava$2(1, "i")) {
                    return false;
                }

                if (!this.in_grouping_b$esjava$3(finnishStemmer.g_V2, 97, 246)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_case_ending$esjava$0',
            value: function r_case_ending$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(this.a_6, 30);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.eq_s_b$esjava$2(1, "a")) {
                            return false;
                        }

                        break;

                    case 2:
                        if (!this.eq_s_b$esjava$2(1, "e")) {
                            return false;
                        }

                        break;

                    case 3:
                        if (!this.eq_s_b$esjava$2(1, "i")) {
                            return false;
                        }

                        break;

                    case 4:
                        if (!this.eq_s_b$esjava$2(1, "o")) {
                            return false;
                        }

                        break;

                    case 5:
                        if (!this.eq_s_b$esjava$2(1, '\u00E4')) {
                            return false;
                        }

                        break;

                    case 6:
                        if (!this.eq_s_b$esjava$2(1, '\u00F6')) {
                            return false;
                        }

                        break;

                    case 7:
                        v_3 = this.limit - this.cursor;

                        lab0: do {
                            v_4 = this.limit - this.cursor;

                            lab1: do {
                                v_5 = this.limit - this.cursor;

                                lab2: do {
                                    if (!this.r_LONG$esjava$0()) {
                                        break lab2;
                                    }

                                    break lab1;
                                } while (false);

                                this.cursor = this.limit - v_5;

                                if (!this.eq_s_b$esjava$2(2, "ie")) {
                                    this.cursor = this.limit - v_3;
                                    break lab0;
                                }
                            } while (false);

                            this.cursor = this.limit - v_4;

                            if (this.cursor <= this.limit_backward) {
                                this.cursor = this.limit - v_3;
                                break lab0;
                            }

                            this.cursor--;
                            this.bra = this.cursor;
                        } while (false);

                        break;

                    case 8:
                        if (!this.in_grouping_b$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                            return false;
                        }

                        if (!this.out_grouping_b$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                            return false;
                        }

                        break;

                    case 9:
                        if (!this.eq_s_b$esjava$2(1, "e")) {
                            return false;
                        }

                        break;
                }

                this.slice_del$esjava$0();
                this.B_ending_removed = true;
                return true;
            }
        }, {
            key: 'r_other_endings$esjava$0',
            value: function r_other_endings$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p2) {
                    return false;
                }

                this.cursor = this.I_p2;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(this.a_7, 14);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        {
                            v_3 = this.limit - this.cursor;

                            lab0: do {
                                if (!this.eq_s_b$esjava$2(2, "po")) {
                                    break lab0;
                                }

                                return false;
                            } while (false);

                            this.cursor = this.limit - v_3;
                        }
                        break;
                }

                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_i_plural$esjava$0',
            value: function r_i_plural$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;

                if (this.find_among_b$esjava$2(this.a_8, 2) === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;
                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_t_plural$esjava$0',
            value: function r_t_plural$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;

                if (!this.eq_s_b$esjava$2(1, "t")) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                v_3 = this.limit - this.cursor;

                if (!this.in_grouping_b$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.cursor = this.limit - v_3;
                this.slice_del$esjava$0();
                this.limit_backward = v_2;
                v_4 = this.limit - this.cursor;

                if (this.cursor < this.I_p2) {
                    return false;
                }

                this.cursor = this.I_p2;
                v_5 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_4;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(this.a_9, 2);

                if (among_var === 0) {
                    this.limit_backward = v_5;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_5;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        {
                            v_6 = this.limit - this.cursor;

                            lab0: do {
                                if (!this.eq_s_b$esjava$2(2, "po")) {
                                    break lab0;
                                }

                                return false;
                            } while (false);

                            this.cursor = this.limit - v_6;
                        }
                        break;
                }

                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_tidy$esjava$0',
            value: function r_tidy$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                v_3 = this.limit - this.cursor;

                lab0: do {
                    v_4 = this.limit - this.cursor;

                    if (!this.r_LONG$esjava$0()) {
                        break lab0;
                    }

                    this.cursor = this.limit - v_4;
                    this.ket = this.cursor;

                    if (this.cursor <= this.limit_backward) {
                        break lab0;
                    }

                    this.cursor--;
                    this.bra = this.cursor;
                    this.slice_del$esjava$0();
                } while (false);

                this.cursor = this.limit - v_3;
                v_5 = this.limit - this.cursor;

                lab1: do {
                    this.ket = this.cursor;

                    if (!this.in_grouping_b$esjava$3(finnishStemmer.g_AEI, 97, 228)) {
                        break lab1;
                    }

                    this.bra = this.cursor;

                    if (!this.out_grouping_b$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                        break lab1;
                    }

                    this.slice_del$esjava$0();
                } while (false);

                this.cursor = this.limit - v_5;
                v_6 = this.limit - this.cursor;

                lab2: do {
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(1, "j")) {
                        break lab2;
                    }

                    this.bra = this.cursor;

                    lab3: do {
                        v_7 = this.limit - this.cursor;

                        lab4: do {
                            if (!this.eq_s_b$esjava$2(1, "o")) {
                                break lab4;
                            }

                            break lab3;
                        } while (false);

                        this.cursor = this.limit - v_7;

                        if (!this.eq_s_b$esjava$2(1, "u")) {
                            break lab2;
                        }
                    } while (false);

                    this.slice_del$esjava$0();
                } while (false);

                this.cursor = this.limit - v_6;
                v_8 = this.limit - this.cursor;

                lab5: do {
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(1, "o")) {
                        break lab5;
                    }

                    this.bra = this.cursor;

                    if (!this.eq_s_b$esjava$2(1, "j")) {
                        break lab5;
                    }

                    this.slice_del$esjava$0();
                } while (false);

                this.cursor = this.limit - v_8;
                this.limit_backward = v_2;

                golab6: while (true) {
                    v_9 = this.limit - this.cursor;

                    lab7: do {
                        if (!this.out_grouping_b$esjava$3(finnishStemmer.g_V1, 97, 246)) {
                            break lab7;
                        }

                        this.cursor = this.limit - v_9;
                        break golab6;
                    } while (false);

                    this.cursor = this.limit - v_9;

                    if (this.cursor <= this.limit_backward) {
                        return false;
                    }

                    this.cursor--;
                }

                this.ket = this.cursor;

                if (this.cursor <= this.limit_backward) {
                    return false;
                }

                this.cursor--;
                this.bra = this.cursor;
                this.S_x = this.slice_to$esjava$1(this.S_x);

                if (!this.eq_v_b$esjava$1(this.S_x)) {
                    return false;
                }

                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.B_ending_removed = false;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_particle_etc$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_possessive$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    if (!this.r_case_ending$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                v_5 = this.limit - this.cursor;

                lab4: do {
                    if (!this.r_other_endings$esjava$0()) {
                        break lab4;
                    }
                } while (false);

                this.cursor = this.limit - v_5;

                lab5: do {
                    v_6 = this.limit - this.cursor;

                    lab6: do {
                        if (!this.B_ending_removed) {
                            break lab6;
                        }

                        v_7 = this.limit - this.cursor;

                        lab7: do {
                            if (!this.r_i_plural$esjava$0()) {
                                break lab7;
                            }
                        } while (false);

                        this.cursor = this.limit - v_7;
                        break lab5;
                    } while (false);

                    this.cursor = this.limit - v_6;
                    v_8 = this.limit - this.cursor;

                    lab8: do {
                        if (!this.r_t_plural$esjava$0()) {
                            break lab8;
                        }
                    } while (false);

                    this.cursor = this.limit - v_8;
                } while (false);

                v_9 = this.limit - this.cursor;

                lab9: do {
                    if (!this.r_tidy$esjava$0()) {
                        break lab9;
                    }
                } while (false);

                this.cursor = this.limit - v_9;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'r_LONG',
            value: function r_LONG() {
                return this['r_LONG$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'r_VI',
            value: function r_VI() {
                return this['r_VI$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'methodObject',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$methodObject') ? this._$esjava$methodObject : this._$esjava$methodObject = this;
            },
            set: function set(v) {
                this._$esjava$methodObject = v;
            }
        }, {
            key: 'a_0',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_0') ? this._$esjava$a_0 : this._$esjava$a_0 = [new Among("pa", -1, 1, "", this.methodObject), new Among("sti", -1, 2, "", this.methodObject), new Among("kaan", -1, 1, "", this.methodObject), new Among("han", -1, 1, "", this.methodObject), new Among("kin", -1, 1, "", this.methodObject), new Among('h\u00E4n', -1, 1, "", this.methodObject), new Among('k\u00E4\u00E4n', -1, 1, "", this.methodObject), new Among("ko", -1, 1, "", this.methodObject), new Among('p\u00E4', -1, 1, "", this.methodObject), new Among('k\u00F6', -1, 1, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_0 = v;
            }
        }, {
            key: 'a_1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_1') ? this._$esjava$a_1 : this._$esjava$a_1 = [new Among("lla", -1, -1, "", this.methodObject), new Among("na", -1, -1, "", this.methodObject), new Among("ssa", -1, -1, "", this.methodObject), new Among("ta", -1, -1, "", this.methodObject), new Among("lta", 3, -1, "", this.methodObject), new Among("sta", 3, -1, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_1 = v;
            }
        }, {
            key: 'a_2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_2') ? this._$esjava$a_2 : this._$esjava$a_2 = [new Among('ll\u00E4', -1, -1, "", this.methodObject), new Among('n\u00E4', -1, -1, "", this.methodObject), new Among('ss\u00E4', -1, -1, "", this.methodObject), new Among('t\u00E4', -1, -1, "", this.methodObject), new Among('lt\u00E4', 3, -1, "", this.methodObject), new Among('st\u00E4', 3, -1, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_2 = v;
            }
        }, {
            key: 'a_3',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_3') ? this._$esjava$a_3 : this._$esjava$a_3 = [new Among("lle", -1, -1, "", this.methodObject), new Among("ine", -1, -1, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_3 = v;
            }
        }, {
            key: 'a_4',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_4') ? this._$esjava$a_4 : this._$esjava$a_4 = [new Among("nsa", -1, 3, "", this.methodObject), new Among("mme", -1, 3, "", this.methodObject), new Among("nne", -1, 3, "", this.methodObject), new Among("ni", -1, 2, "", this.methodObject), new Among("si", -1, 1, "", this.methodObject), new Among("an", -1, 4, "", this.methodObject), new Among("en", -1, 6, "", this.methodObject), new Among('\u00E4n', -1, 5, "", this.methodObject), new Among('ns\u00E4', -1, 3, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_4 = v;
            }
        }, {
            key: 'a_5',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_5') ? this._$esjava$a_5 : this._$esjava$a_5 = [new Among("aa", -1, -1, "", this.methodObject), new Among("ee", -1, -1, "", this.methodObject), new Among("ii", -1, -1, "", this.methodObject), new Among("oo", -1, -1, "", this.methodObject), new Among("uu", -1, -1, "", this.methodObject), new Among('\u00E4\u00E4', -1, -1, "", this.methodObject), new Among('\u00F6\u00F6', -1, -1, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_5 = v;
            }
        }, {
            key: 'a_6',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_6') ? this._$esjava$a_6 : this._$esjava$a_6 = [new Among("a", -1, 8, "", this.methodObject), new Among("lla", 0, -1, "", this.methodObject), new Among("na", 0, -1, "", this.methodObject), new Among("ssa", 0, -1, "", this.methodObject), new Among("ta", 0, -1, "", this.methodObject), new Among("lta", 4, -1, "", this.methodObject), new Among("sta", 4, -1, "", this.methodObject), new Among("tta", 4, 9, "", this.methodObject), new Among("lle", -1, -1, "", this.methodObject), new Among("ine", -1, -1, "", this.methodObject), new Among("ksi", -1, -1, "", this.methodObject), new Among("n", -1, 7, "", this.methodObject), new Among("han", 11, 1, "", this.methodObject), new Among("den", 11, -1, "r_VI", this.methodObject), new Among("seen", 11, -1, "r_LONG", this.methodObject), new Among("hen", 11, 2, "", this.methodObject), new Among("tten", 11, -1, "r_VI", this.methodObject), new Among("hin", 11, 3, "", this.methodObject), new Among("siin", 11, -1, "r_VI", this.methodObject), new Among("hon", 11, 4, "", this.methodObject), new Among('h\u00E4n', 11, 5, "", this.methodObject), new Among('h\u00F6n', 11, 6, "", this.methodObject), new Among('\u00E4', -1, 8, "", this.methodObject), new Among('ll\u00E4', 22, -1, "", this.methodObject), new Among('n\u00E4', 22, -1, "", this.methodObject), new Among('ss\u00E4', 22, -1, "", this.methodObject), new Among('t\u00E4', 22, -1, "", this.methodObject), new Among('lt\u00E4', 26, -1, "", this.methodObject), new Among('st\u00E4', 26, -1, "", this.methodObject), new Among('tt\u00E4', 26, 9, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_6 = v;
            }
        }, {
            key: 'a_7',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_7') ? this._$esjava$a_7 : this._$esjava$a_7 = [new Among("eja", -1, -1, "", this.methodObject), new Among("mma", -1, 1, "", this.methodObject), new Among("imma", 1, -1, "", this.methodObject), new Among("mpa", -1, 1, "", this.methodObject), new Among("impa", 3, -1, "", this.methodObject), new Among("mmi", -1, 1, "", this.methodObject), new Among("immi", 5, -1, "", this.methodObject), new Among("mpi", -1, 1, "", this.methodObject), new Among("impi", 7, -1, "", this.methodObject), new Among('ej\u00E4', -1, -1, "", this.methodObject), new Among('mm\u00E4', -1, 1, "", this.methodObject), new Among('imm\u00E4', 10, -1, "", this.methodObject), new Among('mp\u00E4', -1, 1, "", this.methodObject), new Among('imp\u00E4', 12, -1, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_7 = v;
            }
        }, {
            key: 'a_8',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_8') ? this._$esjava$a_8 : this._$esjava$a_8 = [new Among("i", -1, -1, "", this.methodObject), new Among("j", -1, -1, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_8 = v;
            }
        }, {
            key: 'a_9',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$a_9') ? this._$esjava$a_9 : this._$esjava$a_9 = [new Among("mma", -1, 1, "", this.methodObject), new Among("imma", 0, -1, "", this.methodObject)];
            },
            set: function set(v) {
                this._$esjava$a_9 = v;
            }
        }, {
            key: 'B_ending_removed',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$B_ending_removed') ? this._$esjava$B_ending_removed : this._$esjava$B_ending_removed = false;
            },
            set: function set(v) {
                this._$esjava$B_ending_removed = v;
            }
        }, {
            key: 'S_x',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$S_x') ? this._$esjava$S_x : this._$esjava$S_x = new StringBuilder();
            },
            set: function set(v) {
                this._$esjava$S_x = v;
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'g_AEI',
            get: function get() {
                delete finnishStemmer.g_AEI;
                return finnishStemmer.g_AEI = [17, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8];
            }
        }, {
            key: 'g_V1',
            get: function get() {
                delete finnishStemmer.g_V1;
                return finnishStemmer.g_V1 = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32];
            }
        }, {
            key: 'g_V2',
            get: function get() {
                delete finnishStemmer.g_V2;
                return finnishStemmer.g_V2 = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32];
            }
        }, {
            key: 'g_particle_end',
            get: function get() {
                delete finnishStemmer.g_particle_end;
                return finnishStemmer.g_particle_end = [17, 97, 24, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32];
            }
        }]);

        return finnishStemmer;
    })(SnowballStemmer);

    var frenchStemmer = (function (_SnowballStemmer9) {
        _inherits(frenchStemmer, _SnowballStemmer9);

        function frenchStemmer() {
            _classCallCheck(this, frenchStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(frenchStemmer).apply(this, arguments));
        }

        _createClass(frenchStemmer, [{
            key: 'r_prelude$esjava$0',
            value: function r_prelude$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        golab2: while (true) {
                            v_2 = this.cursor;

                            lab3: do {
                                lab4: do {
                                    v_3 = this.cursor;

                                    lab5: do {
                                        if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                            break lab5;
                                        }

                                        this.bra = this.cursor;

                                        lab6: do {
                                            v_4 = this.cursor;

                                            lab7: do {
                                                if (!this.eq_s$esjava$2(1, "u")) {
                                                    break lab7;
                                                }

                                                this.ket = this.cursor;

                                                if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                                    break lab7;
                                                }

                                                this.slice_from$esjava$1("U");
                                                break lab6;
                                            } while (false);

                                            this.cursor = v_4;

                                            lab8: do {
                                                if (!this.eq_s$esjava$2(1, "i")) {
                                                    break lab8;
                                                }

                                                this.ket = this.cursor;

                                                if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                                    break lab8;
                                                }

                                                this.slice_from$esjava$1("I");
                                                break lab6;
                                            } while (false);

                                            this.cursor = v_4;

                                            if (!this.eq_s$esjava$2(1, "y")) {
                                                break lab5;
                                            }

                                            this.ket = this.cursor;
                                            this.slice_from$esjava$1("Y");
                                        } while (false);

                                        break lab4;
                                    } while (false);

                                    this.cursor = v_3;

                                    lab9: do {
                                        this.bra = this.cursor;

                                        if (!this.eq_s$esjava$2(1, "y")) {
                                            break lab9;
                                        }

                                        this.ket = this.cursor;

                                        if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                            break lab9;
                                        }

                                        this.slice_from$esjava$1("Y");
                                        break lab4;
                                    } while (false);

                                    this.cursor = v_3;

                                    if (!this.eq_s$esjava$2(1, "q")) {
                                        break lab3;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.eq_s$esjava$2(1, "u")) {
                                        break lab3;
                                    }

                                    this.ket = this.cursor;
                                    this.slice_from$esjava$1("U");
                                } while (false);

                                this.cursor = v_2;
                                break golab2;
                            } while (false);

                            this.cursor = v_2;

                            if (this.cursor >= this.limit) {
                                break lab1;
                            }

                            this.cursor++;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_4 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                break lab2;
                            }

                            if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                break lab2;
                            }

                            if (this.cursor >= this.limit) {
                                break lab2;
                            }

                            this.cursor++;
                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        lab3: do {
                            if (this.find_among$esjava$2(frenchStemmer.a_0, 3) === 0) {
                                break lab3;
                            }

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;

                        golab4: while (true) {
                            lab5: do {
                                if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                    break lab5;
                                }

                                break golab4;
                            } while (false);

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        }
                    } while (false);

                    this.I_pV = this.cursor;
                } while (false);

                this.cursor = v_1;
                v_4 = this.cursor;

                lab6: do {
                    golab7: while (true) {
                        lab8: do {
                            if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                break lab8;
                            }

                            break golab7;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab6;
                        }

                        this.cursor++;
                    }

                    golab9: while (true) {
                        lab10: do {
                            if (!this.out_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                break lab10;
                            }

                            break golab9;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab6;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab11: while (true) {
                        lab12: do {
                            if (!this.in_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                break lab12;
                            }

                            break golab11;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab6;
                        }

                        this.cursor++;
                    }

                    golab13: while (true) {
                        lab14: do {
                            if (!this.out_grouping$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                break lab14;
                            }

                            break golab13;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab6;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_4;
                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(frenchStemmer.a_1, 4);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("i");
                                break;

                            case 2:
                                this.slice_from$esjava$1("u");
                                break;

                            case 3:
                                this.slice_from$esjava$1("y");
                                break;

                            case 4:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(frenchStemmer.a_4, 43);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "ic")) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.bra = this.cursor;

                            lab1: do {
                                v_2 = this.limit - this.cursor;

                                lab2: do {
                                    if (!this.r_R2$esjava$0()) {
                                        break lab2;
                                    }

                                    this.slice_del$esjava$0();
                                    break lab1;
                                } while (false);

                                this.cursor = this.limit - v_2;
                                this.slice_from$esjava$1("iqU");
                            } while (false);
                        } while (false);

                        break;

                    case 3:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("log");
                        break;

                    case 4:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("u");
                        break;

                    case 5:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ent");
                        break;

                    case 6:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;

                        lab3: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(frenchStemmer.a_2, 6);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_3;
                                break lab3;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_3;
                                    break lab3;

                                case 1:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_3;
                                        break lab3;
                                    }

                                    this.slice_del$esjava$0();
                                    this.ket = this.cursor;

                                    if (!this.eq_s_b$esjava$2(2, "at")) {
                                        this.cursor = this.limit - v_3;
                                        break lab3;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_3;
                                        break lab3;
                                    }

                                    this.slice_del$esjava$0();
                                    break;

                                case 2:
                                    lab4: do {
                                        v_4 = this.limit - this.cursor;

                                        lab5: do {
                                            if (!this.r_R2$esjava$0()) {
                                                break lab5;
                                            }

                                            this.slice_del$esjava$0();
                                            break lab4;
                                        } while (false);

                                        this.cursor = this.limit - v_4;

                                        if (!this.r_R1$esjava$0()) {
                                            this.cursor = this.limit - v_3;
                                            break lab3;
                                        }

                                        this.slice_from$esjava$1("eux");
                                    } while (false);

                                    break;

                                case 3:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_3;
                                        break lab3;
                                    }

                                    this.slice_del$esjava$0();
                                    break;

                                case 4:
                                    if (!this.r_RV$esjava$0()) {
                                        this.cursor = this.limit - v_3;
                                        break lab3;
                                    }

                                    this.slice_from$esjava$1("i");
                                    break;
                            }
                        } while (false);

                        break;

                    case 7:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_5 = this.limit - this.cursor;

                        lab6: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(frenchStemmer.a_3, 3);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_5;
                                break lab6;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_5;
                                    break lab6;

                                case 1:
                                    lab7: do {
                                        v_6 = this.limit - this.cursor;

                                        lab8: do {
                                            if (!this.r_R2$esjava$0()) {
                                                break lab8;
                                            }

                                            this.slice_del$esjava$0();
                                            break lab7;
                                        } while (false);

                                        this.cursor = this.limit - v_6;
                                        this.slice_from$esjava$1("abl");
                                    } while (false);

                                    break;

                                case 2:
                                    lab9: do {
                                        v_7 = this.limit - this.cursor;

                                        lab10: do {
                                            if (!this.r_R2$esjava$0()) {
                                                break lab10;
                                            }

                                            this.slice_del$esjava$0();
                                            break lab9;
                                        } while (false);

                                        this.cursor = this.limit - v_7;
                                        this.slice_from$esjava$1("iqU");
                                    } while (false);

                                    break;

                                case 3:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_5;
                                        break lab6;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 8:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_8 = this.limit - this.cursor;

                        lab11: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "at")) {
                                this.cursor = this.limit - v_8;
                                break lab11;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_8;
                                break lab11;
                            }

                            this.slice_del$esjava$0();
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "ic")) {
                                this.cursor = this.limit - v_8;
                                break lab11;
                            }

                            this.bra = this.cursor;

                            lab12: do {
                                v_9 = this.limit - this.cursor;

                                lab13: do {
                                    if (!this.r_R2$esjava$0()) {
                                        break lab13;
                                    }

                                    this.slice_del$esjava$0();
                                    break lab12;
                                } while (false);

                                this.cursor = this.limit - v_9;
                                this.slice_from$esjava$1("iqU");
                            } while (false);
                        } while (false);

                        break;

                    case 9:
                        this.slice_from$esjava$1("eau");
                        break;

                    case 10:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("al");
                        break;

                    case 11:
                        lab14: do {
                            v_10 = this.limit - this.cursor;

                            lab15: do {
                                if (!this.r_R2$esjava$0()) {
                                    break lab15;
                                }

                                this.slice_del$esjava$0();
                                break lab14;
                            } while (false);

                            this.cursor = this.limit - v_10;

                            if (!this.r_R1$esjava$0()) {
                                return false;
                            }

                            this.slice_from$esjava$1("eux");
                        } while (false);

                        break;

                    case 12:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        if (!this.out_grouping_b$esjava$3(frenchStemmer.g_v, 97, 251)) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 13:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ant");
                        return false;

                    case 14:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ent");
                        return false;

                    case 15:
                        v_11 = this.limit - this.cursor;

                        if (!this.in_grouping_b$esjava$3(frenchStemmer.g_v, 97, 251)) {
                            return false;
                        }

                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.cursor = this.limit - v_11;
                        this.slice_del$esjava$0();
                        return false;
                }

                return true;
            }
        }, {
            key: 'r_i_verb_suffix$esjava$0',
            value: function r_i_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(frenchStemmer.a_5, 35);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        this.limit_backward = v_2;
                        return false;

                    case 1:
                        if (!this.out_grouping_b$esjava$3(frenchStemmer.g_v, 97, 251)) {
                            this.limit_backward = v_2;
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                this.limit_backward = v_2;
                return true;
            }
        }, {
            key: 'r_verb_suffix$esjava$0',
            value: function r_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(frenchStemmer.a_6, 38);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        this.limit_backward = v_2;
                        return false;

                    case 1:
                        if (!this.r_R2$esjava$0()) {
                            this.limit_backward = v_2;
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        break;

                    case 3:
                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;

                        lab0: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(1, "e")) {
                                this.cursor = this.limit - v_3;
                                break lab0;
                            }

                            this.bra = this.cursor;
                            this.slice_del$esjava$0();
                        } while (false);

                        break;
                }

                this.limit_backward = v_2;
                return true;
            }
        }, {
            key: 'r_residual_suffix$esjava$0',
            value: function r_residual_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(1, "s")) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.bra = this.cursor;
                    v_2 = this.limit - this.cursor;

                    if (!this.out_grouping_b$esjava$3(frenchStemmer.g_keep_with_s, 97, 232)) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.cursor = this.limit - v_2;
                    this.slice_del$esjava$0();
                } while (false);

                v_3 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_4 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_3;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(frenchStemmer.a_7, 7);

                if (among_var === 0) {
                    this.limit_backward = v_4;
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        this.limit_backward = v_4;
                        return false;

                    case 1:
                        if (!this.r_R2$esjava$0()) {
                            this.limit_backward = v_4;
                            return false;
                        }

                        lab1: do {
                            v_5 = this.limit - this.cursor;

                            lab2: do {
                                if (!this.eq_s_b$esjava$2(1, "s")) {
                                    break lab2;
                                }

                                break lab1;
                            } while (false);

                            this.cursor = this.limit - v_5;

                            if (!this.eq_s_b$esjava$2(1, "t")) {
                                this.limit_backward = v_4;
                                return false;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("i");
                        break;

                    case 3:
                        this.slice_del$esjava$0();
                        break;

                    case 4:
                        if (!this.eq_s_b$esjava$2(2, "gu")) {
                            this.limit_backward = v_4;
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                this.limit_backward = v_4;
                return true;
            }
        }, {
            key: 'r_un_double$esjava$0',
            value: function r_un_double$esjava$0() {
                var v_1 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.find_among_b$esjava$2(frenchStemmer.a_8, 5) === 0) {
                    return false;
                }

                this.cursor = this.limit - v_1;
                this.ket = this.cursor;

                if (this.cursor <= this.limit_backward) {
                    return false;
                }

                this.cursor--;
                this.bra = this.cursor;
                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_un_accent$esjava$0',
            value: function r_un_accent$esjava$0() {
                var v_3 = undefined;
                {
                    var v_1 = 1;

                    replab0: while (true) {
                        lab1: do {
                            if (!this.out_grouping_b$esjava$3(frenchStemmer.g_v, 97, 251)) {
                                break lab1;
                            }

                            v_1--;
                            continue replab0;
                        } while (false);

                        break replab0;
                    }

                    if (v_1 > 0) {
                        return false;
                    }
                }
                this.ket = this.cursor;

                lab2: do {
                    v_3 = this.limit - this.cursor;

                    lab3: do {
                        if (!this.eq_s_b$esjava$2(1, '\u00E9')) {
                            break lab3;
                        }

                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    if (!this.eq_s_b$esjava$2(1, '\u00E8')) {
                        return false;
                    }
                } while (false);

                this.bra = this.cursor;
                this.slice_from$esjava$1("e");
                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_prelude$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = v_2;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    lab3: do {
                        v_4 = this.limit - this.cursor;

                        lab4: do {
                            v_5 = this.limit - this.cursor;

                            lab5: do {
                                v_6 = this.limit - this.cursor;

                                lab6: do {
                                    if (!this.r_standard_suffix$esjava$0()) {
                                        break lab6;
                                    }

                                    break lab5;
                                } while (false);

                                this.cursor = this.limit - v_6;

                                lab7: do {
                                    if (!this.r_i_verb_suffix$esjava$0()) {
                                        break lab7;
                                    }

                                    break lab5;
                                } while (false);

                                this.cursor = this.limit - v_6;

                                if (!this.r_verb_suffix$esjava$0()) {
                                    break lab4;
                                }
                            } while (false);

                            this.cursor = this.limit - v_5;
                            v_7 = this.limit - this.cursor;

                            lab8: do {
                                this.ket = this.cursor;

                                lab9: do {
                                    v_8 = this.limit - this.cursor;

                                    lab10: do {
                                        if (!this.eq_s_b$esjava$2(1, "Y")) {
                                            break lab10;
                                        }

                                        this.bra = this.cursor;
                                        this.slice_from$esjava$1("i");
                                        break lab9;
                                    } while (false);

                                    this.cursor = this.limit - v_8;

                                    if (!this.eq_s_b$esjava$2(1, '\u00E7')) {
                                        this.cursor = this.limit - v_7;
                                        break lab8;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_from$esjava$1("c");
                                } while (false);
                            } while (false);

                            break lab3;
                        } while (false);

                        this.cursor = this.limit - v_4;

                        if (!this.r_residual_suffix$esjava$0()) {
                            break lab2;
                        }
                    } while (false);
                } while (false);

                this.cursor = this.limit - v_3;
                v_9 = this.limit - this.cursor;

                lab11: do {
                    if (!this.r_un_double$esjava$0()) {
                        break lab11;
                    }
                } while (false);

                this.cursor = this.limit - v_9;
                v_10 = this.limit - this.cursor;

                lab12: do {
                    if (!this.r_un_accent$esjava$0()) {
                        break lab12;
                    }
                } while (false);

                this.cursor = this.limit - v_10;
                this.cursor = this.limit_backward;
                v_11 = this.cursor;

                lab13: do {
                    if (!this.r_postlude$esjava$0()) {
                        break lab13;
                    }
                } while (false);

                this.cursor = v_11;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete frenchStemmer.methodObject;
                return frenchStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete frenchStemmer.a_0;
                return frenchStemmer.a_0 = [new Among("col", -1, -1, "", frenchStemmer.methodObject), new Among("par", -1, -1, "", frenchStemmer.methodObject), new Among("tap", -1, -1, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete frenchStemmer.a_1;
                return frenchStemmer.a_1 = [new Among("", -1, 4, "", frenchStemmer.methodObject), new Among("I", 0, 1, "", frenchStemmer.methodObject), new Among("U", 0, 2, "", frenchStemmer.methodObject), new Among("Y", 0, 3, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete frenchStemmer.a_2;
                return frenchStemmer.a_2 = [new Among("iqU", -1, 3, "", frenchStemmer.methodObject), new Among("abl", -1, 3, "", frenchStemmer.methodObject), new Among('I\u00E8r', -1, 4, "", frenchStemmer.methodObject), new Among('i\u00E8r', -1, 4, "", frenchStemmer.methodObject), new Among("eus", -1, 2, "", frenchStemmer.methodObject), new Among("iv", -1, 1, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete frenchStemmer.a_3;
                return frenchStemmer.a_3 = [new Among("ic", -1, 2, "", frenchStemmer.methodObject), new Among("abil", -1, 1, "", frenchStemmer.methodObject), new Among("iv", -1, 3, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete frenchStemmer.a_4;
                return frenchStemmer.a_4 = [new Among("iqUe", -1, 1, "", frenchStemmer.methodObject), new Among("atrice", -1, 2, "", frenchStemmer.methodObject), new Among("ance", -1, 1, "", frenchStemmer.methodObject), new Among("ence", -1, 5, "", frenchStemmer.methodObject), new Among("logie", -1, 3, "", frenchStemmer.methodObject), new Among("able", -1, 1, "", frenchStemmer.methodObject), new Among("isme", -1, 1, "", frenchStemmer.methodObject), new Among("euse", -1, 11, "", frenchStemmer.methodObject), new Among("iste", -1, 1, "", frenchStemmer.methodObject), new Among("ive", -1, 8, "", frenchStemmer.methodObject), new Among("if", -1, 8, "", frenchStemmer.methodObject), new Among("usion", -1, 4, "", frenchStemmer.methodObject), new Among("ation", -1, 2, "", frenchStemmer.methodObject), new Among("ution", -1, 4, "", frenchStemmer.methodObject), new Among("ateur", -1, 2, "", frenchStemmer.methodObject), new Among("iqUes", -1, 1, "", frenchStemmer.methodObject), new Among("atrices", -1, 2, "", frenchStemmer.methodObject), new Among("ances", -1, 1, "", frenchStemmer.methodObject), new Among("ences", -1, 5, "", frenchStemmer.methodObject), new Among("logies", -1, 3, "", frenchStemmer.methodObject), new Among("ables", -1, 1, "", frenchStemmer.methodObject), new Among("ismes", -1, 1, "", frenchStemmer.methodObject), new Among("euses", -1, 11, "", frenchStemmer.methodObject), new Among("istes", -1, 1, "", frenchStemmer.methodObject), new Among("ives", -1, 8, "", frenchStemmer.methodObject), new Among("ifs", -1, 8, "", frenchStemmer.methodObject), new Among("usions", -1, 4, "", frenchStemmer.methodObject), new Among("ations", -1, 2, "", frenchStemmer.methodObject), new Among("utions", -1, 4, "", frenchStemmer.methodObject), new Among("ateurs", -1, 2, "", frenchStemmer.methodObject), new Among("ments", -1, 15, "", frenchStemmer.methodObject), new Among("ements", 30, 6, "", frenchStemmer.methodObject), new Among("issements", 31, 12, "", frenchStemmer.methodObject), new Among('it\u00E9s', -1, 7, "", frenchStemmer.methodObject), new Among("ment", -1, 15, "", frenchStemmer.methodObject), new Among("ement", 34, 6, "", frenchStemmer.methodObject), new Among("issement", 35, 12, "", frenchStemmer.methodObject), new Among("amment", 34, 13, "", frenchStemmer.methodObject), new Among("emment", 34, 14, "", frenchStemmer.methodObject), new Among("aux", -1, 10, "", frenchStemmer.methodObject), new Among("eaux", 39, 9, "", frenchStemmer.methodObject), new Among("eux", -1, 1, "", frenchStemmer.methodObject), new Among('it\u00E9', -1, 7, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete frenchStemmer.a_5;
                return frenchStemmer.a_5 = [new Among("ira", -1, 1, "", frenchStemmer.methodObject), new Among("ie", -1, 1, "", frenchStemmer.methodObject), new Among("isse", -1, 1, "", frenchStemmer.methodObject), new Among("issante", -1, 1, "", frenchStemmer.methodObject), new Among("i", -1, 1, "", frenchStemmer.methodObject), new Among("irai", 4, 1, "", frenchStemmer.methodObject), new Among("ir", -1, 1, "", frenchStemmer.methodObject), new Among("iras", -1, 1, "", frenchStemmer.methodObject), new Among("ies", -1, 1, "", frenchStemmer.methodObject), new Among('\u00EEmes', -1, 1, "", frenchStemmer.methodObject), new Among("isses", -1, 1, "", frenchStemmer.methodObject), new Among("issantes", -1, 1, "", frenchStemmer.methodObject), new Among('\u00EEtes', -1, 1, "", frenchStemmer.methodObject), new Among("is", -1, 1, "", frenchStemmer.methodObject), new Among("irais", 13, 1, "", frenchStemmer.methodObject), new Among("issais", 13, 1, "", frenchStemmer.methodObject), new Among("irions", -1, 1, "", frenchStemmer.methodObject), new Among("issions", -1, 1, "", frenchStemmer.methodObject), new Among("irons", -1, 1, "", frenchStemmer.methodObject), new Among("issons", -1, 1, "", frenchStemmer.methodObject), new Among("issants", -1, 1, "", frenchStemmer.methodObject), new Among("it", -1, 1, "", frenchStemmer.methodObject), new Among("irait", 21, 1, "", frenchStemmer.methodObject), new Among("issait", 21, 1, "", frenchStemmer.methodObject), new Among("issant", -1, 1, "", frenchStemmer.methodObject), new Among("iraIent", -1, 1, "", frenchStemmer.methodObject), new Among("issaIent", -1, 1, "", frenchStemmer.methodObject), new Among("irent", -1, 1, "", frenchStemmer.methodObject), new Among("issent", -1, 1, "", frenchStemmer.methodObject), new Among("iront", -1, 1, "", frenchStemmer.methodObject), new Among('\u00EEt', -1, 1, "", frenchStemmer.methodObject), new Among("iriez", -1, 1, "", frenchStemmer.methodObject), new Among("issiez", -1, 1, "", frenchStemmer.methodObject), new Among("irez", -1, 1, "", frenchStemmer.methodObject), new Among("issez", -1, 1, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete frenchStemmer.a_6;
                return frenchStemmer.a_6 = [new Among("a", -1, 3, "", frenchStemmer.methodObject), new Among("era", 0, 2, "", frenchStemmer.methodObject), new Among("asse", -1, 3, "", frenchStemmer.methodObject), new Among("ante", -1, 3, "", frenchStemmer.methodObject), new Among('\u00E9e', -1, 2, "", frenchStemmer.methodObject), new Among("ai", -1, 3, "", frenchStemmer.methodObject), new Among("erai", 5, 2, "", frenchStemmer.methodObject), new Among("er", -1, 2, "", frenchStemmer.methodObject), new Among("as", -1, 3, "", frenchStemmer.methodObject), new Among("eras", 8, 2, "", frenchStemmer.methodObject), new Among('\u00E2mes', -1, 3, "", frenchStemmer.methodObject), new Among("asses", -1, 3, "", frenchStemmer.methodObject), new Among("antes", -1, 3, "", frenchStemmer.methodObject), new Among('\u00E2tes', -1, 3, "", frenchStemmer.methodObject), new Among('\u00E9es', -1, 2, "", frenchStemmer.methodObject), new Among("ais", -1, 3, "", frenchStemmer.methodObject), new Among("erais", 15, 2, "", frenchStemmer.methodObject), new Among("ions", -1, 1, "", frenchStemmer.methodObject), new Among("erions", 17, 2, "", frenchStemmer.methodObject), new Among("assions", 17, 3, "", frenchStemmer.methodObject), new Among("erons", -1, 2, "", frenchStemmer.methodObject), new Among("ants", -1, 3, "", frenchStemmer.methodObject), new Among('\u00E9s', -1, 2, "", frenchStemmer.methodObject), new Among("ait", -1, 3, "", frenchStemmer.methodObject), new Among("erait", 23, 2, "", frenchStemmer.methodObject), new Among("ant", -1, 3, "", frenchStemmer.methodObject), new Among("aIent", -1, 3, "", frenchStemmer.methodObject), new Among("eraIent", 26, 2, "", frenchStemmer.methodObject), new Among('\u00E8rent', -1, 2, "", frenchStemmer.methodObject), new Among("assent", -1, 3, "", frenchStemmer.methodObject), new Among("eront", -1, 2, "", frenchStemmer.methodObject), new Among('\u00E2t', -1, 3, "", frenchStemmer.methodObject), new Among("ez", -1, 2, "", frenchStemmer.methodObject), new Among("iez", 32, 2, "", frenchStemmer.methodObject), new Among("eriez", 33, 2, "", frenchStemmer.methodObject), new Among("assiez", 33, 3, "", frenchStemmer.methodObject), new Among("erez", 32, 2, "", frenchStemmer.methodObject), new Among('\u00E9', -1, 2, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete frenchStemmer.a_7;
                return frenchStemmer.a_7 = [new Among("e", -1, 3, "", frenchStemmer.methodObject), new Among('I\u00E8re', 0, 2, "", frenchStemmer.methodObject), new Among('i\u00E8re', 0, 2, "", frenchStemmer.methodObject), new Among("ion", -1, 1, "", frenchStemmer.methodObject), new Among("Ier", -1, 2, "", frenchStemmer.methodObject), new Among("ier", -1, 2, "", frenchStemmer.methodObject), new Among('\u00EB', -1, 4, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'a_8',
            get: function get() {
                delete frenchStemmer.a_8;
                return frenchStemmer.a_8 = [new Among("ell", -1, -1, "", frenchStemmer.methodObject), new Among("eill", -1, -1, "", frenchStemmer.methodObject), new Among("enn", -1, -1, "", frenchStemmer.methodObject), new Among("onn", -1, -1, "", frenchStemmer.methodObject), new Among("ett", -1, -1, "", frenchStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete frenchStemmer.g_v;
                return frenchStemmer.g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 130, 103, 8, 5];
            }
        }, {
            key: 'g_keep_with_s',
            get: function get() {
                delete frenchStemmer.g_keep_with_s;
                return frenchStemmer.g_keep_with_s = [1, 65, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128];
            }
        }]);

        return frenchStemmer;
    })(SnowballStemmer);

    var germanStemmer = (function (_SnowballStemmer10) {
        _inherits(germanStemmer, _SnowballStemmer10);

        function germanStemmer() {
            _classCallCheck(this, germanStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(germanStemmer).apply(this, arguments));
        }

        _createClass(germanStemmer, [{
            key: 'r_prelude$esjava$0',
            value: function r_prelude$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                v_1 = this.cursor;

                replab0: while (true) {
                    v_2 = this.cursor;

                    lab1: do {
                        lab2: do {
                            v_3 = this.cursor;

                            lab3: do {
                                this.bra = this.cursor;

                                if (!this.eq_s$esjava$2(1, '\u00DF')) {
                                    break lab3;
                                }

                                this.ket = this.cursor;
                                this.slice_from$esjava$1("ss");
                                break lab2;
                            } while (false);

                            this.cursor = v_3;

                            if (this.cursor >= this.limit) {
                                break lab1;
                            }

                            this.cursor++;
                        } while (false);

                        continue replab0;
                    } while (false);

                    this.cursor = v_2;
                    break replab0;
                }

                this.cursor = v_1;

                replab4: while (true) {
                    v_4 = this.cursor;

                    lab5: do {
                        golab6: while (true) {
                            v_5 = this.cursor;

                            lab7: do {
                                if (!this.in_grouping$esjava$3(germanStemmer.g_v, 97, 252)) {
                                    break lab7;
                                }

                                this.bra = this.cursor;

                                lab8: do {
                                    v_6 = this.cursor;

                                    lab9: do {
                                        if (!this.eq_s$esjava$2(1, "u")) {
                                            break lab9;
                                        }

                                        this.ket = this.cursor;

                                        if (!this.in_grouping$esjava$3(germanStemmer.g_v, 97, 252)) {
                                            break lab9;
                                        }

                                        this.slice_from$esjava$1("U");
                                        break lab8;
                                    } while (false);

                                    this.cursor = v_6;

                                    if (!this.eq_s$esjava$2(1, "y")) {
                                        break lab7;
                                    }

                                    this.ket = this.cursor;

                                    if (!this.in_grouping$esjava$3(germanStemmer.g_v, 97, 252)) {
                                        break lab7;
                                    }

                                    this.slice_from$esjava$1("Y");
                                } while (false);

                                this.cursor = v_5;
                                break golab6;
                            } while (false);

                            this.cursor = v_5;

                            if (this.cursor >= this.limit) {
                                break lab5;
                            }

                            this.cursor++;
                        }

                        continue replab4;
                    } while (false);

                    this.cursor = v_4;
                    break replab4;
                }

                return true;
            }
        }, {
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;
                {
                    var c = this.cursor + 3;

                    if (0 > c || c > this.limit) {
                        return false;
                    }

                    this.cursor = c;
                }
                this.I_x = this.cursor;
                this.cursor = v_1;

                golab0: while (true) {
                    lab1: do {
                        if (!this.in_grouping$esjava$3(germanStemmer.g_v, 97, 252)) {
                            break lab1;
                        }

                        break golab0;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab2: while (true) {
                    lab3: do {
                        if (!this.out_grouping$esjava$3(germanStemmer.g_v, 97, 252)) {
                            break lab3;
                        }

                        break golab2;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p1 = this.cursor;

                lab4: do {
                    if (!(this.I_p1 < this.I_x)) {
                        break lab4;
                    }

                    this.I_p1 = this.I_x;
                } while (false);

                golab5: while (true) {
                    lab6: do {
                        if (!this.in_grouping$esjava$3(germanStemmer.g_v, 97, 252)) {
                            break lab6;
                        }

                        break golab5;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab7: while (true) {
                    lab8: do {
                        if (!this.out_grouping$esjava$3(germanStemmer.g_v, 97, 252)) {
                            break lab8;
                        }

                        break golab7;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p2 = this.cursor;
                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(germanStemmer.a_0, 6);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("y");
                                break;

                            case 2:
                                this.slice_from$esjava$1("u");
                                break;

                            case 3:
                                this.slice_from$esjava$1("a");
                                break;

                            case 4:
                                this.slice_from$esjava$1("o");
                                break;

                            case 5:
                                this.slice_from$esjava$1("u");
                                break;

                            case 6:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    this.ket = this.cursor;
                    among_var = this.find_among_b$esjava$2(germanStemmer.a_1, 7);

                    if (among_var === 0) {
                        break lab0;
                    }

                    this.bra = this.cursor;

                    if (!this.r_R1$esjava$0()) {
                        break lab0;
                    }

                    switch (among_var) {
                        case 0:
                            break lab0;

                        case 1:
                            this.slice_del$esjava$0();
                            break;

                        case 2:
                            this.slice_del$esjava$0();
                            v_2 = this.limit - this.cursor;

                            lab1: do {
                                this.ket = this.cursor;

                                if (!this.eq_s_b$esjava$2(1, "s")) {
                                    this.cursor = this.limit - v_2;
                                    break lab1;
                                }

                                this.bra = this.cursor;

                                if (!this.eq_s_b$esjava$2(3, "nis")) {
                                    this.cursor = this.limit - v_2;
                                    break lab1;
                                }

                                this.slice_del$esjava$0();
                            } while (false);

                            break;

                        case 3:
                            if (!this.in_grouping_b$esjava$3(germanStemmer.g_s_ending, 98, 116)) {
                                break lab0;
                            }

                            this.slice_del$esjava$0();
                            break;
                    }
                } while (false);

                this.cursor = this.limit - v_1;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    this.ket = this.cursor;
                    among_var = this.find_among_b$esjava$2(germanStemmer.a_2, 4);

                    if (among_var === 0) {
                        break lab2;
                    }

                    this.bra = this.cursor;

                    if (!this.r_R1$esjava$0()) {
                        break lab2;
                    }

                    switch (among_var) {
                        case 0:
                            break lab2;

                        case 1:
                            this.slice_del$esjava$0();
                            break;

                        case 2:
                            if (!this.in_grouping_b$esjava$3(germanStemmer.g_st_ending, 98, 116)) {
                                break lab2;
                            }

                            {
                                var c = this.cursor - 3;

                                if (this.limit_backward > c || c > this.limit) {
                                    break lab2;
                                }

                                this.cursor = c;
                            }
                            this.slice_del$esjava$0();
                            break;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    this.ket = this.cursor;
                    among_var = this.find_among_b$esjava$2(germanStemmer.a_4, 8);

                    if (among_var === 0) {
                        break lab3;
                    }

                    this.bra = this.cursor;

                    if (!this.r_R2$esjava$0()) {
                        break lab3;
                    }

                    switch (among_var) {
                        case 0:
                            break lab3;

                        case 1:
                            this.slice_del$esjava$0();
                            v_5 = this.limit - this.cursor;

                            lab4: do {
                                this.ket = this.cursor;

                                if (!this.eq_s_b$esjava$2(2, "ig")) {
                                    this.cursor = this.limit - v_5;
                                    break lab4;
                                }

                                this.bra = this.cursor;
                                {
                                    v_6 = this.limit - this.cursor;

                                    lab5: do {
                                        if (!this.eq_s_b$esjava$2(1, "e")) {
                                            break lab5;
                                        }

                                        this.cursor = this.limit - v_5;
                                        break lab4;
                                    } while (false);

                                    this.cursor = this.limit - v_6;
                                }

                                if (!this.r_R2$esjava$0()) {
                                    this.cursor = this.limit - v_5;
                                    break lab4;
                                }

                                this.slice_del$esjava$0();
                            } while (false);

                            break;

                        case 2:
                            {
                                v_7 = this.limit - this.cursor;

                                lab6: do {
                                    if (!this.eq_s_b$esjava$2(1, "e")) {
                                        break lab6;
                                    }

                                    break lab3;
                                } while (false);

                                this.cursor = this.limit - v_7;
                            }
                            this.slice_del$esjava$0();
                            break;

                        case 3:
                            this.slice_del$esjava$0();
                            v_8 = this.limit - this.cursor;

                            lab7: do {
                                this.ket = this.cursor;

                                lab8: do {
                                    v_9 = this.limit - this.cursor;

                                    lab9: do {
                                        if (!this.eq_s_b$esjava$2(2, "er")) {
                                            break lab9;
                                        }

                                        break lab8;
                                    } while (false);

                                    this.cursor = this.limit - v_9;

                                    if (!this.eq_s_b$esjava$2(2, "en")) {
                                        this.cursor = this.limit - v_8;
                                        break lab7;
                                    }
                                } while (false);

                                this.bra = this.cursor;

                                if (!this.r_R1$esjava$0()) {
                                    this.cursor = this.limit - v_8;
                                    break lab7;
                                }

                                this.slice_del$esjava$0();
                            } while (false);

                            break;

                        case 4:
                            this.slice_del$esjava$0();
                            v_10 = this.limit - this.cursor;

                            lab10: do {
                                this.ket = this.cursor;
                                among_var = this.find_among_b$esjava$2(germanStemmer.a_3, 2);

                                if (among_var === 0) {
                                    this.cursor = this.limit - v_10;
                                    break lab10;
                                }

                                this.bra = this.cursor;

                                if (!this.r_R2$esjava$0()) {
                                    this.cursor = this.limit - v_10;
                                    break lab10;
                                }

                                switch (among_var) {
                                    case 0:
                                        this.cursor = this.limit - v_10;
                                        break lab10;

                                    case 1:
                                        this.slice_del$esjava$0();
                                        break;
                                }
                            } while (false);

                            break;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_prelude$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = v_2;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_standard_suffix$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                this.cursor = this.limit_backward;
                v_4 = this.cursor;

                lab3: do {
                    if (!this.r_postlude$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = v_4;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_x',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_x') ? this._$esjava$I_x : this._$esjava$I_x = 0;
            },
            set: function set(v) {
                this._$esjava$I_x = v;
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete germanStemmer.methodObject;
                return germanStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete germanStemmer.a_0;
                return germanStemmer.a_0 = [new Among("", -1, 6, "", germanStemmer.methodObject), new Among("U", 0, 2, "", germanStemmer.methodObject), new Among("Y", 0, 1, "", germanStemmer.methodObject), new Among('\u00E4', 0, 3, "", germanStemmer.methodObject), new Among('\u00F6', 0, 4, "", germanStemmer.methodObject), new Among('\u00FC', 0, 5, "", germanStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete germanStemmer.a_1;
                return germanStemmer.a_1 = [new Among("e", -1, 2, "", germanStemmer.methodObject), new Among("em", -1, 1, "", germanStemmer.methodObject), new Among("en", -1, 2, "", germanStemmer.methodObject), new Among("ern", -1, 1, "", germanStemmer.methodObject), new Among("er", -1, 1, "", germanStemmer.methodObject), new Among("s", -1, 3, "", germanStemmer.methodObject), new Among("es", 5, 2, "", germanStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete germanStemmer.a_2;
                return germanStemmer.a_2 = [new Among("en", -1, 1, "", germanStemmer.methodObject), new Among("er", -1, 1, "", germanStemmer.methodObject), new Among("st", -1, 2, "", germanStemmer.methodObject), new Among("est", 2, 1, "", germanStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete germanStemmer.a_3;
                return germanStemmer.a_3 = [new Among("ig", -1, 1, "", germanStemmer.methodObject), new Among("lich", -1, 1, "", germanStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete germanStemmer.a_4;
                return germanStemmer.a_4 = [new Among("end", -1, 1, "", germanStemmer.methodObject), new Among("ig", -1, 2, "", germanStemmer.methodObject), new Among("ung", -1, 1, "", germanStemmer.methodObject), new Among("lich", -1, 3, "", germanStemmer.methodObject), new Among("isch", -1, 2, "", germanStemmer.methodObject), new Among("ik", -1, 2, "", germanStemmer.methodObject), new Among("heit", -1, 3, "", germanStemmer.methodObject), new Among("keit", -1, 4, "", germanStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete germanStemmer.g_v;
                return germanStemmer.g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32, 8];
            }
        }, {
            key: 'g_s_ending',
            get: function get() {
                delete germanStemmer.g_s_ending;
                return germanStemmer.g_s_ending = [117, 30, 5];
            }
        }, {
            key: 'g_st_ending',
            get: function get() {
                delete germanStemmer.g_st_ending;
                return germanStemmer.g_st_ending = [117, 30, 4];
            }
        }]);

        return germanStemmer;
    })(SnowballStemmer);

    var hungarianStemmer = (function (_SnowballStemmer11) {
        _inherits(hungarianStemmer, _SnowballStemmer11);

        function hungarianStemmer() {
            _classCallCheck(this, hungarianStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(hungarianStemmer).apply(this, arguments));
        }

        _createClass(hungarianStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                this.I_p1 = this.limit;

                lab0: do {
                    v_1 = this.cursor;

                    lab1: do {
                        if (!this.in_grouping$esjava$3(hungarianStemmer.g_v, 97, 369)) {
                            break lab1;
                        }

                        golab2: while (true) {
                            v_2 = this.cursor;

                            lab3: do {
                                if (!this.out_grouping$esjava$3(hungarianStemmer.g_v, 97, 369)) {
                                    break lab3;
                                }

                                this.cursor = v_2;
                                break golab2;
                            } while (false);

                            this.cursor = v_2;

                            if (this.cursor >= this.limit) {
                                break lab1;
                            }

                            this.cursor++;
                        }

                        lab4: do {
                            v_3 = this.cursor;

                            lab5: do {
                                if (this.find_among$esjava$2(hungarianStemmer.a_0, 8) === 0) {
                                    break lab5;
                                }

                                break lab4;
                            } while (false);

                            this.cursor = v_3;

                            if (this.cursor >= this.limit) {
                                break lab1;
                            }

                            this.cursor++;
                        } while (false);

                        this.I_p1 = this.cursor;
                        break lab0;
                    } while (false);

                    this.cursor = v_1;

                    if (!this.out_grouping$esjava$3(hungarianStemmer.g_v, 97, 369)) {
                        return false;
                    }

                    golab6: while (true) {
                        lab7: do {
                            if (!this.in_grouping$esjava$3(hungarianStemmer.g_v, 97, 369)) {
                                break lab7;
                            }

                            break golab6;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            return false;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;
                } while (false);

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_v_ending$esjava$0',
            value: function r_v_ending$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_1, 2);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("a");
                        break;

                    case 2:
                        this.slice_from$esjava$1("e");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_double$esjava$0',
            value: function r_double$esjava$0() {
                var v_1 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.find_among_b$esjava$2(hungarianStemmer.a_2, 23) === 0) {
                    return false;
                }

                this.cursor = this.limit - v_1;
                return true;
            }
        }, {
            key: 'r_undouble$esjava$0',
            value: function r_undouble$esjava$0() {
                if (this.cursor <= this.limit_backward) {
                    return false;
                }

                this.cursor--;
                this.ket = this.cursor;
                {
                    var c = this.cursor - 1;

                    if (this.limit_backward > c || c > this.limit) {
                        return false;
                    }

                    this.cursor = c;
                }
                this.bra = this.cursor;
                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_instrum$esjava$0',
            value: function r_instrum$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_3, 2);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_double$esjava$0()) {
                            return false;
                        }

                        break;

                    case 2:
                        if (!this.r_double$esjava$0()) {
                            return false;
                        }

                        break;
                }

                this.slice_del$esjava$0();

                if (!this.r_undouble$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_case$esjava$0',
            value: function r_case$esjava$0() {
                this.ket = this.cursor;

                if (this.find_among_b$esjava$2(hungarianStemmer.a_4, 44) === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                this.slice_del$esjava$0();

                if (!this.r_v_ending$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_case_special$esjava$0',
            value: function r_case_special$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_5, 3);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("e");
                        break;

                    case 2:
                        this.slice_from$esjava$1("a");
                        break;

                    case 3:
                        this.slice_from$esjava$1("a");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_case_other$esjava$0',
            value: function r_case_other$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_6, 6);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        break;

                    case 3:
                        this.slice_from$esjava$1("a");
                        break;

                    case 4:
                        this.slice_from$esjava$1("e");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_factive$esjava$0',
            value: function r_factive$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_7, 2);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_double$esjava$0()) {
                            return false;
                        }

                        break;

                    case 2:
                        if (!this.r_double$esjava$0()) {
                            return false;
                        }

                        break;
                }

                this.slice_del$esjava$0();

                if (!this.r_undouble$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_plural$esjava$0',
            value: function r_plural$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_8, 7);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("a");
                        break;

                    case 2:
                        this.slice_from$esjava$1("e");
                        break;

                    case 3:
                        this.slice_del$esjava$0();
                        break;

                    case 4:
                        this.slice_del$esjava$0();
                        break;

                    case 5:
                        this.slice_del$esjava$0();
                        break;

                    case 6:
                        this.slice_del$esjava$0();
                        break;

                    case 7:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_owned$esjava$0',
            value: function r_owned$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_9, 12);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("e");
                        break;

                    case 3:
                        this.slice_from$esjava$1("a");
                        break;

                    case 4:
                        this.slice_del$esjava$0();
                        break;

                    case 5:
                        this.slice_from$esjava$1("e");
                        break;

                    case 6:
                        this.slice_from$esjava$1("a");
                        break;

                    case 7:
                        this.slice_del$esjava$0();
                        break;

                    case 8:
                        this.slice_from$esjava$1("e");
                        break;

                    case 9:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_sing_owner$esjava$0',
            value: function r_sing_owner$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_10, 31);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("a");
                        break;

                    case 3:
                        this.slice_from$esjava$1("e");
                        break;

                    case 4:
                        this.slice_del$esjava$0();
                        break;

                    case 5:
                        this.slice_from$esjava$1("a");
                        break;

                    case 6:
                        this.slice_from$esjava$1("e");
                        break;

                    case 7:
                        this.slice_del$esjava$0();
                        break;

                    case 8:
                        this.slice_del$esjava$0();
                        break;

                    case 9:
                        this.slice_del$esjava$0();
                        break;

                    case 10:
                        this.slice_from$esjava$1("a");
                        break;

                    case 11:
                        this.slice_from$esjava$1("e");
                        break;

                    case 12:
                        this.slice_del$esjava$0();
                        break;

                    case 13:
                        this.slice_del$esjava$0();
                        break;

                    case 14:
                        this.slice_from$esjava$1("a");
                        break;

                    case 15:
                        this.slice_from$esjava$1("e");
                        break;

                    case 16:
                        this.slice_del$esjava$0();
                        break;

                    case 17:
                        this.slice_del$esjava$0();
                        break;

                    case 18:
                        this.slice_del$esjava$0();
                        break;

                    case 19:
                        this.slice_from$esjava$1("a");
                        break;

                    case 20:
                        this.slice_from$esjava$1("e");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_plur_owner$esjava$0',
            value: function r_plur_owner$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(hungarianStemmer.a_11, 42);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("a");
                        break;

                    case 3:
                        this.slice_from$esjava$1("e");
                        break;

                    case 4:
                        this.slice_del$esjava$0();
                        break;

                    case 5:
                        this.slice_del$esjava$0();
                        break;

                    case 6:
                        this.slice_del$esjava$0();
                        break;

                    case 7:
                        this.slice_from$esjava$1("a");
                        break;

                    case 8:
                        this.slice_from$esjava$1("e");
                        break;

                    case 9:
                        this.slice_del$esjava$0();
                        break;

                    case 10:
                        this.slice_del$esjava$0();
                        break;

                    case 11:
                        this.slice_del$esjava$0();
                        break;

                    case 12:
                        this.slice_from$esjava$1("a");
                        break;

                    case 13:
                        this.slice_from$esjava$1("e");
                        break;

                    case 14:
                        this.slice_del$esjava$0();
                        break;

                    case 15:
                        this.slice_del$esjava$0();
                        break;

                    case 16:
                        this.slice_del$esjava$0();
                        break;

                    case 17:
                        this.slice_del$esjava$0();
                        break;

                    case 18:
                        this.slice_from$esjava$1("a");
                        break;

                    case 19:
                        this.slice_from$esjava$1("e");
                        break;

                    case 20:
                        this.slice_del$esjava$0();
                        break;

                    case 21:
                        this.slice_del$esjava$0();
                        break;

                    case 22:
                        this.slice_from$esjava$1("a");
                        break;

                    case 23:
                        this.slice_from$esjava$1("e");
                        break;

                    case 24:
                        this.slice_del$esjava$0();
                        break;

                    case 25:
                        this.slice_del$esjava$0();
                        break;

                    case 26:
                        this.slice_del$esjava$0();
                        break;

                    case 27:
                        this.slice_from$esjava$1("a");
                        break;

                    case 28:
                        this.slice_from$esjava$1("e");
                        break;

                    case 29:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_instrum$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_case$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    if (!this.r_case_special$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                v_5 = this.limit - this.cursor;

                lab4: do {
                    if (!this.r_case_other$esjava$0()) {
                        break lab4;
                    }
                } while (false);

                this.cursor = this.limit - v_5;
                v_6 = this.limit - this.cursor;

                lab5: do {
                    if (!this.r_factive$esjava$0()) {
                        break lab5;
                    }
                } while (false);

                this.cursor = this.limit - v_6;
                v_7 = this.limit - this.cursor;

                lab6: do {
                    if (!this.r_owned$esjava$0()) {
                        break lab6;
                    }
                } while (false);

                this.cursor = this.limit - v_7;
                v_8 = this.limit - this.cursor;

                lab7: do {
                    if (!this.r_sing_owner$esjava$0()) {
                        break lab7;
                    }
                } while (false);

                this.cursor = this.limit - v_8;
                v_9 = this.limit - this.cursor;

                lab8: do {
                    if (!this.r_plur_owner$esjava$0()) {
                        break lab8;
                    }
                } while (false);

                this.cursor = this.limit - v_9;
                v_10 = this.limit - this.cursor;

                lab9: do {
                    if (!this.r_plural$esjava$0()) {
                        break lab9;
                    }
                } while (false);

                this.cursor = this.limit - v_10;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete hungarianStemmer.methodObject;
                return hungarianStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete hungarianStemmer.a_0;
                return hungarianStemmer.a_0 = [new Among("cs", -1, -1, "", hungarianStemmer.methodObject), new Among("dzs", -1, -1, "", hungarianStemmer.methodObject), new Among("gy", -1, -1, "", hungarianStemmer.methodObject), new Among("ly", -1, -1, "", hungarianStemmer.methodObject), new Among("ny", -1, -1, "", hungarianStemmer.methodObject), new Among("sz", -1, -1, "", hungarianStemmer.methodObject), new Among("ty", -1, -1, "", hungarianStemmer.methodObject), new Among("zs", -1, -1, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete hungarianStemmer.a_1;
                return hungarianStemmer.a_1 = [new Among('\u00E1', -1, 1, "", hungarianStemmer.methodObject), new Among('\u00E9', -1, 2, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete hungarianStemmer.a_2;
                return hungarianStemmer.a_2 = [new Among("bb", -1, -1, "", hungarianStemmer.methodObject), new Among("cc", -1, -1, "", hungarianStemmer.methodObject), new Among("dd", -1, -1, "", hungarianStemmer.methodObject), new Among("ff", -1, -1, "", hungarianStemmer.methodObject), new Among("gg", -1, -1, "", hungarianStemmer.methodObject), new Among("jj", -1, -1, "", hungarianStemmer.methodObject), new Among("kk", -1, -1, "", hungarianStemmer.methodObject), new Among("ll", -1, -1, "", hungarianStemmer.methodObject), new Among("mm", -1, -1, "", hungarianStemmer.methodObject), new Among("nn", -1, -1, "", hungarianStemmer.methodObject), new Among("pp", -1, -1, "", hungarianStemmer.methodObject), new Among("rr", -1, -1, "", hungarianStemmer.methodObject), new Among("ccs", -1, -1, "", hungarianStemmer.methodObject), new Among("ss", -1, -1, "", hungarianStemmer.methodObject), new Among("zzs", -1, -1, "", hungarianStemmer.methodObject), new Among("tt", -1, -1, "", hungarianStemmer.methodObject), new Among("vv", -1, -1, "", hungarianStemmer.methodObject), new Among("ggy", -1, -1, "", hungarianStemmer.methodObject), new Among("lly", -1, -1, "", hungarianStemmer.methodObject), new Among("nny", -1, -1, "", hungarianStemmer.methodObject), new Among("tty", -1, -1, "", hungarianStemmer.methodObject), new Among("ssz", -1, -1, "", hungarianStemmer.methodObject), new Among("zz", -1, -1, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete hungarianStemmer.a_3;
                return hungarianStemmer.a_3 = [new Among("al", -1, 1, "", hungarianStemmer.methodObject), new Among("el", -1, 2, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete hungarianStemmer.a_4;
                return hungarianStemmer.a_4 = [new Among("ba", -1, -1, "", hungarianStemmer.methodObject), new Among("ra", -1, -1, "", hungarianStemmer.methodObject), new Among("be", -1, -1, "", hungarianStemmer.methodObject), new Among("re", -1, -1, "", hungarianStemmer.methodObject), new Among("ig", -1, -1, "", hungarianStemmer.methodObject), new Among("nak", -1, -1, "", hungarianStemmer.methodObject), new Among("nek", -1, -1, "", hungarianStemmer.methodObject), new Among("val", -1, -1, "", hungarianStemmer.methodObject), new Among("vel", -1, -1, "", hungarianStemmer.methodObject), new Among("ul", -1, -1, "", hungarianStemmer.methodObject), new Among('n\u00E1l', -1, -1, "", hungarianStemmer.methodObject), new Among('n\u00E9l', -1, -1, "", hungarianStemmer.methodObject), new Among('b\u00F3l', -1, -1, "", hungarianStemmer.methodObject), new Among('r\u00F3l', -1, -1, "", hungarianStemmer.methodObject), new Among('t\u00F3l', -1, -1, "", hungarianStemmer.methodObject), new Among('\u00FCl', -1, -1, "", hungarianStemmer.methodObject), new Among('b\u0151l', -1, -1, "", hungarianStemmer.methodObject), new Among('r\u0151l', -1, -1, "", hungarianStemmer.methodObject), new Among('t\u0151l', -1, -1, "", hungarianStemmer.methodObject), new Among("n", -1, -1, "", hungarianStemmer.methodObject), new Among("an", 19, -1, "", hungarianStemmer.methodObject), new Among("ban", 20, -1, "", hungarianStemmer.methodObject), new Among("en", 19, -1, "", hungarianStemmer.methodObject), new Among("ben", 22, -1, "", hungarianStemmer.methodObject), new Among('k\u00E9ppen', 22, -1, "", hungarianStemmer.methodObject), new Among("on", 19, -1, "", hungarianStemmer.methodObject), new Among('\u00F6n', 19, -1, "", hungarianStemmer.methodObject), new Among('k\u00E9pp', -1, -1, "", hungarianStemmer.methodObject), new Among("kor", -1, -1, "", hungarianStemmer.methodObject), new Among("t", -1, -1, "", hungarianStemmer.methodObject), new Among("at", 29, -1, "", hungarianStemmer.methodObject), new Among("et", 29, -1, "", hungarianStemmer.methodObject), new Among('k\u00E9nt', 29, -1, "", hungarianStemmer.methodObject), new Among('ank\u00E9nt', 32, -1, "", hungarianStemmer.methodObject), new Among('enk\u00E9nt', 32, -1, "", hungarianStemmer.methodObject), new Among('onk\u00E9nt', 32, -1, "", hungarianStemmer.methodObject), new Among("ot", 29, -1, "", hungarianStemmer.methodObject), new Among('\u00E9rt', 29, -1, "", hungarianStemmer.methodObject), new Among('\u00F6t', 29, -1, "", hungarianStemmer.methodObject), new Among("hez", -1, -1, "", hungarianStemmer.methodObject), new Among("hoz", -1, -1, "", hungarianStemmer.methodObject), new Among('h\u00F6z', -1, -1, "", hungarianStemmer.methodObject), new Among('v\u00E1', -1, -1, "", hungarianStemmer.methodObject), new Among('v\u00E9', -1, -1, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete hungarianStemmer.a_5;
                return hungarianStemmer.a_5 = [new Among('\u00E1n', -1, 2, "", hungarianStemmer.methodObject), new Among('\u00E9n', -1, 1, "", hungarianStemmer.methodObject), new Among('\u00E1nk\u00E9nt', -1, 3, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete hungarianStemmer.a_6;
                return hungarianStemmer.a_6 = [new Among("stul", -1, 2, "", hungarianStemmer.methodObject), new Among("astul", 0, 1, "", hungarianStemmer.methodObject), new Among('\u00E1stul', 0, 3, "", hungarianStemmer.methodObject), new Among('st\u00FCl', -1, 2, "", hungarianStemmer.methodObject), new Among('est\u00FCl', 3, 1, "", hungarianStemmer.methodObject), new Among('\u00E9st\u00FCl', 3, 4, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete hungarianStemmer.a_7;
                return hungarianStemmer.a_7 = [new Among('\u00E1', -1, 1, "", hungarianStemmer.methodObject), new Among('\u00E9', -1, 2, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_8',
            get: function get() {
                delete hungarianStemmer.a_8;
                return hungarianStemmer.a_8 = [new Among("k", -1, 7, "", hungarianStemmer.methodObject), new Among("ak", 0, 4, "", hungarianStemmer.methodObject), new Among("ek", 0, 6, "", hungarianStemmer.methodObject), new Among("ok", 0, 5, "", hungarianStemmer.methodObject), new Among('\u00E1k', 0, 1, "", hungarianStemmer.methodObject), new Among('\u00E9k', 0, 2, "", hungarianStemmer.methodObject), new Among('\u00F6k', 0, 3, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_9',
            get: function get() {
                delete hungarianStemmer.a_9;
                return hungarianStemmer.a_9 = [new Among('\u00E9i', -1, 7, "", hungarianStemmer.methodObject), new Among('\u00E1\u00E9i', 0, 6, "", hungarianStemmer.methodObject), new Among('\u00E9\u00E9i', 0, 5, "", hungarianStemmer.methodObject), new Among('\u00E9', -1, 9, "", hungarianStemmer.methodObject), new Among('k\u00E9', 3, 4, "", hungarianStemmer.methodObject), new Among('ak\u00E9', 4, 1, "", hungarianStemmer.methodObject), new Among('ek\u00E9', 4, 1, "", hungarianStemmer.methodObject), new Among('ok\u00E9', 4, 1, "", hungarianStemmer.methodObject), new Among('\u00E1k\u00E9', 4, 3, "", hungarianStemmer.methodObject), new Among('\u00E9k\u00E9', 4, 2, "", hungarianStemmer.methodObject), new Among('\u00F6k\u00E9', 4, 1, "", hungarianStemmer.methodObject), new Among('\u00E9\u00E9', 3, 8, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_10',
            get: function get() {
                delete hungarianStemmer.a_10;
                return hungarianStemmer.a_10 = [new Among("a", -1, 18, "", hungarianStemmer.methodObject), new Among("ja", 0, 17, "", hungarianStemmer.methodObject), new Among("d", -1, 16, "", hungarianStemmer.methodObject), new Among("ad", 2, 13, "", hungarianStemmer.methodObject), new Among("ed", 2, 13, "", hungarianStemmer.methodObject), new Among("od", 2, 13, "", hungarianStemmer.methodObject), new Among('\u00E1d', 2, 14, "", hungarianStemmer.methodObject), new Among('\u00E9d', 2, 15, "", hungarianStemmer.methodObject), new Among('\u00F6d', 2, 13, "", hungarianStemmer.methodObject), new Among("e", -1, 18, "", hungarianStemmer.methodObject), new Among("je", 9, 17, "", hungarianStemmer.methodObject), new Among("nk", -1, 4, "", hungarianStemmer.methodObject), new Among("unk", 11, 1, "", hungarianStemmer.methodObject), new Among('\u00E1nk', 11, 2, "", hungarianStemmer.methodObject), new Among('\u00E9nk', 11, 3, "", hungarianStemmer.methodObject), new Among('\u00FCnk', 11, 1, "", hungarianStemmer.methodObject), new Among("uk", -1, 8, "", hungarianStemmer.methodObject), new Among("juk", 16, 7, "", hungarianStemmer.methodObject), new Among('\u00E1juk', 17, 5, "", hungarianStemmer.methodObject), new Among('\u00FCk', -1, 8, "", hungarianStemmer.methodObject), new Among('j\u00FCk', 19, 7, "", hungarianStemmer.methodObject), new Among('\u00E9j\u00FCk', 20, 6, "", hungarianStemmer.methodObject), new Among("m", -1, 12, "", hungarianStemmer.methodObject), new Among("am", 22, 9, "", hungarianStemmer.methodObject), new Among("em", 22, 9, "", hungarianStemmer.methodObject), new Among("om", 22, 9, "", hungarianStemmer.methodObject), new Among('\u00E1m', 22, 10, "", hungarianStemmer.methodObject), new Among('\u00E9m', 22, 11, "", hungarianStemmer.methodObject), new Among("o", -1, 18, "", hungarianStemmer.methodObject), new Among('\u00E1', -1, 19, "", hungarianStemmer.methodObject), new Among('\u00E9', -1, 20, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'a_11',
            get: function get() {
                delete hungarianStemmer.a_11;
                return hungarianStemmer.a_11 = [new Among("id", -1, 10, "", hungarianStemmer.methodObject), new Among("aid", 0, 9, "", hungarianStemmer.methodObject), new Among("jaid", 1, 6, "", hungarianStemmer.methodObject), new Among("eid", 0, 9, "", hungarianStemmer.methodObject), new Among("jeid", 3, 6, "", hungarianStemmer.methodObject), new Among('\u00E1id', 0, 7, "", hungarianStemmer.methodObject), new Among('\u00E9id', 0, 8, "", hungarianStemmer.methodObject), new Among("i", -1, 15, "", hungarianStemmer.methodObject), new Among("ai", 7, 14, "", hungarianStemmer.methodObject), new Among("jai", 8, 11, "", hungarianStemmer.methodObject), new Among("ei", 7, 14, "", hungarianStemmer.methodObject), new Among("jei", 10, 11, "", hungarianStemmer.methodObject), new Among('\u00E1i', 7, 12, "", hungarianStemmer.methodObject), new Among('\u00E9i', 7, 13, "", hungarianStemmer.methodObject), new Among("itek", -1, 24, "", hungarianStemmer.methodObject), new Among("eitek", 14, 21, "", hungarianStemmer.methodObject), new Among("jeitek", 15, 20, "", hungarianStemmer.methodObject), new Among('\u00E9itek', 14, 23, "", hungarianStemmer.methodObject), new Among("ik", -1, 29, "", hungarianStemmer.methodObject), new Among("aik", 18, 26, "", hungarianStemmer.methodObject), new Among("jaik", 19, 25, "", hungarianStemmer.methodObject), new Among("eik", 18, 26, "", hungarianStemmer.methodObject), new Among("jeik", 21, 25, "", hungarianStemmer.methodObject), new Among('\u00E1ik', 18, 27, "", hungarianStemmer.methodObject), new Among('\u00E9ik', 18, 28, "", hungarianStemmer.methodObject), new Among("ink", -1, 20, "", hungarianStemmer.methodObject), new Among("aink", 25, 17, "", hungarianStemmer.methodObject), new Among("jaink", 26, 16, "", hungarianStemmer.methodObject), new Among("eink", 25, 17, "", hungarianStemmer.methodObject), new Among("jeink", 28, 16, "", hungarianStemmer.methodObject), new Among('\u00E1ink', 25, 18, "", hungarianStemmer.methodObject), new Among('\u00E9ink', 25, 19, "", hungarianStemmer.methodObject), new Among("aitok", -1, 21, "", hungarianStemmer.methodObject), new Among("jaitok", 32, 20, "", hungarianStemmer.methodObject), new Among('\u00E1itok', -1, 22, "", hungarianStemmer.methodObject), new Among("im", -1, 5, "", hungarianStemmer.methodObject), new Among("aim", 35, 4, "", hungarianStemmer.methodObject), new Among("jaim", 36, 1, "", hungarianStemmer.methodObject), new Among("eim", 35, 4, "", hungarianStemmer.methodObject), new Among("jeim", 38, 1, "", hungarianStemmer.methodObject), new Among('\u00E1im', 35, 2, "", hungarianStemmer.methodObject), new Among('\u00E9im', 35, 3, "", hungarianStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete hungarianStemmer.g_v;
                return hungarianStemmer.g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 36, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1];
            }
        }]);

        return hungarianStemmer;
    })(SnowballStemmer);

    var irishStemmer = (function (_SnowballStemmer12) {
        _inherits(irishStemmer, _SnowballStemmer12);

        function irishStemmer() {
            _classCallCheck(this, irishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(irishStemmer).apply(this, arguments));
        }

        _createClass(irishStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_3 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    golab1: while (true) {
                        lab2: do {
                            if (!this.in_grouping$esjava$3(irishStemmer.g_v, 97, 250)) {
                                break lab2;
                            }

                            break golab1;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_pV = this.cursor;
                } while (false);

                this.cursor = v_1;
                v_3 = this.cursor;

                lab3: do {
                    golab4: while (true) {
                        lab5: do {
                            if (!this.in_grouping$esjava$3(irishStemmer.g_v, 97, 250)) {
                                break lab5;
                            }

                            break golab4;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab3;
                        }

                        this.cursor++;
                    }

                    golab6: while (true) {
                        lab7: do {
                            if (!this.out_grouping$esjava$3(irishStemmer.g_v, 97, 250)) {
                                break lab7;
                            }

                            break golab6;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab3;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab8: while (true) {
                        lab9: do {
                            if (!this.in_grouping$esjava$3(irishStemmer.g_v, 97, 250)) {
                                break lab9;
                            }

                            break golab8;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab3;
                        }

                        this.cursor++;
                    }

                    golab10: while (true) {
                        lab11: do {
                            if (!this.out_grouping$esjava$3(irishStemmer.g_v, 97, 250)) {
                                break lab11;
                            }

                            break golab10;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab3;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_3;
                return true;
            }
        }, {
            key: 'r_initial_morph$esjava$0',
            value: function r_initial_morph$esjava$0() {
                var among_var = undefined;
                this.bra = this.cursor;
                among_var = this.find_among$esjava$2(irishStemmer.a_0, 24);

                if (among_var === 0) {
                    return false;
                }

                this.ket = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        break;

                    case 3:
                        this.slice_from$esjava$1("f");
                        break;

                    case 4:
                        this.slice_del$esjava$0();
                        break;

                    case 5:
                        this.slice_from$esjava$1("s");
                        break;

                    case 6:
                        this.slice_from$esjava$1("b");
                        break;

                    case 7:
                        this.slice_from$esjava$1("c");
                        break;

                    case 8:
                        this.slice_from$esjava$1("d");
                        break;

                    case 9:
                        this.slice_from$esjava$1("f");
                        break;

                    case 10:
                        this.slice_from$esjava$1("g");
                        break;

                    case 11:
                        this.slice_from$esjava$1("p");
                        break;

                    case 12:
                        this.slice_from$esjava$1("s");
                        break;

                    case 13:
                        this.slice_from$esjava$1("t");
                        break;

                    case 14:
                        this.slice_from$esjava$1("b");
                        break;

                    case 15:
                        this.slice_from$esjava$1("c");
                        break;

                    case 16:
                        this.slice_from$esjava$1("d");
                        break;

                    case 17:
                        this.slice_from$esjava$1("f");
                        break;

                    case 18:
                        this.slice_from$esjava$1("g");
                        break;

                    case 19:
                        this.slice_from$esjava$1("m");
                        break;

                    case 20:
                        this.slice_from$esjava$1("p");
                        break;

                    case 21:
                        this.slice_from$esjava$1("t");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_noun_sfx$esjava$0',
            value: function r_noun_sfx$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(irishStemmer.a_1, 16);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_deriv$esjava$0',
            value: function r_deriv$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(irishStemmer.a_2, 25);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("arc");
                        break;

                    case 3:
                        this.slice_from$esjava$1("gin");
                        break;

                    case 4:
                        this.slice_from$esjava$1("graf");
                        break;

                    case 5:
                        this.slice_from$esjava$1("paite");
                        break;

                    case 6:
                        this.slice_from$esjava$1('\u00F3id');
                        break;
                }

                return true;
            }
        }, {
            key: 'r_verb_sfx$esjava$0',
            value: function r_verb_sfx$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(irishStemmer.a_3, 12);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_initial_morph$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = v_2;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_noun_sfx$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    if (!this.r_deriv$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                v_5 = this.limit - this.cursor;

                lab4: do {
                    if (!this.r_verb_sfx$esjava$0()) {
                        break lab4;
                    }
                } while (false);

                this.cursor = this.limit - v_5;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete irishStemmer.methodObject;
                return irishStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete irishStemmer.a_0;
                return irishStemmer.a_0 = [new Among("b'", -1, 4, "", irishStemmer.methodObject), new Among("bh", -1, 14, "", irishStemmer.methodObject), new Among("bhf", 1, 9, "", irishStemmer.methodObject), new Among("bp", -1, 11, "", irishStemmer.methodObject), new Among("ch", -1, 15, "", irishStemmer.methodObject), new Among("d'", -1, 2, "", irishStemmer.methodObject), new Among("d'fh", 5, 3, "", irishStemmer.methodObject), new Among("dh", -1, 16, "", irishStemmer.methodObject), new Among("dt", -1, 13, "", irishStemmer.methodObject), new Among("fh", -1, 17, "", irishStemmer.methodObject), new Among("gc", -1, 7, "", irishStemmer.methodObject), new Among("gh", -1, 18, "", irishStemmer.methodObject), new Among("h-", -1, 1, "", irishStemmer.methodObject), new Among("m'", -1, 4, "", irishStemmer.methodObject), new Among("mb", -1, 6, "", irishStemmer.methodObject), new Among("mh", -1, 19, "", irishStemmer.methodObject), new Among("n-", -1, 1, "", irishStemmer.methodObject), new Among("nd", -1, 8, "", irishStemmer.methodObject), new Among("ng", -1, 10, "", irishStemmer.methodObject), new Among("ph", -1, 20, "", irishStemmer.methodObject), new Among("sh", -1, 5, "", irishStemmer.methodObject), new Among("t-", -1, 1, "", irishStemmer.methodObject), new Among("th", -1, 21, "", irishStemmer.methodObject), new Among("ts", -1, 12, "", irishStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete irishStemmer.a_1;
                return irishStemmer.a_1 = [new Among('\u00EDochta', -1, 1, "", irishStemmer.methodObject), new Among('a\u00EDochta', 0, 1, "", irishStemmer.methodObject), new Among("ire", -1, 2, "", irishStemmer.methodObject), new Among("aire", 2, 2, "", irishStemmer.methodObject), new Among("abh", -1, 1, "", irishStemmer.methodObject), new Among("eabh", 4, 1, "", irishStemmer.methodObject), new Among("ibh", -1, 1, "", irishStemmer.methodObject), new Among("aibh", 6, 1, "", irishStemmer.methodObject), new Among("amh", -1, 1, "", irishStemmer.methodObject), new Among("eamh", 8, 1, "", irishStemmer.methodObject), new Among("imh", -1, 1, "", irishStemmer.methodObject), new Among("aimh", 10, 1, "", irishStemmer.methodObject), new Among('\u00EDocht', -1, 1, "", irishStemmer.methodObject), new Among('a\u00EDocht', 12, 1, "", irishStemmer.methodObject), new Among('ir\u00ED', -1, 2, "", irishStemmer.methodObject), new Among('air\u00ED', 14, 2, "", irishStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete irishStemmer.a_2;
                return irishStemmer.a_2 = [new Among('\u00F3ideacha', -1, 6, "", irishStemmer.methodObject), new Among("patacha", -1, 5, "", irishStemmer.methodObject), new Among("achta", -1, 1, "", irishStemmer.methodObject), new Among("arcachta", 2, 2, "", irishStemmer.methodObject), new Among("eachta", 2, 1, "", irishStemmer.methodObject), new Among('grafa\u00EDochta', -1, 4, "", irishStemmer.methodObject), new Among("paite", -1, 5, "", irishStemmer.methodObject), new Among("ach", -1, 1, "", irishStemmer.methodObject), new Among("each", 7, 1, "", irishStemmer.methodObject), new Among('\u00F3ideach', 8, 6, "", irishStemmer.methodObject), new Among("gineach", 8, 3, "", irishStemmer.methodObject), new Among("patach", 7, 5, "", irishStemmer.methodObject), new Among('grafa\u00EDoch', -1, 4, "", irishStemmer.methodObject), new Among("pataigh", -1, 5, "", irishStemmer.methodObject), new Among('\u00F3idigh', -1, 6, "", irishStemmer.methodObject), new Among('acht\u00FAil', -1, 1, "", irishStemmer.methodObject), new Among('eacht\u00FAil', 15, 1, "", irishStemmer.methodObject), new Among("gineas", -1, 3, "", irishStemmer.methodObject), new Among("ginis", -1, 3, "", irishStemmer.methodObject), new Among("acht", -1, 1, "", irishStemmer.methodObject), new Among("arcacht", 19, 2, "", irishStemmer.methodObject), new Among("eacht", 19, 1, "", irishStemmer.methodObject), new Among('grafa\u00EDocht', -1, 4, "", irishStemmer.methodObject), new Among('arcachta\u00ED', -1, 2, "", irishStemmer.methodObject), new Among('grafa\u00EDochta\u00ED', -1, 4, "", irishStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete irishStemmer.a_3;
                return irishStemmer.a_3 = [new Among("imid", -1, 1, "", irishStemmer.methodObject), new Among("aimid", 0, 1, "", irishStemmer.methodObject), new Among('\u00EDmid', -1, 1, "", irishStemmer.methodObject), new Among('a\u00EDmid', 2, 1, "", irishStemmer.methodObject), new Among("adh", -1, 2, "", irishStemmer.methodObject), new Among("eadh", 4, 2, "", irishStemmer.methodObject), new Among("faidh", -1, 1, "", irishStemmer.methodObject), new Among("fidh", -1, 1, "", irishStemmer.methodObject), new Among('\u00E1il', -1, 2, "", irishStemmer.methodObject), new Among("ain", -1, 2, "", irishStemmer.methodObject), new Among("tear", -1, 2, "", irishStemmer.methodObject), new Among("tar", -1, 2, "", irishStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete irishStemmer.g_v;
                return irishStemmer.g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 2];
            }
        }]);

        return irishStemmer;
    })(SnowballStemmer);

    var italianStemmer = (function (_SnowballStemmer13) {
        _inherits(italianStemmer, _SnowballStemmer13);

        function italianStemmer() {
            _classCallCheck(this, italianStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(italianStemmer).apply(this, arguments));
        }

        _createClass(italianStemmer, [{
            key: 'r_prelude$esjava$0',
            value: function r_prelude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                v_1 = this.cursor;

                replab0: while (true) {
                    v_2 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(italianStemmer.a_0, 7);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1('\u00E0');
                                break;

                            case 2:
                                this.slice_from$esjava$1('\u00E8');
                                break;

                            case 3:
                                this.slice_from$esjava$1('\u00EC');
                                break;

                            case 4:
                                this.slice_from$esjava$1('\u00F2');
                                break;

                            case 5:
                                this.slice_from$esjava$1('\u00F9');
                                break;

                            case 6:
                                this.slice_from$esjava$1("qU");
                                break;

                            case 7:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_2;
                    break replab0;
                }

                this.cursor = v_1;

                replab2: while (true) {
                    v_3 = this.cursor;

                    lab3: do {
                        golab4: while (true) {
                            v_4 = this.cursor;

                            lab5: do {
                                if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                    break lab5;
                                }

                                this.bra = this.cursor;

                                lab6: do {
                                    v_5 = this.cursor;

                                    lab7: do {
                                        if (!this.eq_s$esjava$2(1, "u")) {
                                            break lab7;
                                        }

                                        this.ket = this.cursor;

                                        if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                            break lab7;
                                        }

                                        this.slice_from$esjava$1("U");
                                        break lab6;
                                    } while (false);

                                    this.cursor = v_5;

                                    if (!this.eq_s$esjava$2(1, "i")) {
                                        break lab5;
                                    }

                                    this.ket = this.cursor;

                                    if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                        break lab5;
                                    }

                                    this.slice_from$esjava$1("I");
                                } while (false);

                                this.cursor = v_4;
                                break golab4;
                            } while (false);

                            this.cursor = v_4;

                            if (this.cursor >= this.limit) {
                                break lab3;
                            }

                            this.cursor++;
                        }

                        continue replab2;
                    } while (false);

                    this.cursor = v_3;
                    break replab2;
                }

                return true;
            }
        }, {
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_6 = undefined;
                var v_8 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                break lab2;
                            }

                            lab3: do {
                                v_3 = this.cursor;

                                lab4: do {
                                    if (!this.out_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                        break lab4;
                                    }

                                    golab5: while (true) {
                                        lab6: do {
                                            if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                                break lab6;
                                            }

                                            break golab5;
                                        } while (false);

                                        if (this.cursor >= this.limit) {
                                            break lab4;
                                        }

                                        this.cursor++;
                                    }

                                    break lab3;
                                } while (false);

                                this.cursor = v_3;

                                if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                    break lab2;
                                }

                                golab7: while (true) {
                                    lab8: do {
                                        if (!this.out_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                            break lab8;
                                        }

                                        break golab7;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab2;
                                    }

                                    this.cursor++;
                                }
                            } while (false);

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        if (!this.out_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                            break lab0;
                        }

                        lab9: do {
                            v_6 = this.cursor;

                            lab10: do {
                                if (!this.out_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                    break lab10;
                                }

                                golab11: while (true) {
                                    lab12: do {
                                        if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                            break lab12;
                                        }

                                        break golab11;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab10;
                                    }

                                    this.cursor++;
                                }

                                break lab9;
                            } while (false);

                            this.cursor = v_6;

                            if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                break lab0;
                            }

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        } while (false);
                    } while (false);

                    this.I_pV = this.cursor;
                } while (false);

                this.cursor = v_1;
                v_8 = this.cursor;

                lab13: do {
                    golab14: while (true) {
                        lab15: do {
                            if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                break lab15;
                            }

                            break golab14;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab16: while (true) {
                        lab17: do {
                            if (!this.out_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                break lab17;
                            }

                            break golab16;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab18: while (true) {
                        lab19: do {
                            if (!this.in_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                break lab19;
                            }

                            break golab18;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab20: while (true) {
                        lab21: do {
                            if (!this.out_grouping$esjava$3(italianStemmer.g_v, 97, 249)) {
                                break lab21;
                            }

                            break golab20;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_8;
                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(italianStemmer.a_1, 3);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("i");
                                break;

                            case 2:
                                this.slice_from$esjava$1("u");
                                break;

                            case 3:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_attached_pronoun$esjava$0',
            value: function r_attached_pronoun$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;

                if (this.find_among_b$esjava$2(italianStemmer.a_2, 37) === 0) {
                    return false;
                }

                this.bra = this.cursor;
                among_var = this.find_among_b$esjava$2(italianStemmer.a_3, 5);

                if (among_var === 0) {
                    return false;
                }

                if (!this.r_RV$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("e");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(italianStemmer.a_6, 51);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "ic")) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;

                    case 3:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("log");
                        break;

                    case 4:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("u");
                        break;

                    case 5:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ente");
                        break;

                    case 6:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 7:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_2 = this.limit - this.cursor;

                        lab1: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(italianStemmer.a_4, 4);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_2;
                                break lab1;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_2;
                                break lab1;
                            }

                            this.slice_del$esjava$0();

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_2;
                                    break lab1;

                                case 1:
                                    this.ket = this.cursor;

                                    if (!this.eq_s_b$esjava$2(2, "at")) {
                                        this.cursor = this.limit - v_2;
                                        break lab1;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_2;
                                        break lab1;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 8:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;

                        lab2: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(italianStemmer.a_5, 3);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_3;
                                break lab2;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_3;
                                    break lab2;

                                case 1:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_3;
                                        break lab2;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 9:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_4 = this.limit - this.cursor;

                        lab3: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "at")) {
                                this.cursor = this.limit - v_4;
                                break lab3;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_4;
                                break lab3;
                            }

                            this.slice_del$esjava$0();
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "ic")) {
                                this.cursor = this.limit - v_4;
                                break lab3;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_4;
                                break lab3;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;
                }

                return true;
            }
        }, {
            key: 'r_verb_suffix$esjava$0',
            value: function r_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(italianStemmer.a_7, 87);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        this.limit_backward = v_2;
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                this.limit_backward = v_2;
                return true;
            }
        }, {
            key: 'r_vowel_suffix$esjava$0',
            value: function r_vowel_suffix$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    this.ket = this.cursor;

                    if (!this.in_grouping_b$esjava$3(italianStemmer.g_AEIO, 97, 242)) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.bra = this.cursor;

                    if (!this.r_RV$esjava$0()) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.slice_del$esjava$0();
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(1, "i")) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.bra = this.cursor;

                    if (!this.r_RV$esjava$0()) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.slice_del$esjava$0();
                } while (false);

                v_2 = this.limit - this.cursor;

                lab1: do {
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(1, "h")) {
                        this.cursor = this.limit - v_2;
                        break lab1;
                    }

                    this.bra = this.cursor;

                    if (!this.in_grouping_b$esjava$3(italianStemmer.g_CG, 99, 103)) {
                        this.cursor = this.limit - v_2;
                        break lab1;
                    }

                    if (!this.r_RV$esjava$0()) {
                        this.cursor = this.limit - v_2;
                        break lab1;
                    }

                    this.slice_del$esjava$0();
                } while (false);

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_prelude$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = v_2;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_attached_pronoun$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    lab4: do {
                        v_5 = this.limit - this.cursor;

                        lab5: do {
                            if (!this.r_standard_suffix$esjava$0()) {
                                break lab5;
                            }

                            break lab4;
                        } while (false);

                        this.cursor = this.limit - v_5;

                        if (!this.r_verb_suffix$esjava$0()) {
                            break lab3;
                        }
                    } while (false);
                } while (false);

                this.cursor = this.limit - v_4;
                v_6 = this.limit - this.cursor;

                lab6: do {
                    if (!this.r_vowel_suffix$esjava$0()) {
                        break lab6;
                    }
                } while (false);

                this.cursor = this.limit - v_6;
                this.cursor = this.limit_backward;
                v_7 = this.cursor;

                lab7: do {
                    if (!this.r_postlude$esjava$0()) {
                        break lab7;
                    }
                } while (false);

                this.cursor = v_7;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete italianStemmer.methodObject;
                return italianStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete italianStemmer.a_0;
                return italianStemmer.a_0 = [new Among("", -1, 7, "", italianStemmer.methodObject), new Among("qu", 0, 6, "", italianStemmer.methodObject), new Among('\u00E1', 0, 1, "", italianStemmer.methodObject), new Among('\u00E9', 0, 2, "", italianStemmer.methodObject), new Among('\u00ED', 0, 3, "", italianStemmer.methodObject), new Among('\u00F3', 0, 4, "", italianStemmer.methodObject), new Among('\u00FA', 0, 5, "", italianStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete italianStemmer.a_1;
                return italianStemmer.a_1 = [new Among("", -1, 3, "", italianStemmer.methodObject), new Among("I", 0, 1, "", italianStemmer.methodObject), new Among("U", 0, 2, "", italianStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete italianStemmer.a_2;
                return italianStemmer.a_2 = [new Among("la", -1, -1, "", italianStemmer.methodObject), new Among("cela", 0, -1, "", italianStemmer.methodObject), new Among("gliela", 0, -1, "", italianStemmer.methodObject), new Among("mela", 0, -1, "", italianStemmer.methodObject), new Among("tela", 0, -1, "", italianStemmer.methodObject), new Among("vela", 0, -1, "", italianStemmer.methodObject), new Among("le", -1, -1, "", italianStemmer.methodObject), new Among("cele", 6, -1, "", italianStemmer.methodObject), new Among("gliele", 6, -1, "", italianStemmer.methodObject), new Among("mele", 6, -1, "", italianStemmer.methodObject), new Among("tele", 6, -1, "", italianStemmer.methodObject), new Among("vele", 6, -1, "", italianStemmer.methodObject), new Among("ne", -1, -1, "", italianStemmer.methodObject), new Among("cene", 12, -1, "", italianStemmer.methodObject), new Among("gliene", 12, -1, "", italianStemmer.methodObject), new Among("mene", 12, -1, "", italianStemmer.methodObject), new Among("sene", 12, -1, "", italianStemmer.methodObject), new Among("tene", 12, -1, "", italianStemmer.methodObject), new Among("vene", 12, -1, "", italianStemmer.methodObject), new Among("ci", -1, -1, "", italianStemmer.methodObject), new Among("li", -1, -1, "", italianStemmer.methodObject), new Among("celi", 20, -1, "", italianStemmer.methodObject), new Among("glieli", 20, -1, "", italianStemmer.methodObject), new Among("meli", 20, -1, "", italianStemmer.methodObject), new Among("teli", 20, -1, "", italianStemmer.methodObject), new Among("veli", 20, -1, "", italianStemmer.methodObject), new Among("gli", 20, -1, "", italianStemmer.methodObject), new Among("mi", -1, -1, "", italianStemmer.methodObject), new Among("si", -1, -1, "", italianStemmer.methodObject), new Among("ti", -1, -1, "", italianStemmer.methodObject), new Among("vi", -1, -1, "", italianStemmer.methodObject), new Among("lo", -1, -1, "", italianStemmer.methodObject), new Among("celo", 31, -1, "", italianStemmer.methodObject), new Among("glielo", 31, -1, "", italianStemmer.methodObject), new Among("melo", 31, -1, "", italianStemmer.methodObject), new Among("telo", 31, -1, "", italianStemmer.methodObject), new Among("velo", 31, -1, "", italianStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete italianStemmer.a_3;
                return italianStemmer.a_3 = [new Among("ando", -1, 1, "", italianStemmer.methodObject), new Among("endo", -1, 1, "", italianStemmer.methodObject), new Among("ar", -1, 2, "", italianStemmer.methodObject), new Among("er", -1, 2, "", italianStemmer.methodObject), new Among("ir", -1, 2, "", italianStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete italianStemmer.a_4;
                return italianStemmer.a_4 = [new Among("ic", -1, -1, "", italianStemmer.methodObject), new Among("abil", -1, -1, "", italianStemmer.methodObject), new Among("os", -1, -1, "", italianStemmer.methodObject), new Among("iv", -1, 1, "", italianStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete italianStemmer.a_5;
                return italianStemmer.a_5 = [new Among("ic", -1, 1, "", italianStemmer.methodObject), new Among("abil", -1, 1, "", italianStemmer.methodObject), new Among("iv", -1, 1, "", italianStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete italianStemmer.a_6;
                return italianStemmer.a_6 = [new Among("ica", -1, 1, "", italianStemmer.methodObject), new Among("logia", -1, 3, "", italianStemmer.methodObject), new Among("osa", -1, 1, "", italianStemmer.methodObject), new Among("ista", -1, 1, "", italianStemmer.methodObject), new Among("iva", -1, 9, "", italianStemmer.methodObject), new Among("anza", -1, 1, "", italianStemmer.methodObject), new Among("enza", -1, 5, "", italianStemmer.methodObject), new Among("ice", -1, 1, "", italianStemmer.methodObject), new Among("atrice", 7, 1, "", italianStemmer.methodObject), new Among("iche", -1, 1, "", italianStemmer.methodObject), new Among("logie", -1, 3, "", italianStemmer.methodObject), new Among("abile", -1, 1, "", italianStemmer.methodObject), new Among("ibile", -1, 1, "", italianStemmer.methodObject), new Among("usione", -1, 4, "", italianStemmer.methodObject), new Among("azione", -1, 2, "", italianStemmer.methodObject), new Among("uzione", -1, 4, "", italianStemmer.methodObject), new Among("atore", -1, 2, "", italianStemmer.methodObject), new Among("ose", -1, 1, "", italianStemmer.methodObject), new Among("ante", -1, 1, "", italianStemmer.methodObject), new Among("mente", -1, 1, "", italianStemmer.methodObject), new Among("amente", 19, 7, "", italianStemmer.methodObject), new Among("iste", -1, 1, "", italianStemmer.methodObject), new Among("ive", -1, 9, "", italianStemmer.methodObject), new Among("anze", -1, 1, "", italianStemmer.methodObject), new Among("enze", -1, 5, "", italianStemmer.methodObject), new Among("ici", -1, 1, "", italianStemmer.methodObject), new Among("atrici", 25, 1, "", italianStemmer.methodObject), new Among("ichi", -1, 1, "", italianStemmer.methodObject), new Among("abili", -1, 1, "", italianStemmer.methodObject), new Among("ibili", -1, 1, "", italianStemmer.methodObject), new Among("ismi", -1, 1, "", italianStemmer.methodObject), new Among("usioni", -1, 4, "", italianStemmer.methodObject), new Among("azioni", -1, 2, "", italianStemmer.methodObject), new Among("uzioni", -1, 4, "", italianStemmer.methodObject), new Among("atori", -1, 2, "", italianStemmer.methodObject), new Among("osi", -1, 1, "", italianStemmer.methodObject), new Among("anti", -1, 1, "", italianStemmer.methodObject), new Among("amenti", -1, 6, "", italianStemmer.methodObject), new Among("imenti", -1, 6, "", italianStemmer.methodObject), new Among("isti", -1, 1, "", italianStemmer.methodObject), new Among("ivi", -1, 9, "", italianStemmer.methodObject), new Among("ico", -1, 1, "", italianStemmer.methodObject), new Among("ismo", -1, 1, "", italianStemmer.methodObject), new Among("oso", -1, 1, "", italianStemmer.methodObject), new Among("amento", -1, 6, "", italianStemmer.methodObject), new Among("imento", -1, 6, "", italianStemmer.methodObject), new Among("ivo", -1, 9, "", italianStemmer.methodObject), new Among('it\u00E0', -1, 8, "", italianStemmer.methodObject), new Among('ist\u00E0', -1, 1, "", italianStemmer.methodObject), new Among('ist\u00E8', -1, 1, "", italianStemmer.methodObject), new Among('ist\u00EC', -1, 1, "", italianStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete italianStemmer.a_7;
                return italianStemmer.a_7 = [new Among("isca", -1, 1, "", italianStemmer.methodObject), new Among("enda", -1, 1, "", italianStemmer.methodObject), new Among("ata", -1, 1, "", italianStemmer.methodObject), new Among("ita", -1, 1, "", italianStemmer.methodObject), new Among("uta", -1, 1, "", italianStemmer.methodObject), new Among("ava", -1, 1, "", italianStemmer.methodObject), new Among("eva", -1, 1, "", italianStemmer.methodObject), new Among("iva", -1, 1, "", italianStemmer.methodObject), new Among("erebbe", -1, 1, "", italianStemmer.methodObject), new Among("irebbe", -1, 1, "", italianStemmer.methodObject), new Among("isce", -1, 1, "", italianStemmer.methodObject), new Among("ende", -1, 1, "", italianStemmer.methodObject), new Among("are", -1, 1, "", italianStemmer.methodObject), new Among("ere", -1, 1, "", italianStemmer.methodObject), new Among("ire", -1, 1, "", italianStemmer.methodObject), new Among("asse", -1, 1, "", italianStemmer.methodObject), new Among("ate", -1, 1, "", italianStemmer.methodObject), new Among("avate", 16, 1, "", italianStemmer.methodObject), new Among("evate", 16, 1, "", italianStemmer.methodObject), new Among("ivate", 16, 1, "", italianStemmer.methodObject), new Among("ete", -1, 1, "", italianStemmer.methodObject), new Among("erete", 20, 1, "", italianStemmer.methodObject), new Among("irete", 20, 1, "", italianStemmer.methodObject), new Among("ite", -1, 1, "", italianStemmer.methodObject), new Among("ereste", -1, 1, "", italianStemmer.methodObject), new Among("ireste", -1, 1, "", italianStemmer.methodObject), new Among("ute", -1, 1, "", italianStemmer.methodObject), new Among("erai", -1, 1, "", italianStemmer.methodObject), new Among("irai", -1, 1, "", italianStemmer.methodObject), new Among("isci", -1, 1, "", italianStemmer.methodObject), new Among("endi", -1, 1, "", italianStemmer.methodObject), new Among("erei", -1, 1, "", italianStemmer.methodObject), new Among("irei", -1, 1, "", italianStemmer.methodObject), new Among("assi", -1, 1, "", italianStemmer.methodObject), new Among("ati", -1, 1, "", italianStemmer.methodObject), new Among("iti", -1, 1, "", italianStemmer.methodObject), new Among("eresti", -1, 1, "", italianStemmer.methodObject), new Among("iresti", -1, 1, "", italianStemmer.methodObject), new Among("uti", -1, 1, "", italianStemmer.methodObject), new Among("avi", -1, 1, "", italianStemmer.methodObject), new Among("evi", -1, 1, "", italianStemmer.methodObject), new Among("ivi", -1, 1, "", italianStemmer.methodObject), new Among("isco", -1, 1, "", italianStemmer.methodObject), new Among("ando", -1, 1, "", italianStemmer.methodObject), new Among("endo", -1, 1, "", italianStemmer.methodObject), new Among("Yamo", -1, 1, "", italianStemmer.methodObject), new Among("iamo", -1, 1, "", italianStemmer.methodObject), new Among("avamo", -1, 1, "", italianStemmer.methodObject), new Among("evamo", -1, 1, "", italianStemmer.methodObject), new Among("ivamo", -1, 1, "", italianStemmer.methodObject), new Among("eremo", -1, 1, "", italianStemmer.methodObject), new Among("iremo", -1, 1, "", italianStemmer.methodObject), new Among("assimo", -1, 1, "", italianStemmer.methodObject), new Among("ammo", -1, 1, "", italianStemmer.methodObject), new Among("emmo", -1, 1, "", italianStemmer.methodObject), new Among("eremmo", 54, 1, "", italianStemmer.methodObject), new Among("iremmo", 54, 1, "", italianStemmer.methodObject), new Among("immo", -1, 1, "", italianStemmer.methodObject), new Among("ano", -1, 1, "", italianStemmer.methodObject), new Among("iscano", 58, 1, "", italianStemmer.methodObject), new Among("avano", 58, 1, "", italianStemmer.methodObject), new Among("evano", 58, 1, "", italianStemmer.methodObject), new Among("ivano", 58, 1, "", italianStemmer.methodObject), new Among("eranno", -1, 1, "", italianStemmer.methodObject), new Among("iranno", -1, 1, "", italianStemmer.methodObject), new Among("ono", -1, 1, "", italianStemmer.methodObject), new Among("iscono", 65, 1, "", italianStemmer.methodObject), new Among("arono", 65, 1, "", italianStemmer.methodObject), new Among("erono", 65, 1, "", italianStemmer.methodObject), new Among("irono", 65, 1, "", italianStemmer.methodObject), new Among("erebbero", -1, 1, "", italianStemmer.methodObject), new Among("irebbero", -1, 1, "", italianStemmer.methodObject), new Among("assero", -1, 1, "", italianStemmer.methodObject), new Among("essero", -1, 1, "", italianStemmer.methodObject), new Among("issero", -1, 1, "", italianStemmer.methodObject), new Among("ato", -1, 1, "", italianStemmer.methodObject), new Among("ito", -1, 1, "", italianStemmer.methodObject), new Among("uto", -1, 1, "", italianStemmer.methodObject), new Among("avo", -1, 1, "", italianStemmer.methodObject), new Among("evo", -1, 1, "", italianStemmer.methodObject), new Among("ivo", -1, 1, "", italianStemmer.methodObject), new Among("ar", -1, 1, "", italianStemmer.methodObject), new Among("ir", -1, 1, "", italianStemmer.methodObject), new Among('er\u00E0', -1, 1, "", italianStemmer.methodObject), new Among('ir\u00E0', -1, 1, "", italianStemmer.methodObject), new Among('er\u00F2', -1, 1, "", italianStemmer.methodObject), new Among('ir\u00F2', -1, 1, "", italianStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete italianStemmer.g_v;
                return italianStemmer.g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 128, 8, 2, 1];
            }
        }, {
            key: 'g_AEIO',
            get: function get() {
                delete italianStemmer.g_AEIO;
                return italianStemmer.g_AEIO = [17, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 128, 8, 2];
            }
        }, {
            key: 'g_CG',
            get: function get() {
                delete italianStemmer.g_CG;
                return italianStemmer.g_CG = [17];
            }
        }]);

        return italianStemmer;
    })(SnowballStemmer);

    var norwegianStemmer = (function (_SnowballStemmer14) {
        _inherits(norwegianStemmer, _SnowballStemmer14);

        function norwegianStemmer() {
            _classCallCheck(this, norwegianStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(norwegianStemmer).apply(this, arguments));
        }

        _createClass(norwegianStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                this.I_p1 = this.limit;
                v_1 = this.cursor;
                {
                    var c = this.cursor + 3;

                    if (0 > c || c > this.limit) {
                        return false;
                    }

                    this.cursor = c;
                }
                this.I_x = this.cursor;
                this.cursor = v_1;

                golab0: while (true) {
                    v_2 = this.cursor;

                    lab1: do {
                        if (!this.in_grouping$esjava$3(norwegianStemmer.g_v, 97, 248)) {
                            break lab1;
                        }

                        this.cursor = v_2;
                        break golab0;
                    } while (false);

                    this.cursor = v_2;

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab2: while (true) {
                    lab3: do {
                        if (!this.out_grouping$esjava$3(norwegianStemmer.g_v, 97, 248)) {
                            break lab3;
                        }

                        break golab2;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p1 = this.cursor;

                lab4: do {
                    if (!(this.I_p1 < this.I_x)) {
                        break lab4;
                    }

                    this.I_p1 = this.I_x;
                } while (false);

                return true;
            }
        }, {
            key: 'r_main_suffix$esjava$0',
            value: function r_main_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(norwegianStemmer.a_0, 29);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        lab0: do {
                            v_3 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.in_grouping_b$esjava$3(norwegianStemmer.g_s_ending, 98, 122)) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_3;

                            if (!this.eq_s_b$esjava$2(1, "k")) {
                                return false;
                            }

                            if (!this.out_grouping_b$esjava$3(norwegianStemmer.g_v, 97, 248)) {
                                return false;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;

                    case 3:
                        this.slice_from$esjava$1("er");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_consonant_pair$esjava$0',
            value: function r_consonant_pair$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                v_1 = this.limit - this.cursor;
                v_2 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_3 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_2;
                this.ket = this.cursor;

                if (this.find_among_b$esjava$2(norwegianStemmer.a_1, 2) === 0) {
                    this.limit_backward = v_3;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_3;
                this.cursor = this.limit - v_1;

                if (this.cursor <= this.limit_backward) {
                    return false;
                }

                this.cursor--;
                this.bra = this.cursor;
                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_other_suffix$esjava$0',
            value: function r_other_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(norwegianStemmer.a_2, 11);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_main_suffix$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_consonant_pair$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    if (!this.r_other_suffix$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_x',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_x') ? this._$esjava$I_x : this._$esjava$I_x = 0;
            },
            set: function set(v) {
                this._$esjava$I_x = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete norwegianStemmer.methodObject;
                return norwegianStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete norwegianStemmer.a_0;
                return norwegianStemmer.a_0 = [new Among("a", -1, 1, "", norwegianStemmer.methodObject), new Among("e", -1, 1, "", norwegianStemmer.methodObject), new Among("ede", 1, 1, "", norwegianStemmer.methodObject), new Among("ande", 1, 1, "", norwegianStemmer.methodObject), new Among("ende", 1, 1, "", norwegianStemmer.methodObject), new Among("ane", 1, 1, "", norwegianStemmer.methodObject), new Among("ene", 1, 1, "", norwegianStemmer.methodObject), new Among("hetene", 6, 1, "", norwegianStemmer.methodObject), new Among("erte", 1, 3, "", norwegianStemmer.methodObject), new Among("en", -1, 1, "", norwegianStemmer.methodObject), new Among("heten", 9, 1, "", norwegianStemmer.methodObject), new Among("ar", -1, 1, "", norwegianStemmer.methodObject), new Among("er", -1, 1, "", norwegianStemmer.methodObject), new Among("heter", 12, 1, "", norwegianStemmer.methodObject), new Among("s", -1, 2, "", norwegianStemmer.methodObject), new Among("as", 14, 1, "", norwegianStemmer.methodObject), new Among("es", 14, 1, "", norwegianStemmer.methodObject), new Among("edes", 16, 1, "", norwegianStemmer.methodObject), new Among("endes", 16, 1, "", norwegianStemmer.methodObject), new Among("enes", 16, 1, "", norwegianStemmer.methodObject), new Among("hetenes", 19, 1, "", norwegianStemmer.methodObject), new Among("ens", 14, 1, "", norwegianStemmer.methodObject), new Among("hetens", 21, 1, "", norwegianStemmer.methodObject), new Among("ers", 14, 1, "", norwegianStemmer.methodObject), new Among("ets", 14, 1, "", norwegianStemmer.methodObject), new Among("et", -1, 1, "", norwegianStemmer.methodObject), new Among("het", 25, 1, "", norwegianStemmer.methodObject), new Among("ert", -1, 3, "", norwegianStemmer.methodObject), new Among("ast", -1, 1, "", norwegianStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete norwegianStemmer.a_1;
                return norwegianStemmer.a_1 = [new Among("dt", -1, -1, "", norwegianStemmer.methodObject), new Among("vt", -1, -1, "", norwegianStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete norwegianStemmer.a_2;
                return norwegianStemmer.a_2 = [new Among("leg", -1, 1, "", norwegianStemmer.methodObject), new Among("eleg", 0, 1, "", norwegianStemmer.methodObject), new Among("ig", -1, 1, "", norwegianStemmer.methodObject), new Among("eig", 2, 1, "", norwegianStemmer.methodObject), new Among("lig", 2, 1, "", norwegianStemmer.methodObject), new Among("elig", 4, 1, "", norwegianStemmer.methodObject), new Among("els", -1, 1, "", norwegianStemmer.methodObject), new Among("lov", -1, 1, "", norwegianStemmer.methodObject), new Among("elov", 7, 1, "", norwegianStemmer.methodObject), new Among("slov", 7, 1, "", norwegianStemmer.methodObject), new Among("hetslov", 9, 1, "", norwegianStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete norwegianStemmer.g_v;
                return norwegianStemmer.g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 128];
            }
        }, {
            key: 'g_s_ending',
            get: function get() {
                delete norwegianStemmer.g_s_ending;
                return norwegianStemmer.g_s_ending = [119, 125, 149, 1];
            }
        }]);

        return norwegianStemmer;
    })(SnowballStemmer);

    var porterStemmer = (function (_SnowballStemmer15) {
        _inherits(porterStemmer, _SnowballStemmer15);

        function porterStemmer() {
            _classCallCheck(this, porterStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(porterStemmer).apply(this, arguments));
        }

        _createClass(porterStemmer, [{
            key: 'r_shortv$esjava$0',
            value: function r_shortv$esjava$0() {
                if (!this.out_grouping_b$esjava$3(porterStemmer.g_v_WXY, 89, 121)) {
                    return false;
                }

                if (!this.in_grouping_b$esjava$3(porterStemmer.g_v, 97, 121)) {
                    return false;
                }

                if (!this.out_grouping_b$esjava$3(porterStemmer.g_v, 97, 121)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_Step_1a$esjava$0',
            value: function r_Step_1a$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(porterStemmer.a_0, 4);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("ss");
                        break;

                    case 2:
                        this.slice_from$esjava$1("i");
                        break;

                    case 3:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_1b$esjava$0',
            value: function r_Step_1b$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(porterStemmer.a_2, 3);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ee");
                        break;

                    case 2:
                        v_1 = this.limit - this.cursor;

                        golab0: while (true) {
                            lab1: do {
                                if (!this.in_grouping_b$esjava$3(porterStemmer.g_v, 97, 121)) {
                                    break lab1;
                                }

                                break golab0;
                            } while (false);

                            if (this.cursor <= this.limit_backward) {
                                return false;
                            }

                            this.cursor--;
                        }

                        this.cursor = this.limit - v_1;
                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;
                        among_var = this.find_among_b$esjava$2(porterStemmer.a_1, 13);

                        if (among_var === 0) {
                            return false;
                        }

                        this.cursor = this.limit - v_3;

                        switch (among_var) {
                            case 0:
                                return false;

                            case 1:
                                {
                                    var c = this.cursor;
                                    this.insert$esjava$3(this.cursor, this.cursor, "e");
                                    this.cursor = c;
                                }
                                break;

                            case 2:
                                this.ket = this.cursor;

                                if (this.cursor <= this.limit_backward) {
                                    return false;
                                }

                                this.cursor--;
                                this.bra = this.cursor;
                                this.slice_del$esjava$0();
                                break;

                            case 3:
                                if (this.cursor !== this.I_p1) {
                                    return false;
                                }

                                v_4 = this.limit - this.cursor;

                                if (!this.r_shortv$esjava$0()) {
                                    return false;
                                }

                                this.cursor = this.limit - v_4;
                                {
                                    var c = this.cursor;
                                    this.insert$esjava$3(this.cursor, this.cursor, "e");
                                    this.cursor = c;
                                }
                                break;
                        }

                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_1c$esjava$0',
            value: function r_Step_1c$esjava$0() {
                var v_1 = undefined;
                this.ket = this.cursor;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.eq_s_b$esjava$2(1, "y")) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    if (!this.eq_s_b$esjava$2(1, "Y")) {
                        return false;
                    }
                } while (false);

                this.bra = this.cursor;

                golab2: while (true) {
                    lab3: do {
                        if (!this.in_grouping_b$esjava$3(porterStemmer.g_v, 97, 121)) {
                            break lab3;
                        }

                        break golab2;
                    } while (false);

                    if (this.cursor <= this.limit_backward) {
                        return false;
                    }

                    this.cursor--;
                }

                this.slice_from$esjava$1("i");
                return true;
            }
        }, {
            key: 'r_Step_2$esjava$0',
            value: function r_Step_2$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(porterStemmer.a_3, 20);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("tion");
                        break;

                    case 2:
                        this.slice_from$esjava$1("ence");
                        break;

                    case 3:
                        this.slice_from$esjava$1("ance");
                        break;

                    case 4:
                        this.slice_from$esjava$1("able");
                        break;

                    case 5:
                        this.slice_from$esjava$1("ent");
                        break;

                    case 6:
                        this.slice_from$esjava$1("e");
                        break;

                    case 7:
                        this.slice_from$esjava$1("ize");
                        break;

                    case 8:
                        this.slice_from$esjava$1("ate");
                        break;

                    case 9:
                        this.slice_from$esjava$1("al");
                        break;

                    case 10:
                        this.slice_from$esjava$1("al");
                        break;

                    case 11:
                        this.slice_from$esjava$1("ful");
                        break;

                    case 12:
                        this.slice_from$esjava$1("ous");
                        break;

                    case 13:
                        this.slice_from$esjava$1("ive");
                        break;

                    case 14:
                        this.slice_from$esjava$1("ble");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_3$esjava$0',
            value: function r_Step_3$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(porterStemmer.a_4, 7);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("al");
                        break;

                    case 2:
                        this.slice_from$esjava$1("ic");
                        break;

                    case 3:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_4$esjava$0',
            value: function r_Step_4$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(porterStemmer.a_5, 19);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R2$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        lab0: do {
                            v_1 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.eq_s_b$esjava$2(1, "s")) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_1;

                            if (!this.eq_s_b$esjava$2(1, "t")) {
                                return false;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_Step_5a$esjava$0',
            value: function r_Step_5a$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                this.ket = this.cursor;

                if (!this.eq_s_b$esjava$2(1, "e")) {
                    return false;
                }

                this.bra = this.cursor;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.r_R2$esjava$0()) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    if (!this.r_R1$esjava$0()) {
                        return false;
                    }

                    {
                        v_2 = this.limit - this.cursor;

                        lab2: do {
                            if (!this.r_shortv$esjava$0()) {
                                break lab2;
                            }

                            return false;
                        } while (false);

                        this.cursor = this.limit - v_2;
                    }
                } while (false);

                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_Step_5b$esjava$0',
            value: function r_Step_5b$esjava$0() {
                this.ket = this.cursor;

                if (!this.eq_s_b$esjava$2(1, "l")) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R2$esjava$0()) {
                    return false;
                }

                if (!this.eq_s_b$esjava$2(1, "l")) {
                    return false;
                }

                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                var v_12 = undefined;
                var v_13 = undefined;
                var v_14 = undefined;
                var v_15 = undefined;
                var v_16 = undefined;
                var v_17 = undefined;
                var v_18 = undefined;
                var v_19 = undefined;
                var v_20 = undefined;
                this.B_Y_found = false;
                v_1 = this.cursor;

                lab0: do {
                    this.bra = this.cursor;

                    if (!this.eq_s$esjava$2(1, "y")) {
                        break lab0;
                    }

                    this.ket = this.cursor;
                    this.slice_from$esjava$1("Y");
                    this.B_Y_found = true;
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    replab2: while (true) {
                        v_3 = this.cursor;

                        lab3: do {
                            golab4: while (true) {
                                v_4 = this.cursor;

                                lab5: do {
                                    if (!this.in_grouping$esjava$3(porterStemmer.g_v, 97, 121)) {
                                        break lab5;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.eq_s$esjava$2(1, "y")) {
                                        break lab5;
                                    }

                                    this.ket = this.cursor;
                                    this.cursor = v_4;
                                    break golab4;
                                } while (false);

                                this.cursor = v_4;

                                if (this.cursor >= this.limit) {
                                    break lab3;
                                }

                                this.cursor++;
                            }

                            this.slice_from$esjava$1("Y");
                            this.B_Y_found = true;
                            continue replab2;
                        } while (false);

                        this.cursor = v_3;
                        break replab2;
                    }
                } while (false);

                this.cursor = v_2;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_5 = this.cursor;

                lab6: do {
                    golab7: while (true) {
                        lab8: do {
                            if (!this.in_grouping$esjava$3(porterStemmer.g_v, 97, 121)) {
                                break lab8;
                            }

                            break golab7;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab6;
                        }

                        this.cursor++;
                    }

                    golab9: while (true) {
                        lab10: do {
                            if (!this.out_grouping$esjava$3(porterStemmer.g_v, 97, 121)) {
                                break lab10;
                            }

                            break golab9;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab6;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab11: while (true) {
                        lab12: do {
                            if (!this.in_grouping$esjava$3(porterStemmer.g_v, 97, 121)) {
                                break lab12;
                            }

                            break golab11;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab6;
                        }

                        this.cursor++;
                    }

                    golab13: while (true) {
                        lab14: do {
                            if (!this.out_grouping$esjava$3(porterStemmer.g_v, 97, 121)) {
                                break lab14;
                            }

                            break golab13;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab6;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_5;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_10 = this.limit - this.cursor;

                lab15: do {
                    if (!this.r_Step_1a$esjava$0()) {
                        break lab15;
                    }
                } while (false);

                this.cursor = this.limit - v_10;
                v_11 = this.limit - this.cursor;

                lab16: do {
                    if (!this.r_Step_1b$esjava$0()) {
                        break lab16;
                    }
                } while (false);

                this.cursor = this.limit - v_11;
                v_12 = this.limit - this.cursor;

                lab17: do {
                    if (!this.r_Step_1c$esjava$0()) {
                        break lab17;
                    }
                } while (false);

                this.cursor = this.limit - v_12;
                v_13 = this.limit - this.cursor;

                lab18: do {
                    if (!this.r_Step_2$esjava$0()) {
                        break lab18;
                    }
                } while (false);

                this.cursor = this.limit - v_13;
                v_14 = this.limit - this.cursor;

                lab19: do {
                    if (!this.r_Step_3$esjava$0()) {
                        break lab19;
                    }
                } while (false);

                this.cursor = this.limit - v_14;
                v_15 = this.limit - this.cursor;

                lab20: do {
                    if (!this.r_Step_4$esjava$0()) {
                        break lab20;
                    }
                } while (false);

                this.cursor = this.limit - v_15;
                v_16 = this.limit - this.cursor;

                lab21: do {
                    if (!this.r_Step_5a$esjava$0()) {
                        break lab21;
                    }
                } while (false);

                this.cursor = this.limit - v_16;
                v_17 = this.limit - this.cursor;

                lab22: do {
                    if (!this.r_Step_5b$esjava$0()) {
                        break lab22;
                    }
                } while (false);

                this.cursor = this.limit - v_17;
                this.cursor = this.limit_backward;
                v_18 = this.cursor;

                lab23: do {
                    if (!this.B_Y_found) {
                        break lab23;
                    }

                    replab24: while (true) {
                        v_19 = this.cursor;

                        lab25: do {
                            golab26: while (true) {
                                v_20 = this.cursor;

                                lab27: do {
                                    this.bra = this.cursor;

                                    if (!this.eq_s$esjava$2(1, "Y")) {
                                        break lab27;
                                    }

                                    this.ket = this.cursor;
                                    this.cursor = v_20;
                                    break golab26;
                                } while (false);

                                this.cursor = v_20;

                                if (this.cursor >= this.limit) {
                                    break lab25;
                                }

                                this.cursor++;
                            }

                            this.slice_from$esjava$1("y");
                            continue replab24;
                        } while (false);

                        this.cursor = v_19;
                        break replab24;
                    }
                } while (false);

                this.cursor = v_18;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'B_Y_found',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$B_Y_found') ? this._$esjava$B_Y_found : this._$esjava$B_Y_found = false;
            },
            set: function set(v) {
                this._$esjava$B_Y_found = v;
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete porterStemmer.methodObject;
                return porterStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete porterStemmer.a_0;
                return porterStemmer.a_0 = [new Among("s", -1, 3, "", porterStemmer.methodObject), new Among("ies", 0, 2, "", porterStemmer.methodObject), new Among("sses", 0, 1, "", porterStemmer.methodObject), new Among("ss", 0, -1, "", porterStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete porterStemmer.a_1;
                return porterStemmer.a_1 = [new Among("", -1, 3, "", porterStemmer.methodObject), new Among("bb", 0, 2, "", porterStemmer.methodObject), new Among("dd", 0, 2, "", porterStemmer.methodObject), new Among("ff", 0, 2, "", porterStemmer.methodObject), new Among("gg", 0, 2, "", porterStemmer.methodObject), new Among("bl", 0, 1, "", porterStemmer.methodObject), new Among("mm", 0, 2, "", porterStemmer.methodObject), new Among("nn", 0, 2, "", porterStemmer.methodObject), new Among("pp", 0, 2, "", porterStemmer.methodObject), new Among("rr", 0, 2, "", porterStemmer.methodObject), new Among("at", 0, 1, "", porterStemmer.methodObject), new Among("tt", 0, 2, "", porterStemmer.methodObject), new Among("iz", 0, 1, "", porterStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete porterStemmer.a_2;
                return porterStemmer.a_2 = [new Among("ed", -1, 2, "", porterStemmer.methodObject), new Among("eed", 0, 1, "", porterStemmer.methodObject), new Among("ing", -1, 2, "", porterStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete porterStemmer.a_3;
                return porterStemmer.a_3 = [new Among("anci", -1, 3, "", porterStemmer.methodObject), new Among("enci", -1, 2, "", porterStemmer.methodObject), new Among("abli", -1, 4, "", porterStemmer.methodObject), new Among("eli", -1, 6, "", porterStemmer.methodObject), new Among("alli", -1, 9, "", porterStemmer.methodObject), new Among("ousli", -1, 12, "", porterStemmer.methodObject), new Among("entli", -1, 5, "", porterStemmer.methodObject), new Among("aliti", -1, 10, "", porterStemmer.methodObject), new Among("biliti", -1, 14, "", porterStemmer.methodObject), new Among("iviti", -1, 13, "", porterStemmer.methodObject), new Among("tional", -1, 1, "", porterStemmer.methodObject), new Among("ational", 10, 8, "", porterStemmer.methodObject), new Among("alism", -1, 10, "", porterStemmer.methodObject), new Among("ation", -1, 8, "", porterStemmer.methodObject), new Among("ization", 13, 7, "", porterStemmer.methodObject), new Among("izer", -1, 7, "", porterStemmer.methodObject), new Among("ator", -1, 8, "", porterStemmer.methodObject), new Among("iveness", -1, 13, "", porterStemmer.methodObject), new Among("fulness", -1, 11, "", porterStemmer.methodObject), new Among("ousness", -1, 12, "", porterStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete porterStemmer.a_4;
                return porterStemmer.a_4 = [new Among("icate", -1, 2, "", porterStemmer.methodObject), new Among("ative", -1, 3, "", porterStemmer.methodObject), new Among("alize", -1, 1, "", porterStemmer.methodObject), new Among("iciti", -1, 2, "", porterStemmer.methodObject), new Among("ical", -1, 2, "", porterStemmer.methodObject), new Among("ful", -1, 3, "", porterStemmer.methodObject), new Among("ness", -1, 3, "", porterStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete porterStemmer.a_5;
                return porterStemmer.a_5 = [new Among("ic", -1, 1, "", porterStemmer.methodObject), new Among("ance", -1, 1, "", porterStemmer.methodObject), new Among("ence", -1, 1, "", porterStemmer.methodObject), new Among("able", -1, 1, "", porterStemmer.methodObject), new Among("ible", -1, 1, "", porterStemmer.methodObject), new Among("ate", -1, 1, "", porterStemmer.methodObject), new Among("ive", -1, 1, "", porterStemmer.methodObject), new Among("ize", -1, 1, "", porterStemmer.methodObject), new Among("iti", -1, 1, "", porterStemmer.methodObject), new Among("al", -1, 1, "", porterStemmer.methodObject), new Among("ism", -1, 1, "", porterStemmer.methodObject), new Among("ion", -1, 2, "", porterStemmer.methodObject), new Among("er", -1, 1, "", porterStemmer.methodObject), new Among("ous", -1, 1, "", porterStemmer.methodObject), new Among("ant", -1, 1, "", porterStemmer.methodObject), new Among("ent", -1, 1, "", porterStemmer.methodObject), new Among("ment", 15, 1, "", porterStemmer.methodObject), new Among("ement", 16, 1, "", porterStemmer.methodObject), new Among("ou", -1, 1, "", porterStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete porterStemmer.g_v;
                return porterStemmer.g_v = [17, 65, 16, 1];
            }
        }, {
            key: 'g_v_WXY',
            get: function get() {
                delete porterStemmer.g_v_WXY;
                return porterStemmer.g_v_WXY = [1, 17, 65, 208, 1];
            }
        }]);

        return porterStemmer;
    })(SnowballStemmer);

    var portugueseStemmer = (function (_SnowballStemmer16) {
        _inherits(portugueseStemmer, _SnowballStemmer16);

        function portugueseStemmer() {
            _classCallCheck(this, portugueseStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(portugueseStemmer).apply(this, arguments));
        }

        _createClass(portugueseStemmer, [{
            key: 'r_prelude$esjava$0',
            value: function r_prelude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(portugueseStemmer.a_0, 3);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("a~");
                                break;

                            case 2:
                                this.slice_from$esjava$1("o~");
                                break;

                            case 3:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_6 = undefined;
                var v_8 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (!this.in_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                break lab2;
                            }

                            lab3: do {
                                v_3 = this.cursor;

                                lab4: do {
                                    if (!this.out_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                        break lab4;
                                    }

                                    golab5: while (true) {
                                        lab6: do {
                                            if (!this.in_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                                break lab6;
                                            }

                                            break golab5;
                                        } while (false);

                                        if (this.cursor >= this.limit) {
                                            break lab4;
                                        }

                                        this.cursor++;
                                    }

                                    break lab3;
                                } while (false);

                                this.cursor = v_3;

                                if (!this.in_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                    break lab2;
                                }

                                golab7: while (true) {
                                    lab8: do {
                                        if (!this.out_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                            break lab8;
                                        }

                                        break golab7;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab2;
                                    }

                                    this.cursor++;
                                }
                            } while (false);

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        if (!this.out_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                            break lab0;
                        }

                        lab9: do {
                            v_6 = this.cursor;

                            lab10: do {
                                if (!this.out_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                    break lab10;
                                }

                                golab11: while (true) {
                                    lab12: do {
                                        if (!this.in_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                            break lab12;
                                        }

                                        break golab11;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab10;
                                    }

                                    this.cursor++;
                                }

                                break lab9;
                            } while (false);

                            this.cursor = v_6;

                            if (!this.in_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                break lab0;
                            }

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        } while (false);
                    } while (false);

                    this.I_pV = this.cursor;
                } while (false);

                this.cursor = v_1;
                v_8 = this.cursor;

                lab13: do {
                    golab14: while (true) {
                        lab15: do {
                            if (!this.in_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                break lab15;
                            }

                            break golab14;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab16: while (true) {
                        lab17: do {
                            if (!this.out_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                break lab17;
                            }

                            break golab16;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab18: while (true) {
                        lab19: do {
                            if (!this.in_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                break lab19;
                            }

                            break golab18;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab20: while (true) {
                        lab21: do {
                            if (!this.out_grouping$esjava$3(portugueseStemmer.g_v, 97, 250)) {
                                break lab21;
                            }

                            break golab20;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_8;
                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(portugueseStemmer.a_1, 3);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1('\u00E3');
                                break;

                            case 2:
                                this.slice_from$esjava$1('\u00F5');
                                break;

                            case 3:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(portugueseStemmer.a_5, 45);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("log");
                        break;

                    case 3:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("u");
                        break;

                    case 4:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ente");
                        break;

                    case 5:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(portugueseStemmer.a_2, 4);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.slice_del$esjava$0();

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_1;
                                    break lab0;

                                case 1:
                                    this.ket = this.cursor;

                                    if (!this.eq_s_b$esjava$2(2, "at")) {
                                        this.cursor = this.limit - v_1;
                                        break lab0;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_1;
                                        break lab0;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 6:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_2 = this.limit - this.cursor;

                        lab1: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(portugueseStemmer.a_3, 3);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_2;
                                break lab1;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_2;
                                    break lab1;

                                case 1:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_2;
                                        break lab1;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 7:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;

                        lab2: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(portugueseStemmer.a_4, 3);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_3;
                                break lab2;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_3;
                                    break lab2;

                                case 1:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_3;
                                        break lab2;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 8:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_4 = this.limit - this.cursor;

                        lab3: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "at")) {
                                this.cursor = this.limit - v_4;
                                break lab3;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_4;
                                break lab3;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;

                    case 9:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        if (!this.eq_s_b$esjava$2(1, "e")) {
                            return false;
                        }

                        this.slice_from$esjava$1("ir");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_verb_suffix$esjava$0',
            value: function r_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(portugueseStemmer.a_6, 120);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        this.limit_backward = v_2;
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                this.limit_backward = v_2;
                return true;
            }
        }, {
            key: 'r_residual_suffix$esjava$0',
            value: function r_residual_suffix$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(portugueseStemmer.a_7, 7);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_residual_form$esjava$0',
            value: function r_residual_form$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(portugueseStemmer.a_8, 4);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        this.ket = this.cursor;

                        lab0: do {
                            v_1 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.eq_s_b$esjava$2(1, "u")) {
                                    break lab1;
                                }

                                this.bra = this.cursor;
                                v_2 = this.limit - this.cursor;

                                if (!this.eq_s_b$esjava$2(1, "g")) {
                                    break lab1;
                                }

                                this.cursor = this.limit - v_2;
                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_1;

                            if (!this.eq_s_b$esjava$2(1, "i")) {
                                return false;
                            }

                            this.bra = this.cursor;
                            v_3 = this.limit - this.cursor;

                            if (!this.eq_s_b$esjava$2(1, "c")) {
                                return false;
                            }

                            this.cursor = this.limit - v_3;
                        } while (false);

                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("c");
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_prelude$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = v_2;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    lab3: do {
                        v_4 = this.limit - this.cursor;

                        lab4: do {
                            v_5 = this.limit - this.cursor;

                            lab5: do {
                                v_6 = this.limit - this.cursor;

                                lab6: do {
                                    if (!this.r_standard_suffix$esjava$0()) {
                                        break lab6;
                                    }

                                    break lab5;
                                } while (false);

                                this.cursor = this.limit - v_6;

                                if (!this.r_verb_suffix$esjava$0()) {
                                    break lab4;
                                }
                            } while (false);

                            this.cursor = this.limit - v_5;
                            v_7 = this.limit - this.cursor;

                            lab7: do {
                                this.ket = this.cursor;

                                if (!this.eq_s_b$esjava$2(1, "i")) {
                                    break lab7;
                                }

                                this.bra = this.cursor;
                                v_8 = this.limit - this.cursor;

                                if (!this.eq_s_b$esjava$2(1, "c")) {
                                    break lab7;
                                }

                                this.cursor = this.limit - v_8;

                                if (!this.r_RV$esjava$0()) {
                                    break lab7;
                                }

                                this.slice_del$esjava$0();
                            } while (false);

                            this.cursor = this.limit - v_7;
                            break lab3;
                        } while (false);

                        this.cursor = this.limit - v_4;

                        if (!this.r_residual_suffix$esjava$0()) {
                            break lab2;
                        }
                    } while (false);
                } while (false);

                this.cursor = this.limit - v_3;
                v_9 = this.limit - this.cursor;

                lab8: do {
                    if (!this.r_residual_form$esjava$0()) {
                        break lab8;
                    }
                } while (false);

                this.cursor = this.limit - v_9;
                this.cursor = this.limit_backward;
                v_10 = this.cursor;

                lab9: do {
                    if (!this.r_postlude$esjava$0()) {
                        break lab9;
                    }
                } while (false);

                this.cursor = v_10;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete portugueseStemmer.methodObject;
                return portugueseStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete portugueseStemmer.a_0;
                return portugueseStemmer.a_0 = [new Among("", -1, 3, "", portugueseStemmer.methodObject), new Among('\u00E3', 0, 1, "", portugueseStemmer.methodObject), new Among('\u00F5', 0, 2, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete portugueseStemmer.a_1;
                return portugueseStemmer.a_1 = [new Among("", -1, 3, "", portugueseStemmer.methodObject), new Among("a~", 0, 1, "", portugueseStemmer.methodObject), new Among("o~", 0, 2, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete portugueseStemmer.a_2;
                return portugueseStemmer.a_2 = [new Among("ic", -1, -1, "", portugueseStemmer.methodObject), new Among("ad", -1, -1, "", portugueseStemmer.methodObject), new Among("os", -1, -1, "", portugueseStemmer.methodObject), new Among("iv", -1, 1, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete portugueseStemmer.a_3;
                return portugueseStemmer.a_3 = [new Among("ante", -1, 1, "", portugueseStemmer.methodObject), new Among("avel", -1, 1, "", portugueseStemmer.methodObject), new Among('\u00EDvel', -1, 1, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete portugueseStemmer.a_4;
                return portugueseStemmer.a_4 = [new Among("ic", -1, 1, "", portugueseStemmer.methodObject), new Among("abil", -1, 1, "", portugueseStemmer.methodObject), new Among("iv", -1, 1, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete portugueseStemmer.a_5;
                return portugueseStemmer.a_5 = [new Among("ica", -1, 1, "", portugueseStemmer.methodObject), new Among('\u00E2ncia', -1, 1, "", portugueseStemmer.methodObject), new Among('\u00EAncia', -1, 4, "", portugueseStemmer.methodObject), new Among("ira", -1, 9, "", portugueseStemmer.methodObject), new Among("adora", -1, 1, "", portugueseStemmer.methodObject), new Among("osa", -1, 1, "", portugueseStemmer.methodObject), new Among("ista", -1, 1, "", portugueseStemmer.methodObject), new Among("iva", -1, 8, "", portugueseStemmer.methodObject), new Among("eza", -1, 1, "", portugueseStemmer.methodObject), new Among('log\u00EDa', -1, 2, "", portugueseStemmer.methodObject), new Among("idade", -1, 7, "", portugueseStemmer.methodObject), new Among("ante", -1, 1, "", portugueseStemmer.methodObject), new Among("mente", -1, 6, "", portugueseStemmer.methodObject), new Among("amente", 12, 5, "", portugueseStemmer.methodObject), new Among('\u00E1vel', -1, 1, "", portugueseStemmer.methodObject), new Among('\u00EDvel', -1, 1, "", portugueseStemmer.methodObject), new Among('uci\u00F3n', -1, 3, "", portugueseStemmer.methodObject), new Among("ico", -1, 1, "", portugueseStemmer.methodObject), new Among("ismo", -1, 1, "", portugueseStemmer.methodObject), new Among("oso", -1, 1, "", portugueseStemmer.methodObject), new Among("amento", -1, 1, "", portugueseStemmer.methodObject), new Among("imento", -1, 1, "", portugueseStemmer.methodObject), new Among("ivo", -1, 8, "", portugueseStemmer.methodObject), new Among('a\u00E7a~o', -1, 1, "", portugueseStemmer.methodObject), new Among("ador", -1, 1, "", portugueseStemmer.methodObject), new Among("icas", -1, 1, "", portugueseStemmer.methodObject), new Among('\u00EAncias', -1, 4, "", portugueseStemmer.methodObject), new Among("iras", -1, 9, "", portugueseStemmer.methodObject), new Among("adoras", -1, 1, "", portugueseStemmer.methodObject), new Among("osas", -1, 1, "", portugueseStemmer.methodObject), new Among("istas", -1, 1, "", portugueseStemmer.methodObject), new Among("ivas", -1, 8, "", portugueseStemmer.methodObject), new Among("ezas", -1, 1, "", portugueseStemmer.methodObject), new Among('log\u00EDas', -1, 2, "", portugueseStemmer.methodObject), new Among("idades", -1, 7, "", portugueseStemmer.methodObject), new Among("uciones", -1, 3, "", portugueseStemmer.methodObject), new Among("adores", -1, 1, "", portugueseStemmer.methodObject), new Among("antes", -1, 1, "", portugueseStemmer.methodObject), new Among('a\u00E7o~es', -1, 1, "", portugueseStemmer.methodObject), new Among("icos", -1, 1, "", portugueseStemmer.methodObject), new Among("ismos", -1, 1, "", portugueseStemmer.methodObject), new Among("osos", -1, 1, "", portugueseStemmer.methodObject), new Among("amentos", -1, 1, "", portugueseStemmer.methodObject), new Among("imentos", -1, 1, "", portugueseStemmer.methodObject), new Among("ivos", -1, 8, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete portugueseStemmer.a_6;
                return portugueseStemmer.a_6 = [new Among("ada", -1, 1, "", portugueseStemmer.methodObject), new Among("ida", -1, 1, "", portugueseStemmer.methodObject), new Among("ia", -1, 1, "", portugueseStemmer.methodObject), new Among("aria", 2, 1, "", portugueseStemmer.methodObject), new Among("eria", 2, 1, "", portugueseStemmer.methodObject), new Among("iria", 2, 1, "", portugueseStemmer.methodObject), new Among("ara", -1, 1, "", portugueseStemmer.methodObject), new Among("era", -1, 1, "", portugueseStemmer.methodObject), new Among("ira", -1, 1, "", portugueseStemmer.methodObject), new Among("ava", -1, 1, "", portugueseStemmer.methodObject), new Among("asse", -1, 1, "", portugueseStemmer.methodObject), new Among("esse", -1, 1, "", portugueseStemmer.methodObject), new Among("isse", -1, 1, "", portugueseStemmer.methodObject), new Among("aste", -1, 1, "", portugueseStemmer.methodObject), new Among("este", -1, 1, "", portugueseStemmer.methodObject), new Among("iste", -1, 1, "", portugueseStemmer.methodObject), new Among("ei", -1, 1, "", portugueseStemmer.methodObject), new Among("arei", 16, 1, "", portugueseStemmer.methodObject), new Among("erei", 16, 1, "", portugueseStemmer.methodObject), new Among("irei", 16, 1, "", portugueseStemmer.methodObject), new Among("am", -1, 1, "", portugueseStemmer.methodObject), new Among("iam", 20, 1, "", portugueseStemmer.methodObject), new Among("ariam", 21, 1, "", portugueseStemmer.methodObject), new Among("eriam", 21, 1, "", portugueseStemmer.methodObject), new Among("iriam", 21, 1, "", portugueseStemmer.methodObject), new Among("aram", 20, 1, "", portugueseStemmer.methodObject), new Among("eram", 20, 1, "", portugueseStemmer.methodObject), new Among("iram", 20, 1, "", portugueseStemmer.methodObject), new Among("avam", 20, 1, "", portugueseStemmer.methodObject), new Among("em", -1, 1, "", portugueseStemmer.methodObject), new Among("arem", 29, 1, "", portugueseStemmer.methodObject), new Among("erem", 29, 1, "", portugueseStemmer.methodObject), new Among("irem", 29, 1, "", portugueseStemmer.methodObject), new Among("assem", 29, 1, "", portugueseStemmer.methodObject), new Among("essem", 29, 1, "", portugueseStemmer.methodObject), new Among("issem", 29, 1, "", portugueseStemmer.methodObject), new Among("ado", -1, 1, "", portugueseStemmer.methodObject), new Among("ido", -1, 1, "", portugueseStemmer.methodObject), new Among("ando", -1, 1, "", portugueseStemmer.methodObject), new Among("endo", -1, 1, "", portugueseStemmer.methodObject), new Among("indo", -1, 1, "", portugueseStemmer.methodObject), new Among("ara~o", -1, 1, "", portugueseStemmer.methodObject), new Among("era~o", -1, 1, "", portugueseStemmer.methodObject), new Among("ira~o", -1, 1, "", portugueseStemmer.methodObject), new Among("ar", -1, 1, "", portugueseStemmer.methodObject), new Among("er", -1, 1, "", portugueseStemmer.methodObject), new Among("ir", -1, 1, "", portugueseStemmer.methodObject), new Among("as", -1, 1, "", portugueseStemmer.methodObject), new Among("adas", 47, 1, "", portugueseStemmer.methodObject), new Among("idas", 47, 1, "", portugueseStemmer.methodObject), new Among("ias", 47, 1, "", portugueseStemmer.methodObject), new Among("arias", 50, 1, "", portugueseStemmer.methodObject), new Among("erias", 50, 1, "", portugueseStemmer.methodObject), new Among("irias", 50, 1, "", portugueseStemmer.methodObject), new Among("aras", 47, 1, "", portugueseStemmer.methodObject), new Among("eras", 47, 1, "", portugueseStemmer.methodObject), new Among("iras", 47, 1, "", portugueseStemmer.methodObject), new Among("avas", 47, 1, "", portugueseStemmer.methodObject), new Among("es", -1, 1, "", portugueseStemmer.methodObject), new Among("ardes", 58, 1, "", portugueseStemmer.methodObject), new Among("erdes", 58, 1, "", portugueseStemmer.methodObject), new Among("irdes", 58, 1, "", portugueseStemmer.methodObject), new Among("ares", 58, 1, "", portugueseStemmer.methodObject), new Among("eres", 58, 1, "", portugueseStemmer.methodObject), new Among("ires", 58, 1, "", portugueseStemmer.methodObject), new Among("asses", 58, 1, "", portugueseStemmer.methodObject), new Among("esses", 58, 1, "", portugueseStemmer.methodObject), new Among("isses", 58, 1, "", portugueseStemmer.methodObject), new Among("astes", 58, 1, "", portugueseStemmer.methodObject), new Among("estes", 58, 1, "", portugueseStemmer.methodObject), new Among("istes", 58, 1, "", portugueseStemmer.methodObject), new Among("is", -1, 1, "", portugueseStemmer.methodObject), new Among("ais", 71, 1, "", portugueseStemmer.methodObject), new Among("eis", 71, 1, "", portugueseStemmer.methodObject), new Among("areis", 73, 1, "", portugueseStemmer.methodObject), new Among("ereis", 73, 1, "", portugueseStemmer.methodObject), new Among("ireis", 73, 1, "", portugueseStemmer.methodObject), new Among('\u00E1reis', 73, 1, "", portugueseStemmer.methodObject), new Among('\u00E9reis', 73, 1, "", portugueseStemmer.methodObject), new Among('\u00EDreis', 73, 1, "", portugueseStemmer.methodObject), new Among('\u00E1sseis', 73, 1, "", portugueseStemmer.methodObject), new Among('\u00E9sseis', 73, 1, "", portugueseStemmer.methodObject), new Among('\u00EDsseis', 73, 1, "", portugueseStemmer.methodObject), new Among('\u00E1veis', 73, 1, "", portugueseStemmer.methodObject), new Among('\u00EDeis', 73, 1, "", portugueseStemmer.methodObject), new Among('ar\u00EDeis', 84, 1, "", portugueseStemmer.methodObject), new Among('er\u00EDeis', 84, 1, "", portugueseStemmer.methodObject), new Among('ir\u00EDeis', 84, 1, "", portugueseStemmer.methodObject), new Among("ados", -1, 1, "", portugueseStemmer.methodObject), new Among("idos", -1, 1, "", portugueseStemmer.methodObject), new Among("amos", -1, 1, "", portugueseStemmer.methodObject), new Among('\u00E1ramos', 90, 1, "", portugueseStemmer.methodObject), new Among('\u00E9ramos', 90, 1, "", portugueseStemmer.methodObject), new Among('\u00EDramos', 90, 1, "", portugueseStemmer.methodObject), new Among('\u00E1vamos', 90, 1, "", portugueseStemmer.methodObject), new Among('\u00EDamos', 90, 1, "", portugueseStemmer.methodObject), new Among('ar\u00EDamos', 95, 1, "", portugueseStemmer.methodObject), new Among('er\u00EDamos', 95, 1, "", portugueseStemmer.methodObject), new Among('ir\u00EDamos', 95, 1, "", portugueseStemmer.methodObject), new Among("emos", -1, 1, "", portugueseStemmer.methodObject), new Among("aremos", 99, 1, "", portugueseStemmer.methodObject), new Among("eremos", 99, 1, "", portugueseStemmer.methodObject), new Among("iremos", 99, 1, "", portugueseStemmer.methodObject), new Among('\u00E1ssemos', 99, 1, "", portugueseStemmer.methodObject), new Among('\u00EAssemos', 99, 1, "", portugueseStemmer.methodObject), new Among('\u00EDssemos', 99, 1, "", portugueseStemmer.methodObject), new Among("imos", -1, 1, "", portugueseStemmer.methodObject), new Among("armos", -1, 1, "", portugueseStemmer.methodObject), new Among("ermos", -1, 1, "", portugueseStemmer.methodObject), new Among("irmos", -1, 1, "", portugueseStemmer.methodObject), new Among('\u00E1mos', -1, 1, "", portugueseStemmer.methodObject), new Among('ar\u00E1s', -1, 1, "", portugueseStemmer.methodObject), new Among('er\u00E1s', -1, 1, "", portugueseStemmer.methodObject), new Among('ir\u00E1s', -1, 1, "", portugueseStemmer.methodObject), new Among("eu", -1, 1, "", portugueseStemmer.methodObject), new Among("iu", -1, 1, "", portugueseStemmer.methodObject), new Among("ou", -1, 1, "", portugueseStemmer.methodObject), new Among('ar\u00E1', -1, 1, "", portugueseStemmer.methodObject), new Among('er\u00E1', -1, 1, "", portugueseStemmer.methodObject), new Among('ir\u00E1', -1, 1, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete portugueseStemmer.a_7;
                return portugueseStemmer.a_7 = [new Among("a", -1, 1, "", portugueseStemmer.methodObject), new Among("i", -1, 1, "", portugueseStemmer.methodObject), new Among("o", -1, 1, "", portugueseStemmer.methodObject), new Among("os", -1, 1, "", portugueseStemmer.methodObject), new Among('\u00E1', -1, 1, "", portugueseStemmer.methodObject), new Among('\u00ED', -1, 1, "", portugueseStemmer.methodObject), new Among('\u00F3', -1, 1, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'a_8',
            get: function get() {
                delete portugueseStemmer.a_8;
                return portugueseStemmer.a_8 = [new Among("e", -1, 1, "", portugueseStemmer.methodObject), new Among('\u00E7', -1, 2, "", portugueseStemmer.methodObject), new Among('\u00E9', -1, 1, "", portugueseStemmer.methodObject), new Among('\u00EA', -1, 1, "", portugueseStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete portugueseStemmer.g_v;
                return portugueseStemmer.g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 19, 12, 2];
            }
        }]);

        return portugueseStemmer;
    })(SnowballStemmer);

    var romanianStemmer = (function (_SnowballStemmer17) {
        _inherits(romanianStemmer, _SnowballStemmer17);

        function romanianStemmer() {
            _classCallCheck(this, romanianStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(romanianStemmer).apply(this, arguments));
        }

        _createClass(romanianStemmer, [{
            key: 'r_prelude$esjava$0',
            value: function r_prelude$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        golab2: while (true) {
                            v_2 = this.cursor;

                            lab3: do {
                                if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                    break lab3;
                                }

                                this.bra = this.cursor;

                                lab4: do {
                                    v_3 = this.cursor;

                                    lab5: do {
                                        if (!this.eq_s$esjava$2(1, "u")) {
                                            break lab5;
                                        }

                                        this.ket = this.cursor;

                                        if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                            break lab5;
                                        }

                                        this.slice_from$esjava$1("U");
                                        break lab4;
                                    } while (false);

                                    this.cursor = v_3;

                                    if (!this.eq_s$esjava$2(1, "i")) {
                                        break lab3;
                                    }

                                    this.ket = this.cursor;

                                    if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                        break lab3;
                                    }

                                    this.slice_from$esjava$1("I");
                                } while (false);

                                this.cursor = v_2;
                                break golab2;
                            } while (false);

                            this.cursor = v_2;

                            if (this.cursor >= this.limit) {
                                break lab1;
                            }

                            this.cursor++;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_6 = undefined;
                var v_8 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                break lab2;
                            }

                            lab3: do {
                                v_3 = this.cursor;

                                lab4: do {
                                    if (!this.out_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                        break lab4;
                                    }

                                    golab5: while (true) {
                                        lab6: do {
                                            if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                                break lab6;
                                            }

                                            break golab5;
                                        } while (false);

                                        if (this.cursor >= this.limit) {
                                            break lab4;
                                        }

                                        this.cursor++;
                                    }

                                    break lab3;
                                } while (false);

                                this.cursor = v_3;

                                if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                    break lab2;
                                }

                                golab7: while (true) {
                                    lab8: do {
                                        if (!this.out_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                            break lab8;
                                        }

                                        break golab7;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab2;
                                    }

                                    this.cursor++;
                                }
                            } while (false);

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        if (!this.out_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                            break lab0;
                        }

                        lab9: do {
                            v_6 = this.cursor;

                            lab10: do {
                                if (!this.out_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                    break lab10;
                                }

                                golab11: while (true) {
                                    lab12: do {
                                        if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                            break lab12;
                                        }

                                        break golab11;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab10;
                                    }

                                    this.cursor++;
                                }

                                break lab9;
                            } while (false);

                            this.cursor = v_6;

                            if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                break lab0;
                            }

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        } while (false);
                    } while (false);

                    this.I_pV = this.cursor;
                } while (false);

                this.cursor = v_1;
                v_8 = this.cursor;

                lab13: do {
                    golab14: while (true) {
                        lab15: do {
                            if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                break lab15;
                            }

                            break golab14;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab16: while (true) {
                        lab17: do {
                            if (!this.out_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                break lab17;
                            }

                            break golab16;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab18: while (true) {
                        lab19: do {
                            if (!this.in_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                break lab19;
                            }

                            break golab18;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab20: while (true) {
                        lab21: do {
                            if (!this.out_grouping$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                break lab21;
                            }

                            break golab20;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_8;
                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(romanianStemmer.a_0, 3);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("i");
                                break;

                            case 2:
                                this.slice_from$esjava$1("u");
                                break;

                            case 3:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_step_0$esjava$0',
            value: function r_step_0$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(romanianStemmer.a_1, 16);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1("a");
                        break;

                    case 3:
                        this.slice_from$esjava$1("e");
                        break;

                    case 4:
                        this.slice_from$esjava$1("i");
                        break;

                    case 5:
                        {
                            v_1 = this.limit - this.cursor;

                            lab0: do {
                                if (!this.eq_s_b$esjava$2(2, "ab")) {
                                    break lab0;
                                }

                                return false;
                            } while (false);

                            this.cursor = this.limit - v_1;
                        }
                        this.slice_from$esjava$1("i");
                        break;

                    case 6:
                        this.slice_from$esjava$1("at");
                        break;

                    case 7:
                        this.slice_from$esjava$1('a\u0163i');
                        break;
                }

                return true;
            }
        }, {
            key: 'r_combo_suffix$esjava$0',
            value: function r_combo_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                v_1 = this.limit - this.cursor;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(romanianStemmer.a_2, 46);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R1$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("abil");
                        break;

                    case 2:
                        this.slice_from$esjava$1("ibil");
                        break;

                    case 3:
                        this.slice_from$esjava$1("iv");
                        break;

                    case 4:
                        this.slice_from$esjava$1("ic");
                        break;

                    case 5:
                        this.slice_from$esjava$1("at");
                        break;

                    case 6:
                        this.slice_from$esjava$1("it");
                        break;
                }

                this.B_standard_suffix_removed = true;
                this.cursor = this.limit - v_1;
                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                this.B_standard_suffix_removed = false;

                replab0: while (true) {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.r_combo_suffix$esjava$0()) {
                            break lab1;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = this.limit - v_1;
                    break replab0;
                }

                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(romanianStemmer.a_3, 62);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R2$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.eq_s_b$esjava$2(1, '\u0163')) {
                            return false;
                        }

                        this.bra = this.cursor;
                        this.slice_from$esjava$1("t");
                        break;

                    case 3:
                        this.slice_from$esjava$1("ist");
                        break;
                }

                this.B_standard_suffix_removed = true;
                return true;
            }
        }, {
            key: 'r_verb_suffix$esjava$0',
            value: function r_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(romanianStemmer.a_4, 94);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        this.limit_backward = v_2;
                        return false;

                    case 1:
                        lab0: do {
                            v_3 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.out_grouping_b$esjava$3(romanianStemmer.g_v, 97, 259)) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_3;

                            if (!this.eq_s_b$esjava$2(1, "u")) {
                                this.limit_backward = v_2;
                                return false;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        break;
                }

                this.limit_backward = v_2;
                return true;
            }
        }, {
            key: 'r_vowel_suffix$esjava$0',
            value: function r_vowel_suffix$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(romanianStemmer.a_5, 5);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_RV$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_prelude$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                v_2 = this.cursor;

                lab1: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = v_2;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_step_0$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    if (!this.r_standard_suffix$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                v_5 = this.limit - this.cursor;

                lab4: do {
                    lab5: do {
                        v_6 = this.limit - this.cursor;

                        lab6: do {
                            if (!this.B_standard_suffix_removed) {
                                break lab6;
                            }

                            break lab5;
                        } while (false);

                        this.cursor = this.limit - v_6;

                        if (!this.r_verb_suffix$esjava$0()) {
                            break lab4;
                        }
                    } while (false);
                } while (false);

                this.cursor = this.limit - v_5;
                v_7 = this.limit - this.cursor;

                lab7: do {
                    if (!this.r_vowel_suffix$esjava$0()) {
                        break lab7;
                    }
                } while (false);

                this.cursor = this.limit - v_7;
                this.cursor = this.limit_backward;
                v_8 = this.cursor;

                lab8: do {
                    if (!this.r_postlude$esjava$0()) {
                        break lab8;
                    }
                } while (false);

                this.cursor = v_8;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'B_standard_suffix_removed',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$B_standard_suffix_removed') ? this._$esjava$B_standard_suffix_removed : this._$esjava$B_standard_suffix_removed = false;
            },
            set: function set(v) {
                this._$esjava$B_standard_suffix_removed = v;
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete romanianStemmer.methodObject;
                return romanianStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete romanianStemmer.a_0;
                return romanianStemmer.a_0 = [new Among("", -1, 3, "", romanianStemmer.methodObject), new Among("I", 0, 1, "", romanianStemmer.methodObject), new Among("U", 0, 2, "", romanianStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete romanianStemmer.a_1;
                return romanianStemmer.a_1 = [new Among("ea", -1, 3, "", romanianStemmer.methodObject), new Among('a\u0163ia', -1, 7, "", romanianStemmer.methodObject), new Among("aua", -1, 2, "", romanianStemmer.methodObject), new Among("iua", -1, 4, "", romanianStemmer.methodObject), new Among('a\u0163ie', -1, 7, "", romanianStemmer.methodObject), new Among("ele", -1, 3, "", romanianStemmer.methodObject), new Among("ile", -1, 5, "", romanianStemmer.methodObject), new Among("iile", 6, 4, "", romanianStemmer.methodObject), new Among("iei", -1, 4, "", romanianStemmer.methodObject), new Among("atei", -1, 6, "", romanianStemmer.methodObject), new Among("ii", -1, 4, "", romanianStemmer.methodObject), new Among("ului", -1, 1, "", romanianStemmer.methodObject), new Among("ul", -1, 1, "", romanianStemmer.methodObject), new Among("elor", -1, 3, "", romanianStemmer.methodObject), new Among("ilor", -1, 4, "", romanianStemmer.methodObject), new Among("iilor", 14, 4, "", romanianStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete romanianStemmer.a_2;
                return romanianStemmer.a_2 = [new Among("icala", -1, 4, "", romanianStemmer.methodObject), new Among("iciva", -1, 4, "", romanianStemmer.methodObject), new Among("ativa", -1, 5, "", romanianStemmer.methodObject), new Among("itiva", -1, 6, "", romanianStemmer.methodObject), new Among("icale", -1, 4, "", romanianStemmer.methodObject), new Among('a\u0163iune', -1, 5, "", romanianStemmer.methodObject), new Among('i\u0163iune', -1, 6, "", romanianStemmer.methodObject), new Among("atoare", -1, 5, "", romanianStemmer.methodObject), new Among("itoare", -1, 6, "", romanianStemmer.methodObject), new Among('\u0103toare', -1, 5, "", romanianStemmer.methodObject), new Among("icitate", -1, 4, "", romanianStemmer.methodObject), new Among("abilitate", -1, 1, "", romanianStemmer.methodObject), new Among("ibilitate", -1, 2, "", romanianStemmer.methodObject), new Among("ivitate", -1, 3, "", romanianStemmer.methodObject), new Among("icive", -1, 4, "", romanianStemmer.methodObject), new Among("ative", -1, 5, "", romanianStemmer.methodObject), new Among("itive", -1, 6, "", romanianStemmer.methodObject), new Among("icali", -1, 4, "", romanianStemmer.methodObject), new Among("atori", -1, 5, "", romanianStemmer.methodObject), new Among("icatori", 18, 4, "", romanianStemmer.methodObject), new Among("itori", -1, 6, "", romanianStemmer.methodObject), new Among('\u0103tori', -1, 5, "", romanianStemmer.methodObject), new Among("icitati", -1, 4, "", romanianStemmer.methodObject), new Among("abilitati", -1, 1, "", romanianStemmer.methodObject), new Among("ivitati", -1, 3, "", romanianStemmer.methodObject), new Among("icivi", -1, 4, "", romanianStemmer.methodObject), new Among("ativi", -1, 5, "", romanianStemmer.methodObject), new Among("itivi", -1, 6, "", romanianStemmer.methodObject), new Among('icit\u0103i', -1, 4, "", romanianStemmer.methodObject), new Among('abilit\u0103i', -1, 1, "", romanianStemmer.methodObject), new Among('ivit\u0103i', -1, 3, "", romanianStemmer.methodObject), new Among('icit\u0103\u0163i', -1, 4, "", romanianStemmer.methodObject), new Among('abilit\u0103\u0163i', -1, 1, "", romanianStemmer.methodObject), new Among('ivit\u0103\u0163i', -1, 3, "", romanianStemmer.methodObject), new Among("ical", -1, 4, "", romanianStemmer.methodObject), new Among("ator", -1, 5, "", romanianStemmer.methodObject), new Among("icator", 35, 4, "", romanianStemmer.methodObject), new Among("itor", -1, 6, "", romanianStemmer.methodObject), new Among('\u0103tor', -1, 5, "", romanianStemmer.methodObject), new Among("iciv", -1, 4, "", romanianStemmer.methodObject), new Among("ativ", -1, 5, "", romanianStemmer.methodObject), new Among("itiv", -1, 6, "", romanianStemmer.methodObject), new Among('ical\u0103', -1, 4, "", romanianStemmer.methodObject), new Among('iciv\u0103', -1, 4, "", romanianStemmer.methodObject), new Among('ativ\u0103', -1, 5, "", romanianStemmer.methodObject), new Among('itiv\u0103', -1, 6, "", romanianStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete romanianStemmer.a_3;
                return romanianStemmer.a_3 = [new Among("ica", -1, 1, "", romanianStemmer.methodObject), new Among("abila", -1, 1, "", romanianStemmer.methodObject), new Among("ibila", -1, 1, "", romanianStemmer.methodObject), new Among("oasa", -1, 1, "", romanianStemmer.methodObject), new Among("ata", -1, 1, "", romanianStemmer.methodObject), new Among("ita", -1, 1, "", romanianStemmer.methodObject), new Among("anta", -1, 1, "", romanianStemmer.methodObject), new Among("ista", -1, 3, "", romanianStemmer.methodObject), new Among("uta", -1, 1, "", romanianStemmer.methodObject), new Among("iva", -1, 1, "", romanianStemmer.methodObject), new Among("ic", -1, 1, "", romanianStemmer.methodObject), new Among("ice", -1, 1, "", romanianStemmer.methodObject), new Among("abile", -1, 1, "", romanianStemmer.methodObject), new Among("ibile", -1, 1, "", romanianStemmer.methodObject), new Among("isme", -1, 3, "", romanianStemmer.methodObject), new Among("iune", -1, 2, "", romanianStemmer.methodObject), new Among("oase", -1, 1, "", romanianStemmer.methodObject), new Among("ate", -1, 1, "", romanianStemmer.methodObject), new Among("itate", 17, 1, "", romanianStemmer.methodObject), new Among("ite", -1, 1, "", romanianStemmer.methodObject), new Among("ante", -1, 1, "", romanianStemmer.methodObject), new Among("iste", -1, 3, "", romanianStemmer.methodObject), new Among("ute", -1, 1, "", romanianStemmer.methodObject), new Among("ive", -1, 1, "", romanianStemmer.methodObject), new Among("ici", -1, 1, "", romanianStemmer.methodObject), new Among("abili", -1, 1, "", romanianStemmer.methodObject), new Among("ibili", -1, 1, "", romanianStemmer.methodObject), new Among("iuni", -1, 2, "", romanianStemmer.methodObject), new Among("atori", -1, 1, "", romanianStemmer.methodObject), new Among("osi", -1, 1, "", romanianStemmer.methodObject), new Among("ati", -1, 1, "", romanianStemmer.methodObject), new Among("itati", 30, 1, "", romanianStemmer.methodObject), new Among("iti", -1, 1, "", romanianStemmer.methodObject), new Among("anti", -1, 1, "", romanianStemmer.methodObject), new Among("isti", -1, 3, "", romanianStemmer.methodObject), new Among("uti", -1, 1, "", romanianStemmer.methodObject), new Among('i\u015Fti', -1, 3, "", romanianStemmer.methodObject), new Among("ivi", -1, 1, "", romanianStemmer.methodObject), new Among('it\u0103i', -1, 1, "", romanianStemmer.methodObject), new Among('o\u015Fi', -1, 1, "", romanianStemmer.methodObject), new Among('it\u0103\u0163i', -1, 1, "", romanianStemmer.methodObject), new Among("abil", -1, 1, "", romanianStemmer.methodObject), new Among("ibil", -1, 1, "", romanianStemmer.methodObject), new Among("ism", -1, 3, "", romanianStemmer.methodObject), new Among("ator", -1, 1, "", romanianStemmer.methodObject), new Among("os", -1, 1, "", romanianStemmer.methodObject), new Among("at", -1, 1, "", romanianStemmer.methodObject), new Among("it", -1, 1, "", romanianStemmer.methodObject), new Among("ant", -1, 1, "", romanianStemmer.methodObject), new Among("ist", -1, 3, "", romanianStemmer.methodObject), new Among("ut", -1, 1, "", romanianStemmer.methodObject), new Among("iv", -1, 1, "", romanianStemmer.methodObject), new Among('ic\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('abil\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('ibil\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('oas\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('at\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('it\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('ant\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('ist\u0103', -1, 3, "", romanianStemmer.methodObject), new Among('ut\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('iv\u0103', -1, 1, "", romanianStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete romanianStemmer.a_4;
                return romanianStemmer.a_4 = [new Among("ea", -1, 1, "", romanianStemmer.methodObject), new Among("ia", -1, 1, "", romanianStemmer.methodObject), new Among("esc", -1, 1, "", romanianStemmer.methodObject), new Among('\u0103sc', -1, 1, "", romanianStemmer.methodObject), new Among("ind", -1, 1, "", romanianStemmer.methodObject), new Among('\u00E2nd', -1, 1, "", romanianStemmer.methodObject), new Among("are", -1, 1, "", romanianStemmer.methodObject), new Among("ere", -1, 1, "", romanianStemmer.methodObject), new Among("ire", -1, 1, "", romanianStemmer.methodObject), new Among('\u00E2re', -1, 1, "", romanianStemmer.methodObject), new Among("se", -1, 2, "", romanianStemmer.methodObject), new Among("ase", 10, 1, "", romanianStemmer.methodObject), new Among("sese", 10, 2, "", romanianStemmer.methodObject), new Among("ise", 10, 1, "", romanianStemmer.methodObject), new Among("use", 10, 1, "", romanianStemmer.methodObject), new Among('\u00E2se', 10, 1, "", romanianStemmer.methodObject), new Among('e\u015Fte', -1, 1, "", romanianStemmer.methodObject), new Among('\u0103\u015Fte', -1, 1, "", romanianStemmer.methodObject), new Among("eze", -1, 1, "", romanianStemmer.methodObject), new Among("ai", -1, 1, "", romanianStemmer.methodObject), new Among("eai", 19, 1, "", romanianStemmer.methodObject), new Among("iai", 19, 1, "", romanianStemmer.methodObject), new Among("sei", -1, 2, "", romanianStemmer.methodObject), new Among('e\u015Fti', -1, 1, "", romanianStemmer.methodObject), new Among('\u0103\u015Fti', -1, 1, "", romanianStemmer.methodObject), new Among("ui", -1, 1, "", romanianStemmer.methodObject), new Among("ezi", -1, 1, "", romanianStemmer.methodObject), new Among('\u00E2i', -1, 1, "", romanianStemmer.methodObject), new Among('a\u015Fi', -1, 1, "", romanianStemmer.methodObject), new Among('se\u015Fi', -1, 2, "", romanianStemmer.methodObject), new Among('ase\u015Fi', 29, 1, "", romanianStemmer.methodObject), new Among('sese\u015Fi', 29, 2, "", romanianStemmer.methodObject), new Among('ise\u015Fi', 29, 1, "", romanianStemmer.methodObject), new Among('use\u015Fi', 29, 1, "", romanianStemmer.methodObject), new Among('\u00E2se\u015Fi', 29, 1, "", romanianStemmer.methodObject), new Among('i\u015Fi', -1, 1, "", romanianStemmer.methodObject), new Among('u\u015Fi', -1, 1, "", romanianStemmer.methodObject), new Among('\u00E2\u015Fi', -1, 1, "", romanianStemmer.methodObject), new Among('a\u0163i', -1, 2, "", romanianStemmer.methodObject), new Among('ea\u0163i', 38, 1, "", romanianStemmer.methodObject), new Among('ia\u0163i', 38, 1, "", romanianStemmer.methodObject), new Among('e\u0163i', -1, 2, "", romanianStemmer.methodObject), new Among('i\u0163i', -1, 2, "", romanianStemmer.methodObject), new Among('\u00E2\u0163i', -1, 2, "", romanianStemmer.methodObject), new Among('ar\u0103\u0163i', -1, 1, "", romanianStemmer.methodObject), new Among('ser\u0103\u0163i', -1, 2, "", romanianStemmer.methodObject), new Among('aser\u0103\u0163i', 45, 1, "", romanianStemmer.methodObject), new Among('seser\u0103\u0163i', 45, 2, "", romanianStemmer.methodObject), new Among('iser\u0103\u0163i', 45, 1, "", romanianStemmer.methodObject), new Among('user\u0103\u0163i', 45, 1, "", romanianStemmer.methodObject), new Among('\u00E2ser\u0103\u0163i', 45, 1, "", romanianStemmer.methodObject), new Among('ir\u0103\u0163i', -1, 1, "", romanianStemmer.methodObject), new Among('ur\u0103\u0163i', -1, 1, "", romanianStemmer.methodObject), new Among('\u00E2r\u0103\u0163i', -1, 1, "", romanianStemmer.methodObject), new Among("am", -1, 1, "", romanianStemmer.methodObject), new Among("eam", 54, 1, "", romanianStemmer.methodObject), new Among("iam", 54, 1, "", romanianStemmer.methodObject), new Among("em", -1, 2, "", romanianStemmer.methodObject), new Among("asem", 57, 1, "", romanianStemmer.methodObject), new Among("sesem", 57, 2, "", romanianStemmer.methodObject), new Among("isem", 57, 1, "", romanianStemmer.methodObject), new Among("usem", 57, 1, "", romanianStemmer.methodObject), new Among('\u00E2sem', 57, 1, "", romanianStemmer.methodObject), new Among("im", -1, 2, "", romanianStemmer.methodObject), new Among('\u00E2m', -1, 2, "", romanianStemmer.methodObject), new Among('\u0103m', -1, 2, "", romanianStemmer.methodObject), new Among('ar\u0103m', 65, 1, "", romanianStemmer.methodObject), new Among('ser\u0103m', 65, 2, "", romanianStemmer.methodObject), new Among('aser\u0103m', 67, 1, "", romanianStemmer.methodObject), new Among('seser\u0103m', 67, 2, "", romanianStemmer.methodObject), new Among('iser\u0103m', 67, 1, "", romanianStemmer.methodObject), new Among('user\u0103m', 67, 1, "", romanianStemmer.methodObject), new Among('\u00E2ser\u0103m', 67, 1, "", romanianStemmer.methodObject), new Among('ir\u0103m', 65, 1, "", romanianStemmer.methodObject), new Among('ur\u0103m', 65, 1, "", romanianStemmer.methodObject), new Among('\u00E2r\u0103m', 65, 1, "", romanianStemmer.methodObject), new Among("au", -1, 1, "", romanianStemmer.methodObject), new Among("eau", 76, 1, "", romanianStemmer.methodObject), new Among("iau", 76, 1, "", romanianStemmer.methodObject), new Among("indu", -1, 1, "", romanianStemmer.methodObject), new Among('\u00E2ndu', -1, 1, "", romanianStemmer.methodObject), new Among("ez", -1, 1, "", romanianStemmer.methodObject), new Among('easc\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('ar\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('ser\u0103', -1, 2, "", romanianStemmer.methodObject), new Among('aser\u0103', 84, 1, "", romanianStemmer.methodObject), new Among('seser\u0103', 84, 2, "", romanianStemmer.methodObject), new Among('iser\u0103', 84, 1, "", romanianStemmer.methodObject), new Among('user\u0103', 84, 1, "", romanianStemmer.methodObject), new Among('\u00E2ser\u0103', 84, 1, "", romanianStemmer.methodObject), new Among('ir\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('ur\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('\u00E2r\u0103', -1, 1, "", romanianStemmer.methodObject), new Among('eaz\u0103', -1, 1, "", romanianStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete romanianStemmer.a_5;
                return romanianStemmer.a_5 = [new Among("a", -1, 1, "", romanianStemmer.methodObject), new Among("e", -1, 1, "", romanianStemmer.methodObject), new Among("ie", 1, 1, "", romanianStemmer.methodObject), new Among("i", -1, 1, "", romanianStemmer.methodObject), new Among('\u0103', -1, 1, "", romanianStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete romanianStemmer.g_v;
                return romanianStemmer.g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 32, 0, 0, 4];
            }
        }]);

        return romanianStemmer;
    })(SnowballStemmer);

    var russianStemmer = (function (_SnowballStemmer18) {
        _inherits(russianStemmer, _SnowballStemmer18);

        function russianStemmer() {
            _classCallCheck(this, russianStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(russianStemmer).apply(this, arguments));
        }

        _createClass(russianStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                this.I_pV = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    golab1: while (true) {
                        lab2: do {
                            if (!this.in_grouping$esjava$3(russianStemmer.g_v, 1072, 1103)) {
                                break lab2;
                            }

                            break golab1;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_pV = this.cursor;

                    golab3: while (true) {
                        lab4: do {
                            if (!this.out_grouping$esjava$3(russianStemmer.g_v, 1072, 1103)) {
                                break lab4;
                            }

                            break golab3;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab5: while (true) {
                        lab6: do {
                            if (!this.in_grouping$esjava$3(russianStemmer.g_v, 1072, 1103)) {
                                break lab6;
                            }

                            break golab5;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    golab7: while (true) {
                        lab8: do {
                            if (!this.out_grouping$esjava$3(russianStemmer.g_v, 1072, 1103)) {
                                break lab8;
                            }

                            break golab7;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab0;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_1;
                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_perfective_gerund$esjava$0',
            value: function r_perfective_gerund$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(russianStemmer.a_0, 9);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        lab0: do {
                            v_1 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.eq_s_b$esjava$2(1, '\u0430')) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_1;

                            if (!this.eq_s_b$esjava$2(1, '\u044F')) {
                                return false;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_adjective$esjava$0',
            value: function r_adjective$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(russianStemmer.a_1, 26);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_adjectival$esjava$0',
            value: function r_adjectival$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;

                if (!this.r_adjective$esjava$0()) {
                    return false;
                }

                v_1 = this.limit - this.cursor;

                lab0: do {
                    this.ket = this.cursor;
                    among_var = this.find_among_b$esjava$2(russianStemmer.a_2, 8);

                    if (among_var === 0) {
                        this.cursor = this.limit - v_1;
                        break lab0;
                    }

                    this.bra = this.cursor;

                    switch (among_var) {
                        case 0:
                            this.cursor = this.limit - v_1;
                            break lab0;

                        case 1:
                            lab1: do {
                                v_2 = this.limit - this.cursor;

                                lab2: do {
                                    if (!this.eq_s_b$esjava$2(1, '\u0430')) {
                                        break lab2;
                                    }

                                    break lab1;
                                } while (false);

                                this.cursor = this.limit - v_2;

                                if (!this.eq_s_b$esjava$2(1, '\u044F')) {
                                    this.cursor = this.limit - v_1;
                                    break lab0;
                                }
                            } while (false);

                            this.slice_del$esjava$0();
                            break;

                        case 2:
                            this.slice_del$esjava$0();
                            break;
                    }
                } while (false);

                return true;
            }
        }, {
            key: 'r_reflexive$esjava$0',
            value: function r_reflexive$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(russianStemmer.a_3, 2);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_verb$esjava$0',
            value: function r_verb$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(russianStemmer.a_4, 46);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        lab0: do {
                            v_1 = this.limit - this.cursor;

                            lab1: do {
                                if (!this.eq_s_b$esjava$2(1, '\u0430')) {
                                    break lab1;
                                }

                                break lab0;
                            } while (false);

                            this.cursor = this.limit - v_1;

                            if (!this.eq_s_b$esjava$2(1, '\u044F')) {
                                return false;
                            }
                        } while (false);

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_noun$esjava$0',
            value: function r_noun$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(russianStemmer.a_5, 36);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_derivational$esjava$0',
            value: function r_derivational$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(russianStemmer.a_6, 2);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                if (!this.r_R2$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_tidy_up$esjava$0',
            value: function r_tidy_up$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(russianStemmer.a_7, 4);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        this.ket = this.cursor;

                        if (!this.eq_s_b$esjava$2(1, '\u043D')) {
                            return false;
                        }

                        this.bra = this.cursor;

                        if (!this.eq_s_b$esjava$2(1, '\u043D')) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.eq_s_b$esjava$2(1, '\u043D')) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 3:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_3 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_2;
                v_4 = this.limit - this.cursor;

                lab1: do {
                    lab2: do {
                        v_5 = this.limit - this.cursor;

                        lab3: do {
                            if (!this.r_perfective_gerund$esjava$0()) {
                                break lab3;
                            }

                            break lab2;
                        } while (false);

                        this.cursor = this.limit - v_5;
                        v_6 = this.limit - this.cursor;

                        lab4: do {
                            if (!this.r_reflexive$esjava$0()) {
                                this.cursor = this.limit - v_6;
                                break lab4;
                            }
                        } while (false);

                        lab5: do {
                            v_7 = this.limit - this.cursor;

                            lab6: do {
                                if (!this.r_adjectival$esjava$0()) {
                                    break lab6;
                                }

                                break lab5;
                            } while (false);

                            this.cursor = this.limit - v_7;

                            lab7: do {
                                if (!this.r_verb$esjava$0()) {
                                    break lab7;
                                }

                                break lab5;
                            } while (false);

                            this.cursor = this.limit - v_7;

                            if (!this.r_noun$esjava$0()) {
                                break lab1;
                            }
                        } while (false);
                    } while (false);
                } while (false);

                this.cursor = this.limit - v_4;
                v_8 = this.limit - this.cursor;

                lab8: do {
                    this.ket = this.cursor;

                    if (!this.eq_s_b$esjava$2(1, '\u0438')) {
                        this.cursor = this.limit - v_8;
                        break lab8;
                    }

                    this.bra = this.cursor;
                    this.slice_del$esjava$0();
                } while (false);

                v_9 = this.limit - this.cursor;

                lab9: do {
                    if (!this.r_derivational$esjava$0()) {
                        break lab9;
                    }
                } while (false);

                this.cursor = this.limit - v_9;
                v_10 = this.limit - this.cursor;

                lab10: do {
                    if (!this.r_tidy_up$esjava$0()) {
                        break lab10;
                    }
                } while (false);

                this.cursor = this.limit - v_10;
                this.limit_backward = v_3;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete russianStemmer.methodObject;
                return russianStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete russianStemmer.a_0;
                return russianStemmer.a_0 = [new Among('\u0432', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0432', 0, 2, "", russianStemmer.methodObject), new Among('\u044B\u0432', 0, 2, "", russianStemmer.methodObject), new Among('\u0432\u0448\u0438', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0432\u0448\u0438', 3, 2, "", russianStemmer.methodObject), new Among('\u044B\u0432\u0448\u0438', 3, 2, "", russianStemmer.methodObject), new Among('\u0432\u0448\u0438\u0441\u044C', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0432\u0448\u0438\u0441\u044C', 6, 2, "", russianStemmer.methodObject), new Among('\u044B\u0432\u0448\u0438\u0441\u044C', 6, 2, "", russianStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete russianStemmer.a_1;
                return russianStemmer.a_1 = [new Among('\u0435\u0435', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0435', -1, 1, "", russianStemmer.methodObject), new Among('\u043E\u0435', -1, 1, "", russianStemmer.methodObject), new Among('\u044B\u0435', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u043C\u0438', -1, 1, "", russianStemmer.methodObject), new Among('\u044B\u043C\u0438', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u0439', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0439', -1, 1, "", russianStemmer.methodObject), new Among('\u043E\u0439', -1, 1, "", russianStemmer.methodObject), new Among('\u044B\u0439', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u043E\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u044B\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u0433\u043E', -1, 1, "", russianStemmer.methodObject), new Among('\u043E\u0433\u043E', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u043C\u0443', -1, 1, "", russianStemmer.methodObject), new Among('\u043E\u043C\u0443', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0445', -1, 1, "", russianStemmer.methodObject), new Among('\u044B\u0445', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u044E', -1, 1, "", russianStemmer.methodObject), new Among('\u043E\u044E', -1, 1, "", russianStemmer.methodObject), new Among('\u0443\u044E', -1, 1, "", russianStemmer.methodObject), new Among('\u044E\u044E', -1, 1, "", russianStemmer.methodObject), new Among('\u0430\u044F', -1, 1, "", russianStemmer.methodObject), new Among('\u044F\u044F', -1, 1, "", russianStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete russianStemmer.a_2;
                return russianStemmer.a_2 = [new Among('\u0435\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u043D\u043D', -1, 1, "", russianStemmer.methodObject), new Among('\u0432\u0448', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0432\u0448', 2, 2, "", russianStemmer.methodObject), new Among('\u044B\u0432\u0448', 2, 2, "", russianStemmer.methodObject), new Among('\u0449', -1, 1, "", russianStemmer.methodObject), new Among('\u044E\u0449', 5, 1, "", russianStemmer.methodObject), new Among('\u0443\u044E\u0449', 6, 2, "", russianStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete russianStemmer.a_3;
                return russianStemmer.a_3 = [new Among('\u0441\u044C', -1, 1, "", russianStemmer.methodObject), new Among('\u0441\u044F', -1, 1, "", russianStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete russianStemmer.a_4;
                return russianStemmer.a_4 = [new Among('\u043B\u0430', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u043B\u0430', 0, 2, "", russianStemmer.methodObject), new Among('\u044B\u043B\u0430', 0, 2, "", russianStemmer.methodObject), new Among('\u043D\u0430', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u043D\u0430', 3, 2, "", russianStemmer.methodObject), new Among('\u0435\u0442\u0435', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0442\u0435', -1, 2, "", russianStemmer.methodObject), new Among('\u0439\u0442\u0435', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u0439\u0442\u0435', 7, 2, "", russianStemmer.methodObject), new Among('\u0443\u0439\u0442\u0435', 7, 2, "", russianStemmer.methodObject), new Among('\u043B\u0438', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u043B\u0438', 10, 2, "", russianStemmer.methodObject), new Among('\u044B\u043B\u0438', 10, 2, "", russianStemmer.methodObject), new Among('\u0439', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u0439', 13, 2, "", russianStemmer.methodObject), new Among('\u0443\u0439', 13, 2, "", russianStemmer.methodObject), new Among('\u043B', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u043B', 16, 2, "", russianStemmer.methodObject), new Among('\u044B\u043B', 16, 2, "", russianStemmer.methodObject), new Among('\u0435\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u043C', -1, 2, "", russianStemmer.methodObject), new Among('\u044B\u043C', -1, 2, "", russianStemmer.methodObject), new Among('\u043D', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u043D', 22, 2, "", russianStemmer.methodObject), new Among('\u043B\u043E', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u043B\u043E', 24, 2, "", russianStemmer.methodObject), new Among('\u044B\u043B\u043E', 24, 2, "", russianStemmer.methodObject), new Among('\u043D\u043E', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u043D\u043E', 27, 2, "", russianStemmer.methodObject), new Among('\u043D\u043D\u043E', 27, 1, "", russianStemmer.methodObject), new Among('\u0435\u0442', -1, 1, "", russianStemmer.methodObject), new Among('\u0443\u0435\u0442', 30, 2, "", russianStemmer.methodObject), new Among('\u0438\u0442', -1, 2, "", russianStemmer.methodObject), new Among('\u044B\u0442', -1, 2, "", russianStemmer.methodObject), new Among('\u044E\u0442', -1, 1, "", russianStemmer.methodObject), new Among('\u0443\u044E\u0442', 34, 2, "", russianStemmer.methodObject), new Among('\u044F\u0442', -1, 2, "", russianStemmer.methodObject), new Among('\u043D\u044B', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u043D\u044B', 37, 2, "", russianStemmer.methodObject), new Among('\u0442\u044C', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0442\u044C', 39, 2, "", russianStemmer.methodObject), new Among('\u044B\u0442\u044C', 39, 2, "", russianStemmer.methodObject), new Among('\u0435\u0448\u044C', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0448\u044C', -1, 2, "", russianStemmer.methodObject), new Among('\u044E', -1, 2, "", russianStemmer.methodObject), new Among('\u0443\u044E', 44, 2, "", russianStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete russianStemmer.a_5;
                return russianStemmer.a_5 = [new Among('\u0430', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u0432', -1, 1, "", russianStemmer.methodObject), new Among('\u043E\u0432', -1, 1, "", russianStemmer.methodObject), new Among('\u0435', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0435', 3, 1, "", russianStemmer.methodObject), new Among('\u044C\u0435', 3, 1, "", russianStemmer.methodObject), new Among('\u0438', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u0438', 6, 1, "", russianStemmer.methodObject), new Among('\u0438\u0438', 6, 1, "", russianStemmer.methodObject), new Among('\u0430\u043C\u0438', 6, 1, "", russianStemmer.methodObject), new Among('\u044F\u043C\u0438', 6, 1, "", russianStemmer.methodObject), new Among('\u0438\u044F\u043C\u0438', 10, 1, "", russianStemmer.methodObject), new Among('\u0439', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u0439', 12, 1, "", russianStemmer.methodObject), new Among('\u0438\u0435\u0439', 13, 1, "", russianStemmer.methodObject), new Among('\u0438\u0439', 12, 1, "", russianStemmer.methodObject), new Among('\u043E\u0439', 12, 1, "", russianStemmer.methodObject), new Among('\u0430\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u0435\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u0435\u043C', 18, 1, "", russianStemmer.methodObject), new Among('\u043E\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u044F\u043C', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u044F\u043C', 21, 1, "", russianStemmer.methodObject), new Among('\u043E', -1, 1, "", russianStemmer.methodObject), new Among('\u0443', -1, 1, "", russianStemmer.methodObject), new Among('\u0430\u0445', -1, 1, "", russianStemmer.methodObject), new Among('\u044F\u0445', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u044F\u0445', 26, 1, "", russianStemmer.methodObject), new Among('\u044B', -1, 1, "", russianStemmer.methodObject), new Among('\u044C', -1, 1, "", russianStemmer.methodObject), new Among('\u044E', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u044E', 30, 1, "", russianStemmer.methodObject), new Among('\u044C\u044E', 30, 1, "", russianStemmer.methodObject), new Among('\u044F', -1, 1, "", russianStemmer.methodObject), new Among('\u0438\u044F', 33, 1, "", russianStemmer.methodObject), new Among('\u044C\u044F', 33, 1, "", russianStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete russianStemmer.a_6;
                return russianStemmer.a_6 = [new Among('\u043E\u0441\u0442', -1, 1, "", russianStemmer.methodObject), new Among('\u043E\u0441\u0442\u044C', -1, 1, "", russianStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete russianStemmer.a_7;
                return russianStemmer.a_7 = [new Among('\u0435\u0439\u0448\u0435', -1, 1, "", russianStemmer.methodObject), new Among('\u043D', -1, 2, "", russianStemmer.methodObject), new Among('\u0435\u0439\u0448', -1, 1, "", russianStemmer.methodObject), new Among('\u044C', -1, 3, "", russianStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete russianStemmer.g_v;
                return russianStemmer.g_v = [33, 65, 8, 232];
            }
        }]);

        return russianStemmer;
    })(SnowballStemmer);

    var sloveneStemmer = (function (_SnowballStemmer19) {
        _inherits(sloveneStemmer, _SnowballStemmer19);

        function sloveneStemmer() {
            _classCallCheck(this, sloveneStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(sloveneStemmer).apply(this, arguments));
        }

        _createClass(sloveneStemmer, [{
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                this.I_p1 = this.limit;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    for (v_2 = 4; v_2 > 0; v_2--) {
                        v_3 = this.limit - this.cursor;

                        lab1: do {
                            if (!(this.I_p1 > 8)) {
                                this.cursor = this.limit - v_3;
                                break lab1;
                            }

                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(sloveneStemmer.a_0, 3);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_3;
                                break lab1;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_3;
                                    break lab1;

                                case 1:
                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        v_4 = this.limit - this.cursor;

                        lab2: do {
                            if (!(this.I_p1 > 7)) {
                                this.cursor = this.limit - v_4;
                                break lab2;
                            }

                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(sloveneStemmer.a_1, 2);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_4;
                                break lab2;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_4;
                                    break lab2;

                                case 1:
                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        this.I_p1 = this.ansi_c_length_shim$esjava$0();
                        v_5 = this.limit - this.cursor;

                        lab3: do {
                            if (!(this.I_p1 > 6)) {
                                this.cursor = this.limit - v_5;
                                break lab3;
                            }

                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(sloveneStemmer.a_2, 22);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_5;
                                break lab3;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_5;
                                    break lab3;

                                case 1:
                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        this.I_p1 = this.ansi_c_length_shim$esjava$0();
                        v_6 = this.limit - this.cursor;

                        lab4: do {
                            if (!(this.I_p1 > 6)) {
                                this.cursor = this.limit - v_6;
                                break lab4;
                            }

                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(sloveneStemmer.a_3, 26);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_6;
                                break lab4;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_6;
                                    break lab4;

                                case 1:
                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        this.I_p1 = this.ansi_c_length_shim$esjava$0();
                        v_7 = this.limit - this.cursor;

                        lab5: do {
                            if (!(this.I_p1 > 5)) {
                                this.cursor = this.limit - v_7;
                                break lab5;
                            }

                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(sloveneStemmer.a_4, 8);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_7;
                                break lab5;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_7;
                                    break lab5;

                                case 1:
                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        this.I_p1 = this.ansi_c_length_shim$esjava$0();
                        v_8 = this.limit - this.cursor;

                        lab6: do {
                            if (!(this.I_p1 > 6)) {
                                this.cursor = this.limit - v_8;
                                break lab6;
                            }

                            this.ket = this.cursor;

                            if (!this.in_grouping_b$esjava$3(sloveneStemmer.g_soglasniki, 98, 382)) {
                                this.cursor = this.limit - v_8;
                                break lab6;
                            }

                            this.bra = this.cursor;
                            v_9 = this.limit - this.cursor;

                            if (!this.in_grouping_b$esjava$3(sloveneStemmer.g_soglasniki, 98, 382)) {
                                this.cursor = this.limit - v_8;
                                break lab6;
                            }

                            this.cursor = this.limit - v_9;
                            this.slice_del$esjava$0();
                        } while (false);

                        this.I_p1 = this.ansi_c_length_shim$esjava$0();
                        v_10 = this.limit - this.cursor;

                        lab7: do {
                            if (!(this.I_p1 > 5)) {
                                this.cursor = this.limit - v_10;
                                break lab7;
                            }

                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(sloveneStemmer.a_5, 5);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_10;
                                break lab7;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_10;
                                    break lab7;

                                case 1:
                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);
                    }
                } while (false);

                this.cursor = this.limit - v_1;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'ansi_c_length_shim$esjava$0',
            value: function ansi_c_length_shim$esjava$0() {
                return this.current.length() ? encodeURIComponent(this.current).match(new RegExp("%..|.", "g")).length + 1 : 1;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete sloveneStemmer.methodObject;
                return sloveneStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete sloveneStemmer.a_0;
                return sloveneStemmer.a_0 = [new Among("anski", -1, 1, "", sloveneStemmer.methodObject), new Among("evski", -1, 1, "", sloveneStemmer.methodObject), new Among("ovski", -1, 1, "", sloveneStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete sloveneStemmer.a_1;
                return sloveneStemmer.a_1 = [new Among("stvo", -1, 1, "", sloveneStemmer.methodObject), new Among('\u0161tvo', -1, 1, "", sloveneStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete sloveneStemmer.a_2;
                return sloveneStemmer.a_2 = [new Among("ega", -1, 1, "", sloveneStemmer.methodObject), new Among("ija", -1, 1, "", sloveneStemmer.methodObject), new Among("ila", -1, 1, "", sloveneStemmer.methodObject), new Among("ema", -1, 1, "", sloveneStemmer.methodObject), new Among("vna", -1, 1, "", sloveneStemmer.methodObject), new Among("ite", -1, 1, "", sloveneStemmer.methodObject), new Among("ste", -1, 1, "", sloveneStemmer.methodObject), new Among('\u0161\u010De', -1, 1, "", sloveneStemmer.methodObject), new Among("ski", -1, 1, "", sloveneStemmer.methodObject), new Among('\u0161ki', -1, 1, "", sloveneStemmer.methodObject), new Among("iti", -1, 1, "", sloveneStemmer.methodObject), new Among("ovi", -1, 1, "", sloveneStemmer.methodObject), new Among('\u010Dek', -1, 1, "", sloveneStemmer.methodObject), new Among("ovm", -1, 1, "", sloveneStemmer.methodObject), new Among('\u010Dan', -1, 1, "", sloveneStemmer.methodObject), new Among("len", -1, 1, "", sloveneStemmer.methodObject), new Among("ven", -1, 1, "", sloveneStemmer.methodObject), new Among('\u0161en', -1, 1, "", sloveneStemmer.methodObject), new Among("ejo", -1, 1, "", sloveneStemmer.methodObject), new Among("ijo", -1, 1, "", sloveneStemmer.methodObject), new Among("ast", -1, 1, "", sloveneStemmer.methodObject), new Among("ost", -1, 1, "", sloveneStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete sloveneStemmer.a_3;
                return sloveneStemmer.a_3 = [new Among("ja", -1, 1, "", sloveneStemmer.methodObject), new Among("ka", -1, 1, "", sloveneStemmer.methodObject), new Among("ma", -1, 1, "", sloveneStemmer.methodObject), new Among("ec", -1, 1, "", sloveneStemmer.methodObject), new Among("je", -1, 1, "", sloveneStemmer.methodObject), new Among("eg", -1, 1, "", sloveneStemmer.methodObject), new Among("eh", -1, 1, "", sloveneStemmer.methodObject), new Among("ih", -1, 1, "", sloveneStemmer.methodObject), new Among("mi", -1, 1, "", sloveneStemmer.methodObject), new Among("ti", -1, 1, "", sloveneStemmer.methodObject), new Among("ij", -1, 1, "", sloveneStemmer.methodObject), new Among("al", -1, 1, "", sloveneStemmer.methodObject), new Among("il", -1, 1, "", sloveneStemmer.methodObject), new Among("em", -1, 1, "", sloveneStemmer.methodObject), new Among("om", -1, 1, "", sloveneStemmer.methodObject), new Among("an", -1, 1, "", sloveneStemmer.methodObject), new Among("en", -1, 1, "", sloveneStemmer.methodObject), new Among("in", -1, 1, "", sloveneStemmer.methodObject), new Among("do", -1, 1, "", sloveneStemmer.methodObject), new Among("jo", -1, 1, "", sloveneStemmer.methodObject), new Among("ir", -1, 1, "", sloveneStemmer.methodObject), new Among("at", -1, 1, "", sloveneStemmer.methodObject), new Among("ev", -1, 1, "", sloveneStemmer.methodObject), new Among("iv", -1, 1, "", sloveneStemmer.methodObject), new Among("ov", -1, 1, "", sloveneStemmer.methodObject), new Among('o\u010D', -1, 1, "", sloveneStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete sloveneStemmer.a_4;
                return sloveneStemmer.a_4 = [new Among("a", -1, 1, "", sloveneStemmer.methodObject), new Among("c", -1, 1, "", sloveneStemmer.methodObject), new Among("e", -1, 1, "", sloveneStemmer.methodObject), new Among("i", -1, 1, "", sloveneStemmer.methodObject), new Among("m", -1, 1, "", sloveneStemmer.methodObject), new Among("o", -1, 1, "", sloveneStemmer.methodObject), new Among("u", -1, 1, "", sloveneStemmer.methodObject), new Among('\u0161', -1, 1, "", sloveneStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete sloveneStemmer.a_5;
                return sloveneStemmer.a_5 = [new Among("a", -1, 1, "", sloveneStemmer.methodObject), new Among("e", -1, 1, "", sloveneStemmer.methodObject), new Among("i", -1, 1, "", sloveneStemmer.methodObject), new Among("o", -1, 1, "", sloveneStemmer.methodObject), new Among("u", -1, 1, "", sloveneStemmer.methodObject)];
            }
        }, {
            key: 'g_soglasniki',
            get: function get() {
                delete sloveneStemmer.g_soglasniki;
                return sloveneStemmer.g_soglasniki = [119, 95, 23, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 16];
            }
        }]);

        return sloveneStemmer;
    })(SnowballStemmer);

    var spanishStemmer = (function (_SnowballStemmer20) {
        _inherits(spanishStemmer, _SnowballStemmer20);

        function spanishStemmer() {
            _classCallCheck(this, spanishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(spanishStemmer).apply(this, arguments));
        }

        _createClass(spanishStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_6 = undefined;
                var v_8 = undefined;
                this.I_pV = this.limit;
                this.I_p1 = this.limit;
                this.I_p2 = this.limit;
                v_1 = this.cursor;

                lab0: do {
                    lab1: do {
                        v_2 = this.cursor;

                        lab2: do {
                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab2;
                            }

                            lab3: do {
                                v_3 = this.cursor;

                                lab4: do {
                                    if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                        break lab4;
                                    }

                                    golab5: while (true) {
                                        lab6: do {
                                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                                break lab6;
                                            }

                                            break golab5;
                                        } while (false);

                                        if (this.cursor >= this.limit) {
                                            break lab4;
                                        }

                                        this.cursor++;
                                    }

                                    break lab3;
                                } while (false);

                                this.cursor = v_3;

                                if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                    break lab2;
                                }

                                golab7: while (true) {
                                    lab8: do {
                                        if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                            break lab8;
                                        }

                                        break golab7;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab2;
                                    }

                                    this.cursor++;
                                }
                            } while (false);

                            break lab1;
                        } while (false);

                        this.cursor = v_2;

                        if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                            break lab0;
                        }

                        lab9: do {
                            v_6 = this.cursor;

                            lab10: do {
                                if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                    break lab10;
                                }

                                golab11: while (true) {
                                    lab12: do {
                                        if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                            break lab12;
                                        }

                                        break golab11;
                                    } while (false);

                                    if (this.cursor >= this.limit) {
                                        break lab10;
                                    }

                                    this.cursor++;
                                }

                                break lab9;
                            } while (false);

                            this.cursor = v_6;

                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab0;
                            }

                            if (this.cursor >= this.limit) {
                                break lab0;
                            }

                            this.cursor++;
                        } while (false);
                    } while (false);

                    this.I_pV = this.cursor;
                } while (false);

                this.cursor = v_1;
                v_8 = this.cursor;

                lab13: do {
                    golab14: while (true) {
                        lab15: do {
                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab15;
                            }

                            break golab14;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab16: while (true) {
                        lab17: do {
                            if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab17;
                            }

                            break golab16;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p1 = this.cursor;

                    golab18: while (true) {
                        lab19: do {
                            if (!this.in_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab19;
                            }

                            break golab18;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    golab20: while (true) {
                        lab21: do {
                            if (!this.out_grouping$esjava$3(spanishStemmer.g_v, 97, 252)) {
                                break lab21;
                            }

                            break golab20;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            break lab13;
                        }

                        this.cursor++;
                    }

                    this.I_p2 = this.cursor;
                } while (false);

                this.cursor = v_8;
                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;

                replab0: while (true) {
                    v_1 = this.cursor;

                    lab1: do {
                        this.bra = this.cursor;
                        among_var = this.find_among$esjava$2(spanishStemmer.a_0, 6);

                        if (among_var === 0) {
                            break lab1;
                        }

                        this.ket = this.cursor;

                        switch (among_var) {
                            case 0:
                                break lab1;

                            case 1:
                                this.slice_from$esjava$1("a");
                                break;

                            case 2:
                                this.slice_from$esjava$1("e");
                                break;

                            case 3:
                                this.slice_from$esjava$1("i");
                                break;

                            case 4:
                                this.slice_from$esjava$1("o");
                                break;

                            case 5:
                                this.slice_from$esjava$1("u");
                                break;

                            case 6:
                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                                break;
                        }

                        continue replab0;
                    } while (false);

                    this.cursor = v_1;
                    break replab0;
                }

                return true;
            }
        }, {
            key: 'r_RV$esjava$0',
            value: function r_RV$esjava$0() {
                if (!(this.I_pV <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R1$esjava$0',
            value: function r_R1$esjava$0() {
                if (!(this.I_p1 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_R2$esjava$0',
            value: function r_R2$esjava$0() {
                if (!(this.I_p2 <= this.cursor)) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_attached_pronoun$esjava$0',
            value: function r_attached_pronoun$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;

                if (this.find_among_b$esjava$2(spanishStemmer.a_1, 13) === 0) {
                    return false;
                }

                this.bra = this.cursor;
                among_var = this.find_among_b$esjava$2(spanishStemmer.a_2, 11);

                if (among_var === 0) {
                    return false;
                }

                if (!this.r_RV$esjava$0()) {
                    return false;
                }

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("iendo");
                        break;

                    case 2:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("ando");
                        break;

                    case 3:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("ar");
                        break;

                    case 4:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("er");
                        break;

                    case 5:
                        this.bra = this.cursor;
                        this.slice_from$esjava$1("ir");
                        break;

                    case 6:
                        this.slice_del$esjava$0();
                        break;

                    case 7:
                        if (!this.eq_s_b$esjava$2(1, "u")) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_standard_suffix$esjava$0',
            value: function r_standard_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(spanishStemmer.a_6, 46);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "ic")) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;

                    case 3:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("log");
                        break;

                    case 4:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("u");
                        break;

                    case 5:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_from$esjava$1("ente");
                        break;

                    case 6:
                        if (!this.r_R1$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_2 = this.limit - this.cursor;

                        lab1: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(spanishStemmer.a_3, 4);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_2;
                                break lab1;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_2;
                                break lab1;
                            }

                            this.slice_del$esjava$0();

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_2;
                                    break lab1;

                                case 1:
                                    this.ket = this.cursor;

                                    if (!this.eq_s_b$esjava$2(2, "at")) {
                                        this.cursor = this.limit - v_2;
                                        break lab1;
                                    }

                                    this.bra = this.cursor;

                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_2;
                                        break lab1;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 7:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;

                        lab2: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(spanishStemmer.a_4, 3);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_3;
                                break lab2;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_3;
                                    break lab2;

                                case 1:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_3;
                                        break lab2;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 8:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_4 = this.limit - this.cursor;

                        lab3: do {
                            this.ket = this.cursor;
                            among_var = this.find_among_b$esjava$2(spanishStemmer.a_5, 3);

                            if (among_var === 0) {
                                this.cursor = this.limit - v_4;
                                break lab3;
                            }

                            this.bra = this.cursor;

                            switch (among_var) {
                                case 0:
                                    this.cursor = this.limit - v_4;
                                    break lab3;

                                case 1:
                                    if (!this.r_R2$esjava$0()) {
                                        this.cursor = this.limit - v_4;
                                        break lab3;
                                    }

                                    this.slice_del$esjava$0();
                                    break;
                            }
                        } while (false);

                        break;

                    case 9:
                        if (!this.r_R2$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_5 = this.limit - this.cursor;

                        lab4: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(2, "at")) {
                                this.cursor = this.limit - v_5;
                                break lab4;
                            }

                            this.bra = this.cursor;

                            if (!this.r_R2$esjava$0()) {
                                this.cursor = this.limit - v_5;
                                break lab4;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;
                }

                return true;
            }
        }, {
            key: 'r_y_verb_suffix$esjava$0',
            value: function r_y_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(spanishStemmer.a_7, 12);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.eq_s_b$esjava$2(1, "u")) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_verb_suffix$esjava$0',
            value: function r_verb_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_pV) {
                    return false;
                }

                this.cursor = this.I_pV;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(spanishStemmer.a_8, 96);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        v_3 = this.limit - this.cursor;

                        lab0: do {
                            if (!this.eq_s_b$esjava$2(1, "u")) {
                                this.cursor = this.limit - v_3;
                                break lab0;
                            }

                            v_4 = this.limit - this.cursor;

                            if (!this.eq_s_b$esjava$2(1, "g")) {
                                this.cursor = this.limit - v_3;
                                break lab0;
                            }

                            this.cursor = this.limit - v_4;
                        } while (false);

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_residual_suffix$esjava$0',
            value: function r_residual_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(spanishStemmer.a_9, 8);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.r_RV$esjava$0()) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        v_1 = this.limit - this.cursor;

                        lab0: do {
                            this.ket = this.cursor;

                            if (!this.eq_s_b$esjava$2(1, "u")) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.bra = this.cursor;
                            v_2 = this.limit - this.cursor;

                            if (!this.eq_s_b$esjava$2(1, "g")) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.cursor = this.limit - v_2;

                            if (!this.r_RV$esjava$0()) {
                                this.cursor = this.limit - v_1;
                                break lab0;
                            }

                            this.slice_del$esjava$0();
                        } while (false);

                        break;
                }

                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_attached_pronoun$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    lab3: do {
                        v_4 = this.limit - this.cursor;

                        lab4: do {
                            if (!this.r_standard_suffix$esjava$0()) {
                                break lab4;
                            }

                            break lab3;
                        } while (false);

                        this.cursor = this.limit - v_4;

                        lab5: do {
                            if (!this.r_y_verb_suffix$esjava$0()) {
                                break lab5;
                            }

                            break lab3;
                        } while (false);

                        this.cursor = this.limit - v_4;

                        if (!this.r_verb_suffix$esjava$0()) {
                            break lab2;
                        }
                    } while (false);
                } while (false);

                this.cursor = this.limit - v_3;
                v_5 = this.limit - this.cursor;

                lab6: do {
                    if (!this.r_residual_suffix$esjava$0()) {
                        break lab6;
                    }
                } while (false);

                this.cursor = this.limit - v_5;
                this.cursor = this.limit_backward;
                v_6 = this.cursor;

                lab7: do {
                    if (!this.r_postlude$esjava$0()) {
                        break lab7;
                    }
                } while (false);

                this.cursor = v_6;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_p2',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p2') ? this._$esjava$I_p2 : this._$esjava$I_p2 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p2 = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }, {
            key: 'I_pV',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_pV') ? this._$esjava$I_pV : this._$esjava$I_pV = 0;
            },
            set: function set(v) {
                this._$esjava$I_pV = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete spanishStemmer.methodObject;
                return spanishStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete spanishStemmer.a_0;
                return spanishStemmer.a_0 = [new Among("", -1, 6, "", spanishStemmer.methodObject), new Among('\u00E1', 0, 1, "", spanishStemmer.methodObject), new Among('\u00E9', 0, 2, "", spanishStemmer.methodObject), new Among('\u00ED', 0, 3, "", spanishStemmer.methodObject), new Among('\u00F3', 0, 4, "", spanishStemmer.methodObject), new Among('\u00FA', 0, 5, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete spanishStemmer.a_1;
                return spanishStemmer.a_1 = [new Among("la", -1, -1, "", spanishStemmer.methodObject), new Among("sela", 0, -1, "", spanishStemmer.methodObject), new Among("le", -1, -1, "", spanishStemmer.methodObject), new Among("me", -1, -1, "", spanishStemmer.methodObject), new Among("se", -1, -1, "", spanishStemmer.methodObject), new Among("lo", -1, -1, "", spanishStemmer.methodObject), new Among("selo", 5, -1, "", spanishStemmer.methodObject), new Among("las", -1, -1, "", spanishStemmer.methodObject), new Among("selas", 7, -1, "", spanishStemmer.methodObject), new Among("les", -1, -1, "", spanishStemmer.methodObject), new Among("los", -1, -1, "", spanishStemmer.methodObject), new Among("selos", 10, -1, "", spanishStemmer.methodObject), new Among("nos", -1, -1, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete spanishStemmer.a_2;
                return spanishStemmer.a_2 = [new Among("ando", -1, 6, "", spanishStemmer.methodObject), new Among("iendo", -1, 6, "", spanishStemmer.methodObject), new Among("yendo", -1, 7, "", spanishStemmer.methodObject), new Among('\u00E1ndo', -1, 2, "", spanishStemmer.methodObject), new Among('i\u00E9ndo', -1, 1, "", spanishStemmer.methodObject), new Among("ar", -1, 6, "", spanishStemmer.methodObject), new Among("er", -1, 6, "", spanishStemmer.methodObject), new Among("ir", -1, 6, "", spanishStemmer.methodObject), new Among('\u00E1r', -1, 3, "", spanishStemmer.methodObject), new Among('\u00E9r', -1, 4, "", spanishStemmer.methodObject), new Among('\u00EDr', -1, 5, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete spanishStemmer.a_3;
                return spanishStemmer.a_3 = [new Among("ic", -1, -1, "", spanishStemmer.methodObject), new Among("ad", -1, -1, "", spanishStemmer.methodObject), new Among("os", -1, -1, "", spanishStemmer.methodObject), new Among("iv", -1, 1, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete spanishStemmer.a_4;
                return spanishStemmer.a_4 = [new Among("able", -1, 1, "", spanishStemmer.methodObject), new Among("ible", -1, 1, "", spanishStemmer.methodObject), new Among("ante", -1, 1, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete spanishStemmer.a_5;
                return spanishStemmer.a_5 = [new Among("ic", -1, 1, "", spanishStemmer.methodObject), new Among("abil", -1, 1, "", spanishStemmer.methodObject), new Among("iv", -1, 1, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete spanishStemmer.a_6;
                return spanishStemmer.a_6 = [new Among("ica", -1, 1, "", spanishStemmer.methodObject), new Among("ancia", -1, 2, "", spanishStemmer.methodObject), new Among("encia", -1, 5, "", spanishStemmer.methodObject), new Among("adora", -1, 2, "", spanishStemmer.methodObject), new Among("osa", -1, 1, "", spanishStemmer.methodObject), new Among("ista", -1, 1, "", spanishStemmer.methodObject), new Among("iva", -1, 9, "", spanishStemmer.methodObject), new Among("anza", -1, 1, "", spanishStemmer.methodObject), new Among('log\u00EDa', -1, 3, "", spanishStemmer.methodObject), new Among("idad", -1, 8, "", spanishStemmer.methodObject), new Among("able", -1, 1, "", spanishStemmer.methodObject), new Among("ible", -1, 1, "", spanishStemmer.methodObject), new Among("ante", -1, 2, "", spanishStemmer.methodObject), new Among("mente", -1, 7, "", spanishStemmer.methodObject), new Among("amente", 13, 6, "", spanishStemmer.methodObject), new Among('aci\u00F3n', -1, 2, "", spanishStemmer.methodObject), new Among('uci\u00F3n', -1, 4, "", spanishStemmer.methodObject), new Among("ico", -1, 1, "", spanishStemmer.methodObject), new Among("ismo", -1, 1, "", spanishStemmer.methodObject), new Among("oso", -1, 1, "", spanishStemmer.methodObject), new Among("amiento", -1, 1, "", spanishStemmer.methodObject), new Among("imiento", -1, 1, "", spanishStemmer.methodObject), new Among("ivo", -1, 9, "", spanishStemmer.methodObject), new Among("ador", -1, 2, "", spanishStemmer.methodObject), new Among("icas", -1, 1, "", spanishStemmer.methodObject), new Among("ancias", -1, 2, "", spanishStemmer.methodObject), new Among("encias", -1, 5, "", spanishStemmer.methodObject), new Among("adoras", -1, 2, "", spanishStemmer.methodObject), new Among("osas", -1, 1, "", spanishStemmer.methodObject), new Among("istas", -1, 1, "", spanishStemmer.methodObject), new Among("ivas", -1, 9, "", spanishStemmer.methodObject), new Among("anzas", -1, 1, "", spanishStemmer.methodObject), new Among('log\u00EDas', -1, 3, "", spanishStemmer.methodObject), new Among("idades", -1, 8, "", spanishStemmer.methodObject), new Among("ables", -1, 1, "", spanishStemmer.methodObject), new Among("ibles", -1, 1, "", spanishStemmer.methodObject), new Among("aciones", -1, 2, "", spanishStemmer.methodObject), new Among("uciones", -1, 4, "", spanishStemmer.methodObject), new Among("adores", -1, 2, "", spanishStemmer.methodObject), new Among("antes", -1, 2, "", spanishStemmer.methodObject), new Among("icos", -1, 1, "", spanishStemmer.methodObject), new Among("ismos", -1, 1, "", spanishStemmer.methodObject), new Among("osos", -1, 1, "", spanishStemmer.methodObject), new Among("amientos", -1, 1, "", spanishStemmer.methodObject), new Among("imientos", -1, 1, "", spanishStemmer.methodObject), new Among("ivos", -1, 9, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete spanishStemmer.a_7;
                return spanishStemmer.a_7 = [new Among("ya", -1, 1, "", spanishStemmer.methodObject), new Among("ye", -1, 1, "", spanishStemmer.methodObject), new Among("yan", -1, 1, "", spanishStemmer.methodObject), new Among("yen", -1, 1, "", spanishStemmer.methodObject), new Among("yeron", -1, 1, "", spanishStemmer.methodObject), new Among("yendo", -1, 1, "", spanishStemmer.methodObject), new Among("yo", -1, 1, "", spanishStemmer.methodObject), new Among("yas", -1, 1, "", spanishStemmer.methodObject), new Among("yes", -1, 1, "", spanishStemmer.methodObject), new Among("yais", -1, 1, "", spanishStemmer.methodObject), new Among("yamos", -1, 1, "", spanishStemmer.methodObject), new Among('y\u00F3', -1, 1, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_8',
            get: function get() {
                delete spanishStemmer.a_8;
                return spanishStemmer.a_8 = [new Among("aba", -1, 2, "", spanishStemmer.methodObject), new Among("ada", -1, 2, "", spanishStemmer.methodObject), new Among("ida", -1, 2, "", spanishStemmer.methodObject), new Among("ara", -1, 2, "", spanishStemmer.methodObject), new Among("iera", -1, 2, "", spanishStemmer.methodObject), new Among('\u00EDa', -1, 2, "", spanishStemmer.methodObject), new Among('ar\u00EDa', 5, 2, "", spanishStemmer.methodObject), new Among('er\u00EDa', 5, 2, "", spanishStemmer.methodObject), new Among('ir\u00EDa', 5, 2, "", spanishStemmer.methodObject), new Among("ad", -1, 2, "", spanishStemmer.methodObject), new Among("ed", -1, 2, "", spanishStemmer.methodObject), new Among("id", -1, 2, "", spanishStemmer.methodObject), new Among("ase", -1, 2, "", spanishStemmer.methodObject), new Among("iese", -1, 2, "", spanishStemmer.methodObject), new Among("aste", -1, 2, "", spanishStemmer.methodObject), new Among("iste", -1, 2, "", spanishStemmer.methodObject), new Among("an", -1, 2, "", spanishStemmer.methodObject), new Among("aban", 16, 2, "", spanishStemmer.methodObject), new Among("aran", 16, 2, "", spanishStemmer.methodObject), new Among("ieran", 16, 2, "", spanishStemmer.methodObject), new Among('\u00EDan', 16, 2, "", spanishStemmer.methodObject), new Among('ar\u00EDan', 20, 2, "", spanishStemmer.methodObject), new Among('er\u00EDan', 20, 2, "", spanishStemmer.methodObject), new Among('ir\u00EDan', 20, 2, "", spanishStemmer.methodObject), new Among("en", -1, 1, "", spanishStemmer.methodObject), new Among("asen", 24, 2, "", spanishStemmer.methodObject), new Among("iesen", 24, 2, "", spanishStemmer.methodObject), new Among("aron", -1, 2, "", spanishStemmer.methodObject), new Among("ieron", -1, 2, "", spanishStemmer.methodObject), new Among('ar\u00E1n', -1, 2, "", spanishStemmer.methodObject), new Among('er\u00E1n', -1, 2, "", spanishStemmer.methodObject), new Among('ir\u00E1n', -1, 2, "", spanishStemmer.methodObject), new Among("ado", -1, 2, "", spanishStemmer.methodObject), new Among("ido", -1, 2, "", spanishStemmer.methodObject), new Among("ando", -1, 2, "", spanishStemmer.methodObject), new Among("iendo", -1, 2, "", spanishStemmer.methodObject), new Among("ar", -1, 2, "", spanishStemmer.methodObject), new Among("er", -1, 2, "", spanishStemmer.methodObject), new Among("ir", -1, 2, "", spanishStemmer.methodObject), new Among("as", -1, 2, "", spanishStemmer.methodObject), new Among("abas", 39, 2, "", spanishStemmer.methodObject), new Among("adas", 39, 2, "", spanishStemmer.methodObject), new Among("idas", 39, 2, "", spanishStemmer.methodObject), new Among("aras", 39, 2, "", spanishStemmer.methodObject), new Among("ieras", 39, 2, "", spanishStemmer.methodObject), new Among('\u00EDas', 39, 2, "", spanishStemmer.methodObject), new Among('ar\u00EDas', 45, 2, "", spanishStemmer.methodObject), new Among('er\u00EDas', 45, 2, "", spanishStemmer.methodObject), new Among('ir\u00EDas', 45, 2, "", spanishStemmer.methodObject), new Among("es", -1, 1, "", spanishStemmer.methodObject), new Among("ases", 49, 2, "", spanishStemmer.methodObject), new Among("ieses", 49, 2, "", spanishStemmer.methodObject), new Among("abais", -1, 2, "", spanishStemmer.methodObject), new Among("arais", -1, 2, "", spanishStemmer.methodObject), new Among("ierais", -1, 2, "", spanishStemmer.methodObject), new Among('\u00EDais', -1, 2, "", spanishStemmer.methodObject), new Among('ar\u00EDais', 55, 2, "", spanishStemmer.methodObject), new Among('er\u00EDais', 55, 2, "", spanishStemmer.methodObject), new Among('ir\u00EDais', 55, 2, "", spanishStemmer.methodObject), new Among("aseis", -1, 2, "", spanishStemmer.methodObject), new Among("ieseis", -1, 2, "", spanishStemmer.methodObject), new Among("asteis", -1, 2, "", spanishStemmer.methodObject), new Among("isteis", -1, 2, "", spanishStemmer.methodObject), new Among('\u00E1is', -1, 2, "", spanishStemmer.methodObject), new Among('\u00E9is', -1, 1, "", spanishStemmer.methodObject), new Among('ar\u00E9is', 64, 2, "", spanishStemmer.methodObject), new Among('er\u00E9is', 64, 2, "", spanishStemmer.methodObject), new Among('ir\u00E9is', 64, 2, "", spanishStemmer.methodObject), new Among("ados", -1, 2, "", spanishStemmer.methodObject), new Among("idos", -1, 2, "", spanishStemmer.methodObject), new Among("amos", -1, 2, "", spanishStemmer.methodObject), new Among('\u00E1bamos', 70, 2, "", spanishStemmer.methodObject), new Among('\u00E1ramos', 70, 2, "", spanishStemmer.methodObject), new Among('i\u00E9ramos', 70, 2, "", spanishStemmer.methodObject), new Among('\u00EDamos', 70, 2, "", spanishStemmer.methodObject), new Among('ar\u00EDamos', 74, 2, "", spanishStemmer.methodObject), new Among('er\u00EDamos', 74, 2, "", spanishStemmer.methodObject), new Among('ir\u00EDamos', 74, 2, "", spanishStemmer.methodObject), new Among("emos", -1, 1, "", spanishStemmer.methodObject), new Among("aremos", 78, 2, "", spanishStemmer.methodObject), new Among("eremos", 78, 2, "", spanishStemmer.methodObject), new Among("iremos", 78, 2, "", spanishStemmer.methodObject), new Among('\u00E1semos', 78, 2, "", spanishStemmer.methodObject), new Among('i\u00E9semos', 78, 2, "", spanishStemmer.methodObject), new Among("imos", -1, 2, "", spanishStemmer.methodObject), new Among('ar\u00E1s', -1, 2, "", spanishStemmer.methodObject), new Among('er\u00E1s', -1, 2, "", spanishStemmer.methodObject), new Among('ir\u00E1s', -1, 2, "", spanishStemmer.methodObject), new Among('\u00EDs', -1, 2, "", spanishStemmer.methodObject), new Among('ar\u00E1', -1, 2, "", spanishStemmer.methodObject), new Among('er\u00E1', -1, 2, "", spanishStemmer.methodObject), new Among('ir\u00E1', -1, 2, "", spanishStemmer.methodObject), new Among('ar\u00E9', -1, 2, "", spanishStemmer.methodObject), new Among('er\u00E9', -1, 2, "", spanishStemmer.methodObject), new Among('ir\u00E9', -1, 2, "", spanishStemmer.methodObject), new Among('i\u00F3', -1, 2, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'a_9',
            get: function get() {
                delete spanishStemmer.a_9;
                return spanishStemmer.a_9 = [new Among("a", -1, 1, "", spanishStemmer.methodObject), new Among("e", -1, 2, "", spanishStemmer.methodObject), new Among("o", -1, 1, "", spanishStemmer.methodObject), new Among("os", -1, 1, "", spanishStemmer.methodObject), new Among('\u00E1', -1, 1, "", spanishStemmer.methodObject), new Among('\u00E9', -1, 2, "", spanishStemmer.methodObject), new Among('\u00ED', -1, 1, "", spanishStemmer.methodObject), new Among('\u00F3', -1, 1, "", spanishStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete spanishStemmer.g_v;
                return spanishStemmer.g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 10];
            }
        }]);

        return spanishStemmer;
    })(SnowballStemmer);

    var swedishStemmer = (function (_SnowballStemmer21) {
        _inherits(swedishStemmer, _SnowballStemmer21);

        function swedishStemmer() {
            _classCallCheck(this, swedishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(swedishStemmer).apply(this, arguments));
        }

        _createClass(swedishStemmer, [{
            key: 'r_mark_regions$esjava$0',
            value: function r_mark_regions$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                this.I_p1 = this.limit;
                v_1 = this.cursor;
                {
                    var c = this.cursor + 3;

                    if (0 > c || c > this.limit) {
                        return false;
                    }

                    this.cursor = c;
                }
                this.I_x = this.cursor;
                this.cursor = v_1;

                golab0: while (true) {
                    v_2 = this.cursor;

                    lab1: do {
                        if (!this.in_grouping$esjava$3(swedishStemmer.g_v, 97, 246)) {
                            break lab1;
                        }

                        this.cursor = v_2;
                        break golab0;
                    } while (false);

                    this.cursor = v_2;

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                golab2: while (true) {
                    lab3: do {
                        if (!this.out_grouping$esjava$3(swedishStemmer.g_v, 97, 246)) {
                            break lab3;
                        }

                        break golab2;
                    } while (false);

                    if (this.cursor >= this.limit) {
                        return false;
                    }

                    this.cursor++;
                }

                this.I_p1 = this.cursor;

                lab4: do {
                    if (!(this.I_p1 < this.I_x)) {
                        break lab4;
                    }

                    this.I_p1 = this.I_x;
                } while (false);

                return true;
            }
        }, {
            key: 'r_main_suffix$esjava$0',
            value: function r_main_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(swedishStemmer.a_0, 37);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;
                this.limit_backward = v_2;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        if (!this.in_grouping_b$esjava$3(swedishStemmer.g_s_ending, 98, 121)) {
                            return false;
                        }

                        this.slice_del$esjava$0();
                        break;
                }

                return true;
            }
        }, {
            key: 'r_consonant_pair$esjava$0',
            value: function r_consonant_pair$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                v_3 = this.limit - this.cursor;

                if (this.find_among_b$esjava$2(swedishStemmer.a_1, 7) === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.cursor = this.limit - v_3;
                this.ket = this.cursor;

                if (this.cursor <= this.limit_backward) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.cursor--;
                this.bra = this.cursor;
                this.slice_del$esjava$0();
                this.limit_backward = v_2;
                return true;
            }
        }, {
            key: 'r_other_suffix$esjava$0',
            value: function r_other_suffix$esjava$0() {
                var among_var = undefined;
                var v_1 = undefined;
                var v_2 = undefined;
                v_1 = this.limit - this.cursor;

                if (this.cursor < this.I_p1) {
                    return false;
                }

                this.cursor = this.I_p1;
                v_2 = this.limit_backward;
                this.limit_backward = this.cursor;
                this.cursor = this.limit - v_1;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(swedishStemmer.a_2, 5);

                if (among_var === 0) {
                    this.limit_backward = v_2;
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        this.limit_backward = v_2;
                        return false;

                    case 1:
                        this.slice_del$esjava$0();
                        break;

                    case 2:
                        this.slice_from$esjava$1('l\u00F6s');
                        break;

                    case 3:
                        this.slice_from$esjava$1("full");
                        break;
                }

                this.limit_backward = v_2;
                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                v_1 = this.cursor;

                lab0: do {
                    if (!this.r_mark_regions$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = v_1;
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_main_suffix$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_consonant_pair$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                v_4 = this.limit - this.cursor;

                lab3: do {
                    if (!this.r_other_suffix$esjava$0()) {
                        break lab3;
                    }
                } while (false);

                this.cursor = this.limit - v_4;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'I_x',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_x') ? this._$esjava$I_x : this._$esjava$I_x = 0;
            },
            set: function set(v) {
                this._$esjava$I_x = v;
            }
        }, {
            key: 'I_p1',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_p1') ? this._$esjava$I_p1 : this._$esjava$I_p1 = 0;
            },
            set: function set(v) {
                this._$esjava$I_p1 = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete swedishStemmer.methodObject;
                return swedishStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete swedishStemmer.a_0;
                return swedishStemmer.a_0 = [new Among("a", -1, 1, "", swedishStemmer.methodObject), new Among("arna", 0, 1, "", swedishStemmer.methodObject), new Among("erna", 0, 1, "", swedishStemmer.methodObject), new Among("heterna", 2, 1, "", swedishStemmer.methodObject), new Among("orna", 0, 1, "", swedishStemmer.methodObject), new Among("ad", -1, 1, "", swedishStemmer.methodObject), new Among("e", -1, 1, "", swedishStemmer.methodObject), new Among("ade", 6, 1, "", swedishStemmer.methodObject), new Among("ande", 6, 1, "", swedishStemmer.methodObject), new Among("arne", 6, 1, "", swedishStemmer.methodObject), new Among("are", 6, 1, "", swedishStemmer.methodObject), new Among("aste", 6, 1, "", swedishStemmer.methodObject), new Among("en", -1, 1, "", swedishStemmer.methodObject), new Among("anden", 12, 1, "", swedishStemmer.methodObject), new Among("aren", 12, 1, "", swedishStemmer.methodObject), new Among("heten", 12, 1, "", swedishStemmer.methodObject), new Among("ern", -1, 1, "", swedishStemmer.methodObject), new Among("ar", -1, 1, "", swedishStemmer.methodObject), new Among("er", -1, 1, "", swedishStemmer.methodObject), new Among("heter", 18, 1, "", swedishStemmer.methodObject), new Among("or", -1, 1, "", swedishStemmer.methodObject), new Among("s", -1, 2, "", swedishStemmer.methodObject), new Among("as", 21, 1, "", swedishStemmer.methodObject), new Among("arnas", 22, 1, "", swedishStemmer.methodObject), new Among("ernas", 22, 1, "", swedishStemmer.methodObject), new Among("ornas", 22, 1, "", swedishStemmer.methodObject), new Among("es", 21, 1, "", swedishStemmer.methodObject), new Among("ades", 26, 1, "", swedishStemmer.methodObject), new Among("andes", 26, 1, "", swedishStemmer.methodObject), new Among("ens", 21, 1, "", swedishStemmer.methodObject), new Among("arens", 29, 1, "", swedishStemmer.methodObject), new Among("hetens", 29, 1, "", swedishStemmer.methodObject), new Among("erns", 21, 1, "", swedishStemmer.methodObject), new Among("at", -1, 1, "", swedishStemmer.methodObject), new Among("andet", -1, 1, "", swedishStemmer.methodObject), new Among("het", -1, 1, "", swedishStemmer.methodObject), new Among("ast", -1, 1, "", swedishStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete swedishStemmer.a_1;
                return swedishStemmer.a_1 = [new Among("dd", -1, -1, "", swedishStemmer.methodObject), new Among("gd", -1, -1, "", swedishStemmer.methodObject), new Among("nn", -1, -1, "", swedishStemmer.methodObject), new Among("dt", -1, -1, "", swedishStemmer.methodObject), new Among("gt", -1, -1, "", swedishStemmer.methodObject), new Among("kt", -1, -1, "", swedishStemmer.methodObject), new Among("tt", -1, -1, "", swedishStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete swedishStemmer.a_2;
                return swedishStemmer.a_2 = [new Among("ig", -1, 1, "", swedishStemmer.methodObject), new Among("lig", 0, 1, "", swedishStemmer.methodObject), new Among("els", -1, 1, "", swedishStemmer.methodObject), new Among("fullt", -1, 3, "", swedishStemmer.methodObject), new Among('l\u00F6st', -1, 2, "", swedishStemmer.methodObject)];
            }
        }, {
            key: 'g_v',
            get: function get() {
                delete swedishStemmer.g_v;
                return swedishStemmer.g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 32];
            }
        }, {
            key: 'g_s_ending',
            get: function get() {
                delete swedishStemmer.g_s_ending;
                return swedishStemmer.g_s_ending = [119, 127, 149];
            }
        }]);

        return swedishStemmer;
    })(SnowballStemmer);

    var turkishStemmer = (function (_SnowballStemmer22) {
        _inherits(turkishStemmer, _SnowballStemmer22);

        function turkishStemmer() {
            _classCallCheck(this, turkishStemmer);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(turkishStemmer).apply(this, arguments));
        }

        _createClass(turkishStemmer, [{
            key: 'r_check_vowel_harmony$esjava$0',
            value: function r_check_vowel_harmony$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                v_1 = this.limit - this.cursor;

                golab0: while (true) {
                    v_2 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_2;
                        break golab0;
                    } while (false);

                    this.cursor = this.limit - v_2;

                    if (this.cursor <= this.limit_backward) {
                        return false;
                    }

                    this.cursor--;
                }

                lab2: do {
                    v_3 = this.limit - this.cursor;

                    lab3: do {
                        if (!this.eq_s_b$esjava$2(1, "a")) {
                            break lab3;
                        }

                        golab4: while (true) {
                            v_4 = this.limit - this.cursor;

                            lab5: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel1, 97, 305)) {
                                    break lab5;
                                }

                                this.cursor = this.limit - v_4;
                                break golab4;
                            } while (false);

                            this.cursor = this.limit - v_4;

                            if (this.cursor <= this.limit_backward) {
                                break lab3;
                            }

                            this.cursor--;
                        }

                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    lab6: do {
                        if (!this.eq_s_b$esjava$2(1, "e")) {
                            break lab6;
                        }

                        golab7: while (true) {
                            v_5 = this.limit - this.cursor;

                            lab8: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel2, 101, 252)) {
                                    break lab8;
                                }

                                this.cursor = this.limit - v_5;
                                break golab7;
                            } while (false);

                            this.cursor = this.limit - v_5;

                            if (this.cursor <= this.limit_backward) {
                                break lab6;
                            }

                            this.cursor--;
                        }

                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    lab9: do {
                        if (!this.eq_s_b$esjava$2(1, '\u0131')) {
                            break lab9;
                        }

                        golab10: while (true) {
                            v_6 = this.limit - this.cursor;

                            lab11: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel3, 97, 305)) {
                                    break lab11;
                                }

                                this.cursor = this.limit - v_6;
                                break golab10;
                            } while (false);

                            this.cursor = this.limit - v_6;

                            if (this.cursor <= this.limit_backward) {
                                break lab9;
                            }

                            this.cursor--;
                        }

                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    lab12: do {
                        if (!this.eq_s_b$esjava$2(1, "i")) {
                            break lab12;
                        }

                        golab13: while (true) {
                            v_7 = this.limit - this.cursor;

                            lab14: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel4, 101, 105)) {
                                    break lab14;
                                }

                                this.cursor = this.limit - v_7;
                                break golab13;
                            } while (false);

                            this.cursor = this.limit - v_7;

                            if (this.cursor <= this.limit_backward) {
                                break lab12;
                            }

                            this.cursor--;
                        }

                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    lab15: do {
                        if (!this.eq_s_b$esjava$2(1, "o")) {
                            break lab15;
                        }

                        golab16: while (true) {
                            v_8 = this.limit - this.cursor;

                            lab17: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel5, 111, 117)) {
                                    break lab17;
                                }

                                this.cursor = this.limit - v_8;
                                break golab16;
                            } while (false);

                            this.cursor = this.limit - v_8;

                            if (this.cursor <= this.limit_backward) {
                                break lab15;
                            }

                            this.cursor--;
                        }

                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    lab18: do {
                        if (!this.eq_s_b$esjava$2(1, '\u00F6')) {
                            break lab18;
                        }

                        golab19: while (true) {
                            v_9 = this.limit - this.cursor;

                            lab20: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel6, 246, 252)) {
                                    break lab20;
                                }

                                this.cursor = this.limit - v_9;
                                break golab19;
                            } while (false);

                            this.cursor = this.limit - v_9;

                            if (this.cursor <= this.limit_backward) {
                                break lab18;
                            }

                            this.cursor--;
                        }

                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    lab21: do {
                        if (!this.eq_s_b$esjava$2(1, "u")) {
                            break lab21;
                        }

                        golab22: while (true) {
                            v_10 = this.limit - this.cursor;

                            lab23: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel5, 111, 117)) {
                                    break lab23;
                                }

                                this.cursor = this.limit - v_10;
                                break golab22;
                            } while (false);

                            this.cursor = this.limit - v_10;

                            if (this.cursor <= this.limit_backward) {
                                break lab21;
                            }

                            this.cursor--;
                        }

                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    if (!this.eq_s_b$esjava$2(1, '\u00FC')) {
                        return false;
                    }

                    golab24: while (true) {
                        v_11 = this.limit - this.cursor;

                        lab25: do {
                            if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel6, 246, 252)) {
                                break lab25;
                            }

                            this.cursor = this.limit - v_11;
                            break golab24;
                        } while (false);

                        this.cursor = this.limit - v_11;

                        if (this.cursor <= this.limit_backward) {
                            return false;
                        }

                        this.cursor--;
                    }
                } while (false);

                this.cursor = this.limit - v_1;
                return true;
            }
        }, {
            key: 'r_mark_suffix_with_optional_n_consonant$esjava$0',
            value: function r_mark_suffix_with_optional_n_consonant$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        v_2 = this.limit - this.cursor;

                        if (!this.eq_s_b$esjava$2(1, "n")) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_2;

                        if (this.cursor <= this.limit_backward) {
                            break lab1;
                        }

                        this.cursor--;
                        v_3 = this.limit - this.cursor;

                        if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_3;
                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;
                    {
                        v_4 = this.limit - this.cursor;

                        lab2: do {
                            v_5 = this.limit - this.cursor;

                            if (!this.eq_s_b$esjava$2(1, "n")) {
                                break lab2;
                            }

                            this.cursor = this.limit - v_5;
                            return false;
                        } while (false);

                        this.cursor = this.limit - v_4;
                    }
                    v_6 = this.limit - this.cursor;

                    if (this.cursor <= this.limit_backward) {
                        return false;
                    }

                    this.cursor--;
                    v_7 = this.limit - this.cursor;

                    if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                        return false;
                    }

                    this.cursor = this.limit - v_7;
                    this.cursor = this.limit - v_6;
                } while (false);

                return true;
            }
        }, {
            key: 'r_mark_suffix_with_optional_s_consonant$esjava$0',
            value: function r_mark_suffix_with_optional_s_consonant$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        v_2 = this.limit - this.cursor;

                        if (!this.eq_s_b$esjava$2(1, "s")) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_2;

                        if (this.cursor <= this.limit_backward) {
                            break lab1;
                        }

                        this.cursor--;
                        v_3 = this.limit - this.cursor;

                        if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_3;
                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;
                    {
                        v_4 = this.limit - this.cursor;

                        lab2: do {
                            v_5 = this.limit - this.cursor;

                            if (!this.eq_s_b$esjava$2(1, "s")) {
                                break lab2;
                            }

                            this.cursor = this.limit - v_5;
                            return false;
                        } while (false);

                        this.cursor = this.limit - v_4;
                    }
                    v_6 = this.limit - this.cursor;

                    if (this.cursor <= this.limit_backward) {
                        return false;
                    }

                    this.cursor--;
                    v_7 = this.limit - this.cursor;

                    if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                        return false;
                    }

                    this.cursor = this.limit - v_7;
                    this.cursor = this.limit - v_6;
                } while (false);

                return true;
            }
        }, {
            key: 'r_mark_suffix_with_optional_y_consonant$esjava$0',
            value: function r_mark_suffix_with_optional_y_consonant$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        v_2 = this.limit - this.cursor;

                        if (!this.eq_s_b$esjava$2(1, "y")) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_2;

                        if (this.cursor <= this.limit_backward) {
                            break lab1;
                        }

                        this.cursor--;
                        v_3 = this.limit - this.cursor;

                        if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_3;
                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;
                    {
                        v_4 = this.limit - this.cursor;

                        lab2: do {
                            v_5 = this.limit - this.cursor;

                            if (!this.eq_s_b$esjava$2(1, "y")) {
                                break lab2;
                            }

                            this.cursor = this.limit - v_5;
                            return false;
                        } while (false);

                        this.cursor = this.limit - v_4;
                    }
                    v_6 = this.limit - this.cursor;

                    if (this.cursor <= this.limit_backward) {
                        return false;
                    }

                    this.cursor--;
                    v_7 = this.limit - this.cursor;

                    if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                        return false;
                    }

                    this.cursor = this.limit - v_7;
                    this.cursor = this.limit - v_6;
                } while (false);

                return true;
            }
        }, {
            key: 'r_mark_suffix_with_optional_U_vowel$esjava$0',
            value: function r_mark_suffix_with_optional_U_vowel$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        v_2 = this.limit - this.cursor;

                        if (!this.in_grouping_b$esjava$3(turkishStemmer.g_U, 105, 305)) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_2;

                        if (this.cursor <= this.limit_backward) {
                            break lab1;
                        }

                        this.cursor--;
                        v_3 = this.limit - this.cursor;

                        if (!this.out_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                            break lab1;
                        }

                        this.cursor = this.limit - v_3;
                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;
                    {
                        v_4 = this.limit - this.cursor;

                        lab2: do {
                            v_5 = this.limit - this.cursor;

                            if (!this.in_grouping_b$esjava$3(turkishStemmer.g_U, 105, 305)) {
                                break lab2;
                            }

                            this.cursor = this.limit - v_5;
                            return false;
                        } while (false);

                        this.cursor = this.limit - v_4;
                    }
                    v_6 = this.limit - this.cursor;

                    if (this.cursor <= this.limit_backward) {
                        return false;
                    }

                    this.cursor--;
                    v_7 = this.limit - this.cursor;

                    if (!this.out_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                        return false;
                    }

                    this.cursor = this.limit - v_7;
                    this.cursor = this.limit - v_6;
                } while (false);

                return true;
            }
        }, {
            key: 'r_mark_possessives$esjava$0',
            value: function r_mark_possessives$esjava$0() {
                if (this.find_among_b$esjava$2(turkishStemmer.a_0, 10) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_U_vowel$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_sU$esjava$0',
            value: function r_mark_sU$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_U, 105, 305)) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_s_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_lArI$esjava$0',
            value: function r_mark_lArI$esjava$0() {
                if (this.find_among_b$esjava$2(turkishStemmer.a_1, 2) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_yU$esjava$0',
            value: function r_mark_yU$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_U, 105, 305)) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_nU$esjava$0',
            value: function r_mark_nU$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_2, 4) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_nUn$esjava$0',
            value: function r_mark_nUn$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_3, 4) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_n_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_yA$esjava$0',
            value: function r_mark_yA$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_4, 2) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_nA$esjava$0',
            value: function r_mark_nA$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_5, 2) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_DA$esjava$0',
            value: function r_mark_DA$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_6, 4) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_ndA$esjava$0',
            value: function r_mark_ndA$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_7, 2) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_DAn$esjava$0',
            value: function r_mark_DAn$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_8, 4) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_ndAn$esjava$0',
            value: function r_mark_ndAn$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_9, 2) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_ylA$esjava$0',
            value: function r_mark_ylA$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_10, 2) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_ki$esjava$0',
            value: function r_mark_ki$esjava$0() {
                if (!this.eq_s_b$esjava$2(2, "ki")) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_ncA$esjava$0',
            value: function r_mark_ncA$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_11, 2) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_n_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_yUm$esjava$0',
            value: function r_mark_yUm$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_12, 4) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_sUn$esjava$0',
            value: function r_mark_sUn$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_13, 4) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_yUz$esjava$0',
            value: function r_mark_yUz$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_14, 4) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_sUnUz$esjava$0',
            value: function r_mark_sUnUz$esjava$0() {
                if (this.find_among_b$esjava$2(turkishStemmer.a_15, 4) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_lAr$esjava$0',
            value: function r_mark_lAr$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_16, 2) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_nUz$esjava$0',
            value: function r_mark_nUz$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_17, 4) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_DUr$esjava$0',
            value: function r_mark_DUr$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_18, 8) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_cAsInA$esjava$0',
            value: function r_mark_cAsInA$esjava$0() {
                if (this.find_among_b$esjava$2(turkishStemmer.a_19, 2) === 0) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_yDU$esjava$0',
            value: function r_mark_yDU$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_20, 32) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_ysA$esjava$0',
            value: function r_mark_ysA$esjava$0() {
                if (this.find_among_b$esjava$2(turkishStemmer.a_21, 8) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_ymUs_$esjava$0',
            value: function r_mark_ymUs_$esjava$0() {
                if (!this.r_check_vowel_harmony$esjava$0()) {
                    return false;
                }

                if (this.find_among_b$esjava$2(turkishStemmer.a_22, 4) === 0) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_mark_yken$esjava$0',
            value: function r_mark_yken$esjava$0() {
                if (!this.eq_s_b$esjava$2(3, "ken")) {
                    return false;
                }

                if (!this.r_mark_suffix_with_optional_y_consonant$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'r_stem_nominal_verb_suffixes$esjava$0',
            value: function r_stem_nominal_verb_suffixes$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                this.ket = this.cursor;
                this.B_continue_stemming_noun_suffixes = true;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        lab2: do {
                            v_2 = this.limit - this.cursor;

                            lab3: do {
                                if (!this.r_mark_ymUs_$esjava$0()) {
                                    break lab3;
                                }

                                break lab2;
                            } while (false);

                            this.cursor = this.limit - v_2;

                            lab4: do {
                                if (!this.r_mark_yDU$esjava$0()) {
                                    break lab4;
                                }

                                break lab2;
                            } while (false);

                            this.cursor = this.limit - v_2;

                            lab5: do {
                                if (!this.r_mark_ysA$esjava$0()) {
                                    break lab5;
                                }

                                break lab2;
                            } while (false);

                            this.cursor = this.limit - v_2;

                            if (!this.r_mark_yken$esjava$0()) {
                                break lab1;
                            }
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab6: do {
                        if (!this.r_mark_cAsInA$esjava$0()) {
                            break lab6;
                        }

                        lab7: do {
                            v_3 = this.limit - this.cursor;

                            lab8: do {
                                if (!this.r_mark_sUnUz$esjava$0()) {
                                    break lab8;
                                }

                                break lab7;
                            } while (false);

                            this.cursor = this.limit - v_3;

                            lab9: do {
                                if (!this.r_mark_lAr$esjava$0()) {
                                    break lab9;
                                }

                                break lab7;
                            } while (false);

                            this.cursor = this.limit - v_3;

                            lab10: do {
                                if (!this.r_mark_yUm$esjava$0()) {
                                    break lab10;
                                }

                                break lab7;
                            } while (false);

                            this.cursor = this.limit - v_3;

                            lab11: do {
                                if (!this.r_mark_sUn$esjava$0()) {
                                    break lab11;
                                }

                                break lab7;
                            } while (false);

                            this.cursor = this.limit - v_3;

                            lab12: do {
                                if (!this.r_mark_yUz$esjava$0()) {
                                    break lab12;
                                }

                                break lab7;
                            } while (false);

                            this.cursor = this.limit - v_3;
                        } while (false);

                        if (!this.r_mark_ymUs_$esjava$0()) {
                            break lab6;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab13: do {
                        if (!this.r_mark_lAr$esjava$0()) {
                            break lab13;
                        }

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_4 = this.limit - this.cursor;

                        lab14: do {
                            this.ket = this.cursor;

                            lab15: do {
                                v_5 = this.limit - this.cursor;

                                lab16: do {
                                    if (!this.r_mark_DUr$esjava$0()) {
                                        break lab16;
                                    }

                                    break lab15;
                                } while (false);

                                this.cursor = this.limit - v_5;

                                lab17: do {
                                    if (!this.r_mark_yDU$esjava$0()) {
                                        break lab17;
                                    }

                                    break lab15;
                                } while (false);

                                this.cursor = this.limit - v_5;

                                lab18: do {
                                    if (!this.r_mark_ysA$esjava$0()) {
                                        break lab18;
                                    }

                                    break lab15;
                                } while (false);

                                this.cursor = this.limit - v_5;

                                if (!this.r_mark_ymUs_$esjava$0()) {
                                    this.cursor = this.limit - v_4;
                                    break lab14;
                                }
                            } while (false);
                        } while (false);

                        this.B_continue_stemming_noun_suffixes = false;
                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab19: do {
                        if (!this.r_mark_nUz$esjava$0()) {
                            break lab19;
                        }

                        lab20: do {
                            v_6 = this.limit - this.cursor;

                            lab21: do {
                                if (!this.r_mark_yDU$esjava$0()) {
                                    break lab21;
                                }

                                break lab20;
                            } while (false);

                            this.cursor = this.limit - v_6;

                            if (!this.r_mark_ysA$esjava$0()) {
                                break lab19;
                            }
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab22: do {
                        lab23: do {
                            v_7 = this.limit - this.cursor;

                            lab24: do {
                                if (!this.r_mark_sUnUz$esjava$0()) {
                                    break lab24;
                                }

                                break lab23;
                            } while (false);

                            this.cursor = this.limit - v_7;

                            lab25: do {
                                if (!this.r_mark_yUz$esjava$0()) {
                                    break lab25;
                                }

                                break lab23;
                            } while (false);

                            this.cursor = this.limit - v_7;

                            lab26: do {
                                if (!this.r_mark_sUn$esjava$0()) {
                                    break lab26;
                                }

                                break lab23;
                            } while (false);

                            this.cursor = this.limit - v_7;

                            if (!this.r_mark_yUm$esjava$0()) {
                                break lab22;
                            }
                        } while (false);

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_8 = this.limit - this.cursor;

                        lab27: do {
                            this.ket = this.cursor;

                            if (!this.r_mark_ymUs_$esjava$0()) {
                                this.cursor = this.limit - v_8;
                                break lab27;
                            }
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    if (!this.r_mark_DUr$esjava$0()) {
                        return false;
                    }

                    this.bra = this.cursor;
                    this.slice_del$esjava$0();
                    v_9 = this.limit - this.cursor;

                    lab28: do {
                        this.ket = this.cursor;

                        lab29: do {
                            v_10 = this.limit - this.cursor;

                            lab30: do {
                                if (!this.r_mark_sUnUz$esjava$0()) {
                                    break lab30;
                                }

                                break lab29;
                            } while (false);

                            this.cursor = this.limit - v_10;

                            lab31: do {
                                if (!this.r_mark_lAr$esjava$0()) {
                                    break lab31;
                                }

                                break lab29;
                            } while (false);

                            this.cursor = this.limit - v_10;

                            lab32: do {
                                if (!this.r_mark_yUm$esjava$0()) {
                                    break lab32;
                                }

                                break lab29;
                            } while (false);

                            this.cursor = this.limit - v_10;

                            lab33: do {
                                if (!this.r_mark_sUn$esjava$0()) {
                                    break lab33;
                                }

                                break lab29;
                            } while (false);

                            this.cursor = this.limit - v_10;

                            lab34: do {
                                if (!this.r_mark_yUz$esjava$0()) {
                                    break lab34;
                                }

                                break lab29;
                            } while (false);

                            this.cursor = this.limit - v_10;
                        } while (false);

                        if (!this.r_mark_ymUs_$esjava$0()) {
                            this.cursor = this.limit - v_9;
                            break lab28;
                        }
                    } while (false);
                } while (false);

                this.bra = this.cursor;
                this.slice_del$esjava$0();
                return true;
            }
        }, {
            key: 'r_stem_suffix_chain_before_ki$esjava$0',
            value: function r_stem_suffix_chain_before_ki$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                this.ket = this.cursor;

                if (!this.r_mark_ki$esjava$0()) {
                    return false;
                }

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.r_mark_DA$esjava$0()) {
                            break lab1;
                        }

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_2 = this.limit - this.cursor;

                        lab2: do {
                            this.ket = this.cursor;

                            lab3: do {
                                v_3 = this.limit - this.cursor;

                                lab4: do {
                                    if (!this.r_mark_lAr$esjava$0()) {
                                        break lab4;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    v_4 = this.limit - this.cursor;

                                    lab5: do {
                                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                            this.cursor = this.limit - v_4;
                                            break lab5;
                                        }
                                    } while (false);

                                    break lab3;
                                } while (false);

                                this.cursor = this.limit - v_3;

                                if (!this.r_mark_possessives$esjava$0()) {
                                    this.cursor = this.limit - v_2;
                                    break lab2;
                                }

                                this.bra = this.cursor;
                                this.slice_del$esjava$0();
                                v_5 = this.limit - this.cursor;

                                lab6: do {
                                    this.ket = this.cursor;

                                    if (!this.r_mark_lAr$esjava$0()) {
                                        this.cursor = this.limit - v_5;
                                        break lab6;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();

                                    if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                        this.cursor = this.limit - v_5;
                                        break lab6;
                                    }
                                } while (false);
                            } while (false);
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab7: do {
                        if (!this.r_mark_nUn$esjava$0()) {
                            break lab7;
                        }

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_6 = this.limit - this.cursor;

                        lab8: do {
                            this.ket = this.cursor;

                            lab9: do {
                                v_7 = this.limit - this.cursor;

                                lab10: do {
                                    if (!this.r_mark_lArI$esjava$0()) {
                                        break lab10;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    break lab9;
                                } while (false);

                                this.cursor = this.limit - v_7;

                                lab11: do {
                                    this.ket = this.cursor;

                                    lab12: do {
                                        v_8 = this.limit - this.cursor;

                                        lab13: do {
                                            if (!this.r_mark_possessives$esjava$0()) {
                                                break lab13;
                                            }

                                            break lab12;
                                        } while (false);

                                        this.cursor = this.limit - v_8;

                                        if (!this.r_mark_sU$esjava$0()) {
                                            break lab11;
                                        }
                                    } while (false);

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    v_9 = this.limit - this.cursor;

                                    lab14: do {
                                        this.ket = this.cursor;

                                        if (!this.r_mark_lAr$esjava$0()) {
                                            this.cursor = this.limit - v_9;
                                            break lab14;
                                        }

                                        this.bra = this.cursor;
                                        this.slice_del$esjava$0();

                                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                            this.cursor = this.limit - v_9;
                                            break lab14;
                                        }
                                    } while (false);

                                    break lab9;
                                } while (false);

                                this.cursor = this.limit - v_7;

                                if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                    this.cursor = this.limit - v_6;
                                    break lab8;
                                }
                            } while (false);
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    if (!this.r_mark_ndA$esjava$0()) {
                        return false;
                    }

                    lab15: do {
                        v_10 = this.limit - this.cursor;

                        lab16: do {
                            if (!this.r_mark_lArI$esjava$0()) {
                                break lab16;
                            }

                            this.bra = this.cursor;
                            this.slice_del$esjava$0();
                            break lab15;
                        } while (false);

                        this.cursor = this.limit - v_10;

                        lab17: do {
                            if (!this.r_mark_sU$esjava$0()) {
                                break lab17;
                            }

                            this.bra = this.cursor;
                            this.slice_del$esjava$0();
                            v_11 = this.limit - this.cursor;

                            lab18: do {
                                this.ket = this.cursor;

                                if (!this.r_mark_lAr$esjava$0()) {
                                    this.cursor = this.limit - v_11;
                                    break lab18;
                                }

                                this.bra = this.cursor;
                                this.slice_del$esjava$0();

                                if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                    this.cursor = this.limit - v_11;
                                    break lab18;
                                }
                            } while (false);

                            break lab15;
                        } while (false);

                        this.cursor = this.limit - v_10;

                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                            return false;
                        }
                    } while (false);
                } while (false);

                return true;
            }
        }, {
            key: 'r_stem_noun_suffixes$esjava$0',
            value: function r_stem_noun_suffixes$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                var v_12 = undefined;
                var v_13 = undefined;
                var v_14 = undefined;
                var v_15 = undefined;
                var v_16 = undefined;
                var v_17 = undefined;
                var v_18 = undefined;
                var v_19 = undefined;
                var v_20 = undefined;
                var v_21 = undefined;
                var v_22 = undefined;
                var v_23 = undefined;
                var v_24 = undefined;
                var v_25 = undefined;
                var v_26 = undefined;
                var v_27 = undefined;

                lab0: do {
                    v_1 = this.limit - this.cursor;

                    lab1: do {
                        this.ket = this.cursor;

                        if (!this.r_mark_lAr$esjava$0()) {
                            break lab1;
                        }

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_2 = this.limit - this.cursor;

                        lab2: do {
                            if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                this.cursor = this.limit - v_2;
                                break lab2;
                            }
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab3: do {
                        this.ket = this.cursor;

                        if (!this.r_mark_ncA$esjava$0()) {
                            break lab3;
                        }

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_3 = this.limit - this.cursor;

                        lab4: do {
                            lab5: do {
                                v_4 = this.limit - this.cursor;

                                lab6: do {
                                    this.ket = this.cursor;

                                    if (!this.r_mark_lArI$esjava$0()) {
                                        break lab6;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    break lab5;
                                } while (false);

                                this.cursor = this.limit - v_4;

                                lab7: do {
                                    this.ket = this.cursor;

                                    lab8: do {
                                        v_5 = this.limit - this.cursor;

                                        lab9: do {
                                            if (!this.r_mark_possessives$esjava$0()) {
                                                break lab9;
                                            }

                                            break lab8;
                                        } while (false);

                                        this.cursor = this.limit - v_5;

                                        if (!this.r_mark_sU$esjava$0()) {
                                            break lab7;
                                        }
                                    } while (false);

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    v_6 = this.limit - this.cursor;

                                    lab10: do {
                                        this.ket = this.cursor;

                                        if (!this.r_mark_lAr$esjava$0()) {
                                            this.cursor = this.limit - v_6;
                                            break lab10;
                                        }

                                        this.bra = this.cursor;
                                        this.slice_del$esjava$0();

                                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                            this.cursor = this.limit - v_6;
                                            break lab10;
                                        }
                                    } while (false);

                                    break lab5;
                                } while (false);

                                this.cursor = this.limit - v_4;
                                this.ket = this.cursor;

                                if (!this.r_mark_lAr$esjava$0()) {
                                    this.cursor = this.limit - v_3;
                                    break lab4;
                                }

                                this.bra = this.cursor;
                                this.slice_del$esjava$0();

                                if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                    this.cursor = this.limit - v_3;
                                    break lab4;
                                }
                            } while (false);
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab11: do {
                        this.ket = this.cursor;

                        lab12: do {
                            v_7 = this.limit - this.cursor;

                            lab13: do {
                                if (!this.r_mark_ndA$esjava$0()) {
                                    break lab13;
                                }

                                break lab12;
                            } while (false);

                            this.cursor = this.limit - v_7;

                            if (!this.r_mark_nA$esjava$0()) {
                                break lab11;
                            }
                        } while (false);

                        lab14: do {
                            v_8 = this.limit - this.cursor;

                            lab15: do {
                                if (!this.r_mark_lArI$esjava$0()) {
                                    break lab15;
                                }

                                this.bra = this.cursor;
                                this.slice_del$esjava$0();
                                break lab14;
                            } while (false);

                            this.cursor = this.limit - v_8;

                            lab16: do {
                                if (!this.r_mark_sU$esjava$0()) {
                                    break lab16;
                                }

                                this.bra = this.cursor;
                                this.slice_del$esjava$0();
                                v_9 = this.limit - this.cursor;

                                lab17: do {
                                    this.ket = this.cursor;

                                    if (!this.r_mark_lAr$esjava$0()) {
                                        this.cursor = this.limit - v_9;
                                        break lab17;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();

                                    if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                        this.cursor = this.limit - v_9;
                                        break lab17;
                                    }
                                } while (false);

                                break lab14;
                            } while (false);

                            this.cursor = this.limit - v_8;

                            if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                break lab11;
                            }
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab18: do {
                        this.ket = this.cursor;

                        lab19: do {
                            v_10 = this.limit - this.cursor;

                            lab20: do {
                                if (!this.r_mark_ndAn$esjava$0()) {
                                    break lab20;
                                }

                                break lab19;
                            } while (false);

                            this.cursor = this.limit - v_10;

                            if (!this.r_mark_nU$esjava$0()) {
                                break lab18;
                            }
                        } while (false);

                        lab21: do {
                            v_11 = this.limit - this.cursor;

                            lab22: do {
                                if (!this.r_mark_sU$esjava$0()) {
                                    break lab22;
                                }

                                this.bra = this.cursor;
                                this.slice_del$esjava$0();
                                v_12 = this.limit - this.cursor;

                                lab23: do {
                                    this.ket = this.cursor;

                                    if (!this.r_mark_lAr$esjava$0()) {
                                        this.cursor = this.limit - v_12;
                                        break lab23;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();

                                    if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                        this.cursor = this.limit - v_12;
                                        break lab23;
                                    }
                                } while (false);

                                break lab21;
                            } while (false);

                            this.cursor = this.limit - v_11;

                            if (!this.r_mark_lArI$esjava$0()) {
                                break lab18;
                            }
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab24: do {
                        this.ket = this.cursor;

                        if (!this.r_mark_DAn$esjava$0()) {
                            break lab24;
                        }

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_13 = this.limit - this.cursor;

                        lab25: do {
                            this.ket = this.cursor;

                            lab26: do {
                                v_14 = this.limit - this.cursor;

                                lab27: do {
                                    if (!this.r_mark_possessives$esjava$0()) {
                                        break lab27;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    v_15 = this.limit - this.cursor;

                                    lab28: do {
                                        this.ket = this.cursor;

                                        if (!this.r_mark_lAr$esjava$0()) {
                                            this.cursor = this.limit - v_15;
                                            break lab28;
                                        }

                                        this.bra = this.cursor;
                                        this.slice_del$esjava$0();

                                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                            this.cursor = this.limit - v_15;
                                            break lab28;
                                        }
                                    } while (false);

                                    break lab26;
                                } while (false);

                                this.cursor = this.limit - v_14;

                                lab29: do {
                                    if (!this.r_mark_lAr$esjava$0()) {
                                        break lab29;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    v_16 = this.limit - this.cursor;

                                    lab30: do {
                                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                            this.cursor = this.limit - v_16;
                                            break lab30;
                                        }
                                    } while (false);

                                    break lab26;
                                } while (false);

                                this.cursor = this.limit - v_14;

                                if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                    this.cursor = this.limit - v_13;
                                    break lab25;
                                }
                            } while (false);
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab31: do {
                        this.ket = this.cursor;

                        lab32: do {
                            v_17 = this.limit - this.cursor;

                            lab33: do {
                                if (!this.r_mark_nUn$esjava$0()) {
                                    break lab33;
                                }

                                break lab32;
                            } while (false);

                            this.cursor = this.limit - v_17;

                            if (!this.r_mark_ylA$esjava$0()) {
                                break lab31;
                            }
                        } while (false);

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_18 = this.limit - this.cursor;

                        lab34: do {
                            lab35: do {
                                v_19 = this.limit - this.cursor;

                                lab36: do {
                                    this.ket = this.cursor;

                                    if (!this.r_mark_lAr$esjava$0()) {
                                        break lab36;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();

                                    if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                        break lab36;
                                    }

                                    break lab35;
                                } while (false);

                                this.cursor = this.limit - v_19;

                                lab37: do {
                                    this.ket = this.cursor;

                                    lab38: do {
                                        v_20 = this.limit - this.cursor;

                                        lab39: do {
                                            if (!this.r_mark_possessives$esjava$0()) {
                                                break lab39;
                                            }

                                            break lab38;
                                        } while (false);

                                        this.cursor = this.limit - v_20;

                                        if (!this.r_mark_sU$esjava$0()) {
                                            break lab37;
                                        }
                                    } while (false);

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    v_21 = this.limit - this.cursor;

                                    lab40: do {
                                        this.ket = this.cursor;

                                        if (!this.r_mark_lAr$esjava$0()) {
                                            this.cursor = this.limit - v_21;
                                            break lab40;
                                        }

                                        this.bra = this.cursor;
                                        this.slice_del$esjava$0();

                                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                            this.cursor = this.limit - v_21;
                                            break lab40;
                                        }
                                    } while (false);

                                    break lab35;
                                } while (false);

                                this.cursor = this.limit - v_19;

                                if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                    this.cursor = this.limit - v_18;
                                    break lab34;
                                }
                            } while (false);
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab41: do {
                        this.ket = this.cursor;

                        if (!this.r_mark_lArI$esjava$0()) {
                            break lab41;
                        }

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab42: do {
                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                            break lab42;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;

                    lab43: do {
                        this.ket = this.cursor;

                        lab44: do {
                            v_22 = this.limit - this.cursor;

                            lab45: do {
                                if (!this.r_mark_DA$esjava$0()) {
                                    break lab45;
                                }

                                break lab44;
                            } while (false);

                            this.cursor = this.limit - v_22;

                            lab46: do {
                                if (!this.r_mark_yU$esjava$0()) {
                                    break lab46;
                                }

                                break lab44;
                            } while (false);

                            this.cursor = this.limit - v_22;

                            if (!this.r_mark_yA$esjava$0()) {
                                break lab43;
                            }
                        } while (false);

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();
                        v_23 = this.limit - this.cursor;

                        lab47: do {
                            this.ket = this.cursor;

                            lab48: do {
                                v_24 = this.limit - this.cursor;

                                lab49: do {
                                    if (!this.r_mark_possessives$esjava$0()) {
                                        break lab49;
                                    }

                                    this.bra = this.cursor;
                                    this.slice_del$esjava$0();
                                    v_25 = this.limit - this.cursor;

                                    lab50: do {
                                        this.ket = this.cursor;

                                        if (!this.r_mark_lAr$esjava$0()) {
                                            this.cursor = this.limit - v_25;
                                            break lab50;
                                        }
                                    } while (false);

                                    break lab48;
                                } while (false);

                                this.cursor = this.limit - v_24;

                                if (!this.r_mark_lAr$esjava$0()) {
                                    this.cursor = this.limit - v_23;
                                    break lab47;
                                }
                            } while (false);

                            this.bra = this.cursor;
                            this.slice_del$esjava$0();
                            this.ket = this.cursor;

                            if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                                this.cursor = this.limit - v_23;
                                break lab47;
                            }
                        } while (false);

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_1;
                    this.ket = this.cursor;

                    lab51: do {
                        v_26 = this.limit - this.cursor;

                        lab52: do {
                            if (!this.r_mark_possessives$esjava$0()) {
                                break lab52;
                            }

                            break lab51;
                        } while (false);

                        this.cursor = this.limit - v_26;

                        if (!this.r_mark_sU$esjava$0()) {
                            return false;
                        }
                    } while (false);

                    this.bra = this.cursor;
                    this.slice_del$esjava$0();
                    v_27 = this.limit - this.cursor;

                    lab53: do {
                        this.ket = this.cursor;

                        if (!this.r_mark_lAr$esjava$0()) {
                            this.cursor = this.limit - v_27;
                            break lab53;
                        }

                        this.bra = this.cursor;
                        this.slice_del$esjava$0();

                        if (!this.r_stem_suffix_chain_before_ki$esjava$0()) {
                            this.cursor = this.limit - v_27;
                            break lab53;
                        }
                    } while (false);
                } while (false);

                return true;
            }
        }, {
            key: 'r_post_process_last_consonants$esjava$0',
            value: function r_post_process_last_consonants$esjava$0() {
                var among_var = undefined;
                this.ket = this.cursor;
                among_var = this.find_among_b$esjava$2(turkishStemmer.a_23, 4);

                if (among_var === 0) {
                    return false;
                }

                this.bra = this.cursor;

                switch (among_var) {
                    case 0:
                        return false;

                    case 1:
                        this.slice_from$esjava$1("p");
                        break;

                    case 2:
                        this.slice_from$esjava$1('\u00E7');
                        break;

                    case 3:
                        this.slice_from$esjava$1("t");
                        break;

                    case 4:
                        this.slice_from$esjava$1("k");
                        break;
                }

                return true;
            }
        }, {
            key: 'r_append_U_to_stems_ending_with_d_or_g$esjava$0',
            value: function r_append_U_to_stems_ending_with_d_or_g$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                var v_4 = undefined;
                var v_5 = undefined;
                var v_6 = undefined;
                var v_7 = undefined;
                var v_8 = undefined;
                var v_9 = undefined;
                var v_10 = undefined;
                var v_11 = undefined;
                var v_12 = undefined;
                var v_13 = undefined;
                var v_14 = undefined;
                var v_15 = undefined;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    v_2 = this.limit - this.cursor;

                    lab1: do {
                        if (!this.eq_s_b$esjava$2(1, "d")) {
                            break lab1;
                        }

                        break lab0;
                    } while (false);

                    this.cursor = this.limit - v_2;

                    if (!this.eq_s_b$esjava$2(1, "g")) {
                        return false;
                    }
                } while (false);

                this.cursor = this.limit - v_1;

                lab2: do {
                    v_3 = this.limit - this.cursor;

                    lab3: do {
                        v_4 = this.limit - this.cursor;

                        golab4: while (true) {
                            v_5 = this.limit - this.cursor;

                            lab5: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                                    break lab5;
                                }

                                this.cursor = this.limit - v_5;
                                break golab4;
                            } while (false);

                            this.cursor = this.limit - v_5;

                            if (this.cursor <= this.limit_backward) {
                                break lab3;
                            }

                            this.cursor--;
                        }

                        lab6: do {
                            v_6 = this.limit - this.cursor;

                            lab7: do {
                                if (!this.eq_s_b$esjava$2(1, "a")) {
                                    break lab7;
                                }

                                break lab6;
                            } while (false);

                            this.cursor = this.limit - v_6;

                            if (!this.eq_s_b$esjava$2(1, '\u0131')) {
                                break lab3;
                            }
                        } while (false);

                        this.cursor = this.limit - v_4;
                        {
                            var c = this.cursor;
                            this.insert$esjava$3(this.cursor, this.cursor, '\u0131');
                            this.cursor = c;
                        }
                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    lab8: do {
                        v_7 = this.limit - this.cursor;

                        golab9: while (true) {
                            v_8 = this.limit - this.cursor;

                            lab10: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                                    break lab10;
                                }

                                this.cursor = this.limit - v_8;
                                break golab9;
                            } while (false);

                            this.cursor = this.limit - v_8;

                            if (this.cursor <= this.limit_backward) {
                                break lab8;
                            }

                            this.cursor--;
                        }

                        lab11: do {
                            v_9 = this.limit - this.cursor;

                            lab12: do {
                                if (!this.eq_s_b$esjava$2(1, "e")) {
                                    break lab12;
                                }

                                break lab11;
                            } while (false);

                            this.cursor = this.limit - v_9;

                            if (!this.eq_s_b$esjava$2(1, "i")) {
                                break lab8;
                            }
                        } while (false);

                        this.cursor = this.limit - v_7;
                        {
                            var c = this.cursor;
                            this.insert$esjava$3(this.cursor, this.cursor, "i");
                            this.cursor = c;
                        }
                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;

                    lab13: do {
                        v_10 = this.limit - this.cursor;

                        golab14: while (true) {
                            v_11 = this.limit - this.cursor;

                            lab15: do {
                                if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                                    break lab15;
                                }

                                this.cursor = this.limit - v_11;
                                break golab14;
                            } while (false);

                            this.cursor = this.limit - v_11;

                            if (this.cursor <= this.limit_backward) {
                                break lab13;
                            }

                            this.cursor--;
                        }

                        lab16: do {
                            v_12 = this.limit - this.cursor;

                            lab17: do {
                                if (!this.eq_s_b$esjava$2(1, "o")) {
                                    break lab17;
                                }

                                break lab16;
                            } while (false);

                            this.cursor = this.limit - v_12;

                            if (!this.eq_s_b$esjava$2(1, "u")) {
                                break lab13;
                            }
                        } while (false);

                        this.cursor = this.limit - v_10;
                        {
                            var c = this.cursor;
                            this.insert$esjava$3(this.cursor, this.cursor, "u");
                            this.cursor = c;
                        }
                        break lab2;
                    } while (false);

                    this.cursor = this.limit - v_3;
                    v_13 = this.limit - this.cursor;

                    golab18: while (true) {
                        v_14 = this.limit - this.cursor;

                        lab19: do {
                            if (!this.in_grouping_b$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                                break lab19;
                            }

                            this.cursor = this.limit - v_14;
                            break golab18;
                        } while (false);

                        this.cursor = this.limit - v_14;

                        if (this.cursor <= this.limit_backward) {
                            return false;
                        }

                        this.cursor--;
                    }

                    lab20: do {
                        v_15 = this.limit - this.cursor;

                        lab21: do {
                            if (!this.eq_s_b$esjava$2(1, '\u00F6')) {
                                break lab21;
                            }

                            break lab20;
                        } while (false);

                        this.cursor = this.limit - v_15;

                        if (!this.eq_s_b$esjava$2(1, '\u00FC')) {
                            return false;
                        }
                    } while (false);

                    this.cursor = this.limit - v_13;
                    {
                        var c = this.cursor;
                        this.insert$esjava$3(this.cursor, this.cursor, '\u00FC');
                        this.cursor = c;
                    }
                } while (false);

                return true;
            }
        }, {
            key: 'r_more_than_one_syllable_word$esjava$0',
            value: function r_more_than_one_syllable_word$esjava$0() {
                var v_1 = undefined;
                var v_3 = undefined;
                v_1 = this.cursor;
                {
                    var v_2 = 2;

                    replab0: while (true) {
                        v_3 = this.cursor;

                        lab1: do {
                            golab2: while (true) {
                                lab3: do {
                                    if (!this.in_grouping$esjava$3(turkishStemmer.g_vowel, 97, 305)) {
                                        break lab3;
                                    }

                                    break golab2;
                                } while (false);

                                if (this.cursor >= this.limit) {
                                    break lab1;
                                }

                                this.cursor++;
                            }

                            v_2--;
                            continue replab0;
                        } while (false);

                        this.cursor = v_3;
                        break replab0;
                    }

                    if (v_2 > 0) {
                        return false;
                    }
                }
                this.cursor = v_1;
                return true;
            }
        }, {
            key: 'r_is_reserved_word$esjava$0',
            value: function r_is_reserved_word$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_4 = undefined;

                lab0: do {
                    v_1 = this.cursor;

                    lab1: do {
                        v_2 = this.cursor;

                        golab2: while (true) {
                            lab3: do {
                                if (!this.eq_s$esjava$2(2, "ad")) {
                                    break lab3;
                                }

                                break golab2;
                            } while (false);

                            if (this.cursor >= this.limit) {
                                break lab1;
                            }

                            this.cursor++;
                        }

                        this.I_strlen = 2;

                        if (!(this.I_strlen === this.limit)) {
                            break lab1;
                        }

                        this.cursor = v_2;
                        break lab0;
                    } while (false);

                    this.cursor = v_1;
                    v_4 = this.cursor;

                    golab4: while (true) {
                        lab5: do {
                            if (!this.eq_s$esjava$2(5, "soyad")) {
                                break lab5;
                            }

                            break golab4;
                        } while (false);

                        if (this.cursor >= this.limit) {
                            return false;
                        }

                        this.cursor++;
                    }

                    this.I_strlen = 5;

                    if (!(this.I_strlen === this.limit)) {
                        return false;
                    }

                    this.cursor = v_4;
                } while (false);

                return true;
            }
        }, {
            key: 'r_postlude$esjava$0',
            value: function r_postlude$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;
                var v_3 = undefined;
                {
                    v_1 = this.cursor;

                    lab0: do {
                        if (!this.r_is_reserved_word$esjava$0()) {
                            break lab0;
                        }

                        return false;
                    } while (false);

                    this.cursor = v_1;
                }
                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_append_U_to_stems_ending_with_d_or_g$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                v_3 = this.limit - this.cursor;

                lab2: do {
                    if (!this.r_post_process_last_consonants$esjava$0()) {
                        break lab2;
                    }
                } while (false);

                this.cursor = this.limit - v_3;
                this.cursor = this.limit_backward;
                return true;
            }
        }, {
            key: 'stem$esjava$0',
            value: function stem$esjava$0() {
                var v_1 = undefined;
                var v_2 = undefined;

                if (!this.r_more_than_one_syllable_word$esjava$0()) {
                    return false;
                }

                this.limit_backward = this.cursor;
                this.cursor = this.limit;
                v_1 = this.limit - this.cursor;

                lab0: do {
                    if (!this.r_stem_nominal_verb_suffixes$esjava$0()) {
                        break lab0;
                    }
                } while (false);

                this.cursor = this.limit - v_1;

                if (!this.B_continue_stemming_noun_suffixes) {
                    return false;
                }

                v_2 = this.limit - this.cursor;

                lab1: do {
                    if (!this.r_stem_noun_suffixes$esjava$0()) {
                        break lab1;
                    }
                } while (false);

                this.cursor = this.limit - v_2;
                this.cursor = this.limit_backward;

                if (!this.r_postlude$esjava$0()) {
                    return false;
                }

                return true;
            }
        }, {
            key: 'stem',
            value: function stem() {
                return this['stem$esjava$' + arguments.length].apply(this, arguments);
            }
        }, {
            key: 'B_continue_stemming_noun_suffixes',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$B_continue_stemming_noun_suffixes') ? this._$esjava$B_continue_stemming_noun_suffixes : this._$esjava$B_continue_stemming_noun_suffixes = false;
            },
            set: function set(v) {
                this._$esjava$B_continue_stemming_noun_suffixes = v;
            }
        }, {
            key: 'I_strlen',
            get: function get() {
                return Object.prototype.hasOwnProperty.call(this, '_$esjava$I_strlen') ? this._$esjava$I_strlen : this._$esjava$I_strlen = 0;
            },
            set: function set(v) {
                this._$esjava$I_strlen = v;
            }
        }], [{
            key: 'methodObject',
            get: function get() {
                delete turkishStemmer.methodObject;
                return turkishStemmer.methodObject = null;
            }
        }, {
            key: 'a_0',
            get: function get() {
                delete turkishStemmer.a_0;
                return turkishStemmer.a_0 = [new Among("m", -1, -1, "", turkishStemmer.methodObject), new Among("n", -1, -1, "", turkishStemmer.methodObject), new Among("miz", -1, -1, "", turkishStemmer.methodObject), new Among("niz", -1, -1, "", turkishStemmer.methodObject), new Among("muz", -1, -1, "", turkishStemmer.methodObject), new Among("nuz", -1, -1, "", turkishStemmer.methodObject), new Among('m\u00FCz', -1, -1, "", turkishStemmer.methodObject), new Among('n\u00FCz', -1, -1, "", turkishStemmer.methodObject), new Among('m\u0131z', -1, -1, "", turkishStemmer.methodObject), new Among('n\u0131z', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_1',
            get: function get() {
                delete turkishStemmer.a_1;
                return turkishStemmer.a_1 = [new Among("leri", -1, -1, "", turkishStemmer.methodObject), new Among('lar\u0131', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_2',
            get: function get() {
                delete turkishStemmer.a_2;
                return turkishStemmer.a_2 = [new Among("ni", -1, -1, "", turkishStemmer.methodObject), new Among("nu", -1, -1, "", turkishStemmer.methodObject), new Among('n\u00FC', -1, -1, "", turkishStemmer.methodObject), new Among('n\u0131', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_3',
            get: function get() {
                delete turkishStemmer.a_3;
                return turkishStemmer.a_3 = [new Among("in", -1, -1, "", turkishStemmer.methodObject), new Among("un", -1, -1, "", turkishStemmer.methodObject), new Among('\u00FCn', -1, -1, "", turkishStemmer.methodObject), new Among('\u0131n', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_4',
            get: function get() {
                delete turkishStemmer.a_4;
                return turkishStemmer.a_4 = [new Among("a", -1, -1, "", turkishStemmer.methodObject), new Among("e", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_5',
            get: function get() {
                delete turkishStemmer.a_5;
                return turkishStemmer.a_5 = [new Among("na", -1, -1, "", turkishStemmer.methodObject), new Among("ne", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_6',
            get: function get() {
                delete turkishStemmer.a_6;
                return turkishStemmer.a_6 = [new Among("da", -1, -1, "", turkishStemmer.methodObject), new Among("ta", -1, -1, "", turkishStemmer.methodObject), new Among("de", -1, -1, "", turkishStemmer.methodObject), new Among("te", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_7',
            get: function get() {
                delete turkishStemmer.a_7;
                return turkishStemmer.a_7 = [new Among("nda", -1, -1, "", turkishStemmer.methodObject), new Among("nde", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_8',
            get: function get() {
                delete turkishStemmer.a_8;
                return turkishStemmer.a_8 = [new Among("dan", -1, -1, "", turkishStemmer.methodObject), new Among("tan", -1, -1, "", turkishStemmer.methodObject), new Among("den", -1, -1, "", turkishStemmer.methodObject), new Among("ten", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_9',
            get: function get() {
                delete turkishStemmer.a_9;
                return turkishStemmer.a_9 = [new Among("ndan", -1, -1, "", turkishStemmer.methodObject), new Among("nden", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_10',
            get: function get() {
                delete turkishStemmer.a_10;
                return turkishStemmer.a_10 = [new Among("la", -1, -1, "", turkishStemmer.methodObject), new Among("le", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_11',
            get: function get() {
                delete turkishStemmer.a_11;
                return turkishStemmer.a_11 = [new Among("ca", -1, -1, "", turkishStemmer.methodObject), new Among("ce", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_12',
            get: function get() {
                delete turkishStemmer.a_12;
                return turkishStemmer.a_12 = [new Among("im", -1, -1, "", turkishStemmer.methodObject), new Among("um", -1, -1, "", turkishStemmer.methodObject), new Among('\u00FCm', -1, -1, "", turkishStemmer.methodObject), new Among('\u0131m', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_13',
            get: function get() {
                delete turkishStemmer.a_13;
                return turkishStemmer.a_13 = [new Among("sin", -1, -1, "", turkishStemmer.methodObject), new Among("sun", -1, -1, "", turkishStemmer.methodObject), new Among('s\u00FCn', -1, -1, "", turkishStemmer.methodObject), new Among('s\u0131n', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_14',
            get: function get() {
                delete turkishStemmer.a_14;
                return turkishStemmer.a_14 = [new Among("iz", -1, -1, "", turkishStemmer.methodObject), new Among("uz", -1, -1, "", turkishStemmer.methodObject), new Among('\u00FCz', -1, -1, "", turkishStemmer.methodObject), new Among('\u0131z', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_15',
            get: function get() {
                delete turkishStemmer.a_15;
                return turkishStemmer.a_15 = [new Among("siniz", -1, -1, "", turkishStemmer.methodObject), new Among("sunuz", -1, -1, "", turkishStemmer.methodObject), new Among('s\u00FCn\u00FCz', -1, -1, "", turkishStemmer.methodObject), new Among('s\u0131n\u0131z', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_16',
            get: function get() {
                delete turkishStemmer.a_16;
                return turkishStemmer.a_16 = [new Among("lar", -1, -1, "", turkishStemmer.methodObject), new Among("ler", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_17',
            get: function get() {
                delete turkishStemmer.a_17;
                return turkishStemmer.a_17 = [new Among("niz", -1, -1, "", turkishStemmer.methodObject), new Among("nuz", -1, -1, "", turkishStemmer.methodObject), new Among('n\u00FCz', -1, -1, "", turkishStemmer.methodObject), new Among('n\u0131z', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_18',
            get: function get() {
                delete turkishStemmer.a_18;
                return turkishStemmer.a_18 = [new Among("dir", -1, -1, "", turkishStemmer.methodObject), new Among("tir", -1, -1, "", turkishStemmer.methodObject), new Among("dur", -1, -1, "", turkishStemmer.methodObject), new Among("tur", -1, -1, "", turkishStemmer.methodObject), new Among('d\u00FCr', -1, -1, "", turkishStemmer.methodObject), new Among('t\u00FCr', -1, -1, "", turkishStemmer.methodObject), new Among('d\u0131r', -1, -1, "", turkishStemmer.methodObject), new Among('t\u0131r', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_19',
            get: function get() {
                delete turkishStemmer.a_19;
                return turkishStemmer.a_19 = [new Among('cas\u0131na', -1, -1, "", turkishStemmer.methodObject), new Among("cesine", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_20',
            get: function get() {
                delete turkishStemmer.a_20;
                return turkishStemmer.a_20 = [new Among("di", -1, -1, "", turkishStemmer.methodObject), new Among("ti", -1, -1, "", turkishStemmer.methodObject), new Among("dik", -1, -1, "", turkishStemmer.methodObject), new Among("tik", -1, -1, "", turkishStemmer.methodObject), new Among("duk", -1, -1, "", turkishStemmer.methodObject), new Among("tuk", -1, -1, "", turkishStemmer.methodObject), new Among('d\u00FCk', -1, -1, "", turkishStemmer.methodObject), new Among('t\u00FCk', -1, -1, "", turkishStemmer.methodObject), new Among('d\u0131k', -1, -1, "", turkishStemmer.methodObject), new Among('t\u0131k', -1, -1, "", turkishStemmer.methodObject), new Among("dim", -1, -1, "", turkishStemmer.methodObject), new Among("tim", -1, -1, "", turkishStemmer.methodObject), new Among("dum", -1, -1, "", turkishStemmer.methodObject), new Among("tum", -1, -1, "", turkishStemmer.methodObject), new Among('d\u00FCm', -1, -1, "", turkishStemmer.methodObject), new Among('t\u00FCm', -1, -1, "", turkishStemmer.methodObject), new Among('d\u0131m', -1, -1, "", turkishStemmer.methodObject), new Among('t\u0131m', -1, -1, "", turkishStemmer.methodObject), new Among("din", -1, -1, "", turkishStemmer.methodObject), new Among("tin", -1, -1, "", turkishStemmer.methodObject), new Among("dun", -1, -1, "", turkishStemmer.methodObject), new Among("tun", -1, -1, "", turkishStemmer.methodObject), new Among('d\u00FCn', -1, -1, "", turkishStemmer.methodObject), new Among('t\u00FCn', -1, -1, "", turkishStemmer.methodObject), new Among('d\u0131n', -1, -1, "", turkishStemmer.methodObject), new Among('t\u0131n', -1, -1, "", turkishStemmer.methodObject), new Among("du", -1, -1, "", turkishStemmer.methodObject), new Among("tu", -1, -1, "", turkishStemmer.methodObject), new Among('d\u00FC', -1, -1, "", turkishStemmer.methodObject), new Among('t\u00FC', -1, -1, "", turkishStemmer.methodObject), new Among('d\u0131', -1, -1, "", turkishStemmer.methodObject), new Among('t\u0131', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_21',
            get: function get() {
                delete turkishStemmer.a_21;
                return turkishStemmer.a_21 = [new Among("sa", -1, -1, "", turkishStemmer.methodObject), new Among("se", -1, -1, "", turkishStemmer.methodObject), new Among("sak", -1, -1, "", turkishStemmer.methodObject), new Among("sek", -1, -1, "", turkishStemmer.methodObject), new Among("sam", -1, -1, "", turkishStemmer.methodObject), new Among("sem", -1, -1, "", turkishStemmer.methodObject), new Among("san", -1, -1, "", turkishStemmer.methodObject), new Among("sen", -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_22',
            get: function get() {
                delete turkishStemmer.a_22;
                return turkishStemmer.a_22 = [new Among('mi\u015F', -1, -1, "", turkishStemmer.methodObject), new Among('mu\u015F', -1, -1, "", turkishStemmer.methodObject), new Among('m\u00FC\u015F', -1, -1, "", turkishStemmer.methodObject), new Among('m\u0131\u015F', -1, -1, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'a_23',
            get: function get() {
                delete turkishStemmer.a_23;
                return turkishStemmer.a_23 = [new Among("b", -1, 1, "", turkishStemmer.methodObject), new Among("c", -1, 2, "", turkishStemmer.methodObject), new Among("d", -1, 3, "", turkishStemmer.methodObject), new Among('\u011F', -1, 4, "", turkishStemmer.methodObject)];
            }
        }, {
            key: 'g_vowel',
            get: function get() {
                delete turkishStemmer.g_vowel;
                return turkishStemmer.g_vowel = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 8, 0, 0, 0, 0, 0, 0, 1];
            }
        }, {
            key: 'g_U',
            get: function get() {
                delete turkishStemmer.g_U;
                return turkishStemmer.g_U = [1, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 1];
            }
        }, {
            key: 'g_vowel1',
            get: function get() {
                delete turkishStemmer.g_vowel1;
                return turkishStemmer.g_vowel1 = [1, 64, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
            }
        }, {
            key: 'g_vowel2',
            get: function get() {
                delete turkishStemmer.g_vowel2;
                return turkishStemmer.g_vowel2 = [17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130];
            }
        }, {
            key: 'g_vowel3',
            get: function get() {
                delete turkishStemmer.g_vowel3;
                return turkishStemmer.g_vowel3 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
            }
        }, {
            key: 'g_vowel4',
            get: function get() {
                delete turkishStemmer.g_vowel4;
                return turkishStemmer.g_vowel4 = [17];
            }
        }, {
            key: 'g_vowel5',
            get: function get() {
                delete turkishStemmer.g_vowel5;
                return turkishStemmer.g_vowel5 = [65];
            }
        }, {
            key: 'g_vowel6',
            get: function get() {
                delete turkishStemmer.g_vowel6;
                return turkishStemmer.g_vowel6 = [65];
            }
        }]);

        return turkishStemmer;
    })(SnowballStemmer);

    function newStemmer(lng) {
        var stemMap = {
            armenian: armenianStemmer,
            basque: basqueStemmer,
            catalan: catalanStemmer,
            czech: czechStemmer,
            danish: danishStemmer,
            dutch: dutchStemmer,
            english: englishStemmer,
            finnish: finnishStemmer,
            french: frenchStemmer,
            german: germanStemmer,
            hungarian: hungarianStemmer,
            italian: italianStemmer,
            irish: irishStemmer,
            norwegian: norwegianStemmer,
            porter: porterStemmer,
            portuguese: portugueseStemmer,
            romanian: romanianStemmer,
            russian: russianStemmer,
            spanish: spanishStemmer,
            slovene: sloveneStemmer,
            swedish: swedishStemmer,
            turkish: turkishStemmer
        };
        var stemmer = new (stemMap[lng.toLowerCase()])();
        return {
            stem: function stem(word) {
                stemmer.setCurrent(word);
                stemmer.stem();
                return stemmer.getCurrent();
            }
        };
    }
});

