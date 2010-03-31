describe 'Check env.rhino.js if the name conflict fix has been applied'

  it "shouldn't break on name conflict of Element with prototype.js"
    load('spec/support/env.rhino.js')
    load('spec/library-test/element.js')
    -{document.createElement('test_element')}.should_not.throw_error
    -{document.createElementNS('http://www.w3.org/1999/xhtml', 'test_element')}.should_not.throw_error
    -{new HTMLElement(document)}.should_not.throw_error
  end
  
end
