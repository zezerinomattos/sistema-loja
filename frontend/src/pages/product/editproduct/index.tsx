import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';
import { ProductColorProps, FactoryProps, ProductSizeProps, ListProps } from '../newproduct';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { apiCep } from '@/services/apiCep';
import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';

export default function EditProduct({ section, category, representetive }: ListProps){
    const { user } = useContext(AuthContext);

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [produto_id, setProdutoId] = useState('');
    const [nome_produto, setNomeProduto] = useState('');
    const [marca, setMarca] = useState('');
    const [material, setMaterial] = useState('');
    const [descricao, setDescricao] = useState('');
    const [custo, setCusto] = useState('');
    const [porcentagem_venda, setPorcentagemVenda] = useState('');
    const [preco_venda, setPrecoVenda] = useState('');
    const [margem_lucro, setMargemLucro] = useState('');
    const [desconto_atual, setDescontoAtual] = useState('');
    const [desconto_maximo, setDescontoMaximo] = useState('');
    const [representante_id, setRepresentanteId] = useState('');
    const [fabrica_id, setFabricaId] = useState('');
    const [secao_id, setSecaoId] = useState('');
    const [categoria_id, setCategoriaId] = useState('');

    const [cor_produto, setColorProduto] = useState<ProductColorProps[]>([]);

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<null | File>(null);
    const url = 'http://localhost:3333/files/';

    const [factory, setFactory] = useState<FactoryProps[]>([]);

    // Funcao para salvarmos imagem
    function handleFile(e: ChangeEvent<HTMLInputElement>){
        if(!e.target.files){
            return;
        }

        const image = e.target.files[0];
        if(!image){
            return;
        }

        if(image.type === 'image/png' || image.type === 'image/jpeg'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    //FUNCAO PARA BUSCAR O PRODUTO
    async function handleFilter(){
        if(!produto_id){
            setMessage('Iforme o código do colaborador!');
            return;
        }

        setLoaging(true);

        await api.get('/produto/detail', {
            params: {
                produto_id: produto_id,
            }
        })
        .then(response => {
            setNomeProduto(response.data?.produto?.nome_produto);
            setSecaoId(response.data?.produto?.secao);
            setCategoriaId(response.data?.produto?.categoria_id);
            setMarca(response.data?.produto?.marca);
            setMaterial(response.data?.produto?.material);
            setDescricao(response.data?.produto?.descricao);
            setCusto(response.data?.produto?.custo.toString());
            setPorcentagemVenda(response.data.produto.porcentagem_venda.toString());
            setPrecoVenda(response.data.produto.preco_venda.toString());
            setMargemLucro(response.data.produto.margem_lucro.toString());
            setDescontoAtual(response.data.produto.desconto_atual.toString());
            setDescontoMaximo(response.data.produto.desconto_maximo.toString());
            setRepresentanteId(response.data?.produto?.representante_id);
            setFabricaId(response.data?.produto?.fabrica_id);

            setAvatarUrl(url + '/' + response.data?.produto?.foto);

            setLoaging(false);
        })
        .catch(error => {
            console.log(error);
            toast.error('ID do cliente inválido');
            setLoaging(false);
        })
    }

    //FUNCAO PARA EDITAR PRODUTO
    async function hadleRegister(event: FormEvent){
        event.preventDefault();

        alert('teste')
    }

    //FUNCAO QUE ATUALIZA E INCREMENTA COR E TAMANHO
    const handleAddColor = () => {
        setColorProduto([...cor_produto, { cor: '', tamanhos_estoque: [] }]);
    };
      
    const handleColorChange = (
        index: number,
        field: string,
        value: string | ProductSizeProps[]
        ) => {
        const updatedColorsData = [...cor_produto];
        updatedColorsData[index] = {
            ...updatedColorsData[index],
            [field]: value,
        };
        setColorProduto(updatedColorsData);
    };
      
    const handleAddTamanhoEstoque = (index: number) => {
        const updatedColorsData = [...cor_produto];
        updatedColorsData[index].tamanhos_estoque.push({ tamanho: '', estoque: 0 });
        setColorProduto(updatedColorsData);
    };
      
    const handleTamanhoEstoqueChange = (
        colorIndex: number,
        tamanhoEstoqueIndex: number,
        field: string,
        value: string | number
        ) => {
        const updatedColorsData = [...cor_produto];
        updatedColorsData[colorIndex].tamanhos_estoque[tamanhoEstoqueIndex] = {
            ...updatedColorsData[colorIndex].tamanhos_estoque[tamanhoEstoqueIndex],
            [field]: value,
        };
        setColorProduto(updatedColorsData);
    };

    //--------------------------------------------------
    //FUNCAO PARA REMOVER TAMANHO E COR
    const handleRemoveColor = (index: number) => {
        const updatedColorsData = [...cor_produto];
        updatedColorsData.splice(index, 1);
        setColorProduto(updatedColorsData);
    };

    const handleRemoveTamanhoEstoque = (colorIndex: number, tamanhoEstoqueIndex: number) => {
        const updatedColorsData = [...cor_produto];
        updatedColorsData[colorIndex].tamanhos_estoque.splice(tamanhoEstoqueIndex, 1);
        setColorProduto(updatedColorsData);
    };


    //ATUALIZA OS CAMPOS A MEDIDA QUE PREENCHE
    useEffect(() => {
        function handleVenda(){
            // Verificação se tem valor de custo
            if(!custo){
                setPrecoVenda('');
                setMargemLucro('');
                return
            }

            let valorCusto = parseFloat(custo.replace(',', '.'));
            let porcentagemVenda = parseInt(porcentagem_venda);

            if(!porcentagemVenda){
                porcentagemVenda = 0;               
            }

            // Preco de venda
            const responseVenda = valorCusto * (1 + porcentagemVenda / 100);
            const valorVenda = responseVenda.toFixed(2).replace('.', ',');

            // Margem de lucro
            const responseLucro = responseVenda - valorCusto
            const margLucro = responseLucro.toFixed(2).replace('.', ',');

            setPrecoVenda(valorVenda.toString());
            setMargemLucro(margLucro.toString());
        }

        handleVenda();

    }, [custo, porcentagem_venda]);

    //ATUALIZA O SELECT DE FABRICA VIA REPRESENTANTE
    useEffect(() => {
        async function getFactory(){
            await api.get('/representante/fabrica', {
                params:{
                    representante_id: representante_id,
                }
            })
            .then(response => {
                setFactory(response.data);
            })
        }

        getFactory();


    }, [representante_id])

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
        <div className={styles.container}>
                <Header title={'EDITAR PRODUTO'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={produto_id} onChange={(e) => setProdutoId(e.target.value)} style={{width:'350px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={handleFilter} className={styles.buttonBuscar}>{loading ? <FaSpinner /> : 'BUSCAR'} <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <form className={styles.formProduct} onSubmit={hadleRegister}>
                            <Input placeholder='NOME PRODUTO' type='text' className={styles.inputName} onChange={(e) => setNomeProduto(e.target.value)} value={nome_produto}/>

                            <div className={styles.inputsBasicData}>
                                <select 
                                    name="secao" 
                                    id="secao"
                                    onChange={(e) => setSecaoId(e.target.value)}
                                    value={secao_id}
                                    className={styles.selectInput}
                                >
                                    <option value="" disabled>SEÇÃO</option>
                                    {section.map((sec) => (
                                        <option key={sec.id} value={sec.id}>{sec.nome_secao}</option>
                                    ))}
                                </select>

                                <select 
                                    name="categoria" 
                                    id="categoria"
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                    value={categoria_id}
                                    className={styles.selectInput}
                                >
                                    <option value="" disabled>CATEGORIA</option>
                                    {category.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.nome_categoria}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='MARCA' type='text' onChange={(e) => setMarca(e.target.value)} value={marca}/>
                                <Input placeholder='MATERIAL' type='text' onChange={(e) => setMaterial(e.target.value)} value={material} style={{width: '350px'}}/>
                            </div>

                            <TextArea placeholder='DESCRIÇÃO' onChange={(e) => setDescricao(e.target.value)} value={descricao}/>

                            <div className={styles.inputsBasicData}>
                                <div className={styles.inputLabel}>
                                    <label>R$</label>
                                    <Input placeholder='CUSTO' type='text' onChange={(e) => setCusto(e.target.value)} value={custo}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label>%</label>
                                    <Input placeholder='VENDA' type='text' onChange={(e) => setPorcentagemVenda(e.target.value)} value={porcentagem_venda} style={{width: '80px'}}/>
                                </div>
                                
                                <div className={styles.inputLabel}>
                                    <label>R$</label>
                                    <Input placeholder='PREÇO VENDA' type='text' value={preco_venda} disabled/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label>R$</label>
                                    <Input placeholder='LUCRO' type='text' value={margem_lucro} disabled/>
                                </div>
                            </div>

                            <div className={styles.inputsBasicData}>

                                <div className={styles.inputLabel}>
                                    <label>DESC. %</label>
                                    <Input placeholder='ATUAL' type='text' onChange={(e) => setDescontoAtual(e.target.value)} value={desconto_atual} style={{width: '80px'}}/>
                                </div>

                                <div className={styles.inputLabel}>
                                    <label>% DESC.</label>
                                    <Input placeholder='MAXIMO' type='text' onChange={(e) => setDescontoMaximo(e.target.value)} value={desconto_maximo} style={{width: '90px'}}/>
                                </div>  

                            </div>

                            <div className={styles.inputsBasicData}>
                                <select 
                                    name="representante" 
                                    id="representante"
                                    onChange={(e) => setRepresentanteId(e.target.value)}
                                    value={representante_id}
                                    className={styles.selectInput}
                                >
                                    <option value="" disabled>REPRESENTANTE</option>
                                    {representetive.map((rep) => (
                                        <option key={rep.id} value={rep.id}>{rep.usuario.nome}</option>
                                    ))}
                                </select>

                                <select 
                                    name="fabrica" 
                                    id="fabrica"
                                    onChange={(e) => setFabricaId(e.target.value)}
                                    value={fabrica_id}
                                    className={styles.selectInput}
                                >
                                    <option value="" disabled>FABRICA</option>
                                    {factory.map((fac) => (
                                        <option key={fac.id} value={fac.id}>{fac.empresa}</option>
                                    ))}
                                </select>
                            </div>
                            
                            {/* ADICIONAR COR TAMANHO E ESTOQUE */}
                            <div className={styles.colorContainer}>
                                {cor_produto.map((color, index) => (
                                    <div key={index}>
                                        <Input
                                        placeholder='COR'
                                        type='text'
                                        value={color.cor}
                                        onChange={(e) => handleColorChange(index, 'cor', e.target.value)}
                                        />

                                        {color.tamanhos_estoque.map((tamanho_estoque, subIndex) => (
                                        <div key={subIndex}>
                                            <Input
                                            placeholder='EX: P, M, G, GG, EXG'
                                            type='text'
                                            value={tamanho_estoque.tamanho}
                                            onChange={(e) => handleTamanhoEstoqueChange(index, subIndex, 'tamanho', e.target.value)}
                                            />

                                            <Input
                                            placeholder='ESTOQUE'
                                            type='number'
                                            value={tamanho_estoque.estoque}
                                            onChange={(e) => handleTamanhoEstoqueChange(index, subIndex, 'estoque', e.target.value)}
                                            />

                                            <BsTrash 
                                                size={24} 
                                                style={{color: '#FF3F4B', cursor: 'pointer'}}
                                                onClick={() => handleRemoveTamanhoEstoque(index, subIndex)}
                                            />  
                                        </div>
                                        ))}

                                        <div className={styles.butonColorContainer}>

                                            <Button loading={loading} type='button' onClick={() => handleAddTamanhoEstoque(index)} ><strong>+</strong>TAMANHO E ESTOQUE</Button>

                                            {/* <Button onClick={() => handleRemoveColor(index)} style={{marginLeft: '20px'}}>Remover Cor</Button> */}
                                            <BsTrash 
                                                size={28} 
                                                style={{
                                                    color: '#FF3F4B', 
                                                    cursor: 'pointer',
                                                    marginLeft: '15px',
                                                    
                                                }}
                                                onClick={() => handleRemoveColor(index)}
                                            />  
                                        </div>
                                    </div>
                                ))}
                                <Button type='button' loading={loading} onClick={handleAddColor}>ADICIONAR COR</Button>
                            </div>

                            <label className={styles.labelAvatar}>
                                <span>
                                    <FiUpload size={25} color='#fff' />
                                </span>
                                <input type="file" accept='image/png, image/jpeg' onChange={handleFile}/>
                                {
                                    avatarUrl && 
                                        <img 
                                            className={styles.previw} 
                                            src={avatarUrl} 
                                            alt="Imagem colaborador" 
                                            width={'100%'}
                                            height={'200px'}
                                        />
                                }
                            </label>

                            <div className={styles.buttonForm}>
                                <Button type='submit' loading={loading} style={{width: '100%', height: '40px'}} >CADASTRAR</Button>
                            </div>

                        </form>

                        {message && <span>{message}</span>}
                        
                    </div>
                </main>
        </div>
    );
}

//CARREGANDO SECAO, CATEGORIA, REPRESENTANTE E FABRICA PELO LADO DO SERVIDOR
export const getServerSideProps = canSSRAuth(async(ctx) => {

    //@ts-ignore
    const apiSection = setupAPIClient(ctx);
    
    const section = await apiSection.get('secao');
    const category = await apiSection.get('categoria');
    const representetive = await apiSection.get('representante');
      
    return{
        props:{
            section: section.data,
            category: category.data,
            representetive: representetive.data,
        }
    }
});