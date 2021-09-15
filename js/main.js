
var bkName = document.getElementById("BookMarkName");
var wbUrl = document.getElementById("Websiturl");
var div = document.getElementById("test");
var inputs = document.getElementsByClassName("form-control");
var btnSrch = document.getElementById("btn-Srch");
var btnSubmit = document.getElementById("btn-Sub");
var currentindex =0;
var contacts = [];

if(JSON.parse(localStorage.getItem("BookMarkerList")) != null){

     contacts = JSON.parse(localStorage.getItem("BookMarkerList"));
     dispalyData();

}

btnSubmit.onclick = function()
{   
    var regx = /^[a-z ,.'-]+$/i;
    var regxw = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    if(!regx.test(bkName.value) && !regxw.test(wbUrl.value)){
        alert("Bookmark Name or Url NOT Valid");
    }else if(btnSubmit.innerHTML == "Update"){
        updataItem();       
    }else{
        addBookMark();
    }

    dispalyData();
    clearform();  

    
}

function addBookMark(){
    var contact =
   {
       bookMarkName:bkName.value,
       Websiturl:wbUrl.value

   }
   contacts.push(contact);
   localStorage.setItem("BookMarkerList" , JSON.stringify(contacts));

}
function dispalyData(){
     var count = '';
     for(i=0 ; i < contacts.length; i++){
         count +=`
                <div class=' output  m-1 p-3 d-flex justify-content-center'>
                     <div  class='d-flex justify-content-between align-items-center w-100  '>
                        <h4 id='bName' class='p-3'>${contacts[i].bookMarkName}</h4>
                        <div class=''>
                            <a type='button' class='btn btn-primary m-1' href=' ${contacts[i].Websiturl}'target='blank'>vist</a>
                            <button onclick='deleteitem(${i})' type='button' class='btn btn-danger m-1'>Delete</button>
                            <button onclick='getitem(${i})' type='button' class='btn bg-warning m-1'>Update</button>

                        </div>
                    </div>
                </div>`
     }
     document.getElementById("test").innerHTML = count;

}
function clearform(){
   for(var i= 0 ; i < inputs.length ; i++){
       inputs[i].value = "";
   }
}
function deleteitem(index){
    contacts.splice(index,1);
    dispalyData();
    localStorage.setItem("BookMarkerList" , JSON.stringify(contacts));
}
btnSrch.onkeyup = function(){
    var trs ='';
    for(i=0 ; i < contacts.length; i++){
        if(contacts[i].bookMarkName.toLowerCase().includes(this.value.toLowerCase()) ){
            trs +=`
            <div class=' output  m-1 p-3 d-flex justify-content-center'>
                 <div  class='d-flex justify-content-between align-items-center w-100  '>
                    <h4 id='bName' class='p-3'>${contacts[i].bookMarkName}</h4>
                    <div class=''>
                        <a type='button' class='btn btn-primary m-1' href=' ${contacts[i].Websiturl}'target='blank'>vist</a>
                        <button onclick='deleteitem(${i})' type='button' class='btn btn-danger m-1'>Delete</button>
                        <button onclick='getitem(${i})' type='button' class='btn bg-warning m-1'>Update</button>
                    </div>
                </div>
            </div>`
        } 
    }
    document.getElementById("test").innerHTML = trs;
    
}
function getitem(index){
    bkName.value = contacts[index].bookMarkName ;
    wbUrl.value = contacts[index].Websiturl ;
    btnSubmit.innerHTML = "Update" ; 
    currentindex = index;
}
function updataItem(){
    var contact =
    {
        bookMarkName:bkName.value,
        Websiturl:wbUrl.value
 
    }
    contacts[currentindex] = contact;
    localStorage.setItem("BookMarkerList" , JSON.stringify(contacts));
    btnSubmit.innerHTML = "Submit" ; 

}
