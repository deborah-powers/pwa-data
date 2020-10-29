document.body.init();
debbyPlay.book ={ code: "", title: "", price: "", date: "", autor: "" };
debbyPlay.books =[];
// vérifier si mon navigateur supporte indexedDB
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: 'readwrite'};
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
if (! window.indexedDB) console.log ('votre navigateur ne supporte pas indexedDB.');
else console.log ('votre navigateur supporte indexedDB !');
// le crud
const bookData =[
	{ code: 'xoxo', title: "l'histoire sans fin", price: 20, date: '1973', autor: 'michael ende' },
	{ code: 'coco', title: "le vieil homme et la mer", price: 15, date: '1947', autor: 'ernest hemingway' }
];
var database;
var request = window.indexedDB.open ('book_db', 3);
request.onerror = function (event){ console.log ('error: '); };
request.onsuccess = function (event){
	database = request.result;
	listBook();
};
request.onupgradeneeded = function (event){
	var database = event.target.result;
	// var objectStore = database.createObjectStore ('book_store', { autoIncrement: true });
	var objectStore = database.createObjectStore ('book_store', {keyPath: 'code'});
	// deux livres peuvent avoir le même auteur
	objectStore.createIndex ('autor', 'autor', { unique: false });
	objectStore.createIndex ('date', 'date', { unique: false });
	// chaque livre doit avoir un titre unique
	objectStore.createIndex ('title', 'title', { unique: true });
	for (var i in bookData) objectStore.add (bookData[i]);
	document.body.load();
}
function selBook (code){
	var transaction = database.transaction (['book_store']);
	var objectStore = transaction.objectStore ('book_store');
	var request = objectStore.get (code);
	request.onerror = function (event){ console.log ('impossible de récupérer les données'); };
	request.onsuccess = function (event){
		if (request.result){
			debbyPlay.book = request.result;
			document.body.load();
		}
		else console.log ('le livre de code', code, "n'est pas dans la base");
};}
function listBook(){
	debbyPlay.books =[];
	var objectStore = database.transaction ('book_store').objectStore ('book_store');
	objectStore.openCursor().onsuccess = function (event){
		var cursor = event.target.result;
		if (cursor){
			debbyPlay.books.push (cursor.value);
			cursor.continue();
		}
		else console.log ('tout est récupéré');
		document.body.load();
};}
function getBookData(){
	var inputs = document.getElementsByTagName ('input');
	debbyPlay.book.code = inputs[0].value;
	debbyPlay.book.title = inputs[1].value;
	debbyPlay.book.autor = inputs[2].value;
	debbyPlay.book.date = inputs[3].value;
	debbyPlay.book.price = inputs[4].value;
}
function addBook(){
	getBookData();
	var request = database.transaction (['book_store'], 'readwrite').objectStore ('book_store').add (debbyPlay.book);
	request.onsuccess = function (event){
		console.log ('le nouveau livre, '+ debbyPlay.book.title +' est enregistré'); }
	request.onerror = function (event){ console.log ('le nouveau livre, '+ debbyPlay.book.title +" n'a pas put être enregistré"); }
}
function updateBook(){
	getBookData();
	var request = database.transaction (['book_store'], 'readwrite').objectStore ('book_store').put (debbyPlay.book);
	request.onsuccess = function (event){
		console.log ('le nouveau livre, '+ debbyPlay.book.title +' est enregistré'); }
	request.onerror = function (event){ console.log ('le nouveau livre, '+ debbyPlay.book.title +" n'a pas put être enregistré"); }
}
function addUpdateBook(){
	getBookData();
	var transaction = database.transaction (['book_store']);
	var objectStore = transaction.objectStore ('book_store');
	var request = objectStore.get (debbyPlay.book.code);
	request.onerror = function (event){ console.log ('impossible de récupérer les données'); };
	request.onsuccess = function (event){
		if (request.result) updateBook();
		else addBook();
	};
}
function delBook (code){
	var request = database.transaction (['book_store'], 'readwrite').objectStore ('book_store').delete (code);
	request.onsuccess = function (event){ console.log ('le livre de code '+ code +' à été supprimé'); };
}
function addBook_simple(){
	var inputs = document.getElementsByTagName ('input');
	debbyPlay.book.code = inputs[0].value;
	debbyPlay.book.title = inputs[1].value;
	debbyPlay.book.autor = inputs[2].value;
	debbyPlay.book.date = inputs[3].value;
	debbyPlay.book.price = inputs[4].value;
	var request = database.transaction (['book_store'], 'readwrite').objectStore ('book_store').put (debbyPlay.book);
	request.onsuccess = function (event){
		console.log ('le nouveau livre, '+ debbyPlay.book.title +' est enregistré'); }
	request.onerror = function (event){ console.log ('le nouveau livre, '+ debbyPlay.book.title +" n'a pas put être enregistré"); }
}