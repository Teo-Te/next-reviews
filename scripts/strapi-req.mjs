import { writeFileSync } from 'node:fs';
import qs from 'qs';

const url = 'http://localhost:1337/api/reviews?' + qs.stringify({
        filters: [slug][$eq] = 'a-way-out-2018',
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },
      }, { encodeValuesOnly: true });
      
console.log('API Request URL:', url);

const response = await fetch(url);
const {data} = await response.json();
console.log("data: ", data);
const {attributes} = data[0];
const formatted = JSON.stringify(data, null, 2);
const file = 'scripts/reviews.json';
writeFileSync(file, formatted, 'utf8');