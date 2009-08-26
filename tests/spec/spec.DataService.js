
describe 'Path based Data Service (DSService)'
  before
    write_key = "write"
    read_key = "read"
    path = "test"
    data_service = new DSService(read_key,write_key,path);
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
  
  it 'GGearsDSService should have a methods to save and load Data'
    data_service.should_respond_to('save')
    data_service.should_respond_to('load')
  end  
end

describe 'Google Gears DS (GGearsDSService)'
  before
    write_key = "write"
    read_key = "read"
    table = "test"
    gg_service = new GGearsDSService(read_key,write_key,table);
  end

  it 'GGearsDSService constructor should return valid instance'
    gg_service.should_not.be_null
  end
  
  it 'GGearsDSService should have good keys and table info'
    gg_service.readKey.should.be(read_key)
    gg_service.writeKey.should_not.be_null()
    gg_service.table.should.be(table)
    gg_service.db.should.be(table)    
  end
  
  it 'GGearsDSService should have a reasonable toString method'
    gg_service.should_respond_to('toString');
    gg_service.toString().should_not.be_null();
    gg_service.toString().should_match("Service");
    gg_service.toString().should_match(table);
    gg_service.toString().should_match(gg_service.writeKey);
  end
  
  it 'GGearsDSService should have a methods to save and load Data'
    gg_service.should_respond_to('save')
    gg_service.should_respond_to('load')
  end
  
  it 'GGearsDSService should save data!'
    _data = 'some crazy data';
    gg_service.save(_data);

  end
  
end

