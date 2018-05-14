import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../../../common/sideBar/SideBar';

class ChangeAvatar extends React.Component {
  render() {
    return (
        <section className="container margin-top main">
            <div className="row ">
                <SideBar />
                <div className="col-md-9 content profile-changes ">
                    <h1> Edytuj Avatar </h1>
                        <hr />
                    <div className="row profile-changes">
                        <div className="col-md-4">
                            <img alt="avatar" src="./image/changeAv.jpg" className="new-avatar" />
                        </div>
                        <div className="col-md-8 ">
                            <div id="avatar-file-div">
                            <form>
                            <label for="file" className="file-label">
                                <i className="fas fa-upload"></i>
                            <span id="file-span">  Wybierz Zdjęcie z Dysku </span>
                                </label>
                                <input type="file" id="file"/>

                                <button type="button" className="btn btn-secondary">Zapisz</button>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
  }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedChangeAvatar = connect(mapStateToProps)(ChangeAvatar);
export { connectedChangeAvatar as ChangeAvatar };



