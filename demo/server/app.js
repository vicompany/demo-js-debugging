const path = require('path');

const express = require('express');
const compression = require('compression');
const createError = require('http-errors');
const favicon = require('serve-favicon');
const fetch = require('node-fetch');

const PORT = 8080;

const app = express();

const isDev = app.get('env') === 'development';

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Static files
app.use(compression());
app.use(express.static(path.join(__dirname, '../dist')));
app.use(favicon(path.join(__dirname, 'views', 'img', 'favicon.ico')));

app.get('/', (req, res) =>	{
	res.render('index', { title: 'Debug like a PRO!' });
});

// DO NOT DO THIS! Highly inefficient code, for demo purposes only!
// There are also 2 bugs in this code.
app.get('/users', async (req, res) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	let users = response.json();

	// Only show users on the northern hemisphere
	users = users.filter(u => u.address.lat > 0);

	res.render('users', {
		title: 'Users',
		users,
	});
});

// Catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// Error handler
app.use((err, req, res) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = isDev ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
