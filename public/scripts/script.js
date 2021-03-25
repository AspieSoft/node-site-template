var AspieSoftAutoEmbedOptions = {
  'width': '80%',
  'min-width': '300px',
  'max-width': '2500px',
  'ratio': '16:9',
  'auto': '0',
  'mute': '0',
  'popular': '0',
  'live': '0',
};

function setupElementListeners(){
  $('iframe').each(function(){
    if(!this.classList.contains('setup')){
      $(this).addClass('setup').on('load', function(){
        $(this).addClass('loaded');
      });
      setTimeout(() => {
        $(this).addClass('loaded');
      }, 1000);
    }
  });
}
setupElementListeners();
setInterval(setupElementListeners, 100);
