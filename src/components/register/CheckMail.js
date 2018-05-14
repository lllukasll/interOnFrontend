import React from 'react';
import { Link } from 'react-router-dom';

class CheckMail extends React.Component {
  render() {
    return (
        <section className="container">
            <div className="row ">
                <div className="col-md-8 offset-md-2  header ">
                    <h1>Teraz musisz aktywować swoje konto!</h1>
                </div>
                <div className="col-md-8 offset-md-2 content check-mail-content" >
                    <div className="check-mail-content-text">Kliknij w link, który Ci właśnie przesłaliśmy. Sprawdź skrzynkę email, jeśli nie możesz znaleźć naszego e-maila sprawdź folder Spam</div>
                    <hr />
                    <div className="check-mail-content-link">Wróć na <Link to={"/"} className="check-mail-content-link-l">stronę główną</Link></div>
                </div>
                
            </div>

        </section>
    );
  }
}

export default CheckMail;
