// exercise 2

export type Movie = { id: string, title: string; };

export class Exercise2 {
    #movies: Record<string, Movie[]> = { thriller: [{ id: '1', title: 'The American'}, { id: '2', title: 'Arcadian'}] }; // example: { thriller: [{ id: '1', title: 'The American'}, { id: '2', title: 'Arcadian'}] }

    add_movie_in_genre(genre: string, new_movie: Movie): boolean {
        // add movie if movie id does not exist
        if (!this.#movies[genre]) {
            this.#movies[genre] = [];
        }

        if (this.#movies[genre].some(movie => movie.id == new_movie.id)) return false;

        // return true if the movie is added successfully, false otherwise
        this.#movies[genre].push(new_movie);
        return true;
    }

    update_movie_title_by_genre_and_movie_id(genre: string, movie_id: string, new_title: string): boolean {
        // update a movie within a certain genre
        if (!this.#movies[genre]) return false;

        // return true if the movie's title is updated successfully, false otherwise
        let index = this.#movies[genre].findIndex(movie => movie.id == movie_id);
        if (index >= 0) {
            let curMovie = this.#movies[genre].find(movie => movie.id = movie_id);
            if (curMovie) {
                curMovie.title = new_title;
                return true;
            }
        }
        return false;
    }

    delete_movie_by_genre_and_movie_id(genre: string, movie_id: string): boolean {
        // delete movie 
        if (!this.#movies[genre]) return false;
        // return true if the movie is delete successfully, false otherwise

        this.#movies[genre] = this.#movies[genre].filter(movie => movie.id != movie_id);
        return true;
    }


    get_movie_title_by_id(genre: string, movie_id: string): string {
        // return the movie title 
        if (!this.#movies[genre]) return '';

        return this.#movies[genre].find(moive => moive.id == movie_id)?.title ?? '';
    }
}
