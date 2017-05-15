import R from 'ramda'
import React, { Component } from 'react'

const PieChart = require('react-d3/piechart').PieChart

export default class PieChartMaker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pieChart: {
                data: [],
                width: 850,
                height: 550,
                radius: 220,
                innerRadius: 25,
                title: ''
            },
            input: {
                label: '',
                value: 0,
                trueValue: 0
            }
        }
    }

    updatePercents(data, percent) {
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
        const val = this.state.input.value
        if(typeof val !== 'number' || isNaN(val)) return
        // D3 cannot use an empty slice as first slice
        if(val === 0 && this.state.pieChart.data.length === 0) return
        const updatedSlices = this.updatePercents(R.append(this.state.input, this.state.pieChart.data))
        const newPieChart = R.set(R.lensProp('data'), updatedSlices, this.state.pieChart)
        this.setState(R.merge(this.state, {pieChart: newPieChart, input: {label: '', value: 0, trueValue: 0}}))
    }

    resetChart() {
        const newPieChart = R.merge(this.state.pieChart, {data: [], title: ''})
        this.setState(R.merge(this.state, {pieChart: newPieChart, input: {label: '', value: 0, trueValue: 0}}))
    }

    setInputLabel(e) {
        this.setState(R.merge(this.state, {input: R.set(R.lensProp('label'), e.target.value, this.state.input)}))
    }

    setInputValue(e) {
        const val = parseInt(e.target.value)
        if(typeof val !== 'number' || val < 0) return
        const newInput = R.merge(this.state.input, {value: val, trueValue: val})
        this.setState(R.merge(this.state, {input: newInput}))
    }

    render () {
        return (
            <div className='content pie-maker light'>
                <div className='controls'>
                    <div className='control control-title'>
                        <input className='input-field input-slice-title' type='text'
                                placeholder='Chart Title'
                                onChange={this.setInputTitle.bind(this)}
                                value={this.state.pieChart.title}/>
                    </div>
                    <div className='control control-slice'>
                        <input className='input-field input-slice-name' type='text'
                                placeholder='Slice Name'
                                onChange={this.setInputLabel.bind(this)}
                                value={this.state.input.label}/>
                        <input className='input-field input-slice-value' type='number' min='0' max='99999' value=''
                                placeholder='value'
                                onChange={this.setInputValue.bind(this)}
                                value={this.state.input.value}/>
                    </div>
                    <div className='control control-add-reset'>
                        <button className='dark button-add-slice' onClick={this.addSlice.bind(this)}>
                            Add Slice
                        </button>
                        <button className='dark button-reset-chart' onClick={this.resetChart.bind(this)}>
                            Reset
                        </button>
                    </div>
                </div>
                <PieChart className='chart' {...this.state.pieChart}/>
            </div>
        );
    }
}
