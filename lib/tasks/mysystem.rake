require 'sprockets'

@dist_dir = 'public'

@libs = %w{
  YUI/YUI-combo.js
  http.js
  excanvas.js
  canvastext.js
  uuid.js
}.map do |path|
  'lib/' + path
end

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
  js/MySystemNote.js
  js/MySystemData.js  
  js/MySystemEditor.js  
  js/MySystem.js
  js/GoalPanel.js
  js/GoalPanel.js
}.map do |path|
  'src/' + path
end

@wire_it = %w{
  WireIt.js 
  CanvasElement.js 
  Wire.js 
  Terminal.js 
  util/DD.js 
  util/DDResize.js 
  Container.js 
  ImageContainer.js 
  Layer.js 
  util/inputex/FormContainer-beta.js 
  LayerMap.js 
  ImageContainer.js
}.map do |path|
  'src/js/wireit/' + path
end

@print = %w{
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

namespace :combine do
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
  task :all do
    %x(rm -rf ./#{@dist_dir})
    %x(mkdir -p ./#{@dist_dir}/lib)
    %x(mkdir -p ./#{@dist_dir}/css/YUI)
  
    simple_sprocket(@libs + @wire_it + @my_system, "#{@dist_dir}/mysystem_complete.js")
    simple_sprocket(@print, "#{@dist_dir}/mysystem_print.js")
    %x(cp src/mysystem-for-dist.html #{@dist_dir}/mysystem.html)
    %x(cp src/print-for-dist.html #{@dist_dir}/print.html)
    %x(cp -r lib/excanvas.js #{@dist_dir}/lib)
    %x(cp src/*.json #{@dist_dir})
    %x(cp -r src/images #{@dist_dir})
    %x(cp -r src/css/* #{@dist_dir}/css)
    %x(cp ./lib/YUI/*.css ./#{@dist_dir}/css/YUI)
  end
end
