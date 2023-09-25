import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { FcSearch } from "react-icons/fc";
import { useRouter } from 'next/router';

//MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { apiCep } from '@/services/apiCep';
import { api } from '../../../services/apiClient';

export default function EditClient(){
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [clienteId, setClienterId] = useState('');
    const [nome, setNome] = useState('');
    // const [cpf, setCpf] = useState('');
    // const [nascimento, setNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [email, setEmail] = useState('');

    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [pais, setPais] = useState('');

    const [rg, setRg] = useState('');
    const [orgao_emissor, setOrgaoEmisor] = useState('');
    //const [situacao, setSituacao] = useState(true);
    const [celular, setCelular] = useState('');
    const [telefone, setTelefone] = useState('');
    const [nome_referencia1, setNomeReferencia1] = useState('');
    const [telefone_referencia1, setTelefoneReferencia1] = useState('');
    const [nome_referencia2, setNomeReferencia2] = useState('');
    const [telefone_referencia2, setTelefoneReferencia2] = useState('');
    const [nome_referencia3, setNomeReferencia3] = useState('');
    const [telefone_referencia3, setTelefoneReferencia3] = useState('');
    const [score, setScore] = useState('');
    const [limite_credito, setLimiteCredito] = useState('');   
    const [profissao, setProfissao] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [renda_fixa, setRendaFixa] = useState('');
    const [complemento_renda, setComplementoRenda] = useState('');
    const [obs, setObs] = useState('');
    const [situacao, setSituacao] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<null | File>(null);
    const url = 'http://localhost:3333/files/';

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

    //Funcao para buscar endereço via cep usando uma API externa
    async function handleCep(event: any){
        if (event.keyCode === 13) { // Verifica o código da tecla "Enter"
            
            if(cep === ''){
                toast.error('Digite um cep Valido');
                setCep('');
                return;
            }

            await apiCep.get(`/${cep}/json/`)
                .then(response => {
                    setLogradouro(response.data.logradouro);
                    setBairro(response.data.bairro);
                    setCidade(response.data.localidade);
                    setUf(response.data.uf);

                })
                .catch(error => {
                    console.log(error);
                })
        }
        
    }

    //FUNCAO PARA BUSCAR O COLABORADOR
    async function handleFilter(){
        if(!clienteId){
            setMessage('Iforme o código do colaborador!');
            return;
        }

        setLoaging(true);

        await api.get('/cliente/detail', {
            params: {
                cliente_id: clienteId,
            }
        })
        .then(response => {
            setNome(response.data[0]?.nome);
            setSexo(response.data[0]?.sexo);
            setEmail(response.data[0]?.email);
            setRg(response.data[0]?.cliente[0]?.rg);
            setOrgaoEmisor(response.data[0]?.cliente[0]?.orgao_emissor);
            setCep(response.data[0]?.endereco?.cep);
            setLogradouro(response.data[0]?.endereco?.logradouro);
            setNumero(response.data[0]?.endereco?.numero);
            setComplemento(response.data[0]?.endereco?.complemento);
            setBairro(response.data[0]?.endereco?.bairro);
            setCidade(response.data[0]?.endereco?.cidade);
            setUf(response.data[0]?.endereco?.uf);
            setPais(response.data[0]?.endereco?.pais);
            setProfissao(response.data[0]?.cliente[0]?.profissao);
            setEmpresa(response.data[0]?.cliente[0]?.empresa);
            setRendaFixa(response.data[0]?.cliente[0]?.renda_fixa);
            setComplementoRenda(response.data[0]?.cliente[0]?.complemento_renda);
            setScore(response.data[0]?.cliente[0]?.score);
            setLimiteCredito(response.data[0]?.cliente[0]?.limite_credito);

            setNomeReferencia1(response.data[0]?.cliente[0]?.nome_referencia1);
            setNomeReferencia2(response.data[0]?.cliente[0]?.nome_referencia2);
            setNomeReferencia3(response.data[0]?.cliente[0]?.nome_referencia3);
            setTelefoneReferencia1(response.data[0]?.cliente[0]?.telefone_referencia1);
            setTelefoneReferencia2(response.data[0]?.cliente[0]?.telefone_referencia2);
            setTelefoneReferencia3(response.data[0]?.cliente[0]?.telefone_referencia3);
            setSituacao(response.data[0]?.cliente[0]?.situacao);

            setCelular(response.data[0]?.cliente[0]?.celular);
            setTelefone(response.data[0]?.cliente[0]?.telefone);
            setAvatarUrl(url + '/' + response.data[0]?.foto);
            setObs(response.data[0]?.cliente[0]?.obs);

            setLoaging(false);
            
        })
        .catch(error => {
            console.log(error);
            toast.error('ID do cliente inválido');

            //LIMPANDO OS CAMPOS DO FORM
            setClienterId('');
            setNome('');
            setSexo('');
            setEmail('');
            setAvatarUrl('');
            setImageAvatar(null);
            setCep('');
            setLogradouro('');
            setNumero('');
            setComplemento('');
            setBairro('');
            setCidade('');
            setUf('');
            setPais('');
            setCelular('');
            setTelefone('');
            setRg('');
            setOrgaoEmisor('');
            setObs('');
            setMessage('');
            setProfissao('');
            setEmpresa('');
            setRendaFixa('');
            setComplementoRenda('');
            setScore('');
            setNomeReferencia1('');
            setTelefoneReferencia1('');
            setNomeReferencia2('');
            setTelefoneReferencia2('');
            setNomeReferencia3('');
            setTelefoneReferencia3('');
            setLimiteCredito('');
            setClienterId('');

            setLoaging(false);
        })
    }

    //FUNCAO PARA EDITAR COLABORADOR
    async function hadleEdit(event: FormEvent){
        event.preventDefault();

        try {
            const data = new FormData();

            //Verificações
            if(!clienteId ){
                setMessage('Iforme o código do cliente!');
                return;
            }

            //Verificações
            if(!nome || !sexo || !email || !cep || !logradouro || !numero || !bairro || !cidade || !uf || !pais || !situacao || !celular || !telefone || !nome_referencia1 || !telefone_referencia1 || !nome_referencia2 || !telefone_referencia2 || !nome_referencia3 || !telefone_referencia3 || !score || !profissao || !empresa || !renda_fixa){             
                setMessage('Preencha todos os campos!');
                return;
            }

            setLoaging(true);

            data.append('nome', nome);
            data.append('sexo', sexo);
            data.append('email', email);
            data.append('file', imageAvatar || '');

            data.append('cep', cep);
            data.append('logradouro', logradouro);
            data.append('numero', numero);
            data.append('complemento', complemento);
            data.append('bairro', bairro);
            data.append('cidade', cidade);
            data.append('uf', uf);
            data.append('pais', pais);

            data.append('celular', celular);
            data.append('telefone', telefone);
            data.append('rg', rg);
            data.append('orgao_emissor', orgao_emissor);
            data.append('obs', obs);
            data.append('profissao', profissao);
            data.append('empresa', empresa);
            data.append('renda_fixa', renda_fixa);
            data.append('complemento_renda', complemento_renda);
            data.append('nome_referencia1', nome_referencia1);
            data.append('nome_referencia2', nome_referencia2);
            data.append('nome_referencia3', nome_referencia3);
            data.append('telefone_referencia1', telefone_referencia1);
            data.append('telefone_referencia2', telefone_referencia2);
            data.append('telefone_referencia3', telefone_referencia3);
            data.append('score', score);
            data.append('limite_credito', limite_credito);

            data.append('cliente_id', clienteId);

            await api.put('/cliente/edit', data);

            toast.success('CLIENTE EDITADO COM SUCESSO!');

            setLoaging(false);

            //LIMPANDO OS CAMPOS DO FORM
            setNome('');
            setSexo('');
            setEmail('');
            setAvatarUrl('');
            setImageAvatar(null);
            setCep('');
            setLogradouro('');
            setNumero('');
            setComplemento('');
            setBairro('');
            setCidade('');
            setUf('');
            setPais('');
            setCelular('');
            setTelefone('');
            setRg('');
            setOrgaoEmisor('');
            setObs('');
            setProfissao('');
            setEmpresa('');
            setRendaFixa('');
            setComplementoRenda('');
            setNomeReferencia1('');
            setTelefoneReferencia1('');
            setNomeReferencia2('');
            setTelefoneReferencia2('');
            setNomeReferencia3('');
            setTelefoneReferencia3('');
            setScore('');
            setLimiteCredito('');
            setClienterId('');

            setMessage('');

        } catch (error) {
            console.log(error);
            setMessage('Ops, algo deu errado, atualize a pagina e tente novamente!');
            setLoaging(false);
        }
    }
    
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

                <title>Sistema - edit client</title>
            </Head>
            <div className={styles.container}>
                <Header title={'EDITAR CLIENTE'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={clienteId} onChange={(e) => setClienterId(e.target.value)} style={{width:'350px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={handleFilter} className={styles.buttonBuscar}>{loading ? <FaSpinner /> : 'BUSCAR'} <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <form className={styles.formCliente} >
                            <Input placeholder='NOME COMPLETO' type='text' className={styles.inputName} onChange={(e) => setNome(e.target.value)} value={nome}/>

                            <div className={styles.inputsBasicData}>                               
                                <select 
                                    name="sexo" id="sexo" 
                                    className={styles.selectInput} 
                                    value={sexo} onChange={(e) => setSexo(e.target.value)}
                                >
                                    <option value="" disabled>SEXO</option>
                                    <option value="MASCULINO">MASCULINO</option>
                                    <option value="FEMININO">FEMININO</option>
                                    <option value="OUTRO">OUTRO</option>
                                </select>

                                <Input style={{width: '320px'}} placeholder='EMAIL' type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='RG' type='text' onChange={(e) => setRg(e.target.value)} value={rg}/>
                                <Input placeholder='ORGÃO EMISSOR' type='text' onChange={(e) => setOrgaoEmisor(e.target.value)} value={orgao_emissor}/>
                            </div>

                            <Input placeholder='CEP' type='text' onChange={(e) => setCep(e.target.value)} value={cep} onKeyDown={handleCep}/>

                            <div className={styles.inputsBasicData}>
                                
                                <Input placeholder='LOGRADOURO' type='text' style={{width: '60%'}} onChange={(e) => setLogradouro(e.target.value)} value={logradouro}/>
                                <Input placeholder='NÚMERO' type='text' onChange={(e) => setNumero(e.target.value)} value={numero}/>
                                <Input placeholder='COMPLEMENTO' type='text'onChange={(e) => setComplemento(e.target.value)} value={complemento}/>
                                <Input placeholder='BAIRRO' type='text' onChange={(e) => setBairro(e.target.value)} value={bairro}/>
                                <Input placeholder='CIDADE' type='text' onChange={(e) => setCidade(e.target.value)} value={cidade}/>
                                <Input placeholder='UF' type='text' style={{width: '10%'}} onChange={(e) => setUf(e.target.value)} value={uf}/>
                                <Input placeholder='PAIS' type='text' onChange={(e) => setPais(e.target.value)} value={pais}/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='PROFISSÃO' type='text' onChange={(e) => setProfissao(e.target.value)} value={profissao}/>
                                <Input placeholder='EMPRESA' type='text' onChange={(e) => setEmpresa(e.target.value)} value={empresa}/>
                                <Input placeholder='RENDA FIXA' type='text' onChange={(e) => setRendaFixa(e.target.value)} value={renda_fixa}/>
                                <Input placeholder='RENDA COMPLEMENTAR' type='text' onChange={(e) => setComplementoRenda(e.target.value)} value={complemento_renda}/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='CELULAR' type='text' onChange={(e) => setCelular(e.target.value)} value={celular}/>
                                <Input placeholder='TELEFONE' type='text' onChange={(e) => setTelefone(e.target.value)} value={telefone}/>
                            </div>

                            <h3>REFERÊNCIAS</h3>
                            <div className={styles.inputsBasicData}>
                                <Input placeholder='REFERÊNCIA 01' type='text' onChange={(e) => setNomeReferencia1(e.target.value)} value={nome_referencia1}/>
                                <Input placeholder='TELEFONE' type='text' onChange={(e) => setTelefoneReferencia1(e.target.value)} value={telefone_referencia1}/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='REFERÊNCIA 02' type='text' onChange={(e) => setNomeReferencia2(e.target.value)} value={nome_referencia2}/>
                                <Input placeholder='TELEFONE' type='text' onChange={(e) => setTelefoneReferencia2(e.target.value)} value={telefone_referencia2}/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='REFERÊNCIA 03' type='text' onChange={(e) => setNomeReferencia3(e.target.value)} value={nome_referencia3}/>
                                <Input placeholder='TELEFONE' type='text' onChange={(e) => setTelefoneReferencia3(e.target.value)} value={telefone_referencia3}/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='SITUAÇÃO' type='text' disabled  value={situacao ? 'ATIVO' : 'INATIVO'}/>
                                <Input placeholder='SCORE' type='text'  value={score} onChange={(e) => setScore(e.target.value)}/>
                                <Input placeholder='LIMITE DE CREDITO' type='text'  value={limite_credito} onChange={(e) => setLimiteCredito(e.target.value)}/>
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

                            <TextArea placeholder='OBS' onChange={(e) => setObs(e.target.value)} value={obs}/>

                            <div className={styles.buttonForm}>
                                <Button onClick={hadleEdit} type='submit' loading={loading} style={{width: '100%', height: '40px'}} >CADASTRAR</Button>
                            </div>
                        </form>

                        {message && <span>{message}</span>}
                        
                    </div>
                </main>
            </div>
        </>
    );
}

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
      props: {}
    }
});