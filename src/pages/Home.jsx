import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
import '../css/Home.css';
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {

    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("Failed to load movies...")
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    // Mark handleSearch as async
    const handleSearch = async (e) => {
        e.preventDefault()
        if (!searchQuery.trim()) return
        if (loading) return // Prevent multiple searches while loading

        setLoading(true)
        setError(null); // Clear previous errors
        try {
            // Await the searchMovies call to get the actual results
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
        } catch (err) {
            console.log(err)
            setError("Failed to search movies...")
        } finally {
            setLoading(false)
            setSearchQuery(""); // Clear search input after search
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-msg">{error}</div>}

            {loading ? (
                <div className="loading">
                    Loading...
                </div>
            ) : movies.length > 0 ? ( // Check if there are movies to display
                <div className="movies-grid">
                    {movies.map(movie =>
                        <MovieCard movie={movie} key={movie.id} />
                    )}
                </div>
            ) : ( // Display message if no movies found after search/load
                <div className="no-results">No movies found.</div>
            )}
        </div>
    )
}

export default Home;