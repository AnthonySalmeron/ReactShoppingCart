import React from 'react'
import {formatPrice} from '../helpers'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import PropTypes from 'prop-types'

class Order extends React.Component {
  static propTypes={
    fishes: PropTypes.shape({
      image:PropTypes.string,
      name: PropTypes.string,
      desc:PropTypes.string,
      status:PropTypes.string,
      price:PropTypes.number
    }),
    order: PropTypes.object,
    removeFromOrder: PropTypes.func
  }
  renderOrder = key=>{
    const fish = this.props.fishes[key]
    const count = this.props.order[key]
    const transitionOptions={
      classNames: 'order',
      key,
      timeout:{enter:500,exit:500}
    }
    //the order will load before the fish, this will prevent errors due to that
    if(!fish) return null
    if(fish.status!=="available"){
      return(
        <CSSTransition {...transitionOptions}>
          <li key={key}>Sorry {fish?fish.name:'fish'} is out of stock</li>
        </CSSTransition>
      )
    }
     return(
       <CSSTransition {...transitionOptions}>
         <li key={key}>
           <span>
             <TransitionGroup component='span' className="count">
               <CSSTransition key={count} classNames="count" timeout={{enter:500,exit:500}}>
                 <span>{count}</span>
               </CSSTransition>
             </TransitionGroup>
             lbs {fish.name}
             {formatPrice(count*fish.price)}
             <button style={{color:'red'}} onClick={()=>this.props.removeFromOrder(key)}>Delete</button>
          </span>
        </li>
      </CSSTransition>
    )
   }
  render(){
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal,key)=>{
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish &&fish.status==="available"
      if(isAvailable){
        return prevTotal + (count*fish.price)
      }
      return prevTotal
    },0) //need to put zero here otherwise it crashes because order is initially empty

    return(
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total:
          <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    )
  }
}
export default Order
