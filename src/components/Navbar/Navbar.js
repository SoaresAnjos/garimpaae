import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { logoutUserAction } from "../../redux/slices/users/usersSlice";
import { Container, Grid } from "@mui/material";
import { ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const {
    categories: { data },
  } = useSelector((state) => state?.categories);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //take the current pathname
  const location = useLocation();
  const { pathname } = location;

  //get user from localStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isLoggedIn = user?.token ? true : false;
  const adminRoute = pathname.includes("admin");

  //get cart items from local storage
  const cartItemsFromLocalStorage = JSON.parse(
    localStorage.getItem("cartItems")
  );

  let logoutHandler = () => {
    dispatch(logoutUserAction());
    window.location.href = "/login";
  };

  function lowercaseFirstLetter(text) {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Adiciona o estado para controlar a cor de hover
  const [hovered, setHovered] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    !adminRoute && (
      <header>
        <nav aria-label="Top">
          {/* New Desktop Navigation */}

          {/* Top navigation  desktop*/}
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                backgroundColor: "secondary.dark",
              }}
            >
              <Container
                sx={{
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  paddingY: "0.5rem",
                }}
              >
                <p>Frete grátis a partir de R$ 500</p>
              </Container>
            </Grid>
          </Grid>

          {/* Navbar*/}
          <Grid
            className="navbar"
            container
            spacing={2}
            sx={{
              height: "5rem",
              backgroundColor: "secondary.light",
            }}
          >
            <Grid item xs={12}>
              <Container
                fixed
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "1rem",
                }}
              >
                {/* Logo (lg+) */}
                <div className="logo">
                  <Link to="/">
                    <span
                      style={{
                        textTransform: "upperCase",
                        fontWeight: 800,
                      }}
                    >
                      Garimpa Aê
                    </span>
                  </Link>
                </div>
                {/* NavItems */}
                <div style={{ display: "flex", gap: "2rem" }}>
                  {data?.length <= 0 ? (
                    <>
                      <div>Erro ao carregar categorias</div>
                    </>
                  ) : (
                    data?.map((category, index) => {
                      return (
                        <>
                          <Link
                            key={category?._id}
                            to={`/products-filters?category=${category?.name}`}
                            style={{
                              color: hovered === index ? "#000" : "#71747E",
                              transition: "color 0.3s",
                            }}
                            onMouseOver={() => setHovered(index)}
                            onMouseOut={() => setHovered(null)}
                          >
                            {lowercaseFirstLetter(category?.name)}
                          </Link>
                        </>
                      );
                    })
                  )}
                </div>
                {/* Icons */}
                <div style={{ display: "flex", gap: "2rem" }}>
                  <div
                    onMouseOver={() => setHoveredIcon("cart")}
                    onMouseOut={() => setHoveredIcon(null)}
                  >
                    <Link to="/shopping-cart">
                      <ShoppingCart
                        color={hoveredIcon === "cart" ? "#000" : "#71747E"}
                        strokeWidth={1}
                      />
                    </Link>
                  </div>
                  <div
                    onMouseOver={() => setHoveredIcon("user")}
                    onMouseOut={() => setHoveredIcon(null)}
                  >
                    <Link to="/customer-profile">
                      <User
                        color={hoveredIcon === "user" ? "#000" : "#71747E"}
                        strokeWidth={1}
                      />
                    </Link>
                  </div>
                </div>
              </Container>
            </Grid>
          </Grid>
        </nav>
      </header>
    )
  );
}
