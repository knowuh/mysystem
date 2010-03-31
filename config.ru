require 'appengine-rack'
AppEngine::Rack.configure_app(
  :application => 'ccmysystem',
  :version => 3)
require 'app'
run Sinatra::Application