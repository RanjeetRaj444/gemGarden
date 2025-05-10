import {
  Box,
  Flex,
  Image,
  Text,
  Heading,
  Stack,
  Divider,
  SimpleGrid,
  useBreakpointValue,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const user = {
  name: "John Doe",
  email: "johndoe@example.com",
  address: "123 Main St, Cityville, USA",
  image:
    "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
};

const purchasedProducts = [
  {
    id: 1,
    name: "Laptop",
    price: "$999",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Headphones",
    price: "$199",
    image: "https://via.placeholder.com/100",
  },
];

const cartProducts = [
  {
    id: 3,
    name: "Smartphone",
    price: "$499",
    image: "https://via.placeholder.com/100",
  },
  {
    id: 4,
    name: "Keyboard",
    price: "$59",
    image: "https://via.placeholder.com/100",
  },
];

const Profile = () => {
  const [cartItem, setCartItem] = useState([]);
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => {
    let cartdata = JSON.parse(localStorage.getItem("gem_garden_cart")) || [];
    setCartItem(cartdata);
  }, []);
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      minH="100vh"
      p={{ base: 4, md: 8 }}
      gap={8}
      bg="gray.50"
    >
      <Box
        flex={{ base: "none", md: "1" }}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        p={6}
        textAlign="center"
      >
        <Image
          borderRadius="full"
          boxSize="120px"
          src={user.image}
          alt={user.name}
          mx="auto"
        />
        <Heading size="md" mt={4}>
          {user.name}
        </Heading>
        <Text color="gray.600">{user.email}</Text>
        <Text color="gray.600">{user.address}</Text>
      </Box>
      <Box flex="2" bg="white" borderRadius="lg" boxShadow="md" p={6}>
        <Heading size="md" mb={4}>
          Purchased Products
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mb={6}>
          {purchasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </SimpleGrid>

        <Divider my={4} />

        <Heading size="md" mb={4}>
          {cartItem.length == 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <Text> "You don't have data in your cart 😔"</Text>
              <Link to={"/product"}>
                <Button colorScheme="yellow">Checkout Products</Button>
              </Link>
            </div>
          ) : (
            "Products in Cart"
          )}
        </Heading>
        <SimpleGrid
          style={{ alignItems: "center" }}
          columns={{ base: 1, sm: 2 }}
          spacing={4}
        >
          {cartItem.length == 0 ? (
            <div></div>
          ) : (
            cartItem.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </SimpleGrid>
      </Box>
    </Flex>
  );
};

const ProductCard = ({ product }) => (
  <Box borderWidth="1px" borderRadius="md" p={4} boxShadow="sm">
    <Image src={product.image} alt={product.name} mb={3} borderRadius="md" />
    <Text fontWeight="semibold">{product.name}</Text>
    <Text color="gray.600">{product.price}</Text>
  </Box>
);

export default Profile;
