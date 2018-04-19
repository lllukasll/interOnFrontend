import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class UpcomingEvents extends React.Component {
  render() {
       return (
         <div class="row">
    <div class="col-md-8 offset-md-2 header ">
      <h1>Nadchodzące wydarzenia</h1>
    </div>
    <div class="col-md-8 offset-md-2 content ">
      <div class="col-md-10 offset-md-1 group-content ">
        <div class= "row">
          <div class="col-md-4">
            <img src="/images/rower.jpg" alt="img" class="image-responsive  img-margin" />
          </div>
          <div class="col-md-6 offset-md-1 group-description" >
           <h3> 100 km na rowerze </h3>
           <h6 class="date"> 25-02-2019 </h6>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
             do eiusmod tempor incididunt ut labore et dolore magna aliqua
              Ut enim ad minim veniam, quis nostrud</p>
          <button type="button" class="btn btn-secondary details-btn">Szczegóły</button>
        </div>
        </div>
      </div>
      <div class="col-md-10 offset-md-1 group-content ">
        <div class= "row">
          <div class="col-md-4">
            <img src="/images/mecz.jpg" alt="img" class="image-responsive  img-margin" />
          </div>
          <div class="col-md-6 offset-md-1 group-description" >
           <h3> Mecz STOMIL OLSZTYN </h3>
           <h6 class="date"> 25-02-2019 </h6>
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
             do eiusmod tempor incididunt ut labore et dolore magna aliqua
              Ut enim ad minim veniam, quis nostrud</p>
          <button type="button" class="btn btn-secondary details-btn">Szczegóły</button>
        </div>
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

export default UpcomingEvents;
