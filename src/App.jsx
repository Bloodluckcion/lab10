import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import Lightbox from './components/Lightbox';
import './App.css';

const UNSPLASH_ACCESS_KEY = 'jMtgHM9qfMoXMBodJrvdR4uqmtvPr6dnrm3QmU0Ulb8';

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('nature');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Загрузка изображений
  const fetchImages = async (searchQuery, pageNum, append = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchQuery}&page=${pageNum}&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();

      if (data.results.length === 0) {
        setHasMore(false);
      }

      if (append) {
        setImages((prev) => [...prev, ...data.results]);
      } else {
        setImages(data.results);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Загрузка при первом рендере
  useEffect(() => {
    fetchImages(query, 1);
  }, []);

  // Обработка нового поиска
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setHasMore(true);
    fetchImages(newQuery, 1);
  };

  // Загрузить ещё
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage, true);
  };

  // Открыть модальное окно
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Закрыть модальное окно
  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🖼️ Галерея изображений</h1>
        <p>Поиск красивых фотографий с Unsplash</p>
      </header>

      <main className="main">
        <SearchBar onSearch={handleSearch} />

        {isLoading && images.length === 0 && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Загрузка изображений...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>❌ Ошибка: {error}</p>
          </div>
        )}

        {!isLoading && images.length === 0 && !error && (
          <div className="empty-state">
            <p>🔍 Ничего не найдено. Попробуйте другой запрос!</p>
          </div>
        )}

        <ImageGrid images={images} onImageClick={handleImageClick} />

        {images.length > 0 && hasMore && (
          <div className="load-more-container">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="load-more-button"
            >
              {isLoading ? 'Загрузка...' : '📥 Загрузить ещё'}
            </button>
          </div>
        )}

        {images.length > 0 && !hasMore && (
          <div className="end-message">
            <p>🎉 Все изображения загружены!</p>
          </div>
        )}
      </main>

      <Lightbox image={selectedImage} onClose={handleCloseLightbox} />
    </div>
  );
}