import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class PopularGroups extends React.Component {
  render() {
       return (
         <div class="row">
        <div class="col-md-8 offset-md-2 header ">
          <h1>Najpopularniejsze grupy</h1>
        </div>
        <div class="col-md-8 offset-md-2 content ">
          <div class="col-md-10 offset-md-1  group-content ">
            <div class= "row">
              <div class="col-md-4">
                <img src="/images/motocykle.jpg" alt="img" class="image-responsive  img-margin" />
              </div>
              <div class="col-md-6 offset-md-1 group-description" >
               <h3> Motycykle </h3>
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
                <img src="/images/nozna.jpg" alt="img" class="image-responsive  img-margin" />
              </div>
              <div class="col-md-6 offset-md-1 group-description" >
               <h3> Piłka Nożna </h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                 do eiusmod tempor incididunt ut labore et dolore magna aliqua
                  Ut enim ad minim veniam, quis nostrud</p>
              <button type="button" class="btn btn-secondary details-btn">Szczegóły</button>
            </div>
            </div>
          </div>
          <div class="row interest-content">
            <div class="col-md-4 offset-md-8">
              <button type="button" class="btn btn-secondary more-btn">Zobacz więcej</button>

            </div>
          </div>
        </div>


      </div>
     );
   }
}

export default PopularGroups;
