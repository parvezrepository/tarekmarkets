export const adminStats = [
  { label: 'Total Sales', value: '৳458,200', trend: '+12.5%', isUp: true },
  { label: 'Total Orders', value: '1,240', trend: '+5.2%', isUp: true },
  { label: 'Total Products', value: '56', trend: '0%', isUp: true },
  { label: 'New Customers', value: '184', trend: '-2.4%', isUp: false },
];

export const salesData = [
  { day: 'Mon', sales: 4500 },
  { day: 'Tue', sales: 5200 },
  { day: 'Wed', sales: 4800 },
  { day: 'Thu', sales: 7100 },
  { day: 'Fri', sales: 6800 },
  { day: 'Sat', sales: 9200 },
  { day: 'Sun', sales: 8500 },
];

export const recentOrders = [
  { id: 'ORD-A912', customer: 'Tanvir Ahmed', email: 'tanvir@example.com', product: 'Gold Scalper EA', amount: 2000, method: 'bKash', status: 'Delivered', date: '2024-05-09' },
  { id: 'ORD-B442', customer: 'Sumi Akter', email: 'sumi@example.com', product: 'News Filter EA', amount: 1800, method: 'Nagad', status: 'Pending', date: '2024-05-10' },
  { id: 'ORD-C122', customer: 'Rakib Hasan', email: 'rakib@example.com', product: 'Forex Auto Trade Bot', amount: 2500, method: 'Card', status: 'Confirmed', date: '2024-05-10' },
  { id: 'ORD-D882', customer: 'Anika Rahman', email: 'anika@example.com', product: 'RSI Divergence', amount: 800, method: 'bKash', status: 'Cancelled', date: '2024-05-08' },
  { id: 'ORD-E334', customer: 'Jasim Uddin', email: 'jasim@example.com', product: 'Account Manager', amount: 3500, method: 'Bank', status: 'Pending', date: '2024-05-10' },
];

export const customers = [
  { id: 1, name: 'Tanvir Ahmed', email: 'tanvir@example.com', orders: 12, spent: 15400, joined: '2024-01-15' },
  { id: 2, name: 'Sumi Akter', email: 'sumi@example.com', orders: 5, spent: 8200, joined: '2024-02-10' },
  { id: 3, name: 'Rakib Hasan', email: 'rakib@example.com', orders: 3, spent: 4500, joined: '2024-03-05' },
];

export const transactions = [
  { id: 'TXN-99120', customer: 'Tanvir Ahmed', amount: 2000, method: 'bKash', status: 'Success', date: '2024-05-09' },
  { id: 'TXN-88121', customer: 'Sumi Akter', amount: 1800, method: 'Nagad', status: 'Pending', date: '2024-05-10' },
  { id: 'TXN-77122', customer: 'Rakib Hasan', amount: 2500, method: 'Card', status: 'Success', date: '2024-05-10' },
];

export const deliveryStatus = [
  { id: 'ORD-A912', email: 'tanvir@example.com', product: 'Gold Scalper EA', link: 'https://digimart.com/dl/gs-ea-v2', sent: true },
  { id: 'ORD-B442', email: 'sumi@example.com', product: 'News Filter EA', link: 'https://digimart.com/dl/nf-ea-v1', sent: false },
  { id: 'ORD-C122', email: 'rakib@example.com', product: 'Forex Auto Trade Bot', link: 'https://digimart.com/dl/fat-bot-v3', sent: false },
];
