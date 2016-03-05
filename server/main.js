import express from 'Express'
import http from 'http'


var port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);

// Routing
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/build/web'));

app.use('/main', (req, res) => {
				res.render('main.ejs', {id: 'testId'})
			})

app.listen(port, () => console.log('connected: '));

let start = () =>
{
	console.log('start')
}

export default start
