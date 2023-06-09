import React, { Component } from 'react'

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            a:10
        }
        console.log("Constructor");
    }
    componentDidMount(){
        console.log("CDM")
        //API isteklerini burada yapıcam
        this.setState({
            a:20
        })
    }
    componentDidUpdate = (prevProps, prevState) => {
        console.log("CDU")
    }
    shouldComponentUpdate(){
        console.log("SHU")
        return false; //eğer false dönerse bundan sonraki kısımlar çalışmaz
    }
  render() {
    console.log("Render")
    return (
      <div>
        
      </div>
    )
  }
}
export default Test;