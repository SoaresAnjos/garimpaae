import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCartQtyAction,
  getCartItemsAction,
  removeItemCartAction,
} from "../../redux/slices/cart/cartSlice";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Trash2 } from "lucide-react";

export default function ShoppingCart() {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);

  const { cartItems } = useSelector((state) => state?.cart);
  console.log(cartItems);

  //add to cart handler
  const changeOrderItemQtyHandler = (productId, qty) => {
    dispatch(changeCartQtyAction({ productId, qty }));
    dispatch(getCartItemsAction());
  };

  //add to cart handler
  const removeOrderItemFromLocalStorageHandler = (productId) => {
    dispatch(removeItemCartAction(productId));
    dispatch(getCartItemsAction());
  };

  //calculate total price
  const sumTotalPrice = cartItems?.reduce((acc, curr) => {
    return acc + curr?.totalPrice;
  }, 0);

  let data = [
    {
      title: "Subtotal",
      value: 300,
    },
    {
      title: "Frete",
      value: "free",
    },
    {
      title: "Taxa",
      value: 20,
    },
  ];

  return (
    <>
      <Container sx={{ marginY: 10 }}>
        <Grid container sx={{ gap: 4 }}>
          {/* Produtos */}
          <Grid item xs={12} sm={12} md={7} lg={7} sx={{ backgroundColor: "" }}>
            <Box
              sx={{
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
                paddingY: 1,
              }}
            >
              <Typography variant="h5">Seu carrinho</Typography>
            </Box>
            {cartItems?.map((item, index) => (
              <Box
                key={index}
                sx={{
                  marginY: 3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <img src={item?.image} alt="" height={150} width={150} />
                </Box>
                <Box>
                  <Typography variant="h6">{item?.name}</Typography>
                  <Typography variant="body1">{item?.color}</Typography>
                  <Typography variant="body1">{item?.size}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">R$ {sumTotalPrice}</Typography>
                </Box>
                <Box>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={(e) => {
                        changeOrderItemQtyHandler(item?._id, quantity);
                      }}
                      disabled={quantity <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      value={quantity}
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                      type="number"
                      inputProps={{ min: 1 }}
                      sx={{ width: "60px", textAlign: "center", mx: 1 }}
                    />
                    <IconButton
                      onClick={() => {
                        setQuantity(quantity + 1);
                        changeOrderItemQtyHandler(item?._id, quantity);
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
                <Box>
                  <Trash2
                    strokeWidth={1}
                    onClick={() =>
                      removeOrderItemFromLocalStorageHandler(item?._id)
                    }
                    color={"#71747E"}
                  />
                </Box>
              </Box>
            ))}
          </Grid>

          {/* Resumo */}
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            sx={{
              backgroundColor: "",
              borderRadius: 1,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 4,
            }}
          >
            <Box sx={{ marginBottom: 6 }}>
              <Typography variant="h4">Resumo</Typography>
            </Box>
            <Box sx={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)" }}>
              {data.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginY: 3,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#71747E", fontWeight: "bold" }}
                  >
                    {item?.title}
                  </Typography>
                  <Typography variant="h6">
                    R$ {item.title === "Subtotal" ? sumTotalPrice : item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginY: 3,
              }}
            >
              <Typography variant="body1" sx={{ color: "#71747E" }}>
                Total
              </Typography>
              <Typography variant="h6">
                R$ {sumTotalPrice + data[2].value}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                href="/order-payment"
                variant="primary"
                component={Link}
                sx={{ width: "100%", marginY: 2 }}
              >
                Checkout
              </Button>
              <Link to={"/"} style={{ textDecorationLine: "underline" }}>
                Continuar comprando
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
