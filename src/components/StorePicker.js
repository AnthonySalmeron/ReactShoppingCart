import React from 'react'
// import {Component} from 'react'
import {getFunName} from '../helpers'
//need to import react for every component
import PropTypes from 'prop-types'
class StorePicker extends React.Component{
  static propTypes = {
    history: PropTypes.object
  }
  myInput= React.createRef()
  goToStore=(event)=>{
    event.preventDefault()
    const storeName=this.myInput.current.value
    this.props.history.push(`/store/${storeName}`)
    {/*the props that get passed down aren't just the explicitly defined ones*/}
  }
  render(){
    return(
      <React.Fragment> {/*need this if you want to render two sibling elements*/}
        <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref={this.myInput} required defaultValue={getFunName()}/>
        <button type="submit">Visit Store</button>
        </form>
        <p>Other child</p>
      </React.Fragment>
    )
  }
}
export default StorePicker
