import axios from "axios";
import { type ProductType } from "../types/product";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/config-constant";
import { Button, FileInput, Grid, TextInput } from "@mantine/core";

const ProductAdd = (props: {
  productData?: ProductType;
  onSuccess: () => void;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductType>({
    mode: "all",
    defaultValues: props.productData,
  });

  const onSubmit: SubmitHandler<ProductType> = (data) => {
    axios
      .put<ProductType>(BACKEND_URL + "api/products/save", data)
      .then((response) => {
        if (response.status == 200) {
          window.alert("Product addded successfully");
          props.onSuccess();
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid>
        <Grid.Col span={4}>
          <TextInput
            label={"Product Name"}
            maxLength={100}
            {...register("productName", {
              required: "Product name is required",
            })}
            error={errors.productName?.message}
          />
          {}
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label={"Product Description"}
            maxLength={200}
            {...register("productDescription", {
              required: "Product description is required",
            })}
            error={errors.productDescription?.message}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Controller
            name="productImage"
            control={control}
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <FileInput
                label={"Product Image"}
                ref={ref}
                name={name}
                onBlur={onBlur}
                onChange={(payload) => {
                  const reader = new FileReader();
                  payload && reader.readAsDataURL(payload);
                  reader.onload = function () {
                    onChange(reader.result);
                  };
                }}
                error={errors.productImage?.message}
              />
            )}
            rules={{
              required: "Please select product image",
            }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="Stock"
            {...register("productStock", {
              required: "Product stock is required",
            })}
            error={errors.productStock?.message}
          />
        </Grid.Col>
        <Grid.Col span={4} mt={25} className="felx justify-end col-span-3">
          <Button type="submit">Submit</Button>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ProductAdd;
