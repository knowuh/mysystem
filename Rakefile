require 'rubygems'
require 'Sprockets'

@libs = %w{
  lib/prototype.js, 
  lib/http.js, 
  lib/canvastext.js
  lib/uuid.js  
}

@my_system = %w{ 
  engine/mysystem-engine.js 
  js/DSService.js  
  js/VleDSService.js  
  js/MocDSService.js  
  js/MySystemUtil.js  
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

def simple_sprocket(list,filename)
  secretary = Sprockets::Secretary.new(
    :source_files => list
  )
  concatenation = secretary.concatenation
  concatenation.save_to("dist/#{filename}.js")
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
  simple_sprocket(@libs + @wire_it + @my_system, 'all')
  %x{cp mysystem-for-dist.html dist/mysystem.html}
  %x{cp -r lib/excanvas.js dist/lib}
  %x{cp -r lib/prototype.js dist/lib}
  %x{cp -r images dist}
  %x{cp -r css dist}
end

