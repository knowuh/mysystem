require 'rubygems'

load 'lib/tasks/hudson.rake'
load 'lib/tasks/mysystem.rake'
load 'lib/tasks/appspot.rake'
# load 'lib/tasks/selenium-test.rake'

desc "The default task builds a distribution in the public directory"
task :default => [:"combine:all"]


namespace :gems do
  
  desc "install the gemset mysystem.gems without rvm"
  task :install do
    File.open("mysystem.gems", "r") do | infile|
      while (line = infile.gets)
        unless line =~ /^#/ 
          %x[gem install #{line}]
        end
      end
    end
  end
  
  desc "print required gems"
  task :print do
    File.open("mysystem.gems", "r") do | infile|
      while (line = infile.gets)
        unless line =~ /^#/ 
          puts line
        end
      end
    end
  end
  
end