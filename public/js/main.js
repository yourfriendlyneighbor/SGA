$(window).resize(() => {
  $.post('/pageSize', {
    width  : $(window).width().toString(),
    height : $(window).height().toString()
  },
  function(data, status){
    console.log('Data: ' + data + 'Status: ' + status);
  })
})

$(window).on('load', () => {
  $.post('/pageSize', {
    width  : $(window).width().toString(),
    height : $(window).height().toString()
  },
  function(data, status){
    console.log('Data: ' + data + 'Status: ' + status);
  })
})
