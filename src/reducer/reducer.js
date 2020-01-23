let initialState={
    cartItems:[]
}

function Reducer(state=initialState,action){
    let result={...state};
    switch(action.type){
        case 'ADD_TO_CART':
            for (let i=0;i<result.cartItems.length;i++){
                if(result.cartItems[i].id===action.data.id){
                    return result;
                }
            }
            result.cartItems.push({
                id:action.data.id,
                name:action.data.name,
                price:action.data.price,
                discount:action.data.discount,
                type:action.data.type,
                img_url:action.data.img_url,
                qty:1
            });
            return result;
        case 'ADD_QTY':
                for (let i=0;i<result.cartItems.length;i++){
                    if(result.cartItems[i].id===action.data){
                        result.cartItems[i].qty=result.cartItems[i].qty+1
                    }
                }
                return result;
        case 'MINUS_QTY':
                for (let i=0;i<result.cartItems.length;i++){
                    if(result.cartItems[i].id===action.data){
                        result.cartItems[i].qty=result.cartItems[i].qty-1
                    }
                }
                return result;
        case 'REMOVE_ITEM':
                for (let i=0;i<result.cartItems.length;i++){
                    if(result.cartItems[i].id===action.data){
                        result.cartItems.splice(i,1)
                    }
                }
                return result;
                
        default: return state;
    }
    
}

export default Reducer;