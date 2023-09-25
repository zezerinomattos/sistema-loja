import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { FcSearch } from "react-icons/fc";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { apiCep } from '@/services/apiCep';
import { api } from '../../../services/apiClient'

export default function EditRepresentative(){
    const { user } = useContext(AuthContext);

    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);
    const [message, setMessage] = useState('');

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [nascimento, setNascimento] = useState('');
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

    const [empresa, setEmpresa] = useState('');
    const [celular, setCelular] = useState('');
    const [telefone, setTelefone] = useState('');
    const [obs, setObs] = useState('');

    const [representante_id, setRepresentanteId] = useState('');

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

    //FUNCAO PARA BUSCAR O REPRESENTANTE
    async function handleFilter(){
        if(!representante_id){
            setMessage('Iforme o código do representante!');
            return;
        }

        setLoaging(true);

        await api.get('/representante/detail', {
            params: {
                representante_id: representante_id,
            }
        })
        .then(response => {
            setNome(response.data[0]?.nome);
            setSexo(response.data[0]?.sexo);
            setEmail(response.data[0]?.email);
            setCep(response.data[0]?.endereco?.cep);
            setLogradouro(response.data[0]?.endereco?.logradouro);
            setNumero(response.data[0]?.endereco?.numero);
            setComplemento(response.data[0]?.endereco?.complemento);
            setBairro(response.data[0]?.endereco?.bairro);
            setCidade(response.data[0]?.endereco?.cidade);
            setUf(response.data[0]?.endereco?.uf);
            setPais(response.data[0]?.endereco?.pais);
            setEmpresa(response.data[0]?.representante[0]?.empresa);
            setCelular(response.data[0]?.representante[0]?.celular);
            setTelefone(response.data[0]?.representante[0]?.telefone);
            setAvatarUrl(url + '/' + response.data[0]?.foto);
            setObs(response.data[0]?.representante[0]?.obs);

            setLoaging(false);
            
        })
        .catch(error => {
            console.log(error);
            toast.error('ID do cliente inválido');

            //LIMPANDO OS CAMPOS DO FORM
            setRepresentanteId('');
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
            setEmpresa('');
            setObs('');
            setMessage('');

            setLoaging(false);
        })
    }

    //FUNCAO PARA EDITAR REPRESENTANTE
    async function hadleEdit(event: FormEvent){
        event.preventDefault();

        try {
            const data = new FormData();

            //Verificações
            if(!nome || !sexo || !email || !cep || !logradouro || !numero || !bairro || !cidade || !uf || !pais || !celular || !telefone || !empresa ){             
                setMessage('Preencha todos os campos!');
                return;
            }

            setLoaging(true);

            data.append('representante_id', representante_id);
            data.append('nome', nome);
            data.append('cpf', cpf);
            data.append('nascimento', nascimento);
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

            data.append('empresa', empresa);
            data.append('telefone', telefone);
            data.append('celular', celular);
            data.append('obs', obs);

            await api.put('/representante/edit', data);

            toast.success('REPRESENTANTE EDITADO COM SUCESSO!');

            setLoaging(false);

            //LIMPANDO OS CAMPOS DO FORM
            setNome('');
            setCpf('');
            setNascimento('');
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
            setEmpresa('');
            setObs('');

            setMessage('');

        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.erro);
            setLoaging(false);
            setMessage('');
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

                <title>Sistema - edit representative</title>
            </Head>

            <div className={styles.container}>
                <Header title={'EDITAR REPRESENTANTE'}/>

                <main className={styles.containerBody}>
                    <Presentation />

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={representante_id} onChange={(e) => setRepresentanteId(e.target.value)} style={{width:'350px'}}/>
                            </div>

                            <div className={styles.filter}>
                                <button onClick={handleFilter} className={styles.buttonBuscar}>{loading ? <FaSpinner /> : 'BUSCAR'} <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>

                        <form className={styles.formCliente} onSubmit={hadleEdit}>
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

                                <Input placeholder='EMAIL' type='email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                            </div>

                            <div className={styles.inputsBasicData}>
                                <Input placeholder='EMPRESA' type='text' onChange={(e) => setEmpresa(e.target.value)} value={empresa}/>
                                <Input placeholder='CELULAR' type='text' onChange={(e) => setCelular(e.target.value)} value={celular}/>
                                <Input placeholder='TELEFONE' type='text' onChange={(e) => setTelefone(e.target.value)} value={telefone}/>
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

// Verificando pelo lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
      props: {}
    }
});