
describe 'Path based Data Service (DSService())'
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
    data_service.readKey.should_be(read_key)
    data_service.writeKey.should_not.be_null()
    data_service.postPath.should_be(path)
  end
  
  it 'should have a reasonable toString method'
    data_service.should_respond_to('toString');
    data_service.toString().should_not.be_null();
    data_service.toString().should_match("Service");
    data_service.toString().should_match(path);
    data_service.toString().should_match(data_service.writeKey);
  end
  
  it 'DSService should have a methods to save and load Data'
    data_service.should_respond_to('save')
    data_service.should_respond_to('load')
  end
  
  
  
end
