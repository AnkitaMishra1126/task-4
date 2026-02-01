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
     
  }
//  itemInfo.appendChild;
  updateTotal();
};

function matchedItem(name){
    return item.some(services=> services.name === name);
}
function resetBtn(named,btn){
    item = item.filter(i => i.name !==named);
    btn.style.backgroundColor=" rgb(227, 227, 227";
    btn.style.color="rgb(34,3,3)";
    btn.innerHTML=`Add Item <span><ion-icon name="add-circle-outline"></ion-icon></span>`;
    addedItem();
}
let total=0;
const updateTotal=()=>{
    item.forEach(services=>{
        total += services.price;
    });
    document.getElementById("totalAmount").innerHTML=`<td colspan="2">total amount:</td>
              <td>${total}</td>`;
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
    .then(()=> alert("email sent").catch(()=>alert("failed to send")));
    msg();
    isbooked=true;
}

function msg(){
    const message=document.createElement('p');
    message.innerHTML="Thank you For Booking the Service We will get back to you soon!";
    message.style.color='green';
    const content = document.querySelector('.item4');
    content.appendChild(message);
    setTimeout(() => {
        message.remove();
    }, 2000);
}