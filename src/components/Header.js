import React from 'react'
import PropTypes from 'prop-types'
//functional components are good for when you have components that only get passed information and render out some jsx
const Header=props=>(
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">The</span>
        </span>
        Day
      </h1>
      <h3 className="tagline">
      <span>{props.tagline}</span>
      </h3>
    </header>
  )
Header.propTypes ={
  tagline: PropTypes.string.isRequired
}
// class Header extends React.Component {
//   render(){
//     return(
//       <header className="top">
//         <h1>
//           Catch
//           <span className="ofThe">
//             <span className="of">of</span>
//             <span className="the">The</span>
//           </span>
//           Day
//         </h1>
//         <h3 className="tagline">
//         <span>{this.props.tagline}</span>
//         </h3>
//       </header>
//     )
//   }
// }
export default Header
