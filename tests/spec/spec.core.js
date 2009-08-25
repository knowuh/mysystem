
describe 'MySystem'
  before
    mySystem = new MySystem();
  end

  it 'return value of MySystemDemo should not be null'
    mySystem.should_not.be_null
  end
  
  it 'MySystemDemo should have a method to setDataSTore'
    mySystem.should_respond_to('setDataService')
  end

end

