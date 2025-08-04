import { Outlet, useLocation } from "react-router-dom";
import Header from "./ui/header";
import TabBar from "./ui/TabBar";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { searchRequisition } from "../service/search/searchBar";

const Layout = () => {
  const location = useLocation();
  const esconderTabBar = ["/login", "/"].includes(location.pathname);

  const [resultados, setResultados] = useState({
    usuarios: [],
    salas: [],
    reservas: [],
  });
  const [erro, setErro] = useState(null);
  const buscarNaAPI = useCallback(async (texto) => {
    if (typeof texto !== "string" || !texto.trim()) {
      setResultados({ usuarios: [], salas: [], reservas: [] });
      return;
    }
    try {
      const data = await searchRequisition(texto);
      console.log("Resultado da API:", data);
      setResultados({
        usuarios: data.usuarios || [],
        salas: data.salas || [],
        reservas: data.reservas || [],
      });
      console.log("Novo estado resultados:", resultados);
      setErro(null);
    } catch (error) {
      setErro("Erro na requisição");
      setResultados({ usuarios: [], salas: [], reservas: [] });
    }
  }, []);

  const handleSearch = useCallback(debounce(buscarNaAPI, 300), [buscarNaAPI]);

  return (
    <>
      <Header onSearch={handleSearch} resultados={resultados} erro={erro} />

      <main style={{ paddingBottom: esconderTabBar ? 0 : "4rem" }}>
        <Outlet />
      </main>

      {!esconderTabBar && <TabBar />}
    </>
  );
};

export default Layout;
