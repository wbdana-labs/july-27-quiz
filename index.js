// musical instrument
// belongs to category

// categories
// has many musical instruments

// xylophone.category => instrument family

// percussion.instruments => set of instruments

// make a form that creates an instrument

// 1. creates musical instrument
// 2. associates musical instrument with the category
  // List of categories should only have unique category names
  // i.e., from form, we should be able to associate multiple instruments with
  // the same category


// 1. create store
// 2. store should have only Categories
// 3. Models and associations
  // new Instrument('bass drum')
  // store.instruments[0] => {id: 1, name: 'bass drum'}


$( document ).ready(function() {
  submitForm();
  renderInstruments();
  renderCategories();
  renderSortedInstruments();
});

let store = {categories: [], instruments: []}

function createCategory() {
  let categoryCount = 0;

  return class Category {
    constructor(name) {
      this.id = ++categoryCount;
      this.name = name;
      store.categories.push(this);
    }; // end constructor

    static all() {
      return store.categories
    }

    static findById(id) {
      return store.categories.filter((category) => {
        return category.id === id
      })
    };

    static findByName(name) {
      return store.categories.filter((category) => {
        return category.name === name
      })
    };

    instruments() {
      return store.instruments.filter((instrument) => {
        return instrument.category === this.name
      })
    }



  } // end Category class
}; // end createCategory()

let category = createCategory();

function createInstrument() {
  let instrumentCount = 0;

  return class Instrument {
    constructor(name, category) {
      this.id = ++instrumentCount;
      this.name = name;
      this.category = category;
      store.instruments.push(this);
    }; // end constructor

    static all() {
      return store.instruments
    };

    static findById(id) {
      return store.instruments.filter((instrument) => {
        return instrument.id === id
      })
    };

    static findByName(name) {
      return store.instruments.filter((instrument) => {
        return instrument.name === name
      })
    };

  } // end class Instrument
} // end createInstrument()

let instrument = createInstrument();

new category('strings')
new category('percussion')
new category('brass')


new instrument('bass', 'strings')
new instrument('guitar', 'strings')
new instrument('drums', 'percussion')
new instrument('saxophone', 'brass')

function renderInstruments() {
  console.log('renderInstruments() is working')
  $('div.instruments')[0].innerHTML = ''
  let inst = ['<ol>']
  instrument.all().forEach(function(instrument) {
    inst.push(`<li>${instrument.name}</li>`)
  })
  inst.push('</ol>')
  $('div.instruments')[0].innerHTML = inst.join('')
  renderSortedInstruments();
};

function renderCategories() {
  console.log('renderCategories() is working')
  $('div.categories')[0].innerHTML = ''
  let categ = ['<ol>']
  category.all().forEach(function(category) {
    categ.push(`<li>${category.name}</li>`)
  })
  categ.push('</ol>')
  $('div.categories')[0].innerHTML = categ.join('')
  renderSortedInstruments();
};

function submitForm() {
  $('form').on('submit', (event) => {
    event.preventDefault();
    let instrumentName = $('#instrument_name')[0].value;
    let categoryName = $('#category_name')[0].value;
    if ( category.findByName(categoryName).length === 0 ) {
      let newCategory = new category(categoryName)
      renderCategories();
      renderSortedInstruments();
    };
    if ( instrument.findByName(instrumentName).length === 0 ) {
      let newInstrument = new instrument(instrumentName);
      renderInstruments();
      renderSortedInstruments();
    };
  })
};

function renderSortedInstruments() {
  $('div.sorted_instruments')[0].innerHTML = ''
  category.all().forEach(function(category) {
    let sorted = [`<h3>${category.name}</h3><ol>`]
    category.instruments().forEach(function(instrument) {
      sorted.push(`<li>${instrument.name}</li>`)
      $('div.sorted_instruments')[0].innerHTML += sorted.join('')
    })
    // sorted.push('</ol>')
  })
};
