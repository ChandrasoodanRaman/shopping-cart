let shopELe=document.getElementById('shopId')


let basket=JSON.parse(localStorage.getItem("data")) || []  //if there is no data  in localStorage, consider []
let generateShop=()=>{
    return  (shopELe.innerHTML=shopItemsData.map((x)=>{
    let {id,name,price,desc,img}=x
    //to search data in the localStorage
    let search=basket.find((x)=>x.id===id)||[]
        return `<div id=product-id-${id} class="item">
        <img src=${img} width="220">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc} </p>
            <div  class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    <div class="quantity" id=${id}>${search.item===undefined?0:search.item}</div>
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                </div>
    
            </div>
        </div>
    </div>
    `
    }).join(""))
}
generateShop()

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
    localStorage.setItem("data",JSON.stringify(basket))

}

let update=(id)=>{
    let search=basket.find((x)=>x.id===id)
    document.getElementById(id).innerHTML=search.item
    calculate()

}

let calculate=()=>{
    let cartNumber=document.getElementById('cartNumber')
    
    cartNumber.innerHTML=basket.map((x)=>x.item).reduce((x,y)=>x+y,0)
}

calculate()