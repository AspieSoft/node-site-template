var AspieSoftAutoEmbedOptions = {
  'width': '100%',
  'min-width': '300px',
  'max-width': '1200px',
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

setInterval(function(){
  $('.progressbar').each(function(){
    if(!this.classList.contains('setup')){
      $(this).addClass('setup').attr('current-progress', '0').html('<div class="progressbar-text"></div><div class="progressbar-loader"></div>');
      if(!this.hasAttribute('progress')){
        $(this).attr('progress', 0);
      }
    }

    let progress = Number($(this).attr('progress'));
    if(!progress){progress = 0; $(this).attr('progress', 0);}
    let currentProgress = Number($(this).attr('current-progress'));
    if(!currentProgress){currentProgress = 0; $(this).attr('current-progress', 0);}

    let progressSpeed = 0.5;

    if(progress > currentProgress){
      let progressDiff = (progress - currentProgress);
      while(progressDiff < 20){
        progressDiff++;
        progressSpeed -= 0.02;
      }

      currentProgress += progressSpeed;
      if(currentProgress > progress || progressSpeed < 0){
        currentProgress = progress;
      }
    }else if(progress < currentProgress){
      let progressDiff = (currentProgress - progress);
      while(progressDiff < 20){
        progressDiff++;
        progressSpeed -= 0.02;
      }

      currentProgress -= progressSpeed;
      if(currentProgress < progress || progressSpeed < 0){
        currentProgress = progress;
      }
    }

    $(this).attr('current-progress', currentProgress);

    if(currentProgress < 0){
      $('.progressbar-loader', this).css({width: (100+currentProgress)+'%', float: 'left'});
      $(this).css('background', 'var(--progress2)');
    }else{
      $('.progressbar-loader', this).css({width: (100-currentProgress)+'%', float: 'right'});
      $(this).css('background', 'var(--progress1)');
    }

    currentProgress = Math.round(currentProgress);
    if(currentProgress > 3){
      $('.progressbar-text', this).css('color', 'var(--light1)').text(currentProgress+'%');
    }else if(currentProgress > 2){
      $('.progressbar-text', this).css('color', 'var(--light1)').html(currentProgress+'<font style="color: var(--dark4);">%</font>');
    }else if(currentProgress < -97){
      $('.progressbar-text', this).css('color', 'var(--light1)').html(currentProgress+'%');
    }else if(currentProgress < -96){
      currentProgress = currentProgress.toString().replace(/^(-)/, '<font style="color: var(--dark4);">$1</font>');
      $('.progressbar-text', this).css('color', 'var(--light1)').html(currentProgress+'%');
    }else if(currentProgress < -95){
      currentProgress = currentProgress.toString().replace(/^(-[0-9])/, '<font style="color: var(--dark4);">$1</font>');
      $('.progressbar-text', this).css('color', 'var(--light1)').html(currentProgress+'%');
    }else if(currentProgress < -93){
      $('.progressbar-text', this).css('color', 'var(--light1)').html('<font style="color: var(--dark4);">'+currentProgress+'</font>%');
    }else{
      $('.progressbar-text', this).css('color', 'var(--dark4)').text(currentProgress+'%');
    }
  });
}, 1);
