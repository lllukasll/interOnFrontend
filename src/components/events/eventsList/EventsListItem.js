import React from 'react';
import { Link } from 'react-router-dom';

const EventsListItem = props => (
    <div className="col-md-10 offset-md-1 group-content ">
        <div className= "row">
            <div className="col-md-4">
                <img style={{width: '180px', height: '180px'}} src={props.photoUrl} alt={props.photoAlt} className="image-responsive  img-margin" />
            </div>
            <div className="col-md-6 offset-md-1 group-description" >
                <h3> {props.title} </h3>
                <h6 className="date"> {props.date} </h6>
                <p>{props.content}</p>
                <Link to={"/event/" + props.eventId} className="btn btn-secondary details-btn">Szczegóły</Link>
            </div>
        </div>
    </div>
);

export default EventsListItem;