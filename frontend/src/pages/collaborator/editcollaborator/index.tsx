import React, { useState, useEffect, useContext, ChangeEvent, FormEvent} from 'react';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { FcSearch } from "react-icons/fc";
import { toast } from 'react-toastify';


// MY IMPORTS
import styles from './styles.module.scss';
import { Header } from '../../../components/Header';
import { Input, TextArea } from '@/components/Ui/Input';
import { Button } from '@/components/Ui/Button';

import logoEmpresa from '../../../../public/logo-Nanda.png';

import { AuthContext } from '../../../contexts/AuthContext';
import { canSSRAuth } from '../../../components/Utils/serverSideProps/canSSRAuth';
import { apiCep } from '@/services/apiCep';

export default function DetailCollaborator(){
    const { user } = useContext(AuthContext);
    const [carregando, setCarregando] = useState(true);
    const [loading, setLoaging] = useState(false);

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

    const [listId, setListId] = useState('');

    useEffect(() => {
        //Escondendo o loading quando ele montar completamente o componente
        setCarregando(false);
    }, [])

    if (carregando) {
        return <div className={styles.loadingContainer}><FaSpinner color='#FFF' size={46} className={styles.loading}/></div>;
    }

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


    return(
        <div className={styles.container}>
                <Header />

                <main className={styles.containerFavorit}>
                    <div className={styles.leftContainer}>
                        <div className={styles.logoEmpresa}>
                            <Image src={logoEmpresa} alt='Logo da empresa'  width={160} height={150}/>
                            <h5>ATENDIMENTO</h5>
                            <h3>09:00 AS 19:00</h3>
                        </div>

                        <div className={styles.dadosUser}>
                            {user.id && (
                                <div>
                                    <Image src={user.url + '/' + user.foto} alt='Logo da empresa' width={80} height={80} />
                                    <h3>{user.nome}</h3>
                                    <h5>{user.email}</h5>
                                    <h3>{user.cargo}</h3>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.rigthContainer}>
                        <div className={styles.filterContainer}>
                            <div className={styles.filter}>
                                <Input placeholder='CÓDIGO' value={listId} onChange={(e) => setListId(e.target.value)}/>
                            </div>

                            <div className={styles.filter}>
                                <button  className={styles.buttonBuscar}>BUSCAR <FcSearch size={28} style={{marginLeft: '10px'}} /></button>
                            </div>
                        </div>
                        
                        <form className={styles.formColaborador} >
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

                    </div>
                </main>
        </div>
    );
}