load('spec/lib/jspec.js');
load('spec/lib/jspec.timers.js');
load('spec/lib/jspec.xhr.js');
load('spec/lib/jspec.shell.js');
load('spec/support/junit.xml.js');

var specResults = JSpec
.exec('spec/library-test/spec.env.rhino.js')
