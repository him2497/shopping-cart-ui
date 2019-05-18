const pricingData = {
    pricing: {
        subtotal: 102.96,
        savings: 3.85,
        tax: 8.92,
        total: 108.03,
        zip: 85050
    },
    itemDetails: {
        item_name: "Essentails by OFM ESS-3085 Racing Style Leather Gaming Chair, Red",
        quantity: 1
    }
}

export const getPricingData = (delay  = 1000) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(pricingData)
        }, delay)
    })
}

export const cartAction = () => dispatch => {
    dispatch({
      type: 'CART_UPDATE',
      payload: getPricingData()
    })
  }

export const getDiscount = (code) => dispatch => {
    if (code === "DISCOUNT"){
        let data = pricingData
        data['pricing']['total'] = pricingData.pricing.total * 0.90
        dispatch({
            type: 'CART_DISCOUNT',
            payload: data
          })
    }else{
        dispatch({
            type: 'CART_DISCOUNT_ERROR',
            payload: "Invalid Code"
          })
    }
}