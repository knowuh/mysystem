
DataMapper::Logger.new(STDOUT, :debug) # :off, :fatal, :error, :warn, :info, :debug

if Config2['appspot']
  # Configure DataMapper to use the App Engine datastore 
  DataMapper.setup(:default, "appengine://auto")
  puts "loaded appengine driver"
else
  # in developer mode we use sqllite in memory only.
  DataMapper.setup(:default, 'sqlite3::memory:')
  puts "loaded sqlite3 driver"
end

class MySystemModel 
  include DataMapper::Resource
  property :msuuid,       String, :key=>true
  property :content,      Text
end

unless Config2['appspot']
  # this is probably only meaningful for local setup.
  MySystemModel.auto_migrate!
end
