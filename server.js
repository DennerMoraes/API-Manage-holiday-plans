const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let data = loadJsonFile(); // Load data from the JSON file on server start

// Function to load data from the JSON file
function loadJsonFile() {
  try {
    const dataBuffer = fs.readFileSync('data.json');
    const jsonData = JSON.parse(dataBuffer.toString());
    return jsonData;
  } catch (error) {
    console.error('Error loading data from JSON file:', error);
    return [];
  }
}

// Function to save data to the JSON file
function saveJsonFile(data) {
  try {
    const dataString = JSON.stringify(data, null, 2); // null, 2 is for formatting JSON with an indentation of 2 spaces
    fs.writeFileSync('data.json', dataString, 'utf-8');
  } catch (error) {
    console.error('Error saving data to JSON file:', error);
  }
}

// CRUD Routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Fetching data...', data: data });
});

app.post('/api/data', (req, res) => {
  const newData = { id: uuidv4(), ...req.body }; // Use uuidv4() to generate a unique ID
  data.push(newData);
  saveJsonFile(data);
  res.json({ message: 'Data inserted successfully!', data: newData });
});

app.put('/api/data/:index', (req, res) => {
  const { index } = req.params;
  const updatedData = req.body;

  const dataIndex = parseInt(index, 10);

  if (!isNaN(dataIndex) && dataIndex >= 0 && dataIndex < data.length) {
    // Update the data
    data[dataIndex] = { ...data[dataIndex], ...updatedData };
    saveJsonFile(data); // Save data to the JSON file
    res.json({ message: `Data at index ${dataIndex} updated successfully!`, data: data[dataIndex] });
  } else {
    res.status(404).json({ message: `No data found for index ${index}.` });
  }
});

app.delete('/api/data/:id', (req, res) => {
  const { id } = req.params;
  const dataIndex = data.findIndex(item => item.id === id);

  if (dataIndex !== -1) {
    // Remove the item from the array
    data.splice(dataIndex, 1);
    saveJsonFile(data); // Save data to the JSON file
    res.json({ message: `Data with ID ${id} deleted successfully!` });
  } else {
    res.status(404).json({ message: `No data found for ID ${id}.` });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
