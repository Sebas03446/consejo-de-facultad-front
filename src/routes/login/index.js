import React, {Component} from 'react';
import Modal from "react-bootstrap/lib/Modal";
import {ToastNotification} from '../../components/notification/ToastNotification';
import {errorMsg, successMsg, warnMsg} from '../../components/notification/ToastNotification';
import axios from 'axios';
import api from '../../api'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: {
                email: '',
                password: '',
            },
            registration: {
                email: '',
                password: '',
                name: '',
                academic_degree: '',
            },
            openDlgFlg: false
        }
    }

    login = (e) => {
        e.preventDefault();
        let self = this;
        api.post('https://hammerhead-app-f4vnv.ondigitalocean.app/api/auth/', self.state.login)
            .then(function (response) {
                //---set Authorization header ---
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
                //token store in session storage
                sessionStorage.setItem('token', response.data.token);
                self.props.history.push('/');
            })
            .catch(function (error) {
                errorMsg('Invalid Credentials! Please Enter Valid Credentials.');
                console.log("login error response :: ", error);
            });
    };

    userRegistration = (e) => {
        console.log(this.state.registration);
        e.preventDefault();
        let self = this;
        api.post('https://hammerhead-app-f4vnv.ondigitalocean.app/api/auth/new', self.state.registration)
            .then(function (response) {
                console.log('user registration success response :: ', response);
                successMsg('User Registration Successful.');
                self.setEmptyRegistrationState();
                self.handleDlgClose();
            })
            .catch(function (error) {
                console.log("user registration error response  :: ", error.response);
                if (error.response.status === 302)
                    warnMsg('Email Already exists. Please try again.');
                else
                    errorMsg('User Registration Failed!')
            });
    };

    setEmptyRegistrationState() {
        const {registration} = this.state;
        registration.email = '';
        registration.password = '';
        registration.name = '';
        registration.academic_degree = '';
        this.setState({registration});
    }

    // --------- Dialog open/close--------
    handleDlgClose() {
        this.setState({openDlgFlg: false});
    };

    handleDlgShow() {
        this.setState({openDlgFlg: true});
    };


    render() {
        const {login, registration, openDlgFlg} = this.state;
        return (
            <div className="login-container">
                <div className="starter-template">

                    <form className="form-horizontal" onSubmit={this.login}>
                        <div className="form-group">
                            <div className="col-sm-offset-5 col-sm-7">
                                <h3>Login</h3>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">Email </label>

                            <div className="col-sm-8">
                                <input type="email" className="form-control" id="email" name="email"
                                       placeholder="Email"
                                       value={login.email}
                                       onChange={(e) => this.setState({
                                           login: {
                                               ...login,
                                               email: e.target.value
                                           }
                                       })}
                                       required="true"/>
                            </div>
                        </div>


                        <div className="form-group">
                            <label className="col-sm-3 control-label">Contraseña</label>

                            <div className="col-sm-8">
                                <input type="password" className="form-control" id="password" name="password"
                                       value={login.password}
                                       onChange={(e) => this.setState({
                                           login: {
                                               ...login,
                                               password: e.target.value
                                           }
                                       })}
                                       placeholder="Contraseña"
                                       required="true"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-5 col-sm-7">
                                <button type="submit" className="btn btn-primary">Continuar</button>
                            </div>
                        </div>
                    </form>
                    <div className="form-group req-link">
                        <a href="#" onClick={() => this.handleDlgShow()}>Registrate aquí</a>
                    </div>
                </div>

                <Modal
                    show={openDlgFlg}
                    onHide={() => this.handleDlgClose()}
                    aria-labelledby="ModalHeader"
                >
                    <form onSubmit={this.userRegistration}>
                        <Modal.Header closeButton>
                            <Modal.Title id='ModalHeader'>Registro de Nuevo Usuario</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="form-horizontal" onSubmit={this.userRegistration}>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label-2">Email </label>

                                    <div className="col-sm-8">
                                        <input type="email" className="form-control" id="email" name="email"
                                               placeholder="Email"
                                               maxLength="50"
                                               value={registration.email}
                                               onChange={(e) => this.setState({
                                                   registration: {
                                                       ...registration,
                                                       email: e.target.value
                                                   }
                                               })}
                                               
                                               required="true"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-3 control-label-2">Contraseña</label>

                                    <div className="col-sm-8">
                                        <input type="password" className="form-control" id="password" name="password"
                                               value={registration.password}
                                               maxLength="50"
                                               onChange={(e) => this.setState({
                                                   registration: {
                                                       ...registration,
                                                       password: e.target.value
                                                   }
                                               })}
                                               placeholder="Ingresa tu contraseña"
                                               required="true"/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-3 control-label-2">Nombre</label>

                                    <div className="col-sm-8">
                                        {/* <select className="form-control" required="true"
                                                value={registration.name}
                                                onChange={(e) => this.setState({
                                                    registration: {
                                                        ...registration,
                                                        roles: e.target.value
                                                    }
                                                })}
                                                name="roles" id="roles">
                                            <option value=''>Select User Role</option>
                                            <option value='ADMIN'>ADMIN</option>
                                        </select> */}
                                        <input type="text" className="form-control" id="name" name="name"
                                               value={registration.name}
                                               maxLength="50"
                                               onChange={(e) => this.setState({
                                                   registration: {
                                                       ...registration,
                                                       name: e.target.value
                                                   }
                                               })}
                                               placeholder="Ingresa tu nombre"
                                               required="true"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 control-label-2">Programa Académico</label>

                                    <div className="col-sm-8">
                                        <select className="form-control-2" required="true"
                                                value={registration.academic_degree}
                                                onChange={(e) => this.setState({
                                                    registration: {
                                                        ...registration,
                                                        academic_degree: e.target.value
                                                    }
                                                })}
                                                name="academic_degree" id="academic_degree">
                                            <option value='Ingeniería Agrícola'>Ingeniería Agrícola</option>
                                            <option value='Ingeniería Civil'>Ingeniería Civil</option>
                                            <option value='Ingeniería de Sistemas y Computación'>Ingeniería de Sistemas y Computación</option>
                                            <option value='Ingeniería Electrónica'>Ingeniería Electrónica</option>
                                            <option value='Ingeniería Industrial'>Ingeniería Industrial</option>
                                            <option value='Ingeniería Eléctrica'>Ingeniería Eléctrica</option>
                                            <option value='Ingeniería Mecatrónica'>Ingeniería Mecatrónica</option>
                                            <option value='Ingeniería Química'>Ingeniería Química</option>
                                            <option value='Ingeniería Mecánica'>Ingeniería Mecánica</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className='btn btn-secondary' type="button" onClick={() => this.handleDlgClose()}>
                                Cancel
                            </button>
                            <button className='btn btn-secondary' type="submit">
                                Registration
                            </button>
                        </Modal.Footer>
                    </form>
                </Modal>
                <ToastNotification/>
            </div>
        )
    };
}

export default Login;
