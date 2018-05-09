import React from 'react';
import { connect } from 'react-redux';
import SideBar from '../../../common/sideBar/SideBar';
import { userActions } from '../../../../actions';
import { alertActions } from '../../../../actions';

class ChangeAvatar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <section className="container margin-top main">
            <div className="row ">
                <SideBar />
                <div class="col-md-9 content profile-changes ">
                    <h1> Edytuj Avatar </h1>
                        <hr />
                    <div class="row profile-changes">
                        <div class="col-md-4">
                            <img src="./image/changeAv.jpg" class="new-avatar" />
                        </div>
                        <div class="col-md-8 ">
                            <div id="avatar-file-div">
                            <form>
                            <label for="file" class="file-label">
                                <i class="fas fa-upload"></i>
                            <span id="file-span">  Wybierz Zdjęcie z Dysku </span>
                                </label>
                                <input type="file" id="file"/>

                                <button type="button" class="btn btn-secondary">Zapisz</button>
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



