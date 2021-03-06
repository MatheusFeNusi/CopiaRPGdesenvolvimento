import React, { useEffect, useState } from 'react';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import Mestre from './Imagens/mestre.png';
import Perso1 from './Imagens/personagem.jpg';
import Perso2 from './Imagens/personagem1.jpg';
import Perso3 from './Imagens/personagem4.jpg';
import Perso4 from './Imagens/personagem3.jpg';
import TeladeFundo from './Imagens/teladeFundo.svg';
import FichaMestre from './Imagens/fichaMestre.svg';
import Dados from './Imagens/dadoInteracao.svg';

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Image from 'react-bootstrap/Image';
import { InputTextarea } from 'primereact/inputtextarea';
import InputClass from './ComponentPrime/Input.js';
import { InputText } from 'primereact/inputtext';


import DropdownClass from './ComponentPrime/Dropdown';
import DialogMensagem from './ComponentPrime/DialogMensagem.js';
import ProgressBar2 from './ComponentPrime/ProgressBar2.js';
import { Growl } from 'primereact/growl';
import { Dialog } from 'primereact/dialog';
import { Link } from 'react-router-dom';
import socketIOClient from 'socket.io-client';
import io from 'socket.io-client';
import uuid from 'uuid/v4';

export default class Interacao extends React.Component {
    
    constructor() {
        super();
        this.state = {
            value: 'Dicas ou regras para o jogo',
            value2: 'Chat',
            informationRecieved: 'Você clicou no botão',
            serverURL: 'http://localhost:4000',

            mago: {
                id: 1,
                forca: '',
                habilidade: '',
                resistencia: '',
                armadura: '',
                pdf: ''
            },
            arque: {
                id: 2,
                forca: '',
                habilidade: '',
                resistencia: '',
                armadura: '',
                pdf: ''
            },
            vampi: {
                id: 3,
                forca: '',
                habilidade: '',
                resistencia: '',
                armadura: '',
                pdf: ''
            },
            anao: {
                id: 4,
                forca: '',
                habilidade: '',
                resistencia: '',
                armadura: '',
                pdf: ''
            }

        };
        this.showSticky = this.showSticky.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onHide = this.onHide.bind(this);
        const socket = socketIOClient(this.state.serverURL)
        socket.on('infoEvent', (receivedInfo) => {
            mago:{
                id: 1
                forca: receivedInfo
            }
        })

    }
    

    showSticky(e) {
        this.growl.show({ severity: 'info', summary: 'Valor do dado', detail: 'Número do dado: ' + e, sticky: true });
    }
    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    onClick() {
        this.setState({ visible: true });
    }
    onHide() {
        this.setState({ visible: false });
    }
    
    handleInputChange(e) {
        const socket = socketIOClient(this.state.serverURL);
        socket.emit('infoEvent', 
            this.setState({mago:{id:1,forca: e }})
        )
    }


