import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import * as RecordsAPI from '../utils/RecordsAPI'
export default class RecordsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            title: '',
            amount: ''
        };
        this.vaild = this.vaild.bind(this)
        this.onChangeHandle = this.onChangeHandle.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    vaild() {
        return this.state.date && this.state.title && this.state.amount
    }
    onChangeHandle(event) {
        let name, obj;
        name = event.target.name;
        this.setState((
            obj = {},
            obj["" + name] = event.target.value,
            obj
        ))
    }
    handleSubmit(event) {
        var e = event || window.event;
        e.preventDefault();
        const data = {
            date: this.state.date,
            title: this.state.title,
            amount: Number.parseInt(this.state.amount, 0)
        }
        RecordsAPI.create(data)
            .then(res => {
                this.props.handleNewRecord(res.data)
                this.setState({
                    date: "",
                    title: "",
                    amount: ""
                })
            })
            .catch(error => console.log(error))

    }
    render() {
        return (
            <form className="form-inline mb-2" onSubmit = {this.handleSubmit}>
                <div className="form-group mr-2">
                    <input onChange={this.onChangeHandle} type="text" className="form-control" name="date" placeholder="Date" value={this.state.date}/>
                </div>
                <div className="form-group mr-2">
                    <input onChange={this.onChangeHandle} type="text" className="form-control" name="title" placeholder="Title" value={this.state.title}/>
                </div>
                <div className="form-group mr-2">
                    <input onChange={this.onChangeHandle} type="text" className="form-control" name="amount" placeholder="amount" value={this.state.amount}/>
                </div>
                <button disabled={!this.vaild()} type="submit" className="btn btn-primary mr-1">Create Record</button>
            </form>
        )
    }
}