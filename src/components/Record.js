import React, {
    Component
} from 'react';
import PropTypes from 'prop-types'
import * as RecordsAPI from '../utils/RecordsAPI'
class Record extends Component {
    constructor() {
        super();
        this.state = {
            edit: false
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleToggle() {
        this.setState({
            edit: !this.state.edit
        })
    }
    handleEdit(event) {
        event.preventDefault();
        const record = {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value),
        }
        RecordsAPI.update(this.props.record.id, record)
            .then(res => {
                this.props.handleEditRecord(this.props.record, res.data);
                this.setState({
                    edit: false
                })
            })
            .catch(error => console.log(error.message))
    }
    handleDelete(event) {
        event.preventDefault();
        RecordsAPI.remove(this.props.record.id)
            .then(res => {
                this.props.handleDeleteRecord(this.props.record);
            })
            .catch(error => console.log(error.message))
    }
    recordRow() {
        return (
            <tr key={this.props.record.id}>
                <td>{this.props.index}</td>
                <td>{this.props.record.date}</td>
                <td>{this.props.record.title}</td>
                <td>{this.props.record.amount}</td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleToggle}>Edit</button>
                    <button className="btn btn-danger mr-1" onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
    recordForm() {
        return (
            <tr key={this.props.record.id}>
                <td>{this.props.index}</td>
                <td><input ref="date" type="text" className="form-control" defaultValue={this.props.record.date}/></td>
                <td><input ref="title" type="text" className="form-control" defaultValue={this.props.record.title}/></td>
                <td><input ref="amount" type="text" className="form-control" defaultValue={this.props.record.amount}/></td>
                <td>
                    <button className="btn btn-info mr-1" onClick={this.handleEdit}>Update</button>
                    <button className="btn btn-danger mr-1" onClick={this.handleToggle}>Cancle</button>
                </td>
            </tr>
        )
    }
    render() {
        if (this.state.edit) {
            return this.recordForm()
        } else {
            return this.recordRow()
        }
    }
}

export default Record;
Record.propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number,
    handleEditRecord: PropTypes.func,
    handleDeleteRecord: PropTypes.func
}