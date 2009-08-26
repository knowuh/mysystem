
describe 'My System Utiltities'

  it 'should provide a reasonable debug method.'
    debug.should_not.be_null
    debug.should_not.be_undefined
    -{ debug('foo') }.should_not.throw_error
  end
  
end
