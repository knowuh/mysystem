class CustID
  VALS = (0..9).collect{|n| "#{n}"} + (65..90).collect{|n| n.chr}
  
  def self.getID
    id = ""
    while id.length < 4
      id << VALS[(rand*VALS.size).floor]
    end
    return id
  end  
end

def raw_post
  request.env["rack.input"].read
end
