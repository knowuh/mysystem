require 'sprockets'

@dist_dir = 'public'

@libs = %w{
  YUI/YUI-combo.js
  http.js
  excanvas.js
  canvastext.js
  uuid.js
  json2.js
}.map do |path|
  'lib/' + path
end

@my_system = %w{ 
  engine/mysystem-engine.js 
  js/ds/RestDS.js  
  js/ds/VleDS.js  
  js/ds/GGearsDS.js
  js/ds/MocDS.js
  js/ds/CookieDS.js
  js/mysystem-init.js 
  js/MySystem.js
  js/MySystemContainer.js
  js/MySystemData.js
  js/MySystemDragAndDropProxy.js
  js/MySystemEditor.js
  js/MySystemGoalPanel.js
  js/MySystemNote.js
  js/MySystemPropEditor.js
  js/MySystemReporter.js
  js/MySystemUtil.js
  js/StoryPanel.js
  js/StoryPart.js
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
  src/js/MySystemUtil.js
  src/js/MySystemPrint.js
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
    %x(mkdir -p ./#{@dist_dir}/css/jquery/ui-lightness)
  
    simple_sprocket(@libs + @wire_it + @my_system, "#{@dist_dir}/mysystem_complete.js")
    simple_sprocket(@print, "#{@dist_dir}/mysystem_print.js")
    %x(cp src/print-for-dist.html #{@dist_dir}/print.html)
    %x(cp -r lib/excanvas.js #{@dist_dir}/lib)
    %x(cp lib/jquery/jquery-1.4.2.min.js #{@dist_dir}/lib)
    %x(cp lib/jquery/jquery-ui-1.8.custom.min.js #{@dist_dir}/lib)

    %x(cp src/*.json #{@dist_dir})
    %x(cp -r src/images #{@dist_dir})
    %x(cp -r src/css/* #{@dist_dir}/css)
    %x(cp ./lib/YUI/*.css ./#{@dist_dir}/css/YUI)
    %x(cp -r ./lib/jquery/css/ui-lightness #{@dist_dir}/css/jquery)
    create_mysystem_html
  end
end

desc "lint JavaScript files (JavaScript Lint (jsl) must be installed)"
task :jslint do
  options = '-conf jsl.conf '
  @my_system.each do |js_file|
    options << "-process #{js_file} "
  end
  puts %x(jsl #{options})
end

## Create mysystem.html for distribution from mysystem-dev.html
def create_mysystem_html

  new_tt = '<title>MySystem</title>'
  new_js = <<HERE
<!-- This version uses some concatentated assetts, generated by the rake task-->
    <script type="text/javascript" src="mysystem_complete.js"></script>
HERE

  new_ds = <<HERE
mysystem.config.dataService = new RestDS('','');
HERE

  begin_tt = '<!--\s*begin title\s*-->'
  end_tt = '<!--\s*end title\s*-->.*?\n'
  begin_js = '<!--\s*begin javascript\s*-->'
  end_js = '<!--\s*end javascript\s*-->.*?\n'
  begin_ds = '<!--\s*begin dataservice\s*-->'
  end_ds = '<!--\s*end dataservice\s*-->.*?\n'
  
  open 'src/mysystem-dev.html' do |in_file|
    s = in_file.read
    s.sub!(/#{begin_tt}(.*)#{end_tt}/mi, new_tt)
    s.sub!(/#{begin_js}(.*)#{end_js}/mi, new_js)
    s.sub!(/#{begin_ds}(.*)#{end_ds}/mi, new_ds)
    s.gsub!('../lib/YUI', 'css/YUI')
    s.gsub!('../lib/jquery/css', 'css/jquery')
    s.gsub!('../lib/jquery', 'lib')
    open("#{@dist_dir}/mysystem.html", 'w') do |out_file|
      out_file.write(s)
    end
  end
end
