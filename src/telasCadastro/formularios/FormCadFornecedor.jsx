import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";
export default function FormCadFornecedor(props){
    const fornecedorVazio = {
        cpf: '',
        nome:'',
        endereco:'',
        cidade:'',
        produto:'',
        quantidade:'',
        frequencia:''
    }

    const estadoInicialFornecedor = props.fornecedorParaEdicao;
    const [fornecedor, SetFornecedor] = useState(estadoInicialFornecedor);
    const [formValido, setFormValido] = useState(false);

    function ManipularMudanças(e){
        const componente = e.currentTarget;
        SetFornecedor({...fornecedor,[componente.name]:componente.value});
    }

    function ManipularSubmissao(e){
        const form = e.currentTarget;
        if(form.checkValidity()){
            if(!props.modoEdicao)
            {
                props.setListaFornecedor([...props.listaFornecedor, fornecedor]);
                props.setMensagem("Fornecedor cadastrado");
                props.setMostrarMensagem(true);
            }
            else{
                props.setListaFornecedor([...props.listaFornecedor.filter((itemFornedor)=>itemFornedor.cpf!==fornecedor.cpf),fornecedor]);
                props.setModoEdicao(false);
                props.setFornecedorParaEdicao(fornecedorVazio);
            }
            SetFornecedor(fornecedorVazio);
            setFormValido(false);
        }
        else
        {
            setFormValido(true);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    return(
        <Container>
            <Form noValidate validated={formValido} onSubmit={ManipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="CPF:"
                                className="mb-3"
                            >

                                <Form.Control 
                                    type="text" 
                                    placeholder="000.000.000-00" 
                                    id="cpf" 
                                    name="cpf" 
                                    value={fornecedor.cpf}
                                    onChange={ManipularMudanças}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o cpf!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Nome Completo:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Informe o nome completo" 
                                    id="nome" 
                                    name="nome" 
                                    value={fornecedor.nome}
                                    onChange={ManipularMudanças}
                                    required />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nome!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={10}>
                        <Form.Group>
                            <FloatingLabel
                                label="Endereço:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Avenida/Rua/Alameda/Viela ..." 
                                    id="endereco" 
                                    name="endereco" 
                                    onChange={ManipularMudanças}
                                    value={fornecedor.endereco}
                                    required
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o endereço!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Produto:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="NomeDoProduto" 
                                    id="produto" 
                                    name="produto" 
                                    onChange={ManipularMudanças}
                                    value={fornecedor.produto}
                                    required
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o Produto</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={5}>
                        <Form.Group>
                            <FloatingLabel
                                label="Cidade"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="text" 
                                    placeholder="Cidade" 
                                    id="cidade" 
                                    name="cidade" 
                                    onChange={ManipularMudanças}
                                    value={fornecedor.cidade}
                                    required
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a cidade!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Quantidade:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="number" 
                                    placeholder="0" 
                                    id="quantidade" 
                                    name="quantidade"
                                    onChange={ManipularMudanças}
                                    value={fornecedor.quantidade}
                                    required
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a quantidade</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group>
                            <FloatingLabel
                                label="Frequencia:"
                                className="mb-3"
                            >
                                <Form.Control 
                                    type="number" 
                                    placeholder="1%...100%" 
                                    id="frequencia" 
                                    name="frequencia"
                                    onChange={ManipularMudanças}
                                    value={fornecedor.frequencia}
                                    required
                                    />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a frequencia</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar":"Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                                props.exibirFormulario(false)
                            }
                        }>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}