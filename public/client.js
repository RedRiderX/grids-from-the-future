'use strict'
/* jshint eqnull:true */
/* globals Vue */

// intial setup
// read input from starting html + css
// copy into inputs
// watch inputs
// on change update matching tag
// on tag create/destroy rework name list? nah
// on tag create put name in header with some lorem ipsum after
Vue.component('grid-item', {
  template: '#grid-item-template',
  props: [
    'item',
  ],
  computed: {
    itemStyles: function() {
      return {
        background: this.item.background,
        'grid-column-start': this.item['grid-column-start'],
        'grid-column-end': this.item['grid-column-end'],
        'grid-row-start': this.item['grid-row-start'],
        'grid-row-end': this.item['grid-row-end'],
      };
    }
  }
})
Vue.component('grid', {
  template: '#grid-template',
  props: [
    'grid',
    'gridItems',
  ],
  computed: {
    gridStyles: function() {
      return {
        width: this.grid.width,
        height: this.grid.height,
        'grid-template-columns': this.grid['grid-template-columns'],
        'grid-template-rows': this.grid['grid-template-rows'],
        'grid-gap': this.grid['grid-gap'],
      };
    }
  }
})
Vue.component('shadow-grid', {
  template: '#shadow-grid-template',
  props: [
    'grid',
  ],
  data: function() {
    return {
      // TODO
      totalPossibleItems: 25
    }
  },
  computed: {
    gridStyles: function() {
      return {
        width: this.grid.width,
        height: this.grid.height,
        'grid-template-columns': this.grid['grid-template-columns'],
        'grid-template-rows': this.grid['grid-template-rows'],
        'grid-gap': this.grid['grid-gap'],
      };
    }
  }
})

var app = new Vue({
  el: 'main',
  data: {
    // property values should be strings because the values can vary so much
    grid: {
      width: '100%',
      height: '100%',
      'grid-template-columns': '1fr 1fr 1fr 1fr 1fr',
      'grid-template-rows': '1fr 1fr 1fr 1fr 1fr',
      'grid-gap': '1rem',
    },
    gridItems: [
      {
        index: 'a',
        background: 'red',
        'grid-column-start': '1',
        'grid-column-end': '3',
        'grid-row-start': '1',
        'grid-row-end': '3',
        text: 'Aut totam soluta quae ea expedita ea perspiciatis. Rerum placeat doloribus natus error quasi a.'
      },
      {
        index: 'b',
        background: 'green',
        'grid-column-start': '2',
        'grid-column-end': '5',
        'grid-row-start': '2',
        'grid-row-end': '5',
        text: 'Aut totam soluta quae ea expedita ea perspiciatis. Rerum placeat doloribus natus error quasi a.'
      },
      {
        index: 'c',
        background: 'blue',
        'grid-column-start': '4',
        'grid-column-end': '6',
        'grid-row-start': '4',
        'grid-row-end': '6',
        text: 'Aut totam soluta quae ea expedita ea perspiciatis. Rerum placeat doloribus natus error quasi a.'
      }
    ],
  },
  
  methods: {
    
    // http://stackoverflow.com/a/31540111
    getNextKey: function(key) {
      if (key === 'Z' || key === 'z') {
        return String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25); // AA or aa
      } else {
        var lastChar = key.slice(-1);
        var sub = key.slice(0, -1);
        if (lastChar === 'Z' || lastChar === 'z') {
          // If a string of length > 1 ends in Z/z,
          // increment the string (excluding the last Z/z) recursively,
          // and append A/a (depending on casing) to it
          return this.getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
        } else {
          // (take till last char) append with (increment last char)
          return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
        }
      }
      return key;
    },
    
    addGridItem: function(event) {
      var lastIndex = this.gridItems[this.gridItems.length - 1].index;
      this.gridItems.push({
        index: this.getNextKey(lastIndex),
        background: '',
        'grid-column-start': '',
        'grid-column-end': '',
        'grid-row-start': '',
        'grid-row-end': '',
        text: 'Aut totam soluta'
      })
    },
    
    removeGridItem: function(event) {
      if (this.gridItems.length > 1) {
        this.gridItems.pop();
      }
    }
  }
})