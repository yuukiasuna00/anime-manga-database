import { useState, useEffect } from 'react';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

import './assets/scss/main.css'

function App() {
  const [animeList, setAnimeList] = useState([]);
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [search, setSearch] = useState('');

  const getTopAnime = async () => {
    const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
      .then(res => res.json());
    
    setTopAnime(temp.top.slice(0, 5));
  }

  const getTopManga = async () => {
    const temp = await fetch(`https://api.jikan.moe/v3/top/manga/1/bypopularity`)
      .then(res => res.json());

    setTopManga(temp.top.slice(0, 5))
  }

  const handleSearch = e => {
    e.preventDefault();

    fetchAnime(search)
  }

  const fetchAnime = async (query) => {
    const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=10`)
      .then(res => res.json())

    setAnimeList(temp.results)
  }

  useEffect(() => {
    getTopAnime();
    getTopManga();
  }, [])


  let progress = document.getElementById('progressbar');
  let totalHeight = document.body.scrollHeight - window.innerHeight;
  window.onscroll = function(){
    let progressHeight = (window.pageYOffset / totalHeight) * 100;
    progress.style.height = progressHeight + '%';
  }

  return (
    <div>
      <div id="progressbar"></div>
      <div id="scrollPath"></div>
      <Header />
      <div className="content-wrap">
        <Sidebar topAnime={topAnime} topManga={topManga} />
          <MainContent 
            handleSearch={handleSearch}
            search={search}
            setSearch={setSearch}
            animeList={animeList}
          />
      </div>
    </div>
  );
}

export default App;
