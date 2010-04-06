APPSPOT_DIR = 'appspot'
namespace :appspot do
  
  desc "sets up the appspot directory"
  task :mkdir do
    %x(mkdir -p #{APPSPOT_DIR}/lib)
    %x(mkdir -p #{APPSPOT_DIR}/public)
    %x(mkdir -p #{APPSPOT_DIR}/images)
  end
  

  desc "create sinatra app"
  task :sinatra_app => [:mkdir, :"combine:all"] do
    %x(cp app.rb #{APPSPOT_DIR})
    %x(cp config.* #{APPSPOT_DIR})
    %x(cp config.* #{APPSPOT_DIR})
    %x(cp lib/util.rb #{APPSPOT_DIR}/lib/util.rb)
    %x(cp -r models #{APPSPOT_DIR})
    %x(cp -r public #{APPSPOT_DIR})
    %x(cp -r .gems #{APPSPOT_DIR})
    %x(cp -r Gemfile #{APPSPOT_DIR})
  end
  
  desc "deploy sinarta app"
  task :deploy => [:sinatra_app] do
    puts "please type 'appcfg.rb update #{APPSPOT_DIR}'"
    puts "enter your gmail email address and password when prompted"
  end
  
end
