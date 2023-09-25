import React, { useState, useEffect, useContext, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { FiUpload } from 'react-icons/fi';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Image from 'next/image';

// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '@/components/Header';
import { Presentation } from '../../../components/Presentation';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import logoEmpresa from '../../../../public/logo-Nanda.png';

import { AuthContext } from '@/contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';

import { apiCep } from '@/services/apiCep';

export default function Register(){
    const { signUp, user } = useContext(AuthContext);

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

    const [situacao, setSituacao] = useState(true);
    const [celular, setCelular] = useState('');
    const [telefone, setTelefone] = useState('');
    const [rg, setRg] = useState('');
    const [orgao_emissor, setOrgaoEmisor] = useState('');
    const [carteira_trabalho, setCarteiraTrabalho] = useState('');
    const [serie, setSerie] = useState('');
    const [pis, setPis] = useState('');
    const [titulo_eleitor, setTituloEleitor] = useState('');
    const [zona_eleitoral, setZonaEleitoral] = useState('');
    const [secao_eleitoral, setSecaoEleitoral] = useState('');
    const [salario_base, setSalarioBase] = useState('');
    const [complemento_salario, setComplementoSalario] = useState('');

    const [senha, setSenha] = useState('');
    const [obs, setObs] = useState('');

    const [cargo, setCargo] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [imageAvatar, setImageAvatar] = useState<null | File>(null);

    const [carregando, setCarregando] = useState(true);

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

    //FUNCAO PARA CRIAR COLABORADOR
    async function hadleRegister(event: FormEvent){
        event.preventDefault();

        //console.log(user.cargo);

        try {
            const data = new FormData();

            //Verificações

            if(!nome || !cpf || !nascimento || !sexo || !email || !cep || !logradouro || !numero || !bairro || !cidade || !uf || !pais || !situacao || !celular || !telefone || !rg || !orgao_emissor || !carteira_trabalho ||!serie || !pais || !titulo_eleitor || !zona_eleitoral||!secao_eleitoral || !senha || !cargo || !imageAvatar){             
                setMessage('Preencha todos os campos!');
                return;
            }

            if(cpf.length !== 11){
                setMessage('Informe um CPF valido');
                return;
            }

            // Validação da idade mínima
            const nascimentoDate = new Date(nascimento);
            const idadeMinima = 14; // Idade mínima de 14 anos

            const hoje = new Date();
            const diffAnos = hoje.getFullYear() - nascimentoDate.getFullYear();

            if (diffAnos < idadeMinima) {
                setMessage('A idade mínima é de 14 anos');
                return;
            }

            //Validando senha segura
            if(senha.length < 8 || !/[a-zA-Z]/.test(senha) || !/[^a-zA-Z0-9]/.test(senha)){
                setMessage('A senha precisa ter pelo menos 8 caracteres, uma letra e um caractere especial');
                return;
            }

            setLoaging(true);

            //const nascimentoDate =  new Date(nascimento)  
            const salarioBase = parseFloat(salario_base.replace(',', '.'));
            const complementoSalario = parseInt(complemento_salario);
            
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
            data.append('cargo', cargo);
            data.append('celular', celular);
            data.append('telefone', telefone);
            data.append('rg', rg);
            data.append('orgao_emissor', orgao_emissor);
            data.append('carteira_trabalho', carteira_trabalho);
            data.append('serie', serie);
            data.append('pis', pis);
            data.append('titulo_eleitor', titulo_eleitor);
            data.append('zona_eleitoral', zona_eleitoral);
            data.append('secao_eleitoral', secao_eleitoral);
            data.append('salario_base', salario_base);
            data.append('complemento_salario', complemento_salario || '0');
            data.append('senha', senha);
            data.append('obs', obs);
            data.append('colaborador_id', user.id);
            data.append('colaborador_cargo', user.cargo);

            await signUp(data);

            setLoaging(false);

        } catch (error) {
            console.log(error);     
        }

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
        //setSituacao('');
        setCargo('');
        setCelular('');
        setTelefone('');
        setRg('');
        setOrgaoEmisor('');
        setCarteiraTrabalho('');
        setSerie('');
        setPis('');
        setTituloEleitor('');
        setZonaEleitoral('');
        setSecaoEleitoral('');
        setSalarioBase('');
        setComplementoSalario('');
        setSenha('');
        setObs('');
        setMessage('');

    }

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    return(
        <>  
            <Head>

                <title>Sistema - new collaborator</title>
            </Head>
            <div className={styles.container}>
                <Header title={'CADASTRO DE COLABORADOR'}/>

                {
                    carregando ? <FaSpinner color='#FFF' size={46} className={styles.loading}/>

                    :
                

                    <main className={styles.containerForm}>
                        <Presentation />

                        <div className={styles.rigthContainer}>
                            
                            <form className={styles.formColaborador} onSubmit={hadleRegister}>
                                <Input placeholder='NOME COMPLETO' type='text' className={styles.inputName} onChange={(e) => setNome(e.target.value)} value={nome}/>

                                <div className={styles.inputsBasicData}>                               
                                    <div className={styles.inputNascimento}>
                                        <Input placeholder='NASCIMENTO' type='date' id='nascimento' onChange={(e) => setNascimento(e.target.value)} value={nascimento}/>
                                        <label htmlFor="nascimento">DATA NACIMENTO</label>
                                    </div>
                                    {/* <Input placeholder='SEXO' type='text' onChange={(e) => setSexo(e.target.value)} value={sexo}/> */}
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

                                <div className={styles.inputsBasicData}>
                                    <Input placeholder='TITULO DE ELEITOR' type='text' onChange={(e) => setTituloEleitor(e.target.value)} value={titulo_eleitor}/>
                                    <Input placeholder='ZONA' type='text' onChange={(e) => setZonaEleitoral(e.target.value)} value={zona_eleitoral}/>
                                    <Input placeholder='SEÇAO' type='text' onChange={(e) => setSecaoEleitoral(e.target.value)} value={secao_eleitoral}/>
                                </div>

                                <div className={styles.inputsBasicData}>
                                    <Input placeholder='CARTEIRA DE TRABALHO' type='text' onChange={(e) => setCarteiraTrabalho(e.target.value)} value={carteira_trabalho}/>
                                    <Input placeholder='SERIE' type='text' onChange={(e) => setSerie(e.target.value)} value={serie}/>
                                    <Input placeholder='PIS' type='text' onChange={(e) => setPis(e.target.value)} value={pis}/>
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
                                    <Input placeholder='CELULAR' type='text' onChange={(e) => setCelular(e.target.value)} value={celular}/>
                                    <Input placeholder='TELEFONE' type='text' onChange={(e) => setTelefone(e.target.value)} value={telefone}/>
                                </div>
                                
                                <div className={styles.inputsBasicData}>
                                    <Input placeholder='SITUAÇÃO' type='text' disabled />
                                    <select 
                                        name="cargo" id="cargo" 
                                        className={styles.selectInput} 
                                        value={cargo} onChange={(e) => setCargo(e.target.value)}
                                    >
                                        <option value="" disabled>CARGO</option>
                                        <option value="GERENTE">GERENTE</option>
                                        <option value="VENDEDOR">VENDEDOR(A)</option>
                                        <option value="CAIXA">CAIXA</option>
                                    </select>
                                    <Input placeholder='SENHA' type='text' onChange={(e) => setSenha(e.target.value)} value={senha}/>
                                </div>

                                
                                <div className={styles.inputsBasicData}>
                                    <Input placeholder='SALARIO BASE' type='text' onChange={(e) => setSalarioBase(e.target.value)} value={salario_base}/>
                                    {
                                        cargo === 'CAIXA' ? 
                                            <Input placeholder='COMP - COMISSÃO' type='number' onChange={(e) => setComplementoSalario(e.target.value)} value={complemento_salario} disabled/>
                                        :   <Input placeholder='COMP - COMISSÃO' type='number' onChange={(e) => setComplementoSalario(e.target.value)} value={complemento_salario}/>
                                    }
                                    
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
                }
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