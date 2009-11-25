(function () {
  

  // A bit hackish: If we don't want to load the rest of MySystem,
  // we can create the namespace seperately:
  MySystem = typeof(MySystem) != 'undefined' ? MySystem : function() {};
  
  
  MySystem.defaultFont = {
    "font-weight": 'bold',
    "font-family": 'helvetica, arial, sans-serif',
    fill: '#000000',
    opacity: 1
  }
  
  
  Raphael.fn.zoomIn = function(x,y,size) {
    var strokeSize = size * 0.2;
    var radius = size / 2.0;
    strokeSize = strokeSize < 1 ? 1 : strokeSize;
    var attributes = {
      fill: "#EEFFEE",
      stroke: "#004400",
      "stroke-width": strokeSize,
      opacity: 0.7,
      cx: x,
      cy: y
    }
    var lineExtent = radius - (strokeSize);
    lineExtent = lineExtent < 1 ? 1 : lineExtent;
    var zoom = this.set();
    zoom.push(this.circle(x,y,radius));
    zoom.push(   this.path("M" + x      + " " + (y+lineExtent)  + "L" +  x     + " " + (y-lineExtent )));
    zoom.push(   this.path("M" + (x+lineExtent)  + " " +  y     + "L" + (x-lineExtent)  + " " +  y   ));
    zoom.attr(attributes);
    return zoom;
  };

  Raphael.fn.zoomOut = function(x,y,size) {
    var strokeSize = size * 0.2;
    var radius = size / 2.0;
    strokeSize = strokeSize < 1 ? 1 : strokeSize;
    var attributes = {
      fill: "#EEFFEE",
      stroke: "#004400",
      "stroke-width": strokeSize,
      opacity: 0.7,
      cx: x,
      cy: y
    }
    var lineExtent = radius - (strokeSize);
    lineExtent = lineExtent < 1 ? 1 : lineExtent;
    var zoom = this.set();
    zoom.push(this.circle(x,y,radius));
    zoom.push(   this.path("M" + (x+lineExtent)  + " " +  y     + "L" + (x-lineExtent)  + " " +  y   ));
    zoom.attr(attributes);
    return zoom;
  };


  /**
  * Arrow 'plugin' for Raphael
  **/
  MySystem.arrow_path = function(startx,starty,endx,endy,len,angle) {    
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
  Raphael.fn.wire = function (wire, scale) {
      var line;
      var obj1 = wire.sourceNode.rep;
      var obj2 = wire.targetNode.rep;
      var name = wire.name;
      //wire.sourceNode.rep,wire.targetNode.rep,wire.color,wire.color + "|" + (wire.width * this.scale), wire.name);
      if (wire.rep && wire.rep.from && wire.rep.to) {
          line = wire.rep;
          obj1 = line.from;
          obj2 = line.to;
      }
      var bb1 = obj1.nodeImage.getBBox();
      var bb2 = obj2.nodeImage.getBBox();
      var border = 10;
      var p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
          {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + border},
          {x: bb1.x - border, y: bb1.y + bb1.height / 2},
          {x: bb1.x + bb1.width + border, y: bb1.y + bb1.height / 2},
          {x: bb2.x + bb2.width / 2, y: bb2.y - border},
          {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + border},
          {x: bb2.x - border, y: bb2.y + bb2.height / 2},
          {x: bb2.x + bb2.width + border, y: bb2.y + bb2.height / 2}];
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
      var res=[0,0];
      if (dis.length == 0) {
          res = [0, 4];
      } else {
          res = d[Math.min.apply(Math, dis)];
          if (!res) {
            res = [0,4];
          }
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
          var lineWidth = line.lineWidth * scale;
          line.arrow.attr({path: MySystem.arrow_path(x3,y3,x4,y4, lineWidth * 1.5,50)});
          line.line.attr({path: path, "stroke-width": lineWidth, fill: "none"});
          var fontSize = 10 * scale;
          line.label.attr({x: (x1 + x4)/2, y: (y1 + y4)/2, "font-size": fontSize + "px"});
          var centerX = (x1 + x4)/2;
          var centerY = (y1 + y4)/2;
          var wordWidth = name.length * fontSize;
          var textBoxX = centerX - wordWidth / 2;
          var textBoxY = centerY;
          line.textBox.attr({x: textBoxX, y: textBoxY - fontSize, width: wordWidth, height: fontSize*2})
      } else {
          var color = typeof line == "string" ? line : "#000";
          var stroke_width = (wire.width || 3)* scale;
          var fontSize = 10 * scale;
       
          var arrow_path = MySystem.arrow_path(x3,y3,x4,y4, stroke_width * 1.5,50);
          var line = this.path(path).attr({stroke: wire.color, fill: "none","stroke-width": stroke_width});
          var arrow = this.path(arrow_path).attr({fill: wire.color, stroke: "none"});
          var centerX = (x1 + x4)/2;
          var centerY = (y1 + y4)/2;
          var wordWidth = name.length * fontSize;
          var textBoxX = centerX - wordWidth / 2;
          var textBoxY = centerY;
          var textBox = this.rect(textBoxX,textBoxY - fontSize, wordWidth, fontSize*2);
          textBox.attr({fill: "#FFFFFF", stroke: "none", opacity: 0.65});
          var label = this.text((x1 + x4)/2,(y1 + y4)/2, name).attr({"font-size": fontSize + "px"})
          label.attr(MySystem.defaultFont);
          return {
              line: line,
              arrow: arrow,
              label: label,
              textBox: textBox,
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
    var offsetX = 0;
    var offsetY = 0;
    if (node.rep) {
      var nodeImage = node.rep.nodeImage;
      var label = node.rep.label;
      offsetX = node.rep.offsetX;
      offsetY = node.rep.offsetY;
    }
    else {
      node.border = node.border ? node.border : 5;
      if (!node.loaded) {
        var image = new Image();
        image.src = node.icon;
        node.width = image.width;
        node.height = image.height;
        node.loaded = true;
      }
      var nodeImage = this.image(node.icon,node.x,node.y,node.width || 30,node.height || 30);
      nodeImage.mouseDown = function(e) {
        node.rep.offsetX = e.clientX;
        node.rep.offsetY = e.clientY;
        e.preventDefault && e.preventDefault();
      }
      var label = this.text(node.x,node.y,node.name).attr({fill: '#004400',opacity: 0.8});
      label.attr(MySystem.defaultFont);
    }

    var imageY =  (node.y * scale) + offsetY;
    var imageX =  (node.x * scale) + offsetX;
    var labelY =  imageY + (node.height * scale) +  (node.border * scale);
    var labelX =  imageX + (node.width  *scale / 2.0);
    nodeImage.scale(scale,scale);
    nodeImage.attr({x:imageX, y:imageY});
    var fontSize = 12 * scale;
    label.attr({x: labelX, y:labelY, "font-size": fontSize + "px"});
    return {
        nodeImage: nodeImage,
        label: label,
        offsetX: offsetX,
        offsetY: offsetY
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
  MySystemPrint = function(_json,dom_id,contentBaseUrl) {
    this.data = _json;
    this.name = "my print";
    this.scale = typeof(scale_factor) != 'undefined' ? scale_factor : 1;
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
    
    container.observe('mouseup', function(e){
      self.mouse_down = false;
    });
    container.observe('mousedown',function(e){
      self.mouse_down = true;
      self.last_x = e.clientX;
      self.last_y = e.clientY;
    });
    container.observe('mousemove', function(e){
      if (self.mouse_down) {
        var dx = e.clientX - self.last_x;
        var dy = e.clientY- self.last_y;
        self.nodes.each(function(node) {
          node.rep.offsetX += dx;
          node.rep.offsetY += dy;
          self.redraw();
        });
        self.last_x = e.clientX;
        self.last_y = e.clientY;
      }
    });
    
    var self = this;
    this.zoomIn = this.graphics.zoomIn(20,20,18); 
    this.zoomOut = this.graphics.zoomOut(48,20,18); 
    
    this.zoomIn.mouseover(function(e) {
      self.zoomIn.scale(1.25,1.25);
    });
    this.zoomIn.mouseout(function(e) {
      self.zoomIn.scale(1,1);
    });
    this.zoomIn.click(function(e) {
      self.scale = self.scale + 0.2;
      self.redraw();
    });

    this.zoomOut.mouseover(function(e) {
      self.zoomOut.scale(1.25,1.25);
    });
    this.zoomOut.mouseout(function(e) {
      self.zoomOut.scale(1,1);
    });
    this.zoomOut.click(function(e) {
      self.scale = self.scale - 0.2;
      self.scale = self.scale > 0 ? self.scale : 0.05;
      self.redraw();
    });
    self.redraw();
  };
  

  
  MySystemPrint.prototype.redraw = function() {
    var container = $(this.domId);
    var width = container.getWidth();
    var height = container.getHeight();
    var self = this;
    if (self.width) {
      var widthRatio = width / self.width;
      var widthDiff = Math.abs(width - self.width);
      var heightRatio = height / self.height;
      var heightDiff = Math.abs(height - self.height);
      var scalar = heightDiff < widthDiff ? widthRatio : heightRatio;
      self.scale = self.scale * scalar;
    }
    self.width = width;
    self.height = height;
    this.graphics.setSize(width, height);
    this.nodes.each(function(node) {
      self.graphics.Node(node,self.scale);
    });
    this.wires.each(function(wire){
      self.graphics.wire(wire,self.scale);
    })
  };
  
  /**
  * @method drawNode
  **/
  MySystemPrint.prototype.drawNode = function(node) {
    node.rep = this.graphics.Node(node,this.scale);
  };
  
  /**
  * @method drawWire
  * IMPORTANT!!!!! This must be called *after* a call to drawNode.
  **/
  MySystemPrint.prototype.drawWire = function(wire) {
    wire.rep = this.graphics.wire(wire,this.scale);
  };
  

}());
