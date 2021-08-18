import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { APP_ROUTES } from '../../../../../utilities/constants/routes.constants';

class AddCategoryBody extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onBookSelect = this.onBookSelect.bind(this);
        this.state = {
            category_name: '',
            description: '',
            books: [],
            options: [],
            selectedBooks: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:6060/book/view')
        .then(response => {
            this.setState({ books: response.data.data}, () => {
                let data = [];
                this.state.books.map((item, index) => {
                    let book = {
                        value: item._id, 
                        label: item.title
                    }
                    data.push(book)
                })
                this.setState({options: data});
            })   
        })
        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    };

    onBookSelect(e) {
        this.setState( { selectedBooks: e ? e.map(item =>item.value) : [] })
    }

    onSubmit(e) {
        e.preventDefault();
        let AddCategory = {
            category_name: this.state.category_name,
            description: this.state.description,            
            books: this.state.selectedBooks
        }
        console.log('Data', AddCategory);
        axios.post('http://localhost:6060/category/add', AddCategory)
            .then(() => {
                Swal.fire({
                    title: "Success!",
                    text: "Added Successed!",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                }).then(okay => {
                    if (okay) {
                        window.location.href = APP_ROUTES.ADMIN_VIEW_CATEGORY;
                    }
                });

            }).catch((err) => {
                Swal.fire({
                    title: "error!",
                    text: "Not Success",
                    icon: 'error',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
            })
    }

    render() {
        return (
            <div className="container">
                <br></br><br></br>
                <h1>Add Category Details </h1>
                <br></br>
                <form onSubmit={this.onSubmit} > 
                    <div className="mb-3"> 
                        <label for="inputCategoryName" className="form-label">Category Name</label>
                        <input 
                            type="text"
                            className="form-control" 
                            id="category_name" 
                            name="category_name"         
                            value={this.state.category_name}
                            onChange={this.onChange} />
                    </div>
                    <div className="mb-3">
                        <label for="inputDescription" className="form-label">Description</label>
                        <textarea 
                            type="text" 
                            className="form-control" 
                            id="description" 
                            name="description" 
                            rows="3"
                            value={this.state.description}
                            style={{height: "100px"}}
                            onChange={this.onChange}/>
                    </div>
                    <p>Select books</p>
                    <Select
                        isMulti
                        name="books"
                        onChange={this.onBookSelect}
                        options={this.state.options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                    <br></br>
                    <br></br>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <br></br><br></br>
                </form>
            </div>
        );
    }
}

export default AddCategoryBody;