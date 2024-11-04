import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseURL from "../../utils/baseURL";
import { useSearchParams } from "react-router-dom";
import { fetchBrandsAction } from "../../redux/slices/brands/brandsSlice";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import Products from "../../components/Users/Products/Products";

export default function PLP() {
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");

  const [params] = useSearchParams();
  const category = params.get("category");

  //build up url
  let productUrl = `${baseURL}/products?category`;

  if (category) {
    productUrl = `${baseURL}/products?category=${category}`;
  }

  if (brand) {
    productUrl = `${productUrl}&brand=${brand}`;
  }

  if (size) {
    productUrl = `${productUrl}&size=${size}`;
  }

  if (color) {
    productUrl = `${productUrl}&color=${color.name}`;
  }

  if (price) {
    productUrl = `${productUrl}&price=${price}`;
  }

  const dispatch = useDispatch();

  //get products
  useEffect(() => {
    dispatch(
      fecthProductsAction({
        url: productUrl,
      })
    );
  }, [dispatch, category, brand, size, color, price, productUrl]);

  const { products, loading, error } = useSelector((state) => state?.products);

  //filter for brands
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  const { brands } = useSelector((state) => state?.brands);
  let brandsData = brands?.data?.slice(3, 9);

  return (
    <Container fixed>
      <Grid container spacing={2} direction="row" sx={{ marginY: "5rem" }}>
        {/* Filtros */}
        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          lg={3}
          sx={{
            height: "auto",
          }}
        >
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Marca
            </AccordionSummary>
            <AccordionDetails>
              <div className="space-y-2">
                {brandsData?.map((brandItem) => (
                  <div key={brandItem?._id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      checked={brand === brandItem?.name} // Verifica se a marca está selecionada
                      onChange={() =>
                        setBrand((prevBrand) =>
                          prevBrand === brandItem?.name ? "" : brandItem?.name
                        )
                      } // Alterna entre definir e remover a marca
                    />
                    <label className="ml-3 min-w-0 flex-1 text-gray-500">
                      {brandItem?.name}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Produtos */}
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={9}
          lg={9}
          sx={{
            height: products ? "auto" : " 100vh",
          }}
        >
          {/* Product grid */}
          {loading ? (
            <LoadingComponent />
          ) : error ? (
            <ErrorMsg message={error?.message} />
          ) : (
            <Products
              products={Array.isArray(products?.data) ? products?.data : []}
            />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
