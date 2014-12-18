/*!
 * Snowball JavaScript Library v0.4
 * http://snowball.tartarus.org/
 * https://github.com/mazko/jssnowball
 *
 * Copyright 13.01.02 23:17:29, Oleg Mazko
 * http://www.opensource.org/licenses/bsd-license.html
 */
function Snowball(lng) {
	function Among(s, substring_i, result, method) {
		if ((!s && s != "") || (!substring_i && (substring_i != 0)) || !result)
			throw ("Bad Among initialisation: s:" + s + ", substring_i: "
					+ substring_i + ", result: " + result);
		this.s_size = s.length;
		this.s = (function() {
			var sLength = s.length, charArr = new Array(sLength);
			for (var i = 0; i < sLength; i++)
				charArr[i] = s.charCodeAt(i);
			return charArr;})();
		this.substring_i = substring_i;
		this.result = result;
		this.method = method;
	}
	function SnowballProgram() {
		var current;
		return {
			bra : 0,
			ket : 0,
			limit : 0,
			cursor : 0,
			limit_backward : 0,
			setCurrent : function(word) {
				current = word;
				this.cursor = 0;
				this.limit = word.length;
				this.limit_backward = 0;
				this.bra = this.cursor;
				this.ket = this.limit;
			},
			getCurrent : function() {
				var result = current;
				current = null;
				return result;
			},
			in_grouping : function(s, min, max) {
				if (this.cursor >= this.limit) return false;
				var ch = current.charCodeAt(this.cursor);
				if (ch > max || ch < min) return false;
				ch -= min;
				if ((s[ch >> 3] & (0X1 << (ch & 0X7))) == 0) return false;
				this.cursor++;
				return true;
			},
			in_grouping_b : function(s, min, max) {
				if (this.cursor <= this.limit_backward) return false;
				var ch = current.charCodeAt(this.cursor - 1);
				if (ch > max || ch < min) return false;
				ch -= min;
				if ((s[ch >> 3] & (0X1 << (ch & 0X7))) == 0) return false;
				this.cursor--;
				return true;
			},
			out_grouping : function(s, min, max) {
				if (this.cursor >= this.limit) return false;
				var ch = current.charCodeAt(this.cursor);
				if (ch > max || ch < min) {
					this.cursor++;
					return true;
				}
				ch -= min;
				if ((s[ch >> 3] & (0X1 << (ch & 0X7))) == 0) {
					this.cursor ++;
					return true;
				}
				return false;
			},
			out_grouping_b : function(s, min, max) {
				if (this.cursor <= this.limit_backward) return false;
				var ch = current.charCodeAt(this.cursor - 1);
				if (ch > max || ch < min) {
					this.cursor--;
					return true;
				}
				ch -= min;
				if ((s[ch >> 3] & (0X1 << (ch & 0X7))) == 0) {
					this.cursor--;
					return true;
				}
				return false;
			},
			eq_s : function(s_size, s) {
				if (this.limit - this.cursor < s_size) return false;
				var i;
				for (i = 0; i != s_size; i++) {
					if (current.charCodeAt(this.cursor + i) != s.charCodeAt(i)) return false;
				}
				this.cursor += s_size;
				return true;
			},
			eq_s_b : function(s_size, s) {
				if (this.cursor - this.limit_backward < s_size) return false;
				var i;
				for (i = 0; i != s_size; i++) {
					if (current.charCodeAt(this.cursor - s_size + i) != s.charCodeAt(i)) return false;
				}
				this.cursor -= s_size;
				return true;
			},
			eq_v_b : function(s) {
				return this.eq_s_b(s.length, s);
			},
			find_among : function(v, v_size) {
				var i = 0, j = v_size, c = this.cursor, l = this.limit, common_i = 0, common_j = 0, first_key_inspected = false;
				while (true) {
					var k = i + ((j - i) >> 1), diff = 0, common = common_i < common_j
							? common_i
							: common_j, w = v[k];
					for (var i2 = common; i2 < w.s_size; i2++) {
						if (c + common == l) {
							diff = -1;
							break;
						}
						diff = current.charCodeAt(c + common) - w.s[i2];
						if (diff)
							break;
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
						if (i > 0 || j == i || first_key_inspected)
							break;
						first_key_inspected = true;
					}
				}
				while (true) {
					var w = v[i];
					if (common_i >= w.s_size) {
						this.cursor = c + w.s_size;
						if (!w.method)
							return w.result;
						var res = w.method();
						this.cursor = c + w.s_size;
						if (res)
							return w.result;
					}
					i = w.substring_i;
					if (i < 0)
						return 0;
				}
			},
			find_among_b : function(v, v_size) {
				var i = 0, j = v_size, c = this.cursor, lb = this.limit_backward, common_i = 0, common_j = 0, first_key_inspected = false;
				while (true) {
					var k = i + ((j - i) >> 1), diff = 0, common = common_i < common_j
							? common_i
							: common_j, w = v[k];
					for (var i2 = w.s_size - 1 - common; i2 >= 0; i2--) {
						if (c - common == lb) {
							diff = -1;
							break;
						}
						diff = current.charCodeAt(c - 1 - common) - w.s[i2];
						if (diff)
							break;
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
						if (i > 0 || j == i || first_key_inspected)
							break;
						first_key_inspected = true;
					}
				}
				while (true) {
					var w = v[i];
					if (common_i >= w.s_size) {
						this.cursor = c - w.s_size;
						if (!w.method)
							return w.result;
						var res = w.method();
						this.cursor = c - w.s_size;
						if (res)
							return w.result;
					}
					i = w.substring_i;
					if (i < 0)
						return 0;
				}
			},
			replace_s : function(c_bra, c_ket, s) {
				var adjustment = s.length - (c_ket - c_bra), left = current
						.substring(0, c_bra), right = current.substring(c_ket);
				current = left + s + right;
				this.limit += adjustment;
				if (this.cursor >= c_ket)
					this.cursor += adjustment;
				else if (this.cursor > c_bra)
					this.cursor = c_bra;
				return adjustment;
			},
			slice_check : function() {
				if (this.bra < 0 ||
				    this.bra > this.ket ||
				    this.ket > this.limit ||
				    this.limit > current.length)
				{
					throw ("faulty slice operation");
				}
			},
			slice_from : function(s) {
				this.slice_check();
				this.replace_s(this.bra, this.ket, s);
			},
			slice_del : function() {
				this.slice_from("");
			},
			insert : function(c_bra, c_ket, s) {
				var adjustment = this.replace_s(c_bra, c_ket, s);
				if (c_bra <= this.bra) this.bra += adjustment;
				if (c_bra <= this.ket) this.ket += adjustment;
			},
			slice_to : function() {
				this.slice_check();
				return current.substring(this.bra, this.ket);
			},
			get_size_of_p : function() {
				
				/* Potentially bug of ANSI C stemmers, presents here for porting compliance */
	
				return current ? encodeURIComponent(current).match(/%..|./g).length + 1 : 1;
			}
		};
	}
	var stemFactory = {

		armenianStemmer : function() {

		        var a_0 = [
		            new Among ( "\u0580\u0578\u0580\u0564", -1, 1 ),
		            new Among ( "\u0565\u0580\u0578\u0580\u0564", 0, 1 ),
		            new Among ( "\u0561\u056C\u056B", -1, 1 ),
		            new Among ( "\u0561\u056F\u056B", -1, 1 ),
		            new Among ( "\u0578\u0580\u0561\u056F", -1, 1 ),
		            new Among ( "\u0565\u0572", -1, 1 ),
		            new Among ( "\u0561\u056F\u0561\u0576", -1, 1 ),
		            new Among ( "\u0561\u0580\u0561\u0576", -1, 1 ),
		            new Among ( "\u0565\u0576", -1, 1 ),
		            new Among ( "\u0565\u056F\u0565\u0576", 8, 1 ),
		            new Among ( "\u0565\u0580\u0565\u0576", 8, 1 ),
		            new Among ( "\u0578\u0580\u0567\u0576", -1, 1 ),
		            new Among ( "\u056B\u0576", -1, 1 ),
		            new Among ( "\u0563\u056B\u0576", 12, 1 ),
		            new Among ( "\u0578\u057E\u056B\u0576", 12, 1 ),
		            new Among ( "\u056C\u0561\u0575\u0576", -1, 1 ),
		            new Among ( "\u057E\u0578\u0582\u0576", -1, 1 ),
		            new Among ( "\u057A\u0565\u057D", -1, 1 ),
		            new Among ( "\u056B\u057E", -1, 1 ),
		            new Among ( "\u0561\u057F", -1, 1 ),
		            new Among ( "\u0561\u057E\u0565\u057F", -1, 1 ),
		            new Among ( "\u056F\u0578\u057F", -1, 1 ),
		            new Among ( "\u0562\u0561\u0580", -1, 1 )
		        ];
		
		        var a_1 = [
		            new Among ( "\u0561", -1, 1 ),
		            new Among ( "\u0561\u0581\u0561", 0, 1 ),
		            new Among ( "\u0565\u0581\u0561", 0, 1 ),
		            new Among ( "\u057E\u0565", -1, 1 ),
		            new Among ( "\u0561\u0581\u0580\u056B", -1, 1 ),
		            new Among ( "\u0561\u0581\u056B", -1, 1 ),
		            new Among ( "\u0565\u0581\u056B", -1, 1 ),
		            new Among ( "\u057E\u0565\u0581\u056B", 6, 1 ),
		            new Among ( "\u0561\u056C", -1, 1 ),
		            new Among ( "\u0568\u0561\u056C", 8, 1 ),
		            new Among ( "\u0561\u0576\u0561\u056C", 8, 1 ),
		            new Among ( "\u0565\u0576\u0561\u056C", 8, 1 ),
		            new Among ( "\u0561\u0581\u0576\u0561\u056C", 8, 1 ),
		            new Among ( "\u0565\u056C", -1, 1 ),
		            new Among ( "\u0568\u0565\u056C", 13, 1 ),
		            new Among ( "\u0576\u0565\u056C", 13, 1 ),
		            new Among ( "\u0581\u0576\u0565\u056C", 15, 1 ),
		            new Among ( "\u0565\u0581\u0576\u0565\u056C", 16, 1 ),
		            new Among ( "\u0579\u0565\u056C", 13, 1 ),
		            new Among ( "\u057E\u0565\u056C", 13, 1 ),
		            new Among ( "\u0561\u0581\u057E\u0565\u056C", 19, 1 ),
		            new Among ( "\u0565\u0581\u057E\u0565\u056C", 19, 1 ),
		            new Among ( "\u057F\u0565\u056C", 13, 1 ),
		            new Among ( "\u0561\u057F\u0565\u056C", 22, 1 ),
		            new Among ( "\u0578\u057F\u0565\u056C", 22, 1 ),
		            new Among ( "\u056F\u0578\u057F\u0565\u056C", 24, 1 ),
		            new Among ( "\u057E\u0561\u056E", -1, 1 ),
		            new Among ( "\u0578\u0582\u0574", -1, 1 ),
		            new Among ( "\u057E\u0578\u0582\u0574", 27, 1 ),
		            new Among ( "\u0561\u0576", -1, 1 ),
		            new Among ( "\u0581\u0561\u0576", 29, 1 ),
		            new Among ( "\u0561\u0581\u0561\u0576", 30, 1 ),
		            new Among ( "\u0561\u0581\u0580\u056B\u0576", -1, 1 ),
		            new Among ( "\u0561\u0581\u056B\u0576", -1, 1 ),
		            new Among ( "\u0565\u0581\u056B\u0576", -1, 1 ),
		            new Among ( "\u057E\u0565\u0581\u056B\u0576", 34, 1 ),
		            new Among ( "\u0561\u056C\u056B\u057D", -1, 1 ),
		            new Among ( "\u0565\u056C\u056B\u057D", -1, 1 ),
		            new Among ( "\u0561\u057E", -1, 1 ),
		            new Among ( "\u0561\u0581\u0561\u057E", 38, 1 ),
		            new Among ( "\u0565\u0581\u0561\u057E", 38, 1 ),
		            new Among ( "\u0561\u056C\u0578\u057E", -1, 1 ),
		            new Among ( "\u0565\u056C\u0578\u057E", -1, 1 ),
		            new Among ( "\u0561\u0580", -1, 1 ),
		            new Among ( "\u0561\u0581\u0561\u0580", 43, 1 ),
		            new Among ( "\u0565\u0581\u0561\u0580", 43, 1 ),
		            new Among ( "\u0561\u0581\u0580\u056B\u0580", -1, 1 ),
		            new Among ( "\u0561\u0581\u056B\u0580", -1, 1 ),
		            new Among ( "\u0565\u0581\u056B\u0580", -1, 1 ),
		            new Among ( "\u057E\u0565\u0581\u056B\u0580", 48, 1 ),
		            new Among ( "\u0561\u0581", -1, 1 ),
		            new Among ( "\u0565\u0581", -1, 1 ),
		            new Among ( "\u0561\u0581\u0580\u0565\u0581", 51, 1 ),
		            new Among ( "\u0561\u056C\u0578\u0582\u0581", -1, 1 ),
		            new Among ( "\u0565\u056C\u0578\u0582\u0581", -1, 1 ),
		            new Among ( "\u0561\u056C\u0578\u0582", -1, 1 ),
		            new Among ( "\u0565\u056C\u0578\u0582", -1, 1 ),
		            new Among ( "\u0561\u0584", -1, 1 ),
		            new Among ( "\u0581\u0561\u0584", 57, 1 ),
		            new Among ( "\u0561\u0581\u0561\u0584", 58, 1 ),
		            new Among ( "\u0561\u0581\u0580\u056B\u0584", -1, 1 ),
		            new Among ( "\u0561\u0581\u056B\u0584", -1, 1 ),
		            new Among ( "\u0565\u0581\u056B\u0584", -1, 1 ),
		            new Among ( "\u057E\u0565\u0581\u056B\u0584", 62, 1 ),
		            new Among ( "\u0561\u0576\u0584", -1, 1 ),
		            new Among ( "\u0581\u0561\u0576\u0584", 64, 1 ),
		            new Among ( "\u0561\u0581\u0561\u0576\u0584", 65, 1 ),
		            new Among ( "\u0561\u0581\u0580\u056B\u0576\u0584", -1, 1 ),
		            new Among ( "\u0561\u0581\u056B\u0576\u0584", -1, 1 ),
		            new Among ( "\u0565\u0581\u056B\u0576\u0584", -1, 1 ),
		            new Among ( "\u057E\u0565\u0581\u056B\u0576\u0584", 69, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "\u0578\u0580\u0564", -1, 1 ),
		            new Among ( "\u0578\u0582\u0575\u0569", -1, 1 ),
		            new Among ( "\u0578\u0582\u0570\u056B", -1, 1 ),
		            new Among ( "\u0581\u056B", -1, 1 ),
		            new Among ( "\u056B\u056C", -1, 1 ),
		            new Among ( "\u0561\u056F", -1, 1 ),
		            new Among ( "\u0575\u0561\u056F", 5, 1 ),
		            new Among ( "\u0561\u0576\u0561\u056F", 5, 1 ),
		            new Among ( "\u056B\u056F", -1, 1 ),
		            new Among ( "\u0578\u0582\u056F", -1, 1 ),
		            new Among ( "\u0561\u0576", -1, 1 ),
		            new Among ( "\u057A\u0561\u0576", 10, 1 ),
		            new Among ( "\u057D\u057F\u0561\u0576", 10, 1 ),
		            new Among ( "\u0561\u0580\u0561\u0576", 10, 1 ),
		            new Among ( "\u0565\u0572\u0567\u0576", -1, 1 ),
		            new Among ( "\u0575\u0578\u0582\u0576", -1, 1 ),
		            new Among ( "\u0578\u0582\u0569\u0575\u0578\u0582\u0576", 15, 1 ),
		            new Among ( "\u0561\u056E\u0578", -1, 1 ),
		            new Among ( "\u056B\u0579", -1, 1 ),
		            new Among ( "\u0578\u0582\u057D", -1, 1 ),
		            new Among ( "\u0578\u0582\u057D\u057F", -1, 1 ),
		            new Among ( "\u0563\u0561\u0580", -1, 1 ),
		            new Among ( "\u057E\u0578\u0580", -1, 1 ),
		            new Among ( "\u0561\u057E\u0578\u0580", 22, 1 ),
		            new Among ( "\u0578\u0581", -1, 1 ),
		            new Among ( "\u0561\u0576\u0585\u0581", -1, 1 ),
		            new Among ( "\u0578\u0582", -1, 1 ),
		            new Among ( "\u0584", -1, 1 ),
		            new Among ( "\u0579\u0565\u0584", 27, 1 ),
		            new Among ( "\u056B\u0584", 27, 1 ),
		            new Among ( "\u0561\u056C\u056B\u0584", 29, 1 ),
		            new Among ( "\u0561\u0576\u056B\u0584", 29, 1 ),
		            new Among ( "\u057E\u0561\u056E\u0584", 27, 1 ),
		            new Among ( "\u0578\u0582\u0575\u0584", 27, 1 ),
		            new Among ( "\u0565\u0576\u0584", 27, 1 ),
		            new Among ( "\u0578\u0576\u0584", 27, 1 ),
		            new Among ( "\u0578\u0582\u0576\u0584", 27, 1 ),
		            new Among ( "\u0574\u0578\u0582\u0576\u0584", 36, 1 ),
		            new Among ( "\u056B\u0579\u0584", 27, 1 ),
		            new Among ( "\u0561\u0580\u0584", 27, 1 )
		        ];
		
		        var a_3 = [
		            new Among ( "\u057D\u0561", -1, 1 ),
		            new Among ( "\u057E\u0561", -1, 1 ),
		            new Among ( "\u0561\u0574\u0562", -1, 1 ),
		            new Among ( "\u0564", -1, 1 ),
		            new Among ( "\u0561\u0576\u0564", 3, 1 ),
		            new Among ( "\u0578\u0582\u0569\u0575\u0561\u0576\u0564", 4, 1 ),
		            new Among ( "\u057E\u0561\u0576\u0564", 4, 1 ),
		            new Among ( "\u0578\u057B\u0564", 3, 1 ),
		            new Among ( "\u0565\u0580\u0564", 3, 1 ),
		            new Among ( "\u0576\u0565\u0580\u0564", 8, 1 ),
		            new Among ( "\u0578\u0582\u0564", 3, 1 ),
		            new Among ( "\u0568", -1, 1 ),
		            new Among ( "\u0561\u0576\u0568", 11, 1 ),
		            new Among ( "\u0578\u0582\u0569\u0575\u0561\u0576\u0568", 12, 1 ),
		            new Among ( "\u057E\u0561\u0576\u0568", 12, 1 ),
		            new Among ( "\u0578\u057B\u0568", 11, 1 ),
		            new Among ( "\u0565\u0580\u0568", 11, 1 ),
		            new Among ( "\u0576\u0565\u0580\u0568", 16, 1 ),
		            new Among ( "\u056B", -1, 1 ),
		            new Among ( "\u057E\u056B", 18, 1 ),
		            new Among ( "\u0565\u0580\u056B", 18, 1 ),
		            new Among ( "\u0576\u0565\u0580\u056B", 20, 1 ),
		            new Among ( "\u0561\u0576\u0578\u0582\u0574", -1, 1 ),
		            new Among ( "\u0565\u0580\u0578\u0582\u0574", -1, 1 ),
		            new Among ( "\u0576\u0565\u0580\u0578\u0582\u0574", 23, 1 ),
		            new Among ( "\u0576", -1, 1 ),
		            new Among ( "\u0561\u0576", 25, 1 ),
		            new Among ( "\u0578\u0582\u0569\u0575\u0561\u0576", 26, 1 ),
		            new Among ( "\u057E\u0561\u0576", 26, 1 ),
		            new Among ( "\u056B\u0576", 25, 1 ),
		            new Among ( "\u0565\u0580\u056B\u0576", 29, 1 ),
		            new Among ( "\u0576\u0565\u0580\u056B\u0576", 30, 1 ),
		            new Among ( "\u0578\u0582\u0569\u0575\u0561\u0576\u0576", 25, 1 ),
		            new Among ( "\u0565\u0580\u0576", 25, 1 ),
		            new Among ( "\u0576\u0565\u0580\u0576", 33, 1 ),
		            new Among ( "\u0578\u0582\u0576", 25, 1 ),
		            new Among ( "\u0578\u057B", -1, 1 ),
		            new Among ( "\u0578\u0582\u0569\u0575\u0561\u0576\u057D", -1, 1 ),
		            new Among ( "\u057E\u0561\u0576\u057D", -1, 1 ),
		            new Among ( "\u0578\u057B\u057D", -1, 1 ),
		            new Among ( "\u0578\u057E", -1, 1 ),
		            new Among ( "\u0561\u0576\u0578\u057E", 40, 1 ),
		            new Among ( "\u057E\u0578\u057E", 40, 1 ),
		            new Among ( "\u0565\u0580\u0578\u057E", 40, 1 ),
		            new Among ( "\u0576\u0565\u0580\u0578\u057E", 43, 1 ),
		            new Among ( "\u0565\u0580", -1, 1 ),
		            new Among ( "\u0576\u0565\u0580", 45, 1 ),
		            new Among ( "\u0581", -1, 1 ),
		            new Among ( "\u056B\u0581", 47, 1 ),
		            new Among ( "\u057E\u0561\u0576\u056B\u0581", 48, 1 ),
		            new Among ( "\u0578\u057B\u056B\u0581", 48, 1 ),
		            new Among ( "\u057E\u056B\u0581", 48, 1 ),
		            new Among ( "\u0565\u0580\u056B\u0581", 48, 1 ),
		            new Among ( "\u0576\u0565\u0580\u056B\u0581", 52, 1 ),
		            new Among ( "\u0581\u056B\u0581", 48, 1 ),
		            new Among ( "\u0578\u0581", 47, 1 ),
		            new Among ( "\u0578\u0582\u0581", 47, 1 )
		        ];
		
		        var g_v = [209, 4, 128, 0, 18 ];
		
		        var I_p2;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            I_pV = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                golab1: while(true)
		                {
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 1377, 1413)))
		                        {
		                            break lab2;
		                        }
		                        break golab1;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_pV = sbp.cursor;
		                golab3: while(true)
		                {
		                    lab4: do {
		                        if (!(sbp.out_grouping(g_v, 1377, 1413)))
		                        {
		                            break lab4;
		                        }
		                        break golab3;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                golab5: while(true)
		                {
		                    lab6: do {
		                        if (!(sbp.in_grouping(g_v, 1377, 1413)))
		                        {
		                            break lab6;
		                        }
		                        break golab5;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                golab7: while(true)
		                {
		                    lab8: do {
		                        if (!(sbp.out_grouping(g_v, 1377, 1413)))
		                        {
		                            break lab8;
		                        }
		                        break golab7;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_adjective() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 23);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_verb() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_1, 71);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_noun() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 40);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_ending() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 57);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R2())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_3 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_2;
		            v_4 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_ending())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            v_5 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_verb())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            v_6 = sbp.limit - sbp.cursor;
		            lab3: do {
		                if (!r_adjective())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_6;
		            v_7 = sbp.limit - sbp.cursor;
		            lab4: do {
		                if (!r_noun())
		                {
		                    break lab4;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_7;
		            sbp.limit_backward = v_3;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		basqueStemmer : function() {

		        var a_0 = [
		            new Among ( "idea", -1, 1 ),
		            new Among ( "bidea", 0, 1 ),
		            new Among ( "kidea", 0, 1 ),
		            new Among ( "pidea", 0, 1 ),
		            new Among ( "kundea", -1, 1 ),
		            new Among ( "galea", -1, 1 ),
		            new Among ( "tailea", -1, 1 ),
		            new Among ( "tzailea", -1, 1 ),
		            new Among ( "gunea", -1, 1 ),
		            new Among ( "kunea", -1, 1 ),
		            new Among ( "tzaga", -1, 1 ),
		            new Among ( "gaia", -1, 1 ),
		            new Among ( "aldia", -1, 1 ),
		            new Among ( "taldia", 12, 1 ),
		            new Among ( "karia", -1, 1 ),
		            new Among ( "garria", -1, 2 ),
		            new Among ( "karria", -1, 1 ),
		            new Among ( "ka", -1, 1 ),
		            new Among ( "tzaka", 17, 1 ),
		            new Among ( "la", -1, 1 ),
		            new Among ( "mena", -1, 1 ),
		            new Among ( "pena", -1, 1 ),
		            new Among ( "kina", -1, 1 ),
		            new Among ( "ezina", -1, 1 ),
		            new Among ( "tezina", 23, 1 ),
		            new Among ( "kuna", -1, 1 ),
		            new Among ( "tuna", -1, 1 ),
		            new Among ( "kizuna", -1, 1 ),
		            new Among ( "era", -1, 1 ),
		            new Among ( "bera", 28, 1 ),
		            new Among ( "arabera", 29, 4 ),
		            new Among ( "kera", 28, 1 ),
		            new Among ( "pera", 28, 1 ),
		            new Among ( "orra", -1, 1 ),
		            new Among ( "korra", 33, 1 ),
		            new Among ( "dura", -1, 1 ),
		            new Among ( "gura", -1, 1 ),
		            new Among ( "kura", -1, 1 ),
		            new Among ( "tura", -1, 1 ),
		            new Among ( "eta", -1, 1 ),
		            new Among ( "keta", 39, 1 ),
		            new Among ( "gailua", -1, 1 ),
		            new Among ( "eza", -1, 1 ),
		            new Among ( "erreza", 42, 1 ),
		            new Among ( "tza", -1, 2 ),
		            new Among ( "gaitza", 44, 1 ),
		            new Among ( "kaitza", 44, 1 ),
		            new Among ( "kuntza", 44, 1 ),
		            new Among ( "ide", -1, 1 ),
		            new Among ( "bide", 48, 1 ),
		            new Among ( "kide", 48, 1 ),
		            new Among ( "pide", 48, 1 ),
		            new Among ( "kunde", -1, 1 ),
		            new Among ( "tzake", -1, 1 ),
		            new Among ( "tzeke", -1, 1 ),
		            new Among ( "le", -1, 1 ),
		            new Among ( "gale", 55, 1 ),
		            new Among ( "taile", 55, 1 ),
		            new Among ( "tzaile", 55, 1 ),
		            new Among ( "gune", -1, 1 ),
		            new Among ( "kune", -1, 1 ),
		            new Among ( "tze", -1, 1 ),
		            new Among ( "atze", 61, 1 ),
		            new Among ( "gai", -1, 1 ),
		            new Among ( "aldi", -1, 1 ),
		            new Among ( "taldi", 64, 1 ),
		            new Among ( "ki", -1, 1 ),
		            new Among ( "ari", -1, 1 ),
		            new Among ( "kari", 67, 1 ),
		            new Among ( "lari", 67, 1 ),
		            new Among ( "tari", 67, 1 ),
		            new Among ( "etari", 70, 1 ),
		            new Among ( "garri", -1, 2 ),
		            new Among ( "karri", -1, 1 ),
		            new Among ( "arazi", -1, 1 ),
		            new Among ( "tarazi", 74, 1 ),
		            new Among ( "an", -1, 1 ),
		            new Among ( "ean", 76, 1 ),
		            new Among ( "rean", 77, 1 ),
		            new Among ( "kan", 76, 1 ),
		            new Among ( "etan", 76, 1 ),
		            new Among ( "atseden", -1, 3 ),
		            new Among ( "men", -1, 1 ),
		            new Among ( "pen", -1, 1 ),
		            new Among ( "kin", -1, 1 ),
		            new Among ( "rekin", 84, 1 ),
		            new Among ( "ezin", -1, 1 ),
		            new Among ( "tezin", 86, 1 ),
		            new Among ( "tun", -1, 1 ),
		            new Among ( "kizun", -1, 1 ),
		            new Among ( "go", -1, 1 ),
		            new Among ( "ago", 90, 1 ),
		            new Among ( "tio", -1, 1 ),
		            new Among ( "dako", -1, 1 ),
		            new Among ( "or", -1, 1 ),
		            new Among ( "kor", 94, 1 ),
		            new Among ( "tzat", -1, 1 ),
		            new Among ( "du", -1, 1 ),
		            new Among ( "gailu", -1, 1 ),
		            new Among ( "tu", -1, 1 ),
		            new Among ( "atu", 99, 1 ),
		            new Among ( "aldatu", 100, 1 ),
		            new Among ( "tatu", 100, 1 ),
		            new Among ( "baditu", 99, 5 ),
		            new Among ( "ez", -1, 1 ),
		            new Among ( "errez", 104, 1 ),
		            new Among ( "tzez", 104, 1 ),
		            new Among ( "gaitz", -1, 1 ),
		            new Among ( "kaitz", -1, 1 )
		        ];
		
		        var a_1 = [
		            new Among ( "ada", -1, 1 ),
		            new Among ( "kada", 0, 1 ),
		            new Among ( "anda", -1, 1 ),
		            new Among ( "denda", -1, 1 ),
		            new Among ( "gabea", -1, 1 ),
		            new Among ( "kabea", -1, 1 ),
		            new Among ( "aldea", -1, 1 ),
		            new Among ( "kaldea", 6, 1 ),
		            new Among ( "taldea", 6, 1 ),
		            new Among ( "ordea", -1, 1 ),
		            new Among ( "zalea", -1, 1 ),
		            new Among ( "tzalea", 10, 1 ),
		            new Among ( "gilea", -1, 1 ),
		            new Among ( "emea", -1, 1 ),
		            new Among ( "kumea", -1, 1 ),
		            new Among ( "nea", -1, 1 ),
		            new Among ( "enea", 15, 1 ),
		            new Among ( "zionea", 15, 1 ),
		            new Among ( "unea", 15, 1 ),
		            new Among ( "gunea", 18, 1 ),
		            new Among ( "pea", -1, 1 ),
		            new Among ( "aurrea", -1, 1 ),
		            new Among ( "tea", -1, 1 ),
		            new Among ( "kotea", 22, 1 ),
		            new Among ( "artea", 22, 1 ),
		            new Among ( "ostea", 22, 1 ),
		            new Among ( "etxea", -1, 1 ),
		            new Among ( "ga", -1, 1 ),
		            new Among ( "anga", 27, 1 ),
		            new Among ( "gaia", -1, 1 ),
		            new Among ( "aldia", -1, 1 ),
		            new Among ( "taldia", 30, 1 ),
		            new Among ( "handia", -1, 1 ),
		            new Among ( "mendia", -1, 1 ),
		            new Among ( "geia", -1, 1 ),
		            new Among ( "egia", -1, 1 ),
		            new Among ( "degia", 35, 1 ),
		            new Among ( "tegia", 35, 1 ),
		            new Among ( "nahia", -1, 1 ),
		            new Among ( "ohia", -1, 1 ),
		            new Among ( "kia", -1, 1 ),
		            new Among ( "tokia", 40, 1 ),
		            new Among ( "oia", -1, 1 ),
		            new Among ( "koia", 42, 1 ),
		            new Among ( "aria", -1, 1 ),
		            new Among ( "karia", 44, 1 ),
		            new Among ( "laria", 44, 1 ),
		            new Among ( "taria", 44, 1 ),
		            new Among ( "eria", -1, 1 ),
		            new Among ( "keria", 48, 1 ),
		            new Among ( "teria", 48, 1 ),
		            new Among ( "garria", -1, 2 ),
		            new Among ( "larria", -1, 1 ),
		            new Among ( "kirria", -1, 1 ),
		            new Among ( "duria", -1, 1 ),
		            new Among ( "asia", -1, 1 ),
		            new Among ( "tia", -1, 1 ),
		            new Among ( "ezia", -1, 1 ),
		            new Among ( "bizia", -1, 1 ),
		            new Among ( "ontzia", -1, 1 ),
		            new Among ( "ka", -1, 1 ),
		            new Among ( "joka", 60, 3 ),
		            new Among ( "aurka", 60, 10 ),
		            new Among ( "ska", 60, 1 ),
		            new Among ( "xka", 60, 1 ),
		            new Among ( "zka", 60, 1 ),
		            new Among ( "gibela", -1, 1 ),
		            new Among ( "gela", -1, 1 ),
		            new Among ( "kaila", -1, 1 ),
		            new Among ( "skila", -1, 1 ),
		            new Among ( "tila", -1, 1 ),
		            new Among ( "ola", -1, 1 ),
		            new Among ( "na", -1, 1 ),
		            new Among ( "kana", 72, 1 ),
		            new Among ( "ena", 72, 1 ),
		            new Among ( "garrena", 74, 1 ),
		            new Among ( "gerrena", 74, 1 ),
		            new Among ( "urrena", 74, 1 ),
		            new Among ( "zaina", 72, 1 ),
		            new Among ( "tzaina", 78, 1 ),
		            new Among ( "kina", 72, 1 ),
		            new Among ( "mina", 72, 1 ),
		            new Among ( "garna", 72, 1 ),
		            new Among ( "una", 72, 1 ),
		            new Among ( "duna", 83, 1 ),
		            new Among ( "asuna", 83, 1 ),
		            new Among ( "tasuna", 85, 1 ),
		            new Among ( "ondoa", -1, 1 ),
		            new Among ( "kondoa", 87, 1 ),
		            new Among ( "ngoa", -1, 1 ),
		            new Among ( "zioa", -1, 1 ),
		            new Among ( "koa", -1, 1 ),
		            new Among ( "takoa", 91, 1 ),
		            new Among ( "zkoa", 91, 1 ),
		            new Among ( "noa", -1, 1 ),
		            new Among ( "zinoa", 94, 1 ),
		            new Among ( "aroa", -1, 1 ),
		            new Among ( "taroa", 96, 1 ),
		            new Among ( "zaroa", 96, 1 ),
		            new Among ( "eroa", -1, 1 ),
		            new Among ( "oroa", -1, 1 ),
		            new Among ( "osoa", -1, 1 ),
		            new Among ( "toa", -1, 1 ),
		            new Among ( "ttoa", 102, 1 ),
		            new Among ( "ztoa", 102, 1 ),
		            new Among ( "txoa", -1, 1 ),
		            new Among ( "tzoa", -1, 1 ),
		            new Among ( "\u00F1oa", -1, 1 ),
		            new Among ( "ra", -1, 1 ),
		            new Among ( "ara", 108, 1 ),
		            new Among ( "dara", 109, 1 ),
		            new Among ( "liara", 109, 1 ),
		            new Among ( "tiara", 109, 1 ),
		            new Among ( "tara", 109, 1 ),
		            new Among ( "etara", 113, 1 ),
		            new Among ( "tzara", 109, 1 ),
		            new Among ( "bera", 108, 1 ),
		            new Among ( "kera", 108, 1 ),
		            new Among ( "pera", 108, 1 ),
		            new Among ( "ora", 108, 2 ),
		            new Among ( "tzarra", 108, 1 ),
		            new Among ( "korra", 108, 1 ),
		            new Among ( "tra", 108, 1 ),
		            new Among ( "sa", -1, 1 ),
		            new Among ( "osa", 123, 1 ),
		            new Among ( "ta", -1, 1 ),
		            new Among ( "eta", 125, 1 ),
		            new Among ( "keta", 126, 1 ),
		            new Among ( "sta", 125, 1 ),
		            new Among ( "dua", -1, 1 ),
		            new Among ( "mendua", 129, 1 ),
		            new Among ( "ordua", 129, 1 ),
		            new Among ( "lekua", -1, 1 ),
		            new Among ( "burua", -1, 1 ),
		            new Among ( "durua", -1, 1 ),
		            new Among ( "tsua", -1, 1 ),
		            new Among ( "tua", -1, 1 ),
		            new Among ( "mentua", 136, 1 ),
		            new Among ( "estua", 136, 1 ),
		            new Among ( "txua", -1, 1 ),
		            new Among ( "zua", -1, 1 ),
		            new Among ( "tzua", 140, 1 ),
		            new Among ( "za", -1, 1 ),
		            new Among ( "eza", 142, 1 ),
		            new Among ( "eroza", 142, 1 ),
		            new Among ( "tza", 142, 2 ),
		            new Among ( "koitza", 145, 1 ),
		            new Among ( "antza", 145, 1 ),
		            new Among ( "gintza", 145, 1 ),
		            new Among ( "kintza", 145, 1 ),
		            new Among ( "kuntza", 145, 1 ),
		            new Among ( "gabe", -1, 1 ),
		            new Among ( "kabe", -1, 1 ),
		            new Among ( "kide", -1, 1 ),
		            new Among ( "alde", -1, 1 ),
		            new Among ( "kalde", 154, 1 ),
		            new Among ( "talde", 154, 1 ),
		            new Among ( "orde", -1, 1 ),
		            new Among ( "ge", -1, 1 ),
		            new Among ( "zale", -1, 1 ),
		            new Among ( "tzale", 159, 1 ),
		            new Among ( "gile", -1, 1 ),
		            new Among ( "eme", -1, 1 ),
		            new Among ( "kume", -1, 1 ),
		            new Among ( "ne", -1, 1 ),
		            new Among ( "zione", 164, 1 ),
		            new Among ( "une", 164, 1 ),
		            new Among ( "gune", 166, 1 ),
		            new Among ( "pe", -1, 1 ),
		            new Among ( "aurre", -1, 1 ),
		            new Among ( "te", -1, 1 ),
		            new Among ( "kote", 170, 1 ),
		            new Among ( "arte", 170, 1 ),
		            new Among ( "oste", 170, 1 ),
		            new Among ( "etxe", -1, 1 ),
		            new Among ( "gai", -1, 1 ),
		            new Among ( "di", -1, 1 ),
		            new Among ( "aldi", 176, 1 ),
		            new Among ( "taldi", 177, 1 ),
		            new Among ( "geldi", 176, 8 ),
		            new Among ( "handi", 176, 1 ),
		            new Among ( "mendi", 176, 1 ),
		            new Among ( "gei", -1, 1 ),
		            new Among ( "egi", -1, 1 ),
		            new Among ( "degi", 183, 1 ),
		            new Among ( "tegi", 183, 1 ),
		            new Among ( "nahi", -1, 1 ),
		            new Among ( "ohi", -1, 1 ),
		            new Among ( "ki", -1, 1 ),
		            new Among ( "toki", 188, 1 ),
		            new Among ( "oi", -1, 1 ),
		            new Among ( "goi", 190, 1 ),
		            new Among ( "koi", 190, 1 ),
		            new Among ( "ari", -1, 1 ),
		            new Among ( "kari", 193, 1 ),
		            new Among ( "lari", 193, 1 ),
		            new Among ( "tari", 193, 1 ),
		            new Among ( "garri", -1, 2 ),
		            new Among ( "larri", -1, 1 ),
		            new Among ( "kirri", -1, 1 ),
		            new Among ( "duri", -1, 1 ),
		            new Among ( "asi", -1, 1 ),
		            new Among ( "ti", -1, 1 ),
		            new Among ( "ontzi", -1, 1 ),
		            new Among ( "\u00F1i", -1, 1 ),
		            new Among ( "ak", -1, 1 ),
		            new Among ( "ek", -1, 1 ),
		            new Among ( "tarik", -1, 1 ),
		            new Among ( "gibel", -1, 1 ),
		            new Among ( "ail", -1, 1 ),
		            new Among ( "kail", 209, 1 ),
		            new Among ( "kan", -1, 1 ),
		            new Among ( "tan", -1, 1 ),
		            new Among ( "etan", 212, 1 ),
		            new Among ( "en", -1, 4 ),
		            new Among ( "ren", 214, 2 ),
		            new Among ( "garren", 215, 1 ),
		            new Among ( "gerren", 215, 1 ),
		            new Among ( "urren", 215, 1 ),
		            new Among ( "ten", 214, 4 ),
		            new Among ( "tzen", 214, 4 ),
		            new Among ( "zain", -1, 1 ),
		            new Among ( "tzain", 221, 1 ),
		            new Among ( "kin", -1, 1 ),
		            new Among ( "min", -1, 1 ),
		            new Among ( "dun", -1, 1 ),
		            new Among ( "asun", -1, 1 ),
		            new Among ( "tasun", 226, 1 ),
		            new Among ( "aizun", -1, 1 ),
		            new Among ( "ondo", -1, 1 ),
		            new Among ( "kondo", 229, 1 ),
		            new Among ( "go", -1, 1 ),
		            new Among ( "ngo", 231, 1 ),
		            new Among ( "zio", -1, 1 ),
		            new Among ( "ko", -1, 1 ),
		            new Among ( "trako", 234, 5 ),
		            new Among ( "tako", 234, 1 ),
		            new Among ( "etako", 236, 1 ),
		            new Among ( "eko", 234, 1 ),
		            new Among ( "tariko", 234, 1 ),
		            new Among ( "sko", 234, 1 ),
		            new Among ( "tuko", 234, 1 ),
		            new Among ( "minutuko", 241, 6 ),
		            new Among ( "zko", 234, 1 ),
		            new Among ( "no", -1, 1 ),
		            new Among ( "zino", 244, 1 ),
		            new Among ( "ro", -1, 1 ),
		            new Among ( "aro", 246, 1 ),
		            new Among ( "igaro", 247, 9 ),
		            new Among ( "taro", 247, 1 ),
		            new Among ( "zaro", 247, 1 ),
		            new Among ( "ero", 246, 1 ),
		            new Among ( "giro", 246, 1 ),
		            new Among ( "oro", 246, 1 ),
		            new Among ( "oso", -1, 1 ),
		            new Among ( "to", -1, 1 ),
		            new Among ( "tto", 255, 1 ),
		            new Among ( "zto", 255, 1 ),
		            new Among ( "txo", -1, 1 ),
		            new Among ( "tzo", -1, 1 ),
		            new Among ( "gintzo", 259, 1 ),
		            new Among ( "\u00F1o", -1, 1 ),
		            new Among ( "zp", -1, 1 ),
		            new Among ( "ar", -1, 1 ),
		            new Among ( "dar", 263, 1 ),
		            new Among ( "behar", 263, 1 ),
		            new Among ( "zehar", 263, 7 ),
		            new Among ( "liar", 263, 1 ),
		            new Among ( "tiar", 263, 1 ),
		            new Among ( "tar", 263, 1 ),
		            new Among ( "tzar", 263, 1 ),
		            new Among ( "or", -1, 2 ),
		            new Among ( "kor", 271, 1 ),
		            new Among ( "os", -1, 1 ),
		            new Among ( "ket", -1, 1 ),
		            new Among ( "du", -1, 1 ),
		            new Among ( "mendu", 275, 1 ),
		            new Among ( "ordu", 275, 1 ),
		            new Among ( "leku", -1, 1 ),
		            new Among ( "buru", -1, 2 ),
		            new Among ( "duru", -1, 1 ),
		            new Among ( "tsu", -1, 1 ),
		            new Among ( "tu", -1, 1 ),
		            new Among ( "tatu", 282, 4 ),
		            new Among ( "mentu", 282, 1 ),
		            new Among ( "estu", 282, 1 ),
		            new Among ( "txu", -1, 1 ),
		            new Among ( "zu", -1, 1 ),
		            new Among ( "tzu", 287, 1 ),
		            new Among ( "gintzu", 288, 1 ),
		            new Among ( "z", -1, 1 ),
		            new Among ( "ez", 290, 1 ),
		            new Among ( "eroz", 290, 1 ),
		            new Among ( "tz", 290, 1 ),
		            new Among ( "koitz", 293, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "zlea", -1, 2 ),
		            new Among ( "keria", -1, 1 ),
		            new Among ( "la", -1, 1 ),
		            new Among ( "era", -1, 1 ),
		            new Among ( "dade", -1, 1 ),
		            new Among ( "tade", -1, 1 ),
		            new Among ( "date", -1, 1 ),
		            new Among ( "tate", -1, 1 ),
		            new Among ( "gi", -1, 1 ),
		            new Among ( "ki", -1, 1 ),
		            new Among ( "ik", -1, 1 ),
		            new Among ( "lanik", 10, 1 ),
		            new Among ( "rik", 10, 1 ),
		            new Among ( "larik", 12, 1 ),
		            new Among ( "ztik", 10, 1 ),
		            new Among ( "go", -1, 1 ),
		            new Among ( "ro", -1, 1 ),
		            new Among ( "ero", 16, 1 ),
		            new Among ( "to", -1, 1 )
		        ];
		
		        var g_v = [17, 65, 16 ];
		
		        var I_p2;
		        var I_p1;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_6;
		            var v_8;
		            I_pV = sbp.limit;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                lab1: do {
		                    v_2 = sbp.cursor;
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 97, 117)))
		                        {
		                            break lab2;
		                        }
		                        lab3: do {
		                            v_3 = sbp.cursor;
		                            lab4: do {
		                                if (!(sbp.out_grouping(g_v, 97, 117)))
		                                {
		                                    break lab4;
		                                }
		                                golab5: while(true)
		                                {
		                                    lab6: do {
		                                        if (!(sbp.in_grouping(g_v, 97, 117)))
		                                        {
		                                            break lab6;
		                                        }
		                                        break golab5;
		                                    } while (false);
		                                    if (sbp.cursor >= sbp.limit)
		                                    {
		                                        break lab4;
		                                    }
		                                    sbp.cursor++;
		                                }
		                                break lab3;
		                            } while (false);
		                            sbp.cursor = v_3;
		                            if (!(sbp.in_grouping(g_v, 97, 117)))
		                            {
		                                break lab2;
		                            }
		                            golab7: while(true)
		                            {
		                                lab8: do {
		                                    if (!(sbp.out_grouping(g_v, 97, 117)))
		                                    {
		                                        break lab8;
		                                    }
		                                    break golab7;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab2;
		                                }
		                                sbp.cursor++;
		                            }
		                        } while (false);
		                        break lab1;
		                    } while (false);
		                    sbp.cursor = v_2;
		                    if (!(sbp.out_grouping(g_v, 97, 117)))
		                    {
		                        break lab0;
		                    }
		                    lab9: do {
		                        v_6 = sbp.cursor;
		                        lab10: do {
		                            if (!(sbp.out_grouping(g_v, 97, 117)))
		                            {
		                                break lab10;
		                            }
		                            golab11: while(true)
		                            {
		                                lab12: do {
		                                    if (!(sbp.in_grouping(g_v, 97, 117)))
		                                    {
		                                        break lab12;
		                                    }
		                                    break golab11;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab10;
		                                }
		                                sbp.cursor++;
		                            }
		                            break lab9;
		                        } while (false);
		                        sbp.cursor = v_6;
		                        if (!(sbp.in_grouping(g_v, 97, 117)))
		                        {
		                            break lab0;
		                        }
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab0;
		                        }
		                        sbp.cursor++;
		                    } while (false);
		                } while (false);
		                I_pV = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            v_8 = sbp.cursor;
		            lab13: do {
		                golab14: while(true)
		                {
		                    lab15: do {
		                        if (!(sbp.in_grouping(g_v, 97, 117)))
		                        {
		                            break lab15;
		                        }
		                        break golab14;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab16: while(true)
		                {
		                    lab17: do {
		                        if (!(sbp.out_grouping(g_v, 97, 117)))
		                        {
		                            break lab17;
		                        }
		                        break golab16;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab18: while(true)
		                {
		                    lab19: do {
		                        if (!(sbp.in_grouping(g_v, 97, 117)))
		                        {
		                            break lab19;
		                        }
		                        break golab18;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab20: while(true)
		                {
		                    lab21: do {
		                        if (!(sbp.out_grouping(g_v, 97, 117)))
		                        {
		                            break lab21;
		                        }
		                        break golab20;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_8;
		            return true;
		        }
		
		        function r_RV() {
		            if (!(I_pV <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_aditzak() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 109);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 3:
		                    sbp.slice_from("atseden");
		                    break;
		                case 4:
		                    sbp.slice_from("arabera");
		                    break;
		                case 5:
		                    sbp.slice_from("baditu");
		                    break;
		            }
		            return true;
		        }
		
		        function r_izenak() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_1, 295);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 3:
		                    sbp.slice_from("jok");
		                    break;
		                case 4:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 5:
		                    sbp.slice_from("tra");
		                    break;
		                case 6:
		                    sbp.slice_from("minutu");
		                    break;
		                case 7:
		                    sbp.slice_from("zehar");
		                    break;
		                case 8:
		                    sbp.slice_from("geldi");
		                    break;
		                case 9:
		                    sbp.slice_from("igaro");
		                    break;
		                case 10:
		                    sbp.slice_from("aurka");
		                    break;
		            }
		            return true;
		        }
		
		        function r_adjetiboak() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 19);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("z");
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            replab1: while(true)
		            {
		                v_2 = sbp.limit - sbp.cursor;
		                lab2: do {
		                    if (!r_aditzak())
		                    {
		                        break lab2;
		                    }
		                    continue replab1;
		                } while (false);
		                sbp.cursor = sbp.limit - v_2;
		                break replab1;
		            }
		            replab3: while(true)
		            {
		                v_3 = sbp.limit - sbp.cursor;
		                lab4: do {
		                    if (!r_izenak())
		                    {
		                        break lab4;
		                    }
		                    continue replab3;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                break replab3;
		            }
		            v_4 = sbp.limit - sbp.cursor;
		            lab5: do {
		                if (!r_adjetiboak())
		                {
		                    break lab5;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		catalanStemmer : function() {

		        var a_0 = [
		            new Among ( "", -1, 13 ),
		            new Among ( "\u00B7", 0, 12 ),
		            new Among ( "\u00E0", 0, 2 ),
		            new Among ( "\u00E1", 0, 1 ),
		            new Among ( "\u00E8", 0, 4 ),
		            new Among ( "\u00E9", 0, 3 ),
		            new Among ( "\u00EC", 0, 6 ),
		            new Among ( "\u00ED", 0, 5 ),
		            new Among ( "\u00EF", 0, 11 ),
		            new Among ( "\u00F2", 0, 8 ),
		            new Among ( "\u00F3", 0, 7 ),
		            new Among ( "\u00FA", 0, 9 ),
		            new Among ( "\u00FC", 0, 10 )
		        ];
		
		        var a_1 = [
		            new Among ( "la", -1, 1 ),
		            new Among ( "-la", 0, 1 ),
		            new Among ( "sela", 0, 1 ),
		            new Among ( "le", -1, 1 ),
		            new Among ( "me", -1, 1 ),
		            new Among ( "-me", 4, 1 ),
		            new Among ( "se", -1, 1 ),
		            new Among ( "-te", -1, 1 ),
		            new Among ( "hi", -1, 1 ),
		            new Among ( "'hi", 8, 1 ),
		            new Among ( "li", -1, 1 ),
		            new Among ( "-li", 10, 1 ),
		            new Among ( "'l", -1, 1 ),
		            new Among ( "'m", -1, 1 ),
		            new Among ( "-m", -1, 1 ),
		            new Among ( "'n", -1, 1 ),
		            new Among ( "-n", -1, 1 ),
		            new Among ( "ho", -1, 1 ),
		            new Among ( "'ho", 17, 1 ),
		            new Among ( "lo", -1, 1 ),
		            new Among ( "selo", 19, 1 ),
		            new Among ( "'s", -1, 1 ),
		            new Among ( "las", -1, 1 ),
		            new Among ( "selas", 22, 1 ),
		            new Among ( "les", -1, 1 ),
		            new Among ( "-les", 24, 1 ),
		            new Among ( "'ls", -1, 1 ),
		            new Among ( "-ls", -1, 1 ),
		            new Among ( "'ns", -1, 1 ),
		            new Among ( "-ns", -1, 1 ),
		            new Among ( "ens", -1, 1 ),
		            new Among ( "los", -1, 1 ),
		            new Among ( "selos", 31, 1 ),
		            new Among ( "nos", -1, 1 ),
		            new Among ( "-nos", 33, 1 ),
		            new Among ( "vos", -1, 1 ),
		            new Among ( "us", -1, 1 ),
		            new Among ( "-us", 36, 1 ),
		            new Among ( "'t", -1, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ica", -1, 4 ),
		            new Among ( "l\u00F3gica", 0, 3 ),
		            new Among ( "enca", -1, 1 ),
		            new Among ( "ada", -1, 2 ),
		            new Among ( "ancia", -1, 1 ),
		            new Among ( "encia", -1, 1 ),
		            new Among ( "\u00E8ncia", -1, 1 ),
		            new Among ( "\u00EDcia", -1, 1 ),
		            new Among ( "logia", -1, 3 ),
		            new Among ( "inia", -1, 1 ),
		            new Among ( "\u00EDinia", 9, 1 ),
		            new Among ( "eria", -1, 1 ),
		            new Among ( "\u00E0ria", -1, 1 ),
		            new Among ( "at\u00F2ria", -1, 1 ),
		            new Among ( "alla", -1, 1 ),
		            new Among ( "ella", -1, 1 ),
		            new Among ( "\u00EDvola", -1, 1 ),
		            new Among ( "ima", -1, 1 ),
		            new Among ( "\u00EDssima", 17, 1 ),
		            new Among ( "qu\u00EDssima", 18, 5 ),
		            new Among ( "ana", -1, 1 ),
		            new Among ( "ina", -1, 1 ),
		            new Among ( "era", -1, 1 ),
		            new Among ( "sfera", 22, 1 ),
		            new Among ( "ora", -1, 1 ),
		            new Among ( "dora", 24, 1 ),
		            new Among ( "adora", 25, 1 ),
		            new Among ( "adura", -1, 1 ),
		            new Among ( "esa", -1, 1 ),
		            new Among ( "osa", -1, 1 ),
		            new Among ( "assa", -1, 1 ),
		            new Among ( "essa", -1, 1 ),
		            new Among ( "issa", -1, 1 ),
		            new Among ( "eta", -1, 1 ),
		            new Among ( "ita", -1, 1 ),
		            new Among ( "ota", -1, 1 ),
		            new Among ( "ista", -1, 1 ),
		            new Among ( "ialista", 36, 1 ),
		            new Among ( "ionista", 36, 1 ),
		            new Among ( "iva", -1, 1 ),
		            new Among ( "ativa", 39, 1 ),
		            new Among ( "n\u00E7a", -1, 1 ),
		            new Among ( "log\u00EDa", -1, 3 ),
		            new Among ( "ic", -1, 4 ),
		            new Among ( "\u00EDstic", 43, 1 ),
		            new Among ( "enc", -1, 1 ),
		            new Among ( "esc", -1, 1 ),
		            new Among ( "ud", -1, 1 ),
		            new Among ( "atge", -1, 1 ),
		            new Among ( "ble", -1, 1 ),
		            new Among ( "able", 49, 1 ),
		            new Among ( "ible", 49, 1 ),
		            new Among ( "isme", -1, 1 ),
		            new Among ( "ialisme", 52, 1 ),
		            new Among ( "ionisme", 52, 1 ),
		            new Among ( "ivisme", 52, 1 ),
		            new Among ( "aire", -1, 1 ),
		            new Among ( "icte", -1, 1 ),
		            new Among ( "iste", -1, 1 ),
		            new Among ( "ici", -1, 1 ),
		            new Among ( "\u00EDci", -1, 1 ),
		            new Among ( "logi", -1, 3 ),
		            new Among ( "ari", -1, 1 ),
		            new Among ( "tori", -1, 1 ),
		            new Among ( "al", -1, 1 ),
		            new Among ( "il", -1, 1 ),
		            new Among ( "all", -1, 1 ),
		            new Among ( "ell", -1, 1 ),
		            new Among ( "\u00EDvol", -1, 1 ),
		            new Among ( "isam", -1, 1 ),
		            new Among ( "issem", -1, 1 ),
		            new Among ( "\u00ECssem", -1, 1 ),
		            new Among ( "\u00EDssem", -1, 1 ),
		            new Among ( "\u00EDssim", -1, 1 ),
		            new Among ( "qu\u00EDssim", 73, 5 ),
		            new Among ( "amen", -1, 1 ),
		            new Among ( "\u00ECssin", -1, 1 ),
		            new Among ( "ar", -1, 1 ),
		            new Among ( "ificar", 77, 1 ),
		            new Among ( "egar", 77, 1 ),
		            new Among ( "ejar", 77, 1 ),
		            new Among ( "itar", 77, 1 ),
		            new Among ( "itzar", 77, 1 ),
		            new Among ( "fer", -1, 1 ),
		            new Among ( "or", -1, 1 ),
		            new Among ( "dor", 84, 1 ),
		            new Among ( "dur", -1, 1 ),
		            new Among ( "doras", -1, 1 ),
		            new Among ( "ics", -1, 4 ),
		            new Among ( "l\u00F3gics", 88, 3 ),
		            new Among ( "uds", -1, 1 ),
		            new Among ( "nces", -1, 1 ),
		            new Among ( "ades", -1, 2 ),
		            new Among ( "ancies", -1, 1 ),
		            new Among ( "encies", -1, 1 ),
		            new Among ( "\u00E8ncies", -1, 1 ),
		            new Among ( "\u00EDcies", -1, 1 ),
		            new Among ( "logies", -1, 3 ),
		            new Among ( "inies", -1, 1 ),
		            new Among ( "\u00EDnies", -1, 1 ),
		            new Among ( "eries", -1, 1 ),
		            new Among ( "\u00E0ries", -1, 1 ),
		            new Among ( "at\u00F2ries", -1, 1 ),
		            new Among ( "bles", -1, 1 ),
		            new Among ( "ables", 103, 1 ),
		            new Among ( "ibles", 103, 1 ),
		            new Among ( "imes", -1, 1 ),
		            new Among ( "\u00EDssimes", 106, 1 ),
		            new Among ( "qu\u00EDssimes", 107, 5 ),
		            new Among ( "formes", -1, 1 ),
		            new Among ( "ismes", -1, 1 ),
		            new Among ( "ialismes", 110, 1 ),
		            new Among ( "ines", -1, 1 ),
		            new Among ( "eres", -1, 1 ),
		            new Among ( "ores", -1, 1 ),
		            new Among ( "dores", 114, 1 ),
		            new Among ( "idores", 115, 1 ),
		            new Among ( "dures", -1, 1 ),
		            new Among ( "eses", -1, 1 ),
		            new Among ( "oses", -1, 1 ),
		            new Among ( "asses", -1, 1 ),
		            new Among ( "ictes", -1, 1 ),
		            new Among ( "ites", -1, 1 ),
		            new Among ( "otes", -1, 1 ),
		            new Among ( "istes", -1, 1 ),
		            new Among ( "ialistes", 124, 1 ),
		            new Among ( "ionistes", 124, 1 ),
		            new Among ( "iques", -1, 4 ),
		            new Among ( "l\u00F3giques", 127, 3 ),
		            new Among ( "ives", -1, 1 ),
		            new Among ( "atives", 129, 1 ),
		            new Among ( "log\u00EDes", -1, 3 ),
		            new Among ( "alleng\u00FCes", -1, 1 ),
		            new Among ( "icis", -1, 1 ),
		            new Among ( "\u00EDcis", -1, 1 ),
		            new Among ( "logis", -1, 3 ),
		            new Among ( "aris", -1, 1 ),
		            new Among ( "toris", -1, 1 ),
		            new Among ( "ls", -1, 1 ),
		            new Among ( "als", 138, 1 ),
		            new Among ( "ells", 138, 1 ),
		            new Among ( "ims", -1, 1 ),
		            new Among ( "\u00EDssims", 141, 1 ),
		            new Among ( "qu\u00EDssims", 142, 5 ),
		            new Among ( "ions", -1, 1 ),
		            new Among ( "cions", 144, 1 ),
		            new Among ( "acions", 145, 2 ),
		            new Among ( "esos", -1, 1 ),
		            new Among ( "osos", -1, 1 ),
		            new Among ( "assos", -1, 1 ),
		            new Among ( "issos", -1, 1 ),
		            new Among ( "ers", -1, 1 ),
		            new Among ( "ors", -1, 1 ),
		            new Among ( "dors", 152, 1 ),
		            new Among ( "adors", 153, 1 ),
		            new Among ( "idors", 153, 1 ),
		            new Among ( "ats", -1, 1 ),
		            new Among ( "itats", 156, 1 ),
		            new Among ( "bilitats", 157, 1 ),
		            new Among ( "ivitats", 157, 1 ),
		            new Among ( "ativitats", 159, 1 ),
		            new Among ( "\u00EFtats", 156, 1 ),
		            new Among ( "ets", -1, 1 ),
		            new Among ( "ants", -1, 1 ),
		            new Among ( "ents", -1, 1 ),
		            new Among ( "ments", 164, 1 ),
		            new Among ( "aments", 165, 1 ),
		            new Among ( "ots", -1, 1 ),
		            new Among ( "uts", -1, 1 ),
		            new Among ( "ius", -1, 1 ),
		            new Among ( "trius", 169, 1 ),
		            new Among ( "atius", 169, 1 ),
		            new Among ( "\u00E8s", -1, 1 ),
		            new Among ( "\u00E9s", -1, 1 ),
		            new Among ( "\u00EDs", -1, 1 ),
		            new Among ( "d\u00EDs", 174, 1 ),
		            new Among ( "\u00F3s", -1, 1 ),
		            new Among ( "itat", -1, 1 ),
		            new Among ( "bilitat", 177, 1 ),
		            new Among ( "ivitat", 177, 1 ),
		            new Among ( "ativitat", 179, 1 ),
		            new Among ( "\u00EFtat", -1, 1 ),
		            new Among ( "et", -1, 1 ),
		            new Among ( "ant", -1, 1 ),
		            new Among ( "ent", -1, 1 ),
		            new Among ( "ient", 184, 1 ),
		            new Among ( "ment", 184, 1 ),
		            new Among ( "ament", 186, 1 ),
		            new Among ( "isament", 187, 1 ),
		            new Among ( "ot", -1, 1 ),
		            new Among ( "isseu", -1, 1 ),
		            new Among ( "\u00ECsseu", -1, 1 ),
		            new Among ( "\u00EDsseu", -1, 1 ),
		            new Among ( "triu", -1, 1 ),
		            new Among ( "\u00EDssiu", -1, 1 ),
		            new Among ( "atiu", -1, 1 ),
		            new Among ( "\u00F3", -1, 1 ),
		            new Among ( "i\u00F3", 196, 1 ),
		            new Among ( "ci\u00F3", 197, 1 ),
		            new Among ( "aci\u00F3", 198, 1 )
		        ];
		
		        var a_3 = [
		            new Among ( "aba", -1, 1 ),
		            new Among ( "esca", -1, 1 ),
		            new Among ( "isca", -1, 1 ),
		            new Among ( "\u00EFsca", -1, 1 ),
		            new Among ( "ada", -1, 1 ),
		            new Among ( "ida", -1, 1 ),
		            new Among ( "uda", -1, 1 ),
		            new Among ( "\u00EFda", -1, 1 ),
		            new Among ( "ia", -1, 1 ),
		            new Among ( "aria", 8, 1 ),
		            new Among ( "iria", 8, 1 ),
		            new Among ( "ara", -1, 1 ),
		            new Among ( "iera", -1, 1 ),
		            new Among ( "ira", -1, 1 ),
		            new Among ( "adora", -1, 1 ),
		            new Among ( "\u00EFra", -1, 1 ),
		            new Among ( "ava", -1, 1 ),
		            new Among ( "ixa", -1, 1 ),
		            new Among ( "itza", -1, 1 ),
		            new Among ( "\u00EDa", -1, 1 ),
		            new Among ( "ar\u00EDa", 19, 1 ),
		            new Among ( "er\u00EDa", 19, 1 ),
		            new Among ( "ir\u00EDa", 19, 1 ),
		            new Among ( "\u00EFa", -1, 1 ),
		            new Among ( "isc", -1, 1 ),
		            new Among ( "\u00EFsc", -1, 1 ),
		            new Among ( "ad", -1, 1 ),
		            new Among ( "ed", -1, 1 ),
		            new Among ( "id", -1, 1 ),
		            new Among ( "ie", -1, 1 ),
		            new Among ( "re", -1, 1 ),
		            new Among ( "dre", 30, 1 ),
		            new Among ( "ase", -1, 1 ),
		            new Among ( "iese", -1, 1 ),
		            new Among ( "aste", -1, 1 ),
		            new Among ( "iste", -1, 1 ),
		            new Among ( "ii", -1, 1 ),
		            new Among ( "ini", -1, 1 ),
		            new Among ( "esqui", -1, 1 ),
		            new Among ( "eixi", -1, 1 ),
		            new Among ( "itzi", -1, 1 ),
		            new Among ( "am", -1, 1 ),
		            new Among ( "em", -1, 1 ),
		            new Among ( "arem", 42, 1 ),
		            new Among ( "irem", 42, 1 ),
		            new Among ( "\u00E0rem", 42, 1 ),
		            new Among ( "\u00EDrem", 42, 1 ),
		            new Among ( "\u00E0ssem", 42, 1 ),
		            new Among ( "\u00E9ssem", 42, 1 ),
		            new Among ( "iguem", 42, 1 ),
		            new Among ( "\u00EFguem", 42, 1 ),
		            new Among ( "avem", 42, 1 ),
		            new Among ( "\u00E0vem", 42, 1 ),
		            new Among ( "\u00E1vem", 42, 1 ),
		            new Among ( "ir\u00ECem", 42, 1 ),
		            new Among ( "\u00EDem", 42, 1 ),
		            new Among ( "ar\u00EDem", 55, 1 ),
		            new Among ( "ir\u00EDem", 55, 1 ),
		            new Among ( "assim", -1, 1 ),
		            new Among ( "essim", -1, 1 ),
		            new Among ( "issim", -1, 1 ),
		            new Among ( "\u00E0ssim", -1, 1 ),
		            new Among ( "\u00E8ssim", -1, 1 ),
		            new Among ( "\u00E9ssim", -1, 1 ),
		            new Among ( "\u00EDssim", -1, 1 ),
		            new Among ( "\u00EFm", -1, 1 ),
		            new Among ( "an", -1, 1 ),
		            new Among ( "aban", 66, 1 ),
		            new Among ( "arian", 66, 1 ),
		            new Among ( "aran", 66, 1 ),
		            new Among ( "ieran", 66, 1 ),
		            new Among ( "iran", 66, 1 ),
		            new Among ( "\u00EDan", 66, 1 ),
		            new Among ( "ar\u00EDan", 72, 1 ),
		            new Among ( "er\u00EDan", 72, 1 ),
		            new Among ( "ir\u00EDan", 72, 1 ),
		            new Among ( "en", -1, 1 ),
		            new Among ( "ien", 76, 1 ),
		            new Among ( "arien", 77, 1 ),
		            new Among ( "irien", 77, 1 ),
		            new Among ( "aren", 76, 1 ),
		            new Among ( "eren", 76, 1 ),
		            new Among ( "iren", 76, 1 ),
		            new Among ( "\u00E0ren", 76, 1 ),
		            new Among ( "\u00EFren", 76, 1 ),
		            new Among ( "asen", 76, 1 ),
		            new Among ( "iesen", 76, 1 ),
		            new Among ( "assen", 76, 1 ),
		            new Among ( "essen", 76, 1 ),
		            new Among ( "issen", 76, 1 ),
		            new Among ( "\u00E9ssen", 76, 1 ),
		            new Among ( "\u00EFssen", 76, 1 ),
		            new Among ( "esquen", 76, 1 ),
		            new Among ( "isquen", 76, 1 ),
		            new Among ( "\u00EFsquen", 76, 1 ),
		            new Among ( "aven", 76, 1 ),
		            new Among ( "ixen", 76, 1 ),
		            new Among ( "eixen", 96, 1 ),
		            new Among ( "\u00EFxen", 76, 1 ),
		            new Among ( "\u00EFen", 76, 1 ),
		            new Among ( "in", -1, 1 ),
		            new Among ( "inin", 100, 1 ),
		            new Among ( "sin", 100, 1 ),
		            new Among ( "isin", 102, 1 ),
		            new Among ( "assin", 102, 1 ),
		            new Among ( "essin", 102, 1 ),
		            new Among ( "issin", 102, 1 ),
		            new Among ( "\u00EFssin", 102, 1 ),
		            new Among ( "esquin", 100, 1 ),
		            new Among ( "eixin", 100, 1 ),
		            new Among ( "aron", -1, 1 ),
		            new Among ( "ieron", -1, 1 ),
		            new Among ( "ar\u00E1n", -1, 1 ),
		            new Among ( "er\u00E1n", -1, 1 ),
		            new Among ( "ir\u00E1n", -1, 1 ),
		            new Among ( "i\u00EFn", -1, 1 ),
		            new Among ( "ado", -1, 1 ),
		            new Among ( "ido", -1, 1 ),
		            new Among ( "ando", -1, 2 ),
		            new Among ( "iendo", -1, 1 ),
		            new Among ( "io", -1, 1 ),
		            new Among ( "ixo", -1, 1 ),
		            new Among ( "eixo", 121, 1 ),
		            new Among ( "\u00EFxo", -1, 1 ),
		            new Among ( "itzo", -1, 1 ),
		            new Among ( "ar", -1, 1 ),
		            new Among ( "tzar", 125, 1 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "eixer", 127, 1 ),
		            new Among ( "ir", -1, 1 ),
		            new Among ( "ador", -1, 1 ),
		            new Among ( "as", -1, 1 ),
		            new Among ( "abas", 131, 1 ),
		            new Among ( "adas", 131, 1 ),
		            new Among ( "idas", 131, 1 ),
		            new Among ( "aras", 131, 1 ),
		            new Among ( "ieras", 131, 1 ),
		            new Among ( "\u00EDas", 131, 1 ),
		            new Among ( "ar\u00EDas", 137, 1 ),
		            new Among ( "er\u00EDas", 137, 1 ),
		            new Among ( "ir\u00EDas", 137, 1 ),
		            new Among ( "ids", -1, 1 ),
		            new Among ( "es", -1, 1 ),
		            new Among ( "ades", 142, 1 ),
		            new Among ( "ides", 142, 1 ),
		            new Among ( "udes", 142, 1 ),
		            new Among ( "\u00EFdes", 142, 1 ),
		            new Among ( "atges", 142, 1 ),
		            new Among ( "ies", 142, 1 ),
		            new Among ( "aries", 148, 1 ),
		            new Among ( "iries", 148, 1 ),
		            new Among ( "ares", 142, 1 ),
		            new Among ( "ires", 142, 1 ),
		            new Among ( "adores", 142, 1 ),
		            new Among ( "\u00EFres", 142, 1 ),
		            new Among ( "ases", 142, 1 ),
		            new Among ( "ieses", 142, 1 ),
		            new Among ( "asses", 142, 1 ),
		            new Among ( "esses", 142, 1 ),
		            new Among ( "isses", 142, 1 ),
		            new Among ( "\u00EFsses", 142, 1 ),
		            new Among ( "ques", 142, 1 ),
		            new Among ( "esques", 161, 1 ),
		            new Among ( "\u00EFsques", 161, 1 ),
		            new Among ( "aves", 142, 1 ),
		            new Among ( "ixes", 142, 1 ),
		            new Among ( "eixes", 165, 1 ),
		            new Among ( "\u00EFxes", 142, 1 ),
		            new Among ( "\u00EFes", 142, 1 ),
		            new Among ( "abais", -1, 1 ),
		            new Among ( "arais", -1, 1 ),
		            new Among ( "ierais", -1, 1 ),
		            new Among ( "\u00EDais", -1, 1 ),
		            new Among ( "ar\u00EDais", 172, 1 ),
		            new Among ( "er\u00EDais", 172, 1 ),
		            new Among ( "ir\u00EDais", 172, 1 ),
		            new Among ( "aseis", -1, 1 ),
		            new Among ( "ieseis", -1, 1 ),
		            new Among ( "asteis", -1, 1 ),
		            new Among ( "isteis", -1, 1 ),
		            new Among ( "inis", -1, 1 ),
		            new Among ( "sis", -1, 1 ),
		            new Among ( "isis", 181, 1 ),
		            new Among ( "assis", 181, 1 ),
		            new Among ( "essis", 181, 1 ),
		            new Among ( "issis", 181, 1 ),
		            new Among ( "\u00EFssis", 181, 1 ),
		            new Among ( "esquis", -1, 1 ),
		            new Among ( "eixis", -1, 1 ),
		            new Among ( "itzis", -1, 1 ),
		            new Among ( "\u00E1is", -1, 1 ),
		            new Among ( "ar\u00E9is", -1, 1 ),
		            new Among ( "er\u00E9is", -1, 1 ),
		            new Among ( "ir\u00E9is", -1, 1 ),
		            new Among ( "ams", -1, 1 ),
		            new Among ( "ados", -1, 1 ),
		            new Among ( "idos", -1, 1 ),
		            new Among ( "amos", -1, 1 ),
		            new Among ( "\u00E1bamos", 197, 1 ),
		            new Among ( "\u00E1ramos", 197, 1 ),
		            new Among ( "i\u00E9ramos", 197, 1 ),
		            new Among ( "\u00EDamos", 197, 1 ),
		            new Among ( "ar\u00EDamos", 201, 1 ),
		            new Among ( "er\u00EDamos", 201, 1 ),
		            new Among ( "ir\u00EDamos", 201, 1 ),
		            new Among ( "aremos", -1, 1 ),
		            new Among ( "eremos", -1, 1 ),
		            new Among ( "iremos", -1, 1 ),
		            new Among ( "\u00E1semos", -1, 1 ),
		            new Among ( "i\u00E9semos", -1, 1 ),
		            new Among ( "imos", -1, 1 ),
		            new Among ( "adors", -1, 1 ),
		            new Among ( "ass", -1, 1 ),
		            new Among ( "erass", 212, 1 ),
		            new Among ( "ess", -1, 1 ),
		            new Among ( "ats", -1, 1 ),
		            new Among ( "its", -1, 1 ),
		            new Among ( "ents", -1, 1 ),
		            new Among ( "\u00E0s", -1, 1 ),
		            new Among ( "ar\u00E0s", 218, 1 ),
		            new Among ( "ir\u00E0s", 218, 1 ),
		            new Among ( "ar\u00E1s", -1, 1 ),
		            new Among ( "er\u00E1s", -1, 1 ),
		            new Among ( "ir\u00E1s", -1, 1 ),
		            new Among ( "\u00E9s", -1, 1 ),
		            new Among ( "ar\u00E9s", 224, 1 ),
		            new Among ( "\u00EDs", -1, 1 ),
		            new Among ( "i\u00EFs", -1, 1 ),
		            new Among ( "at", -1, 1 ),
		            new Among ( "it", -1, 1 ),
		            new Among ( "ant", -1, 1 ),
		            new Among ( "ent", -1, 1 ),
		            new Among ( "int", -1, 1 ),
		            new Among ( "ut", -1, 1 ),
		            new Among ( "\u00EFt", -1, 1 ),
		            new Among ( "au", -1, 1 ),
		            new Among ( "erau", 235, 1 ),
		            new Among ( "ieu", -1, 1 ),
		            new Among ( "ineu", -1, 1 ),
		            new Among ( "areu", -1, 1 ),
		            new Among ( "ireu", -1, 1 ),
		            new Among ( "\u00E0reu", -1, 1 ),
		            new Among ( "\u00EDreu", -1, 1 ),
		            new Among ( "asseu", -1, 1 ),
		            new Among ( "esseu", -1, 1 ),
		            new Among ( "eresseu", 244, 1 ),
		            new Among ( "\u00E0sseu", -1, 1 ),
		            new Among ( "\u00E9sseu", -1, 1 ),
		            new Among ( "igueu", -1, 1 ),
		            new Among ( "\u00EFgueu", -1, 1 ),
		            new Among ( "\u00E0veu", -1, 1 ),
		            new Among ( "\u00E1veu", -1, 1 ),
		            new Among ( "itzeu", -1, 1 ),
		            new Among ( "\u00ECeu", -1, 1 ),
		            new Among ( "ir\u00ECeu", 253, 1 ),
		            new Among ( "\u00EDeu", -1, 1 ),
		            new Among ( "ar\u00EDeu", 255, 1 ),
		            new Among ( "ir\u00EDeu", 255, 1 ),
		            new Among ( "assiu", -1, 1 ),
		            new Among ( "issiu", -1, 1 ),
		            new Among ( "\u00E0ssiu", -1, 1 ),
		            new Among ( "\u00E8ssiu", -1, 1 ),
		            new Among ( "\u00E9ssiu", -1, 1 ),
		            new Among ( "\u00EDssiu", -1, 1 ),
		            new Among ( "\u00EFu", -1, 1 ),
		            new Among ( "ix", -1, 1 ),
		            new Among ( "eix", 265, 1 ),
		            new Among ( "\u00EFx", -1, 1 ),
		            new Among ( "itz", -1, 1 ),
		            new Among ( "i\u00E0", -1, 1 ),
		            new Among ( "ar\u00E0", -1, 1 ),
		            new Among ( "ir\u00E0", -1, 1 ),
		            new Among ( "itz\u00E0", -1, 1 ),
		            new Among ( "ar\u00E1", -1, 1 ),
		            new Among ( "er\u00E1", -1, 1 ),
		            new Among ( "ir\u00E1", -1, 1 ),
		            new Among ( "ir\u00E8", -1, 1 ),
		            new Among ( "ar\u00E9", -1, 1 ),
		            new Among ( "er\u00E9", -1, 1 ),
		            new Among ( "ir\u00E9", -1, 1 ),
		            new Among ( "\u00ED", -1, 1 ),
		            new Among ( "i\u00EF", -1, 1 ),
		            new Among ( "i\u00F3", -1, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "e", -1, 1 ),
		            new Among ( "i", -1, 1 ),
		            new Among ( "\u00EFn", -1, 1 ),
		            new Among ( "o", -1, 1 ),
		            new Among ( "ir", -1, 1 ),
		            new Among ( "s", -1, 1 ),
		            new Among ( "is", 6, 1 ),
		            new Among ( "os", 6, 1 ),
		            new Among ( "\u00EFs", 6, 1 ),
		            new Among ( "it", -1, 1 ),
		            new Among ( "eu", -1, 1 ),
		            new Among ( "iu", -1, 1 ),
		            new Among ( "iqu", -1, 2 ),
		            new Among ( "itz", -1, 1 ),
		            new Among ( "\u00E0", -1, 1 ),
		            new Among ( "\u00E1", -1, 1 ),
		            new Among ( "\u00E9", -1, 1 ),
		            new Among ( "\u00EC", -1, 1 ),
		            new Among ( "\u00ED", -1, 1 ),
		            new Among ( "\u00EF", -1, 1 ),
		            new Among ( "\u00F3", -1, 1 )
		        ];
		
		        var g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 129, 81, 6, 10 ];
		
		        var I_p2;
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                golab1: while(true)
		                {
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 97, 252)))
		                        {
		                            break lab2;
		                        }
		                        break golab1;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                golab3: while(true)
		                {
		                    lab4: do {
		                        if (!(sbp.out_grouping(g_v, 97, 252)))
		                        {
		                            break lab4;
		                        }
		                        break golab3;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab5: while(true)
		                {
		                    lab6: do {
		                        if (!(sbp.in_grouping(g_v, 97, 252)))
		                        {
		                            break lab6;
		                        }
		                        break golab5;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                golab7: while(true)
		                {
		                    lab8: do {
		                        if (!(sbp.out_grouping(g_v, 97, 252)))
		                        {
		                            break lab8;
		                        }
		                        break golab7;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            return true;
		        }
		
		        function r_cleaning() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_0, 13);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("a");
		                            break;
		                        case 2:
		                            sbp.slice_from("a");
		                            break;
		                        case 3:
		                            sbp.slice_from("e");
		                            break;
		                        case 4:
		                            sbp.slice_from("e");
		                            break;
		                        case 5:
		                            sbp.slice_from("i");
		                            break;
		                        case 6:
		                            sbp.slice_from("i");
		                            break;
		                        case 7:
		                            sbp.slice_from("o");
		                            break;
		                        case 8:
		                            sbp.slice_from("o");
		                            break;
		                        case 9:
		                            sbp.slice_from("u");
		                            break;
		                        case 10:
		                            sbp.slice_from("u");
		                            break;
		                        case 11:
		                            sbp.slice_from("i");
		                            break;
		                        case 12:
		                            sbp.slice_from(".");
		                            break;
		                        case 13:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_attached_pronoun() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_1, 39);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_standard_suffix() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 200);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 3:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("log");
		                    break;
		                case 4:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ic");
		                    break;
		                case 5:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("c");
		                    break;
		            }
		            return true;
		        }
		
		        function r_verb_suffix() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 283);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_residual_suffix() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_4, 22);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ic");
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_attached_pronoun())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                lab3: do {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        if (!r_standard_suffix())
		                        {
		                            break lab4;
		                        }
		                        break lab3;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                    if (!r_verb_suffix())
		                    {
		                        break lab2;
		                    }
		                } while (false);
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_5 = sbp.limit - sbp.cursor;
		            lab5: do {
		                if (!r_residual_suffix())
		                {
		                    break lab5;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            sbp.cursor = sbp.limit_backward;            v_6 = sbp.cursor;
		            lab6: do {
		                if (!r_cleaning())
		                {
		                    break lab6;
		                }
		            } while (false);
		            sbp.cursor = v_6;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		czechStemmer : function() {

		        var a_0 = [
		            new Among ( "ce", -1, 1 ),
		            new Among ( "ze", -1, 2 ),
		            new Among ( "\u017Ee", -1, 2 ),
		            new Among ( "ci", -1, 1 ),
		            new Among ( "\u010Dti", -1, 3 ),
		            new Among ( "\u0161ti", -1, 4 ),
		            new Among ( "zi", -1, 2 ),
		            new Among ( "\u010Di", -1, 1 ),
		            new Among ( "\u017Ei", -1, 2 ),
		            new Among ( "\u010Dt\u00E9", -1, 3 ),
		            new Among ( "\u0161t\u00E9", -1, 4 ),
		            new Among ( "\u010D", -1, 1 ),
		            new Among ( "\u010Dt\u011B", -1, 3 ),
		            new Among ( "\u0161t\u011B", -1, 4 )
		        ];
		
		        var a_1 = [
		            new Among ( "in", -1, 2 ),
		            new Among ( "ov", -1, 1 ),
		            new Among ( "\u016Fv", -1, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "ama", 0, 1 ),
		            new Among ( "ata", 0, 1 ),
		            new Among ( "e", -1, 2 ),
		            new Among ( "\u011Bte", 3, 2 ),
		            new Among ( "ech", -1, 2 ),
		            new Among ( "atech", 5, 1 ),
		            new Among ( "ich", -1, 2 ),
		            new Among ( "\u00E1ch", -1, 1 ),
		            new Among ( "\u00EDch", -1, 2 ),
		            new Among ( "\u00FDch", -1, 1 ),
		            new Among ( "i", -1, 2 ),
		            new Among ( "mi", 11, 1 ),
		            new Among ( "ami", 12, 1 ),
		            new Among ( "emi", 12, 2 ),
		            new Among ( "\u00EDmi", 12, 2 ),
		            new Among ( "\u00FDmi", 12, 1 ),
		            new Among ( "\u011Bmi", 12, 2 ),
		            new Among ( "\u011Bti", 11, 2 ),
		            new Among ( "ovi", 11, 1 ),
		            new Among ( "em", -1, 3 ),
		            new Among ( "\u011Btem", 20, 1 ),
		            new Among ( "\u00E1m", -1, 1 ),
		            new Among ( "\u00E9m", -1, 2 ),
		            new Among ( "\u00EDm", -1, 2 ),
		            new Among ( "\u00FDm", -1, 1 ),
		            new Among ( "at\u016Fm", -1, 1 ),
		            new Among ( "o", -1, 1 ),
		            new Among ( "iho", 27, 2 ),
		            new Among ( "\u00E9ho", 27, 2 ),
		            new Among ( "\u00EDho", 27, 2 ),
		            new Among ( "es", -1, 2 ),
		            new Among ( "os", -1, 1 ),
		            new Among ( "us", -1, 1 ),
		            new Among ( "at", -1, 1 ),
		            new Among ( "u", -1, 1 ),
		            new Among ( "imu", 35, 2 ),
		            new Among ( "\u00E9mu", 35, 2 ),
		            new Among ( "ou", 35, 1 ),
		            new Among ( "y", -1, 1 ),
		            new Among ( "aty", 39, 1 ),
		            new Among ( "\u00E1", -1, 1 ),
		            new Among ( "\u00E9", -1, 1 ),
		            new Among ( "ov\u00E9", 42, 1 ),
		            new Among ( "\u00ED", -1, 2 ),
		            new Among ( "\u00FD", -1, 1 ),
		            new Among ( "\u011B", -1, 2 ),
		            new Among ( "\u016F", -1, 1 )
		        ];
		
		        var a_3 = [
		            new Among ( "ob", -1, 1 ),
		            new Among ( "itb", -1, 2 ),
		            new Among ( "ec", -1, 3 ),
		            new Among ( "inec", 2, 2 ),
		            new Among ( "obinec", 3, 1 ),
		            new Among ( "ovec", 2, 1 ),
		            new Among ( "ic", -1, 2 ),
		            new Among ( "enic", 6, 3 ),
		            new Among ( "och", -1, 1 ),
		            new Among ( "\u00E1sek", -1, 1 ),
		            new Among ( "nk", -1, 1 ),
		            new Among ( "isk", -1, 2 ),
		            new Among ( "ovisk", 11, 1 ),
		            new Among ( "tk", -1, 1 ),
		            new Among ( "vk", -1, 1 ),
		            new Among ( "n\u00EDk", -1, 1 ),
		            new Among ( "ovn\u00EDk", 15, 1 ),
		            new Among ( "ov\u00EDk", -1, 1 ),
		            new Among ( "\u010Dk", -1, 1 ),
		            new Among ( "i\u0161k", -1, 2 ),
		            new Among ( "u\u0161k", -1, 1 ),
		            new Among ( "dl", -1, 1 ),
		            new Among ( "itel", -1, 2 ),
		            new Among ( "ul", -1, 1 ),
		            new Among ( "an", -1, 1 ),
		            new Among ( "\u010Dan", 24, 1 ),
		            new Among ( "en", -1, 3 ),
		            new Among ( "in", -1, 2 ),
		            new Among ( "\u0161tin", 27, 1 ),
		            new Among ( "ovin", 27, 1 ),
		            new Among ( "teln", -1, 1 ),
		            new Among ( "\u00E1rn", -1, 1 ),
		            new Among ( "\u00EDrn", -1, 6 ),
		            new Among ( "oun", -1, 1 ),
		            new Among ( "loun", 33, 1 ),
		            new Among ( "ovn", -1, 1 ),
		            new Among ( "yn", -1, 1 ),
		            new Among ( "kyn", 36, 1 ),
		            new Among ( "\u00E1n", -1, 1 ),
		            new Among ( "i\u00E1n", 38, 2 ),
		            new Among ( "\u00EDn", -1, 6 ),
		            new Among ( "\u010Dn", -1, 1 ),
		            new Among ( "\u011Bn", -1, 5 ),
		            new Among ( "as", -1, 1 ),
		            new Among ( "it", -1, 2 ),
		            new Among ( "ot", -1, 1 ),
		            new Among ( "ist", -1, 2 ),
		            new Among ( "ost", -1, 1 ),
		            new Among ( "nost", 47, 1 ),
		            new Among ( "out", -1, 1 ),
		            new Among ( "ovi\u0161t", -1, 1 ),
		            new Among ( "iv", -1, 2 ),
		            new Among ( "ov", -1, 1 ),
		            new Among ( "tv", -1, 1 ),
		            new Among ( "ctv", 53, 1 ),
		            new Among ( "stv", 53, 1 ),
		            new Among ( "ovstv", 55, 1 ),
		            new Among ( "ovtv", 53, 1 ),
		            new Among ( "a\u010D", -1, 1 ),
		            new Among ( "\u00E1\u010D", -1, 1 ),
		            new Among ( "o\u0148", -1, 1 ),
		            new Among ( "\u00E1\u0159", -1, 1 ),
		            new Among ( "k\u00E1\u0159", 61, 1 ),
		            new Among ( "ion\u00E1\u0159", 61, 2 ),
		            new Among ( "\u00E9\u0159", -1, 4 ),
		            new Among ( "n\u00E9\u0159", 64, 1 ),
		            new Among ( "\u00ED\u0159", -1, 6 ),
		            new Among ( "ou\u0161", -1, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "c", -1, 1 ),
		            new Among ( "k", -1, 1 ),
		            new Among ( "l", -1, 1 ),
		            new Among ( "n", -1, 1 ),
		            new Among ( "t", -1, 1 ),
		            new Among ( "\u010D", -1, 1 )
		        ];
		
		        var a_5 = [
		            new Among ( "isk", -1, 2 ),
		            new Among ( "\u00E1k", -1, 1 ),
		            new Among ( "izn", -1, 2 ),
		            new Among ( "ajzn", -1, 1 )
		        ];
		
		        var a_6 = [
		            new Among ( "k", -1, 1 ),
		            new Among ( "ak", 0, 7 ),
		            new Among ( "ek", 0, 2 ),
		            new Among ( "anek", 2, 1 ),
		            new Among ( "enek", 2, 2 ),
		            new Among ( "inek", 2, 4 ),
		            new Among ( "onek", 2, 1 ),
		            new Among ( "unek", 2, 1 ),
		            new Among ( "\u00E1nek", 2, 1 ),
		            new Among ( "a\u010Dek", 2, 1 ),
		            new Among ( "e\u010Dek", 2, 2 ),
		            new Among ( "i\u010Dek", 2, 4 ),
		            new Among ( "o\u010Dek", 2, 1 ),
		            new Among ( "u\u010Dek", 2, 1 ),
		            new Among ( "\u00E1\u010Dek", 2, 1 ),
		            new Among ( "\u00E9\u010Dek", 2, 3 ),
		            new Among ( "\u00ED\u010Dek", 2, 5 ),
		            new Among ( "ou\u0161ek", 2, 1 ),
		            new Among ( "ik", 0, 4 ),
		            new Among ( "ank", 0, 1 ),
		            new Among ( "enk", 0, 1 ),
		            new Among ( "ink", 0, 1 ),
		            new Among ( "onk", 0, 1 ),
		            new Among ( "unk", 0, 1 ),
		            new Among ( "\u00E1nk", 0, 1 ),
		            new Among ( "\u00E9nk", 0, 1 ),
		            new Among ( "\u00EDnk", 0, 1 ),
		            new Among ( "ok", 0, 8 ),
		            new Among ( "\u00E1tk", 0, 1 ),
		            new Among ( "uk", 0, 9 ),
		            new Among ( "\u00E1k", 0, 6 ),
		            new Among ( "\u00E9k", 0, 3 ),
		            new Among ( "\u00EDk", 0, 5 ),
		            new Among ( "a\u010Dk", 0, 1 ),
		            new Among ( "e\u010Dk", 0, 1 ),
		            new Among ( "i\u010Dk", 0, 1 ),
		            new Among ( "o\u010Dk", 0, 1 ),
		            new Among ( "u\u010Dk", 0, 1 ),
		            new Among ( "\u00E1\u010Dk", 0, 1 ),
		            new Among ( "\u00E9\u010Dk", 0, 1 ),
		            new Among ( "\u00ED\u010Dk", 0, 1 ),
		            new Among ( "u\u0161k", 0, 1 )
		        ];
		
		        var a_7 = [
		            new Among ( "ej\u0161", -1, 2 ),
		            new Among ( "\u011Bj\u0161", -1, 1 )
		        ];
		
		        var g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 18, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64 ];
		
		        var I_p1;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            I_pV = sbp.limit;
		            I_p1 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                golab1: while(true)
		                {
		                    lab2: do {
		                        if (!(sbp.out_grouping(g_v, 97, 367)))
		                        {
		                            break lab2;
		                        }
		                        break golab1;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_pV = sbp.cursor;
		                golab3: while(true)
		                {
		                    lab4: do {
		                        if (!(sbp.out_grouping(g_v, 97, 367)))
		                        {
		                            break lab4;
		                        }
		                        break golab3;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                golab5: while(true)
		                {
		                    lab6: do {
		                        if (!(sbp.in_grouping(g_v, 97, 367)))
		                        {
		                            break lab6;
		                        }
		                        break golab5;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            return true;
		        }
		
		        function r_RV() {
		            if (!(I_pV <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_palatalise() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 14);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_RV())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("k");
		                    break;
		                case 2:
		                    sbp.slice_from("h");
		                    break;
		                case 3:
		                    sbp.slice_from("ck");
		                    break;
		                case 4:
		                    sbp.slice_from("sk");
		                    break;
		            }
		            return true;
		        }
		
		        function r_do_possessive() {
		            var among_var;
		            var v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_1, 3);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_RV())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    v_1 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        if (!r_palatalise())
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                    } while (false);
		                    break;
		            }
		            return true;
		        }
		
		        function r_do_case() {
		            var among_var;
		            var v_1;
		            var v_2;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 48);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    v_1 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        if (!r_palatalise())
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                    } while (false);
		                    break;
		                case 3:
		                    sbp.slice_from("e");
		                    v_2 = sbp.limit - sbp.cursor;
		                    lab1: do {
		                        if (!r_palatalise())
		                        {
		                            sbp.cursor = sbp.limit - v_2;
		                            break lab1;
		                        }
		                    } while (false);
		                    break;
		            }
		            return true;
		        }
		
		        function r_do_derivational() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 68);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("i");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 3:
		                    sbp.slice_from("e");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 4:
		                    sbp.slice_from("\u00E9");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 5:
		                    sbp.slice_from("\u011B");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 6:
		                    sbp.slice_from("\u00ED");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		            }
		            return true;
		        }
		
		        function r_do_deriv_single() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_4, 6);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_do_augmentative() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_5, 4);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("i");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		            }
		            return true;
		        }
		
		        function r_do_diminutive() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 42);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("e");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 3:
		                    sbp.slice_from("\u00E9");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 4:
		                    sbp.slice_from("i");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 5:
		                    sbp.slice_from("\u00ED");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 6:
		                    sbp.slice_from("\u00E1");
		                    break;
		                case 7:
		                    sbp.slice_from("a");
		                    break;
		                case 8:
		                    sbp.slice_from("o");
		                    break;
		                case 9:
		                    sbp.slice_from("u");
		                    break;
		            }
		            return true;
		        }
		
		        function r_do_comparative() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 2);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("\u011B");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		                case 2:
		                    sbp.slice_from("e");
		                    if (!r_palatalise())
		                    {
		                        return false;
		                    }
		                    break;
		            }
		            return true;
		        }
		
		        function r_do_aggressive() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                if (!r_do_comparative())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_1;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_do_diminutive())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_do_augmentative())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            lab3: do {
		                v_4 = sbp.limit - sbp.cursor;
		                lab4: do {
		                    if (!r_do_derivational())
		                    {
		                        break lab4;
		                    }
		                    break lab3;
		                } while (false);
		                sbp.cursor = sbp.limit - v_4;
		                if (!r_do_deriv_single())
		                {
		                    return false;
		                }
		            } while (false);
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            if (!r_do_case())
		            {
		                return false;
		            }
		            if (!r_do_possessive())
		            {
		                return false;
		            }
		            if (!r_do_aggressive())
		            {
		                return false;
		            }
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		danishStemmer : function() {

		        var a_0 = [
		            new Among ( "hed", -1, 1 ),
		            new Among ( "ethed", 0, 1 ),
		            new Among ( "ered", -1, 1 ),
		            new Among ( "e", -1, 1 ),
		            new Among ( "erede", 3, 1 ),
		            new Among ( "ende", 3, 1 ),
		            new Among ( "erende", 5, 1 ),
		            new Among ( "ene", 3, 1 ),
		            new Among ( "erne", 3, 1 ),
		            new Among ( "ere", 3, 1 ),
		            new Among ( "en", -1, 1 ),
		            new Among ( "heden", 10, 1 ),
		            new Among ( "eren", 10, 1 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "heder", 13, 1 ),
		            new Among ( "erer", 13, 1 ),
		            new Among ( "s", -1, 2 ),
		            new Among ( "heds", 16, 1 ),
		            new Among ( "es", 16, 1 ),
		            new Among ( "endes", 18, 1 ),
		            new Among ( "erendes", 19, 1 ),
		            new Among ( "enes", 18, 1 ),
		            new Among ( "ernes", 18, 1 ),
		            new Among ( "eres", 18, 1 ),
		            new Among ( "ens", 16, 1 ),
		            new Among ( "hedens", 24, 1 ),
		            new Among ( "erens", 24, 1 ),
		            new Among ( "ers", 16, 1 ),
		            new Among ( "ets", 16, 1 ),
		            new Among ( "erets", 28, 1 ),
		            new Among ( "et", -1, 1 ),
		            new Among ( "eret", 30, 1 )
		        ];
		
		        var a_1 = [
		            new Among ( "gd", -1, -1 ),
		            new Among ( "dt", -1, -1 ),
		            new Among ( "gt", -1, -1 ),
		            new Among ( "kt", -1, -1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ig", -1, 1 ),
		            new Among ( "lig", 0, 1 ),
		            new Among ( "elig", 1, 1 ),
		            new Among ( "els", -1, 1 ),
		            new Among ( "l\u00F8st", -1, 2 )
		        ];
		
		        var g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 128 ];
		
		        var g_s_ending = [239, 254, 42, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16 ];
		
		        var I_x;
		        var I_p1;
		        var S_ch = "";
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            I_p1 = sbp.limit;
		            v_1 = sbp.cursor;
		            {
		                var c = sbp.cursor + 3;
		                if (0 > c || c > sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor = c;
		            }
		            I_x = sbp.cursor;
		            sbp.cursor = v_1;
		            golab0: while(true)
		            {
		                v_2 = sbp.cursor;
		                lab1: do {
		                    if (!(sbp.in_grouping(g_v, 97, 248)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = v_2;
		                    break golab0;
		                } while (false);
		                sbp.cursor = v_2;
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab2: while(true)
		            {
		                lab3: do {
		                    if (!(sbp.out_grouping(g_v, 97, 248)))
		                    {
		                        break lab3;
		                    }
		                    break golab2;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p1 = sbp.cursor;
		            lab4: do {
		                if (!(I_p1 < I_x))
		                {
		                    break lab4;
		                }
		                I_p1 = I_x;
		            } while (false);
		            return true;
		        }
		
		        function r_main_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 32);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!(sbp.in_grouping_b(g_s_ending, 97, 229)))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_consonant_pair() {
		            var v_1;
		            var v_2;
		            var v_3;
		            v_1 = sbp.limit - sbp.cursor;
		            v_2 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_3 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_2;
		            sbp.ket = sbp.cursor;
		            if (sbp.find_among_b(a_1, 4) == 0)
		            {
		                sbp.limit_backward = v_3;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_3;
		            sbp.cursor = sbp.limit - v_1;
		            if (sbp.cursor <= sbp.limit_backward)
		            {
		                return false;
		            }
		            sbp.cursor--;
		            sbp.bra = sbp.cursor;
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_other_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(2, "st")))
		                {
		                    break lab0;
		                }
		                sbp.bra = sbp.cursor;
		                if (!(sbp.eq_s_b(2, "ig")))
		                {
		                    break lab0;
		                }
		                sbp.slice_del();
		            } while (false);
		            sbp.cursor = sbp.limit - v_1;
		            v_2 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_3 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_2;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 5);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_3;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_3;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab1: do {
		                        if (!r_consonant_pair())
		                        {
		                            break lab1;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                    break;
		                case 2:
		                    sbp.slice_from("l\u00F8s");
		                    break;
		            }
		            return true;
		        }
		
		        function r_undouble() {
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            if (!(sbp.out_grouping_b(g_v, 97, 248)))
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            S_ch = sbp.slice_to(S_ch);
		            sbp.limit_backward = v_2;
		            if (!(sbp.eq_v_b(S_ch)))
		            {
		                return false;
		            }
		            sbp.slice_del();
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_main_suffix())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_consonant_pair())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                if (!r_other_suffix())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            v_5 = sbp.limit - sbp.cursor;
		            lab4: do {
		                if (!r_undouble())
		                {
		                    break lab4;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		dutchStemmer : function() {

		        var a_0 = [
		            new Among ( "", -1, 6 ),
		            new Among ( "\u00E1", 0, 1 ),
		            new Among ( "\u00E4", 0, 1 ),
		            new Among ( "\u00E9", 0, 2 ),
		            new Among ( "\u00EB", 0, 2 ),
		            new Among ( "\u00ED", 0, 3 ),
		            new Among ( "\u00EF", 0, 3 ),
		            new Among ( "\u00F3", 0, 4 ),
		            new Among ( "\u00F6", 0, 4 ),
		            new Among ( "\u00FA", 0, 5 ),
		            new Among ( "\u00FC", 0, 5 )
		        ];
		
		        var a_1 = [
		            new Among ( "", -1, 3 ),
		            new Among ( "I", 0, 2 ),
		            new Among ( "Y", 0, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "dd", -1, -1 ),
		            new Among ( "kk", -1, -1 ),
		            new Among ( "tt", -1, -1 )
		        ];
		
		        var a_3 = [
		            new Among ( "ene", -1, 2 ),
		            new Among ( "se", -1, 3 ),
		            new Among ( "en", -1, 2 ),
		            new Among ( "heden", 2, 1 ),
		            new Among ( "s", -1, 3 )
		        ];
		
		        var a_4 = [
		            new Among ( "end", -1, 1 ),
		            new Among ( "ig", -1, 2 ),
		            new Among ( "ing", -1, 1 ),
		            new Among ( "lijk", -1, 3 ),
		            new Among ( "baar", -1, 4 ),
		            new Among ( "bar", -1, 5 )
		        ];
		
		        var a_5 = [
		            new Among ( "aa", -1, -1 ),
		            new Among ( "ee", -1, -1 ),
		            new Among ( "oo", -1, -1 ),
		            new Among ( "uu", -1, -1 )
		        ];
		
		        var g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128 ];
		
		        var g_v_I = [1, 0, 0, 17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128 ];
		
		        var g_v_j = [17, 67, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128 ];
		
		        var I_p2;
		        var I_p1;
		        var B_e_found;
		
		        var sbp = new SnowballProgram();
		
		        function r_prelude() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            v_1 = sbp.cursor;
		            replab0: while(true)
		            {
		                v_2 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_0, 11);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("a");
		                            break;
		                        case 2:
		                            sbp.slice_from("e");
		                            break;
		                        case 3:
		                            sbp.slice_from("i");
		                            break;
		                        case 4:
		                            sbp.slice_from("o");
		                            break;
		                        case 5:
		                            sbp.slice_from("u");
		                            break;
		                        case 6:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_2;
		                break replab0;
		            }
		            sbp.cursor = v_1;
		            v_3 = sbp.cursor;
		            lab2: do {
		                sbp.bra = sbp.cursor;
		                if (!(sbp.eq_s(1, "y")))
		                {
		                    sbp.cursor = v_3;
		                    break lab2;
		                }
		                sbp.ket = sbp.cursor;
		                sbp.slice_from("Y");
		            } while (false);
		            replab3: while(true)
		            {
		                v_4 = sbp.cursor;
		                lab4: do {
		                    golab5: while(true)
		                    {
		                        v_5 = sbp.cursor;
		                        lab6: do {
		                            if (!(sbp.in_grouping(g_v, 97, 232)))
		                            {
		                                break lab6;
		                            }
		                            sbp.bra = sbp.cursor;
		                            lab7: do {
		                                v_6 = sbp.cursor;
		                                lab8: do {
		                                    if (!(sbp.eq_s(1, "i")))
		                                    {
		                                        break lab8;
		                                    }
		                                    sbp.ket = sbp.cursor;
		                                    if (!(sbp.in_grouping(g_v, 97, 232)))
		                                    {
		                                        break lab8;
		                                    }
		                                    sbp.slice_from("I");
		                                    break lab7;
		                                } while (false);
		                                sbp.cursor = v_6;
		                                if (!(sbp.eq_s(1, "y")))
		                                {
		                                    break lab6;
		                                }
		                                sbp.ket = sbp.cursor;
		                                sbp.slice_from("Y");
		                            } while (false);
		                            sbp.cursor = v_5;
		                            break golab5;
		                        } while (false);
		                        sbp.cursor = v_5;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab4;
		                        }
		                        sbp.cursor++;
		                    }
		                    continue replab3;
		                } while (false);
		                sbp.cursor = v_4;
		                break replab3;
		            }
		            return true;
		        }
		
		        function r_mark_regions() {
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            golab0: while(true)
		            {
		                lab1: do {
		                    if (!(sbp.in_grouping(g_v, 97, 232)))
		                    {
		                        break lab1;
		                    }
		                    break golab0;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab2: while(true)
		            {
		                lab3: do {
		                    if (!(sbp.out_grouping(g_v, 97, 232)))
		                    {
		                        break lab3;
		                    }
		                    break golab2;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p1 = sbp.cursor;
		            lab4: do {
		                if (!(I_p1 < 3))
		                {
		                    break lab4;
		                }
		                I_p1 = 3;
		            } while (false);
		            golab5: while(true)
		            {
		                lab6: do {
		                    if (!(sbp.in_grouping(g_v, 97, 232)))
		                    {
		                        break lab6;
		                    }
		                    break golab5;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab7: while(true)
		            {
		                lab8: do {
		                    if (!(sbp.out_grouping(g_v, 97, 232)))
		                    {
		                        break lab8;
		                    }
		                    break golab7;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p2 = sbp.cursor;
		            return true;
		        }
		
		        function r_postlude() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_1, 3);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("y");
		                            break;
		                        case 2:
		                            sbp.slice_from("i");
		                            break;
		                        case 3:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_undouble() {
		            var v_1;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.find_among_b(a_2, 3) == 0)
		            {
		                return false;
		            }
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            if (sbp.cursor <= sbp.limit_backward)
		            {
		                return false;
		            }
		            sbp.cursor--;
		            sbp.bra = sbp.cursor;
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_e_ending() {
		            var v_1;
		            B_e_found = false;
		            sbp.ket = sbp.cursor;
		            if (!(sbp.eq_s_b(1, "e")))
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            v_1 = sbp.limit - sbp.cursor;
		            if (!(sbp.out_grouping_b(g_v, 97, 232)))
		            {
		                return false;
		            }
		            sbp.cursor = sbp.limit - v_1;
		            sbp.slice_del();
		            B_e_found = true;
		            if (!r_undouble())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_en_ending() {
		            var v_1;
		            var v_2;
		            if (!r_R1())
		            {
		                return false;
		            }
		            v_1 = sbp.limit - sbp.cursor;
		            if (!(sbp.out_grouping_b(g_v, 97, 232)))
		            {
		                return false;
		            }
		            sbp.cursor = sbp.limit - v_1;
		            {
		                v_2 = sbp.limit - sbp.cursor;
		                lab0: do {
		                    if (!(sbp.eq_s_b(3, "gem")))
		                    {
		                        break lab0;
		                    }
		                    return false;
		                } while (false);
		                sbp.cursor = sbp.limit - v_2;
		            }
		            sbp.slice_del();
		            if (!r_undouble())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_standard_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                sbp.ket = sbp.cursor;
		                among_var = sbp.find_among_b(a_3, 5);
		                if (among_var == 0)
		                {
		                    break lab0;
		                }
		                sbp.bra = sbp.cursor;
		                switch(among_var) {
		                    case 0:
		                        break lab0;
		                    case 1:
		                        if (!r_R1())
		                        {
		                            break lab0;
		                        }
		                        sbp.slice_from("heid");
		                        break;
		                    case 2:
		                        if (!r_en_ending())
		                        {
		                            break lab0;
		                        }
		                        break;
		                    case 3:
		                        if (!r_R1())
		                        {
		                            break lab0;
		                        }
		                        if (!(sbp.out_grouping_b(g_v_j, 97, 232)))
		                        {
		                            break lab0;
		                        }
		                        sbp.slice_del();
		                        break;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_1;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_e_ending())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(4, "heid")))
		                {
		                    break lab2;
		                }
		                sbp.bra = sbp.cursor;
		                if (!r_R2())
		                {
		                    break lab2;
		                }
		                {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab3: do {
		                        if (!(sbp.eq_s_b(1, "c")))
		                        {
		                            break lab3;
		                        }
		                        break lab2;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                }
		                sbp.slice_del();
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(2, "en")))
		                {
		                    break lab2;
		                }
		                sbp.bra = sbp.cursor;
		                if (!r_en_ending())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_5 = sbp.limit - sbp.cursor;
		            lab4: do {
		                sbp.ket = sbp.cursor;
		                among_var = sbp.find_among_b(a_4, 6);
		                if (among_var == 0)
		                {
		                    break lab4;
		                }
		                sbp.bra = sbp.cursor;
		                switch(among_var) {
		                    case 0:
		                        break lab4;
		                    case 1:
		                        if (!r_R2())
		                        {
		                            break lab4;
		                        }
		                        sbp.slice_del();
		                        lab5: do {
		                            v_6 = sbp.limit - sbp.cursor;
		                            lab6: do {
		                                sbp.ket = sbp.cursor;
		                                if (!(sbp.eq_s_b(2, "ig")))
		                                {
		                                    break lab6;
		                                }
		                                sbp.bra = sbp.cursor;
		                                if (!r_R2())
		                                {
		                                    break lab6;
		                                }
		                                {
		                                    v_7 = sbp.limit - sbp.cursor;
		                                    lab7: do {
		                                        if (!(sbp.eq_s_b(1, "e")))
		                                        {
		                                            break lab7;
		                                        }
		                                        break lab6;
		                                    } while (false);
		                                    sbp.cursor = sbp.limit - v_7;
		                                }
		                                sbp.slice_del();
		                                break lab5;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_6;
		                            if (!r_undouble())
		                            {
		                                break lab4;
		                            }
		                        } while (false);
		                        break;
		                    case 2:
		                        if (!r_R2())
		                        {
		                            break lab4;
		                        }
		                        {
		                            v_8 = sbp.limit - sbp.cursor;
		                            lab8: do {
		                                if (!(sbp.eq_s_b(1, "e")))
		                                {
		                                    break lab8;
		                                }
		                                break lab4;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_8;
		                        }
		                        sbp.slice_del();
		                        break;
		                    case 3:
		                        if (!r_R2())
		                        {
		                            break lab4;
		                        }
		                        sbp.slice_del();
		                        if (!r_e_ending())
		                        {
		                            break lab4;
		                        }
		                        break;
		                    case 4:
		                        if (!r_R2())
		                        {
		                            break lab4;
		                        }
		                        sbp.slice_del();
		                        break;
		                    case 5:
		                        if (!r_R2())
		                        {
		                            break lab4;
		                        }
		                        if (!(B_e_found))
		                        {
		                            break lab4;
		                        }
		                        sbp.slice_del();
		                        break;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            v_9 = sbp.limit - sbp.cursor;
		            lab9: do {
		                if (!(sbp.out_grouping_b(g_v_I, 73, 232)))
		                {
		                    break lab9;
		                }
		                v_10 = sbp.limit - sbp.cursor;
		                if (sbp.find_among_b(a_5, 4) == 0)
		                {
		                    break lab9;
		                }
		                if (!(sbp.out_grouping_b(g_v, 97, 232)))
		                {
		                    break lab9;
		                }
		                sbp.cursor = sbp.limit - v_10;
		                sbp.ket = sbp.cursor;
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    break lab9;
		                }
		                sbp.cursor--;
		                sbp.bra = sbp.cursor;
		                sbp.slice_del();
		            } while (false);
		            sbp.cursor = sbp.limit - v_9;
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_prelude())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                if (!r_mark_regions())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = v_2;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_standard_suffix())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            sbp.cursor = sbp.limit_backward;            v_4 = sbp.cursor;
		            lab3: do {
		                if (!r_postlude())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = v_4;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		englishStemmer : function() {

		        var a_0 = [
		            new Among ( "arsen", -1, -1 ),
		            new Among ( "commun", -1, -1 ),
		            new Among ( "gener", -1, -1 )
		        ];
		
		        var a_1 = [
		            new Among ( "'", -1, 1 ),
		            new Among ( "'s'", 0, 1 ),
		            new Among ( "'s", -1, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ied", -1, 2 ),
		            new Among ( "s", -1, 3 ),
		            new Among ( "ies", 1, 2 ),
		            new Among ( "sses", 1, 1 ),
		            new Among ( "ss", 1, -1 ),
		            new Among ( "us", 1, -1 )
		        ];
		
		        var a_3 = [
		            new Among ( "", -1, 3 ),
		            new Among ( "bb", 0, 2 ),
		            new Among ( "dd", 0, 2 ),
		            new Among ( "ff", 0, 2 ),
		            new Among ( "gg", 0, 2 ),
		            new Among ( "bl", 0, 1 ),
		            new Among ( "mm", 0, 2 ),
		            new Among ( "nn", 0, 2 ),
		            new Among ( "pp", 0, 2 ),
		            new Among ( "rr", 0, 2 ),
		            new Among ( "at", 0, 1 ),
		            new Among ( "tt", 0, 2 ),
		            new Among ( "iz", 0, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "ed", -1, 2 ),
		            new Among ( "eed", 0, 1 ),
		            new Among ( "ing", -1, 2 ),
		            new Among ( "edly", -1, 2 ),
		            new Among ( "eedly", 3, 1 ),
		            new Among ( "ingly", -1, 2 )
		        ];
		
		        var a_5 = [
		            new Among ( "anci", -1, 3 ),
		            new Among ( "enci", -1, 2 ),
		            new Among ( "ogi", -1, 13 ),
		            new Among ( "li", -1, 16 ),
		            new Among ( "bli", 3, 12 ),
		            new Among ( "abli", 4, 4 ),
		            new Among ( "alli", 3, 8 ),
		            new Among ( "fulli", 3, 14 ),
		            new Among ( "lessli", 3, 15 ),
		            new Among ( "ousli", 3, 10 ),
		            new Among ( "entli", 3, 5 ),
		            new Among ( "aliti", -1, 8 ),
		            new Among ( "biliti", -1, 12 ),
		            new Among ( "iviti", -1, 11 ),
		            new Among ( "tional", -1, 1 ),
		            new Among ( "ational", 14, 7 ),
		            new Among ( "alism", -1, 8 ),
		            new Among ( "ation", -1, 7 ),
		            new Among ( "ization", 17, 6 ),
		            new Among ( "izer", -1, 6 ),
		            new Among ( "ator", -1, 7 ),
		            new Among ( "iveness", -1, 11 ),
		            new Among ( "fulness", -1, 9 ),
		            new Among ( "ousness", -1, 10 )
		        ];
		
		        var a_6 = [
		            new Among ( "icate", -1, 4 ),
		            new Among ( "ative", -1, 6 ),
		            new Among ( "alize", -1, 3 ),
		            new Among ( "iciti", -1, 4 ),
		            new Among ( "ical", -1, 4 ),
		            new Among ( "tional", -1, 1 ),
		            new Among ( "ational", 5, 2 ),
		            new Among ( "ful", -1, 5 ),
		            new Among ( "ness", -1, 5 )
		        ];
		
		        var a_7 = [
		            new Among ( "ic", -1, 1 ),
		            new Among ( "ance", -1, 1 ),
		            new Among ( "ence", -1, 1 ),
		            new Among ( "able", -1, 1 ),
		            new Among ( "ible", -1, 1 ),
		            new Among ( "ate", -1, 1 ),
		            new Among ( "ive", -1, 1 ),
		            new Among ( "ize", -1, 1 ),
		            new Among ( "iti", -1, 1 ),
		            new Among ( "al", -1, 1 ),
		            new Among ( "ism", -1, 1 ),
		            new Among ( "ion", -1, 2 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "ous", -1, 1 ),
		            new Among ( "ant", -1, 1 ),
		            new Among ( "ent", -1, 1 ),
		            new Among ( "ment", 15, 1 ),
		            new Among ( "ement", 16, 1 )
		        ];
		
		        var a_8 = [
		            new Among ( "e", -1, 1 ),
		            new Among ( "l", -1, 2 )
		        ];
		
		        var a_9 = [
		            new Among ( "succeed", -1, -1 ),
		            new Among ( "proceed", -1, -1 ),
		            new Among ( "exceed", -1, -1 ),
		            new Among ( "canning", -1, -1 ),
		            new Among ( "inning", -1, -1 ),
		            new Among ( "earring", -1, -1 ),
		            new Among ( "herring", -1, -1 ),
		            new Among ( "outing", -1, -1 )
		        ];
		
		        var a_10 = [
		            new Among ( "andes", -1, -1 ),
		            new Among ( "atlas", -1, -1 ),
		            new Among ( "bias", -1, -1 ),
		            new Among ( "cosmos", -1, -1 ),
		            new Among ( "dying", -1, 3 ),
		            new Among ( "early", -1, 9 ),
		            new Among ( "gently", -1, 7 ),
		            new Among ( "howe", -1, -1 ),
		            new Among ( "idly", -1, 6 ),
		            new Among ( "lying", -1, 4 ),
		            new Among ( "news", -1, -1 ),
		            new Among ( "only", -1, 10 ),
		            new Among ( "singly", -1, 11 ),
		            new Among ( "skies", -1, 2 ),
		            new Among ( "skis", -1, 1 ),
		            new Among ( "sky", -1, -1 ),
		            new Among ( "tying", -1, 5 ),
		            new Among ( "ugly", -1, 8 )
		        ];
		
		        var g_v = [17, 65, 16, 1 ];
		
		        var g_v_WXY = [1, 17, 65, 208, 1 ];
		
		        var g_valid_LI = [55, 141, 2 ];
		
		        var B_Y_found;
		        var I_p2;
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        function r_prelude() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            B_Y_found = false;
		            v_1 = sbp.cursor;
		            lab0: do {
		                sbp.bra = sbp.cursor;
		                if (!(sbp.eq_s(1, "'")))
		                {
		                    break lab0;
		                }
		                sbp.ket = sbp.cursor;
		                sbp.slice_del();
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                sbp.bra = sbp.cursor;
		                if (!(sbp.eq_s(1, "y")))
		                {
		                    break lab1;
		                }
		                sbp.ket = sbp.cursor;
		                sbp.slice_from("Y");
		                B_Y_found = true;
		            } while (false);
		            sbp.cursor = v_2;
		            v_3 = sbp.cursor;
		            lab2: do {
		                replab3: while(true)
		                {
		                    v_4 = sbp.cursor;
		                    lab4: do {
		                        golab5: while(true)
		                        {
		                            v_5 = sbp.cursor;
		                            lab6: do {
		                                if (!(sbp.in_grouping(g_v, 97, 121)))
		                                {
		                                    break lab6;
		                                }
		                                sbp.bra = sbp.cursor;
		                                if (!(sbp.eq_s(1, "y")))
		                                {
		                                    break lab6;
		                                }
		                                sbp.ket = sbp.cursor;
		                                sbp.cursor = v_5;
		                                break golab5;
		                            } while (false);
		                            sbp.cursor = v_5;
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab4;
		                            }
		                            sbp.cursor++;
		                        }
		                        sbp.slice_from("Y");
		                        B_Y_found = true;
		                        continue replab3;
		                    } while (false);
		                    sbp.cursor = v_4;
		                    break replab3;
		                }
		            } while (false);
		            sbp.cursor = v_3;
		            return true;
		        }
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                lab1: do {
		                    v_2 = sbp.cursor;
		                    lab2: do {
		                        if (sbp.find_among(a_0, 3) == 0)
		                        {
		                            break lab2;
		                        }
		                        break lab1;
		                    } while (false);
		                    sbp.cursor = v_2;
		                    golab3: while(true)
		                    {
		                        lab4: do {
		                            if (!(sbp.in_grouping(g_v, 97, 121)))
		                            {
		                                break lab4;
		                            }
		                            break golab3;
		                        } while (false);
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab0;
		                        }
		                        sbp.cursor++;
		                    }
		                    golab5: while(true)
		                    {
		                        lab6: do {
		                            if (!(sbp.out_grouping(g_v, 97, 121)))
		                            {
		                                break lab6;
		                            }
		                            break golab5;
		                        } while (false);
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab0;
		                        }
		                        sbp.cursor++;
		                    }
		                } while (false);
		                I_p1 = sbp.cursor;
		                golab7: while(true)
		                {
		                    lab8: do {
		                        if (!(sbp.in_grouping(g_v, 97, 121)))
		                        {
		                            break lab8;
		                        }
		                        break golab7;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                golab9: while(true)
		                {
		                    lab10: do {
		                        if (!(sbp.out_grouping(g_v, 97, 121)))
		                        {
		                            break lab10;
		                        }
		                        break golab9;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            return true;
		        }
		
		        function r_shortv() {
		            var v_1;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    if (!(sbp.out_grouping_b(g_v_WXY, 89, 121)))
		                    {
		                        break lab1;
		                    }
		                    if (!(sbp.in_grouping_b(g_v, 97, 121)))
		                    {
		                        break lab1;
		                    }
		                    if (!(sbp.out_grouping_b(g_v, 97, 121)))
		                    {
		                        break lab1;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                if (!(sbp.out_grouping_b(g_v, 97, 121)))
		                {
		                    return false;
		                }
		                if (!(sbp.in_grouping_b(g_v, 97, 121)))
		                {
		                    return false;
		                }
		                if (sbp.cursor > sbp.limit_backward)
		                {
		                    return false;
		                }
		            } while (false);
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_Step_1a() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                sbp.ket = sbp.cursor;
		                among_var = sbp.find_among_b(a_1, 3);
		                if (among_var == 0)
		                {
		                    sbp.cursor = sbp.limit - v_1;
		                    break lab0;
		                }
		                sbp.bra = sbp.cursor;
		                switch(among_var) {
		                    case 0:
		                        sbp.cursor = sbp.limit - v_1;
		                        break lab0;
		                    case 1:
		                        sbp.slice_del();
		                        break;
		                }
		            } while (false);
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 6);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("ss");
		                    break;
		                case 2:
		                    lab1: do {
		                        v_2 = sbp.limit - sbp.cursor;
		                        lab2: do {
		                            {
		                                var c = sbp.cursor - 2;
		                                if (sbp.limit_backward > c || c > sbp.limit)
		                                {
		                                    break lab2;
		                                }
		                                sbp.cursor = c;
		                            }
		                            sbp.slice_from("i");
		                            break lab1;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_2;
		                        sbp.slice_from("ie");
		                    } while (false);
		                    break;
		                case 3:
		                    if (sbp.cursor <= sbp.limit_backward)
		                    {
		                        return false;
		                    }
		                    sbp.cursor--;
		                    golab3: while(true)
		                    {
		                        lab4: do {
		                            if (!(sbp.in_grouping_b(g_v, 97, 121)))
		                            {
		                                break lab4;
		                            }
		                            break golab3;
		                        } while (false);
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            return false;
		                        }
		                        sbp.cursor--;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_1b() {
		            var among_var;
		            var v_1;
		            var v_3;
		            var v_4;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_4, 6);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ee");
		                    break;
		                case 2:
		                    v_1 = sbp.limit - sbp.cursor;
		                    golab0: while(true)
		                    {
		                        lab1: do {
		                            if (!(sbp.in_grouping_b(g_v, 97, 121)))
		                            {
		                                break lab1;
		                            }
		                            break golab0;
		                        } while (false);
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            return false;
		                        }
		                        sbp.cursor--;
		                    }
		                    sbp.cursor = sbp.limit - v_1;
		                    sbp.slice_del();
		                    v_3 = sbp.limit - sbp.cursor;
		                    among_var = sbp.find_among_b(a_3, 13);
		                    if (among_var == 0)
		                    {
		                        return false;
		                    }
		                    sbp.cursor = sbp.limit - v_3;
		                    switch(among_var) {
		                        case 0:
		                            return false;
		                        case 1:
		                            {
		                                var c = sbp.cursor;
		                                sbp.insert(sbp.cursor, sbp.cursor, "e");
		                                sbp.cursor = c;
		                            }
		                            break;
		                        case 2:
		                            sbp.ket = sbp.cursor;
		                            if (sbp.cursor <= sbp.limit_backward)
		                            {
		                                return false;
		                            }
		                            sbp.cursor--;
		                            sbp.bra = sbp.cursor;
		                            sbp.slice_del();
		                            break;
		                        case 3:
		                            if (sbp.cursor != I_p1)
		                            {
		                                return false;
		                            }
		                            v_4 = sbp.limit - sbp.cursor;
		                            if (!r_shortv())
		                            {
		                                return false;
		                            }
		                            sbp.cursor = sbp.limit - v_4;
		                            {
		                                var c = sbp.cursor;
		                                sbp.insert(sbp.cursor, sbp.cursor, "e");
		                                sbp.cursor = c;
		                            }
		                            break;
		                    }
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_1c() {
		            var v_1;
		            var v_2;
		            sbp.ket = sbp.cursor;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    if (!(sbp.eq_s_b(1, "y")))
		                    {
		                        break lab1;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                if (!(sbp.eq_s_b(1, "Y")))
		                {
		                    return false;
		                }
		            } while (false);
		            sbp.bra = sbp.cursor;
		            if (!(sbp.out_grouping_b(g_v, 97, 121)))
		            {
		                return false;
		            }
		            {
		                v_2 = sbp.limit - sbp.cursor;
		                lab2: do {
		                    if (sbp.cursor > sbp.limit_backward)
		                    {
		                        break lab2;
		                    }
		                    return false;
		                } while (false);
		                sbp.cursor = sbp.limit - v_2;
		            }
		            sbp.slice_from("i");
		            return true;
		        }
		
		        function r_Step_2() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_5, 24);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("tion");
		                    break;
		                case 2:
		                    sbp.slice_from("ence");
		                    break;
		                case 3:
		                    sbp.slice_from("ance");
		                    break;
		                case 4:
		                    sbp.slice_from("able");
		                    break;
		                case 5:
		                    sbp.slice_from("ent");
		                    break;
		                case 6:
		                    sbp.slice_from("ize");
		                    break;
		                case 7:
		                    sbp.slice_from("ate");
		                    break;
		                case 8:
		                    sbp.slice_from("al");
		                    break;
		                case 9:
		                    sbp.slice_from("ful");
		                    break;
		                case 10:
		                    sbp.slice_from("ous");
		                    break;
		                case 11:
		                    sbp.slice_from("ive");
		                    break;
		                case 12:
		                    sbp.slice_from("ble");
		                    break;
		                case 13:
		                    if (!(sbp.eq_s_b(1, "l")))
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("og");
		                    break;
		                case 14:
		                    sbp.slice_from("ful");
		                    break;
		                case 15:
		                    sbp.slice_from("less");
		                    break;
		                case 16:
		                    if (!(sbp.in_grouping_b(g_valid_LI, 99, 116)))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_3() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 9);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("tion");
		                    break;
		                case 2:
		                    sbp.slice_from("ate");
		                    break;
		                case 3:
		                    sbp.slice_from("al");
		                    break;
		                case 4:
		                    sbp.slice_from("ic");
		                    break;
		                case 5:
		                    sbp.slice_del();
		                    break;
		                case 6:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_4() {
		            var among_var;
		            var v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 18);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R2())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    lab0: do {
		                        v_1 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            if (!(sbp.eq_s_b(1, "s")))
		                            {
		                                break lab1;
		                            }
		                            break lab0;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_1;
		                        if (!(sbp.eq_s_b(1, "t")))
		                        {
		                            return false;
		                        }
		                    } while (false);
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_5() {
		            var among_var;
		            var v_1;
		            var v_2;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_8, 2);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    lab0: do {
		                        v_1 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            if (!r_R2())
		                            {
		                                break lab1;
		                            }
		                            break lab0;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_1;
		                        if (!r_R1())
		                        {
		                            return false;
		                        }
		                        {
		                            v_2 = sbp.limit - sbp.cursor;
		                            lab2: do {
		                                if (!r_shortv())
		                                {
		                                    break lab2;
		                                }
		                                return false;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_2;
		                        }
		                    } while (false);
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    if (!(sbp.eq_s_b(1, "l")))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_exception2() {
		            sbp.ket = sbp.cursor;
		            if (sbp.find_among_b(a_9, 8) == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (sbp.cursor > sbp.limit_backward)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_exception1() {
		            var among_var;
		            sbp.bra = sbp.cursor;
		            among_var = sbp.find_among(a_10, 18);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.ket = sbp.cursor;
		            if (sbp.cursor < sbp.limit)
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("ski");
		                    break;
		                case 2:
		                    sbp.slice_from("sky");
		                    break;
		                case 3:
		                    sbp.slice_from("die");
		                    break;
		                case 4:
		                    sbp.slice_from("lie");
		                    break;
		                case 5:
		                    sbp.slice_from("tie");
		                    break;
		                case 6:
		                    sbp.slice_from("idl");
		                    break;
		                case 7:
		                    sbp.slice_from("gentl");
		                    break;
		                case 8:
		                    sbp.slice_from("ugli");
		                    break;
		                case 9:
		                    sbp.slice_from("earli");
		                    break;
		                case 10:
		                    sbp.slice_from("onli");
		                    break;
		                case 11:
		                    sbp.slice_from("singl");
		                    break;
		            }
		            return true;
		        }
		
		        function r_postlude() {
		            var v_1;
		            var v_2;
		            if (!(B_Y_found))
		            {
		                return false;
		            }
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    golab2: while(true)
		                    {
		                        v_2 = sbp.cursor;
		                        lab3: do {
		                            sbp.bra = sbp.cursor;
		                            if (!(sbp.eq_s(1, "Y")))
		                            {
		                                break lab3;
		                            }
		                            sbp.ket = sbp.cursor;
		                            sbp.cursor = v_2;
		                            break golab2;
		                        } while (false);
		                        sbp.cursor = v_2;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab1;
		                        }
		                        sbp.cursor++;
		                    }
		                    sbp.slice_from("y");
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            var v_11;
		            var v_12;
		            var v_13;
		            lab0: do {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    if (!r_exception1())
		                    {
		                        break lab1;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = v_1;
		                lab2: do {
		                    {
		                        v_2 = sbp.cursor;
		                        lab3: do {
		                            {
		                                var c = sbp.cursor + 3;
		                                if (0 > c || c > sbp.limit)
		                                {
		                                    break lab3;
		                                }
		                                sbp.cursor = c;
		                            }
		                            break lab2;
		                        } while (false);
		                        sbp.cursor = v_2;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = v_1;
		                v_3 = sbp.cursor;
		                lab4: do {
		                    if (!r_prelude())
		                    {
		                        break lab4;
		                    }
		                } while (false);
		                sbp.cursor = v_3;
		                v_4 = sbp.cursor;
		                lab5: do {
		                    if (!r_mark_regions())
		                    {
		                        break lab5;
		                    }
		                } while (false);
		                sbp.cursor = v_4;
		                sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		                v_5 = sbp.limit - sbp.cursor;
		                lab6: do {
		                    if (!r_Step_1a())
		                    {
		                        break lab6;
		                    }
		                } while (false);
		                sbp.cursor = sbp.limit - v_5;
		                lab7: do {
		                    v_6 = sbp.limit - sbp.cursor;
		                    lab8: do {
		                        if (!r_exception2())
		                        {
		                            break lab8;
		                        }
		                        break lab7;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_6;
		                    v_7 = sbp.limit - sbp.cursor;
		                    lab9: do {
		                        if (!r_Step_1b())
		                        {
		                            break lab9;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_7;
		                    v_8 = sbp.limit - sbp.cursor;
		                    lab10: do {
		                        if (!r_Step_1c())
		                        {
		                            break lab10;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_8;
		                    v_9 = sbp.limit - sbp.cursor;
		                    lab11: do {
		                        if (!r_Step_2())
		                        {
		                            break lab11;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_9;
		                    v_10 = sbp.limit - sbp.cursor;
		                    lab12: do {
		                        if (!r_Step_3())
		                        {
		                            break lab12;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_10;
		                    v_11 = sbp.limit - sbp.cursor;
		                    lab13: do {
		                        if (!r_Step_4())
		                        {
		                            break lab13;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_11;
		                    v_12 = sbp.limit - sbp.cursor;
		                    lab14: do {
		                        if (!r_Step_5())
		                        {
		                            break lab14;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_12;
		                } while (false);
		                sbp.cursor = sbp.limit_backward;                v_13 = sbp.cursor;
		                lab15: do {
		                    if (!r_postlude())
		                    {
		                        break lab15;
		                    }
		                } while (false);
		                sbp.cursor = v_13;
		            } while (false);
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		finnishStemmer : function() {

		        var a_0 = [
		            new Among ( "pa", -1, 1 ),
		            new Among ( "sti", -1, 2 ),
		            new Among ( "kaan", -1, 1 ),
		            new Among ( "han", -1, 1 ),
		            new Among ( "kin", -1, 1 ),
		            new Among ( "h\u00E4n", -1, 1 ),
		            new Among ( "k\u00E4\u00E4n", -1, 1 ),
		            new Among ( "ko", -1, 1 ),
		            new Among ( "p\u00E4", -1, 1 ),
		            new Among ( "k\u00F6", -1, 1 )
		        ];
		
		        var a_1 = [
		            new Among ( "lla", -1, -1 ),
		            new Among ( "na", -1, -1 ),
		            new Among ( "ssa", -1, -1 ),
		            new Among ( "ta", -1, -1 ),
		            new Among ( "lta", 3, -1 ),
		            new Among ( "sta", 3, -1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ll\u00E4", -1, -1 ),
		            new Among ( "n\u00E4", -1, -1 ),
		            new Among ( "ss\u00E4", -1, -1 ),
		            new Among ( "t\u00E4", -1, -1 ),
		            new Among ( "lt\u00E4", 3, -1 ),
		            new Among ( "st\u00E4", 3, -1 )
		        ];
		
		        var a_3 = [
		            new Among ( "lle", -1, -1 ),
		            new Among ( "ine", -1, -1 )
		        ];
		
		        var a_4 = [
		            new Among ( "nsa", -1, 3 ),
		            new Among ( "mme", -1, 3 ),
		            new Among ( "nne", -1, 3 ),
		            new Among ( "ni", -1, 2 ),
		            new Among ( "si", -1, 1 ),
		            new Among ( "an", -1, 4 ),
		            new Among ( "en", -1, 6 ),
		            new Among ( "\u00E4n", -1, 5 ),
		            new Among ( "ns\u00E4", -1, 3 )
		        ];
		
		        var a_5 = [
		            new Among ( "aa", -1, -1 ),
		            new Among ( "ee", -1, -1 ),
		            new Among ( "ii", -1, -1 ),
		            new Among ( "oo", -1, -1 ),
		            new Among ( "uu", -1, -1 ),
		            new Among ( "\u00E4\u00E4", -1, -1 ),
		            new Among ( "\u00F6\u00F6", -1, -1 )
		        ];
		
		        var a_6 = [
		            new Among ( "a", -1, 8 ),
		            new Among ( "lla", 0, -1 ),
		            new Among ( "na", 0, -1 ),
		            new Among ( "ssa", 0, -1 ),
		            new Among ( "ta", 0, -1 ),
		            new Among ( "lta", 4, -1 ),
		            new Among ( "sta", 4, -1 ),
		            new Among ( "tta", 4, 9 ),
		            new Among ( "lle", -1, -1 ),
		            new Among ( "ine", -1, -1 ),
		            new Among ( "ksi", -1, -1 ),
		            new Among ( "n", -1, 7 ),
		            new Among ( "han", 11, 1 ),
		            new Among ( "den", 11, -1, r_VI ),
		            new Among ( "seen", 11, -1, r_LONG ),
		            new Among ( "hen", 11, 2 ),
		            new Among ( "tten", 11, -1, r_VI ),
		            new Among ( "hin", 11, 3 ),
		            new Among ( "siin", 11, -1, r_VI ),
		            new Among ( "hon", 11, 4 ),
		            new Among ( "h\u00E4n", 11, 5 ),
		            new Among ( "h\u00F6n", 11, 6 ),
		            new Among ( "\u00E4", -1, 8 ),
		            new Among ( "ll\u00E4", 22, -1 ),
		            new Among ( "n\u00E4", 22, -1 ),
		            new Among ( "ss\u00E4", 22, -1 ),
		            new Among ( "t\u00E4", 22, -1 ),
		            new Among ( "lt\u00E4", 26, -1 ),
		            new Among ( "st\u00E4", 26, -1 ),
		            new Among ( "tt\u00E4", 26, 9 )
		        ];
		
		        var a_7 = [
		            new Among ( "eja", -1, -1 ),
		            new Among ( "mma", -1, 1 ),
		            new Among ( "imma", 1, -1 ),
		            new Among ( "mpa", -1, 1 ),
		            new Among ( "impa", 3, -1 ),
		            new Among ( "mmi", -1, 1 ),
		            new Among ( "immi", 5, -1 ),
		            new Among ( "mpi", -1, 1 ),
		            new Among ( "impi", 7, -1 ),
		            new Among ( "ej\u00E4", -1, -1 ),
		            new Among ( "mm\u00E4", -1, 1 ),
		            new Among ( "imm\u00E4", 10, -1 ),
		            new Among ( "mp\u00E4", -1, 1 ),
		            new Among ( "imp\u00E4", 12, -1 )
		        ];
		
		        var a_8 = [
		            new Among ( "i", -1, -1 ),
		            new Among ( "j", -1, -1 )
		        ];
		
		        var a_9 = [
		            new Among ( "mma", -1, 1 ),
		            new Among ( "imma", 0, -1 )
		        ];
		
		        var g_AEI = [17, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8 ];
		
		        var g_V1 = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32 ];
		
		        var g_V2 = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32 ];
		
		        var g_particle_end = [17, 97, 24, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32 ];
		
		        var B_ending_removed;
		        var S_x = "";
		        var I_p2;
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            var v_3;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            golab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    if (!(sbp.in_grouping(g_V1, 97, 246)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = v_1;
		                    break golab0;
		                } while (false);
		                sbp.cursor = v_1;
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab2: while(true)
		            {
		                lab3: do {
		                    if (!(sbp.out_grouping(g_V1, 97, 246)))
		                    {
		                        break lab3;
		                    }
		                    break golab2;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p1 = sbp.cursor;
		            golab4: while(true)
		            {
		                v_3 = sbp.cursor;
		                lab5: do {
		                    if (!(sbp.in_grouping(g_V1, 97, 246)))
		                    {
		                        break lab5;
		                    }
		                    sbp.cursor = v_3;
		                    break golab4;
		                } while (false);
		                sbp.cursor = v_3;
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab6: while(true)
		            {
		                lab7: do {
		                    if (!(sbp.out_grouping(g_V1, 97, 246)))
		                    {
		                        break lab7;
		                    }
		                    break golab6;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p2 = sbp.cursor;
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_particle_etc() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 10);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!(sbp.in_grouping_b(g_particle_end, 97, 246)))
		                    {
		                        return false;
		                    }
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    break;
		            }
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_possessive() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_4, 9);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    {
		                        v_3 = sbp.limit - sbp.cursor;
		                        lab0: do {
		                            if (!(sbp.eq_s_b(1, "k")))
		                            {
		                                break lab0;
		                            }
		                            return false;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    sbp.ket = sbp.cursor;
		                    if (!(sbp.eq_s_b(3, "kse")))
		                    {
		                        return false;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_from("ksi");
		                    break;
		                case 3:
		                    sbp.slice_del();
		                    break;
		                case 4:
		                    if (sbp.find_among_b(a_1, 6) == 0)
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 5:
		                    if (sbp.find_among_b(a_2, 6) == 0)
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 6:
		                    if (sbp.find_among_b(a_3, 2) == 0)
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_LONG() {
		            if (sbp.find_among_b(a_5, 7) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_VI() {
		            if (!(sbp.eq_s_b(1, "i")))
		            {
		                return false;
		            }
		            if (!(sbp.in_grouping_b(g_V2, 97, 246)))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_case_ending() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 30);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!(sbp.eq_s_b(1, "a")))
		                    {
		                        return false;
		                    }
		                    break;
		                case 2:
		                    if (!(sbp.eq_s_b(1, "e")))
		                    {
		                        return false;
		                    }
		                    break;
		                case 3:
		                    if (!(sbp.eq_s_b(1, "i")))
		                    {
		                        return false;
		                    }
		                    break;
		                case 4:
		                    if (!(sbp.eq_s_b(1, "o")))
		                    {
		                        return false;
		                    }
		                    break;
		                case 5:
		                    if (!(sbp.eq_s_b(1, "\u00E4")))
		                    {
		                        return false;
		                    }
		                    break;
		                case 6:
		                    if (!(sbp.eq_s_b(1, "\u00F6")))
		                    {
		                        return false;
		                    }
		                    break;
		                case 7:
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        v_4 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            v_5 = sbp.limit - sbp.cursor;
		                            lab2: do {
		                                if (!r_LONG())
		                                {
		                                    break lab2;
		                                }
		                                break lab1;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_5;
		                            if (!(sbp.eq_s_b(2, "ie")))
		                            {
		                                sbp.cursor = sbp.limit - v_3;
		                                break lab0;
		                            }
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_4;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab0;
		                        }
		                        sbp.cursor--;
		                        sbp.bra = sbp.cursor;
		                    } while (false);
		                    break;
		                case 8:
		                    if (!(sbp.in_grouping_b(g_V1, 97, 246)))
		                    {
		                        return false;
		                    }
		                    if (!(sbp.out_grouping_b(g_V1, 97, 246)))
		                    {
		                        return false;
		                    }
		                    break;
		                case 9:
		                    if (!(sbp.eq_s_b(1, "e")))
		                    {
		                        return false;
		                    }
		                    break;
		            }
		            sbp.slice_del();
		            B_ending_removed = true;
		            return true;
		        }
		
		        function r_other_endings() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p2)
		            {
		                return false;
		            }
		            sbp.cursor = I_p2;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 14);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    {
		                        v_3 = sbp.limit - sbp.cursor;
		                        lab0: do {
		                            if (!(sbp.eq_s_b(2, "po")))
		                            {
		                                break lab0;
		                            }
		                            return false;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                    }
		                    break;
		            }
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_i_plural() {
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            if (sbp.find_among_b(a_8, 2) == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_t_plural() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            if (!(sbp.eq_s_b(1, "t")))
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            v_3 = sbp.limit - sbp.cursor;
		            if (!(sbp.in_grouping_b(g_V1, 97, 246)))
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.cursor = sbp.limit - v_3;
		            sbp.slice_del();
		            sbp.limit_backward = v_2;
		            v_4 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p2)
		            {
		                return false;
		            }
		            sbp.cursor = I_p2;
		            v_5 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_4;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_9, 2);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_5;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_5;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    {
		                        v_6 = sbp.limit - sbp.cursor;
		                        lab0: do {
		                            if (!(sbp.eq_s_b(2, "po")))
		                            {
		                                break lab0;
		                            }
		                            return false;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_6;
		                    }
		                    break;
		            }
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_tidy() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            v_3 = sbp.limit - sbp.cursor;
		            lab0: do {
		                v_4 = sbp.limit - sbp.cursor;
		                if (!r_LONG())
		                {
		                    break lab0;
		                }
		                sbp.cursor = sbp.limit - v_4;
		                sbp.ket = sbp.cursor;
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    break lab0;
		                }
		                sbp.cursor--;
		                sbp.bra = sbp.cursor;
		                sbp.slice_del();
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_5 = sbp.limit - sbp.cursor;
		            lab1: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.in_grouping_b(g_AEI, 97, 228)))
		                {
		                    break lab1;
		                }
		                sbp.bra = sbp.cursor;
		                if (!(sbp.out_grouping_b(g_V1, 97, 246)))
		                {
		                    break lab1;
		                }
		                sbp.slice_del();
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            v_6 = sbp.limit - sbp.cursor;
		            lab2: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(1, "j")))
		                {
		                    break lab2;
		                }
		                sbp.bra = sbp.cursor;
		                lab3: do {
		                    v_7 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        if (!(sbp.eq_s_b(1, "o")))
		                        {
		                            break lab4;
		                        }
		                        break lab3;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_7;
		                    if (!(sbp.eq_s_b(1, "u")))
		                    {
		                        break lab2;
		                    }
		                } while (false);
		                sbp.slice_del();
		            } while (false);
		            sbp.cursor = sbp.limit - v_6;
		            v_8 = sbp.limit - sbp.cursor;
		            lab5: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(1, "o")))
		                {
		                    break lab5;
		                }
		                sbp.bra = sbp.cursor;
		                if (!(sbp.eq_s_b(1, "j")))
		                {
		                    break lab5;
		                }
		                sbp.slice_del();
		            } while (false);
		            sbp.cursor = sbp.limit - v_8;
		            sbp.limit_backward = v_2;
		            golab6: while(true)
		            {
		                v_9 = sbp.limit - sbp.cursor;
		                lab7: do {
		                    if (!(sbp.out_grouping_b(g_V1, 97, 246)))
		                    {
		                        break lab7;
		                    }
		                    sbp.cursor = sbp.limit - v_9;
		                    break golab6;
		                } while (false);
		                sbp.cursor = sbp.limit - v_9;
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    return false;
		                }
		                sbp.cursor--;
		            }
		            sbp.ket = sbp.cursor;
		            if (sbp.cursor <= sbp.limit_backward)
		            {
		                return false;
		            }
		            sbp.cursor--;
		            sbp.bra = sbp.cursor;
		            S_x = sbp.slice_to(S_x);
		            if (!(sbp.eq_v_b(S_x)))
		            {
		                return false;
		            }
		            sbp.slice_del();
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            B_ending_removed = false;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_particle_etc())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_possessive())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                if (!r_case_ending())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            v_5 = sbp.limit - sbp.cursor;
		            lab4: do {
		                if (!r_other_endings())
		                {
		                    break lab4;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            lab5: do {
		                v_6 = sbp.limit - sbp.cursor;
		                lab6: do {
		                    if (!(B_ending_removed))
		                    {
		                        break lab6;
		                    }
		                    v_7 = sbp.limit - sbp.cursor;
		                    lab7: do {
		                        if (!r_i_plural())
		                        {
		                            break lab7;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_7;
		                    break lab5;
		                } while (false);
		                sbp.cursor = sbp.limit - v_6;
		                v_8 = sbp.limit - sbp.cursor;
		                lab8: do {
		                    if (!r_t_plural())
		                    {
		                        break lab8;
		                    }
		                } while (false);
		                sbp.cursor = sbp.limit - v_8;
		            } while (false);
		            v_9 = sbp.limit - sbp.cursor;
		            lab9: do {
		                if (!r_tidy())
		                {
		                    break lab9;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_9;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		frenchStemmer : function() {

		        var a_0 = [
		            new Among ( "col", -1, -1 ),
		            new Among ( "par", -1, -1 ),
		            new Among ( "tap", -1, -1 )
		        ];
		
		        var a_1 = [
		            new Among ( "", -1, 4 ),
		            new Among ( "I", 0, 1 ),
		            new Among ( "U", 0, 2 ),
		            new Among ( "Y", 0, 3 )
		        ];
		
		        var a_2 = [
		            new Among ( "iqU", -1, 3 ),
		            new Among ( "abl", -1, 3 ),
		            new Among ( "I\u00E8r", -1, 4 ),
		            new Among ( "i\u00E8r", -1, 4 ),
		            new Among ( "eus", -1, 2 ),
		            new Among ( "iv", -1, 1 )
		        ];
		
		        var a_3 = [
		            new Among ( "ic", -1, 2 ),
		            new Among ( "abil", -1, 1 ),
		            new Among ( "iv", -1, 3 )
		        ];
		
		        var a_4 = [
		            new Among ( "iqUe", -1, 1 ),
		            new Among ( "atrice", -1, 2 ),
		            new Among ( "ance", -1, 1 ),
		            new Among ( "ence", -1, 5 ),
		            new Among ( "logie", -1, 3 ),
		            new Among ( "able", -1, 1 ),
		            new Among ( "isme", -1, 1 ),
		            new Among ( "euse", -1, 11 ),
		            new Among ( "iste", -1, 1 ),
		            new Among ( "ive", -1, 8 ),
		            new Among ( "if", -1, 8 ),
		            new Among ( "usion", -1, 4 ),
		            new Among ( "ation", -1, 2 ),
		            new Among ( "ution", -1, 4 ),
		            new Among ( "ateur", -1, 2 ),
		            new Among ( "iqUes", -1, 1 ),
		            new Among ( "atrices", -1, 2 ),
		            new Among ( "ances", -1, 1 ),
		            new Among ( "ences", -1, 5 ),
		            new Among ( "logies", -1, 3 ),
		            new Among ( "ables", -1, 1 ),
		            new Among ( "ismes", -1, 1 ),
		            new Among ( "euses", -1, 11 ),
		            new Among ( "istes", -1, 1 ),
		            new Among ( "ives", -1, 8 ),
		            new Among ( "ifs", -1, 8 ),
		            new Among ( "usions", -1, 4 ),
		            new Among ( "ations", -1, 2 ),
		            new Among ( "utions", -1, 4 ),
		            new Among ( "ateurs", -1, 2 ),
		            new Among ( "ments", -1, 15 ),
		            new Among ( "ements", 30, 6 ),
		            new Among ( "issements", 31, 12 ),
		            new Among ( "it\u00E9s", -1, 7 ),
		            new Among ( "ment", -1, 15 ),
		            new Among ( "ement", 34, 6 ),
		            new Among ( "issement", 35, 12 ),
		            new Among ( "amment", 34, 13 ),
		            new Among ( "emment", 34, 14 ),
		            new Among ( "aux", -1, 10 ),
		            new Among ( "eaux", 39, 9 ),
		            new Among ( "eux", -1, 1 ),
		            new Among ( "it\u00E9", -1, 7 )
		        ];
		
		        var a_5 = [
		            new Among ( "ira", -1, 1 ),
		            new Among ( "ie", -1, 1 ),
		            new Among ( "isse", -1, 1 ),
		            new Among ( "issante", -1, 1 ),
		            new Among ( "i", -1, 1 ),
		            new Among ( "irai", 4, 1 ),
		            new Among ( "ir", -1, 1 ),
		            new Among ( "iras", -1, 1 ),
		            new Among ( "ies", -1, 1 ),
		            new Among ( "\u00EEmes", -1, 1 ),
		            new Among ( "isses", -1, 1 ),
		            new Among ( "issantes", -1, 1 ),
		            new Among ( "\u00EEtes", -1, 1 ),
		            new Among ( "is", -1, 1 ),
		            new Among ( "irais", 13, 1 ),
		            new Among ( "issais", 13, 1 ),
		            new Among ( "irions", -1, 1 ),
		            new Among ( "issions", -1, 1 ),
		            new Among ( "irons", -1, 1 ),
		            new Among ( "issons", -1, 1 ),
		            new Among ( "issants", -1, 1 ),
		            new Among ( "it", -1, 1 ),
		            new Among ( "irait", 21, 1 ),
		            new Among ( "issait", 21, 1 ),
		            new Among ( "issant", -1, 1 ),
		            new Among ( "iraIent", -1, 1 ),
		            new Among ( "issaIent", -1, 1 ),
		            new Among ( "irent", -1, 1 ),
		            new Among ( "issent", -1, 1 ),
		            new Among ( "iront", -1, 1 ),
		            new Among ( "\u00EEt", -1, 1 ),
		            new Among ( "iriez", -1, 1 ),
		            new Among ( "issiez", -1, 1 ),
		            new Among ( "irez", -1, 1 ),
		            new Among ( "issez", -1, 1 )
		        ];
		
		        var a_6 = [
		            new Among ( "a", -1, 3 ),
		            new Among ( "era", 0, 2 ),
		            new Among ( "asse", -1, 3 ),
		            new Among ( "ante", -1, 3 ),
		            new Among ( "\u00E9e", -1, 2 ),
		            new Among ( "ai", -1, 3 ),
		            new Among ( "erai", 5, 2 ),
		            new Among ( "er", -1, 2 ),
		            new Among ( "as", -1, 3 ),
		            new Among ( "eras", 8, 2 ),
		            new Among ( "\u00E2mes", -1, 3 ),
		            new Among ( "asses", -1, 3 ),
		            new Among ( "antes", -1, 3 ),
		            new Among ( "\u00E2tes", -1, 3 ),
		            new Among ( "\u00E9es", -1, 2 ),
		            new Among ( "ais", -1, 3 ),
		            new Among ( "erais", 15, 2 ),
		            new Among ( "ions", -1, 1 ),
		            new Among ( "erions", 17, 2 ),
		            new Among ( "assions", 17, 3 ),
		            new Among ( "erons", -1, 2 ),
		            new Among ( "ants", -1, 3 ),
		            new Among ( "\u00E9s", -1, 2 ),
		            new Among ( "ait", -1, 3 ),
		            new Among ( "erait", 23, 2 ),
		            new Among ( "ant", -1, 3 ),
		            new Among ( "aIent", -1, 3 ),
		            new Among ( "eraIent", 26, 2 ),
		            new Among ( "\u00E8rent", -1, 2 ),
		            new Among ( "assent", -1, 3 ),
		            new Among ( "eront", -1, 2 ),
		            new Among ( "\u00E2t", -1, 3 ),
		            new Among ( "ez", -1, 2 ),
		            new Among ( "iez", 32, 2 ),
		            new Among ( "eriez", 33, 2 ),
		            new Among ( "assiez", 33, 3 ),
		            new Among ( "erez", 32, 2 ),
		            new Among ( "\u00E9", -1, 2 )
		        ];
		
		        var a_7 = [
		            new Among ( "e", -1, 3 ),
		            new Among ( "I\u00E8re", 0, 2 ),
		            new Among ( "i\u00E8re", 0, 2 ),
		            new Among ( "ion", -1, 1 ),
		            new Among ( "Ier", -1, 2 ),
		            new Among ( "ier", -1, 2 ),
		            new Among ( "\u00EB", -1, 4 )
		        ];
		
		        var a_8 = [
		            new Among ( "ell", -1, -1 ),
		            new Among ( "eill", -1, -1 ),
		            new Among ( "enn", -1, -1 ),
		            new Among ( "onn", -1, -1 ),
		            new Among ( "ett", -1, -1 )
		        ];
		
		        var g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 130, 103, 8, 5 ];
		
		        var g_keep_with_s = [1, 65, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128 ];
		
		        var I_p2;
		        var I_p1;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_prelude() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    golab2: while(true)
		                    {
		                        v_2 = sbp.cursor;
		                        lab3: do {
		                            lab4: do {
		                                v_3 = sbp.cursor;
		                                lab5: do {
		                                    if (!(sbp.in_grouping(g_v, 97, 251)))
		                                    {
		                                        break lab5;
		                                    }
		                                    sbp.bra = sbp.cursor;
		                                    lab6: do {
		                                        v_4 = sbp.cursor;
		                                        lab7: do {
		                                            if (!(sbp.eq_s(1, "u")))
		                                            {
		                                                break lab7;
		                                            }
		                                            sbp.ket = sbp.cursor;
		                                            if (!(sbp.in_grouping(g_v, 97, 251)))
		                                            {
		                                                break lab7;
		                                            }
		                                            sbp.slice_from("U");
		                                            break lab6;
		                                        } while (false);
		                                        sbp.cursor = v_4;
		                                        lab8: do {
		                                            if (!(sbp.eq_s(1, "i")))
		                                            {
		                                                break lab8;
		                                            }
		                                            sbp.ket = sbp.cursor;
		                                            if (!(sbp.in_grouping(g_v, 97, 251)))
		                                            {
		                                                break lab8;
		                                            }
		                                            sbp.slice_from("I");
		                                            break lab6;
		                                        } while (false);
		                                        sbp.cursor = v_4;
		                                        if (!(sbp.eq_s(1, "y")))
		                                        {
		                                            break lab5;
		                                        }
		                                        sbp.ket = sbp.cursor;
		                                        sbp.slice_from("Y");
		                                    } while (false);
		                                    break lab4;
		                                } while (false);
		                                sbp.cursor = v_3;
		                                lab9: do {
		                                    sbp.bra = sbp.cursor;
		                                    if (!(sbp.eq_s(1, "y")))
		                                    {
		                                        break lab9;
		                                    }
		                                    sbp.ket = sbp.cursor;
		                                    if (!(sbp.in_grouping(g_v, 97, 251)))
		                                    {
		                                        break lab9;
		                                    }
		                                    sbp.slice_from("Y");
		                                    break lab4;
		                                } while (false);
		                                sbp.cursor = v_3;
		                                if (!(sbp.eq_s(1, "q")))
		                                {
		                                    break lab3;
		                                }
		                                sbp.bra = sbp.cursor;
		                                if (!(sbp.eq_s(1, "u")))
		                                {
		                                    break lab3;
		                                }
		                                sbp.ket = sbp.cursor;
		                                sbp.slice_from("U");
		                            } while (false);
		                            sbp.cursor = v_2;
		                            break golab2;
		                        } while (false);
		                        sbp.cursor = v_2;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab1;
		                        }
		                        sbp.cursor++;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            var v_4;
		            I_pV = sbp.limit;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                lab1: do {
		                    v_2 = sbp.cursor;
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 97, 251)))
		                        {
		                            break lab2;
		                        }
		                        if (!(sbp.in_grouping(g_v, 97, 251)))
		                        {
		                            break lab2;
		                        }
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab2;
		                        }
		                        sbp.cursor++;
		                        break lab1;
		                    } while (false);
		                    sbp.cursor = v_2;
		                    lab3: do {
		                        if (sbp.find_among(a_0, 3) == 0)
		                        {
		                            break lab3;
		                        }
		                        break lab1;
		                    } while (false);
		                    sbp.cursor = v_2;
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                    golab4: while(true)
		                    {
		                        lab5: do {
		                            if (!(sbp.in_grouping(g_v, 97, 251)))
		                            {
		                                break lab5;
		                            }
		                            break golab4;
		                        } while (false);
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab0;
		                        }
		                        sbp.cursor++;
		                    }
		                } while (false);
		                I_pV = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            v_4 = sbp.cursor;
		            lab6: do {
		                golab7: while(true)
		                {
		                    lab8: do {
		                        if (!(sbp.in_grouping(g_v, 97, 251)))
		                        {
		                            break lab8;
		                        }
		                        break golab7;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab6;
		                    }
		                    sbp.cursor++;
		                }
		                golab9: while(true)
		                {
		                    lab10: do {
		                        if (!(sbp.out_grouping(g_v, 97, 251)))
		                        {
		                            break lab10;
		                        }
		                        break golab9;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab6;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab11: while(true)
		                {
		                    lab12: do {
		                        if (!(sbp.in_grouping(g_v, 97, 251)))
		                        {
		                            break lab12;
		                        }
		                        break golab11;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab6;
		                    }
		                    sbp.cursor++;
		                }
		                golab13: while(true)
		                {
		                    lab14: do {
		                        if (!(sbp.out_grouping(g_v, 97, 251)))
		                        {
		                            break lab14;
		                        }
		                        break golab13;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab6;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_4;
		            return true;
		        }
		
		        function r_postlude() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_1, 4);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("i");
		                            break;
		                        case 2:
		                            sbp.slice_from("u");
		                            break;
		                        case 3:
		                            sbp.slice_from("y");
		                            break;
		                        case 4:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_RV() {
		            if (!(I_pV <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_standard_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            var v_11;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_4, 43);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_1 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "ic")))
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.bra = sbp.cursor;
		                        lab1: do {
		                            v_2 = sbp.limit - sbp.cursor;
		                            lab2: do {
		                                if (!r_R2())
		                                {
		                                    break lab2;
		                                }
		                                sbp.slice_del();
		                                break lab1;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_2;
		                            sbp.slice_from("iqU");
		                        } while (false);
		                    } while (false);
		                    break;
		                case 3:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("log");
		                    break;
		                case 4:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("u");
		                    break;
		                case 5:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ent");
		                    break;
		                case 6:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab3: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_2, 6);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab3;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_3;
		                                break lab3;
		                            case 1:
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_3;
		                                    break lab3;
		                                }
		                                sbp.slice_del();
		                                sbp.ket = sbp.cursor;
		                                if (!(sbp.eq_s_b(2, "at")))
		                                {
		                                    sbp.cursor = sbp.limit - v_3;
		                                    break lab3;
		                                }
		                                sbp.bra = sbp.cursor;
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_3;
		                                    break lab3;
		                                }
		                                sbp.slice_del();
		                                break;
		                            case 2:
		                                lab4: do {
		                                    v_4 = sbp.limit - sbp.cursor;
		                                    lab5: do {
		                                        if (!r_R2())
		                                        {
		                                            break lab5;
		                                        }
		                                        sbp.slice_del();
		                                        break lab4;
		                                    } while (false);
		                                    sbp.cursor = sbp.limit - v_4;
		                                    if (!r_R1())
		                                    {
		                                        sbp.cursor = sbp.limit - v_3;
		                                        break lab3;
		                                    }
		                                    sbp.slice_from("eux");
		                                } while (false);
		                                break;
		                            case 3:
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_3;
		                                    break lab3;
		                                }
		                                sbp.slice_del();
		                                break;
		                            case 4:
		                                if (!r_RV())
		                                {
		                                    sbp.cursor = sbp.limit - v_3;
		                                    break lab3;
		                                }
		                                sbp.slice_from("i");
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 7:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_5 = sbp.limit - sbp.cursor;
		                    lab6: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_3, 3);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_5;
		                            break lab6;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_5;
		                                break lab6;
		                            case 1:
		                                lab7: do {
		                                    v_6 = sbp.limit - sbp.cursor;
		                                    lab8: do {
		                                        if (!r_R2())
		                                        {
		                                            break lab8;
		                                        }
		                                        sbp.slice_del();
		                                        break lab7;
		                                    } while (false);
		                                    sbp.cursor = sbp.limit - v_6;
		                                    sbp.slice_from("abl");
		                                } while (false);
		                                break;
		                            case 2:
		                                lab9: do {
		                                    v_7 = sbp.limit - sbp.cursor;
		                                    lab10: do {
		                                        if (!r_R2())
		                                        {
		                                            break lab10;
		                                        }
		                                        sbp.slice_del();
		                                        break lab9;
		                                    } while (false);
		                                    sbp.cursor = sbp.limit - v_7;
		                                    sbp.slice_from("iqU");
		                                } while (false);
		                                break;
		                            case 3:
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_5;
		                                    break lab6;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 8:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_8 = sbp.limit - sbp.cursor;
		                    lab11: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "at")))
		                        {
		                            sbp.cursor = sbp.limit - v_8;
		                            break lab11;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_8;
		                            break lab11;
		                        }
		                        sbp.slice_del();
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "ic")))
		                        {
		                            sbp.cursor = sbp.limit - v_8;
		                            break lab11;
		                        }
		                        sbp.bra = sbp.cursor;
		                        lab12: do {
		                            v_9 = sbp.limit - sbp.cursor;
		                            lab13: do {
		                                if (!r_R2())
		                                {
		                                    break lab13;
		                                }
		                                sbp.slice_del();
		                                break lab12;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_9;
		                            sbp.slice_from("iqU");
		                        } while (false);
		                    } while (false);
		                    break;
		                case 9:
		                    sbp.slice_from("eau");
		                    break;
		                case 10:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("al");
		                    break;
		                case 11:
		                    lab14: do {
		                        v_10 = sbp.limit - sbp.cursor;
		                        lab15: do {
		                            if (!r_R2())
		                            {
		                                break lab15;
		                            }
		                            sbp.slice_del();
		                            break lab14;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_10;
		                        if (!r_R1())
		                        {
		                            return false;
		                        }
		                        sbp.slice_from("eux");
		                    } while (false);
		                    break;
		                case 12:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    if (!(sbp.out_grouping_b(g_v, 97, 251)))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 13:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ant");
		                    return false;
		                    break;
		                case 14:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ent");
		                    return false;
		                    break;
		                case 15:
		                    v_11 = sbp.limit - sbp.cursor;
		                    if (!(sbp.in_grouping_b(g_v, 97, 251)))
		                    {
		                        return false;
		                    }
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.cursor = sbp.limit - v_11;
		                    sbp.slice_del();
		                    return false;
		                    break;
		            }
		            return true;
		        }
		
		        function r_i_verb_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_5, 35);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    sbp.limit_backward = v_2;
		                    return false;
		                case 1:
		                    if (!(sbp.out_grouping_b(g_v, 97, 251)))
		                    {
		                        sbp.limit_backward = v_2;
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            sbp.limit_backward = v_2;
		            return true;
		        }
		
		        function r_verb_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 38);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    sbp.limit_backward = v_2;
		                    return false;
		                case 1:
		                    if (!r_R2())
		                    {
		                        sbp.limit_backward = v_2;
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    break;
		                case 3:
		                    sbp.slice_del();
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(1, "e")))
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab0;
		                        }
		                        sbp.bra = sbp.cursor;
		                        sbp.slice_del();
		                    } while (false);
		                    break;
		            }
		            sbp.limit_backward = v_2;
		            return true;
		        }
		
		        function r_residual_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(1, "s")))
		                {
		                    sbp.cursor = sbp.limit - v_1;
		                    break lab0;
		                }
		                sbp.bra = sbp.cursor;
		                v_2 = sbp.limit - sbp.cursor;
		                if (!(sbp.out_grouping_b(g_keep_with_s, 97, 232)))
		                {
		                    sbp.cursor = sbp.limit - v_1;
		                    break lab0;
		                }
		                sbp.cursor = sbp.limit - v_2;
		                sbp.slice_del();
		            } while (false);
		            v_3 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_4 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_3;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 7);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_4;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    sbp.limit_backward = v_4;
		                    return false;
		                case 1:
		                    if (!r_R2())
		                    {
		                        sbp.limit_backward = v_4;
		                        return false;
		                    }
		                    lab1: do {
		                        v_5 = sbp.limit - sbp.cursor;
		                        lab2: do {
		                            if (!(sbp.eq_s_b(1, "s")))
		                            {
		                                break lab2;
		                            }
		                            break lab1;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_5;
		                        if (!(sbp.eq_s_b(1, "t")))
		                        {
		                            sbp.limit_backward = v_4;
		                            return false;
		                        }
		                    } while (false);
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("i");
		                    break;
		                case 3:
		                    sbp.slice_del();
		                    break;
		                case 4:
		                    if (!(sbp.eq_s_b(2, "gu")))
		                    {
		                        sbp.limit_backward = v_4;
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            sbp.limit_backward = v_4;
		            return true;
		        }
		
		        function r_un_double() {
		            var v_1;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.find_among_b(a_8, 5) == 0)
		            {
		                return false;
		            }
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            if (sbp.cursor <= sbp.limit_backward)
		            {
		                return false;
		            }
		            sbp.cursor--;
		            sbp.bra = sbp.cursor;
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_un_accent() {
		            var v_3;
		            {
		                var v_1 = 1;
		                replab0: while(true)
		                {
		                    lab1: do {
		                        if (!(sbp.out_grouping_b(g_v, 97, 251)))
		                        {
		                            break lab1;
		                        }
		                        v_1--;
		                        continue replab0;
		                    } while (false);
		                    break replab0;
		                }
		                if (v_1 > 0)
		                {
		                    return false;
		                }
		            }
		            sbp.ket = sbp.cursor;
		            lab2: do {
		                v_3 = sbp.limit - sbp.cursor;
		                lab3: do {
		                    if (!(sbp.eq_s_b(1, "\u00E9")))
		                    {
		                        break lab3;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                if (!(sbp.eq_s_b(1, "\u00E8")))
		                {
		                    return false;
		                }
		            } while (false);
		            sbp.bra = sbp.cursor;
		            sbp.slice_from("e");
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            var v_11;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_prelude())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                if (!r_mark_regions())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = v_2;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                lab3: do {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        v_5 = sbp.limit - sbp.cursor;
		                        lab5: do {
		                            v_6 = sbp.limit - sbp.cursor;
		                            lab6: do {
		                                if (!r_standard_suffix())
		                                {
		                                    break lab6;
		                                }
		                                break lab5;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_6;
		                            lab7: do {
		                                if (!r_i_verb_suffix())
		                                {
		                                    break lab7;
		                                }
		                                break lab5;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_6;
		                            if (!r_verb_suffix())
		                            {
		                                break lab4;
		                            }
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_5;
		                        v_7 = sbp.limit - sbp.cursor;
		                        lab8: do {
		                            sbp.ket = sbp.cursor;
		                            lab9: do {
		                                v_8 = sbp.limit - sbp.cursor;
		                                lab10: do {
		                                    if (!(sbp.eq_s_b(1, "Y")))
		                                    {
		                                        break lab10;
		                                    }
		                                    sbp.bra = sbp.cursor;
		                                    sbp.slice_from("i");
		                                    break lab9;
		                                } while (false);
		                                sbp.cursor = sbp.limit - v_8;
		                                if (!(sbp.eq_s_b(1, "\u00E7")))
		                                {
		                                    sbp.cursor = sbp.limit - v_7;
		                                    break lab8;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_from("c");
		                            } while (false);
		                        } while (false);
		                        break lab3;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                    if (!r_residual_suffix())
		                    {
		                        break lab2;
		                    }
		                } while (false);
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_9 = sbp.limit - sbp.cursor;
		            lab11: do {
		                if (!r_un_double())
		                {
		                    break lab11;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_9;
		            v_10 = sbp.limit - sbp.cursor;
		            lab12: do {
		                if (!r_un_accent())
		                {
		                    break lab12;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_10;
		            sbp.cursor = sbp.limit_backward;            v_11 = sbp.cursor;
		            lab13: do {
		                if (!r_postlude())
		                {
		                    break lab13;
		                }
		            } while (false);
		            sbp.cursor = v_11;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		germanStemmer : function() {

		        var a_0 = [
		            new Among ( "", -1, 6 ),
		            new Among ( "U", 0, 2 ),
		            new Among ( "Y", 0, 1 ),
		            new Among ( "\u00E4", 0, 3 ),
		            new Among ( "\u00F6", 0, 4 ),
		            new Among ( "\u00FC", 0, 5 )
		        ];
		
		        var a_1 = [
		            new Among ( "e", -1, 2 ),
		            new Among ( "em", -1, 1 ),
		            new Among ( "en", -1, 2 ),
		            new Among ( "ern", -1, 1 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "s", -1, 3 ),
		            new Among ( "es", 5, 2 )
		        ];
		
		        var a_2 = [
		            new Among ( "en", -1, 1 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "st", -1, 2 ),
		            new Among ( "est", 2, 1 )
		        ];
		
		        var a_3 = [
		            new Among ( "ig", -1, 1 ),
		            new Among ( "lich", -1, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "end", -1, 1 ),
		            new Among ( "ig", -1, 2 ),
		            new Among ( "ung", -1, 1 ),
		            new Among ( "lich", -1, 3 ),
		            new Among ( "isch", -1, 2 ),
		            new Among ( "ik", -1, 2 ),
		            new Among ( "heit", -1, 3 ),
		            new Among ( "keit", -1, 4 )
		        ];
		
		        var g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 32, 8 ];
		
		        var g_s_ending = [117, 30, 5 ];
		
		        var g_st_ending = [117, 30, 4 ];
		
		        var I_x;
		        var I_p2;
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        function r_prelude() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            v_1 = sbp.cursor;
		            replab0: while(true)
		            {
		                v_2 = sbp.cursor;
		                lab1: do {
		                    lab2: do {
		                        v_3 = sbp.cursor;
		                        lab3: do {
		                            sbp.bra = sbp.cursor;
		                            if (!(sbp.eq_s(1, "\u00DF")))
		                            {
		                                break lab3;
		                            }
		                            sbp.ket = sbp.cursor;
		                            sbp.slice_from("ss");
		                            break lab2;
		                        } while (false);
		                        sbp.cursor = v_3;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab1;
		                        }
		                        sbp.cursor++;
		                    } while (false);
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_2;
		                break replab0;
		            }
		            sbp.cursor = v_1;
		            replab4: while(true)
		            {
		                v_4 = sbp.cursor;
		                lab5: do {
		                    golab6: while(true)
		                    {
		                        v_5 = sbp.cursor;
		                        lab7: do {
		                            if (!(sbp.in_grouping(g_v, 97, 252)))
		                            {
		                                break lab7;
		                            }
		                            sbp.bra = sbp.cursor;
		                            lab8: do {
		                                v_6 = sbp.cursor;
		                                lab9: do {
		                                    if (!(sbp.eq_s(1, "u")))
		                                    {
		                                        break lab9;
		                                    }
		                                    sbp.ket = sbp.cursor;
		                                    if (!(sbp.in_grouping(g_v, 97, 252)))
		                                    {
		                                        break lab9;
		                                    }
		                                    sbp.slice_from("U");
		                                    break lab8;
		                                } while (false);
		                                sbp.cursor = v_6;
		                                if (!(sbp.eq_s(1, "y")))
		                                {
		                                    break lab7;
		                                }
		                                sbp.ket = sbp.cursor;
		                                if (!(sbp.in_grouping(g_v, 97, 252)))
		                                {
		                                    break lab7;
		                                }
		                                sbp.slice_from("Y");
		                            } while (false);
		                            sbp.cursor = v_5;
		                            break golab6;
		                        } while (false);
		                        sbp.cursor = v_5;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab5;
		                        }
		                        sbp.cursor++;
		                    }
		                    continue replab4;
		                } while (false);
		                sbp.cursor = v_4;
		                break replab4;
		            }
		            return true;
		        }
		
		        function r_mark_regions() {
		            var v_1;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            {
		                var c = sbp.cursor + 3;
		                if (0 > c || c > sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor = c;
		            }
		            I_x = sbp.cursor;
		            sbp.cursor = v_1;
		            golab0: while(true)
		            {
		                lab1: do {
		                    if (!(sbp.in_grouping(g_v, 97, 252)))
		                    {
		                        break lab1;
		                    }
		                    break golab0;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab2: while(true)
		            {
		                lab3: do {
		                    if (!(sbp.out_grouping(g_v, 97, 252)))
		                    {
		                        break lab3;
		                    }
		                    break golab2;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p1 = sbp.cursor;
		            lab4: do {
		                if (!(I_p1 < I_x))
		                {
		                    break lab4;
		                }
		                I_p1 = I_x;
		            } while (false);
		            golab5: while(true)
		            {
		                lab6: do {
		                    if (!(sbp.in_grouping(g_v, 97, 252)))
		                    {
		                        break lab6;
		                    }
		                    break golab5;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab7: while(true)
		            {
		                lab8: do {
		                    if (!(sbp.out_grouping(g_v, 97, 252)))
		                    {
		                        break lab8;
		                    }
		                    break golab7;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p2 = sbp.cursor;
		            return true;
		        }
		
		        function r_postlude() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_0, 6);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("y");
		                            break;
		                        case 2:
		                            sbp.slice_from("u");
		                            break;
		                        case 3:
		                            sbp.slice_from("a");
		                            break;
		                        case 4:
		                            sbp.slice_from("o");
		                            break;
		                        case 5:
		                            sbp.slice_from("u");
		                            break;
		                        case 6:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_standard_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                sbp.ket = sbp.cursor;
		                among_var = sbp.find_among_b(a_1, 7);
		                if (among_var == 0)
		                {
		                    break lab0;
		                }
		                sbp.bra = sbp.cursor;
		                if (!r_R1())
		                {
		                    break lab0;
		                }
		                switch(among_var) {
		                    case 0:
		                        break lab0;
		                    case 1:
		                        sbp.slice_del();
		                        break;
		                    case 2:
		                        sbp.slice_del();
		                        v_2 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            sbp.ket = sbp.cursor;
		                            if (!(sbp.eq_s_b(1, "s")))
		                            {
		                                sbp.cursor = sbp.limit - v_2;
		                                break lab1;
		                            }
		                            sbp.bra = sbp.cursor;
		                            if (!(sbp.eq_s_b(3, "nis")))
		                            {
		                                sbp.cursor = sbp.limit - v_2;
		                                break lab1;
		                            }
		                            sbp.slice_del();
		                        } while (false);
		                        break;
		                    case 3:
		                        if (!(sbp.in_grouping_b(g_s_ending, 98, 116)))
		                        {
		                            break lab0;
		                        }
		                        sbp.slice_del();
		                        break;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_1;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                sbp.ket = sbp.cursor;
		                among_var = sbp.find_among_b(a_2, 4);
		                if (among_var == 0)
		                {
		                    break lab2;
		                }
		                sbp.bra = sbp.cursor;
		                if (!r_R1())
		                {
		                    break lab2;
		                }
		                switch(among_var) {
		                    case 0:
		                        break lab2;
		                    case 1:
		                        sbp.slice_del();
		                        break;
		                    case 2:
		                        if (!(sbp.in_grouping_b(g_st_ending, 98, 116)))
		                        {
		                            break lab2;
		                        }
		                        {
		                            var c = sbp.cursor - 3;
		                            if (sbp.limit_backward > c || c > sbp.limit)
		                            {
		                                break lab2;
		                            }
		                            sbp.cursor = c;
		                        }
		                        sbp.slice_del();
		                        break;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                sbp.ket = sbp.cursor;
		                among_var = sbp.find_among_b(a_4, 8);
		                if (among_var == 0)
		                {
		                    break lab3;
		                }
		                sbp.bra = sbp.cursor;
		                if (!r_R2())
		                {
		                    break lab3;
		                }
		                switch(among_var) {
		                    case 0:
		                        break lab3;
		                    case 1:
		                        sbp.slice_del();
		                        v_5 = sbp.limit - sbp.cursor;
		                        lab4: do {
		                            sbp.ket = sbp.cursor;
		                            if (!(sbp.eq_s_b(2, "ig")))
		                            {
		                                sbp.cursor = sbp.limit - v_5;
		                                break lab4;
		                            }
		                            sbp.bra = sbp.cursor;
		                            {
		                                v_6 = sbp.limit - sbp.cursor;
		                                lab5: do {
		                                    if (!(sbp.eq_s_b(1, "e")))
		                                    {
		                                        break lab5;
		                                    }
		                                    sbp.cursor = sbp.limit - v_5;
		                                    break lab4;
		                                } while (false);
		                                sbp.cursor = sbp.limit - v_6;
		                            }
		                            if (!r_R2())
		                            {
		                                sbp.cursor = sbp.limit - v_5;
		                                break lab4;
		                            }
		                            sbp.slice_del();
		                        } while (false);
		                        break;
		                    case 2:
		                        {
		                            v_7 = sbp.limit - sbp.cursor;
		                            lab6: do {
		                                if (!(sbp.eq_s_b(1, "e")))
		                                {
		                                    break lab6;
		                                }
		                                break lab3;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_7;
		                        }
		                        sbp.slice_del();
		                        break;
		                    case 3:
		                        sbp.slice_del();
		                        v_8 = sbp.limit - sbp.cursor;
		                        lab7: do {
		                            sbp.ket = sbp.cursor;
		                            lab8: do {
		                                v_9 = sbp.limit - sbp.cursor;
		                                lab9: do {
		                                    if (!(sbp.eq_s_b(2, "er")))
		                                    {
		                                        break lab9;
		                                    }
		                                    break lab8;
		                                } while (false);
		                                sbp.cursor = sbp.limit - v_9;
		                                if (!(sbp.eq_s_b(2, "en")))
		                                {
		                                    sbp.cursor = sbp.limit - v_8;
		                                    break lab7;
		                                }
		                            } while (false);
		                            sbp.bra = sbp.cursor;
		                            if (!r_R1())
		                            {
		                                sbp.cursor = sbp.limit - v_8;
		                                break lab7;
		                            }
		                            sbp.slice_del();
		                        } while (false);
		                        break;
		                    case 4:
		                        sbp.slice_del();
		                        v_10 = sbp.limit - sbp.cursor;
		                        lab10: do {
		                            sbp.ket = sbp.cursor;
		                            among_var = sbp.find_among_b(a_3, 2);
		                            if (among_var == 0)
		                            {
		                                sbp.cursor = sbp.limit - v_10;
		                                break lab10;
		                            }
		                            sbp.bra = sbp.cursor;
		                            if (!r_R2())
		                            {
		                                sbp.cursor = sbp.limit - v_10;
		                                break lab10;
		                            }
		                            switch(among_var) {
		                                case 0:
		                                    sbp.cursor = sbp.limit - v_10;
		                                    break lab10;
		                                case 1:
		                                    sbp.slice_del();
		                                    break;
		                            }
		                        } while (false);
		                        break;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_prelude())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                if (!r_mark_regions())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = v_2;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_standard_suffix())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            sbp.cursor = sbp.limit_backward;            v_4 = sbp.cursor;
		            lab3: do {
		                if (!r_postlude())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = v_4;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		hungarianStemmer : function() {

		        var a_0 = [
		            new Among ( "cs", -1, -1 ),
		            new Among ( "dzs", -1, -1 ),
		            new Among ( "gy", -1, -1 ),
		            new Among ( "ly", -1, -1 ),
		            new Among ( "ny", -1, -1 ),
		            new Among ( "sz", -1, -1 ),
		            new Among ( "ty", -1, -1 ),
		            new Among ( "zs", -1, -1 )
		        ];
		
		        var a_1 = [
		            new Among ( "\u00E1", -1, 1 ),
		            new Among ( "\u00E9", -1, 2 )
		        ];
		
		        var a_2 = [
		            new Among ( "bb", -1, -1 ),
		            new Among ( "cc", -1, -1 ),
		            new Among ( "dd", -1, -1 ),
		            new Among ( "ff", -1, -1 ),
		            new Among ( "gg", -1, -1 ),
		            new Among ( "jj", -1, -1 ),
		            new Among ( "kk", -1, -1 ),
		            new Among ( "ll", -1, -1 ),
		            new Among ( "mm", -1, -1 ),
		            new Among ( "nn", -1, -1 ),
		            new Among ( "pp", -1, -1 ),
		            new Among ( "rr", -1, -1 ),
		            new Among ( "ccs", -1, -1 ),
		            new Among ( "ss", -1, -1 ),
		            new Among ( "zzs", -1, -1 ),
		            new Among ( "tt", -1, -1 ),
		            new Among ( "vv", -1, -1 ),
		            new Among ( "ggy", -1, -1 ),
		            new Among ( "lly", -1, -1 ),
		            new Among ( "nny", -1, -1 ),
		            new Among ( "tty", -1, -1 ),
		            new Among ( "ssz", -1, -1 ),
		            new Among ( "zz", -1, -1 )
		        ];
		
		        var a_3 = [
		            new Among ( "al", -1, 1 ),
		            new Among ( "el", -1, 2 )
		        ];
		
		        var a_4 = [
		            new Among ( "ba", -1, -1 ),
		            new Among ( "ra", -1, -1 ),
		            new Among ( "be", -1, -1 ),
		            new Among ( "re", -1, -1 ),
		            new Among ( "ig", -1, -1 ),
		            new Among ( "nak", -1, -1 ),
		            new Among ( "nek", -1, -1 ),
		            new Among ( "val", -1, -1 ),
		            new Among ( "vel", -1, -1 ),
		            new Among ( "ul", -1, -1 ),
		            new Among ( "n\u00E1l", -1, -1 ),
		            new Among ( "n\u00E9l", -1, -1 ),
		            new Among ( "b\u00F3l", -1, -1 ),
		            new Among ( "r\u00F3l", -1, -1 ),
		            new Among ( "t\u00F3l", -1, -1 ),
		            new Among ( "b\u00F5l", -1, -1 ),
		            new Among ( "r\u00F5l", -1, -1 ),
		            new Among ( "t\u00F5l", -1, -1 ),
		            new Among ( "\u00FCl", -1, -1 ),
		            new Among ( "n", -1, -1 ),
		            new Among ( "an", 19, -1 ),
		            new Among ( "ban", 20, -1 ),
		            new Among ( "en", 19, -1 ),
		            new Among ( "ben", 22, -1 ),
		            new Among ( "k\u00E9ppen", 22, -1 ),
		            new Among ( "on", 19, -1 ),
		            new Among ( "\u00F6n", 19, -1 ),
		            new Among ( "k\u00E9pp", -1, -1 ),
		            new Among ( "kor", -1, -1 ),
		            new Among ( "t", -1, -1 ),
		            new Among ( "at", 29, -1 ),
		            new Among ( "et", 29, -1 ),
		            new Among ( "k\u00E9nt", 29, -1 ),
		            new Among ( "ank\u00E9nt", 32, -1 ),
		            new Among ( "enk\u00E9nt", 32, -1 ),
		            new Among ( "onk\u00E9nt", 32, -1 ),
		            new Among ( "ot", 29, -1 ),
		            new Among ( "\u00E9rt", 29, -1 ),
		            new Among ( "\u00F6t", 29, -1 ),
		            new Among ( "hez", -1, -1 ),
		            new Among ( "hoz", -1, -1 ),
		            new Among ( "h\u00F6z", -1, -1 ),
		            new Among ( "v\u00E1", -1, -1 ),
		            new Among ( "v\u00E9", -1, -1 )
		        ];
		
		        var a_5 = [
		            new Among ( "\u00E1n", -1, 2 ),
		            new Among ( "\u00E9n", -1, 1 ),
		            new Among ( "\u00E1nk\u00E9nt", -1, 3 )
		        ];
		
		        var a_6 = [
		            new Among ( "stul", -1, 2 ),
		            new Among ( "astul", 0, 1 ),
		            new Among ( "\u00E1stul", 0, 3 ),
		            new Among ( "st\u00FCl", -1, 2 ),
		            new Among ( "est\u00FCl", 3, 1 ),
		            new Among ( "\u00E9st\u00FCl", 3, 4 )
		        ];
		
		        var a_7 = [
		            new Among ( "\u00E1", -1, 1 ),
		            new Among ( "\u00E9", -1, 2 )
		        ];
		
		        var a_8 = [
		            new Among ( "k", -1, 7 ),
		            new Among ( "ak", 0, 4 ),
		            new Among ( "ek", 0, 6 ),
		            new Among ( "ok", 0, 5 ),
		            new Among ( "\u00E1k", 0, 1 ),
		            new Among ( "\u00E9k", 0, 2 ),
		            new Among ( "\u00F6k", 0, 3 )
		        ];
		
		        var a_9 = [
		            new Among ( "\u00E9i", -1, 7 ),
		            new Among ( "\u00E1\u00E9i", 0, 6 ),
		            new Among ( "\u00E9\u00E9i", 0, 5 ),
		            new Among ( "\u00E9", -1, 9 ),
		            new Among ( "k\u00E9", 3, 4 ),
		            new Among ( "ak\u00E9", 4, 1 ),
		            new Among ( "ek\u00E9", 4, 1 ),
		            new Among ( "ok\u00E9", 4, 1 ),
		            new Among ( "\u00E1k\u00E9", 4, 3 ),
		            new Among ( "\u00E9k\u00E9", 4, 2 ),
		            new Among ( "\u00F6k\u00E9", 4, 1 ),
		            new Among ( "\u00E9\u00E9", 3, 8 )
		        ];
		
		        var a_10 = [
		            new Among ( "a", -1, 18 ),
		            new Among ( "ja", 0, 17 ),
		            new Among ( "d", -1, 16 ),
		            new Among ( "ad", 2, 13 ),
		            new Among ( "ed", 2, 13 ),
		            new Among ( "od", 2, 13 ),
		            new Among ( "\u00E1d", 2, 14 ),
		            new Among ( "\u00E9d", 2, 15 ),
		            new Among ( "\u00F6d", 2, 13 ),
		            new Among ( "e", -1, 18 ),
		            new Among ( "je", 9, 17 ),
		            new Among ( "nk", -1, 4 ),
		            new Among ( "unk", 11, 1 ),
		            new Among ( "\u00E1nk", 11, 2 ),
		            new Among ( "\u00E9nk", 11, 3 ),
		            new Among ( "\u00FCnk", 11, 1 ),
		            new Among ( "uk", -1, 8 ),
		            new Among ( "juk", 16, 7 ),
		            new Among ( "\u00E1juk", 17, 5 ),
		            new Among ( "\u00FCk", -1, 8 ),
		            new Among ( "j\u00FCk", 19, 7 ),
		            new Among ( "\u00E9j\u00FCk", 20, 6 ),
		            new Among ( "m", -1, 12 ),
		            new Among ( "am", 22, 9 ),
		            new Among ( "em", 22, 9 ),
		            new Among ( "om", 22, 9 ),
		            new Among ( "\u00E1m", 22, 10 ),
		            new Among ( "\u00E9m", 22, 11 ),
		            new Among ( "o", -1, 18 ),
		            new Among ( "\u00E1", -1, 19 ),
		            new Among ( "\u00E9", -1, 20 )
		        ];
		
		        var a_11 = [
		            new Among ( "id", -1, 10 ),
		            new Among ( "aid", 0, 9 ),
		            new Among ( "jaid", 1, 6 ),
		            new Among ( "eid", 0, 9 ),
		            new Among ( "jeid", 3, 6 ),
		            new Among ( "\u00E1id", 0, 7 ),
		            new Among ( "\u00E9id", 0, 8 ),
		            new Among ( "i", -1, 15 ),
		            new Among ( "ai", 7, 14 ),
		            new Among ( "jai", 8, 11 ),
		            new Among ( "ei", 7, 14 ),
		            new Among ( "jei", 10, 11 ),
		            new Among ( "\u00E1i", 7, 12 ),
		            new Among ( "\u00E9i", 7, 13 ),
		            new Among ( "itek", -1, 24 ),
		            new Among ( "eitek", 14, 21 ),
		            new Among ( "jeitek", 15, 20 ),
		            new Among ( "\u00E9itek", 14, 23 ),
		            new Among ( "ik", -1, 29 ),
		            new Among ( "aik", 18, 26 ),
		            new Among ( "jaik", 19, 25 ),
		            new Among ( "eik", 18, 26 ),
		            new Among ( "jeik", 21, 25 ),
		            new Among ( "\u00E1ik", 18, 27 ),
		            new Among ( "\u00E9ik", 18, 28 ),
		            new Among ( "ink", -1, 20 ),
		            new Among ( "aink", 25, 17 ),
		            new Among ( "jaink", 26, 16 ),
		            new Among ( "eink", 25, 17 ),
		            new Among ( "jeink", 28, 16 ),
		            new Among ( "\u00E1ink", 25, 18 ),
		            new Among ( "\u00E9ink", 25, 19 ),
		            new Among ( "aitok", -1, 21 ),
		            new Among ( "jaitok", 32, 20 ),
		            new Among ( "\u00E1itok", -1, 22 ),
		            new Among ( "im", -1, 5 ),
		            new Among ( "aim", 35, 4 ),
		            new Among ( "jaim", 36, 1 ),
		            new Among ( "eim", 35, 4 ),
		            new Among ( "jeim", 38, 1 ),
		            new Among ( "\u00E1im", 35, 2 ),
		            new Among ( "\u00E9im", 35, 3 )
		        ];
		
		        var g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 52, 14 ];
		
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            var v_3;
		            I_p1 = sbp.limit;
		            lab0: do {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    if (!(sbp.in_grouping(g_v, 97, 252)))
		                    {
		                        break lab1;
		                    }
		                    golab2: while(true)
		                    {
		                        v_2 = sbp.cursor;
		                        lab3: do {
		                            if (!(sbp.out_grouping(g_v, 97, 252)))
		                            {
		                                break lab3;
		                            }
		                            sbp.cursor = v_2;
		                            break golab2;
		                        } while (false);
		                        sbp.cursor = v_2;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab1;
		                        }
		                        sbp.cursor++;
		                    }
		                    lab4: do {
		                        v_3 = sbp.cursor;
		                        lab5: do {
		                            if (sbp.find_among(a_0, 8) == 0)
		                            {
		                                break lab5;
		                            }
		                            break lab4;
		                        } while (false);
		                        sbp.cursor = v_3;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab1;
		                        }
		                        sbp.cursor++;
		                    } while (false);
		                    I_p1 = sbp.cursor;
		                    break lab0;
		                } while (false);
		                sbp.cursor = v_1;
		                if (!(sbp.out_grouping(g_v, 97, 252)))
		                {
		                    return false;
		                }
		                golab6: while(true)
		                {
		                    lab7: do {
		                        if (!(sbp.in_grouping(g_v, 97, 252)))
		                        {
		                            break lab7;
		                        }
		                        break golab6;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        return false;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		            } while (false);
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_v_ending() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_1, 2);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("a");
		                    break;
		                case 2:
		                    sbp.slice_from("e");
		                    break;
		            }
		            return true;
		        }
		
		        function r_double() {
		            var v_1;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.find_among_b(a_2, 23) == 0)
		            {
		                return false;
		            }
		            sbp.cursor = sbp.limit - v_1;
		            return true;
		        }
		
		        function r_undouble() {
		            if (sbp.cursor <= sbp.limit_backward)
		            {
		                return false;
		            }
		            sbp.cursor--;
		            sbp.ket = sbp.cursor;
		            {
		                var c = sbp.cursor - 1;
		                if (sbp.limit_backward > c || c > sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor = c;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_instrum() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 2);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_double())
		                    {
		                        return false;
		                    }
		                    break;
		                case 2:
		                    if (!r_double())
		                    {
		                        return false;
		                    }
		                    break;
		            }
		            sbp.slice_del();
		            if (!r_undouble())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_case() {
		            sbp.ket = sbp.cursor;
		            if (sbp.find_among_b(a_4, 44) == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            sbp.slice_del();
		            if (!r_v_ending())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_case_special() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_5, 3);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("e");
		                    break;
		                case 2:
		                    sbp.slice_from("a");
		                    break;
		                case 3:
		                    sbp.slice_from("a");
		                    break;
		            }
		            return true;
		        }
		
		        function r_case_other() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 6);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    break;
		                case 3:
		                    sbp.slice_from("a");
		                    break;
		                case 4:
		                    sbp.slice_from("e");
		                    break;
		            }
		            return true;
		        }
		
		        function r_factive() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 2);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_double())
		                    {
		                        return false;
		                    }
		                    break;
		                case 2:
		                    if (!r_double())
		                    {
		                        return false;
		                    }
		                    break;
		            }
		            sbp.slice_del();
		            if (!r_undouble())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_plural() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_8, 7);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("a");
		                    break;
		                case 2:
		                    sbp.slice_from("e");
		                    break;
		                case 3:
		                    sbp.slice_del();
		                    break;
		                case 4:
		                    sbp.slice_del();
		                    break;
		                case 5:
		                    sbp.slice_del();
		                    break;
		                case 6:
		                    sbp.slice_del();
		                    break;
		                case 7:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_owned() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_9, 12);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("e");
		                    break;
		                case 3:
		                    sbp.slice_from("a");
		                    break;
		                case 4:
		                    sbp.slice_del();
		                    break;
		                case 5:
		                    sbp.slice_from("e");
		                    break;
		                case 6:
		                    sbp.slice_from("a");
		                    break;
		                case 7:
		                    sbp.slice_del();
		                    break;
		                case 8:
		                    sbp.slice_from("e");
		                    break;
		                case 9:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_sing_owner() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_10, 31);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("a");
		                    break;
		                case 3:
		                    sbp.slice_from("e");
		                    break;
		                case 4:
		                    sbp.slice_del();
		                    break;
		                case 5:
		                    sbp.slice_from("a");
		                    break;
		                case 6:
		                    sbp.slice_from("e");
		                    break;
		                case 7:
		                    sbp.slice_del();
		                    break;
		                case 8:
		                    sbp.slice_del();
		                    break;
		                case 9:
		                    sbp.slice_del();
		                    break;
		                case 10:
		                    sbp.slice_from("a");
		                    break;
		                case 11:
		                    sbp.slice_from("e");
		                    break;
		                case 12:
		                    sbp.slice_del();
		                    break;
		                case 13:
		                    sbp.slice_del();
		                    break;
		                case 14:
		                    sbp.slice_from("a");
		                    break;
		                case 15:
		                    sbp.slice_from("e");
		                    break;
		                case 16:
		                    sbp.slice_del();
		                    break;
		                case 17:
		                    sbp.slice_del();
		                    break;
		                case 18:
		                    sbp.slice_del();
		                    break;
		                case 19:
		                    sbp.slice_from("a");
		                    break;
		                case 20:
		                    sbp.slice_from("e");
		                    break;
		            }
		            return true;
		        }
		
		        function r_plur_owner() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_11, 42);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("a");
		                    break;
		                case 3:
		                    sbp.slice_from("e");
		                    break;
		                case 4:
		                    sbp.slice_del();
		                    break;
		                case 5:
		                    sbp.slice_del();
		                    break;
		                case 6:
		                    sbp.slice_del();
		                    break;
		                case 7:
		                    sbp.slice_from("a");
		                    break;
		                case 8:
		                    sbp.slice_from("e");
		                    break;
		                case 9:
		                    sbp.slice_del();
		                    break;
		                case 10:
		                    sbp.slice_del();
		                    break;
		                case 11:
		                    sbp.slice_del();
		                    break;
		                case 12:
		                    sbp.slice_from("a");
		                    break;
		                case 13:
		                    sbp.slice_from("e");
		                    break;
		                case 14:
		                    sbp.slice_del();
		                    break;
		                case 15:
		                    sbp.slice_del();
		                    break;
		                case 16:
		                    sbp.slice_del();
		                    break;
		                case 17:
		                    sbp.slice_del();
		                    break;
		                case 18:
		                    sbp.slice_from("a");
		                    break;
		                case 19:
		                    sbp.slice_from("e");
		                    break;
		                case 20:
		                    sbp.slice_del();
		                    break;
		                case 21:
		                    sbp.slice_del();
		                    break;
		                case 22:
		                    sbp.slice_from("a");
		                    break;
		                case 23:
		                    sbp.slice_from("e");
		                    break;
		                case 24:
		                    sbp.slice_del();
		                    break;
		                case 25:
		                    sbp.slice_del();
		                    break;
		                case 26:
		                    sbp.slice_del();
		                    break;
		                case 27:
		                    sbp.slice_from("a");
		                    break;
		                case 28:
		                    sbp.slice_from("e");
		                    break;
		                case 29:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_instrum())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_case())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                if (!r_case_special())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            v_5 = sbp.limit - sbp.cursor;
		            lab4: do {
		                if (!r_case_other())
		                {
		                    break lab4;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            v_6 = sbp.limit - sbp.cursor;
		            lab5: do {
		                if (!r_factive())
		                {
		                    break lab5;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_6;
		            v_7 = sbp.limit - sbp.cursor;
		            lab6: do {
		                if (!r_owned())
		                {
		                    break lab6;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_7;
		            v_8 = sbp.limit - sbp.cursor;
		            lab7: do {
		                if (!r_sing_owner())
		                {
		                    break lab7;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_8;
		            v_9 = sbp.limit - sbp.cursor;
		            lab8: do {
		                if (!r_plur_owner())
		                {
		                    break lab8;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_9;
		            v_10 = sbp.limit - sbp.cursor;
		            lab9: do {
		                if (!r_plural())
		                {
		                    break lab9;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_10;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		italianStemmer : function() {

		        var a_0 = [
		            new Among ( "", -1, 7 ),
		            new Among ( "qu", 0, 6 ),
		            new Among ( "\u00E1", 0, 1 ),
		            new Among ( "\u00E9", 0, 2 ),
		            new Among ( "\u00ED", 0, 3 ),
		            new Among ( "\u00F3", 0, 4 ),
		            new Among ( "\u00FA", 0, 5 )
		        ];
		
		        var a_1 = [
		            new Among ( "", -1, 3 ),
		            new Among ( "I", 0, 1 ),
		            new Among ( "U", 0, 2 )
		        ];
		
		        var a_2 = [
		            new Among ( "la", -1, -1 ),
		            new Among ( "cela", 0, -1 ),
		            new Among ( "gliela", 0, -1 ),
		            new Among ( "mela", 0, -1 ),
		            new Among ( "tela", 0, -1 ),
		            new Among ( "vela", 0, -1 ),
		            new Among ( "le", -1, -1 ),
		            new Among ( "cele", 6, -1 ),
		            new Among ( "gliele", 6, -1 ),
		            new Among ( "mele", 6, -1 ),
		            new Among ( "tele", 6, -1 ),
		            new Among ( "vele", 6, -1 ),
		            new Among ( "ne", -1, -1 ),
		            new Among ( "cene", 12, -1 ),
		            new Among ( "gliene", 12, -1 ),
		            new Among ( "mene", 12, -1 ),
		            new Among ( "sene", 12, -1 ),
		            new Among ( "tene", 12, -1 ),
		            new Among ( "vene", 12, -1 ),
		            new Among ( "ci", -1, -1 ),
		            new Among ( "li", -1, -1 ),
		            new Among ( "celi", 20, -1 ),
		            new Among ( "glieli", 20, -1 ),
		            new Among ( "meli", 20, -1 ),
		            new Among ( "teli", 20, -1 ),
		            new Among ( "veli", 20, -1 ),
		            new Among ( "gli", 20, -1 ),
		            new Among ( "mi", -1, -1 ),
		            new Among ( "si", -1, -1 ),
		            new Among ( "ti", -1, -1 ),
		            new Among ( "vi", -1, -1 ),
		            new Among ( "lo", -1, -1 ),
		            new Among ( "celo", 31, -1 ),
		            new Among ( "glielo", 31, -1 ),
		            new Among ( "melo", 31, -1 ),
		            new Among ( "telo", 31, -1 ),
		            new Among ( "velo", 31, -1 )
		        ];
		
		        var a_3 = [
		            new Among ( "ando", -1, 1 ),
		            new Among ( "endo", -1, 1 ),
		            new Among ( "ar", -1, 2 ),
		            new Among ( "er", -1, 2 ),
		            new Among ( "ir", -1, 2 )
		        ];
		
		        var a_4 = [
		            new Among ( "ic", -1, -1 ),
		            new Among ( "abil", -1, -1 ),
		            new Among ( "os", -1, -1 ),
		            new Among ( "iv", -1, 1 )
		        ];
		
		        var a_5 = [
		            new Among ( "ic", -1, 1 ),
		            new Among ( "abil", -1, 1 ),
		            new Among ( "iv", -1, 1 )
		        ];
		
		        var a_6 = [
		            new Among ( "ica", -1, 1 ),
		            new Among ( "logia", -1, 3 ),
		            new Among ( "osa", -1, 1 ),
		            new Among ( "ista", -1, 1 ),
		            new Among ( "iva", -1, 9 ),
		            new Among ( "anza", -1, 1 ),
		            new Among ( "enza", -1, 5 ),
		            new Among ( "ice", -1, 1 ),
		            new Among ( "atrice", 7, 1 ),
		            new Among ( "iche", -1, 1 ),
		            new Among ( "logie", -1, 3 ),
		            new Among ( "abile", -1, 1 ),
		            new Among ( "ibile", -1, 1 ),
		            new Among ( "usione", -1, 4 ),
		            new Among ( "azione", -1, 2 ),
		            new Among ( "uzione", -1, 4 ),
		            new Among ( "atore", -1, 2 ),
		            new Among ( "ose", -1, 1 ),
		            new Among ( "ante", -1, 1 ),
		            new Among ( "mente", -1, 1 ),
		            new Among ( "amente", 19, 7 ),
		            new Among ( "iste", -1, 1 ),
		            new Among ( "ive", -1, 9 ),
		            new Among ( "anze", -1, 1 ),
		            new Among ( "enze", -1, 5 ),
		            new Among ( "ici", -1, 1 ),
		            new Among ( "atrici", 25, 1 ),
		            new Among ( "ichi", -1, 1 ),
		            new Among ( "abili", -1, 1 ),
		            new Among ( "ibili", -1, 1 ),
		            new Among ( "ismi", -1, 1 ),
		            new Among ( "usioni", -1, 4 ),
		            new Among ( "azioni", -1, 2 ),
		            new Among ( "uzioni", -1, 4 ),
		            new Among ( "atori", -1, 2 ),
		            new Among ( "osi", -1, 1 ),
		            new Among ( "anti", -1, 1 ),
		            new Among ( "amenti", -1, 6 ),
		            new Among ( "imenti", -1, 6 ),
		            new Among ( "isti", -1, 1 ),
		            new Among ( "ivi", -1, 9 ),
		            new Among ( "ico", -1, 1 ),
		            new Among ( "ismo", -1, 1 ),
		            new Among ( "oso", -1, 1 ),
		            new Among ( "amento", -1, 6 ),
		            new Among ( "imento", -1, 6 ),
		            new Among ( "ivo", -1, 9 ),
		            new Among ( "it\u00E0", -1, 8 ),
		            new Among ( "ist\u00E0", -1, 1 ),
		            new Among ( "ist\u00E8", -1, 1 ),
		            new Among ( "ist\u00EC", -1, 1 )
		        ];
		
		        var a_7 = [
		            new Among ( "isca", -1, 1 ),
		            new Among ( "enda", -1, 1 ),
		            new Among ( "ata", -1, 1 ),
		            new Among ( "ita", -1, 1 ),
		            new Among ( "uta", -1, 1 ),
		            new Among ( "ava", -1, 1 ),
		            new Among ( "eva", -1, 1 ),
		            new Among ( "iva", -1, 1 ),
		            new Among ( "erebbe", -1, 1 ),
		            new Among ( "irebbe", -1, 1 ),
		            new Among ( "isce", -1, 1 ),
		            new Among ( "ende", -1, 1 ),
		            new Among ( "are", -1, 1 ),
		            new Among ( "ere", -1, 1 ),
		            new Among ( "ire", -1, 1 ),
		            new Among ( "asse", -1, 1 ),
		            new Among ( "ate", -1, 1 ),
		            new Among ( "avate", 16, 1 ),
		            new Among ( "evate", 16, 1 ),
		            new Among ( "ivate", 16, 1 ),
		            new Among ( "ete", -1, 1 ),
		            new Among ( "erete", 20, 1 ),
		            new Among ( "irete", 20, 1 ),
		            new Among ( "ite", -1, 1 ),
		            new Among ( "ereste", -1, 1 ),
		            new Among ( "ireste", -1, 1 ),
		            new Among ( "ute", -1, 1 ),
		            new Among ( "erai", -1, 1 ),
		            new Among ( "irai", -1, 1 ),
		            new Among ( "isci", -1, 1 ),
		            new Among ( "endi", -1, 1 ),
		            new Among ( "erei", -1, 1 ),
		            new Among ( "irei", -1, 1 ),
		            new Among ( "assi", -1, 1 ),
		            new Among ( "ati", -1, 1 ),
		            new Among ( "iti", -1, 1 ),
		            new Among ( "eresti", -1, 1 ),
		            new Among ( "iresti", -1, 1 ),
		            new Among ( "uti", -1, 1 ),
		            new Among ( "avi", -1, 1 ),
		            new Among ( "evi", -1, 1 ),
		            new Among ( "ivi", -1, 1 ),
		            new Among ( "isco", -1, 1 ),
		            new Among ( "ando", -1, 1 ),
		            new Among ( "endo", -1, 1 ),
		            new Among ( "Yamo", -1, 1 ),
		            new Among ( "iamo", -1, 1 ),
		            new Among ( "avamo", -1, 1 ),
		            new Among ( "evamo", -1, 1 ),
		            new Among ( "ivamo", -1, 1 ),
		            new Among ( "eremo", -1, 1 ),
		            new Among ( "iremo", -1, 1 ),
		            new Among ( "assimo", -1, 1 ),
		            new Among ( "ammo", -1, 1 ),
		            new Among ( "emmo", -1, 1 ),
		            new Among ( "eremmo", 54, 1 ),
		            new Among ( "iremmo", 54, 1 ),
		            new Among ( "immo", -1, 1 ),
		            new Among ( "ano", -1, 1 ),
		            new Among ( "iscano", 58, 1 ),
		            new Among ( "avano", 58, 1 ),
		            new Among ( "evano", 58, 1 ),
		            new Among ( "ivano", 58, 1 ),
		            new Among ( "eranno", -1, 1 ),
		            new Among ( "iranno", -1, 1 ),
		            new Among ( "ono", -1, 1 ),
		            new Among ( "iscono", 65, 1 ),
		            new Among ( "arono", 65, 1 ),
		            new Among ( "erono", 65, 1 ),
		            new Among ( "irono", 65, 1 ),
		            new Among ( "erebbero", -1, 1 ),
		            new Among ( "irebbero", -1, 1 ),
		            new Among ( "assero", -1, 1 ),
		            new Among ( "essero", -1, 1 ),
		            new Among ( "issero", -1, 1 ),
		            new Among ( "ato", -1, 1 ),
		            new Among ( "ito", -1, 1 ),
		            new Among ( "uto", -1, 1 ),
		            new Among ( "avo", -1, 1 ),
		            new Among ( "evo", -1, 1 ),
		            new Among ( "ivo", -1, 1 ),
		            new Among ( "ar", -1, 1 ),
		            new Among ( "ir", -1, 1 ),
		            new Among ( "er\u00E0", -1, 1 ),
		            new Among ( "ir\u00E0", -1, 1 ),
		            new Among ( "er\u00F2", -1, 1 ),
		            new Among ( "ir\u00F2", -1, 1 )
		        ];
		
		        var g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 128, 8, 2, 1 ];
		
		        var g_AEIO = [17, 65, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 128, 8, 2 ];
		
		        var g_CG = [17 ];
		
		        var I_p2;
		        var I_p1;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_prelude() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            v_1 = sbp.cursor;
		            replab0: while(true)
		            {
		                v_2 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_0, 7);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("\u00E0");
		                            break;
		                        case 2:
		                            sbp.slice_from("\u00E8");
		                            break;
		                        case 3:
		                            sbp.slice_from("\u00EC");
		                            break;
		                        case 4:
		                            sbp.slice_from("\u00F2");
		                            break;
		                        case 5:
		                            sbp.slice_from("\u00F9");
		                            break;
		                        case 6:
		                            sbp.slice_from("qU");
		                            break;
		                        case 7:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_2;
		                break replab0;
		            }
		            sbp.cursor = v_1;
		            replab2: while(true)
		            {
		                v_3 = sbp.cursor;
		                lab3: do {
		                    golab4: while(true)
		                    {
		                        v_4 = sbp.cursor;
		                        lab5: do {
		                            if (!(sbp.in_grouping(g_v, 97, 249)))
		                            {
		                                break lab5;
		                            }
		                            sbp.bra = sbp.cursor;
		                            lab6: do {
		                                v_5 = sbp.cursor;
		                                lab7: do {
		                                    if (!(sbp.eq_s(1, "u")))
		                                    {
		                                        break lab7;
		                                    }
		                                    sbp.ket = sbp.cursor;
		                                    if (!(sbp.in_grouping(g_v, 97, 249)))
		                                    {
		                                        break lab7;
		                                    }
		                                    sbp.slice_from("U");
		                                    break lab6;
		                                } while (false);
		                                sbp.cursor = v_5;
		                                if (!(sbp.eq_s(1, "i")))
		                                {
		                                    break lab5;
		                                }
		                                sbp.ket = sbp.cursor;
		                                if (!(sbp.in_grouping(g_v, 97, 249)))
		                                {
		                                    break lab5;
		                                }
		                                sbp.slice_from("I");
		                            } while (false);
		                            sbp.cursor = v_4;
		                            break golab4;
		                        } while (false);
		                        sbp.cursor = v_4;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab3;
		                        }
		                        sbp.cursor++;
		                    }
		                    continue replab2;
		                } while (false);
		                sbp.cursor = v_3;
		                break replab2;
		            }
		            return true;
		        }
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_6;
		            var v_8;
		            I_pV = sbp.limit;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                lab1: do {
		                    v_2 = sbp.cursor;
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 97, 249)))
		                        {
		                            break lab2;
		                        }
		                        lab3: do {
		                            v_3 = sbp.cursor;
		                            lab4: do {
		                                if (!(sbp.out_grouping(g_v, 97, 249)))
		                                {
		                                    break lab4;
		                                }
		                                golab5: while(true)
		                                {
		                                    lab6: do {
		                                        if (!(sbp.in_grouping(g_v, 97, 249)))
		                                        {
		                                            break lab6;
		                                        }
		                                        break golab5;
		                                    } while (false);
		                                    if (sbp.cursor >= sbp.limit)
		                                    {
		                                        break lab4;
		                                    }
		                                    sbp.cursor++;
		                                }
		                                break lab3;
		                            } while (false);
		                            sbp.cursor = v_3;
		                            if (!(sbp.in_grouping(g_v, 97, 249)))
		                            {
		                                break lab2;
		                            }
		                            golab7: while(true)
		                            {
		                                lab8: do {
		                                    if (!(sbp.out_grouping(g_v, 97, 249)))
		                                    {
		                                        break lab8;
		                                    }
		                                    break golab7;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab2;
		                                }
		                                sbp.cursor++;
		                            }
		                        } while (false);
		                        break lab1;
		                    } while (false);
		                    sbp.cursor = v_2;
		                    if (!(sbp.out_grouping(g_v, 97, 249)))
		                    {
		                        break lab0;
		                    }
		                    lab9: do {
		                        v_6 = sbp.cursor;
		                        lab10: do {
		                            if (!(sbp.out_grouping(g_v, 97, 249)))
		                            {
		                                break lab10;
		                            }
		                            golab11: while(true)
		                            {
		                                lab12: do {
		                                    if (!(sbp.in_grouping(g_v, 97, 249)))
		                                    {
		                                        break lab12;
		                                    }
		                                    break golab11;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab10;
		                                }
		                                sbp.cursor++;
		                            }
		                            break lab9;
		                        } while (false);
		                        sbp.cursor = v_6;
		                        if (!(sbp.in_grouping(g_v, 97, 249)))
		                        {
		                            break lab0;
		                        }
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab0;
		                        }
		                        sbp.cursor++;
		                    } while (false);
		                } while (false);
		                I_pV = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            v_8 = sbp.cursor;
		            lab13: do {
		                golab14: while(true)
		                {
		                    lab15: do {
		                        if (!(sbp.in_grouping(g_v, 97, 249)))
		                        {
		                            break lab15;
		                        }
		                        break golab14;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab16: while(true)
		                {
		                    lab17: do {
		                        if (!(sbp.out_grouping(g_v, 97, 249)))
		                        {
		                            break lab17;
		                        }
		                        break golab16;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab18: while(true)
		                {
		                    lab19: do {
		                        if (!(sbp.in_grouping(g_v, 97, 249)))
		                        {
		                            break lab19;
		                        }
		                        break golab18;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab20: while(true)
		                {
		                    lab21: do {
		                        if (!(sbp.out_grouping(g_v, 97, 249)))
		                        {
		                            break lab21;
		                        }
		                        break golab20;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_8;
		            return true;
		        }
		
		        function r_postlude() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_1, 3);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("i");
		                            break;
		                        case 2:
		                            sbp.slice_from("u");
		                            break;
		                        case 3:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_RV() {
		            if (!(I_pV <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_attached_pronoun() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            if (sbp.find_among_b(a_2, 37) == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 5);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            if (!r_RV())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("e");
		                    break;
		            }
		            return true;
		        }
		
		        function r_standard_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 51);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_1 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "ic")))
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.slice_del();
		                    } while (false);
		                    break;
		                case 3:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("log");
		                    break;
		                case 4:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("u");
		                    break;
		                case 5:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ente");
		                    break;
		                case 6:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 7:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_2 = sbp.limit - sbp.cursor;
		                    lab1: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_4, 4);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_2;
		                            break lab1;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_2;
		                            break lab1;
		                        }
		                        sbp.slice_del();
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_2;
		                                break lab1;
		                            case 1:
		                                sbp.ket = sbp.cursor;
		                                if (!(sbp.eq_s_b(2, "at")))
		                                {
		                                    sbp.cursor = sbp.limit - v_2;
		                                    break lab1;
		                                }
		                                sbp.bra = sbp.cursor;
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_2;
		                                    break lab1;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 8:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_5, 3);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab2;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_3;
		                                break lab2;
		                            case 1:
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_3;
		                                    break lab2;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 9:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab3: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "at")))
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab3;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab3;
		                        }
		                        sbp.slice_del();
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "ic")))
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab3;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab3;
		                        }
		                        sbp.slice_del();
		                    } while (false);
		                    break;
		            }
		            return true;
		        }
		
		        function r_verb_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 87);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    sbp.limit_backward = v_2;
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            sbp.limit_backward = v_2;
		            return true;
		        }
		
		        function r_vowel_suffix() {
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.in_grouping_b(g_AEIO, 97, 242)))
		                {
		                    sbp.cursor = sbp.limit - v_1;
		                    break lab0;
		                }
		                sbp.bra = sbp.cursor;
		                if (!r_RV())
		                {
		                    sbp.cursor = sbp.limit - v_1;
		                    break lab0;
		                }
		                sbp.slice_del();
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(1, "i")))
		                {
		                    sbp.cursor = sbp.limit - v_1;
		                    break lab0;
		                }
		                sbp.bra = sbp.cursor;
		                if (!r_RV())
		                {
		                    sbp.cursor = sbp.limit - v_1;
		                    break lab0;
		                }
		                sbp.slice_del();
		            } while (false);
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(1, "h")))
		                {
		                    sbp.cursor = sbp.limit - v_2;
		                    break lab1;
		                }
		                sbp.bra = sbp.cursor;
		                if (!(sbp.in_grouping_b(g_CG, 99, 103)))
		                {
		                    sbp.cursor = sbp.limit - v_2;
		                    break lab1;
		                }
		                if (!r_RV())
		                {
		                    sbp.cursor = sbp.limit - v_2;
		                    break lab1;
		                }
		                sbp.slice_del();
		            } while (false);
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_prelude())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                if (!r_mark_regions())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = v_2;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_attached_pronoun())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                lab4: do {
		                    v_5 = sbp.limit - sbp.cursor;
		                    lab5: do {
		                        if (!r_standard_suffix())
		                        {
		                            break lab5;
		                        }
		                        break lab4;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_5;
		                    if (!r_verb_suffix())
		                    {
		                        break lab3;
		                    }
		                } while (false);
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            v_6 = sbp.limit - sbp.cursor;
		            lab6: do {
		                if (!r_vowel_suffix())
		                {
		                    break lab6;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_6;
		            sbp.cursor = sbp.limit_backward;            v_7 = sbp.cursor;
		            lab7: do {
		                if (!r_postlude())
		                {
		                    break lab7;
		                }
		            } while (false);
		            sbp.cursor = v_7;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		irishStemmer : function() {

		        var a_0 = [
		            new Among ( "b'", -1, 4 ),
		            new Among ( "bh", -1, 14 ),
		            new Among ( "bhf", 1, 9 ),
		            new Among ( "bp", -1, 11 ),
		            new Among ( "ch", -1, 15 ),
		            new Among ( "d'", -1, 2 ),
		            new Among ( "d'fh", 5, 3 ),
		            new Among ( "dh", -1, 16 ),
		            new Among ( "dt", -1, 13 ),
		            new Among ( "fh", -1, 17 ),
		            new Among ( "gc", -1, 7 ),
		            new Among ( "gh", -1, 18 ),
		            new Among ( "h-", -1, 1 ),
		            new Among ( "m'", -1, 4 ),
		            new Among ( "mb", -1, 6 ),
		            new Among ( "mh", -1, 19 ),
		            new Among ( "n-", -1, 1 ),
		            new Among ( "nd", -1, 8 ),
		            new Among ( "ng", -1, 10 ),
		            new Among ( "ph", -1, 20 ),
		            new Among ( "sh", -1, 5 ),
		            new Among ( "t-", -1, 1 ),
		            new Among ( "th", -1, 21 ),
		            new Among ( "ts", -1, 12 )
		        ];
		
		        var a_1 = [
		            new Among ( "\u00EDochta", -1, 1 ),
		            new Among ( "a\u00EDochta", 0, 1 ),
		            new Among ( "ire", -1, 2 ),
		            new Among ( "aire", 2, 2 ),
		            new Among ( "abh", -1, 1 ),
		            new Among ( "eabh", 4, 1 ),
		            new Among ( "ibh", -1, 1 ),
		            new Among ( "aibh", 6, 1 ),
		            new Among ( "amh", -1, 1 ),
		            new Among ( "eamh", 8, 1 ),
		            new Among ( "imh", -1, 1 ),
		            new Among ( "aimh", 10, 1 ),
		            new Among ( "\u00EDocht", -1, 1 ),
		            new Among ( "a\u00EDocht", 12, 1 ),
		            new Among ( "ir\u00ED", -1, 2 ),
		            new Among ( "air\u00ED", 14, 2 )
		        ];
		
		        var a_2 = [
		            new Among ( "\u00F3ideacha", -1, 6 ),
		            new Among ( "patacha", -1, 5 ),
		            new Among ( "achta", -1, 1 ),
		            new Among ( "arcachta", 2, 2 ),
		            new Among ( "eachta", 2, 1 ),
		            new Among ( "grafa\u00EDochta", -1, 4 ),
		            new Among ( "paite", -1, 5 ),
		            new Among ( "ach", -1, 1 ),
		            new Among ( "each", 7, 1 ),
		            new Among ( "\u00F3ideach", 8, 6 ),
		            new Among ( "gineach", 8, 3 ),
		            new Among ( "patach", 7, 5 ),
		            new Among ( "grafa\u00EDoch", -1, 4 ),
		            new Among ( "pataigh", -1, 5 ),
		            new Among ( "\u00F3idigh", -1, 6 ),
		            new Among ( "acht\u00FAil", -1, 1 ),
		            new Among ( "eacht\u00FAil", 15, 1 ),
		            new Among ( "gineas", -1, 3 ),
		            new Among ( "ginis", -1, 3 ),
		            new Among ( "acht", -1, 1 ),
		            new Among ( "arcacht", 19, 2 ),
		            new Among ( "eacht", 19, 1 ),
		            new Among ( "grafa\u00EDocht", -1, 4 ),
		            new Among ( "arcachta\u00ED", -1, 2 ),
		            new Among ( "grafa\u00EDochta\u00ED", -1, 4 )
		        ];
		
		        var a_3 = [
		            new Among ( "imid", -1, 1 ),
		            new Among ( "aimid", 0, 1 ),
		            new Among ( "\u00EDmid", -1, 1 ),
		            new Among ( "a\u00EDmid", 2, 1 ),
		            new Among ( "adh", -1, 2 ),
		            new Among ( "eadh", 4, 2 ),
		            new Among ( "faidh", -1, 1 ),
		            new Among ( "fidh", -1, 1 ),
		            new Among ( "\u00E1il", -1, 2 ),
		            new Among ( "ain", -1, 2 ),
		            new Among ( "tear", -1, 2 ),
		            new Among ( "tar", -1, 2 )
		        ];
		
		        var g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 2 ];
		
		        var I_p2;
		        var I_p1;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            var v_3;
		            I_pV = sbp.limit;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                golab1: while(true)
		                {
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 97, 250)))
		                        {
		                            break lab2;
		                        }
		                        break golab1;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_pV = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            v_3 = sbp.cursor;
		            lab3: do {
		                golab4: while(true)
		                {
		                    lab5: do {
		                        if (!(sbp.in_grouping(g_v, 97, 250)))
		                        {
		                            break lab5;
		                        }
		                        break golab4;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab3;
		                    }
		                    sbp.cursor++;
		                }
		                golab6: while(true)
		                {
		                    lab7: do {
		                        if (!(sbp.out_grouping(g_v, 97, 250)))
		                        {
		                            break lab7;
		                        }
		                        break golab6;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab3;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab8: while(true)
		                {
		                    lab9: do {
		                        if (!(sbp.in_grouping(g_v, 97, 250)))
		                        {
		                            break lab9;
		                        }
		                        break golab8;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab3;
		                    }
		                    sbp.cursor++;
		                }
		                golab10: while(true)
		                {
		                    lab11: do {
		                        if (!(sbp.out_grouping(g_v, 97, 250)))
		                        {
		                            break lab11;
		                        }
		                        break golab10;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab3;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_3;
		            return true;
		        }
		
		        function r_initial_morph() {
		            var among_var;
		            sbp.bra = sbp.cursor;
		            among_var = sbp.find_among(a_0, 24);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.ket = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    break;
		                case 3:
		                    sbp.slice_from("f");
		                    break;
		                case 4:
		                    sbp.slice_del();
		                    break;
		                case 5:
		                    sbp.slice_from("s");
		                    break;
		                case 6:
		                    sbp.slice_from("b");
		                    break;
		                case 7:
		                    sbp.slice_from("c");
		                    break;
		                case 8:
		                    sbp.slice_from("d");
		                    break;
		                case 9:
		                    sbp.slice_from("f");
		                    break;
		                case 10:
		                    sbp.slice_from("g");
		                    break;
		                case 11:
		                    sbp.slice_from("p");
		                    break;
		                case 12:
		                    sbp.slice_from("s");
		                    break;
		                case 13:
		                    sbp.slice_from("t");
		                    break;
		                case 14:
		                    sbp.slice_from("b");
		                    break;
		                case 15:
		                    sbp.slice_from("c");
		                    break;
		                case 16:
		                    sbp.slice_from("d");
		                    break;
		                case 17:
		                    sbp.slice_from("f");
		                    break;
		                case 18:
		                    sbp.slice_from("g");
		                    break;
		                case 19:
		                    sbp.slice_from("m");
		                    break;
		                case 20:
		                    sbp.slice_from("p");
		                    break;
		                case 21:
		                    sbp.slice_from("t");
		                    break;
		            }
		            return true;
		        }
		
		        function r_RV() {
		            if (!(I_pV <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_noun_sfx() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_1, 16);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_deriv() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 25);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("arc");
		                    break;
		                case 3:
		                    sbp.slice_from("gin");
		                    break;
		                case 4:
		                    sbp.slice_from("graf");
		                    break;
		                case 5:
		                    sbp.slice_from("paite");
		                    break;
		                case 6:
		                    sbp.slice_from("\u00F3id");
		                    break;
		            }
		            return true;
		        }
		
		        function r_verb_sfx() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 12);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_initial_morph())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                if (!r_mark_regions())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = v_2;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_noun_sfx())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                if (!r_deriv())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            v_5 = sbp.limit - sbp.cursor;
		            lab4: do {
		                if (!r_verb_sfx())
		                {
		                    break lab4;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		norwegianStemmer : function() {

		        var a_0 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "e", -1, 1 ),
		            new Among ( "ede", 1, 1 ),
		            new Among ( "ande", 1, 1 ),
		            new Among ( "ende", 1, 1 ),
		            new Among ( "ane", 1, 1 ),
		            new Among ( "ene", 1, 1 ),
		            new Among ( "hetene", 6, 1 ),
		            new Among ( "erte", 1, 3 ),
		            new Among ( "en", -1, 1 ),
		            new Among ( "heten", 9, 1 ),
		            new Among ( "ar", -1, 1 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "heter", 12, 1 ),
		            new Among ( "s", -1, 2 ),
		            new Among ( "as", 14, 1 ),
		            new Among ( "es", 14, 1 ),
		            new Among ( "edes", 16, 1 ),
		            new Among ( "endes", 16, 1 ),
		            new Among ( "enes", 16, 1 ),
		            new Among ( "hetenes", 19, 1 ),
		            new Among ( "ens", 14, 1 ),
		            new Among ( "hetens", 21, 1 ),
		            new Among ( "ers", 14, 1 ),
		            new Among ( "ets", 14, 1 ),
		            new Among ( "et", -1, 1 ),
		            new Among ( "het", 25, 1 ),
		            new Among ( "ert", -1, 3 ),
		            new Among ( "ast", -1, 1 )
		        ];
		
		        var a_1 = [
		            new Among ( "dt", -1, -1 ),
		            new Among ( "vt", -1, -1 )
		        ];
		
		        var a_2 = [
		            new Among ( "leg", -1, 1 ),
		            new Among ( "eleg", 0, 1 ),
		            new Among ( "ig", -1, 1 ),
		            new Among ( "eig", 2, 1 ),
		            new Among ( "lig", 2, 1 ),
		            new Among ( "elig", 4, 1 ),
		            new Among ( "els", -1, 1 ),
		            new Among ( "lov", -1, 1 ),
		            new Among ( "elov", 7, 1 ),
		            new Among ( "slov", 7, 1 ),
		            new Among ( "hetslov", 9, 1 )
		        ];
		
		        var g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 48, 0, 128 ];
		
		        var g_s_ending = [119, 125, 149, 1 ];
		
		        var I_x;
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            I_p1 = sbp.limit;
		            v_1 = sbp.cursor;
		            {
		                var c = sbp.cursor + 3;
		                if (0 > c || c > sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor = c;
		            }
		            I_x = sbp.cursor;
		            sbp.cursor = v_1;
		            golab0: while(true)
		            {
		                v_2 = sbp.cursor;
		                lab1: do {
		                    if (!(sbp.in_grouping(g_v, 97, 248)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = v_2;
		                    break golab0;
		                } while (false);
		                sbp.cursor = v_2;
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab2: while(true)
		            {
		                lab3: do {
		                    if (!(sbp.out_grouping(g_v, 97, 248)))
		                    {
		                        break lab3;
		                    }
		                    break golab2;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p1 = sbp.cursor;
		            lab4: do {
		                if (!(I_p1 < I_x))
		                {
		                    break lab4;
		                }
		                I_p1 = I_x;
		            } while (false);
		            return true;
		        }
		
		        function r_main_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 29);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    lab0: do {
		                        v_3 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            if (!(sbp.in_grouping_b(g_s_ending, 98, 122)))
		                            {
		                                break lab1;
		                            }
		                            break lab0;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                        if (!(sbp.eq_s_b(1, "k")))
		                        {
		                            return false;
		                        }
		                        if (!(sbp.out_grouping_b(g_v, 97, 248)))
		                        {
		                            return false;
		                        }
		                    } while (false);
		                    sbp.slice_del();
		                    break;
		                case 3:
		                    sbp.slice_from("er");
		                    break;
		            }
		            return true;
		        }
		
		        function r_consonant_pair() {
		            var v_1;
		            var v_2;
		            var v_3;
		            v_1 = sbp.limit - sbp.cursor;
		            v_2 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_3 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_2;
		            sbp.ket = sbp.cursor;
		            if (sbp.find_among_b(a_1, 2) == 0)
		            {
		                sbp.limit_backward = v_3;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_3;
		            sbp.cursor = sbp.limit - v_1;
		            if (sbp.cursor <= sbp.limit_backward)
		            {
		                return false;
		            }
		            sbp.cursor--;
		            sbp.bra = sbp.cursor;
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_other_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 11);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_main_suffix())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_consonant_pair())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                if (!r_other_suffix())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		porterStemmer : function() {

		        var a_0 = [
		            new Among ( "s", -1, 3 ),
		            new Among ( "ies", 0, 2 ),
		            new Among ( "sses", 0, 1 ),
		            new Among ( "ss", 0, -1 )
		        ];
		
		        var a_1 = [
		            new Among ( "", -1, 3 ),
		            new Among ( "bb", 0, 2 ),
		            new Among ( "dd", 0, 2 ),
		            new Among ( "ff", 0, 2 ),
		            new Among ( "gg", 0, 2 ),
		            new Among ( "bl", 0, 1 ),
		            new Among ( "mm", 0, 2 ),
		            new Among ( "nn", 0, 2 ),
		            new Among ( "pp", 0, 2 ),
		            new Among ( "rr", 0, 2 ),
		            new Among ( "at", 0, 1 ),
		            new Among ( "tt", 0, 2 ),
		            new Among ( "iz", 0, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ed", -1, 2 ),
		            new Among ( "eed", 0, 1 ),
		            new Among ( "ing", -1, 2 )
		        ];
		
		        var a_3 = [
		            new Among ( "anci", -1, 3 ),
		            new Among ( "enci", -1, 2 ),
		            new Among ( "abli", -1, 4 ),
		            new Among ( "eli", -1, 6 ),
		            new Among ( "alli", -1, 9 ),
		            new Among ( "ousli", -1, 12 ),
		            new Among ( "entli", -1, 5 ),
		            new Among ( "aliti", -1, 10 ),
		            new Among ( "biliti", -1, 14 ),
		            new Among ( "iviti", -1, 13 ),
		            new Among ( "tional", -1, 1 ),
		            new Among ( "ational", 10, 8 ),
		            new Among ( "alism", -1, 10 ),
		            new Among ( "ation", -1, 8 ),
		            new Among ( "ization", 13, 7 ),
		            new Among ( "izer", -1, 7 ),
		            new Among ( "ator", -1, 8 ),
		            new Among ( "iveness", -1, 13 ),
		            new Among ( "fulness", -1, 11 ),
		            new Among ( "ousness", -1, 12 )
		        ];
		
		        var a_4 = [
		            new Among ( "icate", -1, 2 ),
		            new Among ( "ative", -1, 3 ),
		            new Among ( "alize", -1, 1 ),
		            new Among ( "iciti", -1, 2 ),
		            new Among ( "ical", -1, 2 ),
		            new Among ( "ful", -1, 3 ),
		            new Among ( "ness", -1, 3 )
		        ];
		
		        var a_5 = [
		            new Among ( "ic", -1, 1 ),
		            new Among ( "ance", -1, 1 ),
		            new Among ( "ence", -1, 1 ),
		            new Among ( "able", -1, 1 ),
		            new Among ( "ible", -1, 1 ),
		            new Among ( "ate", -1, 1 ),
		            new Among ( "ive", -1, 1 ),
		            new Among ( "ize", -1, 1 ),
		            new Among ( "iti", -1, 1 ),
		            new Among ( "al", -1, 1 ),
		            new Among ( "ism", -1, 1 ),
		            new Among ( "ion", -1, 2 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "ous", -1, 1 ),
		            new Among ( "ant", -1, 1 ),
		            new Among ( "ent", -1, 1 ),
		            new Among ( "ment", 15, 1 ),
		            new Among ( "ement", 16, 1 ),
		            new Among ( "ou", -1, 1 )
		        ];
		
		        var g_v = [17, 65, 16, 1 ];
		
		        var g_v_WXY = [1, 17, 65, 208, 1 ];
		
		        var B_Y_found;
		        var I_p2;
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        function r_shortv() {
		            if (!(sbp.out_grouping_b(g_v_WXY, 89, 121)))
		            {
		                return false;
		            }
		            if (!(sbp.in_grouping_b(g_v, 97, 121)))
		            {
		                return false;
		            }
		            if (!(sbp.out_grouping_b(g_v, 97, 121)))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_Step_1a() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 4);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("ss");
		                    break;
		                case 2:
		                    sbp.slice_from("i");
		                    break;
		                case 3:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_1b() {
		            var among_var;
		            var v_1;
		            var v_3;
		            var v_4;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 3);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ee");
		                    break;
		                case 2:
		                    v_1 = sbp.limit - sbp.cursor;
		                    golab0: while(true)
		                    {
		                        lab1: do {
		                            if (!(sbp.in_grouping_b(g_v, 97, 121)))
		                            {
		                                break lab1;
		                            }
		                            break golab0;
		                        } while (false);
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            return false;
		                        }
		                        sbp.cursor--;
		                    }
		                    sbp.cursor = sbp.limit - v_1;
		                    sbp.slice_del();
		                    v_3 = sbp.limit - sbp.cursor;
		                    among_var = sbp.find_among_b(a_1, 13);
		                    if (among_var == 0)
		                    {
		                        return false;
		                    }
		                    sbp.cursor = sbp.limit - v_3;
		                    switch(among_var) {
		                        case 0:
		                            return false;
		                        case 1:
		                            {
		                                var c = sbp.cursor;
		                                sbp.insert(sbp.cursor, sbp.cursor, "e");
		                                sbp.cursor = c;
		                            }
		                            break;
		                        case 2:
		                            sbp.ket = sbp.cursor;
		                            if (sbp.cursor <= sbp.limit_backward)
		                            {
		                                return false;
		                            }
		                            sbp.cursor--;
		                            sbp.bra = sbp.cursor;
		                            sbp.slice_del();
		                            break;
		                        case 3:
		                            if (sbp.cursor != I_p1)
		                            {
		                                return false;
		                            }
		                            v_4 = sbp.limit - sbp.cursor;
		                            if (!r_shortv())
		                            {
		                                return false;
		                            }
		                            sbp.cursor = sbp.limit - v_4;
		                            {
		                                var c = sbp.cursor;
		                                sbp.insert(sbp.cursor, sbp.cursor, "e");
		                                sbp.cursor = c;
		                            }
		                            break;
		                    }
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_1c() {
		            var v_1;
		            sbp.ket = sbp.cursor;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    if (!(sbp.eq_s_b(1, "y")))
		                    {
		                        break lab1;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                if (!(sbp.eq_s_b(1, "Y")))
		                {
		                    return false;
		                }
		            } while (false);
		            sbp.bra = sbp.cursor;
		            golab2: while(true)
		            {
		                lab3: do {
		                    if (!(sbp.in_grouping_b(g_v, 97, 121)))
		                    {
		                        break lab3;
		                    }
		                    break golab2;
		                } while (false);
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    return false;
		                }
		                sbp.cursor--;
		            }
		            sbp.slice_from("i");
		            return true;
		        }
		
		        function r_Step_2() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 20);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("tion");
		                    break;
		                case 2:
		                    sbp.slice_from("ence");
		                    break;
		                case 3:
		                    sbp.slice_from("ance");
		                    break;
		                case 4:
		                    sbp.slice_from("able");
		                    break;
		                case 5:
		                    sbp.slice_from("ent");
		                    break;
		                case 6:
		                    sbp.slice_from("e");
		                    break;
		                case 7:
		                    sbp.slice_from("ize");
		                    break;
		                case 8:
		                    sbp.slice_from("ate");
		                    break;
		                case 9:
		                    sbp.slice_from("al");
		                    break;
		                case 10:
		                    sbp.slice_from("al");
		                    break;
		                case 11:
		                    sbp.slice_from("ful");
		                    break;
		                case 12:
		                    sbp.slice_from("ous");
		                    break;
		                case 13:
		                    sbp.slice_from("ive");
		                    break;
		                case 14:
		                    sbp.slice_from("ble");
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_3() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_4, 7);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("al");
		                    break;
		                case 2:
		                    sbp.slice_from("ic");
		                    break;
		                case 3:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_4() {
		            var among_var;
		            var v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_5, 19);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R2())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    lab0: do {
		                        v_1 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            if (!(sbp.eq_s_b(1, "s")))
		                            {
		                                break lab1;
		                            }
		                            break lab0;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_1;
		                        if (!(sbp.eq_s_b(1, "t")))
		                        {
		                            return false;
		                        }
		                    } while (false);
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_Step_5a() {
		            var v_1;
		            var v_2;
		            sbp.ket = sbp.cursor;
		            if (!(sbp.eq_s_b(1, "e")))
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    if (!r_R2())
		                    {
		                        break lab1;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                if (!r_R1())
		                {
		                    return false;
		                }
		                {
		                    v_2 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        if (!r_shortv())
		                        {
		                            break lab2;
		                        }
		                        return false;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_2;
		                }
		            } while (false);
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_Step_5b() {
		            sbp.ket = sbp.cursor;
		            if (!(sbp.eq_s_b(1, "l")))
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R2())
		            {
		                return false;
		            }
		            if (!(sbp.eq_s_b(1, "l")))
		            {
		                return false;
		            }
		            sbp.slice_del();
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_10;
		            var v_11;
		            var v_12;
		            var v_13;
		            var v_14;
		            var v_15;
		            var v_16;
		            var v_17;
		            var v_18;
		            var v_19;
		            var v_20;
		            B_Y_found = false;
		            v_1 = sbp.cursor;
		            lab0: do {
		                sbp.bra = sbp.cursor;
		                if (!(sbp.eq_s(1, "y")))
		                {
		                    break lab0;
		                }
		                sbp.ket = sbp.cursor;
		                sbp.slice_from("Y");
		                B_Y_found = true;
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                replab2: while(true)
		                {
		                    v_3 = sbp.cursor;
		                    lab3: do {
		                        golab4: while(true)
		                        {
		                            v_4 = sbp.cursor;
		                            lab5: do {
		                                if (!(sbp.in_grouping(g_v, 97, 121)))
		                                {
		                                    break lab5;
		                                }
		                                sbp.bra = sbp.cursor;
		                                if (!(sbp.eq_s(1, "y")))
		                                {
		                                    break lab5;
		                                }
		                                sbp.ket = sbp.cursor;
		                                sbp.cursor = v_4;
		                                break golab4;
		                            } while (false);
		                            sbp.cursor = v_4;
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab3;
		                            }
		                            sbp.cursor++;
		                        }
		                        sbp.slice_from("Y");
		                        B_Y_found = true;
		                        continue replab2;
		                    } while (false);
		                    sbp.cursor = v_3;
		                    break replab2;
		                }
		            } while (false);
		            sbp.cursor = v_2;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_5 = sbp.cursor;
		            lab6: do {
		                golab7: while(true)
		                {
		                    lab8: do {
		                        if (!(sbp.in_grouping(g_v, 97, 121)))
		                        {
		                            break lab8;
		                        }
		                        break golab7;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab6;
		                    }
		                    sbp.cursor++;
		                }
		                golab9: while(true)
		                {
		                    lab10: do {
		                        if (!(sbp.out_grouping(g_v, 97, 121)))
		                        {
		                            break lab10;
		                        }
		                        break golab9;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab6;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab11: while(true)
		                {
		                    lab12: do {
		                        if (!(sbp.in_grouping(g_v, 97, 121)))
		                        {
		                            break lab12;
		                        }
		                        break golab11;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab6;
		                    }
		                    sbp.cursor++;
		                }
		                golab13: while(true)
		                {
		                    lab14: do {
		                        if (!(sbp.out_grouping(g_v, 97, 121)))
		                        {
		                            break lab14;
		                        }
		                        break golab13;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab6;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_5;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_10 = sbp.limit - sbp.cursor;
		            lab15: do {
		                if (!r_Step_1a())
		                {
		                    break lab15;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_10;
		            v_11 = sbp.limit - sbp.cursor;
		            lab16: do {
		                if (!r_Step_1b())
		                {
		                    break lab16;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_11;
		            v_12 = sbp.limit - sbp.cursor;
		            lab17: do {
		                if (!r_Step_1c())
		                {
		                    break lab17;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_12;
		            v_13 = sbp.limit - sbp.cursor;
		            lab18: do {
		                if (!r_Step_2())
		                {
		                    break lab18;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_13;
		            v_14 = sbp.limit - sbp.cursor;
		            lab19: do {
		                if (!r_Step_3())
		                {
		                    break lab19;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_14;
		            v_15 = sbp.limit - sbp.cursor;
		            lab20: do {
		                if (!r_Step_4())
		                {
		                    break lab20;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_15;
		            v_16 = sbp.limit - sbp.cursor;
		            lab21: do {
		                if (!r_Step_5a())
		                {
		                    break lab21;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_16;
		            v_17 = sbp.limit - sbp.cursor;
		            lab22: do {
		                if (!r_Step_5b())
		                {
		                    break lab22;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_17;
		            sbp.cursor = sbp.limit_backward;            v_18 = sbp.cursor;
		            lab23: do {
		                if (!(B_Y_found))
		                {
		                    break lab23;
		                }
		                replab24: while(true)
		                {
		                    v_19 = sbp.cursor;
		                    lab25: do {
		                        golab26: while(true)
		                        {
		                            v_20 = sbp.cursor;
		                            lab27: do {
		                                sbp.bra = sbp.cursor;
		                                if (!(sbp.eq_s(1, "Y")))
		                                {
		                                    break lab27;
		                                }
		                                sbp.ket = sbp.cursor;
		                                sbp.cursor = v_20;
		                                break golab26;
		                            } while (false);
		                            sbp.cursor = v_20;
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab25;
		                            }
		                            sbp.cursor++;
		                        }
		                        sbp.slice_from("y");
		                        continue replab24;
		                    } while (false);
		                    sbp.cursor = v_19;
		                    break replab24;
		                }
		            } while (false);
		            sbp.cursor = v_18;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		portugueseStemmer : function() {

		        var a_0 = [
		            new Among ( "", -1, 3 ),
		            new Among ( "\u00E3", 0, 1 ),
		            new Among ( "\u00F5", 0, 2 )
		        ];
		
		        var a_1 = [
		            new Among ( "", -1, 3 ),
		            new Among ( "a~", 0, 1 ),
		            new Among ( "o~", 0, 2 )
		        ];
		
		        var a_2 = [
		            new Among ( "ic", -1, -1 ),
		            new Among ( "ad", -1, -1 ),
		            new Among ( "os", -1, -1 ),
		            new Among ( "iv", -1, 1 )
		        ];
		
		        var a_3 = [
		            new Among ( "ante", -1, 1 ),
		            new Among ( "avel", -1, 1 ),
		            new Among ( "\u00EDvel", -1, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "ic", -1, 1 ),
		            new Among ( "abil", -1, 1 ),
		            new Among ( "iv", -1, 1 )
		        ];
		
		        var a_5 = [
		            new Among ( "ica", -1, 1 ),
		            new Among ( "\u00E2ncia", -1, 1 ),
		            new Among ( "\u00EAncia", -1, 4 ),
		            new Among ( "ira", -1, 9 ),
		            new Among ( "adora", -1, 1 ),
		            new Among ( "osa", -1, 1 ),
		            new Among ( "ista", -1, 1 ),
		            new Among ( "iva", -1, 8 ),
		            new Among ( "eza", -1, 1 ),
		            new Among ( "log\u00EDa", -1, 2 ),
		            new Among ( "idade", -1, 7 ),
		            new Among ( "ante", -1, 1 ),
		            new Among ( "mente", -1, 6 ),
		            new Among ( "amente", 12, 5 ),
		            new Among ( "\u00E1vel", -1, 1 ),
		            new Among ( "\u00EDvel", -1, 1 ),
		            new Among ( "uci\u00F3n", -1, 3 ),
		            new Among ( "ico", -1, 1 ),
		            new Among ( "ismo", -1, 1 ),
		            new Among ( "oso", -1, 1 ),
		            new Among ( "amento", -1, 1 ),
		            new Among ( "imento", -1, 1 ),
		            new Among ( "ivo", -1, 8 ),
		            new Among ( "a\u00E7a~o", -1, 1 ),
		            new Among ( "ador", -1, 1 ),
		            new Among ( "icas", -1, 1 ),
		            new Among ( "\u00EAncias", -1, 4 ),
		            new Among ( "iras", -1, 9 ),
		            new Among ( "adoras", -1, 1 ),
		            new Among ( "osas", -1, 1 ),
		            new Among ( "istas", -1, 1 ),
		            new Among ( "ivas", -1, 8 ),
		            new Among ( "ezas", -1, 1 ),
		            new Among ( "log\u00EDas", -1, 2 ),
		            new Among ( "idades", -1, 7 ),
		            new Among ( "uciones", -1, 3 ),
		            new Among ( "adores", -1, 1 ),
		            new Among ( "antes", -1, 1 ),
		            new Among ( "a\u00E7o~es", -1, 1 ),
		            new Among ( "icos", -1, 1 ),
		            new Among ( "ismos", -1, 1 ),
		            new Among ( "osos", -1, 1 ),
		            new Among ( "amentos", -1, 1 ),
		            new Among ( "imentos", -1, 1 ),
		            new Among ( "ivos", -1, 8 )
		        ];
		
		        var a_6 = [
		            new Among ( "ada", -1, 1 ),
		            new Among ( "ida", -1, 1 ),
		            new Among ( "ia", -1, 1 ),
		            new Among ( "aria", 2, 1 ),
		            new Among ( "eria", 2, 1 ),
		            new Among ( "iria", 2, 1 ),
		            new Among ( "ara", -1, 1 ),
		            new Among ( "era", -1, 1 ),
		            new Among ( "ira", -1, 1 ),
		            new Among ( "ava", -1, 1 ),
		            new Among ( "asse", -1, 1 ),
		            new Among ( "esse", -1, 1 ),
		            new Among ( "isse", -1, 1 ),
		            new Among ( "aste", -1, 1 ),
		            new Among ( "este", -1, 1 ),
		            new Among ( "iste", -1, 1 ),
		            new Among ( "ei", -1, 1 ),
		            new Among ( "arei", 16, 1 ),
		            new Among ( "erei", 16, 1 ),
		            new Among ( "irei", 16, 1 ),
		            new Among ( "am", -1, 1 ),
		            new Among ( "iam", 20, 1 ),
		            new Among ( "ariam", 21, 1 ),
		            new Among ( "eriam", 21, 1 ),
		            new Among ( "iriam", 21, 1 ),
		            new Among ( "aram", 20, 1 ),
		            new Among ( "eram", 20, 1 ),
		            new Among ( "iram", 20, 1 ),
		            new Among ( "avam", 20, 1 ),
		            new Among ( "em", -1, 1 ),
		            new Among ( "arem", 29, 1 ),
		            new Among ( "erem", 29, 1 ),
		            new Among ( "irem", 29, 1 ),
		            new Among ( "assem", 29, 1 ),
		            new Among ( "essem", 29, 1 ),
		            new Among ( "issem", 29, 1 ),
		            new Among ( "ado", -1, 1 ),
		            new Among ( "ido", -1, 1 ),
		            new Among ( "ando", -1, 1 ),
		            new Among ( "endo", -1, 1 ),
		            new Among ( "indo", -1, 1 ),
		            new Among ( "ara~o", -1, 1 ),
		            new Among ( "era~o", -1, 1 ),
		            new Among ( "ira~o", -1, 1 ),
		            new Among ( "ar", -1, 1 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "ir", -1, 1 ),
		            new Among ( "as", -1, 1 ),
		            new Among ( "adas", 47, 1 ),
		            new Among ( "idas", 47, 1 ),
		            new Among ( "ias", 47, 1 ),
		            new Among ( "arias", 50, 1 ),
		            new Among ( "erias", 50, 1 ),
		            new Among ( "irias", 50, 1 ),
		            new Among ( "aras", 47, 1 ),
		            new Among ( "eras", 47, 1 ),
		            new Among ( "iras", 47, 1 ),
		            new Among ( "avas", 47, 1 ),
		            new Among ( "es", -1, 1 ),
		            new Among ( "ardes", 58, 1 ),
		            new Among ( "erdes", 58, 1 ),
		            new Among ( "irdes", 58, 1 ),
		            new Among ( "ares", 58, 1 ),
		            new Among ( "eres", 58, 1 ),
		            new Among ( "ires", 58, 1 ),
		            new Among ( "asses", 58, 1 ),
		            new Among ( "esses", 58, 1 ),
		            new Among ( "isses", 58, 1 ),
		            new Among ( "astes", 58, 1 ),
		            new Among ( "estes", 58, 1 ),
		            new Among ( "istes", 58, 1 ),
		            new Among ( "is", -1, 1 ),
		            new Among ( "ais", 71, 1 ),
		            new Among ( "eis", 71, 1 ),
		            new Among ( "areis", 73, 1 ),
		            new Among ( "ereis", 73, 1 ),
		            new Among ( "ireis", 73, 1 ),
		            new Among ( "\u00E1reis", 73, 1 ),
		            new Among ( "\u00E9reis", 73, 1 ),
		            new Among ( "\u00EDreis", 73, 1 ),
		            new Among ( "\u00E1sseis", 73, 1 ),
		            new Among ( "\u00E9sseis", 73, 1 ),
		            new Among ( "\u00EDsseis", 73, 1 ),
		            new Among ( "\u00E1veis", 73, 1 ),
		            new Among ( "\u00EDeis", 73, 1 ),
		            new Among ( "ar\u00EDeis", 84, 1 ),
		            new Among ( "er\u00EDeis", 84, 1 ),
		            new Among ( "ir\u00EDeis", 84, 1 ),
		            new Among ( "ados", -1, 1 ),
		            new Among ( "idos", -1, 1 ),
		            new Among ( "amos", -1, 1 ),
		            new Among ( "\u00E1ramos", 90, 1 ),
		            new Among ( "\u00E9ramos", 90, 1 ),
		            new Among ( "\u00EDramos", 90, 1 ),
		            new Among ( "\u00E1vamos", 90, 1 ),
		            new Among ( "\u00EDamos", 90, 1 ),
		            new Among ( "ar\u00EDamos", 95, 1 ),
		            new Among ( "er\u00EDamos", 95, 1 ),
		            new Among ( "ir\u00EDamos", 95, 1 ),
		            new Among ( "emos", -1, 1 ),
		            new Among ( "aremos", 99, 1 ),
		            new Among ( "eremos", 99, 1 ),
		            new Among ( "iremos", 99, 1 ),
		            new Among ( "\u00E1ssemos", 99, 1 ),
		            new Among ( "\u00EAssemos", 99, 1 ),
		            new Among ( "\u00EDssemos", 99, 1 ),
		            new Among ( "imos", -1, 1 ),
		            new Among ( "armos", -1, 1 ),
		            new Among ( "ermos", -1, 1 ),
		            new Among ( "irmos", -1, 1 ),
		            new Among ( "\u00E1mos", -1, 1 ),
		            new Among ( "ar\u00E1s", -1, 1 ),
		            new Among ( "er\u00E1s", -1, 1 ),
		            new Among ( "ir\u00E1s", -1, 1 ),
		            new Among ( "eu", -1, 1 ),
		            new Among ( "iu", -1, 1 ),
		            new Among ( "ou", -1, 1 ),
		            new Among ( "ar\u00E1", -1, 1 ),
		            new Among ( "er\u00E1", -1, 1 ),
		            new Among ( "ir\u00E1", -1, 1 )
		        ];
		
		        var a_7 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "i", -1, 1 ),
		            new Among ( "o", -1, 1 ),
		            new Among ( "os", -1, 1 ),
		            new Among ( "\u00E1", -1, 1 ),
		            new Among ( "\u00ED", -1, 1 ),
		            new Among ( "\u00F3", -1, 1 )
		        ];
		
		        var a_8 = [
		            new Among ( "e", -1, 1 ),
		            new Among ( "\u00E7", -1, 2 ),
		            new Among ( "\u00E9", -1, 1 ),
		            new Among ( "\u00EA", -1, 1 )
		        ];
		
		        var g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 19, 12, 2 ];
		
		        var I_p2;
		        var I_p1;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_prelude() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_0, 3);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("a~");
		                            break;
		                        case 2:
		                            sbp.slice_from("o~");
		                            break;
		                        case 3:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_6;
		            var v_8;
		            I_pV = sbp.limit;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                lab1: do {
		                    v_2 = sbp.cursor;
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 97, 250)))
		                        {
		                            break lab2;
		                        }
		                        lab3: do {
		                            v_3 = sbp.cursor;
		                            lab4: do {
		                                if (!(sbp.out_grouping(g_v, 97, 250)))
		                                {
		                                    break lab4;
		                                }
		                                golab5: while(true)
		                                {
		                                    lab6: do {
		                                        if (!(sbp.in_grouping(g_v, 97, 250)))
		                                        {
		                                            break lab6;
		                                        }
		                                        break golab5;
		                                    } while (false);
		                                    if (sbp.cursor >= sbp.limit)
		                                    {
		                                        break lab4;
		                                    }
		                                    sbp.cursor++;
		                                }
		                                break lab3;
		                            } while (false);
		                            sbp.cursor = v_3;
		                            if (!(sbp.in_grouping(g_v, 97, 250)))
		                            {
		                                break lab2;
		                            }
		                            golab7: while(true)
		                            {
		                                lab8: do {
		                                    if (!(sbp.out_grouping(g_v, 97, 250)))
		                                    {
		                                        break lab8;
		                                    }
		                                    break golab7;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab2;
		                                }
		                                sbp.cursor++;
		                            }
		                        } while (false);
		                        break lab1;
		                    } while (false);
		                    sbp.cursor = v_2;
		                    if (!(sbp.out_grouping(g_v, 97, 250)))
		                    {
		                        break lab0;
		                    }
		                    lab9: do {
		                        v_6 = sbp.cursor;
		                        lab10: do {
		                            if (!(sbp.out_grouping(g_v, 97, 250)))
		                            {
		                                break lab10;
		                            }
		                            golab11: while(true)
		                            {
		                                lab12: do {
		                                    if (!(sbp.in_grouping(g_v, 97, 250)))
		                                    {
		                                        break lab12;
		                                    }
		                                    break golab11;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab10;
		                                }
		                                sbp.cursor++;
		                            }
		                            break lab9;
		                        } while (false);
		                        sbp.cursor = v_6;
		                        if (!(sbp.in_grouping(g_v, 97, 250)))
		                        {
		                            break lab0;
		                        }
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab0;
		                        }
		                        sbp.cursor++;
		                    } while (false);
		                } while (false);
		                I_pV = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            v_8 = sbp.cursor;
		            lab13: do {
		                golab14: while(true)
		                {
		                    lab15: do {
		                        if (!(sbp.in_grouping(g_v, 97, 250)))
		                        {
		                            break lab15;
		                        }
		                        break golab14;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab16: while(true)
		                {
		                    lab17: do {
		                        if (!(sbp.out_grouping(g_v, 97, 250)))
		                        {
		                            break lab17;
		                        }
		                        break golab16;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab18: while(true)
		                {
		                    lab19: do {
		                        if (!(sbp.in_grouping(g_v, 97, 250)))
		                        {
		                            break lab19;
		                        }
		                        break golab18;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab20: while(true)
		                {
		                    lab21: do {
		                        if (!(sbp.out_grouping(g_v, 97, 250)))
		                        {
		                            break lab21;
		                        }
		                        break golab20;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_8;
		            return true;
		        }
		
		        function r_postlude() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_1, 3);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("\u00E3");
		                            break;
		                        case 2:
		                            sbp.slice_from("\u00F5");
		                            break;
		                        case 3:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_RV() {
		            if (!(I_pV <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_standard_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_5, 45);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("log");
		                    break;
		                case 3:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("u");
		                    break;
		                case 4:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ente");
		                    break;
		                case 5:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_1 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_2, 4);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.slice_del();
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_1;
		                                break lab0;
		                            case 1:
		                                sbp.ket = sbp.cursor;
		                                if (!(sbp.eq_s_b(2, "at")))
		                                {
		                                    sbp.cursor = sbp.limit - v_1;
		                                    break lab0;
		                                }
		                                sbp.bra = sbp.cursor;
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_1;
		                                    break lab0;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 6:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_2 = sbp.limit - sbp.cursor;
		                    lab1: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_3, 3);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_2;
		                            break lab1;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_2;
		                                break lab1;
		                            case 1:
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_2;
		                                    break lab1;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 7:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_4, 3);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab2;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_3;
		                                break lab2;
		                            case 1:
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_3;
		                                    break lab2;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 8:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab3: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "at")))
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab3;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab3;
		                        }
		                        sbp.slice_del();
		                    } while (false);
		                    break;
		                case 9:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    if (!(sbp.eq_s_b(1, "e")))
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ir");
		                    break;
		            }
		            return true;
		        }
		
		        function r_verb_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 120);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    sbp.limit_backward = v_2;
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            sbp.limit_backward = v_2;
		            return true;
		        }
		
		        function r_residual_suffix() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 7);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_residual_form() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_8, 4);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    sbp.ket = sbp.cursor;
		                    lab0: do {
		                        v_1 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            if (!(sbp.eq_s_b(1, "u")))
		                            {
		                                break lab1;
		                            }
		                            sbp.bra = sbp.cursor;
		                            v_2 = sbp.limit - sbp.cursor;
		                            if (!(sbp.eq_s_b(1, "g")))
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor = sbp.limit - v_2;
		                            break lab0;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_1;
		                        if (!(sbp.eq_s_b(1, "i")))
		                        {
		                            return false;
		                        }
		                        sbp.bra = sbp.cursor;
		                        v_3 = sbp.limit - sbp.cursor;
		                        if (!(sbp.eq_s_b(1, "c")))
		                        {
		                            return false;
		                        }
		                        sbp.cursor = sbp.limit - v_3;
		                    } while (false);
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("c");
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_prelude())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                if (!r_mark_regions())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = v_2;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                lab3: do {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        v_5 = sbp.limit - sbp.cursor;
		                        lab5: do {
		                            v_6 = sbp.limit - sbp.cursor;
		                            lab6: do {
		                                if (!r_standard_suffix())
		                                {
		                                    break lab6;
		                                }
		                                break lab5;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_6;
		                            if (!r_verb_suffix())
		                            {
		                                break lab4;
		                            }
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_5;
		                        v_7 = sbp.limit - sbp.cursor;
		                        lab7: do {
		                            sbp.ket = sbp.cursor;
		                            if (!(sbp.eq_s_b(1, "i")))
		                            {
		                                break lab7;
		                            }
		                            sbp.bra = sbp.cursor;
		                            v_8 = sbp.limit - sbp.cursor;
		                            if (!(sbp.eq_s_b(1, "c")))
		                            {
		                                break lab7;
		                            }
		                            sbp.cursor = sbp.limit - v_8;
		                            if (!r_RV())
		                            {
		                                break lab7;
		                            }
		                            sbp.slice_del();
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_7;
		                        break lab3;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                    if (!r_residual_suffix())
		                    {
		                        break lab2;
		                    }
		                } while (false);
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_9 = sbp.limit - sbp.cursor;
		            lab8: do {
		                if (!r_residual_form())
		                {
		                    break lab8;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_9;
		            sbp.cursor = sbp.limit_backward;            v_10 = sbp.cursor;
		            lab9: do {
		                if (!r_postlude())
		                {
		                    break lab9;
		                }
		            } while (false);
		            sbp.cursor = v_10;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		romanianStemmer : function() {

		        var a_0 = [
		            new Among ( "", -1, 3 ),
		            new Among ( "I", 0, 1 ),
		            new Among ( "U", 0, 2 )
		        ];
		
		        var a_1 = [
		            new Among ( "ea", -1, 3 ),
		            new Among ( "a\u0163ia", -1, 7 ),
		            new Among ( "aua", -1, 2 ),
		            new Among ( "iua", -1, 4 ),
		            new Among ( "a\u0163ie", -1, 7 ),
		            new Among ( "ele", -1, 3 ),
		            new Among ( "ile", -1, 5 ),
		            new Among ( "iile", 6, 4 ),
		            new Among ( "iei", -1, 4 ),
		            new Among ( "atei", -1, 6 ),
		            new Among ( "ii", -1, 4 ),
		            new Among ( "ului", -1, 1 ),
		            new Among ( "ul", -1, 1 ),
		            new Among ( "elor", -1, 3 ),
		            new Among ( "ilor", -1, 4 ),
		            new Among ( "iilor", 14, 4 )
		        ];
		
		        var a_2 = [
		            new Among ( "icala", -1, 4 ),
		            new Among ( "iciva", -1, 4 ),
		            new Among ( "ativa", -1, 5 ),
		            new Among ( "itiva", -1, 6 ),
		            new Among ( "icale", -1, 4 ),
		            new Among ( "a\u0163iune", -1, 5 ),
		            new Among ( "i\u0163iune", -1, 6 ),
		            new Among ( "atoare", -1, 5 ),
		            new Among ( "itoare", -1, 6 ),
		            new Among ( "\u0103toare", -1, 5 ),
		            new Among ( "icitate", -1, 4 ),
		            new Among ( "abilitate", -1, 1 ),
		            new Among ( "ibilitate", -1, 2 ),
		            new Among ( "ivitate", -1, 3 ),
		            new Among ( "icive", -1, 4 ),
		            new Among ( "ative", -1, 5 ),
		            new Among ( "itive", -1, 6 ),
		            new Among ( "icali", -1, 4 ),
		            new Among ( "atori", -1, 5 ),
		            new Among ( "icatori", 18, 4 ),
		            new Among ( "itori", -1, 6 ),
		            new Among ( "\u0103tori", -1, 5 ),
		            new Among ( "icitati", -1, 4 ),
		            new Among ( "abilitati", -1, 1 ),
		            new Among ( "ivitati", -1, 3 ),
		            new Among ( "icivi", -1, 4 ),
		            new Among ( "ativi", -1, 5 ),
		            new Among ( "itivi", -1, 6 ),
		            new Among ( "icit\u0103i", -1, 4 ),
		            new Among ( "abilit\u0103i", -1, 1 ),
		            new Among ( "ivit\u0103i", -1, 3 ),
		            new Among ( "icit\u0103\u0163i", -1, 4 ),
		            new Among ( "abilit\u0103\u0163i", -1, 1 ),
		            new Among ( "ivit\u0103\u0163i", -1, 3 ),
		            new Among ( "ical", -1, 4 ),
		            new Among ( "ator", -1, 5 ),
		            new Among ( "icator", 35, 4 ),
		            new Among ( "itor", -1, 6 ),
		            new Among ( "\u0103tor", -1, 5 ),
		            new Among ( "iciv", -1, 4 ),
		            new Among ( "ativ", -1, 5 ),
		            new Among ( "itiv", -1, 6 ),
		            new Among ( "ical\u0103", -1, 4 ),
		            new Among ( "iciv\u0103", -1, 4 ),
		            new Among ( "ativ\u0103", -1, 5 ),
		            new Among ( "itiv\u0103", -1, 6 )
		        ];
		
		        var a_3 = [
		            new Among ( "ica", -1, 1 ),
		            new Among ( "abila", -1, 1 ),
		            new Among ( "ibila", -1, 1 ),
		            new Among ( "oasa", -1, 1 ),
		            new Among ( "ata", -1, 1 ),
		            new Among ( "ita", -1, 1 ),
		            new Among ( "anta", -1, 1 ),
		            new Among ( "ista", -1, 3 ),
		            new Among ( "uta", -1, 1 ),
		            new Among ( "iva", -1, 1 ),
		            new Among ( "ic", -1, 1 ),
		            new Among ( "ice", -1, 1 ),
		            new Among ( "abile", -1, 1 ),
		            new Among ( "ibile", -1, 1 ),
		            new Among ( "isme", -1, 3 ),
		            new Among ( "iune", -1, 2 ),
		            new Among ( "oase", -1, 1 ),
		            new Among ( "ate", -1, 1 ),
		            new Among ( "itate", 17, 1 ),
		            new Among ( "ite", -1, 1 ),
		            new Among ( "ante", -1, 1 ),
		            new Among ( "iste", -1, 3 ),
		            new Among ( "ute", -1, 1 ),
		            new Among ( "ive", -1, 1 ),
		            new Among ( "ici", -1, 1 ),
		            new Among ( "abili", -1, 1 ),
		            new Among ( "ibili", -1, 1 ),
		            new Among ( "iuni", -1, 2 ),
		            new Among ( "atori", -1, 1 ),
		            new Among ( "osi", -1, 1 ),
		            new Among ( "ati", -1, 1 ),
		            new Among ( "itati", 30, 1 ),
		            new Among ( "iti", -1, 1 ),
		            new Among ( "anti", -1, 1 ),
		            new Among ( "isti", -1, 3 ),
		            new Among ( "uti", -1, 1 ),
		            new Among ( "i\u015Fti", -1, 3 ),
		            new Among ( "ivi", -1, 1 ),
		            new Among ( "it\u0103i", -1, 1 ),
		            new Among ( "o\u015Fi", -1, 1 ),
		            new Among ( "it\u0103\u0163i", -1, 1 ),
		            new Among ( "abil", -1, 1 ),
		            new Among ( "ibil", -1, 1 ),
		            new Among ( "ism", -1, 3 ),
		            new Among ( "ator", -1, 1 ),
		            new Among ( "os", -1, 1 ),
		            new Among ( "at", -1, 1 ),
		            new Among ( "it", -1, 1 ),
		            new Among ( "ant", -1, 1 ),
		            new Among ( "ist", -1, 3 ),
		            new Among ( "ut", -1, 1 ),
		            new Among ( "iv", -1, 1 ),
		            new Among ( "ic\u0103", -1, 1 ),
		            new Among ( "abil\u0103", -1, 1 ),
		            new Among ( "ibil\u0103", -1, 1 ),
		            new Among ( "oas\u0103", -1, 1 ),
		            new Among ( "at\u0103", -1, 1 ),
		            new Among ( "it\u0103", -1, 1 ),
		            new Among ( "ant\u0103", -1, 1 ),
		            new Among ( "ist\u0103", -1, 3 ),
		            new Among ( "ut\u0103", -1, 1 ),
		            new Among ( "iv\u0103", -1, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "ea", -1, 1 ),
		            new Among ( "ia", -1, 1 ),
		            new Among ( "esc", -1, 1 ),
		            new Among ( "\u0103sc", -1, 1 ),
		            new Among ( "ind", -1, 1 ),
		            new Among ( "\u00E2nd", -1, 1 ),
		            new Among ( "are", -1, 1 ),
		            new Among ( "ere", -1, 1 ),
		            new Among ( "ire", -1, 1 ),
		            new Among ( "\u00E2re", -1, 1 ),
		            new Among ( "se", -1, 2 ),
		            new Among ( "ase", 10, 1 ),
		            new Among ( "sese", 10, 2 ),
		            new Among ( "ise", 10, 1 ),
		            new Among ( "use", 10, 1 ),
		            new Among ( "\u00E2se", 10, 1 ),
		            new Among ( "e\u015Fte", -1, 1 ),
		            new Among ( "\u0103\u015Fte", -1, 1 ),
		            new Among ( "eze", -1, 1 ),
		            new Among ( "ai", -1, 1 ),
		            new Among ( "eai", 19, 1 ),
		            new Among ( "iai", 19, 1 ),
		            new Among ( "sei", -1, 2 ),
		            new Among ( "e\u015Fti", -1, 1 ),
		            new Among ( "\u0103\u015Fti", -1, 1 ),
		            new Among ( "ui", -1, 1 ),
		            new Among ( "ezi", -1, 1 ),
		            new Among ( "\u00E2i", -1, 1 ),
		            new Among ( "a\u015Fi", -1, 1 ),
		            new Among ( "se\u015Fi", -1, 2 ),
		            new Among ( "ase\u015Fi", 29, 1 ),
		            new Among ( "sese\u015Fi", 29, 2 ),
		            new Among ( "ise\u015Fi", 29, 1 ),
		            new Among ( "use\u015Fi", 29, 1 ),
		            new Among ( "\u00E2se\u015Fi", 29, 1 ),
		            new Among ( "i\u015Fi", -1, 1 ),
		            new Among ( "u\u015Fi", -1, 1 ),
		            new Among ( "\u00E2\u015Fi", -1, 1 ),
		            new Among ( "a\u0163i", -1, 2 ),
		            new Among ( "ea\u0163i", 38, 1 ),
		            new Among ( "ia\u0163i", 38, 1 ),
		            new Among ( "e\u0163i", -1, 2 ),
		            new Among ( "i\u0163i", -1, 2 ),
		            new Among ( "\u00E2\u0163i", -1, 2 ),
		            new Among ( "ar\u0103\u0163i", -1, 1 ),
		            new Among ( "ser\u0103\u0163i", -1, 2 ),
		            new Among ( "aser\u0103\u0163i", 45, 1 ),
		            new Among ( "seser\u0103\u0163i", 45, 2 ),
		            new Among ( "iser\u0103\u0163i", 45, 1 ),
		            new Among ( "user\u0103\u0163i", 45, 1 ),
		            new Among ( "\u00E2ser\u0103\u0163i", 45, 1 ),
		            new Among ( "ir\u0103\u0163i", -1, 1 ),
		            new Among ( "ur\u0103\u0163i", -1, 1 ),
		            new Among ( "\u00E2r\u0103\u0163i", -1, 1 ),
		            new Among ( "am", -1, 1 ),
		            new Among ( "eam", 54, 1 ),
		            new Among ( "iam", 54, 1 ),
		            new Among ( "em", -1, 2 ),
		            new Among ( "asem", 57, 1 ),
		            new Among ( "sesem", 57, 2 ),
		            new Among ( "isem", 57, 1 ),
		            new Among ( "usem", 57, 1 ),
		            new Among ( "\u00E2sem", 57, 1 ),
		            new Among ( "im", -1, 2 ),
		            new Among ( "\u00E2m", -1, 2 ),
		            new Among ( "\u0103m", -1, 2 ),
		            new Among ( "ar\u0103m", 65, 1 ),
		            new Among ( "ser\u0103m", 65, 2 ),
		            new Among ( "aser\u0103m", 67, 1 ),
		            new Among ( "seser\u0103m", 67, 2 ),
		            new Among ( "iser\u0103m", 67, 1 ),
		            new Among ( "user\u0103m", 67, 1 ),
		            new Among ( "\u00E2ser\u0103m", 67, 1 ),
		            new Among ( "ir\u0103m", 65, 1 ),
		            new Among ( "ur\u0103m", 65, 1 ),
		            new Among ( "\u00E2r\u0103m", 65, 1 ),
		            new Among ( "au", -1, 1 ),
		            new Among ( "eau", 76, 1 ),
		            new Among ( "iau", 76, 1 ),
		            new Among ( "indu", -1, 1 ),
		            new Among ( "\u00E2ndu", -1, 1 ),
		            new Among ( "ez", -1, 1 ),
		            new Among ( "easc\u0103", -1, 1 ),
		            new Among ( "ar\u0103", -1, 1 ),
		            new Among ( "ser\u0103", -1, 2 ),
		            new Among ( "aser\u0103", 84, 1 ),
		            new Among ( "seser\u0103", 84, 2 ),
		            new Among ( "iser\u0103", 84, 1 ),
		            new Among ( "user\u0103", 84, 1 ),
		            new Among ( "\u00E2ser\u0103", 84, 1 ),
		            new Among ( "ir\u0103", -1, 1 ),
		            new Among ( "ur\u0103", -1, 1 ),
		            new Among ( "\u00E2r\u0103", -1, 1 ),
		            new Among ( "eaz\u0103", -1, 1 )
		        ];
		
		        var a_5 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "e", -1, 1 ),
		            new Among ( "ie", 1, 1 ),
		            new Among ( "i", -1, 1 ),
		            new Among ( "\u0103", -1, 1 )
		        ];
		
		        var g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 32, 0, 0, 4 ];
		
		        var B_standard_suffix_removed;
		        var I_p2;
		        var I_p1;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_prelude() {
		            var v_1;
		            var v_2;
		            var v_3;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    golab2: while(true)
		                    {
		                        v_2 = sbp.cursor;
		                        lab3: do {
		                            if (!(sbp.in_grouping(g_v, 97, 259)))
		                            {
		                                break lab3;
		                            }
		                            sbp.bra = sbp.cursor;
		                            lab4: do {
		                                v_3 = sbp.cursor;
		                                lab5: do {
		                                    if (!(sbp.eq_s(1, "u")))
		                                    {
		                                        break lab5;
		                                    }
		                                    sbp.ket = sbp.cursor;
		                                    if (!(sbp.in_grouping(g_v, 97, 259)))
		                                    {
		                                        break lab5;
		                                    }
		                                    sbp.slice_from("U");
		                                    break lab4;
		                                } while (false);
		                                sbp.cursor = v_3;
		                                if (!(sbp.eq_s(1, "i")))
		                                {
		                                    break lab3;
		                                }
		                                sbp.ket = sbp.cursor;
		                                if (!(sbp.in_grouping(g_v, 97, 259)))
		                                {
		                                    break lab3;
		                                }
		                                sbp.slice_from("I");
		                            } while (false);
		                            sbp.cursor = v_2;
		                            break golab2;
		                        } while (false);
		                        sbp.cursor = v_2;
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab1;
		                        }
		                        sbp.cursor++;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_6;
		            var v_8;
		            I_pV = sbp.limit;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                lab1: do {
		                    v_2 = sbp.cursor;
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 97, 259)))
		                        {
		                            break lab2;
		                        }
		                        lab3: do {
		                            v_3 = sbp.cursor;
		                            lab4: do {
		                                if (!(sbp.out_grouping(g_v, 97, 259)))
		                                {
		                                    break lab4;
		                                }
		                                golab5: while(true)
		                                {
		                                    lab6: do {
		                                        if (!(sbp.in_grouping(g_v, 97, 259)))
		                                        {
		                                            break lab6;
		                                        }
		                                        break golab5;
		                                    } while (false);
		                                    if (sbp.cursor >= sbp.limit)
		                                    {
		                                        break lab4;
		                                    }
		                                    sbp.cursor++;
		                                }
		                                break lab3;
		                            } while (false);
		                            sbp.cursor = v_3;
		                            if (!(sbp.in_grouping(g_v, 97, 259)))
		                            {
		                                break lab2;
		                            }
		                            golab7: while(true)
		                            {
		                                lab8: do {
		                                    if (!(sbp.out_grouping(g_v, 97, 259)))
		                                    {
		                                        break lab8;
		                                    }
		                                    break golab7;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab2;
		                                }
		                                sbp.cursor++;
		                            }
		                        } while (false);
		                        break lab1;
		                    } while (false);
		                    sbp.cursor = v_2;
		                    if (!(sbp.out_grouping(g_v, 97, 259)))
		                    {
		                        break lab0;
		                    }
		                    lab9: do {
		                        v_6 = sbp.cursor;
		                        lab10: do {
		                            if (!(sbp.out_grouping(g_v, 97, 259)))
		                            {
		                                break lab10;
		                            }
		                            golab11: while(true)
		                            {
		                                lab12: do {
		                                    if (!(sbp.in_grouping(g_v, 97, 259)))
		                                    {
		                                        break lab12;
		                                    }
		                                    break golab11;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab10;
		                                }
		                                sbp.cursor++;
		                            }
		                            break lab9;
		                        } while (false);
		                        sbp.cursor = v_6;
		                        if (!(sbp.in_grouping(g_v, 97, 259)))
		                        {
		                            break lab0;
		                        }
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab0;
		                        }
		                        sbp.cursor++;
		                    } while (false);
		                } while (false);
		                I_pV = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            v_8 = sbp.cursor;
		            lab13: do {
		                golab14: while(true)
		                {
		                    lab15: do {
		                        if (!(sbp.in_grouping(g_v, 97, 259)))
		                        {
		                            break lab15;
		                        }
		                        break golab14;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab16: while(true)
		                {
		                    lab17: do {
		                        if (!(sbp.out_grouping(g_v, 97, 259)))
		                        {
		                            break lab17;
		                        }
		                        break golab16;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab18: while(true)
		                {
		                    lab19: do {
		                        if (!(sbp.in_grouping(g_v, 97, 259)))
		                        {
		                            break lab19;
		                        }
		                        break golab18;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab20: while(true)
		                {
		                    lab21: do {
		                        if (!(sbp.out_grouping(g_v, 97, 259)))
		                        {
		                            break lab21;
		                        }
		                        break golab20;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_8;
		            return true;
		        }
		
		        function r_postlude() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_0, 3);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("i");
		                            break;
		                        case 2:
		                            sbp.slice_from("u");
		                            break;
		                        case 3:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_RV() {
		            if (!(I_pV <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_step_0() {
		            var among_var;
		            var v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_1, 16);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("a");
		                    break;
		                case 3:
		                    sbp.slice_from("e");
		                    break;
		                case 4:
		                    sbp.slice_from("i");
		                    break;
		                case 5:
		                    {
		                        v_1 = sbp.limit - sbp.cursor;
		                        lab0: do {
		                            if (!(sbp.eq_s_b(2, "ab")))
		                            {
		                                break lab0;
		                            }
		                            return false;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_1;
		                    }
		                    sbp.slice_from("i");
		                    break;
		                case 6:
		                    sbp.slice_from("at");
		                    break;
		                case 7:
		                    sbp.slice_from("a\u0163i");
		                    break;
		            }
		            return true;
		        }
		
		        function r_combo_suffix() {
		            var among_var;
		            var v_1;
		            v_1 = sbp.limit - sbp.cursor;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 46);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R1())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("abil");
		                    break;
		                case 2:
		                    sbp.slice_from("ibil");
		                    break;
		                case 3:
		                    sbp.slice_from("iv");
		                    break;
		                case 4:
		                    sbp.slice_from("ic");
		                    break;
		                case 5:
		                    sbp.slice_from("at");
		                    break;
		                case 6:
		                    sbp.slice_from("it");
		                    break;
		            }
		            B_standard_suffix_removed = true;
		            sbp.cursor = sbp.limit - v_1;
		            return true;
		        }
		
		        function r_standard_suffix() {
		            var among_var;
		            var v_1;
		            B_standard_suffix_removed = false;
		            replab0: while(true)
		            {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    if (!r_combo_suffix())
		                    {
		                        break lab1;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                break replab0;
		            }
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 62);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R2())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!(sbp.eq_s_b(1, "\u0163")))
		                    {
		                        return false;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_from("t");
		                    break;
		                case 3:
		                    sbp.slice_from("ist");
		                    break;
		            }
		            B_standard_suffix_removed = true;
		            return true;
		        }
		
		        function r_verb_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_4, 94);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    sbp.limit_backward = v_2;
		                    return false;
		                case 1:
		                    lab0: do {
		                        v_3 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            if (!(sbp.out_grouping_b(g_v, 97, 259)))
		                            {
		                                break lab1;
		                            }
		                            break lab0;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                        if (!(sbp.eq_s_b(1, "u")))
		                        {
		                            sbp.limit_backward = v_2;
		                            return false;
		                        }
		                    } while (false);
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    break;
		            }
		            sbp.limit_backward = v_2;
		            return true;
		        }
		
		        function r_vowel_suffix() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_5, 5);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_RV())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_prelude())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            v_2 = sbp.cursor;
		            lab1: do {
		                if (!r_mark_regions())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = v_2;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_step_0())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                if (!r_standard_suffix())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            v_5 = sbp.limit - sbp.cursor;
		            lab4: do {
		                lab5: do {
		                    v_6 = sbp.limit - sbp.cursor;
		                    lab6: do {
		                        if (!(B_standard_suffix_removed))
		                        {
		                            break lab6;
		                        }
		                        break lab5;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_6;
		                    if (!r_verb_suffix())
		                    {
		                        break lab4;
		                    }
		                } while (false);
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            v_7 = sbp.limit - sbp.cursor;
		            lab7: do {
		                if (!r_vowel_suffix())
		                {
		                    break lab7;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_7;
		            sbp.cursor = sbp.limit_backward;            v_8 = sbp.cursor;
		            lab8: do {
		                if (!r_postlude())
		                {
		                    break lab8;
		                }
		            } while (false);
		            sbp.cursor = v_8;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		russianStemmer : function() {

		        var a_0 = [
		            new Among ( "\u0432", -1, 1 ),
		            new Among ( "\u0438\u0432", 0, 2 ),
		            new Among ( "\u044B\u0432", 0, 2 ),
		            new Among ( "\u0432\u0448\u0438", -1, 1 ),
		            new Among ( "\u0438\u0432\u0448\u0438", 3, 2 ),
		            new Among ( "\u044B\u0432\u0448\u0438", 3, 2 ),
		            new Among ( "\u0432\u0448\u0438\u0441\u044C", -1, 1 ),
		            new Among ( "\u0438\u0432\u0448\u0438\u0441\u044C", 6, 2 ),
		            new Among ( "\u044B\u0432\u0448\u0438\u0441\u044C", 6, 2 )
		        ];
		
		        var a_1 = [
		            new Among ( "\u0435\u0435", -1, 1 ),
		            new Among ( "\u0438\u0435", -1, 1 ),
		            new Among ( "\u043E\u0435", -1, 1 ),
		            new Among ( "\u044B\u0435", -1, 1 ),
		            new Among ( "\u0438\u043C\u0438", -1, 1 ),
		            new Among ( "\u044B\u043C\u0438", -1, 1 ),
		            new Among ( "\u0435\u0439", -1, 1 ),
		            new Among ( "\u0438\u0439", -1, 1 ),
		            new Among ( "\u043E\u0439", -1, 1 ),
		            new Among ( "\u044B\u0439", -1, 1 ),
		            new Among ( "\u0435\u043C", -1, 1 ),
		            new Among ( "\u0438\u043C", -1, 1 ),
		            new Among ( "\u043E\u043C", -1, 1 ),
		            new Among ( "\u044B\u043C", -1, 1 ),
		            new Among ( "\u0435\u0433\u043E", -1, 1 ),
		            new Among ( "\u043E\u0433\u043E", -1, 1 ),
		            new Among ( "\u0435\u043C\u0443", -1, 1 ),
		            new Among ( "\u043E\u043C\u0443", -1, 1 ),
		            new Among ( "\u0438\u0445", -1, 1 ),
		            new Among ( "\u044B\u0445", -1, 1 ),
		            new Among ( "\u0435\u044E", -1, 1 ),
		            new Among ( "\u043E\u044E", -1, 1 ),
		            new Among ( "\u0443\u044E", -1, 1 ),
		            new Among ( "\u044E\u044E", -1, 1 ),
		            new Among ( "\u0430\u044F", -1, 1 ),
		            new Among ( "\u044F\u044F", -1, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "\u0435\u043C", -1, 1 ),
		            new Among ( "\u043D\u043D", -1, 1 ),
		            new Among ( "\u0432\u0448", -1, 1 ),
		            new Among ( "\u0438\u0432\u0448", 2, 2 ),
		            new Among ( "\u044B\u0432\u0448", 2, 2 ),
		            new Among ( "\u0449", -1, 1 ),
		            new Among ( "\u044E\u0449", 5, 1 ),
		            new Among ( "\u0443\u044E\u0449", 6, 2 )
		        ];
		
		        var a_3 = [
		            new Among ( "\u0441\u044C", -1, 1 ),
		            new Among ( "\u0441\u044F", -1, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "\u043B\u0430", -1, 1 ),
		            new Among ( "\u0438\u043B\u0430", 0, 2 ),
		            new Among ( "\u044B\u043B\u0430", 0, 2 ),
		            new Among ( "\u043D\u0430", -1, 1 ),
		            new Among ( "\u0435\u043D\u0430", 3, 2 ),
		            new Among ( "\u0435\u0442\u0435", -1, 1 ),
		            new Among ( "\u0438\u0442\u0435", -1, 2 ),
		            new Among ( "\u0439\u0442\u0435", -1, 1 ),
		            new Among ( "\u0435\u0439\u0442\u0435", 7, 2 ),
		            new Among ( "\u0443\u0439\u0442\u0435", 7, 2 ),
		            new Among ( "\u043B\u0438", -1, 1 ),
		            new Among ( "\u0438\u043B\u0438", 10, 2 ),
		            new Among ( "\u044B\u043B\u0438", 10, 2 ),
		            new Among ( "\u0439", -1, 1 ),
		            new Among ( "\u0435\u0439", 13, 2 ),
		            new Among ( "\u0443\u0439", 13, 2 ),
		            new Among ( "\u043B", -1, 1 ),
		            new Among ( "\u0438\u043B", 16, 2 ),
		            new Among ( "\u044B\u043B", 16, 2 ),
		            new Among ( "\u0435\u043C", -1, 1 ),
		            new Among ( "\u0438\u043C", -1, 2 ),
		            new Among ( "\u044B\u043C", -1, 2 ),
		            new Among ( "\u043D", -1, 1 ),
		            new Among ( "\u0435\u043D", 22, 2 ),
		            new Among ( "\u043B\u043E", -1, 1 ),
		            new Among ( "\u0438\u043B\u043E", 24, 2 ),
		            new Among ( "\u044B\u043B\u043E", 24, 2 ),
		            new Among ( "\u043D\u043E", -1, 1 ),
		            new Among ( "\u0435\u043D\u043E", 27, 2 ),
		            new Among ( "\u043D\u043D\u043E", 27, 1 ),
		            new Among ( "\u0435\u0442", -1, 1 ),
		            new Among ( "\u0443\u0435\u0442", 30, 2 ),
		            new Among ( "\u0438\u0442", -1, 2 ),
		            new Among ( "\u044B\u0442", -1, 2 ),
		            new Among ( "\u044E\u0442", -1, 1 ),
		            new Among ( "\u0443\u044E\u0442", 34, 2 ),
		            new Among ( "\u044F\u0442", -1, 2 ),
		            new Among ( "\u043D\u044B", -1, 1 ),
		            new Among ( "\u0435\u043D\u044B", 37, 2 ),
		            new Among ( "\u0442\u044C", -1, 1 ),
		            new Among ( "\u0438\u0442\u044C", 39, 2 ),
		            new Among ( "\u044B\u0442\u044C", 39, 2 ),
		            new Among ( "\u0435\u0448\u044C", -1, 1 ),
		            new Among ( "\u0438\u0448\u044C", -1, 2 ),
		            new Among ( "\u044E", -1, 2 ),
		            new Among ( "\u0443\u044E", 44, 2 )
		        ];
		
		        var a_5 = [
		            new Among ( "\u0430", -1, 1 ),
		            new Among ( "\u0435\u0432", -1, 1 ),
		            new Among ( "\u043E\u0432", -1, 1 ),
		            new Among ( "\u0435", -1, 1 ),
		            new Among ( "\u0438\u0435", 3, 1 ),
		            new Among ( "\u044C\u0435", 3, 1 ),
		            new Among ( "\u0438", -1, 1 ),
		            new Among ( "\u0435\u0438", 6, 1 ),
		            new Among ( "\u0438\u0438", 6, 1 ),
		            new Among ( "\u0430\u043C\u0438", 6, 1 ),
		            new Among ( "\u044F\u043C\u0438", 6, 1 ),
		            new Among ( "\u0438\u044F\u043C\u0438", 10, 1 ),
		            new Among ( "\u0439", -1, 1 ),
		            new Among ( "\u0435\u0439", 12, 1 ),
		            new Among ( "\u0438\u0435\u0439", 13, 1 ),
		            new Among ( "\u0438\u0439", 12, 1 ),
		            new Among ( "\u043E\u0439", 12, 1 ),
		            new Among ( "\u0430\u043C", -1, 1 ),
		            new Among ( "\u0435\u043C", -1, 1 ),
		            new Among ( "\u0438\u0435\u043C", 18, 1 ),
		            new Among ( "\u043E\u043C", -1, 1 ),
		            new Among ( "\u044F\u043C", -1, 1 ),
		            new Among ( "\u0438\u044F\u043C", 21, 1 ),
		            new Among ( "\u043E", -1, 1 ),
		            new Among ( "\u0443", -1, 1 ),
		            new Among ( "\u0430\u0445", -1, 1 ),
		            new Among ( "\u044F\u0445", -1, 1 ),
		            new Among ( "\u0438\u044F\u0445", 26, 1 ),
		            new Among ( "\u044B", -1, 1 ),
		            new Among ( "\u044C", -1, 1 ),
		            new Among ( "\u044E", -1, 1 ),
		            new Among ( "\u0438\u044E", 30, 1 ),
		            new Among ( "\u044C\u044E", 30, 1 ),
		            new Among ( "\u044F", -1, 1 ),
		            new Among ( "\u0438\u044F", 33, 1 ),
		            new Among ( "\u044C\u044F", 33, 1 )
		        ];
		
		        var a_6 = [
		            new Among ( "\u043E\u0441\u0442", -1, 1 ),
		            new Among ( "\u043E\u0441\u0442\u044C", -1, 1 )
		        ];
		
		        var a_7 = [
		            new Among ( "\u0435\u0439\u0448\u0435", -1, 1 ),
		            new Among ( "\u043D", -1, 2 ),
		            new Among ( "\u0435\u0439\u0448", -1, 1 ),
		            new Among ( "\u044C", -1, 3 )
		        ];
		
		        var g_v = [33, 65, 8, 232 ];
		
		        var I_p2;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            I_pV = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                golab1: while(true)
		                {
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 1072, 1103)))
		                        {
		                            break lab2;
		                        }
		                        break golab1;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_pV = sbp.cursor;
		                golab3: while(true)
		                {
		                    lab4: do {
		                        if (!(sbp.out_grouping(g_v, 1072, 1103)))
		                        {
		                            break lab4;
		                        }
		                        break golab3;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                golab5: while(true)
		                {
		                    lab6: do {
		                        if (!(sbp.in_grouping(g_v, 1072, 1103)))
		                        {
		                            break lab6;
		                        }
		                        break golab5;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                golab7: while(true)
		                {
		                    lab8: do {
		                        if (!(sbp.out_grouping(g_v, 1072, 1103)))
		                        {
		                            break lab8;
		                        }
		                        break golab7;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab0;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_perfective_gerund() {
		            var among_var;
		            var v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 9);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    lab0: do {
		                        v_1 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            if (!(sbp.eq_s_b(1, "\u0430")))
		                            {
		                                break lab1;
		                            }
		                            break lab0;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_1;
		                        if (!(sbp.eq_s_b(1, "\u044F")))
		                        {
		                            return false;
		                        }
		                    } while (false);
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_adjective() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_1, 26);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_adjectival() {
		            var among_var;
		            var v_1;
		            var v_2;
		            if (!r_adjective())
		            {
		                return false;
		            }
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                sbp.ket = sbp.cursor;
		                among_var = sbp.find_among_b(a_2, 8);
		                if (among_var == 0)
		                {
		                    sbp.cursor = sbp.limit - v_1;
		                    break lab0;
		                }
		                sbp.bra = sbp.cursor;
		                switch(among_var) {
		                    case 0:
		                        sbp.cursor = sbp.limit - v_1;
		                        break lab0;
		                    case 1:
		                        lab1: do {
		                            v_2 = sbp.limit - sbp.cursor;
		                            lab2: do {
		                                if (!(sbp.eq_s_b(1, "\u0430")))
		                                {
		                                    break lab2;
		                                }
		                                break lab1;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_2;
		                            if (!(sbp.eq_s_b(1, "\u044F")))
		                            {
		                                sbp.cursor = sbp.limit - v_1;
		                                break lab0;
		                            }
		                        } while (false);
		                        sbp.slice_del();
		                        break;
		                    case 2:
		                        sbp.slice_del();
		                        break;
		                }
		            } while (false);
		            return true;
		        }
		
		        function r_reflexive() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_3, 2);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_verb() {
		            var among_var;
		            var v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_4, 46);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    lab0: do {
		                        v_1 = sbp.limit - sbp.cursor;
		                        lab1: do {
		                            if (!(sbp.eq_s_b(1, "\u0430")))
		                            {
		                                break lab1;
		                            }
		                            break lab0;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_1;
		                        if (!(sbp.eq_s_b(1, "\u044F")))
		                        {
		                            return false;
		                        }
		                    } while (false);
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_noun() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_5, 36);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_derivational() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 2);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            if (!r_R2())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_tidy_up() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 4);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    sbp.ket = sbp.cursor;
		                    if (!(sbp.eq_s_b(1, "\u043D")))
		                    {
		                        return false;
		                    }
		                    sbp.bra = sbp.cursor;
		                    if (!(sbp.eq_s_b(1, "\u043D")))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!(sbp.eq_s_b(1, "\u043D")))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 3:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_3 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_2;
		            v_4 = sbp.limit - sbp.cursor;
		            lab1: do {
		                lab2: do {
		                    v_5 = sbp.limit - sbp.cursor;
		                    lab3: do {
		                        if (!r_perfective_gerund())
		                        {
		                            break lab3;
		                        }
		                        break lab2;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_5;
		                    v_6 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        if (!r_reflexive())
		                        {
		                            sbp.cursor = sbp.limit - v_6;
		                            break lab4;
		                        }
		                    } while (false);
		                    lab5: do {
		                        v_7 = sbp.limit - sbp.cursor;
		                        lab6: do {
		                            if (!r_adjectival())
		                            {
		                                break lab6;
		                            }
		                            break lab5;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_7;
		                        lab7: do {
		                            if (!r_verb())
		                            {
		                                break lab7;
		                            }
		                            break lab5;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_7;
		                        if (!r_noun())
		                        {
		                            break lab1;
		                        }
		                    } while (false);
		                } while (false);
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            v_8 = sbp.limit - sbp.cursor;
		            lab8: do {
		                sbp.ket = sbp.cursor;
		                if (!(sbp.eq_s_b(1, "\u0438")))
		                {
		                    sbp.cursor = sbp.limit - v_8;
		                    break lab8;
		                }
		                sbp.bra = sbp.cursor;
		                sbp.slice_del();
		            } while (false);
		            v_9 = sbp.limit - sbp.cursor;
		            lab9: do {
		                if (!r_derivational())
		                {
		                    break lab9;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_9;
		            v_10 = sbp.limit - sbp.cursor;
		            lab10: do {
		                if (!r_tidy_up())
		                {
		                    break lab10;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_10;
		            sbp.limit_backward = v_3;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		spanishStemmer : function() {

		        var a_0 = [
		            new Among ( "", -1, 6 ),
		            new Among ( "\u00E1", 0, 1 ),
		            new Among ( "\u00E9", 0, 2 ),
		            new Among ( "\u00ED", 0, 3 ),
		            new Among ( "\u00F3", 0, 4 ),
		            new Among ( "\u00FA", 0, 5 )
		        ];
		
		        var a_1 = [
		            new Among ( "la", -1, -1 ),
		            new Among ( "sela", 0, -1 ),
		            new Among ( "le", -1, -1 ),
		            new Among ( "me", -1, -1 ),
		            new Among ( "se", -1, -1 ),
		            new Among ( "lo", -1, -1 ),
		            new Among ( "selo", 5, -1 ),
		            new Among ( "las", -1, -1 ),
		            new Among ( "selas", 7, -1 ),
		            new Among ( "les", -1, -1 ),
		            new Among ( "los", -1, -1 ),
		            new Among ( "selos", 10, -1 ),
		            new Among ( "nos", -1, -1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ando", -1, 6 ),
		            new Among ( "iendo", -1, 6 ),
		            new Among ( "yendo", -1, 7 ),
		            new Among ( "\u00E1ndo", -1, 2 ),
		            new Among ( "i\u00E9ndo", -1, 1 ),
		            new Among ( "ar", -1, 6 ),
		            new Among ( "er", -1, 6 ),
		            new Among ( "ir", -1, 6 ),
		            new Among ( "\u00E1r", -1, 3 ),
		            new Among ( "\u00E9r", -1, 4 ),
		            new Among ( "\u00EDr", -1, 5 )
		        ];
		
		        var a_3 = [
		            new Among ( "ic", -1, -1 ),
		            new Among ( "ad", -1, -1 ),
		            new Among ( "os", -1, -1 ),
		            new Among ( "iv", -1, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "able", -1, 1 ),
		            new Among ( "ible", -1, 1 ),
		            new Among ( "ante", -1, 1 )
		        ];
		
		        var a_5 = [
		            new Among ( "ic", -1, 1 ),
		            new Among ( "abil", -1, 1 ),
		            new Among ( "iv", -1, 1 )
		        ];
		
		        var a_6 = [
		            new Among ( "ica", -1, 1 ),
		            new Among ( "ancia", -1, 2 ),
		            new Among ( "encia", -1, 5 ),
		            new Among ( "adora", -1, 2 ),
		            new Among ( "osa", -1, 1 ),
		            new Among ( "ista", -1, 1 ),
		            new Among ( "iva", -1, 9 ),
		            new Among ( "anza", -1, 1 ),
		            new Among ( "log\u00EDa", -1, 3 ),
		            new Among ( "idad", -1, 8 ),
		            new Among ( "able", -1, 1 ),
		            new Among ( "ible", -1, 1 ),
		            new Among ( "ante", -1, 2 ),
		            new Among ( "mente", -1, 7 ),
		            new Among ( "amente", 13, 6 ),
		            new Among ( "aci\u00F3n", -1, 2 ),
		            new Among ( "uci\u00F3n", -1, 4 ),
		            new Among ( "ico", -1, 1 ),
		            new Among ( "ismo", -1, 1 ),
		            new Among ( "oso", -1, 1 ),
		            new Among ( "amiento", -1, 1 ),
		            new Among ( "imiento", -1, 1 ),
		            new Among ( "ivo", -1, 9 ),
		            new Among ( "ador", -1, 2 ),
		            new Among ( "icas", -1, 1 ),
		            new Among ( "ancias", -1, 2 ),
		            new Among ( "encias", -1, 5 ),
		            new Among ( "adoras", -1, 2 ),
		            new Among ( "osas", -1, 1 ),
		            new Among ( "istas", -1, 1 ),
		            new Among ( "ivas", -1, 9 ),
		            new Among ( "anzas", -1, 1 ),
		            new Among ( "log\u00EDas", -1, 3 ),
		            new Among ( "idades", -1, 8 ),
		            new Among ( "ables", -1, 1 ),
		            new Among ( "ibles", -1, 1 ),
		            new Among ( "aciones", -1, 2 ),
		            new Among ( "uciones", -1, 4 ),
		            new Among ( "adores", -1, 2 ),
		            new Among ( "antes", -1, 2 ),
		            new Among ( "icos", -1, 1 ),
		            new Among ( "ismos", -1, 1 ),
		            new Among ( "osos", -1, 1 ),
		            new Among ( "amientos", -1, 1 ),
		            new Among ( "imientos", -1, 1 ),
		            new Among ( "ivos", -1, 9 )
		        ];
		
		        var a_7 = [
		            new Among ( "ya", -1, 1 ),
		            new Among ( "ye", -1, 1 ),
		            new Among ( "yan", -1, 1 ),
		            new Among ( "yen", -1, 1 ),
		            new Among ( "yeron", -1, 1 ),
		            new Among ( "yendo", -1, 1 ),
		            new Among ( "yo", -1, 1 ),
		            new Among ( "yas", -1, 1 ),
		            new Among ( "yes", -1, 1 ),
		            new Among ( "yais", -1, 1 ),
		            new Among ( "yamos", -1, 1 ),
		            new Among ( "y\u00F3", -1, 1 )
		        ];
		
		        var a_8 = [
		            new Among ( "aba", -1, 2 ),
		            new Among ( "ada", -1, 2 ),
		            new Among ( "ida", -1, 2 ),
		            new Among ( "ara", -1, 2 ),
		            new Among ( "iera", -1, 2 ),
		            new Among ( "\u00EDa", -1, 2 ),
		            new Among ( "ar\u00EDa", 5, 2 ),
		            new Among ( "er\u00EDa", 5, 2 ),
		            new Among ( "ir\u00EDa", 5, 2 ),
		            new Among ( "ad", -1, 2 ),
		            new Among ( "ed", -1, 2 ),
		            new Among ( "id", -1, 2 ),
		            new Among ( "ase", -1, 2 ),
		            new Among ( "iese", -1, 2 ),
		            new Among ( "aste", -1, 2 ),
		            new Among ( "iste", -1, 2 ),
		            new Among ( "an", -1, 2 ),
		            new Among ( "aban", 16, 2 ),
		            new Among ( "aran", 16, 2 ),
		            new Among ( "ieran", 16, 2 ),
		            new Among ( "\u00EDan", 16, 2 ),
		            new Among ( "ar\u00EDan", 20, 2 ),
		            new Among ( "er\u00EDan", 20, 2 ),
		            new Among ( "ir\u00EDan", 20, 2 ),
		            new Among ( "en", -1, 1 ),
		            new Among ( "asen", 24, 2 ),
		            new Among ( "iesen", 24, 2 ),
		            new Among ( "aron", -1, 2 ),
		            new Among ( "ieron", -1, 2 ),
		            new Among ( "ar\u00E1n", -1, 2 ),
		            new Among ( "er\u00E1n", -1, 2 ),
		            new Among ( "ir\u00E1n", -1, 2 ),
		            new Among ( "ado", -1, 2 ),
		            new Among ( "ido", -1, 2 ),
		            new Among ( "ando", -1, 2 ),
		            new Among ( "iendo", -1, 2 ),
		            new Among ( "ar", -1, 2 ),
		            new Among ( "er", -1, 2 ),
		            new Among ( "ir", -1, 2 ),
		            new Among ( "as", -1, 2 ),
		            new Among ( "abas", 39, 2 ),
		            new Among ( "adas", 39, 2 ),
		            new Among ( "idas", 39, 2 ),
		            new Among ( "aras", 39, 2 ),
		            new Among ( "ieras", 39, 2 ),
		            new Among ( "\u00EDas", 39, 2 ),
		            new Among ( "ar\u00EDas", 45, 2 ),
		            new Among ( "er\u00EDas", 45, 2 ),
		            new Among ( "ir\u00EDas", 45, 2 ),
		            new Among ( "es", -1, 1 ),
		            new Among ( "ases", 49, 2 ),
		            new Among ( "ieses", 49, 2 ),
		            new Among ( "abais", -1, 2 ),
		            new Among ( "arais", -1, 2 ),
		            new Among ( "ierais", -1, 2 ),
		            new Among ( "\u00EDais", -1, 2 ),
		            new Among ( "ar\u00EDais", 55, 2 ),
		            new Among ( "er\u00EDais", 55, 2 ),
		            new Among ( "ir\u00EDais", 55, 2 ),
		            new Among ( "aseis", -1, 2 ),
		            new Among ( "ieseis", -1, 2 ),
		            new Among ( "asteis", -1, 2 ),
		            new Among ( "isteis", -1, 2 ),
		            new Among ( "\u00E1is", -1, 2 ),
		            new Among ( "\u00E9is", -1, 1 ),
		            new Among ( "ar\u00E9is", 64, 2 ),
		            new Among ( "er\u00E9is", 64, 2 ),
		            new Among ( "ir\u00E9is", 64, 2 ),
		            new Among ( "ados", -1, 2 ),
		            new Among ( "idos", -1, 2 ),
		            new Among ( "amos", -1, 2 ),
		            new Among ( "\u00E1bamos", 70, 2 ),
		            new Among ( "\u00E1ramos", 70, 2 ),
		            new Among ( "i\u00E9ramos", 70, 2 ),
		            new Among ( "\u00EDamos", 70, 2 ),
		            new Among ( "ar\u00EDamos", 74, 2 ),
		            new Among ( "er\u00EDamos", 74, 2 ),
		            new Among ( "ir\u00EDamos", 74, 2 ),
		            new Among ( "emos", -1, 1 ),
		            new Among ( "aremos", 78, 2 ),
		            new Among ( "eremos", 78, 2 ),
		            new Among ( "iremos", 78, 2 ),
		            new Among ( "\u00E1semos", 78, 2 ),
		            new Among ( "i\u00E9semos", 78, 2 ),
		            new Among ( "imos", -1, 2 ),
		            new Among ( "ar\u00E1s", -1, 2 ),
		            new Among ( "er\u00E1s", -1, 2 ),
		            new Among ( "ir\u00E1s", -1, 2 ),
		            new Among ( "\u00EDs", -1, 2 ),
		            new Among ( "ar\u00E1", -1, 2 ),
		            new Among ( "er\u00E1", -1, 2 ),
		            new Among ( "ir\u00E1", -1, 2 ),
		            new Among ( "ar\u00E9", -1, 2 ),
		            new Among ( "er\u00E9", -1, 2 ),
		            new Among ( "ir\u00E9", -1, 2 ),
		            new Among ( "i\u00F3", -1, 2 )
		        ];
		
		        var a_9 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "e", -1, 2 ),
		            new Among ( "o", -1, 1 ),
		            new Among ( "os", -1, 1 ),
		            new Among ( "\u00E1", -1, 1 ),
		            new Among ( "\u00E9", -1, 2 ),
		            new Among ( "\u00ED", -1, 1 ),
		            new Among ( "\u00F3", -1, 1 )
		        ];
		
		        var g_v = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 17, 4, 10 ];
		
		        var I_p2;
		        var I_p1;
		        var I_pV;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_6;
		            var v_8;
		            I_pV = sbp.limit;
		            I_p1 = sbp.limit;
		            I_p2 = sbp.limit;
		            v_1 = sbp.cursor;
		            lab0: do {
		                lab1: do {
		                    v_2 = sbp.cursor;
		                    lab2: do {
		                        if (!(sbp.in_grouping(g_v, 97, 252)))
		                        {
		                            break lab2;
		                        }
		                        lab3: do {
		                            v_3 = sbp.cursor;
		                            lab4: do {
		                                if (!(sbp.out_grouping(g_v, 97, 252)))
		                                {
		                                    break lab4;
		                                }
		                                golab5: while(true)
		                                {
		                                    lab6: do {
		                                        if (!(sbp.in_grouping(g_v, 97, 252)))
		                                        {
		                                            break lab6;
		                                        }
		                                        break golab5;
		                                    } while (false);
		                                    if (sbp.cursor >= sbp.limit)
		                                    {
		                                        break lab4;
		                                    }
		                                    sbp.cursor++;
		                                }
		                                break lab3;
		                            } while (false);
		                            sbp.cursor = v_3;
		                            if (!(sbp.in_grouping(g_v, 97, 252)))
		                            {
		                                break lab2;
		                            }
		                            golab7: while(true)
		                            {
		                                lab8: do {
		                                    if (!(sbp.out_grouping(g_v, 97, 252)))
		                                    {
		                                        break lab8;
		                                    }
		                                    break golab7;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab2;
		                                }
		                                sbp.cursor++;
		                            }
		                        } while (false);
		                        break lab1;
		                    } while (false);
		                    sbp.cursor = v_2;
		                    if (!(sbp.out_grouping(g_v, 97, 252)))
		                    {
		                        break lab0;
		                    }
		                    lab9: do {
		                        v_6 = sbp.cursor;
		                        lab10: do {
		                            if (!(sbp.out_grouping(g_v, 97, 252)))
		                            {
		                                break lab10;
		                            }
		                            golab11: while(true)
		                            {
		                                lab12: do {
		                                    if (!(sbp.in_grouping(g_v, 97, 252)))
		                                    {
		                                        break lab12;
		                                    }
		                                    break golab11;
		                                } while (false);
		                                if (sbp.cursor >= sbp.limit)
		                                {
		                                    break lab10;
		                                }
		                                sbp.cursor++;
		                            }
		                            break lab9;
		                        } while (false);
		                        sbp.cursor = v_6;
		                        if (!(sbp.in_grouping(g_v, 97, 252)))
		                        {
		                            break lab0;
		                        }
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab0;
		                        }
		                        sbp.cursor++;
		                    } while (false);
		                } while (false);
		                I_pV = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_1;
		            v_8 = sbp.cursor;
		            lab13: do {
		                golab14: while(true)
		                {
		                    lab15: do {
		                        if (!(sbp.in_grouping(g_v, 97, 252)))
		                        {
		                            break lab15;
		                        }
		                        break golab14;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab16: while(true)
		                {
		                    lab17: do {
		                        if (!(sbp.out_grouping(g_v, 97, 252)))
		                        {
		                            break lab17;
		                        }
		                        break golab16;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p1 = sbp.cursor;
		                golab18: while(true)
		                {
		                    lab19: do {
		                        if (!(sbp.in_grouping(g_v, 97, 252)))
		                        {
		                            break lab19;
		                        }
		                        break golab18;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                golab20: while(true)
		                {
		                    lab21: do {
		                        if (!(sbp.out_grouping(g_v, 97, 252)))
		                        {
		                            break lab21;
		                        }
		                        break golab20;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        break lab13;
		                    }
		                    sbp.cursor++;
		                }
		                I_p2 = sbp.cursor;
		            } while (false);
		            sbp.cursor = v_8;
		            return true;
		        }
		
		        function r_postlude() {
		            var among_var;
		            var v_1;
		            replab0: while(true)
		            {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    sbp.bra = sbp.cursor;
		                    among_var = sbp.find_among(a_0, 6);
		                    if (among_var == 0)
		                    {
		                        break lab1;
		                    }
		                    sbp.ket = sbp.cursor;
		                    switch(among_var) {
		                        case 0:
		                            break lab1;
		                        case 1:
		                            sbp.slice_from("a");
		                            break;
		                        case 2:
		                            sbp.slice_from("e");
		                            break;
		                        case 3:
		                            sbp.slice_from("i");
		                            break;
		                        case 4:
		                            sbp.slice_from("o");
		                            break;
		                        case 5:
		                            sbp.slice_from("u");
		                            break;
		                        case 6:
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                            break;
		                    }
		                    continue replab0;
		                } while (false);
		                sbp.cursor = v_1;
		                break replab0;
		            }
		            return true;
		        }
		
		        function r_RV() {
		            if (!(I_pV <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R1() {
		            if (!(I_p1 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_R2() {
		            if (!(I_p2 <= sbp.cursor))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_attached_pronoun() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            if (sbp.find_among_b(a_1, 13) == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 11);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            if (!r_RV())
		            {
		                return false;
		            }
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_from("iendo");
		                    break;
		                case 2:
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_from("ando");
		                    break;
		                case 3:
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_from("ar");
		                    break;
		                case 4:
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_from("er");
		                    break;
		                case 5:
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_from("ir");
		                    break;
		                case 6:
		                    sbp.slice_del();
		                    break;
		                case 7:
		                    if (!(sbp.eq_s_b(1, "u")))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_standard_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_6, 46);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_1 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "ic")))
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.slice_del();
		                    } while (false);
		                    break;
		                case 3:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("log");
		                    break;
		                case 4:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("u");
		                    break;
		                case 5:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_from("ente");
		                    break;
		                case 6:
		                    if (!r_R1())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_2 = sbp.limit - sbp.cursor;
		                    lab1: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_3, 4);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_2;
		                            break lab1;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_2;
		                            break lab1;
		                        }
		                        sbp.slice_del();
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_2;
		                                break lab1;
		                            case 1:
		                                sbp.ket = sbp.cursor;
		                                if (!(sbp.eq_s_b(2, "at")))
		                                {
		                                    sbp.cursor = sbp.limit - v_2;
		                                    break lab1;
		                                }
		                                sbp.bra = sbp.cursor;
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_2;
		                                    break lab1;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 7:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_4, 3);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab2;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_3;
		                                break lab2;
		                            case 1:
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_3;
		                                    break lab2;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 8:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab3: do {
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_5, 3);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab3;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_4;
		                                break lab3;
		                            case 1:
		                                if (!r_R2())
		                                {
		                                    sbp.cursor = sbp.limit - v_4;
		                                    break lab3;
		                                }
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    break;
		                case 9:
		                    if (!r_R2())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_5 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(2, "at")))
		                        {
		                            sbp.cursor = sbp.limit - v_5;
		                            break lab4;
		                        }
		                        sbp.bra = sbp.cursor;
		                        if (!r_R2())
		                        {
		                            sbp.cursor = sbp.limit - v_5;
		                            break lab4;
		                        }
		                        sbp.slice_del();
		                    } while (false);
		                    break;
		            }
		            return true;
		        }
		
		        function r_y_verb_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_7, 12);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!(sbp.eq_s_b(1, "u")))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_verb_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_pV)
		            {
		                return false;
		            }
		            sbp.cursor = I_pV;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_8, 96);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        if (!(sbp.eq_s_b(1, "u")))
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab0;
		                        }
		                        v_4 = sbp.limit - sbp.cursor;
		                        if (!(sbp.eq_s_b(1, "g")))
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab0;
		                        }
		                        sbp.cursor = sbp.limit - v_4;
		                    } while (false);
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_residual_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_9, 8);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!r_RV())
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    v_1 = sbp.limit - sbp.cursor;
		                    lab0: do {
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.eq_s_b(1, "u")))
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.bra = sbp.cursor;
		                        v_2 = sbp.limit - sbp.cursor;
		                        if (!(sbp.eq_s_b(1, "g")))
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.cursor = sbp.limit - v_2;
		                        if (!r_RV())
		                        {
		                            sbp.cursor = sbp.limit - v_1;
		                            break lab0;
		                        }
		                        sbp.slice_del();
		                    } while (false);
		                    break;
		            }
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_attached_pronoun())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                lab3: do {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        if (!r_standard_suffix())
		                        {
		                            break lab4;
		                        }
		                        break lab3;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                    lab5: do {
		                        if (!r_y_verb_suffix())
		                        {
		                            break lab5;
		                        }
		                        break lab3;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                    if (!r_verb_suffix())
		                    {
		                        break lab2;
		                    }
		                } while (false);
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_5 = sbp.limit - sbp.cursor;
		            lab6: do {
		                if (!r_residual_suffix())
		                {
		                    break lab6;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_5;
		            sbp.cursor = sbp.limit_backward;            v_6 = sbp.cursor;
		            lab7: do {
		                if (!r_postlude())
		                {
		                    break lab7;
		                }
		            } while (false);
		            sbp.cursor = v_6;
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		sloveneStemmer : function() {

		        var a_0 = [
		            new Among ( "anski", -1, 1 ),
		            new Among ( "evski", -1, 1 ),
		            new Among ( "ovski", -1, 1 )
		        ];
		
		        var a_1 = [
		            new Among ( "stvo", -1, 1 ),
		            new Among ( "\u0161tvo", -1, 1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ega", -1, 1 ),
		            new Among ( "ija", -1, 1 ),
		            new Among ( "ila", -1, 1 ),
		            new Among ( "ema", -1, 1 ),
		            new Among ( "vna", -1, 1 ),
		            new Among ( "ite", -1, 1 ),
		            new Among ( "ste", -1, 1 ),
		            new Among ( "\u0161\u010De", -1, 1 ),
		            new Among ( "ski", -1, 1 ),
		            new Among ( "\u0161ki", -1, 1 ),
		            new Among ( "iti", -1, 1 ),
		            new Among ( "ovi", -1, 1 ),
		            new Among ( "\u010Dek", -1, 1 ),
		            new Among ( "ovm", -1, 1 ),
		            new Among ( "\u010Dan", -1, 1 ),
		            new Among ( "len", -1, 1 ),
		            new Among ( "ven", -1, 1 ),
		            new Among ( "\u0161en", -1, 1 ),
		            new Among ( "ejo", -1, 1 ),
		            new Among ( "ijo", -1, 1 ),
		            new Among ( "ast", -1, 1 ),
		            new Among ( "ost", -1, 1 )
		        ];
		
		        var a_3 = [
		            new Among ( "ja", -1, 1 ),
		            new Among ( "ka", -1, 1 ),
		            new Among ( "ma", -1, 1 ),
		            new Among ( "ec", -1, 1 ),
		            new Among ( "je", -1, 1 ),
		            new Among ( "eg", -1, 1 ),
		            new Among ( "eh", -1, 1 ),
		            new Among ( "ih", -1, 1 ),
		            new Among ( "mi", -1, 1 ),
		            new Among ( "ti", -1, 1 ),
		            new Among ( "ij", -1, 1 ),
		            new Among ( "al", -1, 1 ),
		            new Among ( "il", -1, 1 ),
		            new Among ( "em", -1, 1 ),
		            new Among ( "om", -1, 1 ),
		            new Among ( "an", -1, 1 ),
		            new Among ( "en", -1, 1 ),
		            new Among ( "in", -1, 1 ),
		            new Among ( "do", -1, 1 ),
		            new Among ( "jo", -1, 1 ),
		            new Among ( "ir", -1, 1 ),
		            new Among ( "at", -1, 1 ),
		            new Among ( "ev", -1, 1 ),
		            new Among ( "iv", -1, 1 ),
		            new Among ( "ov", -1, 1 ),
		            new Among ( "o\u010D", -1, 1 )
		        ];
		
		        var a_4 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "c", -1, 1 ),
		            new Among ( "e", -1, 1 ),
		            new Among ( "i", -1, 1 ),
		            new Among ( "m", -1, 1 ),
		            new Among ( "o", -1, 1 ),
		            new Among ( "u", -1, 1 ),
		            new Among ( "\u0161", -1, 1 )
		        ];
		
		        var a_5 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "e", -1, 1 ),
		            new Among ( "i", -1, 1 ),
		            new Among ( "o", -1, 1 ),
		            new Among ( "u", -1, 1 )
		        ];
		
		        var g_crke = [255, 255, 62, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 32 ];
		
		        var g_samoglasniki = [17, 65, 16 ];
		
		        var g_soglasniki = [119, 95, 23, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128, 0, 0, 0, 16 ];
		
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        this.stem = function() {
		            var among_var;
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            I_p1 = sbp.limit;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                for (v_2 = 4; v_2 > 0; v_2--)
		                {
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab1: do {
		                        if (!(I_p1 > 8))
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab1;
		                        }
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_0, 3);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_3;
		                            break lab1;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_3;
		                                break lab1;
		                            case 1:
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        if (!(I_p1 > 7))
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab2;
		                        }
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_1, 2);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_4;
		                            break lab2;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_4;
		                                break lab2;
		                            case 1:
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    I_p1 = sbp.get_size_of_p();
		                    v_5 = sbp.limit - sbp.cursor;
		                    lab3: do {
		                        if (!(I_p1 > 6))
		                        {
		                            sbp.cursor = sbp.limit - v_5;
		                            break lab3;
		                        }
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_2, 22);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_5;
		                            break lab3;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_5;
		                                break lab3;
		                            case 1:
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    I_p1 = sbp.get_size_of_p();
		                    v_6 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        if (!(I_p1 > 6))
		                        {
		                            sbp.cursor = sbp.limit - v_6;
		                            break lab4;
		                        }
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_3, 26);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_6;
		                            break lab4;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_6;
		                                break lab4;
		                            case 1:
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    I_p1 = sbp.get_size_of_p();
		                    v_7 = sbp.limit - sbp.cursor;
		                    lab5: do {
		                        if (!(I_p1 > 5))
		                        {
		                            sbp.cursor = sbp.limit - v_7;
		                            break lab5;
		                        }
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_4, 8);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_7;
		                            break lab5;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_7;
		                                break lab5;
		                            case 1:
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                    I_p1 = sbp.get_size_of_p();
		                    v_8 = sbp.limit - sbp.cursor;
		                    lab6: do {
		                        if (!(I_p1 > 6))
		                        {
		                            sbp.cursor = sbp.limit - v_8;
		                            break lab6;
		                        }
		                        sbp.ket = sbp.cursor;
		                        if (!(sbp.in_grouping_b(g_soglasniki, 98, 382)))
		                        {
		                            sbp.cursor = sbp.limit - v_8;
		                            break lab6;
		                        }
		                        sbp.bra = sbp.cursor;
		                        v_9 = sbp.limit - sbp.cursor;
		                        if (!(sbp.in_grouping_b(g_soglasniki, 98, 382)))
		                        {
		                            sbp.cursor = sbp.limit - v_8;
		                            break lab6;
		                        }
		                        sbp.cursor = sbp.limit - v_9;
		                        sbp.slice_del();
		                    } while (false);
		                    I_p1 = sbp.get_size_of_p();
		                    v_10 = sbp.limit - sbp.cursor;
		                    lab7: do {
		                        if (!(I_p1 > 5))
		                        {
		                            sbp.cursor = sbp.limit - v_10;
		                            break lab7;
		                        }
		                        sbp.ket = sbp.cursor;
		                        among_var = sbp.find_among_b(a_5, 5);
		                        if (among_var == 0)
		                        {
		                            sbp.cursor = sbp.limit - v_10;
		                            break lab7;
		                        }
		                        sbp.bra = sbp.cursor;
		                        switch(among_var) {
		                            case 0:
		                                sbp.cursor = sbp.limit - v_10;
		                                break lab7;
		                            case 1:
		                                sbp.slice_del();
		                                break;
		                        }
		                    } while (false);
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_1;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		swedishStemmer : function() {

		        var a_0 = [
		            new Among ( "a", -1, 1 ),
		            new Among ( "arna", 0, 1 ),
		            new Among ( "erna", 0, 1 ),
		            new Among ( "heterna", 2, 1 ),
		            new Among ( "orna", 0, 1 ),
		            new Among ( "ad", -1, 1 ),
		            new Among ( "e", -1, 1 ),
		            new Among ( "ade", 6, 1 ),
		            new Among ( "ande", 6, 1 ),
		            new Among ( "arne", 6, 1 ),
		            new Among ( "are", 6, 1 ),
		            new Among ( "aste", 6, 1 ),
		            new Among ( "en", -1, 1 ),
		            new Among ( "anden", 12, 1 ),
		            new Among ( "aren", 12, 1 ),
		            new Among ( "heten", 12, 1 ),
		            new Among ( "ern", -1, 1 ),
		            new Among ( "ar", -1, 1 ),
		            new Among ( "er", -1, 1 ),
		            new Among ( "heter", 18, 1 ),
		            new Among ( "or", -1, 1 ),
		            new Among ( "s", -1, 2 ),
		            new Among ( "as", 21, 1 ),
		            new Among ( "arnas", 22, 1 ),
		            new Among ( "ernas", 22, 1 ),
		            new Among ( "ornas", 22, 1 ),
		            new Among ( "es", 21, 1 ),
		            new Among ( "ades", 26, 1 ),
		            new Among ( "andes", 26, 1 ),
		            new Among ( "ens", 21, 1 ),
		            new Among ( "arens", 29, 1 ),
		            new Among ( "hetens", 29, 1 ),
		            new Among ( "erns", 21, 1 ),
		            new Among ( "at", -1, 1 ),
		            new Among ( "andet", -1, 1 ),
		            new Among ( "het", -1, 1 ),
		            new Among ( "ast", -1, 1 )
		        ];
		
		        var a_1 = [
		            new Among ( "dd", -1, -1 ),
		            new Among ( "gd", -1, -1 ),
		            new Among ( "nn", -1, -1 ),
		            new Among ( "dt", -1, -1 ),
		            new Among ( "gt", -1, -1 ),
		            new Among ( "kt", -1, -1 ),
		            new Among ( "tt", -1, -1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ig", -1, 1 ),
		            new Among ( "lig", 0, 1 ),
		            new Among ( "els", -1, 1 ),
		            new Among ( "fullt", -1, 3 ),
		            new Among ( "l\u00F6st", -1, 2 )
		        ];
		
		        var g_v = [17, 65, 16, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 0, 32 ];
		
		        var g_s_ending = [119, 127, 149 ];
		
		        var I_x;
		        var I_p1;
		
		        var sbp = new SnowballProgram();
		
		        function r_mark_regions() {
		            var v_1;
		            var v_2;
		            I_p1 = sbp.limit;
		            v_1 = sbp.cursor;
		            {
		                var c = sbp.cursor + 3;
		                if (0 > c || c > sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor = c;
		            }
		            I_x = sbp.cursor;
		            sbp.cursor = v_1;
		            golab0: while(true)
		            {
		                v_2 = sbp.cursor;
		                lab1: do {
		                    if (!(sbp.in_grouping(g_v, 97, 246)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = v_2;
		                    break golab0;
		                } while (false);
		                sbp.cursor = v_2;
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            golab2: while(true)
		            {
		                lab3: do {
		                    if (!(sbp.out_grouping(g_v, 97, 246)))
		                    {
		                        break lab3;
		                    }
		                    break golab2;
		                } while (false);
		                if (sbp.cursor >= sbp.limit)
		                {
		                    return false;
		                }
		                sbp.cursor++;
		            }
		            I_p1 = sbp.cursor;
		            lab4: do {
		                if (!(I_p1 < I_x))
		                {
		                    break lab4;
		                }
		                I_p1 = I_x;
		            } while (false);
		            return true;
		        }
		
		        function r_main_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_0, 37);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            sbp.limit_backward = v_2;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    if (!(sbp.in_grouping_b(g_s_ending, 98, 121)))
		                    {
		                        return false;
		                    }
		                    sbp.slice_del();
		                    break;
		            }
		            return true;
		        }
		
		        function r_consonant_pair() {
		            var v_1;
		            var v_2;
		            var v_3;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            v_3 = sbp.limit - sbp.cursor;
		            if (sbp.find_among_b(a_1, 7) == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.cursor = sbp.limit - v_3;
		            sbp.ket = sbp.cursor;
		            if (sbp.cursor <= sbp.limit_backward)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.cursor--;
		            sbp.bra = sbp.cursor;
		            sbp.slice_del();
		            sbp.limit_backward = v_2;
		            return true;
		        }
		
		        function r_other_suffix() {
		            var among_var;
		            var v_1;
		            var v_2;
		            v_1 = sbp.limit - sbp.cursor;
		            if (sbp.cursor < I_p1)
		            {
		                return false;
		            }
		            sbp.cursor = I_p1;
		            v_2 = sbp.limit_backward;
		            sbp.limit_backward = sbp.cursor;
		            sbp.cursor = sbp.limit - v_1;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_2, 5);
		            if (among_var == 0)
		            {
		                sbp.limit_backward = v_2;
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    sbp.limit_backward = v_2;
		                    return false;
		                case 1:
		                    sbp.slice_del();
		                    break;
		                case 2:
		                    sbp.slice_from("l\u00F6s");
		                    break;
		                case 3:
		                    sbp.slice_from("full");
		                    break;
		            }
		            sbp.limit_backward = v_2;
		            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            v_1 = sbp.cursor;
		            lab0: do {
		                if (!r_mark_regions())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = v_1;
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_main_suffix())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_consonant_pair())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            v_4 = sbp.limit - sbp.cursor;
		            lab3: do {
		                if (!r_other_suffix())
		                {
		                    break lab3;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_4;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		},
		turkishStemmer : function() {

		        var a_0 = [
		            new Among ( "m", -1, -1 ),
		            new Among ( "n", -1, -1 ),
		            new Among ( "miz", -1, -1 ),
		            new Among ( "niz", -1, -1 ),
		            new Among ( "muz", -1, -1 ),
		            new Among ( "nuz", -1, -1 ),
		            new Among ( "m\u00FCz", -1, -1 ),
		            new Among ( "n\u00FCz", -1, -1 ),
		            new Among ( "m\u0131z", -1, -1 ),
		            new Among ( "n\u0131z", -1, -1 )
		        ];
		
		        var a_1 = [
		            new Among ( "leri", -1, -1 ),
		            new Among ( "lar\u0131", -1, -1 )
		        ];
		
		        var a_2 = [
		            new Among ( "ni", -1, -1 ),
		            new Among ( "nu", -1, -1 ),
		            new Among ( "n\u00FC", -1, -1 ),
		            new Among ( "n\u0131", -1, -1 )
		        ];
		
		        var a_3 = [
		            new Among ( "in", -1, -1 ),
		            new Among ( "un", -1, -1 ),
		            new Among ( "\u00FCn", -1, -1 ),
		            new Among ( "\u0131n", -1, -1 )
		        ];
		
		        var a_4 = [
		            new Among ( "a", -1, -1 ),
		            new Among ( "e", -1, -1 )
		        ];
		
		        var a_5 = [
		            new Among ( "na", -1, -1 ),
		            new Among ( "ne", -1, -1 )
		        ];
		
		        var a_6 = [
		            new Among ( "da", -1, -1 ),
		            new Among ( "ta", -1, -1 ),
		            new Among ( "de", -1, -1 ),
		            new Among ( "te", -1, -1 )
		        ];
		
		        var a_7 = [
		            new Among ( "nda", -1, -1 ),
		            new Among ( "nde", -1, -1 )
		        ];
		
		        var a_8 = [
		            new Among ( "dan", -1, -1 ),
		            new Among ( "tan", -1, -1 ),
		            new Among ( "den", -1, -1 ),
		            new Among ( "ten", -1, -1 )
		        ];
		
		        var a_9 = [
		            new Among ( "ndan", -1, -1 ),
		            new Among ( "nden", -1, -1 )
		        ];
		
		        var a_10 = [
		            new Among ( "la", -1, -1 ),
		            new Among ( "le", -1, -1 )
		        ];
		
		        var a_11 = [
		            new Among ( "ca", -1, -1 ),
		            new Among ( "ce", -1, -1 )
		        ];
		
		        var a_12 = [
		            new Among ( "im", -1, -1 ),
		            new Among ( "um", -1, -1 ),
		            new Among ( "\u00FCm", -1, -1 ),
		            new Among ( "\u0131m", -1, -1 )
		        ];
		
		        var a_13 = [
		            new Among ( "sin", -1, -1 ),
		            new Among ( "sun", -1, -1 ),
		            new Among ( "s\u00FCn", -1, -1 ),
		            new Among ( "s\u0131n", -1, -1 )
		        ];
		
		        var a_14 = [
		            new Among ( "iz", -1, -1 ),
		            new Among ( "uz", -1, -1 ),
		            new Among ( "\u00FCz", -1, -1 ),
		            new Among ( "\u0131z", -1, -1 )
		        ];
		
		        var a_15 = [
		            new Among ( "siniz", -1, -1 ),
		            new Among ( "sunuz", -1, -1 ),
		            new Among ( "s\u00FCn\u00FCz", -1, -1 ),
		            new Among ( "s\u0131n\u0131z", -1, -1 )
		        ];
		
		        var a_16 = [
		            new Among ( "lar", -1, -1 ),
		            new Among ( "ler", -1, -1 )
		        ];
		
		        var a_17 = [
		            new Among ( "niz", -1, -1 ),
		            new Among ( "nuz", -1, -1 ),
		            new Among ( "n\u00FCz", -1, -1 ),
		            new Among ( "n\u0131z", -1, -1 )
		        ];
		
		        var a_18 = [
		            new Among ( "dir", -1, -1 ),
		            new Among ( "tir", -1, -1 ),
		            new Among ( "dur", -1, -1 ),
		            new Among ( "tur", -1, -1 ),
		            new Among ( "d\u00FCr", -1, -1 ),
		            new Among ( "t\u00FCr", -1, -1 ),
		            new Among ( "d\u0131r", -1, -1 ),
		            new Among ( "t\u0131r", -1, -1 )
		        ];
		
		        var a_19 = [
		            new Among ( "cas\u0131na", -1, -1 ),
		            new Among ( "cesine", -1, -1 )
		        ];
		
		        var a_20 = [
		            new Among ( "di", -1, -1 ),
		            new Among ( "ti", -1, -1 ),
		            new Among ( "dik", -1, -1 ),
		            new Among ( "tik", -1, -1 ),
		            new Among ( "duk", -1, -1 ),
		            new Among ( "tuk", -1, -1 ),
		            new Among ( "d\u00FCk", -1, -1 ),
		            new Among ( "t\u00FCk", -1, -1 ),
		            new Among ( "d\u0131k", -1, -1 ),
		            new Among ( "t\u0131k", -1, -1 ),
		            new Among ( "dim", -1, -1 ),
		            new Among ( "tim", -1, -1 ),
		            new Among ( "dum", -1, -1 ),
		            new Among ( "tum", -1, -1 ),
		            new Among ( "d\u00FCm", -1, -1 ),
		            new Among ( "t\u00FCm", -1, -1 ),
		            new Among ( "d\u0131m", -1, -1 ),
		            new Among ( "t\u0131m", -1, -1 ),
		            new Among ( "din", -1, -1 ),
		            new Among ( "tin", -1, -1 ),
		            new Among ( "dun", -1, -1 ),
		            new Among ( "tun", -1, -1 ),
		            new Among ( "d\u00FCn", -1, -1 ),
		            new Among ( "t\u00FCn", -1, -1 ),
		            new Among ( "d\u0131n", -1, -1 ),
		            new Among ( "t\u0131n", -1, -1 ),
		            new Among ( "du", -1, -1 ),
		            new Among ( "tu", -1, -1 ),
		            new Among ( "d\u00FC", -1, -1 ),
		            new Among ( "t\u00FC", -1, -1 ),
		            new Among ( "d\u0131", -1, -1 ),
		            new Among ( "t\u0131", -1, -1 )
		        ];
		
		        var a_21 = [
		            new Among ( "sa", -1, -1 ),
		            new Among ( "se", -1, -1 ),
		            new Among ( "sak", -1, -1 ),
		            new Among ( "sek", -1, -1 ),
		            new Among ( "sam", -1, -1 ),
		            new Among ( "sem", -1, -1 ),
		            new Among ( "san", -1, -1 ),
		            new Among ( "sen", -1, -1 )
		        ];
		
		        var a_22 = [
		            new Among ( "mi\u015F", -1, -1 ),
		            new Among ( "mu\u015F", -1, -1 ),
		            new Among ( "m\u00FC\u015F", -1, -1 ),
		            new Among ( "m\u0131\u015F", -1, -1 )
		        ];
		
		        var a_23 = [
		            new Among ( "b", -1, 1 ),
		            new Among ( "c", -1, 2 ),
		            new Among ( "d", -1, 3 ),
		            new Among ( "\u011F", -1, 4 )
		        ];
		
		        var g_vowel = [17, 65, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32, 8, 0, 0, 0, 0, 0, 0, 1 ];
		
		        var g_U = [1, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 1 ];
		
		        var g_vowel1 = [1, 64, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ];
		
		        var g_vowel2 = [17, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130 ];
		
		        var g_vowel3 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ];
		
		        var g_vowel4 = [17 ];
		
		        var g_vowel5 = [65 ];
		
		        var g_vowel6 = [65 ];
		
		        var B_continue_stemming_noun_suffixes;
		        var I_strlen;
		
		        var sbp = new SnowballProgram();
		
		        function r_check_vowel_harmony() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            var v_11;
		            v_1 = sbp.limit - sbp.cursor;
		            golab0: while(true)
		            {
		                v_2 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_2;
		                    break golab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_2;
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    return false;
		                }
		                sbp.cursor--;
		            }
		            lab2: do {
		                v_3 = sbp.limit - sbp.cursor;
		                lab3: do {
		                    if (!(sbp.eq_s_b(1, "a")))
		                    {
		                        break lab3;
		                    }
		                    golab4: while(true)
		                    {
		                        v_4 = sbp.limit - sbp.cursor;
		                        lab5: do {
		                            if (!(sbp.in_grouping_b(g_vowel1, 97, 305)))
		                            {
		                                break lab5;
		                            }
		                            sbp.cursor = sbp.limit - v_4;
		                            break golab4;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_4;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab3;
		                        }
		                        sbp.cursor--;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                lab6: do {
		                    if (!(sbp.eq_s_b(1, "e")))
		                    {
		                        break lab6;
		                    }
		                    golab7: while(true)
		                    {
		                        v_5 = sbp.limit - sbp.cursor;
		                        lab8: do {
		                            if (!(sbp.in_grouping_b(g_vowel2, 101, 252)))
		                            {
		                                break lab8;
		                            }
		                            sbp.cursor = sbp.limit - v_5;
		                            break golab7;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_5;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab6;
		                        }
		                        sbp.cursor--;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                lab9: do {
		                    if (!(sbp.eq_s_b(1, "\u0131")))
		                    {
		                        break lab9;
		                    }
		                    golab10: while(true)
		                    {
		                        v_6 = sbp.limit - sbp.cursor;
		                        lab11: do {
		                            if (!(sbp.in_grouping_b(g_vowel3, 97, 305)))
		                            {
		                                break lab11;
		                            }
		                            sbp.cursor = sbp.limit - v_6;
		                            break golab10;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_6;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab9;
		                        }
		                        sbp.cursor--;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                lab12: do {
		                    if (!(sbp.eq_s_b(1, "i")))
		                    {
		                        break lab12;
		                    }
		                    golab13: while(true)
		                    {
		                        v_7 = sbp.limit - sbp.cursor;
		                        lab14: do {
		                            if (!(sbp.in_grouping_b(g_vowel4, 101, 105)))
		                            {
		                                break lab14;
		                            }
		                            sbp.cursor = sbp.limit - v_7;
		                            break golab13;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_7;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab12;
		                        }
		                        sbp.cursor--;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                lab15: do {
		                    if (!(sbp.eq_s_b(1, "o")))
		                    {
		                        break lab15;
		                    }
		                    golab16: while(true)
		                    {
		                        v_8 = sbp.limit - sbp.cursor;
		                        lab17: do {
		                            if (!(sbp.in_grouping_b(g_vowel5, 111, 117)))
		                            {
		                                break lab17;
		                            }
		                            sbp.cursor = sbp.limit - v_8;
		                            break golab16;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_8;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab15;
		                        }
		                        sbp.cursor--;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                lab18: do {
		                    if (!(sbp.eq_s_b(1, "\u00F6")))
		                    {
		                        break lab18;
		                    }
		                    golab19: while(true)
		                    {
		                        v_9 = sbp.limit - sbp.cursor;
		                        lab20: do {
		                            if (!(sbp.in_grouping_b(g_vowel6, 246, 252)))
		                            {
		                                break lab20;
		                            }
		                            sbp.cursor = sbp.limit - v_9;
		                            break golab19;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_9;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab18;
		                        }
		                        sbp.cursor--;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                lab21: do {
		                    if (!(sbp.eq_s_b(1, "u")))
		                    {
		                        break lab21;
		                    }
		                    golab22: while(true)
		                    {
		                        v_10 = sbp.limit - sbp.cursor;
		                        lab23: do {
		                            if (!(sbp.in_grouping_b(g_vowel5, 111, 117)))
		                            {
		                                break lab23;
		                            }
		                            sbp.cursor = sbp.limit - v_10;
		                            break golab22;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_10;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab21;
		                        }
		                        sbp.cursor--;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                if (!(sbp.eq_s_b(1, "\u00FC")))
		                {
		                    return false;
		                }
		                golab24: while(true)
		                {
		                    v_11 = sbp.limit - sbp.cursor;
		                    lab25: do {
		                        if (!(sbp.in_grouping_b(g_vowel6, 246, 252)))
		                        {
		                            break lab25;
		                        }
		                        sbp.cursor = sbp.limit - v_11;
		                        break golab24;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_11;
		                    if (sbp.cursor <= sbp.limit_backward)
		                    {
		                        return false;
		                    }
		                    sbp.cursor--;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_1;
		            return true;
		        }
		
		        function r_mark_suffix_with_optional_n_consonant() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    v_2 = sbp.limit - sbp.cursor;
		                    if (!(sbp.eq_s_b(1, "n")))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_2;
		                    if (sbp.cursor <= sbp.limit_backward)
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor--;
		                    v_3 = sbp.limit - sbp.cursor;
		                    if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_3;
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        v_5 = sbp.limit - sbp.cursor;
		                        if (!(sbp.eq_s_b(1, "n")))
		                        {
		                            break lab2;
		                        }
		                        sbp.cursor = sbp.limit - v_5;
		                        return false;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                }
		                v_6 = sbp.limit - sbp.cursor;
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    return false;
		                }
		                sbp.cursor--;
		                v_7 = sbp.limit - sbp.cursor;
		                if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                {
		                    return false;
		                }
		                sbp.cursor = sbp.limit - v_7;
		                sbp.cursor = sbp.limit - v_6;
		            } while (false);
		            return true;
		        }
		
		        function r_mark_suffix_with_optional_s_consonant() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    v_2 = sbp.limit - sbp.cursor;
		                    if (!(sbp.eq_s_b(1, "s")))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_2;
		                    if (sbp.cursor <= sbp.limit_backward)
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor--;
		                    v_3 = sbp.limit - sbp.cursor;
		                    if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_3;
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        v_5 = sbp.limit - sbp.cursor;
		                        if (!(sbp.eq_s_b(1, "s")))
		                        {
		                            break lab2;
		                        }
		                        sbp.cursor = sbp.limit - v_5;
		                        return false;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                }
		                v_6 = sbp.limit - sbp.cursor;
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    return false;
		                }
		                sbp.cursor--;
		                v_7 = sbp.limit - sbp.cursor;
		                if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                {
		                    return false;
		                }
		                sbp.cursor = sbp.limit - v_7;
		                sbp.cursor = sbp.limit - v_6;
		            } while (false);
		            return true;
		        }
		
		        function r_mark_suffix_with_optional_y_consonant() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    v_2 = sbp.limit - sbp.cursor;
		                    if (!(sbp.eq_s_b(1, "y")))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_2;
		                    if (sbp.cursor <= sbp.limit_backward)
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor--;
		                    v_3 = sbp.limit - sbp.cursor;
		                    if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_3;
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        v_5 = sbp.limit - sbp.cursor;
		                        if (!(sbp.eq_s_b(1, "y")))
		                        {
		                            break lab2;
		                        }
		                        sbp.cursor = sbp.limit - v_5;
		                        return false;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                }
		                v_6 = sbp.limit - sbp.cursor;
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    return false;
		                }
		                sbp.cursor--;
		                v_7 = sbp.limit - sbp.cursor;
		                if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                {
		                    return false;
		                }
		                sbp.cursor = sbp.limit - v_7;
		                sbp.cursor = sbp.limit - v_6;
		            } while (false);
		            return true;
		        }
		
		        function r_mark_suffix_with_optional_U_vowel() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    v_2 = sbp.limit - sbp.cursor;
		                    if (!(sbp.in_grouping_b(g_U, 105, 305)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_2;
		                    if (sbp.cursor <= sbp.limit_backward)
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor--;
		                    v_3 = sbp.limit - sbp.cursor;
		                    if (!(sbp.out_grouping_b(g_vowel, 97, 305)))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = sbp.limit - v_3;
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                {
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        v_5 = sbp.limit - sbp.cursor;
		                        if (!(sbp.in_grouping_b(g_U, 105, 305)))
		                        {
		                            break lab2;
		                        }
		                        sbp.cursor = sbp.limit - v_5;
		                        return false;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                }
		                v_6 = sbp.limit - sbp.cursor;
		                if (sbp.cursor <= sbp.limit_backward)
		                {
		                    return false;
		                }
		                sbp.cursor--;
		                v_7 = sbp.limit - sbp.cursor;
		                if (!(sbp.out_grouping_b(g_vowel, 97, 305)))
		                {
		                    return false;
		                }
		                sbp.cursor = sbp.limit - v_7;
		                sbp.cursor = sbp.limit - v_6;
		            } while (false);
		            return true;
		        }
		
		        function r_mark_possessives() {
		            if (sbp.find_among_b(a_0, 10) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_U_vowel())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_sU() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (!(sbp.in_grouping_b(g_U, 105, 305)))
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_s_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_lArI() {
		            if (sbp.find_among_b(a_1, 2) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_yU() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (!(sbp.in_grouping_b(g_U, 105, 305)))
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_nU() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_2, 4) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_nUn() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_3, 4) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_n_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_yA() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_4, 2) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_nA() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_5, 2) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_DA() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_6, 4) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_ndA() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_7, 2) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_DAn() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_8, 4) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_ndAn() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_9, 2) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_ylA() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_10, 2) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_ki() {
		            if (!(sbp.eq_s_b(2, "ki")))
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_ncA() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_11, 2) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_n_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_yUm() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_12, 4) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_sUn() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_13, 4) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_yUz() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_14, 4) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_sUnUz() {
		            if (sbp.find_among_b(a_15, 4) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_lAr() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_16, 2) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_nUz() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_17, 4) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_DUr() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_18, 8) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_cAsInA() {
		            if (sbp.find_among_b(a_19, 2) == 0)
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_yDU() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_20, 32) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_ysA() {
		            if (sbp.find_among_b(a_21, 8) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_ymUs_() {
		            if (!r_check_vowel_harmony())
		            {
		                return false;
		            }
		            if (sbp.find_among_b(a_22, 4) == 0)
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_mark_yken() {
		            if (!(sbp.eq_s_b(3, "ken")))
		            {
		                return false;
		            }
		            if (!r_mark_suffix_with_optional_y_consonant())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        function r_stem_nominal_verb_suffixes() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            sbp.ket = sbp.cursor;
		            B_continue_stemming_noun_suffixes = true;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    lab2: do {
		                        v_2 = sbp.limit - sbp.cursor;
		                        lab3: do {
		                            if (!r_mark_ymUs_())
		                            {
		                                break lab3;
		                            }
		                            break lab2;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_2;
		                        lab4: do {
		                            if (!r_mark_yDU())
		                            {
		                                break lab4;
		                            }
		                            break lab2;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_2;
		                        lab5: do {
		                            if (!r_mark_ysA())
		                            {
		                                break lab5;
		                            }
		                            break lab2;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_2;
		                        if (!r_mark_yken())
		                        {
		                            break lab1;
		                        }
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab6: do {
		                    if (!r_mark_cAsInA())
		                    {
		                        break lab6;
		                    }
		                    lab7: do {
		                        v_3 = sbp.limit - sbp.cursor;
		                        lab8: do {
		                            if (!r_mark_sUnUz())
		                            {
		                                break lab8;
		                            }
		                            break lab7;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                        lab9: do {
		                            if (!r_mark_lAr())
		                            {
		                                break lab9;
		                            }
		                            break lab7;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                        lab10: do {
		                            if (!r_mark_yUm())
		                            {
		                                break lab10;
		                            }
		                            break lab7;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                        lab11: do {
		                            if (!r_mark_sUn())
		                            {
		                                break lab11;
		                            }
		                            break lab7;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                        lab12: do {
		                            if (!r_mark_yUz())
		                            {
		                                break lab12;
		                            }
		                            break lab7;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_3;
		                    } while (false);
		                    if (!r_mark_ymUs_())
		                    {
		                        break lab6;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab13: do {
		                    if (!r_mark_lAr())
		                    {
		                        break lab13;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_4 = sbp.limit - sbp.cursor;
		                    lab14: do {
		                        sbp.ket = sbp.cursor;
		                        lab15: do {
		                            v_5 = sbp.limit - sbp.cursor;
		                            lab16: do {
		                                if (!r_mark_DUr())
		                                {
		                                    break lab16;
		                                }
		                                break lab15;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_5;
		                            lab17: do {
		                                if (!r_mark_yDU())
		                                {
		                                    break lab17;
		                                }
		                                break lab15;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_5;
		                            lab18: do {
		                                if (!r_mark_ysA())
		                                {
		                                    break lab18;
		                                }
		                                break lab15;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_5;
		                            if (!r_mark_ymUs_())
		                            {
		                                sbp.cursor = sbp.limit - v_4;
		                                break lab14;
		                            }
		                        } while (false);
		                    } while (false);
		                    B_continue_stemming_noun_suffixes = false;
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab19: do {
		                    if (!r_mark_nUz())
		                    {
		                        break lab19;
		                    }
		                    lab20: do {
		                        v_6 = sbp.limit - sbp.cursor;
		                        lab21: do {
		                            if (!r_mark_yDU())
		                            {
		                                break lab21;
		                            }
		                            break lab20;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_6;
		                        if (!r_mark_ysA())
		                        {
		                            break lab19;
		                        }
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab22: do {
		                    lab23: do {
		                        v_7 = sbp.limit - sbp.cursor;
		                        lab24: do {
		                            if (!r_mark_sUnUz())
		                            {
		                                break lab24;
		                            }
		                            break lab23;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_7;
		                        lab25: do {
		                            if (!r_mark_yUz())
		                            {
		                                break lab25;
		                            }
		                            break lab23;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_7;
		                        lab26: do {
		                            if (!r_mark_sUn())
		                            {
		                                break lab26;
		                            }
		                            break lab23;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_7;
		                        if (!r_mark_yUm())
		                        {
		                            break lab22;
		                        }
		                    } while (false);
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_8 = sbp.limit - sbp.cursor;
		                    lab27: do {
		                        sbp.ket = sbp.cursor;
		                        if (!r_mark_ymUs_())
		                        {
		                            sbp.cursor = sbp.limit - v_8;
		                            break lab27;
		                        }
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                if (!r_mark_DUr())
		                {
		                    return false;
		                }
		                sbp.bra = sbp.cursor;
		                sbp.slice_del();
		                v_9 = sbp.limit - sbp.cursor;
		                lab28: do {
		                    sbp.ket = sbp.cursor;
		                    lab29: do {
		                        v_10 = sbp.limit - sbp.cursor;
		                        lab30: do {
		                            if (!r_mark_sUnUz())
		                            {
		                                break lab30;
		                            }
		                            break lab29;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_10;
		                        lab31: do {
		                            if (!r_mark_lAr())
		                            {
		                                break lab31;
		                            }
		                            break lab29;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_10;
		                        lab32: do {
		                            if (!r_mark_yUm())
		                            {
		                                break lab32;
		                            }
		                            break lab29;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_10;
		                        lab33: do {
		                            if (!r_mark_sUn())
		                            {
		                                break lab33;
		                            }
		                            break lab29;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_10;
		                        lab34: do {
		                            if (!r_mark_yUz())
		                            {
		                                break lab34;
		                            }
		                            break lab29;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_10;
		                    } while (false);
		                    if (!r_mark_ymUs_())
		                    {
		                        sbp.cursor = sbp.limit - v_9;
		                        break lab28;
		                    }
		                } while (false);
		            } while (false);
		            sbp.bra = sbp.cursor;
		            sbp.slice_del();
		            return true;
		        }
		
		        function r_stem_suffix_chain_before_ki() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            var v_11;
		            sbp.ket = sbp.cursor;
		            if (!r_mark_ki())
		            {
		                return false;
		            }
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    if (!r_mark_DA())
		                    {
		                        break lab1;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_2 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        sbp.ket = sbp.cursor;
		                        lab3: do {
		                            v_3 = sbp.limit - sbp.cursor;
		                            lab4: do {
		                                if (!r_mark_lAr())
		                                {
		                                    break lab4;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                v_4 = sbp.limit - sbp.cursor;
		                                lab5: do {
		                                    if (!r_stem_suffix_chain_before_ki())
		                                    {
		                                        sbp.cursor = sbp.limit - v_4;
		                                        break lab5;
		                                    }
		                                } while (false);
		                                break lab3;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_3;
		                            if (!r_mark_possessives())
		                            {
		                                sbp.cursor = sbp.limit - v_2;
		                                break lab2;
		                            }
		                            sbp.bra = sbp.cursor;
		                            sbp.slice_del();
		                            v_5 = sbp.limit - sbp.cursor;
		                            lab6: do {
		                                sbp.ket = sbp.cursor;
		                                if (!r_mark_lAr())
		                                {
		                                    sbp.cursor = sbp.limit - v_5;
		                                    break lab6;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                if (!r_stem_suffix_chain_before_ki())
		                                {
		                                    sbp.cursor = sbp.limit - v_5;
		                                    break lab6;
		                                }
		                            } while (false);
		                        } while (false);
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab7: do {
		                    if (!r_mark_nUn())
		                    {
		                        break lab7;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_6 = sbp.limit - sbp.cursor;
		                    lab8: do {
		                        sbp.ket = sbp.cursor;
		                        lab9: do {
		                            v_7 = sbp.limit - sbp.cursor;
		                            lab10: do {
		                                if (!r_mark_lArI())
		                                {
		                                    break lab10;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                break lab9;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_7;
		                            lab11: do {
		                                sbp.ket = sbp.cursor;
		                                lab12: do {
		                                    v_8 = sbp.limit - sbp.cursor;
		                                    lab13: do {
		                                        if (!r_mark_possessives())
		                                        {
		                                            break lab13;
		                                        }
		                                        break lab12;
		                                    } while (false);
		                                    sbp.cursor = sbp.limit - v_8;
		                                    if (!r_mark_sU())
		                                    {
		                                        break lab11;
		                                    }
		                                } while (false);
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                v_9 = sbp.limit - sbp.cursor;
		                                lab14: do {
		                                    sbp.ket = sbp.cursor;
		                                    if (!r_mark_lAr())
		                                    {
		                                        sbp.cursor = sbp.limit - v_9;
		                                        break lab14;
		                                    }
		                                    sbp.bra = sbp.cursor;
		                                    sbp.slice_del();
		                                    if (!r_stem_suffix_chain_before_ki())
		                                    {
		                                        sbp.cursor = sbp.limit - v_9;
		                                        break lab14;
		                                    }
		                                } while (false);
		                                break lab9;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_7;
		                            if (!r_stem_suffix_chain_before_ki())
		                            {
		                                sbp.cursor = sbp.limit - v_6;
		                                break lab8;
		                            }
		                        } while (false);
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                if (!r_mark_ndA())
		                {
		                    return false;
		                }
		                lab15: do {
		                    v_10 = sbp.limit - sbp.cursor;
		                    lab16: do {
		                        if (!r_mark_lArI())
		                        {
		                            break lab16;
		                        }
		                        sbp.bra = sbp.cursor;
		                        sbp.slice_del();
		                        break lab15;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_10;
		                    lab17: do {
		                        if (!r_mark_sU())
		                        {
		                            break lab17;
		                        }
		                        sbp.bra = sbp.cursor;
		                        sbp.slice_del();
		                        v_11 = sbp.limit - sbp.cursor;
		                        lab18: do {
		                            sbp.ket = sbp.cursor;
		                            if (!r_mark_lAr())
		                            {
		                                sbp.cursor = sbp.limit - v_11;
		                                break lab18;
		                            }
		                            sbp.bra = sbp.cursor;
		                            sbp.slice_del();
		                            if (!r_stem_suffix_chain_before_ki())
		                            {
		                                sbp.cursor = sbp.limit - v_11;
		                                break lab18;
		                            }
		                        } while (false);
		                        break lab15;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_10;
		                    if (!r_stem_suffix_chain_before_ki())
		                    {
		                        return false;
		                    }
		                } while (false);
		            } while (false);
		            return true;
		        }
		
		        function r_stem_noun_suffixes() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            var v_11;
		            var v_12;
		            var v_13;
		            var v_14;
		            var v_15;
		            var v_16;
		            var v_17;
		            var v_18;
		            var v_19;
		            var v_20;
		            var v_21;
		            var v_22;
		            var v_23;
		            var v_24;
		            var v_25;
		            var v_26;
		            var v_27;
		            lab0: do {
		                v_1 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    sbp.ket = sbp.cursor;
		                    if (!r_mark_lAr())
		                    {
		                        break lab1;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_2 = sbp.limit - sbp.cursor;
		                    lab2: do {
		                        if (!r_stem_suffix_chain_before_ki())
		                        {
		                            sbp.cursor = sbp.limit - v_2;
		                            break lab2;
		                        }
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab3: do {
		                    sbp.ket = sbp.cursor;
		                    if (!r_mark_ncA())
		                    {
		                        break lab3;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_3 = sbp.limit - sbp.cursor;
		                    lab4: do {
		                        lab5: do {
		                            v_4 = sbp.limit - sbp.cursor;
		                            lab6: do {
		                                sbp.ket = sbp.cursor;
		                                if (!r_mark_lArI())
		                                {
		                                    break lab6;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                break lab5;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_4;
		                            lab7: do {
		                                sbp.ket = sbp.cursor;
		                                lab8: do {
		                                    v_5 = sbp.limit - sbp.cursor;
		                                    lab9: do {
		                                        if (!r_mark_possessives())
		                                        {
		                                            break lab9;
		                                        }
		                                        break lab8;
		                                    } while (false);
		                                    sbp.cursor = sbp.limit - v_5;
		                                    if (!r_mark_sU())
		                                    {
		                                        break lab7;
		                                    }
		                                } while (false);
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                v_6 = sbp.limit - sbp.cursor;
		                                lab10: do {
		                                    sbp.ket = sbp.cursor;
		                                    if (!r_mark_lAr())
		                                    {
		                                        sbp.cursor = sbp.limit - v_6;
		                                        break lab10;
		                                    }
		                                    sbp.bra = sbp.cursor;
		                                    sbp.slice_del();
		                                    if (!r_stem_suffix_chain_before_ki())
		                                    {
		                                        sbp.cursor = sbp.limit - v_6;
		                                        break lab10;
		                                    }
		                                } while (false);
		                                break lab5;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_4;
		                            sbp.ket = sbp.cursor;
		                            if (!r_mark_lAr())
		                            {
		                                sbp.cursor = sbp.limit - v_3;
		                                break lab4;
		                            }
		                            sbp.bra = sbp.cursor;
		                            sbp.slice_del();
		                            if (!r_stem_suffix_chain_before_ki())
		                            {
		                                sbp.cursor = sbp.limit - v_3;
		                                break lab4;
		                            }
		                        } while (false);
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab11: do {
		                    sbp.ket = sbp.cursor;
		                    lab12: do {
		                        v_7 = sbp.limit - sbp.cursor;
		                        lab13: do {
		                            if (!r_mark_ndA())
		                            {
		                                break lab13;
		                            }
		                            break lab12;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_7;
		                        if (!r_mark_nA())
		                        {
		                            break lab11;
		                        }
		                    } while (false);
		                    lab14: do {
		                        v_8 = sbp.limit - sbp.cursor;
		                        lab15: do {
		                            if (!r_mark_lArI())
		                            {
		                                break lab15;
		                            }
		                            sbp.bra = sbp.cursor;
		                            sbp.slice_del();
		                            break lab14;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_8;
		                        lab16: do {
		                            if (!r_mark_sU())
		                            {
		                                break lab16;
		                            }
		                            sbp.bra = sbp.cursor;
		                            sbp.slice_del();
		                            v_9 = sbp.limit - sbp.cursor;
		                            lab17: do {
		                                sbp.ket = sbp.cursor;
		                                if (!r_mark_lAr())
		                                {
		                                    sbp.cursor = sbp.limit - v_9;
		                                    break lab17;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                if (!r_stem_suffix_chain_before_ki())
		                                {
		                                    sbp.cursor = sbp.limit - v_9;
		                                    break lab17;
		                                }
		                            } while (false);
		                            break lab14;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_8;
		                        if (!r_stem_suffix_chain_before_ki())
		                        {
		                            break lab11;
		                        }
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab18: do {
		                    sbp.ket = sbp.cursor;
		                    lab19: do {
		                        v_10 = sbp.limit - sbp.cursor;
		                        lab20: do {
		                            if (!r_mark_ndAn())
		                            {
		                                break lab20;
		                            }
		                            break lab19;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_10;
		                        if (!r_mark_nU())
		                        {
		                            break lab18;
		                        }
		                    } while (false);
		                    lab21: do {
		                        v_11 = sbp.limit - sbp.cursor;
		                        lab22: do {
		                            if (!r_mark_sU())
		                            {
		                                break lab22;
		                            }
		                            sbp.bra = sbp.cursor;
		                            sbp.slice_del();
		                            v_12 = sbp.limit - sbp.cursor;
		                            lab23: do {
		                                sbp.ket = sbp.cursor;
		                                if (!r_mark_lAr())
		                                {
		                                    sbp.cursor = sbp.limit - v_12;
		                                    break lab23;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                if (!r_stem_suffix_chain_before_ki())
		                                {
		                                    sbp.cursor = sbp.limit - v_12;
		                                    break lab23;
		                                }
		                            } while (false);
		                            break lab21;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_11;
		                        if (!r_mark_lArI())
		                        {
		                            break lab18;
		                        }
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab24: do {
		                    sbp.ket = sbp.cursor;
		                    if (!r_mark_DAn())
		                    {
		                        break lab24;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_13 = sbp.limit - sbp.cursor;
		                    lab25: do {
		                        sbp.ket = sbp.cursor;
		                        lab26: do {
		                            v_14 = sbp.limit - sbp.cursor;
		                            lab27: do {
		                                if (!r_mark_possessives())
		                                {
		                                    break lab27;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                v_15 = sbp.limit - sbp.cursor;
		                                lab28: do {
		                                    sbp.ket = sbp.cursor;
		                                    if (!r_mark_lAr())
		                                    {
		                                        sbp.cursor = sbp.limit - v_15;
		                                        break lab28;
		                                    }
		                                    sbp.bra = sbp.cursor;
		                                    sbp.slice_del();
		                                    if (!r_stem_suffix_chain_before_ki())
		                                    {
		                                        sbp.cursor = sbp.limit - v_15;
		                                        break lab28;
		                                    }
		                                } while (false);
		                                break lab26;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_14;
		                            lab29: do {
		                                if (!r_mark_lAr())
		                                {
		                                    break lab29;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                v_16 = sbp.limit - sbp.cursor;
		                                lab30: do {
		                                    if (!r_stem_suffix_chain_before_ki())
		                                    {
		                                        sbp.cursor = sbp.limit - v_16;
		                                        break lab30;
		                                    }
		                                } while (false);
		                                break lab26;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_14;
		                            if (!r_stem_suffix_chain_before_ki())
		                            {
		                                sbp.cursor = sbp.limit - v_13;
		                                break lab25;
		                            }
		                        } while (false);
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab31: do {
		                    sbp.ket = sbp.cursor;
		                    lab32: do {
		                        v_17 = sbp.limit - sbp.cursor;
		                        lab33: do {
		                            if (!r_mark_nUn())
		                            {
		                                break lab33;
		                            }
		                            break lab32;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_17;
		                        if (!r_mark_ylA())
		                        {
		                            break lab31;
		                        }
		                    } while (false);
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_18 = sbp.limit - sbp.cursor;
		                    lab34: do {
		                        lab35: do {
		                            v_19 = sbp.limit - sbp.cursor;
		                            lab36: do {
		                                sbp.ket = sbp.cursor;
		                                if (!r_mark_lAr())
		                                {
		                                    break lab36;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                if (!r_stem_suffix_chain_before_ki())
		                                {
		                                    break lab36;
		                                }
		                                break lab35;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_19;
		                            lab37: do {
		                                sbp.ket = sbp.cursor;
		                                lab38: do {
		                                    v_20 = sbp.limit - sbp.cursor;
		                                    lab39: do {
		                                        if (!r_mark_possessives())
		                                        {
		                                            break lab39;
		                                        }
		                                        break lab38;
		                                    } while (false);
		                                    sbp.cursor = sbp.limit - v_20;
		                                    if (!r_mark_sU())
		                                    {
		                                        break lab37;
		                                    }
		                                } while (false);
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                v_21 = sbp.limit - sbp.cursor;
		                                lab40: do {
		                                    sbp.ket = sbp.cursor;
		                                    if (!r_mark_lAr())
		                                    {
		                                        sbp.cursor = sbp.limit - v_21;
		                                        break lab40;
		                                    }
		                                    sbp.bra = sbp.cursor;
		                                    sbp.slice_del();
		                                    if (!r_stem_suffix_chain_before_ki())
		                                    {
		                                        sbp.cursor = sbp.limit - v_21;
		                                        break lab40;
		                                    }
		                                } while (false);
		                                break lab35;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_19;
		                            if (!r_stem_suffix_chain_before_ki())
		                            {
		                                sbp.cursor = sbp.limit - v_18;
		                                break lab34;
		                            }
		                        } while (false);
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab41: do {
		                    sbp.ket = sbp.cursor;
		                    if (!r_mark_lArI())
		                    {
		                        break lab41;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab42: do {
		                    if (!r_stem_suffix_chain_before_ki())
		                    {
		                        break lab42;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                lab43: do {
		                    sbp.ket = sbp.cursor;
		                    lab44: do {
		                        v_22 = sbp.limit - sbp.cursor;
		                        lab45: do {
		                            if (!r_mark_DA())
		                            {
		                                break lab45;
		                            }
		                            break lab44;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_22;
		                        lab46: do {
		                            if (!r_mark_yU())
		                            {
		                                break lab46;
		                            }
		                            break lab44;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_22;
		                        if (!r_mark_yA())
		                        {
		                            break lab43;
		                        }
		                    } while (false);
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    v_23 = sbp.limit - sbp.cursor;
		                    lab47: do {
		                        sbp.ket = sbp.cursor;
		                        lab48: do {
		                            v_24 = sbp.limit - sbp.cursor;
		                            lab49: do {
		                                if (!r_mark_possessives())
		                                {
		                                    break lab49;
		                                }
		                                sbp.bra = sbp.cursor;
		                                sbp.slice_del();
		                                v_25 = sbp.limit - sbp.cursor;
		                                lab50: do {
		                                    sbp.ket = sbp.cursor;
		                                    if (!r_mark_lAr())
		                                    {
		                                        sbp.cursor = sbp.limit - v_25;
		                                        break lab50;
		                                    }
		                                } while (false);
		                                break lab48;
		                            } while (false);
		                            sbp.cursor = sbp.limit - v_24;
		                            if (!r_mark_lAr())
		                            {
		                                sbp.cursor = sbp.limit - v_23;
		                                break lab47;
		                            }
		                        } while (false);
		                        sbp.bra = sbp.cursor;
		                        sbp.slice_del();
		                        sbp.ket = sbp.cursor;
		                        if (!r_stem_suffix_chain_before_ki())
		                        {
		                            sbp.cursor = sbp.limit - v_23;
		                            break lab47;
		                        }
		                    } while (false);
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_1;
		                sbp.ket = sbp.cursor;
		                lab51: do {
		                    v_26 = sbp.limit - sbp.cursor;
		                    lab52: do {
		                        if (!r_mark_possessives())
		                        {
		                            break lab52;
		                        }
		                        break lab51;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_26;
		                    if (!r_mark_sU())
		                    {
		                        return false;
		                    }
		                } while (false);
		                sbp.bra = sbp.cursor;
		                sbp.slice_del();
		                v_27 = sbp.limit - sbp.cursor;
		                lab53: do {
		                    sbp.ket = sbp.cursor;
		                    if (!r_mark_lAr())
		                    {
		                        sbp.cursor = sbp.limit - v_27;
		                        break lab53;
		                    }
		                    sbp.bra = sbp.cursor;
		                    sbp.slice_del();
		                    if (!r_stem_suffix_chain_before_ki())
		                    {
		                        sbp.cursor = sbp.limit - v_27;
		                        break lab53;
		                    }
		                } while (false);
		            } while (false);
		            return true;
		        }
		
		        function r_post_process_last_consonants() {
		            var among_var;
		            sbp.ket = sbp.cursor;
		            among_var = sbp.find_among_b(a_23, 4);
		            if (among_var == 0)
		            {
		                return false;
		            }
		            sbp.bra = sbp.cursor;
		            switch(among_var) {
		                case 0:
		                    return false;
		                case 1:
		                    sbp.slice_from("p");
		                    break;
		                case 2:
		                    sbp.slice_from("\u00E7");
		                    break;
		                case 3:
		                    sbp.slice_from("t");
		                    break;
		                case 4:
		                    sbp.slice_from("k");
		                    break;
		            }
		            return true;
		        }
		
		        function r_append_U_to_stems_ending_with_d_or_g() {
		            var v_1;
		            var v_2;
		            var v_3;
		            var v_4;
		            var v_5;
		            var v_6;
		            var v_7;
		            var v_8;
		            var v_9;
		            var v_10;
		            var v_11;
		            var v_12;
		            var v_13;
		            var v_14;
		            var v_15;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                v_2 = sbp.limit - sbp.cursor;
		                lab1: do {
		                    if (!(sbp.eq_s_b(1, "d")))
		                    {
		                        break lab1;
		                    }
		                    break lab0;
		                } while (false);
		                sbp.cursor = sbp.limit - v_2;
		                if (!(sbp.eq_s_b(1, "g")))
		                {
		                    return false;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_1;
		            lab2: do {
		                v_3 = sbp.limit - sbp.cursor;
		                lab3: do {
		                    v_4 = sbp.limit - sbp.cursor;
		                    golab4: while(true)
		                    {
		                        v_5 = sbp.limit - sbp.cursor;
		                        lab5: do {
		                            if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                            {
		                                break lab5;
		                            }
		                            sbp.cursor = sbp.limit - v_5;
		                            break golab4;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_5;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab3;
		                        }
		                        sbp.cursor--;
		                    }
		                    lab6: do {
		                        v_6 = sbp.limit - sbp.cursor;
		                        lab7: do {
		                            if (!(sbp.eq_s_b(1, "a")))
		                            {
		                                break lab7;
		                            }
		                            break lab6;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_6;
		                        if (!(sbp.eq_s_b(1, "\u0131")))
		                        {
		                            break lab3;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_4;
		                    {
		                        var c = sbp.cursor;
		                        sbp.insert(sbp.cursor, sbp.cursor, "\u0131");
		                        sbp.cursor = c;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                lab8: do {
		                    v_7 = sbp.limit - sbp.cursor;
		                    golab9: while(true)
		                    {
		                        v_8 = sbp.limit - sbp.cursor;
		                        lab10: do {
		                            if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                            {
		                                break lab10;
		                            }
		                            sbp.cursor = sbp.limit - v_8;
		                            break golab9;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_8;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab8;
		                        }
		                        sbp.cursor--;
		                    }
		                    lab11: do {
		                        v_9 = sbp.limit - sbp.cursor;
		                        lab12: do {
		                            if (!(sbp.eq_s_b(1, "e")))
		                            {
		                                break lab12;
		                            }
		                            break lab11;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_9;
		                        if (!(sbp.eq_s_b(1, "i")))
		                        {
		                            break lab8;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_7;
		                    {
		                        var c = sbp.cursor;
		                        sbp.insert(sbp.cursor, sbp.cursor, "i");
		                        sbp.cursor = c;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                lab13: do {
		                    v_10 = sbp.limit - sbp.cursor;
		                    golab14: while(true)
		                    {
		                        v_11 = sbp.limit - sbp.cursor;
		                        lab15: do {
		                            if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                            {
		                                break lab15;
		                            }
		                            sbp.cursor = sbp.limit - v_11;
		                            break golab14;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_11;
		                        if (sbp.cursor <= sbp.limit_backward)
		                        {
		                            break lab13;
		                        }
		                        sbp.cursor--;
		                    }
		                    lab16: do {
		                        v_12 = sbp.limit - sbp.cursor;
		                        lab17: do {
		                            if (!(sbp.eq_s_b(1, "o")))
		                            {
		                                break lab17;
		                            }
		                            break lab16;
		                        } while (false);
		                        sbp.cursor = sbp.limit - v_12;
		                        if (!(sbp.eq_s_b(1, "u")))
		                        {
		                            break lab13;
		                        }
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_10;
		                    {
		                        var c = sbp.cursor;
		                        sbp.insert(sbp.cursor, sbp.cursor, "u");
		                        sbp.cursor = c;
		                    }
		                    break lab2;
		                } while (false);
		                sbp.cursor = sbp.limit - v_3;
		                v_13 = sbp.limit - sbp.cursor;
		                golab18: while(true)
		                {
		                    v_14 = sbp.limit - sbp.cursor;
		                    lab19: do {
		                        if (!(sbp.in_grouping_b(g_vowel, 97, 305)))
		                        {
		                            break lab19;
		                        }
		                        sbp.cursor = sbp.limit - v_14;
		                        break golab18;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_14;
		                    if (sbp.cursor <= sbp.limit_backward)
		                    {
		                        return false;
		                    }
		                    sbp.cursor--;
		                }
		                lab20: do {
		                    v_15 = sbp.limit - sbp.cursor;
		                    lab21: do {
		                        if (!(sbp.eq_s_b(1, "\u00F6")))
		                        {
		                            break lab21;
		                        }
		                        break lab20;
		                    } while (false);
		                    sbp.cursor = sbp.limit - v_15;
		                    if (!(sbp.eq_s_b(1, "\u00FC")))
		                    {
		                        return false;
		                    }
		                } while (false);
		                sbp.cursor = sbp.limit - v_13;
		                {
		                    var c = sbp.cursor;
		                    sbp.insert(sbp.cursor, sbp.cursor, "\u00FC");
		                    sbp.cursor = c;
		                }
		            } while (false);
		            return true;
		        }
		
		        function r_more_than_one_syllable_word() {
		            var v_1;
		            var v_3;
		            v_1 = sbp.cursor;
		            {
		                var v_2 = 2;
		                replab0: while(true)
		                {
		                    v_3 = sbp.cursor;
		                    lab1: do {
		                        golab2: while(true)
		                        {
		                            lab3: do {
		                                if (!(sbp.in_grouping(g_vowel, 97, 305)))
		                                {
		                                    break lab3;
		                                }
		                                break golab2;
		                            } while (false);
		                            if (sbp.cursor >= sbp.limit)
		                            {
		                                break lab1;
		                            }
		                            sbp.cursor++;
		                        }
		                        v_2--;
		                        continue replab0;
		                    } while (false);
		                    sbp.cursor = v_3;
		                    break replab0;
		                }
		                if (v_2 > 0)
		                {
		                    return false;
		                }
		            }
		            sbp.cursor = v_1;
		            return true;
		        }
		
		        function r_is_reserved_word() {
		            var v_1;
		            var v_2;
		            var v_4;
		            lab0: do {
		                v_1 = sbp.cursor;
		                lab1: do {
		                    v_2 = sbp.cursor;
		                    golab2: while(true)
		                    {
		                        lab3: do {
		                            if (!(sbp.eq_s(2, "ad")))
		                            {
		                                break lab3;
		                            }
		                            break golab2;
		                        } while (false);
		                        if (sbp.cursor >= sbp.limit)
		                        {
		                            break lab1;
		                        }
		                        sbp.cursor++;
		                    }
		                    I_strlen = 2;
		                    if (!(I_strlen == sbp.limit))
		                    {
		                        break lab1;
		                    }
		                    sbp.cursor = v_2;
		                    break lab0;
		                } while (false);
		                sbp.cursor = v_1;
		                v_4 = sbp.cursor;
		                golab4: while(true)
		                {
		                    lab5: do {
		                        if (!(sbp.eq_s(5, "soyad")))
		                        {
		                            break lab5;
		                        }
		                        break golab4;
		                    } while (false);
		                    if (sbp.cursor >= sbp.limit)
		                    {
		                        return false;
		                    }
		                    sbp.cursor++;
		                }
		                I_strlen = 5;
		                if (!(I_strlen == sbp.limit))
		                {
		                    return false;
		                }
		                sbp.cursor = v_4;
		            } while (false);
		            return true;
		        }
		
		        function r_postlude() {
		            var v_1;
		            var v_2;
		            var v_3;
		            {
		                v_1 = sbp.cursor;
		                lab0: do {
		                    if (!r_is_reserved_word())
		                    {
		                        break lab0;
		                    }
		                    return false;
		                } while (false);
		                sbp.cursor = v_1;
		            }
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_append_U_to_stems_ending_with_d_or_g())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            v_3 = sbp.limit - sbp.cursor;
		            lab2: do {
		                if (!r_post_process_last_consonants())
		                {
		                    break lab2;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_3;
		            sbp.cursor = sbp.limit_backward;            return true;
		        }
		
		        this.stem = function() {
		            var v_1;
		            var v_2;
		            if (!r_more_than_one_syllable_word())
		            {
		                return false;
		            }
		            sbp.limit_backward = sbp.cursor; sbp.cursor = sbp.limit;
		            v_1 = sbp.limit - sbp.cursor;
		            lab0: do {
		                if (!r_stem_nominal_verb_suffixes())
		                {
		                    break lab0;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_1;
		            if (!(B_continue_stemming_noun_suffixes))
		            {
		                return false;
		            }
		            v_2 = sbp.limit - sbp.cursor;
		            lab1: do {
		                if (!r_stem_noun_suffixes())
		                {
		                    break lab1;
		                }
		            } while (false);
		            sbp.cursor = sbp.limit - v_2;
		            sbp.cursor = sbp.limit_backward;            if (!r_postlude())
		            {
		                return false;
		            }
		            return true;
		        }
		
		        this.setCurrent = function(word) {
		                sbp.setCurrent(word);
		        };
		
		        this.getCurrent = function() {
		                return sbp.getCurrent();
		        };
		}
	}
	var stemName = lng.toLowerCase() + "Stemmer";
	return new stemFactory[stemName]();
}
