(function(){
    JSpec.include({
        name: 'JUnit',
        reporters: {
            JUnit: function(results, options) {
            JSpec.each(results.allSuites, function(suite) {
                var attribs = {
                    name: suite.description,
                    tests: suite.specs.length,
                    assertions: 0,
                    failures: 0,
                    specs: 0
                };
                var content = JSpec.inject(suite.specs, '', function(content, spec) {
                    attribs.assertions += spec.assertions.length;
                    attribs.failures += spec.passed() ? 0 : 1;
                    attribs.specs += 1;
                    content += ' <testcase name="'+spec.description+'" assertions="'+spec.assertions.length+'"> \n';
                    JSpec.each(spec.failures(), function(failure) {
                        content += ' <failure message="">' + failure.message + '</failure> \n'
                    });
                    content += ' </testcase> \n';
                    return content;
                });
                var w = new java.io.FileWriter('test-reports/' + suite.description + '.xml');
                w.write('<?xml version="1.0" encoding="UTF-8"?>\n');
                w.write(' <testsuite');
                for (var key in attribs) {
                    w.write(' ' + key + '="' + attribs[key] + '"');
                }
                w.write('>\n');
                w.write(content);
                w.write(' </testsuite>\n');
                w.close();
            });
            quit(results.stats.failures);
            }
        }
    });
})();