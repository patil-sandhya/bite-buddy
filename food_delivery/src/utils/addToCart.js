import CartApi from "@/Services/CartApi"

export const addToCart = async({ userId, foodId, quantity = 1 })=>{
    console.log("add to ca", userId, foodId, quantity)
    try {
        const dataObj ={
            foodItemId:foodId,
            userId,
            quantity
        }
    let res = await CartApi.post_addTocart(dataObj)
    // console.log("res add toc", res)
        if (res?.status == 200) {
    // console.log('Added to cart:', res.data);
    // handle success (toast, UI update, etc.)
  } else {
    throw new Error('Unexpected response status');
  }
    // const data = await res.json();
    return { success: true, data:res?.data }; 
    } catch (error) {
        console.error('Add to cart failed:', error);
    return { success: false, error: error };
    }
}