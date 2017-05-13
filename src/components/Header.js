import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class About extends Component {
    render () {
        return (
            <div className='header dark'>
                <Link className='header-link link-home' to='/'>
                    <image className='pie-icon' src='../images/pie-icon.svg'></image>
                    PieMaker
                </Link>
                <Link className='header-link link-about' to='/about'>About</Link>
            </div>
        )
    }
}
