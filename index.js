const express = require('express')
const cors = require('cors')


const app = express()

app.use(cors())
app.use(express.json())


app.listen(5000,()=>{
    console.log('server is running on port 5000')
})

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


//fetch all the songs
app.get('/api/songs',(req,res)=>{
    res.json(songs)
})

// add new songs
app.post('/api/songs', (req, res) => {
  const newSong = req.body;
  newSong.id = songs.length + 1; 

  songs.push(newSong);
  res.json(newSong);
});


//update songs
app.put('/api/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);
  const updatedSong = req.body;

  const songToUpdate = songs.find(song => song.id === songId);
  if (songToUpdate) {
    Object.assign(songToUpdate, updatedSong);
    res.json(songToUpdate);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});


// delete songs 
app.delete('/api/songs/:id', (req, res) => {
  const songId = parseInt(req.params.id);

  const songIndex = songs.findIndex(song => song.id === songId);
  if (songIndex !== -1) {
    const deletedSong = songs.splice(songIndex, 1)[0];
    res.json(deletedSong);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
});
