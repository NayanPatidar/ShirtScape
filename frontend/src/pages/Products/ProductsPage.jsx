import React, { useContext, useState } from "react";
import "./ProductsPage.css";
import { useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductGrid from "../../components/ProductsGrid/ProductsGrid";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Nav";
import { SearchContext } from "../../contexts/contexts";

const ProductsPage = () => {
  const [products, setProducts] = useState();
  const [SortFeatures, setSortFeatures] = useState(false);
  const [SortOption, setSortOption] = useState("Recommended");
  const SortObj = {
    "Price: Low to High": "ASC",
    "Price: High to Low": "DESC",
  };
  const [CategoryFilter, setCategoryFilter] = useState({
    TShirt: false,
    Oversized: false,
    Shirt: false,
  });
  const [DiscountFilter, setDiscountFilter] = useState({
    10: false,
    30: false,
    50: false,
    70: false,
  });
  const [SizeFilter, setSizeFilter] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
  });

  const { searchTerm } = useContext(SearchContext);

  
  const { setCartVisibility } = useContext(SearchContext);

  useEffect(() => {
    setCartVisibility(true);
  }, []);


  const sortToggle = () => {
    setSortFeatures(!SortFeatures);
  };

  const sortToggleOff = () => {
    if (SortFeatures) {
      setSortFeatures(false);
    }
  };

  const setSortType = (SortType) => {
    setSortOption(SortType);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCategoryFilter((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSizeChange = (event) => {
    const { name, checked } = event.target;
    setSizeFilter((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleDiscountChange = (event) => {
    for (const key in DiscountFilter) {
      if (DiscountFilter[key]) {
        DiscountFilter[key] = false;
      }
    }

    const { value, checked } = event.target;
    setDiscountFilter((prevState) => ({
      ...prevState,
      [value]: checked,
    }));
  };

  function shuffleArray(array, seed) {
    const seededRandom = (min, max) => {
      let localSeed = seed % 2147483647;
      localSeed = localSeed < 0 ? localSeed + 2147483646 : localSeed;
      return (
        min + ((localSeed = (localSeed * 16807) % 2147483647) % (max - min + 1))
      );
    };

    for (let i = array.length - 1; i > 0; i--) {
      const j = seededRandom(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const seed = 2413;

  const fetchProductsData = async () => {
    const queryParams = new URLSearchParams();

    for (const key in CategoryFilter) {
      if (CategoryFilter[key]) {
        queryParams.append("category", key);
      }
    }

    if (SortOption != "Recommended") {
      queryParams.append("sort", SortObj[SortOption]);
    }

    for (const key in DiscountFilter) {
      if (DiscountFilter[key]) {
        queryParams.append("discount", key);
      }
    }

    for (const key in SizeFilter) {
      if (SizeFilter[key]) {
        queryParams.append("size", key);
      }
    }

    if (searchTerm != "") {
      queryParams.append("search", searchTerm);
    }

    const queryString = queryParams.toString();
    const url = queryString
      ? `http://localhost:8080/products/men?${queryString}`
      : "http://localhost:8080/products/men";

    const response = await fetch(url);
    const ProductsData = await response.json();

    if (queryString == "" || !queryString.includes("sort")) {
      const shuffledData = shuffleArray(ProductsData.clothsData.slice(), seed);
      setProducts(shuffledData);
    } else {
      setProducts(ProductsData.clothsData);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchProductsData();
  }, [CategoryFilter, SortOption, DiscountFilter, SizeFilter, searchTerm]);

  return (
    <div>
      <div
        className="ProductsPageMain flex flex-col pt-16"
        onClick={sortToggleOff}
      >
        <div className=" ProductDescriptionArea p-2">
          <div className=" DescriptionAreaContent h-10 flex flex-row justify-end pr-8">
            <div className=" SortBox z-10">
              <div
                className=" Sorting h-10 flex pl-2 items-center justify-between cursor-pointer"
                onClick={sortToggle}
              >
                <div>
                  Sort by :
                  <span className=" SortBoxText pl-1">{SortOption}</span>
                </div>
                <div>
                  <RiArrowDropDownLine className=" font-thin" size={25} />
                </div>
              </div>
              {SortFeatures ? (
                <ul className=" DropDownSortBox bg-white z-10 cursor-pointer">
                  <li
                    className=" pt-1 pb-1 pl-2 hover:bg-slate-300"
                    onClick={() => setSortType("Price: Low to High")}
                  >
                    Price: Low to High
                  </li>
                  <li
                    className=" pt-1 pb-1 pl-2 hover:bg-slate-300"
                    onClick={() => setSortType("Price: High to Low")}
                  >
                    Price: High to Low
                  </li>
                  <li
                    className=" pt-1 pb-1 pl-2 hover:bg-slate-300"
                    onClick={() => setSortType("Recommended")}
                  >
                    Recommended
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>

        <div className=" flex flex-row">
          <div className="FilterTableMain flex flex-col p-3 ">
            <div className=" flex flex-col  border-b border-gray-300 pb-3">
              <span className=" font-semibold text-gray-700 text-sm pb-1">
                PRODUCTS
              </span>
              <div className="checkbox-example">
                <input
                  type="checkbox"
                  name="TShirt"
                  checked={CategoryFilter.TShirt}
                  onChange={handleCheckboxChange}
                />
                <label className=" pl-2  text-sm text-gray-700">T-Shirts</label>
              </div>
              <div className="checkbox-example">
                <input
                  type="checkbox"
                  name="Oversized"
                  checked={CategoryFilter.Oversized}
                  onChange={handleCheckboxChange}
                />
                <label className=" pl-2 text-sm text-gray-700">
                  Oversized T-Shirts
                </label>
              </div>
              <div className="checkbox-example">
                <input
                  type="checkbox"
                  name="Shirt"
                  checked={CategoryFilter.Shirt}
                  onChange={handleCheckboxChange}
                />
                <label className=" pl-2 text-sm text-gray-700">Shirts</label>
              </div>
            </div>
            <div className="border-b border-gray-300 pb-3">
              <span className=" font-semibold text-gray-700 text-sm">SIZE</span>
              <div className="grid grid-cols-3 pt-1">
                <div className="checkbox-example">
                  <input
                    type="checkbox"
                    value="1"
                    id="checkboxOneInput"
                    name="1"
                    checked={SizeFilter.S}
                    onChange={handleSizeChange}
                  />
                  <label className=" pl-2 text-sm text-gray-700">S</label>
                </div>
                <div className="checkbox-example">
                  <input
                    type="checkbox"
                    value="2"
                    id="checkboxOneInput"
                    name="2"
                    checked={SizeFilter.M}
                    onChange={handleSizeChange}
                  />
                  <label className=" pl-2 text-sm text-gray-700">M</label>
                </div>
                <div className="checkbox-example">
                  <input
                    type="checkbox"
                    value="3"
                    id="checkboxOneInput"
                    name="3"
                    checked={SizeFilter.L}
                    onChange={handleSizeChange}
                  />
                  <label className=" pl-2 text-sm text-gray-700">L</label>
                </div>
                <div className="checkbox-example">
                  <input
                    type="checkbox"
                    value="4"
                    id="checkboxOneInput"
                    name="4"
                    checked={SizeFilter.XL}
                    onChange={handleSizeChange}
                  />
                  <label className=" pl-2 text-sm text-gray-700">XL</label>
                </div>
              </div>
            </div>
            <div className=" flex flex-col  border-b border-gray-300 pb-3">
              <span className=" font-semibold text-gray-700 text-sm pb-1">
                DISCOUNT
              </span>
              <div className="checkbox-example">
                <input
                  type="radio"
                  value="10"
                  id="radioOneInput"
                  name="discount1"
                  checked={DiscountFilter[10]}
                  onChange={handleDiscountChange}
                />
                <label className=" pl-2  text-sm text-gray-700">
                  10% and above
                </label>
              </div>
              <div className="checkbox-example">
                <input
                  type="radio"
                  value="30"
                  id="radioTwoInput"
                  name="discount2"
                  checked={DiscountFilter[30]}
                  onChange={handleDiscountChange}
                />
                <label className=" pl-2 text-sm text-gray-700">
                  30% and above
                </label>
              </div>
              <div className="checkbox-example">
                <input
                  type="radio"
                  value="50"
                  id="radioThreeInput"
                  name="discount3"
                  checked={DiscountFilter[50]}
                  onChange={handleDiscountChange}
                />
                <label className=" pl-2 text-sm text-gray-700">
                  50% and above
                </label>
              </div>
            </div>
          </div>
          <ProductGrid className=" ProductGridMain" productsData={products} />
        </div>
      </div>
    </div>
  );
};
export default ProductsPage;
