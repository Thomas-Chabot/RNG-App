class Request {
  constructor(url){
    this._url = url;
  }

  postData(data){
    return new Promise((fulfill, reject) => {
      fetch(this._url + "&text=" + data).then(
        res => res.json()
      ).then(result => {
        fulfill(result);
      });
    });
  }

  get(path){
    return new Promise((fulfill, reject) => {
      console.log(this._url + path);
      fetch(this._url + path).then(
        res => res.json()
      ).then(result => {
        fulfill(result);
      })
    })
  }
}

export default Request;
