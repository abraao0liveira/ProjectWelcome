import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { create, Whatsapp, SocketState } from "venom-bot";

export type QRCode ={
    base64Qr: string
    asciiQR: string
    attempts: number
    urlCode: string | undefined
}

class Sender {
    private client: Whatsapp
    private connected: boolean
    private qr: QRCode

    get isConnected(): boolean{
        return this.connected
    }
    get qrCode(): QRCode{
        return this.qr
    }

    constructor(){
        this.initialize()
    }

    async sendText(to: string, body: string){
        //5585[number]@c.us
        if(!isValidPhoneNumber(to, "BR")){
            throw new Error("this number is not valid.")
        }

        let phoneNumber = parsePhoneNumber(to, "BR")?.format("E.164")?.replace("+", "") as string

        phoneNumber = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`

        await this.client.sendText(phoneNumber, body)
    }

    private initialize(){
        const qr = (base64Qr: string, asciiQR: string, attempts: number, urlCode: string | undefined) => {
            this.qr = { base64Qr, asciiQR, attempts, urlCode }
        }

        const status = (statusSession: string) => {
            this.connected = ["isLogged", "qrReadSuccess", "chatsAvailable"].includes(statusSession)
        }

        const start = (client: Whatsapp) => {
            this.client = client

            client.onStateChange((state) =>{
                this.connected = state === SocketState.CONNECTED
            })
        }

        create('wpp-bot', qr, status)
        .then((client) => start(client))
        .catch((error) => console.error(error))
    }
}

export default Sender
