
load('spec/support/env.rhino.js');


load('lib/jquery/jquery-1.4.2.min.js');

load('spec/lib/jspec.js');
load('spec/lib/jspec.timers.js');
load('spec/lib/jspec.jquery.js');
load('spec/lib/jspec.xhr.js');
load('spec/lib/jspec.shell.js');
load('spec/support/junit.xml.js');
    
// Include YUI Loader:
load('http://yui.yahooapis.com/2.7.0/build/yuiloader/yuiloader-min.js');

// Combo-handled YUI JS files:
load('http://yui.yahooapis.com/combo?2.7.0/build/utilities/utilities.js&2.7.0/build/container/container-min.js&2.7.0/build/menu/menu-min.js&2.7.0/build/button/button-min.js&2.7.0/build/cookie/cookie-min.js&2.7.0/build/resize/resize-min.js&2.7.0/build/imagecropper/imagecropper-min.js&2.7.0/build/imageloader/imageloader-min.js&2.7.0/build/selector/selector-min.js&2.7.0/build/layout/layout-min.js&2.7.0/build/stylesheet/stylesheet-min.js');

load('lib/canvastext.js');
load('lib/uuid.js');

// WireIt
load('src/js/wireit/WireIt.js');
load('src/js/wireit/CanvasElement.js');
load('src/js/wireit/Wire.js');
load('src/js/wireit/Terminal.js');
load('src/js/wireit/util/DD.js');
load('src/js/wireit/util/DDResize.js');
load('src/js/wireit/Container.js');
load('src/js/wireit/ImageContainer.js');
load('src/js/wireit/Layer.js');
load('src/js/wireit/util/inputex/FormContainer-beta.js');
load('src/js/wireit/LayerMap.js');
load('src/js/wireit/ImageContainer.js');

// My DataService
load('src/js/ds/RestDS.js');
load('src/js/ds/GGearsDS.js');
load('src/js/ds/MocDS.js');
load('src/js/ds/CookieDS.js');
//load('src/js/ds/DSService.js');

// My System
load('src/js/mysystem-init.js');
load('src/js/MySystem.js');
load('src/js/MySystemUtil.js');
load('src/js/MySystemPropEditor.js');
//load('src/js/MySystemWireLabel.js');
load('src/js/MySystemContainer.js');
load('src/js/MySystemData.js');
load('src/js/MySystemEditor.js');

// My Engine
load('src/engine/mysystem-engine.js');
load('lib/http.js');

var specResults = JSpec
.exec('spec/spec.core.js')
//.exec('spec/spec.DataService.js') //FIXME GGears test not working in rhino mode
.exec('spec/spec.Util.js');
