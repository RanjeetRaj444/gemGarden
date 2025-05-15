import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Button, Heading, Input, Select, useToast } from "@chakra-ui/react";

import { GiCardExchange } from "react-icons/gi";
import { SiMaterialdesign } from "react-icons/si";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { RiExchangeCnyFill } from "react-icons/ri";
import { BiArchiveOut } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";

import { getSingleProducts } from "../Redux/Products/action";

const SingleProductPage = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [cart, setCart] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const product = useSelector((store) => store.productReducer.singlePageData);

  // Fetch product on mount
  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [dispatch, id]);

  // Load cart from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("gem_garden_cart")) || [];
    setCart(cartData);
  }, []);

  // Add product to cart
  const addToCart = () => {
    if (isDuplicateInCart()) {
      toast({
        title: "Can't add",
        description: "Item already in cart",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("gem_garden_cart", JSON.stringify(updatedCart));
      toast({
        title: "Congratulations 🥳",
        description: "Product added to cart",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  // Check for duplicate in cart
  const isDuplicateInCart = () => {
    return cart.some((item) => item.id === product.id);
  };

  const productImages = [product.src1, product.src2, product.src3];
  const activeImage = selectedImage || product.src1;

  return (
    <Wrapper>
      <div style={{ display: "flex", padding: "1rem 1rem" }}>
        <Link to="/product">
          <Button colorScheme="yellow">{"< Back to Products"}</Button>
        </Link>
      </div>
      <div className="product-container">
        {/* Left Section - Images */}
        <div className="image-section">
          <div className="main-image">
            <img src={activeImage} alt="Product" />
          </div>
          <div className="thumbnail-images">
            {productImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`thumbnail-${i}`}
                onClick={() => setSelectedImage(src)}
              />
            ))}
          </div>
          <div className="features">
            <Feature icon={<SiMaterialdesign />} label="Best Designs" />
            <Feature
              icon={<AiFillSafetyCertificate />}
              label="Certified Diamonds"
            />
            <Feature icon={<BiArchiveOut />} label="BIS Hallmark" />
            <Feature icon={<FaShippingFast />} label="Insured Shipping" />
            <Feature icon={<RiExchangeCnyFill />} label="Lifetime Exchange" />
            <Feature icon={<GiCardExchange />} label="Easy Exchange" />
          </div>
        </div>

        {/* Right Section - Details */}
        <div className="details-section">
          <Heading>{product.name}</Heading>
          <p className="sub-info">
            By PC Jeweller | Product Code: OOOLR00055DD-FSY4F12
          </p>
          <p className="sub-info">(1 Reviews)</p>
          <p className="category">Category: {product.material}</p>
          <Heading fontSize="1.2rem">
            M.R.P: ₹{product.currentprice}.00{" "}
            <span className="striked-price">₹{product.orignalprice}.00</span>
          </Heading>
          <p className="sub-info">(Inclusive of all taxes)</p>

          <div className="size-select">
            <strong>Size:</strong>
            <Select w="120px" placeholder="Select Size">
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
            </Select>
          </div>

          <div className="action-buttons">
            <Button colorScheme="yellow" onClick={addToCart}>
              Add to Cart
            </Button>
            <Link to={"/payment"}>
              <Button colorScheme="yellow">Buy Now</Button>
            </Link>
          </div>

          <div className="delivery-info">
            <div>
              <p className="delivery-title">Expected Shipping Date</p>
              <p className="sub-info">15/05/2023</p>
            </div>
            <div className="pincode-check">
              <p>Delivery Option</p>
              <div className="pincode-input">
                <Input placeholder="Enter pincode" />
                <Button colorScheme="cyan">Check</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

// Reusable Feature Icon component
const Feature = ({ icon, label }) => (
  <div className="feature">
    {icon}
    <p>{label}</p>
  </div>
);

// Styled components
const Wrapper = styled.div`
  padding: 2rem;

  .product-container {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
  }

  .image-section {
    flex: 1;
    min-width: 300px;
  }

  .main-image img {
    width: 100%;
    border: 2px solid #ccc;
    border-radius: 0.5rem;
  }

  .thumbnail-images {
    display: flex;
    gap: 10px;
    margin: 1rem 0;
    cursor: pointer;
  }

  .thumbnail-images img {
    width: 60px;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
  }

  .features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1rem;
    text-align: center;
  }

  .feature {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #c7a108;
    font-size: 0.8rem;
  }

  .details-section {
    flex: 1;
    min-width: 300px;
    text-align: left;
  }

  .sub-info {
    font-size: 0.8rem;
    color: grey;
    margin: 0.25rem 0;
  }

  .category {
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  .striked-price {
    color: red;
    text-decoration: line-through;
    font-weight: normal;
    margin-left: 0.5rem;
  }

  .size-select {
    margin: 1rem 0;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .action-buttons {
    margin: 1rem 0;
    display: flex;
    gap: 1rem;
  }

  .delivery-info {
    margin-top: 2rem;
  }

  .delivery-title {
    font-size: 1.2rem;
    color: #3d3d3b;
  }

  .pincode-input {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

export default SingleProductPage;
