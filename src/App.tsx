import "./App.css";
import ProductList from "./components/ProductList";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
function App() {
  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  return (
    <MantineProvider theme={theme}>
      <ProductList />
    </MantineProvider>
  );
}

export default App;
