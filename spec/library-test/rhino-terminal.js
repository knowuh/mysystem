load('spec/library-test/rhino-common.js');

specResults
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report();
