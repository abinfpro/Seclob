import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  User,
  ShoppingCart,
  ChevronRight,
  Heart,
} from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";


export default function EcommerceProductListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [itemsPerPage, setItemsPerPage] = useState(6); // default to 6 items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [productmodal, setproductmodal] = useState(false);
  const [subcategoriemodal, setsubcategoriemodal] = useState(false);
  const [categoriemodal, setcategoriemodal] = useState(false);
  const [imagePre, setImagePre] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [Catagory, setcategorie] = useState("");
  const [showcatagory, setshowcatagory] = useState([]);
  const [CatList, setCatList] = useState(false);
  const [subCatList, setsubCatList] = useState(false);
  const [selectCat, setSelectCat] = useState("choose one");
  const [selectSub, setSelectSub] = useState(" ");
  const [subCatValue, setSubCatValue] = useState("");
  const [showsubcatagory, setshowsubcatagory] = useState([]);
  const [showallsubcatagory, setshowallsubcatagory] = useState([]);
  const [dropDowns, setdropDowns] = useState(false);
  const [allProduts, setAllProducts] = useState([]);
  const [data, setdata] = useState({ title: "", description: "" });
  const [variant, setvariant] = useState([{ ram: "", price: "", qty: "" }]);
  const imageref = useRef();
  const [openIndex, setOpenIndex] = useState(null);

  const click = () => imageref.current.click();

  const showImage = async () => {
    try {
      const file = imageref.current.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result;
          setImageBase64(base64);
          setImagePre(base64);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Image preview error", error);
    }
  };

  const addCategory = async () => {
    try {
      const res = await axios.post("https://seclob-fsqq.onrender.com/api/auth/addcategory", { name: Catagory });
      setshowcatagory(res.data);
    } catch {
      alert("Add category failed");
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get("https://seclob-fsqq.onrender.com/api/auth/getcategory");
      setshowcatagory(data);
    } catch {
      alert("Fetch category failed");
    }
  };

  const addSubCategory = async () => {
    try {
      const res = await axios.post("https://seclob-fsqq.onrender.com/api/auth/addsubcategory", { selectCat, subCatValue });
      console.log("res.data", res.data);
    } catch {
      alert("Add Sub category failed");
    }
  };

  const getSubCategory = async (catname) => {
    try {
      const { data } = await axios.get(`https://seclob-fsqq.onrender.com/api/auth/getsubcategory/${catname}`);
      setshowsubcatagory(data);
    } catch {
      alert("Get Sub category failed");
    }
  };

  const getAllSubCategory = async () => {
    try {
      const { data } = await axios.get("https://seclob-fsqq.onrender.com/api/auth/getallsubcategory");
      setshowallsubcatagory(data);
    } catch {
      alert("Fetch all subcategories failed");
    }
  };

  const fetchAllproducts = async () => {
    try {
      const { data } = await axios.get(`https://seclob-fsqq.onrender.com/api/auth/allproduct`);
      setAllProducts(data);
      
    } catch {}
  };

  useEffect(() => {
    getCategory();
    fetchAllproducts();
  }, []);

  const handleChange = (e) => setdata({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post("https://seclob-fsqq.onrender.com/api/auth/addproduct", {
        data,
        selectSub,
        variant,
        image: imageBase64,
      });
    } catch {}
  };

  const varianthandleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...variant];
    updatedVariants[index][name] = value;
    setvariant(updatedVariants);
  };

  const addVariant = () => {
    setvariant([...variant, { ram: "", price: "", qty: "" }]);
  };

  const toggleDropdown = (index, categoryName) => {
    if (openIndex === index) {
      setOpenIndex(null);
      setshowsubcatagory([]);
    } else {
      setOpenIndex(index);
      getSubCategory(categoryName);
    }
  };

  // 🔍 FILTER + PAGINATION LOGIC
  const filteredProducts = allProduts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div className="relative">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-blue-800 text-white">
          <div className="px-4 py-4 flex justify-around">
            {/* Search Bar */}
            <div className="flex items-center flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search any things"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // reset to page 1 on search
                }}
                className="bg-white w-full px-4 py-2 rounded-l-lg border-0 focus:outline-none text-gray-700"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-6 py-2 rounded-r-lg text-white">
                Search
              </button>
            </div>
            {/* User Actions */}
            <div className="flex items-center space-x-6 ml-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="text-sm">Sign In</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-sm">Cart</span>
                <span className="bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">0</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Home</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Categories */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-1">
                {showcatagory?.map((category, index) => (
                  <div key={index}>
                    <div
                      className="p-1 flex items-center justify-between hover:bg-indigo-100 cursor-pointer"
                      onClick={() => toggleDropdown(index, category.name)}
                    >
                      <p className="text-black">{category.name}</p>
                      <span>{openIndex === index ? <FaChevronUp /> : <FaChevronDown />}</span>
                    </div>
                    {openIndex === index && (
                      <div className="ml-4 mt-1 space-y-1">
                        {showsubcatagory.map((subcat, i) => (
                          <p key={i} className="text-gray-700 hover:underline cursor-pointer">
                            {subcat.subcategory}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Buttons */}
            <div className="flex justify-end space-x-3 mb-6">
              <button onClick={() => setcategoriemodal(true)} className="bg-orange-500 text-white px-4 py-2 rounded text-sm">
                Add category
              </button>
              <button onClick={() => setsubcategoriemodal(true)} className="bg-orange-500 text-white px-4 py-2 rounded text-sm">
                Add sub category
              </button>
              <button onClick={() => setproductmodal(true)} className="bg-orange-500 text-white px-4 py-2 rounded text-sm">
                Add product
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (

                    <Link
  to={`/producrdetails/${product._id}`}
  state={{ product }}
  key={product.id}
  className="block bg-white rounded-lg border p-4 hover:shadow-md"
>
                  <div key={product.id} className="bg-white rounded-lg border p-4 hover:shadow-md">
                    <div className="relative">
                      <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center mb-4">
                        <img
                          className="w-full h-full object-cover rounded"
                          src={`https://seclob-fsqq.onrender.com/public/uploads/${product.image}`}
                          alt=""
                        />
                      </div>
                      <button className="absolute top-2 right-2 p-2 bg-blue-100 rounded-full hover:bg-blue-200">
                        <Heart className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
                    {product.variants.map((variant, index) => (
                      <p key={index}>₹{variant.price}</p>
                    ))}
                  </div>

</Link>
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-500">No products found.</p>
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>


  {/* Add Product */}
        {productmodal && (
          <div className="flex justify-center fixed top-0 bg-stone-950/50 w-screen h-screen p-10">
            <div className="font-sans w-[70%] mx-auto p-5 border border-gray-200 rounded-lg shadow-sm bg-white">
              <h2 class="mt-0 flex justify-center text-gray-800 text-xl font-semibold mb-4">
                Add Product
              </h2>

              <div className="flex  justify-between">
                <label class="block text-gray-700 font-medium mb-1">
                  Title:
                </label>
                <input
                  className="w-[784px] px-3 py-2 border border-gray-300 rounded-md"
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                />
              </div>

              <div>
                <div className=" mt-2">
                  <label class="block text-gray-700 font-medium mb-1">
                    variant:
                  </label>
                  {variant?.map((data, index) => (
                    <div
                      key={index}
                      className="rounded-md mb-2 flex justify-end px-5"
                    >
                      <div className="mb-1 flex items-center gap-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Ram
                        </label>
                        <input
                          type="text"
                          className="w-full px-5 py-2 border border-gray-300 rounded-md"
                          name="ram"
                          value={data.ram}
                          onChange={(e) => varianthandleChange(index, e)}
                        />
                      </div>
                      <div className="mb-1 flex items-center gap-1">
                        <label className="block text-sm font-medium text-gray-700">
                          Price
                        </label>
                        <input
                          type="text"
                          className="w-full px-5 py-2 border border-gray-300 rounded-md"
                          name="price"
                          value={data.price}
                          onChange={(e) => varianthandleChange(index, e)}
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <label className="block text-sm font-medium text-gray-700">
                          QTY
                        </label>
                        <input
                          type="text"
                          className="w-full px-5 py-2 border border-gray-300 rounded-md"
                          name="qty"
                          value={data.qty}
                          onChange={(e) => varianthandleChange(index, e)}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full flex justify-end px-5">
                  <button
                    type="button"
                    onClick={addVariant}
                    className="bg-stone-700 text-white rounded-lg p-3 hover:bg-stone-800 cursor-pointer mb-2 py-2"
                  >
                    Add Variant
                  </button>
                </div>
              </div>

              <div class="mb-4 flex justify-between items-center">
                <label class="block text-gray-700 font-medium mb-1">
                  Sub category :
                </label>

                <div className="flex">
                  <p className="w-[784px] px-3 py-2 border border-gray-400 rounded-md flex justify-between z-10 cursor-pointer">
                    {selectSub}{" "}
                    <span
                      onClick={() => {
                        setsubCatList(!subCatList), getAllSubCategory();
                      }}
                    >
                      <FaChevronDown />
                    </span>
                  </p>
                </div>
                <div className="absolute bg-gray-100 w-80 rounded shadow-2xl/50 m-50 mb-10 max-h-48 overflow-y-scroll">
                  {subCatList &&
                    showallsubcatagory.map((category, i) => {
                      return (
                        <div key={i}>
                          <p
                            className="p-1 hover:bg-indigo-200 cursor-pointer"
                            onClick={() => {
                              setSelectSub(category.subcategory);
                              setsubCatList(false);
                            }}
                          >
                            {category.subcategory}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div class="flex justify-between items-center">
                <label class="block text-gray-700 font-medium mb-1">
                  Description :
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="w-[784px] px-3 py-2 border border-gray-300 rounded-md"
                >
                  The Ryzen 7 is a more high-end processor that compares to the
                  int...
                </textarea>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <label className="block text-gray-700 font-medium mb-1">
                  Upload image:
                </label>

                <div className="w-[784px] px-3 py-2 border border-gray-300 relative rounded-md">
                  <div
                    className="border border-gray-400 rounded-lg w-32 h-32 flex items-center justify-center cursor-pointer overflow-hidden"
                    onClick={click}
                  >
                    {imagePre ? (
                      <img
                        src={imagePre}
                        alt="Preview"
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        Click to upload
                      </span>
                    )}
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    ref={imageref}
                    onChange={showImage}
                    className="hidden"
                  />
                </div>
              </div>

              <div class="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setproductmodal(false);
                  }}
                  class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  DISCARD
                </button>
                <button
                  onClick={() => {
                    setproductmodal(false), handleSubmit();
                  }}
                  class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add subCatagory */}
        {subcategoriemodal && (
          <div className="flex items-center fixed top-0 bg-stone-900/50 w-screen h-screen p-10">
            <div className="font-sans w-[30%] h-[40%] mx-auto p-5 border border-gray-200 rounded-lg shadow-sm bg-white">
              <h2 className="mt-0 flex justify-center text-gray-800 text-xl font-semibold mb-4">
                Add Sub Category
              </h2>
              <div className="flex gap-5 flex-col">
                <div className="flex">
                  <p className="w-[384px] px-3 py-2 border border-gray-400 rounded-md flex justify-between">
                    {selectCat}{" "}
                    <span onClick={() => setCatList(!CatList)}>
                      <FaChevronDown />
                    </span>
                  </p>
                </div>
                <div className="absolute bg-gray-100 w-80  rounded shadow-2xl/50  ">
                  {CatList &&
                    showcatagory.map((category, i) => {
                      return (
                        <div key={i}>
                          <p
                            className="p-1 hover:bg-indigo-100 cursor-pointer"
                            onClick={() => {
                              setSelectCat(category.name), setCatList(false);
                            }}
                          >
                            {category.name}
                          </p>
                        </div>
                      );
                    })}
                </div>

                <input
                  type="text"
                  class="w-[384px] px-3 py-2 border border-gray-400 rounded-md"
                  onChange={(e) => {
                    setSubCatValue(e.target.value);
                  }}
                />
              </div>
              <div class="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setsubcategoriemodal(false);
                  }}
                  class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  DISCARD
                </button>
                <button
                  onClick={() => {
                    addSubCategory(), setsubcategoriemodal(false);
                  }}
                  class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Catagory */}
        {categoriemodal && (
          <div className="flex items-center fixed top-0 bg-stone-900/50 w-screen h-screen p-10">
            <div className="font-sans w-[30%] h-[30%] mx-auto p-5 border border-gray-200 rounded-lg shadow-sm bg-white">
              <h2 className="mt-0 flex justify-center text-gray-800 text-xl font-semibold mb-4">
                Add Category
              </h2>
              <div className="">
                <input
                  type="text"
                  class="w-[384px] px-3 py-2 border border-gray-400 rounded-md"
                  onChange={(e) => {
                    setcategorie(e.target.value);
                  }}
                />
              </div>
              <div class="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => {
                    setcategoriemodal(false);
                  }}
                  class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  DISCARD
                </button>
                <button
                  onClick={() => {
                    addCategory(), setcategoriemodal(false);
                  }}
                  class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        )}
      
    </div>
  );
}
