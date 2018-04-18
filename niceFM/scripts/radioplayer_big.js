document.write('<div class="radioplayer">')
document.write('  <div class="songInfo">');
document.write('    <span id="cc_strinfo_trackartist_niceradi" class="cc_streaminfo"></span>: <span id="cc_strinfo_trackalbum_niceradi" class="cc_streaminfo"></span>');
document.write('  </div>  ');
document.write('  <div class="controls">');
document.write('    <span class="tilde"></span>[ <span id="controls" class="textButton" onClick="playpause()"></span> <span id="reloadButton" class="textButton2" onClick="reloadAudio()">↺</span> ]<span class="tilde"></span>');
document.write('  </div>');
document.write('  <audio id="audio_stream_element">');
document.write('    <source src="http://108.178.13.122:8232/stream">');
document.write('    Try a different browser to listen to this ebin stream');
document.write('  </audio>');
document.write('  <div id="slider">');
document.write('    <input id="slide" type="range" min="0" max="1" step="0.01" value="1.0"/>');
document.write('  </div><br/>');
document.write('</div>');