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
    var grid = document.querySelector('.grid');
    var cell = getCell(grid, point.x, point.y);
    cell.classList.add(point.color);
  })
  .done(function(){
    var element = document.querySelector('#status-message');
    element.textContent = 'All data Loaded!';
  });
