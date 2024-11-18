import { useState, useEffect, useRef, useTransition } from 'react';
import getAllProducts from '../../services/getAllProducts';
import CardList from '../../components/CardList/CardList';
import Navbar from '../../components/Navbar/Navbar';
import RadioButton from '../../components/RadioButton/RadioButton';
import getAllProductCategories from '../../services/getAllProductCategories';

export default function ProductPage() {
  const [products, setProducts] = useState([]); // Produk yang ditampilkan
  const radioButtonOpts = useRef([{ label: 'All', value: 'all' }]); // Opsi kategori
  const originalProducts = useRef([]); // Data asli semua produk
  const [isPending, startTransition] = useTransition(); // Untuk optimisasi transisi UI
  const [selectedCategory, setSelectedCategory] = useState('all'); // Kategori terpilih
  const [searchQuery, setSearchQuery] = useState(''); // Query pencarian

  // Fetch produk dan kategori saat komponen pertama kali di-mount
  useEffect(() => {
    // Fetch data produk
    async function fetchAllProducts() {
      const allProducts = await getAllProducts();
      console.log('Fetched Products:', allProducts);
      originalProducts.current = allProducts; // Simpan data produk asli
      setProducts(allProducts); // Tampilkan data produk awal
    }

    // Fetch data kategori
    async function fetchCategories() {
      const allCategories = await getAllProductCategories();
      console.log('Fetched Categories:', allCategories);
      // Hapus kategori yang sudah ada dalam opsi radio button
      const newCategories = allCategories
        .map((cat) => ({
          label: cat.name,
          value: cat.slug,
        }))
        .filter(
          (newCat) =>
            !radioButtonOpts.current.some(
              (existingCat) => existingCat.value === newCat.value
            )
        );
      radioButtonOpts.current = [...radioButtonOpts.current, ...newCategories]; // Tambahkan kategori baru
    }

    fetchAllProducts();
    fetchCategories();
  }, []);

  // Update produk berdasarkan filter kategori dan pencarian
  useEffect(() => {
    startTransition(() => {
      const filtered = originalProducts.current.filter((product) => {
        const matchesCategory =
          selectedCategory === 'all' || product.categorySlug === selectedCategory;
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
      setProducts(filtered); // Update produk yang ditampilkan
    });
  }, [selectedCategory, searchQuery]);

  // Handle perubahan kategori
  const handleCategoryChange = (category) => {
    console.log('Selected Category:', category);
    setSelectedCategory(category);
  };

  // Handle perubahan query pencarian
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      {/* Navbar dengan fitur pencarian */}
      <Navbar onSearchChange={handleSearchChange} />

      {/* Filter Kategori */}
      <div className="px-24 py-4 gap-4 mt-4 flex-wrap">
        <h3 className="font-medium">Filter</h3>
        <div className="flex gap-2 flex-wrap">
          <RadioButton
            options={radioButtonOpts.current}
            defaultValue={'all'}
            onChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Daftar Produk */}
      <section className="container px-24 py-4">
        <main className="grid grid-cols-4 gap-4">
          <CardList products={products} isPending={isPending} />
        </main>
      </section>
    </>
  );
}
