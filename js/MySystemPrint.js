(function () {
  
  // A bit hackish: If we don't want to load the rest of MySystem,
  // we can create the namespace seperately:
  MySystem = typeof(MySystem) != 'undefined' ? MySystem : function() {};
  
  
  /**
  * Arrow 'plugin' for Raphael
  **/
  MySystem.arrow_path = function(startx,starty,endx,endy,len,angle,color) {
    color = typeof(color) != 'undefined' ? color : "#888";
    
    var theta = Math.atan2((endy-starty),(endx-startx));
    var baseAngleA = theta + angle * Math.PI/180;
    var baseAngleB = theta - angle * Math.PI/180;
    var tipX = endx + len * Math.cos(theta);
    var tipY = endy + len * Math.sin(theta);
    var baseAX = endx - len * Math.cos(baseAngleA);
    var baseAY = endy - len * Math.sin(baseAngleA);
    var baseBX = endx - len * Math.cos(baseAngleB);
    var baseBY = endy - len * Math.sin(baseAngleB);
    var pathData = " M " + tipX      + " " + tipY +
                   " L " + baseAX  + " " + baseAY +
                   " L " + baseBX  + " " + baseBY +
                   " Z ";
    return pathData;
  };
  

  /**
  * modification of Connection, taken from graffle.js:
  * http://raphaeljs.com/graffle.js  author not cited, part of 
  * rapheal project?  http://raphaeljs.com
  **/
  Raphael.fn.connection = function (obj1, obj2, line, bg,name) {
      if (obj1.line && obj1.from && obj1.to) {
          line = obj1;
          obj1 = line.from;
          obj2 = line.to;
      }
      var bb1 = obj1.nodeImage.getBBox();
      var bb2 = obj2.nodeImage.getBBox();
      var p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
          {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
          {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
          {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
          {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
          {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
          {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
          {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}];
      var d = {}, dis = [];
      for (var i = 0; i < 4; i++) {
          for (var j = 4; j < 8; j++) {
              var dx = Math.abs(p[i].x - p[j].x),
                  dy = Math.abs(p[i].y - p[j].y);
              if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                  dis.push(dx + dy);
                  d[dis[dis.length - 1]] = [i, j];
              }
          }
      }
      if (dis.length == 0) {
          var res = [0, 4];
      } else {
          var res = d[Math.min.apply(Math, dis)];
      }
      var x1 = p[res[0]].x,
          y1 = p[res[0]].y,
          x4 = p[res[1]].x,
          y4 = p[res[1]].y,
          dx = Math.max(Math.abs(x1 - x4) / 2, 10),
          dy = Math.max(Math.abs(y1 - y4) / 2, 10),
          x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
          y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
          x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
          y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
      var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
      
      if (line && line.line) {
          line.bg && line.bg.attr({path: path});
          var lineWidth=line.lineWidth;
          line.arrow.attr({path: MySystem.arrow_path(x3,y3,x4,y4, lineWidth * 2.0,50)});
          line.line.attr({path: path});
          var fontSize = 10;
          line.label.attr({x: x2,y: y4,"font-size": fontSize + "px"});
      } else {
          var color = typeof line == "string" ? line : "#000";
          var stroke_width = bg.split("|")[1] || 3;
          var arrow_path = MySystem.arrow_path(x3,y3,x4,y4, stroke_width * 2.0,50);
          var fontSize = 10;
          return {
              bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": stroke_width}),
              line: this.path(path).attr({stroke: color, fill: "none"}),
              label: this.text(x2,y4, name).attr({fill: '#FF0000',"font-size": fontSize + "px"}),
              arrow: this.path(arrow_path).attr({fill: color, stroke: "none"}),
              lineWidth: stroke_width,
              from: obj1,
              to: obj2
          };
      }
  };


  /**
  * MyNode a mysystem node implementation
  * http://raphaeljs.com/graffle.js  author not cited, part of 
  * rapheal project?  http://raphaeljs.com
  **/
  Raphael.fn.Node = function (node, scale) {
    var label;
    var nodeImage;
    if (node.rep) {
      var nodeImage = node.rep.nodeImage;
      var label = node.rep.label;
    }
    else {
      node.border = node.border ? node.border : 10;
      if (!node.loaded) {
        var image = new Image();
        image.src = node.icon;
        node.width = node.width ? node.width : 20;
        node.height = node.height ? node.height : 20;
        image.onLoad = function() {
          node.width = image.width;
          node.height = image.height;
          node.loaded = true;
        };
      }
      var nodeImage = this.image(node.icon,node.x,node.y,node.width,node.height);
      var label = this.text(x,y,node.name).attr({fill: '#FF0000'})
    }
    var y =  (node.y + node.height + node.border) * scale;
    var x =  (node.x + (node.width  / 2.0)) * scale;
    nodeImage.scale(scale,scale,0,0);
    var fontSize = 10 * scale;
    label.attr({x: x, y:y, "font-size": fontSize + "px"});
    return {
        nodeImage: nodeImage,
        label: label
    };
  };
  
  
  
  /**
  * @constructor for Node
  **/
  MySystem.Node = function() {
    this.terminals = [];
    this.icon = [];
    this.x = 0;
    this.y = 0;
  };

  /**
  * @method terminal
  * finds the named terminal in this node
  * @param name of terminal to find
  * @returns 'undefined' or the terminal
  **/
  MySystem.Node.prototype.terminal = function(name) {
    var returnVal = null;
    this.terminals.each(function(term){
      if (term.name == name) {
        returnVal = term;
      }
    });
    return returnVal;
  };
  
  
  /**
  * @method importJson
  * creates Node from json text
  **/
  MySystem.Node.importJson = function(jsonText,contentBaseUrl) {
    var objs = eval(jsonText);
    var nodes = [];
    var wires = [];
    if (objs) {
      objs[0].containers.each(function(container) {
        var node = new MySystem.Node();
        if (typeof(contentBaseUrl) != 'undefined') {
          node.icon = contentBaseUrl + "/" + container.icon;
        }
        else {
          node.icon = container.icon;
        }
        node.x = (container.position[0].replace("px","")) / 1;
        node.y = (container.position[1].replace("px","")) / 1;
        node.name = container.name;
      
        node.terminals = container.terminals;
        nodes.push(node);
      });
    }
    return nodes;
  };
  
  
  
  /**
  * MySystem.Wire
  * @constructor 
  **/
  MySystem.Wire = function() {
    this.source = null;
    this.target = null;
    this.x = 0;
    this.y = 0;
  };

  /**
  * @method importJson
  * creates wires from json text
  **/
  MySystem.Wire.importJson = function(jsonText,nodes) {
    var objs = eval(jsonText);
    var wires = [];
    if (objs) {
      objs[0].wires.each(function(w) {
        var wire = new MySystem.Wire();
        wire.src = w.src;
        wire.sourceNode = nodes[w.src.moduleId];
        wire.sourceTerminal = wire.sourceNode.terminal(w.src.terminal);
        
        wire.tgt = w.tgt;
        wire.targetNode = nodes[w.tgt.moduleId];
        wire.targetTerminal = wire.targetNode.terminal(w.tgt.terminal);
        
        wire.options = w.options;
        wire.fields = w.options.fields;
        wire.width = wire.fields.width;
        wire.name = wire.fields.name;
        wire.color = w.options.color;
        wire.color.name = wire.fields.color;
        
        // do the drawing for the wire 
        wires.push(wire);
      });
    }
    return wires;
  };
  
    
  /**
  * MySystemPrint
  * @constructor
  **/
  MySystemPrint = function(_json,dom_id,contentBaseUrl,width,height,scale_factor) {
    this.data = _json;
    this.name = "my print";
    this.scale =typeof(scale_factor) != 'undefined' ? scale_factor : 1.6;
    this.nodes = MySystem.Node.importJson(_json,contentBaseUrl);
    this.wires = MySystem.Wire.importJson(_json,this.nodes);
    this.domId = dom_id;

    var container = $(this.domId);
    this.width = container.width;
    this.height = container.height;
    this.graphics = Raphael(this.domId,this.width,this.height);
    var self = this;
    
    this.nodes.each(function(node) {
      self.drawNode(node);
    });
  
    this.wires.each(function(wire) {
      self.drawWire(wire);
    });
    
    // var self = this;
    //  document.observe('keyup', function(e) {
    //     var code = e.keyCode;
    //     if (code == '+') {self.scale = self.scale * 2;};
    //     if (code == '-') {self.scale = self.scale / 2;};
    //     self.redraw();
    //  });
    //  $(dom_id).observe('mousedown', function(e) {
    //     self.scale = self.scale + 0.3;
    //     self.mouse_down = true;
    //     self.lastx = e.pointerX;
    //     self.lastY = e.pointerY;
    //  });
    //  
     $(dom_id).observe('mouseup', function(e) {
        self.scale = self.scale + 0.3;
        var dx = self.lastx - e.pointerX;
        var dy = self.lasty - e.pointerY;
        var d = Math.sqrt(dx * dx + dy * dy);
        self.mouse_down = false;
        self.lastx = e.pointerX;
        self.lastY = e.pointerY;
        self.redraw();
     });
    //   
    //  
    //  // self.redraw();
  };
  

  
  MySystemPrint.prototype.redraw = function() {
    var container = $(this.domId);
    var width = container.width;
    var height = container.height;
    var self = this;
    this.graphics.setSize(width, height);
    this.nodes.each(function(node) {
      // node.textrep.scale(self.scale,self.scale);
      // node.rep.scale(self.scale,self.scale,0,0);
      // node.textrep.scale(self.scale,self.scale,0,0);
      // var y = (node.y + node.height + node.border) * self.scale;
      self.graphics.Node(node,self.scale);
    });
    this.wires.each(function(wire){
      self.graphics.connection(wire.rep);
    })
  };
  
  /**
  * @method drawNode
  **/
  MySystemPrint.prototype.drawNode = function(node) {
    node.rep = this.graphics.Node(node,this.scale);
    // node.rep.push(this.graphics.text(x,y,node.name));
    // node.textrep.cx = node.rep.cx;
  };
  
  /**
  * @method drawWire
  * IMPORTANT!!!!! This must be called *after* a call to drawNode.
  **/
  MySystemPrint.prototype.drawWire = function(wire) {
    wire.rep = this.graphics.connection(wire.sourceNode.rep,wire.targetNode.rep,wire.color,wire.color + "|" + (wire.width * this.scale), wire.name);
  };
  

}());
