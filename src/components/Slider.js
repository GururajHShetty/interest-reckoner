import React from 'react'
import axios from 'axios'

export default class Slider extends React.Component {
    constructor() {
        super()
        this.state = {
            amount: 500,
            duration: 6,
            intrestRate: '',
            monthlyInstallment: '',
            currency: '',
            isLoading: false
        }
    }

    componentDidMount() {
        this.handleCalculate()
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCalculate = e => {
        this.setState({
            isLoading: true
        })
        axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.amount}&numMonths=${this.state.duration}`)
            .then(response => {
                if (response.data) {
                    // this.saveToLocal(response.data)
                    this.setState({
                        intrestRate: response.data.interestRate,
                        monthlyInstallment: response.data.monthlyPayment.amount,
                        currency: response.data.monthlyPayment.currency,
                        isLoading: false
                    })
                    console.log(response.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <div >
                <h4><span className="badge badge-light">Loan Amount</span></h4><br />
                <div className="form-group row">
                    <label>$500</label>
                    <div className="col-sm-10">
                        <input type="range" className="form-control-range" id="amount" name="amount" min="500" max="5000" defaultValue="500" step="1" onChange={this.handleChange} onMouseUpCapture={this.handleCalculate} />
                    </div>
                    <label>$5000</label>
                </div>
                <h4><span className="badge badge-light">Duration</span></h4><br />
                <div className="form-group row">
                    <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6</label>
                    <div className="col-sm-10">
                        <input type="range" className="form-control-range" id="duration" name="duration" min="6" max="24" defaultValue="6" step="1" onChange={this.handleChange} onMouseUpCapture={this.handleCalculate} />
                    </div>
                    <label>24</label>
                </div><hr />
                <h4><span className="badge badge-light">EMI DETAILS</span></h4><br />
                <div className="card col-md-12" >
                    <div className="card-header row"><li className="list-group-item">Amount : {this.state.amount}</li><li className="list-group-item">Duration : {this.state.duration}</li>
                    </div>
                    {
                        this.state.isLoading ? (
                            <div>
                                <div className="spinner-grow text-primary" role="status">
                                </div>
                                <div className="spinner-grow text-secondary" role="status">
                                </div>
                                <div className="spinner-grow text-success" role="status">
                                </div>
                                <div className="spinner-grow text-danger" role="status">
                                </div>
                                <div className="spinner-grow text-warning" role="status">
                                </div>
                                <div className="spinner-grow text-info" role="status">
                                </div>
                                <div className="spinner-grow text-dark" role="status">
                                </div>
                            </div>
                        ) : (
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Interest Rate : {this.state.intrestRate}</li>
                                    <li className="list-group-item">Monthly Payment : {this.state.monthlyInstallment} {this.state.currency}</li>
                                </ul>
                            )
                    }
                </div>
            </div >
        )
    }
}