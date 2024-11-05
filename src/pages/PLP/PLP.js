import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseURL from "../../utils/baseURL";
import { fetchProductsAction } from "../../redux/slices/products/productsSlice";
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
import debounce from "lodash.debounce";

export default function PLP() {
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingData, setLoadingData] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Novo estado para controlar se há mais produtos

  const [params] = useSearchParams();
  const category = params.get("category");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  const { products, error } = useSelector((state) => state?.products);
  const { brands } = useSelector((state) => state?.brands);
  const brandsData = brands?.data?.slice(3, 9);

  // Função para buscar produtos
  const fetchProducts = async () => {
    if (!hasMore) return; // Não carregar mais produtos se não houver mais páginas

    setLoadingData(true);
    const brandString = selectedBrands.join(",");
    const productUrl = `${baseURL}/products?category=${category || ""}&brand=${
      brandString || ""
    }&color=${color || ""}&price=${price || ""}&page=${page}&limit=4`;

    try {
      const data = await fetch(productUrl);
      const res = await data.json();
      setProductsData((prevData) =>
        page === 1 ? res.data : [...prevData, ...res.data]
      );

      // Verificar se há próxima página
      setHasMore(!!res.pagination.next); // Se `next` for null ou undefined, `hasMore` será false
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

  // Reinicia a página ao mudar qualquer filtro de busca
  useEffect(() => {
    setPage(1);
    setProductsData([]); // Limpa a lista de produtos quando qualquer filtro muda
    setHasMore(true); // Redefine `hasMore` ao alterar os filtros
  }, [category, selectedBrands, color, price]);

  // Função de scroll infinito com debounce
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        // Incrementa a página ao atingir o final da página
        if (!loadingData && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 200); // Debounce de 200ms

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingData, hasMore]);

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
          <Products products={productsData} />
          {loadingData && <LoadingComponent />}
          {error && <ErrorMsg message={error?.message} />}
          {/* {!hasMore && <p>Não há mais produtos para carregar</p>} */}
          {/* Mensagem quando não há mais produtos */}
        </Grid>
      </Grid>
    </Container>
  );
}
