import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as movieAPI from '../services/movieAPI';
import { Loading } from '../components';
import './styles.css';

class MovieDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      loading: true,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.getMovie(id);
  }

  async getMovie(id) {
    const resp = await movieAPI.getMovie(id);
    this.setState({
      movies: resp,
      loading: false,
    });
  }

  async deleteMovie(id) {
    await movieAPI.deleteMovie(id);
  }

  render() {
    const { loading } = this.state;
    if (loading) return <Loading />;

    const { movies } = this.state;
    const { id, title, storyline, imagePath, genre, rating, subtitle } = movies;

    return (
      <div data-testid="movie-details" className="details-card">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <h4>{`Title: ${title}`}</h4>
        <p>{ `Subtitle: ${subtitle}` }</p>
        <p>{ `Storyline: ${storyline}` }</p>
        <p>{ `Genre: ${genre}` }</p>
        <p>{ `Rating: ${rating}` }</p>
        <nav className="nav-details-links">
          <span><Link to="/">VOLTAR</Link></span>
          <span><Link to={ `/movies/${id}/edit` }>EDITAR</Link></span>
          <span><Link to="/" onClick={ () => this.deleteMovie(id) }>DELETAR</Link></span>
        </nav>
      </div>
    );
  }
}

MovieDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MovieDetails;
