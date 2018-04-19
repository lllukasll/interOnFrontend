import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Interests extends React.Component {
  render() {
       return (
         <div class="row">
        <div class="col-md-8 offset-md-2  header ">
          <h1>Kategorie Zainteresowań</h1>
        </div>
        <div class="col-md-8 offset-md-2 content" >
          <div class="row interest-content">
            <div class="col-md-4">
          <a href="cooking.html"><img src="/images/gotowanie.jpg" class="image-responsive img-margin" alt="image-responsive" /></a>
            </div>
            <div class="col-md-4">
              <a href="sport.html"><img src="/images/sport.jpg" class="image-responsive img-margin " alt="image-responsive" /></a>
            </div>
            <div class="col-md-4">
              <img src="/images/motoryzacja.jpg" class="image-responsive img-margin " alt="image-responsive" />
            </div>
          </div>
          <div class="row interest-content">
            <div class="col-md-4">
              <img src="/images/muzyka.jpg" class="image-responsive img-margin" alt="image-responsive" />
            </div>
            <div class="col-md-4">
            <img src="/images/moda2.jpg" class="image-responsive img-margin " alt="image-responsive" />
            </div>
            <div class="col-md-4">
              <img src="/images/sztuka.jpg" class="image-responsive img-margin " alt="image-responsive" />
            </div>
          </div>
        <div class="row interest-content">
          <div class="col-md-4 offset-md-9">
            <button type="button" class="btn btn-secondary more-btn">Zobacz więcej</button>

          </div>
        </div>
      </div>
    </div>
     );
   }
}

export default Interests;
