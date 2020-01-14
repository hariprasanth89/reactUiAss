import React, { Component } from 'react'
import Axios from 'axios';


const ApiCallGlobalFun = Axios.create({
    // baseURL: 'http://jsonplaceholder.typicode.com/',
    baseURL: 'https://api.myjson.com/',
    // headers: {
    //      'X-Requested-With': 'jdfkljfldksjf'
    // }
});


class ProductCompenent extends Component {

    state = {
        id: "",
        userName: "",
        textarea: "",
        items: []
    }

    componentDidMount() {
        console.log('[Hello] componentDidMount');
        ApiCallGlobalFun({
            method: 'GET',
            url: 'bins/qhnfp',
            // headers: {
            //     'X-Get': 'This is My FisrtHeader'
            // }
        }).then(response => {
            let items = response.data;
            console.log("items", items);
            this.setState({ items });
        }).catch(error => { console.log(error) });
    }
    InputHandlerAction(InputHandlerTypes, event) {
        console.log(InputHandlerTypes, "  ", event);
        this.setState({
            [InputHandlerTypes]: event.target.value
        });

    }


    render() {
        return (
            <>
                {this.state.items.map((values, index) => {
                    console.log(values);
                    return (
                        <div >
                            <div className="card">
                                <img src={values.img_url} alt="Smiley face" height="42" width="42" /><br />
                                <p>{values.name}</p><br />
                                <p className="price" align="left" ><span>&#36;</span> <strike>{values.price} </strike>  <span>&#36;</span> {values.price - values.discount}</p>
                                <p><button>Add to Cart</button></p>
                            </div>
                        </div>
                    )
                })}






            </>
        )
    }
}

export default ProductCompenent
