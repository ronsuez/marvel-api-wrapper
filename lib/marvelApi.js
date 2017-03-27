var crypto = require('crypto');
var axios = require('axios');

function MarvelApi(key, secretkey) {
  this.uri = 'https://gateway.marvel.com:443/v1/public';
  this.key = key || process.env.MARVEL_KEY;
  this.privkey = secretkey ||  process.env.MARVEL_SECRET_KEY;
}

MarvelApi.prototype._createHash = function _createHash() {
  var ts = new Date().getTime();
  var hash = crypto.createHash('md5').update(ts + this.privkey + this.key).digest('hex');
  return { hash, ts };
}

MarvelApi.prototype._constructUri = function _constructUri(endpoint, params) {
  let meta = this._createHash();
  let url = `${this.uri}/${endpoint}?apikey=${this.key}&hash=${meta.hash}&ts=${meta.ts}`
  return params && params.length ? url + `&nameStartsWith=${params}` : url;
}

MarvelApi.prototype.fetchCharacters = function fetchCharacters(text) {
  let url = this._constructUri('characters', text);
  return axios.get(url).then((resp) => resp.data);
}

MarvelApi.prototype.fetchComicInfo = function fetchComicInfo(id) {
  let url = this._constructUri(['comics', id].join('/'), null);
  return axios.get(url).then((resp) => resp.data);
}

module.exports = MarvelApi;