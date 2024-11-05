import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseURL from "../../utils/baseURL";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import Products from "../../components/Users/Products/Products";
import { useSearchParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { fetchBrandsAction } from "../../redux/slices/brands/brandsSlice";

export default function PLP() {
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingData, setLoadingData] = useState(false);

  const [params] = useSearchParams();
  const category = params.get("category");

  const dispatch = useDispatch();

  // Carrega marcas ao carregar a página
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  const { products, error } = useSelector((state) => state?.products);
  const { brands } = useSelector((state) => state?.brands);
  const brandsData = brands?.data?.slice(3, 9);

  // Função para buscar produtos
  const fetchProducts = () => {
    setLoadingData(true);
    const brandString = selectedBrands.join(",");
    const productUrl = `${baseURL}/products?category=${category || ""}&brand=${
      brandString || ""
    }&color=${color || ""}&price=${price || ""}&page=${page}&limit=4`;

    try {
      dispatch(fecthProductsAction({ url: productUrl }));
    } catch (error) {
      console.error("Erro na requisição de produtos:", error);
    }
    setLoadingData(false);
  };

  // Carrega produtos ao alterar filtros ou página
  useEffect(() => {
    if (category || selectedBrands.length || color || price) {
      fetchProducts();
    }
  }, [category, selectedBrands, color, price, page, dispatch]);

  // Atualiza a lista de produtos
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    if (products) {
      const uniqueNewProducts =
        products.data?.filter(
          (newProduct) => !productData.some((p) => p.id === newProduct.id)
        ) || [];
      setProductData((prevData) =>
        page === 1 ? uniqueNewProducts : [...prevData, ...uniqueNewProducts]
      );
    }
  }, [products, page]);

  console.log("dados finai", productData);

  // Reinicia a página ao mudar qualquer filtro de busca
  useEffect(() => {
    setPage(1);
    setProductData([]); // Limpa a lista de produtos quando qualquer filtro muda
  }, [category, selectedBrands, color, price]);

  // Função para gerenciar o scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        // Incrementa a página ao atingir o final da página
        if (!loadingData) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingData]);

  return (
    <Container fixed>
      <Grid container spacing={2} direction="row" sx={{ marginY: "5rem" }}>
        {/* Filtros de Marca */}
        <Grid item xs={12} sm={12} md={3} lg={3} sx={{ height: "auto" }}>
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
                      checked={selectedBrands.includes(brandItem?.name)}
                      onChange={() =>
                        setSelectedBrands((prevSelected) =>
                          prevSelected.includes(brandItem?.name)
                            ? prevSelected.filter((b) => b !== brandItem?.name)
                            : [...prevSelected, brandItem?.name]
                        )
                      }
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
            height: products ? "auto" : "100vh",
          }}
        >
          <Products products={productData} />
          {loadingData && <LoadingComponent />}
          {error && <ErrorMsg message={error?.message} />}
        </Grid>
      </Grid>
    </Container>
  );
}
