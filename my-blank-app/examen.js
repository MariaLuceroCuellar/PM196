import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// Reemplaza con tu API key de OMDB
const API_KEY = '15e78a03';
const BASE_URL = 'http://www.omdbapi.com/';

const MovieSearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('approximate');

  const searchMovies = async () => {
    if (!searchQuery.trim()) {
      Alert.alert('¡Oops!', 'Por favor ingresa el nombre de una película 🎬');
      return;
    }

    setLoading(true);
    try {
      // OMDB API para búsqueda múltiple
      const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}&type=movie`
      );
      
      if (!response.ok) {
        throw new Error('Error en la petición');
      }

      const data = await response.json();
      
      // OMDB devuelve un formato diferente
      if (data.Response === 'True') {
        let filteredResults = data.Search;

        // Filtrar según el modo de búsqueda
        if (searchMode === 'exact') {
          filteredResults = data.Search.filter(movie =>
            movie.Title.toLowerCase() === searchQuery.toLowerCase()
          );
        }

        // Para cada película, obtener detalles adicionales (rating, plot, etc.)
        const moviesWithDetails = await Promise.all(
          filteredResults.slice(0, 10).map(async (movie) => {
            try {
              const detailResponse = await fetch(
                `${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=short`
              );
              const detailData = await detailResponse.json();
              return {
                ...movie,
                ...detailData,
                // Mapear campos para mantener compatibilidad
                id: movie.imdbID,
                title: movie.Title,
                poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
                release_date: movie.Year,
                vote_average: detailData.imdbRating !== 'N/A' ? parseFloat(detailData.imdbRating) : 0,
                overview: detailData.Plot !== 'N/A' ? detailData.Plot : '',
              };
            } catch (error) {
              console.error('Error fetching movie details:', error);
              return {
                ...movie,
                id: movie.imdbID,
                title: movie.Title,
                poster_path: movie.Poster !== 'N/A' ? movie.Poster : null,
                release_date: movie.Year,
                vote_average: 0,
                overview: '',
              };
            }
          })
        );

        setMovies(moviesWithDetails);
      } else {
        // No se encontraron resultados
        setMovies([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      Alert.alert('Error', 'No se pudieron cargar las películas. Verifica tu conexión.');
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return '#4CAF50';
    if (rating >= 6) return '#FF9800';
    return '#F44336';
  };

  const renderMovieCard = ({ item, index }) => (
    <View style={[styles.movieCard, { marginTop: index === 0 ? 0 : 15 }]}>
      <View style={styles.posterContainer}>
        <Image
          source={{
            uri: item.poster_path && item.poster_path !== 'N/A'
              ? item.poster_path
              : 'https://via.placeholder.com/300x450/1a1a1a/ffffff?text=Sin+Imagen',
          }}
          style={styles.moviePoster}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.posterGradient}
        />
      </View>
      
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        
        <View style={styles.movieMeta}>
          <View style={styles.yearContainer}>
            <Text style={styles.yearIcon}>📅</Text>
            <Text style={styles.movieYear}>
              {item.release_date || 'N/A'}
            </Text>
          </View>
          
          <View style={[styles.ratingContainer, { backgroundColor: getRatingColor(item.vote_average) }]}>
            <Text style={styles.ratingIcon}>⭐</Text>
            <Text style={styles.ratingValue}>
              {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
            </Text>
          </View>
        </View>
        
        {/* Información adicional de OMDB */}
        <View style={styles.additionalInfo}>
          {item.Genre && (
            <Text style={styles.genreText}>🎭 {item.Genre}</Text>
          )}
          {item.Director && (
            <Text style={styles.directorText}>🎬 Dir: {item.Director}</Text>
          )}
          {item.Runtime && (
            <Text style={styles.runtimeText}>⏱️ {item.Runtime}</Text>
          )}
        </View>
        
        {item.overview && (
          <Text style={styles.movieOverview} numberOfLines={3}>
            {item.overview}
          </Text>
        )}
      </View>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎬</Text>
      <Text style={styles.emptyTitle}>No se encontraron películas</Text>
      <Text style={styles.emptySubtitle}>
        Intenta con otro término de búsqueda
      </Text>
    </View>
  );

  const renderInitialState = () => (
    <View style={styles.initialContainer}>
      <Text style={styles.initialIcon}>🍿</Text>
      <Text style={styles.initialTitle}>Descubre películas increíbles</Text>
      <Text style={styles.initialSubtitle}>
        Busca tus películas favoritas usando OMDB
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />
      
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#1a1a2e', '#16213e', '#0f3460']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🎬 CineSearch</Text>
        <Text style={styles.headerSubtitle}>Powered by OMDB</Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Container */}
        <View style={styles.searchSection}>
          <View style={styles.searchInputContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="¿Qué película buscas?"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={searchMovies}
              returnKeyType="search"
            />
          </View>

          {/* Search Mode Toggle */}
          <View style={styles.toggleSection}>
            <Text style={styles.toggleLabel}>Tipo de búsqueda</Text>
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  searchMode === 'approximate' && styles.toggleButtonActive,
                ]}
                onPress={() => setSearchMode('approximate')}
              >
                <Text style={styles.toggleIcon}>🎯</Text>
                <Text
                  style={[
                    styles.toggleButtonText,
                    searchMode === 'approximate' && styles.toggleButtonTextActive,
                  ]}
                >
                  Aproximada
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  searchMode === 'exact' && styles.toggleButtonActive,
                ]}
                onPress={() => setSearchMode('exact')}
              >
                <Text style={styles.toggleIcon}>🎪</Text>
                <Text
                  style={[
                    styles.toggleButtonText,
                    searchMode === 'exact' && styles.toggleButtonTextActive,
                  ]}
                >
                  Exacta
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Button */}
          <TouchableOpacity
            style={styles.searchButton}
            onPress={searchMovies}
            disabled={loading}
          >
            <LinearGradient
              colors={loading ? ['#ccc', '#999'] : ['#ff6b6b', '#ee5a24']}
              style={styles.searchButtonGradient}
            >
              <Text style={styles.searchButtonText}>
                {loading ? '🔄 Buscando...' : '🚀 Buscar Películas'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Loading State */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ff6b6b" />
            <Text style={styles.loadingText}>Consultando OMDB...</Text>
            <View style={styles.loadingDots}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
          </View>
        )}

        {/* Results */}
        {!loading && (
          <>
            {movies.length > 0 && (
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsCount}>
                  {movies.length} película{movies.length !== 1 ? 's' : ''} encontrada{movies.length !== 1 ? 's' : ''}
                </Text>
              </View>
            )}
            
            <FlatList
              data={movies}
              renderItem={renderMovieCard}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.moviesList}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ListEmptyComponent={
                searchQuery && !loading ? renderEmptyState() : 
                !searchQuery ? renderInitialState() : null
              }
            />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  searchSection: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
  toggleSection: {
    marginBottom: 20,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toggleIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  toggleButtonTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  searchButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  searchButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  loadingDots: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff6b6b',
    marginHorizontal: 4,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  moviesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  movieCard: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  posterContainer: {
    position: 'relative',
    height: 200,
  },
  moviePoster: {
    width: '100%',
    height: '100%',
  },
  posterGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  movieInfo: {
    padding: 20,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    lineHeight: 26,
  },
  movieMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  yearContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  yearIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  movieYear: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  additionalInfo: {
    marginBottom: 12,
  },
  genreText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  directorText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  runtimeText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  movieOverview: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  initialContainer: {
    alignItems: 'center',
    paddingVertical: 80,
  },
  initialIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  initialTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  initialSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 22,
  },
});

export default MovieSearchScreen;