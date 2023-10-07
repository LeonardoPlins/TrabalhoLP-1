import { Container } from "react-bootstrap";
import Pagina from "../templates/Pagina";
import FormCadProduto from "./formularios/FormCadProduto";
import TabelaProduto from "./tabelas/TabelaProdutos";
import { useState } from "react";
import TelaMensagem from "./TelaMensagem";

export default function TelaCadastroProduto(props) {
    const [exibirFormulario, setExibirFormulario] = useState(false);
    const [listaProduto, setListaProduto] = useState([]);
    const [mostrarMensagem, setMostrarMensagem] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    const [produtoParaEdicao, setProdutoParaEdicao] = useState({
        nome: '',
        categoria: '',
        preço: '',
        descrição: '',
    });
    const [modoEdicao, setModoEdicao] = useState(false);

    if (mostrarMensagem) {
        return (
            <TelaMensagem mensagem={mensagem} tipo={tipoMensagem} setMostrarMensagem={setMostrarMensagem}/>
        )
    } else {
        return (
            <Container>
                <Pagina>
                    {
                        exibirFormulario ? (
                            <FormCadProduto
                                exibirFormulario={setExibirFormulario}
                                listaProduto={listaProduto}
                                setListaProduto={setListaProduto}
                                produtoParaEdicao={produtoParaEdicao}
                                setProdutoParaEdicao={setProdutoParaEdicao}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                                setMostrarMensagem={setMostrarMensagem}
                                setMensagem={setMensagem}
                                setTipoMensagem={setTipoMensagem}
                            />
                        ) : (
                            <TabelaProduto
                                exibirFormulario={setExibirFormulario}
                                listaProduto={listaProduto}
                                setListaProduto={setListaProduto}
                                produtoParaEdicao={produtoParaEdicao}
                                setProdutoParaEdicao={setProdutoParaEdicao}
                                modoEdicao={modoEdicao}
                                setModoEdicao={setModoEdicao}
                            />
                        )
                    }
                </Pagina>
            </Container>
        );
    }
}