package org.tartarus.snowball;

import java.lang.reflect.Method;

public class Among {

	private static char[] toCharArray(String s) {
		int sLength = s.length();
		char[] charArr = new char[sLength];
		for (int i = 0; i < sLength; i++)
			charArr[i] = s.charAt(i);
		return charArr;
	}

	// :es6:
	// remove this ctor
	public Among(String s, int substring_i, int result) {
		this.s = toCharArray(s);
		this.substring_i = substring_i;
		this.result = result;
		this.method = null;
	}
	// :end:

	public Among(String s, int substring_i, int result, String methodname, Class obj) {
		this.s = toCharArray(s);
		this.substring_i = substring_i;
		this.result = result;
		// :es6:
		// method = methodname ? obj[methodname] : null;
		// methodobject = obj;
		try {
			this.method = obj.getDeclaredMethod(methodname);
		} catch (NoSuchMethodException e) {
			throw new RuntimeException(e);
		}
		// :end:
	}

	public final char[] s; /* search string */
	public final int substring_i; /* index to longest matching substring */
	public final int result; /* result of the lookup */
	public final Method method; /* method to use if substring matches */
	// :es6:
	public Object methodobject; /* object to invoke method on */
	// :end:
};
