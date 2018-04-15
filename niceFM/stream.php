<?php

if (isset($_GET["stream"])) {
  $streamkey = $_GET["stream"];
}else{
  $streamkey = "nicestream";
}

?>
<!DOCTYPE html>
<html>
  <head>
    <title>nice radio livestream!</title>
    
    <meta charset="utf-8">
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="img/logo.png" />
    <meta name="description" content="Nice Radio!">
    <script type="text/javascript" src="scripts/ctrl.js"></script>
    <script type="text/javascript" src="scripts/ajax.js"></script>
    
    <!--<script src="scripts/fallback_jquery.js"></script>-->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

    <link rel="StyleSheet" href="styles/_main.css" type="text/css"></link>
    <link rel="StyleSheet" href="styles/futaba.css" type="text/css"></link>

  </head>
  <body onLoad="streamPage()">
    <center>
      <div class="logo">
        <img id="mainlogo" height="100px" alt="Click to Reload" src="img/nr.png" onClick="window.location.reload()"></img>
        <p class="boardTitle">Nice Radio Livestream</p>
        <div>
          [<span class="textButton" onclick="$('.help').toggle()">help</span>]
          [<span class="textButton" onclick="$('.submit').toggle()">submit song</span>]
          [<span class="textButton" onclick="$('.chat').toggle()">chat</span>]
        </div>
      </div>
      <br>
      <div class="help" style="display: none;">
        <ul>
          <li>the video isnt autoplay so you have to click play on it, it should load for a few seconds and then display a black screen for a few seconds</li>
          <li>if the video is still black after 15 seconds the stream is probably offline</li>
          <li>if there is some other issue and it appears to be on server side, let me know <a href="mailto:meotleft@gmail.com">meotleft@gmail.com</a></li>
        </ul>
      </div>
      <br>
      <object type="application/x-shockwave-flash" id="VideoPlayer" data="http://jarisflvplayer.org/files/JarisFLVPlayer.swf" height="360px" width="640px">
        <param name="menu"              value="false">
        <param name="scale"             value="noScale">
        <param name="allowFullscreen"   value="true">
        <param name="allowScriptAccess" value="always">
        <param name="bgcolor"           value="#000000">
        <param name="quality"           value="high">
        <param name="wmode"             value="opaque">
        <param name="flashvars" value="source=<?php echo "$streamkey"; ?>&amp;type=video&amp;streamtype=rtmp&amp;controltype=1&amp;duration=&amp;poster=http://mochiro.moe/nr/img/player_poster.png&amp;aspectratio=&amp;autostart=false&amp;logo=http://mochiro.moe/nr/img/logo.png&amp;logoposition=bottom right&amp;logoalpha=30&amp;logowidth=30&amp;logolink=http://mochiro.moe/nr&amp;hardwarescaling=false&amp;controls=true&amp;darkcolor=000000&amp;brightcolor=4c4c4c&amp;controlcolor=D385C6&amp;hovercolor=3FECF2&amp;seekcolor=D385C6&amp;jsapi=flase&amp;server=rtmp://mochiro.moe:1935/live">
      </object>
      <br>
      [<a href="rtmp://mochiro.moe:1935/live/<?php echo "$streamkey"; ?>">direct stream</a>]
      <br>
      <br>
      <div class="chat" style="display: none;">
        <iframe src="http://deadsimplechat.com/+a1sgu" frameborder="0" width="80%" height="600px"></iframe>
      </div>
      <div class="submit" style="display: none;">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfAspiYqvn7IO_2S-4u1S9dDJN1jKJzVwrnONp5bbIqR-kiOg/viewform?embedded=true" width="760" height="1200" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
      </div>
    </center>
    <script src="scripts/navbar.js"></script>
  </body>
</html>
