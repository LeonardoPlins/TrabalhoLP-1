import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";

export default function FormCadProduto(props) {
    const produtoVazio = {
        nome: '',
        categoria: '',
        preço: '',
        descrição: '',
    };

    const estadoInicialProduto = props.produtoParaEdicao;
    const [produto, setProduto] = useState(estadoInicialProduto);
    const [formValido, setFormValido] = useState(false);

    function ManipularMudanças(e) {
        const componente = e.currentTarget;
        setProduto({ ...produto, [componente.name]: componente.value });
    }

    function ManipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                props.setListaProduto([...props.listaProduto, produto]);
                props.setMensagem("Produto cadastrado");
                props.setMostrarMensagem(true);
            } else {
                props.setListaProduto([
                    ...props.listaProduto.filter((itemProduto) => itemProduto.nome !== produto.nome),
                    produto
                ]);
                props.setModoEdicao(false);
                props.setProdutoParaEdicao(produtoVazio);
            }
            setProduto(produtoVazio);
            setFormValido(false);
        } else {
            setFormValido(true);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    return (
        <Container>
            <Form noValidate validated={formValido} onSubmit={ManipularSubmissao}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Nome do Produto:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome do produto"
                                    id="nome"
                                    name="nome"
                                    value={produto.nome}
                                    onChange={ManipularMudanças}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nome do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Categoria:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a categoria"
                                    id="categoria"
                                    name="categoria"
                                    value={produto.categoria}
                                    onChange={ManipularMudanças}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Preço:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="number"
                                    placeholder="Informe o preço"
                                    id="preço"
                                    name="preço"
                                    value={produto.preço}
                                    onChange={ManipularMudanças}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o preço!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Descrição:"
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    placeholder="Descreva o produto"
                                    id="descrição"
                                    name="descrição"
                                    value={produto.descrição}
                                    onChange={ManipularMudanças}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição do produto!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}>{props.modoEdicao ? "Alterar" : "Cadastrar"}</Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                            props.exibirFormulario(false);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}