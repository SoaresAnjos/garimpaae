import { Link } from "react-router-dom";
import HomeCategories from "./HomeCategories";
import HomeProductTrending from "./HomeProductTrending";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";
import baseURL from "../../utils/baseURL";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import FeaturedProductHome from "./FeaturedProduct";

const offers = [
  {
    name: "Produtos exclusivos",
    description: "nas marcas mais fortes",
    href: "/products-filters",
  },
  {
    name: "Entrega para todo o Brasil",
    description: "com até 20 dias para retorno",
    href: "/products-filters",
  },
  {
    name: "Primeira vez com a gente?",
    description: "15% OFF na primeira compra",
    href: "/products-filters",
  },
];

const perks = [
  {
    name: "Free returns",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    name: "Same day delivery",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
  },
  {
    name: "All year discount",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg",
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
  {
    name: "For the planet",
    imageUrl:
      "https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg",
    description:
      "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];
export default function Example() {
  let [productsList, setprodutcts] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
  }, [dispatch]);

  const { products, error, loading } = useSelector((state) => state?.products);

  useEffect(() => {
    if (products !== null) {
      setprodutcts(products);
    }
  }, [products]);

  if (error) {
    console.log(error);
  }

  return (
    <div className="bg-white">
      {/* <FeaturedProductHome /> */}
      <main>
        {/* Hero */}
        <div className="flex flex-col border-b border-gray-200 lg:border-0">
          <nav aria-label="Offers" className="order-last lg:order-first">
            <div className="mx-auto max-w-7xl lg:px-8">
              <ul className="grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 lg:divide-y-0 lg:divide-x">
                {offers.map((offer) => (
                  <li key={offer.name} className="flex flex-col">
                    <a
                      href={offer.href}
                      className="relative flex flex-1 flex-col justify-center bg-white py-6 px-4 text-center focus:z-10"
                    >
                      <p className="text-sm text-gray-500">{offer.name}</p>
                      <p className="font-semibold text-gray-900">
                        {offer.description}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {loading === null ? (
            <LoadingComponent />
          ) : (
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute hidden h-full w-1/2 bg-gray-100 lg:block"
              />
              <div className="relative bg-gray-100 lg:bg-transparent flex flex-col-reverse lg:flex-col">
                <div className="relative bg-gray-100 lg:bg-transparent lg:order-first">
                  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:px-8">
                    <div className="mx-auto max-w-2xl py-24 lg:max-w-none lg:py-64">
                      <div className="lg:pr-16">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl">
                          Nike Dunk Low 6
                        </h1>
                        <p className="mt-4 text-xl text-gray-600">
                          Uma nova forma de de fechar seu look com o mais novo
                          da Nike
                        </p>
                        <div className="mt-6">
                          <a
                            href="www.google.com"
                            className="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 font-medium text-white hover:bg-indigo-700"
                          >
                            Comprar agora
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-64 w-full sm:h-94 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-1/2">
                  <img
                    src={
                      productsList && productsList?.data
                        ? productsList?.data[0]?.images[0]
                        : null
                    }
                    alt={
                      productsList && productsList?.data
                        ? productsList?.data[0]?.name
                        : null
                    }
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden">
          {/* Sale */}
          <section
            aria-labelledby="sale-heading"
            className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
          >
            <div className="mx-auto max-w-2xl lg:max-w-none">
              <h2
                id="sale-heading"
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
              >
                Get 25% off during our one-time sale
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
                Most of our products are limited releases that won't come back.
                Get your favorite items while they're in stock.
              </p>
              <a
                href="/"
                className="mt-6 inline-block w-full rounded-md border border-transparent bg-gray-900 py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto"
              >
                Get access to our one-time sale
              </a>
            </div>
          </section>
        </div>
      </main>
      <main>
        {/* Category section */}
        <section
          aria-labelledby="category-heading"
          className="pt-24 sm:pt-32 xl:mx-auto xl:max-w-7xl xl:px-8"
        >
          <div className="px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 xl:px-0">
            <h2
              id="category-heading"
              className="text-2xl font-bold tracking-tight text-gray-900"
            >
              Shop by Category
            </h2>
            <Link
              to="/all-categories"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all categories
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
          {/* home categories */}
          <HomeCategories />
        </section>
        {/* Home trending trending */}
        <HomeProductTrending />

        {/* info */}
        <section
          aria-labelledby="perks-heading"
          className="border-t border-gray-200 bg-gray-50"
        >
          <h2 id="perks-heading" className="sr-only">
            Our perks
          </h2>

          <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="md:flex-shrink-0">
                    <div className="flow-root">
                      <img
                        className="-my-1 mx-auto h-24 w-auto"
                        src={perk.imageUrl}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                    <h3 className="text-base font-medium text-gray-900">
                      {perk.name}
                    </h3>
                    <p className="mt-3 text-sm text-gray-500">
                      {perk.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
