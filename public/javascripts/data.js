var count = 0;
var cards = [];

$(document).ready(function() {
  var ctx = {};
  oboe('http://127.0.0.1:3000/data')
    .node('{cards}', function(item) {
      count += 1;
      $('.data').text(count);
      ctx.setName = item.name;
      if (item.name !== 'Legends') {
        return oboe.drop;
      }
    })
    .node('cards.[*]', function(card) {
      if (ctx.setName === 'Legends') {
        cards.push(card)
        $('.cards').text(cards.length);
      }
    })
    .done(function(sets) {
      sets = sets.filter(function(v) {
        return v;
      });
      $('.sets').text(sets.length);
    })
});
