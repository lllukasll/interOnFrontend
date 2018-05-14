import React from 'react';

class LoggedPopularGroups extends React.Component {
  render() {
       return (
         <div className="row">
      <div className="col-md-10 offset-md-2">
      <div className="row">
      <div className="col-md-10 offset-md-1  header ">
        <h1>Najpopularniejsze grupy</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-md-10 offset-md-1 content ">
        <div className="col-md-10 offset-md-1  group-content ">
          <div className= "row">
            <div className="col-md-4">
              <img src="/images/motocykle.jpg" alt="img" className="image-responsive  img-margin" />
            </div>
            <div className="col-md-6 offset-md-1 group-description" >
             <h3> Motocykle </h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
               do eiusmod tempor incididunt ut labore et dolore magna aliqua
                Ut enim ad minim veniam, quis nostrud</p>
            <button type="button" className="btn  details-btn">Szczegóły</button>
          </div>
          </div>
        </div>
        <div className="col-md-10 offset-md-1 group-content ">
          <div className= "row">
            <div className="col-md-4">
              <img src="/images/nozna.jpg" alt="img" className="image-responsive  img-margin" />
            </div>
            <div className="col-md-6 offset-md-1 group-description" >
             <h3> Piłka Nożna </h3>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
               do eiusmod tempor incididunt ut labore et dolore magna aliqua
                Ut enim ad minim veniam, quis nostrud</p>
            <button type="button" className="btn details-btn">Szczegóły</button>
          </div>
          </div>
        </div>
        <div className="row interest-content">
          <div className="col-md-4 offset-md-8">
            <a href="more-groups-logged.html"> <button type="button" className="btn btn-secondary more-btn">Zobacz więcej</button></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
     );
   }
}

export default LoggedPopularGroups;
