import React, { useEffect, useState } from 'react';
import Layout from '../app/layout'; 
import AddMovie from "../app/components/AddMovie";
import MovieList from "../app/components/MovieList";

const MoviePage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://full-stack-web-assignment3-yse9.vercel.app/moviepage';
        const res = await fetch(url, {
          cache: 'no-cache',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setMovies(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    console.error("Error fetching movies:", error);
    return <p>Error fetching movies</p>;
  }

  return (
    <Layout> 
      <main className="flex min-h-screen flex-col justify-between p-24">
        <div>
          <AddMovie />
        </div>
        <div className="overflow-y-auto max-h-[400px]">
          {movies ? <MovieList movie={movies} /> : <p>No movies found</p>}
        </div>
      </main>
    </Layout>
  );
};

export default MoviePage;
