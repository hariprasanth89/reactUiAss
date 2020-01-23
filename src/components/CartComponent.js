import React, { Component } from 'react'
import {connect} from 'react-redux';

class CartComponent extends Component {
    state={
        tempCount:0
    }

    decrement(param){
        this.props.minusQty(param);
        this.setState({
            tempCount:this.state.tempCount-1
        })
    }

    increment(param){
        this.props.addQty(param);
        this.setState({
            tempCount:this.state.tempCount+1
        })
    }
    removeItem(param){
        this.props.removeItem(param);
        this.setState({
            tempCount:0
        })
    }
    render() {
        
        let FinalDisplay='';
        FinalDisplay=(
            <div className="cart-wrapper">
            <table className="cart-product-table">
            <thead>
                <tr>
            <th>
                Items({this.props.cartCount})
            </th>
            <th>
                Qty
            </th>
            <th>
                Price
            </th>
            </tr>
            </thead>
            <tbody>
                {
                    this.props.cartItems.map((value,index)=>{
                        
                        return(
                            
                            <tr key={value.id} className="cart-item">
                     <td>
                         <div className="cart-product-name">
                         {value.name}
                         </div>
                         <div className="cart-remove-product">
                             <button onClick={this.removeItem.bind(this,value.id)}>X</button>
                         </div>
                        
                     </td>
                     <td>
                         <div>

                         <button className="cart-decrease-quantity"
                         onClick={this.decrement.bind(this,value.id)}>-</button>
                         <div className="cart-quantity"> {value.qty} </div>

                         <button className="cart-increase-quantity" onClick={this.increment.bind(this,value.id)}>+</button>
                         </div>
                         
                     </td>
                     <td>
                         <div className="cart-product-total-price">
                         ${value.qty*(value.price-Math.round((value.price/100)* value.discount))}
                         </div>
                     </td>
                 </tr>
                            
                        )
                    })
                }
                 </tbody>
            </table>
            </div>
        )

        return (
            <div>
               {
                  FinalDisplay 
               }
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log('state:',state);
    return({
        cartItems:state.cartItems
        ,cartCount:state.cartItems.length
    })
}

function mapActionToProps(action){
    return({
        addQty:(param)=>action({
            type:'ADD_QTY',
            data:param
        }),
        minusQty:(param)=>
            action({
            type:'MINUS_QTY',
            data:param
        }),
        removeItem:(param)=>{
            action({
                type:'REMOVE_ITEM',
                data:param
            })
        }
    })
}

export default connect(mapStateToProps,mapActionToProps)(CartComponent)
