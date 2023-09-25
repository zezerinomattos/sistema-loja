import React, {useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
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

import { apiCep } from '@/services/apiCep';
import { api } from '../../../services/apiClient';

export default function NewClient(){
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

    const [rg, setRg] = useState('');
    const [orgao_emissor, setOrgaoEmisor] = useState('');
    const [situacao, setSituacao] = useState(true);
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

    //FUNCAO PARA CRIAR CLIENTE
    async function hadleRegister(event: FormEvent){
        event.preventDefault();

        try {

            const data = new FormData();
            
            //Verificações
            if(!nome || !cpf || !nascimento || !sexo || !email || !cep || !logradouro || !numero || !bairro || !cidade || !uf || !pais || !situacao || !celular || !telefone || !nome_referencia1 || !telefone_referencia1 || !nome_referencia2 || !telefone_referencia2 || !nome_referencia3 || !telefone_referencia3 || !score || !profissao || !empresa || !renda_fixa || !imageAvatar){             
                setMessage('Preencha todos os campos!');
                return;
            }

            if(cpf.length !== 11){
                setMessage('Informe um CPF valido');
                return;
            }

            // Validação da idade mínima
            const nascimentoDate = new Date(nascimento);
            const idadeMinima = 18; // Idade mínima de 18 anos

            const hoje = new Date();
            const diffAnos = hoje.getFullYear() - nascimentoDate.getFullYear();

            if (diffAnos < idadeMinima) {
                setMessage('A idade mínima é de 18 anos');
                return;
            }

            setLoaging(true);

            data.append('nome', nome);
            data.append('cpf', cpf);
            data.append('nascimento', nascimento);
            data.append('sexo', sexo);
            data.append('email', email);
            data.append('file', imageAvatar);

            data.append('cep', cep);
            data.append('logradouro', logradouro);
            data.append('numero', numero);
            data.append('complemento', complemento);
            data.append('bairro', bairro);
            data.append('cidade', cidade);
            data.append('uf', uf);
            data.append('pais', pais);

            data.append('situacao', situacao.toString());
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

            await api.post('/cliente', data);

            toast.success('CLIENTE CADSTRADO COM SUCESSO!');

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

            setMessage('');


        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.erro);
            setLoaging(false);
            //toast.error('Ops, erro ao cadastrar, verifique e tente novamente!');
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

                <title>Sistema - new client</title>
            </Head>

            <div className={styles.container}>
                    <Header title={'NOVO CLIENTE'}/>

                    <main className={styles.containerBody}>
                        <Presentation />

                        <div className={styles.rigthContainer}>
                            <form className={styles.formCliente} onSubmit={hadleRegister}>
                                <Input placeholder='NOME COMPLETO' type='text' className={styles.inputName} onChange={(e) => setNome(e.target.value)} value={nome}/>

                                <div className={styles.inputsBasicData}>                               
                                    <div className={styles.inputNascimento}>
                                        <Input placeholder='NASCIMENTO' type='date' id='nascimento' onChange={(e) => setNascimento(e.target.value)} value={nascimento}/>
                                        <label htmlFor="nascimento">DATA NACIMENTO</label>
                                    </div>

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
                                    <Input placeholder='CPF' type='text' onChange={(e) => setCpf(e.target.value)} value={cpf}/>
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
                                    <Input placeholder='SITUAÇÃO' type='text' disabled />
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