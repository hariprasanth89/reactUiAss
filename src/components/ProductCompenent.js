import React, { Component } from 'react'
import Axios from 'axios';


const ApiCallGlobalFun = Axios.create({
    baseURL: 'https://api.myjson.com/',
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
    addToCart(id,name,price){
        console.log(id,name,price);
    }


    render() {
        return (
            <>
            <h6>All Items</h6>
                {this.state.items.map((values, index) => {
                    console.log(values);
                    return (
                        <div className="product-tile" key={values.id}>
                            <div className="block-upper">
                                <div className="discount">{values.discount}% off</div>
                                <div className="cover"><img src={values.img_url} alt="Book Cover Not Available"/>  </div>
                            </div>
                            <div className="block-lower">
                                <div className="name">{values.name}</div>
                                <span className="strike">
                                    <span className="list-price">{values.price}</span>
                                </span>
                                <span className="discounted-price"> {values.price - values.discount}</span>
                                <div className="actions">
                                    <button className="add-to-cart" onClick={() =>  this.addToCart(values.id, values.name,values.price)}>Add to cart</button>
                                </div>
                            </div>
                        </div>

                        // <div >
                        //     <div className="card">
                        //         <img src={values.img_url} alt="Smiley face" height="42" width="42" /><br />
                        //         <p>{values.name}</p><br />
                        //         <p className="price" align="left" ><span>&#36;</span> <strike>{values.price} </strike>  <span>&#36;</span> {values.price - values.discount}</p>
                        //         <p><button>Add to Cart</button></p>
                        //     </div>
                        // </div>
                    )
                })}






            </>
        )
    }
}

export default ProductCompenent
