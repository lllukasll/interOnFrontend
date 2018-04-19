import React from 'react';

class GuestContent extends React.Component {
  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="login"><button type="button" className="btn btn-secondary">Zaloguj się</button></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="register"><button type="button" className="btn btn-secondary">Zarejestruj się</button></a>
        </li>
      </ul>
      <form className="form-inline my-2 my-lg-0 " >
        <input type="text" className="form-control" placeholder="Wyszukaj" aria-label="" aria-describedby="basic-addon1" />
        <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
      </div>
    );
  }
}

export default GuestContent;
