import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/config-constant";
import { ProductType } from "../types/product";
import {
  ActionIcon,
  Button,
  Card,
  Container,
  Grid,
  Modal,
} from "@mantine/core";
import ProductAdd from "./ProductAdd";
import { IconEdit, IconPlus } from "@tabler/icons-react";

const ProductList = () => {
  const [productList, setProductList] = useState<Array<ProductType>>();
  const [modalState, setModalState] = useState<{
    opened: boolean;
    product?: ProductType;
  }>({ opened: false });

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = () => {
    axios
      .get<Array<ProductType>>(BACKEND_URL + "api/products/get-all")
      .then((response) => {
        setProductList(response.data);
      });
  };

  const deleteProduct = (id: number) => {
    axios
      .get<ProductType>(BACKEND_URL + `api/products/delete/${id}`)
      .then((response) => {
        if (response.status == 200) {
          window.alert(response.data);
          fetchProductList();
        }
      });
  };

  return (
    <Container size="xl">
      <Grid mt={30}>
        <Grid.Col span={8} />
        <Grid.Col span={4} style={{ display: "flex", justifyContent: "right" }}>
          <Button
            onClick={() => {
              setModalState({
                opened: true,
              });
            }}
          >
            <IconPlus />
            Add Product
          </Button>
        </Grid.Col>
      </Grid>
      <Modal
        title="Add Product"
        opened={modalState.opened}
        onClose={() => {
          setModalState({ opened: false });
        }}
        size="lg"
      >
        <ProductAdd
          onSuccess={() => {
            setModalState({ opened: false });
            fetchProductList();
          }}
          productData={modalState.product}
        />
      </Modal>
      <Grid mt={30}>
        {productList?.map((item) => (
          <Grid.Col span={4}>
            <Card
              key={item.productId}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
            >
              <Card.Section p={20}>
                <Grid>
                  <Grid.Col span={12}>
                    <img src={item.productImage} className="max-h-40" />
                  </Grid.Col>
                  <Grid.Col span={12} style={{ display: "flex" }}>
                    <span>Product Name : {item.productName}</span>
                    <ActionIcon
                      style={{ marginLeft: "15px" }}
                      onClick={() => {
                        setModalState({ opened: true, product: item });
                      }}
                    >
                      <IconEdit />
                    </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span={12} style={{ display: "flex" }}>
                    <span>Product Description:{item.productDescription}</span>
                  </Grid.Col>
                  <Grid.Col span={12} style={{ display: "flex" }}>
                    <span>Product Stock:{item.productStock}</span>
                  </Grid.Col>
                  <Button
                    onClick={() => {
                      deleteProduct(item.productId);
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              </Card.Section>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductList;
