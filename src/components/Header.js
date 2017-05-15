import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PieIcon from './PieIcon'

export default class About extends Component {
    render () {
        return (
            <div className='header dark'>
                <Link className='header-link link-home' to='/'>
                    <PieIcon className='pie-icon'/>
                    <span className='app-title'>PieMaker</span>
                </Link>
                <Link className='header-link link-about' to='/about'>About</Link>
            </div>
        )
    }
}
