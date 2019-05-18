import React, { Component } from 'react'
import './cart.css'

export default class priceTitle extends Component {
  render() {

      if(this.props.position){
          let {title, stylesTitle, stylesPrice, position, name, price} = this.props
          return (
            <div>
                <div>
                <p tooltip={title} tooltip-position={position} className={stylesTitle}>{name}</p>
                <p className={stylesPrice}>-{price}</p>
                </div>
                <div style={{"clear": "both"}}></div>
            </div>
          )
      }
    return (
      <div>
        <div>
            <p className="sub-title">{this.props.name}</p>
            <p className="price">{this.props.price}</p>
        </div>
        <div style={{"clear": "both"}}></div>
      </div>
    )
  }
}
