function getByIndex(element, index){
  var container = $(element);
  var child = container.children()[index];
  return child;
}

function getCell(x, y) {
  var grid = $('.wrapper');
  var row = getByIndex(grid, y);
  var cell = getByIndex(row, x);
  return cell;
}

$(document).ready(function() {
  //   var ctx = {};
  oboe('http://localhost:3000/data')
    .node('{x y}', function(point){
      var cell = getCell(point.x, point.y);
      $(cell).addClass('orange');
    })
    //     .node('{cards}', function(item) {
    //       count += 1;
    //       $('.data').text(count);
    //       ctx.setName = item.name;
    //       if (item.name !== 'Legends') {
    //         return oboe.drop;
    //       }
    //     })
    //     .node('cards.[*]', function(card) {
    //       if (ctx.setName === 'Legends') {
    //         cards.push(card)
    //         $('.cards').text(cards.length);
    //       }
    //     })
    // .done(function(sets) {
    //   $('.sets').text(sets.length);
    // })
});
