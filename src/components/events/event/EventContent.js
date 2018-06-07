import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import MapContainer from '../../map/MapContainer';
import { config } from '../../../helpers';

const EventContent = props => (
    <div className="col-md-9 content profile-changes">
        <div className="row">
            <div className="col-md-12">
                <h1>{props.title}</h1>
                <p id="group-name">{props.date}, {props.address}
                <i className="fas fa-map-marker" onClick={props.changeMapState}></i></p>
                <Modal 
                    open={props.mapState} 
                    onClose={props.changeMapState} 
                    center>
                    <div style={{width: '400px', height: '400px'}}>
                        <MapContainer 
                            lat={props.latitude} 
                            lng={props.longitude} 
                            width={'400px'} 
                            height={'400px'}/>
                    </div>
                </Modal>
                <hr />
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 ">
                <img alt="mecz" src={config.apiUrl + "/api/photo/" + props.photoUrl} className="group-photo" />
            </div>
            <div className="col-md-7 ">
                <div className="row">
                    <div className="col-md-12 members-a ">
                        <p> {props.content} </p>
                        <a href="tmp"><span className="members" id="modalBtn"> Bierze udział: {props.numberOfPeople} osób </span></a>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <span><Link to={"/userProfile/" + props.adminId} >administrator</Link> </span>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
        <div className="row" >
            <div className="col-md-3 offset-md-9 ">
                <div className="btn-group dropright">
                    <button type="button" className="btn btn-secondary dropdown-toggle" id="dropRightExit" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-sign-out-alt"></i>
                    </button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={props.leaveGroup}>Opuść wydarzenie</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default EventContent;