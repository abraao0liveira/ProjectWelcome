import { useState } from 'react'
import './styles.css'

export function Home() {

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")

    function handleAddUser(){
        const newUser ={
            name: name, 
            number: number
        }
    }

    return (
        <div class="main-login">
            <div class="left-login">
                <h1>Olá, seja Bem vindo(a)</h1>
                <h2>Somos uma comunidade de discípulos de Jesus, vivendo o propósito Divino.</h2>
            </div>
            <div class="right-login">
                 <div class="card-login">
                    <img src="https://scontent.ffor27-1.fna.fbcdn.net/v/t39.30808-6/326708695_497998132500074_2545789917932687896_n.png?_nc_cat=107&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=i3MG0RTorMEAX9y2NBz&_nc_ht=scontent.ffor27-1.fna&oh=00_AfD6-Q96aGFzfG7M3hHRoVd_uI1mxFdC7zzP1Y5dkHFmgw&oe=63F0AD07" alt="Logo"/>
                    <h1>Igreja em Maracanaú</h1>
                    <div class="textfield">
                        <label for="Nome">Nome</label>
                        <input type="text" name="Nome" placeholder="Nome" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div class="textfield">
                        <label for="Número">Telefone</label>
                        <input type="tel" name="Número" id="itel" autocomplete="tel" pattern="^\d{4,5}\d{4}$" placeholder="Telefone" onChange={e => setNumber(e.target.value)}/>
                    </div>
                    <button type="button" onClick={handleAddUser} class="btn-login">Enviar</button>
                    </div>
            </div> 
        </div>
    )
}
