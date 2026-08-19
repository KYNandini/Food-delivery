module.exports = {
  categories: [
    { id: 1, name: 'South Indian', icon: '🍛' },
    { id: 2, name: 'Biryani', icon: '🥘' },
    { id: 3, name: 'Burger', icon: '🍔' },
    { id: 4, name: 'Pizza', icon: '🍕' },
    { id: 5, name: 'Fast Food', icon: '🍟' }
  ],
  restaurants: [
    {
      id: 1,
      name: 'Rameshwaram Cafe',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.8,
      time: '15-20 min',
      price: '₹₹',
      category: 'South Indian',
      location: [12.9784, 77.6408],
      menu: [
        { id: 101, name: 'Ghee Thatte Idli', desc: 'Soft and fluffy plate idli served with unlimited chutney and sambar, drowned in pure ghee.', price: 70, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 102, name: 'Ghee Pudi Dosa', desc: 'Crispy dosa coated with spicy gun powder and roasted in ghee.', price: 110, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 103, name: 'Filter Coffee', desc: 'Authentic South Indian filter coffee.', price: 30, image: 'https://images.unsplash.com/photo-1620050853549-06b2915894b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 2,
      name: 'Vidyarthi Bhavan',
      image: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.9,
      time: '30-45 min',
      price: '₹₹',
      category: 'South Indian',
      location: [12.9438, 77.5738],
      menu: [
        { id: 201, name: 'Sagu Masala Dosa', desc: 'Thick, crispy, ghee-roasted dosa served with signature potato sagu and chutney.', price: 95, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 202, name: 'Kesari Bath', desc: 'A rich, sweet semolina dessert flavored with saffron and ghee.', price: 50, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 203, name: 'Rava Vada', desc: 'Crispy vada made with semolina and yogurt.', price: 45, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 3,
      name: 'CTR - Shri Sagar',
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.7,
      time: '25-35 min',
      price: '₹₹',
      category: 'South Indian',
      location: [12.9986, 77.5705],
      menu: [
        { id: 301, name: 'Benne Masala Dosa', desc: 'The legendary butter masala dosa with a crispy exterior and soft potato filling.', price: 85, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 302, name: 'Mangalore Bajji', desc: 'Soft and spongy fritters made with flour and yogurt, served with coconut chutney.', price: 55, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 303, name: 'Poori Sagu', desc: 'Fluffy fried pooris served with a mixed vegetable sagu.', price: 75, image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 4,
      name: 'Truffles',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      time: '40-50 min',
      price: '₹₹₹',
      category: 'Burger',
      location: [12.9344, 77.6115],
      menu: [
        { id: 401, name: 'All American Cheese Burger', desc: 'Juicy chicken patty, double cheese, lettuce, tomato, and Truffles signature sauce.', price: 245, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 402, name: 'Ferrero Rocher Shake', desc: 'Thick and creamy shake blended with Ferrero Rocher chocolates.', price: 195, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 403, name: 'Peri Peri Fries', desc: 'Crispy fries tossed in spicy peri peri seasoning.', price: 145, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 404, name: 'Classic French Fries', desc: 'Golden, crispy, and perfectly salted french fries.', price: 110, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 5,
      name: 'Empire Restaurant',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      time: '35-45 min',
      price: '₹₹₹',
      category: 'Biryani',
      location: [12.9740, 77.6067],
      menu: [
        { id: 501, name: 'Empire Special Chicken Biryani', desc: 'Signature Kerala-style chicken biryani with tender chicken pieces and aromatic rice.', price: 280, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 502, name: 'Ghee Rice & Chicken Kebab', desc: 'A classic combo of fragrant ghee rice and spicy fried chicken kebabs.', price: 320, image: 'https://images.unsplash.com/photo-1626082895617-2c6b4122d363?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 503, name: 'Coin Parotta (2 pcs)', desc: 'Small, flaky, and layered parottas.', price: 60, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 6,
      name: 'Nandhini Deluxe',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      time: '30-40 min',
      price: '₹₹₹',
      category: 'Biryani',
      location: [12.9250, 77.5938],
      menu: [
        { id: 601, name: 'Andhra Chilli Chicken', desc: 'Spicy, tangy, and fiery green chilli chicken dry.', price: 299, image: 'https://images.unsplash.com/photo-1626082895617-2c6b4122d363?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 602, name: 'Hyderabadi Chicken Biryani', desc: 'Authentic dum biryani cooked with marinated chicken and long grain basmati rice.', price: 310, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 603, name: 'Mutton Pepper Fry', desc: 'Succulent pieces of mutton cooked with freshly ground black pepper.', price: 380, image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 7,
      name: 'MTR - Mavalli Tiffin Room',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      time: '40-50 min',
      price: '₹₹',
      category: 'South Indian',
      location: [12.9547, 77.5855],
      menu: [
        { id: 701, name: 'Rava Idli', desc: 'A signature dish invented by MTR during WWII, served with potato sagu and chutney.', price: 80, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 702, name: 'Bisibelebath', desc: 'A spicy and wholesome meal of rice, lentils, vegetables, and aromatic spices, topped with boondi.', price: 115, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 703, name: 'Chandrahara', desc: 'A traditional MTR sweet made of maida and a liquid core of kova, served with a sweet liquid.', price: 90, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 704, name: 'Upma (Khara Bath)', desc: 'Roasted semolina cooked with local vegetables and aromatic spices.', price: 60, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 8,
      name: 'Hotel Kadamba (Hassan)',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      time: '30-40 min',
      price: '₹₹',
      category: 'South Indian',
      location: [13.0125, 76.1050],
      menu: [
        { id: 801, name: 'Kadamba Special Thali', desc: 'Authentic Karnataka meals served with Ragi Mudde, Soppu Saaru, and Palya.', price: 150, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 802, name: 'Neer Dosa', desc: 'Soft and lacy rice crepes served with coconut chutney and veg sagu.', price: 80, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 803, name: 'Filter Coffee', desc: 'Strong and aromatic South Indian filter coffee.', price: 30, image: 'https://images.unsplash.com/photo-1620050853549-06b2915894b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 9,
      name: 'Sri Krishna Cafe (Hassan)',
      image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      time: '20-30 min',
      price: '₹',
      category: 'South Indian',
      location: [13.0070, 76.1010],
      menu: [
        { id: 901, name: 'Masala Dosa', desc: 'Crispy dosa with a generous filling of spiced potato mash.', price: 60, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 902, name: 'Idli Vada Combo', desc: 'Two soft idlis and one crispy medu vada served with chutney and sambar.', price: 55, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 903, name: 'Plain Dosa', desc: 'Classic thin and crispy golden dosa served with coconut chutney.', price: 45, image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 904, name: 'Thatte Idli', desc: 'Large, flat, and extremely soft idli served hot with sambar.', price: 40, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 10,
      name: 'Malgudi Mylari Mane (Hassan)',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      time: '35-45 min',
      price: '₹₹₹',
      category: 'Biryani',
      location: [13.0150, 76.1100],
      menu: [
        { id: 1001, name: 'Donne Biryani', desc: 'Flavorful mint and coriander based biryani cooked with tender chicken and served in a donne.', price: 180, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1002, name: 'Kshatriya Kebab', desc: 'Spicy, deep-fried chicken pieces marinated in local spices.', price: 160, image: 'https://images.unsplash.com/photo-1626082895617-2c6b4122d363?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1003, name: 'Mutton Chops', desc: 'Rich and spicy mutton gravy perfect with biryani or parotta.', price: 250, image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 11,
      name: 'Gajanana (Hassan)',
      image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.2,
      time: '25-35 min',
      price: '₹₹',
      category: 'South Indian',
      location: [13.0080, 76.1020],
      menu: [
        { id: 1101, name: 'Set Dosa', desc: 'Soft and spongy set of 3 dosas served with veg sagu and coconut chutney.', price: 70, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1102, name: 'Khara Bath', desc: 'Spicy semolina upma cooked with vegetables and traditional spices.', price: 45, image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1103, name: 'Chow Chow Bath', desc: 'A popular combo of Khara Bath and sweet Kesari Bath.', price: 85, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 12,
      name: 'Panjurli (Hassan)',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.6,
      time: '35-45 min',
      price: '₹₹₹',
      category: 'Biryani',
      location: [13.0110, 76.1040],
      menu: [
        { id: 1201, name: 'Chicken Ghee Roast', desc: 'Fiery red, tangy, and spicy Mangalorean style chicken roasted in pure ghee.', price: 290, image: 'https://images.unsplash.com/photo-1626082895617-2c6b4122d363?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1202, name: 'Neer Dosa with Chicken Curry', desc: 'Soft neer dosa served with a rich coconut-based chicken curry.', price: 220, image: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1203, name: 'Mutton Biryani', desc: 'Authentic coastal style mutton biryani.', price: 340, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 13,
      name: 'Sattva Delicacy (Hassan)',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      time: '30-40 min',
      price: '₹₹',
      category: 'South Indian',
      location: [13.0095, 76.0980],
      menu: [
        { id: 1301, name: 'North Indian Thali', desc: 'A complete meal with Roti, Paneer Butter Masala, Dal Makhani, Rice, and Sweet.', price: 199, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1302, name: 'Paneer Tikka', desc: 'Cottage cheese cubes marinated in spices and grilled in a tandoor.', price: 180, image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1303, name: 'South Indian Meals', desc: 'Unlimited rice served with sambar, rasam, two varieties of palya, and curd.', price: 120, image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 14,
      name: 'Shivani (Hassan)',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.1,
      time: '40-50 min',
      price: '₹₹₹',
      category: 'Biryani',
      location: [13.0160, 76.1070],
      menu: [
        { id: 1401, name: 'Tandoori Chicken', desc: 'Classic roasted chicken marinated in yogurt and generous spices.', price: 280, image: 'https://images.unsplash.com/photo-1626082895617-2c6b4122d363?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1402, name: 'Chicken Fried Rice', desc: 'Wok-tossed rice with chicken chunks, egg, and vegetables.', price: 190, image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1403, name: 'Chilli Chicken', desc: 'Indo-Chinese style spicy chicken tossed with bell peppers and onions.', price: 220, image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 15,
      name: 'One Byte (Hassan)',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.4,
      time: '25-35 min',
      price: '₹₹',
      category: 'Fast Food',
      location: [13.0140, 76.1030],
      menu: [
        { id: 1501, name: 'Crispy Veg Burger', desc: 'A crunchy potato and peas patty topped with fresh lettuce and mayo.', price: 99, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1502, name: 'Chicken Zinger Burger', desc: 'Spicy fried chicken breast in a soft sesame bun.', price: 149, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1503, name: 'Loaded Cheese Fries', desc: 'Golden french fries generously topped with liquid cheese and jalapeños.', price: 129, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 16,
      name: 'Domino\'s Pizza (Hassan)',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.3,
      time: '30-40 min',
      price: '₹₹',
      category: 'Pizza',
      location: [13.0115, 76.0950],
      menu: [
        { id: 1601, name: 'Farmhouse Pizza', desc: 'A pizza that goes ballistic on veggies! Check out this mouth watering overload of crunchy, crisp capsicum, succulent mushrooms and fresh tomatoes', price: 459, image: 'https://images.unsplash.com/photo-1604381538336-b6fb1a6a6fdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1602, name: 'Peppy Paneer Pizza', desc: 'Chunky paneer with crisp capsicum and spicy red pepper - quite a mouthful!', price: 399, image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1603, name: 'Choco Lava Cake', desc: 'Chocolate lovers delight! Indulgent, gooey molten lava inside chocolate cake', price: 109, image: 'https://images.unsplash.com/photo-1511911063855-2bf39afa5b2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1604, name: 'Margherita Pizza', desc: 'Classic delight with 100% real mozzarella cheese.', price: 239, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1605, name: 'Chicken Dominator Pizza', desc: 'Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers.', price: 599, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    },
    {
      id: 17,
      name: 'McDonald\'s (Hassan)',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      rating: 4.5,
      time: '20-30 min',
      price: '₹₹',
      category: 'Burger',
      location: [13.0065, 76.1030],
      menu: [
        { id: 1701, name: 'McAloo Tikki Burger', desc: 'A golden fried potato and peas patty with special Indian spices, topped with tomato, onion and mayonnaise.', price: 59, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1702, name: 'McSpicy Chicken Burger', desc: 'Tender and juicy chicken patty coated in spicy, crispy batter topped with a creamy sauce and crispy shredded lettuce.', price: 185, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1703, name: 'Large French Fries', desc: 'World Famous Fries, crispy and golden on the outside and fluffy on the inside.', price: 119, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
        { id: 1704, name: 'Chicken McNuggets (6 pc)', desc: 'Tender, juicy chicken nuggets made with 100% white meat chicken.', price: 159, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }
      ]
    }
  ],
  orders: [
    { id: 'ORD-8291', restaurantId: 1, items: [{name: 'Ghee Thatte Idli', qty: 2}, {name: 'Filter Coffee', qty: 2}], total: 200, status: 'preparing', date: 'Today, 7:30 PM' },
    { id: 'ORD-7102', restaurantId: 4, items: [{name: 'All American Cheese Burger', qty: 1}, {name: 'Peri Peri Fries', qty: 1}], total: 390, status: 'delivered', date: 'Yesterday, 8:15 PM' }
  ]
};