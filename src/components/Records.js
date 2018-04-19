import React, {
    Component
} from 'react';
// import {
//     getJSON
// } from 'jquery';
import * as RecordsAPI from '../utils/RecordsAPI'
import Record from './Record';
import RecordsForm from './RecordsForm';
import AmountBox from './AmountBox';

class Records extends Component {
    constructor() {
        super();
        this.state = {
            records: [],
            error: null,
            isLoaded: false
        }
    }
    componentDidMount() {
        // getJSON('https://5ad584f561132000142d6dfe.mockapi.io/api/v1/records').
        // then(response => this.setState({
        //         records: response,
        //         isLoaded: true
        //     }),
        //     error => this.setState({
        //         isLoaded: true,
        //         error
        //     })
        // )
        RecordsAPI.getAll()
            .then(response => this.setState({
                records: response.data,
                isLoaded: true
            }))
            .catch(error => this.setState({
                isLoaded: true,
                error
            }))
    }
    addRecord(record) {
        this.setState({
            records: [
                ...this.state.records,
                record
            ],
            error: null,
            isLoaded: true
        })
    }
    updateRecord(record, data) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.map((item, index) => {
            if (index !== recordIndex) {
                // This isn't the item we care about - keep it as-is
                return item;
            }

            // Otherwise, this is the one we want - return an updated value
            return {
                ...item,
                ...data
            };
        });
        this.setState({
            records: newRecords
        });
    }
    deleteRecord(record) {
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
        this.setState({
            records: newRecords
        });
    }
    credit() {
        let credits = this.state.records.filter((record) => {
            return record.amount >= 0
        });
        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0)
        }, 0)
    }
    debit() {
        let credits = this.state.records.filter((record) => {
            return record.amount < 0
        });
        return credits.reduce((prev, curr) => {
            return prev + Number.parseInt(curr.amount, 0)
        }, 0)
    }
    banlance() {
        return this.credit() + this.debit()
    }
    render() {
        const {
            error,
            isLoaded,
            records
        } = this.state;
        let RecordsComponent;
        if (error) {
            RecordsComponent = <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            RecordsComponent = <div>Loading...</div>
        } else {
            RecordsComponent = (
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>id</th>
                      <th>Date</th>
                      <th>Title</th>
                      <th>Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                        {
                            records.map((record, i) =>
                                (<Record
                                    index = {
                                        i+1
                                    }
                                    key={record.id}
                                    record={record}
                                    handleEditRecord={this.updateRecord.bind(this)}
                                    handleDeleteRecord = {
                                    this.deleteRecord.bind(this)
                                    }
                                />
                            ))
                        }
                  </tbody>
                </table>
            )
        }
        return (
            <div className="container">
                 <h2>Records</h2>
                 <div className="row mb-3">
                    <AmountBox text="Credit" type="success" amount={this.credit()}/>
                    <AmountBox text="Debit" type="danger" amount={this.debit()}/>
                    <AmountBox text="Banlance" type="info" amount={this.banlance()}/>
                 </div>
                 <RecordsForm handleNewRecord = {this.addRecord.bind(this)} />
                 {RecordsComponent}
            </div>
        )
    }
}
export default Records;