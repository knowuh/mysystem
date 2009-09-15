(function () {
  
  Raphael.fn.arrow = function(start,end) {
    var fTheta = 45.0 * 180.0/Math.PI;
    
    // lineVector = toPoint - fromPoint
    //     lineLength = length of lineVector
    // calculate point at base of arrowhead

    tPointOnLine = nWidth / (2 * (tanf(fTheta) / 2) * lineLength);
    pointOnLine = toPoint + -tPointOnLine * lineVector

    // calculate left and right points of arrowhead

    normalVector = (-lineVector.y, lineVector.x)
    tNormal = nWidth / (2 * lineLength)
    leftPoint = pointOnLine + tNormal * normalVector
    rightPoint = pointOnLine + -tNormal * normalVector
    
  };
  
  Raphael.fn.connection = function (obj1, obj2, line, bg) {
      if (obj1.line && obj1.from && obj1.to) {
          line = obj1;
          obj1 = line.from;
          obj2 = line.to;
      }
      var bb1 = obj1.getBBox();
      var bb2 = obj2.getBBox();
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
          var dx, dy;
          for (var j = 4; j < 8; j++) {
                  dx = Math.abs(p[i].x - p[j].x);
                  dy = Math.abs(p[i].y - p[j].y);
              if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                  dis.push(dx + dy);
                  d[dis[dis.length - 1]] = [i, j];
              }
          }
      }
      var res;
      if (dis.length == 0) {
          res = [0, 4];
      } else {
          res = d[Math.min.apply(Math, dis)];
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
          line.line.attr({path: path});
      } else {
          var color = typeof line == "string" ? line : "#000";
          return {
              bg: bg && bg.split && this.path({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}, path),
              line: this.path({stroke: color, fill: "none"}, path),
              from: obj1,
              to: obj2
          };
      }
  };
  
  
  

  
  
  /**
  *
  **/
  MySystemNode = function() {
    this.terminals = [];
    this.icon = [];
    this.x = 0;
    this.y = 0;
  
  };

  MySystemNode.prototype.terminal = function(name) {
    var returnVal = null;
    this.terminals.each(function(term){
      if (term.name == name) {
        returnVal =  term;
      }
    });
    return returnVal;
  };
  
  /**
  *
  **/
  MySystemNode.importJson = function(jsonText,graphics,contentBaseUrl) {
    var objs = eval(jsonText);
    var nodes = [];
    var wires = [];
    if (objs) {
      objs[0].containers.each(function(container) {
        var node = new MySystemNode();
        node.icon=contentBaseUrl+"/"+container.icon;
        node.x = (container.position[0].replace("px","")) / 1;
        node.y = (container.position[1].replace("px","")) / 1;
        node.rep = graphics.set();
        node.rep.push(graphics.image(node.icon,node.x,node.y,50,50)); // TODO: Fixed size==BAD

        node.name = container.name;
        var txt = graphics.text(node.x-10,node.y,node.name);
        txt.rotate(-90,true);
        node.rep.push(txt);
        node.terminals = container.terminals;
        // node.terminals.each(function(terminal) {
        //   terminal.x = node.x;
        //   terminal.y = node.y;
        //   terminal.x += terminal.offsetPosition.left;
        //   if (terminal.offsetPosition.top) {
        //     terminal.y = terminal.y + terminal.offsetPosition.top;
        //   }
        //   else {
        //     terminal.y = terminal.y - (terminal.offsetPosition.bottom - 50);
        //   }
        //   terminal.rep = graphics.circle(terminal.x,terminal.y,5);
        //   node.rep.push(terminal.rep);
        // });
        nodes.push(node);
      });
    }
    return nodes;
  };
  
  
  
  /**
  *
  **/
  Wire = function() {
    this.source = null;
    this.target = null;
    this.x = 0;
    this.y = 0;
  };

  /**
  *
  **/
  Wire.importJson = function(jsonText,graphics,nodes) {
    var objs = eval(jsonText);
    var wires = [];
    if (objs) {
      objs[0].wires.each(function(w) {
        var wire = new Wire();
        wire.src = w.src;
        wire.sourceMySystemNode = nodes[w.src.moduleId];
        wire.sourceTerminal = wire.sourceMySystemNode.terminal(w.src.terminal);
        
        wire.tgt = w.tgt;
        wire.targetMySystemNode = nodes[w.tgt.moduleId];
        wire.targetTerminal = wire.targetMySystemNode.terminal(w.tgt.terminal);
        
        wire.options = w.options;
        wire.fields = w.options.fields;
        wire.width = wire.fields.width;
        wire.name = wire.fields.name;
        wire.color = w.options.color;
        wire.color.name = wire.fields.color;
        
        // do the drawing for the wire 
        // wire.rep = graphics.connection(wire.sourceTerminal.rep,wire.targetTerminal.rep,wire.color,wire.color + "|" + wire.width);
        wire.rep = graphics.connection(wire.sourceMySystemNode.rep,wire.targetMySystemNode.rep,wire.color,wire.color + "|" + wire.width);
        wires.push(wire);
      });
    }
    return wires;
  };
  
  

  /**
  *
  **/
  // MySystemPrint = function(_ds,dom_id) {
  //   this.dataService = _ds;
  //   this.data = [];
  //   this.name = "my print";
  //   this.graphics = Raphael(document.getElementById(dom_id));
  // };
  MySystemPrint = function(_json,dom_id,contentBaseUrl,width,height) {
    this.data = [];
    this.name = "my print";
    this.graphics = Raphael(document.getElementById(dom_id),width,height);
    this.nodes = MySystemNode.importJson(_json,this.graphics,contentBaseUrl);
    this.wires = Wire.importJson(_json,this.graphics,this.nodes);
  };
  
  
  /**
  *
  **/
  MySystemPrint.prototype.load = function() {
    if (this.dataService) {
      this.dataService.load(this,this.loadCallback);
      setTimeout(this.show.bind(this),500);
    }
    else {
      alert("No Data Service defined");
    }
  };


  /**
  *
  **/
  MySystemPrint.prototype.loadCallback = function(_data,context) {
    context.nodes = MySystemNode.importJson(_data,context.graphics);
    context.wires = Wire.importJson(_data,context.graphics,context.nodes);
  };


  /**
  *
  **/
  MySystemPrint.prototype.show = function() {
    debug("show called for "+ this.name);
    if (this.data) {
      debug("loaded OK");
    }
    else {
      alert("No data found to MySystemPrint");
    }
  };
  
  

}());
