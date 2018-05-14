import React from 'react';

class LoggedInterests extends React.Component {
  render() {
       return (
         <div className="col-md-10 ">

           <div >
             <div className="row">
             <div className="col-md-10 offset-md-1  header ">
               <h1>Kategorie Zainteresowań</h1>
             </div>
           </div>

           <div className="row">
            <div className="col-md-10 offset-md-1 content" >

              <div className="row interest-content">
                <div className="col-md-4">
                  <a href="cooking.html"><img src="./images/gotowanie.jpg" className="image-responsive img-margin" alt="gotowanie" /></a>
                </div>
                <div className="col-md-4">
                  <a href="sport.html"><img src="./images/sport.jpg" className="image-responsive img-margin " alt="sport" /></a>
                </div>
                <div className="col-md-4">
                  <img src="./images/motoryzacja.jpg" className="image-responsive img-margin " alt="motoryzacja" />
                </div>
              </div>

              <div className="row interest-content">
                <div className="col-md-4">
                  <img src="./images/muzyka.jpg" className="image-responsive img-margin" alt="muzyka" />
                </div>
                <div className="col-md-4">
                  <img src="./images/moda2.jpg" className="image-responsive img-margin " alt="moda" />
                </div>
                <div className="col-md-4">
                  <img src="./images/sztuka.jpg" className="image-responsive img-margin " alt="sztuka" />
                </div>
              </div>

              <div className="row interest-content">
                <div className="col-md-4 offset-md-9">
                  <a href="more-category-logged.html"><button type="button" className="btn btn-secondary more-btn" >Zobacz więcej</button></a>
                </div>
              </div>

            </div>
           </div>

         </div>
         </div>
     );
   }
}

export default LoggedInterests;
