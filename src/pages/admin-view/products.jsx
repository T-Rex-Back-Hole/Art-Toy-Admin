import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Fragment, useEffect, useState } from "react";
import CommonForm from "@/components/common/form";
import { addProductFormElements } from "@/config";
import ProductImageUpload from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/products-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";
// import ProductFilter from "@/components/admin-view/filter";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuRadioGroup,
//   DropdownMenuRadioItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { ArrowUpDownIcon } from "lucide-react";
// import { sortOptions } from "@/config";
// import { fetchAllFilteredProducts } from "@/store/admin/products-slice";
// import { useSearchParams } from "react-router-dom";

// const initialSort = null; const initialFilters ={};

// function createSearchParamsHelper(filterParams){
//   const queryParams = [];

//   for (const [key, value] of Object.entries(filterParams)) {
//     if (Array.isArray(value) && value.length > 0) {
//       const paramValue = value.join(",");

//       queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
//     }

// }
// console.log(queryParams, "queryParams");

// return queryParams.join("&");
// }

const initialFormData = {
  name: "",
  price: "",
  image: null,
  category: "",
  materials: "",
  product_type: "",
  description: "",
};

function AdminProducts() {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [currentEditedId, setCurrentEditedId] = useState(null);
  // const [filters, setFilters] = useState(initialFilters);
  // const [sort, setSort] = useState(initialSort);
  // const [searchParams, setSearchParams] = useSearchParams()

  // function handleSort(value) {
  //   setSort(value);
  // }

  // function handleFilter(getSectionId, getCurrentOption) {
  //   let cpyFilters = { ...filters };
  //   const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
  //   if (indexOfCurrentSection === -1) {
  //     cpyFilters = {
  //       ...cpyFilters,
  //       [getSectionId]: [getCurrentOption],
  //     };
  //   } else {
  //     const indexOfCurrentOption =
  //       cpyFilters[getSectionId].indexOf(getCurrentOption);
  //     if (indexOfCurrentOption === -1)
  //       cpyFilters[getSectionId].push(getCurrentOption);
  //     else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
  //   }

  //   console.log(cpyFilters);
  //   setFilters(cpyFilters);
  //   sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  // }

  

  // function resetFiltersAndSort() { 
    
  //   setFilters(initialFilters); 
  //   setSort(initialSort); 
  //   sessionStorage.removeItem("filters");
  //   setSearchParams(new URLSearchParams);
  //   window.location.reload();
  // }

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(data, "edit");

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false);
            setCurrentEditedId(null);
            // resetFiltersAndSort();
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
          
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            // resetFiltersAndSort();
            toast({
              title: "product add successfuly",
            });
          }
        });
  }

  function handleDelete(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        // resetFiltersAndSort();
      }
    });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // useEffect(() => {
  //   setSort("price-lowtohigh");
  //   setFilters(JSON.parse(sessionStorage.getItem("filters")) || initialFilters);
  // }, []);

  // useEffect(() => {
  //   if (filters && Object.keys(filters).length > 0) {
  //     const createQueryString = createSearchParamsHelper(filters);
  //     setSearchParams(new URLSearchParams(createQueryString));
  //   }
  // }, [filters]);

  // useEffect(() => {
  //   if (filters !== null && sort !== null)
  //   dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
  // }, [dispatch, sort, filters]);

  

  

  // console.log(formData,searchParams, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        {/* <div className="flex items-center gap-3">
          <span className="text-muted-foreground">
            {productList?.length} Products
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <ArrowUpDownIcon className="h-4 w-4" />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                {sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}

        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6"> */}
        {/* <ProductFilter filters={filters} handleFilter={handleFilter} /> */}

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4" >
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <AdminProductTile
                key={productItem.id}
                  setFormData={setFormData}
                  setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                  setCurrentEditedId={setCurrentEditedId}
                  product={productItem}
                  handleDelete={handleDelete}
                />
              ))
            : null}
        </div>
      {/* </div> */}
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>

            <SheetDescription>
              Fill out the form below to add a new product
            </SheetDescription>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            currentEditedId={currentEditedId}
            isEditMode={currentEditedId !== null}
          />

          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditedId !== null ? "Edit" : "Add"}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProducts;
