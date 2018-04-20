import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../common/sideBar/SideBar';
import { ProfileInfo } from './profileInfo/ProfileInfo';

class MyProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true
    };
  }

  render() {
    return (
        <section className="container">
            <div className="row ">
                <SideBar />
                <ProfileInfo />
            </div>
        </section>
    );
  }
}

function mapStateToProps(state, ownProps) {
    return {
    };
}

const connectedMyProfile = connect(mapStateToProps)(MyProfile);
export { connectedMyProfile as MyProfile };
