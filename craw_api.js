// 敲api

// https://shopee.tw/api/v4/search/search_items?by=relevancy&keyword=nintendo%20switch&limit=60&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2
// https://shopee.tw/api/v4/search/search_items?by=relevancy&keyword=nintendo%20switch&limit=60&newest=60&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2


const result = [];

let res;
let data;

res = await fetch('https://shopee.tw/api/v4/search/search_items?by=relevancy&keyword=nintendo%20switch&limit=60&newest=0&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2');
data = await res.json();

// 取得總數
const { total_count: totalCount } = data;

for(let i=0; i<=totalCount ; i+=60) {
  
  res = await fetch(`https://shopee.tw/api/v4/search/search_items?by=relevancy&keyword=nintendo%20switch&limit=60&newest=${i}&order=desc&page_type=search&scenario=PAGE_GLOBAL_SEARCH&version=2`);
  data = await res.json();

  const { items } = data;

  if(!Array.isArray(items)) {
    break;
  }

  for(const item of items) {
    
    result.push({
      title: item.item_basic.name,
      img: `https://cf.shopee.tw/file/${item.item_basic.image}_tn`,
      price: item.item_basic.price,
      link: `https://shopee.tw/${item.item_basic.name}-i.${item.item_basic.shopid}.${item.item_basic.itemid}`
    });
  }
  
  console.log('爬好一頁了');
}

console.log('result => ', result);