let label=document.getElementById("label")
let shoppingCart=document.getElementById('shopping-cart')

let basket=JSON.parse(localStorage.getItem("data")) || []  //if there is no data  in localStorage, consider []

let calculate=()=>{
    let cartNumber=document.getElementById('cartNumber')
    
    cartNumber.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}

calculate()
let generateCart=()=>
{
    if(basket.length!==0)
    {
        return (shoppingCart.innerHTML=basket.map((x)=>{
            let {id,item}=x
            //console.log(x)
            let search=shopItemsData.find((y)=>y.id==id)||[]
            return `
            <div class="cart-item">
                    <img width="100" src="${search.img}">
                    <div class="details">
                        <div class="title-price-x">
                                <h4  class="title-price">
                                <p>${search.name}</p>
                                <p class="price">$${search.price}</p>
                                </h4>
                                <i onclick="removeItem(${id})" class="bi bi-x"></i>
                        
                        </div>
                        <div class="buttons">
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                                <div class="quantity" id=${id}>${item}</div>
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        </div>
                        <h3>
                        
                        ${item*search.price}
                        </h3>
                    
                    </div>

                    
            </div>
            
            `
        }).join(''))

    }
    else{
        shoppingCart.innerHTML=``
        label.innerHTML=`
        <h2>cart is empty</h2>
        <a href="index.html">
        
        <button class="homeBtn">BACK TO HOME</button>
        </a>
        `
    }
}
generateCart()


let increment=(id)=>{
    let selectedItem=id
    /*
    console.log(selectedItem)
    console.log(selectedItem.id)
    */
    let search=basket.find((x)=>x.id===selectedItem.id)
    if(search===undefined)
    {
        basket.push({
            id:selectedItem.id,
            item:1,
        })
        
    }
    else
    {
        search.item+=1
    }
    //console.log(basket)
    //basket=basket.filter((x)=>x.item!==0)
    generateCart()
    update(selectedItem.id)
    localStorage.setItem("data",JSON.stringify(basket))
    
    }
    
    let decrement=(id)=>
    {
    
    
        let selectedItem=id
        let search=basket.find((x)=>x.id===selectedItem.id)
    
        //initial decrement (item is undefined in  localStorage)
        if(search===undefined)return;
        else if(search.item ===0) return;
        else
        {
            search.item-=1
        }
       /// console.log(basket)
    
       update(selectedItem.id)
    
       //to remove(ie filter) the item whose no is 0
    basket=basket.filter((x)=>x.item!==0)
    generateCart()
        localStorage.setItem("data",JSON.stringify(basket))
    
    }
    
    let update=(id)=>{
        let search=basket.find((x)=>x.id===id)
        document.getElementById(id).innerHTML=search.item
        calculate()
    totalAmount()

    
    }


    let removeItem=(id)=>{

        let selectedItem=id;
        basket=basket.filter((x)=>x.id !==selectedItem.id)
    generateCart()
    totalAmount()
    calculate()

    localStorage.setItem("data",JSON.stringify(basket))


    }
    let clearCart=()=>
    {
        basket=[]
        generateCart()
        calculate()
        localStorage.setItem("data",JSON.stringify(basket))

        
    }
    let totalAmount=()=>{
        if(basket.length!==0)
        {
            let amount=basket.map((x)=>{
                let {item,id}=x
            let search=shopItemsData.find((y)=>y.id==id)||[]
            return search.price*item
                
        }).reduce((x,y)=>x+y,0)
        console.log(amount)
        label.innerHTML=`<h2>total bill:$${amount}<h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart() " class="removeAll">Clear Cart</button>`
        }
        
        else return;
       
    }

    totalAmount()