function tapEvent (element, str1, str2) {
  const tr = element.parentNode.parentNode.parentElement;
  const arr = Array.from(tr.children)
  arr.map((item, index) => {
    if (index > 1) {
      const span = item.getElementsByTagName('span');
      const em = item.getElementsByTagName('em');
      span[0].style.display = str1;
      em[0].style.display = str2;
    }
  })
}

(function() {
  var ul = document.querySelector('#nav');
  const arr = Array.from(ul.children)
  ul.onclick = function(e) {
    e.stopPropagation()
    const item = e.target.parentNode;
    const text = item.textContent
    const index = arr.indexOf(item)
    arr.map(item => item.className = '')
    item.className = 'active';
    window.localStorage.setItem('nav_active', index)
    console.log(text, index)
  }
  arr.forEach((item, i) => {
    const index = window.localStorage.getItem('nav_active')
    if (index == i) {
      item.className = 'active';
    } else {
      item.className = '';
    }
  })

  var table = document.querySelector('#table');
  table.onclick = function(e) {
    const element = e.target;
    if (element.className === 'edit') {
      tapEvent(element, 'none', 'block')
    } else if (element.className === 'close') {
      tapEvent(element, 'block', 'none')
    }
  }
})()