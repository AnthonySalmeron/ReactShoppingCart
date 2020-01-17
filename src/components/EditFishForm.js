import React from 'react'
import PropTypes from 'prop-types'

class EditFishForm extends React.Component {
  static propTypes = {
    fish:PropTypes.shape({
      image:PropTypes.string,
      name: PropTypes.string,
      desc:PropTypes.string,
      status:PropTypes.string,
      price:PropTypes.number
    }),
    index:PropTypes.string,
    updateFish: PropTypes.func

  }
  handleChange=(event)=>{
    // console.log(event.currentTarget.value);
    // console.log(event.currentTarget.name);
    const updatedFish={
      ...this.props.fish,
      [event.currentTarget.name] : event.currentTarget.value
    }
    this.props.updateFish(this.props.index,updatedFish)
  }
  delFish = ()=> this.props.deleteFish(this.props.index)
  render(){
    return(
      <div className="fish-edit">
        <input type='text'onChange={this.handleChange} name='name'value={this.props.fish.name}/>
        <input type='text' onChange={this.handleChange}name='price'value={this.props.fish.price}/>
        <select name='status'onChange={this.handleChange}value={this.props.fish.status}>
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea onChange={this.handleChange}name='desc'value={this.props.fish.desc}/>
        <input onChange={this.handleChange} type='text' name='image'value={this.props.fish.image}/>
        <button onClick={this.delFish}>Remove Fish</button>
      </div>
    )
  }
}
export default EditFishForm