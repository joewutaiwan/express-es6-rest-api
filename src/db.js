export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	var myDB = {"sql": "QQQ"}
	callback(myDB);
}
