import React, { useState } from "react";
import "./ProductsPage.css";
import { useEffect } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductGrid from "../../components/ProductsGrid/ProductsGrid";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState();
  const [SortFeatures, setSortFeatures] = useState(false);
  const [CategoryFilter, setCategoryFilter] = useState({
    TShirt: false,
    Oversized: false,
    Shirt: false,
  });

  const sortToggle = () => {
    setSortFeatures(!SortFeatures);
  };

  const sortToggleOff = () => {
    if (SortFeatures) {
      setSortFeatures(false);
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCategoryFilter((prevState) => ({
      ...prevState,
      [name]: checked,
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
    const queryString = queryParams.toString();
    const url = queryString
      ? `http://localhost:8080/products/men?${queryString}`
      : "http://localhost:8080/products/men";

    const response = await fetch(url);
    const ProductsData = await response.json();
    const shuffledData = shuffleArray(ProductsData.clothsData.slice(), seed);
    setProducts(shuffledData);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchProductsData();
  }, [CategoryFilter]);

  return (
    <div
      className="ProductsPageMain flex flex-col pt-16"
      onClick={sortToggleOff}
    >
      <div className=" ProductDescriptionArea p-2">
        <div className=" DescriptionAreaContent h-10 flex flex-row justify-end pr-8">
          <div className=" SortBox z-10">
            <div
              className=" Sorting h-10 flex pl-2 items-center justify-between"
              onClick={sortToggle}
            >
              <div>
                Sort by :<span className=" SortBoxText pl-1">Recommended</span>
              </div>
              <div>
                <RiArrowDropDownLine className=" font-thin" size={25} />
              </div>
            </div>
            {SortFeatures ? (
              <ul className=" DropDownSortBox bg-white z-10 ">
                <li className=" pt-1 pb-1 pl-2 hover:bg-slate-300">
                  Price: Low to High
                </li>
                <li className=" pt-1 pb-1 pl-2 hover:bg-slate-300">
                  Price: High to Low
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
            <span className=" font-semibold text-gray-600 text-sm pb-1">
              PRODUCTS
            </span>
            <div className="checkbox-example">
              <input
                type="checkbox"
                name="TShirt"
                checked={CategoryFilter.Tshirt}
                onChange={handleCheckboxChange}
              />
              <label className=" pl-2  text-sm text-gray-600">T-Shirts</label>
            </div>
            <div className="checkbox-example">
              <input
                type="checkbox"
                name="Oversized"
                checked={CategoryFilter.Oversized}
                onChange={handleCheckboxChange}
              />
              <label className=" pl-2 text-sm text-gray-600">
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
              <label className=" pl-2 text-sm text-gray-600">Shirts</label>
            </div>
          </div>
          <div className="border-b border-gray-300 pb-3">
            <span className=" font-semibold text-gray-600 text-sm">SIZE</span>
            <div className="grid grid-cols-3 pt-1">
              <div className="checkbox-example">
                <input type="checkbox" value="1" id="checkboxOneInput" />
                <label className="pl-2 text-sm text-gray-600">XS</label>
              </div>
              <div className="checkbox-example">
                <input type="checkbox" value="1" id="checkboxOneInput" />
                <label className=" pl-2 text-sm text-gray-600">S</label>
              </div>
              <div className="checkbox-example">
                <input type="checkbox" value="1" id="checkboxOneInput" />
                <label className=" pl-2 text-sm text-gray-600">M</label>
              </div>
              <div className="checkbox-example">
                <input type="checkbox" value="1" id="checkboxOneInput" />
                <label className=" pl-2 text-sm text-gray-600">L</label>
              </div>
              <div className="checkbox-example">
                <input type="checkbox" value="1" id="checkboxOneInput" />
                <label className=" pl-2 text-sm text-gray-600">XL</label>
              </div>
              <div className="checkbox-example">
                <input type="checkbox" value="1" id="checkboxOneInput" />
                <label className=" pl-2 text-sm text-gray-600">XXL</label>
              </div>
            </div>
          </div>
          <div className=" flex flex-col  border-b border-gray-300 pb-3">
            <span className=" font-semibold text-gray-600 text-sm pb-1">
              PRICE
            </span>
            <div className="checkbox-example">
              <input
                type="checkbox"
                value="1"
                id="checkboxOneInput"
                className=" size-3"
              />
              <label className=" pl-2  text-sm text-gray-600">T-Shirts</label>
            </div>
            <div className="checkbox-example">
              <input type="checkbox" value="1" id="checkboxOneInput" />
              <label className=" pl-2 text-sm text-gray-600">
                Oversized T-Shirts
              </label>
            </div>
            <div className="checkbox-example">
              <input type="checkbox" value="1" id="checkboxOneInput" />
              <label className=" pl-2 text-sm text-gray-600">Shirts</label>
            </div>
          </div>
          <div className=" flex flex-col  border-b border-gray-300 pb-3">
            <span className=" font-semibold text-gray-600 text-sm pb-1">
              DISCOUNT
            </span>
            <div className="checkbox-example">
              <input
                type="checkbox"
                value="1"
                id="checkboxOneInput"
                className=" size-3"
              />
              <label className=" pl-2  text-sm text-gray-600">T-Shirts</label>
            </div>
            <div className="checkbox-example">
              <input type="checkbox" value="1" id="checkboxOneInput" />
              <label className=" pl-2 text-sm text-gray-600">
                Oversized T-Shirts
              </label>
            </div>
            <div className="checkbox-example">
              <input type="checkbox" value="1" id="checkboxOneInput" />
              <label className=" pl-2 text-sm text-gray-600">Shirts</label>
            </div>
          </div>
        </div>
        <ProductGrid productsData={products} />
      </div>
    </div>
  );
};
export default ProductsPage;
