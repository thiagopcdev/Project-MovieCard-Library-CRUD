import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import { MovieForm } from '../components';
import * as movieAPI from '../services/movieAPI';

class EditMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      shouldRedirect: false,
      movie: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    this.getMovie(id);
  }

  handleSubmit(updatedMovie) {
    this.setState({
      shouldRedirect: this.checkUpdate(updatedMovie),
    });
  }

  async getMovie(id) {
    const resp = await movieAPI.getMovie(id);
    this.setState({
      status: 'load',
      movie: resp,
    });
  }

  async checkUpdate(updatedMovie) {
    const resp = await movieAPI.updateMovie(updatedMovie);
    if (resp === 'OK') return true;
  }

  render() {
    const { status, shouldRedirect, movie } = this.state;
    if (shouldRedirect) return <Redirect to="/" />;
    if (status === 'loading') return <Loading />;
    return (
      <div data-testid="edit-movie" className="details-card">
        <h2>Editar</h2>
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}

EditMovie.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditMovie;
