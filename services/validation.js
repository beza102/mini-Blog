export function validateForm(data){

    //store all the validation errors in an array
    const errors= [ ];
    if(!data.fname || data.form.trim()===""){
        errors.push("Title is required");
        
    }
    if(!data.content || data.content.trim() === "" || data.content.length < 10) {
        errors.push("content is required or needs to be at least 10 characters");
    }
}