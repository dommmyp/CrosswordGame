function isValidHttpUrl(string) {
   let url;
   try {
     url = new URL(string);
   } catch (_) {
     return false;
   }
   if(url.protocol === "http:" || url.protocol === "https:"){
      return url
   } else{
      return false;
   }
 }
 console.log("http://example.com: "+isValidHttpUrl("https://google.com"));
 console.log("example.com: "+isValidHttpUrl("example.com"));