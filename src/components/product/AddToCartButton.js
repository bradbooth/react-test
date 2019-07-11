import React from 'react';
import { connect } from "react-redux";
import { action as toggleMenu } from 'redux-burger-menu';
import { Grid, Row, Col, Button, DropdownButton, MenuItem } from "react-bootstrap"

import { startUpdateCheckout } from '../../actions/shopify';



export class AddToCartButton extends React.Component {


    //Add an item to the checkout cart
    addItemToCart = () => {

        const lineItemsToAdd = [{
            variantId:  this.props.products[0].variants[0].id, // TODO - This should be chosen on some basis, not just the first one in the list
            quantity: 1,
            customAttributes: Object.keys(this.props.variants).map((item) => (
                {
                    key: item,
                    value: this.props.variants[item]
                }
            ))
        }]


        console.log(this.props.products);

        const checkoutId = this.props.checkout.id

        this.props.client.checkout.addLineItems(checkoutId, lineItemsToAdd).then(res => {
            this.props.updateCheckout(res)
        });

        this.props.showCart(true)
    }


    render() {
        return (
            
            <Button className="button-black" type="button" onClick={this.addItemToCart}>Add to cart</Button>                       
        )
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.shopify.products,
        checkout: state.shopify.checkout,
        client: state.shopify.client,
        variants: state.variant
    }
};

const mapDispatchToProps = (dispatch) => ({
    updateCheckout: (checkout) => dispatch(startUpdateCheckout(checkout)),
    showCart: () => dispatch(toggleMenu(true)),
});
  
export default connect(mapStateToProps, mapDispatchToProps)(AddToCartButton);
