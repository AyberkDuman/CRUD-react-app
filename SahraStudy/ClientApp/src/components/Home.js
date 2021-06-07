import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/Users';

class Home extends Component {

    state = {
        id: "",
        name: "",
        surname: "",
        phoneNumber: "",
        editing: ""
    };

    componentWillMount() {
        this.props.requestUsers();
    }

    addUser() {
        const user = { id: this.state.id, name: this.state.name, surname: this.state.surname, phoneNumber: this.state.phoneNumber };
        this.props.addUser(user);
        setTimeout(this.props.requestUsers ,600);
    }

    toggleEditing(itemId) {
        this.setState({ editing: itemId });
    }

    handleUserUpdate(user) {
        this.props.updateUser(user);
        setTimeout(this.props.requestUsers, 600);
    }

    handleUserDelete(user) {
        this.props.deleteUser(user);
        setTimeout(this.props.requestUsers, 500);
    }

    handleEditField(event) {
        if (event.keyCode === 13) {
            let target = event.target,
                update = {};

            update.id = this.state.editing;
            update[target.id] = target.value;
        }
    }

    handleEditItem() {
        let itemId = this.state.editing;

        var editUser = this.props.users.find((v) => v.id === itemId);

        editUser.name = this.refs[`name_${itemId}`].value;
        editUser.surname = this.refs[`surname_${itemId}`].value;
        editUser.phoneNumber = this.refs[`phoneNumber_${itemId}`].value;

        this.handleUserUpdate(editUser);
        this.setState({ editing: "" });
    }

    handleDeleteItem() {
        let itemId = this.state.editing;

        var removeUser = this.props.users.find((v) => v.id === itemId);

        this.handleUserDelete(removeUser);
        this.setState({ editing: "" });
    }


    renderItemOrEditField(user) {
        if (this.state.editing === user.id) {
            return (
                <tr key={user.id}>
                <td>{user.id}</td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`name_${user.id}`}
                            name="name"
                            defaultValue={user.name}
                        />
                    </td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`surname_${user.id}`}
                            name="surname"
                            defaultValue={user.surname}
                        />
                    </td>
                    <td>
                        <input
                            onKeyDown={this.handleEditField}
                            type="text"
                            ref={`phoneNumber_${user.id}`}
                            name="phoneNumber"
                            defaultValue={user.phoneNumber}
                        />
                    </td>
                    <td>
                        <button onClick={this.handleEditItem.bind(this)} label="Update User" >Update</button>
                    </td>
                    <td>
                        <button onClick={this.handleDeleteItem.bind(this)} label="Delete User" >Delete</button>
                    </td>
                </tr>);
        } else {
            return (
                <tr key={user.id}
                    onClick={this.toggleEditing.bind(this, user.id)}
                >
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.surname}</td>
                    <td>{user.phoneNumber}</td>
                    <td></td>
                </tr>);
        }
    }

    renderUsersTable(props) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users.map(user =>
                        this.renderItemOrEditField(user)
                    )}
                </tbody>
            </table>
        );
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
                {this.renderUsersTable(this.props)}

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
                            <input id="userPhone" type="text" value={this.state.phoneNumber} onChange={(ev) => this.setState({ phoneNumber: ev.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button disabled={!enabled} onClick={this.addUser.bind(this)}>Add</button>
                        </td>
                    </tr>
                </table>


                <nav>
                    <ul className="pagination">
                        <li className="page-item disabled">
                            <span className="page-link">Previous</span>
                        </li>
                        <li className="page-item active">
                            <span className="page-link">
                                1<span className="sr-only">(current)</span>
                            </span>
                        </li>

                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>
                </nav>


            </div>
        );
    }

}

export default connect(
    state => state.users,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
