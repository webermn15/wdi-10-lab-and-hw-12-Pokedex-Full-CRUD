
const express    = require('express');
const app        = express();
const Pokemon    = require('./models/pokemon.js');

const bodyParser = require('body-parser');

let methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'))

app.use(express.static('public'))



// INDEX
app.get('/', (req, res) => {
	res.render('index.ejs', { data: Pokemon });
	// res.send(Pokemon);
});


//EDIT
app.put('/:id', (req, res) => {

	let typeArr = [];

	if (req.body.typeOne) {
		typeArr.push(req.body.typeOne)
	}
	if (req.body.typeTwo) {
		typeArr.push(req.body.typeTwo)
	}

	let miscObj = {
		weight: req.body.weight,
		height: req.body.height
	}

	let statsObj = {
		hp: req.body.hp,
		attack: req.body.attack,
		defense: req.body.defense,
		spattack: req.body.spattack,
		spdefense: req.body.spdefense,
		speed: req.body.speed
	}

	Pokemon[req.params.id] = {
		img: req.body.img,
		id: req.body.id,
		name: req.body.name,
		type: typeArr,
		misc: miscObj,
		stats: statsObj
	};

	res.redirect('/');
});


// NEW
app.get('/new', (req, res) => {
	res.render('new.ejs');
});


// EDIT
app.get('/:id/edit', (req, res) => {

	// YOU STILL NEED TO LOOP THE TYPES IN THE EDIT.EJS FILE DON'T FORGET

	res.render('edit.ejs', {
		data: Pokemon[req.params.id],
		index: req.params.id
	});
});


// SHOW
app.get('/:id', (req, res) => {
    res.render('show.ejs', { data: Pokemon[req.params.id], index: req.params.id });
});


//CREATE
app.post('/', (req, res) => {
	console.log(req.body);

	let typeArr = [];

	if (req.body.typeOne) {
		typeArr.push(req.body.typeOne)
	}
	if (req.body.typeTwo) {
		typeArr.push(req.body.typeTwo)
	}

	let miscObj = {
		weight: req.body.weight,
		height: req.body.height
	}

	let statsObj = {
		hp: req.body.hp,
		attack: req.body.attack,
		defense: req.body.defense,
		spattack: req.body.spattack,
		spdefense: req.body.spdefense,
		speed: req.body.speed
	}

	Pokemon.push({
		img: req.body.img,
		id: req.body.id,
		name: req.body.name,
		type: typeArr,
		misc: miscObj,
		stats: statsObj
	});

	res.redirect('/');
	// res.send('it posted bitch')
});


//DELETE
app.delete('/:id', (req, res) => {

	Pokemon.splice(req.params.id, 1);

	res.redirect('/');
});




app.listen(3000, () => {
	console.log('listening on port 3000');
});