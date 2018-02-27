import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
// import Burger from '../../components/Burger/Burger';
// import BuildControls from '../../components/Burger/BuildControls/BuildControls';
// import Modal from '../../components/UI/Modal/Modal';
// import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
// import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actions from '../../store/actions/index';
import axios from 'axios';

class Home extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        // purchasing: false
    }

    componentDidMount () {
        // this.props.onInitIngredients();
    }

   
    render () {
       
      
        return (
            <Aux>
               this is home page
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        // ings: state.burgerBuilder.ingredients,
        // price: state.burgerBuilder.totalPrice,
        // error: state.burgerBuilder.error,
        // isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        // onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        // onInitIngredients: () => dispatch(actions.initIngredients()),
        // onInitPurchase: () => dispatch(actions.purchaseInit()),
        // onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( Home, axios ));