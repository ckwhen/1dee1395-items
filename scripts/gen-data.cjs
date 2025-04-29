const fs = require('fs');
const { randomUUID } = require('crypto');

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
//       id,
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

    const items = JSON.parse(_items).map(item => ({ ...item, id: randomUUID() }));
    const categories = groupBy(items, 'category');

    const data = {};

    data.items = items;
    data.params = [];

    Object.keys(categories).sort().forEach((category) => {
      data.params.push({
        id: randomUUID(),
        label: category,
        value: category,
        type: CATEGORY_PARAMS_TYPE,
      });
    });

    data.params.push(
      {
        id: randomUUID(),
        label: '有庫存',
        value: 1,
        type: INSTOCK_PARAMS_TYPE,
      },
      {
        id: randomUUID(),
        label: '無庫存',
        value: 0,
        type: INSTOCK_PARAMS_TYPE,
      }
    );

    fs.writeFile(output, JSON.stringify(data), (err) => {
      if (err) {
        console.error(err);
      }
      console.log('Generate Data to server...');
    });
  })
}

generateData(filePath, output);
