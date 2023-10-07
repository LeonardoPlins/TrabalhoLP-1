import { useState } from "react";
import { Button, Container, Form, Row, Col, FloatingLabel } from "react-bootstrap";

export default function FormCadCategorias(props) {
    const categoriaVazia = {
        nome: '',
        descrição: '',
        código: '',
        cor: '',
        tipo: '',
        origem: '',
    };

    const estadoInicialCategoria = props.categoriaParaEdicao;
    const [categoria, setCategoria] = useState(estadoInicialCategoria);
    const [formValido, setFormValido] = useState(false);

    function ManipularMudanças(e) {
        const componente = e.currentTarget;
        const valor = componente.type === "checkbox" ? componente.checked : componente.value;
        setCategoria({ ...categoria, [componente.name]: valor });
    }

    function ManipularSubmissao(e) {
        const form = e.currentTarget;
        if (form.checkValidity()) {
            if (!props.modoEdicao) {
                props.setListaCategorias([...props.listaCategorias, categoria]);
                props.setMensagem("Categoria cadastrada");
                props.setMostrarMensagem(true);
            } else {
                props.setListaCategorias([
                    ...props.listaCategorias.filter((itemCategoria) => itemCategoria.nome !== categoria.nome),
                    categoria,
                ]);
                props.setModoEdicao(false);
                props.setCategoriaParaEdicao(categoriaVazia);
            }
            setCategoria(categoriaVazia);
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
                            <FloatingLabel label="Nome da Categoria:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome da categoria"
                                    id="nome"
                                    name="nome"
                                    value={categoria.nome}
                                    onChange={ManipularMudanças}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o nome da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Descrição:" className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Descreva a categoria"
                                    id="descrição"
                                    name="descrição"
                                    value={categoria.descrição}
                                    onChange={ManipularMudanças}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe a descrição da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Código:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o código da categoria"
                                    id="código"
                                    name="código"
                                    value={categoria.código}
                                    onChange={ManipularMudanças}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">Informe o código da categoria!</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Cor:" className="mb-3">
                                <Form.Control
                                    type="color"
                                    id="cor"
                                    name="cor"
                                    value={categoria.cor}
                                    onChange={ManipularMudanças}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Tipo:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o tipo da categoria"
                                    id="tipo"
                                    name="tipo"
                                    value={categoria.tipo}
                                    onChange={ManipularMudanças}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel label="Origem:" className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Informe a origem da categoria"
                                    id="origem"
                                    name="origem"
                                    value={categoria.origem}
                                    onChange={ManipularMudanças}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} offset={5} className="d-flex justify-content-end">
                        <Button type="submit" variant={"primary"}> {props.modoEdicao ? "Alterar" : "Cadastrar"} </Button>
                    </Col>
                    <Col md={6} offset={5}>
                        <Button type="button" variant={"secondary"} onClick={() => {
                                props.exibirFormulario(false);
                            }}
                        >
                            Voltar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}