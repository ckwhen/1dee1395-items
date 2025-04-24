const fs = require('fs');

const CATEGORY_PARAMS_TYPE = 0;
const INSTOCK_PARAMS_TYPE = 1;
const output = 'server/db.json';
const filePath = process.argv[2];

// Reference: https://gomakethings.com/a-vanilla-js-equivalent-of-lodashs-groupby-method/
const groupBy = (arr, criteria) => arr.reduce((obj, item) => {
  const key = typeof criteria === 'function' ? criteria(item) : item[criteria];

  if (!obj.hasOwnProperty(key)) {
    obj[key] = [];
  }

  obj[key].push(item);

  return obj;
}, {});

// Regenerate Data
// data: {
//   items: [ { ... }, ... ],
//   params: [
//     {
//       label,
//       value,
//       type
//     },
//     ...
//   ],
// }
function generateData(filePath, output) {
  fs.readFile(filePath, (err, _items) => {
    if (err) {
      return console.error(err);
    }

    const items = JSON.parse(_items);
    const categories = groupBy(items, 'category');

    const data = {};

    data.items = items;
    data.params = [];

    Object.keys(categories).sort().forEach((category) => {
      data.params.push({
        label: category,
        value: category,
        type: CATEGORY_PARAMS_TYPE,
      });
    });

    data.params.push(
      {
        label: 'in stock',
        value: 1,
        type: INSTOCK_PARAMS_TYPE,
      },
      {
        label: 'out of stock',
        value: 0,
        type: INSTOCK_PARAMS_TYPE,
      }
    );

    fs.writeFile(output, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Generate Data to server...');
    })
  })
}

generateData(filePath, output);
