const { MeiliSearch } = require('meilisearch');

let client;

function getMeili() {
  if (!client) {
    client = new MeiliSearch({
      host: process.env.MEILI_HOST || 'http://localhost:7700',
      apiKey: process.env.MEILI_MASTER_KEY,
    });
  }
  return client;
}

const GIG_INDEX = 'gigs';

async function setupIndexes() {
  const meili = getMeili();
  try {
    const index = meili.index(GIG_INDEX);
    await index.updateSettings({
      searchableAttributes: ['title', 'description', 'tags', 'category_name', 'seller_name'],
      filterableAttributes: ['status', 'category_id', 'basic_price', 'rating', 'seller_vip'],
      sortableAttributes: ['basic_price', 'rating', 'orders_count', 'created_at'],
      rankingRules: ['words', 'typo', 'proximity', 'attribute', 'sort', 'exactness'],
    });
    console.log('✅ Meilisearch indexes configured');
  } catch (err) {
    console.warn('Meilisearch not available (search will fall back to DB):', err.message);
  }
}

async function indexGig(gig) {
  try {
    const meili = getMeili();
    await meili.index(GIG_INDEX).addDocuments([{
      id: gig.id,
      title: gig.title,
      description: gig.description,
      tags: gig.tags || [],
      category_id: gig.category_id,
      category_name: gig.category_name || '',
      basic_price: parseFloat(gig.basic_price),
      rating: parseFloat(gig.rating),
      orders_count: gig.orders_count,
      status: gig.status,
      seller_name: gig.seller_name || '',
      seller_vip: gig.seller_vip || 'free',
      images: gig.images || [],
      created_at: gig.created_at,
    }]);
  } catch {}
}

async function deleteGigIndex(gigId) {
  try {
    await getMeili().index(GIG_INDEX).deleteDocument(gigId);
  } catch {}
}

async function searchGigs(q, filters = {}) {
  try {
    const meili = getMeili();
    const filterParts = ["status = 'active'"];
    if (filters.category_id) filterParts.push(`category_id = ${filters.category_id}`);
    if (filters.min_price) filterParts.push(`basic_price >= ${filters.min_price}`);
    if (filters.max_price) filterParts.push(`basic_price <= ${filters.max_price}`);
    if (filters.rating) filterParts.push(`rating >= ${filters.rating}`);

    const result = await meili.index(GIG_INDEX).search(q, {
      filter: filterParts.join(' AND '),
      sort: filters.sort ? [`${filters.sort}:${filters.order || 'desc'}`] : ['orders_count:desc'],
      limit: filters.limit || 20,
      offset: filters.offset || 0,
    });
    return { gigs: result.hits, total: result.estimatedTotalHits, source: 'meili' };
  } catch {
    return null; // caller falls back to DB
  }
}

module.exports = { setupIndexes, indexGig, deleteGigIndex, searchGigs };
