
# innerHTML


# insertAdjacenHTML()

	insertAdjacentHTML() 将指定的文本解析为HTML或XML,并将结果节点插入到DOM树种的指定位置。它不会重新解析它正在使用
	的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤,使其比直接innerHTML操作更快。
	
	tips:
	1. 如果只是为了插入文本内容(而不是HTML节点),不建议使用这个方法，建议使用node.textContent 或者
	node.insertAdjacenText()。因为这样不需要经过HTML解释器的转换,性能会好一些。