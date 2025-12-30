// types/movie.ts

export interface TMDBSearchMovie {
  id: number;
  title: string;
  original_title?: string;
  poster_path: string | null;
  release_date?: string;
  vote_average?: number;
}

export interface TMDBDetailedMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}
