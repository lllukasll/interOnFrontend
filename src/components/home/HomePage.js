import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

class HomePage extends React.Component {

  componentDidMount() {
    const { user } = this.props;
    if(user)
    {
      this.props.dispatch(userActions.getUser(this.props.user.clientId));
    }
  }

  render() {
      const { loggedIn } = this.props;

      const userContent = (
        <section class="container">
          <div class="row ">
            <div class="col-md-2 sidebar content-sidebar ">
              <div class="list-group">
          <a href="my-groups.html" class="list-group-item list-group-item-action sidebar-button">Moje grupy</a>
          <a href="#" class="list-group-item list-group-item-action sidebar-button">Moje Wydarzenia</a>
          <a href="#" class="list-group-item list-group-item-action sidebar-button">Znajomi</a>
          <a href="#" class="list-group-item list-group-item-action sidebar-button">Wiadomości</a>
          <div class="lines"> </div>
          <a href="more-category-logged.html" class="list-group-item list-group-item-action sidebar-button ">Kategorie</a>
          <a href="more-groups-logged.html" class="list-group-item list-group-item-action sidebar-button">Grupy</a>
          <a href="more-events-logged.html" class="list-group-item list-group-item-action sidebar-button">Wydarzenia</a>
        </div>
            </div>

            <div class="col-md-10 ">
              <div class="row">
              <div class="col-md-10 offset-md-1  header ">
                <h1>Kategorie Zainteresowań</h1>
              </div>
            </div>
            <div class="row">
              <div class="col-md-10 offset-md-1 content" >
                <div class="row interest-content">
                  <div class="col-md-4">
                  <a href="cooking.html"><img src="./images/gotowanie.jpg" class="image-responsive img-margin" alt="image-responsive" /></a>
                  </div>
                  <div class="col-md-4">
                    <a href="sport.html"><img src="./images/sport.jpg" class="image-responsive img-margin " alt="image-responsive" /></a>

                  </div>
                  <div class="col-md-4">
                    <img src="./images/motoryzacja.jpg" class="image-responsive img-margin " alt="image-responsive" />
                  </div>
                </div>
                <div class="row interest-content">
                  <div class="col-md-4">
                    <img src="./images/muzyka.jpg" class="image-responsive img-margin" alt="image-responsive" />
                  </div>
                  <div class="col-md-4">
                  <img src="./images/moda2.jpg" class="image-responsive img-margin " alt="image-responsive" />
                  </div>
                  <div class="col-md-4">
                    <img src="./images/sztuka.jpg" class="image-responsive img-margin " alt="image-responsive" />
                  </div>
                </div>
              <div class="row interest-content">
                <div class="col-md-4 offset-md-9">
                <a href="more-category-logged.html"><button type="button" class="btn btn-secondary more-btn" >Zobacz więcej</button></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-10 offset-md-2">
          <div class="row">
          <div class="col-md-10 offset-md-1  header ">
            <h1>Najpopularniejsze grupy</h1>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10 offset-md-1 content ">
            <div class="col-md-10 offset-md-1  group-content ">
              <div class= "row">
                <div class="col-md-4">
                  <img src="./images/motocykle.jpg" alt="img" class="image-responsive  img-margin" />
                </div>
                <div class="col-md-6 offset-md-1 group-description" >
                 <h3> Motocykle </h3>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                   do eiusmod tempor incididunt ut labore et dolore magna aliqua
                    Ut enim ad minim veniam, quis nostrud</p>
                <button type="button" class="btn  details-btn">Szczegóły</button>
              </div>
              </div>
            </div>
            <div class="col-md-10 offset-md-1 group-content ">
              <div class= "row">
                <div class="col-md-4">
                  <img src="./images/nozna.jpg" alt="img" class="image-responsive  img-margin" />
                </div>
                <div class="col-md-6 offset-md-1 group-description" >
                 <h3> Piłka Nożna </h3>
                 <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                   do eiusmod tempor incididunt ut labore et dolore magna aliqua
                    Ut enim ad minim veniam, quis nostrud</p>
                <button type="button" class="btn details-btn">Szczegóły</button>
              </div>
              </div>
            </div>
            <div class="row interest-content">
              <div class="col-md-4 offset-md-8">
                <a href="more-groups-logged.html"> <button type="button" class="btn btn-secondary more-btn">Zobacz więcej</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>




        <div class="row">
          <div class="col-md-10 offset-md-2">
            <div class="row">
            <div class="col-md-10 offset-md-1  header ">
              <h1>Nadchodzące wydarzenia</h1>
            </div>
          </div>
          <div class="row">
            <div class="col-md-10 offset-md-1 content ">
              <div class="col-md-10 offset-md-1 group-content">
                <div class= "row">
                  <div class="col-md-4">
                    <img src="./images/rower.jpg" alt="img" class="image-responsive  img-margin"/>
                  </div>
                  <div class="col-md-6 offset-md-1 group-description" >
                   <h3> 100 km na towerze </h3>
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
                    <img src="./images/mecz.jpg" alt="img" class="image-responsive  img-margin" />
                  </div>
                  <div class="col-md-6 offset-md-1 group-description" >
                   <h3> Mecz STOMIL OLSZTYN  </h3>
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
              <a href="more-events-logged.html"><button type="button" class="btn btn-secondary more-btn">Zobacz więcej</button></a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      </section>
    );

      const guestContent = (

    <section class="container ">
      <div class="row">
        <div class="col-md-8 offset-md-2  header ">
          <h1>Kategorie Zainteresowań</h1>
        </div>
        <div class="col-md-8 offset-md-2 content" >
          <div class="row interest-content">
            <div class="col-md-4">
          <a href="cooking.html"><img src="./images/gotowanie.jpg" class="image-responsive img-margin" alt="image-responsive"/></a>
            </div>
            <div class="col-md-4">
              <a href="sport.html"><img src="./images/sport.jpg" class="image-responsive img-margin " alt="image-responsive"/></a>
            </div>
            <div class="col-md-4">
              <img src="./images/motoryzacja.jpg" class="image-responsive img-margin " alt="image-responsive"/>
            </div>
          </div>
          <div class="row interest-content">
            <div class="col-md-4">
              <img src="./images/muzyka.jpg" class="image-responsive img-margin" alt="image-responsive"/>
            </div>
            <div class="col-md-4">
            <img src="./images/moda2.jpg" class="image-responsive img-margin " alt="image-responsive"/>
            </div>
            <div class="col-md-4">
              <img src="./images/sztuka.jpg" class="image-responsive img-margin " alt="image-responsive"/>
            </div>
          </div>
        <div class="row interest-content">
          <div class="col-md-4 offset-md-9">
            <button type="button" class="btn btn-secondary more-btn">Zobacz więcej</button>

          </div>
        </div>
      </div>
    </div>

      <div class="row">
        <div class="col-md-8 offset-md-2 header ">
          <h1>Najpopularniejsze grupy</h1>
        </div>
        <div class="col-md-8 offset-md-2 content ">
          <div class="col-md-10 offset-md-1  group-content ">
            <div class= "row">
              <div class="col-md-4">
                <img src="./images/motocykle.jpg" alt="img" class="image-responsive  img-margin"/>
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
                <img src="./images/nozna.jpg" alt="img" class="image-responsive  img-margin"/>
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

  <div class="row">
    <div class="col-md-8 offset-md-2 header ">
      <h1>Nadchodzące wydarzenia</h1>
    </div>
    <div class="col-md-8 offset-md-2 content ">
      <div class="col-md-10 offset-md-1 group-content ">
        <div class= "row">
          <div class="col-md-4">
            <img src="./images/rower.jpg" alt="img" class="image-responsive  img-margin"/>
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
            <img src="./images/mecz.jpg" alt="img" class="image-responsive  img-margin"/>
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
  </section>
);

       return (
         <div>
           { loggedIn ? userContent : guestContent}

         </div>
     );
   }
}

function mapStateToProps(state) {
    const { loggedUser, users, authentication } = state;
    const { loggedIn } = state.authentication;
    const { user } = authentication;
    return {
        user,
        users,
        loggedUser,
        loggedIn
    };
}
/*
const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: dispatch(userActions.getAll()),
    getUserById: userId => dispatch(userActions.getUser(userId))
  };
};
*/
const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
