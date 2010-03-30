load('spec/rhino-common.js');

specResults
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report();
