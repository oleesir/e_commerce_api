export const getTotal =(items:any)=>{
 let totalQuantity =  items.reduce((acc: any, item:any) => {
        return acc + item.quantity;
    }, 0);

    let totalPrice = items.reduce((acc: any,item:any) => {
        return acc + item.price * item.quantity;
    }, 0);

    return{
        totalQuantity,
        totalPrice
    }
}