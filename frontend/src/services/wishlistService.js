const baseUrl = "http://localhost:6060/wishlist";

export async function newList(userID) {
    const listID = {userid: userID}
    try{
        const response = await fetch(baseUrl+"/new",{
            method: "POST",
    
            // Adding body or contents to send
            body: JSON.stringify(listID),
            
            // Adding headers to the request
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
    
        });

        if(!response.ok){
            throw response;
        }else{
            return("ok");
        }
        
        
    }catch(error){
        let responseTxt = await error.text();
        return responseTxt;
    }
}

export async function getWishListByID(id) {
    const response = await fetch(baseUrl+"/"+id);
    console.log("Fetching details of "+id);
    if(response.ok){
        return response.json()
    }else{
        return response.status(500).send({ error: "Error loading list" })
    }
    throw response;
}

export async function addItemToList(itemDetails, listID){
    try{
        const response = await fetch(baseUrl+"/"+listID,{
            method: "POST",
    
            // Adding body or contents to send
            body: JSON.stringify(itemDetails),
            
            // Adding headers to the request
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            }
    
        });

        if(!response.ok){
            throw response;
        }else{
            return("ok");
        }
        
        
    }catch(error){
        let responseTxt = await error.text();
        return responseTxt;
    }
}

export async function deleteItemFromList(itemID, listID){
    try{
        const response = await fetch(baseUrl+"/"+listID+"/"+itemID,{
            method: "DELETE",    
        });

        if(!response.ok){
            throw response;
        }else{
            return("ok");
        }
        
        
    }catch(error){
        let responseTxt = await error.text();
        return responseTxt;
    }
}
