require "rubygems"
gem "rspec"
gem "selenium-client"
require "selenium/client"
require "selenium/rspec/spec_helper"

describe "MySystem" do
  attr_reader :selenium_driver
  alias :page :selenium_driver

  before(:all) do
    @this_dir = File.dirname(__FILE__)
    @test_dir = File.expand_path("#{@this_dir}/../test/")
    @base_dir = File.expand_path("#{@this_dir}/../")
    @base_url = "file://#{@base_dir}"
    @verification_errors = []
    @selenium_driver = Selenium::Client::Driver.new \
      :host => "localhost",
      :port => 4444,
      :browser => "*firefox",
      :url => "file://#{@base_dir}",
      :timeout_in_second => 60
  end

  before(:each) do
    puts "basedir: #{@base_dir}<br/>\b"
    @selenium_driver.start_new_browser_session
  end
  
  append_after(:each) do
    @selenium_driver.close_current_browser_session
    @verification_errors.should == []
  end
  
  it "should not navigate away when the backspace or delete keys are pressed" do
    page.open "#{@base_url}/blank.html"
    page.open "#{@base_url}/mysystem-dev.html"
    page.key_press "dom=window", "\\127"
    page.key_press "dom=window", "\\8"
    page.get_title.should == "MySystem"
  end
end
