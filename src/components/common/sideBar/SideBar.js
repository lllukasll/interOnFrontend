import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SideBar extends React.Component {
  render() {
    return(
      <div className="col-md-2 sidebar content-sidebar ">
        <div className="list-group">
          <a href="my-groups.html" className="list-group-item list-group-item-action sidebar-button">Moje grupy</a>
          <a href="#" className="list-group-item list-group-item-action sidebar-button">Moje Wydarzenia</a>
          <a href="#" className="list-group-item list-group-item-action sidebar-button">Znajomi</a>
          <a href="#" className="list-group-item list-group-item-action sidebar-button">Wiadomości</a>
          <div className="lines"> </div>
          <Link to="/mainCategories" className="list-group-item list-group-item-action sidebar-button ">Kategorie</Link>
          <Link to="/groups" className="list-group-item list-group-item-action sidebar-button ">Grupy</Link>
          <a href="more-events-logged.html" className="list-group-item list-group-item-action sidebar-button">Wydarzenia</a>
        </div>
      </div>
    );
  }
}

export default SideBar;
