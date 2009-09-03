
describe 'Path based Data Service (DS)'
  before
    write_key = "write"
    read_key = "read"
    path = "test"
    data_service = new RestDS(read_key,write_key,path);
  end

  it 'constructor should return valid instance'
    data_service.should_not.be_null
  end
  
  it 'should have good keys and path info'
    data_service.readKey.should.be(read_key)
    data_service.writeKey.should_not.be_null()
    data_service.postPath.should.be(path)
  end
  
  it 'should have a reasonable toString method'
    data_service.should_respond_to('toString');
    data_service.toString().should_not.be_null();
    data_service.toString().should_match("Service");
    data_service.toString().should_match(path);
    data_service.toString().should_match(data_service.writeKey);
  end
  
  it 'GGearsDS should have a methods to save and load Data'
    data_service.should_respond_to('save')
    data_service.should_respond_to('load')
  end  
end



describe 'Google Gears DS (GGearsDS)'
  before
    write_key = "write"
    read_key = "read"
    table = "test"
    gg_service = new GGearsDS(read_key,write_key,table);
  end

  it 'GGearsDS constructor should return valid instance'
    gg_service.should_not.be_null
  end
  
  it 'GGearsDS should have good keys and table info'
    gg_service.readKey.should.be(read_key)
    gg_service.writeKey.should_not.be_null()
    gg_service.table.should.be(table)
    gg_service.db.should.be(table)    
  end
  
  it 'GGearsDS should have a reasonable toString method'
    gg_service.should_respond_to('toString');
    gg_service.toString().should_not.be_null();
    gg_service.toString().should_match("Service");
    gg_service.toString().should_match(table);
    gg_service.toString().should_match(gg_service.writeKey);
  end
  
  it 'GGearsDS should have a methods to save and load Data'
    gg_service.should_respond_to('save')
    gg_service.should_respond_to('load')
  end
  
  it 'GGearsDS should save data!'
    var _data = 'some crazy data';
    var _read_data = ""
    gg_service.save(_data);
    self = this;
    gg_service.load(self,function(data,self) {
         _read_data = data;
    });
    
    _read_data.should.be(_data);
  end
end
  
describe 'Cookie DataStore (CookieDS)'
  before
    write_key = "write"
    read_key = "read"
    days = 14
    cookie_ds = new CookieDS(read_key,write_key,days);
  end

  it 'CookieDS constructor should return valid instance'
    cookie_ds.should_not.be_null
  end

  it 'CookieDS should have good keys and table info'
    cookie_ds.readKey.should.be(read_key)
    cookie_ds.writeKey.should_not.be_null()
    cookie_ds.days.should.be(days) 
  end

  it 'CookieDS should have a reasonable toString method'
    cookie_ds.should_respond_to('toString');
    cookie_ds.toString().should_not.be_null();
    cookie_ds.toString().should_match("Service");
    cookie_ds.toString().should_match(write_key);
  end

  it 'CookieDS should have a methods to save and load Data'
    cookie_ds.should_respond_to('save')
    cookie_ds.should_respond_to('load')
  end

  it 'CookieDS should save data!'
    var _data = 'some crazy data';
    var _read_data = ""
    cookie_ds.save(_data);
    self = this;
    cookie_ds.load(self,function(data,self) {
         _read_data = data;
    });
    _read_data.should.be(_data);
  end
end


