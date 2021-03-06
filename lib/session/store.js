var rand_str = require('../utils').rand_str;

var config = require('../katana').Config().session;

Role('Katana.Core.Session.Store', {
  requires: ['create', 'save', 'set', 'get'],
	
  have: {
	id: null, data: {}
  },
	
  methods: {
	create: function() {
	  this.id = rand_str(config.key_length);
	  this.data = Joose.O.copy(config.defaults);
	},
		
	set: function(name, value) {
	  var Session = this;
			
	  if (typeof(name) === 'object') {
	    for (var key in name) {
		  Session.data[key] = name[key];
		}
	  } else { Session.data[name] = value; }
	},
		
	get: function(name, def_value) {
	  if (!name) { return this.data; }
			
	  return (this.data[name] !== undefined ? this.data[name] : def_value);
	},
		
	delete: function(name) {
	  if (!key) { this.data = {}; return; }

	  if (this.data[name] !== undefined) {
		return delete this.data[name];
	  }
	}
  }
});

module.exports = Katana.Core.Session.Store;
