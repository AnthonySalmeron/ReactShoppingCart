import React from 'react'
import Order from './Order'
import Inventory from './Inventory'
import Header from './Header'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'
import PropTypes from 'prop-types'

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  }
  static propTypes: {
    match: PropTypes.object
  }
  componentDidMount(){ //btw this counts as an update so it triggers didUpdate
    //this will load almost immediately from localStorage but the fish state will take some time to load which will mess up order.js, made fix there because this cannot be async awaited for some reason
    const localStorageRef = localStorage.getItem(this.props.match.params.storeId)
    if(localStorageRef) this.setState({order:JSON.parse(localStorageRef)})
    //any changes in the app or any changes in the database will be relfected on each other
    this.ref= base.syncState(`${this.props.match.params.storeId}/fishes`,{
      context: this,
      state: 'fishes'
    })
  }
  componentDidUpdate(){
    localStorage.setItem(this.props.match.params.storeId,JSON.stringify(this.state.order))//key,value value needs to be a string
  }
  componentWillUnmount(){
    base.removeBinding(this.ref) //do this so no further changes after leaving the store
  }
  addFish = fish =>{ //never directly modify state
    //make a copy
    const fishes = {...this.state.fishes}
    fishes[`fish${Date.now()}`] = fish //making them unique
    this.setState({fishes}) //fishes:fishes
  }
  updateFish = (key,updatedFish)=>{
    const fishes= {...this.state.fishes}
    fishes[key] = updatedFish
    this.setState({fishes})
  }
  deleteFish=key=>{
    const fishes = {...this.state.fishes}
    //normally you'd remove it by deleting fishes[fish] with the delete keyword, but to remove from firebase as well, you have to set to null
    fishes[key]=null
    this.setState({fishes})
  }
  loadSampleFishes=()=>{
    this.setState({fishes:sampleFishes})
  }
  addToOrder=key=>{
    const order = {...this.state.order}
    order[key] = order[key]+1 || 1
    this.setState({order})
  }
  removeFromOrder=key=>{
    const order = {...this.state.order}
    delete order[key]//since we aren't using firebase, this is correct here
    this.setState({order})
  }
  render(){
    return(
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key=><Fish addToOrder={this.addToOrder} index={key} key={key} details={this.state.fishes[key]}/>)}
          </ul>
        </div>
        <Order removeFromOrder={this.removeFromOrder} fishes={this.state.fishes} order={this.state.order}/>
        <Inventory storeId={this.props.match.params.storeId} deleteFish={this.deleteFish} updateFish={this.updateFish} fishes={this.state.fishes} loadSampleFishes={this.loadSampleFishes} addFish={this.addFish}/>
      </div>
    )
  }
}

export default App
