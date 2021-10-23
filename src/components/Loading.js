import React, { Component } from 'react'
import Spinner from "../Spinner.gif"

export class Loading extends Component {
    render() {
        return (
            <div className="text-center my-3">
                <img className="my-3" src={Spinner} alt="loading.." />
            </div>
        )
    }
}

export default Loading
