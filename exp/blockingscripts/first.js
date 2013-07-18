(function(){
	alert('first.js script excutes. Now we insert scripts.');
	$('<script id="prepend" src="prepend.js"></script>').prependTo('body');
	$('<script id="insert" src="insert.js"></script>').insertAfter('#first');
	$('<script async id="async" src="async.js"></script>').insertAfter('#insert');
	$('<script id="append" src="append.js"></script>').appendTo('body');
})()