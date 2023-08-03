import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

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


export default function NewProduct(){

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
    const [desconto_atual, setDescontoAtual] = useState('');
    const [desconto_maximo, setDescontoMaximo] = useState('');
    const [representante_id, setRepresentanteId] = useState('');
    const [fabrica_id, setFabricaId] = useState('');
    const [secao_id, setSecaoId] = useState('');
    const [categoria_id, setCategoriaId] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<null | File>(null);

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

        alert('ok');

    }

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

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);   
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

    return(
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
                                    {/* {representative.map((rep) => (
                                        <option key={rep.id} value={rep.id}>{rep.usuario.nome}</option>
                                    ))} */}
                                </select>

                                <select 
                                    name="categoria" 
                                    id="categoria"
                                    onChange={(e) => setCategoriaId(e.target.value)}
                                    value={categoria_id}
                                    className={styles.selectInput}
                                >
                                    <option value="" disabled>CATEGORIA</option>
                                    {/* {representative.map((rep) => (
                                        <option key={rep.id} value={rep.id}>{rep.usuario.nome}</option>
                                    ))} */}
                                </select>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='MARCA' type='text' onChange={(e) => setMarca(e.target.value)} value={marca}/>
                                <Input placeholder='MATERIAL' type='text' onChange={(e) => setMaterial(e.target.value)} value={marca} style={{width: '350px'}}/>
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
                                    {/* {representative.map((rep) => (
                                        <option key={rep.id} value={rep.id}>{rep.usuario.nome}</option>
                                    ))} */}
                                </select>

                                <select 
                                    name="fabrica" 
                                    id="fabrica"
                                    onChange={(e) => setFabricaId(e.target.value)}
                                    value={fabrica_id}
                                    className={styles.selectInput}
                                >
                                    <option value="" disabled>FABRICA</option>
                                    {/* {representative.map((rep) => (
                                        <option key={rep.id} value={rep.id}>{rep.usuario.nome}</option>
                                    ))} */}
                                </select>
                            </div>

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

export const getServerSideProps = canSSRAuth(async(ctx) => {

    return{
        props: {}
    }
});

