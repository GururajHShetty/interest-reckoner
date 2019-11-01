import React from 'react'
import axios from 'axios'
import History from './History'

export default class Slider extends React.Component {
    constructor() {
        super()
        this.state = {
            amount: 500,
            duration: 6,
            interestRate: '',
            monthlyInstallment: '',
            currency: '',
            isLoading: false,
            history: []
        }
    }

    // componentDidMount() {
    //     this.handleCalculate()
    // }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    saveHistory = result => {
        const data = {
            id: Number(new Date()),
            amount: result.principal.amount,
            duration: result.numPayments,
            interestRate: result.interestRate,
            monthlyInstallment: result.monthlyPayment.amount,
            currency: result.monthlyPayment.currency,
        }
        let localHistory = localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : []
        localHistory.push(data)
        localStorage.clear()
        localStorage.setItem('history', JSON.stringify(localHistory))
        this.setState({
            history: localHistory
        })
    }

    handleCalculate = () => {
        this.setState({
            isLoading: true
        })
        axios.get(`https://ftl-frontend-test.herokuapp.com/interest?amount=${this.state.amount}&numMonths=${this.state.duration}`)
            .then(response => {
                if (response.data) {
                    // console.log(response.data)
                    this.saveHistory(response.data)
                    this.setState({
                        interestRate: response.data.interestRate,
                        monthlyInstallment: response.data.monthlyPayment.amount,
                        currency: response.data.monthlyPayment.currency,
                        isLoading: false
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleClick = data => {
        // console.log(data)
        this.setState({
            amount: data.amount,
            duration: data.duration,
            interestRate: data.interestRate,
            monthlyInstallment: data.amount,
        })
    }

    handleClear = () => {
        localStorage.clear()
        this.setState({
            interestRate: '',
            monthlyInstallment: '',
            currency: '',
            history: []
        })
    }

    render() {
        return (
            <div className="row" >
                <div className="col-md-6">
                    <h4><span className="badge badge-light">Loan Amount</span></h4><br />
                    <div className="form-group row">
                        <label>$500</label>
                        <div className="col-sm-10">
                            <input type="range" className="form-control-range" id="amount" name="amount" min="500" max="5000" step="1" value={this.state.amount} onChange={this.handleChange} onMouseUpCapture={this.handleCalculate} onTouchEnd={this.handleCalculate} />
                        </div>
                        <label>$5000</label>
                    </div>
                    <h4><span className="badge badge-light">Duration</span></h4><br />
                    <div className="form-group row">
                        <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6</label>
                        <div className="col-sm-10">
                            <input type="range" className="form-control-range" id="duration" name="duration" min="6" max="24" step="1" value={this.state.duration} onChange={this.handleChange} onMouseUpCapture={this.handleCalculate} />
                        </div>
                        <label>24</label>
                    </div>
                    <h4><span className="badge badge-light">EMI DETAILS</span></h4><br />
                    <div className="card col-md-12" >
                        <div className="card-header row"><li className="list-group-item">Amount : {this.state.amount}$</li><li className="list-group-item">Duration : {this.state.duration} months </li>
                            <button type="button" className="btn btn-warning"
                                onClick={() => {
                                    this.handleClear()
                                }}
                            >Reset</button>
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
                                        <li className="list-group-item">Interest Rate : {this.state.interestRate}</li>
                                        <li className="list-group-item">Monthly Payment : {this.state.monthlyInstallment} {this.state.currency}</li>
                                    </ul>
                                )
                        }
                    </div>
                </div>
                <div className="col-md-4 offset-md-2">
                    <History handleClick={this.handleClick} />
                </div>
            </div >
        )
    }
}