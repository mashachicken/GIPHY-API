export default class GiphyService {  
  static getGiphy(userSearch) {
    return new Promise(function(resolve, reject) {//Creates a Promise object --> wraps our API call request
      let request = new XMLHttpRequest(); // Saves XHR object in variable --> This object is used to interact with servers --> This it the acutual request from server for data
      const url = `http://api.giphy.com/v1/gifs/search?q=${userSearch}&api_key=${process.env.API_KEY}&limit=5`; //Saves our API call url in variable
      request.onload = function () { //.onload only triggered once when the response has already loaded
        if (this.status === 200) { //if we get a response, then load the data from the API call
          resolve(request.response);
        } else {
          reject(request.response); //if we don't get a response we still load the response from the API call
        }
      };
      request.open("GET", url, true); //three arguements are passed into .open method --> "GET" or "Post" the method of the request, url (var we saved above), Boolean value for whether the request is async or not
      request.send(); //Sends request to server --> This is the part that takes time, we have to wait for the response and load and parse it
    });
  }
}
