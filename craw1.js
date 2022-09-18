// 頁面爬抓

const result = [];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const crawling = async (ls) => {

  // 取得該頁所有項目
  let list = document.getElementsByClassName('shopee-search-item-result__item');

  if(list.length === 0) {
    console.log('No More Data');
    throw Error('No More Data');
  }

  // 只要有一張圖片沒載入就等
  const notLoadImg = Array.prototype.findIndex.call(list, (item) => {
    return !item.querySelector('a').querySelector('img').src;
  });
  
  if(notLoadImg >= 0) {
    await sleep(3000);
    list = document.getElementsByClassName('shopee-search-item-result__item');
  }

  for(const item of list) {
    ls.push({
      title: item.querySelector('a').querySelector('div[data-sqe="name"]').textContent,
      img: item.querySelector('a').querySelector('img').src,
      // 位置在商品名稱的下一個
      price: item.querySelector('a').querySelector('div[data-sqe="name"]').nextSibling.textContent,
      link: item.querySelector('a').href,
    });
  }
};

let isEnd = 0;

document.body.style.zoom = 0.1

for(isEnd = 0 ; isEnd<1; isEnd+=0) {
  try {
    await sleep(5000)

    crawling(result);
    const pageController = document.getElementsByClassName('shopee-page-controller')[0];
    const currBtn = pageController.querySelector('button.shopee-button-solid--primary');
    const nextBtn = currBtn.nextSibling;

    // 表示沒有下一頁
    if(nextBtn.getAttribute('class') !== 'shopee-button-no-outline') {
      console.log('No More Page');
      throw Error('No More Page');
    }

    nextBtn.click();
    
  } catch(e) {
    isEnd = 1;
    break;
  }
}

console.log('result => ', result);
console.log('result.length => ', result.length);