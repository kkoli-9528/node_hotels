// 1st Video:

// const fs = require('fs');
// const os = require('os');

// const user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greeting.txt', 'Hi ' + user.username + '!\n', () => {
//     console.log('file is created');
// });

// console.log(os);
// console.log(fs);

// const notes = require('./notes.js');
// const _ = require('lodash');

// console.log('server is running');
// const age = notes.age;
// const result = notes.addNumber(age + 18, 10);
// console.log(age);
// console.log('result is now ' + result);


// const data = ['person', 'person', 1, 2, 1, 2, 'name', 'age', '2'];
// const filter = _.uniq(data);
// console.log(filter);

// console.log(_.isString('kunal'));


// 2nd Video:
// const jsonString = '{"name": "John", "age": 30, "city": "New York"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(typeof jsonObject, jsonObject);

// const objectToConvert = {
//     name: "Alice",
//     age: 25
// };
// const jsonStringified = JSON.stringify(objectToConvert);
// console.log(typeof jsonStringified, jsonStringified);

// 3rd Video:
// const express = require('express');
// const app = express();

// app.get('/', function (req, res) {
//     res.send('Welcome to my hotel... How i can help you ?, we have list of menus')
// });

// app.get('/chicken', (req, res) => {
//     res.send('sure sir, i would love to serve chicken');
// });

// app.get('/idli', (req, res) => {
//     const customized_idli = {
//         name: 'rava idle',
//         size: '10 cm diameter',
//         is_sambar: true,
//         is_chutney: false
//     };
//     res.send(customized_idli);
// });

// app.post('/items', (req, res) => {
//     res.send('data is saved');
// });

// app.listen(3000, () => {
//     console.log('listening on port 3000');
// });

// 4th Video:

// const express = require('express');
// const app = express();
// const db = require('./db');
// const bodyparser = require('body-parser');
// app.use(bodyparser.json());

// const Person = require('./models/Person');
// const MenuItem = require('./models/Menu');

// app.get('/', function (req, res) {
//     res.send('Welcome to my hotel... How i can help you ?, we have list of menus')
// });

// app.post('/person', async (req, res) => {

//     try {
//         const data = req.body; // Assuming the request body contains the person data

//         // Create a new Person document using the Mongoose model
//         const newPerson = new Person(data);

//         // Save the new Person to the database
//         const response = await newPerson.save();
//         console.log('data saved');
//         res.status(200).json(response);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }

//     // const data = req.body; // Assuming the request body contains the person data

//     // // Create a new Person document using the Mongoose model
//     // const newPerson = new Person(data);

//     // const newPerson = new Person();
//     // newPerson.name = data.name;
//     // newPerson.age = data.age;
//     // newPerson.mobile = data.mobile;
//     // newPerson.email = data.email;
//     // newPerson.address = data.address;

//     // Nowadays no one uses callback functions like, we used in the POST methods They look quite complex and also do not give us code readability.

//     // // Save the new Person to the database
//     // newPerson.save((error, savedPerson) => {
//     //     if (error) {
//     //         console.log('Error saving person:', error);
//     //         res.status(500).json({ error: 'Internal server error' })
//     //     } else {
//     //         console.log('data saved successfully');
//     //         res.status(200).json(savedPerson);
//     //     }
//     // });
// });

// // GET method to get the person
// app.get('/person', async (req, res) => {
//     try {
//         const data = await Person.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.get('/person/:workType', async (req, res) => {
//     try {
//         const workType = req.params.workType; // Extract the work type from the URL parameter
//         if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
//             const response = await Person.find({ work: workType });
//             console.log('respopnse fetched');
//             res.status(200).json(response);
//         } else {
//             res.status(404).json({ error: 'Invalid work type' });
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })

// app.get('/menu', async (req, res) => {
//     try {
//         const data = await MenuItem.find();
//         console.log('data fetched');
//         res.status(200).json(data);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// app.post('/menu', async (req, res) => {
//     try {
//         const data = req.body;
//         const newMenuItem = new MenuItem(data);
//         const saveMenuItem = await newMenuItem.save();
//         console.log('data saved');
//         res.status(200).json(saveMenuItem);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });


// app.listen(3000, () => {
//     console.log('listening on port 3000');
// });

// 8th Video:

const express = require('express');
const app = express();
const db = require('./db');
const bodyparser = require('body-parser');
const dotenv = require('dotenv').config();
app.use(bodyparser.json());
const PORT = process.env.PORT || 3000;


app.get('/', function (req, res) {
    res.send('Welcome to my Hotel');
});



// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Use the routers
app.use('/person', personRoutes)
app.use('/menu', menuRoutes);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});