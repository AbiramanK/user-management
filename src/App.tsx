import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap';
import { getUserFetch, addUserFetch, updateUserFetch, removeUserFetch } from "./api";
import colors from "./colors";

export interface IAppProps {
}

export const App = (props: IAppProps) => {

    const [users, setUsers] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [region, setRegion] = useState("");
    const [country, setCountry] = useState("");
    const [message, setMessage] = useState("");
    const [updateState, setUpdateState] = useState("add");

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        try {
            let mounted = true;
            let res: any = await getUserFetch();
            if (res.statusText === "OK") {
                let data: any = res.data;

                if (!!data.success) {
                    if (mounted) {
                        setUsers(data.data);
                    }
                } else {
                    alert(data.message);
                }
            } else {
                alert("Somthing went wrong!")
            }

            return () => mounted = false;
        } catch (error: any) {
            alert(error.message);
        }
    }

    const editUser = (user: any) => {
        setUpdateState("edit");

        setId(user._id);
        setName(user.name);
        setMobileNumber(user.mobileNumber);
        setEmail(user.email);
        setAddress(user.address);
        setRegion(user.region);
        setCountry(user.country);
        setMessage(user.message);

        handleShow();
    }

    const createuser = () => {
        emptyState();
        setUpdateState("add");
        handleShow();
    }

    const deleteUser = async (user: any) => {

        const res: any = await removeUserFetch(user._id);

        if (res.statusText === "OK") {
            let data: any = res.data;

            if (!!data.success) {
                alert("User removed successfully")
                handleClose();
            } else {
                alert(data.message);
            }
        } else {
            alert("Somthing went wrong!")
        }
    }

    const addUser = () => {
        if (name.trim() !== '' && mobileNumber && email.trim() !== '' && address.trim() !== '' &&
            region.trim() !== '' && country.trim() !== '' && message.trim() !== '') {
            const res: any = addUserFetch({
                name,
                mobileNumber,
                email,
                address,
                region,
                country,
                message
            })

            if (res.statusText === "OK") {
                let data: any = res.data;

                if (!!data.success) {
                    alert("User added successfully")
                    handleClose();
                } else {
                    alert(data.message);
                }
            } else {
                alert("Somthing went wrong!")
            }
        } else {
            alert("Please fill all details");
        }
    }

    const updateUser = () => {
        if (id.trim() !== '' && name.trim() !== '' && mobileNumber && email.trim() !== '' &&
            address.trim() !== '' && region.trim() !== '' && country.trim() !== '' && message.trim() !== '') {
            const res: any = updateUserFetch({
                _id: id,
                name,
                mobileNumber,
                email,
                address,
                region,
                country,
                message
            })

            if (res.statusText === "OK") {
                let data: any = res.data;

                if (!!data.success) {
                    alert("User updated successfully")
                    handleClose();
                } else {
                    alert(data.message);
                }
            } else {
                alert("Somthing went wrong!")
            }
        } else {
            alert("Please fill all details");
        }
    }

    const emptyState = () => {
        setName("");
        setMobileNumber("");
        setEmail("");
        setAddress("");
        setRegion("");
        setCountry("");
        setMessage("");
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => setShow(true);

    const saveUser = () => {
        if (updateState === "add") {
            addUser()
        }

        if (updateState === "edit") {
            updateUser()
        }
    }

    return (
        <div className="table-responsive">
            <Button variant="primary" className="m-2" onClick={createuser}>
                Add User
            </Button>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" hidden>Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile Number</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Region</th>
                        <th scope="col">Country</th>
                        <th scope="col">Message</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <th hidden>{user._id}</th>
                                <td>{user.name}</td>
                                <td>{user.mobileNumber}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td>{user.region}</td>
                                <td>{user.country}</td>
                                <td>{user.message}</td>
                                <td>
                                    <FontAwesomeIcon style={{ cursor: 'pointer' }} icon={faEdit} onClick={() => editUser(user)} />
                                    <FontAwesomeIcon style={{ cursor: 'pointer', marginLeft: 20 }} icon={faTrash} color={colors.RED} onClick={() => deleteUser(user)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Mobile Number</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Mobile Number"
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Region</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Region"
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Country</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Message</td>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveUser}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default App;
