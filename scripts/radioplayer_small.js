document.write('<div class="radioplayer">')
document.write('  <div class="songInfo" style="font-size: 20px">');
document.write('    <span id="cc_strinfo_trackartist_niceradi" class="cc_streaminfo"></span>: <span id="cc_strinfo_trackalbum_niceradi" class="cc_streaminfo"></span>');
document.write('  </div>  ');
document.write('  <div class="controls" style="font-size: 20px">');
document.write('    [ <span id="controls" class="textButton" onClick="playpause()"></span> <span id="reloadButton" class="textButton2" onClick="reloadAudio()">↺</span> ]');
document.write('  </div>');
document.write('  <audio id="audio_stream_element">');
document.write('    <source src="http://108.178.13.122:8232/stream">');
document.write('    Try a different browser to listen to this ebin stream');
document.write('  </audio>');
document.write('  <div id="slider">');
document.write('    <input id="slide" type="range" min="0" max="1" step="0.01" value="1.0"/>');
document.write('  </div><br/>');
document.write('  <div id="streamStats">');
document.write('    <script language="javascript" type="text/javascript" src="https://cp8.shoutcheap.com:2199/system/streaminfo.js"></script>');
document.write('  </div>');
document.write('</div>');