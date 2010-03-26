require 'appengine-rack'
AppEngine::Rack.configure_app(
  :application => 'ccmysystem',
  :version => 2)
require 'app'
run Sinatra::Application