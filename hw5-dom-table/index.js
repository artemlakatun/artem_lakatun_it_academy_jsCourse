fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then((data) => {
    const products = data.products;
    const cards = document.querySelectorAll('.card');
    products.forEach((product, index) => {
      const card = cards[index];
      if (card) {
        const image = card.querySelector(".card-img-top");
        const title = card.querySelector(".card-title");
        const description = card.querySelector(".card-text");
        const price = card.querySelector(".price");
        const rating = card.querySelector('.rating');
        const lastCardButton = card.querySelector('.btn');

          image.src = product.images[0];
          title.textContent = product.title;
          description.textContent = product.description;
          price.textContent = `Price: $${product.price}`;
          rating.textContent = product.rating;
          lastCardButton.textContent = 'Add to card';
        }
    })
  });
