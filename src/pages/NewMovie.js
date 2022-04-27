import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MovieForm from '../components/MovieForm';
import * as movieAPI from '../services/movieAPI';

class NewMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      movie: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(newMovie) {
    this.setState({
      redirect: this.checkCreate(newMovie),
    });
  }

  async checkCreate(newMovie) {
    const resp = await movieAPI.createMovie(newMovie);
    if (resp === 'OK') return true;
  }

  render() {
    const { redirect, movie } = this.state;
    if (redirect) return <Redirect to="/" />;
    return (
      <div data-testid="new-movie" className="details-card">
        <MovieForm movie={ movie } onSubmit={ this.handleSubmit } />
      </div>
    );
  }
}
export default NewMovie;
