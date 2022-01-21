import React, {useState, useEffect} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ReactPaginate from 'react-paginate'
import { getCustomer } from '../../services/customerAPI'
import { editCustomer } from '../../services/editCustomerAPI'
import { deleteCustomer } from '../../services/deleteCustomerAPI'
import { insertCustomer } from '../../services/insertCustomerAPI'
import './styles/order.css'

export default function Order() {
    const [postsPerPage] = useState(5);
    const [offset, setOffset] = useState(1);
    const [customers, setAllCustomer] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [idCustomer, setIdCustomer] = useState('')
    const [nameCustomer, setNameCustomer] = useState('')
    const [detailCustomer, setDetailCustomer] = useState('')
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [showEditModal, setEditModal] = useState(false) 
    const [showDeleteModal, setDeleteModal] = useState(false)
    const [editedName, setEditedName] = useState('')
    const [editedDetail, setEditedDetail] = useState('')
    const [showInsertCustomerModal, setInsertCustomer] = useState(false)
    const [insertUserID, setInsertUserID] = useState('')
    const [insertName, setInsertName] = useState('')
    const [insertDetail, setInsertDetail] = useState('')


    const loopCustomerData = (data) => {
        return (
          data.map(customer => <tr className="container" key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.title}</td>
                <td>
                    <Button size="sm" variant="info" onClick={() => getDetailCustomer(customer.id, customer.title, customer.body)}>Detail</Button>
                </td>
                <td>
                    <Button size="sm" variant="primary" onClick={() => editDetailCustomer(customer.id)}>Edit</Button>
                </td>
          </tr>)
        )
    }

    const getCustomerData = () => {
        getCustomer().then(function(response){
            const slice = response.slice(offset - 1 , offset - 1 + postsPerPage)
            const postData = loopCustomerData(slice)
            setAllCustomer(postData)
            setPageCount(Math.ceil(response.length / postsPerPage))
        }).catch(function (error) {
            console.log(error)
        })
    }

    const getDetailCustomer = (id, title, body) => {
        setIdCustomer(id)
        setNameCustomer(title)
        setDetailCustomer(body)
        setShowDetailModal(true)
    }

    const editDetailCustomer = (id, title, body) => {
        setIdCustomer(id)
        setNameCustomer(title)
        setDetailCustomer(body)
        setEditModal(true)
    }

    const deleteCustomer = (id, title, body) => {
        setIdCustomer(id)
        setNameCustomer(title)
        setDetailCustomer(body)
        setDeleteModal(true)
    }

    const openInsertCustomer = () => {
        setInsertCustomer(true)
    }

    const handleCloseDetail = () => {
        setShowDetailModal(false)
    }

    const handleCloseDetailEdit = () => {
        setEditModal(false)
    }

    const handleCloseDetailDelete = () => {
        setDeleteModal(false)
    }

    const handleCloseDetailInsert = () => {
        setInsertCustomer(false)
    }

    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setOffset(selectedPage + 1)
    }

    const handleEdit = (id) => {
        // edit customer
        // editCustomer(id, editedName, editedDetail)
        setEditModal(false)
    }

    const handleDelete = (id) => {
        // delete customer
        // deleteCustomer(id)
        setDeleteModal(false)
    }

    const handleInsert = (insertUserID, insertName, insertDetail) => {
        // insert customer
        // insertCustomer(insertUserID, insertName, insertDetail)
        setInsertCustomer(false)
    }

    const logOut = () => {
        localStorage.clear();
        window.location.pathname = "/"
    }

    useEffect(() => {
        getCustomerData()
    }, [offset])

    return (
        <Container fluid>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Hi Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Customer</Nav.Link>
                            <Nav.Link href="/order">Order</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => logOut()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
                <Row className="titleWrapper">
                    <Col md="10">
                        <h3>Order Management</h3>
                    </Col>
                    {/* <Col className="addWrapper" md="2">
                        <Button variant="primary" onClick={() => openInsertCustomer()}>
                            Tambah
                        </Button>
                    </Col> */}
                </Row>
                <Row>
                    <Col md="12">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th colSpan={3}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers}
                            </tbody>
                        </Table>
                        <ReactPaginate
                            previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
                    </Col>
                </Row>
            </Container>
                <Modal show={showDetailModal} onHide={handleCloseDetail}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detail Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>ID Customer : {idCustomer}</p>
                        <p>Name : {nameCustomer}</p>
                        <p>Detail : {detailCustomer}</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDetail}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={handleCloseDetailEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEdit}>
                            <Form.Group size="sm" controlId="id">
                                <Form.Label>ID</Form.Label>
                                <Form.Control
                                    disabled
                                    type="text"
                                    value={idCustomer}
                            />
                            </Form.Group>
                            <Form.Group size="sm" controlId="id">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    autoFocus
                                    type="text"
                                    defaultValue={nameCustomer}
                                    onChange={(e) => setEditedName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group size="sm" controlId="password">
                                <Form.Label>Detail</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={detailCustomer}
                                    onChange={(e) => setEditedDetail(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="secondary" className='btn-edit-close' onClick={handleCloseDetailEdit}>
                                Close
                            </Button>
                            <Button variant="primary" className='btn-edit-save' onClick={handleCloseDetailEdit}>
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
        </Container>
    )
}