import React, {useEffect, useState} from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import featuredMovie from './components/featuredMovie';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState([]);

  useEffect(() =>{
    const loadAll = async () => {
      //Pegando la lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Pegando Feature
      let originals = list.filter(i=>i.slug === 'originals' );
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.lenght -1));
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  },[]);

  return (
    <div className='page'>
      {featuredData && 
        <featuredMovie item={featuredData}/>
      }
      <section className='list'>
        {movieList.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
  </div>
  );
}