require 'selenium/rake/tasks'
require 'spec/rake/spectask'

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
