function getOutput(f, oid, args, mode) {
    f = "php/" + f
    if (mode == 1){
        getRequest(
             f, // URL for the PHP file
             drawOutput,  // handle successful request
             drawError,    // handle error
             oid,
             "?" + args
        );
    }else if (mode == 2){
        getRequest(
             f, // URL for the PHP file
             setOutput,  // handle successful request
             drawError,    // handle error
             oid,
             "?" + args
        );
    }
    return false;
}
// handles drawing an error message
function drawError() {
    var container = document.getElementById('output');
    container.innerHTML = 'Bummer: there was an error!';
}
// handles the response, adds the html
function drawOutput(responseText, oid) {

    var container = document.getElementById(oid);
    if (oid == "radiothread"){
        container.href = responseText;
    }else{
        container.innerHTML = responseText;
    }
}
function setOutput(responseText, oid) {
    //var container = document.getElementById(oid);
    //container.innerHTML = responseText;
    window.phpOut = responseText;
}
function getRequest(url, success, error, oid, args) {
    var req = false;
    try{
        // most browsers
        req = new XMLHttpRequest();
    } catch (e){
        // IE
        try{
            req = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            // try an older version
            try{
                req = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                return false;
            }
        }
    }
    if (!req) return false;
    if (typeof success != 'function') success = function () {};
    if (typeof error!= 'function') error = function () {};
    req.onreadystatechange = function(){
        if(req.readyState == 4) {
                    return req.status === 200 ? 
                success(req.responseText, oid) : error(req.status);
        }
    }
    url=url + args;
    req.open("GET", url, true);
    req.send(null);
    return req;
}
