package org.tartarus.snowball;

//:es6:
// public class StringBuffer {
public class StringBuffer implements CharSequence {
// :end:
	private String b = "";

	@Override
	public int length() {
		return b.length();
	}

	void replace(int start, int end, String str) {
		if (start == 0 && end == b.length()) {
			b = str;
		} else {
			String left = b.substring(0, start), right = b.substring(end);
			b = left + str + right;
		}
	}

	String substring(int start, int end) {
		return b.substring(start, end);
	}

	@Override
	public char charAt(int index) {
		return b.charAt(index);
	}

	@Override
	public CharSequence subSequence(int start, int end) {
		// :es6:
		// throw new Error("NotImpl: CharSequence::subSequence");
		throw new RuntimeException("NotImpl: CharSequence::subSequence");
		// :end:
	}

	@Override
	public String toString() {
		return b;
	}

}
