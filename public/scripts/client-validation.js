document.getElementById('post-blog').onsubmit = () => {

let isValid= true;
//Validation for title
let title = document.getElementById('title').value.trim();
if(title ===""){
    document.getElementById("err-title").style.display= "block";
    isValid =false;
}








    return isValid;
}    
function clearErrors(){
    let errors = document.getElementsByClassName("err");
    for(let i=0; i<errors.length; i++){
        errors[i].style.display ="none"
    }
}


