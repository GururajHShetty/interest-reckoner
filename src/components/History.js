import React from 'react'


export default function History(props) {
    const history = JSON.parse(localStorage.getItem('history'))
    return (
        <div>
            <h2><span className="badge badge-info">History</span></h2><br />
            {
                history && (
                    <div className="border border-info">
                        <button className="btn " style={{ "width": "350px" }}>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Duration</th>
                                    </tr>
                                </thead>
                                {
                                    history.map(data => {
                                        return (
                                            <tbody
                                                key={data.id}
                                                onClick={() => {
                                                    props.handleClick(data)
                                                }}
                                            >
                                                <tr>
                                                    <td>{data.amount}</td>
                                                    <td>{data.duration}</td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }
                            </table>
                        </button>
                    </div>
                )
            }
        </div>
    )
}