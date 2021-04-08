import axios from "axios";

export const submit = ((call_back_fn, form_name, api) => {



    try {
       
        let form = document.getElementById(form_name);

        //check if id element exists
        if(typeof(form) == 'undefined' || form == null){
            throw 'Invalid id, element does not exist!';
        }

        //check if id is a valid form element
        if(form.nodeName != 'FORM'){
            throw 'Id element is not a form!';
        }

        //check if api is an object
        if(typeof(api) != 'object'){
            throw "api is not an object";
        }


        //check if api method has required obj keys
        if(!api.hasOwnProperty('url')){
            throw "url property is required in api object";
        }
        if(!api.hasOwnProperty('method')){
            throw "method property is required in api object";
        }
        if(api.method == ""){
            throw "api method is empty in object";
        }

    
        //check if api url is a valid http string
       
        if(api.url == ""){
            throw "api url property is empty in object";
        }

        if(!isValidHttpUrl(api.url)){
            throw "api url property is not a valid url";
        }
       


        //get form fields
        let formData = new FormData(form);

        let edit_api = { ...api };


        //append form data to data field
        edit_api.data = formData;

        //send form to destination
        axios({
            method: edit_api.method,
            url: edit_api.url,
            headers: edit_api.headers,
            data: edit_api.data,
        }).then(res => {
            call_back_fn(res)
        }).catch(err => {
            cosnole.log(err.response);
            call_back_fn(err.response);
        })

    } catch (e) {
        console.log(e);
    }

});

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
  }


