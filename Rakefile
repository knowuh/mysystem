require 'rubygems'
require 'Sprockets'
require 'selenium/rake/tasks'
require 'spec/rake/spectask'


@libs = %w{
  lib/YUI/YUI-combo.js
  lib/prototype.js
  lib/http.js
  lib/excanvas.js
  lib/canvastext.js
  lib/uuid.js
}

@my_system = %w{ 
  engine/mysystem-engine.js 
  js/MySystemUtil.js  
  js/ds/RestDS.js  
  js/ds/VleDS.js  
  js/ds/GGearsDS.js
  js/ds/MocDS.js
  js/ds/CookieDS.js
  js/MySystemPropEditor.js
  js/MySystemWireLabel.js  
  js/MySystemContainer.js  
  js/MySystemData.js  
  js/MySystemEditor.js  
  js/MySystem.js
}

@wire_it = %w{
  js/wireit/WireIt.js 
  js/wireit/CanvasElement.js 
  js/wireit/Wire.js 
  js/wireit/Terminal.js 
  js/wireit/util/DD.js 
  js/wireit/util/DDResize.js 
  js/wireit/Container.js 
  js/wireit/ImageContainer.js 
  js/wireit/Layer.js 
  js/wireit/util/inputex/FormContainer-beta.js 
  js/wireit/LayerMap.js 
  js/wireit/ImageContainer.js
}

@print = %w{
  lib/prototype.js
  lib/raphael-min.js
  js/MySystemUtil.js
  js/MySystemPrint.js
}

@report_file ="#{File.dirname(__FILE__)}/tmp/report.html"
@jar_path = "#{File.dirname(__FILE__)}/bin/selenium.jar"
def simple_sprocket(list,filename)
  secretary = Sprockets::Secretary.new(
    :source_files => list
  )
  concatenation = secretary.concatenation
  concatenation.save_to(filename)
end

Selenium::Rake::RemoteControlStartTask.new("start_selenium") do |rc| 
  puts "jar path = #{@jar_path}"
  rc.port = 4444
  rc.timeout_in_seconds = 3 * 60
  rc.background = true
  rc.wait_until_up_and_running = true
  rc.jar_file = @jar_path 
  rc.additional_args << "-singleWindow"
end

Selenium::Rake::RemoteControlStopTask.new("stop_selenium") do |rc|
  rc.host = "localhost"
  rc.port = 4444
  rc.timeout_in_seconds = 3 * 60
end

desc "Run all examples"
Spec::Rake::SpecTask.new('test') do |t|
  t.spec_files = FileList['tests/*.spec.rb']
  t.spec_opts << '--color'
  t.spec_opts << "--require 'rubygems,selenium/rspec/reporting/selenium_test_report_formatter'"
  t.spec_opts << "--format=Selenium::RSpec::SeleniumTestReportFormatter:#{@report_file}"
  t.spec_opts << "--format=progress"
end

desc "test report"
task :report do
  %x"open #{@report_file}"
end
  

desc "the default task builds a distrobution in the dist directory"
task :default => :all_js

desc "combine misc. third party libs into one js file"
task :libs do
  simple_sprocket(@libs,'libs')
end

desc "combine all of the my_system libraries into one js file"
task :my_system do
  simple_sprocket(@my_system,'my_system')
end

desc "combine all of the wirit libraries into one js file"
task :wire_it do
  simple_sprocket(@wire_it,'wire_it')
end

desc "combine all of the javascript files, and make a distrobution directory"
task :all_js do
  %x{rm -rf ./dist}
  %x{mkdir -p ./dist/lib }
  %x{mkdir -p ./dist/css/YUI }
  
  simple_sprocket(@libs + @wire_it + @my_system, 'dist/all.js')
  simple_sprocket(@print, 'dist/print.js')
  %x{cp mysystem-for-dist.html dist/mysystem.html}
  %x{cp print-for-dist.html dist/print.html}
  %x{cp -r lib/excanvas.js dist/lib}
  %x{cp *.json dist}
  %x{cp -r images dist}
  %x{cp -r css/* dist/css}
  %x{cp ./lib/YUI/*.css ./dist/css/YUI}
end

