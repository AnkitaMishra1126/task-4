let item=[];
let itemInfo= document.getElementById('cartBody');
let isbooked=false;
let addBtn = document.querySelectorAll(".add-btn");
addBtn.forEach(btn=>{
    btn.addEventListener("click",event=>{
    
    let name= btn.getAttribute("data-name");
    let price= btn.getAttribute("data-price");

    if(btn.innerHTML.includes("Remove")){
        resetBtn(name,btn);
        return;
    }
    if(matchedItem(name)){
    alert('This service is added by you!!');
    return;
    }
    btn.style.backgroundColor="rgb(249,210,210)";
    btn.style.color="rgb(203,8,8)";
    btn.innerHTML=`Remove Item <span><ion-icon style="color: rgb(203, 8, 8);" name="remove-circle-outline"></ion-icon></span>`;
    item.push({name:name,price:Number(price)});
    addedItem();
    });
    
}

);

const addedItem= ()=>{
  itemInfo.innerHTML='';
  if(item.length===0){
    `  <tr class="empty">
                    <td colspan="3" class="empty-text">
                        <img src="https://cdn-icons-png.flaticon.com/512/4208/4208394.png" width="60">
                        <p>No Items Added</p>
                         <p class="empty-para">Add items to the cart from the services bar</p>
                    </td>
                </tr>`
  }
  else{
     item.forEach((services,j)=>{
         itemInfo.innerHTML+=`<tr>
           <td>${j+1}</td>
           <td>${services.name}</td>
           <td>${services.price}</td>
        </tr>`;
     });
    updateTotal();
  }
 

};

function matchedItem(name){
    return item.some(services=> services.name === name);
}
function resetBtn(named,btn){
    item = item.filter(i => i.name !==named);
    btn.style.backgroundColor="rgb(227, 227, 227)";
    btn.style.color="rgb(34,3,3)";
    btn.innerHTML=`Add Item <span><ion-icon name="add-circle-outline"></ion-icon></span>`;
    addedItem();
}

let total=0;
const updateTotal=()=>{
    total=0;
    item.forEach(services=>{
        total += Number(services.price);
    });
    document.getElementById("totalAmount").innerHTML=`<td colspan="2">total amount:</td>
              <td>₹ ${total}</td>`;
}

function sendMail(){
    let services= item.map(services=>services.name);    
    const tempParams = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        cartBody:services,
        totalAmount:total
    };
    // console.log(tempParams.cartBody);
    // console.log(tempParams.totalAmount);
    emailjs.send('service_wo632k5','template_wxm0fh4',tempParams)
}

const bookNow_btn=document.getElementById('book-now');
bookNow_btn.addEventListener('click',async()=>{
    if(isbooked){
        alert('already booked');
        return;
    }
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    if(name.length==0 || email.length==0 || phone.length==0){
        alert('Please fill all the details');
        return;
    }
    if(item.length==0)
        {
            alert('Please add some services to your cart');
            return;
        }
    try{
        sendMail();
        alert('Mail sent successfully');
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("phone").value="";
        addBtn.forEach(btn=>{
            let btnName=btn.getAttribute("data-name");
            if(matchedItem(btnName)){
                resetBtn(btnName,btn);
            }
        })
        clear();
        updateTotal();
        msg();
        isbooked=true;
        bookNow_btn.disabled=true;
        bookNow_btn.style.opacity="0.6";
        bookNow_btn.style.cursor="not-allowed";
    }catch(error){
        console.error("somthing went wrong",error);
        alert('something went wrong');
    }
    
});
 

function msg(){
    const message=document.createElement('p');
    message.innerHTML="Thank you For Booking the Service We will get back to you soon!";
    message.style.color='green';
    message.style.fontSize='0.7rem';
    message.style.fontWeight='400';
    const content = document.querySelector('.item4');
    content.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 3000);
}
function clear(){
    item=[];
    itemInfo.innerHTML=`<tr class="empty">
                    <td colspan="3" class="empty-text">
                        <img src="https://cdn-icons-png.flaticon.com/512/4208/4208394.png" width="60">
                        <p>No Items Added</p>
                         <p class="empty-para">Add items to the cart from the services bar</p>
                    </td>
                </tr>`;
    updateTotal();
}
