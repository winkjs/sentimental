var s = require( 'wink-sentiment' );

var colorize = function ( score ) {
  var neutral = 'c8ccd1';

  var sad = [ // From sad to saddest
    '565394',
    '36357B',
    '282C73',
    '23266D',
    '161E61'
  ];

  var happy = [ // From happy to happiest
    '935578',
    'A55E7B',
    'AE637E',
    'BB7188',
    'BD7D92'
  ];

  var s = Math.round( score / 2.0 );
  var color;

  console.log(s);
  document.getElementById('score').innerHTML = s;

  if ( s === 0 ) {
    color = neutral;
  } else if ( s > 0 ) {
    color = happy[ s - 1 ];
  } else {
    color = sad[ Math.abs( s ) - 1];
  }

  document.body.style.backgroundColor = '#' + color;
}

document.getElementById( "textarea" ).addEventListener( "keydown", function () {
  colorize( s( this.value).score );
} );

document.addEventListener( 'DOMContentLoaded', function () {
  var poems = [
    "Some blues are sad\nBut some are glad,\nDark-sad or bright-glad\nThey're all blues.\n\nThe colors of colors\nThe blues are more than a color\nThey're a moan of pain\nA taste of strife\nAnd a sad refrain.",
    "Today was not fun.",
    "Sometimes I can be so short sighted.",
    "That is just what I need, great! Terrific!",
    "Not so well done my boy! I am unhappy.",
    "Got a flat tyre on my way to the mall 😕 This is just great 😒😒",
  ]
  var text = poems[5], i=0;

  function typeChar(t) {
    document.getElementById( "textarea" ).value =  document.getElementById( "textarea" ).value + text[i];
    colorize( s( document.getElementById( "textarea" ).value).score );

    window.setTimeout( function () {
      if ( i < text.length-1 ){
        i++;
        var newT = 100;
        if ( text[i] === ' ' ) {
          newT = 30;
        }
        if ( text[i] === '\n' ) {
          newT = 300;
        }
        typeChar(newT);
      }
    }, t)
  }

  window.setTimeout( function () {
    typeChar(100);
  }, 2000)

})
