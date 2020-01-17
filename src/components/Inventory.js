import React from 'react'
import AddFishForm from './AddFishForm'
import EditFishForm from './EditFishForm'
import PropTypes from 'prop-types'
import Login from './Login'
import firebase from 'firebase'
import base, {firebaseApp} from '../base'

class Inventory extends React.Component {
  static propTypes={
    fishes: PropTypes.shape({
      image:PropTypes.string,
      name: PropTypes.string,
      desc:PropTypes.string,
      status:PropTypes.string,
      price:PropTypes.number
    }),
    addFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeId: PropTypes.string
  }
  state = {
    uid:null,
    owner:null
  }
  componentDidMount(){
    //will log you in automatically
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.authHandler({user})
      }
    })
  }
  authenticate = (provider)=>{
    const authProvider = new firebase.auth[`${provider}AuthProvider`]()
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler)
  }
  authHandler= async (authData)=>{
    //console.log(authData) has bunch of info about the user
    //look up current store
    const store= await base.fetch(this.props.storeId,{context:this})
    //claim if no owner
    if(!store.owner){
      await base.post(`${this.props.storeId}/owner`,{data:authData.user.uid})
    }
    //set the state of the inventory component to reflect current user, this state is only relevant to this component so it can live here
    this.setState({
      uid: authData.user.uid,
      owner: store.owner||authData.user.uid
    })
  }
  logout = async ()=>{
    await firebase.auth().signOut()
    this.setState({uid:null})
  }
  render(){
    const logout = <button onClick={this.logout}>Log Out!</button>
    if(!this.state.uid){
      return <Login authenticate={this.authenticate} />
    }
    if(this.state.uid!=this.state.owner){
      return (
        <div>
          <p>Sorry, you are not the owner!</p>
          {logout}
        </div>
      )
    }
    return(
      <div className="inventory">
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(fish=> <EditFishForm key={fish} updateFish={this.props.updateFish} index={fish} deleteFish={this.props.deleteFish} fish={this.props.fishes[fish]} />)}
        <AddFishForm addFish={this.props.addFish}/>
        <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
      </div>
    )
  }
}
export default Inventory
