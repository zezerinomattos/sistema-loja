import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { BsTrash } from "react-icons/bs";

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { setupAPIClient } from '../../../services/api';
import { api } from '../../../services/apiClient';


export type ProductSizeProps = {
    tamanho: string;
    estoque: number;
};

export type ProductColorProps = {
    cor: string;
    tamanhos_estoque: ProductSizeProps[];
};

export type SectionProps = {
    id: string;
    nome_secao: string;
}

export type CategoryProps = {
    id: string;
    nome_categoria: string;
}

type RepresentativeProps = {
    id: string;
    usuario: {
        nome: string;
    }
}

export type FactoryProps = {
    id: string;
    empresa: string;
}

export interface ListProps{
    section: SectionProps[];
    representetive: RepresentativeProps[];
    category: CategoryProps[];
    factory: FactoryProps[];
}

export default function NewProduct({ section, category, representetive }: ListProps){

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [nome_produto, setNomeProduto] = useState('');
    const [marca, setMarca] = useState('');
    const [material, setMaterial] = useState('');
    const [descricao, setDescricao] = useState('');
    const [custo, setCusto] = useState('');
    const [porcentagem_venda, setPorcentagemVenda] = useState('');
    const [preco_venda, setPrecoVenda] = useState('');
    const [margem_lucro, setMargemLucro] = useState('');
    const [lucro, setLucro] = useState('');
    const [desconto_atual, setDescontoAtual] = useState('');
    const [desconto_maximo, setDescontoMaximo] = useState('');
    const [representante_id, setRepresentanteId] = useState('');
    const [fabrica_id, setFabricaId] = useState('');
    const [secao_id, setSecaoId] = useState('');
    const [categoria_id, setCategoriaId] = useState('');

    const [cor_produto, setColorProduto] = useState<ProductColorProps[]>([]);

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<null | File>(null);

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

    //FUNCAO PARA CRIAR PRODUTO
    async function hadleRegister(event: FormEvent){
        event.preventDefault();

        try {

            const data = new FormData();

            if(!nome_produto || !secao_id || !categoria_id || !marca || !material || !descricao || !custo || !porcentagem_venda || !preco_venda || !margem_lucro || !desconto_atual || !desconto_maximo || !fabrica_id || !representante_id){
                setMessage('Preencha todos os campos!');
                return;
            }

            // Validando desconto maximo e atual
            const descAtual = parseInt(desconto_atual);
            const descMaximo = parseInt(desconto_maximo)

            if(descAtual > descMaximo){
                setMessage('O seu Desconto maximo é de ' + descMaximo +'%');
                return;
            }

            setLoaging(true);

            data.append('nome_produto', nome_produto);
            data.append('marca', marca);
            data.append('material', material);
            data.append('file', imageAvatar || '');
            data.append('descricao', descricao);
            data.append('custo', custo);
            data.append('porcentagem_venda', porcentagem_venda);
            data.append('preco_venda', preco_venda);
            data.append('margem_lucro', margem_lucro);
            data.append('desconto_atual', desconto_atual);
            data.append('desconto_maximo', desconto_maximo);
            data.append('representante_id', representante_id);
            data.append('fabrica_id', fabrica_id);
            data.append('secao_id', secao_id);
            data.append('categoria_id', categoria_id);
            data.append('cor_produto', JSON.stringify(cor_produto));

            await api.post('/produto', data);

            toast.success('PRODUTO CADSTRADO COM SUCESSO!');

            setNomeProduto('');
            setMarca('');
            setMaterial('');
            setAvatarUrl('');
            setImageAvatar(null);
            setDescricao('');
            setCusto('');
            setPorcentagemVenda('');
            setPrecoVenda('');
            setMargemLucro('');
            setDescontoAtual('');
            setDescontoMaximo('');
            setRepresentanteId('');
            setFabricaId('');
            setSecaoId('');
            setCategoriaId('');
            setColorProduto([]);

            setLoaging(false);
            

        } catch (error: any) {
            console.log(error.response.data.erro);
            toast.error(error.response.data.erro);
            setLoaging(false);
        }

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

    //---------------------------------------------------

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
            const responseMargemLucro = responseVenda - valorCusto
            const margLucro = ((responseMargemLucro / responseVenda) * 100).toFixed(2).replace('.', ',');

            // Lucro Previsto
            const responseLucro = responseVenda - valorCusto
            const lucro = responseLucro.toFixed(2).replace('.', ',');

            setPrecoVenda(valorVenda.toString());
            setMargemLucro(margLucro.toString());
            setLucro(lucro.toString())
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
        <>
            <Head>

                <title>Sistema - new product</title>
            </Head>

            <div className={styles.container}>
                <Header title={'NOVO PRODUTO'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
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
                                    <label>%</label>
                                    <Input placeholder='MARG. DE LUCRO' type='text' value={margem_lucro} disabled/>
                                </div>
                            </div>

                            <div className={styles.inputsBasicData}>

                                <div className={styles.inputLabel}>
                                    <label>R$</label>
                                    <Input placeholder='LUCRO PREVISTO' type='text' value={lucro} disabled/>
                                </div>

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
        </>
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

