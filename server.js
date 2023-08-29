const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())




// an array to hold a mock data of songs
const songs = [
    {
      
    "title": "Sunset Serenade",
    "artist": "Luna Waves",
    "year": 2022
  },
  {
    "title": "Neon Dreams",
    "artist": "Synthwave Voyager",
    "year": 2020
    
  },
  {
    "title": "Whispers in the Mist",
    "artist": "Mystic Echoes",
     "year": 2019
    
  }
]


app.get('/songs', (req, res) => {
  res.json(songs);
});

app.post('/songs', (req, res) => {
  const newSong = { id: Date.now(), title: req.body.title };
  songs.push(newSong);
  res.json(newSong);
});

app.put('/songs/:id', (req, res) => {
  const { id } = req.params;
  const updatedSong = req.body;
  const index = songs.findIndex(song => song.id === +id);
  if (index !== -1) {
    songs[index] = { ...songs[index], ...updatedSong };
    res.json(songs[index]);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});

app.delete('/songs/:id', (req, res) => {
  const { id } = req.params;
  const index = songs.findIndex(song => song.id === +id);
  if (index !== -1) {
    const deletedSong = songs.splice(index, 1)[0];
    res.json(deletedSong);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});


app.listen(5000,()=>{
  console.log('server is running on port 5000')
})