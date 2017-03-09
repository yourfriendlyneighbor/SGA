$('.btn-danger').on('click', () => {
  $.ajax({
    type: 'POST',
    url: '/thumbsdown',
    data: 1,
    success: function(res){
      alert('Save Comoplete')
    }
  })
});

$('.btn-success').on('click', () => {
  console.log('Thumbbed Up');
});
