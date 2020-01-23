import React, { Component } from 'react'
import Axios from 'axios';

import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';



const ApiCallGlobalFun = Axios.create({
    baseURL: 'https://api.myjson.com/',
});




class ProductCompenent extends Component {

    state = {
        id: "",
        userName: "",
        textarea: "",
        items: [],
        addedItems: [],
        recentlyAddedItem: 'Data Not Available'
    }

    componentDidMount() {
        // console.log('[Hello] componentDidMount');
        ApiCallGlobalFun({
            method: 'GET',
            url: 'bins/qhnfp',
        }).then(response => {
            let items = response.data;
            // console.log("items", items);
            this.setState({ items });
        }).catch(error => { console.log(error) });
    }
    InputHandlerAction(InputHandlerTypes, event) {
        // console.log(InputHandlerTypes, "  ", event);
        this.setState({
            [InputHandlerTypes]: event.target.value
        });

    }
    addToCartInternal(data) {

        let copyState = { ...this.state };
        let i;

        for (i = 0; i < copyState.addedItems.length; i++) {

            if (data.id === copyState.addedItems[i].id) {
                return
            }
        }
        copyState.addedItems.push(data);

        this.setState({
            addedItems: copyState.addedItems,
            recentlyAddedItem: copyState.addedItems[i].name + ' is added to the cart'
        });

    }


    render() {
        return (
            <div className="cart-app-wrapper">
                <div className="products-header">
                    <span className="title">All Items</span>
                    <span className="message">{this.state.recentlyAddedItem}</span>
                    <div className="cart-link">
                        {/* <NavLink to='cartPage'><button>Go to cart</button></NavLink> */}
                        {/* <span className="cart-item-count">{this.props.cartItemsCount}</span> */}
                        {/* <span className="w3-badge w3-green">{this.props.cartItemsCount}</span> */}
                        <NavLink to='cartPage'>  <button class="w3-btn w3-green">Go to cart
                                <span class="w3-badge w3-margin-left w3-white">{this.props.cartItemsCount}</span>
                        </button></NavLink>
                    </div>
                </div>

                {/* <h6 className="">All Items {this.state.recentlyAddedItem} </h6> */}
                {/* <div className="cart-link">
                    <NavLink to='cartPage'><button>Go to cart</button></NavLink>
                    <span className="cart-item-count">{this.props.cartItemsCount}</span>
                </div> */}
                {/* <NavLink to='cartPage'><button>Go to cart</button></NavLink>
                <span>{this.props.cartItemsCount}</span><br/> */}
                {this.state.items.map((values, index) => {
                    //  console.log('valueas:',values);
                    return (
                        <div className="product-tile" key={values.id}>
                            <div className="block-upper">
                                <div className="discount">{values.discount}% off</div>
                                <div className="cover"><img src={values.img_url} alt="Book Cover Not Available" />  </div>
                            </div>
                            <div className="block-lower">
                                <div className="name">{values.name}</div>
                                <span className="strike">
                                    <span className="list-price">${values.price}</span>
                                </span>
                                <span className="discounted-price"> ${values.price - Math.round((values.price / 100) * values.discount)}</span>
                                <div className="actions">
                                    {/* <button className="add-to-cart" onClick={() =>  this.addToCart(values.id, values.name,values.price)}>Add to cart</button> */}
                                    <button className="add-to-cart" onClick={() => {
                                        this.props.addToCart(values);
                                        this.addToCartInternal(values)
                                    }}>Add to cart</button>
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

                {/* </Switch> */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return ({
        cartItems: state.cartItems,
        cartItemsCount: state.cartItems.length
    })
}

function mapActionToProps(action) {
    return ({
        addToCart: (param) =>
            action({
                type: 'ADD_TO_CART',
                data: param
            })

    })
}

// export default ProductCompenent
export default connect(mapStateToProps, mapActionToProps)(ProductCompenent);
