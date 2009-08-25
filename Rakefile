require 'rubygems'
require 'Sprockets'

@libs = %w{lib/prototype.js, lib/http.js, lib/canvastext.js}
@my_system = %w{ engine/mysystem-engine.js js/DSService.js  js/VleDSService.js  js/MocDSService.js  js/uuid.js  js/MySystemUtil.js  js/MySystemPropEditor.js  js/MySystemWireLabel.js  js/MySystemContainer.js  js/MySystemData.js  js/MySystemEditor.js  js/MySystem.js}
@wire_it = %w{js/wireit/WireIt.js js/wireit/CanvasElement.js js/wireit/Wire.js js/wireit/Terminal.js js/wireit/util/DD.js js/wireit/util/DDResize.js js/wireit/Container.js js/wireit/ImageContainer.js js/wireit/Layer.js js/wireit/util/inputex/FormContainer-beta.js js/wireit/LayerMap.js js/wireit/ImageContainer.js}

def simple_sprocket(list,filename)

  secretary = Sprockets::Secretary.new(
    :source_files => list
  )
  concatenation = secretary.concatenation
  concatenation.save_to("#{filename}.js")
end


task :default => :all_js


task :libs do
  simple_sprocket(@libs,'libs')
end

task :my_system do
  simple_sprocket(@my_system,'my_system')
end

task :wire_it do
  simple_sprocket(@wire_it,'wire_it')
end

task :all_js do
  simple_sprocket(@libs + @wire_it + @my_system,'all')
end

