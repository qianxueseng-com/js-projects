function contain(parent, target) {
	if(parent.contains) {
		return parent.contains(target);

	} else if (parent.compareDocumentPosition) {

		return !!parent.compareDocumentPosition(target) & 16;
	}
}