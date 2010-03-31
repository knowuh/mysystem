load('spec/library-test/rhino-common.js');

specResults
.run({ reporter: JSpec.reporters.JUnit, fixturePath: 'spec/fixtures' })
.report();
