import R from 'ramda'
import React, { Component } from 'react'

const PieChart = require('react-d3/piechart').PieChart

export default class PieChartMaker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pieChart: {
                data: [
                    {label: 'Margarita', value: 20.0, trueValue: 20.0},
                    {label: 'John', value: 55.0, trueValue: 55.0},
                    {label: 'Tim', value: 25.0, trueValue: 25.0}
                ],
                width: 400,
                height: 400,
                radius: 100,
                innerRadius: 20,
                title: "Pie Chart"
            },
            input: {
                label: "",
                value: 0,
                trueValue: 0
            }
        }
    }

    updatePercents(data) {
        const total = R.reduce((p, s) => p+s.trueValue, 0, data)
        const updateSlice = slice => R.set(R.lensProp('value'), Math.round((slice.trueValue / total) * 100), slice)
        const updated = R.map(updateSlice, data)
        return updated
    }

    setInputTitle(e) {
        const newPieChart = R.merge(this.state.pieChart, {title: e.target.value})
        this.setState(R.merge(this.state, {pieChart: newPieChart}))
    }

    addSlice() {
        const updatedSlices = this.updatePercents(R.append(this.state.input, this.state.pieChart.data))
        const newPieChart = R.set(R.lensProp('data'), updatedSlices, this.state.pieChart)
        this.setState(R.merge(this.state, {pieChart: newPieChart}))
    }

    resetChart() {
        const newPieChart = R.set(R.lensProp('data'), [], this.state.pieChart)
        this.setState(R.merge(this.state, {pieChart: newPieChart}))
    }

    setInputLabel(e) {
        this.setState(R.merge(this.state, {input: R.set(R.lensProp('label'), e.target.value, this.state.input)}))
    }

    setInputValue(e) {
        const val = parseInt(e.target.value)
        if(val < 0 || val > 100) return
        const newInput = R.merge(this.state.input, {value: val, trueValue: val})
        this.setState(R.merge(this.state, {input: newInput}))
    }

    render () {
        return (
            <div className='content pie-maker light'>
                <div className='controls'>
                    <div>
                        <input type="text"
                                onChange={this.setInputLabel.bind(this)}
                                value={this.state.input.label}/>
                        <input type="number" min="0" max="100"
                                onChange={this.setInputValue.bind(this)}
                                value={this.state.input.value}/>
                        <button onClick={() => {this.addSlice()}}>
                            Add Slice!
                        </button>
                    </div>
                    <div>
                        <input type="text" onChange={this.setInputTitle.bind(this)} value={this.state.pieChart.title}/>
                    </div>
                    <div>
                        <button onClick={() => {this.resetChart()}}>
                            Reset
                        </button>
                    </div>
                </div>
                <PieChart className='chart' {...this.state.pieChart}/>
            </div>
        );
    }
}
