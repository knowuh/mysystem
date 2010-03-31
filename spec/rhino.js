load('spec/rhino-common.js');

specResults
.run({ reporter: JSpec.reporters.JUnit, fixturePath: 'spec/fixtures' })
.report();
