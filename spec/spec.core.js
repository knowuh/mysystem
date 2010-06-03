describe 'MySystem'
  before
    mySystem = new mysystem.MySystem();
  end

  it 'return value of MySystem should not be null'
    mySystem.should_not.be_null
  end
  
  it 'MySystem should have a method to setDataSTore'
    mySystem.should_respond_to('setDataService')
  end

end

