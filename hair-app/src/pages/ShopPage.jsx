import { useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import FilterSidebar from '../components/shop/FilterSidebar';
import ProductCard from '../components/shop/ProductCard';
import ShopToolbar from '../components/shop/ShopToolbar';
import Pagination from '../components/shop/Pagination';

const PRICE_BOUNDS = {
  min: Math.min(...PRODUCTS.map((p) => p.price)),
  max: Math.max(...PRODUCTS.map((p) => p.price)),
};

export default function ShopPage() {
  const [filters, setFilters] = useState({
    categories: [],
    minPrice: PRICE_BOUNDS.min,
    maxPrice: PRICE_BOUNDS.max,
  });
  const [sort, setSort] = useState('alpha-asc');
  const [pageSize, setPageSize] = useState(12);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }
    const sorted = [...list];
    switch (sort) {
      case 'alpha-desc':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [filters, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateFilters = (updater) => {
    setFilters(updater);
    setPage(1);
  };
  const updateSort = (value) => { setSort(value); setPage(1); };
  const updatePageSize = (value) => { setPageSize(value); setPage(1); };

  return (
    <section className="shopPage">
      <div className="wrap">
        <div className="sectionHead">
          <div>
            <span className="eyebrow">Shop</span>
            <h2>Bundles &amp; wigs, ready to take home.</h2>
          </div>
          <p>Ship-to-you hair, no appointment required. Add an install service separately if you'd like it fitted.</p>
        </div>

        <div className="shopLayout">
          <FilterSidebar
            filters={filters}
            setFilters={updateFilters}
            resultCount={filtered.length}
            priceBounds={PRICE_BOUNDS}
          />

          <div className="shopMain">
            <ShopToolbar
              sort={sort} setSort={updateSort}
              pageSize={pageSize} setPageSize={updatePageSize}
              total={filtered.length}
            />

            {pageItems.length === 0 ? (
              <p className="shopEmpty">No products match those filters — try widening your price range.</p>
            ) : (
              <div className="productGrid">
                {pageItems.map((p) => <ProductCard product={p} key={p.id} />)}
              </div>
            )}

            <Pagination page={currentPage} totalPages={totalPages} setPage={setPage} />
          </div>
        </div>
      </div>
    </section>
  );
}
