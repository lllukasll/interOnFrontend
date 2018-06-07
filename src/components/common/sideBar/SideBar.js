import React from 'react';
import { Link } from 'react-router-dom';

class SideBar extends React.Component {
  render() {
    return(
      <div className="col-md-2 sidebar content-sidebar ">
        <div className="list-group">
          <Link to="../myGroups" className="list-group-item list-group-item-action sidebar-button">Moje grupy</Link>
          <a href="my-groups.html" className="list-group-item list-group-item-action sidebar-button">Moje Wydarzenia</a>
          <Link to="../friends" className="list-group-item list-group-item-action sidebar-button">Znajomi</Link>
          <a href="my-groups.html" className="list-group-item list-group-item-action sidebar-button">Wiadomości</a>
          <div className="lines"> </div>
          <Link to="/mainCategories" className="list-group-item list-group-item-action sidebar-button ">Kategorie</Link>
          <Link to="/groups" className="list-group-item list-group-item-action sidebar-button ">Grupy</Link>
          <Link to="/events" className="list-group-item list-group-item-action sidebar-button">Wydarzenia</Link>
        </div>
      </div>
    );
  }
}

export default SideBar;
