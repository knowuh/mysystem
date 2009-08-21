
describe 'MySystem'
  before
    mySystem = new MySystem();
  end

  it 'return value of MySystemDemo should not be null'
    mySystem.should_not.be_null
  end
  
  it 'MySystemDemo should have a method to setDataSTore'
    mySystem.should_respond_to('setDataStore')
  end

end

describe 'MySystemDataService'
  before
    ds = new DSService();
  end
  
 
  it 'return value of DSService should not be null'
    ds.should_not.be_null
  end
  
  it 'DSService should have a methods to save and load Data'
    ds.should_respond_to('save')
    ds.should_respond_to('load')
  end

end