    render() {

       
        const ters = {};

        const mestreImagem = <Image src={Mestre} />;
        const personagem1 = <Image src={Perso1} />;
        const personagem2 = <Image src={Perso2} />;
        const personagem3 = <Image src={Perso3} />;
        const personagem4 = <Image src={Perso4} />;
        const dado = <Image src={Dados} style={{ width: '110px' }} />

        const geraNumeroAleatorio = () => {
            let numero_aleatorio;
            do {
                numero_aleatorio = Math.random();
                numero_aleatorio = Math.floor(numero_aleatorio * 10);
            } while (numero_aleatorio > 6 || numero_aleatorio <= 0);
            this.showSticky(numero_aleatorio);

        }
        const footer = (
            <div>
                <Link to="/"> <Button label="Yes" icon="pi pi-check" onClick={this.onHide} /></Link>

                <Button label="No" icon="pi pi-times" onClick={this.onHide} className="p-button-secondary" />
            </div>
        );

        return (

            <div className="container" style={{ backgroundImage: `url(${TeladeFundo})` }}>

                <Row md={12} style={{ backgroundImage: `url(${FichaMestre})` }}>
                    <div className="content-section implementation"  >
                        <Dialog header="Sair da sala" visible={this.state.visible} style={{ width: '50vw' }} footer={footer} onHide={this.onHide} maximizable>
                            <p>Voce tem certeza que deseja sair da sala de Interação?</p>
                        </Dialog>

                        <Button icon="pi pi-fw pi-power-off" tooltip="Sair da sala" style={{ height: '142px', left: '1201px', backgroundColor: 'black' }} onClick={this.onClick} />
                    </div>

                    <InputTextarea style={{ marginLeft: '-32px', width: '700px', height: '100px' }} rows={5} cols={30}></InputTextarea>

                    <InputTextarea style={{ marginTop: '110px', marginLeft: '-700px', height: '30px', width: '630px' }} rows={5} cols={30}></InputTextarea>

                    <Button onClick={() => this.emitInfoToAll()} label="Enviar" className="p-button-raised p-button-success" style={{ height: '30px', marginTop: '110px' }} />

                    <div style={{ marginLeft: '-20px' }}>
                        <Growl ref={(el) => this.growl = el} />
                        <Button label="Ataque" tooltip="Rode o dado de ataque" onClick={geraNumeroAleatorio} className="p-button-raised p-button-secondary" style={{ marginLeft: '200px', height: '30px', backgroundColor: 'rgba(196, 196, 196, 1)' }} />
                        {dado}
                        <br />
                        <Button label="Defesa" tooltip="Rode o dado de defesa" onClick={geraNumeroAleatorio} className="p-button-raised p-button-secondary" style={{ marginLeft: '50px', height: '30px', backgroundColor: 'rgba(196, 196, 196, 1)' }} />
                        {dado}
                    </div>
                    <div className="content-section implementation" >
                        <Card header={mestreImagem} style={{ width: '115px', marginLeft: '1090px', marginTop: '-138px' }}>
                        </Card>
                    </div>

                </Row>

                <Row md={10} style={{ backgroundColor: 'rgba(118, 118, 118, 1)', marginTop: '10px' }} >
                    <div className="content-section implementation" >
                        <Card header={personagem1} style={{ width: '90px', height: '110px' }}>
                        </Card>
                    </div>
                    <ProgressBar2 />


                    <div style={{ marginLeft: '150px' }}><InputClass toolTiip="Força" caracteristica="F"  onChange={this.handleInputChange} /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Habilidade" caracteristica="H" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Resistencia" caracteristica="R" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Armadura" caracteristica="A" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Poder de fogo" caracteristica="PF" /></div>

                    <div style={{ marginLeft: '70px' }}>
                        <DialogMensagem />
                        <DropdownClass />
                    </div>

                </Row>

                <Row md={10} style={{ backgroundColor: 'rgba(118, 118, 118, 1)', marginTop: '10px' }}>
                    <div className="content-section implementation" >
                        <Card header={personagem2} style={{ width: '90px', height: '110px' }}>
                        </Card>
                    </div>


                    <ProgressBar2 />

                    <div style={{ marginLeft: '150px' }}><InputText tooltip="Força" placeholder="F" style={{ width: '50px', backgroundColor: 'rgba(196, 196, 196, 1)' }} /></div>
                    <div style={{ marginLeft: '10px' }}><InputText tooltip="Habilidade" placeholder="H" style={{ width: '50px', backgroundColor: 'rgba(196, 196, 196, 1)' }} /></div>
                    <div style={{ marginLeft: '10px' }}><InputText tooltip="Resistência" placeholder="R" style={{ width: '50px', backgroundColor: 'rgba(196, 196, 196, 1)' }} /></div>
                    <div style={{ marginLeft: '10px' }}><InputText tooltip="Armadura" placeholder="A" style={{ width: '50px', backgroundColor: 'rgba(196, 196, 196, 1)' }} /></div>
                    <div style={{ marginLeft: '10px' }}><InputText tooltip="Poder de fogo" placeholder="PF"
                        style={{ width: '50px', backgroundColor: 'rgba(196, 196, 196, 1)' }} /></div>

                    <div style={{ marginLeft: '70px' }}>
                        <DialogMensagem />
                        <DropdownClass />
                    </div>

                </Row>

                <Row md={10} style={{ backgroundColor: 'rgba(118, 118, 118, 1)', marginTop: '10px' }}>
                    <div className="content-section implementation" >
                        <Card header={personagem3} style={{ width: '90px', height: '110px' }}>
                        </Card>
                    </div>
                    <ProgressBar2 />

                    <div style={{ marginLeft: '150px' }}><InputClass toolTiip="Força" caracteristica="F" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Habilidade" caracteristica="H" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Resistencia" caracteristica="R" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Armadura" caracteristica="A" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Poder de fogo" caracteristica="PF" /></div>

                    <div style={{ marginLeft: '70px' }}>
                        <DialogMensagem />
                        <DropdownClass />
                    </div>

                </Row>

                <Row md={10} style={{ backgroundColor: 'rgba(118, 118, 118, 1)', marginTop: '10px' }}>
                    <div className="content-section implementation" >
                        <Card header={personagem4} style={{ width: '90px', height: '110px' }}>
                        </Card>
                    </div>
                    <ProgressBar2 />

                    <div style={{ marginLeft: '150px' }}><InputClass toolTiip="Força" caracteristica="F" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Habilidade" caracteristica="H" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Resistencia" caracteristica="R" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Armadura" caracteristica="A" /></div>
                    <div style={{ marginLeft: '10px' }}><InputClass toolTiip="Poder de fogo" caracteristica="PF" /></div>

                    <div style={{ marginLeft: '70px' }}>
                        <DialogMensagem />
                        <DropdownClass />
                    </div>

                </Row>
                <Row md={2}>
                    <InputTextarea style={{ marginLeft: '1050px', marginTop: '-480px', height: '480px', width: '220px' }} value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })} rows={5} cols={30}></InputTextarea>
                </Row>

            </div>
        );
    }
}


