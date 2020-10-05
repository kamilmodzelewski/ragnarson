import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Background.css'

export default class VideoBackground extends Component {

    render() {

        const { mp4, ogg, style } = this.props

        return (
            <div className="fullscreen-bg" style={style}>
                <video loop muted autoPlay poster="img/videoframe.jpg" className="fullscreen-bg__video">
                    {mp4 && <source src={mp4} type="video/mp4" />}
                    {ogg && <source src={ogg} type="video/ogg" />}
                </video>
            </div>
        )
    }
}

VideoBackground.propTypes = {
    mp4: PropTypes.string,
    ogg: PropTypes.string
}