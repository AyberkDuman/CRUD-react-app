import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Users';


class Home extends Component {

    state = {
        name: "",
        surname: "",
        phoneNumber: ""
    };

    componentWillMount() {
        this.props.requestUsers();
    }

    addUser() {
        const user = { name: this.state.name, surname: this.state.surname, phoneNumber: this.state.phoneNumber };
        this.props.addUser(user);
        this.props.requestUsers();
    }


    render() {
        const { name, surname, phoneNumber } = this.state;
        const enabled =
            name.length > 0 &&
            surname.length > 0 &&
            phoneNumber.length > 0;

        return (
            <div>
                <h1>User Table</h1>
                {renderUsersTable(this.props)}

                <table>
                    <tr>
                        <td>
                            Name:
                        </td>
                        <td>
                            <input id="userName" type="text" value={this.state.name} onChange={(ev) => this.setState({ name: ev.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Surname:
                        </td>
                        <td>
                            <input id="userSurname" type="text" value={this.state.surname} onChange={(ev) => this.setState({ surname: ev.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Phone Number:
                        </td>
                        <td>
                            <input id="userPhone" type="number" value={this.state.phoneNumber} onChange={(ev) => this.setState({ phoneNumber: ev.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button disabled={!enabled} onClick={this.addUser.bind(this)}>Add</button>
                        </td>
                    </tr>

                    <nav>
                        <ul class="pagination">
                            <li class="page-item disabled">
                                <span class="page-link">Previous</span>
                            </li>
                            <li class="page-item active">
                                <span class="page-link">
                                    1<span class="sr-only">(current)</span>
                                </span>
                            </li>

                            <li class="page-item"><a class="page-link" href="#">2</a></li> 
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#">Next</a>
                            </li>
                        </ul>
                    </nav>


                </table>
            </div>
        );
    }

}

function renderUsersTable(props) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {props.users.map(user =>
                    <tr key={user.name}>
                        <td>{user.name}</td>
                        <td>{user.surname}</td>
                        <td>{user.phoneNumber}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default connect(
    state => state.users,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
