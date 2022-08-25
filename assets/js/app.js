let cl = console.log;

let studentForm = document.getElementById("studentForm");
let stdInfo = document.getElementById("stdInfo");
let fName = document.getElementById("fName");
let lName = document.getElementById("lName");
let email = document.getElementById("email");
let contact = document.getElementById("contact");
let submitBtn = document.getElementById("submit");
let updateBtn = document.getElementById("update")
let stdArr = [];

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}
function onStdInfoSubmit(e){
    e.preventDefault();
    let obj = {
        firstName : fName.value,
        lastName : lName.value,
        email : email.value,
        contact : contact.value,
        id : uuidv4(),
    }
    stdArr.push(obj)
    localStorage.setItem("stdArr",JSON.stringify(stdArr))
    cl(stdArr)
    templating(stdArr)
    e.target.reset()
}
function templating(ele){
    let result = "";
    ele.forEach((element, i) => {
        result += `<tr>
        <td>${i+1}</td>
        <td>${element.firstName}</td>
        <td>${element.lastName}</td>
        <td>${element.email}</td>
        <td>${element.contact}</td>
        <td><button class="btn btn-success" data-id=${element.id} onclick = "onEditHandler(this)">Edit</button></td>
        <td><button class="btn btn-danger" data-id=${element.id} onclick = "onDeleteHandler(this)">Delete</button></td>
    </tr>`
    });
    stdInfo.innerHTML = result;
}

function onEditHandler(e){
    let getEditId = e.getAttribute("data-id");
    localStorage.setItem("setEditId", getEditId)
    let arr = getLocalData();
    let getObj = arr.find((ele)=> ele.id === getEditId)
    fName.value = getObj.firstName,
    lName.value = getObj.lastName,
    email.value = getObj.email,
    contact.value = getObj.contact
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}

function onStdInfoUpdate(){
    let getId = localStorage.getItem("setEditId")
    let arr = getLocalData();
    // let updatedobj ={
    //     firstName : fName.value,
    //     lastName : lName.value,
    //     email : email.value,
    //     contact : contact.value
    // } 
    // cl(updatedobj)
    arr.forEach(ele => {
        if(ele.id === getId){
            ele.firstName = fName.value,
            ele.lastName = lName.value,
            ele.email = email.value,
            ele.contact = contact.value
        }
    })
    templating(arr)
    submitBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")
    localStorage.setItem("stdArr",JSON.stringify(arr))
    // let getUpdateId = localStorage.getItem("setEditId")
    // cl(updatedobj)
    studentForm.reset()
}

function onDeleteHandler(ele){
    // cl("Click on Delete is working", ele)
    let getDeleteId = ele.dataset.id;
    cl(getDeleteId)
    let getData = getLocalData();
    stdArr = getData.filter(ele => ele.id !== getDeleteId)
    templating(stdArr);
    localStorage.setItem("stdArr", JSON.stringify(stdArr))
}

const getLocalData = ()=> {
    return JSON.parse(localStorage.getItem("stdArr"))
}
if(localStorage.getItem("stdArr")){
    stdArr = getLocalData();
    templating(stdArr)
}





studentForm.addEventListener("submit", onStdInfoSubmit)
updateBtn.addEventListener("click", onStdInfoUpdate)