import React, { Component } from 'react'
import './cart.css'
import Expand from './images/add.png'
import Collapse from './images/minus.png'
import Chair from './images/chair.jpeg'
import { connect } from 'react-redux';
import { cartAction, getDiscount } from '../actions/cartAction'
import PriceTitle from './priceTitle'

const title = "Pickup the order in the store to cut down costs."

const mapDispatchToProps = dispatch => ({
    cartAction: () => dispatch(cartAction()),
    getDiscount: (code) => dispatch(getDiscount(code))
  })

  const mapStateToProps = state => ({
    ...state
  })

class cart extends Component {
  constructor(){
      super()
      this.state = {
          discountCode: null,
          promo: false,
          details: false,
          itemDetails: {
              item_name: null,
              quantity: null
          },
          pricing: {
            savings: null,
            subtotal: null,
            tax: null,
            total: null,
            zip: null
          }
      }
  }

    async componentDidMount() {
        await this.props.cartAction()
        let result = await this.props.cartReducer.result
        this.setState({
            itemDetails: result.itemDetails,
            pricing: result.pricing
        })
  }
  
  promo = () => {
    this.setState({
        promo: !this.state.promo
    })
  }

  details = () => {
    this.setState({
        details: !this.state.details
    })
  }

  detailsExpand = () => {
      return(
          <div style={{"textAlign": "initial"}}>
              <div style={{"float": "left"}}>
                  <img alt="Chair" style={{'height': '100px'}} src={Chair}/>
              </div>
              <div style={{'float': 'right', 'display': 'contents'}}>
                    <p style={{"marginBottom": "0"}}>
                        {this.state.itemDetails.item_name}
                    </p>
                    <div>
                        <div style={{"float":"left"}}>
                            <p style={{"marginTop": "5px", "marginBottom": "5px", "fontWeight": "bold"}}>
                                {this.state.pricing.subtotal - this.state.pricing.savings}
                            </p>
                            <p style={{"marginTop": "0", "textDecoration": "line-through", "color": "grey"}}>
                                {this.state.pricing.subtotal}
                            </p>
                        </div>
                        <div style={{"float":"right"}}>
                            <p style={{"marginTop": "0"}}>Qty: {this.state.itemDetails.quantity}</p>
                        </div>
                    </div>
              </div>
          </div>
      )
  }

  code = (e) => {
      this.setState({
          discountCode: e.target.value
      })
  }

  discount = () => {
      this.props.getDiscount(this.state.discountCode)
      this.refs.discountCode.value = ''
  }

  promoExpand = () => {
      return(
          <div style={{"textAlign": "initial"}}>
              <p style={{'paddingLeft': '15px'}}>Promo Code</p>
              <div style={{'paddingLeft': '15px'}}>
                  <input 
                    onChange={this.code}
                    ref="discountCode"
                    style={{"width": "60%", "marginRight":"20px", "minHeight":"20px"}} 
                    />
                  <button className="outline" onClick={this.discount}>Apply</button>
              </div>
          </div>
      )
  }


  render() {
    let height = this.state.details || this.state.promo ? {"height": "650px"} : {"height": "500px"}
    return (
      <div className='card' style={height}>
        <div className='title'>My Cart</div>
        <div className='divider'></div>

        <PriceTitle name='Subtotal' price={this.state.pricing.subtotal}/>
        
        <PriceTitle name='Pickup Savings' price={this.state.pricing.savings} 
            stylesTitle="pickup-title" stylesPrice="pickup-price" position="botton" title={title}
        />



        <PriceTitle name='Est. taxes & fees' price={this.state.pricing.tax}/>

        <div className='divider'></div>

        <div>
            <p className="total-title">Est. total</p>
            <p className="total-price">{this.state.pricing.total}</p>
        </div>
        
        <div style={{"clear": "both"}}></div>


        <div onClick={this.details} className="collapse">
            <p> {this.state.details ? 'Hide item details' : 'See item details'}        
                <img alt="Item Details" 
                    src={this.state.details ? Collapse : Expand} 
                    style={{"height": "12px", "paddingLeft": "20px"}}
                />
            </p>
            <div>
                {this.state.details ? this.detailsExpand() : null}
            </div>
        </div>

        <div className='divider'></div>

        <div onClick={this.promo} className="collapse">
            <p>{this.state.promo ? 'Hide promo code' : 'Apply promo code'}
                <img alt="Promo" 
                    src={this.state.promo ? Collapse : Expand} 
                    style={{"height": "12px", "paddingLeft": "20px"}}
                />
            </p>
        </div>

        <div>
            <br/>
            <br/>

            {this.state.promo ? this.promoExpand() : null}
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(cart);