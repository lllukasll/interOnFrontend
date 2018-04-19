import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SideBar extends React.Component {
  render() {
    return(
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
    );
  }
}

export default SideBar;
