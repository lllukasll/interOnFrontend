import React from 'react';
import EventsListItem from './EventsListItem.js'
import Sidebar from '../../common/sideBar/SideBar.js'
import { eventActions } from '../../../actions'
import { connect } from 'react-redux';

class EventsList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            isLoading: true
        }
    }

    componentDidMount(){
        this.setState({isLoading: true})
        this.props.dispatch(eventActions.getAll());
        this.setState({isLoading: false})
    }

    renderSpiner(){
        return(
            <div className="spinner-field"><img alt="loading" src="/images/spinner2.gif" /></div>
        );
    }
    
    renderContent(events){
        return(
            <div>
                {events.map((event, index) => 
                    <EventsListItem key={event.id}
                        eventId={event.id}
                        content={event.description} 
                        date={event.dateTimeEvent} 
                        title={event.name} 
                        photoUrl={"/images/rower.jpg"} 
                        photoAlt={"rower"}
                    />
                )}
            </div>
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
                    <div className="col-md-10 ">
                        <div className="row">
                            <div className="col-md-10 offset-md-1  header ">
                                <h1>Nadchodzące wydarzenia</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-10 offset-md-1 content ">
                                {events && events.loading ? (this.renderSpiner()) : (this.renderContent(events.events))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { events } = state;
    return {
        events
    };
}

export default connect(mapStateToProps)(EventsList);