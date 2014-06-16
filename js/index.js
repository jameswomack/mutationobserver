/*jshint -W079 */
var $ = require('jquery');
var url = require('url');
var stringify = JSON.stringify;

function urlComponents(){
  var href = window.location.href;
  return stringify(url.parse(href));
}

var Index = function Index(){
 this.urlComponents = urlComponents();
 this._map = {};
 this._model = {};
 this._attributes = {};
};

Index.prototype.write = function(selector, content){
  $(selector).html(content);
};

Index.prototype.writeUrlComponents = function(){
  this.write('pre',this.urlComponents);
};

Index.prototype.data = function(){
  return {
    title: 'Foobar'
  };
};

Index.prototype.magicizeKey = function(o, key){
  var self = this;
  this._attributes[key] = null;
  Object.defineProperty(o, key, {
    get: function(){
      return self._attributes[key];
    },
    set: function(newValue){
      self._attributes[key] = newValue;
      $('*[data-text=' + key + ']').text(newValue);
    }
  });
};

Index.prototype.makeMap = function(){
  var $elements = $('*[data-text]');
  var self = this;
  $elements.each(function(){
    var $element = $(this);
    var key = $element.attr('data-text');
    self._map[key] = $element;
    self.magicizeKey(self._model, key);
  });
};

Index.prototype.render = function(){
  this.writeUrlComponents();
  var $titleElement = $('*[data-text="title"]');
  $titleElement.html('Foobar');
  this.makeMap();
};

var index = window.index = new Index();
index.render();

module.exports = Index;