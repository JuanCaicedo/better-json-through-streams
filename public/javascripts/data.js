function getByIndex(container, index) {
  var child = container.children[index];
  return child;
}

function getCell(container, x, y) {
  var row = getByIndex(container, y);
  var cell = getByIndex(row, x);
  return cell;
}

oboe('http://localhost:3000/data')
  .node('{x y color}', function(point) {
    // debugger
    var grid = document.querySelector('.grid');
    var cell = getCell(grid, point.x, point.y);
    cell.classList.add(point.color);
  });
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
