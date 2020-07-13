  window.onload = function() {
    var height = getViewportHeight();
    if(height > 0)
      document.getElementById("test").style.height = height + "px";
  }
  function getViewportHeight() {
    var h = 0;
    if(self.innerHeight)
      h = window.innerHeight;
    else if(document.documentElement && document.documentElement.clientHeight)
      h = document.documentElement.clientHeight;
    else if(document.body) 
      h = document.body.clientHeight;
  return h;
  }
