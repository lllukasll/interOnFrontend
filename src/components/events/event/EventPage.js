import React from 'react';
import Sidebar from '../../common/sideBar/SideBar.js'
import EventContent from './EventContent.js'
import { eventActions, postActions } from '../../../actions'
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';
import MapContainer from '../../map/MapContainer';

class Event extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            isLoading: true,
            openMap: false
        }
    }
    componentDidMount(){
        this.setState({isLoading: true})
        this.props.dispatch(eventActions.getOne(this.props.id));
        this.setState({isLoading: false})
    }

    getMyDateFormat(data){
        var date = new Date(data);
        var dateTime = date.toLocaleDateString();
        return dateTime;
    }

    changeMapState = () => { this.setState({ openMap: !this.state.openMap }) };

    joinEvent(){

    }

    leaveEvent(){

    }

    handleChange(event) {
        event.preventDefault();

        this.setState({
        [event.target.name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
        if(validation.isValid) {
            var post = {
                content: this.state.postContent,
                eventId: this.props.id
            }
            const { dispatch } = this.props;
            dispatch(postActions.addGroupPost(post));
        }

    }

    isUserInGroup(users, userId) {
        this.setState({userInGroup:false});
        return new Promise((resolve, reject) => {
        users.forEach((element) => {
        if(element.id === userId)
        {
            this.setState({userInGroup:true});
            resolve();
        }
        });
        });
    }

    checkIfAdmin(adminId, userId) {
        this.setState({isAdmin: false});
        return new Promise((resolve, reject) => {
        if(adminId === userId)
        {
            this.setState({isAdmin: true})
            resolve();
        } else {
            this.setState({isAdmin: false})
            resolve();
        }
        });
    }


    renderSpiner(){
        return(
            <div className="spinner-field"><img alt="loading" src="/images/spinner2.gif" /></div>
        );
    }

    renderContent(event){
        console.log(event)
        return(
            <EventContent 
                title={event.name}
                address={event.addressDto.address}
                mapState={this.state.openMap}
                longitude={event.addressDto.longitude}
                latitude={event.addressDto.latitude}
                photoUrl={event.photoUrl}
                date={this.getMyDateFormat(event.dateTimeEvent)}
                content={event.description}
                numberOfPeople={"123"}
                adminId={6026}
                joinEvent={this.joinEvent}
                leaveEvent={this.leaveEvent}
                changeMapState={this.changeMapState}
            />
        );
    }

    render(){
        const { events } = this.props;

        if(this.state.isLoading){
            return(
                this.renderSpiner()
            )
        }

        return(
            <div className="container">
                <div className="row">
                    <Sidebar />
                    {events && events.loadingOne ? (this.renderSpiner()) : 
                    (
                        this.renderContent(events.event)
                    )}
                    
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const { events } = state;
    return {
        events,
        id: ownProps.match.params.id
    };
}

export default connect(mapStateToProps)(Event);