var express = require('express');
var app = express();
var fs = require('fs');
var os = require('os');
var child_process = require('child_process');
var cmd = require('node-cmd');
var morgan = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var count = 0;
app.post('/', function (req, res) {
	count++;
	var s = Date.now(),
		e = 0;
	var file = Date.now() + '.py';
	var stream = fs.createWriteStream(file);
	stream.once('open', function (fd) {
		stream.write('import sys');
		stream.write(os.EOL);
		stream.write(req.body.code);
		stream.write(os.EOL);
		stream.write('sys.stdout.flush()');
		cmd.get('python ' + file,
			function (data, err, stderr) {
				fs.unlinkSync(file);
				e = (Date.now() - s)
				res.json({
					status: true,
					msg: 'Compiled within ' + e + 'ms',
					out: err
				})
				console.log('Thread Ended within: ' + e + 'ms having id: ' + count)
			}
		);
	});
})

app.listen(3000);
console.log('Server running on 3000');
