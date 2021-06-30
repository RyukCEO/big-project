function myFunction() {
    var element = document.querySelectorAll("setting-button");
    element.classList.toggle("show");
    
    var element = document.getElementById("instagramg");
    element.classList.toggle("hide");
    }



const messagekeftbavbarbutton = document.getElementById("messagekeftbavbarbutton")
messagekeftbavbarbutton.onclick(
    function redirecttomessagepage(response, urlPath){
        document.getElementById("thebody").innerHTML = response.html;
        document.title = response.pageTitle;
        window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"/message", urlPath);
        history.pushState({}, "", "/message")
    }

    
)