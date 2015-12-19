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

	public Among(String s, int substring_i, int result, String methodname, SnowballProgram methodobject) {
		this.s_size = s.length();
		this.s = toCharArray(s);
		this.substring_i = substring_i;
		this.result = result;
		this.methodobject = methodobject;
		// :es6:
		// help: grep -r '"[^"]\+", methodObject)'
		// method = methodname ? methodobject[methodname] : null;
		if (methodname.length() == 0) {
			this.method = null;
		} else {
			try {
				this.method = methodobject.getClass().getDeclaredMethod(methodname, new Class[0]);
				method.setAccessible(true);
			} catch (NoSuchMethodException e) {
				throw new RuntimeException(e);
			}
		}
		// :end:
	}

	public final int s_size; /* search string */
	public final char[] s; /* search string */
	public final int substring_i; /* index to longest matching substring */
	public final int result; /* result of the lookup */
	public final Method method; /* method to use if substring matches */
	public final SnowballProgram methodobject; /* object to invoke method on */
};
