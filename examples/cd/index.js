import React, {Component} from 'react'
import {render} from 'react-dom'
import cx from 'classnames'
import data from '../data'
import TouchCarousel, {clamp} from '../../src'
import './index.css'

const cardSize = 300
const cardPadCount = 3
const carouselWidth = clamp(window.innerWidth, 0, 960)

function CarouselContainer (props) {
  const {cursor, carouselState: {dragging, springing}, ...rest} = props
  // Put current card at center
  const translateX = (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2
  return (
    <div className={cx('cd-player', {
      'is-dragging': dragging,
      'is-springing': springing
    })}>
      <div className='carousel-container'>
        <div
          className='carousel-track'
          style={{transform: `translate3d(${translateX}px, 0, 0)`}}
          {...rest}
        />
      </div>
      <div className='cd-bar' />
    </div>
  )
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playing: 0
    }
  }

  onRest = (index, modIndex) => {
    this.setState({playing: modIndex})
  }

  renderCard = (index, modIndex, cursor) => {
    const item = data[modIndex]
    const playing = this.state.playing === modIndex
    return (
      <div
        key={index}
        className={cx('carousel-card', {playing})}
      >
        <div className='carousel-card-inner'>
          <div
            className='carousel-title'
            style={{backgroundColor: item.background}}
          >
            CD {modIndex + 1}
          </div>
        </div>
      </div>
    )
  }

  render () {
    return (
      <TouchCarousel
        component={CarouselContainer}
        cardSize={cardSize}
        cardCount={data.length}
        cardPadCount={cardPadCount}
        loop
        autoplay={5e3}
        renderCard={this.renderCard}
        onRest={this.onRest}
        data-playing={this.state.playing}
      />
    )
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const ndRoot = document.getElementById('react-root')
  render(<App />, ndRoot)
  if (!('ontouchmove' in window)) {
    document.getElementById('mobile-tip').removeAttribute('hidden')
  }

  if (/iPhone|iPad/.test(navigator.userAgent)) {
    document.getElementById('iOS-bug').removeAttribute('hidden')
  }
})
