
var DSService = function(){
  this.data = "";
  this.read_key = "";
  this.write_key = "";
  this.postPath = "/models/"
};

DSService.prototype = {
  // THESE are the code signatures that 
  // the berklee VLE uses
  // saveHtmlState: function(data) {
  // },
  // 
  // getLatestHtmlState: function() {
  // },
  // 
  setKeys: function(read,write) {
    if (read) {
      this.editor.options.modelId = read
      this.editor.load(read);
    }
    if (write) {
      this.write_key = write;
    }
    else {
      this.write_key= new UUID().toString();
    }
  },
  // write the data
  save: function(data) {
      var post_to = this.postPath + "/" + this.write_key;
      var xmlhttp = HTTP.newRequest();
      xmlhttp.open('PUT', post_to, false);
      xmlhttp.send(data);
      this.read_key = this.write_key;
  },

  load: function(context,callback) {
    var get_from = this.getPath + "/" + this.write_key;
	  if (this.read_key) {
	    HTTP.getText(this.dataDir + "/" + this.options.modelId, context, callback); 
    }
	}
};
